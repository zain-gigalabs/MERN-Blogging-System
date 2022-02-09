import grid from 'gridfs-stream';
import mongoose from "mongoose";

const url = 'http://localhost:8000';

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

export const uploadImage = (req, res) => {
    try {
        if (!req.file)
            return res.status(404).json('File not found');

        const imageURL = `${url}/file/${req.file.filename}`

        res.status(200).json(imageURL);
    } catch (e) {
        res.status(500).json(e);
    }

}

export const getImage = async (req,res) => {
    try {
        const file = await gfs.files.findOne({filename: req.params.filename});
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res)
        //return res.status(200).json('hi');
    } catch (e) {
        return res.status(500).json(e);
    }

}

