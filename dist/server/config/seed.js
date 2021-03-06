/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _thing = require('../api/thing/thing.model');

var _thing2 = _interopRequireDefault(_thing);

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_thing2.default.find({}).remove().then(function () {
  _thing2.default.create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' + 'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' + 'Stylus, Sass, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, ' + 'AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep ' + 'tests alongside code. Automatic injection of scripts and ' + 'styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more ' + 'code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript ' + 'payload, minifies your scripts/css/images, and rewrites asset ' + 'names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku ' + 'and openshift subgenerators'
  });
});

_user2.default.find({}).remove().then(function () {
  _user2.default.create({
    provider: 'local',
    name: 'Admin',
    email: 'admin@test.com',
    password: 'admin',
    role: 'admin'
  }, {
    provider: 'local',
    role: 'parent',
    name: 'oskar',
    email: 'oskar@test.com',
    password: 'oskar'
  }, {
    provider: 'local',
    role: 'super',
    name: 'super',
    email: 'super@test.com',
    password: 'super'
  }).then(function () {
    console.log('finished populating users');
  });
});
//# sourceMappingURL=seed.js.map
