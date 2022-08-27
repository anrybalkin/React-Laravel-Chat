import React from "react";
import store from "../features/reduxstore";
import Message from "./Message"
import {connect} from 'react-redux';
import {getUserFromUsername} from "../features/lib";
import CustomScroll from "./CustomScroll";

const mapStateToProps = (state) => ({message: state.messages.message, currentUserStorage: state.currentUserStorage})

class Messages extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            chatActive: store
                .getState()
                .currentUserStorage
                .chatActive
                .toString(),
            userName: store
                .getState()
                .currentUserStorage
                .userName
        }
        this.resize=this.resize.bind(this);
    }
    resize()
    {
        document.querySelector(".chat-block").style.heigth=window.innerHeight+"px";
    }
    componentDidMount()
    {
        this.resize();
        window.addEventListener("resize", this.resize())
        store.subscribe(() => {
            this.setState({
                chatActive: store
                    .getState()
                    .currentUserStorage
                    .chatActive
                    .toString()
            })
        });
    }

    componentDidUpdate()
    {
        this.resize();
    }
    render()
    {
        if (store.getState().messages.message.filter(el => {
            return el.chatID == this.state.chatActive
        }).length !== 0) {
            const renderedListItems = store
                .getState()
                .messages
                .message
                .filter(el => {
                    return el.chatID == this.state.chatActive

                })
                .map((el) => {
                    if (el === undefined) {
                        return false;
                    }
                    let avatar =el.username !==this.state.userName
                        ? getUserFromUsername(el.username)
                        : {}
                    avatar = avatar !== undefined
                        ? avatar
                        : {
                            avatar: "",
                            username: "",
                            status: ""
                        };
                    let position = this.state.userName !== el.username
                        ? "left"
                        : "right";
                    return <Message
                        key={el.id}
                        props={el}
                        position={position}
                        avatar={{
                        avatar:avatar.avatar,
                        status: avatar.status,
                        username: avatar.username
                    }}/>

                })

            return <CustomScroll className={"messages"} key={window.performance.now()} >
                {renderedListItems}            
            </CustomScroll>
        } else {
            return <div className="messages reverce">
                <span className="no-msg">type something</span>
            </div>
        }
    }
}

export default connect(mapStateToProps)(Messages);