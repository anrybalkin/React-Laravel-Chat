import React from 'react';
import Chat from '../components/Chat';
import Users from '../components/Users';
import Search from '../components/Search';
import Profile from '../components/Profile';

class ChatApp extends React.Component {

    componentDidMount() {
        document
            .getElementById("app")
            .style
            .Height = window.innerHeight + "px";
    }

    render()
    {
        return <div className="chatapp-container">
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