/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 800,
            quality: 100,
          },{
            width: 600,
            quality: 80,
          },{
            width: 400,
            quality: 60,
          }]
        },

        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'views/images_src/',
          dest: 'views/images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['views/images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['views/images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images */
    copy: {
      dev: {
        files: [{
          expand: true,
          flatten: true,
          src: 'views/images_src/fixed/*.{gif,jpg,png}',
          dest: 'views/images/'
        }]
      },
    },

    uglify: {
      options: {
        mangle: true
      },
      all: {
        files: {
          'views/js/main.min.js': 'src/views/js/main.js', // 'destination': 'source'
          'js/perfmatters.min.js': 'src/js/perfmatters.js'
        }
      }
    },

    htmlmin: {
      src: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': 'src/index.html', // 'destination': 'source'
          'project-2048.html': 'src/project-2048.html',
          'project-mobile.html': 'src/project-mobile.html',
          'project-webperf.html': 'src/project-webperf.html',
          'views/pizza.html': 'src/views/pizza.html'
        }
      }
    },

    cssmin: {
      src: {
        files: {
          'css/style.min.css': ['src/css/bootstrap-grid.css', 'src/css/style.css'],
          'css/print.min.css': 'src/css/print.css',
          'views/css/style.min.css': ['src/css/bootstrap-grid.css', 'src/views/css/style.css']
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'js/perfmatters.js', 'views/js/main.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');

  grunt.registerTask('images', ['clean', 'mkdir', 'copy', 'responsive_images']);
  grunt.registerTask('minify', ['uglify', 'htmlmin', 'cssmin']);

  grunt.registerTask('default', ['jshint', 'images', 'minify']);
};
