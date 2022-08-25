import React from "react";
import store from "../features/reduxstore";
import Avatar from "./Avatar";
import {calculateTop, lastMsg} from "../features/lib";
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
            username: props.username,
            avatar: props.avatar,
            fname: props.firstName,
            lname: props.lastName,
            status: props.status,
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
            activeChat: store
                .getState()
                .chats
                .chat
                .filter(el => {
                    if (el.members != undefined) {
                        return JSON
                            .stringify(el.members)
                            .indexOf(this.state.username) !== -1 && JSON
                            .stringify(el.members)
                            .indexOf(this.state.humanUser) !== -1
                    } else {
                        return false;
                    }

                })[0]
                .chatID
        }))
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
        let lastMessage = lastMsg(store.getState().chats.chat.filter(el => {
            if (el.members != undefined) {
                return JSON
                    .stringify(el.members)
                    .indexOf(this.state.username) !== -1 && JSON
                    .stringify(el.members)
                    .indexOf(this.state.humanUser) !== -1
            } else {
                return false;
            }
        })[0].chatID);
        let lastText = lastMessage !== ""
            ? lastMessage.text
            : "";
        lastText = lastText.length > 50
            ? lastText.substring(0, 47) + "..."
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
            username: this.state.username,
            avatar: this.state.avatar,
            status: this.state.status
        }}/>
            <div className="user-text-data">
                <div className="user-name">
                    {this.state.fname != "" && this.state.fname != undefined && this.state.lname != "" && this.state.lname != undefined
                        ? <> <span>{this.state.fname}
                        </span> < span > {
                            this.state.lname
                        } </span></>
                        : <> <span>{this.state.username}
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