import {POST, GET} from "./index";

export async function createChat(data) {
    return await POST("http://" + window.location.hostname + "/chat", data).then((data) => {});
}

export async function searchMemers(data) {
    return await GET("http://" + window.location.hostname + "/searchMemers", data).then((data) => {
        return data;
    });
}

export async function getChats(data) {

    return await POST("http://" + window.location.hostname + "/chat/getChats", data).then((data) => {

        return data;

    });
}