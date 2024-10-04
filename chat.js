// DOM elements
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatBox = document.getElementById('chat-box');
const userNameInput = document.getElementById('user-name');

// Get stored messages and user name from localStorage
let storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
let userName = localStorage.getItem('userName') || 'User';

// Display stored messages
window.addEventListener('DOMContentLoaded', function() {
    if (userName) {
        userNameInput.value = userName;
    }
    storedMessages.forEach(message => {
        addMessage(message.text, message.sender, message.time);
    });
});

// Add message to the chat box
function addMessage(content, sender = 'user', time = new Date().toLocaleTimeString()) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = content;

    const messageTime = document.createElement('div');
    messageTime.classList.add('message-time');
    messageTime.textContent = time;

    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Store the message in localStorage
function storeMessage(text, sender) {
    const time = new Date().toLocaleTimeString();
    storedMessages.push({ text, sender, time });
    localStorage.setItem('messages', JSON.stringify(storedMessages));
}

// Handle sending the message
sendBtn.addEventListener('click', function() {
    const userMessage = chatInput.value.trim();

    if (userMessage) {
        // Add user message
        addMessage(userMessage, 'user');
        storeMessage(userMessage, 'user');
        chatInput.value = '';

        // Bot response
        setTimeout(function() {
            const botMessage = getBotResponse(userMessage);
            addMessage(botMessage, 'bot');
            storeMessage(botMessage, 'bot');
        }, 1000);
    }
});

// Handle Enter key to send message
chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendBtn.click();
    }
});

// Function for bot responses
function getBotResponse(input) {
    const responses = {
        "hello": "Hii! How can I help you?",
        "how are you?": "I'm doing well! How about you?",
        "what's your name?": "my name is 939",
        "bye": "ok bye! Have a great day!",
        "default": "I didn't understand that.Could you text me again?"
    };

    return responses[input.toLowerCase()] || responses["default"];
}

// Store user's name in localStorage
userNameInput.addEventListener('blur', function() {
    userName = userNameInput.value.trim();
    if (userName) {
        localStorage.setItem('userName', userName);
    }
});
