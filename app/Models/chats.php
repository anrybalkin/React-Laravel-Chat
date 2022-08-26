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
    protected $primaryKey = 'chats_id';

    protected $attributes = [
        'chatID' => '',
        'chatName'=>'',
        'members'=>''
    ];
}
