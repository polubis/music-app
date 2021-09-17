const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const getEnvs = (mode) => {
  const [DEV, PROD] = ["development", "production"];
  return { isDev: mode === DEV, isProd: mode === PROD };
};

const createAlias = (paths) => {
  if (!paths.styles) {
    throw new Error("styles path is required");
  }

  return Object.entries(paths).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: path.resolve(__dirname, value),
    }),
    {}
  );
};

const Environment = (mode, paths) => {
  console.log(`App is running in ${mode} mode`);
  const { isDev, isProd } = getEnvs(mode);

  const alias = createAlias(paths);

  const config = {
    mode,
    devtool: isDev ? "inline-source-map" : false,
    entry: path.resolve(__dirname, "src/index.tsx"),
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias,
    },
    output: {
      path: __dirname + "/build",
      filename: "[name].[chunkhash].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
        },
        {
          test: /\.scss$/,
          exclude: path.resolve(__dirname, alias.styles),
          use: [
            "style-loader",
            "css-modules-typescript-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
                modules: {
                  localIdentName: "[local]___[hash:base64:5]",
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, alias.styles),
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.html$/,
          use: ["html-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
          },
        },
        {
          test: /\.svg$/,
          loader: "svg-url-loader",
          options: {
            limit: 10 * 1024,
            noquotes: true,
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          loader: "image-webpack-loader",
          enforce: "pre",
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        inject: "body",
        hash: true,
      }),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: "public",
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      historyApiFallback: true,
      port: 3000,
      hot: true,
    },
    optimization: {},
  };

  return {
    applyOptimizations: () => {
      if (isProd) {
        config.optimization = {
          minimize: true,
          concatenateModules: true,
          runtimeChunk: "single",
          splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            cacheGroups: {
              default: false, // Removes default config

              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  // We creating here node_modules single package name
                  return `npm.${module.context
                    .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                    .replace("@", "")}`;
                },
                minSize: 0,
              },
            },
          },
        };
      }
    },
    config: () => config,
  };
};

module.exports = Environment;
