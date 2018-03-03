'use strict';



function states($stateProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      template: require('./layout.html')
    });
}
module.exports = states;