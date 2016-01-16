var LoadPageCtr = function ($scope, $rootScope) {
    $scope.models = {
        helloAngular:'...'
    };
    $scope.isCollapsed = true;
    console.log("page controller");
    $rootScope.show_error = false;
};
LoadPageCtr.$inject = ['$scope', '$rootScope'];