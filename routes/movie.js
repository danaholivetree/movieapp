var express = require('express');
var router = express.Router();
const knex = require('../knex')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('movie')
    .select()
    .then( (items) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(items))
      // res.render('index')
    })
    .catch( (err) => next(err) )
});

router.get('/:id', function(req, res, next) {
  let id = req.params.id
  knex('movie')
    .select()
    .where('id', id)
    .then( (items) => {
      console.log('items ', items)
      if (items.length < 1) {
        var err = new Error('Bad Request');
        err.status = 400;
        throw err;
      }
      else {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(items[0]))
      }
    })
    .catch( (err) => next(err) )
});

router.post('/', function(req, res, next) {
  if (!req.body.title || !req.body.year || !req.body.director) {
    var err = new Error('Bad Request');
    err.status = 400;
    throw(err);
  }
  knex('movie')
    .insert(req.body, 'id')
    .then( (id) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(id))
      // res.render('index')
    })
    .catch( (err) => next(err) )
});

router.patch('/:id', function(req, res, next) {
  if (!req.body.title || !req.body.year || !req.body.director || !req.params.id) {
    var err = new Error('Bad Request');
    err.status = 400;
    throw(err);
  }
  let id = req.params.id

  knex('movie')
    .select()
    .where('id', id)
    .then( (stuff) => {

      if (!stuff) {
        var err = new Error('Not Found');
        err.status = 404;
        throw(err);
      }
      else {
      knex('movie')
        .update(req.body)
        .where('id', id)
        .then( (items) => {
          res.setHeader('Content-Type', 'application/json')
          res.json(items)
          // res.render('index')
        })

        .catch( (err) => next(err) )
      }
    });
  })

router.delete('/:id', function(req, res, next) {
  let id = req.params.id
  console.log(req.body)
  knex('movie')
    .select()
    .where('id', id)
    .first()
    .then( (items) => {
      if (!items) {
        var err = new Error('Bad Request');
        err.status = 400;
        throw(err);
      }
      knex('movie')
        .del()
        .where('id', id)
        .then( (items) => {
          res.setHeader('Content-Type', 'application/json')
          res.send(JSON.stringify(items))
        })

      // res.render('index')
    })
    .catch( (err) => next(err) )
  });
module.exports = router;
