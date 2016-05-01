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
		if(newTryTask == ''){
			newTryTask = defaultname();
		}	
		//the data object for the TryTask collection
		var data = {
			name: newTryTask
		}
		return TryTasks.insert(data);
	},
	
});
