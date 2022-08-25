import React from "react";
import {initChat} from '../features/initstore';
import {logIn, addUser} from '../features/usersStore';
import {addCurrentUser} from "../features/currentUserStorage";
import store from "../features/reduxstore";
import {add_cookie} from "../features/lib";

class Login extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            login: "",
            pass: ""
        }
        this.Login = this
            .Login
            .bind(this);
        this.handlerChangeLogin = this
            .handlerChangeLogin
            .bind(this);
        this.handlerChangePass = this
            .handlerChangePass
            .bind(this);
        this.SingUp = this
            .SingUp
            .bind(this);
    }


    Login(e)
    {
        e.preventDefault();
        if ((this.state.login != "" || this.state.login.length > 3) && (this.state.pass != "" || this.state.pass.length > 3)) {
            let checkUser = store
                .getState()
                .userData
                .user
                .filter(el => {
                    return (el.username == this.state.login) && el.password == window.btoa(this.state.pass)
                })
            if (checkUser[0].username == this.state.login) {
                add_cookie({username: this.state.login, logged: true, activeChat: ""});
                store.dispatch(logIn(this.state.login))

                store.dispatch(addCurrentUser({
                    avatar: "",
                    firstName: "",
                    lastName: "",
                    chatActive: "",
                    userName: this.state.login,
                    integration: ""
                }))

                setTimeout(() => {
                    window.location.href = window
                        .location
                        .href
                        .replace("login", "chat")
                }, 1000)
            }
        }
    }

    SingUp(e)
    {
        e.preventDefault();
        if((this.state.login != "" || this.state.login.length > 3) && (this.state.pass != "" || this.state.pass.length > 3))
        {
        if (store.getState().userData.user.every(el=>{return el.username==this.state.login})!==true) {

            add_cookie({username: this.state.login, logged: true, activeChat: ""});
            /*fetch("http://"+window.location.host+"/addUser", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    avatar: "",
                    firstName: "",
                    lastName: "",
                    status: "online",
                    username: this.state.login,
                    password: window.btoa(this.state.pass),
                    })
              }).then(response=>{return response.json()}).then(response=>{console.log(response)});*/
            store.dispatch(addUser({
                avatar: "",
                firstName: "",
                lastName: "",
                status: "online",
                username: this.state.login,
                password: window.btoa(this.state.pass),
                config: {
                    activeChat: "",
                    integration: ""
                }
            }))

            store.dispatch(addCurrentUser({
                avatar: "",
                firstName: "",
                lastName: "",
                chatActive: "",
                userName: this.state.login,
                integration: ""
            }))

            initChat(this.state.login);

            setTimeout(() => {
                window.location.href = window
                    .location
                    .href
                    .replace("login", "chat")
            }, 1000)
        }
        else
        {
            document.querySelector(".error").innerHTML="User already exist. Please login."
        }
    }

    }
    handlerChangeLogin(e)
    {
        e.preventDefault()
        this.setState({login: e.target.value})
    }

    handlerChangePass(e)
    {
        e.preventDefault()
        this.setState({pass: e.target.value})
    }

    render()
    {
        return <div className="login-block">
            <form className="login-form">
                <label htmlFor="login-input">Login
                    <input
                        id="login-input"
                        type="text"
                        required
                        className="login-input"
                        value={this.state.login}
                        onChange={this.handlerChangeLogin}
                        placeholder="login"/>
                </label>
                <label htmlFor="login-pass">Password
                    <input
                        id="login-pass"
                        type="password"
                        required
                        className="login-input"
                        value={this.state.pass}
                        onChange={this.handlerChangePass}
                        placeholder="password"/>
                </label>
                <div className="error"></div>
                <div className="login-buttons">
                    <button className="login-button" onClick={this.Login}>Login</button>
                    <button className="login-button" onClick={this.SingUp}>Sign In</button>
                </div>
                <div className="login-buttons">
                    

                </div>
            </form>
        </div>
    }
}
export default Login;