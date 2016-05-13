///////////
////Routing
///////////
Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'start',
  template: 'start'
});

Router.route('/register', {
  name: 'register',
  template: 'register'
});
Router.route('/login', {
  name: 'login',
  template: 'login'
});
Router.route('/tryout', {
  name: 'tryout',
  template: 'tryout'
});
Router.route('/tryAudio', {
  name: 'tryAudio',
  template: 'tryAudio'
});
Router.route('/about', {
  name: 'about',
  template: 'about'
});
Router.route('/home', {
  name: 'home',
  template: 'home'
});
Router.route('/newproject', {
	name: 'newproject',
	template: 'newproject'
});
Router.route('/searchproject', {
	name: 'searchproject',
	template: 'searchproject'
});
//Route for individual project page 
Router.route('/projects/:_id', {

  //Session.set("projectid", this.params._id);
  name: 'projectPage',
  template: 'projectPage',
  data: function(){
      console.log("you hit /projects  "+ this.params._id);
    var currentProject = this.params._id;
    console.log("what is the ID OF THE PROJECT?");
    console.log(currentProject);
    var currentUser = Meteor.userId();
    return Projects.findOne({_id:currentProject, owner: currentUser});
  },
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){ //logged in user??
      this.next();
    }
    else{
      ẗhis.render("login");
    }
  }
   
});