# namespace for app helpers
@App = {}

# namespace for app subscriptions
if Meteor.isClient
  App.subs = {}
  App.subs.settings = Meteor.subscribe('settings')
  App.subsReady = ->
    App.subs.phrases.ready() and App.subs.tags.ready() and App.subs.settings.ready()


# register event handler
App.on = (eventName, callback) ->
  bean.on App, eventName, callback


# register event handler that only runs once
App.one = (eventName, callback) ->
  bean.one App, eventName, callback


# unregisters an event handler
App.off = (eventName, callback) ->
  bean.off App, eventName, callback


# triggers an event
App.trigger = (eventName) ->
  bean.fire App, eventName

# Debugging
App.perfDebugging = false

try
  App.perfDebugging = (if RequestData.get('perfDebugging') is 'true' then true else false)


# App loading indicator
App.loadingId = null;

App.loader =
  id: null
  show: ->
    if this.id is null
      this.id = Notifications.insert
        iconClass: 'icon-spinner icon-spin'
        message: 'Loading...'
        timeout: 0
        closeBtn: false
  hide: ->
    if this.id isnt null
      Notifications.remove this.id
      this.id = null