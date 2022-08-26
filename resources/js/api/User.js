import {Add2Server, GetData} from "./index";

export async function Add_User(data) {
    Add2Server("http://"+window.location.hostname+"/users",data).then((data) => {
        console.log(data);
      });

}

export async function Get_Users(count) {
    GetData("http://" + window.location.hostname + "/getUsers", {count: count}).then((data) => {
        console.log(data);
    });
}