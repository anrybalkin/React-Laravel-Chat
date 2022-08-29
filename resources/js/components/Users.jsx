import React from "react";
import User from "./User";
import store from "../features/reduxstore"
import {connect} from 'react-redux';
import CustomScroll from "./CustomScroll";
import {message} from "laravel-mix/src/Log";

const mapStateToProps = (state) => ({userData: state.userData.user, message: state.messages.message})

class Users extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {}
        this.resize = this
            .resize
            .bind(this);

    }

    resize()
    {
        document
            .querySelector(".chatapp-container")
            .style
            .heigth = window.innerHeight + "px";
    }

    componentDidMount()
    {
        this.resize();
        window.addEventListener("resize", this.resize())
        store.subscribe(() => {
            this.render()
        })
    }
    componentDidUpdate()
    {
        this.resize();
    }
    render()
    {
        let renderedListItems = {};
        let msg = store
            .getState()
            .messages
            .message.slice().sort((a, b) => {
            return a.date - b.date
        })
        let currentUser = store
            .getState()
            .currentUserStorage
            .user_id;
        let latestUsers = {};
        msg.forEach(el => {
            if (el.user_id != currentUser) {
                if (latestUsers[el.user_id] === undefined) {
                    latestUsers[el.user_id] = el.user_id;
                }
            } else {
                let userID = store
                    .getState()
                    .chats
                    .chat
                    .filter(element => {
                        return element.id == el.chatID;
                    })
                if (latestUsers[userID] === undefined) {
                    latestUsers[userID] = userID;
                }
            }
        })

        if (Object.keys(latestUsers) > 0) {
            renderedListItems = Object
                .values(latestUsers)
                .map(el => {

                    return store
                        .getState()
                        .userData
                        .user
                        .map(user => {
                            if (user.id == el) {
                                return <User
                                    touch={window.innerWidth < 1000
                                    ? true
                                    : false}
                                    key={user.username}
                                    props={user}/>
                            }
                            return false;
                        })
                })
        } else {
            renderedListItems = store
                .getState()
                .userData
                .user
                .map(user => {
                    if (user.id != currentUser) {
                        return <User
                            touch={window.innerWidth < 1000
                            ? true
                            : false}
                            key={user.id}
                            props={user}/>
                    }
                })
        }

        return <div className="users-block">
            <h2 className="users-title">Chats</h2>
            <CustomScroll
                className={"users"}
                key={window
                .performance
                .now()}>
                {renderedListItems}
            </CustomScroll>
        </div>
    }
}

export default connect(mapStateToProps)(Users);