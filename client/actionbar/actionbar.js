
// selectize plugin is pretty quirky
// so when can only init once
var selectize = null;

// plugins
Template.actionBar.rendered = function () {
  // PLACEHOLDER
  $('input[placeholder]').placeHolder();

  // Init popups
  $('[data-popup]').popup();

  // init selectize
  if (!selectize) {
    var $tags = $(this.find('input.tags'));
    $tags.selectize({
      delimiter: ',',
      persist: false,
      create: function(input) {
        return {
          title: input
        }
      },
      valueField: 'title',
      labelField: 'title',
      searchField: ['title'],
      options: Tags.find().fetch(),
      maxOptions: 5,
      sortField: 'title'
    });
    selectize = $tags[0].selectize;
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
    var $titleField = $form.find('input.title');
    var $tagsField = $form.find('input.tags');
    var $bodyField = $form.find('textarea');
    var tagIds = [];
    var tags = [];

    // get tag ids
    if ($tagsField.val().length) {
      tags = $tagsField.val().split(',');

      // get tag ids
      _.each(tags, function(tagTitle) {
        var tag = Tags.findOne({title: tagTitle});
        var tagId = tag === undefined ? Tags.insert({title: tagTitle}) : tag._id;
        tagIds.push(tagId);
      });
    }

    // save phrase
    Phrases.insert({
      title: $titleField.val(), 
      text: $bodyField.val(), 
      tags: tagIds,
      userId: Meteor.userId(),
      timestamp: new Date()
    }, 
    // callback
    function (error) {
      if (error) {
        Notifications.insert({iconClass:'icon-warning-sign',message:error.message, type: 'danger', timeout: 0, closeBtn: true});
        return;
      }

      // clear form
      $titleField.val('');
      selectize.clear();
      $bodyField.val('');

      // notification
      Notifications.insert({iconClass:'icon-ok',message:'New phrase added!', type: 'success', timeout: 2000, closeBtn: false});

      // close form or keep open and focus on title field
      if (Settings.get('bulkInsertMode'))
        $titleField.trigger('focus');
      else
        $form.hide();
      
    });

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
  }
});