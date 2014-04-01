# namespace for app helpers
@App = {} if typeof App is 'undefined'


# Debugging
App.perfDebugging = false

try
  App.perfDebugging = (if RequestData.get('perfDebugging') is 'true' then true else false)


# register app logger
# App.log = Observatory.getToolbox()
