import React from "react";
import Avatar from "./Avatar";
import store from "../features/reduxstore";
import {add_cookie} from "../features/lib";
import { changeStatus } from "../api/User";

class Profile extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: store
            .getState()
            .currentUserStorage
        }
        this.Logout = this
            .Logout
            .bind(this);
           
    }

    Logout(e)
    {
        
        add_cookie("loggedReact","");
        changeStatus({username:this.state.user.id,status:"offline"});
        localStorage.setItem("persist:chatState","");
        localStorage.setItem("init","");
        setTimeout(() => {
            window.location.href = window
                .location
                .href
                .replace("login", "chat")
        }, 1000)
    }

    render()
    {    
        console.log(this.state.user,this.state.user.firstName==""&&this.state.user.lastName=="")
        return <div className="profile">
            <Avatar
                key={this.state.user.userName}
                props={{
                avatar: this.state.user.avatar!==undefined?this.state.user.avatar:"",
                status: "online",
                username: this.state.user.userName==""?this.state.user.firstName+" "+this.state.user.lastName:this.state.user.userName
            }}></Avatar>
            <div className="username">{this.state.user.firstName==""&&this.state.user.lastName==""?this.state.user.userName:this.state.user.firstName+" "+this.state.user.lastName}</div>
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