const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


//use middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.85z9afh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//require('crypto').randomBytes(64).toString('hex')


async function run() {
    try {
        await client.connect();
        const usersCollection = client.db("user-data").collection("users");
        // const orderCollection = client.db('jewelry-store').collection('orders');


        app.get("/users", async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });


        // app.get('/products/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await productsCollection.findOne(query);
        //     res.send(result);
        // });


        app.post("/users", async (req, res) => {
            const doc = req.body;
            const result = await usersCollection.insertOne(doc);
            res.send(result);
        });

        // app.get("/orders", async (req, res) => {
        //     const query = {};
        //     const cursor = orderCollection.find(query);
        //     const result = await cursor.toArray();
        //     res.send(result);
        // });
    }
    finally { }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running My Users Data Server');
});
app.listen(port, () => {
    console.log('Users Data Server is running on port :', port)
})