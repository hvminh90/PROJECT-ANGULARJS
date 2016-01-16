var NhanVienCtr = function ($scope, NhanVienFactory) {

    console.log("Nhan vien Controller initialized");
    $scope.status;
    $scope.NhanViens;
    $scope.show = false;
    $scope.objNhanVien;
    getNhanViens();

    self.alertEditSuccess = function () {
        $(".alert-message").removeClass('hide');
        $(".alert-message").alert();
        window.setTimeout(function() { $(".alert-message").addClass('hide').fadeOut(); }, 1000);
    }

    function getNhanViens() {
        NhanVienFactory.getNhanViens()
        .success(function (data) {
            $scope.NhanViens = data;
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }

    function updateNhanVien(nhanvien) {

        //var nhanVien = this.NhanVien;
        console.log(nhanvien);
        NhanVienFactory.putNhanVien(nhanvien)
        .success(function () {
            $scope.status = 'Updated Customer! Refreshing customer list.';
            $scope.show = !$scope.show;
            $scope.HoTen = '';
            $scope.Email = '';
            $scope.DiaChi = '';
            $scope.SoDienThoai = '';
            $scope.ID = '';
            getNhanViens();
            alertEditSuccess();
        })
        .error(function (error) {
            $scope.status = 'Unable to update customer: ' + error.message;
        });
    }

    function insertNhanVien() {
        var nhanVien = {
            ID: $scope.ID == '' ? '0' : $scope.ID,
            HoTen: $scope.HoTen,
            Email: $scope.Email,
            DiaChi: $scope.DiaChi,
            SoDienThoai: $scope.SoDienThoai
        };

        console.log($scope.ID);
        console.log('Insert nhan vien.....')
        NhanVienFactory.insertNhanVien(nhanVien)
        .success(function () {
            $scope.status = 'Inserted Customer! Refreshing customer list.';
            //$scope.NhanViens.put(nhanVien);
            $scope.show = !$scope.show;
            $scope.HoTen = '';
            $scope.Email = '';
            $scope.DiaChi = '';
            $scope.SoDienThoai = '';
            $scope.ID = '';
            getNhanViens();
        })
        .error(function (error) {
            $scope.status = 'Unable to insert customer: ' + error.message;
        });
    }

    $scope.deleteNhanVien = function (id) {
        bootbox.confirm("Are you sure want to delete?", function (result) {
            if (result) {
                NhanVienFactory.deleteNhanVien(id)
                .success(function () {
                    $scope.status = 'Deleted Customer! Refreshing customer list.';
                    getNhanViens();
                })
                .error(function (error) {
                    $scope.status = 'Unable to delete customer: ' + error.message;
                });
            }
        });//.find("div.modal-dialog").addClass("modal-dialog-xoa");

    }

    $scope.themnhanvien = function () {
        $scope.show = true;
        //console.log('Add nhan vien');
        $scope.HoTen = '';
        $scope.Email = '';
        $scope.DiaChi = '';
        $scope.SoDienThoai = '';
        $scope.ID = '';
        //$scope.show = !$scope.show;
    }

    $scope.cancelSave = function () {
        $scope.HoTen = '';
        $scope.Email = '';
        $scope.DiaChi = '';
        $scope.SoDienThoai = '';
        $scope.ID = '';
        $scope.show = !$scope.show;
    }

    $scope.editNhanVien = function (id) {
        console.log(id);

        console.log('Edit nhan vien');
        if ($scope.show == false) {
            $scope.show = true;
        }
        NhanVienFactory.getNhanVien(id)
        .success(function (data) {
            console.log(data);
            //$scope.show = !$scope.show;
            $scope.HoTen = data.HoTen;
            $scope.Email = data.Email;
            $scope.DiaChi = data.DiaChi;
            $scope.SoDienThoai = data.SoDienThoai;
            $scope.ID = data.ID;
            //$scope.objNhanVien = data;
        })
        .error(function (error) {
            $scope.status = 'Error load nhân viên: ' + error.message;
            //console.log('error');
            //$location.url('/404');
        });

    }

    $scope.InsUpdNhanVien = function () {
        if ($scope.ID != '' && $scope.ID != '0') {
            console.log('Update 1 . 2. 3');
            console.log($scope.ID);
            var nhanvienEdit = {
                ID: $scope.ID,
                HoTen: $scope.HoTen,
                Email: $scope.Email,
                DiaChi: $scope.DiaChi,
                SoDienThoai: $scope.SoDienThoai
            }
            updateNhanVien(nhanvienEdit);
        }
        else {
            //console.log('Insert 1 . 2. 3');
            insertNhanVien();
        }
    }

}

NhanVienCtr.$inject = ['$scope', 'NhanVienFactory'];