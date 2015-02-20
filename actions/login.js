var crypto = require('crypto');


exports.userAdd = {
  name: "userAdd",
  description: "userAdd",
  inputs: {
    "email": {
      required: true
    }, 
    "password": {
      required: true
    },
    "firstName": {
      required: true
    },
    "lastName": {
      required: true
    },
    "username": {
      required: true
    }
  },
  blockedConnectionTypes: [],
  outputExample: {},
    global: true,
  run: function(api, connection, next){
    // Check authentication for current Request
    api.ahDashboard.session.checkAuth(connection, function(session){
      if(connection.params.password.length < 6){
        connection.error = "password must be longer than 6 chars";
        next(connection, true);
      }else{
        api.ahDashboard.users.addUser(connection.params.username, connection.params.email, connection.params.password, connection.params.firstName, connection.params.lastName, function(err){
          connection.error = err;
          connection.response.userCreated = true;
          next(connection, true);
        });
      }
    }, next);
  }
};

exports.userEdit = {
  name: "userEdit",
  description: "userEdit",
  inputs: {
    "password": {
      required: true
    },
    "email": {
      required: false
    },
    "firstName": {
      required: false
    },
    "lastName": {
      required: false
    },
    "username": {
      required: true
    }
  },
    global: true,
  blockedConnectionTypes: [],
  outputExample: {},
  run: function(api, connection, next){
    // Check authentication for current Request
    api.ahDashboard.session.checkAuth(connection, function(session){
      api.ahDashboard.users.editUser(connection.params.username, connection.params.email, connection.params.password, connection.params.firstName, connection.params.lastName, function(err){
        connection.error = err;
        connection.response.userUpdated = true;
        next(connection, true);
      });
    }, next);
  }
};

exports.userDelete = {
  name: "userDelete",
  description: "userDelete",
  inputs: {
    "username": {
      required: true
    }
  },
    global: true,
  blockedConnectionTypes: [],
  outputExample: {},
  run: function(api, connection, next){
    // Check authentication for current Request
    api.ahDashboard.session.checkAuth(connection, function(session){
      api.ahDashboard.users.deleteUser(connection.params.username, function(err){
        connection.error = err;
        connection.response.userdeleted = true;
        next(connection, true);
      });
    }, next);
  }
};


exports.currentUser = {
  name: "currentUser",
  description: "currentUser",
  inputs: {},
    global: true,
  blockedConnectionTypes: [],
  outputExample: {},
  run: function(api, connection, next){
    connection.response.auth = false;
    api.ahDashboard.session.checkAuth(connection, function(session){
      api.cache.load(session.cacheKey, function(err, user){
        connection.response.email = user.email;
        connection.response.firstName = user.firstName;
        connection.response.lastName = user.lastName;
        connection.response.accountname = user.accountname;
        connection.response.fingerprint = connection.fingerprint;
        connection.response.auth = true;
        next(connection, true);
      });
    }, function(err){
      next(connection, true);
    });
  }
};

exports.login = {
  name: "login",
  description: "login",
  inputs: {
    "username": {
      required: true
    }, 
    "password": {
      required: true
    }
  },
    global: true,
  blockedConnectionTypes: [],
  outputExample: {},
  run: function(api, connection, next){
    connection.response.auth = false;
    api.ahDashboard.users.login(connection, function(err, user){
      if(err){
        connection.error = err;
        next(connection, true);
      } else {
        connection.response.email = user.email;
        connection.response.firstName = user.firstName;
        connection.response.lastName = user.lastName;
        connection.response.accountname = user.accountname;
        connection.response.fingerprint = connection.fingerprint;
        connection.response.auth = true;
        next(connection, true);
      }
    });
  }
};

exports.getUsers = {
  name: "getUsers",
  description: "getUsers",
  inputs: {},
    global: true,
  blockedConnectionTypes: [],
  outputExample: {},
  run: function(api, connection, next){
    api.ahDashboard.session.checkAuth(connection, function(session){
      api.ahDashboard.users.getUsers(function(err, users){
        if(err){
          connection.error = err;
          next(connection, true);
        } else {
          connection.response.users = users;
          next(connection, true);
        }
      });
    }, next);
  }
};

exports.logout = {
  name: "logout",
  description: "logout",
  inputs: {},
    global: true,
  blockedConnectionTypes: [],
  outputExample: {},
  run: function(api, connection, next){
    connection.response.auth = false;
    api.ahDashboard.session.delete(connection, function(err){
      if(err){
        connection.error = err;
        next(connection, true);
      } else {
        connection.response.logout = true;
        next(connection, true);
      }
    });
  }
};