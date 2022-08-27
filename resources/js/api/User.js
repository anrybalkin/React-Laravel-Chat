import {POST} from "./index";

export async function _addUser(data) {

    return await POST("http://" + window.location.hostname + "/user", data).then((data) => {

        return data;
    });

}

export async function getUsers(count) {

    return await POST("http://" + window.location.hostname + "/users/getUsers", {count: count}).then((data) => {

        return data;
    });
}
export async function changeStatus(data) {
    return await POST("http://" + window.location.hostname + "/users/updateStatus", data).then((data) => {

        return data;

    });
}
export async function login(data, callback, fresponse) {
    const response = await POST("http://" + window.location.hostname + "/user/login", data).then((data) => {

        callback(data, fresponse)

    });;
}
