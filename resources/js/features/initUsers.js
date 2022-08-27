import store from "./reduxstore";
import {getUsers} from "../api/User";
import {addUser} from "./usersStore";

export async function initUsers() {
    let dataU = await getUsers({at: 0, to: 0});
    localStorage.setItem("init", "true")
    for (let i = 0; i < dataU.length; i++) {

        store.dispatch(addUser({
            id: dataU[i].id,
            avatar: dataU[i].avatar,
            firstName: dataU[i].firstName,
            lastName: dataU[i].lastName,
            status: "offline",
            username: dataU[i].username,
            password: window.btoa(dataU[i].password),
            integrationID: dataU[i].integrationID,
            integrationName: dataU[i].integrationName

        }))
    }
}
