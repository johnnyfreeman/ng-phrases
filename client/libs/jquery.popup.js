(function ($) {
  'use strict'

  // empty toggle elements object
  var $allToggleEls = $();


  $(document).ready(function(){
    $('body').on('click', function(e) {
      // save clicked element to local cache
      var $clickedEl = $(e.target);

      // prevent links from doing default behavior
      if ($clickedEl.closest($allToggleEls).length) e.preventDefault();

      // loop through all toggle elements stored in cache
      $allToggleEls.each(function() {
        var $toggleEl = $(this);
        var $popupEl  = $('#'+$toggleEl.data('popup'));

        // conditions
        var clickedElIsToggleEl = $clickedEl.closest($toggleEl).length;
        var clickedElIsPopupEl  = $clickedEl.closest($popupEl).length;
        var popupIsHidden = $popupEl.is(':hidden');

        // open popup
        if (clickedElIsToggleEl && popupIsHidden)
          $popupEl.show();

        // close popup
        else if (!clickedElIsPopupEl)
          $popupEl.hide();
      });
    });
  });

  // this ONLY works if the popup method 
  // is only called ONCE for EVERY popup
  $.fn.popup = function (options) {
    return $allToggleEls = this;
  };

}(jQuery));