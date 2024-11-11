const { ESLint } = require('eslint');
const eslintCli = new ESLint();

const removeIgnoredFiles = async (files) => {
  const filteredFiles = [];

  for (let file of files) {
    const isIgnored = await eslintCli.isPathIgnored(file);
    if (!isIgnored) filteredFiles.push(file);
  }

  return filteredFiles.join(' ');
};

module.exports = {
  '*.scss': 'npx stylelint "**/*.scss" ',
  '**/*.{ts,js}': 'prettier --write',
  //   '**/*.{ts,tsx}': "nx run-many -t lint --all",
  // '**/*.{ts,tsx}': "nx affected:lint --base=main",
  '**/*.{ts,tsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [`eslint --max-warnings=0 ${filesToLint}`];
  },
};
