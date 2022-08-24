import React from "react";
import {connect} from "react-redux";
import store from '../features/reduxstore';
import {FindAntoherUser} from '../features/lib';
import Avatar from "./Avatar";

const mapStateToProps = (state) => ({currentUserStorage: state.currentUserStorage})

class ProfileReciever extends React.Component
{
    constructor(props)
    {
        super(props)
        let user = {}
        if (store.getState().currentUserStorage.chatActive !== "" && store.getState().currentUserStorage.chatActive !== undefined) {
            user = FindAntoherUser(store.getState().currentUserStorage.chatActive, store.getState().currentUserStorage.userName)
        }
        this.state = {
            avatar: user.avatar,
            userName: user.username,
            status: user.status

        }

    }
    componentDidMount() {
        store.subscribe(() => {
            let user = FindAntoherUser(store.getState().currentUserStorage.chatActive, store.getState().currentUserStorage.userName)
            this.setState({avatar: user.avatar, userName: user.username, status: user.status})
        })
    }
    render()
    {
        return <div className="reciever">
            <Avatar key={this.state.userName}
                props={{
                avatar: this.state.avatar,
                userName: this.state.userName,
                status: this.state.status
            }}></Avatar>
            <div className="username">{this.state.userName}</div>
        </div>
    }
}

export default connect(mapStateToProps)(ProfileReciever);