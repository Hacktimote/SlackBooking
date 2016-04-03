'use strict';

var slackModule = (function() {

    var check = function() {
        console.log('check function');
    }

var get = function() {
    console.log('get function');
}

    return {
        check: check,
        get: get
    }
})();
