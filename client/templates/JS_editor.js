Template.editor.helpers({
	"docTitle":function(){
		var currentUser = Meteor.userId();
		var currentDocument = this._id;
		console.log("the current document: "+ currentDocument);

		return Documents.findOne({_id:currentDocument, owner:currentUser}).docTitle;
	},
	"docid":function(){
		setupCurrentDocument();
		return Session.get("documentid");
	}

});

Template.editor.events({
		//zum direkten Ändern im Eingabefeld
	"keyup [name=currentDocument]":function(event){
		event.preventDefault();
		var user = Meteor.userId();
		if(!user){return;}
		if(event.which == 13 || event.which == 27){
			$(event.target).blur();
		}
		var documentid = this._id;
		var docTitle = $(event.target).val();
		Meteor.call("updateDocTitle", documentid, docTitle, user, function(err, res){
            if(err){
                console.log("update Document Name Error " + err.reason);

            }

        });

    },
})


// helper to make sure a doc is available
function setupCurrentDocument(){
  var doc;
  if (!Session.get("documentid")){// no doc id set yet
    doc = Documents.findOne();
    if (doc){
      Session.set("documentid", doc._id);
    }
  }
}