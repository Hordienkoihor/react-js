import React, {useRef, useState} from 'react';
import Counter from "./components/Counter";
import ClassCounter from "./components/classCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/mySelect";

function App(){
    const [posts, setPosts] = useState([
        {id: 1, title: "e", body: 'Description1'},
        {id: 2, title: "r", body: 'Description2'},
        {id: 3, title: "t", body: 'Description3'},
        {id: 4, title: "c", body: 'Description4'},
        {id: 5, title: "b", body: 'Description5'},
    ]);

    const [selectedSort, setSelectedSort] = useState('');
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id != post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        console.log(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    }

    return(
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <div>
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Sorting by"
                    options ={[
                        {value: 'title', name: "by title"},
                        {value: 'body', name: "by description"}
                    ]}

                />
            </div>
            {posts.length !== 0
                ? <PostList remove={removePost} posts={posts} title={"Posts"}/>

                : <h1 style={{textAlign: 'center'}}> Posts not found</h1>
            }
        </div>
    );
}

export default App;