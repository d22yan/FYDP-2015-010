Distributed Instant Messaging System
====================================

Project Abstract
----------------

>*To Be Updated

Implementation Plan
-------------------

Current plan is to make use of the following technologies in the client stack:

* [AngularJS](https://angularjs.org/) and HTML5, SASS & [Compass](http://compass-style.org/), 
    [Bootstrap](http://getbootstrap.com/) for the front-end UI.

* [TeleHash DHT](http://telehash.org/) and its [JavaScript implementation](https://github.com/telehash/node-telehash) 
    for the "back-end" AngularJS communication [service](https://docs.angularjs.org/guide/services).

* [ot.js](https://github.com/Operational-Transformation/ot.js) as the 
    [Operational Transformation](http://en.wikipedia.org/wiki/Operational_transformation) library used for message 
    synchronization between clients.

* [angular-local-storage](https://github.com/grevory/angular-local-storage) for storing user & contacts data locally, 
    [Dropbox API](https://www.dropbox.com/developers) for storing data to be synchronized across multiple 
    devices.

* [sjcl](https://github.com/bitwiseshiftleft/sjcl) for client-side password-based data encryption.

* [PhoneGap/Apache Cordova](http://phonegap.com/) to port the app to mobile platforms.

* [Chromium Embedded Framework](http://code.google.com/p/chromiumembedded/) to port the app to Windows Desktop.


Development Workflow
--------------------

### Quickstart Guide

1. Install [Node.js](http://nodejs.org/) if you don't already have it. We need npm to install all the development and 
    testing workflow tools we'll be using, and Express.js to serve our webapp for development.
    
2. Clone the repo to a directory of your choice. [SourceTree](http://www.sourcetreeapp.com/) is recommended if you want 
    a GUI tool for git.

3. Open a command prompt or PowerShell window and navigate to the directory of the repo.

4. Execute the following command:
    
    ```CLI
    npm install -g yo generator-angular-fullstack grunt-cli bower karma-cli
    ```
    
    This installs the following CLI tools globally (hence the -g switch):
    
    * [Yeoman](http://yeoman.io/) and the AngularJS fullstack generator for Yeoman
    
    * [Grunt](http://gruntjs.com/) for task automation
    
    * [Bower](http://bower.io/) for client-side dependency management
    
    * [Karma](http://karma-runner.github.io/0.12/index.html) for unit testing
    
5. Execute the following command:

    ```CLI
    npm install
    ```

    This installs the local dependencies for the repository listed in package.json.
    
6. Execute the following command:
    
    ```CLI
    bower install
    ```

    This installs the client-side dependencies for the web app listed in bower.json.

7. Now you can run the included Express.js development server using:
    
    ```CLI
    grunt serve
    ```
    
    This should open a new browser tab pointing to the address of the Express.js dev server. Express's livereload feature will 
        automatically reload the page when it detects any file changes.

8. You can also run tests using:

    ```CLI
    grunt test
    ```
    
    All tests are using Mocha at the moment. Coverage is something I plan to improve on after finishing the early phases.
        
9. Lastly decide on an IDE to use. I recommend one of the following:
    
    * [WebStorm](http://www.jetbrains.com/webstorm/). This is what I use. 30 day trial and $30 to buy for the Academic 
        Licence. Has code analytics, refactoring support, full-featured JS debugger, and a huge repository of plugins.
    * [Sublime Text](http://www.sublimetext.com/). Simple text editor if you don't want/need the heavyweight stuff.
        Unlimited free trial, $70 to buy.
    * [Brackets](http://brackets.io/). Recently discovered this one. Free open-source IDE built specifically for web 
        development. Has some very cool features like live HTML updates, inline external style/code editor, and even 
        an elegant JS debugger/profiler. I'm experimenting with it right now and it's been a pleasure to work with so 
        far.

Let me know if you encounter any problems with any of the above steps and I can help you troubleshoot and update this 
    guide with additional information if necessary.

For now just try to take a look through my code and the AngularJS docs to get a feel for the overall structure of the 
    app. We can meet sometime in the near future to discuss the code and divide work for later stages of the project.

### Learning Resources:

* Taking a look at some [free books](http://resrc.io/list/10/list-of-free-programming-books/#javascript) to brush 
    up on the basics of JS and Angular is always a good idea. 
* [CodeSchool](https://www.codeschool.com/) has some nice interactive courses on web development in general, and on 
    AngularJS and Javascript.
* Here's a nice article on 
    [Javascript Promises](http://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/) and 
    their implementation in Angular in the form of the $q service.
* Here's a very thorough answer on [StackOverflow](http://stackoverflow.com/questions/14049480/what-are-the-nuances-of-scope-prototypal-prototypical-inheritance-in-angularjs/14049482#14049482) regarding the nuances of Javascript's prototypical inheritance model and its implications on Angular's scope inheritance. I honestly didn't quite understand it as well as I thought I did until I came across this piece.

My personal reading commendations: 

* [JS: The Right Way](http://jstherightway.org/), great quick overview/reference.
* [Idiomatic.js](https://github.com/rwaldron/idiomatic.js), describes coding conventions and best practices. 
* [A Baseline for Front-End Developers](http://rmurphey.com/blog/2012/04/12/a-baseline-for-front-end-developers/), concepts, tools and workflows for efficent front-end development. 
* [Eloquent JavaScript](http://eloquentjavascript.net/), my favorite "full" JS book, there's a version 2 as a work in progress [here](https://github.com/marijnh/Eloquent-JavaScript).

If you come across anything else you found useful for learning, please share it here.

