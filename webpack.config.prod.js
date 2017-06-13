/**
 * Created by meathill on 2017/6/14.
 */

const config = require('./webpack.config');

config.watch = false;
config.devtool = false;

module.exports = config;