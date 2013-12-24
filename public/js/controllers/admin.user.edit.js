var url = "http://localhost:8000/admin/";

angular.module('app', []);

function AdminUserEditController($scope) {
    $scope.id = '';
    
    var master = {
        name: '',
        email: 'dan@ceo.ee',
        role: 1,
        roles: [{
            name: 'user',
            id: 10
        }, {
            name: 'admin',
            id: 1
        }, ]
    };

    $scope.cancel = function () {
        $scope.form = angular.copy(master);
    };

    $scope.save = function () {
        alert(url + $scope.id);
        master = $scope.form;
        $scope.cancel();
    };

    $scope.addContact = function () {
        $scope.form.contacts.push({
            type: '',
            value: ''
        });
    };

    $scope.removeContact = function (index) {
        $scope.form.contacts.splice(index, 1);
    };

    $scope.isCancelDisabled = function () {
        return angular.equals(master, $scope.form);
    };

    $scope.isSaveDisabled = function () {
        return $scope.form.$invalid || angular.equals(master, $scope.form);
    };

    $scope.cancel();
}