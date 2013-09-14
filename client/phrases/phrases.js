// subscribe to all phrases that the server is publishing
App.subs.phrases = Meteor.subscribe('phrases');

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

    // delete all active phrases
    Meteor.call('removePhrases', Session.get('active_phrases'), function (error, result) {
      if (error) return;

      var message = Session.get('active_phrases').length == 1 ? 'Phrase deleted!' : 'Phrases deleted!';

      // notification
      Notifications.insert({iconClass:'icon-remove',message:message, type: 'danger', timeout: 2000, closeBtn: false});

      // deactivate all phrases
      Session.set('active_phrases', []);
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

Template.phraseItem.timeago = function () {
  return moment(this.timestamp).fromNow();
};

Template.phraseItem.events({
  'click': function (e) {
    e.preventDefault();
    Phrase.toggleActivation(this._id);
  },
  'dblclick': function (e) {
    Session.set('phraseInEdit', this._id);
    $('#addPhraseForm').show();
  }
});

Session.setDefault('phraseInEdit', null);

Template.addPhraseForm.tags = function() {
  return this.tags.join(',');
};


selectize = null;
Template.addPhraseForm.rendered = function() {
  // init selectize
  var $tags = $(this.find('input.tags'));
  // if (!selectize) {
    $tags.selectize({
      delimiter: ',',
      persist: false,
      create: function(input) {
        return {
          title: input
        }
      },
      valueField: '_id',
      labelField: 'title',
      searchField: ['title'],
      options: Tags.find().fetch(),
      maxOptions: 5,
      sortField: 'title'
    });
    selectize = $tags[0].selectize;
  // }

  
};