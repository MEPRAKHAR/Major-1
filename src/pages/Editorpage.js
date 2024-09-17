import React, { useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: 'Prakhar' },
    { socketId: 2, username: 'Pranay' },
  ]);

  return (
    <div className="mainwrap">
      {/* Left section */}
      <div className="left">
        <div className="left-top">
          <div className="logo">
            <img className="logoImage" src="/logo192.png" alt="logo" />
          </div>
          <h3>Connected</h3>

          {/* Client list */}
          <div className="clientList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>

        {/* Buttons for Copy Room ID and Leave */}
        <div className="left-bottom">
          <button className="btn copyBtn">Copy ROOM ID</button>
          <button className="btn leaveBtn">Leave</button>
        </div>
      </div>

      {/* Middle section with the Editor */}
      <div className="middle">
        <Editor />
      </div>

      {/* Right section */}
      <div className="right"></div>

      {/* Bottom section */}
      <div className="bottom"></div>
    </div>
  );
};

export default EditorPage;
