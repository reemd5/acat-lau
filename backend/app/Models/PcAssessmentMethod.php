<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PcAssessmentMethod extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'pc_id',
        'assessment_method_id',
    ];

    public function pc(): BelongsTo
    {
        return $this->belongsTo(Pc::class);
    }

    public function assessmentMethod(): BelongsTo
    {
        return $this->belongsTo(AssessmentMethod::class);
    }
}
