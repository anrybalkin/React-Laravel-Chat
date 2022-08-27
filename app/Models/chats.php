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
    'members'];
    protected $attributes = [
        'chatID' => '',
        'chatName'=>'',
        'members'=>'',
        'members_en'=>''
    ];
    protected $casts = [
        'closed_date' => 'timestamp',
    ];
}
