(function ($) {
  'use strict'

  $.fn.popup = function (options) {
      var $allToggleEls = this;

      $('body').on('click', function(e) {
        var $clickedEl = $(e.target);

        $allToggleEls.each(function() {
          var $toggleEl = $(this);
          var $popupEl  = $('#'+$toggleEl.data('popup'));

          // conditions
          var clickedElIsToggleEl = $clickedEl.closest($toggleEl).length;
          var clickedElIsPopupEl  = $clickedEl.closest($popupEl).length;
          var popupIsHidden = $popupEl.is(':hidden');

          // open dropdown
          if (clickedElIsToggleEl && popupIsHidden)
            $popupEl.show();

          // close dropdown
          else if (!clickedElIsPopupEl)
            $popupEl.hide();
        });
      });

    return this;
  };

}(jQuery));