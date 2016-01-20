var membershipService = function ($http) {

    var service = {
        login: login,
        register: register,
        saveCredentials: saveCredentials,
        removeCredentials: removeCredentials,
        isUserLoggedIn: isUserLoggedIn
    };

}


TheLoaiFactory.$inject = ['$http', '$base64', '$cookieStore', '$rootScope'];
