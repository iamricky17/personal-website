<?php
session_start();
$response = array('logged_in' => false);

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $response['logged_in'] = true;
    $response['username'] = $_SESSION['username'];
}

echo json_encode($response);
?>