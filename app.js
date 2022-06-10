const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...' 
                       
            });
        }
    })
    
    
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

function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if header is undefined
    if(typeof bearerHeader != 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();
    } else {
        //forbidden
        res.sendStatus(403);
    }
}

app.listen(5005, () => console.log('Server started on port 5000'));
