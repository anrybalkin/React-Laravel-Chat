<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class messages extends Model
{
   /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'messages';
    protected $primaryKey = 'id';

    protected $attributes = [
      'chatID' => '',
      'username'=>'',
      'text'=>'',
      "user_id"=>"",
  ];
  protected $fillable =[
    'chatID',
    'username',
    'text',
    'user_id'
  ];
  protected $casts = [
    'closed_date' => 'timestamp',
];
}
