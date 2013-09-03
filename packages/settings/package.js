Package.describe({
	summary: "Handles User Settings"
});

Package.on_use(function (api){
	// api.use('webapp', 'server');
	// api.use('accounts-base', 'server');
  api.add_files('client.js', 'client');
	api.add_files('server.js', 'server');

  if(api.export)
    api.export(['getSetting', 'setSetting']);
});