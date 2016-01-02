module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'src/node.js': 'coffee/node/web-socket.coffee',
          'src/velbus-socket.js': 'coffee/node/velbus-socket.coffee',
          'src/client.js': 'coffee/client/*.coffee' // compile and concat into single file
        }
      }
    },
    watch: {
      scripts: {
        files: 'coffee/**/*.coffee',
        tasks: ['coffee']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['coffee']);
};