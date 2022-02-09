import Post from "./Post";
import {Box, Grid} from "@material-ui/core";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

import {getAllPosts} from "../../service/api";

const Posts = () => {
    const {search} = useLocation();
    const [posts, setPosts] = useState([]);
    //let posts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    useEffect(() => {
        const fetchData = async () => {
            let data = await getAllPosts(search);
            setPosts(data)
        }
        fetchData();
    }, [search])
    return (
        <>
            {
                posts.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/details/${post._id}`}>
                            <Post post={post}/>
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                    No data is available for selected category
                </Box>
            }
        </>

    )
}

export default Posts;