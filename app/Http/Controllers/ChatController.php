<?php

namespace App\Http\Controllers;

use App\Models\chats;
use Illuminate\Http\Request;
use Faker\Factory as Faker;
use App\Models\users;
use Illuminate\Http\Response;
use App\Models\messages;

class Chat extends Controller
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
        $chat->members=$data['members'];
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
        $chat= new chats();
        $chat->chatID=chats::max("id")!==null?chats::max("id"):0;
        $chat->chatName=$request->json()->get('chatName');
        $chat->members=json_encode([$user->username,$request->json()->get('username')]);
        $chat->save();

        messages::create([
            "chatID"=>$chat->chatID,
            "text"=>$faker->text(128),
            "username"=>$user->username
        ]);
        messages::create([
            "chatID"=>$chat->chatID,
            "text"=>$faker->text(128),
            "username"=>$request->json()->get('username')
        ]);
}
return new Response("Ok",200);
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
    public function edit($id)
    {
        //
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
