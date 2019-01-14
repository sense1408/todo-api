require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');
const {ObjectId} = require('mongodb');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const text = req.body.text;
    let todo = new Todo({
      text:text
    })
    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  })
  .catch(e => {
    res.status(400).send(e);
  })
})


app.get('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    if(!ObjectId.isValid(todoId)){
      res.status(404).send();
    }
    Todo.findById(todoId)
    .then((user) => {
      if(!user){
        res.status(404).send();
      }
      res.status(200).send(user);
    }).catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {

  let id = req.params.id;

  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
  .then((doc) => {
    if(!doc)
      return res.status(404).send();

    return res.status(200).send({doc});
  }).catch(e => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
  .then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    return res.status(200).send({todo:todo});

  }).catch((e) => {
    res.status(400).send(e);
  })

});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
