import React from "react";
import {addUser} from '../features/usersStore';
import {addCurrentUser} from "../features/currentUserStorage";
import store from "../features/reduxstore";
import {add_cookie} from "../features/lib";
<<<<<<< Updated upstream
=======
import jwt_decode from 'jwt-decode';
import facebocIcon from '../../img/free-icon-facebook-124010.png'
import {login, _addUser} from "../api/User";
import {createChat} from "../api/Chat";
import {initChatByServerData} from "../features/initChat";
import {initUsers} from '../features/initUsers';
import {initMsg} from '../features/initMsg';


function CallbackFB(a,b="")
{
    this.callbackLoginByMeta(a,b)
}
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        this.statusChangeCallback = this
            .statusChangeCallback
            .bind(this);
    }



statusChangeCallback(response) {
    switch (response.status) {
        case "connected":
            console.log(response.signedRequest);
            add_cookie({username: "fb", logged: true, activeChat: ""});
            break;
        case "not_authorized":
            break;
        default:
           break; }
=======
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
            this.LoginFB=this.LoginFB.bind(this);
        CallbackFB=CallbackFB.bind(this);
    }

AuthGoogle(response)
{
    const responsePayload = jwt_decode(response.credential)
    
    login({
        "login": responsePayload.name,
        pass: "",
        integrationName: "Gmail",
        integrationID: responsePayload.sub
    }, this.callbackLoginByGoogle,responsePayload)
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
                                    "login": response.name,
                                    pass: "",
                                    integrationName: "Meta",
                                    integrationID: response.id
                                }, CallbackFB,response)

                            }
                        });

                })

            // Logged into your webpage and Facebook.
        } else {
            // The person is not logged into your webpage or we are unable to tell.
        }
    }, {scope: 'public_profile,email'});
}

callbackLoginByGoogle(response,data)
{
    const responsePayload = data;
    if (response.status == "success") {
        this.initState(responsePayload.name);
    } else {
        _addUser({
            avatar: responsePayload.picture,
            firstName: responsePayload.given_name,
            lastName: responsePayload.family_name,
            status: "online",
            username: responsePayload.name,
            email: responsePayload.email,
            password: window.btoa(this.state.pass),
            integrationName: "Gmail",
            integrationID: responsePayload.sub

        });
        createChat({username: responsePayload.name});

        this.initState(responsePayload.name);
    }

    add_cookie("loggedReact", {
        username: responsePayload.name,
        logged: true,
        activeChat: ""
    });
    store.dispatch(addCurrentUser({
        avatar: "",
        firstName: "",
        lastName: "",
        chatActive: "",
        userName: responsePayload.name,
        integration: "gmail"
    }))
    setTimeout(() => {
        window.location.href = window
            .location
            .href
            .replace("login", "chat")
    }, 1000)
}

callbackLoginByMeta(response,data)
{
    const responsePayload = data;
    if (response.status == "success") {
        this.initState(responsePayload.name);
    } else {
        _addUser({
            avatar: responsePayload.picture!=undefined?responsePayload.picture:"",
            firstName: responsePayload.first_name!=undefined?responsePayload.first_name:responsePayload
                .name
                .split(" ")[0],
            lastName: responsePayload.last_name!=undefined?responsePayload.last_name:responsePayload
            .name
            .split(" ")[1],
            status: "online",
            username: responsePayload.name,
            email: "",
            password: "",
            integrationName: "Meta",
            integrationID: responsePayload.id

        });
        createChat({username: responsePayload.name});

        this.initState(responsePayload.name);
    }

    add_cookie("loggedReact", {
        username: responsePayload.name,
        logged: true,
        activeChat: ""
    });
    store.dispatch(addCurrentUser({
        avatar: "",
        firstName: "",
        lastName: "",
        chatActive: "",
        userName: responsePayload.name,
        integration: "Meta"
    }))
    setTimeout(() => {
        window.location.href = window
            .location
            .href
            .replace("login", "chat")
    }, 1000)
}

callbackLoginBySite(response,data)
{
    if (response.status == "success") {
        this.initState(this.state.login)

        add_cookie("loggedReact", {
            username: this.state.login,
            logged: true,
            activeChat: ""
        });

        store.dispatch(addCurrentUser({
            avatar: "",
            firstName: "",
            lastName: "",
            chatActive: "",
            userName: this.state.login,
            integrationName: "",
            integrationID: ""
        }))
        setTimeout(() => {
            window.location.href = window
                .location
                .href
                .replace("login", "chat")
        }, 1000)
>>>>>>> Stashed changes
    }
}

<<<<<<< Updated upstream
    componentDidMount()
    {
        FB
            .getLoginStatus(function (response) {
                this.statusChangeCallback(response);
            });
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

    checkLoginState() {
        // Called when a person is finished with the Login Button.
        FB
            .getLoginStatus(function (response) { // See the onlogin handler
                this.statusChangeCallback(response);
            });
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
=======
Login(e)
{
    e.preventDefault();
    console.log(store.getState().currentUserStorage, store.getState().userData);
    if ((this.state.login != "" || this.state.login.length > 3) && (this.state.pass != "" || this.state.pass.length > 3)) {
        login({
            "login": this.state.login,
            pass: this.state.pass,
            integrationName: "",
            integrationID: ""
        }, this.callbackLoginBySite)
    }
}

SingUp(e)
{
    e.preventDefault();
    if ((this.state.login != "" || this.state.login.length > 3) && (this.state.pass != "" || this.state.pass.length > 3)) {
        if (store.getState().userData.user.every(el => {
            return el.username == this.state.login
        }) !== true) {
            this.initState(this.state.login)

            add_cookie("loggedReact", {
                username: this.state.login,
                logged: true,
                activeChat: ""
            });
            store.dispatch(addUser({
                avatar: "",
                firstName: "",
                lastName: "",
                status: "online",
                username: this.state.login,
                password: window.btoa(this.state.pass),
                integrationName: "",
                integrationID: ""
            }))
            createChat({chatName: this.state.login, username: this.state.login});
            _addUser({
                avatar: "",
                firstName: "",
                lastName: "",
                status: "online",
                username: this.state.login,
                password: window.btoa(this.state.pass),
                integrationName: "",
                integrationID: ""
            });
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
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
                        className="fb-login-button"
                        data-size="medium"
                        data-auto-logout-link="true"
                        data-onlogin={() => {
                        this.checkLoginState()
                    }}></div>

                </div>
            </form>

        </div>
    }
=======
            </div>
        </form>
    </div>
}
>>>>>>> Stashed changes
}
export default Login;