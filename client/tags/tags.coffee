# subscribe to all tags that the server is publishing
App.subs.tags = Meteor.subscribe 'tags'

# This user's tags
Template.tagNav.tags = ->
  uniqueTags = [];
  userPhrases = Phrases.find({userId: Meteor.userId()}).forEach (phrase) ->
    _.each phrase.tags, (tag) ->
      if !_.contains uniqueTags, tag
        uniqueTags.push tag

  Tags.find({_id: {$in: uniqueTags}}, {sort: title: 1})


Template.tagNav.rendered = ->
  console.log 'tagNav rendered', this  if App.perfDebugging


# return 'active' class if contained in the activeTags list
Template.tagNavItem.activeClass = ->
  (if @isActive() then 'active' else '')


# Tag's phrase-count
Template.tagNavItem.count = ->
  # get all phrases for this user where it has this as one of it's tags
  Phrases.find(tags: @_id).count()

# when a tag template is destroyed, let's make sure it's deactivated
Template.tagNavItem.destroyed = -> @data.deactivate()


# click on tag to make it 'active'
Template.tagNavItem.events click: (e) ->
  e.preventDefault()
  @toggleActivation()

Template.tagNavItem.rendered = ->
  
  # automatically deactivate tags with zero phrases
  # this will ensure the when Phrases are deleted, 
  # that the phrases list doesn't go blank afterwards
  @data.deactivate if @data.isActive() and not Phrases.find(tags: @data._id).count()
  console.log 'tagNavItem rendered', this  if App.perfDebugging


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
  @toggleActivation()

# return 'active' class if contained in the activeTags list
Template.tagLink.activeClass = ->
  (if @isActive() then 'active' else '')

Template.tagLink.rendered = ->
  console.log 'tagLink rendered', this  if App.perfDebugging

# return 'active' class if contained in the activeTags list
Template.tagSpan.activeClass = ->
  (if @isActive() then 'active' else '')

Template.tagSpan.rendered = ->
  console.log 'tagSpan rendered', this  if App.perfDebugging