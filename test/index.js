require('babel-register')({
  presets: ['es2015', 'react'],
});

require('./js/unitTests');
require('./js/integrationTests');
