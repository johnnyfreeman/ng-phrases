Package.describe({
  summary: 'Autologin with token'
});

var everywhere = ['server', 'client'];

Package.on_use(function (api) {
  api.use(['accounts-base', 'request-data'], everywhere);
  api.add_files('autologin.js', everywhere);
});