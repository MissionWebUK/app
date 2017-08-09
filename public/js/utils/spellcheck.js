
var spellCheck = function (json) {


/*
 *
 * Description Analysis & Spell Check
 *
 *
*/

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

  var l;

  // Dictionary Object

	var dictionary = new Typo("en_US", false, false, { dictionaryPath: "typo/dictionaries" });

  // Retrieve Description

  description = json.description;

  cleandescription = clean_up_desc(description);


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

}
