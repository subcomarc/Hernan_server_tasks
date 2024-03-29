<?php

include 'connectDB.php';

$PARTID 		= stripslashes(htmlspecialchars($_POST['partID']));
$PARTSEX 		= stripslashes(htmlspecialchars($_POST['partSex']));
$PARTAGE 		= stripslashes(htmlspecialchars($_POST['partAge']));
$EXPID 		= stripslashes(htmlspecialchars($_POST['expID']));
$EXPSESSION 		= stripslashes(htmlspecialchars($_POST['expSession']));
$EXPGROUP 		= stripslashes(htmlspecialchars($_POST['expGroup']));
$EXPTESTIME 		= stripslashes(htmlspecialchars($_POST['expTestTime']));

$stmt = $db->prepare("INSERT INTO BREATH_RL_IDstart VALUE(?,?,?,?,?,?,?, NOW())");
$stmt->bind_param("sssssss",
    $PARTID,$PARTSEX,$PARTAGE,$EXPID,$EXPSESSION,$EXPGROUP,$EXPTESTIME
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
