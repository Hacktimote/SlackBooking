
require('./style.scss');

module.exports = angular
  .module('app.home',[
    require('./home.controller').name,
    require('./room.service').name
  ])
  .config(['$stateProvider', require('./states')]);


