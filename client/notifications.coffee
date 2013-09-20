# unnamed collection for notifications
@Notifications = new Meteor.Collection(null)

# init plugins
Template.notifications.notifications = ->
  Notifications.find()

Template.notifications.rendered = ->
  console.log 'notifications rendered', this  if App.perfDebugging

Template.notificationItem.rendered = ->
  console.log 'notificationItem rendered', this  if App.perfDebugging

  # center .notifications-wrapper
  containerWidth = $('#container').outerWidth()
  $notificationWrapper = $('.notification-wrapper')
  notificationWrapperWidth = $notificationWrapper.outerWidth()
  $notificationWrapper.css 'left', (containerWidth/2) - (notificationWrapperWidth/2)

# remove notifications 3 seconds after they are created
Template.notificationItem.created = () ->
  timeout = @data.timeout
  if timeout
    notificationId = @data._id
    Meteor.setTimeout (->
      Notifications.remove notificationId
    ), timeout



Template.notificationItem.events 'click .close': (e) ->
  e.preventDefault()
  Notifications.remove @_id
