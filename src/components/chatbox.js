// src/components/ChatBox.js
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import './ChatBox.css';

const ChatBox = ({ socketRef, username, roomId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [feedback, setFeedback] = useState('');
    const messageContainerRef = useRef(null);

    const sendMessage = () => {
        if (!message) return;
        const messageId = Date.now().toString(); // Generate a unique ID
        const messageData = {
            id: messageId,
            name: username,
            message,
            dateTime: new Date(),
            roomId,
        };
        console.log("Sending message:", messageData);
        socketRef.current.emit('message', messageData);
        addMessageToUI(true, messageData);
        setMessage('');
    };

    const addMessageToUI = (isOwnMessage, data) => {
        setMessages(prevMessages => {
            const existingMessageIndex = prevMessages.findIndex(msg => msg.id === data.id);
            if (existingMessageIndex !== -1) {
                // Message already exists, don't add it again
                return prevMessages;
            }
            return [...prevMessages, { ...data, isOwnMessage }];
        });
    };

    // Emit feedback when user types in input
    const handleTyping = () => {
        if (message) {
            socketRef.current.emit('feedback', { feedback: `${username} is typing...`, roomId });
        } else {
            socketRef.current.emit('feedback', { feedback: '', roomId });
        }
    };

    useEffect(() => {
        if (socketRef.current) {
            // Listen for incoming chat messages and display them
            socketRef.current.on('chat-message', (data) => {
                console.log("Received message:", data);
                addMessageToUI(false, data);
            });

            // Listen for typing feedback and update the feedback state
            socketRef.current.on('feedback', (data) => {
                setFeedback(data.feedback);
            });
        }

        // Scroll to the bottom of the messages container whenever new messages arrive
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInput = (e) => setMessage(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <div className="chatBox">
            <div className="messages" ref={messageContainerRef}>
                {messages.map((msg, index) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.isOwnMessage ? 'own' : 'other'}`}
                    >
                        <p>
                            <strong>{msg.name}</strong>: {msg.message}
                        </p>
                        <span>{moment(msg.dateTime).fromNow()}</span>
                    </div>
                ))}
            </div>
            {feedback && <div className="typing-feedback">{feedback}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={handleInput}
                    placeholder="Type a message..."
                    onKeyUp={handleTyping}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;