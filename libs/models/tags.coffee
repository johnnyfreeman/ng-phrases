# Tag model
class @Tag extends Model
  constructor: (doc) ->
    super(doc)
    @activeStateNamespace = 'tags'
    key = 'activeState.' + @activeStateNamespace + '.' + @_id
    if Session.equals(key, undefined)
      console.log 'setting default session:', key
      Session.setDefault key, false

# mixin for active state
_.extend Tag.prototype, ActiveState.prototype