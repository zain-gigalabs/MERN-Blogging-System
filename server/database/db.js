import mongoose from 'mongoose';

const Connection = async () => {
    try {
        const URL = '';
        await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        console.log('Successfully connected to mongoDB');
    } catch (e) {
        console.log('Error while connecting to mongoDB', e);
    }
}

export default Connection;
