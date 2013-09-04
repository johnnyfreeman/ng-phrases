// active tags list
Session.setDefault('active_tags', []);

// This user's tags
Template.tagNav.tags = function () {
  return Tags.find({}, {sort:{title:1}});
};

// is this id in the active_tags list?
var tagIsActive = function(tagId) {
  return Session.get('active_tags').indexOf(tagId) >= 0 ? true : false;
};

// return "active" class if contained in the active_tags list
Template.tagNavItem.active = function () {
  return tagIsActive(this._id) ? 'active' : '';
};

// Tag's phrase-count
Template.tagNavItem.count = function () {
  // get all phrases for this user where it has this as one of it's tags
  return Phrases.find({tags: this._id}).count();
};

Template.tagNavItem.events({
  // click on tag to make it "active"
  'click': function (e) {
    e.preventDefault();
    var tags = Session.get('active_tags');

    if (tagIsActive(this._id)) {
      tags.remove(this._id);
    } else {
      tags.push(this._id);
    }

    Session.set('active_tags', tags);
  }
});