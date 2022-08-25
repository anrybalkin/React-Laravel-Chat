import React from 'react';
import Chat from '../components/Chat';
import Users from '../components/Users';
import Search from '../components/Search';
import Profile from '../components/Profile';

class ChatApp extends React.Component {
    render()
    {
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
export default ChatApp;