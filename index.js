// importt
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

// middleware
app.use(cors());
app.use(express.json());

// database connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gopne.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// api
async function run() {
  try {
    await client.connect();
    const collection = client.db("practice").collection("practiceCollection");

    // GET apiiii
    app.get("/users", async (req, res) => {
      const cursorrrr = await collection.find({}).toArray();
      res.json(cursorrrr);
    });
    app.get("/users/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const result = await collection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // PUT api
    app.put("/users/:id", async (req, res) => {
      const info = req.body;
      const filter = { _id: ObjectId(req.params.id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: info.name,
          email: info.email,
        },
      };
      const result = collection.updateOne(filter, updateDoc, options);
    });

    // POST api
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await collection.insertOne(newUser);
      res.json(result);
    });

    // DELETE api
    app.delete("/users/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const result = await collection.deleteOne(query);
      console.log(result);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server running");
  console.log("server running");
});
// listeningggg
app.listen(port, () => {
  console.log("listening portt number", port);
});
