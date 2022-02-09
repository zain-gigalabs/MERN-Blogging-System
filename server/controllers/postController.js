import Post from "../schema/post-schema.js";

export const createPost = async (request, response) => {
    //console.log(request.body);
    try {
        const post = await new Post(request.body);
        post.save();
        response.status(200).json('Blog saved successfully');
    } catch (e) {
        response.status(500).json(e);
    }
}


export const getAllPosts = async (req, res) => {
    let username = req.query.username;
    let category = req.query.category;
    let posts;
    try {
        if (username)
            posts = await Post.find({username: username});
        else if (category)
            posts = await Post.find({categories: category});
        else
            posts = await Post.find({});

        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json(e);
    }
}


export const getPost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json(e);
    }
}

export const updatePost = async (request, response) => {
    //console.log(request.body);
    try {
        const post = await Post.findByIdAndUpdate(request.params.id, {$set: request.body});
        response.status(200).json('Blog updated successfully');
    } catch (e) {
        response.status(500).json(e);
    }
}

export const deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        await post.delete();
        res.status(200).json('Blog deleted successfully');
    } catch (e) {
        res.status(500).json(e);
    }
}

