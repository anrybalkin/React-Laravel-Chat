<?php

namespace Database\Factories;

use App\Models\users;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\users>
 */
class usersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $faker= new Faker();
        return [
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
    }

}
