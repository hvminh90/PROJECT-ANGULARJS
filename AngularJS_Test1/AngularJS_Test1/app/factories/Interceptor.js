 var Interceptor = function ($q, $location) {
    return {
        response: function (responseData) {
            return responseData;
        },
        responseError: function error(response) {
            switch (response.status) {
                case 401:
                    $location.path('/login');
                    break;
                case 404:
                    $location.path('/404');
                    break;
                default:
                    $location.path('/error');
            }

            return $q.reject(response);
        }
    };
}

Interceptor.$inject = ['$q', '$location'];