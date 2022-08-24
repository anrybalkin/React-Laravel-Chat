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
        $user=DB::table($this->table)->where("username","=",$username)->get();
        var_dump($user==$username);
        return $user==$username;
    }
}
