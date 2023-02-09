app.controller("MaterialTypeEntryController", function ($scope, $cookieStore, $rootScope, $http, $window) {
    $scope.LoginUser = $cookieStore.get('UserData');
    //$scope.UserId = $scope.LoginUser.UserId;
    //$scope.ScreenId = $cookieStore.get('StockDeclarationTypeScreenId');

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.UserId = $scope.LoginUser.UserId;
   
    //$scope.ScreenId = parseInt(sessionStorage.getItem("MaterialTypeScreenId"));

    Clear();
    function Clear() {
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'MaterialTypeEntry').ScreenId;
        GetUsersPermissionDetails();

        $scope.button = "Save";
        $scope.ad_MatrialType = {};
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        MaterialTypeGetPaged($scope.currentPage);
        $scope.ad_MatrialType.IsActive = true;
       

        //GetUsersPermissionDetails();
        GetConfirmationMessageForAdmin();
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
    function ScreenLock() {
        $http({
            url: '/Permission/CheckScreenLock',
            method: 'GET',
            params: { userId: $scope.UserId, screenId: $scope.ScreenId },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data != '') {
                $scope.ScreenLockInfo = data;
                alertify.alert('This page is locked by ' + $scope.ScreenLockInfo[0].Username);
                window.location = '/Home/Index#/Home';
            }
            else {
                $scope.s_ScreenLock = new Object();
                $scope.s_ScreenLock.UserId = $scope.UserId;
                $scope.s_ScreenLock.ScreenId = $scope.ScreenId;
                var parms = JSON.stringify({ screenLock: $scope.s_ScreenLock });
                $http.post('/Permission/CreateScreenLock', parms).success(function (data) {
                });
            }
        });
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
   
    function SaveMaterialType() {
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $scope.ad_MatrialType.CreatorId = $scope.UserId;

                if ($scope.ad_MatrialType.UpdatorId != 0 || $scope.ad_MatrialType.UpdatorId != undefined) {
                    $scope.ad_MatrialType.UpdatorId = $scope.UserId;
                } else {
                    $scope.ad_MatrialType.UpdatorId = 0;

                }

                var parms = JSON.stringify({ _ad_MaterialType: $scope.ad_MatrialType });
                $http.post('/MaterialType/SaveMaterialType', parms).success(function (data) {

                    if (data > 0) {
                        alertify.log('Save Material Type ' + data + ' Successfully!', 'success', '5000');
                        Clear();
                        $scope.MatrealTypeEntryForm.$setPristine();
                        $scope.MatrealTypeEntryForm.$setUntouched();
                    } else {
                        alertify.log('Server Errors!', 'error', '5000');
                    }
                }).error(function (data) {
                    alertify.log('Server Errors!', 'error', '5000');
                });
            }
        })
        
    }


    $scope.SaveMaterialType = function () {
        SaveMaterialType()
    }
    $scope.reloadBtn = function () {
        $('#textItemCodeAndDescription').val('');
        $scope.ItemCodeAndDescription = null;
        MaterialTypeGetPaged(1);
    }
    $scope.MaterialTypeSearch = function () {
        MaterialTypeGetPaged(1);

    }
    function MaterialTypeGetPaged(curPage) {

        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
        //var SearchCriteria = "1=1";

        var SearchCriteria = "";
        if ($scope.ItemCodeAndDescription != undefined && $scope.ItemCodeAndDescription != "") {
            SearchCriteria = "[MaterialTypeName] LIKE '%" + $scope.ItemCodeAndDescription +
                "%' OR [MaterialTypeCode] LIKE '%" + $scope.ItemCodeAndDescription +
                "%' OR [MaterialTypeDescription] LIKE '%" + $scope.ItemCodeAndDescription + "%'";
            //alert("Name, Date Success!!!!!");
        }

        $http({
           // url: '/MaterialType/MatrialTypeGetPaged?startRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + '&rows=' + 0,
            url: encodeURI('/MaterialType/MatrialTypeGetPaged?startRecordNo=' + StartRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaterialTypelist = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }
    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            MaterialTypeGetPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            MaterialTypeGetPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            MaterialTypeGetPaged($scope.currentPage);
        }
    }


   
    //$scope.AddDeclarationType = function () {
    //    if ($scope.found) {
    //        $('#txtDeclarationType').focus();
    //    }
    //    else {
    //        $scope.ad_StockDeclarationType.CreatorId = $scope.UserId;
    //        $scope.ad_StockDeclarationType.UpdatorId = $scope.UserId;
    //        if ($scope.ConfirmationMessageForAdmin) {
    //            if ($scope.ad_StockDeclarationType.DeclarationTypeId == 0 && $scope.CreatePermission) {
    //                alertify.confirm("Are you sure to save?", function (e) {
    //                    if (e) {
    //                        SaveDeclarationType('Saved');
    //                    }
    //                })
    //            }
    //            else if ($scope.ad_StockDeclarationType.DeclarationTypeId == 0 && !$scope.CreatePermission) {
    //                alertify.log('You do not have permission to save!', 'error', '5000');
    //            }
    //            else if ($scope.ad_StockDeclarationType.DeclarationTypeId > 0 && $scope.RevisePermission) {
    //                alertify.confirm("Are you sure to update?", function (e) {
    //                    if (e) {
    //                        SaveDeclarationType('Updated');
    //                    }
    //                })
    //            }
    //            else if ($scope.ad_StockDeclarationType.DeclarationTypeId > 0 && !$scope.RevisePermission) {
    //                alertify.log('You do not have permission to Update!', 'error', '5000');
    //            }
    //        }
    //        else {
    //            if ($scope.ad_StockDeclarationType.DeclarationTypeId == 0 && $scope.CreatePermission) {
    //                SaveDeclarationType('Saved');
    //            }
    //            else if ($scope.ad_StockDeclarationType.DeclarationTypeId == 0 && !$scope.CreatePermission) {
    //                alertify.log('You do not have permission to save!', 'error', '5000');
    //            }
    //            else if ($scope.ad_StockDeclarationType.DeclarationTypeId > 0 && $scope.RevisePermission) {
    //                SaveDeclarationType('Updated');
    //            }
    //            else if ($scope.ad_StockDeclarationType.DeclarationTypeId > 0 && !$scope.RevisePermission) {
    //                alertify.log('You do not have permission to Update!', 'error', '5000');
    //            }
    //        }
    //    }
    //}
    $scope.SelMaterialType = function (materialType) {
        $scope.ad_MatrialType = materialType;
        $scope.button = "Update";
        $scope.Show = false;
    }
    //$scope.Delete = function () {
    //    alertify.confirm("Are you sure to delete?", function (e) {
    //        if (e) {
    //            var parms = JSON.stringify({ declarationTypeId: $scope.ad_StockDeclarationType.DeclarationTypeId });
    //            $http.post('/DeclarationType/Delete', parms).success(function (data) {
    //                if (data > 0) {
    //                    alertify.log('Stock Out Type Deleted Successfully!', 'success', '5000');
    //                    Clear();
    //                    $scope.declarationTypeEntryForm.$setPristine();
    //                    $scope.declarationTypeEntryForm.$setUntouched();
    //                } else {
    //                    alertify.log('Delete Failed!', 'error', '5000');
    //                }
    //            }).error(function (data) {
    //                alertify.log('Server Errors!', 'error', '5000');
    //            });
    //        }
    //    });
    //}
    $scope.resetForm = function () {
        Clear();
        $scope.MatrealTypeEntryForm.$setPristine();
        $scope.MatrealTypeEntryForm.$setUntouched();
    }
});