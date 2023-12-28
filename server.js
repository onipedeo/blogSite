import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import "dotenv/config";
import nodemailer from "nodemailer";

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.set("view engine", "ejs");

const sendEmail = async (formData) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.APP_PASSWORD,
		},
	});

	await transporter.sendMail({
		from: {
			name: `${formData.name}, ${formData.email}`,
			address: `${formData.email}`,
		},
		to: process.env.RECEIVING_EMAIL,
		subject: "",
		html: `<p>${formData.message}
		</p>`,
	});
};

app.get("/", (req, res) => {
	res.render("home.ejs", {});
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
	console.log("request coming in", req.body);
	const formData = req.body;
	sendEmail(formData);
	res.render("thankyou.ejs", { name: formData.name });
});

app.listen(port, () => {
	console.log(`Server is up and listening on port ${port}`);
});
