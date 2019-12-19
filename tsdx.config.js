const postcss = require('rollup-plugin-postcss');
module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        modules: true,
      })
    );
    
    config.external = id => /react|material-ui|zecos\/input/.test(id)
    return config;
  },
};