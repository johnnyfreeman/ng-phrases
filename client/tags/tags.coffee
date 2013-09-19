# subscribe to all tags that the server is publishing
App.subs.tags = Meteor.subscribe("tags")

# This user's tags
Template.tagNav.tags = ->
  Tags.find {},
    sort:
      title: 1


Template.tagNav.rendered = ->
  console.log "tanNav rendered", this  if App.perfDebugging


# return "active" class if contained in the activeTags list
Template.tagNavItem.active = ->
  (if @isActive() then "active" else "")


# Tag's phrase-count
Template.tagNavItem.count = ->
  
  # get all phrases for this user where it has this as one of it's tags
  Phrases.find(tags: @_id).count()


# click on tag to make it "active"
Template.tagNavItem.events click: (e) ->
  e.preventDefault()
  @toggleActivation()

Template.tagNavItem.rendered = ->
  
  # automatically deactivate tags with zero phrases
  # this will ensure the when Phrases are deleted, 
  # that the phrases list doesn't go blank afterwards
  @data.deactivate if @data.isActive() and not Phrases.find(tags: @data._id).count()
  console.log "tagNavItem rendered", this  if App.perfDebugging


# auto activate tags
try
  autoActivate = RequestData.get("tags")

# do nothing

# if tags param passed
# do auto activation
if autoActivate
  Meteor.startup ->
    Deps.autorun (autorun) ->
      if App.subs.tags.ready()
        tags = RequestData.get("tags").split(",")
        Tags.find(title:
          $in: tags
        ).forEach (tag) ->
          tag.activate()

        autorun.stop()



# activate tag when clicking on tag
Template.tagLink.events click: ->
  console.log @activate, this
  @activate()

Template.tagLink.rendered = ->
  console.log "tagLink rendered", this  if App.perfDebugging

Template.tagSpan.rendered = ->
  console.log "tagSpan rendered", this  if App.perfDebugging