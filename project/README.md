# Project - Store Locator

The project is about building a store locator, using GoogleMaps and MongoDB. The application will have two functionalities

* Add stores
* View stores around a particular location using laitude, longitude coordinates

The adding of stores is an administrative function and can be performed only by an admin.

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

That's it run gulp and point your browser to [http://localhost:3000] you should be able to see a responsive application.
