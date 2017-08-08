const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const request = require('request');
const _ = require('lodash');
const moment = require('moment');

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

    var data = {

      itemId: search.itemId,
      searchTerm: search.searchTerm,
      site: search.site,
      searchPosition: search.searchPosition,

    }

    request.post({url:'http://localhost:3000/search', form: data}, function(err, response, body){

      var resBody = JSON.parse(body);

      var rank = resBody.searchPosition;

      var dbid = resBody._id;

      var patchOptions = { method: 'PATCH',
          url: 'http://localhost:3000/search/'+dbid,
          headers:
           { 'content-type': 'application/json' },
          body: {

            searchPosition: rank,
            series: {

              searchPosition: rank,
              createdDate: moment().valueOf()

            }

          },
          json: true };

      request(patchOptions, function(error, response, body) {

        if (error) throw new Error(error);

      });

    });

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

  var search = new Search({

    itemId: req.body.itemId,
    searchTerm: req.body.searchTerm,
    site: req.body.site,
    searchPosition: req.body.searchPosition

  })

  search.save().then((doc) => {

    res.send(doc);

  }, (e) => {

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

      searchPosition: searchPosition,
      createdDate: moment().valueOf()

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
