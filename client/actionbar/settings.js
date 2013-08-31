Session.setDefault('settingsLoaded', false);
Meteor.subscribe('settings', function() {
  Session.set('settingsLoaded', true);
});

Session.setDefault('sortPhrasesBy', 'title');

settings = function() {
  return Settings.findOne({userId:Meteor.userId()}) 
      || Settings.findOne({userId:'default'});
};

getSetting = function(key) {
  return Session.get('settingsLoaded') ? settings()[key] : undefined;
};

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

var modeEnabled = function (key) {
  return getSetting(key) === true;
};

Template.settingsForm.bulkInsertModeChecked = function () {
  return modeEnabled('bulkInsertMode') ? 'checked' : '';
};

Template.settingsForm.bulkDeleteModeChecked = function () {
  return modeEnabled('bulkDeleteMode') ? 'checked' : '';
};

Template.settingsForm.sortPhrasesByBody = function () {
  return getSetting('sortPhrasesBy') === 'body' ? 'selected' : '';
};

Template.settingsForm.sortPhrasesByDate = function () {
  return getSetting('sortPhrasesBy') === 'date' ? 'selected' : '';
};

Template.settingsForm.sortPhrasesByTitle = function () {
  return getSetting('sortPhrasesBy') === 'title' ? 'selected' : '';
};



Meteor.startup(function () {

  var $settingsForm = $('#settingsForm');

  // $('#sortPhrasesBy').selectize({
  //   sortField: 'text'
  // });

  $settingsForm.find('[name="bulk-insert-mode"]').on('change', function() {
    setSetting('bulkInsertMode', $(this).is(':checked'));
  });

  $settingsForm.find('[name="bulk-delete-mode"]').on('change', function() {
    setSetting('bulkDeleteMode', $(this).is(':checked'));
  });

  $settingsForm.find('[name="sort-phrases-by"]').on('change', function() {
    setSetting('sortPhrasesBy', $(this).val());
  });

});