// Set up settings collection
Settings = new Meteor.Collection('settings');

// Settings loaded flag
Session.setDefault('settingsLoaded', false);

// Subscibe to settings and set flag
Meteor.subscribe('settings', function() {
  Session.set('settingsLoaded', true);
});

// Get user settings or fallback to defaults
var _settings = function() {
  return Settings.findOne({userId:Meteor.userId()}) || Settings.findOne({userId:'default'});
};

// Get individual setting
Settings.get = function(key) {

  if (!Session.get('settingsLoaded')) {
    return undefined;
  }

  var settings = _settings();

  if (settings === undefined || !settings.hasOwnProperty(key) || !Session.get('settingsLoaded')) {
    return undefined;
  }

  return settings[key];
};

// Set new value for a specific setting
Settings.set = function(key, value) {
  if (!Session.get('settingsLoaded'))
    return;

  var data = {};
  data[key] = value;

  // get default settings
  var defaultSettings = Settings.findOne({userId:'default'});
  delete defaultSettings._id;
  delete defaultSettings.userId;

  // get user settings
  var userSettings = _settings();
  userSettings[key] = value;
  delete userSettings._id;
  delete userSettings.userId;

  // if currently using defaults AND new settings are not equal to the defaults
  if (_settings().userId === 'default' && JSON.stringify(userSettings) !== JSON.stringify(defaultSettings))
    Settings.insert(_.extend(userSettings, {userId:Meteor.userId()}));

  // if NOT currently using defaults AND new settings are not equal to the defaults
  else if (JSON.stringify(userSettings) !== JSON.stringify(defaultSettings))

    Settings.update(_settings()._id, {$set: data});
  // if NOT currently using defaults AND new settings are equal to the defaults
  else
    Settings.remove(_settings()._id);
};
