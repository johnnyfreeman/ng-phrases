Template.main.rendered = (e) ->
  
  # slimscroll for tags
  $(@find('#left .scroll')).slimScroll
    color: '#999'
    size: '5px'
    height: '591px'


Template.listingInfo.activeTags = ->
  activeTags = Tags.find _id: $in: TagActiveStateCollection.getAll()
  (if activeTags.count() > 0 then activeTags else false)


# show app loader when subs are not ready
Deps.autorun ->
  if App.subsReady()
    App.loader.hide()
  else
    App.loader.show()
  