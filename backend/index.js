var express = require('express')
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID

var db;
var app = express()

app.get('/users', function(request, response) {
  db.collection('users').find().toArray(function(error, result) {
    if (error) {
      response.status(500).send({})
    } else {
      response.send(result)
    }
  })
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/users', function(request, response) {
  response.send(request.body);
  db.collection('users').insertOne({
    "userName": request.body.userName,
    "password": request.body.password
  })
});

app.get('/lists', function(request, response) {
  db.collection('lists').find().toArray(function(error, result) {
    if (error) {
      response.status(500).send({})
    } else {
      response.send(result)
    }
  })
});


// För att hämta en specifik user:s listor
app.get('/lists/:user', function(request, response) {
  db.collection('lists').find({"user": request.params.user}).toArray(function(error, result) {
    if (error) {
      response.status(500).send({})
    } else {
      response.send(result)
    }
  })
});

app.get('/lists/:user/:id', function(request, response) {
  db.collection('lists').find({ "user": request.params.user, _id: new ObjectID(request.params.id) }).toArray(function(error, result) {
    if (error) {
      response.status(500).send({})
    } else {
      response.send(result)
    }
  })
});

app.post('/lists/:user', function(request, response) {
  response.send(request.body);
  db.collection('lists').insert({
    "listName": request.body.listName,
    "user": request.params.user,
    "objects": [ ]
  })
});

// Add items to the list
app.put('/lists/:user/:id/', function(request, response) {
  response.send(request.body)
  db.collection('lists').update(
    { _id: new ObjectID(request.params.id) },
    { $push: { objects: { item: request.body.objects[0].item, "done": request.body.objects[0].done }
    }
  })
})


// Uppdatera ett item's status. Varför funkar det bara då det finns ett objeckt i listan?
app.put('/lists/:user/:id/change', function(request, response) {
  db.collection('lists').findOneAndUpdate(
  { _id: new ObjectID(request.params.id)},
  { $set: { objects: request.body.objects} },
  { multi: true }
  )
  response.send(request.body)
})



// Delete list
app.delete('/lists/:user/:id', function(request, response) {
  db.collection('lists').remove({ "user": request.params.user, _id: new ObjectID(request.params.id) })
});

app.listen(3000, function() {
  console.log('The webserver is running............')
});

MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) {
    console.error('Failed to connect to the database!');
    console.log(error);
  } else {
    console.log('Successfully connected to the database!');
    db = client.db('Organizer');
  }
});
