<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reminder extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'text',
        'sender_user_role_id',
        'recipient_user_role_id',
    ];

    public function senderUserRole(): BelongsTo
    {
        return $this->belongsTo(UserRole::class, 'sender_user_role_id');
    }

    public function recipientUserRole(): BelongsTo
    {
        return $this->belongsTo(UserRole::class, 'recipient_user_role_id');
    }
}
