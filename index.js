const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I Love Coding",
    },
    {
        id: uuidv4(),
        username: "Muqtadir",
        content: "Hard work is the key to success",
    },
    {
        id: uuidv4(),
        username: "Oggy",
        content: "I got selected for my 1st interview",
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4(); 
    posts.push({ id, username, content }); 
    res.redirect("/posts");  
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.send("Post not found");
    }
});

app.listen(port, () => {
    console.log(`App is Listening on port ${port}`);
});
