const mongoose = require('mongoose');

const searchedSchema = new mongoose.Schema({
  word: { type: String, required: true },
  searchedCount: { type: Number, required: true },
});

const Searched = mongoose.model('Searched', searchedSchema);

module.exports = Searched;
