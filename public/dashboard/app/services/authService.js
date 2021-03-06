define(['app'], function (app) {
  app.factory('ahDashboardAuthService', function ($http, $q, ahDashboardSession) {
    var ahDashboardAuthService = {};
   
    ahDashboardAuthService.login = function (credentials) {
      return $http
        .post('/api/login', credentials)
        .then(function (res) {
          ahDashboardSession.create(res.data.username, res.data.firstName, res.data.lastName, res.data.email, res.data.fingerprint);
        });
    };
  
    ahDashboardAuthService.logout = function () {
      return $http
        .get('/api/logout')
        .then(function (res) {
          ahDashboardSession.destroy();
        });
    };

    ahDashboardAuthService.isAuthenticated = function () {
      var deferred = $q.defer();
      if(ahDashboardSession.username){
        deferred.resolve();
      } else {
        $http
          .get('/api/currentUser')
          .then(function (res) {
            ahDashboardSession.create(res.data.username, res.data.firstName, res.data.lastName, res.data.email, res.data.fingerprint);
            ahDashboardSession.authChecking = false;
            deferred.resolve();
          }, function(){
            ahDashboardSession.authChecking = false;
            deferred.reject();
          });
      }
      return deferred.promise;
    };
   
    return ahDashboardAuthService;
  });
});