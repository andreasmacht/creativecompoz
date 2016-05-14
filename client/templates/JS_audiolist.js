Template.audiolist.onRendered(function() {
	console.log("entering onRendered audiolist");
	
        new p5(sketch1, "sketch");

});

Template.audiolist.events({
    "click .js-reloadAudio": function(){
        new p5(sketch1, "sketch1");
        $('[name=initial]').hide

    }

});