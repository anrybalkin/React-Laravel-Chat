<?php

namespace App\Http\Controllers;

use App\Models\users;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\chats;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\View
     */
    public function index()
    {
        // get all the sharks
        $users = users::all();

        // load the view and pass the sharks
        return view('users.index')
            ->with('users', $users);
    }

    /**
     * Create fake data from factory
     *
     * @return \Illuminate\Http\Response
     */
    public function create($data)
    {
        $user= new users();
        $user->firstName=$data['firstName'];
        $user->lastName=$data['lastName'];
        $user->username=$data['username'];
        $user->password=$data['password'];
        $user->avatar=$data['avatar'];
        $user->status=$data['status'];
        $user->integrationName=$data['integrationName'];
        $user->integrationID=$data['integrationID'];
        $user->email=$data['email'];
        $user->save();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addUser(Request $request)
    {
        if($request->json()!="")
        {
            
            $user= new users();
        $user->firstName=$request->json()->get('firstName');
        $user->lastName=$request->json()->get('lastName');
        $user->username=$request->json()->get('username');
        $user->password=$request->json()->get('password');
        $user->avatar=$request->json()->get('avatar');
        $user->status=$request->json()->get('status');
        $user->integrationName=$request->json()->get('integrationName');
        $user->integrationID=$request->json()->get('integrationID');
        $user->email=$request->json()->get('email');
        $user->save();
        
        return new Response(json_encode(['status' => "created","user_id"=>$user->id]),200);
    }
        else{
            return new Response(json_encode(['status' => "error","error"=>"no data"]),200);
        }
        
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
            $data=users::where("id",$id)->get();
            return new Response(count($data)!==0?$data:["error"=>"This user doesnt exist"],200);
        }
        return new Response(["error"=>"Not correct data"],200);
    }

    public function getUsers(Request $request)
    {
        
        $at=$request->json()->get("at");
        $to=$request->json()->get("to");

        if(intval($at)>0&&intval($to)>0)
        {
             $data=users::whereBetween("id",[$at,$to])->get();
             return new Response(json_encode(count($data)!==0?$data:["error"=>"This user doesnt exist"]),200);
        }
        else
        {
            return new Response(json_encode(users::max("id")>200?users::select()->limit(200)->get():users::all()),200);
        }
    }

    public function updateStatus(Request $request,$data=[])
{
    $id="";
    $status="";
    if(count($data)==0)
    {
        $id=$request->json()->get("id");
        $status=$request->json()->get("status");
    }
    else{
        $id=$data["id"];
        $status=$data["status"];
    }
    users::where("id",$id)->update(["status"=>$status]);
    return new Response(json_encode(["status"=>"Ok"]),200);

}

public function login(Request $request)
{
    if($request->json()->get("login")!==""&&($request->json()->get("pass")!==""||($request->json()->get("integrationID")!==""&&$request->json()->get("integrationName")!=="")))
    {
        $user="";
        if($request->json()->get("integrationID")==""&&$request->json()->get("integrationName")=="")
        {
            $user=users::where("username",$request->json()->get("login"))->where("password",$request->json()->get("pass"))->limit(1)->get();
           
        }
        else{
            $user=users::where("username",$request->json()->get("login"))->where("integrationID",$request->json()->get("integrationID"))->where("integrationName",$request->json()->get("integrationName"))->limit(1)->get();
        }
       
        if(count($user)>0)
        {   
            $userC=users::find($user[0]->id);
            $userC->status="online";
            $userC->save();
            return new Response(["status"=>"success","user_data"=>[
                "avatar"=>$user[0]->avatar,
            "firstName"=>$user[0]->firstName,
            "user_id"=>$user[0]->id,
            "integrationName"=>$user[0]->integrationName,
            "lastName"=>$user[0]->lastName,
            "status"=>$user[0]->status,
            "username"=>$user[0]->username,
            "integrationID"=>$user[0]->integrationID]
        ],200);
        }

        return new Response(["status"=>"error","error"=>"There is no this user registred"],200);
    }
}

public function searchUser(Request $request)
    {
        if($request->search!==""&&$request->user_id!=="")
        {
            $data=users::where("username","LIKE",'%'.$request->json()->get("search").'%')
            ->orWhere("firstName","LIKE",'%'.$request->json()->get("search").'%')->orWhere("lastName","LIKE",'%'.$request->json()->get("search").'%')->get();
            $result=[];
            if(count($data)>0)
            {
                foreach($data as $el)
                {
                    if($el->id!=null)
                    {
                        $chat=chats::where("member1",$el->id)->where("member2",$request->user_id)->orWhere("member1",$request->user_id)->where("member2",$el->id)->get()->first();
                        if($chat!=null)
                        {
                            array_push($result,["avatar"=>$el->avatar,"username"=>$el->username,"firstName"=>$el->firstName,"lastName"=>$el->lastName,"user_id"=>$el->id,"chatID"=>$chat->chatID]);
                        }
                    }
                    
                }
            }

            return new Response(json_encode($result),200);
            
        }
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

}
