module.exports = function(grunt){
////    任务配置代码
//    grunt.initConfig({
//        pkg:grunt.file.readJSON('package.json'),
//        uglify:{
//            options:{
//                banner:'/*!<%= pkg.name %><%= grunt.template.today("yyyy-mm-dd")%>*/\n'
//            },
//            build:{
//                src:'src/<%= pkg.name %>.js',
//                dest:'build/<%= pkg.name %>.min.js'
//            }
//        }
//    });
////    插件加载
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    //任务注册代码
//    grunt.registerTask('default',['uglify']);
    var sassStyle = 'expanded';
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        sass: {
            output:{
                options:{
                    style:sassStyle
                },
                files:{
                    './style.css':'./scss/style.scss'
                }
            }
        },
        concat:{
            //options:{
            //    separator:' ',
            //},
            dist:{
                src:['./src/plugin.js','./src/plugin2.js'],
                dest:'./global.js',
            }
        },
        uglify:{
            compressjs :{
                files:{
                    '.global.min.js':['./global.js']
                }
            }
        },
        jshint:{
            all:['./global.js']
        },
        watch:{
            scripts:{
                files:['./src/plugin.js','./src/plugin2.js'],
                tasks:['concat','jshint','uglify']
            },
            sass:{
                files:['./scss/style.scss'],
                tasks:['sass']
            },
            livereload:{
                options:{
                    livereload:'<%= connect.options.livereload %>'
                },
                files:[
                    'index.html',
                    'style.css',
                    'js/global.min.js'
                ]

            }
        },
        connect:{
            options:{
                port:9000,
                open:true,
                livereload:35729,
                hostname:'localhost'
            },
            server:{
                options:{
                    port:9001,
                    base:'./'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('outputcss',['sass']);
    grunt.registerTask('concatjs',['concat']);
    grunt.registerTask('compressjs',['concat','jshint','uglify']);
    grunt.registerTask('watcit',['sass','concat','jshit','uglify','connect','watch']);
    grunt.registerTask('default');
}