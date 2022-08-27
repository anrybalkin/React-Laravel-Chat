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
        $chatID=chats::count("id")!==null?chats::count("id"):0;  
        $username=json_decode(json_encode($user));
        $data1=[
            "chatID"=>$chatID,
            "text"=>$faker->text(128),
            "username"=>$username->username
        ];

        $data2=[
            "chatID"=>$chatID,
            "text"=>$faker->text(128),
            "username"=>$request->json()->get('username')
        ];

        $chat= new chats();
        $chat->chatID=$chatID;
        $chat->chatName=$username->firstName!=""&&$username->lastName!=""?$username->firstName." ".$username->lastName:$username->username;
        $chat->members=json_encode([$username->username,$request->json()->get('username')]);
        $chat->members_en=json_encode([$username->username,$this->cyrillic_to_latin($request->json()->get('username'))]);
        $chat->save();

        messages::create($data1);
        messages::create($data2);
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

    function cyrillic_to_latin($cyrillicString) {
        $cyr = [
            'а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п',
            'р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я',
            'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П',
            'Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'
        ];
        $lat = [
            'a','b','v','g','d','e','io','zh','z','i','y','k','l','m','n','o','p',
            'r','s','t','u','f','h','ts','ch','sh','sht','a','i','y','e','yu','ya',
            'A','B','V','G','D','E','Io','Zh','Z','I','Y','K','L','M','N','O','P',
            'R','S','T','U','F','H','Ts','Ch','Sh','Sht','A','I','Y','e','Yu','Ya'
        ];
        return str_replace($cyr, $lat, $cyrillicString);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getChats(Request $request)
    {
        if($request->json()->get("username")!=null)
        {
            $data=chats::where("members","LIKE",'%'.$request->json()->get("username").'%')->get();
            if(count($data)==0)
            {
                $data=chats::where("members_en","LIKE",'%'.$this->cyrillic_to_latin($request->json()->get("username")).'%')->get();
            }
            
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
