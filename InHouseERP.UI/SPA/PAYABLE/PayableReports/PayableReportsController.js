
app.controller("PayableReportsController", function ($scope, $rootScope, $cookieStore, $http, $window, $filter) {


    Clear();

    function Clear() {


        //  document.getElementById("btnAdd").disabled = false;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        if ($rootScope.$PermissionList !== undefined) {
            $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Payable Reports').ScreenId;
            GetUsersPermissionDetails();
        }
        else {
            setTimeout(function () {
                $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Payable Reports').ScreenId;
                GetUsersPermissionDetails();
            }, 500);
        }

        $scope.SupplierPaymentHistoryName = "Supplier Payment History";
        $scope.FromDate = null;
        $scope.ToDate = null;
        $scope.PayableReports = "SupplierPaymentHistoryReport";



        $scope.ddlSupplierPayment = null;
        $scope.ddlpaymentType = null;
        $scope.company = {};
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.IsMultiSelect = false;
        $scope.supplierListModel = [];
        $scope.supplierList = [];
        $scope.supplierSetting = {
            checkBoxes: true,
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
            buttonDefaultText: false,
        }

        $scope.example8data = [];
        $scope.paymentsIdList = [];
        $scope.example8settings = {
            checkBoxes: true,
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true
        };
        $scope.selectSupplier = document.getElementById("selectSupplier").getElementsByTagName('button')[0];
        $scope.selectSupplierMenu = document.getElementById("selectSupplier").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectSupplier.setAttribute("disabled", "disabled");
        $scope.selectSupplier.style.width = "100%";
        $scope.selectSupplierMenu.style.width = "100%";

        $scope.selectPayment = document.getElementById("selectPayment").getElementsByTagName('button')[0];
        $scope.selectPaymentMenu = document.getElementById("selectPayment").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectPayment.setAttribute("disabled", "disabled");
        $scope.selectPayment.style.width = "100%";
        $scope.selectPaymentMenu.style.width = "100%";


        GetSupplier();
        GetAllActivePaymentType();
        $scope.PermissionDetails = [];
        $scope.supplierlist = [];
        $scope.paymentTypelist = [];
        $scope.rbReport = 'supplierPayment';

    }

    $("#txtFromDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChange = function () {
        $("#txtFromDate").focus();
        $("#txtFromDate").trigger("click");
    }

    $("#txtToDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChange = function () {
        $("#txtToDate").focus();
        $("#txtToDate").trigger("click");
    }

    /// Placeholder Change ===========>>>

    $scope.supplierPlaceholder = {
        buttonDefaultText: "Select Supplier",
        searchPlaceholder: "Search Supplier"
    };

    $scope.paymentPlaceholder = {
        buttonDefaultText: "Select Payment",
        searchPlaceholder: "Search Payment"
    };

    function GetSupplier() {
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierlistSearch = angular.copy(data);
            angular.forEach(data, function (supp) {
                $scope.supplierList.push({ id: supp.SupplierId, label: supp.SupplierName + ' ~ ' + supp.SuppilerTypeName });
            });
        })
    }

    function GetAllActivePaymentType() {
        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aPayment) {
                $scope.example8data.push({ id: aPayment.PaymentTypeId, label: aPayment.PaymentTypeName  });
            });
        })
    }




    $scope.paymentTypelistFilterData = [];

    $scope.getBySupplierId = function () {
        $scope.supplierIds = '';
        angular.forEach($scope.supplierListModel, function (data) {
            $scope.supplierIds += $scope.supplierIds == '' ? data.id : (',' + data.id)

        });

    }
    $scope.paymentGetids = function () {

        $scope.paymentIds = '';
        angular.forEach($scope.paymentsIdList, function (data) {
            $scope.paymentIds += $scope.paymentIds == '' ? data.id : (',' + data.id)

        });
    }



    $scope.PayableReportsButton = function () {
        if ($scope.PayableReports == 'SupplierPaymentHistoryReport') {
            $window.open("#/SupplierPaymentHistoryReport", "popup", "width=850,height=550,left=280,top=80");
            $scope.SupplierPaymentHistoryReportData = {};
            $scope.SupplierPaymentHistoryReportData.FromDate = $scope.FromDate;
            $scope.SupplierPaymentHistoryReportData.ToDate = $scope.ToDate;
            $scope.SupplierPaymentHistoryReportData.paymentIds = $scope.paymentIds;
            $scope.SupplierPaymentHistoryReportData.supplierIds = $scope.supplierIds;

            $cookieStore.put('SupplierPaymentHistoryReportData', $scope.SupplierPaymentHistoryReportData);
            event.stopPropagation();
        }
    }


    $scope.ResetButton = function () {
        $scope.FromDate = null;
        $scope.ToDate = null;
    }

    ////Permision======>>>

    function GetUsersPermissionDetails() {
        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {

                if (aPermissionDetails.FunctionName == 'Supplier Payment History') {
                    $scope.SupplierPaymentHistory = true;
                }
            });
        });
    }


});