var registerCtrl = function ($scope, membershipService, $rootScope, $location) {
    //$rootScope.show_error = true;
    $scope.register = register;
    $scope.user = {};
    function register() {
        membershipService.register($scope.user)
        .success(function (data) {
            if (data.success) {
                //console.log(data.success);
                membershipService.saveCredentials($scope.user);
                $scope.userData.displayUserInfo();
                $location.path('/');
            }
            else {
                alert("Đăng ký thất bại..");
            }
        })
        .error(function () {
            alert("Đăng ký thất bại..");
        });
    }
};
registerCtrl.$inject = ['$scope', 'membershipService', '$rootScope', '$location'];