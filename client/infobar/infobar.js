var $infoBar;

Meteor.startup(function () {
  $infoBar = $('.info-bar');
});

Template.infoBar.phrases = function () {
  return Session.get('active_phrases').length == 1 ? 'phrase' : 'phrases';
};

Template.infoBar.phraseCount = function () {
  return Session.get('active_phrases').length;
};

Template.infoBar.characters = function () {
  return Session.get('active_phrases_char_count') == 1 ? 'character' : 'characters';
};

Template.infoBar.charCount = function () {
  return Session.get('active_phrases_char_count') || 0;
};


Template.infoBar.events({
  'click button': function () {
    $('#phraseForm').submit();
  }
});