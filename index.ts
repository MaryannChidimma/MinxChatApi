import http = require('http')
import express, { Express, Request, Response } from 'express';
import path from 'path';
import constants from './src/config/constants'
import database from './src/config/database'
import cors from "cors";
import helmet from "helmet";
import { ErrorMiddleware } from "./src/middlewares/errorHandler";
import apiRoutes from "./src/routes";
require('express-async-errors')
import { Server} from "socket.io";
import color from "colors";

// app.use(express());

// const port = 8000;

// app.use(cors());





const app: Express = express();
const port =  8000;
console.log(port)

app.use(cors(
  {
  origin: "*", //TODO: change origin to trusted IP
  credentials: true,
  exposedHeaders: ["x-id-key"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", apiRoutes());

app.use("/", (req, res) => {
  res.status(200).sendFile(path.resolve("public", "index.html"));
});

app.use(ErrorMiddleware);

// socket.io for realtime activities
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});
import "./socket"

server.listen(port, () => {
  database()
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.on("error", (error) => {
  console.log(`Error occured on the server ${error}`);
});



