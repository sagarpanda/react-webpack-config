#!/usr/bin/env node
/* eslint-disable */
// const inquirer = require('inquirer');
import path from 'path';
import fs from 'fs';

/* eslint-disable-next-line no-undef */
const CURR_DIR = process.cwd();
const pkgPath = path.dirname(require.resolve('react-webpack-config'));

function createDirectoryContents (templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);
  !fs.existsSync(newProjectPath) && fs.mkdirSync(newProjectPath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      if (!fs.existsSync(writePath)) {
        fs.writeFileSync(writePath, contents, 'utf8');
      } else {
        console.log(`${writePath} already exist.`);
      }
    } else if (stats.isDirectory()) {
      const dirPath = `${CURR_DIR}/${newProjectPath}/${file}`;
      !fs.existsSync(dirPath) && fs.mkdirSync(dirPath);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}

const [,, tarPath, ...args] = process.argv;
const targetPath = tarPath || '.';

createDirectoryContents(`${pkgPath}/template`, targetPath);
