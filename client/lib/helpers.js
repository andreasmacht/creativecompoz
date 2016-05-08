////////////////
//////helpers.js
////////////////

/**
* Generate a default name for any Trytask that is left empty
* by the user
* returns the task name
*/
function defaultName() {
    var nextLetter = 'A'
    var nextName = 'Task ' + nextLetter;
    while (TryTasks.findOne({ name: nextName })) {
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        nextName = 'Task ' + nextLetter;
    }
    return nextName;
}


