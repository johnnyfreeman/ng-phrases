// allows user to login with their provider id
Meteor.autologin = function(id, callback) {
  return Accounts.callLoginMethod({
    methodArguments: [{autologin: id}],
    userCallback: callback
  });
};

var alid = RequestData.get('alid');

// if autologin param passed
// do autologin 
if (alid) {
  Meteor.startup(function() {
    Deps.autorun(function(autorun) {
      var user = Meteor.user();

      // if autologinid doesn't matched logged in user, logout
      if (user) {
        if (user.profile.autologinId !== alid) {
          Meteor.logout();
        }
      }

      // if user is not logged in, do autologin
      if (!user) {
        Meteor.autologin(alid, function(error) {
          if (error) Notifications.insert({iconClass:'icon-warning-sign',message:error.message, type: 'danger', timeout: 0, closeBtn: true});
          // error or not, stop the subscription
          autorun.stop();
        });
      }
    });
  });
}