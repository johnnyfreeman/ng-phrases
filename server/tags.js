// TODO: this function should only run once!
var count = 0;
Meteor.publish('tags', function() {

  console.log('publishing...', count);
  count++;

  var self = this;
  var uniqueTags = [];
  var userPhrases = Phrases.find({userId:this.userId});

  // TODO: figure out why this is being called three times for every one add event
  var observer = userPhrases.observeChanges({
    added: function(id, phrase) {
      _.each(phrase.tags, function(tag) {
        if (!_.contains(uniqueTags, tag)) {
          console.log('=========== NEW TAG!!! ===============');
          uniqueTags.push(tag);
          self.added('tags', tag, Tags.findOne(tag));
        };
      });
    },
    // TODO finish this. low priority.
    // removed: function(arg1, arg2) {
    //   console.log(this, arg1, arg2);
    // }
  });

  // stop observing when this tags stop publishing
  self.onStop(function() {
    observer.stop();
  });

  // return Tags cursor
  return Tags.find({_id: {$in: uniqueTags}});
});