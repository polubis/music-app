const Environment = require("./webpack.utils");

module.exports = (env, { mode }) => {
  const environment = Environment(mode, {
    styles: "src/ui/styles/",
    ui: "src/ui/",
    dk: "src/dk/",
    components: "src/components/",
    models: "src/models/",
  });
  environment.applyOptimizations();

  return environment.config();
};
