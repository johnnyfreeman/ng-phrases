var getActiveCharacterCount = function() {
  var count = 0;
  Phrases.find({_id: {$in: Session.get('active_phrases')}}).forEach(function(phrase){
    count += phrase.text.length;
  });
  return count;
};

Template.infoBar.phrases = function () {
  return Session.get('active_phrases').length == 1 ? 'phrase' : 'phrases';
};

Template.infoBar.phraseCount = function () {
  return Session.get('active_phrases').length;
};

Template.infoBar.characters = function () {
  return getActiveCharacterCount() == 1 ? 'character' : 'characters';
};

Template.infoBar.charCount = function () {
  return getActiveCharacterCount();
};

Template.infoBar.bulkDeleteMode = function () {
  return Settings.get('bulkDeleteMode');
};