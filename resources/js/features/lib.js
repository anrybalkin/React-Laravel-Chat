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

export function add_cookie(cname,data) {
    document.cookie = cname+"=" +  JSON.stringify(data) + "; expires=" + new Date(new Date().setDate(30)).toGMTString() + ";"
    
}

export function read_cookie(cname) {
    
    let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
