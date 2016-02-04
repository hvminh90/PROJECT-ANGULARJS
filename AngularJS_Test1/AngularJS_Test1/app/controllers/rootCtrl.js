var rootCtrl = function ($scope, $location, membershipService, $rootScope) {

    $scope.userData = {};

    $scope.userData.displayUserInfo = displayUserInfo;
    $scope.logout = logout;
   

    function displayUserInfo() {
        $scope.userData.isUserLoggedIn = membershipService.isUserLoggedIn();
        if ($scope.userData.isUserLoggedIn) {
            $scope.username = $rootScope.repository.loggedUser.username;
        }
        else $scope.username = null;
       // console.log($scope.userData.isUserLoggedIn + ' đã log');
       
    }

    function logout() {
        membershipService.removeCredentials();
        $location.path('#/');
        $scope.userData.displayUserInfo();
    }
    $scope.userData.displayUserInfo();

    //$rootScope.idTheLoai = 2;
    //console.log($rootScope.idTheLoai);
    //$scope.ResetSelected = function () {
    //    $scope.selected = -1;
    //    console.log("Reset: " + $scope.selected);
    //};
}
rootCtrl.$inject = ['$scope', '$location', 'membershipService', '$rootScope'];
