(function ($) {
  'use strict'

  $.fn.replaceClass = function (class1, class2) {
    return this.removeClass(class1).addClass(class2);
  };

}(jQuery));