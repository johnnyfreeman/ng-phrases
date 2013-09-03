Package.describe({
  summary: 'User Settings'
});

var everywhere = ['server', 'client'];

Package.on_use(function (api){
  api.use(['deps','session','livedata','mongo-livedata'], everywhere);
  api.add_files('user-settings.js', everywhere);
  api.export('Settings', everywhere);
});