var $sortDrop, $searchField, $leftCol, $rightCol;

Meteor.startup(function () {

  $sortDrop = $('#sortDrop');
  $searchField = $('.search-field .search');
  $leftCol = $('#left');
  $rightCol = $('#right');

  // PLACEHOLDER
  $('input[placeholder]').placeHolder();


  // TOGGLE SORT DROPDOWN
  $('body').on('click', function(e) {
    var $target = $(e.target);

    // open dropdown
    if ($target.closest('#sortBtn').length && $sortDrop.is(':hidden')) {
      $sortDrop.show(0);
    }

    // close dropdown
    else if (!$target.closest('#sortDrop').length || ($target.closest('#sortBtn').length && !$sortDrop.is(':hidden'))) {
      $sortDrop.hide(0);
    }
  });

  $sortDrop.find('li').on('click', function () {
    Session.set('sortPhrasesBy', $(this).data('sortby'));
    $sortDrop.hide(0);
  });


    // SIDEBAR TOGGLE
  $('#sidebarToggle').on('click', function() {
    if ($leftCol.width() > 0) {
      $leftCol.animate({width: 0, 'border-width': 0});
      $rightCol.animate({width: 794});
    } else {
      $leftCol.animate({width: 220, 'border-width': 1});
      $rightCol.animate({width: 574});
    }
  });

  // EXPANDING SEARCH FIELD
  $searchField.on('focus', function() {
    $(this).animate({width: 285});
  });

  $searchField.on('blur', function() {
    if (0 === $(this).val().length) {
      $(this).animate({width: 185});
    }
  });

  // SIDEBAR TOGGLE
  $('#sidebarToggle').on('click', function() {
    if ($leftCol.width() > 0) {
      $leftCol.animate({width: 0, 'border-width': 0});
      $rightCol.animate({width: 794});
    } else {
      $leftCol.animate({width: 220, 'border-width': 1});
      $rightCol.animate({width: 574});
    }
  });

});

Session.setDefault('sortPhrasesBy', 'title');