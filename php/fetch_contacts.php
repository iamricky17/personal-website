<?php
session_start();
header('Content-Type: application/json');

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!isset($_SESSION['username'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

$username = $_SESSION['username'];

// Database connection
$servername = "localhost";
$db_username = "root"; // Change this if necessary
$db_password = ""; // Change this if necessary
$dbname = "personal_website"; // Your database name

$conn = new mysqli($servername, $db_username, $db_password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Fetch user contact information
$sql = "SELECT first_name, middle_name, surname, email, mobile, facebook, twitter, instagram FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $contact_info = $result->fetch_assoc();
    echo json_encode($contact_info);
} else {
    echo json_encode(['error' => 'No contact information found']);
}

$stmt->close();
$conn->close();
?>