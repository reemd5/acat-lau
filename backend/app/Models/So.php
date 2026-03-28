<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class So extends Model
{
    use HasFactory;

    protected $table = 'sos';

    public $timestamps = false;

    protected $fillable = [
        'so_code',
        'description',
        'is_active',
    ];

    public function formAssignments(): HasMany
    {
        return $this->hasMany(FormAssignment::class);
    }

    public function pcs(): HasMany
    {
        return $this->hasMany(Pc::class);
    }

    public function submissionValues(): HasMany
    {
        return $this->hasMany(SubmissionValue::class);
    }
}
