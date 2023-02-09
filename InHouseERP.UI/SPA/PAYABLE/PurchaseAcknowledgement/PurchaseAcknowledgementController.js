app.controller("PurchaseAcknowledgementEntryController", function ($scope,$rootScope,$cookieStore, $http, $filter, $window) {
    //#region  GLOBAL VARIABLES & METHODS CALL
    //var UserData = sessionStorage.getItem("UserDataSession");
    //if (UserData != null) {
    //    $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    //}
    var Valuation = sessionStorage.getItem("ValuationSession");
    if (Valuation != null) {
        $scope.CurrentValuationSetup = JSON.parse(sessionStorage.ValuationSession);
    }
    Clear();
    
    //#endregion 

    ////#region DATE CONFIG WITH JQUERY
    $("#dtFromDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
        //minDate: $scope.MinDate,
        //maxDate: new Date(parseInt($scope.CurrentValuationSetup.ToDate.replace('/Date(', '')))
    });

    $scope.CalendarOpenFromDate = function () {
        $("#dtFromDate").focus();
        $("#dtFromDate").trigger("click");
    }
    $("#dtToDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
        //minDate: $scope.MinDate,
        //maxDate: new Date(parseInt($scope.CurrentValuationSetup.ToDate.replace('/Date(', '')))
    });

    $scope.CalendarOpenToDate = function () {
        $("#dtToDate").focus();
        $("#dtToDate").trigger("click");
    }
    $("#dtApprovedDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
        //minDate: $scope.MinDate,
        //maxDate: new Date(parseInt($scope.CurrentValuationSetup.ToDate.replace('/Date(', '')))
    });

    $scope.CalendarOpenToDate = function () {
        $("#dtApprovedDate").focus();
        $("#dtApprovedDate").trigger("click");
    }
    //#endregion 

    //#region METHODS
    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Purchase Acknowledgement').ScreenId;


        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetAcknowledgementPaged($scope.currentPage);

        var today = ($filter('date')(new Date(), 'MMM dd, yyyy')).toString();
        $scope.inv_PurchaseBillList = [];
        $scope.PurchaseBillList = [];
        $scope.$PurchaseBillList = [];
        $scope.inv_PurchaseBill = { ApprovedBy: $scope.LoginUser.UserId, ApprovedDate: today };
       // $scope.MinDate = new Date(parseInt($scope.CurrentValuationSetup.FromDate.replace('/Date(', '')));
        $scope.FromDate = $scope.ToDate = today;
        $scope.VoucherNoExist = false;
        $scope.AcknowledgementDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetActiveSupplier();
        GetAllEmployee();
        GetAcknowledgementNo();
    }
    function GetAcknowledgementNo() {
        $http({
            url: '/PurchaseAcknowledgement/GetAcknowledgementNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AcknowledgementNo = data[0].AcknowledgementNo;
        });

    }
    function GetActiveSupplier() {
        $http({
            url: '/Supplier/GetDynamic?searchCriteria=IsActive=1',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierList = data;
        })
    }
    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
            $scope.ddlAcknowledgedBy = { "EmployeeId": $scope.LoginUser.EmployeeId };
            //$('#ddlAcknowledgedBy').select2('destroy');
            //$('#ddlAcknowledgedBy').val($scope.LoginUser.EmployeeId).select2();
        });
    }
    //#endregion 

    //#region EVENTS
    $scope.SearchPurchaseBill = function () {

        $http({
            url: '/PurchaseAcknowledgement/GetPurchaseAcknowledgement?SupplierId=' + $scope.ddlSupplier.SupplierId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.PBDate = date1;
                    }
                })
            }
            else
                alertify.log('No Purchase Bill Found', 'error', '5000');

            $scope.PurchaseBillList = data;
        });
    }

    $scope.CheckVoucherNoExists = function () {
        if (!angular.isUndefined($scope.inv_PurchaseBill.VoucherNo) && $scope.inv_PurchaseBill.VoucherNo != null && $scope.inv_PurchaseBill.VoucherNo != '') {
            $http({
                url: "/CompanyAdvance/CheckVoucherNoExists?voucherNo=" + $scope.inv_PurchaseBill.VoucherNo,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                if (data.length && data[0].VoucherCount > 0) {
                    alertify.log('Voucher No.' + $scope.inv_PurchaseBill.VoucherNo + ' already exists!', 'error', '5000');
                    $scope.VoucherNoExist = true;
                    $('#txtVoucherNo').focus();
                }
                else {
                    $scope.VoucherNoExist = false;
                }
            });
        }
    }

    $scope.RowSelect = function (row) {
        $scope.$PurchaseBillList = Enumerable.From($scope.PurchaseBillList).Where('$.selected==true').ToArray();
        //$scope.$PurchaseBillList = $scope.PurchaseBillList.filter(x => x.PBId === row.PBId);
        //$scope.inv_PurchaseBill.Amount = Enumerable.From($scope.inv_PurchaseBillList).Sum('$.Amount').toFixed(2);
    }

    $scope.SaveAcknowledgement = function () {

        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $scope.arr = $scope.AcknowledgementNo.split('/');
                $scope.num = parseInt($scope.arr[2]);
                angular.forEach($scope.$PurchaseBillList, function (aData) {
                    aData.AcknowledgementNo = $scope.arr[0] + '/' + $scope.arr[1] + '/' + $scope.num++
                    aData.AcknowledgementDate = $scope.AcknowledgementDate;
                    aData.AcknowledgedBy = $scope.ddlAcknowledgedBy.EmployeeId;
                })

                var params = JSON.stringify({ purBillList: $scope.$PurchaseBillList });
                $http.post('/PurchaseAcknowledgement/AcknowledgeCreate', params).success(function (data) {
                /*$http.post('/PurchaseBill/AcknowledgeCreate', params).success(function (data) {*/
                    if (data > 0) {
                        alertify.log('Acknowledgements saved successfully!', 'success', '5000');
                        Clear();
                        $scope.PurchaseBillList = [];
                        $scope.ddlSupplier = null;
                        $('#ddlSupplier').select2('destroy');
                        $('#ddlSupplier').val('').select2({
                            placeholder: "Select Supplier Name",
                            theme: "classic",
                            dropdownAutoWidth: false
                        });
                    }
                    else {
                        alertify.log('Save failed, refresh page and try again', 'error', '5000');
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
            }
        })
    }
    $scope.OpenPopupWindow = function (PurchaseAcknowledgementObj) {
        $window.open("#/PurchaseAcknowledgementReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SupplierRefundObj", JSON.stringify(SupplierRefundObj));
        $cookieStore.put("PurchaseAcknowledgementObj", PurchaseAcknowledgementObj);
        event.stopPropagation();
    };
    $scope.ResetForm = function () {
        Clear();
        $scope.PurchaseBillList = [];
        $scope.ddlSupplier = null;
        $('#ddlSupplier').select2('destroy');
        $('#ddlSupplier').val('').select2({
            placeholder: "Select Supplier Name",
            theme: "classic",
            dropdownAutoWidth: false
        });
        $scope.purchaseAcknowledgementEntryForm.$setPristine();
        $scope.purchaseAcknowledgementEntryForm.$setUntouched();
    }

    $scope.ShowReport = function (salesOrderId) {
        $window.open("/ErpReports/RV_Pos_SalesOrderBySalesOrderId.aspx?SalesOrderId=" + salesOrderId, "_blank", "width=790,height=630,left=340,top=25");
    }
    //#endregion

    $scope.reloadBtn = function () {
        $('#txtFromDateForSA').val('');
        $('#txtToDateForSA').val('');
        $('#textSearchCompanyName').val('');
        $scope.FromDateSA = "";
        $scope.ToDateSA = "";
        $scope.SearchCompanyName = null;
        GetAcknowledgementPaged(1);
    }

    $scope.AcknowledgementSearch = function () {
        GetAcknowledgementPaged(1);

    }

    function GetAcknowledgementPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSA").val();
        $scope.FromDateSA = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForSA").val();
        $scope.ToDateSA = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDateSA != "" && $scope.ToDateSA != "") {
            SearchCriteria = "([AcknowledgementDate] between '" + $scope.FromDateSA + "' and '" + $scope.ToDateSA + "') and ([SupplierName] LIKE '%" + $scope.SearchCompanyName + "%' or [AcknowledgementNo] LIKE '%" + $scope.SearchCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria = "[SupplierName] LIKE '%" + $scope.SearchCompanyName + "%' or [AcknowledgementNo] LIKE '%" + $scope.SearchCompanyName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDateSA != "" && $scope.ToDateSA != "") {
            SearchCriteria = "[AcknowledgementDate] between '" + $scope.FromDateSA + "' and '" + $scope.ToDateSA + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/PurchaseAcknowledgement/GetAcknowledgePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.AcknowledgementDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.AcknowledgementDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.AcknowledgementDate = date1;
                    }



                })

            }
            else {
                alertify.log('Sales Acknowledgement  Not Found', 'error', '5000');
            }
            $scope.AcknowledgementListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetAcknowledgementPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetAcknowledgementPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetAcknowledgementPaged($scope.currentPage);
        }
        //  }


    }

    $("#txtFromDateForSA").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForSA = function () {
        $("#txtFromDateForSA").focus();
        $("#txtFromDateForSA").trigger("click");
    }


    $("#txtToDateForSA").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChangeForSA = function () {
        $("#txtToDateForSA").focus();
        $("#txtToDateForSA").trigger("click");
    }
})