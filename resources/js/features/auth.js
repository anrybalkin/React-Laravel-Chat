import { read_cookie } from "./lib";

export function isAuth()
{
    let auth =read_cookie("loggedReact");
    if(auth!='')
    {
        auth=JSON.parse(auth);
    }
    return auth!==''?auth.logged:false
}