import { read_cookie } from "./lib";

export function isAuth()
{
    let auth =read_cookie();
    if(auth!='')
    {
        auth=JSON.parse(auth);
    }
    return auth!==''?auth.logged:false
}