let Router = require('express').Router;
let apiRouter = Router()
let helpers = require('../config/helpers.js')
let User = require('../db/schema.js').User
let Card = require('../db/schema.js').Card
let MsgModel = require('../db/schema.js').MsgModel
//  Mongooooooose find method syntax
// User.find({ username: {$regex : "^" + req.params.username}})

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

apiRouter.delete('/cards/:_id',function(req,res){
      //req.params contains the variables that were in the route pattern,
      //expressed in the form: [route placeholder]: [value sent]
      let theId = req.params._id
      console.log(req.body)
      Card.remove({_id:theId},function(err) {
        if (err) {
          res.json({
            error: err
          })
        }
        else {
          res.status(200).json({
            msg: 'record successfully deleted!'
          })
        }
      })
    })

apiRouter.post('/cards', function(req, res){
         let card = new Card(req.body) //create new instance of schema
       //req.body is all the information we gathered from the client side
         card.save(function(err){ //handling errors
            if(err){
              res.send(err)
            } else {
              res.json(card)
            }
         })
      })

      // '/cards?cardLocation=Spring&cardOwner=123&cardName={$regex : "^" + req.params.username}'
  apiRouter.get('/cards', function(req, res){
        if (req.query.cardName) req.query.cardName = new RegExp(req.query.cardName,'gi')
        console.log("card get res", req.query)
        Card.find(req.query, function(err, rec){

        if(err){
          res.send(err)
        } else {
          res.json(rec)
        }
      })
      //some methods live directly on the model
    })


// ///////////////////////////////////////////////
// Messenger API Stuff
// ///////////////////////////////////////////////

apiRouter.post('/messages', function(req,res){
      let newRecord = new MsgModel(req.body)
      newRecord.save(function(err) {
        if (err) {
      res.status(404).send(err)
      }else {
      res.json(newRecord)
      }
      })
    })

apiRouter.delete('/messages/:_id',function(req,res){
      //req.params contains the variables that were in the route pattern,
      // expressed in the form: [route placeholder]: [value sent]
      let theId = req.params._id
      // console.log(req.body)
      MsgModel.remove({_id:theId},function(err) {
        if (err) {
          res.json({
            error: err
          })
        }
        else {
          res.status(200).json({
            msg: 'record successfully deleted!'
          })
        }
      })
})

apiRouter.get('/messages', function(req,res){
      //first argument gives the criteria (WHICH msgs do i want)
      if (req.user) { // if there is currently a logged-in user
        MsgModel.find({forEmail:req.user.email}, function(err,records) {
          if (err) {
            res.json({
              error: err
            })
          }
          else {
            res.json(records)
          }
        })
        }
        else {
          res.status(404).json({
            error: 'no one is logged in'
          })
        }
})




  //read all users
  apiRouter.get('/users',function(req,res){
    User.find({},function(err,records) {
      if (err) {
        res.send(err)
      }
      else {
        res.json(records)
      }
    })
  })


module.exports = apiRouter
