Meteor.startup(function () {
  var $phraseForm = $('#phraseForm'),
    $phraseContainer = $('#phrases'),
    $phrases = $phraseContainer.find('li'),
    $tagContainer = $('#tags'),
    $previewBar = $('.preview-bar'),
    $searchField = $('#searchForm input'),
    $actionBar = $('.action-bar'),
    $sortBtn = $('#sortBtn'),
    $sortDrop = $('#sortDrop'),
    $leftCol = $('#left'),
    $rightCol = $('#right');
        

  // CUSTOM SCROLL BAR
  $leftCol.find('.scroll').slimScroll({
    color: '#999',
    size: '5px',
    height: '591px'
  });
  $rightCol.find('.scroll').slimScroll({
    color: '#999',
    size: '5px',
    height: '519px'
  });
  

  // SEARCH FILTERING
  $searchField.on('input', function(e) {
    // get search term
    var term = $(this).val();
    // loop through the list of fields and get all with
    $phrases.hide().contents().each(function() {
      var $this = $(this);
      var haystack = $this.text().toLowerCase();
      var needle = term.toLowerCase();
      if (_.str.contains(haystack, needle)) {
        $this.closest('li').show();
      };
    });
  });



  // SCROLL SHADOW
  $rightCol.find('.scroll').on('scroll', function(e) {
    var scrollPos = this.scrollTop;
    if (scrollPos == 0) {
      $actionBar.css('box-shadow', 'none');
    } else {
      $actionBar.css('box-shadow', '0 3px 6px rgba(0,0,0,0.1)');
    };
  });

});







//   Meteor.startup(function () {
//     var $phraseForm = $('#phraseForm'),
//         $phraseContainer = $('#phrases'),
//         $phrases = $phraseContainer.find('li'),
//         $tagContainer = $('#tags'),
//         $previewBar = $('.preview-bar'),
//         $searchField = $('#searchForm input'),
//         $actionBar = $('.action-bar'),
//         $sortBtn = $('#sortBtn'),
//         $sortDrop = $('#sortDrop'),
//         $leftCol = $('#left'),
//         $rightCol = $('#right');





//     // PHRASE CLICK TOGGLE
//     $phrases.on('click', function(e) {
//       var $this = $(this);
//       var $checkbox = $this.find('.checkbox :checkbox');
//       var icon = $this.find('.checkbox i')[0];

//       if ($checkbox.is(':checked')) {
//         $this.removeClass('active');
//         $checkbox[0].checked = false;
//         icon.className = 'icon-check-empty';
//       } else {
//         $this.addClass('active');
//         $checkbox[0].checked = true;
//         icon.className = 'icon-check';
//       }

//       $this.trigger('phraseSelected');
//     });


//     $phrases.on('phraseSelected', function() {
//       var phraseCount = $phraseContainer.find('.active').length;
//       $previewBar.find('.phrase-count').text(phraseCount);
//       $previewBar.find('.phrase-word').text(phraseCount === 1 ? 'phrase' : 'phrases');

//       var charCount = 0;
//       $phraseContainer.find(':checked').each(function(){
//         charCount += $(this).val().length;
//       });
//       $previewBar.find('.char-count').text(charCount);
//       $previewBar.find('.char-word').text(charCount === 1 ? 'character' : 'characters');

//       if (phraseCount > 0) {
//         $phraseContainer.css('margin-bottom', '57px');
//         $previewBar.show(0);
//       } else {
//         $phraseContainer.css('margin-bottom', 0);
//         $previewBar.hide(0);
//       }
//     });










//     // TOGGLE SORT DROPDOWN
//     $('body').on('click', function(e) {
//       var $target = $(e.target);

//       // open dropdown
//       if ($target.closest('#sortBtn').length && $sortDrop.is(':hidden')) {
//         $sortDrop.show(0);
//       }

//       // close dropdown
//       else if (!$target.closest('#sortDrop').length || ($target.closest('#sortBtn').length && !$sortDrop.is(':hidden'))) {
//         $sortDrop.hide(0);
//       }
//     });
