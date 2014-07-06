module.exports  = function(grunt) {

  grunt.initConfig({
    browserify:     {
      options:      {
        transform:  [ require('grunt-react').browserify ]
      },
      app:          {
        src:        './src/app.js',
        dest:       './dist/appbundle.js'
      }
    },

    copy : {
      vendor : {
        expand: true,
        cwd: 'src/vendor/',
        src: ['**'],
        dest: 'dist/vendor'
      },
      styles : {
        expand: true,
        cwd: 'src/styles/',
        src: ['**'],
        dest: 'dist/styles'
      }
    },

    watch   : {
      def : {
        files : ['./src/**/*.js', './src/**/*.jsx'],
        tasks : ['browserify','watch']
      },
      styles : {
        files : ['./src/styles/**/*'],
        tasks : ['copy:styles','watch']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify', 'copy', 'watch']);
}
