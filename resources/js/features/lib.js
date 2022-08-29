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
            return el.id === member[0]

        })
    return user[0];
}

export function getUserFromUsername(user_id) {
    let user = store
        .getState()
        .userData
        .user
        .filter(el => {
            return el.username === user_id

        })

    return user[0];
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
        .message.slice().sort((a, b) => {
            return a.date - b.date
        })
        .filter(el => {
            return el.chatID == chatID
        })
    let result = lastmsg.length == 0
        ? ""
        : lastmsg[lastmsg.length-1];

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
   sessionStorage.setItem(cname,JSON.stringify(data))
    
}

export function read_cookie(cname) {
    
    return sessionStorage.getItem(cname)
    
}
