Meteor.startup(function () {

  // User's Phrases
  Meteor.publish('phrases', function () {
    return Phrases.find({userId:this.userId});
  });

  // Unique Tags
  Meteor.publish('tags', function() {
    var uniqueTags = [];

    Phrases.find({userId:this.userId}).forEach(function(phrase) {
      _.each(phrase.tags, function(tag) {
        if (!_.contains(uniqueTags, tag)) {
          uniqueTags.push(tag);
        };
      });
    });

    return Tags.find({_id: {$in: uniqueTags}});
  });

  // User Settings
  Meteor.publish('settings', function() {
    return Settings.find({userId: {$in: [this.userId, 'default']}});
  });
});