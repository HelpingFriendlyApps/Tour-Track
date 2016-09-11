module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        port: process.env.PORT || 4000
      },
      dev: {
        options: {
          script: 'server/index.js'
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
    sass: {
      dist: {
        files: {
          // 'client/main.css': 'client/sass/_main.scss'
          'client/main.css': 'client/main.scss'
        }
      }
    },
    watch: {
      client: {
        files: 'client/app/**/*.js',
        tasks: ['babel']
      },
      server: {
        files: 'server/**/*.js',
        tasks: ['express:dev'],
        options: {
          livereload: true,
          nospawn: true
        }
      },
      css: {
        files: 'client/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['babel', 'sass', 'express', 'watch']);
  
};