module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },
      build: ['Gruntfile.js', 'src/**/*.js'],
      dev: ['src/**/*.js']
    },

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/cr.min.js': 'src/CR.js'
        }
      }
    },

    sass: {
      dist: {
        files: {
          'src/assets/css/style.css': 'src/assets/sass/main.scss'
        }
      }
    },

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'src/assets/css/style.min.css': 'src/assets/css/style.css'
        }
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: 'src/assets/',
        src: ['img/*','css/*'],
        dest: 'dist/',
      },
    },

    watch: {
      files: ['src/**/*.css', 'src/**/*.scss'],
      tasks: ['sass','copy']
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('build', ['jshint', 'uglify', 'cssmin', 'sass','copy']);
  grunt.registerTask('default', ['concurrent']);

}