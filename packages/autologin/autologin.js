if (Meteor.isServer) {
  // login with autologin id
  Accounts.registerLoginHandler(function (options) {

    // if not autologin, don't handle
    if (!options.autologin || RequestData.get('alid') === undefined)
      return undefined;

    // search for user by autologin id
    var user = Meteor.users.findOne({profile: { autologinId: RequestData.get('alid')}});
    if (!user)
      throw new Meteor.Error(403, "The autologin id '"+RequestData.get('alid')+"' has not been tethered to an account yet");

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
  Meteor.autologin = function(callback) {
    return Accounts.callLoginMethod({
      methodArguments: [{autologin: true}],
      userCallback: callback
    });
  };

  Deps.autorun(function(autorun) {
    var user = Meteor.user();

    // if autologinid doesn't matched logged in user, logout
    if (user) {
      if (user.profile.autologinId !== RequestData.get('alid')) {
        Meteor.logout();
      }
    }

    // if user is not logged in, do autologin
    if (!user) {
      Meteor.autologin(function(error) { 
        if (error) {
          // use alertify here so that the id 
          // can be selected and copied for diagnosis
          alert(error);
        } 
        autorun.stop();
      });
    }
  });
}
