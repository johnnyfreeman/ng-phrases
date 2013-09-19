class ActiveStateCollection
  constructor: ->
    @allActive = []
    @_dep = new Deps.Dependency

  getAll: ->
    @depend()
    @allActive

  add: (id) ->
    @changed()
    @allActive.push id

  remove: (id) ->
    @allActive.remove id

  depend: ->
    @_dep.depend()

  changed: ->
    @_dep.changed()


class ActiveStateModel
  constructor: (activeStateCollection) ->
    # store ref to entire collection
    @collection = activeStateCollection
    # add this id to the collection
    @collection.add @_id
    # store unique dep instance
    @_dep = new Deps.Dependency
    # not active by default
    @active = false

  isActive: ->
    @_dep.depend()
    @active

  activate: ->
    if !@isActive()
      @value = true
      @changed()
      @collection.add @_id

  deactivate: ->
    if @isActive()
      @value = false
      @changed()
      @collection.remove @_id

  toggleActivation: ->
    if @isActive() then @deactivate() else @activate()

  depend: ->
    @_dep.depend()

  changed: ->
    @_dep.changed()
    

    


# ====================================

PhraseActiveCollection = new ActiveStateCollection

