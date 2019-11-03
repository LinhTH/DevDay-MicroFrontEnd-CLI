const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const configstore = require('configstore');
const inquirer = require('./lib/inquirer/select-base-project');

clear();

console.log(
  chalk.yellow(figlet.textSync('AAVN MF', { horizontalLayout: 'full' }))
);

const run = async () => {
  const credentials = await inquirer.askGithubCredentials();
  console.log(credentials);
};

run();
