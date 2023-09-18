<?php

include 'connectDB.php';

$PARTID 		= stripslashes(htmlspecialchars($_POST['partID']));
$EXPID 		= stripslashes(htmlspecialchars($_POST['expID']));
$TNAME 		= stripslashes(htmlspecialchars($_POST['tsName']));
$TRIAL 		= stripslashes(htmlspecialchars($_POST['trial']));

$RTS 		= stripslashes(htmlspecialchars($_POST['reactionTime']));

$SYMBOL 	= stripslashes(htmlspecialchars($_POST['symbol']));
$SYMBOLID 	= stripslashes(htmlspecialchars($_POST['symbolID']));
$SYM_PROB	= stripslashes(htmlspecialchars($_POST['symbolProb']));
$SYM_REW		= stripslashes(htmlspecialchars($_POST['symbolReward']));
$SYM_EV	= stripslashes(htmlspecialchars($_POST['symbolEv']));

$RESP_KEY 		= stripslashes(htmlspecialchars($_POST['respKey']));
$RESP_VAL	= stripslashes(htmlspecialchars($_POST['respValence']));
$RESP_COR	= stripslashes(htmlspecialchars($_POST['respCor']));

$TOTALREW 		= stripslashes(htmlspecialchars($_POST['totalReward']));
$TRIALREW 		= stripslashes(htmlspecialchars($_POST['trialReward']));

$stmt = $db->prepare("INSERT INTO TOE_ValuationUnitedValence VALUE(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, NOW())");
$stmt->bind_param("sssidiiiidiiiii",
    $PARTID,$EXPID,$TNAME,$TRIAL,
    $RTS,
    $SYMBOL,$SYMBOLID,$SYM_PROB,$SYM_REW,$SYM_EV,
    $RESP_KEY,$RESP_VAL,$RESP_COR,
    $TOTALREW,$TRIALREW);
$stmt->execute();
$err = $stmt->errno ;
$data = array(
      'error' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
