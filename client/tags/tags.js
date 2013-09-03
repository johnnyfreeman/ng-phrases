// active tags list
Session.setDefault('active_tags', []);

// subscribe to all tags that the server is publishing
Meteor.subscribe('tags');

// This user's tags
Template.tagNav.tags = function () {
  var uniqueTags = [];

  Phrases.find().forEach(function(phrase) {
    _.each(phrase.tags, function(tag) {
      if (!_.contains(uniqueTags, tag)) {
        uniqueTags.push(tag);
      };
    });
  });

  return Tags.find({_id: {$in: uniqueTags}}, {sort:{title:1}});
  // return Tags.find({}, {sort:{title:1}});
};

// is this id in the active_tags list?
var tagIsActive = function(tagId) {
  return Session.get('active_tags').indexOf(tagId) >= 0 ? true : false;
};

// return "active" class if contained in the active_tags list
Template.tagNavItem.active = function () {
  return tagIsActive(this._id) ? 'active' : '';
};

// Tag Count
Template.tagNavItem.count = function () {
  // get all phrases for this user where it has this as one of it's tags
  return Phrases.find({tags: this._id}).count();
};

// click on tag to make it "active"
Template.tagNavItem.events({
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