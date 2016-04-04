<?php
	//Connects to the database.
	function createDatabase()
	{
		return new PDO('mysql:host=127.0.0.1;dbname=osm;charset=utf8mb4', 'root', 'root');
	}
	
	$database = null;
	
	if(!$database)
	{
		$database = createDatabase();
	}
?>