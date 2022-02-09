import {Box, Button, makeStyles, TextareaAutosize} from "@material-ui/core";
import {useEffect, useState} from "react";
import {getComments, newComment} from "../../service/api";
import Comment from "./Comment";

const useStyles = makeStyles({
    container: {
        marginTop: 100,
        display: 'flex',
        '& > *': {
            padding: '10px '
        }
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: '50%'
    },
    textarea: {
        height: 100,
        width: '100%',
        margin: '0 20px'
    },
    button: {
        height: 40
    }
})

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({post}) => {
    //console.warn(post)
    const classes = useStyles();
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const getData = async () => {
            let response = await getComments(post._id);
            setComments(response);
        }
        getData();
    }, [post,toggle]);


    const handleChange = (e) => {
        setComment({
            ...comment,
            name: post.username,
            postId: post._id,
            comments: e.target.value
        })
    }

    const postComment = async () => {
        await newComment(comment);
        setToggle(prev => !prev);
    }
    return (
        <Box className={classes.container}>
            <Box>
                <img src={url} alt="dp" className={classes.image}/>
                <TextareaAutosize
                    className={classes.textarea}
                    rowsMin={7}
                    onChange={(e) => handleChange(e)}/>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    onClick={() => postComment()}>Post</Button>
            </Box>
            <Box>
                {
                    comments && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle}/>
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;