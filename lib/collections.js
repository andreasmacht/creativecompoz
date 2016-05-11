
/***************the real collections***********************/
Projects = new Mongo.Collection("projects");
Documents = new Mongo.Collection("documents");

//A collection for the tryout block of the website with free user access
this.TryDocuments = new Mongo.Collection("trydocuments");
TryTasks = new Mongo.Collection("trytasks");

/////for audio recorder universe
 tryAudioRecorder = new UniRecorder({
        name: 'tryAudioCollection',
        targetFileFormat: 'ogg',
        serverDirectoryPath: '/tryAudioCollection'
    });


tryAudioRecorder.allow({
        // download & play
        download: function(token, audioDoc) {
            return true;
        },
        update: function(userId, doc){
            return true;
        }
    });