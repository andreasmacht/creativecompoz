///////////////
////methods.js
///////////////
Meteor.methods({
	/**
	* Try Editor Methods go here
	*/
	"createNewTryTask":function(newTryTask){
		//if the newTryTask is empty, 
		//give it a standard name
		/*if(newTryTask == ' '){
			newTryTask = defaultname();
		}*/	
		//the data object for the TryTask collection
		var data = {
			name: newTryTask,
			createdBy: "anonymous",
			createdAt: new Date()
		}
		return TryTasks.insert(data);
	},
	/************newproject**************/
	"createProject":function(name, description, category, isPrivate){
		var user = Meteor.userId();
		console.log("currently logged on: ");
		console.log(user);
		var data;
		if(user){
			data = {
				pname:name,
				pdescription:description,
				pcategory: category,
				pisPrivate: isPrivate,
				createdAt: new Date(),
				owner: user
			};
			console.log("show me data object");
			console.log(data);
		 return	Projects.insert(data);
		}
		else{
			throw new Meteor.Error("not logged in", "You are not logged in.");
		}
	},

	/****************Delete project********************/
	"removeProject":function(projectid, owner){
		var user = Meteor.userId();
		var data;
		if(user == owner){
			data = {
				_id:projectid,
				owner:owner
			}

			Projects.remove(data);	
		}
	},

	/************update the project name *******************/
	"updateProjectName":function(projectid, pname, owner){
		var user = Meteor.userId();
		console.log(user);
		var data;
		if(user == owner){
			data = {
				_id:projectid,
				owner:owner
			}
			
			return Projects.update(data, {$set: {pname:pname}});
		}
	},

	/*******************Create a new document for a project**********/
	"createDoc":function(docTitle, docAbout, docCategory, owner, currentProject){
		var currentUser = Meteor.userId();
		var data = {
			docTitle:docTitle,
			docAbout:docAbout,
			docCategory:docCategory,
			owner:owner,
			project:currentProject,
			createdAt: new Date()
		};
		//is the user logged in 
		if(!currentUser){
			throw new Meteor.Error("not logged in", "you are not logged in.");
		}
		//check if the user is the owner of the project
		var currentProject = Projects.findOne(currentProject);
		if(currentProject.owner != currentUser){
			throw new Meteor.Error("invalid user", "you are not the owner of that project");
		}

		return Documents.insert(data);
	},

	/****************Delete a document **********************/
	"removeDoc":function(owner, docid){
		var currentUser = Meteor.userId();
		var data;
		if(!currentUser){
			throw new Meteor.Error("not logged in", "you are not logged in.");
		}
		if(currentUser == owner){
			data = {
				_id:docid,
				owner:owner
			}
			console.log(data);
			return Documents.remove(data);
		}

	},

	/****************Update the title of a document*******************/
	"updateDocTitle":function(documentid, docTitle, owner){
		var user = Meteor.userId();
		var data;
		if(user == owner){
			data = {
				_id:documentid,
				owner:owner
			}
			return Documents.update(data, {$set: {docTitle:docTitle}});
		}

	}
});