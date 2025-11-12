import { sendChatMessage } from '../data/fetcher.js';

export function goBack() {
    window.location.href = 'index.html';
}

function addMessage(text, isUser = false) {
    const chatContainer = document.getElementById('chatContainer');
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user' : 'bot'}`;
    message.innerHTML = `<div class="message-bubble">${text}</div>`;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTyping() {
    const chatContainer = document.getElementById('chatContainer');
    const typing = document.createElement('div');
    typing.className = 'message bot';
    typing.id = 'typing';
    typing.innerHTML = `
        <div class="typing-indicator show">
            <span></span><span></span><span></span>
        </div>
    `;
    chatContainer.appendChild(typing);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
}

export async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const text = messageInput.value.trim();
    
    if (!text) return;

    addMessage(text, true);
    messageInput.value = '';
    sendBtn.disabled = true;

    showTyping();

    try {
        const response = await sendChatMessage(text);
        hideTyping();
        addMessage(response.reply);
    } catch (error) {
        hideTyping();
        addMessage('Sorry, I encountered an error. Please try again.');
    } finally {
        sendBtn.disabled = false;
        messageInput.focus();
    }
}

export function handleKeyPress(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

export function init() {
    const messageInput = document.getElementById('messageInput');
    
    messageInput.addEventListener('keypress', handleKeyPress);
}