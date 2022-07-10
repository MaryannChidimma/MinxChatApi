"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var http = require("http");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var database_1 = __importDefault(require("./src/config/database"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var errorHandler_1 = require("./src/middlewares/errorHandler");
var routes_1 = __importDefault(require("./src/routes"));
require('express-async-errors');
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
var port = 8000;
console.log(port);
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    exposedHeaders: ["x-id-key"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/v1", (0, routes_1.default)());
app.use("/", function (req, res) {
    res.status(200).sendFile(path_1.default.resolve("public", "index.html"));
});
app.use(errorHandler_1.ErrorMiddleware);
// socket.io for realtime activities
var server = http.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: "*",
    },
});
require("./socket");
server.listen(port, function () {
    (0, database_1.default)();
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
app.on("error", function (error) {
    console.log("Error occured on the server ".concat(error));
});
