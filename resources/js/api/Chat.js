import { Add2Server,GetData } from "./index";

export async function addChat(data)
{
    Add2Server("http://"+window.location.hostname+"/addChat",data).then((data) => {
        console.log(data);
      });;
}

export async function searchMemers(data)
{
    GetData("http://"+window.location.hostname+"/searchMemers",data).then((data) => {
        console.log(data);
      });
}

export async function changeStatus(data)
{
    Add2Server("http://"+window.location.hostname+"/user-"+data.id,data).then((data) => {
        console.log(data);
      });
}