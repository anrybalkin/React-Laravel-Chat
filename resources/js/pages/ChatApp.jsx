import React from 'react';
import Chat from '../components/Chat';
import Users from '../components/Users';
import Search from '../components/Search';
import Profile from '../components/Profile';

class ChatApp extends React.Component {

    toggle(e)
    {
        e.preventDefault();
        document.querySelector(".users-container").classList.toggle("hide");
        document.querySelector(".chat-block").classList.toggle("hide");
    }

    render()
    {
        if(window.innerWidth<1000)
        {return <div className="chatapp-container" style={{height:`${window.innerHeight}px`}}>
        <aside className='users-container hide'>
            <Profile/>
            <Search/>
            <hr className='splitter'/>
            <Users/>
        </aside>
        <button className='chat-toggle' onClick={(e)=>{this.toggle(e)}}>|||</button>
        <Chat/>
    </div>}
    else{
        return <div className="chatapp-container" style={{height:`${window.innerHeight}px`}}>
            <aside className='users-container'>
                <Profile/>
                <Search/>
                <hr className='splitter'/>
                <Users/>
            </aside>
            <Chat/>
        </div>
    }
        

    }
}
export default ChatApp;