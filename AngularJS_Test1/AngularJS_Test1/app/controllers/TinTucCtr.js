﻿var TinTucCtr = function ($scope, TinTucFactory, TheLoaiFactory, $stateParams, $sce, $rootScope, $http, FileUploadService) {

    console.log('Load tin tức controller...')

    //================================= Tham số tin tức =============================================
    $scope.TheLoaiId = $stateParams.id;
    $scope.TinTucId = $stateParams.tintucid;
    $scope.TinTucs;
    $scope.TenTheLoai;
    $scope.AllTinTuc = null;

    $scope.FilterChecked = true;
    $scope.showThemTinTuc = false;
    $scope.TenTheLoaiTinTuc = "";
    $scope.TheLoais = null;
    $scope.TinTuc = {};
    //===============================================================================================


    //===================== Phân trang quản lý tin tức ==============================================
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.LoadTinTucPhanTrang = function () {
        TinTucFactory.getTinTucs()
        .success(function (data) {
            $scope.AllTinTuc = data;
            //console.log('Load tin tức phân trang: ' + data);
            $scope.pagedItems = data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.pagedItems.length; //Initially for no filter 

        })
        .error(function () { });
    }
    //===============================================================================================


    //===================================== Load tin tức theo thể loại===============================
    $scope.LoaTheLoaiTinTuc = function () {
        TheLoaiFactory.getTheLoais()
        .success(function (data) {
            $scope.TheLoais = data;
            //console.log('Load Thể loại của TinTucCtr: ' + data);
        })
        .error(function (error) {
            //alert('Lỗi load thể loại....')
        });
    }

    function LoadTenTheLoai(id) {
        TheLoaiFactory.getTheLoai(id)
       .success(function (data) {
           $scope.TenTheLoai = data.TenTheLoai;
       })
       .error(function (error) {
           //alert('Lỗi load thể loại....')
       });
    }

    function getTinTucByTheLoaiId(id) {
        TinTucFactory.getTinTucByTheLoaiId(id)
        .success(function (data) {
            $scope.TinTucs = data;
            //console.log(data)
            //console.log('The loai: ' + id);
            LoadTenTheLoai(id);
            $scope.TheLoaiIDActive = data.TheLoaiId;
        })
        .error(function () {
            //alert('lỗi hàm getTinTucByTheLoaiId()');
        });
    };

    $scope.LoadAllTinTuc = function () {
        TinTucFactory.getTinTucs()
        .success(function (data) {
            $scope.AllTinTuc = data;
            //console.log('All tin tức của all tin tức: ' + data);

        })
        .error(function () { });
    }


    function getChiTietTinTuc(tintucid) {
        TinTucFactory.getTinTuc(tintucid)
        .success(function (data) {
            $scope.TinTuc = data;
            $scope.TinTuc.NoiDung = $sce.trustAsHtml(data.NoiDung);
            //console.log('Đây là tin tức: ' + data)

        })
        .error(function () {
            //alert('Lỗi hàm getChiTietTinTuc()');
        });
    }

    if ($stateParams.tintucid && $stateParams.tintucid != "") {
        getChiTietTinTuc($scope.TinTucId);
    };
    if ($stateParams.id && $stateParams.id != "") {
        getTinTucByTheLoaiId($scope.TheLoaiId);
    }
    //============================================================================================


    //============================= Quản lý Thêm xóa sửa tin tức==================================
    $scope.themtintuc = function () {
        $scope.showThemTinTuc = !$scope.showThemTinTuc;
        $scope.TinTuc = {
            TinTucId: 0,
            TheLoaiId: '',
            TieuDe: '',
            NoiDung: '',
            GhiChu: '',
            NgayTao: Date.now,
            NgaySua: Date.now,
            IsActive: true,
            IsDelete: false,
            IsPublic: true
        };
        $scope.photo = null;
    }

    //Upload file
    $scope.no_image = null;
    $scope.fileUpload = null;
    $scope.SelectedFileForUpload = null;
    $scope.Message = '';

    $scope.CheckFile = false;
    $scope.file_changed = function (file) {
       
        $scope.$apply(function (scope) {
            $scope.CheckFile = true;
            var photofile = file.files[0];
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#file_tieude')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(150);
            };

            reader.readAsDataURL(photofile);
            $scope.fileUpload = photofile;
            $scope.SelectedFileForUpload = photofile;
        });


    };

    function SaveFile() {
        $scope.Message = "";
        console.log('Save file ....');
        console.log($scope.SelectedFileForUpload);
        FileUploadService.UploadFile($scope.SelectedFileForUpload, 'abc').then(function (d) {
            //alert('123');
            
        }, function (e) {
            alert('lỗi');
        });

    };

    $scope.XoaAnh = function () {
        ClearAnh();
    };

    function ClearAnh() {
        $scope.no_image = null;
        $("#file_tieude_select").val('');
        $("#file_tieude").attr('src', null);
        $scope.CheckFile = false;
        $scope.fileUpload = null;
    }

    //end upload file

    $scope.cancelSave = function () {
        $scope.showThemTinTuc = !$scope.showThemTinTuc;
        $scope.TinTuc = null;
    }
    $scope.editTinTuc = function (tintuc) {
        $scope.TinTuc = tintuc;
        if ($scope.showThemTinTuc == false)
            $scope.showThemTinTuc = true;

        $("#file_tieude_select").val('');
        $("#file_tieude").attr('src', null);
        $scope.CheckFile = false;
        console.log(tintuc);
    }


    $scope.InsUpdTinTuc = function (tintuc) {
        if (tintuc.TinTucId != 0 && tintuc.TinTucId != '') {
            console.log(tintuc.NoiDung);

            SaveFile();

            //console.log('Cập nhật tin tức.....');
            TinTucFactory.updateTinTuc(tintuc)
            .success(function (data) {
                console.log(data);
                $scope.showThemTinTuc = !$scope.showThemTinTuc;
                $scope.LoadTinTucPhanTrang();
                $scope.TinTuc = null;
            })
            .error(function () {
                //alert('Lỗi cập nhật tin tức....')
            })
        }
        else {
            //console.log('Thêm mới tin tức.....')
            TinTucFactory.insertTinTuc(tintuc)
            .success(function (data) {
                console.log(data);
                $scope.showThemTinTuc = !$scope.showThemTinTuc;
                $scope.LoadTinTucPhanTrang();
                $scope.TinTuc = null;
            })
            .error(function () {
                //alert('Lỗi thêm mới tin tức....')
            })
        }
    }

    $scope.ckContent1 = 'test1';
    $scope.ckContent2 = 'test2';
    $scope.setData = function () {
        $scope.ckContent1 += 'test1';
        $scope.ckContent2 += 'test2';
    }

    $scope.editorOptions = {
        language: 'vi',
        'skin': 'office2013',
        'extraPlugins': "imagebrowser,insertpre,sourcedialog,font",
        //imageBrowser_listUrl: "ImageBrowser.aspx",
        //filebrowserBrowseUrl:  "LinkBrowser.aspx",
        //filebrowserImageUploadUrl:  "ImageBrowser.aspx",
        //filebrowserUploadUrl: "LinkBrowser.aspx",

        filebrowserImageBrowseUrl: CKEDITOR.basePath + "ImageBrowser.aspx",
        filebrowserImageWindowWidth: 780,
        filebrowserImageWindowHeight: 720,
        filebrowserBrowseUrl: CKEDITOR.basePath + "LinkBrowser.aspx",
        filebrowserWindowWidth: 500,
        filebrowserWindowHeight: 650,


        toolbarLocation: 'top',
        toolbar: 'full',
        toolbar_full: [
            {
                name: 'basicstyles',
                items: ['Bold', 'Italic', 'Strike', 'Underline', 'Source']
            },
            { name: 'paragraph', items: ['BulletedList', 'NumberedList', 'Blockquote'] },
            { name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
            { name: 'tools', items: ['SpellChecker', 'Maximize'] },
            { name: 'clipboard', items: ['Undo', 'Redo'] },
            { name: 'styles', items: ['Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat', 'Font'] },
            { name: 'insert', items: ['Image', 'Table', 'SpecialChar'] }, '/',
        ]
    };
    //=============================================================================================================================
}

TinTucCtr.$inject = ['$scope', 'TinTucFactory', 'TheLoaiFactory', '$stateParams', '$sce', '$rootScope', '$http', 'FileUploadService']