<?php

$http_origin = $_SERVER['HTTP_ORIGIN'];
$allowed = ['http://mush.vg', 'https://mush.vg', 'http://mush.twinoid.com', 'https://mush.twinoid.com', 'http://mush.twinoid.es', 'https://mush.twinoid.es'];

if (in_array($http_origin, $allowed, true)) { #Strict mode, just in case
	header("Access-Control-Allow-Origin: $http_origin");

	if (isset($_POST['url'])) {
		$url = $_POST['url'];
		if (preg_match('/^https?:\/\/astropad\.sunsky\.fr\//', $url)) { #Relay astropad.sunsky.fr only
			echo file_get_contents($url);
		}
	}
}

?>
