<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionGradeDistribution extends Model
{
    use HasFactory;

    protected $table = 'submission_grade_distribution';

    public $timestamps = false;

    protected $fillable = [
        'submission_id',
        'grade_label',
        'student_count',
    ];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(Submission::class);
    }
}
