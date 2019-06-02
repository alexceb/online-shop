module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleNameMapper": {
    "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy"
  },
  "snapshotSerializers": ["enzyme-to-json"],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFilesAfterEnv": ["<rootDir>__tests__/setup/setupEnzyme.ts"],
  "testPathIgnorePatterns": ["<rootDir>/__tests__/setup/"]
}