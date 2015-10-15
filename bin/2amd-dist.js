#!/usr/bin/env node
/* jshint strict: false, undef: true, unused: true */

var madge = require('madge');
var arrayUtils = require('zero-lang-array');
var objectUtils = require('zero-lang-object');
var rjsCommonjs = require('rjs-commonjs');
var fsExtraPromise = require('fs-extra-promise');

var madgeObj = madge('./src', {
    format: 'cjs',
    mainRequireModule: 'index.js',
});

var resolved = {};
var packingModules = [];
var calledTimes = 0;

function resolvePackingModules (tree) {
    objectUtils.each(tree, function(deps, module) {
        if (deps.length === 0) {
            resolved[module] = true;
            packingModules.push(module);
        }
    });
    arrayUtils.each(packingModules, function(module) {
        delete tree[module];
    });
    objectUtils.each(tree, function(deps, module) {
        tree[module] = arrayUtils.difference(deps, packingModules);
    });
    if (objectUtils.keys(tree).length > 0 && calledTimes <= 20) {
        calledTimes ++;
        resolvePackingModules(tree);
    }
}

resolvePackingModules(objectUtils.clone(madgeObj.tree));

console.log(calledTimes, packingModules);

var result = '';

arrayUtils.each(packingModules, function(module) {
    var data = fsExtraPromise.readFileSync('./src/' + module + '.js', 'utf8');
    var content = rjsCommonjs('PaneJS/' + module, data);
    arrayUtils.each(packingModules, function(mod) {
        var regexp1 = new RegExp("'\.\/" + mod.replace(/\//g, '\/') + "'", 'g');
        var regexp2 = new RegExp('"\.\/' + mod.replace(/\//g, '\/') + '"', 'g');
        content = content.replace(regexp1, "'PaneJS/" + mod + "'");
        content = content.replace(regexp2, "'PaneJS/" + mod + "'");
    });
    result += content;
});

console.log(result);

fsExtraPromise.writeFileSync('./dist/all.amd.js', result);

