#!/usr/bin/env node
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
/* eslint-disable */
// const inquirer = require('inquirer');


/* eslint-disable-next-line no-undef */
var CURR_DIR = process.cwd();
var pkgPath = _path2.default.dirname(require.resolve('react-webpack-config'));

function createDirectoryContents(templatePath, newProjectPath) {
  var filesToCreate = _fs2.default.readdirSync(templatePath);
  !_fs2.default.existsSync(newProjectPath) && _fs2.default.mkdirSync(newProjectPath);

  filesToCreate.forEach(function (file) {
    var origFilePath = templatePath + '/' + file;

    // get stats about the current file
    var stats = _fs2.default.statSync(origFilePath);

    if (stats.isFile()) {
      var contents = _fs2.default.readFileSync(origFilePath, 'utf8');

      var writePath = CURR_DIR + '/' + newProjectPath + '/' + file;
      if (!_fs2.default.existsSync(writePath)) {
        _fs2.default.writeFileSync(writePath, contents, 'utf8');
      } else {
        console.log(writePath + ' already exist.');
      }
    } else if (stats.isDirectory()) {
      var dirPath = CURR_DIR + '/' + newProjectPath + '/' + file;
      !_fs2.default.existsSync(dirPath) && _fs2.default.mkdirSync(dirPath);

      // recursive call
      createDirectoryContents(templatePath + '/' + file, newProjectPath + '/' + file);
    }
  });
}

var _process$argv = _toArray(process.argv),
    tarPath = _process$argv[2],
    args = _process$argv.slice(3);

var targetPath = tarPath || '.';

createDirectoryContents(pkgPath + '/template', targetPath);
