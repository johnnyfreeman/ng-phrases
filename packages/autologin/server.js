// login with autologin id
Accounts.registerLoginHandler(function (options) {

  // if not autologin, don't handle
  if (!options.autologin)
    return undefined;

  // search for user by autologin id
  var user = Meteor.users.findOne({'profile.autologinId': options.autologin});
  if (!user)
    throw new Meteor.Error(403, "The autologin id '"+options.autologin+"' has not been tethered to an account yet");

  // add token to user account
  var stampedLoginToken = Accounts._generateStampedLoginToken();
  Meteor.users.update(user._id, {
    $push: {'services.resume.loginTokens': Accounts._hashStampedToken(stampedLoginToken)}
  });

  // return account info
  return {
    token: stampedLoginToken.token,
    userId: user._id
  };

});
