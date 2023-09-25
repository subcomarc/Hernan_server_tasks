<?php

include 'connectDB.php';

$PARTID 		= stripslashes(htmlspecialchars($_POST['partID']));
$EXPID 		= stripslashes(htmlspecialchars($_POST['expID']));
$TNAME 		= stripslashes(htmlspecialchars($_POST['tsName']));
$RTS 		= stripslashes(htmlspecialchars($_POST['reactionTime']));

$RATE_SYMBOL_0 	= stripslashes(htmlspecialchars($_POST['rate_sym_0']));
$RATE_SYMBOL_1 	= stripslashes(htmlspecialchars($_POST['rate_sym_1']));
$RATE_SYMBOL_2 	= stripslashes(htmlspecialchars($_POST['rate_sym_2']));
$RATE_SYMBOL_3 	= stripslashes(htmlspecialchars($_POST['rate_sym_3']));
$RATE_SYMBOL_4 	= stripslashes(htmlspecialchars($_POST['rate_sym_4']));
$RATE_SYMBOL_5 	= stripslashes(htmlspecialchars($_POST['rate_sym_5']));
$RATE_SYMBOL_6 	= stripslashes(htmlspecialchars($_POST['rate_sym_6']));
$RATE_SYMBOL_7 	= stripslashes(htmlspecialchars($_POST['rate_sym_7']));

$RATE_SYMBOLID_0 	= stripslashes(htmlspecialchars($_POST['rate_symID_0']));
$RATE_SYMBOLID_1 	= stripslashes(htmlspecialchars($_POST['rate_symID_1']));
$RATE_SYMBOLID_2 	= stripslashes(htmlspecialchars($_POST['rate_symID_1']));
$RATE_SYMBOLID_3 	= stripslashes(htmlspecialchars($_POST['rate_symID_3']));
$RATE_SYMBOLID_4 	= stripslashes(htmlspecialchars($_POST['rate_symID_4']));
$RATE_SYMBOLID_5 	= stripslashes(htmlspecialchars($_POST['rate_symID_5']));
$RATE_SYMBOLID_6 	= stripslashes(htmlspecialchars($_POST['rate_symID_6']));
$RATE_SYMBOLID_7 	= stripslashes(htmlspecialchars($_POST['rate_symID_7']));

$stmt = $db->prepare("INSERT INTO TOE_Order VALUE(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, NOW())");
$stmt->bind_param("sssdiiiiiiiiiiiiiiii",
    $PARTID,$EXPID,$TNAME,$RTS,
    $RATE_SYMBOL_0,$RATE_SYMBOL_1,$RATE_SYMBOL_2,$RATE_SYMBOL_3,
    $RATE_SYMBOL_4,$RATE_SYMBOL_5,$RATE_SYMBOL_6,$RATE_SYMBOL_7,
    $RATE_SYMBOLID_0,$RATE_SYMBOLID_1,$RATE_SYMBOLID_2,$RATE_SYMBOLID_3,
    $RATE_SYMBOLID_4,$RATE_SYMBOLID_5,$RATE_SYMBOLID_6,$RATE_SYMBOLID_7);

$stmt->execute();
$err = $stmt->errno ;
$data = array(
      'error' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
