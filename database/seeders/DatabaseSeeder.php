<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
<<<<<<< Updated upstream
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
=======
        $faker=Faker::create();
        $users=[];
        for($i=0;$i<10;$i++)
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
        array_push($users,["username"=>$data['username'],"fullname"=>$data['firstName']." ".$data['lastName']]);
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
        array_push($users,["username"=>$data['username'],"fullname"=>$data['firstName']." ".$data['lastName']]);
        
        users::create($data);
        foreach($users as $el)
        {   if($el['username']!="admin")
            {
                
            $data=[
                "chatID"=>chats::max("id")!==null?chats::max("id"):0,
                "chatName"=>$el["fullname"],
                "members"=>json_encode([$el['username'],"admin"]),
                "members_en"=>json_encode([$el['username'],"admin"])
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
            chats::create($data);}
        }


>>>>>>> Stashed changes
    }
}
