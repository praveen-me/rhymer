const Searched = require('../models/Searched');

module.exports = {
  addSearched: (req, res) => {
    const { word } = req.query;
    Searched.findOne({ word }, (err, searchedData) => {
      if (err) throw err;
      if (searchedData) {
        searchedData.searchedCount += 1;
        searchedData.save(); 
        return res.json({
          msg: "Updated"
        })
      } else {
        const newSearched = new Searched({
          word,
          searchedCount: 1
        });
        newSearched.save();
        return res.json({
          msg: "Saved"
        })
      }
    });
  },
  getTopSearches: (req, res) => {
    Searched.find({}, (err, searches) => {
      searches.sort((a, b) =>  a.searchedCount < b.searchedCount);
      if (searches.length >= 10) {
        return res.json({
          topSearched: searches.map(search => search.word).slice(0, 10),
        })
      } else {
        res.json({
          topSearched: searches.map(search => search.word),
        })
      }
    })
  }
};
