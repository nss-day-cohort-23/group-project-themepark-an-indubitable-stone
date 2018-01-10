module.exports = function (grunt) {
    grunt.initConfig({
      browserify: {
        files: {
          src: "js/main.js",
          dest: "dist/app.js"
        },
        options: {
          transform: ["hbsfy"]
        }
      },
      jshint: {
        options: {
          predef: ["document", "console", "alert"],
          esnext: true,
          globalstrict: true,
          globals: {},
          browserify: true
        },
        files: ["js/**/*.js"]
      },
      sass: {
        dist: {
            files: {
                'css/main.css': 'sass/sass.scss'
            }
        }
        }, 
      watch: {
        options: {
          reload: true
        },
        javascripts: {
          files: ["js/**/*.js"],
          tasks: ["jshint", "browserify"]
        },
        sass: {
            files: ['sass/**/*.scss'],
            tasks: ['sass']
        },
        hbs: {
          files: ["templates/**/*.hbs"],
          tasks: ["browserify"]
        }
      }
    });
  
    require("matchdep")
      .filter("grunt-*")
      .forEach(grunt.loadNpmTasks);
  
    grunt.registerTask("default", ["jshint", "sass", "browserify", "watch"]);
  };