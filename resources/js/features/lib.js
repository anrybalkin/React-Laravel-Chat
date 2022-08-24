import store from "./reduxstore";

export function FindAntoherUser(chatID, username) {
    let chat = store
        .getState()
        .chats
        .chat
        .filter(el => {
            return el.chatID == chatID
        })

    let member = chat[0]
        .members
        .filter(el => {
            return el !== username
        })
    let user = store
        .getState()
        .userData
        .user
        .filter(el => {
            return el.username === member[0]

        })

    return user[0];
}

export function getUserFromUsername(username) {
    let user = store
        .getState()
        .userData
        .user
        .filter(el => {
            return el.username === username

        })

    return user[0];
}

export function generateUID() {
    return String(performance.now()).replaceAll('.', '') + Date.now() + Math.random() * 10;
}
/**
 *
 * @param {reciever in chat} user1
 * @param {sender in chat} user2
 * @returns
 */
export function lastMsg(chatID) {
    if (chatID == "" || chatID == undefined) {
        return ""
    }
    let lastmsg = store
        .getState()
        .messages
        .message
        .filter(el => {
            return el.chatID == chatID
        })
    let result = lastmsg.length == 0
        ? ""
        : lastmsg[lastmsg.length - 1];

    return result;
}

export function getLastMessages(count, chatID, user) {
    let counter = 0;
    let result = store
        .getState()
        .messages
        .message
        .filter(el => {
            return el.chatID === chatID

        })
        .reverse()
        .map((el) => {
            if (el === undefined || counter < count) {
                return false;
            }
            let avatar = user !== el.username
                ? getUserFromUsername(chatID, el.username)
                : {}
            let position = user !== el.username
                ? "left"
                : "right";
            counter++;
            console.log(avatar, position)
            return {avatar: avatar, position: position}
        })
    return result;
}

export function notifyMe(text) {

    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        var notification = new Notification(text);
    } else if (Notification.permission !== 'denied') {
        Notification
            .requestPermission(function (permission) {

                if (permission === "granted") {
                    var notification = new Notification(text);
                }
            });
    }
}

export function add_cookie(data) {
    document.cookie = "loggedReact=" + JSON.stringify(data) + "; expires=" + new Date(new Date().setDate(30)).toGMTString() + ";"
}

export function read_cookie() {
    return document
        .cookie
        .replace(/(?:(?:^|.*;\s*)+loggedReact+\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

export function calculateTop(selector,className)
{
    let data=[];
    document.querySelectorAll(className).forEach(element=>{
        element.className+=" move";
        data.push( element);
    })

    if(document.querySelector(selector)!==null)
    {console.log(document.querySelector(selector));
        document.querySelector(selector).style.top=0;
        document.querySelector(selector).className.substring(" move","");
    }
    
    
    data=[];

    document.querySelectorAll(className).forEach(element=>{
        element.className+=" move";
        data.push( element);
    })

    for(let i=1;i<data.length;i++)
    {
        data[i].style.top=" "+i*80+"px";
    }

    data.forEach(element => {
        element.className.substring(" move","");
    });
    
}