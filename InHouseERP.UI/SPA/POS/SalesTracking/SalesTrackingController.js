app.controller("SalesTrackingController", function ($scope, $rootScope, $http, $cookieStore, $filter, $window) {

    Clear();

    function Clear() {
       
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Sales Tracking').ScreenId;
        GetUsersPermissionDetails();


        $scope.FromDate = "";
        $scope.ToDate = "";

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetNumberPaged($scope.currentPage);
       // GetUsersPermissionDetails();

    }
    $("#txtFromDateForSO").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForSO = function () {
        $("#txtFromDateForSO").focus();
        $("#txtFromDateForSO").trigger("click");
    }


    $("#txtToDateForSO").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChangeForSO = function () {
        $("#txtToDateForSO").focus();
        $("#txtToDateForSO").trigger("click");
    }
    function GetUsersPermissionDetails() {
        $scope.PONoPermission = false;
        $scope.SalesOrderPermission = false;
        $scope.IWOPermission = false;
        $scope.RequisitionPermission = false;
        $scope.IssuePermission = false;
        $scope.ProductionPermission = false;
        $scope.TransferPermission = false;
        $scope.DeliveryPermission = false;
        $scope.SalesInvoicePermission = false;

        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {
                if (aPermissionDetails.FunctionName == 'PO No') {
                    $scope.PONoPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Sales Order') {
                    $scope.SalesOrderPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'IWO') {
                    $scope.IWOPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Requisition') {
                    $scope.RequisitionPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Issue') {
                    $scope.IssuePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Production') {
                    $scope.ProductionPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Transfer') {
                    $scope.TransferPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Delivery') {
                    $scope.DeliveryPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Sales Invoice') {
                    $scope.SalesInvoicePermission = aPermissionDetails.CanExecute;
                }

            });
        });
    }

    $scope.OpenSalesOrderReport = function (SOId) {
        $window.open("#/SalesOrderReport", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("SalesOrderId", SOId);
        event.stopPropagation();
    };
    $scope.OpenInternalWorkOrderReport = function (iwoId) {
        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("IWOID", iwoId);
        event.stopPropagation();
    };
    $scope.OpenRequisitionReport = function (ReportId, ReportType) {
        $window.open("#/MaterialDemandedIssuedReport", "popup", "width=850,height=550,left=280,top=80");
        $scope.MData = {};
        $scope.MData.ReportId = ReportId;
        $scope.MData.ReportType = ReportType;
        $cookieStore.put("MData", $scope.MData);
        event.stopPropagation();
    };
    $scope.OpenIssueReport = function (ReportId, ReportType) {
        $window.open("#/MaterialDemandedIssuedReport", "popup", "width=850,height=550,left=280,top=80");
        $scope.MData = {};
        $scope.MData.ReportId = ReportId;
        $scope.MData.ReportType = ReportType;
        $cookieStore.put("MData", $scope.MData);
        event.stopPropagation();
    };
    $scope.OpenProductionReport = function (ProductionId) {
        $window.open("#/ProductionReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("productionId", ProductionId);
        event.stopPropagation();
    };
    $scope.OpenStockTransferReport = function (StockTransferId) {
        var StockTransfer = {};
        StockTransfer.StockTransferId = StockTransferId;
        StockTransfer.StockTransferTypeId = 2;
        $window.open("#/ISTMReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("ISTMReport", StockTransfer);
        event.stopPropagation();
    };
    $scope.OpenDeliveryReport = function (DeliveryId) {
        var obj = {};
        obj.DeliveryId = DeliveryId;
        obj.IsManual = false;
        $window.open("#/DeliveryReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("DeliveryId", obj);
        event.stopPropagation();
    };
    $scope.OpenSalesInvoiceReport = function (aCompanySalesInvoice, IsManualInvoice) {
        $window.open("#/SalesInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
        aCompanySalesInvoice.IsManualInvoice = IsManualInvoice;
        $cookieStore.put("aCompanySalesInvoice", aCompanySalesInvoice);
        event.stopPropagation();
    };

    $scope.reloadBtn = function () {
        $('#textNumber').val('');
        $('#txtFromDateForSO').val('');
        $('#txtToDateForSO').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.Number = null;

        GetNumberPaged(1);
    }

    $scope.NumberSearch = function () {
        GetNumberPaged(1);

    }

    function GetNumberPaged(curPage) {

        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var SearchCriteria = "";
        var SearchCriteria1 = "";

        if ($scope.LoginUser.DepartmentName != null) {
            if ($scope.LoginUser.DepartmentName.match("Sales")) {
                SearchCriteria = "DepartmentId=" + $scope.LoginUser.DepartmentId +  " and SectionId=" + $scope.LoginUser.SectionId;
            } else {
                SearchCriteria = "";
            }
        }
        //if ($scope.Number != undefined && $scope.Number != "") {
        //    SearchCriteria1 = "([SalesOrderNo] LIKE '%" + $scope.Number +
        //        "%' OR [CompanyName] LIKE '%" + $scope.Number +
        //        "%' OR [PONo] LIKE '%" + $scope.Number +
        //        "%' OR [InternalWorkOrderNo] LIKE '%" + $scope.Number +
        //        "%' OR [DeliveryNo] LIKE '%" + $scope.Number +
        //        "%' OR [SalesInvoiceNo] LIKE '%" + $scope.Number + "%')";

        //    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
        //}

        if ($scope.Number != undefined && $scope.Number != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria1 = "([SalesOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SalesOrderNo] LIKE '%" + $scope.Number +
                "%' OR [CompanyName] LIKE '%" + $scope.Number +
                "%' OR [PONo] LIKE '%" + $scope.Number +
                "%' OR [InternalWorkOrderNo] LIKE '%" + $scope.Number +
                "%' OR [RequisitionNo] LIKE '%" + $scope.Number +
                "%' OR [IssueNo] LIKE '%" + $scope.Number +
                "%' OR [ProductionNo] LIKE '%" + $scope.Number +
                "%' OR [StockTransferNo] LIKE '%" + $scope.Number +
                "%' OR [DeliveryNo] LIKE '%" + $scope.Number +
                "%' OR [SalesInvoiceNo] LIKE '%" + $scope.Number + "%')";
            SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.Number !== undefined && $scope.Number != null && $scope.Number != "") {
            SearchCriteria1 = "([SalesOrderNo] LIKE '%" + $scope.Number +
                "%' OR [CompanyName] LIKE '%" + $scope.Number +
                "%' OR [PONo] LIKE '%" + $scope.Number +
                "%' OR [InternalWorkOrderNo] LIKE '%" + $scope.Number +
                "%' OR [RequisitionNo] LIKE '%" + $scope.Number +
                "%' OR [IssueNo] LIKE '%" + $scope.Number +
                "%' OR [StockTransferNo] LIKE '%" + $scope.Number +
                "%' OR [DeliveryNo] LIKE '%" + $scope.Number +
                "%' OR [SalesInvoiceNo] LIKE '%" + $scope.Number + "%')";
            SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria1 = "([SalesOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')";
            SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
            //alert("Date Success!!!!!");
        }


        $http({
            url: encodeURI("/SalesInvoice/GetNumberSearchResultPaged?StartRecordNo=" + StartRecordNo + "&RowPerPage=" + $scope.PerPage + "&whClause=" + SearchCriteria + "&rows=" + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {


            }
            else {
                alertify.log('Sales Number Not Found', 'error', '5000');
            }
            angular.forEach(data.ListData, function (aSd) {
                var res1 = aSd.SalesOrderDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aSd.SalesOrderDate = date1;

                }

            })

            $scope.SalesSearchResultList = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetNumberPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetNumberPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetNumberPaged($scope.currentPage);
        }
    }

    $scope.GetAllIdInConsoleLog = function (aSales) {
        console.clear();
        console.log('Sales Order Id= ' + aSales.SalesOrderId + ' ~ Sales Order No= ' + aSales.SalesOrderNo + ' Company Id= ' + aSales.CompanyId);
        console.log('Internal Work Order Id= ' + aSales.InternalWorkOrderId + ' ~ Internal Work Order No= ' + aSales.InternalWorkOrderNo + ' Company Id= ' + aSales.CompanyId);
        console.log('Requisition Id= ' + aSales.RequisitionId + ' ~ Requisition No= ' + aSales.RequisitionNo + ' Company Id= ' + aSales.CompanyId);
        console.log('Issue Id= ' + aSales.IssueId + ' ~ Issue No= ' + aSales.IssueNo + ' Company Id= ' + aSales.CompanyId);
        console.log('Production Id= ' + aSales.ProductionId + ' ~ Production No= ' + aSales.ProductionNo + ' Company Id= ' + aSales.CompanyId);
        console.log('Stock Transfer Id= ' + aSales.StockTransferId + ' ~ Stock Transfer No= ' + aSales.StockTransferNo + ' Company Id= ' + aSales.CompanyId);
        console.log('Delivery Id= ' + aSales.DeliveryId + ' ~ Delivery No= ' + aSales.DeliveryNo + ' Company Id= ' + aSales.CompanyId);
        console.log('Sales Invoice Id= ' + aSales.SalesInvoiceId + ' ~ Sales Invoice No= ' + aSales.SalesInvoiceNo + ' Company Id= ' + aSales.CompanyId);


    }
});

