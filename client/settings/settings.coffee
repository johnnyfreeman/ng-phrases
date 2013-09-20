modeEnabled = (key) ->
  Settings.get(key) is true

Template.bulkInsertSetting.checked = ->
  (if modeEnabled('bulkInsertMode') then 'checked' else '')

Template.bulkDeleteSetting.checked = ->
  (if modeEnabled('bulkDeleteMode') then 'checked' else '')

Template.sortPhrasesBySetting.byBody = ->
  (if Settings.get('sortPhrasesBy') is 'body' then 'selected' else '')

Template.sortPhrasesBySetting.byDate = ->
  (if Settings.get('sortPhrasesBy') is 'date' then 'selected' else '')

Template.sortPhrasesBySetting.byTitle = ->
  (if Settings.get('sortPhrasesBy') is 'title' then 'selected' else '')

Template.bulkInsertSetting.events
  'change input': (e) ->
    val = $(e.currentTarget).is(':checked')
    Settings.set 'bulkInsertMode', val
    Notifications.insert
      iconClass: 'icon-ok'
      message: 'Bulk Insert Mode is ' + ((if val then 'on' else 'off'))
      type: 'info'
      timeout: 2000
      closeBtn: false


Template.bulkDeleteSetting.events
  'change input': (e) ->
    val = $(e.currentTarget).is(':checked')
    Settings.set 'bulkDeleteMode', val
    Notifications.insert
      iconClass: 'icon-ok'
      message: 'Bulk Delete Mode is ' + ((if val then 'on' else 'off'))
      type: 'info'
      timeout: 2000
      closeBtn: false


Template.sortPhrasesBySetting.events
  'change select': (e) ->
    val = $(e.currentTarget).val()
    label = $(e.currentTarget).find(':selected').text()
    Settings.set 'sortPhrasesBy', val
    Notifications.insert
      iconClass: 'icon-ok'
      message: 'Phrases sorted by ' + label
      type: 'info'
      timeout: 2000
      closeBtn: false


Template.settingsForm.rendered = ->
  console.log 'settingsForm rendered', this  if App.perfDebugging

Template.bulkInsertSetting.rendered = ->
  console.log 'bulkInsertSetting rendered', this  if App.perfDebugging

Template.bulkDeleteSetting.rendered = ->
  console.log 'bulkDeleteSetting rendered', this  if App.perfDebugging

Template.sortPhrasesBySetting.rendered = ->
  console.log 'sortPhrasesBySetting rendered', this  if App.perfDebugging