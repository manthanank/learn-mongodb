# Learn MongoDB

[![NPM Package](https://github.com/manthanank/learn-mongodb/actions/workflows/publish.yml/badge.svg)](https://github.com/manthanank/learn-mongodb/actions/workflows/publish.yml)
[![Releases](https://github.com/manthanank/learn-mongodb/actions/workflows/releases.yml/badge.svg)](https://github.com/manthanank/learn-mongodb/actions/workflows/releases.yml)
[![Npm Package total downloads](https://badgen.net/npm/dt/learn-mongodb)](https://npmjs.com/package/learn-mongodb)
[![Npm Package weekly downloads](https://badgen.net/npm/dw/learn-mongodb)](https://npmjs.com/package/learn-mongodb)

This Repositry provides a comprehensive guide to help you get started with MongoDB, a popular NoSQL database. MongoDB is known for its flexibility, scalability, and ease of use, making it a preferred choice for many developers and organizations.

## Introduction to MongoDB

MongoDB is a document-oriented NoSQL database, designed to store, query, and process large amounts of unstructured or semi-structured data. It uses a flexible, JSON-like document format called BSON (Binary JSON) to represent data.

Key features of MongoDB:

- **Schema-less**: No predefined schema, allowing flexibility in data structure.
- **High Performance**: Supports indexing, sharding, and efficient query execution.
- **Horizontal Scalability**: Easily scales horizontally by adding more servers to the database.

## Installation

Follow the [official MongoDB installation guide](https://docs.mongodb.com/manual/installation/) to set up MongoDB on your system.

## Basic Concepts

- **Collections**: Equivalent to tables in relational databases, collections store documents.
- **Documents**: BSON data format records that store data in key-value pairs.
- **Fields**: Key-value pairs within a document.
- **Indexes**: Improve query performance by providing a quick access path to the data.

## CRUD Operations

### Insert documents

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

### Query documents

```javascript
// Find all documents in the users collection
db.users.find();

// Find a document by a specific field value
db.users.findOne({ name: "John Doe" });
```

### Update documents

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

### Delete documents

```javascript
// Delete a single document
db.users.deleteOne({ name: "Bob Smith" });

// Delete multiple documents
db.users.deleteMany({ age: { $gte: 30 } });
```

## Connect & Check version

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

## Indexing

Indexing is crucial for optimizing MongoDB queries. It helps in improving the speed of data retrieval operations. Ensure to create indexes based on the queries you frequently execute.

## Connecting to Node.js

To connect your Node.js application to MongoDB using Mongoose, follow these steps:

1. Install Mongoose using npm:

   ```bash
   npm install mongoose
   ```

2. In your Node.js code (e.g., `app.js`), set up the connection to MongoDB:

   ```javascript
   const mongoose = require('mongoose');

   const dbUser = 'your_db_user';
   const dbPassword = 'your_db_password';

   mongoose
      .connect(
         `mongodb+srv://${dbUser}:${dbPassword}@cluster0.re3ha3x.mongodb.net/learn-mongodb`,
         { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => {
         console.log("Connected to MongoDB database!");
      })
      .catch((error) => {
         console.error("Connection failed!", error);
      });
   ```

Replace `your_db_user` and `your_db_password` with your MongoDB Atlas database username and password. Ensure that you have the necessary permissions for connecting to the cluster.

Make sure to include the error handling to log any connection issues for better debugging.

This setup assumes you are using MongoDB Atlas, the cloud-based MongoDB service. Adjust the connection string accordingly if you are using a different MongoDB deployment.

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

### **MongoDB Atlas:**

Discover MongoDB Atlas, the cloud-based database service, and learn how to deploy, manage, and scale MongoDB clusters.

## Contributing

If you find any issues or have suggestions for improvement, feel free to contribute. Follow the [contribution guidelines](CONTRIBUTING.md) for details.

## License

This MongoDB tutorial is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this tutorial for educational purposes.
