import {POST} from "./index";

export async function _addUser(request) {

    const reqData= await POST(window.location.origin + "/user", request).then((data) => {
        return data;
    });
return reqData;
}

export async function getUsers(count) {

    return await POST(window.location.origin + "/users/getUsers", {count: count}).then((data) => {

        return data;
    });
}
export async function changeStatus(data) {
    return await POST(window.location.origin + "/users/updateStatus", data).then((data) => {

        return data;

    });
}
export async function login(request, callback, fresponse) {
    const response = await POST(window.location.origin + "/user/login", request).then((data) => {
        callback( data,fresponse)
    return data;
    });
    return response;
}


export async function searchInUsers(data) {
    console.log(data)
    return await POST(window.location.origin + "/user/searchInUsers", data).then((data) => {
        console.log(data)   
    return data;
    });
}