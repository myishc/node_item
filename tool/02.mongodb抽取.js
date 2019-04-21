//导入mongodb数据库操作
const MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId;

// 设置数据库地址
const url = 'mongodb://127.0.0.1:27017';

// 设置表格
const dbName = 'myproject';


module.exports = {
    //查询数据
    find(colleName,queryData,callback) {
        MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
            const db = client.db(dbName),
            //设置集合
                 collection = db.collection(colleName);
            collection.find(queryData).toArray((err, docs)=> {
                callback(docs);
                client.close();
            });
        })
    },

    //插入数据
    insertMany(colleName,insertData,callback) {
        MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
            const db = client.db(dbName),
            //设置集合
                 collection = db.collection(colleName);
            collection.insertMany([insertData],(err, result)=>{
                callback(result);
                client.close();
            });
        })
    },

    //插入一条数据
    insertOne(colleName,insertData,callback) {
        MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
            const db = client.db(dbName),
            //设置集合
                 collection = db.collection(colleName);
            collection.insertOne(insertData,(err, result)=>{
                callback(result);
                client.close();
            });
        })
    },

    //修改数据
    update(colleName,oldData,newData,callback) {
        MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
            const db = client.db(dbName),
            //设置集合
                 collection = db.collection(colleName);
            collection.updateOne(oldData,{$set:newData},(err, result)=>{
                callback(result);
                client.close();
            });
        })
    },

    //删除数据
    deleteOne(colleName,deleteData,callback) {
        MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
            const db = client.db(dbName),
            //设置集合
                 collection = db.collection(colleName);
            collection.deleteOne(deleteData,(err, result)=>{
                callback(result);
                client.close();
            });
        })
    },

    ObjectId
}