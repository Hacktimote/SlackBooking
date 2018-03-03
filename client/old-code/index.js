
/**
 * Module dependencies
 */
require('./style.scss');

var bootstrap = require('./common/libs');

/**
 * Setup App Module
 */

var appModule = module.exports = angular
  .module('app',[
    bootstrap.name,
    require('./home').name
  ])

  .config(['$stateProvider', require('./states')])


  .config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  })

  .config(function ($urlRouterProvider) {

    $urlRouterProvider.otherwise('/app/home');

  })

  .run(function ($log, $rootScope, $ionicBackdrop, $timeout, $cordovaSplashscreen, $cordovaBeacon) {

    $log.debug('app module - run');

    $rootScope.$on('$stateChangeStart',
      function (event, toState) {
        $log.debug('$stateChangeStart - name:', toState.name);
      });

    $rootScope.$on('$stateChangeSuccess',
      function (event, toState) {
        $log.debug('$stateChangeSuccess - name:', toState.name);
      });

    $rootScope.$on('$stateNotFound',
      function (event, unfoundState, fromState, fromParams) {
        $log.warn('$stateNotFound', {
          event        : event,
          unfoundState : unfoundState,
          fromState    : fromState,
          fromParams   : fromParams
        });
      });

    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        $log.error('$stateChangeError', {
          event      : event,
          toState    : toState,
          toParams   : toParams,
          fromState  : fromState,
          fromParams : fromParams,
          error      : error
        });
        if (error) {
          throw error;
        }
      });

    $cordovaBeacon.requestAlwaysAuthorization();

    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "B9407F30-F5F8-466E-AFF9-25556B57FE6D"));


    $ionicBackdrop.retain();

    $timeout(function() {
      $ionicBackdrop.release();
    }, 600);

    $timeout(function() {
      navigator.splashscreen && $cordovaSplashscreen.hide()
    }, 4000);
  });

// Bootstrap App Module
bootstrap.ionicBootstrap(appModule, global);
