	Template.navigation.events({
        "click .js-logout":function(event){
            event.preventDefault();
            
            Meteor.logout(function(err,res){
              if(err){
                console.log(err.reason);
              }
            });
            
            //logged out users to be redirected to the start page again
            Router.go('start');
        }

    });