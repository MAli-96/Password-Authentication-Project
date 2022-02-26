import express from "express";
import users from "./users.js"
import bcrypt from "bcrypt";
import { hash } from "bcrypt";

const app = express();

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(encryptedPassword);
        const user = { name: req.body.name, email: req.body.email, password: encryptedPassword }
        users.push(user);
        res.status(200).send();
    } catch {
        res.status(500).send();
    }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if(user === null) {
        return res.status(400).send("Cannot find specified user")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Request successful")
        } else {
            res.send("Request denied");
        }
    } catch {
        res.status(500).send();
    }
})

const port = process.env.PORT || 8000;
app.listen(port, () => (console.log(`Listening on port ${port}...`)));
