<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pc extends Model
{
    use HasFactory;

    protected $table = 'pcs';

    public $timestamps = false;

    protected $fillable = [
        'so_id',
        'pc_code',
        'description',
    ];

    public function so(): BelongsTo
    {
        return $this->belongsTo(So::class);
    }

    public function assessmentMethods(): BelongsToMany
    {
        return $this->belongsToMany(AssessmentMethod::class, 'pc_assessment_methods');
    }

    public function pcAssessmentMethods(): HasMany
    {
        return $this->hasMany(PcAssessmentMethod::class);
    }

    public function formAssignmentPcs(): HasMany
    {
        return $this->hasMany(FormAssignmentPc::class);
    }

    public function submissionValues(): HasMany
    {
        return $this->hasMany(SubmissionValue::class);
    }
}
