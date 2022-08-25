import React from "react";
import Avatar from "./Avatar";
import store from "../features/reduxstore";
import {add_cookie} from "../features/lib";
import { logOut } from "../features/usersStore";

class Profile extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: store.getState().userData.user.filter(el=>{return el.username==store
                .getState()
                .currentUserStorage
                .userName})[0]
        }
        this.Logout = this
            .Logout
            .bind(this);
            
    }

    Logout(e)
    {
        
        add_cookie("loggedReact","");
        store.dispatch(logOut(this.state.user.username))
        setTimeout(() => {
            window.location.href = window
                .location
                .href
                .replace("/chat", "")
        }, 1000)
    }

    render()
    {   
        return <div className="profile">
            <Avatar
                key={this.state.user.username}
                props={{
                avatar: this.state.user.avatar,
                status: "online",
                username: this.state.user.username
            }}></Avatar>
            <div className="username">{this.state.user.username}</div>
            {store
                .getState()
                .currentUserStorage
                .integration !== "" && store
                .getState()
                .currentUserStorage
                .integration !== undefined
                ? <button
                className="profile-logut"
                        onClick={() => {
                        FB.logout()
                    }}>
                        Log out</button>
                : <button
                    className="profile-logut"
                    onClick={() => {
                    this.Logout()
                }}>
                    Log out</button>}
        </div>
    }
}
export default Profile;