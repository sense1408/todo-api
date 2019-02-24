const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/Todo');
const {User} = require('./../../models/User');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
   _id: userOneId,
   email: 'andrew@example.com',
   password: 'userOnePass',
   tokens: [{
     access:'auth',
     token: jwt.sign({
       _id:userOneId, access: 'auth'
     }, 'abc123').toString()
   }]
}, {
  _id:userTwoId,
  email:'jen@example.com',
  password:'userTwoPass'
}];

const todos = [{
  _id: new ObjectID(),
  text:'First todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text:'Second todo',
  completedAt:333,
  completed:true,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
      Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
    .then(()=> done());
  });
};


module.exports = {todos, populateTodos, users, populateUsers};
