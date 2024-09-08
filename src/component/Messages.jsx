// src/components/Messages.jsx
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../FirebaseConfig'; // Import the initialized database
import '../css/Messages.css'; // Import the CSS file for messages styles

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Reference to the 'contacts' node in the Firebase Realtime Database
        const contactsRef = ref(database, 'contacts/');

        // Fetch data from Firebase Realtime Database
        onValue(contactsRef, (snapshot) => {
            const data = snapshot.val();
            const messagesList = [];

            // Convert data to array format
            for (let key in data) {
                messagesList.push({
                    ...data[key],
                    id: key,
                });
            }

            // Sort messages by timestamp in descending order
            messagesList.sort((a, b) => b.timestamp - a.timestamp);

            // Update state with messages data
            setMessages(messagesList);
        });
    }, []);

    return (
        <div className="messages-container">
            <h1>Messages</h1>
            {messages.map((message) => (
                <div key={message.id} className="card">
                    <h2>Email: {message.email}</h2>
                    <p>Name: {message.name}</p>
                    <p>Description: {message.message}</p>
                    <p>Time: {new Date(message.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Messages;
