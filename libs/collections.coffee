# tag collection
@Tags = new Meteor.Collection 'tags',
  transform: (mongoDoc) ->
    new Tag(mongoDoc)

# phrase collection
@Phrases = new Meteor.Collection 'phrases',
  transform: (mongoDoc) ->
    new Phrase(mongoDoc)