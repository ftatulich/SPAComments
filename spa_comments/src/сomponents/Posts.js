import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostsList.css';
import {Link} from "react-router-dom";

const PostsList = () => {
    console.log(process.env.REACT_APP_API_URL)
    const [posts, setPosts] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [sortField, setSortField] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc');

    const fetchPosts = async (pageNumber = 0) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/posts/?sort=${sortField}&order=${sortOrder}`
        );
        setPosts(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
    };

    useEffect(() => {
        fetchPosts();
    }, [sortField, sortOrder]);

    const handlePrevClick = () => {
        if (prevPage) {
            fetchPosts(prevPage);
        }
    };

    const handleNextClick = () => {
        if (nextPage) {
            fetchPosts(nextPage);
        }
    };

    const handleSortChange = (event) => {
        const value = event.target.value.split('.');
        setSortField(value[0]);
        setSortOrder(value[1]);
    };

    return (
        <div className="posts-list-container">
            <h2>Posts List</h2>
            <div className="sort-wrapper">
                <label htmlFor="sort-select">Sort by:</label>
                <select id="sort-select" value={`${sortField}.${sortOrder}`} onChange={handleSortChange}>
                    <option value="created_at.desc">Newest first</option>
                    <option value="created_at.asc">Oldest first</option>
                    <option value="username.asc">Username A-Z</option>
                    <option value="username.desc">Username Z-A</option>
                    <option value="email.asc">Email A-Z</option>
                    <option value="email.desc">Email Z-A</option>
                </select>
            </div>
            <ul className="posts-list">
                {posts.map((post) => (
                    <li key={post.id} className="post-item">
                        <Link to={`/posts/${post.id}`}>
                            <div className="post-username">{post.username}</div>
                            <div className="post-email">{post.email}</div>
                            <div className="post-text">{post.text}</div>
                            {post.image && <img className="post-image" src={post.image} alt="post" />}
                            {post.file && (
                                <a className="post-file" href={post.file} target="_blank" rel="noopener noreferrer">
                                    Download file
                                </a>
                            )}
                            <div className="post-date">{post.created_at}</div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                <button className="page-item" onClick={handlePrevClick} disabled={!prevPage}>
                    Previous
                </button>
                <button className="page-item" onClick={handleNextClick} disabled={!nextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PostsList;
