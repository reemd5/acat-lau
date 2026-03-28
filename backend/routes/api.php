<?php

use App\Http\Controllers\AssessmentMethodController;
use App\Http\Controllers\CampusController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseOfferingController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\FormAssignmentController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PcController;
use App\Http\Controllers\ReminderController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SoController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\SubmissionGradeDistributionController;
use App\Http\Controllers\SubmissionImprovementController;
use App\Http\Controllers\SubmissionValueController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::apiResource('assignments', FormAssignmentController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('campuses', CampusController::class);
Route::apiResource('departments', DepartmentController::class);
Route::apiResource('notifications', NotificationController::class);
Route::apiResource('reminders', ReminderController::class);
Route::apiResource('courses', CourseController::class);
Route::apiResource('course-offerings', CourseOfferingController::class);
Route::apiResource('sos', SoController::class);
Route::apiResource('pcs', PcController::class);
Route::apiResource('assessment-methods', AssessmentMethodController::class);
Route::apiResource('forms', FormController::class);
Route::apiResource('form-assignments', FormAssignmentController::class);
Route::apiResource('submissions', SubmissionController::class);
Route::apiResource('submission-values', SubmissionValueController::class);
Route::apiResource('submission-grade-distributions', SubmissionGradeDistributionController::class);
Route::apiResource('submission-improvements', SubmissionImprovementController::class);
Route::apiResource('settings', SettingController::class);
Route::apiResource('reports', ReportController::class);
