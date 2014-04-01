if App.perfDebugging
  _.each Template, (template, name) ->
    oldRender = template.rendered
    counter = 0

    template.rendered = ->
      console.log name, "render count: ", ++counter
      oldRender && oldRender.apply this, arguments

