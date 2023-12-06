import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hey we are up");
});

app.listen(port, () => {
	console.log(`Server is up and listening on port ${port}`);
});
