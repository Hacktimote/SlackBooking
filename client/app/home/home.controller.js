'use strict';
require('angular');
var bookingModal = require('./bookingModal.html');


module.exports = angular
  .module('app.home.controller', [])
  .controller('appHome', appHome);

/* @ngInject */
function appHome($scope, Rooms, $ionicModal, $cordovaBeacon, $timeout) {
  var vm = this;
  vm.title = 'SlackBooking';

  vm.picture = {
    small: require('../common/img/small.png'),
    medium: require('../common/img/medium.png'),
    large: require('../common/img/large.png')
  };


  vm.filter = [
    {
      id: 0,
      label: "Near By",
      name: "nearBy"
    }, {
      id: 1,
      label: "Available",
      name: "available"
    }, {
      id: 2,
      label: "All",
      name: "all"
    }
  ];

  vm.filterSelected = vm.filter[0];

  vm.noRoom = false;
  vm.rooms = [];
  vm.roomAvailabel = false;


  vm.doRefresh = doRefresh;
  vm.updateFilter = updateFilter;
  vm.book = book;
  vm.selectAll = selectAll;
  vm.nbRoom = nbRoom;

  activate();

  ////////////////
  function getList() {
    return Rooms.all().then(function (list) {
      vm.rooms = list;
    })
  }

  function doRefresh() {
    Rooms.update().then(function () {
      getList().then(function () {
        updateFilter();
      });
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  function activate() {
    getList();
  }

  function updateFilter() {
    _.forEach(vm.rooms, function (room) {
      if (vm.filterSelected.id === 0) {
        room.visible = (room.distance != null);
      } else if (vm.filterSelected.id == 1) {
        room.visible = !room.booked;
      } else {
        room.visible = true;
      }
    });


    vm.roomAvailabel = !!_.find(vm.rooms, {'visible': true});
  }

  function book(room) {
    if (!room.booked) {
      Rooms.book(room);
    }
  }

  function selectAll() {
    vm.filterSelected = vm.filter[2];
    updateFilter();
  }

  function nbRoom() {
    return Rooms.nbRoom();
  }

  $scope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function (event, pluginResult) {
    var beaconFound;
    //_.forEach(vm.rooms, function (room) {
    //  room.distance = null;
    //});
    _.forEach(pluginResult.beacons, function (beacon) {
      var id = beacon.uuid + ":" + beacon.major + ":" + beacon.minor;
      beaconFound = _.find(vm.rooms, {beaconId: id});
      if (beaconFound) {
        $timeout(function () {
          beaconFound.distance = beacon.accuracy !== -1 ? Math.round(beacon.accuracy) : null;
        }, 0)

      }
    });

    $timeout(function () {
      updateFilter();
    })
  });
}


