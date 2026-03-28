<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentMethod extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'method_name',
    ];

    public function pcs(): BelongsToMany
    {
        return $this->belongsToMany(Pc::class, 'pc_assessment_methods');
    }

    public function pcAssessmentMethods(): HasMany
    {
        return $this->hasMany(PcAssessmentMethod::class);
    }
}
