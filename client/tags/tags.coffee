# subscribe to all tags that the server is publishing
App.subs.tags = Meteor.subscribe 'userTags'


# This user's tags
Template.tagNav.tags = ->
  Tags.find({}, {sort: title: 1})


Template.tagNav.loading = ->
  App.subs.tags && !App.subs.tags.ready()


# return 'active' class if contained in the activeTags list
Template.tagLinkWithCount.activeClass = ->
  (if @isActive() then 'active' else '')


# Tag's phrase-count
Template.tagLinkWithCount.phraseCount = ->
  # get all phrases for this user where it has this as one of it's tags
  @getPhrases().count()

# when a tag template is destroyed, let's make sure it's deactivated
Template.tagLinkWithCount.destroyed = ->
  @data.deactivate()


# click on tag to make it 'active'
Template.tagLinkWithCount.events click: (e) ->
  e.preventDefault()
  # show loader
  App.loader.show()
  # hide loader after flush is finished
  Deps.afterFlush ->
    App.loader.hide()
  # toggle activation for this tag
  @toggleActivation()

Template.tagLinkWithCount.rendered = ->

  # automatically deactivate tags with zero phrases
  # this will ensure the when Phrases are deleted,
  # that the phrases list doesn't go blank afterwards
  @data.deactivate if @data.isActive() and not Phrases.find(tags: @data._id).count()


# auto activate tags
try
  autoActivate = RequestData.get('tags')

# do nothing

# if tags param passed
# do auto activation
if autoActivate
  Meteor.startup ->
    Deps.autorun (c) ->
      if App.subs.tags.ready()
        tags = RequestData.get('tags').split(',')
        Tags.find(title:
          $in: tags
        ).forEach (tag) ->
          tag.activate()
        c.stop()



# activate tag when clicking on tag
Template.tagLink.events click: (e) ->
  e.preventDefault()
  # show loader
  App.loader.show()
  # hide loader after flush is finished
  Deps.afterFlush ->
    App.loader.hide()
  # toggle activation for this tag
  @toggleActivation()

# return 'active' class if contained in the activeTags list
Template.tagLink.activeClass = ->
  (if @isActive() then 'active' else '')

# return 'active' class if contained in the activeTags list
Template.tagSpan.activeClass = ->
  (if @isActive() then 'active' else '')
