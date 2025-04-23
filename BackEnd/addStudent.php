<?php
require 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    $id = isset($data['id']) ? intval($data['id']) : null;
    $uni = isset($data['university']) ? mysqli_real_escape_string($conn, $data['university']) : null;

    if ($id && $uni) {
        $stmt = $conn->prepare("UPDATE students SET university = ? WHERE id = ?");
        $stmt->bind_param("si", $uni, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Student updated successfully."]);
        } else {
            echo json_encode(["error" => "Failed to update student."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Invalid input."]);
    }
}

$conn->close();