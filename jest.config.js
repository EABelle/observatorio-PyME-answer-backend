module.exports = {
    preset: '@shelf/jest-mongodb',
    transform: { '^.+\\.ts$': 'ts-jest' },
    testRegex: '(/__tests__/.*|(\\.|/)spec)\\.(js|ts)$',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
    testPathIgnorePatterns: [
        '/node_modules/'
    ],
    verbose: true,
};
