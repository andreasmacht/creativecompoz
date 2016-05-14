Template.projectPage.helpers({
	"pname":function(){
		var user = Meteor.userId();
		var projectId = this._id;
		console.log("HELLO USER! " + user + " this is your project: "+ projectId);
		if(!user){return}//give up
		if(!projectId){return}//no project, give up
		return this.pname;
	},
	"document":function(){
		var user = Meteor.userId();
		var currentProject = this._id;
		if(!user){return};
		if (!currentProject) {return};

		return Documents.find({owner:user, project:currentProject}, {sort: {createdAt: -1}});		
	}
});

Template.projectPage.events({
	//zum direkten Ändern im Eingabefeld
	"keyup [name=currentProject]":function(event){
		event.preventDefault();
		var user = Meteor.userId();
		if(!user){return;}
		if(event.which == 13 || event.which == 27){
			$(event.target).blur();
		}
		var projectId = this._id;
		var pname = $(event.target).val();
		Meteor.call("updateProjectName", projectId, pname, user, function(err, res){
            if(err){
                console.log("update Project Name Error " + err.reason);

            }

        });

    },
    "click .js-newDoc":function(event){
    	event.preventDefault();
    	var user = Meteor.userId();
    	var currentProject = this._id;
    	var docTitle = $('[name=documentTitle]').val();
    	var docAbout = $('[name=documentAbout]').val();

    	if(!user){return};//no user, give up

    	if (!currentProject) {return}; //no project, give up
    	//creating a document now
    	Meteor.call("createDoc", docTitle, docAbout, user, currentProject, function(err, res){
    		if(err){
    			console.log(err.reason);
    		}
    	});

    },
    "click .js-delete-document":function(event){
    	event.preventDefault();
    	var user = Meteor.userId();
    	var currentDocument = this._id;
    	console.log(currentDocument);
    	if(!user){return};//no user, give up

    	if (!currentDocument) {return}; //no project, give up
    	Meteor.call("removeDoc", user, currentDocument, function(err, res){
    		if (err) {console.log(err.reason)};
    	});
    }
   
    
});