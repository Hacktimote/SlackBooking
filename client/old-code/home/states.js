'use strict';

function states($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/home',
      parent: 'app',
      template: require('./home.html'),
      controller: 'appHome',
      controllerAs: 'vm'
    });
}

module.exports = states;
