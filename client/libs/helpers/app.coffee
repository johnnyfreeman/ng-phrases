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

App.perfDebugging = false

try
  App.perfDebugging = (if RequestData.get('perfDebugging') is 'true' then true else false)