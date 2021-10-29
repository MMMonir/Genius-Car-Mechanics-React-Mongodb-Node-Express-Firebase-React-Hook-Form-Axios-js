const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e97ot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//For Database user connection
async function run() {
    try {
      await client.connect();
      const database = client.db("carMechanic");
      const servicesCollection = database.collection("services");
    // create a document to insert data from here start
    //   const doc = {
    //     name: "Monirul Islam 2",
    //     email: "monirecebd@gmail",
    //     occupation: "Freelancer"
    //   }
    //   const result = await usersCollection.insertOne(doc);
    //   console.log(`A document was inserted with the _id: ${result.insertedId}`);
    // create a document to insert data from here End

      //POST API: Sending data from React UI to Mongodb Start
      app.post('/services', async(req, res) => {
        const service = req.body;
        const result = await servicesCollection.insertOne(service);
        // console.log('Got new user', req.body);
        // console.log('added user', result)
        console.log('Hit the post API', service);
        res.json(result);
      });
      //POST API: Sending data from React UI to Mongodb End


      //GET API: from Mongodb to React website Start
      app.get('/services', async(req, res) => {
        const  cursor = servicesCollection.find({});
        const services = await cursor.toArray();
        res.send(services)
      });
      //GET API: from Mongodb to React website End

      //Details API: Get Details from user id from Backend Start
      app.get('/services/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await servicesCollection.findOne(query);
        res.send(service);
        console.log('Load user with id: ', id);
      });
      //Details API: Get Details from user id from Backend End

      //UPDATE API: from Mongodb by React website Start
    //   app.put('/users/:id', async(req, res) => {
    //     const id = req.params.id;
    //     const updatedUser = req.body;
    //     const filter = { _id: ObjectId(id) };
    //     const options = {upsert: true};
    //     const updateDoc = {
    //       $set: {
    //         name: updatedUser.name,
    //         email: updatedUser.email
    //       }
    //     };
    //     const result = await usersCollection.updateOne(filter, updateDoc, options)
    //     console.log('Updating user', req);
    //     res.json(result);
    //   });
      //UPDATE API: from Mongodb by React website End

      //DELETE API: From React website Start
      // Import in the top : const ObjectId = require('mongodb').ObjectId;
    //   app.delete('/users/:id', async(req, res) => {
    //     const id = req.params.id;
    //     const query = { _id: ObjectId(id) };
    //     const result = await usersCollection.deleteOne(query);
    //     console.log('Deleting user with id', result);
    //     res.json(result);
    //   });
      // DELETE API: From React website End

    }
    finally {
      // await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my server')
});
app.listen(port, () =>{
    console.log('Running server on port', port)
});