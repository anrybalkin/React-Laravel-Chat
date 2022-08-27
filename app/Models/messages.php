<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class messages extends Model
{
<<<<<<< Updated upstream
    public $incrementing = true;
    protected $datatable="";
    protected $fillable = [
        'id',
        'chatID',
        'username',
        'text'
    ];
    public function addMessage()
    {
        
    }
=======
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
  ];
  protected $fillable =[
    'chatID',
    'username',
    'text',
  ];
  protected $casts = [
    'closed_date' => 'timestamp',
];
>>>>>>> Stashed changes
}
