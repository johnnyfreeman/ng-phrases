Package.describe({
	summary: "Send app data to NextGen"
});

Npm.depends({
  'connect': '2.7.10'
});

Package.on_use(function (api){
	api.use('webapp', 'server');
	api.add_files('send-to-nextgen.js', 'server');
});