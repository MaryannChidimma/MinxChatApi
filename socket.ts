
import { io } from "./index";
const c_users: { id: string; username: string; room:string; }[] = [];

function join_User(id: string, username: string, room: string) {
  const p_user = { id, username, room };

  c_users.push(p_user);
  return p_user;
}

// Gets a particular user id to return the current user
function get_Current_User(id: string) {
  const user = c_users.find((p_user: { id: string }) => p_user.id === id);
  return user
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id: any) {
  const index = c_users.findIndex((p_user: { id: string }) => p_user.id === id);

  if (index !== -1) {
    return c_users.splice(index, 1)[0];
  }
}


//initializing the socket io connection 
io.on("connection", (socket) => {

socket.on("joinRoom", ({ username, roomname }) => {
  //* create user
  const p_user = join_User(socket.id, username, roomname);
  socket.join(p_user.room);

  //display a welcome message to the user who have joined a room
  socket.emit("message", {
    userId: p_user.id,
    username: p_user.username,
    text: `Welcome ${p_user.username}`,
  });

  //displays a joined room message to all other room users except that particular user
  socket.broadcast.to(p_user.room).emit("message", {
    userId: p_user.id,
    username: p_user.username,
    text: `${p_user.username} has joined the chat`,
  });
});

socket.on("chat", (text) => {
  //gets the room user and the message sent
  const p_user = get_Current_User(socket.id);
 if(p_user){
  io.to(p_user.room).emit("message", {
    userId: p_user.id,
    username: p_user.username,
    text: text,
  });
}
});

  //when the user exits the room
  socket.on("disconnection", () => {
    //the user is deleted from array of users and a left room message displayed
    const p_user = user_Disconnect(socket.id);

    if (p_user) {
      socket.broadcast.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has left the room`,
      });
    }
  });
});

