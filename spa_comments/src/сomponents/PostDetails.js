import { useParams } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import CommentForm from "./CommentForm";
import './Comments.css'

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}/`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const renderComment = (comment) => {
        return (
            <div key={comment.id} className="comment-container">
                <div className="comment-header">
                    <h3>{comment.username}</h3>
                    <h3>{comment.email}</h3>
                    <p>{comment.created_at}</p>
                </div>
                <p className="comment-text">{comment.text}</p>
                {comment.image && <img className="post-image" src={comment.image} alt="post" />}
                {comment.file && (
                    <a className="post-file" href={comment.file} target="_blank" rel="noopener noreferrer">
                        Download file
                    </a>
                )}
                <Button variant="link" className="reply-button" onClick={() => setShowReplyForm(comment.id)}>
                    Відповісти
                </Button>
                {comment.id === showReplyForm && (
                    <CommentForm postId={id} parentId={comment.id} className="reply-form" />
                )}
                {comment.replies &&
                    comment.replies.map((reply) => {
                        return (
                            <div key={reply.id} className="reply-container">
                                <div className="reply-header">
                                    <h4>{reply.username}</h4>
                                    <h4>{reply.email}</h4>
                                    <p>{reply.created_at}</p>
                                </div>
                                <p className="reply-text">{reply.text}</p>
                                {reply.image && <img className="post-image" src={reply.image} alt="post" />}
                                {reply.file && (
                                    <a className="post-file" href={reply.file} target="_blank" rel="noopener noreferrer">
                                        Download file
                                    </a>
                                )}
                                <Button
                                    variant="link"
                                    className="reply-button"
                                    onClick={() => setShowReplyForm(reply.id)}
                                >
                                    Відповісти
                                </Button>
                                {reply.id === showReplyForm && (
                                    <CommentForm postId={id} parentId={reply.id} className="reply-form" />
                                )}
                                {reply.replies && reply.replies.map(reply => renderComment(reply))}
                            </div>
                        );
                    })}
            </div>
        );
    };

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            {post ? (
                <div>
                    <h2>{post.username}</h2>
                    <h2>{post.email}</h2>
                    <p>{post.text}</p>
                    <p>{post.created_at}</p>
                    {post.image && <img className="post-image" src={post.image} alt="post" />}
                    {post.file && (
                        <a className="post-file" href={post.file} target="_blank" rel="noopener noreferrer">
                            Download file
                        </a>
                    )}
                    <Button onClick={() => setShowCommentForm(true)}>
                        Додати коментар
                    </Button>
                    {showCommentForm && <CommentForm postId={id} />}
                    {post.comments && post.comments.map((comment) => renderComment(comment))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}


export default PostDetails;
