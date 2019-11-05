const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs-extra');
const path = require('path');
const replace = require('replace');
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

  answer = await teamNameInquirer.ask();
  teamName = answer[teamNameInquirer.questionName];

  answer = await portInquirer.ask();
  port = answer[portInquirer.questionName];

  const folderName = initialiseProject(baseProject, componentName);

  replaceComponentName(folderName, componentName);

  replaceTeamName(folderName, teamName);

  replacePort(folderName, port);
};

const initialiseProject = (baseProject, componentName) => {
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

  return folderName;
};

const replaceComponentName = (folderName, componentName) => {
  replace({
    regex: 'react-component-name',
    replacement: componentName,
    paths: [
      `${folderName}/package.json`,
      `${folderName}/src/App.js`,
      `${folderName}/public/index.html`
    ],
    recursive: true,
    silent: true
  });
};

const replaceTeamName = (folderName, teamName) => {
  replace({
    regex: 'team-name',
    replacement: teamName,
    paths: [`${folderName}/public/index.html`],
    recursive: true,
    silent: true
  });
};

const replacePort = (folderName, port) => {
  replace({
    regex: 'port-number',
    replacement: port,
    paths: [`${folderName}/package.json`],
    recursive: true,
    silent: true
  });
};

run();
