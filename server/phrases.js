Meteor.publish('phrases', function () {
  return Phrases.find({userId:this.userId});
});

Meteor.methods({
  removePhrases: function (phraseIds) {
    
    // make sure is array
    if (typeof phraseIds === 'string')
      phraseIds = [phraseIds];

    // delete all active phrases
    Phrases.remove({_id: {$in: phraseIds}}, function(error) {
      if (error) throw new Meteor.Error(500, error);
    });
  }
});