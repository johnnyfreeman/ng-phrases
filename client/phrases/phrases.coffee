# subscribe to all phrases that the server is publishing
App.subs.phrases = Meteor.subscribe('phrases')
Template.phrases.phrases = ->
  
  # get phrases based on active tags
  activeTags = TagActiveStateCollection.getAll()
  selector = {}

  # limit results to those who have ALL active tags
  if activeTags.length > 0
    selector['tags'] = {$all: activeTags} 

  # build sort object
  sort = {}
  sortKey = Settings.get('sortPhrasesBy')
  sort[sortKey] = (if sortKey is "timestamp" then -1 else 1)

  # return Phrases cursor
  Phrases.find selector, {sort: sort}


Template.phrases.events 'submit form': (e) ->
  
  # submit normally if delete mode off
  return  unless Settings.get('bulkDeleteMode')
  
  # prevent form submission
  e.preventDefault()

  confirmed = confirm 'Are you sure you want to permenantly delete ALL the selected phrases?'
  
  if confirmed
    # delete all active phrases
    Meteor.call 'removePhrases', PhraseActiveStateCollection.getAll(), (error, result) ->
      if error
        Notifications.insert
          iconClass: 'icon-warning-sign'
          message: error.message
          type: 'danger'
          timeout: 0
          closeBtn: true

        return

      # deactivate all phrases
      PhraseActiveStateCollection.deactivateAll()

      message = (if PhraseActiveStateCollection.getAll().length is 1 then 'Phrase deleted!' else 'Phrases deleted!')
      
      # notification
      Notifications.insert
        iconClass: 'icon-remove'
        message: message
        type: 'success'
        timeout: 2000
        closeBtn: false


Template.phrases.rendered = (e) ->
  
  # slimscroll for phrases
  $(@find('.scroll')).slimScroll
    color: '#999'
    size: '5px'
    height: '429px'

  
  # reset the action bar shadow when phrases 
  # are (re)rendered to keep ui consistant
  $('.action-bar').css 'box-shadow', 'none'

Template.phrases.bulkDeleteMode = ->
  (if Settings.get('bulkDeleteMode') then 'bulk-delete-mode' else '')

Template.phraseItem.active = ->
  (if @isActive() then 'active' else '')

Template.phraseItem.checked = ->
  (if @isActive() then 'checked' else '')

Template.phraseItem.icon = ->
  (if @isActive() then 'icon-check' else 'icon-check-empty')

Template.phraseItem.tags = ->
  Tags.find _id:
    $in: @tags


Template.phraseItem.timeago = ->
  moment(@timestamp).fromNow()

Template.phraseItem.events
  click: (e) ->
    e.preventDefault()
    $target = $(e.currentTarget)
    
    # do nothing if delete or edit button clicked
    return  if $target.closest('.edit').length or $target.closest('.delete').length or $target.closest('.tag').length
    
    # activate the phrase
    @toggleActivation()

  
  # Edit phrase
  'click .edit': ->
    Session.set 'phraseInEdit', @_id

  
  # Delete phrase
  # TODO: add confirmation for better user experience
  'click .delete': ->
    
    # Notifications.insert({iconClass:'icon-warning-sign',message:'Are you sure you want to delete this phrase? Yes No', type: 'warning', timeout: 0, closeBtn: true});
    
    id = @_id

    confirmed = confirm 'Are you sure you want to permenantly delete this phrase?'
  
    if confirmed

      # delete all active phrases
      Meteor.call 'removePhrases', [id], (error, result) ->
        if error
          Notifications.insert
            iconClass: 'icon-warning-sign'
            message: error.message
            type: 'danger'
            timeout: 0
            closeBtn: true

          return

        # deactivate the phrase since it is now deleted
        PhraseActiveStateCollection.deactivate(id)
        
        # notification
        Notifications.insert
          iconClass: 'icon-ok'
          message: 'Phrase deleted'
          type: 'success'
          timeout: 2000
          closeBtn: false



Session.setDefault 'phraseInEdit', null

# render tags field value
Template.addPhraseForm.tags = ->
  @tags.join ','


# the popup title depends on 
Template.addPhraseForm.id = ->
  (if @_id.length then @_id else false)

Template.addPhraseForm.isEditing = ->
  Session.get('phraseInEdit') isnt null


# global var to store the 
# selectize instance in
AddPhraseFormHelper.selectize = null
Template.addPhraseForm.rendered = ->
  # init selectize
  $tags = $(@find('input.tags'))
  
  # little garbage collection
  AddPhraseFormHelper.selectize.destroy()  if AddPhraseFormHelper.selectize
  
  # init new inst of selectize
  $tags.selectize
    delimiter: ','
    persist: false
    create: (input) ->
      search = new RegExp('^' + input + '$', 'i')
      result = Tags.findOne(title: search)
      
      # if not found
      unless result
        result =
          title: input
          _id: 'NEW:' + input
      result

    valueField: '_id'
    labelField: 'title'
    searchField: ['title']
    options: Tags.find().fetch()
    maxOptions: 5
    sortField: 'title'

  
  # save new instance
  AddPhraseFormHelper.selectize = $tags[0].selectize

# Meteor.startup(function() {
#   Deps.autorun(function() {
#     console.log('refreshing selectize options...');
#     if (!AddPhraseFormHelper.selectize) 
#       return;

#     AddPhraseFormHelper.selectize.clearOptions();

#     Tags.find().forEach(function(tag) {
#       AddPhraseFormHelper.selectize.addOption(tag);
#     });

#   });
# });