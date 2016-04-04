app.controller('worldmapController', ['$location', 'worldmapService', function($location, worldmapService) {
	var worldMapController = this;
	var manager = $location.search().managerID; 
	var countries;
	
	worldMapController.getWorldmap = function() {
		worldmapService.getCountries(manager).success(function(data) {
			var countryData = {};
			
			angular.forEach(data, function(value, key) {
					countryData[value.landIso] = value.status;
				});
			
			worldMapController.createWorldMap(countryData);
			worldMapController.countries = data;
		});
		
	};
	
	worldMapController.createWorldMap = function(countryData)
	{
		$('#world-map').vectorMap({
				map: 'world_mill',
				series: {
					regions: [{
						values: countryData,
						scale: ['#888888', '#FFFFFF', '#BBFFBB', '#66FF66', '#00FF00'],
						normalizeFunction: 'linear',
						legend: {
							vertical: true,
							title: 'Legenda',
							labelRender: function(v){
							return {
								0: 'Niet Beschikbaar.',
								1: 'Niets gewonnen.',
								2: 'Doel behaald.',
								3: 'Beker gewonnen.',
								4: 'Kampioenschap gewonnen!'
								}[v];
							}
						}
					}]
				},
				backgroundColor: '#016CD5',
				onRegionTipShow: function(e, el, code){
					var flavourText = worldMapController.getFlavourText(countryData, code);
					el.html(el.html()+' (Status: - ' + flavourText + ')');
				}
			});
	}
	
	worldMapController.getFlavourText = function(countryData, code)
	{
		var flavourText;
		if(countryData[code] == 0)
			{
				flavourText = "niet beschikbaar.";
			}
			else if(countryData[code] == 1)
			{
				flavourText = "Niets gewonnen.";
			}
			else if(countryData[code] == 2)
			{
				flavourText = "Doel behaald.";
			}
			else if(countryData[code] == 3)
			{
				flavourText = "Beker gewonnen.";
			}
			else if(countryData[code] == 4)
			{
				flavourText = "Kampioenschap gewonnen!";
			}
			else
			{
				flavourText = "Unknown."
			}
		return flavourText;
	}
	
	if(manager) {
		worldMapController.getWorldmap();
	}
}
]);