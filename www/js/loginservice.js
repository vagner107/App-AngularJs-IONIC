 (function () {
'use strict';

var serviceId = 'loginservice';
angular.module('app').factory(serviceId,
    ['common', loginservice]);

function loginservice(common) {
    var $q = common.$q;

    var service = {
        getLoginData: getLoginData,

    };

    return service;
    function getLoginData(email, password,success) {
        var data;
        if (email === 'test' && password === '12345') {
            data= 1;
        }
        else
            data = null;
        return success(data);
    }

}
})();