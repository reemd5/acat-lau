<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormAssignmentPc extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'form_assignment_id',
        'pc_id',
    ];

    public function formAssignment(): BelongsTo
    {
        return $this->belongsTo(FormAssignment::class);
    }

    public function pc(): BelongsTo
    {
        return $this->belongsTo(Pc::class);
    }
}
