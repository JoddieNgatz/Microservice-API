// const dbConfig = require('../config/test.db.config')
// //const mongoUri = dbConfig.url;

const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
//const mongoUri = dbConfig.url;

//in-memory database
module.exports.connect = async() => {

    const mongoURI = await mongod.getConnectionString();

        const mongooseOpts = {
            useNewUrlParser: true,
            autoReconnect:true,
            useFindAndModify: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
            useUnifiedTopology: true
        };
        console.log("connecting db");
    
    await mongoose.connect(mongoURI, mongooseOpts).then(console.log("connected to db"));

    mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
    });
    mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
    });

}

//close db
module.exports.close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
}
  
/**
 * Remove all the data for all db collections.
 */
 module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}