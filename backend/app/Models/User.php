<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    public $timestamps = false;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password_hash',
    ];

    protected $hidden = [
        'password_hash',
    ];

    public function getAuthPassword(): string
    {
        return $this->password_hash;
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    public function hasRole($roleName): bool
    {
        return $this->roles()->where('name', $roleName)->exists();
    }

    public function campuses(): BelongsToMany
    {
        return $this->belongsToMany(Campus::class, 'user_campuses');
    }

    public function departments(): BelongsToMany
    {
        return $this->belongsToMany(Department::class, 'user_departments');
    }

    public function userRoles(): HasMany
    {
        return $this->hasMany(UserRole::class);
    }

    public function userCampuses(): HasMany
    {
        return $this->hasMany(UserCampus::class);
    }

    public function userDepartments(): HasMany
    {
        return $this->hasMany(UserDepartment::class);
    }

    public function formAssignments(): HasMany
    {
        return $this->hasMany(FormAssignment::class, 'instructor_id');
    }

    public function courseOfferings(): HasMany
    {
        return $this->hasMany(CourseOffering::class, 'instructor_id');
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class, 'user_id');
    }

    public function coordinatedSubmissions(): HasMany
    {
        return $this->hasMany(Submission::class, 'coordinator_id');
    }
}
