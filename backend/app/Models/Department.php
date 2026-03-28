<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'department_name',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_departments');
    }

    public function userDepartments(): HasMany
    {
        return $this->hasMany(UserDepartment::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
