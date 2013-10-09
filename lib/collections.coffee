# activeState collections
@TagActiveStateCollection = new ActiveStateCollection
@PhraseActiveStateCollection = new ActiveStateCollection

# tag collection
@Tags = new Meteor.Collection 'tags',
  transform: (mongoDoc) ->
    # return new Tag instance instead of raw mongo doc
    new Tag(mongoDoc)


# phrase collection
@Phrases = new Meteor.Collection 'phrases',
  transform: (mongoDoc) ->
    # return new Phrase instance instead of raw mongo doc
    new Phrase(mongoDoc)

# unnamed collection for notifications
@Notifications = new Meteor.Collection(null)