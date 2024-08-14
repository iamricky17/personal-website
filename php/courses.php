<?php
include 'db_config.php';

$sql = "SELECT * FROM courses";
$result = $conn->query($sql);

$courses = array();
while ($row = $result->fetch_assoc()) {
    $courses[] = $row;
}

echo json_encode($courses);

$conn->close();
?>