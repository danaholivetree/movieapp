var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const knex = require('../knex')

router.get('/', function(req, res, next) {
  knex('director')
    .select()
    .then( (items) => {
      res.setHeader('Content-Type', 'application/json')
      res.sendStatus(200)
    })
    .catch( (err) => next(err) )
});

router.get('/:id', function(req, res, next) {
  let id = req.params.id
  knex('director')
    .select()
    .where('id', id)
    .then( (items) => {
      if (items.length < 1) {
        var err = new Error('Not Found');
        err.status =  404;
        throw err;
      }
      else {
        res.setHeader('Content-Type', 'application/json')
        res.sendStatus(200)
      }
    })
    .catch( (err) => next(err) )
});

router.post('/', function(req, res, next) {
  if (!req.body.name || !req.body.nationality) {
    var err = new Error('Bad Request');
    err.status = 400;
    throw(err);
  }
  else {
  knex('director')
    .insert(req.body)
    .then( (stuff) => {
      res.setHeader('Content-Type', 'application/json')
      res.sendStatus(200)
    })
    .catch( (err) => next(err) )
  }
});

router.patch('/:id', function(req, res, next) {
  let id =req.params.id
  knex('director')
    .select()
    .where('id', id)
    .then( (stuff) => {
      if (!stuff) {
        var err = new Error('Bad Request');
        err.status = 400;
        throw(err);
      }
      else {
        knex('director')
          .update(req.body)
          .where('id', id)
          .then( (items) => {
            res.setHeader('Content-Type', 'application/json')
            res.sendStatus(200)
          })
      }
    })
    .catch( (err) => next(err) )
});

router.delete('/:id', function(req, res, next) {
  let id = req.params.id
  knex('director')
    .select()
    .where('id', id)
    .first()
    .then( (items) => {
      if (!items) {
        var err = new Error('Bad Request');
        err.status = 400;
        throw(err);
      }
      knex('director')
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
