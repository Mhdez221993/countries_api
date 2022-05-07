import cors from 'cors';
import express from "express";
import { getRoutes } from "./routes";

const port = process.env.PORT;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/api/v1", getRoutes());


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
