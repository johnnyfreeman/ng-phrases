var modeEnabled = function (key) {
  return Settings.get(key) === true;
};

Template.settingsForm.bulkInsertModeChecked = function () {
  return modeEnabled('bulkInsertMode') ? 'checked' : '';
};

Template.settingsForm.bulkDeleteModeChecked = function () {
  return modeEnabled('bulkDeleteMode') ? 'checked' : '';
};

Template.settingsForm.sortPhrasesByBody = function () {
  return Settings.get('sortPhrasesBy') === 'body' ? 'selected' : '';
};

Template.settingsForm.sortPhrasesByDate = function () {
  return Settings.get('sortPhrasesBy') === 'date' ? 'selected' : '';
};

Template.settingsForm.sortPhrasesByTitle = function () {
  return Settings.get('sortPhrasesBy') === 'title' ? 'selected' : '';
};



Meteor.startup(function () {

  var $settingsForm = $('#settingsForm');

  // $('#sortPhrasesBy').selectize({
  //   sortField: 'text'
  // });

  $settingsForm.find('[name="bulk-insert-mode"]').on('change', function() {
    Settings.set('bulkInsertMode', $(this).is(':checked'));
  });

  $settingsForm.find('[name="bulk-delete-mode"]').on('change', function() {
    Settings.set('bulkDeleteMode', $(this).is(':checked'));
  });

  $settingsForm.find('[name="sort-phrases-by"]').on('change', function() {
    Settings.set('sortPhrasesBy', $(this).val());
  });

});