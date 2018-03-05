//Server file starts here
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;
app.set('views', 'views');

hbs.registerPartials('views/partials');

app.use(function (req, res, next) {
  var now = new Date().toString();
  var log = now+" :: "+req.method+" :: "+req.url;
  fs.appendFile('server.log',(log,'\n'),function (err) {
    if(err) {
      console.log('Error while logging file');
    }
    console.log(now+" :: "+req.method+" :: "+req.url);
    next();
  });
});

// app.use(function (req, res, next) {
//   res.render('maintenance.hbs',{
//     'message' : 'Website is in maintenance phase...'
//   });
// });

app.use(express.static('public'));

hbs.registerHelper('getCurrentYear',function () {
  return new Date().getFullYear();
});

hbs.registerHelper('fullCase',function (text) {
  return text.toUpperCase();
});

app.get('/', function(req, res) {
  res.render('initial.hbs',{
    'message': 'Main Page'
  });
});

app.get('/home',function(req, res) {
  res.render('home.hbs',{
   'message' : "WELCOME TO NEW WORLD"
  });
});

app.get('/about',function(req, res) {
  res.render('about.hbs', {
    'message' : 'Managing Environment'
  });
});

app.listen(port, function (err) {
  if(err) {
    console.log("Error While Connecting :: ", err);
  }
  console.log("Server listening at ",port);
});
