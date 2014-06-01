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

* [AngularJS](https://angularjs.org/) and HTML5, CSS3, [Bootstrap](http://getbootstrap.com/) for the front-end UI.

* [TeleHash DHT](http://telehash.org/) and its [JavaScript](https://github.com/telehash/thjs) 
    [implementations](https://github.com/telehash/node-telehash) for the "back-end" AngularJS 
    [service](https://docs.angularjs.org/guide/services).

* [PhoneGap/Apache Cordova](http://phonegap.com/) to port the app to mobile platforms.

Development Workflow
--------------------

### Quickstart Guide

1. Install [Node.js](http://nodejs.org/) if you don't already have it. We'll eventually be using Node.js + Express.js 
    to host the web app version of the client, but for now, we need npm to install all the development and testing 
    workflow tools needed to even start developing.

2. Clone the repo to a directory of your choice. [SourceTree](http://www.sourcetreeapp.com/) is recommended if you want 
    a GUI tool for git.

3. Open a command prompt or PowerShell window and navigate to the directory of the repo.

4. Execute the following command:
    
    ```CLI
    npm install -g yo generator-angular grunt-cli bower karma-cli
    ```
    
    This installs the following CLI tools globally (hence the -g switch):
    
    * [Yeoman](http://yeoman.io/) and the AngularJS generator for Yeoman, for best-practice based code scaffolding
    * [Grunt](http://gruntjs.com/) for task automation
    * [Bower](http://bower.io/) for client-side dependency management
    * [Karma](http://karma-runner.github.io/0.12/index.html) for unit testing

5. Execute the following command:

    ```CLI
    npm install
    ```

    This installs the local dependencies for the repository listed in package.json.

6. Now you can run the basic grunt development server using:
    
    ```CLI
    grunt serve
    ```
    
    This should open a new Chrome tab pointing to the address of the dev server. Grunt's livereload feature will 
        automatically reload the page when it detects any file changes, which is pretty convenient.

7. You can also run tests using:

    ```CLI
    grunt test
    ```
    
    At the moment the tests are all trivial tests that don't check for anything important. But that should change once 
        we start developing.
        
8. Lastly decide on an IDE to use. I recommend one of the following:
    
    * [WebStorm](http://www.jetbrains.com/webstorm/). This is what I use. 30 day trial and $30 to buy for the Academic 
        Licence. Has code analytics, refactoring support, full-featured JS debugger, and a huge repository of plugins.
    * [Sublime Text](http://www.sublimetext.com/). Simple text editor if you don't want/need the heavyweight stuff.
        Unlimited free trial, $70 to buy.

Let me know if you encounter any problems with any of the above steps and I can help you troubleshoot and update this 
    guide with additional information if necessary.

For now just try to take a look through the scaffolded code and the AngularJS docs to get a feel for the overall 
    structure of the app. Taking a look at some 
    [free books](http://resrc.io/list/10/list-of-free-programming-books/#javascript) to brush up on the basics of JS 
    and Angular can't hurt either.
