module.exports = {
    testEnvironment: 'jsdom', // or 'node' if you're testing server-side code
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Use Babel to transform JSX files
    },
    testMatch: ['<rootDir>/src/__tests__/**/*.test.js'], // Pattern to match test files
  };