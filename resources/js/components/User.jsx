import React from "react";
import store from "../features/reduxstore";
import Avatar from "./Avatar";
import { lastMsg} from "../features/lib";
import {changeChat} from "../features/currentUserStorage";
import {connect} from "react-redux";


const mapStateToProps = (state) => ({message: state.messages.message, userData: state.userData.user})

class User extends React.Component
{

    constructor(props)
    {
        super(props);
        let touch = props.touch;
        props = props.props;
        this.state = {
            user: props,
            humanUser: store
                .getState()
                .currentUserStorage
                .userName,
            touch: touch,
            chatID: store
                .getState()
                .currentUserStorage
                .chatActive

        }

        this.clickHandler = this
            .clickHandler
            .bind(this);
    }

    clickHandler(e)
    {
        e.preventDefault();
        store.dispatch(changeChat({
            activeChat: store.getState().chats.chat.map(el => {
                return el.members[0]==this.state.user.id&& el.members[1]==store.getState().currentUserStorage.user_id?el.chatID:el.members[1]==this.state.user.id&& el.members[0]==store.getState().currentUserStorage.user_id?el.chatID:""
            }).join("")}))
        if (this.state.touch) {
            document
                .querySelector(".users-container")
                .classList
                .toggle("hide");
            document
                .querySelector(".chat-block")
                .classList
                .toggle("hide");
        }
    }

    render()
    {
        let lastMessage = lastMsg(store.getState().chats.chat.map(el => {
            return el.members[0]==this.state.user.id&& el.members[1]==store.getState().currentUserStorage.user_id?el.chatID:el.members[1]==this.state.user.id&& el.members[0]==store.getState().currentUserStorage.user_id?el.chatID:""
        }).join(""));
        let lastText = lastMessage !== ""
            ? lastMessage.text
            : "";
        let limit = window.innerWidth < 1000
            ? 40
            : 50;
        lastText = lastText.length > limit
            ? lastText.substring(0, limit - 3) + "..."
            : lastText;
        let lastDate = new Date(lastMessage.date).toLocaleString("en", {
            "month": "short",
            "day": "numeric",
            "year": "numeric"
        });
        return <><div className = "user" onClick = {
            this.clickHandler
        } > <div className="user-main-data"><Avatar
            props={{
            username: this.state.user.username,
            avatar: this.state.user.avatar,
            status: this.state.user.status
        }}/>
            <div className="user-text-data">
                <div className="user-name">
                    {this.state.user.firstName != "" && this.state.user.firstName != undefined && this.state.user.lastName != "" && this.state.user.lastName != undefined
                        ? <> <span>{this.state.user.firstName}
                        </span> < span > {
                            this.state.user.lastName
                        } </span></>
                        : <> <span>{this.state.user.username}
                        </span> </>}
                </div>
                {!lastMessage == false
                    ? <div className="user-last-msg">{lastText}</div>
                    : ""}
            </div>
        </div>
        {
            !lastMessage == false
                ? <div className="user-last-date">{lastDate}</div>
                : ""
        } </div> < hr className = 'splitter'/> </>
    }

}

export default connect(mapStateToProps)(User);