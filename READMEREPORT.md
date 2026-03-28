# Assessment Report PDF Generator

This project generates multi-page assessment reports in PDF format using
PHP and dompdf. The data is fetched dynamically from a MySQL database and
formatted according to ABET-style assessment reporting.

## Technologies Used
- PHP 8+
- MySQL
- dompdf
- Composer

## Folder Structure
db/connection.php for Database connection (PDO)
pdf/generate_report.php for PDF report generation logic
templates/report_template.php for dompdf HTML templates
composer.json includes dependency definitions
composer.lock includes locked dependency versions

## Setup Instructions

1. Install Dependencies
composer install

2. Configure Database
Edit db/connection.php and set your database credentials.

3. Run Local Server

4. Generate PDF

Open in browser (testing):
http://localhost/report/pdf/generate_report.php?academic_years=2024-2025,2025-2026
