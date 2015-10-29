#!/usr/bin/env node
/* jshint strict: false, undef: true, unused: true */

var shelljs = require('shelljs');
var path = require('path');
var fsExtraPromise = require('fs-extra-promise');
var ranma = require('ranma');
var arrayUtils = require('zero-lang-array');

function walk(pathname, root) {
    var stat;
    try {
        stat = fsExtraPromise.statSync(pathname);
    } catch(e) {
        // because there might be links
        return;
    }
    if (stat.isDirectory()) {
        arrayUtils.each(fsExtraPromise.readdirSync(pathname), function(filename) {
            walk(path.join(pathname, filename), root);
        });
    } else if (stat.isFile()) {
        if (pathname.match(/\.js$/)) {
            var srcFile = path.join(root, pathname);
            var buildFile = pathname.replace(/^src/, 'build');
            shelljs.mkdir('-p', buildFile.replace(/\w+\.js$/, ''));
            console.log(srcFile, '=>', buildFile);
            fsExtraPromise.readFileAsync(srcFile, 'utf8').then(function(data){
                fsExtraPromise.writeFileAsync(buildFile, ranma.amdify(data));
            });
        }
    }
}

walk('./src', '.');

