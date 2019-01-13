const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');


// Todo.remove({}).then((result) => {
//   console.log(result);
// });


//Todo.findOneAndRemove({})
//Todo.findByIdAndRemove()


Todo.findOneAndRemove({_id:"5c28f7cf09a40bd7abc42966"}).then((todo) => {
  console.log('Vasia Privet Blya')
});

Todo.findByIdAndRemove("5c28f7cf09a40bd7abc42966").then((todo) => {
 console.log(todo);
});
