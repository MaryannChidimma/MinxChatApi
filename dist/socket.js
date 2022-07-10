"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var c_users = [];
function join_User(id, username, room) {
    var p_user = { id: id, username: username, room: room };
    c_users.push(p_user);
    return p_user;
}
// Gets a particular user id to return the current user
function get_Current_User(id) {
    var user = c_users.find(function (p_user) { return p_user.id === id; });
    return user;
}
// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
    var index = c_users.findIndex(function (p_user) { return p_user.id === id; });
    if (index !== -1) {
        return c_users.splice(index, 1)[0];
    }
}
//initializing the socket io connection 
index_1.io.on("connection", function (socket) {
    socket.on("joinRoom", function (_a) {
        var username = _a.username, roomname = _a.roomname;
        //* create user
        var p_user = join_User(socket.id, username, roomname);
        socket.join(p_user.room);
        //display a welcome message to the user who have joined a room
        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: "Welcome ".concat(p_user.username),
        });
        //displays a joined room message to all other room users except that particular user
        socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: "".concat(p_user.username, " has joined the chat"),
        });
    });
    socket.on("chat", function (text) {
        //gets the room user and the message sent
        var p_user = get_Current_User(socket.id);
        if (p_user) {
            index_1.io.to(p_user.room).emit("message", {
                userId: p_user.id,
                username: p_user.username,
                text: text,
            });
        }
    });
    //when the user exits the room
    socket.on("disconnection", function () {
        //the user is deleted from array of users and a left room message displayed
        var p_user = user_Disconnect(socket.id);
        if (p_user) {
            socket.broadcast.to(p_user.room).emit("message", {
                userId: p_user.id,
                username: p_user.username,
                text: "".concat(p_user.username, " has left the room"),
            });
        }
    });
});
