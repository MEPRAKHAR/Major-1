import React, {useState} from 'react'
import Client from '../components/Client';


const EditorPage = ()=>{
    const [clients,setClients]= useState([{socketId: 1,username: 'Prakhar'},
    {socketId: 2,username: 'Pranay'},
    ]);
    return(
        <div className = 'mainwrap'>
            <div className = 'left'>
                <div className = 'left-top'>
                    <img className = 'logo' src= '/logo192.png' alt = 'logo'/>
                </div>
            <h3> Connected </h3>
            </div>
            <div className='clientList'>
                {clients.map((client)=>(
                    <Client key={client.socketId} username = {client.username} />
                ))}

            </div>
            <button className="btn copyBtn" >
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn" >
                    Leave
                </button>

            <div className = 'middle'>
            
                 </div>
            <div className = 'right'></div>
            <div className = 'bottom'></div>
            
        </div>
    )
}

export default EditorPage