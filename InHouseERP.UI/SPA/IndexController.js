app.controller("IndexController", function ($scope, $rootScope, $cookieStore, $route,  $templateCache, $window, MyService, $http, $filter) {
    load();
    function load() {
     
        $scope.LoginUser = [];
        $scope.NoticeList = [];
        $scope.UnreadMessageNo = 0;
        //All menu control hidden default ----Start

        //$scope.AdminView = "menuViewHide";
        //$scope.EmailView = "menuViewHide";
        //$scope.SecurityView = "menuViewHide";
        //$scope.InventoryView = "menuViewHide";
        //$scope.POSView = "menuViewHide";
        //$scope.ReportsView = "menuViewHide";
        //$scope.VATView = "menuViewHide";
        //$scope.ProductionMenuView = "menuViewHide";
        //$scope.AccountsView = "menuViewHide";
        //$scope.ExportView = "menuViewHide";
        //$scope.ReceivableView = "menuViewHide";
        //$scope.PayableView = "menuViewHide";
        //$scope.ReportView = "menuViewHide";
        //$scope.CompanyView = "menuViewHide";
        //$scope.SupplierView = "menuViewHide";

        //$scope.ModuleView = "menuViewHide";
        //$scope.RoleView = "menuViewHide";
        //$scope.ScreenView = "menuViewHide";
        //$scope.PermisionView = "menuViewHide";
        //$scope.ChangePasswordView = "menuViewHide";

        //All menu control hidden default ----End
        GetUser(); //Get logged in user Info from cookies
    }
    $scope.findString = function (text) {
        window.find(text);
    }
    $scope.ReloadPage = function () {
        $templateCache.removeAll();
        var currentPageTemplate = $route.current.templateUrl;
        console.log(currentPageTemplate);
        $templateCache.remove(currentPageTemplate);
        //$window.location.reload();
        window.location.reload(true);
    }
    function GetUser() {
        //$scope.LoginUser = $cookieStore.get('UserData');
        var login = sessionStorage.getItem("UserDataSession");
        if (login != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.UserName = $scope.LoginUser.Username;
        $scope.FullName = $scope.LoginUser.FullName;
        $scope.DepartmentName = $scope.LoginUser.DepartmentName;
        $scope.DesignationName = $scope.LoginUser.DesignationName;
        $scope.RoleId = $scope.LoginUser.RoleId;
        $scope.RoleName = $scope.LoginUser.RoleName;
        GetPermissionByRoleId($scope.RoleId);
    }

    function GetPermissionByRoleId(roleId) {
        $http({
            url: '/Permission/GetPermissionByRoleIdNew?roleId=' + roleId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //angular.forEach(data, function (aData) {
            //    aData[aData.ScreenUrl + 'Permission'] = true;
            //})
            sessionStorage.setItem("PermissionDataSession", JSON.stringify(data));
            $scope.PermissionList = data;
            $rootScope.$PermissionList = $scope.PermissionList;
            $scope.PermissionList = Array.from(
                $scope.PermissionList.reduce((m, o) => m.set(o.ModuleName, (m.get(o.ModuleName) || []).concat(o)), new Map),
                ([ModuleName, events]) => ({ ModuleName, events })
            );
            
            
        })
    }
    $scope.ChangedColor = function (aPermission) {
        angular.forEach($scope.PermissionList, function (aModule) {
            angular.forEach(aModule.events, function (aScreen) {
                if (aScreen.ScreenId == aPermission.ScreenId) {
                    aScreen.color = 'color:white;';
                } else {
                    aScreen.color = '';
                }

            })
        })
    }

    $scope.SetActive = function () {
        angular.forEach($scope.PermissionList, function (aData) {
            aData.IsActive = 'active';
        })
    }
    $scope.CloseActive = function () {
        $scope.textItem = '';
        angular.forEach($scope.PermissionList, function (aData) {
            aData.IsActive = '';
        })
        $(".active").removeClass("active");
        $(".menu-open").css("display", "none");
    }
    function GetPermissionByRoleId1(roleId) {
        $http({
            url: '/Permission/GetPermissionByRoleId?roleId=' + roleId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            MyService.data.permission = data;
            angular.forEach(data, function (aPermission) {
                //Set Sitebar and Page Permission
                if (aPermission.ScreenName == "FiscalYear" && aPermission.CanView) {
                    $scope.AdminView = "menuViewShow";
                    $scope.FiscalYearView = "menuViewShow";
                    sessionStorage.setItem("FiscalYearEntryScreenId", aPermission.ScreenId);
                    sessionStorage.setItem("FiscalYearEntryPermission", 'true');

                }
                if (aPermission.ModuleName == "Report") {
                    $scope.ReportView = "menuViewShow";
                }

            });
        })
    }
    function RemoveSession() {
        //User Info remove
        sessionStorage.removeItem('UserDataSession');
        sessionStorage.removeItem('ValuationSession');
        //Permission remove
        sessionStorage.removeItem('FiscalYearEntryPermission');
        //Error Log
        sessionStorage.removeItem('errorMassage');
    }

    $scope.SignOut = function () {
        //$scope.User = $cookieStore.get('UserData');
        var login = sessionStorage.getItem("UserDataSession");
        if (login != null) {
            $scope.User = JSON.parse(sessionStorage.UserDataSession);
        }
        //sessionStorage.setItem('UserData', null);
        sessionStorage.setItem("UserDataSession", null);

        //sessionStorage.setItem("milisec", null);
        //sessionStorage.setItem("sec", null);
        //sessionStorage.setItem("min", null);
        //sessionStorage.setItem("hour", null);

        $scope.ad_LoginLogoutLog = new Object();
        $scope.ad_LoginLogoutLog.UserId = $scope.User.UserId;
        $scope.ad_LoginLogoutLog.LogOutTime = new Date();
        $scope.ad_LoginLogoutLog.IsLoggedIn = false;
        var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
        $http.post('/User/UpdateLoginInfo', parms).success(function (data) { });
        //RemoveAllScreenLock();
        //RemoveSession();
        window.location = '/Home/Login#/';
    }

    function RemoveAllScreenLock() {
        var parms = JSON.stringify({ userId: $scope.UserId });
        $http.post('/Permission/RemoveScreenLock', parms).success(function (data) {
        });
    }

    $scope.RemoveScreenLock = function () {
        //RemoveAllScreenLock();
        window.location = '/Home/Index#/Home';
    }


    function getData() {
        $http({
            url: '/Notice/GetNotice?UserId=' + $scope.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.NoticeListMain = data;
            $scope.UnreadMessageNo = data.length;
            angular.forEach(data, function (aNot) {
                res = aNot.CreateDate.substring(0, 5);
                if (res == "/Date") {
                    var parsedDate = new Date(parseInt(aNot.CreateDate.substr(6)));
                    aNot.Time = parsedDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                    var parsedDate2 = new Date(parseInt(aNot.CreateDate.substr(6)));
                    aNot.CreateDate = $filter('date')(parsedDate2, 'dd-MMM-yyyy');
                }
            })

            //$scope.NoticeList.push(data[0]);
            //$scope.NoticeList.push(data[1]);
        });
    }

    

    /// SignalR Start////
    
    $scope.MessageList = [];
    $scope.notifyHub = null;
    $scope.notifyHub = $.connection.notifyHub;
    $.connection.hub.start().done(function () {
        console.log('Connected!!')
    });
    //document.AddEventListener('visibilitychange', () => {
    //    if (document.visibilityState === 'visible' && connection.state !== HubConnectionState.Connected) {
    //        connection.start();
    //        $scope.notifyHub = null;
    //        $scope.notifyHub = $.connection.notifyHub;
    //        $.connection.hub.start().done(function () {
    //        });
    //    }
    //})
    $.connection.hub.disconnected(function () {
        console.log('Disconnected!!')
        /*setTimeout(function () {*/
            $scope.notifyHub = null;
            $scope.notifyHub = $.connection.notifyHub;
            $.connection.hub.start().done(function () {
                console.log('Connected!!')
            });
        //}, 5000); // Restart connection after 5 seconds.
    });

    $scope.notifyHub.client.notifyToAllUser = function (Obj) {
        if (Obj.IsActive) {
            $scope.IsNotify = true;
            $scope.Message = Obj.Message;
        } else {
            $scope.IsNotify = false;
        }

        $scope.$apply();
    };

    $scope.notifyHub.client.Notify = function (Obj) {
        if (Obj.IsActive) {
            $scope.IsNotify = true;
            $scope.Message = Obj.Message;
        } else {
            $scope.IsNotify = false;
        }
        
        $scope.$apply();
    };


    

    //function customnotify(title, desc, url) {

    //    if (Notification.permission !== "granted") {
    //        Notification.requestPermission();
    //    }
    //    else {
    //        var notification = new Notification(title, {
    //            icon: 'http://Your_Website.com/logo.png',
    //            body: desc,
    //        });

    //        /* Remove the notification from Notification Center when clicked.*/
    //        notification.onclick = function () {
    //            window.open(url);
    //        };

    //        /* Callback function when the notification is closed. */
    //        notification.onclose = function () {
    //            console.log('Notification closed');
    //        };

    //    }
    //}
    $('#NotificationPage').hide();
    $('#UserPage').hide();
    $scope.IsShowNotify = false;
    $scope.IsShowUser = false;
    $(document).click(function (evt) {
        if (evt.target.className.match('NotificationContain')) {
            return;
        } else if (evt.target.className.match('NotificationBtn')) {
            if ($scope.IsShowNotify == true) {
                $scope.IsShowNotify = false;
                $('#NotificationPage').hide();
            } else {
                ReadAllLog();
                $scope.IsShowNotify = true;
                //$scope.IsShowUser = false;
                $('#NotificationPage').show();
            }
        }
        else {
            $scope.IsShowNotify = false;
            $('#NotificationPage').hide();
        }


        if (evt.target.className.match('UserContain')) {
            return;
        } else if (evt.target.className.match('UserBtn')) {
            if ($scope.IsShowUser == true) {
                $scope.IsShowUser = false;
                $('#UserPage').hide();
            } else {
                $scope.IsShowUser = true;
                //$scope.IsShowNotify = false;
                $('#UserPage').show();
            }
        }
        else {
            $scope.IsShowUser = false;
            $('#UserPage').hide();
        }
    });

    $scope.SeeAll = function () {
        ReadAllLog();
        GetAppNotificationLogByUserId(null);
        //$scope.NoticeList = $scope.NoticeListMain;
    }
    //$scope.ShowNotification = function () {
        
    //    if ($scope.IsShowNotify == true) {
    //        $scope.IsShowNotify = false;
    //    } else {
    //        ReadAllLog();
    //        $scope.IsShowNotify = true;
    //        $scope.IsShowUser = false;
    //    }
    //}
    $scope.notifyHub.client.NotificationLog = function (List) {
        angular.forEach(List, function (aData) {
            if (aData.UserId == $scope.LoginUser.UserId) {
                //alertify.log(aData.NotificaitonTitle + ' ~ ' + aData.NotificationDetail, 'success', '5000');
                //CustomNotify(aData.NotificaitonTitle, aData.NotificationDetail, aData.ScreenUrl);
                alertify.log('You got one new notification!', 'success', '1000');
                var date = new Date(aData.CreateDate);
                aData.CreateDate = date.toDateString();
                aData.CreateTime = date.toLocaleTimeString();
                $scope.UnreadMessageNo++;
                $scope.NoticeList.unshift(aData);
                $scope.$apply();
            }
        })

        //if ($scope.UnreadMessageNo != 0) {
        //    document.title = '(' + $scope.UnreadMessageNo + ') ' + document.title;
        //}
        if ($scope.UnreadMessageNo != 0) {
            document.title = '(' + $scope.UnreadMessageNo + ') RTL'
        }
    };

    GetAppNotificationLogByUserId(false);
    function GetAppNotificationLogByUserId(IsRead) {
        $http({
            url: "/EmailNotificationSetup/GetAppNotificationLogByUserId?UserId=" + $scope.LoginUser.UserId + "&IsRead=" + IsRead,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.UnreadMessageNo = 0;
            angular.forEach(data, function (aData) {
                if (aData.IsRead == false) {
                    $scope.UnreadMessageNo++;
                    //aData.color = 'background-color:#E8E8E8;'
                }
                var res1 = aData.CreateDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.CreateDate.substr(6)));
                    //var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.CreateDate = parsedDate1.toDateString();
                    aData.CreateTime = parsedDate1.toLocaleTimeString();

                }
            })

            if ($scope.UnreadMessageNo != 0) {
                document.title = '(' + $scope.UnreadMessageNo + ') ' + document.title;
            }
            $scope.NoticeList = data;

            //if ($scope.NoticeList.length == 0) {
            //    if (IsRead && $scope.NoticeList.length == 0) {
            //        return;
            //    }
            //    GetAppNotificationLogByUserId(true);
                
            //}
            //$scope.NoticeList = [];
            //if (data.length < 3) {
            //    $scope.NoticeList = data;
            //} else {
            //    $scope.NoticeList.push(data[0]);
            //    $scope.NoticeList.push(data[1]);
            //    $scope.NoticeList.push(data[2]);
            //}
        })
    }
    $scope.RedidectPage = function (ScreenUrl) {
        $('#NotificationPage').hide();
        $window.location.href = '#/' + ScreenUrl;
    }
    function ReadAllLog() {

        angular.forEach($scope.NoticeList, function (aNotice) {
            aNotice.IsRead = true;
            aNotice.IsUpdate = true;
        })
        var params = JSON.stringify({ AppNotificationLogList: $scope.NoticeList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) {
            if (data > 0) {
                $scope.UnreadMessageNo = 0;
                if ($scope.UnreadMessageNo != 0) {
                    document.title = '(' + $scope.UnreadMessageNo + ') ' + document.title;
                } else {
                    document.title = 'RTL'
                }
            }
            else {
                //alertify.log('Network Error, refresh page and try again', 'error', '5000');
            }
        }).error(function (msg) {
            //alertify.log('Network Error, refresh page and try again', 'error', '5000');
        });
    }
    //$scope.DeleteLog = function (aNotice) {
    //    $scope.AppNotificationSetupList = [];
    //    aNotice.IsDelete = true;
    //    $scope.AppNotificationSetupList.push(aNotice);
    //    var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationSetupList });
    //    $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) {
    //        if (data > 0) {

    //        }
    //        else {
    //            alertify.log('Network Error, refresh page and try again', 'error', '5000');
    //        }
    //    }).error(function (msg) {
    //        alertify.log('Network Error, refresh page and try again', 'error', '5000');
    //    });
    //}
    //$scope.DeleteAllLog = function () {

    //    angular.forEach($scope.NoticeListMain, function (aNotice) {
    //        aNotice.IsDelete = true;
    //    })
    //    var params = JSON.stringify({ AppNotificationLogList: $scope.NoticeListMain });
    //    $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) {
    //        if (data > 0) {

    //        }
    //        else {
    //            alertify.log('Network Error, refresh page and try again', 'error', '5000');
    //        }
    //    }).error(function (msg) {
    //        alertify.log('Network Error, refresh page and try again', 'error', '5000');
    //    });
    //}

    //$scope.ReadLog = function (aNotice) {
    //    $scope.AppNotificationSetupList = [];
    //    aNotice.IsRead = true;
    //    $scope.AppNotificationSetupList.push(aNotice);
    //    var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationSetupList });
    //    $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) {
    //        if (data > 0) {

    //        }
    //        else {
    //            alertify.log('Network Error, refresh page and try again', 'error', '5000');
    //        }
    //    }).error(function (msg) {
    //        alertify.log('Network Error, refresh page and try again', 'error', '5000');
    //    });
    //}



    $scope.notifyHub.client.logoutFromAllUser = function (logout) {
        //window.location = '/Home/Login#/';
        if ($scope.MaintenanceData.IsActive || $scope.LoginUser.Username == 'admin' || $scope.LoginUser.Username == 'sadmin') {

        } else {
            window.location = '/Home/Login#/';
        }
        $scope.$apply();
    };

   ///SignalR End///
    //$scope.ShowUser = function () {
    //    if ($scope.IsShowUser == true) {
    //        $scope.IsShowUser = false;
    //    } else {
    //        $scope.IsShowUser = true;
    //        $scope.IsShowNotify = false;
    //    }
    //}
    GetMaintenanceData();
    function GetMaintenanceData() {
        $http({
            url: "/SystemNotification/GetMaintenanceData?Type=S_Break",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.MaintenanceData = data[0];
            

            var login = sessionStorage.getItem("UserDataSession");
            if (login != null) {
                $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            }

            if (!$scope.MaintenanceData.IsActive || $scope.LoginUser.Username == 'admin' || $scope.LoginUser.Username == 'sadmin') {

            } else {
                window.location = '/Home/Login#/';
            }
        })
    }
    GetSystemNotification();
    function GetSystemNotification() {
        $http({
            url: "/SystemNotification/GetMaintenanceData?Type=S_Message",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.SystemNotification = data[0];
            if ($scope.SystemNotification.IsActive == true) {
                $scope.IsNotify = true;
            } else {
                $scope.IsNotify = false;
            }
            //$scope.IsNotify = true;
            $scope.Message = $scope.SystemNotification.Message;
        })
    }

    
    $scope.ctrlFn = function (arg) {
        //alert(arg);
        $scope.IsBolck = arg;
    }
    
}).directive('loading', ['$http', function ($http, window) {
    return {
        restrict: 'EA',
        scope: {
            fromDirectiveFn: '=method'
        },
        //template: '<div class="loading-spiner"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" /> </div>',
        //template: '<div class="loading-spiner"><img style="margin: -100px;" width="300" height="300" src="/UploadedImages/LoadingTrans.gif" /> </div>',
        template: '<div class="loading-spiner"><img style="margin: -35%; width: 70%; height: 70%"  src="/UploadedImages/LoadingColorful.gif" /> </div>',
        //template: '<iframe src="https://giphy.com/embed/daak2Jqk5NZN2G4PKD" width="250" height="250" style="border-radius: 100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                    scope.IsBolck = 'UIBlocker'
                    if (scope.fromDirectiveFn != undefined) {
                        scope.fromDirectiveFn(scope.IsBolck);
                    }
                    

                } else {
                    elm.hide();
                    scope.IsBolck = 'UIUnBlocker'
                    if (scope.fromDirectiveFn != undefined) {
                        scope.fromDirectiveFn(scope.IsBolck);
                    }
                }
            });

            //scope.hello = "some message";
            //scope.fromDirectiveFn(scope.hello);
        }
    };
}])




app.run(function ($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
            $rootScope.online = false;
        });
    }, false);

    $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
            $rootScope.online = true;
        });
    }, false);
});