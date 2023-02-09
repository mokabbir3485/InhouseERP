app.controller("StockDeclarationEntryController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {
 
    Clear();
    //#region  Function
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Stock Declaration').ScreenId;
        //    GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Stock Declaration').ScreenId;
        //        GetUsersPermissionDetails();
        //    }, 500);
        //}

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Stock Declaration').ScreenId;
        GetUsersPermissionDetails();

        $scope.ddlDeclaredBy = { 'EmployeeId': $scope.LoginUser.EmployeeId };
        $scope.btnSave = "Save";
        $scope.inv_StockDeclaration = {};
        $scope.inv_StockDeclaration.DeclarationId = 0;
        $scope.inv_StockDeclaration.IsApproved = false;
        $scope.VarietyList = [];
        $scope.employeeList = [];
        $scope.Storelist = [];
        GetMaxStockDeclarationNumber();
        GetAllStore();
        GetAllEmployee();
        $scope.DeletedStockDeclarationDetailList = [];
        $scope.StockDeclarationDetailList = [];
        $scope.inv_StockDeclarationDetail = {};
        $scope.DelcerationSearchList = [];
        $scope.ddlEmployee = null;
        $scope.ddlStore = null;
        GetUnit();
     //   GetItemDynamic();
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetStockDeclarationPaged($scope.currentPage);
        ClearStockDeclarationDetail();
      //  GetUsersPermissionDetails();
       // GetByCombinationandDepertment();
        $scope.ItemList = [];
        $scope.AllCombinationlist = [];
        GetAllDeclarationType();
        $scope.declarationList = [];
        $scope.ddlDeclareType = null;

        $("#txtDeclarationDate").datepicker({
            dateFormat: "M d, yy",
            changeMonth: true,
            changeYear: true
        });
        $scope.CalendartxtIDeclarationDate = function () {
            $("#txtDeclarationDate").focus();
            $("#txtDeclarationDate").trigger("click");
        }
    }

    ///Declaration Type Get

    function GetAllDeclarationType() {
        $http({
            url: '/DeclarationType/GetAllDeclarationType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.declarationList = data;
         
        });
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
    function GetMaxStockDeclarationNumber() {
        $http({
            url: '/StockDeclaration/GetMaxStockDeclarationNumber',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (StockDeclarationNumber) {
            $scope.MaxStockDeclarationNumber = StockDeclarationNumber;
            var criteria = "IsActive=1";
            $http({
                url: '/FiscalYear/GetDynamic?searchCriteria=' + criteria + "&orderBy=FiscalYearId",
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                angular.forEach(data, function (aData) {
                    if (aData.BranchId == 1) {
                        $scope.finYearHeadOffice = aData.FiscalYearName;
                    } else if (aData.BranchId == 3) {
                        $scope.finYearEPZ = aData.FiscalYearName;
                    }
                })
                $scope.inv_StockDeclaration.DeclarationNo = 'SD/' + $scope.finYearEPZ + '/' + $scope.MaxStockDeclarationNumber;
            })


        });
    }
    //function GetItemDynamic() {
    //    var WhereCondition = 'I.isactive=1';
    //    $http({
    //        url: "/Item/GetItemDynamic?searchCriteria=" + WhereCondition + '&orderBy=ItemId',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        $scope.VarietyList = data;
    //        angular.forEach($scope.VarietyList,
    //            function (aData) {
    //                aData.TempItemName = aData.ItemName
    //                    +
    //                    " ~ " +
    //                    aData.ItemDescription +
    //                    " ~ " +
    //                    aData.ItemDescriptionTwo +
    //                    " ~ " + "Item Code:" +
    //                    aData.ItemCode
    //            });
    //    });
    //}
    function ClearStockDeclarationDetail() {
        $scope.inv_StockDeclarationDetail = {};
        $scope.ddlUnit = null;
        $scope.DetailAddBtn = "Add";
    }


    $scope.GetByCombinationandDepertment = function (Store) {
       
        $http({
            url: '/Item/GetByDepartmentAndCombinationLike?departmentId=' + Store.DepartmentId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllCombinationlist = JSON.parse(data);
            $scope.ItemList = JSON.parse(data);

            console.log("$scope.ItemList", $scope.ItemList);

        });
        
    }

    $scope.LoadCombination = function (item) {
        if (item.CurrentQuantity != 0) {
            $scope.inv_StockDeclarationDetail.StockQty = item.CurrentQuantity;
        } else {
            inv_StockDeclarationDetail.StockQty = 0;
        }
    }

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
            $scope.ddlDeclaredBy = { EmployeeId: $scope.LoginUser.EmployeeId };
            $scope.inv_StockDeclaration.DeclaredById = $scope.LoginUser.EmployeeId;
            $('#ddlDeclaredBy').select2('destroy');
            $('#ddlDeclaredBy').val($scope.LoginUser.EmployeeId).select2();
        });
    }
    function GetAllStore() {
        //$scope.LoginUser = $cookieStore.get('UserData');
        $http({
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (userOutletList) {
           // $scope.Storelist = userOutletList;
            angular.forEach(userOutletList, function (aData) {
                aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                $scope.Storelist.push(aData);
            })
            if ($scope.Storelist.length == 1) {
                $scope.ddlStore = { DepartmentId: $scope.Storelist[0].DepartmentId };
            }
        });
    }
    function GetUnit() {
        $http({
            url: '/Unit/GetAllUnit',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.unitlist = data;
            $scope.ddlUnit = { ItemUnitId : 2}
        })
    }

    function GetItemDetailsByUnit(itemId, unitId, deptId) {
        $http({
            url: '/StockValuation/GetByItemAndUnitAndDepartment?itemId=' + itemId + '&unitId=' + unitId + '&departmentId=' + deptId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (stkValuation) {
            if (stkValuation != "") {
                $scope.inv_StockDeclarationDetail.StockQty = stkValuation.CurrentQuantity;
            }
            else {
                $scope.inv_StockDeclarationDetail.StockQty = 0;
            }
            $('#txtDeclarationQty').focus();
        });
    }


    //$scope.GetItemDetails = function (unitId) {
    //    if (unitId != undefined) {
    //        GetItemDetailsByUnit($scope.Product.ItemId, unitId, $scope.ddlStore.DepartmentId);
    //    }
    //}

    $scope.AddDetail = function () {
        $scope.inv_StockDeclarationDetail.TempItemName = $scope.ddlItemName.Combination;
        $scope.inv_StockDeclarationDetail.ItemId = $scope.ddlItemName.ItemId;
        $scope.inv_StockDeclarationDetail.DeclarationUnitId = $scope.ddlUnit.ItemUnitId;
        $scope.StockDeclarationDetailList.push($scope.inv_StockDeclarationDetail);
        $scope.inv_StockDeclarationDetail = {};
        $('#itemName').select2('destroy');
        $('#itemName').val('').select2({
            placeholder: "Search for: Item Name ~ Description ~ Item Code",
            theme: "classic",
            dropdownAutoWidth: false
        });
    }

    $scope.removeStockDeclarationDetail = function (aStockDeclarationDetail) {
        var ind = $scope.StockDeclarationDetailList.indexOf(aStockDeclarationDetail);
        $scope.StockDeclarationDetailList.splice(ind, 1);
        if (aStockDeclarationDetail.DeclarationDetailId) {
            $scope.DeletedStockDeclarationDetailList.push(aStockDeclarationDetail);
        }


    };
    //SAVE
    function Post() {

        $scope.inv_StockDeclaration.UpdatorId = $scope.LoginUser.EmployeeId;
        $scope.inv_StockDeclaration.DeclarationTypeId = $scope.ddlDeclareType.DeclarationTypeId;

        var parms = JSON.stringify({ stockDeclaration: $scope.inv_StockDeclaration, stockDeclarationDetailList: $scope.StockDeclarationDetailList, DeletedStockDeclarationDetailList: $scope.DeletedStockDeclarationDetailList });
        $http.post('/StockDeclaration/SaveStockDeclaration', parms).success(function (data) {
            if (data > 0) {
                Clear();
                $scope.stockDeclarationEntryForm.$setPristine();
                $scope.stockDeclarationEntryForm.$setUntouched();
                alertify.log('Stock Declaration Saved Successfully!', 'success', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Save Errors!', 'error', '5000');
        });
    }
    $scope.AddStockDeclaration = function () {

        if ($scope.inv_StockDeclaration.DeclarationId == 0 && $scope.CreatePermission) {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    Post();
                }
            })
        }
        else if ($scope.inv_StockDeclaration.DeclarationId == 0 && !$scope.CreatePermission) {
            alertify.log('You do not have permission to save!', 'error', '5000');
        }
        else if ($scope.inv_StockDeclaration.DeclarationId > 0 && $scope.RevisePermission) {
            alertify.confirm("Are you sure to update?", function (e) {
                if (e) {
                    Post();
                }
            })
        }
        else if ($scope.inv_StockDeclaration.DeclarationId > 0 && !$scope.RevisePermission) {
            alertify.log('You do not have permission to Update!', 'error', '5000');
        }
        
    }
    $scope.SelStockDeclaration = function (aStockDeclaration) {
        $window.scrollTo(0, 0);
        $scope.inv_StockDeclaration = aStockDeclaration;
        $('#ddlDeclaredBy').select2('destroy');
        $('#ddlDeclaredBy').val(aStockDeclaration.DeclaredById).select2();
        $scope.ddlStore = { DepartmentId: aStockDeclaration.DepartmentId };

        $http({
            url: '/StockDeclaration/GetAllGetAllstockDeclarationDetailById?declarationId=' + aStockDeclaration.DeclarationId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (DetailList) {
            $scope.StockDeclarationDetailList = DetailList;
        });
    }


   

    $scope.OpenReport = function (aStockDeclaration) {

        $window.open("#/StockDeclarationReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("StockDeclaration", aStockDeclaration.DeclarationId);
     
        event.stopPropagation();
    }


    $scope.resetForm = function () {
        Clear();
        $scope.stockDeclarationEntryForm.$setPristine();
        $scope.stockDeclarationEntryForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForSD').val('');
        $('#txtToDateForSD  ').val('');
        $('#textDepartmentAndDeclarationNo').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchDepartmentAndDeclarationNo = null;
        GetStockDeclarationPaged(1);

    }

    $scope.StockDeclarationSearch = function () {
        GetStockDeclarationPaged(1);

    }

    function GetStockDeclarationPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSD").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForSD").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchDepartmentAndDeclarationNo != undefined && $scope.SearchDepartmentAndDeclarationNo != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([DeclarationDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([DeclarationNo] LIKE '%" + $scope.SearchDepartmentAndDeclarationNo + "%' OR [DepartmentName] LIKE '%" + $scope.SearchDepartmentAndDeclarationNo + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchDepartmentAndDeclarationNo !== undefined && $scope.SearchDepartmentAndDeclarationNo != null && $scope.SearchDepartmentAndDeclarationNo != "") {
            SearchCriteria = "[DeclarationNo] LIKE '%" + $scope.SearchDepartmentAndDeclarationNo + "%' OR [DepartmentName] LIKE '%" + $scope.SearchDepartmentAndDeclarationNo + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[DeclarationDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/StockDeclaration/GetStockDeclarationPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.DeclarationDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.DeclarationDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.DeclarationDate = date1;
                    }
                })

            }
            else {
                alertify.log('Stock Declaration  Not Found', 'error', '5000');
            }
            $scope.StockDeclarationListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetStockDeclarationPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetStockDeclarationPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetStockDeclarationPaged($scope.currentPage);
        }


    }

    $("#txtFromDateForSD").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForSD = function () {
        $("#txtFromDateForSD").focus();
        $("#txtFromDateForSD").trigger("click");
    }


    $("#txtToDateForSD").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChangeForSD = function () {
        $("#txtToDateForSD").focus();
        $("#txtToDateForSD").trigger("click");
    }
});