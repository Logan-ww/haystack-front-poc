export default {
  displayName: 'remote-home',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/remote-home',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__generated__/'],
};
