var async = require("async");
var request = require("request");
//var moment = require('moment');

var schedule = require('node-schedule');

var ids =[];

var j = schedule.scheduleJob('0 19 * * *', function(){

  console.log('Scheduled Job Ran!');

  var getOptions = { method: 'GET',
      url: 'http://localhost:3000/trackedsearch',
      headers:
       { 'content-type': 'application/json' },
      json: true };

  request(getOptions, function (error, response, body) {

    if (error) throw new Error(error);

    var items = body.trackedsearchs;

    async.eachSeries(items,

      function(item, callback){

        console.log(item);

        ids =[];

        var dbid = item._id;

        var myid = item.itemId;

        var search = item.searchTerm;

        var site = item.site;

        var url = 'https://api.envato.com/v1/discovery/search/search/item?term='+search+'&site='+site;

        requestJSON(url, (json) => {

          findRank(myid, json, 1, dbid, (i) => {

            if (i === 0) {

              url = 'https://api.envato.com/v1/discovery/search/search/item?page=2&term='+search+'&site='+site;

              requestJSON(url, (json) => {

                findRank(myid, json, 2, dbid, (i) => {

                  if (i === 0) {

                    url = 'https://api.envato.com/v1/discovery/search/search/item?page=3&term='+search+'&site='+site;

                    requestJSON(url, (json) => {

                      findRank(myid, json, 3, dbid, (i) => {

                        if (i === 0) {

                          url = 'https://api.envato.com/v1/discovery/search/search/item?page=4&term='+search+'&site='+site;

                          requestJSON(url, (json) => {

                            findRank(myid, json, 4, dbid, (i) => {

                              if (i === 0) {

                                url = 'https://api.envato.com/v1/discovery/search/search/item?page=5&term='+search+'&site='+site;

                                requestJSON(url, (json) => {

                                  findRank(myid, json, 5, dbid, (i) => {

                                    if (i === 0) {

                                      url = 'https://api.envato.com/v1/discovery/search/search/item?page=6&term='+search+'&site='+site;

                                      requestJSON(url, (json) => {

                                        findRank(myid, json, 6, dbid, (i) => {

                                          if (i === 0) {

                                            url = 'https://api.envato.com/v1/discovery/search/search/item?page=7&term='+search+'&site='+site;

                                            requestJSON(url, (json) => {

                                              findRank(myid, json, 7, dbid, (i) => {

                                                if (i === 0) {

                                                  url = 'https://api.envato.com/v1/discovery/search/search/item?page=8&term='+search+'&site='+site;

                                                  requestJSON(url, (json) => {

                                                    findRank(myid, json, 8, dbid, (i) => {

                                                      if (i === 0) {

                                                        url = 'https://api.envato.com/v1/discovery/search/search/item?page=9&term='+search+'&site='+site;

                                                        requestJSON(url, (json) => {

                                                          findRank(myid, json, 9, dbid, (i) => {

                                                            if (i === 0) {

                                                              url = 'https://api.envato.com/v1/discovery/search/search/item?page=10&term='+search+'&site='+site;

                                                              requestJSON(url, (json) => {

                                                                findRank(myid, json, 10, dbid, (i) => {

                                                                  if (i === 0) {

                                                                    url = 'https://api.envato.com/v1/discovery/search/search/item?page=11&term='+search+'&site='+site;

                                                                    requestJSON(url, (json) => {

                                                                      findRank(myid, json, 11, dbid, (i) => {

                                                                        if (i === 0) {

                                                                          url = 'https://api.envato.com/v1/discovery/search/search/item?page=12&term='+search+'&site='+site;

                                                                          requestJSON(url, (json) => {

                                                                            findRank(myid, json, 12, dbid, (i) => {

                                                                              if (i === 0) {

                                                                                url = 'https://api.envato.com/v1/discovery/search/search/item?page=13&term='+search+'&site='+site;

                                                                                requestJSON(url, (json) => {

                                                                                  findRank(myid, json, 13, dbid, (i) => {

                                                                                    if (i === 0) {

                                                                                      url = 'https://api.envato.com/v1/discovery/search/search/item?page=14&term='+search+'&site='+site;

                                                                                      requestJSON(url, (json) => {

                                                                                        findRank(myid, json, 14, dbid, (i) => {

                                                                                          if (i === 0) {

                                                                                            url = 'https://api.envato.com/v1/discovery/search/search/item?page=15&term='+search+'&site='+site;

                                                                                            requestJSON(url, (json) => {

                                                                                              findRank(myid, json, 15, dbid, (i) => {

                                                                                                if (i === 0) {

                                                                                                  console.log(dbid, ': outside of top 450 results');

                                                                                                  callback();

                                                                                                }

                                                                                              });

                                                                                            });

                                                                                          } else {

                                                                                            callback();

                                                                                          }

                                                                                        });

                                                                                      });

                                                                                    } else {

                                                                                      callback();

                                                                                    }

                                                                                  });

                                                                                });

                                                                              } else {

                                                                                callback();

                                                                              }

                                                                            });

                                                                          });

                                                                        } else {

                                                                          callback();

                                                                        }

                                                                      });

                                                                    });

                                                                  } else {

                                                                    callback();

                                                                  }

                                                                });

                                                              });

                                                            } else {

                                                              callback();

                                                            }

                                                          });

                                                        });

                                                      } else {

                                                        callback();

                                                      }

                                                    });

                                                  });

                                                } else {

                                                  callback();

                                                }

                                              });

                                            });

                                          } else {

                                            callback();

                                          }

                                        });

                                      });

                                    } else {

                                      callback();

                                    }

                                  });

                                });

                              } else {

                                callback();

                              }

                            });

                          });

                        } else {

                          callback();

                        }

                      });

                    });

                  } else {

                    callback();

                  }

                });

              });

            } else {

              callback();

            }

          });

        });

      },

      function(err){
        // All tasks are done now
        console.log('All updates completed');
      }
    );

  });

});

function requestJSON(url, callback) {

  var options = { method: 'GET',
    url,
    headers:
     { authorization: 'Bearer iERHbjhNLr2ouVS3qO2qBgECr0XFzqzn' } };

  request(options, function (error, response, body) {

    if (error) throw new Error(error);

    var json = JSON.parse(body);

    callback(json);

  });

}

function findRank(myid, json, page, dbid, callback) {

  var x;

  var y;

  var startid;

  var endid;

  var id;

  var rank;

  startid = (page-1)*30;

  endid = page*30;

  for (x=0; x<json.matches.length; x++) {

      id = json.matches[x].id;

      ids.push(id);

     }

  i = 0;

  for (y=startid; y<endid; y++) {

    if (myid == ids[y]) {

      rank = y+1;

      console.log(rank);

      i = 1;

      var patchOptions = { method: 'PATCH',
          url: 'http://localhost:3000/search/'+dbid,
          headers:
           { 'content-type': 'application/json' },
          body: {

            searchPosition: rank,
            series: {

              searchPosition: rank,
              //createdDate: moment().valueOf()

            }

          },
          json: true };

          console.log(patchOptions);

      request(patchOptions, function(error, response, body) {

        if (error) throw new Error(error);

      });

    }

  }

  callback(i);

}
