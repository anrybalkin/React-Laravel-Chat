import React from "react";
import User from "./User";
import store from "../features/reduxstore"
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({userData: state.userData.user, message: state.messages.message})

class Users extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {}
    }

    resize()
    {
        document
            .querySelector(".users-container")
            .style
            .maxHeight = (window.innerHeight - 230) + "px"
    }

    componentDidMount()
    {
        window.addEventListener("resize", this.resize())
        store.subscribe(()=>{
            console.log("render",store
            .getState()
            .messages
            .message[store
                .getState()
                .messages
                .message.length-1])
            this.render()
        })
    }
    render()
    {
        
        let currentUser = store
            .getState()
            .currentUserStorage
            .userName;

        let messages = [];

        let tmp = store
            .getState()
            .messages
            .message;

        for (let i = tmp.length - 1; i >= 0; i--) {
            if (tmp[i].username !== currentUser) {
                if (JSON.stringify(messages).indexOf(tmp[i].username) === -1) {
                    messages.push(tmp[i].username);
                }
            }
        }

        let users = store
            .getState()
            .userData
            .user;
            console.log(messages);
        const renderedListItems = messages.map(el => {
            let user;
            users.forEach(element => {
                if (element.username === el) {
                    user = element;
                }

            })
            if (user != undefined) {
                return <User key={user.username}  props={user}/>
            }

        })
        return <div className="users-block">
            <h2 className="users-title">Chats</h2>
            <div className="users">

                {renderedListItems}

            </div>
        </div>
    }
}

export default connect(mapStateToProps)(Users);