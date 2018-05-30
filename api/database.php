<?php
	//Connects to the database.
	function createDatabase()
	{
		return new PDO('mysql:host=127.0.0.1;dbname=osm;charset=utf8mb4', 'root', 'W3r447w03u3!q0!');
	}
	
	$database = null;
	
	if(!$database)
	{
		$database = createDatabase();
	}
?>