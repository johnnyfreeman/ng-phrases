var $phraseForm, $actionBar;

Meteor.startup(function () {
  $phraseForm = $('#phraseForm');
  $actionBar  = $('.action-bar');

  // SCROLL SHADOW
  $phraseForm.on('scroll', function(e) {
    var scrollPos = this.scrollTop;
    if (scrollPos == 0) {
      $actionBar.css('box-shadow', 'none');
    } else {
      $actionBar.css('box-shadow', '0 3px 6px rgba(0,0,0,0.1)');
    };
  });

  $phraseForm.on('submit', function (e) {
    // submit normally if delete mode off
    if (!Settings.get('bulkDeleteMode')) return;

    // prevent form submittion
    e.preventDefault();

    // get active phrases
    var activePhrases = Session.get('active_phrases');

    // delete all active phrases
    Meteor.call('removePhrases', activePhrases, function (error, result) {
      console.log(error, result);
      if (error) return;

      _.each(activePhrases, function(phraseId) {
        activePhrases.remove(phraseId);
      });

      Session.set('active_phrases', activePhrases);
    });
  });
});

Session.setDefault('active_phrases', []);

Meteor.subscribe('phrases');

var phraseIsActive = function (phraseId) {
  return Session.get('active_phrases').indexOf(phraseId) >= 0 ? true : false;
};

Template.phrases.phrases = function () {
  // get phrases based on active tags
  var activeTags = Session.get('active_tags');
  var selector = {};
  var sort = {};

  if (activeTags.length > 0) {
    selector = {tags: {$in: activeTags}}
  }

  if (Settings.get('sortPhrasesBy')) {
    sort[Settings.get('sortPhrasesBy')] = 1;
  };

  return Phrases.find(selector, {sort:sort});
};

Template.phrases.bulkDeleteMode = function () {
  return Settings.get('bulkDeleteMode') ? 'bulk-delete-mode' : '';
};

Template.phraseItem.active = function () {
  return phraseIsActive(this._id) ? 'active' : '';
};

Template.phraseItem.checked = function () {
  return phraseIsActive(this._id) ? 'checked' : '';
};

Template.phraseItem.icon = function () {
  return phraseIsActive(this._id) ? 'icon-check' : 'icon-check-empty';
};

Template.phraseItem.tags = function () {
  return Tags.find({_id: {$in: this.tags}});
};

Template.phraseItem.events({
  'click': function () {
    var phrases = Session.get('active_phrases');
    var phraseId = this._id;

    if (phraseIsActive(phraseId)) {
      phrases.remove(phraseId);
    } else {
      phrases.push(phraseId);
    }

    Session.set('active_phrases', phrases);
    Deps.flush();
    Session.set('active_phrases_char_count', $('#phrases .active .truncate').text().length);
  }
});