const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
  return console.log('Unable to connect to Mongo Server');
  }
  console.log('Connected to MongoDb Server');
  const db = client.db('TodoApp');

    db.collection('Users').findOneAndDelete({_id:ObjectID("5c1eb01b2cdc9d31f47ef39a")}).then(result => {
      console.log(result);
    });

  //deleteOne
  // db.collection('Todos').deleteOne({text:'Eat lunch'})
  // .then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed:false})
  .then(result => {
    console.log(result);
  })
  //client.close();
});
