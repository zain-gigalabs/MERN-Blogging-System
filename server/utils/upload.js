import {GridFsStorage} from "multer-gridfs-storage";
import multer from "multer";

const storage = new GridFsStorage({
    url: 'mongodb+srv://user:gigalabs123@cluster0.cb3er.mongodb.net/Blog?retryWrites=true&w=majority',
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];
        if (match.indexOf(file.mimetype) === -1)
            return `${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            fileName: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage})