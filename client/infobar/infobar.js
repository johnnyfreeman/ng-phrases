var getActiveCharacterCount = function() {
  var count = 0;
  Phrases.find({_id: {$in: Phrase.allActive()}}).forEach(function(phrase){
    count += phrase.text.length;
  });
  return count;
};

Template.infoBar.phrases = function () {
  return Phrase.allActive().length == 1 ? 'phrase' : 'phrases';
};

Template.infoBar.phraseCount = function () {
  return Phrase.allActive().length;
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

Template.infoBar.rendered = function () {
  if (App.perfDebugging) {
    console.log('infoBar rendered', this);
  }
};