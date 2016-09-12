# Project - Store Locator

The project is about building a store locator, using GoogleMaps and MongoDB. The application will have two functionalities

* Add stores
* View stores around a particular location using laitude, longitude coordinates

The adding of stores is an administrative function and can be performed only by an admin.

# PART 1

## Step 1 - Installing necessary modules

### yeoman and generator-express, gulp and bower

__Prerequisites: make sure you have nodejs and npm installed [nodejs 4.5.0 & npm 2.15.9 (minimum)]__

```
 npm i -g yo generator-express gulp bower
```
*NOTE: It is not __express-generator__, which is express frameworks own generator. generator-express is a yeoman generator which is used to generate a full MVC application*

__YOU CAN IGNORE WARNINGS ABOUT NPM VERSION IN THIS STEP FOR NOW__

### Install MongoDB
Use platform specific guides to install mongodb.

## Step 2 - Create the project folder

```
mkdir store_locator
cd store_locator
```

## Step 3 - Run the yeoman code generator to generate the application.
Ensure you are inside __store_locator__ folder

```
yo express
```
The generator will ask series of questions, provide responses as given below

* Would you like to create a new directory for your project? : __n__
* Select a version to install : answer __MVC__
* Select view engine to use : answer __Swig__
* Select a css preprocessor to use : answer __None__
* Select database to use : answer __MongoDB__
* Select build tool to use : answer __Gulp__

This should take a while depending on the network connection. Let us investigate the generated code and its structure.

```
.
|-- app
|   |-- controllers
|   |   `-- home.js
|   |-- models
|   |   `-- article.js
|   `-- views
|       |-- error.swig
|       |-- index.swig
|       `-- layout.swig
|-- app.js
|-- bower.json
|-- .bowerrc
|-- config
|   |-- config.js
|   `-- express.js
|-- .editorconfig
|-- .gitignore
|-- gulpfile.js
|-- package.json
`-- public
    |-- components
    |-- css
    |   `-- style.css
    |-- img
    `-- js

```
* The app folder contains the application logic (MVC pattern)
* app.js is the main .js file that starts the application
* bower.json and bowerrc are used for managing front-end dependencies
* config folder contains application configurations
* .editorconfig contains common configurations for editors (ignore this for now)
* .gitignore contains list of folders that should not be checked into git (example node_modules)
* gulpfile.js contains scripts to run the application and help us with livereload
* package.json contains application dependencies
* public is the public folder from where the js / css / images are served

## Step 4 - Run the application
type `gulp` to run the application along with nodemon (for live reloading)

## Step 5 - Setup basic application

### Change the view folder structure to handle partials

Inside views folder, create two new folders ___pages___ and  ___partials___.
move all .swig files in the root of views to ___pages___ folder

```
mkdir pages
mkdir partials

mv *.swig ./pages

```

rename all .swig .html, now the app/views/pages folder should look as shown below
```
`-- views
    |-- pages
    |   |-- error.html
    |   |-- index.html
    |   `-- layout.html
    `-- partials
```

if you try to run the application you will get an error, let us fix it

open `config/express.js` and modify the app.engine configuration as shown below

```
app.engine('html', swig.renderFile);
if(env == 'development'){
  app.set('view cache', false);
  swig.setDefaults({ cache: false });
}
app.set('views', config.root + '/app/views/pages');
app.set('view engine', 'html');
```

also change the index.html and error.html to reflect the .swig to .html extension change we made earlier

`{% extends 'layout.swig' %} --> {% extends 'layout.html' %}`

### Let us set up the base for further development

#### Add partials for header and footer

Create app/views/partials/header.html and paste the code fragment given below into it
```
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>{{ title }}</title>
  <!--Let browser know website is optimized for mobile-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Import Google Material font and icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">
  <link rel="stylesheet" href="/css/style.css">
</head>
```

Create app/views/partials/footer.html and paste the code fragment below into it

```
<footer class="page-footer red darken-1">
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <h5 class="white-text">About the Store Locator app</h5>
        <p class="grey-text text-lighten-4">
          Write about the application here
        </p>
      </div>
      <div class="col l3 s12">
        <h5 class="white-text">Sample Links</h5>
        <ul>
          <li><a class="white-text" href="#!">Link 1</a></li>
          <li><a class="white-text" href="#!">Link 2</a></li>
          <li><a class="white-text" href="#!">Link 3</a></li>
          <li><a class="white-text" href="#!">Link 4</a></li>
        </ul>
      </div>
      <div class="col l3 s12">
        <h5 class="white-text">Sample Links</h5>
        <ul>
          <li><a class="white-text" href="#!">Link 1</a></li>
          <li><a class="white-text" href="#!">Link 2</a></li>
          <li><a class="white-text" href="#!">Link 3</a></li>
          <li><a class="white-text" href="#!">Link 4</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">
      MVC Express App for: <a class="white-text text-darken-2" href="#">Quadrant4 NodeJS training</a>
    </div>
  </div>
</footer>

{% if ENV_DEVELOPMENT %}
  <script src="http://localhost:35729/livereload.js"></script>
{% endif %}

<!--Import jQuery before materialize.js-->
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>
<!-- Google Maps API to track location  -->
<script src="https://maps.googleapis.com/maps/api/js?key=[YOUR_KEY_HERE]"></script>


<!-- Live reload for development -->
{% if ENV_DEVELOPMENT %}
<script src="http://localhost:35729/livereload.js"></script>
{% endif %}

<!--InitRsponsiveSidenav Menu  -->
<script>
  (function ($) {
    $(function () {
      $('.button-collapse').sideNav();
    });
  })(jQuery);
</script>
```

Open app/views/pages/index.html and paste the code fragment given below into it
```
{% extends 'layout.html' %}
{% block content %}
<div id="map" style="height: 300px; width:100%"></div>
  <div class="section">
    <div class="container">
    <br>
      <h1 class="header center red-text">{{ title }}</h1>
      <div class="row center">
        <h5 class="header col s12 light">Welcome to {{ title }}
        </h5>
      </div>
      <div class="row center">
        <a href="locations/add" id="download-button"
          class="btn-large waves-effect waves-light red">
          Add your location
       </a>
      </div>
       <br><br>
    </div>
  </div>

  <!-- Tracking current user position -->
  <script src="/js/getCurrentPosition.js"></script>

   {% endblock %}
```

Let us modify the layout to leverage the header and footer,
open app/views/pages/layout.html and paste the fragment given below

```
<!doctype html>
<html lang="en">
{% include "../partials/header.html" %}
<body>
  <nav class="red" role="navigation">
  <div class="nav-wrapper container">
    <a id="logo-container" href="/" class="brand-logo">Q4 Store Locator</a>
    <ul class="right hide-on-med-and-down">
      <li><a href="/locations">Locations</a></li>
      <li><a href="/locations/add">Add Location</a></li>
      <li><a href="/stores">Stores</a></li>
    </ul>
    <ul id="nav-mobile" class="side-nav" style="transform:translateX(-100%);">
      <li><a href="/locations">Locations</a></li>
      <li><a href="/locations/add">Add Location</a></li>
      <li><a href="/stores">Stores</a></li>
    </ul>
    <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
  </div>
  </nav>
  {% block content %}{% endblock %}
  <!-- Footer -->
  {% include "../partials/footer.html" %}
</body>
</html>
```

let us fix the error.html, as usual paste the code fragment given below into app/views/pages/error.html

```
{% extends 'layout.html' %}
{% block content %}
<div class="section">
  <div class="container">
  <br>
    <h1 class="header center red-text">{{ message }}</h1>
    <div class="row center">
      <h3 class="header col s12 light">{{ error.status }}</h3>
    </div>
    <div class="row center">
      <pre>{{ error.stack }}</pre>
    </div>
    <br><br>
  </div>
</div>
{% endblock %}

```

The title at the index page needs to change, head over to app/controllers/home.html and change the title to `Q4 Store Locator`

```
res.render('index', {
  title: 'Q4 Store Locator',
  articles: articles
});
```

That's it run gulp and point your browser to [localhost]: (http://localhost:3000) you should be able to see a responsive application.

# PART 2 - Setup Geolocation, Create models, views and controllers

## Setup HTML5 Geolocation API

Let us use the HTML5 Geolocation API to get the current position.
Create a new file `getCurrentPosition.js` inside `public/js` folder

```
// Function to track user position
function getCurrentPosition() {

  // Check browser` support
  if (navigator.geolocation) {
    var options = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0,
    };
    navigator.geolocation.watchPosition(getUserPosition, trackError, options);
  } else {
    alert('Ops; Geolocation is not supported');
  }

  // Get the user position
  function getUserPosition(position) {
    // Check longitude and latitude
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    // Create the user' coordinates
    var googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom: 12,
      center: googlePos,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    // Set a variable to get the HTML div
    var mapObj = document.getElementById('map');

    // Create the map and passing: map div and map options

    var googleMap = new google.maps.Map(mapObj, mapOptions);

    // Setup a marker on map with user' location
    var markerOption = {
      map: googleMap,
      position: googlePos,
      animation: google.maps.Animation.DROP,
    };

    // Create a instance with marker on map
    var googleMarker = new google.maps.Marker(markerOption);

    // Get the user's complete address information using the Geocoder
    // Google API
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        latLng: googlePos,
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            var popOpts = {
              content: results[1].formatted_address,
              position: googlePos,
            };

            // Setup an info window with user information
            var popup = new google.maps.InfoWindow(popOpts);
            google.maps.event.addListener(googleMarker,
              'click',
              function () {
                popup.open(googleMap);
              });
          } else {
            alert('No results found');
          }
        } else {
          alert('Uhh, failed: ' + status);
        }
      });
  }

  // Setup a error function
  function trackError(error) {
    var err = document.getElementById('map');
    switch (error.code) {
      case error.PERMISSION_DENIED:
        err.innerHTML = 'User denied Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        err.innerHTML = 'Information is unavailable.';
        break;
      case error.TIMEOUT:
        err.innerHTML = 'Location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        err.innerHTML = 'An unknown error.';
        break;
    }
  }
}

// Call the function to initialize the current position
getCurrentPosition();

```

Now if the application is run, you will be prompted to allow location tracking. To see the map you need to add a google map api key.
Refer https://developers.google.com/maps/documentation/javascript/get-api-key

Once you have your key, place it in the footer.html at appropriate line (just the key, no square brackets required).

`<script src="https://maps.googleapis.com/maps/api/js?key=[YOUR_KEY_HERE]"></script>`

run the application, and map with your current location should appear in the home page.

## Create a mongoose model to handle locations

Add a new file location.js inside app/models and add the fragment given below

```
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  title: String,
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;

```
Mongoose models are created from a schema definition.

Though mongodb is schemaless it sometimes helps to apply schema to your data. Mongoose just does that for us.
Mongoose helps us define a schema and provides us tools to validate data at application layer.

A quick mention about `2dsphere` index. The `2dsphere` is a special index type that helps querying a sphereical geometry structure like the Earth.
`2dsphere` supports MongoDB geospatial queries.

## Create a controller to handle CREATE and SEARCH locations along with a form to capture the location.

With the model defined, let us create a controller to perform operations on the model.

create a new file locations.js inside app/controllers


Create a new file inside app/controllers called locations.js and add the fragment below

```
'use strict';

var express = require('express');
var router = express.Router();

var Location = require('../models/location');

module.exports = function (app) {
  app.use('/', router);
};

/**
* List all locations
*/
router.get('/locations', function (req, res, next) {

  Location.find(function (err, locations) {

    if (err) return next(err);

    res.render('locations', {
      title: 'Locations',
      locations: locations,
      lat: 13.012284,
      long: 80.210410,
    });
  });
});

/**
* Render a page to create a new location
*/
router.get('/locations/add', function (req, res, next) {
  res.render('add-location', {
    title: 'Add a new Location',
  });
});

/**
* Add a new location
*/
router.post('/locations', function (req, res, next) {
  // Fill loc object with request body
  var loc = {
    title: req.body.title,
    coordinates: [req.body.long, req.body.lat],
  };

  var location = new Location(loc);

  // save the data received
  location.save(function (err, location) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    }

    res.render('add-location', {
      message: 'Added Successfully',
      obj: location,
    });
  });
});

/**
* Locate shops near me
*/

router.post('/nearme', function (req, res, next) {

    // Setup limit
    var limit = req.body.limit || 10;

    // Default max distance to 10 kilometers
    var maxDistance = req.body.distance || 10;

    // Setup coords Object = [ <longitude> , <latitude> ]
    var coords = [];

    // Create the array
    coords[0] = req.body.longitude;
    coords[1] = req.body.latitude;

    // find a location
    Location.find({
        coordinates: {
          $near: {
              $geometry: {
                  type: 'Point',
                  coordinates: coords,
                },

              // distance to radians
              $maxDistance: maxDistance * 1609.34,
              spherical: true,
            },
        },
      }).limit(limit).exec(function (err, locations) {
          console.log(locations)
          if (err) {
            return res.status(500).json(err);
          }

          res.render('locations', {
            title: 'Locations',
            locations: locations,
            lat: 13.012284,
            long: 80.210410,
          });
        });
  });


```

In the above fragment we create a router and add routes to list locations to render a location create page and finally a route to save the submitted location.
We have also added a route to find locations through the `/nearme` route. The `/nearme` route queries the mongodb using the geolocation evcd

wondering from where the controllers are loaded, check config/express.js in the following lines

```
var controllers = glob.sync(config.root + '/app/controllers/*.js');
controllers.forEach(function (controller) {
  require(controller)(app);
});
```



## Create views

Add locations.html inside app/views/pages and add the fragment given below

```
{% extends 'layout.html' %}
{% block content %}
<div class="section">
  <div class="container">
    <br><br>
    <h1 class="header center red-text">{{ title }}</h1>
    <div class="row center">
      <h5 class="header col s12 light">Welcome to
              {{ title }}
            </h5>
    </div>
    <div class="row">
      <div class="col s12">
        <form action="/nearme" method="POST">
          <div class="row">
            <div class="col s12" id="map" style="height:600px;width: 100%; margin-bottom: 20px"></div>
            <br>
            <h5 class="grey-text center">
                            Find a store near by you
                   </h5>
            <br>
            <div class="input-field col s5">
              <input placeholder="Insert Longitude" name="longitude" id="longitude" type="text" class="validate" value="{{long}}">
              <label for="longitude">Longitude</label>
            </div>
            <div class="input-field col s5">
              <input placeholder="Insert latitude" name="latitude" id="latitude" type="text" class="validate" value="{{lat}}">
              <label for="latitude">Latitude</label>
            </div>
            <div class="input-field col s2">
              <select class="browser-default" name="distance" id="distance">
                     <option value="" disabled selected>Distance
                     </option>
                     <option value="2">1 Km</option>
                     <option value="3">2 km</option>
                     <option value="9">5 km</option>
                     <option value="9">10 km</option>
                   </select>
            </div>
          </div>
          <div class="row">
            <button class="btn red waves-effect waves-light" type="submit" name="action">SUBMIT</button>
          </div>
        </form>
        <br>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
      var loadMap = function() {
          // Center map with current lat and long (Simulated with fixed point for this example)
         var googlePos = new google.maps.LatLng({{ lat }} , {{ long }});
          // Setup map options
         var mapOptions = {
           zoom : 12,
           center :googlePos,
           mapTypeId :google.maps.MapTypeId.ROADMAP
         };

        // Set a variable to get the HTML div
        var mapObj = document.getElementById('map');
        var googleMap = new google.maps.Map(mapObj, mapOptions);

         // Create markers array to hold all markers on map
        var markers = [];
        // Using the Swig loop to get all data from location variable
        {% for item in locations %}

          // Setup a lat long object
          var latLng = new google.maps.LatLng({{ item.coordinates[1] }},
           {{ item.coordinates[0] }});

          // Create a marker
          var marker = new google.maps.Marker({
            map :googleMap,
            position: latLng,
            animation :google.maps.Animation.DROP
          });

          markers.push(marker);
            // Setup the info window
          var infowindow = new google.maps.InfoWindow();
            // Add an event listener to click on each marker and show an info window

          google.maps.event.addListener(marker, 'click', function () {
          // using the tittle from the Swig looping
            infowindow.setContent('<p>' + " {{ item.title }} " + '</p>');
            infowindow.open(googleMap, this);
          });
          {% endfor %}
        };
       // load the map function
       window.onload = loadMap;
       </script>
       {% endblock %}
```

This is our main page it allows us to search stores around a location provided in the form below. This is not yet functional, we will be adding the functionality soon.

Let us create a Add Location form. Create add-location.html inside app/views/pages folder and add the fragment below

```
{% extends 'layout.html' %}
{% block content %}
<div class="section">
  <div class="container">
  <br><br>
    <h1 class="header center red-text">{{ title }}</h1>
    <div class="row center">
      <h5 class="header col s12 light">Welcome to
       {{ title }}
      </h5>
    </div>
    <div class="row">
      <div class="col s12">
          {% if message %}
            <h4 class="center red-text">
                  {{ message }}
            </h4>
          {% endif %}
          <h5 class="grey-text">
                Add new location
          </h5>
          <br>
          <form action="/locations" method="POST">
            <div class="row">
            <div class="input-field col s4">
              <input placeholder="Insert Location Name"
               name="title" id="name" type="text" class="validate">
              <label for="title">Name</label>
              </div>
              <div class="input-field col s4">
                <input placeholder="Insert Longitude"
                 name="long" id="long" type="text" class="validate">
                <label for="long">Longitude</label>
              </div>
              <div class="input-field col s4">
              <input placeholder="Insert latitude" name="lat" id="lat"
               type="text" class="validate">
              <label for="lat">Latitude</label>
              </div>
                <br>
                <br>
              <div class="col s12 center">
              <button class="btn red waves-effect waves-light"
               type="submit" name="action">SUBMIT</button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
    {% endblock %}

```

That's it. Add few loctions, RR tower's coordinates are

lat: 13.012284,
long: 80.210410,

Add few more locations (stores) around the these coordinates. Navigate to the locations page (http://localhost:3000/locations) key in the longitude, latiude with distance and hit SUBMIT, the screen should be refreshed with the locations around the coordinates.

That's it for now, in the next tutorial we will secure the application with passport.

# PART 3 - User authentication using Passport

## Starting with local user authentication

We will leverage the passportjs module to implement local user authentication. We also need passport-local strategy bcrypt and validator modules to assist in encryption and validation of the passwords.

run the following command

```
npm install --save passport passport-local bcrypt validator
```

since bcrypt requires compilation with a c++ compiler it could throw errors if a suitable compiler is not available. In ubuntu machine install build-essential using `sudo apt-get install build-essential`. For other platforms please check appropriate instructions.

### create a basic user model

add user.js inside `/app/models`

```
'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var validator = require('validator');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  // Rehash the password everytime the user changes it.
  this.password = User.encryptPassword(this.password);
  next();
});

UserSchema.methods = {
  validPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
};

UserSchema.statics = {
  makeSalt: function () {
    return bcrypt.genSaltSync(10);
  },

  encryptPassword: function (password) {
    if (!password) {
      return '';
    }

    return bcrypt.hashSync(password, User.makeSalt());
  },

  register: function (email, password, cb) {
    var user = new User({
      email: email,
      password: password,
    });

    user.save(function (err) {
      cb(err, user);
    });
  },
};

var User = mongoose.model('User', UserSchema);

User.schema.path('email').validate(function (email) {
  return validator.isEmail(email);
});

User.schema.path('password').validate(function (password) {
  return validator.isLength(password, 6);
});

module.exports = User;

```

A quick explanation of the user model
* Model is simple with a email as the key attribute and has a unique index
* The validPassword is a instance method which helps with validating the password
* The pre save hook is used to hash the password before each save and uses bcrypt module
* Static methods makeSalt, encrypt and register help us keep the logic consise and within the user model
* The validator module is used to add validations to the User schema to ensure that the email is in appropriate format and password has a minimum length of 6 characters

### configure passport
Add passport.js within config folder and add the fragment below
```
'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, done);
});

function authFail(done) {
  done(null, false, {
    message: 'Incorrent email/password combination',
  });
}

passport.use(new LocalStrategy({
  usernameField: 'email',
}, function (email, password, done) {
  User.findOne({
    email: email,
  }, function (err, user) {
    if (err) return done(err);
    if (!user) {
      return authFail(done);
    }

    if (!user.validPassword(password)) {
      return authFail(done);
    }

    return done(null, user);
  });
}));

module.exports = passport;

```

now include the passport and local strategy when the application starts. Add following code in `config/express.js`

require the passport configuration
```
var passport = require('./passport');
```

Add the middleware to express after the methodOverride middleware

```
app.use(passport.initialize());
app.use(passport.session());
```

### Creating the login and register View

Add login.html and register.html and add the fragment given below

login.html
```
{% extends 'layout-auth.html' %}
{% block content %}
<div class="container">
  <h4>Login</h4>
  <div class="row ">
    <div class="col s6 offset-s3">
      <form action="/users/login" method="POST">
        <div class="row">
          <div class="input-field col s12">
            <input id="email" name="email" type="email" class="validate">
            <label for="email" class="active">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" name="password" type="password" class="validate">
            <label for="password" class="active">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="col s12 center">
          <button class="btn red waves-effect waves-light" type="submit" name="action">LOGIN</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
{% endblock %}
```

register.html

```
{% extends 'layout-auth.html' %}
{% block content %}
<div class="container">
  <h4>Register</h4>
  <div class="row ">
    <div class="col s6 offset-s3">
      <form action="/users/register" method="POST">
        <div class="row">
          <div class="input-field col s12">
            <input id="email" name="email" type="email" class="validate">
            <label for="email" class="active">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" name="password" type="password" class="validate">
            <label for="password" class="active">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="confirm" name= "confirm" type="password" class="validate">
            <label for="confirm" class="active">Confirm Password</label>
          </div>
        </div>
        <div class="row">
          <div class="col s12 center">
          <button class="btn red waves-effect waves-light"
           type="submit" name="action">Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
{% endblock %}
```

### Add routes and controller

Create user.js in `app/controllers` folder and add the frament below

```
'use strict';

var express = require('express');
var router = express.Router();

var passport = require('../../config/passport');
var User = require('../models/user');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/users/register', function (req, res, next) {
  res.render('register');
});

router.post('/users/register', function (req, res, next) {
  console.log(req.body);
  User.register(req.body.email, req.body.password, function (err, user) {
    if (err) {
      return next(err);
    }

    console.log(req.body);
    req.login(user, function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });
});

router.get('/users/login', function (req, res, next) {
  res.render('login');
});

router.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}));

```

We have added routes and actions for login and register, we use the passport to authenticate the user.

Create a folder named `util` inside the app folder  and add a file named 'index.js'. Now add the code fragment given below to `index.js`

```
'use strict';

module.exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/users/login');
};
```

Let us make sure that one must be logged in to add locations, we can protect the route with the above middleware.

Make the below changes to `app/controllers/location.js`

require the util
```
var util = require('../util');
```

and include the middleware in the route as shown below
```
router.get('/locations/add', util.isLoggedIn, function (req, res, next) {
  res.render('add-location', {
    title: 'Add new Location',
  });
});
```

However, we have not done any session management, without which isLoggedIn will always return false.

we need few more modules, let us add `express-session` and `connect-mongo` a mongo session connector for session management

```
npm install --save-dev express-session connect-mongo
```

head over to `config/express.js` and add these changes

require the config
`var config = require('./config');`

include express session and configure it to work with connect-mongo
```
var session = require('express-session');
var MongoSessionStore = require('connect-mongo')(session);
```

Below the line
`app.use(express.static(config.root + '/public'));`

add the following fragment

```
app.use(session({
  secret: 'AB1GS3CR3T',
  saveUninitialized: true,
  resave: true,
  store: new MongoSessionStore({
    url: config.db,
    collection: 'sessions',
  }),
}));
```

we are done now and have a protected route which works across sessions.

### Adding a logout feature

Open the `app/views/pages/layout.html` and replace the two menu items inside the __ul__ tag

```
<ul class="right hide-on-med-and-down">
  <li><a href="/locations">Locations</a></li>
  <li><a href="/locations/add">Add Location</a></li>
  {% if user %}
  <li><a href="/users/logout">Logout</a></li>
  {% endif %}    </ul>
<ul id="nav-mobile" class="side-nav" style="transform:translateX(-100%);">
  <li><a href="/locations">Locations</a></li>
  <li><a href="/locations/add">Add Location</a></li>
  {% if user %}
  <li><a href="/users/logout">Logout</a></li>
  {% endif %}
</ul>
```

We have removed the unused store menu item for logout. We need to display logout only when the user has logged in to achieve we check if user object is part of the request, but how to get the user object into the request. To do this we will use express middleware to set up request local variable for all requests.

open `app/config/express.js` and below the line `app.use(passport.session)` add the piece of code provided below

```
app.use(function (req, res, next) {
  res.locals.user = req.user;
  console.log(req.user);
  next();
});
```

The above code is an express middleware that plucks req.user and adds it to req.locals, this is special as it allows all templates to access details of logged in user.

___NOTE: If you investigate the user object you will find that it also returns the hased password. It is not a good practice to return the password field. I will leave it as an exercise to avoid returning the password when the user object is fetched from the database___

One more thing we need to do is to add the route, open `app/controllers/user` and add the following route

```
router.get('/users/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});
```

We do not have Login and Sign-up links as anexercise you can add sign-up and login links to the header. The links must be displayed only when the user is not logged in.
