import React from "react";
import store from "../features/reduxstore"
import {connect} from 'react-redux';
import {addMessage} from '../features/messageStore'
import {FindAntoherUser, generateUID, notifyMe} from "../features/lib";

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
            }))
            this.setState({value: ""})
        }
        //var triggered = channel.trigger("client-newMsg", this.state.value);
        let user = FindAntoherUser(this.state.activeChat, this.state.user);
        let chatID = this.state.activeChat;
        setTimeout(() => {
            fetch("https://api.chucknorris.io/jokes/random").then((respond) => {
                return respond.json()
            }).then(data => {

                store.dispatch(addMessage({
                    id: generateUID(),
                    text: data.value,
                    date: Date.now(),
                    username: user.username,
                    chatID: chatID
                }))
                notifyMe("New message from " + user.username);
            })
        }, Math.random() * 10000);
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