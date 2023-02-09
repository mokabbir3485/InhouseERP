app.controller("StockStatusController", function ($scope, $cookieStore, $http, $filter, $rootScope, $window) {
    $scope.CurrentValuationSetup = sessionStorage.getItem('Valuation');

    Clear();

    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Stock Status').ScreenId;
        GetUsersPermissionDetails();


        $scope.StockStatusList = [];
        $scope.StockStatusDetailList = [];
        //$scope.CategoryList = [];
        //$scope.ddlCategory = {};
        //$scope.ddlCategory.CategoryId = null;
        $scope.FromDate =  $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        //GetAllCategory();
        $scope.StoreList = [];
        GetAllStore();
        GetAllSubCategory();
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
        $scope.SubCategoryIdList = [];
        $scope.example8data = [];
        $scope.subcategoryPlaceholder = {
            buttonDefaultText: "Select Subcategory",
            searchPlaceholder: "Search Subcategory"
        };
        $scope.selectSubcategory = document.getElementById("selectSubcategory").getElementsByTagName('button')[0];
        $scope.selectSubcategoryMenu = document.getElementById("selectSubcategory").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectSubcategory.setAttribute("disabled", "disabled");
        $scope.selectSubcategory.style.width = "100%";
        $scope.selectSubcategoryMenu.style.width = "100%";

        //$scope.selectJumbo = document.getElementById("selectJumbo").getElementsByTagName('button')[0];
        //$scope.selectJumboMenu = document.getElementById("selectJumbo").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectJumbo.setAttribute("disabled", "disabled");
        //$scope.selectJumbo.style.width = "100%";
        //$scope.selectJumboMenu.style.width = "100%";


    }
    $scope.fouseSearchBox = function () {
        $('#selectSubcategory > div > ul > li:nth-child(4) > div > input').focus();
    }

    //$scope.CategoryNull = function (ddlCategory) {
    //    if (ddlCategory == null) {
    //        $scope.ddlCategory = {};
    //        $scope.ddlCategory.CategoryId = null;
    //    }
    //}

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
    function GetAllStore() {
        $http({
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (userOutletList) {
            $scope.StoreList = userOutletList;
        });
    }
    function GetAllSubCategory() {
        $http({
            url: "/Subcategory/GetAllSubategory",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.SubcategoryList = data;

            angular.forEach($scope.SubcategoryList, function (aData) {
                $scope.example8data.push({ id: aData.SubCategoryId, label: aData.CategoryName + ' ~ ' + aData.SubCategoryName });
            })
        });
    }
    $scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        $scope.StockStatusListForReport = [];
        if ($scope.selectedAll == false) {
            angular.forEach($scope.margeStockStatusList, function (item) {
                item.Selected = $scope.selectedAll;

            });
        } else {
            angular.forEach($scope.margeStockStatusList, function (item) {
                item.Selected = $scope.selectedAll;
                $scope.StockStatusListForReport.push(item);

            });
        }


    };
    $scope.RowSelect = function () {

        $scope.StockStatusListForReport = Enumerable.From($scope.margeStockStatusList).Where('$.Selected==true').ToArray();
        if ($scope.margeStockStatusList.length == $scope.StockStatusListForReport.length) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }

        

    }

    $scope.OpenReportBtn = function () {

        var obj = {};
        obj.DepartmentName = $scope.ddlStore.DepartmentName;
        obj.FromDate = $scope.FromDate;
        obj.CategoryName = $scope.example8data;
        obj.Remarks = $scope.Remarks;
       
        sessionStorage.setItem("StockStatusReport", JSON.stringify($scope.StockStatusListForReport));
        $cookieStore.put("GetDropdowanValue", obj);
        $window.open("#/StockStatusReport", "popup", "width=850,height=550,left=280,top=80");

    
      
    }
    //function GetAllCategory() {
    //    $http({
    //        url: "/Category/GetAllCategory",
    //        method: "GET",
    //        headers: { 'Content-Type': "application/json" }
    //    }).success(function (data) {
    //        $scope.CategoryList = data;
    //    });
    //}
    $scope.onLoadBtn = function () {
        if ($scope.ddlStore == undefined) {
            $scope.ddlStore = {};
            $scope.ddlStore.DepartmentId = null;
        }
        $scope.SubCategoryIds = '';
        angular.forEach($scope.SubCategoryIdList, function (data) {
            $scope.SubCategoryIds += $scope.SubCategoryIds == '' ? data.id : (',' + data.id)

        });
        $scope.StockStatusList = [];
        $http({
            url: '/Receive/GetStockStatus?StatusDate=' + $scope.FromDate + "&DepartmentId=" + $scope.ddlStore.DepartmentId + "&SubCategoryIds=" + $scope.SubCategoryIds,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.StockStatusList = data;
            console.log("StockStatusList",$scope.StockStatusList);

            angular.forEach($scope.StockStatusList, function (aData) {
                aData.DisplaySta = false;
                var res1 = aData.LedgerDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.LedgerDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.LedgerDate = date1;
                }

             

            });
            if ($scope.StockStatusList != "") {
                $scope.margeStockStatusList = $scope.StockStatusList.reduce((r, { SubCategoryName, CategoryId, SubCategoryId, ItemName, ItemCode, ItemId, MaterialTypeId, MaterialTypeName, LabelBrandId, LabelBrandName, DepartmentName, DepartmentId, LedgerDate, BalanceQuantity, AveragePrice, DisplaySta }) => {
                    var temp = r.find(o => o.ItemId === ItemId && o.MaterialTypeId === MaterialTypeId && o.LabelBrandId === LabelBrandId);

                    if (!temp) {
                        r.push({ SubCategoryName, CategoryId, SubCategoryId, ItemName, ItemCode, ItemId, MaterialTypeId, MaterialTypeName, LabelBrandId, LabelBrandName, DepartmentName, DepartmentId, LedgerDate, BalanceQuantity, AveragePrice, DisplaySta });
                    } else {
                        temp.BalanceQuantity += BalanceQuantity;
                        temp.AveragePrice += AveragePrice;
                    }
                    return r;
                }, []);
            }
            


        });

    }

 

    $scope.AutoCollaseStockStatus = function (aStockStatus) {
        $scope.StockStatusDetailList = [];
        $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
        var T_Qty = 0;
        var T_APrice = 0;
        var obj = {};
        angular.forEach($scope.margeStockStatusList, function (aData) {
           
            if (aData.ItemId == aStockStatus.ItemId && aData.MaterialTypeId === aStockStatus.MaterialTypeId && aData.LabelBrandId === aStockStatus.LabelBrandId && aData.DepartmentId == aStockStatus.DepartmentId && aStockStatus.DisplaySta == true) {
                aData.DisplaySta = true;
            } else {
                aData.DisplaySta = false;
            }
        })

        angular.forEach($scope.StockStatusList, function (aData) {
            if (aData.ItemId == aStockStatus.ItemId && aData.MaterialTypeId === aStockStatus.MaterialTypeId && aData.LabelBrandId === aStockStatus.LabelBrandId) {
                    $scope.StockStatusDetailList.push(aData);
                if (aData.CategoryId == 2) {
                    var criteria = "HSWS.DepartmentId=" + aData.DepartmentId + " AND ItemId=" + aData.ItemId;
                    $http({
                        url: "/StockAdjustment/GetHardwareWarrantyAndSerial_GetDynamic?criteria=" + criteria + "&orderBy='SerialNo'",
                        method: "GET",
                        headers: { 'Content-Type': "application/json" }
                    }).success(function (data) {
                        angular.forEach(data, function (Obj) {
                            $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(Obj);
                        })
                        

                    })
                }
            }
            
        })
        
    }


    $scope.aSOnDate = function () {
        $("#txtasOnDate").focus();
        $("#txtasOnDate").trigger("click");
    }

    $("#txtasOnDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    //$("#txtFromDateForSS").datepicker({
    //    dateFormat: "M d, yy",
    //    changeMonth: true,
    //    changeYear: true
    //});

    //$scope.FormDateChangeForSS = function () {
    //    $("#txtFromDateForSS").focus();
       
    //}


    //$("#txtToDateForSS").datepicker({
    //    dateFormat: "M d, yy"
    //});

    //$scope.ToDateChangeForSS = function () {
    //    $("#txtToDateForSS").focus();
    //    $("#txtToDateForSS").trigger("click");
    //}

})