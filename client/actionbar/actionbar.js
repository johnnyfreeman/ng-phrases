var $sortDrop, $searchField, $leftCol, $rightCol;

Meteor.startup(function () {

  $sortDrop = $('#sortDrop');
  $searchField = $('.search-field .search');
  $leftCol = $('#left');
  $rightCol = $('#right');
  $addPhraseForm = $('#addPhraseForm');

  // PLACEHOLDER
  $('input[placeholder]').placeHolder();

  // Init popups
  $('[data-popup]').popup();

  // hide sort popup when option is selected
  $sortDrop.find('a').on('click', function () {
    Session.set('sortPhrasesBy', $(this).data('sortby'));
    $sortDrop.hide();
  });


    // SIDEBAR TOGGLE
  // $('#sidebarToggle').on('click', function() {
  //   if ($leftCol.width() > 0) {
  //     $leftCol.animate({width: 0, 'border-width': 0});
  //     $rightCol.animate({width: 794});
  //   } else {
  //     $leftCol.animate({width: 220, 'border-width': 1});
  //     $rightCol.animate({width: 574});
  //   }
  // });

  // EXPANDING SEARCH FIELD
  $searchField.on('focus', function() {
    $(this).animate({width: 285});
  });

  $searchField.on('blur', function() {
    if (0 === $(this).val().length) {
      $(this).animate({width: 185});
    }
  });

  // add new phrase
  $addPhraseForm.on('submit', function(e) {
    e.preventDefault();

    var $form  = $(this);
    var tagIds = [];
    var tags   = $('#tagsField').val().split(',');

    // get tag ids
    _.each(tags, function(tagTitle) {
      var tag = Tags.findOne({title: tagTitle});
      var tagId = tag === undefined ? Tags.insert({title: tagTitle}) : tag._id;
      tagIds.push(tagId);
    });

    // save phrase
    Phrases.insert({
      title: $form.find('input.title').val(), 
      text: $form.find('textarea').val(), 
      tags: tagIds,
      userId: Meteor.userId()
    });

    // clear form

    // close form or keep open and focus on title field

  });

  $('#tagsField').selectize({
    delimiter: ',',
    persist: false,
    create: function(input) {
      return {
        value: input,
        text: input
      }
    },
    valueField: '_id',
    labelField: 'title',
    searchField: ['title'],
    options: Tags.find().fetch(),
    maxOptions: 5,
    hideSelected: true,
    sortField: 'title'
  });

});

Session.setDefault('sortPhrasesBy', 'title');