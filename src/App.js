import React, {useMemo, useState} from 'react';
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
// import MyModal from "./components/UI/MyModal/MyModal";

function App(){
    const [posts, setPosts] = useState([
        {id: 1, title: "e", body: 'Description1'},
        {id: 2, title: "r", body: 'Description2'},
        {id: 3, title: "t", body: 'Description3'},
        {id: 4, title: "c", body: 'Description4'},
        {id: 5, title: "b", body: 'Description5'},
    ]);

    const[filter, setFilter] = useState({ query: '', sort: '' })
    const[modal, setModal] = useState(false);

    const sortedPosts = useMemo(() => {
        if (filter.sort){
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }

        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
    }, [filter.query, sortedPosts])


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

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts"}/>
        </div>
    );
}

export default App;