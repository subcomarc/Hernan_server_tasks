<?php

include 'connectDB.php';

$PARTID 		= stripslashes(htmlspecialchars($_POST['partID']));
$PARTSEX 		= stripslashes(htmlspecialchars($_POST['partSex']));
$EXPID 		= stripslashes(htmlspecialchars($_POST['expID']));


$stmt = $db->prepare("INSERT INTO BREATH_RL_IDstart VALUE(?,?,?, NOW())");
$stmt->bind_param("iss",
    $PARTID,$PARTSEX,$EXPID
    );
$stmt->execute();
$err = $stmt->errno ;
$data = array(
      'error' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
