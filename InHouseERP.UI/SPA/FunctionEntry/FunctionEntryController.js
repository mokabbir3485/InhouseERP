app.controller("FunctionEntryController", function ($scope, $rootScope, $http) {
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
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Function').ScreenId;
        GetUsersPermissionDetails();

        if ($rootScope.$PermissionList !== undefined) {
            $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Function').ScreenId;
            GetUsersPermissionDetails();
        }
        else {
            setTimeout(function () {
                $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Function').ScreenId;
                GetUsersPermissionDetails();
            }, 500);

        }
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetFunctionPaged($scope.currentPage);

        $scope.Function = {}
        $scope.Function.FunctionId = 0;
        $scope.Function.IsPage = true;

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



    function SaveFunction(status) {
        var parms = JSON.stringify({ Function: $scope.Function });
        $http.post('/Role/PostFunction', parms).success(function (data) {
            if (data > 0) {
                alertify.log('Function ' + status + ' Successfully!', 'success', '5000');
                clear();
                $scope.FunctionEntry.$setPristine();
                $scope.FunctionEntry.$setUntouched();
            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }

    $scope.PostFunction = function () {
        if ($scope.Function.FunctionId == 0 && $scope.CreatePermission) {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    SaveFunction('Saved');
                }
            })
        }
        else if ($scope.Function.FunctionId == 0 && !$scope.CreatePermission) {
            alertify.log('You do not have permission to save!', 'error', '5000');
        }
        else if ($scope.Function.FunctionId > 0 && $scope.RevisePermission) {
            alertify.confirm("Are you sure to update?", function (e) {
                if (e) {
                    SaveFunction('Updated');
                }
            })
        }
        else if ($scope.Function.FunctionId > 0 && !$scope.RevisePermission) {
            alertify.log('You do not have permission to Update!', 'error', '5000');
        }

    }
    $scope.SelFunction = function (aFunction) {
        $scope.Function = aFunction;

    }
    $scope.reloadBtn = function () {
        $('#textFunctionName').val('');
        $scope.FunctionName = null;
        GetFunctionPaged(1);
    }
    $scope.FunctionNameSearch = function () {
        GetFunctionPaged(1);

    }
    function GetFunctionPaged(curPage) {
        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var orderBy = 'FunctionId';
        var whereClause = '';

        if ($scope.FunctionName != undefined && $scope.FunctionName != "") {
            whereClause = "[FunctionName] LIKE '%" + $scope.FunctionName + "%'"
        }

        $http({
            url: encodeURI('/Role/GetFunctionPaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + '&whereClause=' + whereClause + '&orderBy=' + orderBy + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Functionlist = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }
    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetFunctionPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetFunctionPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetFunctionPaged($scope.currentPage);
        }
    };
    $scope.resetForm = function () {
        clear();
    }
});