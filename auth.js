// allows user to login with their provider id
Meteor.loginWithProviderId = function(providerId, callback) {
  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [{providerId: providerId}],
    userCallback: callback
  });
};