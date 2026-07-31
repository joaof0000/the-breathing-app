const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// expo-speech generates a temporary local-maven-repo directory during its
// postinstall that Metro's file watcher tries to follow — crashing with ENOENT.
// Block the entire expo-speech package directory from the watcher.
const { blockList } = require("metro-config");
config.resolver.blockList = [
  /expo-speech.*local-maven-repo/,
  /expo-speech_tmp/,
  ...(Array.isArray(config.resolver.blockList) ? config.resolver.blockList : []),
];

module.exports = config;
