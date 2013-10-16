if App.perfDebugging
  _.each Template, (template, name) ->
    oldRender = template.rendered
    counter = 0

    template.rendered = ->
      App.log.info name, "render count: ", ++counter
      oldRender && oldRender.apply this, arguments

