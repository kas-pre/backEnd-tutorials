//Express Routing
//Routing;- how an application's endpoints(URIs) respond to client requests
//Basic Routing;
//Determining how an application responds to a client request to a particular endpoint, which is a URI/path and a specific HTTP request method
//each route can have one or more functions, executed when the route is matched
//structure of route definition
//app.METHOD(PATH, HANDLER)
//app;- instance of express
//METHOD;- an HTTP request method
//PATH;- path on the server
//HANDLER;- the function executed when the route is matched
//We will use app.js file to create an instance of express
//Defining a simple route;- responds with Hello World! on the homepage
const app = require('./app')

app.get('/', function (req, res) {
    res.send('Hello World!')
})

//Respond to POST request on the root route(/), the application's homepage
app.post('/', function (req, res) {
    res.send('Got a POST request')
})

//Respond to a PUT request to the /user route
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
})

//Respond to a DELETE request to the /user route
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})
//Routing is defined using methods of the Express app object that correspond to HTTP methods
//app.get() to handle GET requests, app.post() to handle POST requests
//Review of app.METHOD(path, callback[, callback ...])
//Routes an HTTP request, where METHOD is the HTTP method of the request, such as GET, PUT, POST, etc in lowercase
//Arguments
//path;- the path for which the middleware function is invoked: can be any of a string representing a path, a path pattern, a reqular expression pattern to match paths, an array of combinations of any of the above. default: '/'(root path)
//callback;- callback functions; can be: a middleware function, a series of middleware functions(separated by commas), an array of middleware functions, a combination of all of the above.
//you can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route'), to bypass the remaining route callback(s).
//you can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.
//Routing methods;
//checkout, copy, delete, get, head, lock, merge, mkactivity, mkcol, move, m-search, notify, options, patch, post, purge, put, report, search, subscribe, trace, unlock, unsubscribe
//the most popular HTTP methods; app.get(), app.post(), app.put(), app.delete()
//to route methods that translate to invalid js variable names, use the bracket notation e.g app['m-search']('/', function ...)
//the app.get() function is automatically called for the HTTP HEAD method in addition to the GET method if app.head() was not called for the path before app.get()
//the method, app.all(), is not derived from any HTTP method and load middleware at the specified path for all HTTP request methods
//app.use() specifies middleware as the callback functions
//Routing methods specify a callback function(sometimes called handler functions) called when thr application receives a request to the specified route(endpoint) and HTTP method.
//the app listens for requests that match the specified route(s) and methods(s), and when it detects a match, it calls the specified callback function.
//the routing methods can have more than one callback function as arguments, in which case it is important to provide next as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback

//an example of a very basic route
var express = require('express')
var app = express()

//respond with 'hello world' when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
})

//Route methods
//A route method is derived from one of the HTTP methods, & is attached to an instance of the express class
//The folloeing code is an example of routes that are defined for the GET and the POST methods to the root of the app
//GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage')
})

//POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
})
//Express supports methods that correspond to all HTTP request methods.
//A special routing method, app.all(), is used to load middleware functions at a path for all HTTP request methods.
//An example; the following handler is executed for requests to the route"/secret"  whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the http module
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() //pass control to the next handler
})

//Route paths
//Route paths, in combination with a request method, define the endpoints at which requests can be made. 
//Route paths can be strings, string patterns, or regular expressions.
//The characters ?, +, *, and () are subsets of their regular expression counterparts. 
//The hyphen (-) and the dot (.) are interpreted literally by string-based paths.
//If you need to use the dollar character ($) in a path string, enclose it escaped within ([ and ]).
//For example, the path string for requests at “/data/$book”, would be “/data/([\$])book”.
//Express uses path-to-regexp for matching the route paths.
//Express Route Tester is a handy tool for testing basic Express routes, although it does not support pattern matching.
//Query strings are not part of the route path.
//Examples of route paths based on strings
//This route path will match request to the root route, /
app.get('/', function (req, res) {
    res.send('root')
})
//This route path will match request to /about
app.get('/about', function (req, res) {
    res.send('about')
})
//This route path will match request to /random.text
app.get('/random.text', function (req, res) {
    res.send('random.text')
})
//Examples of route paths based on string patterns
//This route path will match acd and abcd.
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd')
})
//This route path will match abcd, abbcd, abbbcd, and so on.
app.get('/ab+cd', function (req, res) {
    res.send('ab+cd')
})
//This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
app.get('/ab*cd', function (req, res) {
    res.send('ab*cd')
  })
//This route path will match /abe and /abcde.
app.get('/ab(cd)?e', function (req, res) {
    res.send('ab(cd)?e')
  })

//Examples of route paths based on regular expressions:
//This route path will match anything with an “a” in it.
app.get(/a/, function (req, res) {
    res.send('/a/')
  })
//This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, function (req, res) {
    res.send('/.*fly$/')
  })

//Route parameters - named URL segments used to capture the values specified at their position in the URL
//The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys
// Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }
//To define routes with route parameters, simply specify the route parameters in the path of the route.
app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
  })
//The name of route parameters must be made up of “word characters” ([A-Za-z0-9_]).
//Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.
// Route path: /flights/:from-:to
// Request URL: http://localhost:3000/flights/LAX-SFO
// req.params: { "from": "LAX", "to": "SFO" }

// Route path: /plantae/:genus.:species
// Request URL: http://localhost:3000/plantae/Prunus.persica
// req.params: { "genus": "Prunus", "species": "persica" }
// To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (()):

// Route path: /user/:userId(\d+)
// Request URL: http://localhost:3000/user/42
// req.params: {"userId": "42"}
//Because the regular expression is usually part of a literal string, be sure to escape any \ characters with an additional backslash, for example \\d+.
//In Express 4.x, the * character in regular expressions is not interpreted in the usual way. 
//As a workaround, use {0,} instead of *. This will likely be fixed in Express 5.

//Route handlers
//You can provide multiple callback functions that behave like middleware to handle a request.
//The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. 
//You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.
//Route handlers can be in the form of a function, an array of functions, or a combination of both.
//A single callback function can handle a route
app.get('/example/a', function (req, res) {
    res.send('Hello from A!')
})
//More than one callback function can handle a route (make sure to specify the next object)
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from B!')
})
//An array of callback functions can handle a route
var cb0 = function (req, res, next) {
    console.log('CBO')
    next()
}
var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  var cb2 = function (req, res) {
    res.send('Hello from C!')
  }
app.get('/example/c', [cb0, cb1, cb2])  
//A combination of independent functions and arrays of functions can handle a route
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
  }, function (req, res) {
    res.send('Hello from D!')
  })

//Response methods
//The methods on the response object(res) can send a response to the client, and terminate the request-response cycle
//if none of these methods are called from a route handler, the client request will be left hanging
//res.download(); prompt a file to be downloaded
//res.end(); end the response process
//res.json(); send a json response
//res.jsonp(); send a json response with jsonp support
//res.redirect(); redirect a request
//res.render(); render a view template
//res.send(); send a response of various types
//res.sendFile(); send a file as an octet stream
//res.sendStatus(); set the response status code and send its string representation as the reponse body

//app.route()
//you can create chainable route handlers for a route path by using app.route().
//Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy & typos
//An example of chained route handlers defined by using app.route()
app.route('/book')
  .get(function (req, res) {
      res.send('get a random book')
  })
  .post(function (req, res) {
      res.send('Add a book')
  })
  .put(function (req, res) {
      res.send('Update the book')
  })

//express.Router
//Use the express.Router class to create modular, mountable route handlers. 
//A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
//Example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.
//Create a router file named birds.js in the app directory.
//then load the router module in the app
var birds = require('./birds')

// ....

app.use('/birds', birds)
//The app will now be able to handle requests to /birds and birds/about, as well as call the timeLog middleware function that is specific to the route.