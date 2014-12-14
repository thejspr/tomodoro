# Tomodoro

Tomatos for ye brainz

## MVP Roadmap

- [ ] Start pomodoro with a title and show a timer (00:25)
- [x] User authentication and authorization (thanks hoodie.js)
- [ ] Notification/sound when pomodoro finishes
- [ ] List past pomodoros with date
- [ ] Design (mobile-first)
- [ ] Change pomodoro duration

## Ideas

- Pause running pomodoro
- Tag pomodoros with #tag and enable filtering by tag

---

# docs

## Plugins

To install a specific plugin, run (in your app's directory):

    $ hoodie install <name>

where `<name>` is one of the Hoodie Plugin.

To uninstall use:

    $ hoodie uninstall <name>

## Deploy to Nodejitsu

You need a Nodejitsu account and the `jitsu` tool installed.

Create a new hoodie app:

    $ hoodie new myapp

Start app locally:

    $ cd myapp
    $ hoodie start

Create a database:

    $ jitsu database create couch myapp

This prints out the URL for your database, something like:

    http://nodejitsudb123456789.iriscouch.com:5984

Go to:

    http://nodejitsudb123456789.iriscouch.com:5984/_utils

In the bottom right, click on "Fix This". Create a new user with the username `admin` and a password of your choice. Remember the password.

Create the Nodejitsu app.

    $ jitsu apps create

Set your database URL as an environment variable:

    $ jitsu env set COUCH_URL http://nodejitsudb1234567890.iriscouch.com:5984
    $ jitsu env set HOODIE_ADMIN_USER admin
    $ jitsu env set HOODIE_ADMIN_PASS <yourpassword>


`<yourpassword>` is the one you set up two steps ago.

Deploy!

    $ jitsu deploy

(wait a minute)

Go to: `http://myapp.jit.su`

Boom.

## Deploy on a regular Linux/UNIX box:

[See deployment.md](deployment.md)

<!--## Deploy dreamcode tl;dr

    $ hoodie new myapp
    $ cd myapp
    $ hoodie start

    $ hoodie remote add nodejitsu
     - jitsu login
     - jitsu database create couch myapp
         - setup couchdb admin
     - jitsu apps create
     - jitsu env set COUCH_URL http://...
     - jitsu env set COUCH_PASS <secret>

    $ hoodie deploy
     - jitsu deploy-->
