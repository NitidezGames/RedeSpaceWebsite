// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var fileManager = require('express-file-manager');

// Páginas
app.use(express.static('public'));
app.use(express.static('assets'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/paginas/principal/index.html');
});

app.get('*', function(req, res){
  res.sendFile(__dirname + '/paginas/principal/404.html');
});

// Force-HTTPS and Listener
app.set('trust proxy', true); // <- required
app.use((req, res, next) => {
  if(!req.secure) return res.redirect('https://' + req.get('host') + req.url);
  next();
});

// rest of this is just a demo
app.use((req, res, next) => {
  res.send(`HTTPS: ${req.secure}`); 
  next();
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Demo app listening on ' + listener.address().port);
});
