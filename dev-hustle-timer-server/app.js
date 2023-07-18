var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { sequelize } = require('./models');
const cors =require('cors');
const http = require('http');

var app = express();
app.use(cors());

//socket init
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT","DELETE","PATCH"],
    credentials: true
  }
});
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  }); 

  socket.emit('message', 'Hello from server!');
});
app.use((req, res, next) => {
  req.io = io;
  next();
});


 
server.listen(8080, () => {
  console.log('Server started on port 8080');
});

//sequalize init
sequelize.sync({ force: false }).then(() => {
  console.log('db연결 성공');
}).catch((err) => {
  console.error(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router init

var indexRouter = require('./routes/index');
var eventRouter = require('./routes/event_router');
var meRouter = require('./routes/me_router');
var messageRouter = require('./routes/message_router');
var musicRouter = require('./routes/music_router');
var timetableRouter = require('./routes/timetable_router');

app.use('/api', indexRouter);
app.use('/api/event',eventRouter);
app.use('/api/me',meRouter);
app.use('/api/message',messageRouter);
app.use('/api/music',musicRouter);
app.use('/api/timetable',timetableRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
