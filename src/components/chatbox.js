import React from 'react';

const ChatBox = () => {
    return (
        <div className="chat-container">
          <p>ChatBox Component</p>
          <iframe
            src="https://www5.cbox.ws/box/?boxid=953150&boxtag=l6XwUZ"
            width="100%"
            height="450px"
            allow="autoplay"
            style={{
                border: 'none',
                frameBorder: '0',
                marginTop: '0',
                marginBottom: '0',
                marginLeft: '0',
                marginRight: '0',
                overflowY: 'auto'
              }}
            title="Chat Box"
          ></iframe>
        </div>
      );
    };

export default ChatBox;