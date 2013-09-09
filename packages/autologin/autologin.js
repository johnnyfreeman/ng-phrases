if (Meteor.isServer) {
  // login with autologin id
  Accounts.registerLoginHandler(function (options) {

    // if not autologin, don't handle
    if (!options.autologin)
      return undefined;

    // search for user by autologin id
    var user = Meteor.users.findOne({profile: { autologinId: options.autologin}});
    if (!user)
      throw new Meteor.Error(403, "The autologin id '"+options.autologin+"' has not been tethered to an account yet");

    // add token to user account
    var stampedLoginToken = Accounts._generateStampedLoginToken();
    Meteor.users.update(user._id, {$push: {'services.resume.loginTokens': stampedLoginToken}});

    // return account info
    return {
      token: stampedLoginToken.token, 
      id: user._id
    };

  });
}


if (Meteor.isClient) {
  // allows user to login with their provider id
  Meteor.autologin = function(id, callback) {
    return Accounts.callLoginMethod({
      methodArguments: [{autologin: id}],
      userCallback: callback
    });
  };

  var alid = RequestData.get('alid');

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
}
