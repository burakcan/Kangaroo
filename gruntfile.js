module.exports  = function(grunt) {

  var vendorjs  = require('./src/vendor/includes.js');
  var styles    = require('./src/styles/includes.js');

  grunt.initConfig({
    browserify:     {
      options:      {
        transform:  [ require('grunt-react').browserify ]
      },
      app:          {
        src:        './src/app.js',
        dest:       './dist/react.js'
      }
    },

    cssmin: {
      combine: {
        files: {
          'dist/bundle.min.css': styles
        }
      }
    },

    concat: {
      options: {
        separator: ';',
        stripBanners: true,
      },
      dist: {
        src: vendorjs,
        dest: 'dist/vendor.js',
      },
      bundle: {
        src: ['dist/vendor.js', 'dist/react.js'],
        dest: 'dist/bundle.js',
      }
    },

    uglify: {
      bundle: {
        files: { 'dist/bundle.min.js': ['dist/bundle.js'] }
      }
    },

    watch   : {
      def : {
        files : ['./src/**/*.js', './src/**/*.jsx'],
        tasks : ['browserify', 'concat','watch']
      },
      styles : {
        files : ['./src/styles/**/*'],
        tasks : ['cssmin','watch']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['browserify', 'concat', 'uglify', 'cssmin', 'watch']);
}
