Template.projectList.helpers({
	"project":function(){
		var user = Meteor.userId();
		console.log("user id " + user);
		var projects = Projects.find({owner:user}, {sort:{createdAt: -1}});
			
		return projects;
	}
});

Template.projectList.events({
	"click .js-delete-project":function(event){
		var user = Meteor.userId();
		var projectId = this._id;
		if(user){
			Meteor.call("removeProject", projectId, user, function(err,res){
				if(err){
					console.log(err.reason);
				}
			})
		}
		
	}
});