Session.setDefault('settingsLoaded', false);
Meteor.subscribe('settings', function() {
  Session.set('settingsLoaded', true);
});

Session.setDefault('sortPhrasesBy', 'title');

var getSetting = function(key) {
  return Session.get('settingsLoaded') ? Settings.findOne()[key] : undefined;
};

var setSetting = function(key, value) {
  if (!Session.get('settingsLoaded'))
    return;

  var data = {};
  data[key] = value;
  // console.log('updating settings with...', data);
  return Settings.update(Settings.findOne()._id, {$set: data});
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

  $('#sortPhrasesBy').selectize({
    sortField: 'text'
  });

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