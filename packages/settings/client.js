
// settings loaded flag
Session.setDefault('settingsLoaded', false);

// subscibe to settings and set flag
Meteor.subscribe('settings', function() {
  Session.set('settingsLoaded', true);
});


_settingsCursor = null;
settings = function() {
  if (_settingsCursor === null) {
    _settingsCursor = Settings.findOne({$or: [{userId:Meteor.userId()}, {userId:'default'}]})
  };

  return _settingsCursor;
};

// get individual setting
getSetting = function(key) {
  return Session.get('settingsLoaded') ? settings()[key] : undefined;
};

// set new value for a specific setting
setSetting = function(key, value) {
  if (!Session.get('settingsLoaded'))
    return;

  var data = {};
  data[key] = value;
  // console.log('updating settings with...', data);
  
  // get default settings
  var defaultSettings = Settings.findOne({userId:'default'});
  delete defaultSettings._id;
  delete defaultSettings.userId;

  // get user settings
  var userSettings = settings();
  userSettings[key] = value;
  delete userSettings._id;
  delete userSettings.userId;
  
  // if currently using defaults AND new settings are not equal to the defaults
  if (settings().userId === 'default' && JSON.stringify(userSettings) !== JSON.stringify(defaultSettings))
    Settings.insert(_.extend(userSettings, {userId:Meteor.userId()}));
  // if NOT currently using defaults AND new settings are not equal to the defaults
  else if (JSON.stringify(userSettings) !== JSON.stringify(defaultSettings))
    Settings.update(settings()._id, {$set: data});
  // if NOT currently using defaults AND new settings are equal to the defaults
  else
    Settings.remove(settings()._id);
};