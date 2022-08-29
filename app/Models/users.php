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
    protected $primaryKey = 'id';
    protected $attributes = [
        'username' => '',
        'avatar'=>'',
        'password'=>'',
        'firstName'=>'',
        'lastName'=>'',
        'email'=>'',
        'status'=>'offline',
        'integrationName'=>'',
        'integrationID'=>0
    ];
    protected $fillable=[
    'username',
    'avatar',
    'password',
    'firstName',
    'lastName',
    'email',
    'status',
    'integrationName',
    'integrationID'
];
    protected $casts = [
        'closed_date' => 'timestamp',
    ];
}

