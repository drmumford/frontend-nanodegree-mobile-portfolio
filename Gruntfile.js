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
      my_target: {
        files: {
          'views/js/main.min.js': ['views/js/main.js'],
          'js/perfmatters.min.js': ['js/perfmatters.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', [
    'clean', 'mkdir', 'copy', 'responsive_images', 'uglify']);
};
