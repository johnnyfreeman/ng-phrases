// plugins
Template.actionBar.rendered = function () {
  // PLACEHOLDER
  $('input[placeholder]').placeHolder();

  // Init popups
  $('[data-popup]').popup();

  if (Session.get('phraseInEdit')) {
    $('#addPhraseForm').show();
  }
};

Template.actionBar.events({
  // SEARCH FILTERING
  'input input.search': function(e) {
    // get search term
    var term = $(e.currentTarget).val();

    // loop through the list of fields and get all with
    $('#phrases li').hide().contents().each(function() {
      var $this = $(this);
      var haystack = $this.text().toLowerCase();
      var needle = term.toLowerCase();
      if (_.str.contains(haystack, needle)) {
        $this.closest('li').show();
      };
    });
  },

  // add new phrase
  'submit #addPhraseForm': function(e) {
    e.preventDefault();

    var $form  = $(e.currentTarget);
    var $idField = $form.find('input.id');
    var $titleField = $form.find('input.title');
    var $tagsField = $form.find('input.tags');
    var $bodyField = $form.find('textarea');
    var tagIds = [];
    var tags = [];

    // get tag ids
    if ($tagsField.val().length) {
      tags = $tagsField.val().split(',');

      // get tag ids
      _.each(tags, function(tagId) {
        var title;

        if (tagId.indexOf('NEW:') === 0) {
          title = tagId.substr(4);
          tagId = Tags.insert({title: title});
        }

        tagIds.push(tagId);
      });
    }

    var phrase = {
      title: $titleField.val(), 
      text: $bodyField.val(), 
      tags: tagIds,
      userId: Meteor.userId(),
      timestamp: new Date()
    };

    // do update or insert
    if (Session.get('phraseInEdit'))
      Phrases.update($idField.val(), {$set: phrase}, Phrase.afterSave);
    else
      Phrases.insert(phrase, Phrase.afterSave);

  },

  // EXPANDING SEARCH FIELD
  'focus input.search': function(e) {
    $(e.currentTarget).animate({width: 285});
  },
  'blur input.search': function(e) {
    var $input = $(e.currentTarget);
    if (0 === $input.val().length) {
      $input.animate({width: 185});
    }
  },

  // make double sure the phrase form is clear 
  // when clicking the add phrase button
  'click #addPhrase': function(e) {
    Session.set('phraseInEdit', null);
  }
});


Template.actionBar.phraseInEdit = function() {
  var phraseInEdit = Phrases.findOne(Session.get('phraseInEdit'));

  if (!phraseInEdit) {
    phraseInEdit = {
      _id: '',
      title: '',
      text: '',
      tags: []
    }
  };
  
  return phraseInEdit;
};