# namespace for app helpers
@App = {} if typeof App is 'undefined'


# namespace for app subscriptions
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


# App loading indicator
App.Loader = ->
  @id = null

App.Loader::show = ->
  if @id is null
    @id = Notifications.insert
      iconClass: 'fa fa-spinner fa-spin'
      message: 'Loading...'
      timeout: 0
      closeBtn: false

App.Loader::hide = ->
  if @id isnt null
    Notifications.remove @id
    @id = null

App.loader = new App.Loader