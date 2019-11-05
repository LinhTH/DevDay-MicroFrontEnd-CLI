const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs-extra');
const path = require('path');
const configstore = require('configstore');
const baseProjectInquirer = require('./lib/inquirer/base-project');
const componentNameInquirer = require('./lib/inquirer/component-name');
const teamNameInquirer = require('./lib/inquirer/team-name');
const portInquirer = require('./lib/inquirer/port');

clear();

let baseProject;
let componentName;
let teamName;
let port;
const printCyan = text => console.log(` ${chalk.cyan(text)}`);
const printGreen = text => console.log(` ${chalk.green(text)}`);

console.log(
  chalk.yellow(
    figlet.textSync('AAVN MF', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })
  )
);

const run = async () => {
  let answer = await baseProjectInquirer.ask();
  // _mkdirp(credentials['base project'][0]);
  baseProject = answer[baseProjectInquirer.questionName][0];

  answer = await componentNameInquirer.ask();
  componentName = answer[componentNameInquirer.questionName];

  // answer = await teamNameInquirer.ask();
  // teamName = answer[teamNameInquirer.questionName];

  // answer = await portInquirer.ask();
  // port = answer[portInquirer.questionName];

  createFolder(baseProject, componentName);
};

const createFolder = (baseProject, componentName) => {
  printCyan(
    `⏳  Creating ${baseProject} Web Component by the name of ${componentName} ...`
  );
  console.log();

  const folderName = baseProject.toLowerCase() + '-' + componentName;
  fs.ensureDirSync(folderName);
  fs.emptyDirSync(folderName);

  printCyan('✅  Created project folder.');
  console.log();

  fs.copySync(
    path.resolve(__dirname, 'templates/' + baseProject.toLowerCase()),
    folderName
  );

  printCyan('✅  Initialized project.');
  console.log();
};

run();
