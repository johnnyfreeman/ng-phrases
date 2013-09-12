Meteor.startup(function() {
  // Define the tour
  var tour = {
    id: "tour",
    steps: [
      {
        title: "Create a Phrase",
        content: "Create new phrases at your descretion. There are no character limits. No restrictions of any kind. Go nuts!",
        target: "#addPhrase",
        placement: "bottom",
        xOffset: -10,
        width: 300,
        
      }
    , {
        title: "Settings",
        content: "We've added a few settings that we think will be useful. Check 'em out!",
        target: "#settingsBtn",
        placement: "left",
        yOffset: -10,
        width: 300,
        showPrevButton: true,
        xOffset: 31,
        arrowOffset: 20
    }
    ]
  };

  // Start the tour!
  hopscotch.configure({
    arrowWidth: 10
  });

  hopscotch.startTour(tour);
});