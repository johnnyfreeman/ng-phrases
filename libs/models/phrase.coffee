# Phrase model
class @Phrase extends Model
  constructor: (doc) ->
    super(doc)
    @activeStateNamespace = 'phrases'
    key = 'activeState.' + @activeStateNamespace + '.' + @_id
    if Session.equals(key, undefined)
      console.log 'setting default session:', key
      Session.setDefault key, false

# mixin for active state
_.extend Phrase.prototype, ActiveState.prototype