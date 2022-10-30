app.controller('testCtrl', function ($scope, $routeParams, $route, $interval, $rootScope, $http) {
    $scope.index = 0;
    $scope.marks = 0;

    $http.get('../db/Subjects.js').then(function (response) {
        $rootScope.list_subject = response.data;
        $rootScope.list_subject.forEach(ar => {
            if (ar.Id == $routeParams.id) {
                $scope.subject = angular.copy(ar);
                return;
            }
        });

        $http.get('../db/Quizs/' + $routeParams.id + '.js').then(function (response) {

            $rootScope.question = response.data;
            if ($rootScope.question.length > 20 && $scope.index < $rootScope.question.length) {
                $rootScope.question.length = 20;
                shuffleArray($rootScope.question);
            }  else {
                return false;
            }

        });
        function shuffleArray(array) {
            var m = array.length,
                t, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
        

        $scope.prev = function () {
            if ($scope.index > 0) {
                $scope.index -= 1;
            }
        }
        $scope.next = function () {
            if ($scope.index + 1 <= 19) {
                $scope.index += 1;
            }
        }
        $scope.mark = function () {
            if (!$('input[name = answer]:checked').length) return;
            var ans = $('input[name = answer]:checked').val();
            if (ans == $rootScope.question[$scope.index].AnswerId) {
                $scope.index++;
                Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng bạn đã chọn đúng!',
                    text: 'Bạn được cộng ' + ($scope.question[$scope.index].Marks) / 2 + ' điểm',
                    showConfirmButton: false,
                    timer: 1200
                });
                $scope.marks += ($scope.question[$scope.index].Marks) / 2
            } else {
                $scope.index++;
                Swal.fire({
                    icon: 'error',
                    title: 'Bạn đã chọn sai',
                    showConfirmButton: false,
                    timer: 1200
                });
            }

        }

        $scope.finish = function () {
            Swal.fire({
                title: 'Bạn có chắc không?',
                text: "Bạn thật sự muốn kết thúc bài thi!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Có',
                cancelButtonText: 'Không'
            }).then((result) => {
                if (result.value) {
                    $scope.timer = 3;
                    $scope.marks += ($scope.question[$scope.index].Marks) / 2;
                    Swal.fire({
                        title: 'Kết thúc bài thi',
                        text: "Bài thi sẽ kết thúc sau 3 giây số điểm của bạn là"+ $scope.marks ,
                        icon: 'success',
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        showCancelButton: true,
                        allowOutsideClick: false,
                        timer: 4000
                    });
                    return;
                }
            })
        };


        $scope.timer = 900;
        var stop = $interval(function () {
            if ($scope.timer > 0) {
                $scope.timer -= 1;
            } else if ($scope.timer == 0) {

                Swal.fire({
                    title: 'Hết giờ làm bài',
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 4000
                });
                window.location.href = "#!viewtest/" + $scope.subject.Id;
                $interval.cancel(stop);
            }
        }, 1000);


    });


})