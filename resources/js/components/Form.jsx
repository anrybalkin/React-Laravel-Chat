import React from "react";
import store from "../features/reduxstore"
import {connect} from 'react-redux';
import {addMessage} from '../features/messageStore'
import {FindAntoherUser, generateUID, notifyMe} from "../features/lib";
import { _SendMessage } from "../api/Message";

const mapStateToProps = (state) => ({currentUserStorage: state.currentUserStorage})

/*window.Pusher = require('pusher-js');
Pusher.logToConsole = true;

var pusher = new Pusher('77978b6a5e88e1257e34', {cluster: 'eu'});*/

/*var channel = pusher.subscribe('private-chat',{ channelAuthorization: { endpoint: "/pusher_auth.php"}});
channel.bind('recentMsg', function(data) {
            console.log(data);
          });*/

class SendMessage extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            user: store
                .getState()
                .currentUserStorage
                .userName,
            activeChat: store
                .getState()
                .currentUserStorage
                .chatActive
                .toString()
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    componentDidMount()
    {
        store.subscribe(() => {
            if (this.state.activeChat !== store.getState().currentUserStorage.chatActive.toString()) {
                this.setState({
                    user: store
                        .getState()
                        .currentUserStorage
                        .userName,
                    activeChat: store
                        .getState()
                        .currentUserStorage
                        .chatActive
                        .toString()
                })
            }
        })
    }

    handleSubmit(event)
    {
        event.preventDefault();
        if (this.state.value !== "" && this.state.value !== undefined) {
            store.dispatch(addMessage({
                id: generateUID(),
                text: this.state.value,
                date: Date.now(),
                username: this.state.user,
                chatID: this.state.activeChat
            }));

            _SendMessage({
                text: this.state.value,
                date: Date.now(),
                username: this.state.user,
                chatID: this.state.activeChat
            });


            this.setState({value: ""})
        }
        
        
    }

    handleChange(event)
    {

        event.preventDefault()
        this.setState({value: event.target.value});
    }

    render()
    {
        return <div className="message-send">
            <form onSubmit={this.handleSubmit} className="message-form">
                <textarea
                    className="message-area"
                    name="message"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="type something"></textarea>
                <button type="submit" className="message-submit"><img src={"images/svg/send-icon.svg"} alt="send-icon"/></button>
            </form>
        </div>
    }
}

export default connect(mapStateToProps)(SendMessage);