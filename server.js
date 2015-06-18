
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var morgan = require('morgan');
var port = process.env.PORT || 3000;


var instagram = require('instagram-node-lib');
instagram.set('client_id', process.env.CLIENT_ID);
instagram.set('client_secret', process.env.CLIENT_SECRET);

// var instagram = new  insta({
// client_id: process.env.CLIENT_ID,
// client_secret: process.env.YOUR-CLIENT-SECRET
// })


app.set('views', './views');
app.set('view engine', 'ejs');

// Proper Logging Middleware
app.use(morgan('dev'));

//this links my files.
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

server.listen(port, function() {
  console.log('Server started on http://localhost:' + port);
});



//calback 

app.get('/callback', function(req, res){
    var handshake =  instagram.subscriptions.handshake(req, res);
});

//now for the sockets

var io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
  socket.emit('connected');
});


