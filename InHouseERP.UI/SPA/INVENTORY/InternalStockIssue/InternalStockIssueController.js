app.controller("InternalStockIssueController", function ($scope, $cookieStore, $http, $filter, $window, $rootScope) {

    Clear();
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            //  console.log('$scope.LoginUser',$scope.LoginUser);
        }
        $scope.IssueListForGrid = [];
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForIssue($scope.currentPage);

        $scope.btnSave = "Save";
        GetAllEmployee();
        GetAllStore();
        GetAllDepartment();
        StockIssueNumberGenaratorMethod();
        $scope.EmployeeList = [];
        $scope.Storelist = [];
        $scope.DepartmentList = [];
        $scope.inv_InternalStockIssue = {};
        $scope.ItemCombinationList = [];
        GetByCombinationand();
        GetAllItemUnit();
        $scope.ItemUnitlist = [];

        GetAllmatrialpaperType();
        $scope.matrialPaperTypeList = [];

        $scope.InternalStockIssueDetail = {};
        $scope.InternalStockIssueDetailList = [];
        $scope.CategoryList = [];
        GetAllCategory();
        $scope.ItemCombinationListTemp = [];
        $scope.ddlmatrialPaperType = null;
        $scope.inv_InternalStockIssue.CurrentStock = 0;
        $scope.inv_InternalStockIssue.StockUnitName = "N/A";
        $scope.inv_InternalStockIssue.IssueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
    }


    $("#txtIssueDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.IssueDateChangeFor = function () {
        $("#txtIssueDate").focus();
        $("#txtIssueDate").trigger("click");
    }


    function GetAllItemUnit() {
        $http({
            url: '/Unit/GetAllUnit',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemUnitlist = data;
        });
    }


    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            $scope.ddlIssuedBy = { EmployeeId: $scope.LoginUser.EmployeeId };
            $scope.inv_InternalStockIssue.IssuedById = $scope.LoginUser.EmployeeId;
            $scope.inv_InternalStockIssue.IssuedBy = $scope.LoginUser.FullName;

            $scope.ReportBtnDisabled = false;
        });
    }

    function GetAllStore() {

        $http({
            //url: '/Department/DepartmentGetByBranchAndDeptTypeId?departmentTypeIds=' + '1,4' + '&branchId=' + null,
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Storelist = data;
            //angular.forEach(data, function (aData) {
            //    aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
            //    $scope.Storelist.push(aData);
            //})

        });

        //$http({
        //    url: '/Department/GetAllStore',
        //    method: 'GET',
        //    headers: { 'Content-Type': 'application/json' }
        //}).success(function (data) {
        //    $scope.Storelist = data;
        //});
    }

    function GetAllDepartment() {

        $http({
            url: '/Department/DepartmentGetByBranchAndDeptTypeId?departmentTypeIds=' + '1,4' + '&branchId=' + null,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            /// $scope.DepartmentList = data;
            //  console.log("$scope.DepartmentList", $scope.DepartmentList);

            angular.forEach(data, function (aData) {
                aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                $scope.DepartmentList.push(aData);
            })

        });
    }

    function StockIssueNumberGenaratorMethod() {

        $http({
            url: '/Issue/InternalStockIssueGetMaxStockIssueNumber',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxIssueNo = data;
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
                $scope.inv_InternalStockIssue.IssueNo = 'ISN/' + $scope.finYearEPZ + '/' + $scope.MaxIssueNo;
            });
        });

    }

   

    function GetByCombinationand() {
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.ItemCombinationListTemp = data;
            $scope.ItemCombinationList = data.filter((aD) => aD.CategoryId == 6)
            //angular.forEach(data, function (aData) {
            //    if (aData.CategoryId ==6 ) {

            //        //aData.ItemName = aData.ItemName +
            //        //    " ~ " +
            //        //    aData.ItemDescription +
            //        //    " ~ " +
            //        //    aData.ItemCode
            //        //    +
            //        //    " ~ " + "Sub Category: " +
            //        //    aData.SubCategoryName;

            //        $scope.ItemCombinationList.push(aData)
            //    }



            //})




        })
    }

    $scope.CheckPurchaseTypeFlag = function (ddlCate) {
        $scope.ItemCombinationList = [];
        if (ddlCate.CategoryId == 6) {
            $scope.ItemCombinationList = $scope.ItemCombinationListTemp.filter((aD) => aD.CategoryId == 6)
        } else if (ddlCate.CategoryId == 5) {
            $scope.ItemCombinationList = $scope.ItemCombinationListTemp.filter((aD) => aD.CategoryId == 5)
        }
        else if (ddlCate.CategoryId == 6) {
            $scope.ItemCombinationList = $scope.ItemCombinationListTemp.filter((aD) => aD.CategoryId == 3)
        }
       
    }

    function GetAllmatrialpaperType() {
        $http({
            url: '/MaterialType/GetAllMaterialType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaperTypeList = data;
            angular.forEach(data, function (aData) {
                aData.Combination = aData.MaterialTypeName + ' ~ ' + aData.MaterialTypeCode
                $scope.matrialPaperTypeList.push(aData);
            })

        });
    }


    $scope.AddInternalStock = function () {

        var isValid = true;
        var MaterialTypeId = 0;
        if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
            //alertify.log('Matrial Paper Type can`t be null or empty', 'error', '3000');
            //isValid = false;
            //return;
            $scope.ddlmatrialPaperType = { MaterialTypeId: 0, Combination:"N/A"};
           
        } 
        if ($scope.ItemSearchCombination == null || $scope.ItemSearchCombination == undefined) {
            alertify.log('Item Name can`t be null or empty', 'error', '3000');
            isValid = false;
            return;
        }
       
        else if ($scope.ddlMu == null || $scope.ddlMu == undefined) {
            alertify.log('Unit can`t be null or empty', 'error', '3000');
            isValid = false;
            return;
        }
        else if ($scope.InternalStockIssueDetail.Quantity == null || $scope.InternalStockIssueDetail.Quantity == undefined) {
            alertify.log('Quantity can`t be null or empty', 'error', '3000');
            isValid = false;
            return;
        }
        if ($scope.inv_InternalStockIssue.CurrentStock == 0 || $scope.inv_InternalStockIssue.CurrentStock == undefined) {
            alertify.log('Current Stock can`t be null or empty', 'error', '3000');
            isValid = false;
            return;
        }
        if (isValid) {

            $scope.InternalStockIssueDetail.ItemId = $scope.ItemSearchCombination.ItemId;
            $scope.InternalStockIssueDetail.ItemCombinationName = $scope.ItemSearchCombination.ItemCombinationName;

            $scope.InternalStockIssueDetail.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
            $scope.InternalStockIssueDetail.MaterialTypeName = $scope.ddlmatrialPaperType.Combination;
            $scope.InternalStockIssueDetail.UnitId = $scope.ddlMu.ItemUnitId;
            $scope.InternalStockIssueDetail.UnitName = $scope.ddlMu.UnitName;
            $scope.InternalStockIssueDetail.Quantity = $scope.InternalStockIssueDetail.Quantity;
            $scope.InternalStockIssueDetailList.push($scope.InternalStockIssueDetail);

          
            $scope.ItemSearchCombination = null;
            $scope.ddlmatrialPaperType = null;

            $("#InternalIssueSelectitemName").val('').select2({
                theme: "classic"
            });

            $("#ddlmatrialPaperType").val('').select2({
               // theme: "classic"
            });
            $scope.ddlMu = null;
            $scope.InternalStockIssueDetail = {};

            $scope.inv_InternalStockIssue.CurrentStock = 0;
            $scope.inv_InternalStockIssue.StockUnitName = "N/A";


        } 

    }

    function GetAllCategory() {
        $http({
            url: "/Category/GetAllCategory",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
           // $scope.CategoryList = data;
            $scope.CategoryList = data.filter((aCat) => aCat.CategoryId != 1 && aCat.CategoryId != 2 && aCat.CategoryId != 4 && aCat.CategoryId != 5)
            $scope.ddlCategory = { CategoryId: 6 };
        });
    }

    $scope.SaveInternalStockIssue = function () {
        var isValidFlag = true;
        if ($scope.ddlDepartment == null || $scope.ddlDepartment == undefined) {
            alertify.log('Department can`t be null or empty', 'error', '3000');
            isValidFlag = false;
            return;
        } else if ($scope.ddlIssuedBy == null || $scope.ddlIssuedBy == undefined) {
            alertify.log('Issued By can`t be null or empty', 'error', '3000');
            isValidFlag = false;
            return;
        }
        else if ($scope.inv_InternalStockIssue.IssueNo == "" || $scope.inv_InternalStockIssue.IssueNo == undefined) {
            alertify.log('Issue No can`t be null or empty', 'error', '3000');
            isValidFlag = false;
            return;
        }
        else if ($scope.inv_InternalStockIssue.IssueDate == "" || $scope.inv_InternalStockIssue.IssueDate == undefined) {
            alertify.log('Issue Date can`t be null or empty', 'error', '3000');
            isValidFlag = false;
            return;
        }
        //if ($scope.InternalStockIssueDetailList.length > 0) {
        //    alertify.log('Item Details can`t be null or empty', 'error', '3000');
        //    isValidFlag = false;
        //    return;
        //}

        if (isValidFlag) {
            $scope.inv_InternalStockIssue.FromDepartmentId = $scope.ddlDepartment.DepartmentId;
            $scope.inv_InternalStockIssue.IssuedById = $scope.ddlIssuedBy.EmployeeId;
            $scope.inv_InternalStockIssue.CreatorId = $scope.LoginUser.UserId;
            $scope.inv_InternalStockIssue.UpdatorId = $scope.LoginUser.UserId;
            var parms = JSON.stringify({ InternalstockIssue: $scope.inv_InternalStockIssue, InternalStockIssueDetailLst: $scope.InternalStockIssueDetailList });
            SaveInternalStock(parms);
        }
      
      
    }


    function SaveInternalStock(parms) {

         alertify.confirm("Are you sure to save ?", function (e) {
            if (e) {
                $http.post('/Issue/SaveInternalStockIssue', parms).success(function (data) {
                    Clear();
                    if (data != "") {
                       

                        alertify.log('Internal Issue No : ' + data + ' ' + status + ' Successfully!', 'success', '5000');
                    }
                    else {
                        alertify.log('Server Errors!', 'error', '5000');
                    }
                });
            }
         });
    }

    $scope.CheckStock = function () {
        var isValidStock = true;
        if ($scope.ddlDepartment == null || $scope.ddlDepartment == undefined) {
            alertify.log('Form Department Name can`t be null or empty', 'error', '3000');
            isValidStock = false;
            $scope.ddlmatrialPaperType = null;
            $('#ddlmatrialPaperType').select2('destroy');

            $('#ddlmatrialPaperType').val('').select2({
                //theme: "classic"
            });
            //$scope.ddlmatrialPaperType = null;
            return;
        }
        else if ($scope.ItemSearchCombination == null || $scope.ItemSearchCombination == undefined) {
            alertify.log('Item Name can`t be null or empty', 'error', '3000');
            isValidStock = false;
            $scope.ddlmatrialPaperType = null;
            $('#ddlmatrialPaperType').select2('destroy');
            $('#ddlmatrialPaperType').val('').select2({
                // theme: "classic"
            });

            return;
        }
        var MaterialTypeId = 0;
        if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
            MaterialTypeId = 0;
            $("#ddlmatrialPaperType").val("").select2({
                //theme: "classic"
            });
            $scope.ddlmatrialPaperType = null;
        } else {
            MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
        }

        if (isValidStock) {
            $scope.inv_InternalStockIssue.CurrentStock = 0;
            $scope.inv_InternalStockIssue.StockUnitName = "N/A";
            $http({
                url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + $scope.ddlDepartment.DepartmentId + "&ItemId=" + $scope.ItemSearchCombination.ItemId + "&MaterialTypeId=" + MaterialTypeId + "&LabelBrandId=" + null,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                if (data.length > 0) {
                    $scope.inv_InternalStockIssue.CurrentStock = data[0].CurrentQuantity;
                    $scope.inv_InternalStockIssue.StockUnitName = data[0].UnitName;
                    $scope.ddlMu = { ItemUnitId: data[0].ItemUnitId, UnitName: data[0].UnitName }
                } else {
                    $scope.inv_InternalStockIssue.CurrentStock = 0;
                    $scope.inv_InternalStockIssue.StockUnitName = "N/A";
                    $scope.ddlMu = null;
                }


            });
        }
        else {
            $("#ddlmatrialPaperType").val("").select2({
                //theme: "classic"
            });
            $scope.ddlmatrialPaperType = null;
        }

      
    }

    $scope.RemoveStockissue = function (Stockissue) {

        var index = $scope.InternalStockIssueDetailList.indexOf(Stockissue);
        $scope.InternalStockIssueDetailList.splice(index, 1);
      
    }



    $("#txtFromIssue").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForIssue = function () {
        $("#txtFromIssue").focus();
        $("#txtFromIssue").trigger("click");
    }


    $("#txtToDateForIssue").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForIssue = function () {
        $("#txtToDateForIssue").focus();
        $("#txtToDateForIssue").trigger("click");
    }


    $scope.reloadBtn = function () {
        $('#txtFromIssue').val('');
        $('#txtToDateForIssue').val('');
        $('#IsssueNoAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.IssueNoAndCompanyName = null;
        GetPagedForIssue(1);
        $scope.isReportDisabled = false;
    }

    $scope.IssueSearch = function () {
        GetPagedForIssue(1);

    }

    function GetPagedForIssue(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromIssue").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForIssue").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.IssueNoAndCompanyName != undefined && $scope.IssueNoAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([ISI].[IssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([ISI].[IssueNo] LIKE '%" + $scope.IssueNoAndCompanyName + "%' OR [D].[DepartmentName] LIKE '%" + $scope.IssueNoAndCompanyName + "%')";

        }
        else if ($scope.IssueNoAndCompanyName !== undefined && $scope.IssueNoAndCompanyName != null && $scope.IssueNoAndCompanyName != "") {
            SearchCriteria = "[ISI].[IssueNo] LIKE '%" + $scope.IssueNoAndCompanyName + "%' OR [D].[DepartmentName] LIKE '%" + $scope.IssueNoAndCompanyName + "%' ";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[ISI].[IssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }



        $http({
            url: encodeURI('/Issue/InternalStockIssuedGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.IssueListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;

            if ($scope.IssueListForGrid.length > 0) {
                angular.forEach($scope.IssueListForGrid, function (aIssue) {
                    var res1 = aIssue.IssueDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aIssue.IssueDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aIssue.IssueDate = date1;
                    }

                   
                })

            }
            else {
                alertify.log('Internal Issue  Not Found', 'error', '5000');
            }

        });
    }

    $scope.getData = function (curPage) {
        $scope.isReportDisabled = false;
        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForIssue($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForIssue($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForIssue($scope.currentPage);
        }
        //  }


    }

    $scope.InternalIssueReport = function (issue) {
        $window.open("#/InternalStockIssueReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("InternalStockIssue", issue.StockIssueId);
        // sessionStorage.setItem("StockRecive", JSON.stringify(Item));
        event.stopPropagation();
    }

    $scope.resetForm = function () {
        Clear();
    }

});