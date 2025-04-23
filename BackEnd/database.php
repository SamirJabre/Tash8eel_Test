<?php 
$db_server="localhost";
$db_username="root";
$db_name="university_system";
$db_password="";
$conn=mysqli_connect($db_server,$db_username,$db_password,$db_name);
if($conn){
    // echo "Connected successfully<br>";
}
else{
    die("Connection failed: <br>" . mysqli_connect_error());
}    
?>