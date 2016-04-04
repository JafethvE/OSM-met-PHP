app.service('worldmapService', ['$http', function($http) {
	this.getCountries = function(manager) {
		return $http.post("http://localhost/osm/api/worldmap.php", {manager: manager});
	};
}]);