const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
  return console.log('Unable to connect to Mongo Server');
  }
  console.log('Connected to MongoDb Server');
  const db = client.db('TodoApp');

  //findOneAndUpdate

    db.collection('Users').findOneAndUpdate({
    name:'Jen'
  }, {
    $set:{
      name: 'Vlad'
    },
    $inc:{
      age: 1
    }
  },
  {
    returnOriginal:false
  }
).then(result => {
    console.log(result);
  })


  //client.close();
});
