<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'text',
        'user_role_id',
    ];

    public function userRole(): BelongsTo
    {
        return $this->belongsTo(UserRole::class);
    }
}
