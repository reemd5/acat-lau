<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Form extends Model
{
    use HasFactory;

    public $timestamps = true;

    public const UPDATED_AT = null;

    protected $fillable = [
        'form_name',
        'description',
        'created_at',
    ];

    public function formAssignments(): HasMany
    {
        return $this->hasMany(FormAssignment::class);
    }
}
