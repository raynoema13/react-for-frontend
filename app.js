const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

app.post('/api/posts', (req, res) => {
    res.json({
        message: 'Post created...'
    });
});

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'ray',
        email: 'ray@react.com'
    }
    //send a token
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

app.listen(5005, () => console.log('Server started on port 5000'));
