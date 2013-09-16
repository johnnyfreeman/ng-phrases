// subscribe to all phrases that the server is publishing
App.subs.phrases = Meteor.subscribe('phrases');

Session.setDefault('active_phrases', []);

Template.phrases.phrases = function () {
  // get phrases based on active tags
  var activeTags = Session.get('active_tags');
  var selector = {};
  var sort = {};

  if (activeTags.length > 0) {
    selector = {tags: {$all: activeTags}};
    // selector = {tags: {$in: activeTags}};
  }

  if (Settings.get('sortPhrasesBy')) {
    // sort phrase decending for timestamp
    if (Settings.get('sortPhrasesBy') == 'timestamp')
      sort[Settings.get('sortPhrasesBy')] = -1;
    // ascending otherwise
    else
      sort[Settings.get('sortPhrasesBy')] = 1;
  };

  return Phrases.find(selector, {sort:sort});
};

Template.phrases.events({
  'submit form': function (e) {
    // submit normally if delete mode off
    if (!Settings.get('bulkDeleteMode')) return;

    // prevent form submission
    e.preventDefault();

    // delete all active phrases
    Meteor.call('removePhrases', Session.get('active_phrases'), function (error, result) {
      if (error) {
        Notifications.insert({iconClass:'icon-warning-sign',message:error.message, type: 'danger', timeout: 0, closeBtn: true});
        return;
      }

      var message = Session.get('active_phrases').length == 1 ? 'Phrase deleted!' : 'Phrases deleted!';

      // notification
      Notifications.insert({iconClass:'icon-remove',message:message, type: 'success', timeout: 2000, closeBtn: false});

      // deactivate all phrases
      Session.set('active_phrases', []);
    });
  },
  // add shadow to action bar when 
  // scrolling through phrases
  'scroll .scroll': function(e) {
    var $element = $('.listingInfo');
    var scrollPos = e.currentTarget.scrollTop;
    if (scrollPos == 0) {
      $element.css('box-shadow', 'none');
    } else {
      $element.css('box-shadow', '0 3px 6px rgba(0,0,0,0.1)');
    };
  }
});

Template.phrases.rendered = function(e) {
  // slimscroll for phrases
  $(this.find('.scroll')).slimScroll({
    color: '#999',
    size: '5px',
    height: '426px'
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

    var $target = $(e.currentTarget);
      
    // do nothing if delete or edit button clicked
    if ($target.closest('.edit').length || $target.closest('.delete').length || $target.closest('.tag').length) {
      return;
    }

    // activate the phrase
    Phrase.toggleActivation(this._id);
  },

  // Edit phrase
  'click .edit': function() {
    Session.set('phraseInEdit', this._id);
  },

  // Delete phrase
  // TODO: add confirmation for better user experience
  'click .delete': function() {
    // Notifications.insert({iconClass:'icon-warning-sign',message:'Are you sure you want to delete this phrase? Yes No', type: 'warning', timeout: 0, closeBtn: true});

    // delete all active phrases
    Meteor.call('removePhrases', [this._id], function (error, result) {
      if (error) {
        Notifications.insert({iconClass:'icon-warning-sign',message:error.message, type: 'danger', timeout: 0, closeBtn: true});
        return;
      }

      // notification
      Notifications.insert({iconClass:'icon-ok',message:'Phrase deleted', type: 'success', timeout: 2000, closeBtn: false});
    });
  }
});

Session.setDefault('phraseInEdit', null);

// render tags field value
Template.addPhraseForm.tags = function() {
  return this.tags.join(',');
};

// the popup title depends on 
Template.addPhraseForm.id = function() {
  return this._id.length ? this._id : false;
};


Template.addPhraseForm.isEditing = function() {
  return Session.get('phraseInEdit') !== null;
};

// global var to store the 
// selectize instance in
Phrase.selectize = null;

Template.addPhraseForm.rendered = function() {
  // init selectize
  var $tags = $(this.find('input.tags'));

  // little garbage collection
  if (Phrase.selectize)
    Phrase.selectize.destroy();

  // init new inst of selectize
  $tags.selectize({
    delimiter: ',',
    persist: false,
    create: function(input) {
      var result = Tags.findOne({title:input});

      // if not found
      if (!result) {
        result = {title: input, _id: 'NEW:' + input};
      }

      return result;
    },
    valueField: '_id',
    labelField: 'title',
    searchField: ['title'],
    options: Tags.find().fetch(),
    maxOptions: 5,
    sortField: 'title'
  });

  // save new instance
  Phrase.selectize = $tags[0].selectize;
};

// Meteor.startup(function() {
//   Deps.autorun(function() {
//     console.log('refreshing selectize options...');
//     if (!Phrase.selectize) 
//       return;

//     Phrase.selectize.clearOptions();

//     Tags.find().forEach(function(tag) {
//       Phrase.selectize.addOption(tag);
//     });


//   });
// });