#!/usr/bin/env node
/* jshint strict: false, undef: true, unused: true */

var shelljs = require('shelljs');
var path = require('path');
var walk = require('walk');
var fsExtraPromise = require('fs-extra-promise');
var ranma = require('ranma');

var walker = walk.walk('./src', {
    followLinks: false
});

walker.on('file', function (root, fileStats, next) {
    if (fileStats.name.match(/\.js$/)) {
        var srcFile = path.join(root, fileStats.name);
        var buildRoot = root.replace(/^\.\/src/, './build');
        var buildFile = path.join(buildRoot, fileStats.name);
        shelljs.mkdir('-p', buildRoot);
        console.log(srcFile, '=>', buildFile);
        fsExtraPromise.readFileAsync(srcFile, 'utf8').then(function(data){
            fsExtraPromise.writeFileAsync(buildFile, ranma.amdify(data));
        });
    }
    next();
});

