// subscribe to all tags that the server is publishing
App.subs.tags = Meteor.subscribe('tags');

// active tags list
Session.setDefault('active_tags', []);


// This user's tags
Template.tagNav.tags = function () {
  return Tags.find({}, {sort:{title:1}});
};

Template.tagNav.rendered = function () {
  if (App.perfDebugging) {
    console.log('tanNav rendered', this);
  }
};

// return "active" class if contained in the active_tags list
Template.tagNavItem.active = function () {
  return Tag.isActive(this._id) ? 'active' : '';
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
    Tag.toggleActivation(this._id);
  }
});

Template.tagNavItem.rendered = function() {
  // automatically deactivate tags with zero phrases
  // this will ensure the when Phrases are deleted, 
  // that the phrases list doesn't go blank afterwards
  if (Tag.isActive(this.data._id) && !Phrases.find({tags: this.data._id}).count())
    Tag.deactivate(this.data._id);


  if (App.perfDebugging) {
    console.log('tagNavItem rendered', this);
  }
};

// auto activate tags
try {
  var autoActivate = RequestData.get('tags');
} catch (e) {
  // do nothing
}

// if tags param passed
// do auto activation
if (autoActivate) {
  Meteor.startup(function() {
    Deps.autorun(function(autorun) {
      if (App.subs.tags.ready()) {
        var tags = RequestData.get('tags').split(',');
        Tags.find({title: {$in: tags}}).forEach(function(tag) {
          Tag.activate(tag._id);
        });
        autorun.stop();
      }
    });
  });
}

// activate tag when clicking on tag
Template.tagLink.events({
  'click': function() {
    Tag.activate(this._id);
  }
});



Template.tagLink.rendered = function () {
  if (App.perfDebugging) {
    console.log('tagLink rendered', this);
  }
};



Template.tagSpan.rendered = function () {
  if (App.perfDebugging) {
    console.log('tagSpan rendered', this);
  }
};