var url = "http://localhost:8000/admin/";

angular.module('app', []);

function AdminUserEditController($scope, $http) {
    $scope.model = {};
    $scope.roles = [{
        name: 'user',
        value: 10
        }, {
        name: 'admin',
        value: 1
    }];

    $scope.load = function (id) {
        $scope.id = id;
        $http.get(url + id).
        success(function (data) {
            $scope.model = data;
        });
    }
    
    $scope.save = function () {
        $http.put(url + $scope.id, $scope.model).
        success(function (data) {
            
        });
    };
}