import React from 'react'

const HomePage = ()=>{
    return <div className='homePageWrapper'>
        <div className='formwrapper'>
            <img src = "/logo192.png" alt="change the logo "/>
            <h4 className='mainLable'>Paste ROOM ID</h4>
            <div className='inputGroup'>
                <input type="text" className="inputBox" placeholder = "USERNAME"/>
                <input type="text" className="inputBox" placeholder = "ROOM ID"/>
                <button className="btn joinBtn">Join</button>
                <span className='createInfo'>
                    if you dont have an invite then create &nbsp;
                    <a href="" className='createNewBtn'>Create Room</a>
                </span>
            </div>
        </div>
        <footer>
            <h4>
                Built with 💛 by <a href='https://github.com/MEPRAKHAR'>Prakhar & <a href='https://github.com/ikigai0822'>Pranay</a></a>
            </h4>
        </footer>
    </div>
        
    
}

export default HomePage