# Learn MongoDB

This repository provides a comprehensive guide to help you get started with MongoDB, a popular NoSQL database. MongoDB is known for its flexibility, scalability, and ease of use, making it a preferred choice for many developers and organizations.

[![NPM Package](https://github.com/manthanank/learn-mongodb/actions/workflows/publish.yml/badge.svg)](https://github.com/manthanank/learn-mongodb/actions/workflows/publish.yml)
[![Releases](https://github.com/manthanank/learn-mongodb/actions/workflows/releases.yml/badge.svg)](https://github.com/manthanank/learn-mongodb/actions/workflows/releases.yml)
[![Npm Package total downloads](https://badgen.net/npm/dt/learn-mongodb)](https://npmjs.com/package/learn-mongodb)
[![Npm Package weekly downloads](https://badgen.net/npm/dw/learn-mongodb)](https://npmjs.com/package/learn-mongodb)
[![Npm Package monthly downloads](https://badgen.net/npm/dm/learn-mongodb)](https://npmjs.com/package/learn-mongodb)
[![Npm Package yearly downloads](https://badgen.net/npm/dy/learn-mongodb)](https://npmjs.com/package/learn-mongodb)

## Table of Contents

- [Introduction to MongoDB](#introduction-to-mongodb)
  - [Key Features of MongoDB](#key-features-of-mongodb)
  - [Use Cases of MongoDB](#use-cases-of-mongodb)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Basic Concepts](#basic-concepts)
- [MongoDB Shell](#mongodb-shell)
  - [Basic Commands](#basic-commands)
- [Data Modeling](#data-modeling)
  - [Embedded Data Model](#embedded-data-model)
  - [Referenced Data Model](#referenced-data-model)
- [Indexing](#indexing)
  - [Creating an Index](#creating-an-index)
  - [Compound Index](#compound-index)
  - [Text Index](#text-index)
- [Connecting to MongoDB](#connecting-to-mongodb)
  - [Using the MongoDB Node.js Driver](#using-the-mongodb-nodejs-driver)
  - [Using Mongoose](#using-mongoose)
- [CRUD Operations](#crud-operations)
- [Database Commands](#database-commands)
- [Collection Commands](#collection-commands)
- [Row(Document) Commands](#rowdocument-commands)
- [Aggregation Framework](#aggregation-framework)
- [Text Search](#text-search)
- [Geospatial Queries](#geospatial-queries)
- [Transactions](#transactions)
- [Data Validation](#data-validation)
- [Security](#security)
- [Backup and Restore](#backup-and-restore)
- [MongoDB Atlas](#mongodb-atlas)
- [Interview Questions](#interview-questions)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Conclusion](#conclusion)
- [References](#references)
- [License](#license)
- [Connect with me](#connect-with-me)
- [Support](#support)

## Introduction to MongoDB

MongoDB is a document-oriented NoSQL database, designed to store, query, and process large amounts of unstructured or semi-structured data. It uses a flexible, JSON-like document format called BSON (Binary JSON) to represent data.

[Back to Top⤴️](#table-of-contents)

### Key Features of MongoDB

- **Schema-less**: MongoDB does not require a predefined schema, allowing you to store data in a flexible manner.
- **High Performance**: MongoDB provides high-speed read and write operations due to its efficient indexing and storage mechanisms.
- **Scalability**: MongoDB supports horizontal scaling through sharding, enabling you to distribute data across multiple servers.

### Use Cases of MongoDB

- **Content Management**: MongoDB is suitable for managing content-heavy applications like blogs, news sites, and e-commerce platforms.
- **Real-time Analytics**: MongoDB can handle real-time data processing and analytics for applications that require quick insights.
- **Internet of Things (IoT)**: MongoDB is used in IoT applications to store and process sensor data from connected devices.

[Back to Top⤴️](#table-of-contents)

## Getting Started

To start using MongoDB, you need to install the MongoDB server on your local machine or use a cloud-based MongoDB service like MongoDB Atlas.

## Installation

Follow the [official MongoDB installation guide](https://docs.mongodb.com/manual/installation/) to set up MongoDB on your system.

[Back to Top⤴️](#table-of-contents)

## Basic Concepts

- **Collections**: Equivalent to tables in relational databases, collections store documents.
- **Documents**: BSON data format records that store data in key-value pairs.
- **Fields**: Key-value pairs within a document.
- **Indexes**: Improve query performance by providing a quick access path to the data.

[Back to Top⤴️](#table-of-contents)

## MongoDB Shell

MongoDB provides a command-line interface called the MongoDB shell to interact with the database. You can perform CRUD operations, create indexes, and run queries using the shell.

[Back to Top⤴️](#table-of-contents)

### Basic Commands

- **`show dbs`**: List all databases.
- **`use dbName`**: Switch to a specific database.
- **`show collections`**: List all collections in the current database.
- **`db.collection.find()`**: Retrieve all documents from a collection.
- **`db.collection.insertOne({ field: value })`**: Insert a document into a collection.

[Back to Top⤴️](#table-of-contents)

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

[Back to Top⤴️](#table-of-contents)

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

[Back to Top⤴️](#table-of-contents)

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

[Back to Top⤴️](#table-of-contents)

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

[Back to Top⤴️](#table-of-contents)

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

[Back to Top⤴️](#table-of-contents)

## Collection Commands

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

[Back to Top⤴️](#table-of-contents)

## Row(Document) Commands

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

[Back to Top⤴️](#table-of-contents)

## Aggregation Framework

MongoDB's Aggregation Framework is a powerful tool for data transformation and analysis. You can include examples of aggregation pipeline stages like `$match`, `$group`, `$project`, and others.

```bash
db.collection.aggregate([
   { $match: { field: value } },
   { $group: { _id: "$field", count: { $sum: 1 } } },
   { $project: { _id: 0, field: "$_id", count: 1 } }
])
```

[Back to Top⤴️](#table-of-contents)

## Text Search

MongoDB supports full-text search capabilities. You can demonstrate how to perform text searches on a text index.

```bash
db.collection.createIndex({ fieldName: "text" })
db.collection.find({ $text: { $search: "searchQuery" } })
```

[Back to Top⤴️](#table-of-contents)

## Geospatial Queries

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

[Back to Top⤴️](#table-of-contents)

## Transactions

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

[Back to Top⤴️](#table-of-contents)

## Data Validation

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

[Back to Top⤴️](#table-of-contents)

## Security

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

[Back to Top⤴️](#table-of-contents)

## Backup and Restore

Explain how to perform backups and restores using `mongodump` and `mongorestore` utilities.

```bash
# Backup a database
mongodump --db databaseName --out /path/to/backup

# Restore a database
mongorestore --db databaseName /path/to/backup/databaseName
```

[Back to Top⤴️](#table-of-contents)

## MongoDB Atlas

Discover MongoDB Atlas, the cloud-based database service, and learn how to deploy, manage, and scale MongoDB clusters.

[Back to Top⤴️](#table-of-contents)

## Interview Questions

1. **What is MongoDB? How is it different from SQL databases?**
   - MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. Unlike SQL databases, it does not require a predefined schema and supports horizontal scaling.

2. **What are the key features of MongoDB?**
   - Schema-less, high performance, scalability, flexible data model, rich query language, and support for replication and sharding.

3. **Explain the concept of a document and collection in MongoDB.**
   - A document is a record in MongoDB, stored in BSON format. A collection is a group of documents, similar to a table in SQL databases.

4. **What is BSON in MongoDB?**
   - BSON (Binary JSON) is a binary representation of JSON-like documents, used internally by MongoDB for data storage and transfer.

5. **How do you insert, update, and delete documents in MongoDB?**
   - Insert: `db.collection.insertOne({ ... })`
   - Update: `db.collection.updateOne({ ... }, { $set: { ... } })`
   - Delete: `db.collection.deleteOne({ ... })`

6. **What is the difference between `find()` and `findOne()`?**
   - `find()` retrieves all documents matching the query, while `findOne()` retrieves only the first matching document.

7. **What are indexes in MongoDB? How do they improve performance?**
   - Indexes are special data structures that store a small portion of the collection's data set in an easy-to-traverse form. They improve query performance by allowing the database to quickly locate and retrieve data.

8. **What is the purpose of the `_id` field in MongoDB?**
   - The `_id` field is a unique identifier for each document in a collection. It ensures that each document can be uniquely identified and retrieved.

9. **Explain the difference between `db.collection.drop()` and `db.collection.remove()`.**
   - `db.collection.drop()` deletes the entire collection, including all documents and indexes. `db.collection.remove()` deletes documents matching the query but keeps the collection and indexes.

10. **How do you create and drop databases in MongoDB?**
    - Create: `use dbName`
    - Drop: `db.dropDatabase()`

11. **What is sharding in MongoDB? Why is it important?**
    - Sharding is the process of distributing data across multiple servers to support horizontal scaling. It is important for handling large datasets and high-throughput applications.

12. **Explain the aggregation framework in MongoDB.**
    - The aggregation framework is a powerful tool for data transformation and analysis. It uses a pipeline of stages, such as `$match`, `$group`, and `$project`, to process and aggregate data.

13. **What are replica sets in MongoDB? How do they ensure high availability?**
    - Replica sets are groups of MongoDB servers that maintain the same data set. They ensure high availability by automatically failing over to a secondary server if the primary server goes down.

14. **How does MongoDB handle transactions?**
    - MongoDB supports multi-document transactions, allowing multiple operations to be executed atomically. Transactions are started with `session.startTransaction()` and committed with `session.commitTransaction()`.

15. **What is the difference between embedded and referenced documents?**
    - Embedded documents store related data within a single document, while referenced documents store related data in separate documents and reference them using ObjectIds.

16. **How do you optimize queries in MongoDB?**
    - Use indexes, avoid large documents, use projection to return only necessary fields, and analyze query performance with the `explain()` method.

17. **What is a capped collection? When would you use it?**
    - A capped collection is a fixed-size collection that automatically overwrites the oldest documents when it reaches its size limit. It is useful for logging and caching scenarios.

18. **Explain the `$lookup` operator in MongoDB. How does it work?**
    - The `$lookup` operator performs a left outer join to another collection in the same database. It allows you to combine data from multiple collections in a single query.

19. **How does MongoDB handle schema validation?**
    - MongoDB supports JSON Schema validation, allowing you to enforce a schema on a collection using the `validator` option in `db.createCollection()`.

20. **What is a covered query in MongoDB?**
    - A covered query is a query where all the fields in the query and the returned results are part of an index. It improves performance by avoiding the need to read documents from disk.

21. **Describe MongoDB’s internal storage architecture.**
    - MongoDB uses a storage engine (e.g., WiredTiger) to manage data storage. Data is stored in collections, which are composed of documents. Indexes are used to improve query performance.

22. **How do you manage large datasets in MongoDB for performance?**
    - Use sharding, optimize indexes, use appropriate data models, and perform regular maintenance tasks like compacting and reindexing.

23. **What are the differences between MongoDB and other NoSQL databases like Cassandra or CouchDB?**
    - MongoDB uses a document-oriented model, while Cassandra uses a wide-column model and CouchDB uses a document model with a focus on replication and synchronization. MongoDB supports rich queries and indexing, while Cassandra excels in write-heavy workloads and CouchDB focuses on offline-first applications.

24. **Explain the write concern and read concern levels in MongoDB.**
    - Write concern specifies the level of acknowledgment requested from MongoDB for write operations. Read concern specifies the consistency and isolation properties of the data read from the database.

25. **How does MongoDB ensure data consistency in distributed systems?**
    - MongoDB uses replica sets to ensure data consistency. Write operations are replicated to secondary members, and read operations can be configured to read from the primary or secondary members.

26. **What are MongoDB change streams, and how do they work?**
    - Change streams allow applications to access real-time data changes in a collection. They use the `watch()` method to listen for changes and provide a stream of change events.

27. **Describe the WiredTiger storage engine. How does it differ from MMAPv1?**
    - WiredTiger is the default storage engine in MongoDB, offering better compression, concurrency, and performance compared to the older MMAPv1 storage engine. WiredTiger uses a B-tree and LSM tree structure, while MMAPv1 uses memory-mapped files.

28. **How would you secure a MongoDB deployment in production?**
    - Enable authentication, use role-based access control, encrypt data at rest and in transit, configure firewalls, and regularly update MongoDB to the latest version.

29. **What is the difference between `findAndModify()` and `update()`? When would you use one over the other?**
    - `findAndModify()` atomically modifies and returns a single document, while `update()` modifies documents without returning them. Use `findAndModify()` when you need the modified document, and `update()` for bulk updates.

30. **Explain how MongoDB handles concurrency.**
    - MongoDB uses a combination of optimistic and pessimistic concurrency control. It employs document-level locking and supports multi-document transactions to ensure data consistency and isolation.

[Back to Top⤴️](#table-of-contents)

## Contributing

If you find any issues or have suggestions for improvement, feel free to contribute. Follow the [contribution guidelines](CONTRIBUTING.md) for details.

[Back to Top⤴️](#table-of-contents)

## Acknowledgements

- [MongoDB Documentation](https://docs.mongodb.com/)

[Back to Top⤴️](#table-of-contents)

## Conclusion

MongoDB is a powerful NoSQL database that offers flexibility, scalability, and performance for modern applications. By understanding the basic concepts, data modeling, indexing, and CRUD operations, you can leverage MongoDB effectively in your projects.

[Back to Top⤴️](#table-of-contents)

## References

- [MongoDB Documentation](https://docs.mongodb.com/)

[Back to Top⤴️](#table-of-contents)

## License

This repository is licensed under the [MIT License](LICENSE).

[Back to Top⤴️](#table-of-contents)

## Connect with me

- [Twitter](https://twitter.com/manthan_ank)
- [LinkedIn](https://www.linkedin.com/in/manthanank)
- [Facebook](https://www.facebook.com/manthanank/)
- [Instagram](https://www.instagram.com/manthan_ank/)
- [YouTube](https://www.youtube.com/@manthanank)
- [GitHub](https://github.com/manthanank)

[Back to Top⤴️](#table-of-contents)

## Support

If you like this learning repository and find it useful, consider buying me a coffee or sponsoring me through the GitHub Sponsor. Your support will help me to continue and bring more exciting projects. Thank you!

[![Buy Me A Coffee](/assets/bmc-button.svg)](https://www.buymeacoffee.com/manthanank)

[![Sponsor Me](https://img.shields.io/badge/Sponsor-GitHub-green)]([https://](https://github.com/sponsors/manthanank))

---

Show your support by 🌟 the repository.
