Session.setDefault('active_phrases', []);

Phrase = {};

Phrase.toggleActivation = function(id) {
  if (Phrase.isActive(id)) {
    Phrase.deactivate(id);
  } else {
    Phrase.activate(id);
  }
};

Phrase.deactivate = function(id) {
  if (Phrase.isActive(id)) {
    var phrases = Session.get('active_phrases');
    phrases.remove(id);
    Session.set('active_phrases', phrases);
  }
};

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

Template.phrases.events({
  'submit form': function (e) {
    // submit normally if delete mode off
    if (!Settings.get('bulkDeleteMode')) return;

    // prevent form submittion
    e.preventDefault();

    // get active phrases
    var activePhrases = Session.get('active_phrases');

    // delete all active phrases
    Meteor.call('removePhrases', activePhrases, function (error, result) {
      if (error) return;

      _.each(activePhrases, function(phraseId) {
        activePhrases.remove(phraseId);
      });

      Session.set('active_phrases', activePhrases);
    });
  },
  // add shadow to action bar when 
  // scrolling through phrases
  'scroll .scroll': function(e) {
    var $actionBar = $('.action-bar');
    var scrollPos = e.currentTarget.scrollTop;
    if (scrollPos == 0) {
      $actionBar.css('box-shadow', 'none');
    } else {
      $actionBar.css('box-shadow', '0 3px 6px rgba(0,0,0,0.1)');
    };
  }
});

Template.phrases.rendered = function(e) {
  // slimscroll for phrases
  $(this.find('.scroll')).slimScroll({
    color: '#999',
    size: '5px',
    height: '463px'
  });

  // reset the action bar shadow when phrases 
  // are (re)rendered to keep ui consistant
  $('.action-bar').css('box-shadow', 'none');
};

Template.phrases.bulkDeleteMode = function () {
  return Settings.get('bulkDeleteMode') ? 'bulk-delete-mode' : '';
};

Template.phraseItem.active = function () {
  return Phrase.isActive(this._id) ? 'active' : '';
};

Template.phraseItem.checked = function () {
  return Phrase.isActive(this._id) ? 'checked' : '';
};

Template.phraseItem.icon = function () {
  return Phrase.isActive(this._id) ? 'icon-check' : 'icon-check-empty';
};

Template.phraseItem.tags = function () {
  return Tags.find({_id: {$in: this.tags}});
};

Template.phraseItem.events({
  'click': function (e) {
    e.preventDefault();
    Phrase.toggleActivation(this._id);
    // Deps.flush();
    // Session.set('active_phrases_char_count', $('#phrases .active .truncate').text().length);
  }
});