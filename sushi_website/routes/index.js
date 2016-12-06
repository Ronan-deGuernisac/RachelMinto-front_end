var express = require('express');
var path = require("path");
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/food_items.json");
var router = express.Router();

function getFoodItems() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    food_items: getFoodItems() 
  });
});

module.exports = router;