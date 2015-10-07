
/**
 * Module dependencies.
 */

var exists = require('fs').existsSync;
var resolve = require('path').resolve;
var increment = require('semver').inc;
var write = require('fs').writeFileSync;

/**
 * Expose `bump`
 */

module.exports = bump;

/**
 * Bump `manifests` in `root`.
 *
 * @param {String} root
 * @param {String} version
 * @param {Array} manifests
 * @api public
 */

function bump(root, version, manifests){
  manifests = manifests || ['package.json', 'component.json', 'bower.json'];
  var files = {};
  var ret = {};
  var prev;

  manifests.forEach(function(manifest){
    var path = resolve(root, manifest);

    if (!exists(path)) return;

    var json = require(path);
    if (!json.version) return;

    var v = json.version;
    var p = json.private;

    if (p && !v) return;
    if (!v) throw new Error('no existing version found in "' + manifest + '"');
    if (prev && v != prev) throw new Error('existing version in "' + manifest + '" does not match others');

    prev = v;
    files[manifest] = json;
  });

  if (!~version.indexOf('.')) {
    var file = Object.keys(files)[0];
    version = increment(files[file].version, version);
    if (!version) throw new Error('invalid release type specified');
  }

  var keys = Object.keys(files);
  keys.forEach(function(key){
    var path = resolve(root, key);
    var json = files[key];
    if (json.version) json.version = version;
    write(path, JSON.stringify(json, null, 2) + '\n');
  });

  ret.version = version;
  ret.in = keys;
  return ret;
}
