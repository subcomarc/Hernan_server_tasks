<?php

include 'connectDB.php';

$PARTID 		= stripslashes(htmlspecialchars($_POST['partID']));
$PROLIFICID 		= stripslashes(htmlspecialchars($_POST['prolificID']));
$EXPID 		= stripslashes(htmlspecialchars($_POST['expID']));
$WRITTENLESSON 		= stripslashes(htmlspecialchars($_POST['WrittenLesson']));

$stmt = $db->prepare("INSERT INTO TEACH_WrittenLesson VALUE(?,?,?,?, NOW())");
$stmt->bind_param("ssss",
    $PARTID,$PROLIFICID,$EXPID,$WRITTENLESSON
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
