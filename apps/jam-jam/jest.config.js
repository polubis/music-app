module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "\\.(ts|tsx)?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "src"],
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  setupFilesAfterEnv: ["<rootDir>/config/setup.jest.ts"],
  globals: {},
  testEnvironment: "jsdom",
};
