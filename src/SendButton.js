import { useState } from "react";

const SendButton = () => {
    const [message, setMessage] = useState('nothing yet');

    const handleClick = () => {
        fetch('http://localhost:8080/api/hello')
        .then(response => response.text())
        .then(data => setMessage(data))
        .catch(error => console.error('Error fetching message:', error));
    };
    return <div>
        <h1>Message from backend:</h1>
        <p>{message}</p>
        <button onClick={handleClick}>Send</button>
    </div>
};

export default SendButton;