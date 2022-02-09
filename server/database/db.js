import mongoose from 'mongoose';

const Connection = async () => {
    try {
        const URL = 'mongodb+srv://user:gigalabs123@cluster0.cb3er.mongodb.net/Blog?retryWrites=true&w=majority';
        await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        console.log('Successfully connected to mongoDB');
    } catch (e) {
        console.log('Error while connecting to mongoDB', e);
    }
}

export default Connection;