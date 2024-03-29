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

$INIT_PROB	= stripslashes(htmlspecialchars($_POST['initProb']));
$RESP_PROB 		= stripslashes(htmlspecialchars($_POST['respProb']));
$RESP_DIFF	= stripslashes(htmlspecialchars($_POST['respDifference']));
$RESP_COR	= stripslashes(htmlspecialchars($_POST['respCorrect']));

$TOTALREW 		= stripslashes(htmlspecialchars($_POST['totalReward']));
$TRIALREW 		= stripslashes(htmlspecialchars($_POST['trialReward']));



$stmt = $db->prepare("INSERT INTO TEACH_E3_VSliderEV VALUE(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?, NOW())");
$stmt->bind_param("sssidiididdddidd",

    $PARTID,$EXPID,$TNAME,$TRIAL,
    $RTS,
    $SYMBOL,$SYMBOLID,$SYM_PROB,$SYM_REW,$SYM_EV,
    $INIT_PROB,$RESP_PROB,$RESP_DIFF,$RESP_COR,
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
