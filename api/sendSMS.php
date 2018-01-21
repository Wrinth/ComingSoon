<?php

$url = 'https://rest.nexmo.com/sms/json';
$data = array('from' => '12016958261', 'text' => 'Hi John, Yoho Car Fixer has accepted your request on Coming-Soon!', 'to' => '16174801331', 'api_key' => '5532c049', 'api_secret' => '4f5cc627acaadb3e');

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }

var_dump($result);

?>
