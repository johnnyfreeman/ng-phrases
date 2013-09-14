Tag = {};

Tag.toggleActivation = function(id) {
  if (Tag.isActive(id)) {
    Tag.deactivate(id);
  } else {
    Tag.activate(id);
  }
};

Tag.deactivate = function(id) {
  if (Tag.isActive(id)) {
    var tags = Session.get('active_tags');
    tags.remove(id);
    Session.set('active_tags', tags);
  }
};

Tag.activate = function(id) {
  if (!Tag.isActive(id)) {
    var tags = Session.get('active_tags');
    tags.push(id);
    Session.set('active_tags', tags);
  }
};

// is this id in the active_tags list?
Tag.isActive = function(id) {
  return Session.get('active_tags').indexOf(id) >= 0 ? true : false;
};