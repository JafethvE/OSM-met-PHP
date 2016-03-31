app.controller('worldmapController', ['$location', 'worldmapService', function($location, worldmapService) {
	var worldMapController = this;
	var manager = $location.search().managerID; 
	
	worldMapController.getWorldmap = function() {
		worldmapService.getCountries(manager).success(function(data) {
			var countryData = {};
			
			angular.forEach(data, function(value, key) {
					countryData[value.LandIso] = value.Status;
				});
			
			$('#world-map').vectorMap({
				map: 'world_mill',
				series: {
					regions: [{
						values: countryData,
						scale: ['#FFFFFF', '#00FF00'],
						normalizeFunction: 'polynomial'
					}]
				}
			});
		});
	};
	
	function testMethod(){
		console.log("Hoera");
	};
	
	if(manager) {
		worldMapController.getWorldmap();
	}
}
]);