modeEnabled = (key) ->
  Settings.get(key) is true

Template.settingsForm.bulkInsertModeChecked = ->
  (if modeEnabled("bulkInsertMode") then "checked" else "")

Template.settingsForm.bulkDeleteModeChecked = ->
  (if modeEnabled("bulkDeleteMode") then "checked" else "")

Template.settingsForm.sortPhrasesByBody = ->
  (if Settings.get("sortPhrasesBy") is "body" then "selected" else "")

Template.settingsForm.sortPhrasesByDate = ->
  (if Settings.get("sortPhrasesBy") is "date" then "selected" else "")

Template.settingsForm.sortPhrasesByTitle = ->
  (if Settings.get("sortPhrasesBy") is "title" then "selected" else "")

Template.settingsForm.events
  "change [name=\"bulk-insert-mode\"]": (e) ->
    val = $(e.currentTarget).is(":checked")
    Settings.set "bulkInsertMode", val
    Notifications.insert
      iconClass: "icon-ok"
      message: "Bulk Insert Mode is " + ((if val then "on" else "off"))
      type: "info"
      timeout: 2000
      closeBtn: false


  "change [name=\"bulk-delete-mode\"]": (e) ->
    val = $(e.currentTarget).is(":checked")
    Settings.set "bulkDeleteMode", val
    Notifications.insert
      iconClass: "icon-ok"
      message: "Bulk Delete Mode is " + ((if val then "on" else "off"))
      type: "info"
      timeout: 2000
      closeBtn: false


  "change [name=\"sort-phrases-by\"]": (e) ->
    val = $(e.currentTarget).val()
    label = $(e.currentTarget).find(":selected").text()
    Settings.set "sortPhrasesBy", val
    Notifications.insert
      iconClass: "icon-ok"
      message: "Phrases sorted by " + label
      type: "info"
      timeout: 2000
      closeBtn: false


Template.settingsForm.rendered = ->
  console.log "settingsForm rendered", this  if App.perfDebugging