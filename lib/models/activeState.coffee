# The ActiveStateCollection is designed to house a bunch 
# of activestate models. Also, when an active state is 
# changed, the collection is chanced as well.
class @ActiveStateCollection
  constructor: ->
    # store ids for all currently active models
    @allActive = []
    # store dep
    @_dep = new Deps.Dependency
    @_modelInstances = {}

  # get all active in this collection
  # return a clone of the array so that 
  # subscriptions unsub and resub properly
  getAll: ->
    @depend()
    @allActive.slice(0)

  add: (id) ->
    @allActive.push id
    @changed()

  remove: (id) ->
    @allActive.remove id
    @changed()

  activateAll: ->
    for id, inst of @_modelInstances
      inst.activate()

  deactivateAll: ->
    for id, inst of @_modelInstances
      inst.deactivate()

  activate: (id) ->
    @getModelInstance(id).activate()

  deactivate: (id) ->
    @getModelInstance(id).deactivate()

  depend: ->
    @_dep.depend()

  changed: ->
    @_dep.changed()

  getModelInstance: (id) ->
    if !@_modelInstances.hasOwnProperty id
      @_modelInstances[id] = new ActiveStateModel id, this
    @_modelInstances[id]


class @ActiveStateModel
  constructor: (id, activeStateCollection) ->
    @_id = id
    # store ref to entire collection
    @collection = activeStateCollection
    # store unique dep instance
    @_dep = new Deps.Dependency
    # not active by default
    @active = false

  isActive: ->
    @depend()
    @active

  activate: ->
    if !@isActive()
      @active = true
      @changed()
      @collection.add @_id

  deactivate: ->
    if @isActive()
      @active = false
      @changed()
      @collection.remove @_id

  toggleActivation: ->
    if @isActive() then @deactivate() else @activate()

  depend: ->
    @_dep.depend()

  changed: ->
    @_dep.changed()
