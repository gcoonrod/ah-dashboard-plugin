var os  = require('os-utils');
var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'getCPUusage';
action.description = 'I will return the current cpu usage';
action.inputs = {};
action.blockedConnectionTypes = [];
action.outputExample = {
};
action.global = true;

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next){
  // Check authentication for current Request
  api.ahDashboard.session.checkAuth(connection, function(session){
    os.cpuUsage(function(usage){
      connection.response.cpuusage = usage;
      next(connection, true);
    });
  }, next);
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;
