app.controller('worldmapController', ['$location', 'worldmapService', function($location, worldmapService) {
	var worldMapController = this;
	var manager = $location.search().managerID; 
	
	worldMapController.getWorldmap = function() {
		worldmapService.getCountries(manager).success(function(data) {
			var countryData = {};
			
			angular.forEach(data, function(value, key) {
					countryData[value.landIso] = value.status;
				});
			
			$('#world-map').vectorMap({
				map: 'world_mill',
				series: {
					regions: [{
						values: countryData,
						scale: ['#FFFFFF', '#00FF00'],
						normalizeFunction: 'polynomial'
					}]
				},
				backgroundColor: '#0000FF'
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