const { MongoMemoryServer } = require('mongodb-memory-server');
const db = require('mongoose');
db.set('useFindAndModify', false);
const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };

    await db.connect(uri, mongooseOpts);
};

module.exports.closeDatabase = async () => {
    await db.connection.dropDatabase();
    await db.connection.close();
    await mongod.stop();
};

module.exports.clearDatabase = async () => {
    const collections = db.connection.collections;

    // @ts-ignore
    Object.keys(collections).forEach(async (key: string) => {
        const collection = collections[key];
        await collection.deleteMany();
    });
};
