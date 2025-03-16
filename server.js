const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' folder
app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.emit("message", "Welcome! Type something in the chat.");

    socket.on("chat", (msg) => {
        console.log("Client:", msg);
        socket.emit("message", "You said: " + msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Start the server and log the link
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
