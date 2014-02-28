threesbot
=========

Plays the web version of threes.

How to Run
==========

1. Navigate your browser to threesjs.com
2. Open the developer console (ctrl+shift+k in firefox).
3. Paste and run app.min.js into the console. A "play" button should appear.
4. Press play!

Developer Note: app.js is auto-generated from the other js files. To generate it, run:

    ./makeApp.sh

Minifying app.js uses uglifyjs, which can be installed in Debian/Ubuntu via

    apt-get install node-uglify

or in Fedora via

    yum install uglify-js
