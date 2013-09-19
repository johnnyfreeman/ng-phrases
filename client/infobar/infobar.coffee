getActiveCharacterCount = ->
  count = 0
  Phrases.find(_id:
    $in: Session.get('activeState.phrases')
  ).forEach (phrase) ->
    count += phrase.text.length

  count

Template.infoBar.phrases = ->
  (if Session.get('activeState.phrases').length is 1 then "phrase" else "phrases")

Template.infoBar.phraseCount = ->
  Session.get('activeState.phrases').length

Template.infoBar.characters = ->
  (if getActiveCharacterCount() is 1 then "character" else "characters")

Template.infoBar.charCount = ->
  getActiveCharacterCount()

Template.infoBar.bulkDeleteMode = ->
  Settings.get "bulkDeleteMode"

Template.infoBar.rendered = ->
  console.log "infoBar rendered", this  if App.perfDebugging