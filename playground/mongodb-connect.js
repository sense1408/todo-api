const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
  return console.log('Unable to connect to Mongo Server');
  }
  console.log('Connected to MongoDb Server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text:'Something to do',
  //   completed: false
  // },(err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })



// db.collection('Users').insertOne({
//   name:'Vlad',
//   age: 25,
//   location:'Ukraine'
// }, (err, result) => {
//    if(err)
//    return console.log('Unable to insert user');
//
//    console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
//
// })
  client.close();
});
