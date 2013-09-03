// Unique Tags
Meteor.publish('tags', function() {
  // var uniqueTags = [];

  // Phrases.find({userId:this.userId}).forEach(function(phrase) {
  //   _.each(phrase.tags, function(tag) {
  //     if (!_.contains(uniqueTags, tag)) {
  //       uniqueTags.push(tag);
  //     };
  //   });
  // });

  // return Tags.find({_id: {$in: uniqueTags}});
  return Tags.find();
});