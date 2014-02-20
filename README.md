Nuxeo and Box repository browser with unique REST API
================
Description
----------------

This sample application provides 1 way to browse two repositories:
* Nuxeo
* Box.net

OAuth 2.0 is used for authentication on each repository and same Box.net REST API is used to browse them (only base url is different).

![Box Nuxeo](https://github.com/nuxeo/nuxeo-box-angular-sample/box-nuxeo.png "Box Nuxeo")

How to play
----------------

* Checkout this repository
* Go to *nuxeo-box-angular-sample* folder and run **npm install/update**
* Run **bower install/update**
* Run **grunt serve**
* If not opened automatically, open your browser @ **127.0.0.1:9000**

CORS Issue
---------------

As it's not fixed yet, if you're running this app in local, please open your browser as:

*open /Applications/Google\ Chrome.app --args --disable-web-security* for instance for mac/chrome environment

-> to deactivate your browser security for accessing to external host servers.

Once you close your browser, security will be re-enabled.
