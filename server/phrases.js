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

Phrases.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
  	// allow users to update their own phrases
    return doc.userId === userId;
  },
  remove: function(userId, doc) {
  	// allow users to delete their own phrases
    return doc.userId === userId;
  }
});