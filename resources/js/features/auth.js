import { read_cookie } from "./lib";

export function isAuth()
{
    let auth =read_cookie("loggedReact");
    if(auth!=null&&auth!="")
    {
        auth=JSON.parse(decodeURI(auth));
        return auth.logged
    }
    else
    {
        return false;
    }
   
}