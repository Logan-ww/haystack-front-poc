export default {
  displayName: 'remote-content-pages',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/remote-content-pages',
  collectCoverageFrom: ['./**/*.{ts,tsx}'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__generated__/'],
};
