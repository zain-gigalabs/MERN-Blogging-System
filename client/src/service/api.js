import axios from "axios";

const URL = 'http://localhost:8000';

export const createPost = async (post) => {
    try {
        return await axios.post(`${URL}/create`, post)
    } catch (e) {
        console.log('Error calling api', e);
    }
}

export const getAllPosts = async (params) => {
    try {
        let res = await axios.get(`${URL}/posts${params}`);
        return res.data;
    } catch (e) {
        console.log('Error calling api', e);
    }
}

export const getPost = async (id) => {
    try {
        let res = await axios.get(`${URL}/post/${id}`);
        return res.data;
    } catch (e) {
        console.log('Error calling api', e);
    }
}

export const updatePost = async (id, post) => {
    try {
        return await axios.put(`${URL}/update/${id}`, post);

    } catch (error) {
        console.log('Error while calling updatePost API ', error)
    }
}

export const deletePost = async (id) => {
    try {
        return await axios.delete(`${URL}/delete/${id}`);
    } catch (error) {
        console.log('Error while calling deletePost API ', error)
    }
}

export const uploadFile = async (data) => {
    try {
        return await axios.post(`${URL}/file/upload`, data);
    } catch (e) {
        console.log('Error while uploading image ', e)
    }
}


export const newComment = async (data) => {
    try {
        return await axios.post(`${URL}/comment/new`, data);
    } catch (e) {
        console.log('Error while calling api ', e)
    }
}

export const getComments = async (id) => {
    try {
        let response =  await axios.get(`${URL}/comments/${id}`);
        return response.data;
    } catch (e) {
        console.log('Error while calling api ', e)
    }
}

export const deleteComment = async (id) => {
    try {
        return  await axios.delete(`${URL}/comment/delete/${id}`);
    } catch (e) {
        console.log('Error while calling api ', e)
    }
}