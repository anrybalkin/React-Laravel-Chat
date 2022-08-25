import React from "react";
import User from "./User";
import store from "../features/reduxstore"
import {connect} from 'react-redux';
import CustomScroll from "./CustomScroll";

const mapStateToProps = (state) => ({userData: state.userData.user, message: state.messages.message})

class Users extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {}
        this.resize=this.resize.bind(this);
    }

    resize()
    {
        document.querySelector(".chatapp-container").style.heigth=window.innerHeight+"px";
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
        const renderedListItems = messages.map(el => {
            let user;
            users.forEach(element => {
                if (element.username === el) {
                    user = element;
                }

            })
            if (user != undefined) {
                return <User touch={window.innerWidth<1000?true:false} key={user.username} props={user}/>
            }

        })
        return <div className="users-block">
            <h2 className="users-title">Chats</h2>
            <CustomScroll className={"users"} key={window.performance.now()}>
                    {renderedListItems}
                </CustomScroll>
        </div>
    }
}

export default connect(mapStateToProps)(Users);