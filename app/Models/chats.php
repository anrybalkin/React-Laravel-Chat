<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class chats extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'chats';
    protected $primaryKey = 'id';

    protected $fillable =['chatID',
    'chatName',
    'members1',"members2"];
    protected $attributes = [
        'chatID' => '',
        'chatName'=>'',
        'member1'=>'',
        'member2'=>'',
    ];
    protected $casts = [
        'closed_date' => 'timestamp',
    ];
}
