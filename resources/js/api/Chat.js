import {POST, GET} from "./index";

export async function createChat(data) {
    return await POST(window.location.origin + "/chat", data).then((data) => {});
}

export async function searchMemers(data) {
    return await GET(window.location.origin + "/searchMemers", data).then((data) => {
        return data;
    });
}

export async function getChats(data) {
    return await POST(window.location.origin + "/chat/getChats", data).then((data) => {
        return data;

    });
}