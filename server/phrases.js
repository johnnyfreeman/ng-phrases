Meteor.publish('phrases', function () {
  return Phrases.find({userId:this.userId});
});

Meteor.methods({
  removePhrases: function (phraseIds) {
    
    // make sure is array of strings
    check(phraseIds, [String]);

    // delete all active phrases
    Phrases.remove({_id: {$in: phraseIds}}, function(error) {
      if (error) console.log(error);
    });
  }
});