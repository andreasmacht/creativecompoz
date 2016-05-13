	Template.navigation.events({
        "click .js-logout":function(event){
            event.preventDefault();
            console.log("inside the navigation event.");
            Meteor.logout(function(err,res){
              if(err){
                console.log(err.reason);
              }
            });
            console.log("user logged in?");

            //logged out users to be redirected to the start page again
            Router.go('login');
        }

    });