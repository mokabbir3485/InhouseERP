app.controller("SalesRegisterReportController", function ($scope, $cookieStore, $http, $window, $filter) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.ScreenId = parseInt(sessionStorage.getItem("SalesRegisterScreenId"));
    $scope.SalesRegisterReportDate = $cookieStore.get("SalesRegisterReportDate");

    if ($scope.SalesRegisterReportDate == null || $scope.SalesRegisterReportDate == undefined) {
        $scope.SalesOrderType = null;
        $scope.SectionId = null;
        $scope.EmployeeId = null;
        $scope.EmployeeName = null;
        $scope.CompanyId = null;
        $scope.BranchId = null;
        $scope.BranchName = '';
        $scope.FromDate = null;
        $scope.ToDate = null;
        $scope.ConversionRate = null;
        $scope.ReportName = ''
    } else {
        $scope.ReportName = $scope.SalesRegisterReportDate.ReportName;
        $scope.SalesOrderType = $scope.SalesRegisterReportDate.SalesOrderType;
        $scope.SectionId = $scope.SalesRegisterReportDate.SectionId;
        $scope.EmployeeId = $scope.SalesRegisterReportDate.EmployeeId;
        $scope.EmployeeName = $scope.SalesRegisterReportDate.EmployeeName;
        $scope.IndividualOrTeam = $scope.SalesRegisterReportDate.IndividualOrTeam;
        $scope.CompanyId = $scope.SalesRegisterReportDate.CompanyId;
        $scope.BranchId = $scope.SalesRegisterReportDate.BranchId;
        $scope.BranchName = $scope.SalesRegisterReportDate.BranchName;
        $scope.FromDate = $scope.SalesRegisterReportDate.FromDate;
        $scope.ToDate = $scope.SalesRegisterReportDate.ToDate;
        $scope.ConversionRate = $scope.SalesRegisterReportDate.ConversionRate;
        $scope.IsEPZExport = $scope.SalesRegisterReportDate.IsEPZExport;
    }

   
    Clear();

    function Clear() {
        
        SalesRegisterReport();
        $scope.SalesRegisterList = [];
        $scope.EPZExportSalesList = [];
    }


    function SalesRegisterReport() {
        var url = '';
        if ($scope.IsEPZExport) {
            if ($scope.IndividualOrTeam == 'Individual') {
                url = '/SalesOrder/EPZExportSalesReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&EmployeeId=' + $scope.EmployeeId + '&companyId=' + $scope.CompanyId + '&ConversionRate=' + $scope.ConversionRate;
            } else if ($scope.IndividualOrTeam == 'Team') {
                url = '/SalesOrder/EPZExportSalesReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&sectionId=' + $scope.SectionId + '&companyId=' + $scope.CompanyId + '&ConversionRate=' + $scope.ConversionRate;
            }
        } else {
            if ($scope.IndividualOrTeam == 'Individual') {
                url = '/SalesOrder/SalesRegisterReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&SalesOrderType=' + $scope.SalesOrderType + '&EmployeeId=' + $scope.EmployeeId + '&companyId=' + $scope.CompanyId + '&BranchId=' + $scope.BranchId;
            } else if ($scope.IndividualOrTeam == 'Team') {
                url = '/SalesOrder/SalesRegisterReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&SalesOrderType=' + $scope.SalesOrderType + '&sectionId=' + $scope.SectionId + '&companyId=' + $scope.CompanyId + '&BranchId=' + $scope.BranchId;
            }
        }
        
        $http({
            url: url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalesRegisterList = data;

            $scope.TotalAmount = 0;
            $scope.TotalAmountBDT = 0;
            angular.forEach($scope.SalesRegisterList, function (aData) {
                $scope.TotalAmount += aData.Amount;
                
                //aData.TotalAmount = Number((aData.TotalAmount).toFixed(3));
                var res1 = aData.SalesOrderDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.SalesOrderDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.SalesOrderDate = date1;
                };
                if ($scope.IsEPZExport) {
                    var res1 = aData.DeliveryDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.DeliveryDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.DeliveryDate = date1;
                    };
                    $scope.TotalAmountBDT += aData.AmountBDT;
                    aData.AmountBDT = aData.AmountBDT.toLocaleString('en');
                }
                

                aData.Amount = aData.Amount.toLocaleString('en');
                
               
            });
            $scope.TotalAmount = $scope.TotalAmount.toLocaleString('en');
            $scope.TotalAmountBDT = $scope.TotalAmountBDT.toLocaleString('en');
        });
    }
    //function EPZExportSalesReport() {
    //    var url = '';
    //    if ($scope.IndividualOrTeam == 'Individual') {
    //        url = '/SalesOrder/EPZExportSalesReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&EmployeeId=' + $scope.EmployeeId + '&companyId=' + $scope.CompanyId;
    //    } else if ($scope.IndividualOrTeam == 'Team') {
    //        url = '/SalesOrder/EPZExportSalesReport?FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&sectionId=' + $scope.SectionId + '&companyId=' + $scope.CompanyId;
    //    }
    //    $http({
    //        url: url,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        $scope.EPZExportSalesList = data;

    //        $scope.TotalAmount = 0;
    //        angular.forEach($scope.EPZExportSalesList, function (aData) {
    //            $scope.TotalAmount += aData.Amount;
    //            //aData.TotalAmount = Number((aData.TotalAmount).toFixed(3));
    //            var res1 = aData.SalesOrderDate.substring(0, 5);
    //            if (res1 == "/Date") {
    //                var parsedDate1 = new Date(parseInt(aData.SalesOrderDate.substr(6)));
    //                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
    //                aData.SalesOrderDate = date1;
    //            };

    //            aData.Amount = aData.Amount.toLocaleString('en');
               
    //        });
    //        $scope.TotalAmount = $scope.TotalAmount.toLocaleString('en');
    //    });
    //}

});