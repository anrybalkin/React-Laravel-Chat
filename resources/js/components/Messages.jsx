import React from "react";
import store from "../features/reduxstore";
import Message from "./Message"
import {connect} from 'react-redux';
import {getUserFromUsername} from "../features/lib";
import CustomScroll from "./CustomScroll";
import { getMessagesByChat } from "../api/Message";
import { addMessage } from "../features/messageStore";


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
                ,
            user_id: store
                .getState()
                .currentUserStorage
                .user_id,
                scrollPostion:0,
            evScroll:"",
            evResize:""
        }
        this.resize=this.resize.bind(this);
        
    }
    resize()
    {
        document.querySelector(".chat-block").style.heigth=window.innerHeight+"px";
    }

    async onScroll()
    {
        let at=store.getState().messages.message.filter(el=>{return el.chatID==store.getState().currentUserStorage.chatActive}).length;
        let data= await getMessagesByChat({"at":at,"count":10,"chatID":store.getState().currentUserStorage.chatActive})
        if(data.status=="new_stock")
        {
            console.log(data);
            let length= data.data.length==1?2:data.data.length;
            data=data.data;
        for (let i = 0; i < length-1; i++) {
            store.dispatch(addMessage({
                id: data[i].id,
                text: data[i].text,
                date: Date.parse(data[i].created_at),
                username: data[i].username,
                chatID: data[i].chatID,
                user_id:data[i].user_id
            }));
        }
        }
    }

    componentDidMount()
    {
        this.resize();
        let rs=window.addEventListener("resize", this.resize())
        this.setState({evResize:rs})
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
    componentWillUnmount()
    {
        removeEventListener(this.state.rs);
    }
    render()
    {
        if (store.getState().messages.message.filter(el => {
            return el.chatID == this.state.chatActive
        }).length !== 0) {
            let msg=store
            .getState()
            .messages
            .message
            .filter(el => {
                return el.chatID == this.state.chatActive

            });
            msg.sort((a, b) => {
                return a.date - b.date
            });
            const renderedListItems = 
            msg.map((el) => {
                    if (el === undefined) {
                        return false;
                    }
                    let avatar =el.user_id !==this.state.user_id
                        ? getUserFromUsername(el.username)
                        : {}
                    avatar = avatar !== undefined
                        ? avatar
                        : {
                            avatar: "",
                            username: "",
                            status: ""
                        };
                    let position = this.state.user_id !== el.user_id
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

            return <CustomScroll onScrollUp={this.onScroll} className={"messages"} key={window.performance.now()} >
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