// Create web server
// Create a route that will accept POST requests and save the data in the comments.json file
// Create a route that will accept GET requests and send the comments.json file as a response

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/comments', (req, res) => {
    const comments = req.body;
    const commentsPath = path.join(__dirname, 'comments.json');
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Error writing to file');
            return;
        }
        res.status(200).send('Data saved');
    });
});

app.get('/comments', (req, res) => {
    const commentsPath = path.join(__dirname, 'comments.json');
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.status(200).send(data);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Test the API using Postman
// Make a POST request to http://localhost:3000/comments with the following JSON data:
// {
//     "name": "John Doe",
//     "comment": "Hello, world!"
// }
// Make a GET request to http://localhost:3000/comments to see the saved data