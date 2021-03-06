getActiveCharacterCount = ->
  count = 0
  Phrases.find(_id:
    $in: PhraseActiveStateCollection.getAll()
  ).forEach (phrase) ->
    count += phrase.text.length

  count

Template.infoBar.phrases = ->
  (if PhraseActiveStateCollection.getAll().length is 1 then 'phrase' else 'phrases')

Template.infoBar.phraseCount = ->
  PhraseActiveStateCollection.getAll().length

Template.infoBar.characters = ->
  (if getActiveCharacterCount() is 1 then 'character' else 'characters')

Template.infoBar.charCount = ->
  getActiveCharacterCount()

Template.infoBar.bulkDeleteMode = ->
  Settings.get 'bulkDeleteMode'