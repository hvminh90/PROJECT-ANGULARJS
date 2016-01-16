var TheLoaiCtr = function ($scope, TheLoaiFactory) {
    $scope.show = false;
    console.log('Load thể loại controller .....');
    $scope.TheLoais;
    $scope.TheLoai = null;


    self.alertEditSuccess = function () {
        $(".alert-message").removeClass('hide');
        $(".alert-message").alert();
        window.setTimeout(function () { $(".alert-message").addClass('hide').fadeOut(); }, 1000);
    }
    self.alertXoa = function () {
        $(".alert-message-delete").removeClass('hide');
        $(".alert-message-delete").alert();
        window.setTimeout(function () { $(".alert-message-delete").addClass('hide').fadeOut(); }, 1000);
    }

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

    $scope.themtheloai = function () {
        $scope.show = true;
        //$scope.TheLoai = null;
        $scope.TheLoai = {
            TheLoaiId: 0,
            TenTheLoai: '',
            MoTa: '',
            IsActive: false,
            IsDelete: false
        };
    }
    $scope.cancelSave = function () {
        $scope.show = !$scope.show;
        $scope.TheLoai = null;

    }

    $scope.editTheLoai = function (id) {
        if ($scope.show == false)
            $scope.show = true;
        TheLoaiFactory.getTheLoai(id)
        .success(function (data) {
            $scope.TheLoai = data;
            console.log("Lấy thông tin thể loại để chỉnh sửa");
            console.log(data);
        })
        .error(function () {
            alert("Lỗi lấy thông tin thể loại");
        })
    }

    $scope.InsUpdTheLoai = function (theloai) {
        console.log(theloai);
        console.log(theloai.TheLoaiId);
        if (theloai.TheLoaiId != 0) {
            console.log('Cập nhật thể loại...');
            TheLoaiFactory.updateTheLoai(theloai)
            .success(function () {
                $scope.show = !$scope.show;
                $scope.TheLoai = null;
                alertEditSuccess();
                getTheLoais();
            })
            .error(function () {
                alert("Lỗi cập nhật thể loại");
            })

        }
        else {
            console.log("Thêm mới thể loại...");
            TheLoaiFactory.insertTheLoai(theloai)
            .success(function () {
                $scope.show = !$scope.show;
                $scope.TheLoai = null;
                alertEditSuccess();
                getTheLoais();
            })
            .error(function () {
                alert("Lỗi thêm mới thể loại");
            })
        }
    }

    $scope.deleteTheLoai = function (id) {
        bootbox.confirm("Bạn chắc chắn muốn xóa thể loại này?", function (result) {
            if (result) {
                TheLoaiFactory.deleteTheLoai(id)
                .success(function () {
                    getTheLoais();
                    alertXoa();
                })
                .error(function () {
                    alert("Lỗi cmnr -_-");
                });
            }
        });
    }

}

TheLoaiCtr.$inject = ['$scope', 'TheLoaiFactory'];