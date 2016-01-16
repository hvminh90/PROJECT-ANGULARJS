var TinTucFactory = function ($http) {
    var tinTucFactory = {};
    var urlBase = 'api/TinTuc';

    tinTucFactory.getTinTucs = function () {
        return $http.get(urlBase);
    };

    tinTucFactory.getTinTuc = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    tinTucFactory.insertTinTuc = function (tintuc) {
        return $http.post(urlBase, tintuc);
    };

    tinTucFactory.updateTinTuc = function (tintuc) {
        return $http.put(urlBase + '/' + tintuc.TinTucId, tintuc);
    };

    tinTucFactory.deleteTinTuc = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    tinTucFactory.getTinTucByTheLoaiId = function (id) {
        return $http.get(urlBase + '/getTinTuc-' + id);
    };
    return tinTucFactory;
}

TinTucFactory.$inject = ['$http'];