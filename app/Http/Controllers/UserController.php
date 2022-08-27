<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    // //
    protected $table = 'Users';

    public function index() {
        return view('create');
    }
    public function store(Request $request) {
        return $request->all();
    }

    public function addUser(Request $request)
    {var_dump($request);
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $username = $request->input('username');
        $pass = $request->input('password');
        $avatar = $request->input('avatar');
        $status=$request->input('status');
        $data=array('first_name'=>$first_name,"last_name"=>$last_name,"username"=>$username,"password"=>$pass,"avatar"=>$avatar,"status"=>$status);
        DB::table($this->table)->insert($data);
        echo("succed");
    }
    public function AuthUser($username)
    {
<<<<<<< Updated upstream
        $user=DB::table($this->table)->where("username","=",$username)->get();
        var_dump($user==$username);
        return $user==$username;
    }
=======
        if($request->json()!="")
        
        {$user= new users();
        $user->firstName=$request->json()->get('firstName');
        $user->lastName=$request->json()->get('lastName');
        $user->username=$request->json()->get('username');
        $user->password=$request->json()->get('password');
        $user->avatar=$request->json()->get('avatar');
        $user->status=$request->json()->get('status');
        $user->integrationName=$request->json()->get('integrationName');
        $user->integrationID=intval($request->json()->get('integrationID'));
        $user->email=$request->json()->get('email');
        $user->save();
        
        return new Response(json_encode(['status' => "created"]),200);
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
    if($request->json()->get("login")!==""&&($request->json()->get("pass")!==""||($request->json()->get("integratonID")!==""&&$request->json()->get("integrationName")!=="")))
    {
        $user="";
        if($request->json()->get("integratonID")==""&&$request->json()->get("integrationName")=="")
        {
            $user=users::where("username",$request->json()->get("login"))->where("password",$request->json()->get("pass"))->limit(1)->get();
           
        }
        else{
            $user=users::where("username",$request->json()->get("login"))->where("integrationID",$request->json()->get("integratonID"))->where("integrationName",$request->json()->get("integrationName"))->limit(1)->get();
            
        }
        
       
        if(count($user)>0)
        {   
            $userC=users::find($user[0]->id);
            $userC->status="online";
            $userC->save();
            return new Response(["status"=>"success"],200);
        }

        return new Response(["status"=>"error","error"=>"There is no this user registred"],200);
    }
}

public function searchUser(Request $request)
{
    $get=str_replace("http://".$request->host()."/searchUser"."/","",$request->url());
    $data=[explode("=",$get)[0]=>explode("=",$get)[1]];
    return users::where("username","LIKE",'%'.htmlspecialchars($data["query"]).'%')->get();;
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

>>>>>>> Stashed changes
}
