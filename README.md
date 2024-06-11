# Learn MongoDB

This repository provides a comprehensive guide to help you get started with MongoDB, a popular NoSQL database. MongoDB is known for its flexibility, scalability, and ease of use, making it a preferred choice for many developers and organizations.

[![NPM Package](https://github.com/manthanank/learn-mongodb/actions/workflows/publish.yml/badge.svg)](https://github.com/manthanank/learn-mongodb/actions/workflows/publish.yml)
[![Releases](https://github.com/manthanank/learn-mongodb/actions/workflows/releases.yml/badge.svg)](https://github.com/manthanank/learn-mongodb/actions/workflows/releases.yml)
[![Npm Package total downloads](https://badgen.net/npm/dt/learn-mongodb)](https://npmjs.com/package/learn-mongodb)
[![Npm Package weekly downloads](https://badgen.net/npm/dw/learn-mongodb)](https://npmjs.com/package/learn-mongodb)
[![Npm Package monthly downloads](https://badgen.net/npm/dm/learn-mongodb)](https://npmjs.com/package/learn-mongodb)
[![Npm Package yearly downloads](https://badgen.net/npm/dy/learn-mongodb)](https://npmjs.com/package/learn-mongodb)

## Introduction to MongoDB

MongoDB is a document-oriented NoSQL database, designed to store, query, and process large amounts of unstructured or semi-structured data. It uses a flexible, JSON-like document format called BSON (Binary JSON) to represent data.

### Key Features of MongoDB

- **Schema-less**: MongoDB does not require a predefined schema, allowing you to store data in a flexible manner.
- **High Performance**: MongoDB provides high-speed read and write operations due to its efficient indexing and storage mechanisms.
- **Scalability**: MongoDB supports horizontal scaling through sharding, enabling you to distribute data across multiple servers.

### Use Cases of MongoDB

- **Content Management**: MongoDB is suitable for managing content-heavy applications like blogs, news sites, and e-commerce platforms.
- **Real-time Analytics**: MongoDB can handle real-time data processing and analytics for applications that require quick insights.
- **Internet of Things (IoT)**: MongoDB is used in IoT applications to store and process sensor data from connected devices.

## Getting Started

To start using MongoDB, you need to install the MongoDB server on your local machine or use a cloud-based MongoDB service like MongoDB Atlas.

## Installation

Follow the [official MongoDB installation guide](https://docs.mongodb.com/manual/installation/) to set up MongoDB on your system.

## Basic Concepts

- **Collections**: Equivalent to tables in relational databases, collections store documents.
- **Documents**: BSON data format records that store data in key-value pairs.
- **Fields**: Key-value pairs within a document.
- **Indexes**: Improve query performance by providing a quick access path to the data.

## MongoDB Shell

MongoDB provides a command-line interface called the MongoDB shell to interact with the database. You can perform CRUD operations, create indexes, and run queries using the shell.

### Basic Commands

- **`show dbs`**: List all databases.
- **`use dbName`**: Switch to a specific database.
- **`show collections`**: List all collections in the current database.
- **`db.collection.find()`**: Retrieve all documents from a collection.
- **`db.collection.insertOne({ field: value })`**: Insert a document into a collection.

## Data Modeling

MongoDB uses a flexible data model that allows you to represent complex hierarchical relationships easily. You can embed documents within documents or reference other documents using references.

### Embedded Data Model

```json
{
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Cityville",
    "state": "CA",
    "zipCode": "12345"
  }
}
```

### Referenced Data Model

```json
{
  "name": "John Doe",
  "age": 30,
  "addressId": ObjectId("60a7b7b7e4b0c5f7c7b1e3a1")
}
```

## Indexing

Indexes in MongoDB improve query performance by allowing the database to quickly locate and retrieve data. You can create indexes on single fields, compound fields, or text fields.

### Creating an Index

```javascript
db.users.createIndex({ name: 1 });
```

### Compound Index

```javascript
db.users.createIndex({ name: 1, age: -1 });
```

### Text Index

```javascript
db.articles.createIndex({ content: "text" });
```

## Connecting to MongoDB

To connect to MongoDB from your application, you can use the MongoDB Node.js driver or an Object Data Modeling (ODM) library like Mongoose.

### Using the MongoDB Node.js Driver

```javascript
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Connection failed!", error);
  }
}

connectToMongoDB();
```

### Using Mongoose

```javascript
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });
```

## CRUD Operations

### Insert documents into a collection

```javascript
// Insert a single document
db.users.insertOne({
  name: "John Doe",
  age: 25,
  email: "john@example.com"
});

// Insert multiple documents
db.users.insertMany([
  { name: "Jane Doe", age: 30, email: "jane@example.com" },
  { name: "Bob Smith", age: 22, email: "bob@example.com" }
]);
```

### Query documents from a collection

```javascript
// Find all documents in the users collection
db.users.find();

// Find a document by a specific field value
db.users.findOne({ name: "John Doe" });
```

### Update documents in a collection

```javascript
// Update a single document
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 26 } }
);

// Update multiple documents
db.users.updateMany(
  { age: { $lt: 30 } },
  { $inc: { age: 1 } }
);

// Replace a single document
db.users.replaceOne(
  { name: "John Doe" },
  { name: "John Doe", age: 26, updated_at: new Date() }
);
```

### Delete documents from a collection

```javascript
// Delete a single document
db.users.deleteOne({ name: "Bob Smith" });

// Delete multiple documents
db.users.deleteMany({ age: { $gte: 30 } });
```

## Connect & Check version of MongoDB

```bash
mongo --nodb
db.version()
```

## Create a Database

```bash
use mydatabase
```

## Create a Collection

```bash
db.createCollection('users')
```

## Insert a Document

```bash
db.users.insertOne({
  name: "John Doe",
  age: 25,
  email: "
})
```

## Query Documents

```bash
db.users.find()
```

## Update a Document

```bash
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 26 } }
)
```

## Delete a Document

```bash
db.users.deleteOne({ name: "Bob Smith" })
```

To interact with MongoDB, you can use the following commands in your terminal:

```bash
# Access the MongoDB shell
mongo

# Alternatively, you can use the MongoDB shell with improved features
mongosh

# Start the MongoDB server
mongod
```

## Data Models

MongoDB uses flexible, schema-less documents to store data. Documents in a collection can have different fields, and data doesn't need to be uniform.

## Sample POST Request Body

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 25,
    "gender": "Male",
    "dateOfBirth": "1997-01-15",
    "address": {
        "street": "123 Main St",
        "city": "Cityville",
        "state": "CA",
        "zipCode": "12345"
    },
    "phoneNumber": "123-456-7890",
    "isActive": true
}
```

## Database Commands

View all databases

```bash
show dbs
```

Create a new or switch databases

```bash
use dbName
```

View current Database

```bash
db
```

Delete Database

```bash
db.dropDatabase()
```

### **Collection Commands**

Show Collections

```bash
show collections
```

Create a collection named 'comments’

```bash
db.createCollection('data')
```

Drop a collection named 'comments’

```bash
db.comments.drop()
```

### **Row(Document) Commands**

Show all Rows in a Collection

```bash
db.comments.find()
```

Show all Rows in a Collection (Prettified)

```bash
db.comments.find().pretty()
```

Find the first row matching the object

```bash
db.comments.findOne({name: 'Manthan'})
```

Insert One Row

```bash
db.comments.insert({
    'firstName': 'Manthan',
    'lastName': 'Ank'
 })
```

Insert many Rows

```bash
db.comments.insertMany([{'firstName': 'Manthan', 'lastName': 'Ank'},{'firstName': 'Gagan','lastName': 'BA'}])
```

Search in a MongoDB Database

```bash
db.comments.find({lang:'JavaScript'})
```

Limit the number of rows in output

```bash
db.comments.find().limit(3)
```

Count the number of rows in the output

```bash
db.comments.find().count()
```

Update a row

```bash
db.comments.updateOne({name: 'Manthan'},{$set: {'name': 'Manthan','lang': 'JavaScript','mem_since': 1}},{upsert: true})
```

MongoDB Increment Operator

```bash
db.comments.update({name: 'Manthan'},{$inc:{mem_since: 2}})
```

MongoDB Rename Operator

```bash
db.comments.update({name: 'Manthan'},{$rename:{mem_since: 'member'}})
```

Delete Row

```bash
db.comments.remove({name: 'Manthan'})
```

Less than/Greater than/ Less than or Eq/Greater than or Eq

```bash
db.comments.find({member_since: {$lt: 90}})

```

```bash
db.comments.find({member_since: {$lte: 90}})
```

```bash
db.comments.find({member_since: {$gt: 90}})
```

```bash
db.comments.find({member_since: {$gte: 90}})
```

Here are a few suggestions and additions to enhance the guide:

### **Aggregation Framework:**

MongoDB's Aggregation Framework is a powerful tool for data transformation and analysis. You can include examples of aggregation pipeline stages like `$match`, `$group`, `$project`, and others.

```bash
db.collection.aggregate([
   { $match: { field: value } },
   { $group: { _id: "$field", count: { $sum: 1 } } },
   { $project: { _id: 0, field: "$_id", count: 1 } }
])
```

### **Text Search:**

MongoDB supports full-text search capabilities. You can demonstrate how to perform text searches on a text index.

```bash
db.collection.createIndex({ fieldName: "text" })
db.collection.find({ $text: { $search: "searchQuery" } })
```

### **Geospatial Queries:**

MongoDB has built-in support for geospatial queries. You can showcase how to query documents based on their geographical location.

```bash
db.collection.createIndex({ locationField: "2dsphere" })
db.collection.find({
   locationField: {
      $near: {
         $geometry: { type: "Point", coordinates: [longitude, latitude] },
         $maxDistance: 1000  // in meters
      }
   }
})
```

### **Transactions:**

If you are using MongoDB version 4.0 or above, you can include examples of transactions for handling multiple operations atomically.

```bash
session = db.getMongo().startSession()
session.startTransaction()
try {
   // Perform multiple operations
   db.collection1.updateOne({ field: value1 }, { $set: { updateField1: newValue1 } })
   db.collection2.updateOne({ field: value2 }, { $set: { updateField2: newValue2 } })
   session.commitTransaction()
} catch (error) {
   print("Transaction failed. Aborting...")
   session.abortTransaction()
}
finally {
   session.endSession()
}
```

### **Data Validation:**

MongoDB 3.6 and later versions support JSON Schema validation. You can provide examples of how to enforce a schema on a collection.

```bash
db.createCollection("validatedCollection", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["field1", "field2"],
         properties: {
            field1: { bsonType: "string" },
            field2: { bsonType: "int" }
         }
      }
   }
})
```

### **Security:**

Briefly touch upon MongoDB security practices, such as authentication, authorization, and connection security.

```bash
# Creating a user with readWrite privileges
use admin
db.createUser({
   user: "username",
   pwd: "password",
   roles: [{ role: "readWrite", db: "databaseName" }]
})
```

### **Backup and Restore:**

Explain how to perform backups and restores using `mongodump` and `mongorestore` utilities.

```bash
# Backup a database
mongodump --db databaseName --out /path/to/backup

# Restore a database
mongorestore --db databaseName /path/to/backup/databaseName
```

### **MongoDB Atlas:**

Discover MongoDB Atlas, the cloud-based database service, and learn how to deploy, manage, and scale MongoDB clusters.

## Contributing

If you find any issues or have suggestions for improvement, feel free to contribute. Follow the [contribution guidelines](CONTRIBUTING.md) for details.

## Acknowledgements

- [MongoDB Documentation](https://docs.mongodb.com/)

## Conclusion

MongoDB is a powerful NoSQL database that offers flexibility, scalability, and performance for modern applications. By understanding the basic concepts, data modeling, indexing, and CRUD operations, you can leverage MongoDB effectively in your projects.

## References

- [MongoDB Documentation](https://docs.mongodb.com/)

## License

This repository is licensed under the [MIT License](LICENSE).

## Connect with me

- [Twitter](https://twitter.com/manthan_ank)
- [LinkedIn](https://www.linkedin.com/in/manthanank)
- [Facebook](https://www.facebook.com/manthanank/)
- [Instagram](https://www.instagram.com/manthan_ank/)
- [YouTube](https://www.youtube.com/@manthanank)
- [GitHub](https://github.com/manthanank)

## Support

If you like this learning repository and find it useful, consider buying me a coffee or sponsoring me through the GitHub Sponsor. Your support will help me to continue and bring more exciting projects. Thank you!

[![Buy Me A Coffee](/assets/bmc-button.svg)](https://www.buymeacoffee.com/manthanank)

[![Sponsor Me](https://img.shields.io/badge/Sponsor-GitHub-green)]([https://](https://github.com/sponsors/manthanank))

---

Show your support by 🌟 the repository.
