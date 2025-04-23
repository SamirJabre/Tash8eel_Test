<?php

require 'database.php';
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? '';
$password = $data["password"] ?? '';

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["message" => "Email and password are required."]);
    exit;
}

$stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        // Optionally, generate a token here (JWT or session token)
        echo json_encode([
            "message" => "Login successful",
            "user_id" => $user['id']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Invalid password"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["message" => "User not found"]);
}

$conn->close();




?>