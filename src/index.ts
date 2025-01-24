// biome-ignore lint/style/useImportType: <explanation>
import express, { Request, Response } from "express"

const app = express()

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
