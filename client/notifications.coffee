# unnamed collection for notifications
@Notifications = new Meteor.Collection(null)
Template.notifications.rendered = ->


# init plugins
Template.notifications.notifications = ->
  Notifications.find()

Template.notifications.rendered = ->
  console.log 'notifications rendered', this  if App.perfDebugging

Template.notificationItem.rendered = ->
  console.log 'notificationItem rendered', this  if App.perfDebugging


# remove notifications 3 seconds after they are created
Template.notificationItem.created = (arg1) ->
  timeout = @data.timeout
  if timeout
    notificationId = @data._id
    Meteor.setTimeout (->
      Notifications.remove notificationId
    ), timeout

Template.notificationItem.events 'click .close': (e) ->
  e.preventDefault()
  Notifications.remove @_id
