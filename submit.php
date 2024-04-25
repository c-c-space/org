<?php
mb_language("ja");
mb_internal_encoding("UTF-8");
date_default_timezone_set("Asia/Tokyo");

$data = json_decode(file_get_contents("php://input"), true);

$output = array(
    $data["emoji"],
    $data["size"],
    '"' . $timestamp =  date("Y-m-d H:i:s") . '"',
    '"' . $_SERVER["REMOTE_ADDR"] . '"'
);

define("LOGFILE", "29d12h44m3s/" . $data["lunar"] . ".csv");
$result = implode(',', $output);
file_put_contents(LOGFILE, $result . "\n", FILE_APPEND | LOCK_EX);
echo json_encode($output);
