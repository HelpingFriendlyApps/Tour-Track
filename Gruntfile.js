module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        port: process.env.PORT || 4000
      },
      dev: {
        options: {
          script: 'server/index.js',
          debug: true
        }
      },
    },
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
          dest: 'client/dist/'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['client/app/**/*.js'],
        tasks: ['babel']
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  // grunt.registerTask('default', ['babel', 'express', 'watch']);
  grunt.registerTask('default', ['babel']);
  
};