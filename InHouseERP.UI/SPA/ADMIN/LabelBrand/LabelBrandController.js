app.controller("LabelBrandController", function ($scope, $rootScope, $http, $window) {
    //For Screen lock


    Clear();
    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Label Brand').ScreenId;
        GetUsersPermissionDetails();

        $scope.companyList = [];
        $scope.ItemSearchList = [];
        //Server side pagination
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;

        $scope.ad_LabelBrand = {};
        $scope.ad_LabelBrand.LabelBrandId = 0;
        $scope.btnSave = "Save";
        $scope.ad_LabelBrand.IsActive = true;
        GetActiveCompany();
        GetAllItem();
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        //GetUsersPermissionDetails();
        $scope.ddlCompany = null;

        GetLabelBrandPaged($scope.currentPage);
    }

    function formatOutput(optionElement) {
        //if (!optionElement.id) { return optionElement.text; }
        var ItemCombination = '';
        var DescriptionPart = optionElement.text.split('Sub Category: ');
        var SubCategoryName = DescriptionPart[1];
        if (SubCategoryName == 'Pre Printed Label') {
            ItemCombination = '<strong style="background-color: #dd4b39; color: white;">' + DescriptionPart[0] + 'Sub Category: ' + DescriptionPart[1] + '</strong>';
        } else {
            ItemCombination = DescriptionPart[0] + 'Sub Category: ' + DescriptionPart[1];
        }

        var $state = $(
            '<span>' + ItemCombination + '</span>'
        );
        return $state;
    };
    $("#itemName").select2({
        placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
        theme: "classic",
        //dropdownAutoWidth: false,
        templateResult: formatOutput,
        //width: 'resolve'
    });

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
    
    function GetConfirmationMessageForAdmin() {
        $http({
            url: '/Role/GetConfirmationMessageForAdmin',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ConfirmationMessageForAdmin = (data === 'true');
        });
    }
    function GetActiveCompany() {

        var criteria = "C.IsActive=1";

        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (companyList) {
            $scope.companyList = companyList;
        })
    }
    function GetAllItem() {
        $scope.ItemSearchList = [];
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                if (aData.CategoryId != 4) {
                    aData.TempItemName = aData.ItemName
                        +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " + "Size Code: " +
                        aData.ItemCode +
                        " ~ " + "Sub Category: " +
                        aData.SubCategoryName;
                    $scope.ItemSearchList.push(aData)
                }
            })

        });
    };
    $scope.GetCropTypeSearch = function () {
        GetLabelBrandPaged(1);
    }
    function GetLabelBrandPaged(curPage) {
        var SearchCriteria = "1=1";
        if ($scope.SearchCropTypeName != null && $scope.SearchCropTypeName != '' && $scope.SearchCropTypeName != undefined) {
            //SearchCriteria += " AND ISC.LabelBrandName LIKE '" + $scope.SearchCropTypeName + "%'";

            SearchCriteria = "[LabelBrandName] LIKE '%" + $scope.SearchCropTypeName +
                "%' OR [LabelBrandShortName] LIKE '%" + $scope.SearchCropTypeName +
                "%' OR I.[ItemCode] LIKE '%" + $scope.SearchCropTypeName +
                "%' OR I.[ItemDescription] LIKE '%" + $scope.SearchCropTypeName +
                "%' OR C.[CompanyName] LIKE '%" + $scope.SearchCropTypeName + "%'";
        }
        
        if ($scope.ddlSearchStatus != null && $scope.ddlSearchStatus != '' && $scope.ddlSearchStatus != undefined) {
            SearchCriteria += " AND LB.IsActive = " + $scope.ddlSearchStatus;
        }

        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
        $http({
            url: encodeURI('/LabelBrand/GetLabelBrandPaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + '&SearchCr=' + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.LabelBrandList = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }
    

    

    
    
    function SaveLabelBrand(Status) {
        var parms = JSON.stringify({ ad_LabelBrand: $scope.ad_LabelBrand });
        $http.post('/LabelBrand/Post', parms).success(function (data) {
            if (data > 0) {
                alertify.log('Label Brand ' + Status + ' Successfully!', 'success', '5000');
                Clear();
                $scope.LabelBrandForm.$setPristine();
                $scope.LabelBrandForm.$setUntouched();
            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }

    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetLabelBrandPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetLabelBrandPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetLabelBrandPaged($scope.currentPage);
        }
    }


    $scope.AddLabelBrand = function () {

        $scope.ad_LabelBrand.CreatorId = $scope.UserId;
        $scope.ad_LabelBrand.UpdatorId = $scope.UserId;

        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.ad_LabelBrand.LabelBrandId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        SaveLabelBrand('Saved');
                    }
                })
            }
            else if ($scope.ad_LabelBrand.LabelBrandId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.ad_LabelBrand.LabelBrandId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        SaveLabelBrand('Updated');
                    }
                })
            }
            else if ($scope.ad_LabelBrand.LabelBrandId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }

        }
        else {
            if ($scope.ad_LabelBrand.LabelBrandId == 0 && $scope.CreatePermission) {
                SaveLabelBrand('Saved');
            }
            else if ($scope.ad_LabelBrand.LabelBrandId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.ad_LabelBrand.LabelBrandId > 0 && $scope.RevisePermission) {
                SaveLabelBrand('Update');
            }
            else if ($scope.ad_LabelBrand.LabelBrandId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }

    }
    $scope.SelLabelBrand = function (aLabelBrand) {
        $scope.ad_LabelBrand = aLabelBrand;
        $('#itemName').select2('destroy');
        $('#itemName').val(aLabelBrand.ItemId).select2({
            placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
            templateResult: formatOutput,
            theme: "classic",
            //dropdownAutoWidth: false
        });
        $scope.ddlItemName = { ItemId: aLabelBrand.ItemId };
        $('#companyName').select2('destroy');
        $('#companyName').val(aLabelBrand.CompanyId).select2({
            placeholder: "Search for: Company Name",
            //templateResult: formatOutput,
            theme: "classic",
            //dropdownAutoWidth: false
        });
        $scope.ddlCompany = { CompanyId: aLabelBrand.CompanyId };

        $scope.btnSave = "Update";
    }
    
    $scope.resetForm = function () {
        Clear();
        $scope.LabelBrandForm.$setPristine();
        $scope.LabelBrandForm.$setUntouched();
    }
});