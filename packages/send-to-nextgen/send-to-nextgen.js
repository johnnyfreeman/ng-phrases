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
      res.end('<!doctype html><html><head><meta http-equiv="X-UA-Compatible" content="ie=edge"></head><body><input name="result" type="hidden" value="'+post.phrases.join("\n\n")+'"></body></html>');
      return;
    }

    // otherwise continue to app
    return next();
  });


Meteor.startup(function () {
  if (GET.hasOwnProperty('cpid') && Meteor.userId() === null) {
    console.log('logging in...');
    Meteor.loginWithProviderId(GET.cpid, function(error) {
      console.log(error);
    });
  };
});