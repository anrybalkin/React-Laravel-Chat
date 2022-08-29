import React from "react";
import {addCurrentUser} from "../features/currentUserStorage";
import store from "../features/reduxstore";
import {add_cookie} from "../features/lib";
import jwt_decode from 'jwt-decode';
import facebocIcon from '../../img/free-icon-facebook-124010.png'
import {login, _addUser} from "../api/User";
import {createChat} from "../api/Chat";
import {initChatByServerData} from "../features/initChat";
import {initUsers} from '../features/initUsers';
import {initMsg} from '../features/initMsg';

function CallbackFB(a, b = "") {
    this.callbackLoginByMeta(a, b)
}

class Login extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            login: "",
            pass: "",
            responseGoogle: {},
            responseFB: {}
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
        this.callbackLoginBySite = this
            .callbackLoginBySite
            .bind(this);
        this.callbackLoginByGoogle = this
            .callbackLoginByGoogle
            .bind(this);
        this.callbackLoginByMeta = this
            .callbackLoginByMeta
            .bind(this);
        this.LoginFB = this
            .LoginFB
            .bind(this);
        CallbackFB = CallbackFB.bind(this);
    }

    AuthGoogle(response)
    {

        const responsePayload = jwt_decode(response.credential)
        login({
            "login": responsePayload
                .name
                .toString(),
            "pass": "",
            "integrationName": "Google",
            "integrationID": responsePayload
                .sub
                .toString()
        }, this.callbackLoginByGoogle, responsePayload)
    }

    initState(user) {
        initUsers();
        initChatByServerData(user);
        initMsg(user);
    }

    LoginFB(e)
    {
        e.preventDefault();
        FB.login(function (response) {
            if (response.status === 'connected') {

                FB
                    .api('/me', function (response) {

                        FB
                            .api("/" + response.id + "/", function (response) {
                                if (response && !response.error) {
                                    login({
                                        "login": response
                                            .name
                                            .toString(),
                                        "pass": "",
                                        "integrationName": "Meta",
                                        "integrationID": response
                                            .id
                                            .toString()
                                    }, CallbackFB, response)

                                }
                            });

                    })

                // Logged into your webpage and Facebook.
            } else {
                // The person is not logged into your webpage or we are unable to tell.
            }
        }, {scope: 'public_profile,email'});
    }

    async callbackLoginByGoogle(response, data)
    {
        const responsePayload = data;
        let userID = "";
        if (response.status == "success") {
            this.initState(response.user_data.user_id);
            userID = response.user_data.user_id;
        } else {
            let user_id = await _addUser({
                avatar: responsePayload.picture,
                firstName: responsePayload.given_name,
                lastName: responsePayload.family_name,
                status: "online",
                username: responsePayload.name,
                email: responsePayload.email,
                integrationName: "Google",
                integrationID: responsePayload.sub

            });
            createChat({username: responsePayload.name, "user_id": user_id.user_id});
            userID = user_id.user_id;
            this.initState(user_id.user_id);
        }
        add_cookie("loggedReact", {
            "username": responsePayload.name,
            "logged": true,
            "activeChat": ""
        });

        store.dispatch(addCurrentUser({
            avatar: responsePayload.picture,
            firstName: responsePayload.given_name,
            lastName: responsePayload.family_name,
            status: "online",
            userName: responsePayload.name,
            email: responsePayload.email,
            integrationName: "Google",
            integrationID: responsePayload.sub,
            user_id: userID,
            chatActive: ""
        }))
        setTimeout(() => {
            window.location.href = window
                .location
                .href
                .replace("login", "chat")
        }, 2000)
    }

    async callbackLoginByMeta(response, data)
    {
        const responsePayload = data;
        let userID = "";
        if (response.status == "success") {
            this.initState(response.user_data.user_id);
            userID = response.user_data.user_id;
        } else {
            let user_id = await _addUser({
                avatar: responsePayload.picture != undefined
                    ? responsePayload.picture
                    : "",
                firstName: responsePayload.first_name != undefined
                    ? responsePayload.first_name
                    : responsePayload
                        .name
                        .split(" ")[0],
                lastName: responsePayload.last_name != undefined
                    ? responsePayload.last_name
                    : responsePayload
                        .name
                        .split(" ")[1],
                status: "online",
                username: responsePayload.name,
                email: "",
                password: "",
                integrationName: "Meta",
                integrationID: responsePayload.id

            });

            createChat({username: responsePayload.name, "user_id": user_id.user_id});
            userID = user_id.user_id;

            this.initState(user_id.user_id);
        }

        add_cookie("loggedReact", {
            username: responsePayload.name,
            logged: true,
            activeChat: ""
        });
        store.dispatch(addCurrentUser({
            avatar: responsePayload.picture != undefined
                ? responsePayload.picture
                : "",
            firstName: responsePayload.first_name != undefined
                ? responsePayload.first_name
                : responsePayload
                    .name
                    .split(" ")[0],
            lastName: responsePayload.last_name != undefined
                ? responsePayload.last_name
                : responsePayload
                    .name
                    .split(" ")[1],
            chatActive: "",
            userName: responsePayload.name,
            integrationName: "Meta",
            user_id: userID
        }))
        setTimeout(() => {
            window.location.href = window
                .location
                .href
                .replace("login", "chat")
        }, 2000)
    }

    callbackLoginBySite(response, data)
    {
        if (response.status == "success") {
            this.initState(response.user_data.user_id)

            add_cookie("loggedReact", {
                username: this.state.login,
                logged: true,
                activeChat: ""
            });
            store.dispatch(addCurrentUser({
                avatar: response.user_data.avatar,
                firstName: response.user_data.firstName,
                lastName: response.user_data.lastName,
                userName: this.state.login,
                integrationName: response.user_data.integrationName,
                integrationID: response.user_data.integrationID,
                user_id: response.user_data.user_id,
                chatActive: ""
            }))
            setTimeout(() => {
                window.location.href = window
                    .location
                    .href
                    .replace("login", "chat")
            }, 2000)
        } else {
            document
                .querySelector(".error")
                .innerHTML = "User not find. Please sign up."
        }
    }

    Login(e)
    {
        e.preventDefault();
        if ((this.state.login != "" || this.state.login.length > 3) && (this.state.pass != "" || this.state.pass.length > 3)) {

            login({
                "login": this.state.login,
                "pass": this.state.pass,
                "integrationName": "",
                "integrationID": ""
            }, this.callbackLoginBySite)
        }
    }

    async SingUp(e)
    {
        e.preventDefault();
        if ((this.state.login != "" || this.state.login.length > 3) && (this.state.pass != "" || this.state.pass.length > 3)) {
            console.log(this.state.login,this.state.pass)
            let response = await login({
                "login": this.state.login,
                "pass": this.state.pass,
                "integrationName": "",
                "integrationID": ""
            }, () => {});
            console.log(response);
            if (response.status == "error") {
                add_cookie("loggedReact", {
                    username: this.state.login,
                    logged: true,
                    activeChat: ""
                });
                let data = await _addUser({
                    avatar: "",
                    firstName: "",
                    lastName: "",
                    status: "online",
                    username: this.state.login,
                    password: this.state.pass,
                    integrationName: "",
                    integrationID: ""
                });
                createChat({username: this.state.login, "user_id": data.user_id});
                store.dispatch(addCurrentUser({
                    avatar: "",
                    firstName: "",
                    lastName: "",
                    status: "online",
                    userName: this.state.login,
                    email: "",
                    integrationName: "",
                    integrationID: "",
                    user_id: data.user_id,
                    chatActive: ""
                }))
                this.initState(data.user_id);

                setTimeout(() => {
                    window.location.href = window
                        .location
                        .href
                        .replace("login", "chat")
                }, 2000)
            } else {
                document
                    .querySelector(".error")
                    .innerHTML = "User already exist. Please login."
            }

        } else {
            document
                .querySelector(".error")
                .innerHTML = "Too short data"

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
                    <button className="login-meta" onClick={this.LoginFB}><img src={facebocIcon} alt="facebook icon"/></button>

                </div>
            </form>
        </div>
    }
}
export default Login;