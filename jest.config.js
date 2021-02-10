const config = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
};

module.exports = config;
