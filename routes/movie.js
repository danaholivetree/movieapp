var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('movie')
    .select()
    .then( (items) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(items))
    })
    .catch( (err) => next(err) )
});

module.exports = router;
