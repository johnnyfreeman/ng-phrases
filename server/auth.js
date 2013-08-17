// login with provider id
Accounts.registerLoginHandler(function (options) {
  
  // for debugging
  console.log('running custom login handler');

  // if current provider not passed, don't handle
  if (!options.providerId)
    return undefined;

  // search for user by provider id
  var user = Meteor.users.findOne({profile: { providerId: options.providerId}});
  if (!user)
    throw new Meteor.Error(403, "This provider id '"+options.providerId+"'' has not been tethered to an account yet");

  // add token to user account
  var stampedLoginToken = Accounts._generateStampedLoginToken();
  Meteor.users.update(user._id, {$push: {'services.resume.loginTokens': stampedLoginToken}});

  // return account info
  return {token: stampedLoginToken.token, id: user._id};

});

// allow you manually to attach a provider id to an account
// Meteor.users.update('hTQPBvwiK5qtG2ipW', {$set: {providerId: '30F4761C-EF78-49FB-9492-98526A6A5A38'}});
Meteor.users.allow({
  'update': function () {
    return true; 
  }
});
