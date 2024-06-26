import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import PostList from "./PostList";
import PostFilter from "./PostFilter";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title:'', body:''})

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''})

    }
    return (
        <form>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Name"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Description"
            />
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>

);
};

export default PostForm;