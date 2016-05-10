///////////
////Routing
///////////
Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'start',
  template: 'start'
});

Router.route('/register', {
  name: 'register',
  template: 'register'
});
Router.route('/login', {
  name: 'login',
  template: 'login'
});
Router.route('/tryout', {
  name: 'tryout',
  template: 'tryout'
});
Router.route('/tryAudio', {
  name: 'tryAudio',
  template: 'tryAudio'
});
Router.route('/about', {
  name: 'about',
  template: 'about'
});
Router.route('/home', {
  name: 'home',
  template: 'home'
});
Router.route('/newproject', {
	name: 'newproject',
	template: 'newproject'
});
Router.route('/searchproject', {
	name: 'searchproject',
	template: 'searchproject'
});


if (Meteor.isClient) {

///////////////////////////////////////////////
///////onRendered functions for tryout section
///////////////////////////////////////////////
	Template.tryaudiolist.onRendered(function() {
    	console.log("entering onRendered tryaudiolist");
    	var myp5 = new p5(sketch1, "s");
    
	});
	/*********************************Login Temlplate **********************************************/
	Template.login.onRendered(function(){
		var validator = $('.login').validate({
            submitHandler: function(event){
                var email = $('[name=email]').val();
                var password = $('[name=password]').val();
                Meteor.loginWithPassword(email, password, function(error){
                    if(error){
                        if(error.reason == "User not found"){
                            validator.showErrors({
                                email: "That email doesn't belong to a registered user."   
                            });
                        }
                        if(error.reason == "Incorrect password"){
                            validator.showErrors({
                                password: "You entered an incorrect password."    
                            });
                        }
                    }
                    else{
                        var currentRoute = Router.current().route.getName();
                        if(currentRoute == "login"){
                            Router.go("home");
                        }
                    }
                });
            }, 
            rules:  {
                email: {
                    required: true,
                    email: true

                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                email: {
                    required: "You must enter a valid email address!",
                    email:"Enter a valid email address"
                },
                password: {
                    required: "You forgot to enter your password!",
                    password: "Seems you typed it wrong",
                    minlength: "Too short, has to be min 6 characters!"
                }
            }
        });
	});

	/*********************************Register Temlplate **********************************************/

     Template.register.onRendered(function(){
        var validator = $('.register').validate({
            submitHandler: function(){
            		var username = $('[name=name]').val();
                    var email = $('[name=email]').val();
                    var password = $('[name=password]').val();
                    //use accounts-password CreateUser function
                    Accounts.createUser({
                    	username: username,
                        email: email, 
                        password: password
                    }, function(error){
                        if(error){
                            if(error.reason == "Email already exists."){
                                validator.showErrors({
                                    email: "That email already belongs to a registered user."   
                                });
                            }
                        }
                        else{
                        //forward the user to the home page
                            Router.go('home');

                        }
                    });
            },
            rules: {
            	username: {
            		required: true
            	},
                email: {
                    required: true,
                    email: true

                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
            	username: "People may want to know you! Add a name!",
                email: {
                    required: "You must enter a valid email address!",
                    email:"Enter a valid email address"
                },
                password: {
                    required: "Hey, don't forget to enter a password!",
                    minlength: "Please be serious about your password, at least 6 characters!"
                }
            }
        });
    });

		/*Template.tryaudiolist.helpers({
		sketch:function(){
			console.log("rendering sketch2");
			p5sketch = new p5(sketch, "sketch");
			return p5sketch;	
		}
		
	})*/


/////////////////////////////////////
/////Helpers for the Tryout section
/////////////////////////////////////

	Template.tryTodoItem.helpers({
    	'checked':function(){
    		var isCompleted = this.completed;

    		if(isCompleted){
    			return "checked";
    		}
    		else {
    			return "";
    		}
    	}
    });

	Template.trytasklist.helpers({
		'task':function(){
			//look if there is a trytask
			console.log("")
			return TryTasks.find({createdBy: "anonymous"}, {sort: {createdAt:-1}});

		}
	});

	Template.tryeditor.helpers({
		'docid':function(){
			//look if there is a docid in TryDocuments collection
			var tryDoc = TryDocuments.findOne();
			if(tryDoc){//there is a document
				return tryDoc._id;
			}
			else {
				return undefined;
			}
		}
	});



////////////////////////////////////
/////Events for the Tryout section
////////////////////////////////////
	/*Template.tryaudiolist.events({
		"click #js-start":function(event){
			event.preventDefault();
			if(tryAudioRecorder.ready()){
				tryAudioRecorder.startRecording();	
			}
	
		},
		"click #js-stop":function(event){
			event.preventDefault();
			tryAudioRecorder.stopRecording();
		},
		"click #js-play":function(event){
			event.preventDefault();

			var audiodoc = tryAudioRecorder.findOne();
			if(audiodoc){//there is an audio doc, lets play it
				audiodoc.initPlayer(function(err, res){
					if(err){
						console.log(err.reason);
					}
					else{
						//what shall be here?
					}
				});
				//
				audiodoc.play(); //play the player

			}
		}
	})*/
	Template.audiotest.events({
		'click .js-record':function(event){
			event.preventDefault();
			tryAudioRecorder.startRecording();
		},
		'click .js-stoprecord':function(event){
			event.preventDefault();
			tryAudioRecorder.stopRecording();
		},
		'click .js-play':function(event){
			event.preventDefault();
			var doc = tryAudioRecorder.findOne();
			console.log("my audio doc:" + doc);

			if(tryAudioRecorder.ready()){
				doc.play();
			}
		}
	});

	Template.navbar.events({
        'click .logout':function(event){
            event.preventDefault();
            Meteor.logout();
            //logged out users to be redirected to the start page again
            Router.go('start');
        }

    });

	Template.trytasklist.events({
		"submit form":function(event){
			event.preventDefault();
			var newTryTask = $('[name=newTryTask]').val();
			console.log(newTryTask);

			//sofort als methods umsetzen
			Meteor.call("createNewTryTask", newTryTask, function(err, res){
				if(err){
					console.log(err.reason);
				}	
			});
			$('[name=newTryTask]').val('');
		}/*,
		"keyup [name=newTryTask]":function(event){
			event.preventDefault();
			if(event.which == 13 || event.which == 27){
    			$(event.target).blur();
    		}
    		var newTryTask = $(event.target).val();

    		Meteor.call("createNewTryTask", newTryTask, function(err, res){
				if(err){
					console.log(err.reason);
				}
			});
			$('[name=newTryTask]').val('');

		}*/
	});


}

/////////////////////////////////
//////visjs visulation functions
/////////////////////////////////

/**
* Generate a network of tasks with visjs
* 
* 
*/


// function that creates a new blobby visualisation
function tryInitNetworkView(){
  // clear out the old visualisation if needed
  if (visjsobj != undefined){
    visjsobj.destroy();
  }
  // find all tasks from the TryTasks collection
  var trytasks = TryTasks.find();
  var nodes = new Array();
  var ind = 0;
  // iterate the tasks, converting each task into 
  // a node object that the visualiser can understand
    trytasks.forEach(function(name){
      // set up a label with the task name
     var label = "ind: "+ind;
     if (trytasks.name != undefined){// we have a name
          label = trytasks.name + " - " + " Tryout";
          console.log("the task name:" + label);

      } 
      
      // create the node and store it to the nodes array
        nodes[ind] = {
          id:ind, 
          label:label, 
        }
        ind ++;
    })
    // edges are used to connect nodes together. 
    // we don't need these for now...
    edges =[
    ];
    // this data will be used to create the visualisation
    var data = {
      nodes: nodes,
      edges: edges
    };
    // options for the visualisation
     var options = {
      nodes: {
        shape: 'dot',
      }
    };
    // get the div from the dom that we'll put the visualisation into
    container = document.getElementById('tryvisjs');
    // create the visualisation
    visjsobj = new vis.Network(container, data, options);
}


