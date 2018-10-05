<?php

$servername = "localhost";
$username = "root";
$password = "";
$database = "agendadentista";

//create connection
global $conn;
$conn = mysqli_connect($servername, $username, $password, $database);

if(!$conn)
	echo "Connection failed".mysqli_connect_error();
else
	echo "Connection succesfully";


?>