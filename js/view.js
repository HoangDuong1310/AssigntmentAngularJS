app.controller('viewtestCtrl', function ($scope, $routeParams, $route, $rootScope, $http) {
    $rootScope.indexStudent = -1;
    $http.get('../db/Subjects.js').then(function (response) {
        $rootScope.list_subject = response.data;
        $rootScope.list_subject.forEach(ar => {
            if (ar.Id == $routeParams.id) {
                $scope.subject = angular.copy(ar);
                return;
            }
        });
        $scope.test = function () {
            if ($rootScope.student == null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Bạn chưa đăng nhập!',
                    text: 'Hãy quay lại sau khi đăng nhập!'
                });
            } else {
                Swal.fire({
                    title: 'Bắt đầu thi?',
                    text: "Bạn đã sẳn sàng!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có! Bắt đầu thi.',
                    cancelButtonText: 'Chưa'
                }).then((result) => {
                    if (result.value) {
                        window.location.href = "#!test/" + $scope.subject.Id;
                    }
                })
            }
        }
    })

});