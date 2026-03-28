<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionValue extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'submission_id',
        'so_id',
        'pc_id',
        'average_score',
        'percentage_of_students_meeting_performance_standard',
        'performance_standard',
        'is_met',
    ];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(Submission::class);
    }

    public function so(): BelongsTo
    {
        return $this->belongsTo(So::class);
    }

    public function pc(): BelongsTo
    {
        return $this->belongsTo(Pc::class);
    }
}
