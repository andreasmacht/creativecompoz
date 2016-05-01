if (Meteor.isServer) {
  Meteor.startup(function () {
    // Insert a start document for the tryout template with TryDocuments collection
    if(!TryDocuments.findOne()){ //there is no document yet
    	TryDocuments.insert({title:"try out"});
    }
  });
}
