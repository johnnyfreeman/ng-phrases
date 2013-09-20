@AddPhraseFormHelper = () ->

  # callback to pass to insert and update functions
AddPhraseFormHelper.afterSave = (error) ->
  if (error)
    Notifications.insert({iconClass:'icon-warning-sign',message:error.message, type: 'danger', timeout: 0, closeBtn: true})
    return

  # clear form
  AddPhraseFormHelper.clearForm();

  # notification
  Notifications.insert({iconClass:'icon-ok',message:'Phrase saved!', type: 'success', timeout: 2000, closeBtn: false});

  $form  = $('#addPhraseForm');

  # close form or keep open and focus on title field
  if (Settings.get('bulkInsertMode') && !Session.get('phraseInEdit'))
    $form.find('input.title').trigger('focus');
  else
    $form.hide();

  if (Session.get('phraseInEdit'))
    Session.set('phraseInEdit', null);

  # reset the phrase form
AddPhraseFormHelper.clearForm = () ->
  $('input.id').val('');
  $('input.title').val('');
  AddPhraseFormHelper.selectize.clear();
  $('textarea').val('');