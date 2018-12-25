const express = require('express');
const bodyParser = require('body-parser');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');
const {ObjectId} = require('mongodb');

let app = express();

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

app.listen(3000, () => {
  console.log('Started on port 3000');
});


module.exports = {app};
