Template.main.rendered = (e) ->
  
  # slimscroll for tags
  $(@find('#left .scroll')).slimScroll
    color: '#999'
    size: '5px'
    height: '591px'


# loading helper
Template.main.appReady = ->
  App.subsReady()


Template.listingInfo.activeTags = ->
  activeTags = Tags.find _id: $in: TagActiveStateCollection.getAll()
  (if activeTags.count() > 0 then activeTags else false)


Deps.autorun (c) ->
  status = Meteor.status()
  App.log.info 'Meteor status: '+status.status, status