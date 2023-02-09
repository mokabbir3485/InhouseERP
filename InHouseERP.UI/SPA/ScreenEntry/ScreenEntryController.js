app.controller("ScreenEntryController", function ($scope, $rootScope, $http) {
    $scope.message = "Hello!";
    clear();
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    function clear() {
        
        $scope.UserId = $scope.LoginUser.UserId;
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Screen').ScreenId;
        GetUsersPermissionDetails();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetScreenPaged($scope.currentPage);

        $scope.Screen = {}
        $scope.Screen.ScreenId = 0;
        $scope.Screen.IsPage = true;

        $scope.example8settings = {
            scrollableHeight: '200px',
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
        $scope.DBFunctionIdList = [];
        $scope.FunctionIdList = [];
        $scope.example8data = [];
        $scope.FunctionPlaceholder = {
            buttonDefaultText: "Select Function",
            searchPlaceholder: "Search Function"
        };
        $scope.selectFunction = document.getElementById("selectFunction").getElementsByTagName('button')[0];
        $scope.selectFunctionMenu = document.getElementById("selectFunction").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectCompany.setAttribute("disabled", "disabled");
        $scope.selectFunction.style.width = "100%";
        $scope.selectFunctionMenu.style.width = "100%";

        $scope.ModuleList = [];
        GetAllModule();
        $scope.FunctionList = [];
        GetAllFunction();
    }
    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
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
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }

    function GetAllModule() {
        $http({
            url: '/Role/GetModuleByDomainId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ModuleList = data;
        });
    }

    function GetAllFunction() {
        $http({
            url: '/Role/GetAllFunction',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.FunctionList = data;
            angular.forEach($scope.FunctionList, function (aData) {
                $scope.example8data.push({ id: aData.FunctionId, label: aData.FunctionName });
            })
        });
    }


    function SaveScreen(status) {

        angular.forEach($scope.FunctionIdList, function (data) {
            data.FunctionId = data.id;
            data.IsActive = true;
        });


        var listToDelete = [];
        for (var i = 0; i < $scope.FunctionIdList.length; i++) {
            listToDelete.push($scope.FunctionIdList[i].FunctionId);
        }
        $scope.DBFunctionIdList = $scope.DBFunctionIdList.filter(el => (listToDelete.indexOf(el.FunctionId) == -1));

        angular.forEach($scope.DBFunctionIdList, function (data) {
            data.IsActive = false;
            $scope.FunctionIdList.push(data);
        });

        console.log('FunctionIdList', $scope.FunctionIdList);
        var parms = JSON.stringify({ Screen: $scope.Screen, ScreenDetailList: $scope.FunctionIdList});
        $http.post('/Role/PostScreen', parms).success(function (data) {
            if (data > 0) {
                alertify.log('Screen ' + status + ' Successfully!', 'success', '5000');
                clear();
                $('#ddlModule').select2('destroy');
                $('#ddlModule').val('').select2({
                    placeholder: "Search for: Module",
                    theme: "classic",
                    dropdownAutoWidth: false
                });
                $scope.ddlModule = null;
                $scope.screenEntry.$setPristine();
                $scope.screenEntry.$setUntouched();
            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }

    $scope.PostScreen = function () {

        if ($scope.Screen.ScreenId == 0 && $scope.CreatePermission) {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    SaveScreen('Saved');
                }
            })
        }
        else if ($scope.Screen.ScreenId == 0 && !$scope.CreatePermission) {
            alertify.log('You do not have permission to save!', 'error', '5000');
        }
        else if ($scope.Screen.ScreenId > 0 && $scope.RevisePermission) {
            alertify.confirm("Are you sure to update?", function (e) {
                if (e) {
                    SaveScreen('Updated');
                }
            })
        }
        else if ($scope.Screen.ScreenId > 0 && !$scope.RevisePermission) {
            alertify.log('You do not have permission to Update!', 'error', '5000');
        }
        
    }
    $scope.SelScreen = function (aScreen) {
        $scope.Screen = aScreen;
        setTimeout(function () {
            $("#ddlModule").select2({
                theme: "classic",
            }).val(aScreen.ModuleId).trigger("change");
        }, 0);
        $scope.FunctionIdList = [];
        $scope.DBFunctionIdList = [];
        $http({
            url: '/Permission/GetDetailByScreenId?ScreenId=' + aScreen.ScreenId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                aData.id = aData.FunctionId;
                $scope.FunctionIdList.push(aData);
                $scope.DBFunctionIdList.push(aData);
            })
        });
    }
    $scope.reloadBtn = function () {
        $('#textScreenName').val('');
        $scope.ScreenName = null;
        GetScreenPaged(1);
    }
    $scope.ScreenNameSearch = function () {
        GetScreenPaged(1);

    }
    function GetScreenPaged(curPage) {
        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var orderBy = 'S.Sorting';
        var whereClause = '';

        if ($scope.ScreenName != undefined && $scope.ScreenName != "") {
            whereClause = "[ScreenName] LIKE '%" + $scope.ScreenName + "%' or [ModuleName] LIKE '%" + $scope.ScreenName + "%' or [ScreenUrl] LIKE '%" + $scope.ScreenName + "%'"
        }

        $http({
            url: encodeURI('/Role/GetScreenPaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + '&whereClause=' + whereClause + '&orderBy=' + orderBy + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Screenlist = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }
    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetScreenPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetScreenPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetScreenPaged($scope.currentPage);
        }
    };
    $scope.resetForm = function () {
        clear();
        $('#ddlModule').select2('destroy');
        $('#ddlModule').val('').select2({
            placeholder: "Search for: Module",
            theme: "classic",
            dropdownAutoWidth: false
        });
    }
});