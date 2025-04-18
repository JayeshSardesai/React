const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb');

app.use(cors())
app.use(bodyparser.json())
dotenv.config()
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passOp';
client.connect()
const port = 3000
app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection("Passwords")
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
//Save password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection("Passwords")
    const findResult = await collection.insertOne(password);
    res.send({ success: true })
})
//Delete password
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection("Passwords")
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})