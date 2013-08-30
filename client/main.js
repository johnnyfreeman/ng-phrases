Meteor.startup(function () {
  var $phraseContainer = $('#phrases'),
    $phrases = $phraseContainer.find('li'),
    $searchField = $('#searchForm input'),
    $actionBar = $('.action-bar'),
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
    height: '463px'
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