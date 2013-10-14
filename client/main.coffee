Template.main.rendered = (e) ->
  
  # slimscroll for tags
  $(@find('#left .scroll')).slimScroll
    color: '#999'
    size: '5px'
    height: '591px'


# loading helper
Template.main.appReady = ->
  App.subsReady()


# on every start up add loading notification
Meteor.startup ->
  App.loader.show()


# when app is ready, remove loading notification
Meteor.startup ->
  Deps.autorun (c) ->
    if App.subsReady()
      App.loader.hide()
      c.stop()


Template.listingInfo.activeTags = ->
  activeTags = Tags.find(_id:
    $in: TagActiveStateCollection.getAll()
  )
  (if activeTags.count() > 0 then activeTags else false)