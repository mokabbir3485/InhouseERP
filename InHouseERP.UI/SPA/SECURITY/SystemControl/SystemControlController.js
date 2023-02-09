app.controller("SystemControlController", function ($scope, $rootScope, $cookieStore, $http, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.UserId = $scope.LoginUser.UserId;

    

    Clear();

    function Clear() {
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'System Control').ScreenId;

        //$scope.SystemMaintenance = {};
        $scope.SystemNotification = {};
        $scope.MaintenanceData = {};
        $scope.SystemNotification.IsActive = true;
        //$scope.SystemMaintenance.NotificationId = 0;
        //$scope.SystemMaintenance.Message = 'The system will be under maintenance ';
        //$scope.SystemMaintenance.Message = null;
        
        //$scope.SystemMaintenance.IsActive = true;
        //$scope.SystemMaintenance.IsMaintenance = true;

        GetMaintenanceData();
        GetSystemNotification();
    }

    
    function GetMaintenanceData() {
        $http({
            url: "/SystemNotification/GetMaintenanceData?Type=S_Break",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.MaintenanceData = data[0];
            
            //if ($scope.MaintenanceData.Maintenance_EndTime == null) {
            //    $scope.IsLogout = true;
            //    $scope.IsLoging = true;
            //} else {
            //    $scope.IsLogin = false;
            //    $scope.IsLogout = false;
            //}
            if ($scope.MaintenanceData.IsActive) {
                $scope.IsLogout = true;
                $scope.IsLoging = true;
            } else {
                $scope.IsLogin = false;
                $scope.IsLogout = false;
            }
            
        })
    }

    function GetSystemNotification() {
        $http({
            url: "/SystemNotification/GetMaintenanceData?Type=S_Message",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.SystemNotification = data[0];
            if ($scope.SystemNotification.IsActive == true) {
                $scope.SystemNotification.NotificationId = 0;
            }
        })
    }
    $scope.ChangeId = function () {
        if ($scope.SystemNotification.IsActive == true) {
            $scope.SystemNotification.NotificationId = 0;
        }
    }
    $scope.hideButton = function () {
        if ($scope.IsLoging == true) {
            $scope.IsLoging = false;
            $scope.MaintenanceData.IsActive = false;
            //$scope.MaintenanceData.Maintenance_StartTime = new Date();
            //$scope.MaintenanceData.Maintenance_EndTime = new Date();
            
        } else {
            $scope.IsLoging = true;
            //$scope.MaintenanceData.Maintenance_StartTime = new Date();
            //$scope.MaintenanceData.Maintenance_EndTime = null;
            $scope.MaintenanceData.IsActive = true;
        }
    };
    $scope.SystemNotificationAllUser = function () {
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $scope.SystemNotification.Type = 'S_Message';
                
                var params = JSON.stringify({ SystemNotification: $scope.SystemNotification});
                $http({
                    url: '/SystemNotification/PostSystemNotification',
                    method: 'POST',
                    data: params
                }).success(function (data) {
                    if (data > 0) {
                        alertify.log('System Notification saved successfully!', 'success', '5000');
                        Clear();
                        $scope.SystemControlForm.$setPristine();
                        $scope.SystemControlForm.$setUntouched();
                    }
                });

            }
        })
    }
    //$scope.LoggoutAllUser = function () {
    //    alertify.confirm("Are you sure to save?", function (e) {
    //        if (e) {
    //            var params = JSON.stringify({ SystemNotification: $scope.SystemMaintenance});
    //            $http({
    //                url: '/SystemNotification/PostSystemNotification',
    //                method: 'POST',
    //                data: params
    //            }).success(function (data) {
    //                if (data > 0) {
    //                    alertify.log('System Maintenance saved successfully!', 'success', '5000');
    //                    Clear();
    //                    $scope.SystemControlForm.$setPristine();
    //                    $scope.SystemControlForm.$setUntouched();
    //                }
    //            });

    //        }
    //    })
    //}
    $scope.LoggoutAllUserImmediate = function () {
        /*alertify.confirm("Are you sure to save?", function (e) {*/
            /*if (e) {*/
                var params = JSON.stringify({ SystemNotification: $scope.MaintenanceData});
                $http({
                    url: '/SystemNotification/PostSystemNotification',
                    method: 'POST',
                    data: params
                }).success(function (data) {
                    if (data > 0) {
                        alertify.log('System Maintenance saved successfully!', 'success', '5000');
                        Clear();
                        $scope.SystemControlForm.$setPristine();
                        $scope.SystemControlForm.$setUntouched();
                    }
                });

          /*  }*/
        /*})*/
    }

    $scope.resetForm = function () {
        Clear();
        $scope.ReportNotificationNameForm.$setPristine();
        $scope.ReportNotificationNameForm.$setUntouched();
    };
});