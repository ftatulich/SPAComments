import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CommentForm = ({ postId, parentId = null, onCommentAdded }) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            username,
            email,
            text,
            post: postId,
            parent: parentId,
        };

        if (image){
            payload.image = image
        }
        if (file){
            payload.file = file
        }

        try {
            console.log(payload)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/comments/create/`, payload);
            setUsername('');
            setEmail('');
            setText('');
        } catch (error) {
            console.error(error);
        }
        window.location.reload(false);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Ім'я</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </Form.Group>
                <Form.Group controlId="text">
                    <Form.Label>Текст коментаря</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Зображення</Form.Label>
                    <Form.Control required={false} type="file" accept="image/*" onChange={handleImageChange}/>
                </Form.Group>
                <Form.Group controlId="file">
                    <Form.Label>File</Form.Label>
                    <Form.Control required={false} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange}/>
                </Form.Group>
                <Button type="submit">Додати</Button>
            </Form>
        </div>
    );
};

export default CommentForm;
