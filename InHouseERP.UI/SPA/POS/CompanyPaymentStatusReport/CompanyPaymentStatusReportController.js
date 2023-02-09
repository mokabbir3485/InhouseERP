app.controller("CompanyPaymentStatusReportController", function ($rootScope, $scope, $cookieStore, $http, $window, $filter) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.CompanyPaymentStatusReportData = $cookieStore.get("CompanyPaymentStatusReportDate");
    if ($scope.CompanyPaymentStatusReportData == null || $scope.CompanyPaymentStatusReportData == undefined) {
        $scope.SectionId = null;
        $scope.EmployeeId = null;
        $scope.CompanyId = null;
        $scope.BranchId = null;
        $scope.BranchName = '';
        $scope.SalesOrderType = null;
        $scope.FromDate = null;
        $scope.ToDate = null;
        $scope.FilterType = '';
    } else {
        $scope.SectionId = $scope.CompanyPaymentStatusReportData.SectionId;
        $scope.EmployeeId = $scope.CompanyPaymentStatusReportData.EmployeeId;
        $scope.EmployeeName = $scope.CompanyPaymentStatusReportData.EmployeeName;
        $scope.IndividualOrTeam = $scope.CompanyPaymentStatusReportData.IndividualOrTeam;
        $scope.CompanyId = $scope.CompanyPaymentStatusReportData.CompanyId;
        $scope.BranchId = $scope.CompanyPaymentStatusReportData.BranchId;
        $scope.BranchName = $scope.CompanyPaymentStatusReportData.BranchName;
        $scope.FromDate = $scope.CompanyPaymentStatusReportData.FromDate;
        $scope.ToDate = $scope.CompanyPaymentStatusReportData.ToDate;
        $scope.FilterType = $scope.CompanyPaymentStatusReportData.FilterType;
        $scope.SalesOrderType = $scope.CompanyPaymentStatusReportData.SalesOrderType;
    }

    Clear();

    function Clear() {
        CompanyPaymentStatusReport();
        $scope.CompanyPaymentStatusList = [];
    }




    function CompanyPaymentStatusReport() {
        $scope.TotalAmountBDT = 0;
        $scope.TotalPaidAmount = 0;
        $scope.TotalDueAmount = 0;
        $scope.TotalPaidVAT = 0;
        $scope.TotalPaidAIT = 0;
        $scope.TotalAdditionalCost = 0;
        $scope.TotalAdjustAmount = 0;
        var url = '';
        if ($scope.IndividualOrTeam == 'Individual') {
            url = '/SalesOrder/CompanyPaymentStatusReport?FilterType=' + $scope.FilterType + '&SalesOrderType=' + $scope.SalesOrderType + '&CompanyId=' + $scope.CompanyId + '&BranchId=' + $scope.BranchId + '&FromDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&EmployeeId=' + $scope.EmployeeId;
        } else if ($scope.IndividualOrTeam == 'Team') {
            url = '/SalesOrder/CompanyPaymentStatusReport?FilterType=' + $scope.FilterType + '&SalesOrderType=' + $scope.SalesOrderType + '&CompanyId=' + $scope.CompanyId + '&BranchId=' + $scope.BranchId + '&FromDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&SectionId=' + $scope.SectionId;
        }
        $http({
            url: url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyPaymentStatusList = data;
            angular.forEach($scope.CompanyPaymentStatusList, function (aSd) {
                //if (aSd.SalesInvoiceDate !== "/Date(-62135596800000)/" || aSd.SalesInvoiceDate == "") {
                //    aSd.SalesInvoiceDate = "";
                //}
                //if (aSd.PaymentDate !== "/Date(-62135596800000)/" || aSd.PaymentDate == "") {
                //    aSd.PaymentDate = "";
                //}
                
                if (aSd.SalesOrderDate !== "/Date(-62135596800000)/") {
                    var res1 = aSd.SalesOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SalesOrderDate = date1;

                    }
                } else {
                    aSd.SalesOrderDate = "";
                }
                if (aSd.SalesInvoiceDate !== "/Date(-62135596800000)/") {
                    var res1 = aSd.SalesInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SalesInvoiceDate = date1;

                    }
                } else {
                    aSd.SalesInvoiceDate = "";
                }

                if (aSd.PaymentDate !== "/Date(-62135596800000)/"  ) {
                    var res2 = aSd.PaymentDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(aSd.PaymentDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        aSd.PaymentDate = date2;

                    }
                } else {
                    aSd.PaymentDate = "";
                }




              


                if (aSd.PaidAmount == undefined || aSd.PaidAmount == null) {
                    aSd.PaidAmount = 0;
                }
           
                if (aSd.AmountBDT == undefined || aSd.AmountBDT == null) {
                    aSd.AmountBDT = 0;
                }

                if (aSd.DueAmount == undefined || aSd.DueAmount ==null) {
                    aSd.DueAmount = 0;
                }

                if (aSd.PaidVAT == undefined || aSd.PaidVAT == null) {
                    aSd.PaidVAT = 0;
                }
                if (aSd.PaidAIT == null || aSd.PaidAIT == undefined) {
                    aSd.PaidVAT = 0;
                }
                if (aSd.PaidAdditionalCost == undefined || aSd.PaidAdditionalCost ==null) {
                    aSd.PaidAdditionalCost = 0;
                }

                if (aSd.AdjustedAmount == undefined || aSd.AdjustedAmount == null) {
                    aSd.AdjustedAmount = 0;
                }

                $scope.TotalAmountBDT += aSd.AmountBDT;
                $scope.TotalPaidAmount += aSd.PaidAmount;
                $scope.TotalDueAmount += aSd.DueAmount;
                $scope.TotalPaidVAT += aSd.PaidVAT;
                $scope.TotalPaidAIT += aSd.PaidAIT;
                $scope.TotalAdjustAmount += aSd.AdjustedAmount;

                $scope.TotalAdditionalCost += aSd.PaidAdditionalCost;

                
              
                if (aSd.AdjustedAmount != undefined || aSd.AdjustedAmount != null) {
                    aSd.AdjustedAmount = aSd.AdjustedAmount.toLocaleString('en');
                }

                if (aSd.AmountBDT != undefined || aSd.AmountBDT !=null) {
                    aSd.AmountBDT = aSd.AmountBDT.toLocaleString('en');
                }
                if (aSd.PaidAmount != undefined || aSd.PaidAmount !=null) {
                    aSd.PaidAmount = aSd.PaidAmount.toLocaleString('en');
                }
                if (aSd.DueAmount != undefined || aSd.DueAmount !=null) {
                    aSd.DueAmount = aSd.DueAmount.toLocaleString('en');
                }
                if (aSd.PaidVAT != undefined || aSd.PaidVAT !=null) {
                    aSd.PaidVAT = aSd.PaidVAT.toLocaleString('en');
                }
                if (aSd.PaidAIT != undefined || aSd.PaidAIT !=null) {
                    aSd.PaidAIT = aSd.PaidAIT.toLocaleString('en');
                }
                if (aSd.PaidAdditionalCost != undefined || aSd.PaidAdditionalCost != null) {
                    aSd.PaidAdditionalCost = aSd.PaidAdditionalCost.toLocaleString('en');
                }
              
              

            })



            $scope.TotalAmountBDT = $scope.TotalAmountBDT.toLocaleString('en');
            $scope.TotalPaidAmount = $scope.TotalPaidAmount.toLocaleString('en');
            $scope.TotalDueAmount = $scope.TotalDueAmount.toLocaleString('en');
            $scope.TotalPaidVAT = $scope.TotalPaidVAT.toLocaleString('en');
            $scope.TotalPaidAIT = $scope.TotalPaidAIT.toLocaleString('en');

            $scope.TotalAdjustAmount = $scope.TotalAdjustAmount.toLocaleString('en');

            $scope.TotalPaidAdditionalCost = $scope.TotalAdditionalCost.toLocaleString('en');


            setTimeout(function () {
                $('#MainTable thead tr th:eq(0)').html("S/N");

                $("#MainTable").tablesorter({
                    widgets: ["zebra", "stickyHeaders"],
                    widgetOptions: {},
                    headers: {
                        '#disSort': {
                            sorter: false
                        },
                    }
                });
            }, 1000)
        });

    }
});