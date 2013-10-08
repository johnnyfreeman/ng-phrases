@Popover = ->
  
  # props
  @xPosition = 0
  @yPosition = 0
  @width = 0
  @height = 0
  @triggerElement = null
  @id = null
  @collection = null

# show this popover
Popover::show = (options) ->

# hide this popover
Popover::hide = (options) ->

# add this popover to a collection
Popover::addTo = (collection) ->
  @collection = collection
  collection.popovers.push this

Popover::on = (eventName, callback) ->
  bean.on @collection, 'popover.' + eventName + '.' + @collection.id + '.' + @id, callback

Popover::one = (eventName, callback) ->
  bean.one @collection, 'popover.' + eventName + '.' + @collection.id + '.' + @id, callback

Popover::off = (eventName, callback) ->
  bean.off @collection, 'popover.' + eventName + '.' + @collection.id + '.' + @id, callback

Popover::fire = (eventName) ->
  bean.fire @collection, 'popover.' + eventName + '.' + @collection.id + '.' + @id