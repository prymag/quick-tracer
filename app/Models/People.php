<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class People extends Model
{
    protected $fillable = ['firstname', 'lastname', 'middlename', 'email', 'birthdate', 'gender'];
}
