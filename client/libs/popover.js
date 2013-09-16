(function(){

  var Popover = function() {

    // props
    this.xPosition = 0;
    this.yPosition = 0;

    this.width = 0;
    this.height = 0;

    this.triggerElement = null;
    this.id = null;

  };

  Popover.prototype.show = function(options) {

  };

  Popover.prototype.hide = function(options) {

  };

  Popover.prototype.on = function(eventName, callback) {
    return bean.on(this, 'popover.' + eventName, callback);
  };

  Popover.prototype.one = function(eventName, callback) {
    return bean.one(this, 'popover.' + eventName, callback);
  };

  Popover.prototype.off = function(eventName, callback) {
    return bean.off(this, 'popover.' + eventName, callback);
  };

  Popover.prototype.fire = function(eventName) {
    return bean.fire(this, 'popover.' + eventName);
  };

}());

// var myPopover = new Popover({});

// myPopover.on('show')