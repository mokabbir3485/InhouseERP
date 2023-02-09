app.controller("LoginController", function ($scope, $cookieStore, $http) {
    $scope.UserStatus = [];
    $scope.Ip = '';
    $scope.SmsCode = '';
    $scope.LoginUser = [];
    $scope.s_User = new Object();
    $scope.ValuationSetupCurrent = {};
    $scope.MaintenanceData = {};
    $scope.IsReqSmsCode = false;
    $scope.IsRead = false;
    $scope.InputType = 'password';
    $scope.showHideClass ='fa fa-eye-slash';
    $scope.isShowIconPassword = true;
    $scope.isHiddenIconPassword = false;

    $scope.PasswordShowMethod = function () {
        showPassword();
    }

    $scope.HidePassword = function () {
        $scope.InputType = 'password';
        $scope.showHideClass = 'fa fa-eye-slash';
    }
    var login = sessionStorage.getItem("UserDataSession");
    if (login != null) {
        $scope.User = JSON.parse(sessionStorage.UserDataSession);
    }
    sessionStorage.setItem("UserDataSession", null);
    if ($scope.User != undefined) {
        $scope.ad_LoginLogoutLog = new Object();
        $scope.ad_LoginLogoutLog.UserId = $scope.User.UserId;
        $scope.ad_LoginLogoutLog.LogOutTime = new Date();
        $scope.ad_LoginLogoutLog.IsLoggedIn = false;
        var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
        $http.post('/User/UpdateLoginInfo', parms).success(function (data) { });
        alert('The system will be under maintenance');
        //window.location = '/SPA/maintenance.html';
        //RemoveAllScreenLock();
        //RemoveSession();
        GetMaintenanceData();
    }

    GetMaintenanceData();
    function GetMaintenanceData() {
        $http({
            url: "/SystemNotification/GetMaintenanceData?Type=S_Break",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.MaintenanceData = data[0];
            
        })
    }
    function RemoveAllScreenLock() {
        var parms = JSON.stringify({ userId: $scope.UserId });
        $http.post('/Permission/RemoveScreenLock', parms).success(function (data) {
        });
    }
    function RemoveSession() {
        //User Info remove
        sessionStorage.removeItem('UserDataSession');
        sessionStorage.removeItem('ValuationSession');
        //Permission remove
        sessionStorage.removeItem('SystemControlPermission');
        sessionStorage.removeItem('FiscalYearEntryPermission');
        //Account       
        sessionStorage.removeItem('SystemControlScreenId');
        sessionStorage.removeItem('FiscalYearEntryScreenId');

        //Error Log
        sessionStorage.removeItem('errorMassage');
    }
    function showPassword () {
        if ($scope.s_User.Password != null) {
            if ($scope.InputType == 'password') {
                $scope.InputType = 'text';
                $scope.showHideClass = 'fa fa-eye';
                $scope.isShowIconPassword = false;
            } else {
                $scope.InputType = 'password';
                $scope.showHideClass = 'fa fa-eye-slash';
                $scope.isShowIconPassword = false;
                //$scope.showHideClass = 'glyphicon glyphicon-eye-open';
                
            }
        }
    }

   




    function RemoveAllScreenLock(UserId) {
        var parms = JSON.stringify({ userId: UserId });
        $http.post('/Permission/RemoveScreenLock', parms).success(function (data) {
        });
    }

    function GetUser(UserName, Password) {
        try {
            $http({
                url: '/User/GetUserForLogin',
                method: "GET",
                params: { userName: UserName, password: Password },
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.LoginUser = data;
                console.log('User Data',data);
                if ($scope.LoginUser != "" && !$scope.LoginUser.IsReqSmsCode) {
                    //if ($scope.LoginUser.IsActive) {
                       // $cookieStore.put('UserData', $scope.LoginUser); // Remove cookies into the function 'RemoveCookies' of IndexController
                        sessionStorage.setItem("UserDataSession", JSON.stringify($scope.LoginUser));
                        sessionStorage.setItem("milisec", 0);
                        sessionStorage.setItem("sec", 0);
                        sessionStorage.setItem("min", 0);
                        sessionStorage.setItem("hour", 0);
                        //RemoveAllScreenLock($scope.LoginUser.UserId);
                        GetUserCurrentStatus($scope.LoginUser.UserId);
                    //}
                   // else {
                       // alertify.log('User is Inactive!', 'error', '5000');
                        // alertify.log(data, 'error', '5000');
                   // }
                }
                else if ($scope.LoginUser != "" && $scope.LoginUser.IsReqSmsCode) {
                    $scope.IsReqSmsCode = true;
                    txtLoginCode.focus();
                    $scope.SmsCode = Math.floor(1000 + Math.random() * 9000);
                    document.getElementById("myText2").value = $scope.SmsCode;
                    //Send $scope.SmsCode to $scope.LoginUser.SmsMobileNo
                }
                else {
                    alertify.log('Invalid Login Information!', 'error', '5000');
                }
            })
        }
        catch (e) {
            console.log("Got an error!", e.description);
        }

    }

    function GetHasReceivable() {
        $scope.GetHasReceivable = false;
        $http({
            url: '/Setup/GetHasReceivable',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.GetHasReceivable = (data === 'true');
            if ($scope.GetHasReceivable) {
                $http({
                    url: '/Setup/GetCurrentValuationSetup',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.ValuationSetupCurrent = data;
                    if ($scope.ValuationSetupCurrent != "") {
                        //$cookieStore.put('Valuation', $scope.ValuationSetupCurrent);
                        sessionStorage.setItem("ValuationSession", JSON.stringify($scope.ValuationSetupCurrent));
                    }
                });
            }
        });
    }

    function GetUserCurrentStatus(UserId) {
        $http({
            url: '/LoginLogoutLog/GetUserCurrentStatus',
            method: "GET",
            params: { userId: UserId },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.UserStatus = data;
            if ($scope.UserStatus.IsLoggedIn) {
                //if ($scope.UserStatus.IpAddress == $scope.Ip) {
                //force log out
                $scope.ad_LoginLogoutLog = new Object();
                $scope.ad_LoginLogoutLog.UserId = $scope.UserStatus.UserId;
                $scope.ad_LoginLogoutLog.LogOutTime = new Date();
                $scope.ad_LoginLogoutLog.IsLoggedIn = false;
                var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
                $http.post('/User/UpdateLoginInfo', parms).success(function (data) { });
                //log in
                var login = sessionStorage.getItem("UserDataSession");
                if (login != null) {
                    var userStatus = JSON.parse(sessionStorage.UserDataSession);
                }
                $scope.ad_LoginLogoutLog = new Object();
                $scope.ad_LoginLogoutLog.UserId = userStatus.UserId;
                $scope.ad_LoginLogoutLog.LogInTime = new Date();
                $scope.ad_LoginLogoutLog.IpAddress = $scope.Ip;
                $scope.ad_LoginLogoutLog.IsLoggedIn = true;
                var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
                $http.post('/User/SaveLoginInfo', parms).success(function (data) { });
                window.location = '/Home/Index#/Home';

            }
            else {
                // log in
                var login = sessionStorage.getItem("UserDataSession");
                if (login != null) {
                    var userStatus = JSON.parse(sessionStorage.UserDataSession);
                }
                $scope.ad_LoginLogoutLog = new Object();
                $scope.ad_LoginLogoutLog.UserId = userStatus.UserId;
                $scope.ad_LoginLogoutLog.LogInTime = new Date();
                $scope.ad_LoginLogoutLog.IpAddress = $scope.Ip;
                $scope.ad_LoginLogoutLog.IsLoggedIn = true;
                var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
                $http.post('/User/SaveLoginInfo', parms).success(function (data) { });
                window.location = '/Home/Index#/Home';
            }
        });
    }

    window.onpopstate = function (e) { window.history.forward(1); }

    $scope.Login = function () {


        if (!$scope.MaintenanceData.IsActive || $scope.s_User.Username == 'admin' || $scope.s_User.Username == 'sadmin') {

            var value = $("#myText").val();
            $scope.Ip = value;
            //RemoveCookies();
            $scope.LoginUser = [];
            GetUser($scope.s_User.Username, $scope.s_User.Password);
            GetHasReceivable();

        } else {
            alertify.log($scope.MaintenanceData.Message, 'error', '5000');
            //$cookieStore.put('MaintenanceTime', $scope.MaintenanceData);
            //window.location = '/SPA/maintenance.html';
        }

        
    };

    $scope.MatchCode = function () {
        if ($scope.s_User.SmsCodeIn == $scope.SmsCode) {
            $cookieStore.put('UserData', $scope.LoginUser);
            sessionStorage.setItem("UserDataSession", JSON.stringify($scope.LoginUser));
            //RemoveAllScreenLock($scope.LoginUser.UserId);
            GetUserCurrentStatus($scope.LoginUser.UserId);
        }
        else {
            alertify.log('Incorrect Code', 'error', '5000');
        }
    }
});
