# Phrase model
class @Phrase extends Model
  constructor: (doc) ->
    # call constructor for Model class
    super(doc)
    @activeState = PhraseActiveStateCollection.getModelInstance @_id

  isActive: ->
    @activeState.isActive()

  activate: ->
    @activeState.activate()

  deactivate: ->
    @activeState.deactivate()

  toggleActivation: ->
    @activeState.toggleActivation()