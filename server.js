'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var bodyParser = require('body-parser');
var upload = multer({ dest: './public' });
// require and use "multer"...

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  res.json({ name: req.file.originalname, type: req.file.mimetype, size: `${req.file.size} bytes`});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
