import React from "react";
import {changeChat} from "../features/currentUserStorage";
import store from "../features/reduxstore";
import {searchInMessage} from "../api/Message";
import {searchInUsers} from "../api/User";
import Avatar from "./Avatar";



class Search extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            searchVal: "",
            searchValues: {
                "users": [],
                "msg": []
            }
        }
        this.handlerChange = this
            .handlerChange
            .bind(this)
        this.toChat = this
            .toChat
            .bind(this)
        this.debounce = this
            .debounce
            .bind(this)

    }

    componentDidMount()
    {
        document.addEventListener("click", (e) => {
            if (e.target.className.indexOf("search") === -1 && document.querySelector(".search-result") !== null) {
                this.setState({searchVal: "", searchValues: {
                    "users": [],
                    "msg": []
                }});

            }
        })
    }

    toChat(chatID, messageID)
    {
        this.setState({searchValues: {
            "users": [],
            "msg": []
        }})
        this.debounce();
        store.dispatch(changeChat({activeChat: chatID.toString()}))
 
        if(window.innerWidth<1000)
        {
            document
            .querySelector(".users-container")
            .classList
            .toggle("hide");
        document
            .querySelector(".chat-block")
            .classList
            .toggle("hide");
        }

       if(messageID!=null)
       {
        setTimeout(() => {
            if (document.getElementById(messageID) !== null) {
                document
                    .getElementById(messageID)
                    .scrollIntoView();
            }
        }, 2000)
       }
        
    }

    async handlerChange(e)
    {
        e.preventDefault();
        this.setState({searchVal: e.target.value})
        if (e.target.value != "") {
            setTimeout(this.debounce, 1000);
        }

    }

    async debounce()
    {
        console.log(this.state.searchValues);
        if (this.state.searchVal != "") {

            let result = {
                "users": [],
                "msg": []
            };
            const searchMsg = await searchInMessage({
                "search": this.state.searchVal,
                "user_id": store
                    .getState()
                    .currentUserStorage
                    .user_id
            });
            const searchUser = await searchInUsers({
                "search": this.state.searchVal,
                "user_id": store
                    .getState()
                    .currentUserStorage
                    .user_id
            });
            if (searchMsg.length != 0) {
                searchMsg.forEach(element => {
                    result
                        .msg
                        .push({text: element.text, chatID: element.chatID, id: element.id});
                });

            }
            if (searchUser.length != 0) {
                searchUser.forEach(element => {
                    result
                        .users
                        .push(element);
                });
            }

            this.setState({searchValues: result});
        }
    }

    render()
    {
        let renderlistMsg,
            renderlistUsers;
        if (this.state.searchVal != "") {
            console.log(this.state.searchValues);
            if (this.state.searchValues.users.length > 0 || this.state.searchValues.msg.length > 0) {
                if (this.state.searchValues.users.length > 0) {
                    renderlistUsers = this
                        .state
                        .searchValues
                        .users
                        .map(el => {
                            console.log(el.firstName!== "" ,el.lastName!== "")
                            return <li
                                className="search-option users"
                                key={"user" + el.user_id}
                                onClick={() => {
                                this.toChat(el.chatID, null)
                            }}>
                                <Avatar
                                    key={"ava4user" + el.user_id}
                                    props={el}
                                    options={{
                                    minify: true
                                }}></Avatar>
                                <div className="search-option-detail">
                                    {el.firstName !== "" && el.lastName !== ""
                                        ? <span>Full Name: {el.firstName +" "+ el.lastName}</span>
                                        : ""}
                                    <span>Username: {el.username}</span>
                                </div>

                            </li>
                        })
                }
                if (this.state.searchValues.msg.length > 0) {
                    renderlistMsg = this
                        .state
                        .searchValues
                        .msg
                        .map(el => {
                            return <li
                                className="search-option"
                                key={"msg" + el.id}
                                onClick={() => {
                                this.toChat(el.chatID, el.id)
                            }}>
                                {el
                                    .text
                                    .split(this.state.searchVal)[0]}<span className='search-yellow'>{this.state.searchVal}</span>{el
                                    .text
                                    .split(this.state.searchVal)[1]}
                            </li>
                        })
                }

            }

        }
        return <div className="search-panel">
            <input
                type="text"
                className="search-input"
                value={this.state.searchVal}
                onChange={this.handlerChange}
                placeholder="type something"/>
            <button className="search-submit"><img src={"images/svg/search-icon.svg"} alt="search-icon"/></button>
            {this.state.searchValues.users.length > 0 || this.state.searchValues?.msg.length > 0
                ? <div className="search-result visible">
                        <ul className="search-options">{this.state.searchValues.users.length > 0 
                                ? renderlistUsers
                                : ""} {this.state.searchValues.users.length > 0 
                                ? <hr className="splitter"></hr>
                                : ""}
                            {this.state.searchValues.msg.length > 0
                                ? renderlistMsg
                                : ""}
                        </ul>
                    </div>
                : ""}
        </div>
    }
}

export default Search