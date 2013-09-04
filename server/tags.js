// TODO: this function should only run once!
Meteor.publish('tags', function() {
  var self = this;
  var uniqueTags = [];
  var userPhrases = Phrases.find({userId:this.userId});

  // TODO: figure out why this is being called three times for every one add event
  var observer = userPhrases.observeChanges({
    added: function(id, phrase) {
      _.each(phrase.tags, function(tag) {
        if (!_.contains(uniqueTags, tag)) {
          uniqueTags.push(tag);
          self.added('tags', tag, Tags.findOne(tag));
        };
      });
    }
  });

  // stop observing when this tags stop publishing
  self.onStop(function() {
    observer.stop();
  });

  // return Tags cursor
  return Tags.find({_id: {$in: uniqueTags}});
});