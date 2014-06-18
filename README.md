Real-Time Instant Messaging System
==================================

Project Abstract
----------------

>Instant messaging systems of today are instant in name only. 

>Messages are sent when the send button is pressed by the sender, and no feedback to the receiver is presented during 
the waiting period except a wholly inadequate “user is typing” notification. This disruptive downtime between message 
and reply in modern instant messaging systems is becoming more apparent day by day. 

>The Real-Time Instant Messaging System mimics the free-flowing experience of natural, in-person conversations, by 
updating messages on the receiver side as they are being written in real time. 

>Our design involves only a client-side application, using a peer-to-peer distributed protocol to identify other 
clients, and advanced networking protocols for real-time communication between clients. This direct, peer-to-peer 
communication model removes the need for messages to traverse through a centralized server, and in doing so, addresses 
the increasing concerns over privacy in modern communications systems by granting clients exclusive ownership over 
their messages. 

>The main advantages of the Real Time Instant Messaging System over existing instant messaging systems include its 
focus on true real-time communications and its implications for privacy and message ownership resulting from its 
peer-to-peer communication model. 

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
    [Google Drive API](https://developers.google.com/drive/) for storing data to be synchronized across multiple 
    devices.

* [sjcl](https://github.com/bitwiseshiftleft/sjcl) for client-side password-based data encryption.

* [PhoneGap/Apache Cordova](http://phonegap.com/) to port the app to mobile platforms.

Development Workflow
--------------------

### Quickstart Guide

1. Install [Node.js](http://nodejs.org/) if you don't already have it. We'll eventually be using Node.js + Express.js 
    to host the web app version of the client, but for now, we need npm to install all the development and testing 
    workflow tools needed to even start developing.
    
2. Install [Ruby](https://www.ruby-lang.org/en/installation/) in order to use SASS with Compass. Add Ruby to PATH in 
    the installer options.

3. Clone the repo to a directory of your choice. [SourceTree](http://www.sourcetreeapp.com/) is recommended if you want 
    a GUI tool for git.

4. Open a command prompt or PowerShell window and navigate to the directory of the repo.

5. Execute the following command:
    
    ```CLI
    npm install -g yo generator-angular grunt-cli bower karma-cli
    ```
    
    This installs the following CLI tools globally (hence the -g switch):
    
    * [Yeoman](http://yeoman.io/) and the AngularJS generator for Yeoman, for best-practice based code scaffolding
    * [Grunt](http://gruntjs.com/) for task automation
    * [Bower](http://bower.io/) for client-side dependency management
    * [Karma](http://karma-runner.github.io/0.12/index.html) for unit testing

6. Execute the following commands: 

    ```CLI
    gem update --system
    gem install compass
    ```
    
    This updates ruby and installs the Compass package.    

7. Execute the following command:

    ```CLI
    npm install
    ```

    This installs the local dependencies for the repository listed in package.json.
    
8. Execute the following command:
    
    ```CLI
    bower install
    ```

    This installs the client-side dependencies for the web app listed in bower.json.

9. Now you can run the basic grunt development server using:
    
    ```CLI
    grunt serve
    ```
    
    This should open a new browser tab pointing to the address of the dev server. Grunt's livereload feature will 
        automatically reload the page when it detects any file changes.

10. You can also run tests using:

    ```CLI
    grunt test
    ```
    
    At the moment the tests I wrote are broken because of Jasmine's poor async support. I'm planning on migrating over 
         to Mocha for some better test coverage for our Angular services.
        
11. Lastly decide on an IDE to use. I recommend one of the following:
    
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
    app. I have only the Telehash user id generation and user info saving/loading from local storage implemented so 
    far. We can meet sometime in the near future to discuss the code and divide work for later stages of the project.

### Learning Resources:

* Taking a look at some [free books](http://resrc.io/list/10/list-of-free-programming-books/#javascript) to brush 
    up on the basics of JS and Angular is always a good idea.       
* [CodeSchool](https://www.codeschool.com/) has some nice interactive courses on web development in general, and on 
    AngularJS and Javascript.
* Here's a nice article on 
    [Javascript Promises](http://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/) and 
    their implementation in Angular in the form of the $q service.

If you come across anything else you found useful for learning, please share it here.

