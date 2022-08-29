<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\chats;
use App\Models\messages;
use App\Models\users;
use Database\Factories\usersFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;




class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker=Faker::create();
        $users=[];
        for($i=1;$i<=10;$i++)
        {
            $firstName = $faker->firstName();
            $lastName= $faker->lastName();

            $faker=Faker::create();
            $data =[
            'username' => $faker->userName(),
            'avatar' => 'https://ui-avatars.com/api/?background='.strval(rand(0,9)).'D'.strval(rand(0,9)).'ABC&color=fff&name='. $firstName.'+'.$lastName.'&rounded=true',
            'password' => $faker->password(),
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $faker->email(),
            'status' => "offline",
            'integrationName' => null,
            'integrationID'=>null
        ];
        array_push($users,["id"=>$i,"username"=>$data['username'],"fullname"=>$data['firstName']." ".$data['lastName']]);
        users::create($data);
        }

        $firstName=$faker->firstName();
        $lastName =$faker->lastName();
        $data =[
            'username' => "admin",
            'avatar' => 'https://ui-avatars.com/api/?background='.strval(rand(0,9)).'D'.strval(rand(0,9)).'ABC&color=fff&name='. $firstName.'+'.$lastName.'&rounded=true',
            'password' => "admin",
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $faker->email(),
            'status' => "offline",
            'integrationName' => null,
            'integrationID'=>null
        ];

        
        users::create($data);
        foreach($users as $el)
        {   
                
            $data=[
                "chatID"=>chats::max("id")!==null?chats::max("id"):0,
                "chatName"=>$el["fullname"],
                "member1"=>$el['id'],
                "member2"=>11,
            ];
            messages::create([
                "chatID"=>$data["chatID"],
                "text"=>$faker->text(128),
                "username"=>$el['username'],
                "user_id"=>$el['id']
            ]);
            messages::create([
                "chatID"=>$data["chatID"],
                "text"=>$faker->text(128),
                "username"=>"admin",
                "user_id"=>11
            ]);
            messages::create([
                "chatID"=>$data["chatID"],
                "text"=>$faker->text(128),
                "username"=>$el['username'],
                "user_id"=>$el['id']
            ]);
            messages::create([
                "chatID"=>$data["chatID"],
                "text"=>$faker->text(128),
                "username"=>"admin",
                "user_id"=>11
            ]);
            chats::create($data);}
        


    }
}

