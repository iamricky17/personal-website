<?php
include 'db_config.php';

// Collect POST data
$first_name = $_POST['first_name'];
$middle_name = $_POST['middle_name'];
$surname = $_POST['surname'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$facebook = $_POST['facebook'];
$twitter = $_POST['twitter'];
$instagram = $_POST['instagram'];

// Handle file upload
$cv = $_FILES['cv']['name'];
$target_dir = "../uploads/";
$target_file = $target_dir . basename($cv);

// Check if the uploads directory exists, if not, create it
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// Move the uploaded file
if (move_uploaded_file($_FILES['cv']['tmp_name'], $target_file)) {
    $cv_path = $target_file;
} else {
    die("Sorry, there was an error uploading your file.");
}

// Save data to the database
$sql = "INSERT INTO users (first_name, middle_name, surname, username, password, email, mobile, facebook, twitter, instagram, cv)
        VALUES ('$first_name', '$middle_name', '$surname', '$username', '$password', '$email', '$mobile', '$facebook', '$twitter', '$instagram', '$cv_path')";

if ($conn->query($sql) === TRUE) {
    // Redirect to index.html after successful registration
    header("Location: ../login.html");
    exit(); // Ensure that no further code is executed
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>