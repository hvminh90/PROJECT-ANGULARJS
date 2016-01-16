var ErrorCtr = function ($scope,$rootScope) {
    //$scope.models = {
    //    helloAngular: '...'
    //};
    $scope.message = 'Page Not Found!';
    $rootScope.show_error = true;
    console.log("page ErrorCtr");
    console.log($rootScope.show_error);
};
ErrorCtr.$inject = ['$scope', '$rootScope'];