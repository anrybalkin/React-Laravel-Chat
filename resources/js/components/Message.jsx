import React from "react";
import Avatar from "./Avatar";
import store from "../features/reduxstore";

class Message extends React.Component
{
    constructor(props)
    {
        super(props);

        let position = props.position;
        let avatar = props.avatar;
        props = props.props;

        this.state = {
            text: props.text,
            id:props.id,
            date: new Date(props.date).toLocaleDateString("en", {
                "hour": "numeric",
                "minute": "numeric",
                "second": "numeric"
            }),
            position: position,
            avatar:avatar
        }
    }
    componentDidMount()
    {
        document.getElementById(this.state.id).scrollIntoView()
    }
    render()
    {
        let user=store.getState().currentUserStorage.userName
        return <div className={"message " + this.state.position} id={this.state.id}>
            <div className="message-body">
                {this.state.avatar.username!==user&&this.state.avatar.username!==undefined?<Avatar key={window.performance.now()+Date.now()+this.state.avatar.username} props={this.state.avatar} options={{minify:true}}></Avatar>:""}
                <div className="message-text">{this.state.text}</div>
            </div>
            <div className="message-date">{this.state.date}</div>
        </div>
    }
}

export default Message;