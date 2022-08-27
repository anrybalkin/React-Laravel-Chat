import { notifyMe } from "../features/lib";
import { addMessage } from "../features/messageStore";
import store from "../features/reduxstore";
import { POST } from "./index";


export async function _SendMessage(data)
{
   const recieve_data= await POST("http://"+window.location.hostname+"/message",data).then((data) => {
        return data;
      });
      console.log(recieve_data)
      store.dispatch(addMessage({
        text: recieve_data.recieve_data.value,
        date: Date.now(),
        username: recieve_data.recieve_data.user,
        chatID: recieve_data.recieve_data.chatID,
        id:recieve_data.recieve_data.id
    }))
    notifyMe("New message from " + recieve_data.recieve_data.user);
}

export async function getLastMessage(data)
{
  return await GET("http://"+window.location.hostname+"/message/getLastMessage",data).then((data) => {
        return data;
      });
}

export async function getMessagesByChat(data)
{
  return await POST("http://"+window.location.hostname+"/message/getMessagesByChat",data).then((data) => {
    
  return data;
      });
}
export async function getAllMessages(data)
{
   return await POST("http://"+window.location.hostname+"/message/getAllMessages",data).then((data) => {
    
   return data;

      });
}

export async function searchForMessage(data)
{
  return await POST("http://"+window.location.hostname+"/message/searchMsg",data).then((data) => {
        return data;
      });
}