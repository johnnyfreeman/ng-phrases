@PopoverCollection = ->
  # props
  @id = null
  @popovers = []

# show all in a collection
PopoverCollection::show = (options) ->

# hide all in a collection
PopoverCollection::hide = (options) ->

# add a popover instance to this collection
PopoverCollection::add = (popover) ->
  popover.collection = this
  @popovers.push popover

PopoverCollection::on = (eventName, callback) ->
  bean.on this, 'popover.' + eventName + '.' + @id, callback

PopoverCollection::one = (eventName, callback) ->
  bean.one this, 'popover.' + eventName + '.' + @id, callback

PopoverCollection::off = (eventName, callback) ->
  bean.off this, 'popover.' + eventName + '.' + @id, callback

PopoverCollection::fire = (eventName) ->
  bean.fire this, 'popover.' + eventName + '.' + @id