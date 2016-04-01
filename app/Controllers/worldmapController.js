app.controller('worldmapController', ['$location', 'worldmapService', function($location, worldmapService) {
	var worldMapController = this;
	var manager = $location.search().managerID; 
	
	worldMapController.getWorldmap = function() {
		worldmapService.getCountries(manager).success(function(data) {
			var countryData = {};
			
			angular.forEach(data, function(value, key) {
					countryData[value.landIso] = value.status;
				});
			
			console.log(countryData);
			
			$('#world-map').vectorMap({
				map: 'world_mill',
				series: {
					regions: [{
						values: countryData,
						scale: ['#888888', '#FFFFFF', '#BBFFBB', '#66FF66', '#00FF00'],
						normalizeFunction: 'linear'
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