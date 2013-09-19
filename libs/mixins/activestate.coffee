activeState = 'activeState'

# provides an active state for a model
class @ActiveState

  # toggles active state
  toggleActivation: ->
    key = activeState + '.' + @activeStateNamespace + '.' + @_id
    Session.set key, !Session.get(key)

  # deactivate
  deactivate: ->
    Session.set activeState + '.' + @activeStateNamespace + '.' + @_id, false

  # activate
  activate: ->
    Session.set activeState + '.' + @activeStateNamespace + '.' + @_id, true

  # is this object in it's active state?
  isActive: ->
    Session.equals activeState + '.' + @activeStateNamespace + '.' + @_id, true


ActiveState.allActive = (namespace) ->
  namespace += '.'
  active = []
  for key of Session.keys
    # avoid looping through prototypes
    continue unless Session.keys.hasOwnProperty(key)
    
    # if this key is an activePhrase key
    # and it is set to true, add to array
    active.push key.substr(namespace.length) if key.indexOf(namespace) is 0 and Session.equals(key, true)
  # return active ids in namespace
  active