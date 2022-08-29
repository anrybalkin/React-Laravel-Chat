import store from "./reduxstore";
import { addMessage } from "./messageStore";
import {getAllMessages} from '../api/Message'


export async function initMsg(user_id) {
    let dataM = await getAllMessages({ "user_id": user_id });
    for (let i = 0; i < dataM.length; i++) {
        store.dispatch(addMessage({
            id: dataM[i].id,
            text: dataM[i].text,
            date: Date.parse(dataM[i].created_at),
            username: dataM[i].username,
            chatID: dataM[i].chatID,
            user_id:dataM[i].user_id
        }));
    }

}
