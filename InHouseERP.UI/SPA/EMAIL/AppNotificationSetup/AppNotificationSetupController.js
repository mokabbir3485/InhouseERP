app.controller("AppNotificationSetupController", function ($scope, $rootScope, $http, $window, $filter) {

    Clear();

    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.FullName = $scope.LoginUser.FullName;

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'App Notification Setup').ScreenId;
        GetUsersPermissionDetails();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;

        $scope.AppNotificationSetuplist = [];
        GetAppNotificationSetupPaged($scope.currentPage);
        $scope.IsActive = true;
        $scope.IsUpdate = false;


        $scope.Rolelist = [];
        GetReportNameForNotification();
        GetAllRole();
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();


        $scope.example8settings = {
            scrollableHeight: '300px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
            //selectionLimit: 1,
            //smartButtonMaxItems: 1,
            //dynamicTitle: true,
            //smartButtonTextConverter: function (itemText) { return itemText; }
           
         
        };
        //$scope.DBFunctionIdList = [];
        $scope.UserIdList = [];
        $scope.example8data = [];
        $scope.EmployeePlaceholder = {
            buttonDefaultText: "Select Employee",
            searchPlaceholder: "Search Employee"
        };
        $scope.selectEmployee = document.getElementById("selectEmployee").getElementsByTagName('button')[0];
        $scope.selectEmployeeMenu = document.getElementById("selectEmployee").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectEmployee.setAttribute("disabled", "disabled");
        $scope.selectEmployee.style.width = "100%";
        $scope.selectEmployeeMenu.style.width = "100%";
        $scope.ReportUselist = [];

        $scope.ReportDataList = [];
        $scope.isExists = true;
    }
    function GetConfirmationMessageForAdmin() {
        $http({
            url: '/Role/GetConfirmationMessageForAdmin',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ConfirmationMessageForAdmin = (data === 'true');
        });
    }
    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.RemovePermission = false;
        $scope.ListViewPermission = false;

        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {
                if (aPermissionDetails.FunctionName == 'Create') {
                    $scope.CreatePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Revise') {
                    $scope.RevisePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Remove') {
                    $scope.RemovePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }
    function GetAllRole() {
        $http({
            url: '/Role/GetAllRole',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Rolelist = data;
        });
    }
    function GetReportNameForNotification() {
        $http({
            url: '/EmailNotificationSetup/GetReportNameForNotification',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ReportNameForNotificationList = data;
        });

    }


    $scope.GetEmployeeByRoleId = function (RoleId) {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.example8data = [];
            angular.forEach(data, function (aData) {
                if (aData.RoleId == RoleId) {
                    $scope.example8data.push({ id: aData.UserId, DepartmentId: aData.DepartmentId, SectionId: aData.SectionId, label: aData.FullName });
                }
            })
            if ($scope.IsUpdate == true) {
                $scope.UserIdList = [{ id: $scope.AppNotificationSetup.UserId, label: $scope.AppNotificationSetup.EmployeeName, AppNotificationId: $scope.AppNotificationSetup.AppNotificationId }]
                $scope.selectEmployee.setAttribute("disabled", "disabled");
            }
        });
    }

   
 

    


    function AppNotificationSetup_GetAll(id) {
       
       
     
        $scope.ReportUselist = [];

      
        $http({
            url: '/EmailNotificationSetup/AppNotificationSetup_GetAll',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            scope.ReportUselist = data;
            //angular.forEach(data, function (aData) {
            //    angular.forEach(id, function (aD) {

            //        if (aData.UserId == aD.id && $scope.ddlReportName.ReportId == aData.ReportId && aData.RoleId == $scope.ddlRole.RoleId) {
            //            $scope.isExists = false;
            //            $scope.ReportUselist.push(aData);
            //        }
            //    });
           // })


            //angular.forEach($scope.ReportUselist, function (aRep) {
            //    if (aRep.ReportId == $scope.ddlReportName.ReportId && aRep.RoleId == $scope.ddlRole.RoleId) {
            //        $scope.ReportDataList.push(aRep);
            //        //$scope.isExists = false;
            //    }
            //})
            //  $scope.ReportDataList = $scope.ReportUselist.filter((aD) => aD.ReportId == $scope.ddlReportName.ReportId && aD.RoleId == $scope.ddlRole.RoleId);
            // console.log('H', $scope.ReportUselist);

            console.log('H', $scope.ReportDataList);
           
           // 
        });

      
    }


    

    //$scope.ReportDataFiltering = function (id) {
    //    AppNotificationSetup_GetAll(id);
    //}

    function AppNotificationSetup() {
        angular.forEach($scope.UserIdList, function (data) {
            data.ReportId = $scope.ddlReportName.ReportId;
            data.RoleId = $scope.ddlRole.RoleId;
            data.UserId = data.id;
            data.IsActive = $scope.IsActive;

            var UserObj = $scope.example8data.filter(x => x.id === data.id)[0];
            data.SectionId = UserObj.SectionId;
            data.DepartmentId = UserObj.DepartmentId;
        });

        var params = JSON.stringify({ AppNotificationSetupList: $scope.UserIdList });
        $http.post('/EmailNotificationSetup/AppNotificationSetupPost', params).success(function (data) {
            if (data == 0) {
                $scope.UserIdList = [];
                alertify.log('Screen and employee already Exists!', 'error', '5000');
            }
            if (data > 0) {
                alertify.log('App notification setup saved successfully!', 'success', '5000');
                Clear();
                $('#ddlReportName').select2('destroy');
                $('#ddlReportName').val('').select2({
                    theme: "classic",
                });
                $('#roleDdl').select2('destroy');
                $('#roleDdl').val('').select2({
                    placeholder: "Search for: Role Name",
                    theme: "classic",
                });
                $scope.ddlRole = null;
                $scope.ddlReportName = null;
                $scope.selectEmployee.removeAttribute("disabled");
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
    }

    $scope.Save = function () {
        //if ($scope.isExists==false) {
        //    alertify.log('Screen Already Exists !!!', 'error', '5000');
        //} else {
            if ($scope.ConfirmationMessageForAdmin) {
                if ($scope.IsUpdate == false && $scope.CreatePermission) {
                    alertify.confirm("Are you sure to save?", function (e) {
                        if (e) {
                            AppNotificationSetup();
                        }
                    })
                }
                else if ($scope.IsUpdate == false && !$scope.CreatePermission) {
                    alertify.log('You do not have permission to save!', 'error', '5000');
                }
                else if ($scope.IsUpdate == true && $scope.RevisePermission) {
                    alertify.confirm("Are you sure to update?", function (e) {
                        if (e) {
                            AppNotificationSetup();
                        }
                    })
                }
                else if ($scope.IsUpdate == true && !$scope.RevisePermission) {
                    alertify.log('You do not have permission to Update!', 'error', '5000');
                }
            }
            else {
                if ($scope.IsUpdate == false && $scope.CreatePermission) {
                    AppNotificationSetup();
                }
                else if ($scope.IsUpdate == false && !$scope.CreatePermission) {
                    alertify.log('You do not have permission to save!', 'error', '5000');
                }
                else if ($scope.IsUpdate == true && $scope.RevisePermission) {
                    AppNotificationSetup();
                }
                else if ($scope.IsUpdate == true && !$scope.RevisePermission) {
                    alertify.log('You do not have permission to Update!', 'error', '5000');
                }
            }
            
       // }
        

    }

    $scope.SelAppNotificationSetup = function (aAppNotificationSetup) {
        $scope.AppNotificationSetup = aAppNotificationSetup;
        setTimeout(function () {
            $("#ddlReportName").select2({
                theme: "classic",
            }).val(aAppNotificationSetup.ReportId).trigger("change");

        }, 0);
        setTimeout(function () {
            $("#roleDdl").select2({
                theme: "classic",
            }).val(aAppNotificationSetup.RoleId).trigger("change");

        }, 0);

        $scope.IsActive = aAppNotificationSetup.IsActive;
        $scope.IsUpdate = true;
    }
    $scope.reloadBtn = function () {
        $('#textNotificationSetup').val('');
        $scope.NotificationSetup = null;
        GetAppNotificationSetupPaged(1);
    }
    $scope.NotificationSetupSearch = function () {
        GetAppNotificationSetupPaged(1);

    }
    function GetAppNotificationSetupPaged(curPage) {
        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
        var whereClause = '';
        if ($scope.NotificationSetup != undefined && $scope.NotificationSetup != "") {
            whereClause = "RN.[ReportName] LIKE '%" + $scope.NotificationSetup + "%' or R.[RoleName] LIKE '%" + $scope.NotificationSetup + "%' or E.[EmployeeName] LIKE '%" + $scope.NotificationSetup + "%'";
        }
        $http({
            url: encodeURI('/EmailNotificationSetup/GetAppNotificationSetupPaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + '&whereClause=' + whereClause + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data != "") {
                if (data.ListData.length > 0) {
                    

                }
                else {
                    $scope.AppNotificationSetuplist = [];
                    alertify.log('App Notification Setup  Not Found', 'error', '5000');

                }
            }


           
            $scope.AppNotificationSetuplist = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }
    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetAppNotificationSetupPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetAppNotificationSetupPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetAppNotificationSetupPaged($scope.currentPage);
        }
    };
    $scope.Reset = function () {
        Clear();
        $('#ddlReportName').select2('destroy');
        $('#ddlReportName').val('').select2({
            theme: "classic",
        });
        $('#roleDdl').select2('destroy');
        $('#roleDdl').val('').select2({
            placeholder: "Search for: Role Name",
            theme: "classic",
        });
        $scope.ddlRole = null;
        $scope.ddlReportName = null;
        $scope.selectEmployee.removeAttribute("disabled");
    }


})