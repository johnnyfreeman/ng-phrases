// allows user to login with their provider id
Meteor.autologin = Accounts.callLoginMethod.bind(Accounts, 
{
  methodArguments: [{autologin: true}],
  userCallback: function(error) {
    if (error) {
      console.log(error);
    };
  }
});

// if not logged in.. try autologin via provider id
// see packages/send-to-nextgen/send-to-nextgen.js
if (Meteor.userId() === null) {
  Meteor.autologin();
};


// // allows user to login with their provider id
// Meteor.loginWithProviderId = function(providerId, callback) {
//   //send the login request
//   Accounts.callLoginMethod({
//     methodArguments: [{providerId: providerId}],
//     userCallback: callback
//   });
// };