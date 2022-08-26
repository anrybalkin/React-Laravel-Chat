import {faker} from "@faker-js/faker";
import store from "./reduxstore";
import {addChat} from './chatStorage';
import {addMessage} from "./messageStore";
import {addUser} from "./usersStore";
import {generateUID} from "./lib";
import presistedDataMsg from "../../data/messages.json"
import { Add_User } from "../api/User";

export function initUsers(userName = "") {
    localStorage.setItem("init", "true")
    let ids = [];
    let users = [];
    if (userName == "") {
        userName = JSON
            .parse(sessionStorage.getItem("logged"))
            .username
    }

    for (let i = 0; i < 10; i++) {
        let fName = faker
                .name
                .firstName(),
            lName = faker
                .name
                .lastName()
        let user = {
            avatar: faker
                .image
                .avatar(),
            firstName: fName,
            lastName: lName,
            status: i % 2 === 0
                ? "offline"
                : "online",
            username: faker
                .internet
                .userName(fName, lName),
            password: window.btoa("faker.internet.password()"),
            integrationID:"",
            integrationName:"",
            email:faker.internet.email()
        }
        let UID = generateUID();
        users.push(user);
        ids.push(UID)
        Add_User(user);
        store.dispatch(addChat({
            chatID: UID,
            chatName: user.firstName + " " + user.lastName,
            members: [user.username, userName]
        }))
    }
    return {ids, users};
}

export function initMsg(data, username = "") {
    username = username == ""
        ? store
            .getState()
            .currentUserStorage
            .userName
        : username
    if (data.ids.length === 0) {
        return;
    }
    for (let i = 0; i < data.users.length; i++) {
        store.dispatch(addMessage({
            id: generateUID(),
            text: faker
                .lorem
                .sentence(),
            date: Date.now(),
            username: username,
            chatID: data.ids[i]

        }));

        store.dispatch(addMessage({
            id: generateUID(),
            text: presistedDataMsg[Math.floor(Math.random() * 20)],
            date: Date.now() + 5000,
            username: data.users[i].username,
            chatID: data.ids[i]
        }))
    }

}

export function initChat(userName) {
    localStorage.setItem("init", "true")
    store
        .getState()
        .userData
        .user
        .forEach(el => {
            let UID = generateUID();
            if (el.username !== userName) {
                store.dispatch(addChat({
                    chatID: UID,
                    chatName: el.firstName===""?el.username:el.firstName + " " + el.lastName,
                    members: [el.username, userName]
                }))
                initMsg({"ids": [UID], "users": [el]})
            }

        })
}
