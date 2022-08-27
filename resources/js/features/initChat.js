import store from "./reduxstore";
import { addChat } from './chatStorage';
import { getChats } from "../api/Chat";


export async function initChatByServerData(userName) {
    localStorage.setItem("init", "true");
    let dataC = await getChats({ username: userName });
    for (let i = 0; i < dataC.length; i++) {
        store.dispatch(addChat({
            chatID: dataC[i].chatID,
            chatName: dataC[i].chatName,
            members: JSON.parse(dataC[i].members)
        }));
    }

}

export function initChat(userName) {
    localStorage.setItem("init", "true");
    let dataC = store.getState().userData.user;
    let idChat=store.getState().chats.chat[store.getState().chats.chat.length-1].chatID
    for (let i = 0; i < dataC.length; i++) {
        idChat++;
        store.dispatch(addChat({
            chatID: idChat,
            chatName: dataC[i].firsName+" "+dataC[i].lastName,
            members: [dataC[i].username,userName]
        }));
    }

}
