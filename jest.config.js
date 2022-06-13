module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  setupFiles: ['dotenv/config'],
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/**/*.(test).(js|ts)'],
  testEnvironment: 'node',
};
