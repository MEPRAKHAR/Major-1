import React,{useState} from 'react'
import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const HomePage = ()=>{
    const navigate = useNavigate();
    const [roomId,setRoomId]=useState('');
    const [username,setUsername]=useState('');
    const createNewRoom = (e) =>{
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');

        
    };
const joinRoom = ()=>{
    if(!roomId || !username){
        toast.error('Please enter both room id and username');
        return;
    }

    navigate(`/editor/${roomId}`, {

        state:{
            username,
        },
    });

};
    return <div className='homePageWrapper'>
        <div className='formwrapper'>
            <img src = "/logo192.png" alt="change the logo "/>
            <h4 className='mainLable'>Paste ROOM ID</h4>
            <div className='inputGroup'>
                <input type="text"
                 className="inputBox" 
                 placeholder = "USERNAME"
                 onChange = {(e)=> setUsername(e.target.value)}
                 value = {username}/>
                <input type="text"
                 className="inputBox" 
                 placeholder = "ROOM ID" 
                 value = {roomId} 
                 onChange = {(e)=> setRoomId(e.target.value)}/>
                 
                
                <button className="btn joinBtn" onClick={joinRoom}>Join</button>
                <span className='createInfo'>
                    if you dont have an invite then create &nbsp;
                    <button onClick={createNewRoom} className="createNewBtn">Create Room</button>

                </span>
            </div>
        </div>
        <footer>
            <h4>
            Built with <span role="img" aria-label="love">💛</span> by <a href="https://github.com/MEPRAKHAR">Prakhar</a> & <a href="https://github.com/ikigai0822">Pranay</a>

            </h4>
        </footer>
    </div>
        
    
}

export default HomePage