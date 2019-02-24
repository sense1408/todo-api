require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');
const {ObjectId} = require('mongodb');
const {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    const text = req.body.text;
    let todo = new Todo({
      text:text,
      _creator:req.user._id
    })
    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});


app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator:req.user._id
  }).then((todos) => {
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


app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email','password']);
  let user = new User(body);



  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });

});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email','password']);

    User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
      res.send(user);
    }).catch((e) => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
