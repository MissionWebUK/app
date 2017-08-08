var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var seriesSchema = new Schema({

  searchPosition: {
    type: Number,
    required: true
  },
  createdDate: {
    type: Date
  }

});

var Search = mongoose.model('Search', {
  itemId: {
    type: Number,
    required: true,
    minlength: 1,
    trim: true
  },
  searchTerm: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  site: {
    type: String,
    minlength: 1,
    required: true
  },
  searchPosition: {
    type: Number
  },
  series: [seriesSchema]
});

module.exports = {Search};
