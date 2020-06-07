<?php
header('Content-Type: text/html; charset=utf-8');
ini_set('default_charset', 'UTF-8');

require_once "../bendovi/config.php";

$sql = "SELECT * FROM bendovi;";
$result = $link->query($sql);


$rows = array();

while($row = $result->fetch_assoc()) {
    $rows[] = $row;
 }
$link->close();
echo json_encode($rows, JSON_UNESCAPED_UNICODE);

?>