import React from "react";
import Avatar from "./Avatar";
import store from "../features/reduxstore";
import {add_cookie} from "../features/lib";

class Profile extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            username: store
                .getState()
                .currentUserStorage
                .userName
        }
        this.Logout = this
            .Logout
            .bind(this);
    }

    Logout(e)
    {
        add_cookie("");
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
                key={this.state.username}
                props={{
                avatar: "",
                status: "online",
                username: this.state.username
            }}></Avatar>
            <div className="username">{this.state.username}</div>
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