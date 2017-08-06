
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

  var description;

  var cleandescription;

  var descwords;

  var descchars;

  var wordcounthtml;

  var charcounthtml;

  var u;

  var word;

  var is_spelled_correctly;

  var deschtml;

  var tag;

  var tags;

  var numtags;

  var tagshtml;

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

  // Dictionary Object

	var dictionary = new Typo("en_US", false, false, { dictionaryPath: "typo/dictionaries" });

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

    handleID(userid, url);

    // Set the Search URL for the product

    searchurl = 'https://api.envato.com/v3/market/catalog/item?id='+myid;

    // Access the API and return the product details

    requestJSON(searchurl, function(json) {

      // Log response to console for debugging

      // console.log(json);

      // Display Site Name

      $('#sitename').html('<h2>'+site+'</h2>');

      /*
       *
       * Description Analysis & Spell Check
       *
       *
      */

      // Retrieve Description

			description = json.description;

      cleandescription = clean_up_desc(description);

      console.log(cleandescription);

      // Split Clean Description into Array of Words

      descwords = cleandescription.split(" ");

      // Display Word Count

			wordcounthtml = '<h3>Word Count: '+descwords.length+'</h3>';

      $('#desccount').html(wordcounthtml);

      // Split Clean Description into Array of Characters

      descchars = cleandescription.split("");

      // Display Character Count

			charcounthtml = '<h4>Character Count: '+descchars.length+'</h4>';

			$('#charcount').html(charcounthtml);

 			// Check Spelling of all words in the array

      deschtml = '<h2>Description</h2>';

			for (u=0; u<descwords.length; u++) {

				word = descwords[u];

				// Check that array item is not empty

				if (word){

					// Check word is spelled correctly

					is_spelled_correctly = dictionary.check(word);

					// If it isn't add a span tag

					if(is_spelled_correctly === false) {

						deschtml = deschtml+

											 '<span>'+word+' </span>';

					} else {

						deschtml = deschtml+word+' ';

					}

				}

			}

      // Display description

			$('#description').html(deschtml);

      /*
			 *
			 *	Tag Analysis & Spell Check
			 *
			*/

      // Retrieve Tags

      tags = json.tags;

      // Determine number of tags

      numtags = tags.length;

      // Add Title to output html

			tagshtml = '<h2>Tag Analysis</h2>';

      var l;

      // Dtermine if tags are spelled correctly and build html

      for(l=0; l<numtags; l++) {

				tag = tags[l];

    		is_spelled_correctly = dictionary.check(tag);

				if(is_spelled_correctly === false) {

					tagshtml = tagshtml+

										 '<div class="spfalse col-sm-1">'+

										 '<p>'+tag+'</p>'+

										 '</div>';

				} else {

					tagshtml = tagshtml+

										 '<div class="sptrue col-sm-1">'+

										 '<p>'+tag+'</p>'+

										 '</div>';

				}

			}

      // Display Tags

			$('#apitags').html(tagshtml);

    });

    /*
     *
     * Find the Search Ranking of the Product
     * Display Information Related to the Search
     *
     *
    */

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

  function handleID(userid, url) {

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

  function clean_up_desc(str) {

    if ((str===null) || (str==='')) {

      return false;

    } else {

      str = str.toString();

      str = str.replace(/<[^>]*>/g, '');

      str = str.replace(/[^a-zA-Z ]/g, '');

      return str.replace(/\s+/g, ' ');

    }

  }

  var socket = io();

  var trackButton = jQuery('#track-button');

  trackButton.on('click', function () {

      socket.emit('trackSearch', {

        itemId: myid,
        searchTerm: search,
        site: site,
        searchPosition: rank

      })

  });

});
