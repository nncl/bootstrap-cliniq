module.exports = function(grunt) {
    'use strict';

    var assetsPath = '../../assets/frontend/';

    // configuração do projeto
    var gruntConfig = {

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            target: {
                files: {
                }
            }
        },

        sass: {
          dist: {
            options: {
              compass: true,
              style: 'expanded'
            },
            files: {
              '../../app.css': assetsPath + 'sass/app.scss'
            }
          }
        },

        cssmin: {
            target: {
                files: {
                    '../../app.min.css': [
                        '../../app.css'
                    ]
                }
            }
        },

        cachebreaker: {
            dev: {
                options: {
                    match: [
                    ]
                },
                files: {
                    src: ['../../public/*.php']
                }
            }
        },

        /*cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'assets/css',
              src: ['*.css', '!*.min.css'],
              dest: 'assets/css',
              ext: '.min.css'
            }]
          }
        }*/

        watch : {
          minsass : {
            files : [
              assetsPath + 'sass/**/*'
            ],

            tasks : [ 'sass', 'cssmin' ]
          },

          minjs : {
            files : [
              assetsPath + 'js/**/*'
            ],

            tasks : [ 'uglify' ]
          }
        } // watch

    };

    grunt.initConfig(gruntConfig);

    // plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cache-breaker');

    // tarefas
    grunt.registerTask('default', ['uglify', 'sass', 'cssmin']);
    grunt.registerTask('deploy', ['cachebreaker']);

    // Tarefa para Watch
    grunt.registerTask( 'w', [ 'watch' ] );
};