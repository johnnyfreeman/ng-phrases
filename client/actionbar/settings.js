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
    var val = $(e.currentTarget).is(':checked');
    Settings.set('bulkInsertMode', val);
    Notifications.insert({iconClass:'icon-ok',message:'Bulk Insert Mode is '+(val?'on':'off'), type: 'info', timeout: 2000, closeBtn: false});
  },
  'change [name="bulk-delete-mode"]': function(e) {
    var val = $(e.currentTarget).is(':checked');
    Settings.set('bulkDeleteMode', val);
    Notifications.insert({iconClass:'icon-ok',message:'Bulk Delete Mode is '+(val?'on':'off'), type: 'info', timeout: 2000, closeBtn: false});
  },
  'change [name="sort-phrases-by"]': function(e) {
    var val = $(e.currentTarget).val();
    var label = $(e.currentTarget).find(':selected').text();
    Settings.set('sortPhrasesBy', val);
    Notifications.insert({iconClass:'icon-ok',message:'Phrases sorted by '+label, type: 'info', timeout: 2000, closeBtn: false});
  }
});

Template.settingsForm.rendered = function() {
  if (App.perfDebugging) {
    console.log('settingsForm rendered', this);
  }
};