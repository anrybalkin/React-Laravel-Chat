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
        sleep(rand(10,15));
        

        $user=json_decode(chats::where("chatID",$request->json()->get('chatID'))->orderByDesc("id")->limit(1)->get()[0]->members,true);
        $user=array_filter($user,function($val){
            global $request;
            return $val!=$request->json()->get('username');});
 $data=[
    "value"=>json_decode(file_get_contents("https://api.chucknorris.io/jokes/random"))->value,
    "chatID"=>$request->json()->get('chatID'),
    "user"=> $user[0],
    "id"=>messages::where("chatID",$request->json()->get('chatID'))->orderByDesc("id")->limit(1)->get()[0]->id
];
            $message=new messages();
        $message->text=$data["value"];
        $message->username=$data['user'];
        $message->chatID=$request->json()->get('chatID');
        $message->save();

        return new Response(["status"=>"ok","recieve_data"=>$data],200);
    }
    public function create($data)
    {  
        $message=new messages();
        $message->text=$data['text'];
        $message->username=$data['username'];
        $message->chatID=$data['chatID'];
        $message->save();
    }
    public function getMessagesByChat(Request $request)
    {
        $at=$request->json()->get("at");
        $count=intval($request->json()->get("count"))==0?10:$request->json()->get("count");
        $chatID=$request->json()->get("chatID");

        if(intval($at)>0&&intval($count)>0)
        {
             $data=json_decode(json_encode(messages::where("chatID",$chatID)->orderByDesc("id")->get()),true);

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
            return new Response(json_encode(messages::max("id")>10?messages::where("chatID",$chatID)->orderByDesc(messages::select()->limit(10))->get():messages::where("chatID",$chatID)->orderByDesc()->all()),200);
        }
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

    public function getAllMessages(Request $request)
    {

        $username=$request->json()->get("username");

            $chats=chats::select("chatID")->where("members","LIKE",'%'.$request->json()->get("username").'%')->get();
            if(count($chats)==0)
            {
                $chats=chats::select("chatID")->where("members_en","LIKE",'%'.$this->cyrillic_to_latin($request->json()->get("username")).'%')->get();
            }
            $data=[];
            $count=count($chats);
            for($i=0;$i<$count;$i++)
            {
                $data=array_merge($data,json_decode(json_encode(messages::where("chatID",$chats[$i]->chatID)->orderByDesc("id")->get()),true));
                
            }
            return new Response(json_encode(count($data)!==0?$data:["error"=>"This user doesnt exist"]),200);
        
    }

    public function searchMsg(Request $request)
    {
        if(!$request->json()->get("search")&&!$request->json()->get("username"))
        {
            $chats=chats::select("chatID")->where("members","LIKE",'%'.$request->json()->get("username").'%')->get();
            $data=[];
            $count=count($chats);
            for($i=0;$i<$count;$i++){
                $tmp=json_decode(json_encode(messages::where("chatID","=",$chats[$i]->chatID)->where('text', 'LIKE', '%'.$request->json()->get("search").'%')->orderByDesc("id")->get()),true);
                if(count($tmp)!==0)
                {
                    $data=array_merge($tmp);
                }
            }
            return new Response(json_encode($data),200);
            
        }
    }

    public function getLastMessage($chatID)
    {

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



