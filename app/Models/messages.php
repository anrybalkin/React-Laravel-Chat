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
    protected $primaryKey = 'messages_id';

    protected $attributes = [
      'chatID' => '',
      'username'=>'',
      'text'=>'',
  ];
}
