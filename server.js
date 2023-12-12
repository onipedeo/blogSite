import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

const blogPosts = [];

app.get("/", (req, res) => {
	console.log("blogpost", blogPosts);
	res.render("home.ejs", { blogs: blogPosts });
});

app.get("/about", (req, res) => {
	res.render("about.ejs");
});

app.get("/projects", (req, res) => {
	res.render("projects.ejs");
});

app.get("/blog", (req, res) => {
	res.render("blog.ejs");
});

app.get("/contactme", (req, res) => {
	res.render("contactMe.ejs");
});

app.post("/contactme", (req, res) => {
	res.send("request Sent");
});
app.listen(port, () => {
	console.log(`Server is up and listening on port ${port}`);
});
