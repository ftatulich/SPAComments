import React, { useState } from 'react';
import axios from 'axios';
import './PostCreateForm.css';

const PostCreateForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('text', text);
        if (image) {
            formData.append('image', image);
        }
        if (file) {
            formData.append('file', file);
        }
        axios.post(`${process.env.REACT_APP_API_URL}/posts/create/`, formData)
            .then((response) => {
                console.log(response.data);
                setUsername('');
                setEmail('');
                setText('');
                setImage(null);
                setFile(null);
            })
            .catch((error) => {
                console.error(error);
            });
        window.location.reload(false);
    };

    return (
        <form onSubmit={handleSubmit} className="post-create-form">
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="text">Text:</label>
                <textarea
                    id="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="file">File:</label>
                <input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostCreateForm;
