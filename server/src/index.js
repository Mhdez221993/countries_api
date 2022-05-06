import express from "express";
import { getRoutes } from "./routes";

const port = process.env.PORT;

const app = express();
app.use(express.json());
// all API routes are prefixed with /api/v1
app.use("/api/v1", getRoutes());


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
