const socket = io(); // Connect to the WebSocket server
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("input");

// Listen for messages from the server
socket.on("message", (msg) => {
    displayMessage("Server: " + msg);
});

// Send a message when the user clicks the send button
function sendMessage() {
    const message = input.value.trim();
    if (message) {
        socket.emit("chat", message);
        displayMessage("You: " + message);
        input.value = ""; // Clear input after sending
    }
}

// Display messages in the chat box
function displayMessage(msg) {
    const messageElement = document.createElement("p");
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Allow sending messages by pressing "Enter"
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
