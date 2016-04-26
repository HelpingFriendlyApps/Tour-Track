module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'client/app',
          src: ['**/*.js'],
          dest: 'client/dist'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.registerTask('default', ['babel']);
  
};