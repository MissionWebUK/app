

var clean_up_desc = function (str) {

  if ((str===null) || (str==='')) {

    return false;

  } else {

    str = str.toString();

    str = str.replace(/<[^>]*>/g, '');

    str = str.replace(/[^a-zA-Z ]/g, '');

    return str.replace(/\s+/g, ' ');

  }

}
