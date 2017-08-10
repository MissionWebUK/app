var async = require("async");
var request = require("request");
var moment = require('moment');

var ids =[];

var catRankUpdate = () => {

  //console.log('Category Scheduled Job Ran!', moment().valueOf());

  var getOptions = { method: 'GET',
      url: 'http://localhost:3000/trackedcategories',
      headers:
       { 'content-type': 'application/json' },
      json: true };

  request(getOptions, function (error, response, body) {

    if (error) throw new Error(error);

    var items = body.trackedcategories;

    async.eachSeries(items,

      function(item, callback){

        ids =[];

        var dbid = item._id;

        var myid = item.itemId;

        var category = item.category;

        var site = item.site;

        var sort = item.sort;

        var catArray = category.split( '/' );

        var searchurl;

        if (catArray.length == 1) {

          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?site='+site+'&category='+catArray[0]+'&sort_by='+sort;

        } else if (catArray.length == 2) {

          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

        } else if (catArray.length == 3) {

          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

        }

        requestJSON(searchurl, (json) => {

          findRank(myid, json, 1, dbid, (i) => {

            if (i === 0) {

              if (catArray.length == 1) {

                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=2&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

              } else if (catArray.length == 2) {

                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=2&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

              } else if (catArray.length == 3) {

                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=2&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

              }

              requestJSON(searchurl, (json) => {

                findRank(myid, json, 2, dbid, (i) => {

                  if (i === 0) {

                    if (catArray.length == 1) {

                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=3&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                    } else if (catArray.length == 2) {

                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=3&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                    } else if (catArray.length == 3) {

                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=3&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                    }

                    requestJSON(searchurl, (json) => {

                      findRank(myid, json, 3, dbid, (i) => {

                        if (i === 0) {

                          if (catArray.length == 1) {

                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=4&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                          } else if (catArray.length == 2) {

                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=4&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                          } else if (catArray.length == 3) {

                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=4&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                          }

                          requestJSON(searchurl, (json) => {

                            findRank(myid, json, 4, dbid, (i) => {

                              if (i === 0) {

                                if (catArray.length == 1) {

                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=5&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                } else if (catArray.length == 2) {

                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=5&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                } else if (catArray.length == 3) {

                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=5&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                }

                                requestJSON(searchurl, (json) => {

                                  findRank(myid, json, 5, dbid, (i) => {

                                    if (i === 0) {

                                      if (catArray.length == 1) {

                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=6&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                      } else if (catArray.length == 2) {

                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=6&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                      } else if (catArray.length == 3) {

                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=6&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                      }

                                      requestJSON(searchurl, (json) => {

                                        findRank(myid, json, 6, dbid, (i) => {

                                          if (i === 0) {

                                            if (catArray.length == 1) {

                                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=7&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                            } else if (catArray.length == 2) {

                                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=7&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                            } else if (catArray.length == 3) {

                                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=7&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                            }

                                            requestJSON(searchurl, (json) => {

                                              findRank(myid, json, 7, dbid, (i) => {

                                                if (i === 0) {

                                                  if (catArray.length == 1) {

                                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=8&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                  } else if (catArray.length == 2) {

                                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=8&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                  } else if (catArray.length == 3) {

                                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=8&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                  }

                                                  requestJSON(searchurl, (json) => {

                                                    findRank(myid, json, 8, dbid, (i) => {

                                                      if (i === 0) {

                                                        if (catArray.length == 1) {

                                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=9&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                        } else if (catArray.length == 2) {

                                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=9&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                        } else if (catArray.length == 3) {

                                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=9&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                        }

                                                        requestJSON(searchurl, (json) => {

                                                          findRank(myid, json, 9, dbid, (i) => {

                                                            if (i === 0) {

                                                              if (catArray.length == 1) {

                                                                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=10&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                              } else if (catArray.length == 2) {

                                                                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=10&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                              } else if (catArray.length == 3) {

                                                                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=10&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                              }

                                                              requestJSON(searchurl, (json) => {

                                                                findRank(myid, json, 10, dbid, (i) => {

                                                                  if (i === 0) {

                                                                    if (catArray.length == 1) {

                                                                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=11&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                    } else if (catArray.length == 2) {

                                                                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=11&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                    } else if (catArray.length == 3) {

                                                                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=11&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                    }

                                                                    requestJSON(searchurl, (json) => {

                                                                      findRank(myid, json, 11, dbid, (i) => {

                                                                        if (i === 0) {

                                                                          if (catArray.length == 1) {

                                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=12&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                          } else if (catArray.length == 2) {

                                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=12&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                          } else if (catArray.length == 3) {

                                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=12&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                          }

                                                                          requestJSON(searchurl, (json) => {

                                                                            findRank(myid, json, 12, dbid, (i) => {

                                                                              if (i === 0) {

                                                                                if (catArray.length == 1) {

                                                                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=13&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                                } else if (catArray.length == 2) {

                                                                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=13&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                                } else if (catArray.length == 3) {

                                                                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=13&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                                }

                                                                                requestJSON(searchurl, (json) => {

                                                                                  findRank(myid, json, 13, dbid, (i) => {

                                                                                    if (i === 0) {

                                                                                      if (catArray.length == 1) {

                                                                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=14&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                                      } else if (catArray.length == 2) {

                                                                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=14&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                                      } else if (catArray.length == 3) {

                                                                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=14&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                                      }

                                                                                    requestJSON(searchurl, (json) => {

                                                                                      findRank(myid, json, 14, dbid, (i) => {

                                                                                        if (i === 0) {

                                                                                          if (catArray.length == 1) {

                                                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=15&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                                          } else if (catArray.length == 2) {

                                                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=15&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                                          } else if (catArray.length == 3) {

                                                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=15&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                                          }

                                                                                          requestJSON(searchurl, (json) => {

                                                                                            findRank(myid, json, 15, dbid, (i) => {

                                                                                              if (i === 0) {

                                                                                                //console.log(dbid, ': outside of top 450 results');

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
        //console.log('All updates completed', moment().valueOf());
      }

    );

  });

};

module.exports = {catRankUpdate};

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

      i = 1;

      var patchOptions = { method: 'PATCH',
          url: 'http://localhost:3000/category/'+dbid,
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

    }

  }

  callback(i);

}
