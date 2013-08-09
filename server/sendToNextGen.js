var connect = Npm.require('connect');
var app = __meteor_bootstrap__.app;

app
  // parse the POST data
  .use(connect.bodyParser())
  // parse the GET data
  .use(connect.query())
  // intercept data and send continue
  .use(function(req, res, next) {
    var post = req.body;
    
    // if phrase(s) have been POSTED, send them to NextGen
    if (post.hasOwnProperty('phrases')) {
      res.end('<!doctype html><html><head><meta http-equiv="X-UA-Compatible" content="ie=edge"></head><body><input name="result" type="hidden" value="'+post.phrases.join("\n\n")+'"></body></html>');
      return;
    }
    
    // otherwise continue to app
    return next();
  });