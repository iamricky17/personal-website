<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    die("You must be logged in to add a course.");
}

include 'db_config.php';

$course_name = $_POST['course_name'];
$course_code = $_POST['course_code'];
$course_description = $_POST['course_description'];
$department = $_POST['department'];
$semester = $_POST['semester'];
$year = $_POST['year'];
$instructor = $_POST['instructor'];
$grade = $_POST['grade'];

$sql = "INSERT INTO courses (course_name, course_code, course_description, department, semester, year, instructor, grade)
        VALUES ('$course_name', '$course_code', '$course_description', '$department', '$semester', '$year', '$instructor', '$grade')";

if ($conn->query($sql) === TRUE) {
    // Redirect to index.html after successful registration
    header("Location: ../index.html#courses");
    exit(); // Ensure that no further code is executed
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>