<?php

namespace App\Http\Controllers;

use App\Models\chats;
use App\Models\messages;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MessagesController extends Controller
{
    //

    public function index() {
        $msg= messages::all();
        return view('test')->with("msg",$msg);
    }

    public function store(Request $request) {
        $message=new messages();
        $message->text=$request->json()->get("text");
        $message->username=$request->json()->get('username');
        $message->chatID=$request->json()->get('chatID');
        $message->save();

        return new Response("Ok",200);
    }
    public function create($data)
    {  
        $message=new messages();
        $message->text=$data['text'];
        $message->username=$data['username'];
        $message->chatID=$data['chatID'];
        $message->save();
    }
    public function getMessages(Request $request)
    {
        $at=$request->json()->get("at");
        $count=intval($request->json()->get("count"))==0?10:$request->json()->get("count");
        $chatID=$request->json()->get("chatID");

        if(intval($at)>0&&intval($count)>0)
        {
             $data=messages::where("chatID",$chatID)->orderByDesc("id")->get();

             $count=(count($data)-$at)>$count?$count:$count-(count($data)-$at);

            $data=array_filter($data,function($el){
                global $at,$count;
                if($el>$at&&($at+$count)<$el)
                {
                    return true;
                }
            },ARRAY_FILTER_USE_KEY);
             return new Response(json_encode(count($data)!==0?$data:["error"=>"This user doesnt exist"]),200);
        }
        else
        {
            return new Response(json_encode(messages::max("id")>10?messages::orderByDesc(messages::select()->limit(10))->get():messages::orderByDesc()->all()),200);
        }
    }

    public function searchMsg(Request $request)
    {
        if(!$request->json()->get("search")&&!$request->json()->get("username"))
        {
            $chats=chats::select("chatID")->where("members","LIKE",'%'.$request->json()->get("username").'%')->get();
            $data=[];
            foreach($chats->all as $el)
            {
                $tmp=messages::where("chatID","=",$el->chatID)->where('text', 'LIKE', '%'.$request->json()->get("search").'%')->orderByDesc("id")->get();
                if(count($tmp->all)!==0)
                {
                    $data=array_merge($tmp->all);
                }
            }
            return new Response(json_encode($data),200);
            
        }
    }

    public function getLastMessage(Request $request)
    {
        $chatID=$request->json()->get("chatID");
        if(gettype(intval($chatID))=="integer")
        {
            $data=messages::where("chatID",$chatID)->orderByDesc("id")->limit(1)->get();
            return new Response(count($data)!==0?$data:["error"=>"This chat doesnt exist"],200);
        }
        return new Response(["error"=>"Not correct data"],200);
    }
    

    public function show($id)
    {
        if(gettype(intval($id))=="integer")
        {
            $data=messages::where("id",$id)->get();
            return new Response(count($data)!==0?$data:["error"=>"This message doesnt exist"],200);
        }
        return new Response(["error"=>"Not correct data"],200);
    }
}



