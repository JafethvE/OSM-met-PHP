app.service('worldmapService', ['$http', function($http) {
	this.getCountries = function(manager) {
		return $http.get ("http://localhost:51009/api/Worldmap?managerID=" + manager);
	};
}]);