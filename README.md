Nuxeo and Box repositories browser via Box REST API
================
Description
----------------

This sample application provides homogeneous rest api to browse two repositories:
* [Nuxeo](http://www.nuxeo.com)
* [Box](http://www.box.com)

OAuth 2.0 is used for authentication on each repository and same Box REST API is used to browse them (only base url is different).

How to play
----------------

- Checkout this repository
- Make sure to have `npm` installed
   - For Linux/Mac you can run [this script](https://gist.github.com/isaacs/579814#file-node-and-npm-in-30-seconds-sh) to install nodejs and npm
   - For windows, please see [this documentation](https://github.com/npm/npm#fancy-windows-install)
- Go to `nuxeo-box-angular-sample` folder and execute:
   - `npm install update`
- Make sure to have `bower` and `grunt` installed
   - `npm install -g yo`
   - `bower install update`
* Run `grunt serve`
* If not opened automatically, open your browser @ **127.0.0.1:9000**
* On Box side, use your personal credentials
* On Nuxeo side, use following credentials:
    * Username: Administrator
    * Password: nx6team
    * You can access to this [Nuxeo demo instance](http://starship.nuxeo.com) through your navigator

CORS Issue
---------------

If you're running this app in local trying to access Box api, please open your browser as:

*open /Applications/Google\ Chrome.app --args --disable-web-security* for instance for mac/chrome environment

-> to deactivate your browser security to access to external host servers.

Once you close your browser, security will be re-enabled.
