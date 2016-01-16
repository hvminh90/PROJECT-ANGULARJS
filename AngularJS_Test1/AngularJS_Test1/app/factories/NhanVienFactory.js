var NhanVienFactory = function ($http) {

    var nhanVienFactory = {};
    var urlBase = 'api/NhanVien';

    nhanVienFactory.getNhanViens = function () {
        return $http.get(urlBase);
    };

    nhanVienFactory.getNhanVien = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    nhanVienFactory.insertNhanVien = function (nhanvien) {
        return $http.post(urlBase, nhanvien);
    };

    nhanVienFactory.putNhanVien = function (nhanvien) {
        return $http.put(urlBase + '/' + nhanvien.ID, nhanvien);
    };

    nhanVienFactory.deleteNhanVien = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return nhanVienFactory;
}
NhanVienFactory.$inject = ['$http'];