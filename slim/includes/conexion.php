<?php

$servername = "localhost";
$username = "kimberly_admin";
$password = "luhJ[00LeM6r";
$database = "kimberly_agendadentista";


//create connection
global $conn;
$conn = mysqli_connect($servername, $username, $password, $database);
if(!$conn)
	echo "Connection failed".mysqli_connect_error();
else
	echo("");


?>
