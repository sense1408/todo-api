const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

 let id = '5c1fa3c24239d71d58ae06fc';
//
// if(!ObjectId.isValid(id)) {
//   console.log('Id not valid');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//    console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id)
// .then((todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }c
//   console.log('Todo By Id', todo);
// }).catch( (e) => console.log(e));

User.findById(id)
.then((user) => {
  if(!user){
    return console.log('User not found');
  }
  console.log(user);
}).catch(e => console.log(e));
