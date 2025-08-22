const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Apply NativeWind configuration
const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

// Add .sql extension for Drizzle
nativeWindConfig.resolver.sourceExts.push("sql");

module.exports = nativeWindConfig;
