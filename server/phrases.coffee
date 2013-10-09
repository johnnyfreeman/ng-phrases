Meteor.publish 'phrases', (activeTags) ->
  check activeTags, Array

  # build mongo selector
  selector = {}

  # limit results to those that belong to the current user
  selector['userId'] = @userId

  # limit results to those who have ALL active tags
  if activeTags.length > 0
    selector['tags'] = {$all: activeTags}

  Phrases.find selector


Meteor.methods removePhrases: (phraseIds) ->
  # make sure is array of strings
  check phraseIds, [String]
  
  # delete all active phrases
  Phrases.remove
    _id:
      $in: phraseIds
  , (error) ->
    console.log error  if error


Phrases.allow

  insert: (userId, doc) ->
    true

  update: (userId, doc, fieldNames, modifier) ->
    # allow users to update their own phrases
    doc.userId is userId

  remove: (userId, doc) ->
    # allow users to delete their own phrases
    doc.userId is userId