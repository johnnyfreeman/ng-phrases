var connect = Npm.require('connect');

WebApp.connectHandlers
  // parse the POST data
  .use(connect.bodyParser())
  // parse the GET data
  .use(connect.query())
  // intercept data and send continue
  .use(function(req, res, next) {
    // if phrase(s) have been POSTED, send them to NextGen
    if (req.body.hasOwnProperty('phrases')) {
      res.end('<!doctype html><html><head><meta http-equiv="X-UA-Compatible" content="ie=edge"></head><body><input name="result" type="hidden" value="'+req.body.phrases.join("\n\n")+'"></body></html>');
      return;
    }

    // otherwise continue to app
    return next();
  });