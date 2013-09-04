// allows user to login with their provider id
Meteor.autologin = Accounts.callLoginMethod.bind(Accounts, 
{
  methodArguments: [{autologin: true}],
  userCallback: function(error) {
    if (error) console.log(error);
  }
});

// if not logged in.. try autologin via provider id
// see packages/send-to-nextgen/send-to-nextgen.js

if (Meteor.userId() === null) {
  Meteor.autologin();
}

// if logged in, make sure autologinId matches 
// current logged in user
else {
  // console.log(RequestData.get('alid'));
  // console.log(Meteor.user().profile.autologinId);
  // console.log(Meteor.user().profile.autologinId == RequestData.get('alid'));
}