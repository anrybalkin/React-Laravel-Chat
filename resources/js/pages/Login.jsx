import React from "react";
import {initChat} from '../features/initstore';
import {logIn, addUser} from '../features/usersStore';
import {addCurrentUser} from "../features/currentUserStorage";
import store from "../features/reduxstore";
import {add_cookie} from "../features/lib";
import jwt_decode from 'jwt-decode';
import facebocIcon from  '../../img/free-icon-facebook-124010.png'

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
        window.handleCredentialResponse = this
            .AuthGoogle
            .bind(this)
    }

    AuthGoogle(response)
    {
        const responsePayload = jwt_decode(response.credential);
        console.log(responsePayload);

        if (store.getState().userData.user.every(el => {
            return el.username == responsePayload.name
        })) {
            store.dispatch(logIn(responsePayload.name))
        } else {
            store.dispatch(addUser({
                avatar: responsePayload.picture,
                firstName: responsePayload.given_name,
                lastName: responsePayload.family_name,
                status: "online",
                username: responsePayload.name,
                email: responsePayload.email,
                password: window.btoa(this.state.pass),
                config: {
                    activeChat: "",
                    integrationID: responsePayload.sub
                }
            }))
        }
        add_cookie("loggedReact",{username: responsePayload.name, logged: true, activeChat: ""});
        store.dispatch(addCurrentUser({
            avatar: "",
            firstName: "",
            lastName: "",
            chatActive: "",
            userName: responsePayload.name,
            integration: "gmail"
        }))
        initChat(responsePayload.name);
        setTimeout(() => {
            window.location.href = window
                .location
                .href
                .replace("login", "chat")
        }, 1000)
    }

    LoginFB(e)
    {
        e.preventDefault();
        FB.login(function(response) {
            if (response.status === 'connected') {
                
                FB.api('/me', function(response) {console.log(response); })
                
              // Logged into your webpage and Facebook.
            } else {
              // The person is not logged into your webpage or we are unable to tell. 
            }
          },{scope: 'public_profile,email'});
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
                add_cookie("loggedReact",{username: this.state.login, logged: true, activeChat: ""});
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
        if ((this.state.login != "" || this.state.login.length > 3) && (this.state.pass != "" || this.state.pass.length > 3)) {
            if (store.getState().userData.user.every(el => {
                return el.username == this.state.login
            }) !== true) {
                add_cookie("loggedReact",{username: this.state.login, logged: true, activeChat: ""});
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
            } else {
                document
                    .querySelector(".error")
                    .innerHTML = "User already exist. Please login."
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
                    <div
                        id="g_id_onload"
                        data-client_id="875138749844-9a10gh8kr1lsq66gthb2fn9c8tv4dtb7.apps.googleusercontent.com"
                        data-callback="handleCredentialResponse"></div>
                    <div className="g_id_signin" data-type="icon"></div>
                    <button className="login-meta" onClick={this.LoginFB}><img src={facebocIcon} alt="facebook icon"  /></button>
                        
                    

                </div>
            </form>
        </div>
    }
}
export default Login;