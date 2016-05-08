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
	Template.tryaudiolist.onRendered(function() {
    	console.log("entering onRendered tryaudiolist");
    	var myp5 = new p5(sketch1, "s");
    
	})

	Template.trytasklist.onRendered(function(){
		console.log("entering onRendered trytasklist");
		tryInitNetworkView();
	})

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
	Template.trytasklist.helpers({
		showTryTask:function(){
			//look if there is a trytask
			console.log("what tasks");
			console.log(TryTasks.find({sort: {createdOn:-1}}));
			return TryTasks.find({sort: {createdOn:-1}});

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
  var trytasks = TryTasks.find({});
  var nodes = new Array();
  var ind = 0;
  // iterate the tasks, converting each task into 
  // a node object that the visualiser can understand
    trytasks.forEach(function(name){
      // set up a label with the task name
     var label = "ind: "+ind;
     if (trytasks.name != undefined){// we have a name
          label = trytasks.name + " - " + " Tryout";
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


