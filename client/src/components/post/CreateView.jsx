import {Box, Button, FormControl, InputBase, makeStyles, TextareaAutosize} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";
import {useState, useEffect} from "react";
import {createPost, uploadFile} from "../../service/api";
import {useHistory} from "react-router-dom";

const useStyle = makeStyles(theme => ({
    container: {
        margin: '50px 100px',
        [theme.breakpoints.down('md')]: {
            margin: 0
        },
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    title: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        }
    },
    form: {
        display: 'flex',
        flexDirection: "row",
        marginTop: 10
    }
}));
const initialValues = {
    title: '',
    description: '',
    picture: '',
    username: 'gigalabs',
    categories: 'All',
    createdDate: new Date()
}
const CreateView = () => {
    const [post, setPost] = useState(initialValues);
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const image = await uploadFile(data);
                post.picture = image.data;
                setImage(image.data);
            }
        }
        getImage();
    }, [file]);

    const classes = useStyle();
    const history = useHistory();
    const url = post.picture || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const savePost = async () => {
        await createPost(post);
        history.push('/');
    }

    return (
        <Box className={classes.container}>
            <img src={url} alt="post" className={classes.image}/>
            <FormControl className={classes.form}>
                <label htmlFor='fileInput'>
                    <AddCircle fontSize='large' color='action'/>
                </label>
                <input onChange={(e => setFile(e.target.files[0]))}
                       type="file"
                       id='fileInput'
                       style={{display: "none"}}/>
                <InputBase
                    onChange={(e) => handleChange(e)}
                    placeholder='Title' className={classes.textfield} name='title'/>
                <Button variant='contained' color='primary' onClick={() => savePost()}>Publish</Button>
            </FormControl>
            <TextareaAutosize
                rowsMin={5}
                onChange={(e) => handleChange(e)}
                placeholder="Tell your story..."
                className={classes.textarea} name='description'/>
        </Box>
    )
}

export default CreateView;