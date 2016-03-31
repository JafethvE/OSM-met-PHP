app.service('worldmapService', ['$http', function($http) {
	this.getCountries = function(manager) {
		return $http.post("http://localhost/OSM-met-PHP/api/worldmap.php", {manager: manager});
	};
}]);