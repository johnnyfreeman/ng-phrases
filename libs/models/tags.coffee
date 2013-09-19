# Tag model
class @Tag extends Model
  constructor: (doc) ->
    super(doc)
    @activeStateNamespace = 'tags'
    key = 'activeState.' + @activeStateNamespace + '.' + @_id
    
    # create session variables 
    Session.setDefault key, false if Session.equals(key, undefined)
    Session.setDefault 'activeState.' + @activeStateNamespace, [] if Session.equals('activeState.' + @activeStateNamespace, undefined)

# mixin for active state
_.extend Tag.prototype, ActiveState.prototype