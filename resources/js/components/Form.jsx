import React from "react";
import store from "../features/reduxstore"
import {connect} from 'react-redux';
import { _SendMessage ,_requestMsg} from "../api/Message";
import { addMessage } from "../features/messageStore";

const mapStateToProps = (state) => ({currentUserStorage: state.currentUserStorage})

class SendMessage extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            user: store
                .getState()
                .currentUserStorage
                

                
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
            if (this.state.activeChat !== store.getState().currentUserStorage.chatActive) {
                this.setState({
                    user: store
                .getState()
                .currentUserStorage
                })
            }
        })
    }

   handleSubmit(event)
    {
        event.preventDefault();
        if (this.state.value !== "" && this.state.value !== undefined) {
            store.dispatch(addMessage({
                text: this.state.value,
                date: Date.now(),
                username: this.state.user.userName,
                user_id:this.state.user.user_id,
                chatID: this.state.user.chatActive,
                id: Math.floor(window.performance.now()+Date.now())+this.state.user.userName,
            }))
            _SendMessage({
                text: this.state.value,
                date: Date.now(),
                username: this.state.user.userName,
                user_id:this.state.user.user_id,
                chatID: this.state.user.chatActive,
            });
            
            this.setState({value: ""})
            _requestMsg({chatID: this.state.user.chatActive,user_id:this.state.user.user_id,})
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