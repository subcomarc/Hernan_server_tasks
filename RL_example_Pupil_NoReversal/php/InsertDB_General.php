<?php

include 'connectDB.php';

$PARTID 		= stripslashes(htmlspecialchars($_POST['partID']));
$PROLIFICID 		= stripslashes(htmlspecialchars($_POST['prolificID']));
$EXPID 		= stripslashes(htmlspecialchars($_POST['expID']));
$REWPOINT 		= stripslashes(htmlspecialchars($_POST['rewardPoints']));
$REWPOUNDS 		= stripslashes(htmlspecialchars($_POST['rewardPounds']));
$TOTALTIME		= stripslashes(htmlspecialchars($_POST['totalTime']));
$TEACHERID		= stripslashes(htmlspecialchars($_POST['teacherID']));
$SEENLESSON		= stripslashes(htmlspecialchars($_POST['seenLesson']));


$stmt = $db->prepare("INSERT INTO PUPIL_General VALUE(?,?,?,?,?,?,?,?, NOW())");
$stmt->bind_param("sssiddss",
    $PARTID,$PROLIFICID ,$EXPID,$REWPOINT,$REWPOUNDS ,$TOTALTIME, $TEACHERID, $SEENLESSON
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
