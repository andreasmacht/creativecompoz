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
	}
});
