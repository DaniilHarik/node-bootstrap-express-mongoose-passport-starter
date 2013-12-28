var url = "http://localhost:8000/admin/";

angular.module('app', []);

function AdminGroupController($scope, $http) {
    $scope.model = {};
    $scope.success = false;
    $scope.validationErrors = []

    $scope.load = function (id) {
        $scope.id = id;
        $http.get(url + id).
        success(function (data) {
            $scope.model = data;
        });
    }

    $scope.save = function () {
        $scope.validationErrors = [];
        $scope.success = false;
        
        $http.put(url + $scope.id, $scope.model).
        success(function (data) {
            if (!data.result) {
                $scope.validationErrors = data.errors;
            } else {
                $scope.success = true;
            }
        });
    };
}