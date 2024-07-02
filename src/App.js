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
import {useFetching} from "./hooks/useFetching";
// import MyModal from "./components/UI/MyModal/MyModal";
import {getPageCount, getPagesArray} from "./components/utils/pages.js";
import Pagination from "./components/UI/pagination/Pagination";


function App(){
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ query: '', sort: '' })
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const  totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit))

    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, []);


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)

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
            {postError &&
                <h1>Error ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex' , justifyContent: 'center' , paddingTop: '40px'}}> <MyLoader/> </div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts"}/>
            }

            <Pagination
            page={page}
            changePage={changePage}
            totalPages={totalPages}
            />

        </div>
    );
}

export default App;