<?php

include 'connectDB.php';

$PARTID 		= stripslashes(htmlspecialchars($_POST['partID']));
$EXPID 		= stripslashes(htmlspecialchars($_POST['expID']));
$TNAME 		= stripslashes(htmlspecialchars($_POST['tsName']));

$TRIAL 		= stripslashes(htmlspecialchars($_POST['trial']));
$STIM		= stripslashes(htmlspecialchars($_POST['stim']));
$BLOCK 		= stripslashes(htmlspecialchars($_POST['block']));

$TFDBT		= stripslashes(htmlspecialchars($_POST['tsFeedbackTime']));
$TBORDERT		= stripslashes(htmlspecialchars($_POST['tsBorderTime']));
$TFIX		= stripslashes(htmlspecialchars($_POST['tsTransitionMS']));

$TPAIRS 		= stripslashes(htmlspecialchars($_POST['ssPairs']));

$RTS 		= stripslashes(htmlspecialchars($_POST['reactionTime']));
$RESP 		= stripslashes(htmlspecialchars($_POST['respKey']));
$RESPKEY	= stripslashes(htmlspecialchars($_POST['respKeyID']));

$SYM_CH 	= stripslashes(htmlspecialchars($_POST['symbolChosen']));
$SYMID_CH 	= stripslashes(htmlspecialchars($_POST['symbolChosenID']));
$PROB_CH	= stripslashes(htmlspecialchars($_POST['probChosen']));
$REW_CH 		= stripslashes(htmlspecialchars($_POST['rewardChosen']));
$LOSS_CH	= stripslashes(htmlspecialchars($_POST['lossChosen']));
$RAND_CH 		= stripslashes(htmlspecialchars($_POST['randomChosen']));
$OUT_CH		= stripslashes(htmlspecialchars($_POST['outcomeChosen']));

$SYM_U		= stripslashes(htmlspecialchars($_POST['symbolUnchosen']));
$SYMID_U 	= stripslashes(htmlspecialchars($_POST['symbolUnchosenID']));
$PROB_U	= stripslashes(htmlspecialchars($_POST['probUnchosen']));
$REW_U 		= stripslashes(htmlspecialchars($_POST['rewardUnchosen']));
$LOSS_U 		= stripslashes(htmlspecialchars($_POST['lossUnchosen']));
$RAND_U     = stripslashes(htmlspecialchars($_POST['randomUnchosen']));
$OUT_U 		= stripslashes(htmlspecialchars($_POST['outcomeUnchosen']));

$TOTALREW 		= stripslashes(htmlspecialchars($_POST['totalReward']));
$CHOICE_TYPE		= stripslashes(htmlspecialchars($_POST['choiceType']));
$FDB_TYPE		= stripslashes(htmlspecialchars($_POST['feedbackType']));


$stmt = $db->prepare("INSERT INTO TOE_Preference VALUE(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?,  NOW())");
$stmt->bind_param("sssiiiiiisdisiidiidiiidiidiids",
$PARTID,$EXPID,$TNAME,
$TRIAL,$STIM,$BLOCK,
$TFDBT,$TBORDERT, $TFIX,
$TPAIRS ,
$RTS,$RESP,$RESPKEY,
$SYM_CH,$SYMID_CH, $PROB_CH, $REW_CH,$LOSS_CH,$RAND_CH,$OUT_CH,
$SYM_U,$SYMID_U, $PROB_U,$REW_U, $LOSS_U, $RAND_U, $OUT_U,
$TOTALREW,$CHOICE_TYPE,$FDB_TYPE
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
