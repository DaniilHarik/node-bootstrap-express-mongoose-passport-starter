var url = "http://localhost:8000/admin/";

angular.module('app', []);

function AdminGroupCreateController($scope, $http) {
    $scope.model = {};
    $scope.success = false;
    $scope.validationErrors = []

  
    $scope.save = function () {
        $scope.validationErrors = [];
        $scope.success = false;
        
        $http.post(url + "groups", $scope.model).
        success(function (data) {
            if (!data.result) {
                $scope.validationErrors = data.errors;
            } else {
                $scope.success = true;
            }
        });
    };
}