var TheLoaiCtr = function ($scope, TheLoaiFactory, $rootScope,$state) {
    $scope.show = false;
    console.log('Load thể loại controller .....');
    $scope.TheLoais;
    $scope.TheLoai = null;

    //Thông báo
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
    //===============================================


    ///Phân trang
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    
    $scope.LoaTheLoai = function() {
       
        TheLoaiFactory.getTheLoais()
        .success(function (data) {
            console.log('All thể loại phân trang: ' + data);
            $scope.pagedItems = data;
            $scope.search = '';
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.pagedItems.length; //Initially for no filter  
            $scope.totalItems = $scope.pagedItems.length;

        })
        .error(function (error) {
            //alert('Lỗi load thể loại....')
        });
    }

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    //=======================================

    $scope.LoadTheLoaiMenu = function () {
        TheLoaiFactory.getTheLoais()
        .success(function (data) {
            $scope.TheLoais = data;
            console.log('Load thể loại menu: ' + data);
            $scope.$state = $state;
          
            $scope.selected = -1;
            console.log('Reset selected: ' + $scope.selected)
        })
        .error(function (error) {
            //alert('Lỗi load thể loại....')
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
            //alert("Lỗi lấy thông tin thể loại");
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
                //getTheLoais();
                $scope.LoaTheLoai();
            })
            .error(function () {
                //alert("Lỗi cập nhật thể loại");
            })

        }
        else {
            console.log("Thêm mới thể loại...");
            TheLoaiFactory.insertTheLoai(theloai)
            .success(function () {
                $scope.show = !$scope.show;
                $scope.TheLoai = null;
                alertEditSuccess();
                //getTheLoais();
                $scope.LoaTheLoai();
            })
            .error(function () {
                //alert("Lỗi thêm mới thể loại");
            })
        }
    }

    $scope.deleteTheLoai = function (id) {
        bootbox.confirm("Bạn chắc chắn muốn xóa thể loại này?", function (result) {
            if (result) {
                TheLoaiFactory.deleteTheLoai(id)
                .success(function () {
                    $scope.LoaTheLoai();
                })
                .error(function () {
                    alert("Lỗi cmnr -_-");
                });
            }
        });
    }


    //$rootScope.idTheLoai = 2;
    //console.log($rootScope.idTheLoai);

    $scope.selected = -1;

    $scope.select = function (index) {
        $scope.selected = index;
        console.log('selected : ' + index);
    };

}

TheLoaiCtr.$inject = ['$scope', 'TheLoaiFactory', '$rootScope','$state'];