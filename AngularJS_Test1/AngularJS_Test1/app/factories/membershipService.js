var membershipService = function ( $http, $base64, $cookieStore, $rootScope) {

    var service = {
        login: login,
        register: register,
        saveCredentials: saveCredentials,
        removeCredentials: removeCredentials,
        isUserLoggedIn: isUserLoggedIn
    };
    function login(user) {
        return $http.post('/api/account/login', user);
    }
    function register(user, completed) {
        return $http.post('/api/account/register', user);
    }

    function saveCredentials(user) {
        var membershipData = $base64.encode(user.Username + ':' + user.Password);

        console.log(user.Username);

        $rootScope.repository = {
            loggedUser: {
                username: user.Username,
                authdata: membershipData
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + membershipData;
        $cookieStore.put('repository', $rootScope.repository);
        console.log('--------repository---------')
        console.log($rootScope.repository);
    }
    function removeCredentials() {
        $rootScope.repository = {};
        $cookieStore.remove('repository');
        $http.defaults.headers.common.Authorization = '';
        console.log('--------repository---------')
        console.log($rootScope.repository);
    };
    function isUserLoggedIn() {
        return $rootScope.repository.loggedUser != null;
    }

    return service;
}


membershipService.$inject = ['$http', '$base64', '$cookieStore', '$rootScope'];
