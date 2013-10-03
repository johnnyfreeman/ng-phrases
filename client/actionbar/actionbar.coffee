# plugins
Template.actionBar.rendered = ->
  
  # PLACEHOLDER
  $('input[placeholder]').placeHolder()
  
  # Init popups
  $('[data-popup]').popup()
  $('#addPhraseForm').show()  if Session.get('phraseInEdit')

Template.actionBar.events
  
  # SEARCH FILTERING
  'input input.search': (e) ->
    
    # get search term
    term = $(e.currentTarget).val()
    
    # loop through the list of fields and get all with
    $('#phrases li').hide().contents().each ->
      $this = $(this)
      haystack = $this.text().toLowerCase()
      needle = term.toLowerCase()
      $this.closest('li').show()  if _.str.contains(haystack, needle)


  
  # add new phrase
  'submit #addPhraseForm': (e) ->
    e.preventDefault()
    $form = $(e.currentTarget)
    $idField = $form.find('input.id')
    $titleField = $form.find('input.title')
    $tagsField = $form.find('input.tags')
    $bodyField = $form.find('textarea')
    tagIds = []
    tags = []
    
    # get tag ids
    if $tagsField.val().length
      tags = $tagsField.val().split(',')
      
      # get tag ids
      _.each tags, (tagId) ->
        title = undefined
        if tagId.indexOf('NEW:') is 0
          title = tagId.substr(4)
          tagId = Tags.insert(title: title)
        tagIds.push tagId

    phrase =
      title: $titleField.val()
      text: $bodyField.val()
      tags: tagIds
      userId: Meteor.userId()
      timestamp: new Date()

    
    # do update or insert
    if Session.get('phraseInEdit')
      Phrases.update $idField.val(),
        $set: phrase
      , AddPhraseFormHelper.afterSave
    else
      Phrases.insert phrase, AddPhraseFormHelper.afterSave

  
  # EXPANDING SEARCH FIELD
  'focus input.search': (e) ->
    $(e.currentTarget).animate width: 285

  'blur input.search': (e) ->
    $input = $(e.currentTarget)
    $input.animate width: 185  if 0 is $input.val().length

  
  # make double sure the phrase form is clear 
  # when clicking the add phrase button
  'click #addPhrase': (e) ->
    Session.set 'phraseInEdit', null

Template.actionBar.phraseInEdit = ->
  phraseInEdit = Phrases.findOne(Session.get('phraseInEdit'))
  unless phraseInEdit
    phraseInEdit =
      _id: ''
      title: ''
      text: ''
      tags: []
  phraseInEdit