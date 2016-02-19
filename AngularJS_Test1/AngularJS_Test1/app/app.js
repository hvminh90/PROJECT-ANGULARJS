/// <reference path="templates/partial/p_menu_tintuc.html" />
/// <reference path="templates/partial/p_menu_tintuc.html" />
/// <reference path="templates/view/v_Info.html" />
var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap', 'ngCkeditor', 'ngCookies', 'base64']);
myApp.controller('LoadPageCtr', LoadPageCtr);
myApp.controller('NhanVienCtr', NhanVienCtr);
myApp.controller('ErrorCtr', ErrorCtr);
myApp.controller('TheLoaiCtr', TheLoaiCtr);
myApp.controller('TinTucCtr', TinTucCtr);
myApp.controller('rootCtrl', rootCtrl);
myApp.controller('loginCtrl', loginCtrl);
myApp.controller('registerCtrl', registerCtrl);


myApp.factory('NhanVienFactory', NhanVienFactory);
myApp.factory('Interceptor', Interceptor);
myApp.factory('TheLoaiFactory', TheLoaiFactory);
myApp.factory('TinTucFactory', TinTucFactory);
myApp.factory('membershipService', membershipService);
myApp.factory('FileUploadService', FileUploadService);


myApp.directive('sideBar', sideBar);
myApp.directive('sideBarAdmin', sideBarAdmin);
 
myApp.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
})


var configFunction = function ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider) {
 
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
         .state('401', {
             url: '/401',
             templateUrl: 'app/templates/view/401.html',
             controller: 'ErrorCtr'

         })
    .state('admin.nhanvien', {
        url: '/nhan-vien',
        templateUrl: 'app/templates/view/v_NhanVien.html',
        controller: 'NhanVienCtr'

    })

    .state('tintuc', {
        url: '/tintuc',
        views: {
            "": { templateUrl: 'app/templates/view/v_TinTuc.html' },

            "menu_tintuc@tintuc": {
                templateUrl: 'app/templates/partial/p_menu_tintuc.html',
                controller: TheLoaiCtr
               
            },
            "content_tintuc@tintuc": {
                templateUrl: 'app/templates/view/v_alltintuc.html',
                controller: TinTucCtr
               
            }

        },
        //reloadOnSearch: false,

        //onEnter: function () {
        //    console.log("Load state Tin tức");
        //}
    })
    .state('tintuc.theloai', {
        url: '^/the-loai-:id',
        views: {
            "content_tintuc@tintuc": {
                templateUrl: 'app/templates/view/v_Index.html',
                controller: TinTucCtr
            }
        },

        //onEnter: function () {
        //    console.log("enter the loai");
        //}
    })
    .state('tintuc.menu2', {
        url: '/menu2',
        views: {
            "content_tintuc@tintuc": {
                templateUrl: 'app/templates/view/v_About.html',
                controller: TinTucCtr
            }
        },

        onEnter: function () {
            console.log("enter the loai");
        }
    })
    .state('tintuc.chitiet', {
        url: '/tin-tuc-noi-bat-:tintucid',
        views: {
            'content_tintuc@tintuc': {
                templateUrl: 'app/templates/partial/p_DetailTinTuc.html',
                controller: TinTucCtr
            }
        },

        //onEnter: function ($stateParams) {
        //    console.log("enter tin tuc nổi bật:  " + $stateParams.tintucid);
        //}
    })
    .state('tintuc.theloai.chitiettintuc', {
        url: '/tin-tuc-:tintucid',
        views: {
            'content_tintuc@tintuc': {
                templateUrl: 'app/templates/partial/p_DetailTinTuc.html',
                controller: TinTucCtr
            }
        },

        //onEnter: function ($stateParams) {
        //    console.log("enter tin tuc detail:  " + $stateParams.tintucid);
        //}
    })
    .state('admin.qltheloai', {
        url: '/ql-theloai',
        templateUrl: 'app/templates/view/v_QL_TheLoai.html',
        controller: TheLoaiCtr
    })
    .state('admin.qltintuc', {
        url: '/ql-tintuc',
        views: {
            '@admin': {
                templateUrl: 'app/templates/view/v_QL_TinTuc.html',
                controller: TinTucCtr

            }

        },
    })
    .state('login', {
        url: '/dang-nhap',
        views: {
            '@': {
                templateUrl: 'app/templates/view/login.html',
                controller: loginCtrl

            }
        },
    })
    .state('register', {
        url: '/dang-ky',
        templateUrl: 'app/templates/view/register.html',
        controller: registerCtrl

    })
    .state('admin', {
        url: '/admin-page',
        templateUrl: 'app/templates/view/v_Admin.html',
    });

    $httpProvider.interceptors.push('Interceptor');


}
configFunction.$inject = ['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider'];


function run($rootScope, $location, $cookieStore, $http, $state, membershipService) {
    // handle page refreshes
    $rootScope.repository = $cookieStore.get('repository') || {};
    if ($rootScope.repository.loggedUser) {
        $http.defaults.headers.common['Authorization'] = $rootScope.repository.loggedUser.authdata;
    }



    $rootScope.$on('$stateChangeStart', function (e, toState, toParams
                                                  , fromState, fromParams) {
        var menu = ["admin.qltintuc", "admin.qltheloai", "admin"];
        var isLogin = menu.indexOf(toState.name);

        if (isLogin > -1 && !membershipService.isUserLoggedIn()) {
            e.preventDefault(); // stop current execution
            $rootScope.previousState = $location.path();
            $state.go('login'); // go to login
            return;
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        // $state.href(from, fromParams)

        var menu = ["login", "register"];
        var isChangeState = menu.indexOf(to.name);
        if (isChangeState < 0) {
            $rootScope.previousState = $location.path();
            //console.log("Chuyển state:" + $rootScope.previousState);
        }

    });
    $rootScope.state = $state;
}
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$state', 'membershipService'];

myApp.config(configFunction);
myApp.run(run);
