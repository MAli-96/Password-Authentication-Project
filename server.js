import express from "express";
import users from './users.js';
import bcrypt, { hash } from "bcrypt";

const app = express();

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hash(req.body.password, 10);
        console.log(salt);
        console.log(hashedPassword);
        const user = { firstName: req.body.first_name, lastName: req.body.last_name, password: hashedPassword}
        users.push(user);
    } catch {
        res.status(500).send();
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => (console.log(`Listening on port ${port}...`)));
