let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')
let User = require('../db/schema.js').User
let Card = require('../db/schema.js').Card


  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err)
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err)
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err)
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })
    })

    // Routes for a Model(resource) should have this structure

    apiRouter.delete('/cards/:_id',function(request,response){
      //request.params contains the variables that were in the route pattern, expressed in the form
      // [route placeholder]: [value sent]
      let theId = request.params._id
      // console.log(request.body)
      Card.remove({_id:theId},function(err) {
        if (err) {
          response.json({
            error: err
          })
        }
        else {
          response.status(200).json({
            msg: 'record successfully deleted!'
          })
        }
      })
    })

    apiRouter.post('/cards', function(request, response){
         let card = new Card(request.body) //create new instance of schema
       //request.body is all the information we gathered from the client side
         card.save(function(err){ //handling errors
            if(err){
              response.send(err)
            } else {
              response.json(card)
            }
         })
      })
      apiRouter.get('/cards', function(request, response){
      Card.find(request.query, function(err, rec){
      if(err){
        response.send(err)
      } else {
        response.json(rec)
      }
    })
    //some methods live directly on the model
  })

module.exports = apiRouter
