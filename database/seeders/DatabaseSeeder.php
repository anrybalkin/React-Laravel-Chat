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
        for($i=0;$i<10;$i++)
        {
            $faker=Faker::create();
            $data =[
            'username' => $faker->userName(),
            'avatar' => $faker->imageUrl(100,100),
            'password' => $faker->password(),
            'firstName' => $faker->firstName(),
            'lastName' => $faker->lastName(),
            'email' => $faker->email(),
            'status' => "offline",
            'integrationName' => null,
            'integrationID'=>null
        ];
        array_push($users,["username"=>$data['username'],"fullname"=>$data['firstName']." ".$data['lastName']]);
            users::create($data);
        }

        $data =[
            'username' => "admin",
            'avatar' => $faker->imageUrl(100,100),
            'password' => "admin",
            'firstName' => $faker->firstName(),
            'lastName' => $faker->lastName(),
            'email' => $faker->email(),
            'status' => "offline",
            'integrationName' => null,
            'integrationID'=>null
        ];
        array_push($users,["username"=>$data['username'],"fullname"=>$data['firstName']." ".$data['lastName']]);

        users::create($data);
        foreach($users as $el)
        {   
            $data=[
                "chatID"=>chats::max("id")!==null?chats::max("id"):0,
                "chatName"=>$el["fullname"],
                "members"=>json_encode([$el['username'],"admin"])
            ];
            messages::create([
                "chatID"=>$data["chatID"],
                "text"=>$faker->text(128),
                "username"=>$el['username']
            ]);
            messages::create([
                "chatID"=>$data["chatID"],
                "text"=>$faker->text(128),
                "username"=>"admin"
            ]);
            chats::create($data);
        }

    }

    function uniqidReal($lenght = 13) {
        // uniqid gives 13 chars, but you could adjust it to your needs.
        if (function_exists("random_bytes")) {
            $bytes = random_bytes(ceil($lenght / 2));
        } elseif (function_exists("openssl_random_pseudo_bytes")) {
            $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
        } 
        return substr(bin2hex($bytes), 0, $lenght);
    }
}

