import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';

const EditorPage = () => {
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('python');
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');


    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined the room.`);
                    console.log(`${username} joined`);
                }
                setClients(clients);
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId,
                });
            });

            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                toast.success('${username} left the room.');
                setClients((prev) => {
                    return prev.filter((client) => client.socketId !== socketId);
                });
            });
        };

        init();

        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    }, []);
    const handleCompile = async () => {
        try {
            const code = codeRef.current.getValue();
            const lang = selectedLanguage;
            const input = inputValue.trim();

            // Send compilation request to server
            const response = await fetch('/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, input, lang }),
            });

            const result = await response.json();
            setOutputValue(result.output || result.error);

            // Handle any errors
            if (!result.output && result.error) {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Compilation error:', error);
            setOutputValue(error.message || 'An error occurred during compilation.');
        }
    };

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="mainWrap">
                <div className="aside">
                    <div className="asideInner">
                        <div className="logo">
                            <img className="logoImage" src="/codemate.jpg" alt="logo" />
                        </div>
                        <h3>Connected</h3>
                        <div className="clientsList">
                            {clients.map((client) => (
                                <Client key={client.socketId} username={client.username} />
                            ))}
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="btn copyBtn" onClick={copyRoomId}>
                            Copy ROOM ID
                        </button>
                        <button className="btn leaveBtn" onClick={leaveRoom}>
                            Leave
                        </button>
                    </div>
                </div>
    
                <div className="middle">
                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    language={
                        selectedLanguage === 'python'
                        ? 'python'
                        : selectedLanguage === 'cpp'
                        ? 'text/x-c++src'
                        : 'text/x-java'
                    } // Map languages to CodeMirror modes
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                />

                </div>
    
                <div className="right">
                    <div className="right-top">
                        <ChatBox socketRef={socketRef} username={location.state?.username} roomId={roomId} />
                    </div>
                    <div className="right-bottom">

                        <div className="language-selector">
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                            >
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>
                        </div>
                        <textarea
                         rows="7"
                         cols="20"
                         placeholder="Input (optional)"
                         value={inputValue}
                         onChange={(e) => setInputValue(e.target.value)}
                         style={{ resize: "vertical" }}
                        />
    
                        <button onClick={handleCompile}>Run</button>
                    </div>
                    <pre className="output">{outputValue}d</pre>
                </div>
            </div>
        </div>
    );
    
};

export default EditorPage;