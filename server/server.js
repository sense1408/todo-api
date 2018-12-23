const express = require('express');
const bodyParser = require('body-parser');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');


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


app.listen(3000, () => {
  console.log('Started on port 3000');
});
