require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

// 🔗 MongoDB connection URI
const uri = process.env.MONGO_URI;

let client;
let todosCollection;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db("todoDB");
    todosCollection = db.collection("todos");
  }
  return todosCollection;
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();

    const { method, query } = req;
    const { id } = query;

    if (!id) {
      return res.status(400).json({ error: "Todo ID is required" });
    }

    switch (method) {
      case 'PUT':
        // Update todo
        const { task, status } = req.body;
        const updateResult = await todosCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { task, status } },
          { returnDocument: "after" }
        );

        if (!updateResult) {
          return res.status(404).json({ error: "Todo not found" });
        }

        res.json(updateResult);
        break;

      case 'DELETE':
        // Delete todo
        const deleteResult = await todosCollection.findOneAndDelete({
          _id: new ObjectId(id),
        });

        if (!deleteResult) {
          return res.status(404).json({ error: "Todo not found" });
        }

        res.json(deleteResult);
        break;

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database operation failed" });
  }
};