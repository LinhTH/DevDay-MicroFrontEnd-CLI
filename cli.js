const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
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
  _mkdirp(credentials['base project'][0]);
  baseProject = answer[baseProjectInquirer.questionName][0];

  answer = await componentNameInquirer.ask();
  componentName = answer[componentNameInquirer.questionName][0];

  answer = await teamNameInquirer.ask();
  teamName = answer[teamNameInquirer.questionName][0];

  answer = await portInquirer.ask();
  port = answer[portInquirer.questionName][0];
};

const _mkdirp = p => {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
};

run();
