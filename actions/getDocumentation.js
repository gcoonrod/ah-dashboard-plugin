var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'getDocumentation';
action.description = 'I will return the documentation of the actions';
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
    connection.response.documentation = api.documentation.documentation;
    next(connection, true);
  }, next);
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;
