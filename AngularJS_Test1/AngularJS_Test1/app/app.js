/// <reference path="templates/view/v_Info.html" />
var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap']);
myApp.controller('LoadPageCtr', LoadPageCtr);
myApp.controller('NhanVienCtr', NhanVienCtr);
myApp.controller('ErrorCtr', ErrorCtr);
myApp.controller('TheLoaiCtr', TheLoaiCtr);
myApp.controller('TinTucCtr', TinTucCtr);


myApp.factory('NhanVienFactory', NhanVienFactory);
myApp.factory('Interceptor', Interceptor);
myApp.factory('TheLoaiFactory', TheLoaiFactory);
myApp.factory('TinTucFactory', TinTucFactory);


var configFunction = function ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider) {

    //$locationProvider.hashPrefix('!').html5Mode(true);
    //$urlRouterProvider.otherwise('/home');

    //$urlRouterProvider.when("", "/home");
    //$urlRouterProvider.when("/", "/home");

    //// For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/templates/partial/p_info.html',
            controller: 'LoadPageCtr',
            onEnter: function () {
                console.log("enter home");
            }
        })
    .state('about', {
        url: '/about',
        templateUrl: 'app/templates/view/v_About.html'

    })
    .state('404', {
        url: '/404',
        templateUrl: 'app/templates/view/v_404.html',
        controller: 'ErrorCtr'

    })
    .state('nhanvien', {
        url: '/nhan-vien',
        templateUrl: 'app/templates/view/v_NhanVien.html',
        controller: 'NhanVienCtr'

    })
    .state('tintuc', {
        url: '/tintuc',

        views: {
            "": {
                templateUrl: 'app/templates/view/v_TinTuc.html',
                controller: TheLoaiCtr
            },

            '@tintuc': {
                templateUrl: 'app/templates/view/v_alltintuc.html',
                controller: TinTucCtr
                //controller: function ($scope, TinTucFactory) {
                //    TinTucFactory.getTinTucs()
                //   .success(function (data) {
                //       $scope.AllTinTuc = data;
                //       console.log('All tin tức: ' + data);
                //   })
                //   .error(function () { });
                //}
            }

        }

    })
    .state('tintuc.theloai', {
        url: '^/the-loai-:id',
        templateUrl: 'app/templates/view/v_Index.html',
        controller: TinTucCtr,
        //controller: function ($sope, $stateParams, TinTucFactory) {
        //        TinTucFactory.getTinTucByTheLoaiId($stateParams.id)
        //        .success(function (data) {
        //            $scope.TinTucs = data;
        //            console.log(data)
        //            console.log('The loai: ' + id);
        //        })
        //        .error(function () {
        //            alert('lỗi hàm getTinTucByTheLoaiId()');
        //        });
        //},
        onEnter: function () {
            console.log("enter the loai");
        }
    })
    .state('tintuc.chitiet', {
        url: '/tin-tuc-noi-bat-:tintucid',
        views: {
            '@tintuc': {
                templateUrl: 'app/templates/partial/p_DetailTinTuc.html',
                controller: TinTucCtr

            }
        },

        onEnter: function ($stateParams) {
            console.log("enter tin tuc nổi bật:  " + $stateParams.tintucid);
        }

    })
    .state('tintuc.theloai.chitiettintuc', {
        url: '/tin-tuc-:tintucid',
        views: {
            '@tintuc': {
                templateUrl: 'app/templates/partial/p_DetailTinTuc.html',
                controller: TinTucCtr

            }
        },

        onEnter: function ($stateParams) {
            console.log("enter tin tuc detail:  " + $stateParams.tintucid);
        }
    })
    .state('qltheloai', {
        url: '/ql-theloai',
        templateUrl: 'app/templates/view/v_QL_TheLoai.html',
        controller: TheLoaiCtr
    })
    .state('qltintuc', {
        url: '/ql-tintuc',
        templateUrl: 'app/templates/view/v_QL_TinTuc.html',
        controller:TinTucCtr
    });

    $httpProvider.interceptors.push('Interceptor');

}


configFunction.$inject = ['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider'];
myApp.config(configFunction);