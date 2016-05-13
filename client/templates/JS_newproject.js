Template.newproject.events({
	"submit form":function(event){
		event.preventDefault();
		var user = Meteor.userId();
		
		var pname = $('[name=pname]').val();
		var pdescription = $('[name=pdescription]').val();
		var pcategory = $('[name=pcategory]').val();
		var isPrivate = $('[name=isPrivate]').val();
		if(user){
			Meteor.call("createProject", pname, pdescription, pcategory, isPrivate, function(err, res){
				if(err){
					console.log(error.reason);
				}
				else{
					console.log(res);
					Router.go('projectPage', {_id: res});

					//set to default
					$('[name=pname]').val("");
					$('[name=pdescription]').val("");
					$('[name=pcategory]').val("");
					$('[name=isPrivate]').val("unchecked");
				}
			})
		}	
	}
	
});