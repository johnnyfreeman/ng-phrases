activeState = 'activeState'

# provides an active state for a model
class @ActiveState

  # toggles active state
  toggleActivation: ->
    if @isActive() then @deactivate() else @activate()

  # deactivate
  deactivate: ->
    namespace = activeState + '.' + @activeStateNamespace
    if @isActive()
      Session.set namespace + '.' + @_id, false
      allActive = Session.get(namespace)
      allActive.remove(@_id)
      Session.set namespace, allActive

  # activate
  activate: ->
    namespace = activeState + '.' + @activeStateNamespace
    if !@isActive()
      Session.set activeState + '.' + @activeStateNamespace + '.' + @_id, true
      allActive = Session.get(namespace)
      allActive.push(@_id)
      Session.set namespace, allActive

  # is this object in it's active state?
  isActive: ->
    Session.equals activeState + '.' + @activeStateNamespace + '.' + @_id, true

# # global helper to get all active based on namespace
# ActiveState.allActive = (namespace) ->
#   namespace += '.'
#   active = []
#   for key of Session.keys
#     # avoid looping through prototypes
#     continue unless Session.keys.hasOwnProperty(key)
    
#     # if this key is an activePhrase key
#     # and it is set to true, add to array
#     active.push key.substr(namespace.length) if key.indexOf(namespace) is 0 and Session.get(key)
#   # return active ids in namespace
#   active