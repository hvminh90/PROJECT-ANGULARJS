var loginCtrl = function ($scope, membershipService, $rootScope, $location) {


    //$rootScope.show_error = true;
    $scope.login = login;
    $scope.user = {};

    function login() {
        membershipService.login($scope.user)
        .success(function (data) {
            if(data.success)
            {
                //console.log($scope.user);
                membershipService.saveCredentials($scope.user);
                $scope.userData.displayUserInfo();
                //console.log("Đăng nhap thanh công:" + $rootScope.previousState);
                if ($rootScope.previousState)
                    $location.path($rootScope.previousState);
                else
                    $location.path('/');
                //$location.path('/');
            }
            else
            {
                alert("Login thất bại!!");
            }
        })
        .error(function () {

        });


    }
}
loginCtrl.$inject = ['$scope', 'membershipService', '$rootScope', '$location'];