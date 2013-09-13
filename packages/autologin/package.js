Package.describe({
  summary: 'Autologin with token'
});

var everywhere = ['server', 'client'];

Package.on_use(function (api) {
  api.use(['accounts-base', 'request-data', 'deps'], everywhere);
  api.add_files('server.js', 'server');
  api.add_files('client.js', 'client');
});