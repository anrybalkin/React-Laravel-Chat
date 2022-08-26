import { Add2Server,GetData } from "./index";

export async function SendMessage(data)
{
    Add2Server("http://"+window.location.hostname+"/sendMessage",data).then((data) => {
        console.log(data);
      });;
}

export async function getLastMessage(data)
{
    GetData("http://"+window.location.hostname+"/getLastMessage",data).then((data) => {
        console.log(data);
      });
}

export async function getMessages(data)
{
    GetData("http://"+window.location.hostname+"/getMessages",data).then((data) => {
        console.log(data);
      });
}

export async function searchForMessage(data)
{
    GetData("http://"+window.location.hostname+"/search",data).then((data) => {
        console.log(data);
      });
}