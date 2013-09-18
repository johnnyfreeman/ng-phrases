// namespace for phrase helpers
Phrase = {};

// toggles phrase active state
Phrase.toggleActivation = function(id) {
  var key = 'activePhrases.'+id;
  var isActive = Session.get(key);
  return Session.set(key, !isActive);
};

// deactivate
Phrase.deactivate = function(id) {
  return Session.set('activePhrases.'+id, false);
};

// activate
Phrase.activate = function(id) {
  return Session.set('activePhrases.'+id, true);
};

// is this id in the active_phrases list?
Phrase.isActive = function(id) {
  return Session.equals('activePhrases.'+id, true)
};

// callback to pass to insert and update functions
Phrase.afterSave = function (error) {
  if (error) {
    Notifications.insert({iconClass:'icon-warning-sign',message:error.message, type: 'danger', timeout: 0, closeBtn: true});
    return;
  }

  // clear form
  Phrase.clearForm();

  // notification
  Notifications.insert({iconClass:'icon-ok',message:'Phrase saved!', type: 'success', timeout: 2000, closeBtn: false});

  var $form  = $('#addPhraseForm');

  // close form or keep open and focus on title field
  if (Settings.get('bulkInsertMode') && !Session.get('phraseInEdit'))
    $form.find('input.title').trigger('focus');
  else
    $form.hide();

  if (Session.get('phraseInEdit'))
    Session.set('phraseInEdit', null);
};

Phrase.allActive = function () {
  var namespace = 'activePhrases.';
  var active = [];

  for (var key in Session.keys) {
    // avoid looping through prototypes
    if (!Session.keys.hasOwnProperty(key)) 
      continue;

    // if this key is an activePhrase key
    // and it is set to true, add to array
    if (key.indexOf(namespace) === 0 && Session.equals(key, true)) {
      active.push(key.substr(namespace.length));
    }
  }

  return active;
};

// reset the phrase form
Phrase.clearForm = function() {
  $('input.id').val('');
  $('input.title').val('');
  Phrase.selectize.clear();
  $('textarea').val('');
};