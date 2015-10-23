module.exports = function (grunt) {

    grunt.initConfig({
        babel: {
            dev: {
                expand: true,
                filter: 'isFile',
                cwd: 'v2/src/utils/',
                src: [
                    'lang-es6.js',
                    'bow-es6.js'
                ],
                dest: 'v2/build/utils'
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['babel']);

};
