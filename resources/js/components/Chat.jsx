import React from 'react';
import {connect} from 'react-redux';
import store from '../features/reduxstore';
import Form from "./Form";
import Messages from './Messages';
import ProfileReciever from './ProfileReciever';

const mapStateToProps = (state) => ({currentUserStorage: state.currentUserStorage})

class Chat extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            activeChat: store.getState().currentUserStorage.chatActive,
        }
    }

    componentDidMount() {
        store.subscribe(() => {
            if (this.state.activeChat !== store.getState().currentUserStorage.chatActive) {
                this.setState({
                    activeChat: store
                        .getState()
                        .currentUserStorage
                        .chatActive
                })
            }

        })
    }
    render() {
        if (this.state.activeChat!== "") {
            return <div className='chat-block'>
                <ProfileReciever/>
                <hr className='splitter'/>
                <Messages/>
                <hr className='splitter'/>
                <Form/>

            </div>
        } else {
            return <div className='chat-block text-center'>
                Choose someone to talk

            </div>
        }
    }
}

export default connect(mapStateToProps)(Chat);