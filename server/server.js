const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const request = require('request');
const _ = require('lodash');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Search} = require('./models/search');

const app = express();
const port = 3000;
const publicPath = path.join(__dirname, '../public');

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());

io.on('connection', (socket) => {

  console.log('New User Connected');

  socket.on('trackSearch', (search) => {

    console.log(search.itemId);

    var data = {

      itemId: search.itemId,
      searchTerm: search.searchTerm,
      site: search.site,
      searchPosition: search.searchPosition

    }

    request.post('http://localhost:3000/search').form(data);

  });

  socket.on('join', (callback) => {

    var getOptions = { method: 'GET',
        url: 'http://localhost:3000/trackedsearch',
        headers:
         { 'content-type': 'application/json' },
        json: true };

    request(getOptions, function (error, response, body) {

      if (error) throw new Error(error);

      var items = body.trackedsearchs;

      callback(items);

    });

  });

});

app.post('/search', urlencodedParser, (req, res) => {

  console.log('Request', req.body);

  var search = new Search({

    itemId: req.body.itemId,
    searchTerm: req.body.searchTerm,
    site: req.body.site,
    searchPosition: req.body.searchPosition

  })

  search.save().then((doc) => {

    console.log('doc saved:', doc);

    res.send(doc);

  }, (e) => {

    console.log('error', e);

    res.status(400).send(e);

  });

});

app.get('/trackedsearch', (req, res) => {

  Search.find().then((trackedsearchs) => {

    res.send({trackedsearchs});

  }, (e) => {

    res.send(e);

  });

});

app.patch('/search/:id', (req, res) => {

  var id = req.params.id;

  var searchPosition = req.body.series.searchPosition;

  var body = {

    series: {

      searchPosition: searchPosition

    }

  }

  if (!ObjectID.isValid(id)) {

    return res.status(404).send();

  }

  Search.findOneAndUpdate({

    _id: id

  }, {$push:body}, {new: true}).then((search) => {

    if(!search) {

      return res.status(404).send();

    }

    res.send({search});

  }).catch((e) => {

    res.status(400).send();

  });

});

server.listen(port, () => {

  console.log('Server started on port 3000');

});
