
/*
 *
 *
 *
 * Envato Rank Main.js
 * Author: Martin Sanders
 * V1.0
 *
 *
*/



/*

Main Function Loads with the page

*/

var socket = io();

$(function(){

  $(function() {

		$("#tabs").tabs();

	});

  $("#track-button").hide();

  // Global Variables

  var token = 'iERHbjhNLr2ouVS3qO2qBgECr0XFzqzn';

  var ids = $();

  var i = 0;

  var myid;

  var site;

  var url;

  var userid;

  var search;

  var searchurl;

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

  // Submit Button Function

  $('#submitbtn').on('click', function(){

    // Show the Loader Gif in the API Data Div

    $('#apidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

    // Clear any data in the #apipage div

    $('#apipage').html('');

    // Clear any data in the #apirequestprogress div

    $('#apirequestprogress').html('');

    // Reset the Rank

    rank = 0;

    // Clear the ids object

    ids = $();

    description = "";

		// Define Onclick Form Variables

    // Site Name

    site = $('#site').val();

    // Product URL

    url = $('#url').val();

    // Product id number entered by the user

		userid = $('#id').val();

    // Search terms

		search = $('#search').val();

    // Determine the id either from the url or from the user (See Function)

    handleId(userid, url);

    // Set the Search URL for the product

    searchurl = 'https://api.envato.com/v3/market/catalog/item?id='+myid;

    // Access the API and return the product details

    requestJSON(searchurl, function(json) {

      spellCheck(json);

    });

    /*
     *
     * Find the Search Ranking of the Product
     * Display Information Related to the Search
     *
     *
    */

    // Display Site Name

    $('#sitename').html('<h2>'+site+'</h2>');

    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?term='+search+'&site='+site;

    requestJSON(searchurl, function(json) {

      console.log(json);

      hits = json.total_hits;

      pages = hits/30;

	    var	pageswhole = Math.round(pages);

      $('#apitotals').html('<h2>Search Hits: '+hits+' Number of results pages: '+pageswhole+'</h2>');

      toptagshtml = '<h4>Top Tags For '+search+'</h4>';

			for (var k=0; k<10; k++) {

				toptag = json.aggregations.tags[k].key;

				toptagcount = json.aggregations.tags[k].count;

				toptagrank = k+1;

				toptagshtml = toptagshtml+

											'<p>'+toptagrank+'. '+toptag+' - '+toptagcount+'</p>';

			}


			$('#toptags').html(toptagshtml);

			avcost = json.aggregations.cost.avg;

			avcostr = Math.round(avcost);

			avcostdoll = avcostr/100;

			avcosthtml = '<h4>Average Cost: $'+avcostdoll+'</h4>';

			$('#avcost').html(avcosthtml);

			topcost = json.aggregations.cost.max;

			topcostr = Math.round(topcost);

			topcostdoll = topcostr/100;

			topcosthtml = '<h4>Maximum Cost: $'+topcostdoll+'</h4>';

			$('#topcost').html(topcosthtml);

			bottomcost = json.aggregations.cost.min;

			bottomcostr = Math.round(bottomcost);

			bottomcostdoll = bottomcostr/100;

			bottomcosthtml = '<h4>Minimum Cost: $'+bottomcostdoll+'</h4>';

			$('#bottomcost').html(bottomcosthtml);

      findRank(myid, json, 1, function(i) {

        if (i === 0) {

          $('#apirequestprogress').html('<p>Not in the Top 30</p>');

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

          $('#apifirstpage').html(firstpagehtml);

          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=2&term='+search+'&site='+site;

          requestJSON(searchurl, function(json) {

            findRank(myid, json, 2, function(i) {

              if (i === 0) {

                $('#apirequestprogress').html('<p>Not in the Top 60</p>');

                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=3&term='+search+'&site='+site;

                requestJSON(searchurl, function(json) {

                  findRank(myid, json, 3, function(i) {

                    if (i === 0) {

                      $('#apirequestprogress').html('<p>Not in the Top 90</p>');

                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=4&term='+search+'&site='+site;

                      requestJSON(searchurl, function(json) {

                        findRank(myid, json, 4, function(i) {

                          if (i === 0) {

                            $('#apirequestprogress').html('<p>Not in the Top 120</p>');

                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=5&term='+search+'&site='+site;

                            requestJSON(searchurl, function(json) {

                              findRank(myid, json, 5, function(i) {

                                if (i === 0) {

                                  $('#apirequestprogress').html('<p>Not in the Top 150</p>');

                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=6&term='+search+'&site='+site;

                                  requestJSON(searchurl, function(json) {

                                    findRank(myid, json, 6, function(i) {

                                      if (i === 0) {

                                        $('#apirequestprogress').html('<p>Not in the Top 180</p>');

                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=7&term='+search+'&site='+site;

                                        requestJSON(searchurl, function(json) {

                                          findRank(myid, json, 7, function(i) {

                                            if (i === 0) {

                                              $('#apirequestprogress').html('<p>Not in the Top 210</p>');

                                              searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=8&term='+search+'&site='+site;

                                              requestJSON(searchurl, function(json) {

                                                findRank(myid, json, 8, function(i) {

                                                  if (i === 0) {

                                                    $('#apirequestprogress').html('<p>Not in the Top 240</p>');

                                                    searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=9&term='+search+'&site='+site;

                                                    requestJSON(searchurl, function(json) {

                                                      findRank(myid, json, 9, function(i) {

                                                        if (i === 0) {

                                                          $('#apirequestprogress').html('<p>Not in the Top 270</p>');

                                                          searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=10&term='+search+'&site='+site;

                                                          requestJSON(searchurl, function(json) {

                                                            findRank(myid, json, 10, function(i) {

                                                              if (i === 0) {

                                                                $('#apirequestprogress').html('<p>Not in the Top 300</p>');

                                                                searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=11&term='+search+'&site='+site;

                                                                requestJSON(searchurl, function(json) {

                                                                  findRank(myid, json, 11, function(i) {

                                                                    if (i === 0) {

                                                                      $('#apirequestprogress').html('<p>Not in the Top 330</p>');

                                                                      searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=12&term='+search+'&site='+site;

                                                                      requestJSON(searchurl, function(json) {

                                                                        findRank(myid, json, 12, function(i) {

                                                                          if (i === 0) {

                                                                            $('#apirequestprogress').html('<p>Not in the Top 360</p>');

                                                                            searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=13&term='+search+'&site='+site;

                                                                            requestJSON(searchurl, function(json) {

                                                                              findRank(myid, json, 13, function(i) {

                                                                                if (i === 0) {

                                                                                  $('#apirequestprogress').html('<p>Not in the Top 390</p>');

                                                                                  searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=14&term='+search+'&site='+site;

                                                                                  requestJSON(searchurl, function(json) {

                                                                                    findRank(myid, json, 14, function(i) {

                                                                                      if (i === 0) {

                                                                                        $('#apirequestprogress').html('<p>Not in the Top 420</p>');

                                                                                        searchurl = 'https://api.envato.com/v1/discovery/search/search/item?page=15&term='+search+'&site='+site;

                                                                                        requestJSON(searchurl, function(json) {

                                                                                          findRank(myid, json, 15, function(i) {

                                                                                            if (i === 0) {

                                                                                              $('#apirequestprogress').html('<p>Not in the Top 450. Thats my Limit, Im giving up, sorry.....</p>');

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

        $('#apidata').html('<h1>Your product is ranked number '+rank+'</h1>');

        $('#apipage').html('<h2>Page '+page+'</h2>');

        $('#apirequestprogress').html('<p>Done.</p>');

        $("#track-button").show();

        i = 1;

      }

    }

    callback.call(null, i);

  }

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


  var trackButton = jQuery('#track-button');

  trackButton.on('click', function () {

    trackButton.attr('disabled', 'disabled').text('Adding Search...');

      socket.emit('trackSearch', {

        itemId: myid,
        searchTerm: search,
        site: site,
        searchPosition: rank

      })

    trackButton.removeAttr('disabled').text('Search Tracked');

  });

});

// socket on connect

socket.on('connect', function () {

  $('#ui-id-4').on('click', function(){

    socket.emit('trackedsearchs', function (items) {

      var numItems = items.length;

      var html = '<h2>Tracked Searches</h2>';

      for(var f=0; f<numItems; f++) {

        var chartbox = 'chart'+f;

        var id = items[f].itemId;

        var term = items[f].searchTerm;

        var site = items[f].site;

        var startRank = items[f].searchPosition;

        html = html+

          '<div class="row tracked-search">'+

            '<div class="col-md-4">'+

              '<p>Item ID: '+id+'</p>'+

              '<p>Search Term: '+term+'</p>'+

              '<p>Site: '+site+'</p>'+

              '<h3>Starting Rank: '+startRank+'</h3>'+

            '</div>'+

            '<div id="'+chartbox+'" class="ct-chart col-md-8">'+

            '</div>'+

          '</div>'

      }

      $('#tracked-searchs').html(html);

      for(var f=0; f<numItems; f++) {

        var chartbox = '#chart'+f;

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
