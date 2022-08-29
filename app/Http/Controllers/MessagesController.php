<?php

namespace App\Http\Controllers;

use App\Models\chats;
use App\Models\messages;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\users;

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
        $message->user_id=$request->json()->get('user_id');
        $message->save();
        
        return new Response(["status"=>"ok","id"=>$message->getKey(),"created_at"=>$message->created_at],200);
    }

    public function requestMsg(Request $request){
       
        sleep(rand(10,15));
        $user=chats::where("chatID",$request->json()->get('chatID'))->limit(1)->get()[0];
        
        $user=$user->member1==$request->json()->get('user_id')?$user->member2:$user->member1;
 $data=[
    "value"=>json_decode(file_get_contents("https://api.chucknorris.io/jokes/random"))->value,
    "chatID"=>$request->json()->get('chatID'),
    "user_id"=>$user,
    "user"=> users::where("id",$user)->get()[0]->username,
];
            $message=new messages();
        $message->text=$data["value"];
        $message->username=$data['user'];
        $message->user_id=$user;
        $message->chatID=$request->json()->get('chatID');
        $message->save();
        return new Response(["status"=>"ok","id"=>$message->getKey(),"username"=>$data['user'],"created_at"=>$message->created_at,"user_id"=>$user,"value"=>$message->text],200);
    }

    public function create($data)
    {  
        $message=new messages();
        $message->text=$data['text'];
        $message->username=$data['username'];
        $message->user_id=$data['user_id'];
        $message->chatID=$data['chatID'];
        $message->save();
    }
    public function getMessagesByChat(Request $request)
    {
        $request->at;
        $count=$request->count;
        $chatID=$request->chatID;
        if(intval($request->at)>0&&intval($count)>0)
        {
             $data=json_decode(json_encode(messages::where("chatID",$chatID)->orderBy('updated_at','DESC')->get()),true);

             if(count($data)-$request->at<=0)
             {
                return new Response(["status"=>"ok","desk"=>"no new msg"],200);
             }
             
            $result=collect();
            
             $count=(count($data)-$request->at)>$count?$count:count($data)-$request->at;
             for($i=$request->at;$i<$request->at+$count;$i++)
            {
                $result->push($data[$i]);
            }
            
             return new Response(json_encode(count($result)!==0?["status"=>"new_stock","data"=>$result]:["status"=>"fail","error"=>"There are no msg with this user"]),200);
        }
        else
        {
            return new Response(json_encode(messages::max("id")>10?messages::where("chatID",$chatID)->orderBy('updated_at','DESC')->get():messages::where("chatID",$chatID)->orderBy('updated_at','DESC')->all()),200);
        }
    }


    public function getAllMessages(Request $request)
    {


            $chats=chats::select("chatID")->where("member1",$request->json()->get("user_id"))->orWhere("member2",$request->json("user_id"))->orderBy('updated_at','DESC')->get();
            $data=[];
            $count=count($chats);
            for($i=0;$i<$count;$i++)
            {
                $tmp=messages::where("chatID",$chats[$i]->chatID)->orderBy('updated_at','DESC')->limit(10)->get();
                $data=array_merge($data,$tmp->all());
                
            }
            return new Response(json_encode(count($data)!==0?$data:["status"=>"fail","error"=>"No msg with this user"]),200);
        
    }

    public function searchMsg(Request $request)
    {
        if($request->search!=""&&$request->user_id!="")
        {
            $chats=chats::select("chatID")->where("member1",$request->user_id)->orWhere("member2",$request->user_id)->get();
   
            $count=count($chats);
            $data=[];

                for($i=0;$i<$count;$i++){
                
                    $tmp1=messages::where("chatID","=",$chats[$i]->chatID)->where('text', 'LIKE', '%'.$request->search.'%')->orderBy('updated_at','DESC')->get();
                    $tmp1=$tmp1->all();
                    if(count($tmp1)>0)
                    {
                        $data=array_merge($data,$tmp1);
                        
                    }
                }
            
            
            return new Response($data,200);
            
        }
    }

    public function getLastMessage($chatID)
    {

        if(gettype(intval($chatID))=="integer")
        {
            $data=messages::where("chatID",$chatID)->orderBy('updated_at','DESC')->limit(1)->get();
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



