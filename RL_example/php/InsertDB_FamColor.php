<?php

include 'connectDB.php';

$PARTID 		= stripslashes(htmlspecialchars($_POST['partID']));
$EXPID 		= stripslashes(htmlspecialchars($_POST['expID']));
$TNAME 		= stripslashes(htmlspecialchars($_POST['tsName']));
$TRIAL 		= stripslashes(htmlspecialchars($_POST['trial']));

$TBORDERT		= stripslashes(htmlspecialchars($_POST['tsBorderTime']));
$TFIX		= stripslashes(htmlspecialchars($_POST['tsTransitionMS']));

$RTS 		= stripslashes(htmlspecialchars($_POST['reactionTime']));

$RESP_KEY 		= stripslashes(htmlspecialchars($_POST['respKey']));

$SYMBOL 	= stripslashes(htmlspecialchars($_POST['symbol']));
$SYMBOLID 	= stripslashes(htmlspecialchars($_POST['symbolID']));
$SYM_PROB	= stripslashes(htmlspecialchars($_POST['symbolProb']));
$SYM_REW		= stripslashes(htmlspecialchars($_POST['symbolReward']));
$SYM_COLOR	= stripslashes(htmlspecialchars($_POST['symbolColor']));
$DECOY 	= stripslashes(htmlspecialchars($_POST['DecoyImage']));
$DECOY_COLOR	= stripslashes(htmlspecialchars($_POST['DecoyColor']));

$RESP_COR	= stripslashes(htmlspecialchars($_POST['respCor']));
$TOTALREW 		= stripslashes(htmlspecialchars($_POST['totalReward']));


$stmt = $db->prepare("INSERT INTO TOE_FamColor VALUE(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?,?,?, NOW())");
$stmt->bind_param("sssiiiiiiidisisii",
    $PARTID,$EXPID,$TNAME,$TRIAL,
    $TBORDERT,$TFIX,
    $RTS,$RESP_KEY,
    $SYMBOL,$SYMBOLID,$SYM_PROB,$SYM_REW,$SYM_COLOR,
    $DECOY,$DECOY_COLOR,
    $RESP_COR,$TOTALREW);
$stmt->execute();
$err = $stmt->errno ;
$data = array(
      'error' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
