Template.tryout.events({
	"click .js-reset":function(event){
		event.preventDefault();
		//delete the existing one
		var currentDocumentID = TryDocuments.findOne()._id;

		TryDocuments.remove({_id:currentDocumentID});
		console.log("document " + currentDocumentID + " removed");
		TryDocuments.insert({title:"new doc"});
		//create a new one
	}

});