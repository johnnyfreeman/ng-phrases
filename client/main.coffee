Template.main.rendered = (e) ->
  
  # slimscroll for tags
  $(@find('#left .scroll')).slimScroll
    color: '#999'
    size: '5px'
    height: '591px'

  console.log 'main rendered', this  if App.perfDebugging


# loading helper
Template.main.appReady = ->
  App.subsReady()


# storage for loading notification
loadingId = undefined

# on every start up add loading notification
Meteor.startup ->
  loadingId = Notifications.insert(
    iconClass: 'icon-spinner icon-spin'
    message: 'Loading...'
    timeout: 0
    closeBtn: false
  )


# when app is ready, remove loading notification
Meteor.startup ->
  Deps.autorun (autorun) ->
    if App.subsReady()
      Notifications.remove loadingId
      autorun.stop()


Template.listingInfo.activeTags = ->
  activeTags = Tags.find(_id:
    $in: TagActiveStateCollection.getAll()
  )
  (if activeTags.count() > 0 then activeTags else false)

Template.listingInfo.rendered = ->
  console.log 'listingInfo rendered', this  if App.perfDebugging