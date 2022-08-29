<?php

namespace App\Http\Controllers;

use App\Models\chats;
use Illuminate\Http\Request;
use Faker\Factory as Faker;
use App\Models\users;
use Illuminate\Http\Response;
use App\Models\messages;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($data)
    {
        $chat= new chats();
        $chat->chatID=$data['chatID'];
        $chat->chatName=$data['chatName'];
        $chat->member1=$data['member1'];
        $chat->member2=$data['member2'];
        $chat->save();

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
  

    public function createChat(Request $request)
    {
        $faker=Faker::create();
        foreach(users::all() as $user)
        {
        $chatID=chats::count("id")!==null?chats::count("id"):0;  
        $username=json_decode(json_encode($user));
        if($username->id!==$request->json()->get('user_id'))
        {
            $data1=[
                "chatID"=>$chatID,
                "text"=>$faker->text(128),
                "user_id"=>$username->id,
                "username"=>$username->username
            ];
    
            $data2=[
                "chatID"=>$chatID,
                "text"=>$faker->text(128),
                "username"=>$request->json()->get('username'),
                "user_id"=>$request->json()->get('user_id')
            ];
    
            $chat= new chats();
            $chat->chatID=$chatID;
            $chat->chatName=$username->firstName!=""&&$username->lastName!=""?$username->firstName." ".$username->lastName:$username->username;
            $chat->member1=$username->id;
            $chat->member2=$request->json()->get('user_id');
            $chat->save();
    
            messages::create($data1);
            messages::create($data2);
        }
}
return new Response(json_encode(["status"=>"ok"]),200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(gettype(intval($id))=="integer")
        {
            $data=chats::where("id",$id)->get();
            return new Response(count($data)!==0?$data:["error"=>"This chat doesnt exist"],200);
        }
        return new Response(["error"=>"Not correct data"],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getChats(Request $request)
    {
        if($request->json()->get("user_id")!=null)
        {
            $data=chats::where("member1",$request->json()->get("user_id"))->orWhere("member2",$request->json()->get("user_id"))->get();
            
            return new Response(json_encode($data),200);
        }
        return new Response(json_encode(["status"=>"error","error"=>"Not correct data"]),200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
