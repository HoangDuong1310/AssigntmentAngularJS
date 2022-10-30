var app = angular.module("myApp", ["ngRoute", "ngCookies"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "../html/home.html", controller: "subjectCtrl"
        })
        .when("/introduce", {
            templateUrl: "../html/Introduce.html", controller: "introCtrl"
        })
        .when("/contact", {
            templateUrl: "../html/contact.html"
        })
        .when("/feedback", {
            templateUrl: "../html/feedback.html"
        })
        .when("/q&a", {
            templateUrl: "../html/q&a.html"
        })
        .when("/login", {
            templateUrl: "../html/login.html", controller: "loginCtrl"
        })
        .when("/register", {
            templateUrl: "../html/resgiter.html", controller: "registerCtrl"
        })
        .when("/test/:id", {
            templateUrl: "../html/test.html", controller: "testCtrl"
        })
        .when("/change", {
            templateUrl: "../html/changepass.html", controller: "changepasswordCtrl",
        })
        .when("/forgot", {
            templateUrl: "../html/forgotpass.html", controller: "forgotpasswordCtrl",
        })
        .when("/updateaccount", {
            templateUrl: "../html/updateacount.html", controller: "updateCtrl",
        })
        .when("/viewtest/:id", { templateUrl: "../html/viewtest.html", controller: "viewtestCtrl" })
        .otherwise({ redirectTo: "/home" });
});
app.controller('introCtrl', function ($scope, $rootScope, $http) {
    $scope.list_subject = [];
    $rootScope.indexStudent = -1;

    $http.get('../db/Subjects.js').then(function (response) {
        $scope.list_subject = response.data;

    })

});

//hiển thị các bài thi
app.controller('subjectCtrl', function ($scope, $rootScope, $http) {
    $scope.list_subject = [];
    $rootScope.indexStudent = -1;


    $http.get('../db/Subjects.js').then(function (response) {
        $scope.list_subject = response.data;

        $scope.pageCount = Math.ceil($scope.list_subject.length / 6);

    })
    $scope.cout = 0;
    $scope.pageCount = Math.ceil($scope.list_subject.length / 6);

    $scope.prev = function () {
        if ($scope.cout > 0) {
            $scope.cout -= 6;
        }
    }
    $scope.next = function () {
        if ($scope.cout < ($scope.pageCount - 1) * 6) {
            $scope.cout += 6;
        }
    }

});
//login

app.controller('loginCtrl', function ($scope, $rootScope, $http, $cookies) {
    $http.get('https://62a4fb6f259aba8e10f08604.mockapi.io/Asm_Student/Asm_Student').then(function (response) {
        var kq = false;
        $rootScope.list_students = response.data;

        $scope.load = function () {
            if (localStorage.getItem('login') != null && localStorage.getItem('login') != '') {
                // $rootScope.list_students = angular.fromJson(localStorage.getItem('login'));
                console.log(localStorage.getItem('login', angular.fromJson($rootScope.list_students)));
                kq = true;
                return localStorage.getItem('login', angular.fromJson($rootScope.list_students));
            }

        }
      //  $scope.load();


        $scope.login = function () {

            for (let i = 0; i < $rootScope.list_students.length; i++) {
                if ($rootScope.list_students[i].username == $scope.username && $rootScope.list_students[i].password == $scope.password) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng nhập thành công =))',
                        text: 'Quay lại trang chủ!',
                        timer: 1600
                    });
                  //  localStorage.setItem('login', angular.toJson($rootScope.list_students[i]));
                    window.location.href = "#!home";
                    $rootScope.student = $rootScope.list_students[i];
                    kq = true;
                    return;
                }

            }
            if (kq == false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng nhập thất bại :))',
                    text: 'Đăng nhập lại',
                });
            }
        }
    });
    $rootScope.logout = function () {
        $rootScope.student = null;
        $rootScope.indexStudent = -1;
        Swal.fire({
            icon: 'warning',
            title: 'Đã đăng xuất!',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
        window.location.href = "#!home";
    }


});
// Register
app.controller('registerCtrl', function ($scope, $rootScope, $http, $cookies) {

    $scope.register = function () {
        $http.post("https://62a4fb6f259aba8e10f08604.mockapi.io/Asm_Student/Asm_Student", {
            "username": $scope.studentUniver.username,
            "password": $scope.studentUniver.password,
            "fullname": $scope.studentUniver.fullname,
            "email": $scope.studentUniver.email,
            "gender": $scope.studentUniver.gender,
            "birthday": $scope.studentUniver.birthday,
            "schoolfee": Number($scope.studentUniver.schoolfee),
            "marks": 0
        })
            .then(function (response) {

                Swal.fire({
                    icon: 'success',
                    title: 'Đăng kí thành công!',
                    text: 'Quay lại trang chủ!',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                });
                window.location.href = "#!home";
            });
    };

    $scope.cancel = function () {
        $scope.studentUniver = {};
        $scope.index = -1
    }

});
//olpass==pass
app.directive('rePass', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            const checkPass = function (value) {
                var oldPass = scope.studentUniver.password;
                if (value == oldPass) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(checkPass);
        }
    }
});
app.directive('rePassChange', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            const checkPass = function (value) {
                var oldPass = scope.newpasschange;
                if (value == oldPass) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(checkPass);
        }
    }
});

// change
app.controller('changepasswordCtrl', function ($rootScope, $scope, $http) {

    $scope.change = function () {
        $scope.kq = false;
        $http.get('https://62a4fb6f259aba8e10f08604.mockapi.io/Asm_Student/Asm_Student').then(function (response) {
            $rootScope.list_students = response.data;
            for (let i = 0; i < $rootScope.list_students.length; i++) {

                if ($rootScope.list_students[i].username == $scope.studentUniver.username
                    && $rootScope.list_students[i].password == $scope.studentUniver.password) {
                    $scope.kq = true;
               
                    if ($scope.kq == true) {
                        $scope.studentUniver.password = $scope.newpasschange;
                        $http({
                            method: 'PUT',
                            url: 'https://62a4fb6f259aba8e10f08604.mockapi.io/Asm_Student/Asm_Student' + $rootScope.list_students[i].id,
                            data: $scope.studentUniver
                        }).then(function successCallback(response) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Update success!',
                                showConfirmButton: false,
                                timer: 1200
                            });
                            window.location.href = "#!home";

                        }, function errorCallback(response) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Thất bại',
                                showConfirmButton: false,
                                timer: 1200
                            });

                        }

                        );
                    }
                    return;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Username or password không khớp',
                        showConfirmButton: false,
                        timer: 1200
                    });
                }

            }


        });
    }


});
//forgot
app.controller('forgotpasswordCtrl', function ($rootScope, $scope, $http) {
    $http.get('https://62a4fb6f259aba8e10f08604.mockapi.io/Asm_Student/Asm_Student').then(function (response) {
        var kq = false;
        $rootScope.list_students = response.data;
        $scope.forgot = function () {
            for (let i = 0; i < $rootScope.list_students.length; i++) {
                console.log("======================")
                if ($rootScope.list_students[i].username == $scope.username && $rootScope.list_students[i].email == $scope.email) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Quên mật khẩu =))',
                        text: 'Mật khẩu là:' + ' ' + $rootScope.list_students[i].password,
                        timer: 5000
                    });
                    window.location.href = "#!home";
                    kq = true;
                    return;
                }
            }
            if (kq == false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lấy lại mật khẩu thất bại  :))',
                });
            }
        }
    });

});

//update

app.controller('updateCtrl', function ($scope, $routeParams, $route, $rootScope, $http) {

    $http.get('https://62a4fb6f259aba8e10f08604.mockapi.io/Asm_Student/Asm_Student').then(function (response) {
        var kq = false;
        $rootScope.list_students = response.data;
        for (let i = 0; i < $rootScope.list_students.length; i++) {
            if ($rootScope.student.username == $rootScope.list_students[i].username) {
                $rootScope.student = $rootScope.list_students[i];
                kq = true;
            }
        }

    });
    $scope.update = function () {
        $http({
            method: 'PUT',
            url: 'https://62a4fb6f259aba8e10f08604.mockapi.io/Asm_Student/Asm_Student' + $scope.student.id,
            data: $scope.student

        }).then(function successCallback(response) {

            Swal.fire({
                icon: 'success',
                title: 'Update success!',
                showConfirmButton: false,
                timer: 1200
            });
            window.location.href = "#!home";

        }, function errorCallback(response) {

            Swal.fire({
                icon: 'error',
                title: 'Thất bại',
                showConfirmButton: false,
                timer: 1200
            });

        });
    }


});