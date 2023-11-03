import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import './ChatBot.css';
import config from "../../../config";

const ChatBot = () => {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [conversationID, setConversationID] = useState(
    localStorage.getItem("conversationID") || ""
  );
  const [expanded, setExpanded] = useState(false);
  const [isDisbled, setIsDisabled] = useState(false);

  useEffect(() => {
    localStorage.setItem("conversationID", conversationID);
  }, [conversationID]);

  const saveConversationToLocalStorage = (updatedConversation) => {
    localStorage.setItem("conversation", JSON.stringify(updatedConversation));
  };

  const loadConversationFromLocalStorage = () => {
    const savedConversation = localStorage.getItem("conversation");
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  };

  useEffect(() => {
    loadConversationFromLocalStorage();
  }, []);

  const handleSendMessage = async () => {
    setIsDisabled(true);
    const response = await fetch( config.apiUrlWolframChat, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'query': message, conversationID }),
      });

    const data = await response.json();
    console.log(data);
    const responseData = JSON.parse(data.response);
    setIsDisabled(false);
    
    const updatedConversation = [
      ...conversation,
      { message: message, sender: "user" },
      { message: responseData.result, sender: "bot" },
    ];

    setConversation(updatedConversation);
    setConversationID(responseData.conversationID);
    setMessage("");
    saveConversationToLocalStorage(updatedConversation);
  };

  const handleClearChat = () => {
    localStorage.removeItem('conversationID');
    localStorage.removeItem('conversation');
    setConversation([]);
    setConversationID("");
  };

  const handleExpand = () => {
    setExpanded(true);
  };
  
  const handleExpandClose = () => {
    setExpanded(false);
  }

  return (
    <div>
      {expanded ? (
        <div className="chatbot-body">
          <div className="chating">
            <div className="lead-head">
              <div className="head-title">
                <div className="head-title-content">CHATBOT</div>
                <div class="glitch-wrapper">
                  <div class="glitch" data-text="BETA">BETA</div>
                </div>
              </div>
              <div>
                <Button variant="outlined" onClick={handleExpandClose} size="small"><Icon icon="icomoon-free:cross" /></Button>
              </div>
            </div>
            <div className="chat-view">
              <div className="bot-message">
                <strong>Bot: </strong>
                Hii! How can I assist you?
              </div>
              {conversation.map((con, index) => (
                <p key={index}>
                  {con.sender === "bot" ? (
                    <div className="bot-message">
                      <strong>Bot: </strong>
                      {con.message}
                    </div>
                  ) : (
                    <div className="user-message">
                      <strong>You: </strong>
                      {con.message}
                    </div>  
                  )}
                </p>
              ))}
            </div>
          <div className="chat-input">
            <div className="user-input">
              <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                <Icon icon="ph:address-book-fill" style={{fontSize: '32px'}}/>
                <TextField id="filled-multiline-flexible" label="Chat" multiline size='small' maxRows={4} fullWidth variant="filled" value={message} onChange={(e) => setMessage(e.target.value)} required />  
                <Button disabled={isDisbled}><Icon icon="fluent:send-16-filled" fontSize={'xx-large'} style={{cursor: 'pointer'}} onClick={handleSendMessage} /></Button>
              </Box>
            </div>
            <div className="send-chat"><Button variant="outlined" size="small" onClick={handleClearChat}>New Chat</Button></div>
          </div>
          </div>
        </div>
      ) : (
        <div className="chatbot-closed" onClick={handleExpand}>
          <Icon icon="gridicons:chat" />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
