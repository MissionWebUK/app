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

var Category = mongoose.model('Category', {
  itemId: {
    type: Number,
    required: true,
    minlength: 1,
    trim: true
  },
  category: {
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
  sort: {
    type: String,
    minlength: 1,
    required: true
  },
  series: [seriesSchema]
});

module.exports = {Category};
