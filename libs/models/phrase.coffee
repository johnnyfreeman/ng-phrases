# Phrase model
class @Phrase extends Model
  constructor: (doc) ->
    super(doc)
    
    if Meteor.isClient
      @activeStateNamespace = 'phrases'
      key = 'activeState.' + @activeStateNamespace + '.' + @_id
      
      # create session variables 
      Session.setDefault key, false if Session.equals(key, undefined)
      Session.setDefault 'activeState.' + @activeStateNamespace, [] if Session.equals('activeState.' + @activeStateNamespace, undefined)

# mixin for active state
_.extend Phrase.prototype, ActiveState.prototype
