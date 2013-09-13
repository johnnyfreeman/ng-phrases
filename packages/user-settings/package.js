Package.describe({
  summary: 'User Settings'
});

var everywhere = ['server', 'client'];

Package.on_use(function (api){
  api.use(['deps','session','livedata','mongo-livedata'], everywhere);
  api.add_files('server.js', 'server');
  api.add_files('client.js', 'client');
  api.export('Settings', everywhere);
});