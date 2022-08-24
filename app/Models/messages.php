<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class messages extends Model
{
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
}
