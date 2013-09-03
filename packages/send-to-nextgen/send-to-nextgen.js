var connect = Npm.require('connect');
var GET = {}, POST = {};

WebApp.connectHandlers
  // parse the POST data
  .use(connect.bodyParser())
  // parse the GET data
  .use(connect.query())
  // intercept data and send continue
  .use(function(req, res, next) {
    POST = req.body;
    GET = req.query;

    // if phrase(s) have been POSTED, send them to NextGen
    if (POST.hasOwnProperty('phrases')) {
      res.end('<!doctype html><html><head><meta http-equiv="X-UA-Compatible" content="ie=edge"></head><body><input name="result" type="hidden" value="'+POST.phrases.join("\n\n")+'"></body></html>');
      return;
    }

    // otherwise continue to app
    return next();
  });


// Meteor.startup(function () {
//   if (GET.hasOwnProperty('cpid') && Meteor.userId() === null) {
//     console.log('logging in...');
//     Meteor.loginWithProviderId(GET.cpid, function(error) {
//       console.log(error);
//     });
//   };
// });

// login with provider id
Accounts.registerLoginHandler(function (options) {

  // if not autologin, don't handle
  if (!options.autologin)
    return undefined;

  // search for user by provider id
  var user = Meteor.users.findOne({profile: { autologinId: GET.alid}});
  if (!user)
    throw new Meteor.Error(403, "The autologin id '"+GET.alid+"'' has not been tethered to an account yet");

  // add token to user account
  // var stampedLoginToken = Accounts._generateStampedLoginToken();
  // Meteor.users.update(user._id, {$push: {'services.resume.loginTokens': stampedLoginToken}});

  // return account info
  return {
    token: stampedLoginToken.token, 
    id: user._id
  };

});