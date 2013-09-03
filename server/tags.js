// Unique Tags
Meteor.publish('tags', function() {
  var self = this;
  var uniqueTags = [];
  var init = true;
  var userPhrases = Phrases.find({userId:this.userId});

  userPhrases.forEach(function(phrase) {
    _.each(phrase.tags, function(tag) {
      if (!_.contains(uniqueTags, tag)) {
        uniqueTags.push(tag);
      };
    });
  });

  // TODO: figure out why this is being called three times for every one add event
  var handle = userPhrases.observeChanges({
    added: function(id, phrase) {
      _.each(phrase.tags, function(tag) {
        if (!_.contains(uniqueTags, tag) && !init) {
          // console.log('=========== NEW TAG!!! ===============');
          uniqueTags.push(tag);
          self.added('tags', tag, Tags.findOne(tag));
        };
      });
    },
    // TODO finish this. low priority.
    removed: function(arg1, arg2) {
      console.log(this, arg1, arg2);
    }
  });

  // stop observing when this tags stop publishing
  self.onStop(function() {
    handle.stop();
  });

  init = false;

  return Tags.find({_id: {$in: uniqueTags}});
});