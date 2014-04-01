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
App.loader =
  id: null
  show: ->
    if App.loader.id is null
      App.loader.id = Notifications.insert
        iconClass: 'fa fa-spinner fa-spin'
        message: 'Loading...'
        timeout: 0
        closeBtn: false
      # hide loader after flush is finished
      Deps.afterFlush ->
        App.loader.hide()
  hide: ->
    if App.loader.id isnt null
      Notifications.remove App.loader.id
      App.loader.id = null
