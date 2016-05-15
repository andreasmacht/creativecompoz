### CreativeCompoz - a real-time collaborative creative composition app

# About this application:
Creative Compoz is a real-time collaborative app that allows creative content
creation. It has been designed for creative people who are looking for a
tool that enables them to collaboratively work in teams - independent from
their location.

Users can create projects and documents within the projects. Each document is
given a category and the project can be defined private or public.

Other users can search for public projects they want to join and contribute to.

Audio recording features have been added with the open source p5.js sound library.
See https://p5js.org


### creating the project in the console

    $ meteor create creativecompoz --release 1.2.1 (--> has been used for this project)
    $ cd creativecompoz

### Added packages

    $ meteor add twbs:bootstrap
    $ meteor add accounts-password
    $ meteor add iron:router
    $ meteor add mizzao:sharejs
    $ meteor add themeteorchef:jquery-validation

#### The Github repository
All project progress has been replicated on github. Look up
https://github.com/andreasmacht/creativecompoz

### Finally,

This app has been made with love. It is still work in progress. Features to add in the future:

1. More features depending on Projects and Documents categories
2. More sophisticated editor functions (e.g. page scroll, security features
for editing and deleting)
3. Audio recordings solely on the server and Audio editing
4. Collaborative communication functions (e.g. chats and comments)
5. Last activities protocol on the Dashboard page
6. and more, depending on user feedback
