import React from 'react';
import PostsList from "./Posts";
import AddPostForm from "./AddPostForm";

const Home = () => {
    return (
        <div>
            <AddPostForm/>
            <PostsList/>
        </div>
    );
};

export default Home;