<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class users extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';
    protected $primaryKey = 'users_id';
    protected $attributes = [
        'username' => '',
        'avatar'=>'',
        'password'=>'',
        'firstName'=>'',
        'lastName'=>'',
        'email'=>'',
        'status'=>'offline',
        'integrationName'=>'',
        'integrationID'=>''
    ];
}

