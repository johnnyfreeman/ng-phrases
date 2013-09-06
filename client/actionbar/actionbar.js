
// plugins
Template.actionBar.rendered = function () {
  // PLACEHOLDER
  $('input[placeholder]').placeHolder();

  // Init popups
  $('[data-popup]').popup();

  $(this.find('input.tags')).selectize({
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
    hideSelected: true,
    sortField: 'title'
  });

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
    var tagIds = [];
    var tags = [];

    // get tag ids
    if ($form.find('input.tags').val().length) {
      tags = $form.find('input.tags').val().split(',');

      // get tag ids
      _.each(tags, function(tagTitle) {
        var tag = Tags.findOne({title: tagTitle});
        var tagId = tag === undefined ? Tags.insert({title: tagTitle}) : tag._id;
        tagIds.push(tagId);
      });
    }

    // save phrase
    Phrases.insert({
      title: $form.find('input.title').val(), 
      text: $form.find('textarea').val(), 
      tags: tagIds,
      userId: Meteor.userId()
    }, 
    // callback
    function (error) {
      if (error) {
        alert(error);
        return;
      }

      // clear form
      $form.find('input.title').val('');
      $form.find('input.tags')[0].selectize.clearOptions();
      $form.find('textarea').val('');

      // close form or keep open and focus on title field
      if (Settings.get('bulkInsertMode'))
        $form.find('input.title').trigger('focus');
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