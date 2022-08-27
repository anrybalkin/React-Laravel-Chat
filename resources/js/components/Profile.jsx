import React from "react";
import Avatar from "./Avatar";
import store from "../features/reduxstore";
import {add_cookie} from "../features/lib";
<<<<<<< Updated upstream
=======
import { changeStatus } from "../api/User";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        add_cookie("");
=======
        
        add_cookie("loggedReact","");
        changeStatus({username:this.state.user.id,status:"offline"});
        localStorage.setItem("persist:chatState","");
        localStorage.setItem("init","");
>>>>>>> Stashed changes
        setTimeout(() => {
            window.location.href = window
                .location
                .href
                .replace("login", "chat")
        }, 1000)
    }

    render()
    {
        return <div className="profile">
            <Avatar
                key={this.state.username}
                props={{
<<<<<<< Updated upstream
                avatar: "",
=======
                avatar: this.state.user.avatar!==undefined?this.state.user.avatar:"",
>>>>>>> Stashed changes
                status: "online",
                username: this.state.username
            }}></Avatar>
<<<<<<< Updated upstream
            <div className="username">{this.state.username}</div>
=======
            <div className="username">{this.state.user.firstName!==""&&this.state.user.lastName!==""?this.state.user.firstName+" "+this.state.user.lastName:this.state.user.username}</div>
>>>>>>> Stashed changes
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