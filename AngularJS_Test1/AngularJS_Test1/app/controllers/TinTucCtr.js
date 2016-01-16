var TinTucCtr = function ($scope, TinTucFactory,TheLoaiFactory, $stateParams) {
    console.log('Load tin tức controller...')
    $scope.TheLoaiId = $stateParams.id;
    $scope.TinTucId = $stateParams.tintucid;

    //Tham số cho TinTucController
    $scope.FilterChecked = true;
    $scope.showThemTinTuc = false;
    $scope.TenTheLoaiTinTuc = "";
    $scope.TheLoais = null;
    $scope.TinTuc = null;

    getTheLoais();
    function getTheLoais() {
        TheLoaiFactory.getTheLoais()
        .success(function (data) {
            $scope.TheLoais = data;
            console.log('All thể loại: ' + data);
        })
        .error(function (error) {
            alert('Lỗi load thể loại....')
        });
    }


    $scope.TinTucs;
    $scope.TenTheLoai;
    $scope.AllTinTuc = null;

    getAllTinTuc();
    
    function getTinTucByTheLoaiId(id) {
        TinTucFactory.getTinTucByTheLoaiId(id)
        .success(function (data) {
            $scope.TinTucs = data;
            console.log(data)
            console.log('The loai: ' + id);
        })
        .error(function () {
            alert('lỗi hàm getTinTucByTheLoaiId()');
        });
    };

    function getAllTinTuc() {
        TinTucFactory.getTinTucs()
        .success(function (data) {
            $scope.AllTinTuc = data;
            console.log('All tin tức: '+data);
        })
        .error(function () { });
    };

    
    function getChiTietTinTuc(tintucid) {
        TinTucFactory.getTinTuc(tintucid)
        .success(function (data) {
            $scope.TinTuc = data;
            console.log('Đây là tin tức: ' + data)
        })
        .error(function () {
            alert('Lỗi hàm getChiTietTinTuc()');
        });
    }

    if ($stateParams.tintucid && $stateParams.tintucid != "") {
        getChiTietTinTuc($scope.TinTucId);
    };
    if ($stateParams.id && $stateParams.id != "") {
        getTinTucByTheLoaiId($scope.TheLoaiId);
    }

    //if (!$stateParams.tintucid && !$stateParams.id) {
    //    //console.log('Load all : ' + $scope.TheLoaiId);
    //    //getAllTinTuc();
    //};

    //console.log($scope.TinTuc.NoiDung);
    //$scope.gettentheloai = function (id) {
    //    var arrTheLoai = $scope.TheLoais;

    //    console.log("Lấy tên thể loại....");
    //    console.log(arrTheLoai);
    //    console.log(id);
    //    if (arrTheLoai.length > 0)
    //    {
    //        for (var i = 0; i < arrTheLoai.length; i++) {
    //            console.log('for ' + i);
    //            if (arrTheLoai[i].TheLoaiId == id) {
    //                $scope.TenTheLoai = arrTheLoai[i].TenTheLoai;
    //                console.log(arrTheLoai[i].TenTheLoai);
    //                break;
    //            }
    //        }
    //    }
        
    //};

    $scope.themtintuc = function () {
        $scope.showThemTinTuc = !$scope.showThemTinTuc;
    }

    $scope.cancelSave = function () {
        $scope.showThemTinTuc = !$scope.showThemTinTuc;
        $scope.TinTuc = null;
    }

}

TinTucCtr.$inject = ['$scope', 'TinTucFactory', 'TheLoaiFactory', '$stateParams']