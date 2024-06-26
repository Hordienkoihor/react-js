import React, {useEffect, useMemo, useState} from 'react';
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import MyLoader from "./components/UI/Loader/MyLoader";
// import MyModal from "./components/UI/MyModal/MyModal";

function App(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts()
    }, []);

    const[filter, setFilter] = useState({ query: '', sort: '' })
    const[modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const[isPostsLoading, setIsPostsLoading] = useState(false);


    async function fetchPosts() {
        setIsPostsLoading(true)
        setTimeout(async () => {
            const posts = await PostService.getAll()
            setPosts(posts)
            setIsPostsLoading(false)
        }, 1000)

    }


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }



    return(
        <div className="App">

            <MyButton style={{marginTop:"30px"}} onClick={() => setModal(true)}>
                Create Post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {isPostsLoading
                ? <div style={{display: 'flex' , justifyContent: 'center' , paddingTop: '40px'}}> <MyLoader/> </div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts"}/>
            }

        </div>
    );
}

export default App;