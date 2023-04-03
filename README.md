# Learn MongoDB

**MongoDB** is a document database designed for ease of application development and scaling. It stores data in a type of JSON format called BSON.

## Connect & Check version -

```bash
mongo
mongosh
mongod
```

## MongoDB CRUD Operations

Create Operations

```bash
db.collection.insetOne()

db.collection.insetMany()
```

Read Operations

```bash
db.collection.find()
```

Update Operations

```bash
db.collection.updateOne()

db.collection.updateMany()

db.collection.replaceOne()
```

Delete Operations

```bash
db.collection.deleteOne()

db.collection.deleteMany()
```

## Data Models

## Indexes

## Connecting to nodejs

```bash
const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://USERNAME:PASSWORD@cluster0.re3ha3x.mongodb.net/learn-mongodb`
  )
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
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
