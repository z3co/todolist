// biome-ignore lint/style/useImportType: <explanation>
import express, { Request, Response } from "express";
import connectDB from "./db";
import userRoutes from "./routers/user.routes";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes)

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Hello world" });
});

const Server = app.listen(port, () => {
	console.log(`The server is running on port ${port}`);
});

connectDB();

process.on("unhandledRejection", (err) => {
	console.error("Unhadled rejection", err);
	Server.close(() => {
		process.exit(1);
	});
});
