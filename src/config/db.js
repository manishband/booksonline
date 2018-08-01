import Mongoose from 'mongoose';
import config from './config.env'

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    let dbHost = config.dbHost;
    let dbPort = config.dbPort;
    let dbName = config.dbName;
    try {
        await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`,{useNewUrlParser: true});
    }
    catch (err) {
        Error('Could not connect to MongoDB');
    }
}

export default connectToDb;
