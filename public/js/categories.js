

var token = 'iERHbjhNLr2ouVS3qO2qBgECr0XFzqzn';

var catlisthtml = '';

var ids = $();

var i = 0;

$(function () {

  $("#track-button-cat").hide();

  // Global Variables

  var myid;

  var site;

  var url;

  var userid;

  var category;

  var caturl;

  var page;

  var rank;

  var hits;

  var pages;

  var toptag;

  var toptagcount;

  var toptagrank;

  var toptagshtml;

  var avcost;

  var avcostr;

  var avcostdoll;

  var avcosthtml;

  var topcost;

  var topcostr;

  var topcostdoll;

  var topcosthtml;

  var bottomcost;

  var bottomcostr;

  var bottomcostdoll;

  var bottomcosthtml;

  var numCats;

  var catArray = [];

  var sort;

  // Get Categories

  site = $('#site-cat').val();

  url = 'https://api.envato.com/v1/market/categories:'+site;

  requestJSON(url, function(json) {

    numCats = json.categories.length;

    for(i = 0; i<numCats; i++) {

      //catArray.push(json.categories[i].path);

      catlisthtml = catlisthtml+

      '<option value="'+json.categories[i].path+'">'+json.categories[i].path+'</option>'

    }

    $('#catlist').html(catlisthtml);

    //console.log(catArray);

  });

  $('#submitbtn-cat').on('click', function(){

    // Show the Loader Gif in the API Data Div

    $('#apidata-cat').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

    // Clear any data in the #apipage div

    $('#apipage-cat').html('');

    // Clear any data in the #apirequestprogress div

    $('#apirequestprogress-cat').html('');

    // Reset the Rank

    rank = 0;

    // Clear the ids object

    ids = $();

    url = $('#url-cat').val();

    userid = $('#id-cat').val();

    handleId(userid, url);

    searchurl = 'https://api.envato.com/v3/market/catalog/item?id='+myid;

    // Access the API and return the product details

    requestJSON(searchurl, function(json) {

      spellCheck(json);

    });

    site = $('#site-cat').val();

    site = site.substring(0, site.length - 4);

    site = site + 'net';

    category = $('#catlist').val();

    catArray = category.split( '/' );

    sort = $('#sort-cat').val();

    if (catArray.length == 1) {

      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?site='+site+'&category='+catArray[0]+'&sort_by='+sort;

    } else if (catArray.length == 2) {

      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

    } else if (catArray.length == 3) {

      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

    }

    $('#sitename-cat').html('<h2>'+site+'</h2>');

    requestJSON(searchurl, function(json) {

      hits = json.total_hits;

      pages = hits/30;

	    var	pageswhole = Math.round(pages);

      $('#apitotals-cat').html('<h2>Search Hits: '+hits+' Number of results pages: '+pageswhole+'</h2>');

      toptagshtml = '<h4>Top Tags For '+category+'</h4>';

      for (var k=0; k<10; k++) {

				toptag = json.aggregations.tags[k].key;

				toptagcount = json.aggregations.tags[k].count;

				toptagrank = k+1;

				toptagshtml = toptagshtml+

											'<p>'+toptagrank+'. '+toptag+' - '+toptagcount+'</p>';

			}

			$('#toptags-cat').html(toptagshtml);

      avcost = json.aggregations.cost.avg;

			avcostr = Math.round(avcost);

			avcostdoll = avcostr/100;

			avcosthtml = '<h4>Average Cost: $'+avcostdoll+'</h4>';

			$('#avcost-cat').html(avcosthtml);

			topcost = json.aggregations.cost.max;

			topcostr = Math.round(topcost);

			topcostdoll = topcostr/100;

			topcosthtml = '<h4>Maximum Cost: $'+topcostdoll+'</h4>';

			$('#topcost-cat').html(topcosthtml);

			bottomcost = json.aggregations.cost.min;

			bottomcostr = Math.round(bottomcost);

			bottomcostdoll = bottomcostr/100;

			bottomcosthtml = '<h4>Minimum Cost: $'+bottomcostdoll+'</h4>';

			$('#bottomcost-cat').html(bottomcosthtml);

      findRank(myid, json, 1, function(i) {

        if (i === 0) {

          $('#apirequestprogress-cat').html('<p>Not in the Top 30</p>');

          var firstpagehtml = '<div class="row">'+

                                  '<h2>Some Products On Page 1</h2>'+

                                '</div>';

          for (var z=0; z<5; z++) {

            var title = json.matches[z].name;

            var desc = json.matches[z].description;

					  var thumburl;

					  if (site == 'themeforest.net'){

						  thumburl = json.matches[z].previews.icon_with_landscape_preview.icon_url;

					  } else if (site == 'codecanyon.net' || site === 'videohive.net'){

						  if (json.matches[z].previews.icon_with_landscape_preview === undefined) {

							  thumburl = json.matches[z].previews.icon_with_video_preview.icon_url;

						  } else {

							  thumburl = json.matches[z].previews.icon_with_landscape_preview.icon_url

						  }

					  } else if (site == 'audiojungle.net'){

						  if (json.matches[z].previews.icon_with_landscape_preview === undefined) {

							  thumburl = json.matches[z].previews.icon_with_audio_preview.icon_url;

						  } else {

							  thumburl = json.matches[z].previews.icon_with_landscape_preview.icon_url

						  }

					  } else if (site == 'graphicriver.net'){

						 if (json.matches[z].previews.icon_with_landscape_preview === undefined) {

							 thumburl = json.matches[z].previews.icon_with_square_preview.icon_url;

						 } else {

							 thumburl = json.matches[z].previews.icon_with_landscape_preview.icon_url

						 }

					 } else if (site == 'photodune.net'){

						if (json.matches[z].previews.icon_with_landscape_preview === undefined) {

							thumburl = json.matches[z].previews.icon_with_thumbnail_preview.icon_url;

						} else {

							thumburl = json.matches[z].previews.icon_with_landscape_preview.icon_url

						}

					} else if (site == '3docean.net'){

						if (json.matches[z].previews.icon_with_landscape_preview === undefined) {

							thumburl = json.matches[z].previews.icon_with_square_preview.icon_url;

						} else {

							thumburl = json.matches[z].previews.icon_with_landscape_preview.icon_url

						}

					} else {

						alert("Invalid Site Information - Have you picked the right site?");

					}

          var numsales = json.matches[z].number_of_sales;

          var price = json.matches[z].price_cents / 100;

          var producturl = json.matches[0].url;

          var productrank = z+1;

          firstpagehtml = firstpagehtml+

                              '<div id="product">'+

                                '<div class="row">'+

                                  '<h4>Rank No. '+productrank+'</h4>'+

                                '</div>'+

                                '<div class="row">'+

                                  '<h3>'+title+'</h3>'+

                                '</div>'+

                                '<div class="row">'+

                                  '<div class="col-sm-3 col-xs-12">'+

                                  '<img src="'+thumburl+'" />'+

                                  '</div>'+

                                  '<div class="col-sm-8 col-xs-12">'+

                                  '<p>'+desc+'</p>'+

                                  '</div>'+

                                '</div>'+

                                '<div class="row">'+

                                  '<div class="col-sm-3 col-xs-12">'+

                                    '<p>No. of sales: '+numsales+'</p>'+

                                  '</div>'+

                                  '<div class="col-sm-3 col-xs-12">'+

                                    '<p>Price: $'+price+'</p>'+

                                  '</div>'+

                                  '<div class="col-sm-3 col-xs-12">'+

                                    '<a href="'+producturl+'"><button type="button" class="btn btn-default">Product Page</button></a>'+

                                  '</div>'+

                                '</div>'+

                              '</div>';

          }

          $('#apifirstpage-cat').html(firstpagehtml);

          if (catArray.length == 1) {

            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=2&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

          } else if (catArray.length == 2) {

            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=2&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

          } else if (catArray.length == 3) {

            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=2&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

          }

          requestJSON(searchurl, function(json) {

            findRank(myid, json, 2, function(i) {

              if (i === 0) {

                $('#apirequestprogress-cat').html('<p>Not in the Top 60</p>');

                if (catArray.length == 1) {

                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=3&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                } else if (catArray.length == 2) {

                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=3&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                } else if (catArray.length == 3) {

                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=3&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                }

                requestJSON(searchurl, function(json) {

                  findRank(myid, json, 3, function(i) {

                    if (i === 0) {

                      $('#apirequestprogress-cat').html('<p>Not in the Top 90</p>');

                      if (catArray.length == 1) {

                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=4&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                      } else if (catArray.length == 2) {

                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=4&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                      } else if (catArray.length == 3) {

                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=4&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                      }

                      requestJSON(searchurl, function(json) {

                        findRank(myid, json, 4, function(i) {

                          if (i === 0) {

                            $('#apirequestprogress-cat').html('<p>Not in the Top 120</p>');

                            if (catArray.length == 1) {

                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=5&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                            } else if (catArray.length == 2) {

                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=5&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                            } else if (catArray.length == 3) {

                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=5&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                            }

                            requestJSON(searchurl, function(json) {

                              findRank(myid, json, 5, function(i) {

                                if (i === 0) {

                                  $('#apirequestprogress-cat').html('<p>Not in the Top 150</p>');

                                  if (catArray.length == 1) {

                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=6&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                  } else if (catArray.length == 2) {

                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=6&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                  } else if (catArray.length == 3) {

                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=6&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                  }

                                  requestJSON(searchurl, function(json) {

                                    findRank(myid, json, 6, function(i) {

                                      if (i === 0) {

                                        $('#apirequestprogress-cat').html('<p>Not in the Top 180</p>');

                                        if (catArray.length == 1) {

                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=7&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                        } else if (catArray.length == 2) {

                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=7&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                        } else if (catArray.length == 3) {

                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=7&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                        }

                                        requestJSON(searchurl, function(json) {

                                          findRank(myid, json, 7, function(i) {

                                            if (i === 0) {

                                              $('#apirequestprogress-cat').html('<p>Not in the Top 210</p>');

                                              if (catArray.length == 1) {

                                                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=8&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                              } else if (catArray.length == 2) {

                                                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=8&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                              } else if (catArray.length == 3) {

                                                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=8&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                              }

                                              requestJSON(searchurl, function(json) {

                                                findRank(myid, json, 8, function(i) {

                                                  if (i === 0) {

                                                    $('#apirequestprogress-cat').html('<p>Not in the Top 240</p>');

                                                    if (catArray.length == 1) {

                                                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=9&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                    } else if (catArray.length == 2) {

                                                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=9&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                    } else if (catArray.length == 3) {

                                                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=9&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                    }

                                                    requestJSON(searchurl, function(json) {

                                                      findRank(myid, json, 9, function(i) {

                                                        if (i === 0) {

                                                          $('#apirequestprogress-cat').html('<p>Not in the Top 270</p>');

                                                          if (catArray.length == 1) {

                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=10&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                          } else if (catArray.length == 2) {

                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=10&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                          } else if (catArray.length == 3) {

                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=10&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                          }

                                                          requestJSON(searchurl, function(json) {

                                                            findRank(myid, json, 10, function(i) {

                                                              if (i === 0) {

                                                                $('#apirequestprogress-cat').html('<p>Not in the Top 300</p>');

                                                                if (catArray.length == 1) {

                                                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=11&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                } else if (catArray.length == 2) {

                                                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=11&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                } else if (catArray.length == 3) {

                                                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=11&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                }

                                                                requestJSON(searchurl, function(json) {

                                                                  findRank(myid, json, 11, function(i) {

                                                                    if (i === 0) {

                                                                      $('#apirequestprogress-cat').html('<p>Not in the Top 330</p>');

                                                                      if (catArray.length == 1) {

                                                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=12&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                      } else if (catArray.length == 2) {

                                                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=12&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                      } else if (catArray.length == 3) {

                                                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=12&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                      }

                                                                      requestJSON(searchurl, function(json) {

                                                                        findRank(myid, json, 12, function(i) {

                                                                          if (i === 0) {

                                                                            $('#apirequestprogress-cat').html('<p>Not in the Top 360</p>');

                                                                            if (catArray.length == 1) {

                                                                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=13&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                            } else if (catArray.length == 2) {

                                                                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=13&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                            } else if (catArray.length == 3) {

                                                                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=13&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                            }

                                                                            requestJSON(searchurl, function(json) {

                                                                              findRank(myid, json, 13, function(i) {

                                                                                if (i === 0) {

                                                                                  $('#apirequestprogress-cat').html('<p>Not in the Top 390</p>');

                                                                                  if (catArray.length == 1) {

                                                                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=14&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                                  } else if (catArray.length == 2) {

                                                                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=14&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                                  } else if (catArray.length == 3) {

                                                                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=14&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                                  }

                                                                                  requestJSON(searchurl, function(json) {

                                                                                    findRank(myid, json, 14, function(i) {

                                                                                      if (i === 0) {

                                                                                        $('#apirequestprogress-cat').html('<p>Not in the Top 420</p>');

                                                                                        if (catArray.length == 1) {

                                                                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=15&site='+site+'&category='+catArray[0]+'&sort_by='+sort;

                                                                                        } else if (catArray.length == 2) {

                                                                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=15&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'&sort_by='+sort;

                                                                                        } else if (catArray.length == 3) {

                                                                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=15&site='+site+'&category='+catArray[0]+'%2F'+catArray[1]+'%2F'+catArray[2]+'&sort_by='+sort;

                                                                                        }

                                                                                        requestJSON(searchurl, function(json) {

                                                                                          findRank(myid, json, 15, function(i) {

                                                                                            if (i === 0) {

                                                                                              $('#apirequestprogress-cat').html('<p>Not in the Top 450. Thats my Limit, Im giving up, sorry.....</p>');

                                                                                            }

                                                                                          });

                                                                                        });

                                                                                      }

                                                                                    });

                                                                                  });

                                                                                }

                                                                              });

                                                                            });

                                                                          }

                                                                        });

                                                                      });

                                                                    }

                                                                  });

                                                                });

                                                              }

                                                            });

                                                          });

                                                        }

                                                      });

                                                    });

                                                  }

                                                });

                                              });

                                            }

                                          });

                                        });

                                      }

                                    });

                                  });

                                }

                              });

                            });

                          }

                        });

                      });

                    }

                  });

                });

              }

            });

          });

        }

      });

    });

  });

  function handleId(userid, url) {

    var pathArray;

    if (userid === ''){

      // Split the url into an array

      pathArray = url.split( '/' );

      // Get the ID from the 5th element in the array

      myid = pathArray[5];

      // Check for the length of the ID (7 or 8 characters in this case)

      if (myid.substring(7, 8) == '?' || '') {

        myid = myid.substring(0, 7);

      } else {

        myid = myid.substring(0, 8);

      }

    } else {

      myid = $('#id').val();

    }

  }

  function findRank(myid, json, page, callback) {

    var x;

    var y;

    var startid;

    var endid;

    var id;

    startid = (page-1)*30;

    endid = page*30;

    for (x=0; x<json.matches.length; x++) {

        id = json.matches[x].id;

        ids = ids.add(id);

       }

    i = 0;

    for (y=startid; y<endid; y++) {

      if (myid == ids[y]) {

        rank = y+1;

        $('#apidata-cat').html('<h1>Your product is ranked number '+rank+'</h1>');

        $('#apipage-cat').html('<h2>Page '+page+'</h2>');

        $('#apirequestprogress-cat').html('<p>Done.</p>');

        $("#track-button-cat").show();

        i = 1;

      }

    }

    callback.call(null, i);

  }

  var trackButton = jQuery('#track-button-cat');

  trackButton.on('click', function () {

    trackButton.attr('disabled', 'disabled').text('Adding Category...');

      socket.emit('trackCat', {

        itemId: myid,
        category: category,
        site: site,
        sort: sort,
        searchPosition: rank

      })

    trackButton.removeAttr('disabled').text('Category Tracked');

  });

});

$('#site-cat').change(function () {

  site = $('#site-cat').val();

  url = 'https://api.envato.com/v1/market/categories:'+site;

  catlisthtml = '';

  $('#catlist').html(catlisthtml);

  requestJSON(url, function(json) {

    numCats = json.categories.length;

    for(i = 0; i<numCats; i++) {

      //catArray.push(json.categories[i].path);

      catlisthtml = catlisthtml+

      '<option value="'+json.categories[i].path+'">'+json.categories[i].path+'</option>'

    }

    $('#catlist').html(catlisthtml);

  });

});

function requestJSON(url, callback) {

  $.ajax({

    url: url,

    beforeSend: function(xhr, settings) {

      xhr.setRequestHeader('Authorization','Bearer ' + token);

    },

    complete: function(xhr) {

      callback.call(null, xhr.responseJSON);

    }

  });

}

// socket on connect

socket.on('connect', function () {

  $('#ui-id-5').on('click', function(){

    socket.emit('trackedcats', function (items) {

      var numItems = items.length;

      var html = '<h2>Tracked Categories</h2>';

      for(var f=0; f<numItems; f++) {

        var chartbox = 'chartcat'+f;

        var id = items[f].itemId;

        var category = items[f].category;

        var site = items[f].site;

        var startRank = items[f].searchPosition;

        html = html+

          '<div class="row tracked-search">'+

            '<div class="col-md-4">'+

              '<p>Item ID: '+id+'</p>'+

              '<p>Category: '+category+'</p>'+

              '<p>Site: '+site+'</p>'+

              '<h3>Starting Rank: '+startRank+'</h3>'+

            '</div>'+

            '<div id="'+chartbox+'" class="ct-chart col-md-8">'+

            '</div>'+

          '</div>'

      }

      $('#tracked-cats').html(html);

      for(var f=0; f<numItems; f++) {

        var chartbox = '#chartcat'+f;

        var labels = [];

        var data = [];

        var numSeries = items[f].series.length;

        for(var g=0; g<numSeries; g++){

          var createdDate = items[f].series[g].createdDate;

          var date = moment(createdDate).format("Do MMM");

          labels.push(date);
          data.push(items[f].series[g].searchPosition);

        }

        var searchData = {

          labels: labels,
          series: [data]

        };

        var options = {
          // width: 300,
          // height: 100
          onlyInteger: true
        };

        new Chartist.Line(chartbox, searchData, options);

      }

    });

  });

});
