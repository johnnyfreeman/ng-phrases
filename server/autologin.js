// login with autologin id
Accounts.registerLoginHandler(function (options) {

  // if not autologin, don't handle
  if (!options.autologin || RequestData.get('alid') === undefined)
    return undefined;

  console.log(RequestData.get('alid'), RequestData.get);

  // search for user by autologin id
  var user = Meteor.users.findOne({profile: { autologinId: RequestData.get('alid')}});
  if (!user)
    throw new Meteor.Error(403, "The autologin id '"+RequestData.get('alid')+"' has not been tethered to an account yet");

  // add token to user account
  // var stampedLoginToken = Accounts._generateStampedLoginToken();
  // Meteor.users.update(user._id, {$push: {'services.resume.loginTokens': stampedLoginToken}});

  // return account info
  return {
    // token: stampedLoginToken.token, 
    id: user._id
  };

});