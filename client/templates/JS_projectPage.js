Template.projectPage.helpers({
	"pname":function(){
		var user = Meteor.userId();
		var projectId = this._id;

		console.log("JS project list asking ? ");
		

		if(!user){return}//give up
		if(!project){return}//no project, give up

		
		console.log("Which project are we in? " + projectId);

		return projectId.pname;
	}
});