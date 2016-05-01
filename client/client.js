///////////
////Routing
///////////
Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
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


if (Meteor.isClient) {

///////////////////////////////////////////////
///////onRendered functions for tryout section
///////////////////////////////////////////////
	Template.tryaudiolist.onRendered(function(){
		new p5(sketch1, "sketch1");
	})

/////////////////////////////////////
/////Helpers for the Tryout section
/////////////////////////////////////
	Template.trytasklist.helpers({
		showTryTask:function(){
			//look if there is a trytask
			var trytask = TryTasks.findOne();
			if(trytask){
				return trytask.name; 
			}
			else{
				return undefined
			}

		}
	});

	Template.tryeditor.helpers({
		docid:function(){
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
	Template.tryaudiolist.events({
		".js-tryAudio":function(){
			console.log("now entering p5");
			//tryAudioP5();
		}
	});

	Template.trytasklist.events({
		"submit form":function(event){
			event.preventDefault();
			var newTryTask = $('[name=newTryTask]').val();

			//sofort als methods umsetzen
			Meteor.call("createNewTryTask", newTryTask, function(err, res){
				if(err){
					console.log(err.reason);
				}
				else{
					$('[name=newTryTask]').val('');
				}
			});
		},
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
				else{
					$('[name=newTryTask]').val('');
				}
			});

		}
	});


}

