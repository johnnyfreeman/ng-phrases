// namespace for phrase helpers
Phrase = {};

// toggles phrase active state
Phrase.toggleActivation = function(id) {
  if (Phrase.isActive(id)) {
    Phrase.deactivate(id);
  } else {
    Phrase.activate(id);
  }
};

// deactivate
Phrase.deactivate = function(id) {
  if (Phrase.isActive(id)) {
    var phrases = Session.get('active_phrases');
    phrases.remove(id);
    Session.set('active_phrases', phrases);
  }
};

// activate
Phrase.activate = function(id) {
  if (!Phrase.isActive(id)) {
    var phrases = Session.get('active_phrases');
    phrases.push(id);
    Session.set('active_phrases', phrases);
  }
};

// is this id in the active_phrases list?
Phrase.isActive = function(id) {
  return Session.get('active_phrases').indexOf(id) >= 0 ? true : false;
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
  var $titleField = $form.find('input.title');

  // close form or keep open and focus on title field
  if (Settings.get('bulkInsertMode') && !Session.get('phraseInEdit'))
    $titleField.trigger('focus');
  else
    $form.hide();

  if (Session.get('phraseInEdit'))
    Session.set('phraseInEdit', null);
};

// reset the phrase form
Phrase.clearForm = function() {
  $('input.id').val('');
  $('input.title').val('');
  Phrase.selectize.clear();
  $('textarea').val('');
};