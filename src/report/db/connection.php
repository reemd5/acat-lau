<?php
$host = "localhost";
$db   = "formify";
$user = "root";      // change if needed
$pass = "";          // change if needed

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=UTF8",
        $user,
        $pass,
        [
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
} catch (PDOException $e) {
    die("DB Connection Failed: " . $e->getMessage());
}
