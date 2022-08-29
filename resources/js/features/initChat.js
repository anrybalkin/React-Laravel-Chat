import store from "./reduxstore";
import { addChat } from './chatStorage';
import { getChats } from "../api/Chat";


export async function initChatByServerData(userName) {
    localStorage.setItem("init", "true");
    let dataC = await getChats({ user_id: userName });
    for (let i = 0; i < dataC.length; i++) {
        store.dispatch(addChat({
            chatID: dataC[i].chatID,
            chatName: dataC[i].chatName,
            members: [dataC[i].member1,dataC[i].member2]
        }));
    }

}

