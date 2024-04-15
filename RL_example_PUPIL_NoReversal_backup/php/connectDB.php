<?php



// $database="risc_human_rl";
// $host="mysql-risc.alwaysdata.net";
// $user="risc_human_rl";
// $password="PXyMGjq9QE";

$database='dec_lnc2_hernananllo';
$host='mysql-dec.alwaysdata.net';
$user='dec_palminteri';
// $password="PXyMGjq9QE";
$password='Zes;,3DHSy2mQNs';


$db = new mysqli($host, $user, $password, $database);

if (mysqli_connect_errno()) {
   printf("DB error: %s", mysqli_connect_error());
   exit();
}

?>