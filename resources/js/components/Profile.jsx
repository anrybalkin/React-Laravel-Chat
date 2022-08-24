import React from "react";
import Avatar from "./Avatar";
import store from "../features/reduxstore";

class Profile extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={username:store.getState().currentUserStorage.userName}
    }
render()
{
    return <div className="profile">
        <Avatar key={this.state.username} props={{avatar:"",status:"online",username:this.state.username}}></Avatar>
        <div className="username">{this.state.username}</div>
        {store.getState().currentUserStorage.integration!==""&&store.getState().currentUserStorage.integration!==undefined?<button onClick={()=>{FB.logout()}}> Log out</button>:""}
    </div>
}
}
export default Profile;