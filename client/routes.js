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
Router.route('/projectPage', {
  name: 'projectPage',
  template: 'projectPage'
});