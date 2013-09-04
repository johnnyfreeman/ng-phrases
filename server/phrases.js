Meteor.publish('phrases', function () {
  console.log('publishing phrases...');
  return Phrases.find({userId:this.userId});
});

Meteor.methods({
  removePhrases: function (phraseIds) {
    
    // make sure is array
    if (typeof phraseIds === 'string')
      phraseIds = [phraseIds];

    // delete all active phrases
    Phrases.remove({_id: {$in: phraseIds}}, function(error) {
      if (error) console.log(error);
    });
  }
});