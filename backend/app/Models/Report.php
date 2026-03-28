<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Report extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'start_academic_year',
        'end_academic_year',
        'generated_at',
        'report_path',
    ];

    public function reportSubmissions(): HasMany
    {
        return $this->hasMany(ReportSubmission::class);
    }

    public function submissions(): BelongsToMany
    {
        return $this->belongsToMany(Submission::class, 'report_submissions');
    }
}
