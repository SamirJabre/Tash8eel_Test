<?php
require 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM universities";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $students = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $students[] = $row;
        }
        echo json_encode($students);
    } else {
        echo json_encode(['message' => 'No students found.']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['message' => 'Invalid request method.']);
}

$conn->close();
?>