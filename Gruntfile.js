module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    // Less compile task
    less: {
      compile: {
        files: {
          "dist/css/cdoj.less.css": "src/less/cdoj.less"
        }
      }
    },
    // Coffee compile task
    coffee: {
      options: {
        join: true
      },
      compile: {
        files: {
          "dist/js/cdoj.coffee.js": [
            "src/coffee/cdoj.global.coffee",
            "src/coffee/cdoj.util.*.coffee",
            "src/coffee/cdoj.editor.coffee",
            "src/coffee/cdoj.class.*.coffee",
            "src/coffee/cdoj.layout.coffee",
            "src/coffee/cdoj.*.coffee",
            "src/coffee/cdoj.coffee"
          ]
        }
      }
    },
    concat: {
      js: {
        src: [
          "src/js/angular.min.js",
          "src/js/fineuploader-4.0.3.min.js",
          "src/js/jquery-2.0.3.js",
          "src/js/sugar-full.development.js",
          "src/js/underscore.js",
          "src/js/prettify.js",
          "src/js/marked.js",
          "src/js/bootstrap.js",
          "src/js/md5.js",
          "src/js/jquery.elastic.source.js",
          "src/js/bootstrap-datetimepicker.js",
          "dist/js/cdoj.coffee.js"
        ],
        dest: "dist/js/cdoj.js"
      },
      jsBeforeMin: {
        src: [
          "src/js/jquery-2.0.3.js",
          "src/js/sugar-full.development.js",
          "src/js/underscore.js",
          "src/js/prettify.js",
          "src/js/marked.js",
          "src/js/bootstrap.js",
          "src/js/md5.js",
          "src/js/jquery.elastic.source.js",
          "src/js/bootstrap-datetimepicker.js",
          "dist/js/cdoj.coffee.js"
        ],
        dest: "dist/js/cdoj.min.before.js"
      },
      jsAfterMin: {
        src: [
          "src/js/angular.min.js",
          "src/js/fineuploader-4.0.3.min.js",
          "dist/js/cdoj.min.after.js"
        ],
        dest: "dist/js/cdoj.min.js"
      },
      css: {
        src: ["src/css/bootstrap.css", "src/css/datetimepicker.css", "dist/css/cdoj.less.css"],
        dest: "dist/css/cdoj.css"
      }
    },
    min: {
      js: {
        src: "dist/js/cdoj.min.before.js",
        dest: "dist/js/cdoj.min.after.js"
      }
    },
    cssmin: {
      css: {
        src: "dist/css/cdoj.css",
        dest: "dist/css/cdoj.min.css"
      }
    },
    watch: {
      files: [
        "src/less/*.less",
        "src/coffee/*.coffee"
      ],
      tasks: ["less", "coffee", "concat"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-yui-compressor");

  grunt.registerTask("default", [
    "less:compile",
    "concat:css",
    "cssmin",

    "coffee",
    "concat:js",

    "concat:jsBeforeMin",
    "min",
    "concat:jsAfterMin"
  ]);

};
