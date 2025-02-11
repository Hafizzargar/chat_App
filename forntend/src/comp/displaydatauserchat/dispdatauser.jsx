import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import './Dispdatauser.css';

function Dispdatauser({ _id }) {
  console.log("Receiver ID:", _id);

  const [chtdata, setChtdata] = useState([]);
  const [chatsend, setChatsend] = useState('');
  const [sendid, setSendid] = useState('');
  const [reid, setReid] = useState('');
  const chatBoxRef = useRef(null);  // For auto-scrolling to the bottom

  // Fetch chat data when receiver changes
  useEffect(() => {
    const getChatData = async () => {
      try {
        const res = await axios.post('http://localhost:4000/api/chat/chatrecive', { personidreciver: _id }, { withCredentials: true });
        setChtdata(res.data.chatdata);
        setSendid(res.data.sendermessage_id);
        setReid(res.data.recivermessage_id);
        console.log("Receiver ID: " + res.data.recivermessage_id);
        console.log("Sender ID: " + res.data.sendermessage_id);
      } catch (err) {
        console.error("Error fetching chat data:", err);
      }
    };
    
    if (_id) {
      getChatData();
    }
  }, [_id]);

  // Scroll to the latest message when chat data changes
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chtdata]);

  const sendChat = async () => {
    if (!chatsend.trim()) {
      return toast.error('Empty chat text');
    }

    if (!_id || _id.length !== 24) {
      return toast.error('Invalid receiver ID');
    }

    try {
      const resData = await axios.post('http://localhost:4000/api/chat/chatsend', { chatsend, _idreciver: _id }, { withCredentials: true });
      console.log("Message Sent:", resData);
      toast.success('Message sent!');
      setChatsend('');
      
      // Add new chat message to UI without refreshing
      setChtdata(prevData => [...prevData, { chatsend, personidsender: sendid, createdate: new Date().toISOString() }]);
    } catch (err) {
      console.error("Error sending chat:", err);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        {chtdata.length > 0 ? (
          chtdata.map((chat, index) => (
            <div key={index} className={chat.personidsender === sendid ? 'sent' : 'received'}>
              <strong>{chat.personidsender === sendid ? 'You' : 'Receiver'}:</strong>
              <div className={chat.personidsender === sendid ? 'sent-message' : 'received-message'}>
                {chat.chatsend}
              </div>
              <div className="timestamp">{new Date(chat.createdate).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages yet</p>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Type a message..."
          value={chatsend}
          onChange={(e) => setChatsend(e.target.value)}
        />
        <button className="send-button" onClick={sendChat}>Send</button>
      </div>
    </div>
  );
}

export default Dispdatauser;
