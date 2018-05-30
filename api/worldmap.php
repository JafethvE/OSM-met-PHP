<?php

//Includes the Weapon class.
Require_once('Classes/WorldMapLand.class.php');

//Connects to the database.
include('database.php');

$_POST = json_decode(file_get_contents("php://input"), true);

//Initialises the array that is to be sent back.
$worldMapLands = array();

//Integer used to put the weapons in the array, so that they are properly sent back as JSon array.
$i = 0;

//Runs the query to get all weapons and, with the data from that, fills the weapons array.
$result = $database->prepare('SELECT l.landid, l.isocode, l.beschikbaar, l.naam, l.image FROM land l');
$result->execute();
$rows = $result->fetchAll(PDO::FETCH_ASSOC);

foreach($rows as $row) {
    $worldMapLand = new WorldMapLand();
	
	$worldMapLand->landIso = $row['isocode'];
	$worldMapLand->landId = $row['landid'];
	$worldMapLand->landNaam = $row['naam'];
	if($row['image'])
	{
		$worldMapLand->landImage = $row['image'];
	}
	else
	{
		$worldMapLand->landImage = "default";
	}
	
	
	if($row['beschikbaar'] == 0)
	{
		$worldMapLand->landStatus = 0;
	}
	else
	{
		$worldMapLand->landStatus = 1;
	}
	
	$worldMapLands[$i] = $worldMapLand;
	$i++;
}

$result = $database->prepare('SELECT h.land, h.doelstellingbehaald, h.bekergewonnen, h.competitiegewonnen FROM landhistorie h WHERE manager = :manager');
$result->bindValue(':manager', $_POST['manager'], PDO::PARAM_INT);
$result->execute();
$rows = $result->fetchAll(PDO::FETCH_ASSOC);

foreach($worldMapLands as $worldMapLand)
{
	foreach($rows as $row) {
	
		if($row['land'] == $worldMapLand->landId)
		{
			if($row['competitiegewonnen'] > 0)
			{
				$worldMapLand->landStatus = 4;
			}
			else if ($row['bekergewonnen'] > 0)
			{
				$worldMapLand->landStatus = 3;
			}
			else if ($row['doelstellingbehaald'] > 0)
			{
				$worldMapLand->landStatus = 2;
			}
			break;
		}
	}
}

//Encodes the weapons array to JSon.
echo json_encode($worldMapLands);
?>