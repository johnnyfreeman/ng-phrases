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

Template.settingsForm.events({
  'change [name="bulk-insert-mode"]': function(e) {
    Settings.set('bulkInsertMode', $(e.currentTarget).is(':checked'));
  },
  'change [name="bulk-delete-mode"]': function(e) {
    Settings.set('bulkDeleteMode', $(e.currentTarget).is(':checked'));
  },
  'change [name="sort-phrases-by"]': function(e) {
    Settings.set('sortPhrasesBy', $(e.currentTarget).val());
  }
});