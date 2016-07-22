module.exports = function runServer(location, port, cb) {
  var exec = require('child_process').exec;
  var spawn = require('child_process').spawn;
  var username = 'w4d003';

  process.chdir('../PokemonGo-Map');

  exec('killall python');

  setTimeout(function() {
    var child = spawn('python', [
      '-u',
      'example.py',
      '-ar', 15,
      '-u', username,
      '-p', username,
      '-l', location,
      '-st', 10,
      '-P', port,
    ], {
      detatched: true,
    });

    child.stdout.on('data', function(chunk) {
      console.log('THINGS ARE HAPPENING');
      console.log('stdout', chunk.toString());
    });

    child.stderr.on('data', function(chunk) {
      console.log('stderr', chunk.toString());
    });

    child.on('close', function(code) {
        console.log('Exited with code', code);
    });

    // Kill after 15 minutes
    setTimeout(function() {
      child.kill();
      exec('killall python');
    }, 15 * 60 * 1000)

    cb(child);
  }, 500);
}
