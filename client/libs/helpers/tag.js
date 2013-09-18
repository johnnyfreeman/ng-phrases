Tag = {};

// toggles phrase active state
Tag.toggleActivation = function(id) {
  var key = 'activeTags.'+id;
  var isActive = Session.get(key);
  return Session.set(key, !isActive);
};

// deactivate
Tag.deactivate = function(id) {
  return Session.set('activeTags.'+id, false);
};

// activate
Tag.activate = function(id) {
  return Session.set('activeTags.'+id, true);
};

// is this id in the active_Tags list?
Tag.isActive = function(id) {
  return Session.equals('activeTags.'+id, true)
};

Tag.allActive = function () {
  var namespace = 'activeTags.';
  var active = [];

  for (var key in Session.keys) {
    // avoid looping through prototypes
    if (!Session.keys.hasOwnProperty(key)) 
      continue;

    // if this key is an activePhrase key
    // and it is set to true, add to array
    if (key.indexOf(namespace) === 0 && Session.equals(key, true)) {
      active.push(key.substr(namespace.length));
    }
  }

  return active;
};