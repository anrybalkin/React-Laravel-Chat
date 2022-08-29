import {notifyMe} from "../features/lib";
import {addMessage} from "../features/messageStore";
import store from "../features/reduxstore";
import {POST} from "./index";

export async function _SendMessage(request) {
    fetch(window.location.origin + "/message", {
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache', 
        headers: {
           'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body:JSON.stringify(request)
        
      }).then((resp)=>{return resp.json()}).then((data)=>{
        
      });
   
}

export async function _requestMsg(req)
{
    fetch(window.location.origin + "/message/request", {
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache', 
        headers: {
           'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body:JSON.stringify(req)
        
      }).then((resp)=>{return resp.json()}).then((data)=>{
        store.dispatch(addMessage({
            text: data.value,
            date: Date.parse(data.created_at),
            username: data.username,
            chatID: req.chatID,
            user_id: data.user_id,
            id: data.id
        }))
        notifyMe("New message from " + data.username);
      });

                
}

export async function getLastMessage(data) {
    return await GET(window.location.origin + "/message/getLastMessage", data).then((data) => {
        return data;
    });
}

export async function getMessagesByChat(data) {
    return await POST(window.location.origin + "/message/getMessagesByChat", data).then((data) => {

        return data;
    });
}
export async function getAllMessages(data) {
    return await POST(window.location.origin + "/message/getAllMessages", data).then((data) => {
        return data;

    });
}

export async function searchInMessage(data) {
    console.log(data)
    return await POST(window.location.origin + "/message/searchMsg", data).then((data) => {
        console.log(data)
    return data;
    });
}