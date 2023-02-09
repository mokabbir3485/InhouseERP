app.controller("ImportRecordReportController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.ImportReportObj = {};
    $scope.ImportReportObj = $cookieStore.get("ImportReportData");
    console.log($scope.ImportReportObj);

   
    Clear();

    function Clear() {
        $scope.importRecordList = [];
        GetLocalPurchaseBill();

        $scope.ReportType = "";
        
    }

    function GetLocalPurchaseBill() {
        $http({
            url: '/ExportReport/ImportReport?FromDate=' + $scope.ImportReportObj.FromDate + '&ToDate=' + $scope.ImportReportObj.ToDate + '&CategoryType=' + $scope.ImportReportObj.Name,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.importRecordList = data;

           
            if ($scope.importRecordList.length > 0) {
                var ammount = 0;

                var totalUnitAndCost = 0;


                var totalQty = 0;

                angular.forEach($scope.importRecordList, function (impR) {


                    $scope.TotaQtyTemp = 0;
                    $scope.totalCosQtyTemp = 0;
                    $scope.TotalAmountTemp = 0;

                    ammount += impR.Amount;
                    $scope.TotalAmountTemp = ammount;

                    totalUnitAndCost += impR.PBQtyInKG;
                    $scope.totalCosQtyTemp = totalUnitAndCost;


                    totalQty += impR.Qty;
                    $scope.TotaQtyTemp = totalQty;


                    if ($scope.ImportReportObj.Name == "Raw Materials") {
                        $scope.ReportType = "Raw Material Status";

                    } else if ($scope.ImportReportObj.Name == "Hardware") {
                        $scope.ReportType = "Machinery Status";

                    } else if ($scope.ImportReportObj.Name == "ALL") {
                        $scope.ReportType = "Total Raw Material & Machinery Status";
                     
                    }
                    var res1 = impR.BondDate.substring(0, 5);
                    var res2 = impR.BillOfEntryDate.substring(0, 5);
                    var res3 = impR.PBDate.substring(0, 5);
                    var res4 = impR.ImportPermitDate.substring(0, 5);
                    var res5 = impR.LCorPODate.substring(0, 5);
                    var res6 = impR.InvoiceDate.substring(0, 5);
                
                    if (res1 == "/Date" || res2 == "/Date" || res3 == "/Date" || res4 == "/Date" || res5 == "/Date" || res6 == "/Date") {
                        var parseDate1 = new Date(parseInt(impR.BondDate.substr(6)));
                        var parseDate2 = new Date(parseInt(impR.BillOfEntryDate.substr(6)));
                        var parseDate3 = new Date(parseInt(impR.PBDate.substr(6)));
                        var parseDate4 = new Date(parseInt(impR.ImportPermitDate.substr(6)));
                        var parseDate5 = new Date(parseInt(impR.LCorPODate.substr(6)));
                        var parseDate6 = new Date(parseInt(impR.InvoiceDate.substr(6)));

                        var date1 = ($filter('date')(parseDate1, 'dd.MM.yyyy')).toString();
                        var date2 = ($filter('date')(parseDate2, 'dd.MM.yyyy')).toString();
                        var date3 = ($filter('date')(parseDate3, 'dd.MM.yyyy')).toString();
                        var date4 = ($filter('date')(parseDate4, 'dd.MM.yyyy')).toString();
                        var date5 = ($filter('date')(parseDate5, 'dd.MM.yyyy')).toString();
                        var date6 = ($filter('date')(parseDate6, 'dd.MM.yyyy')).toString();

                        impR.BondDate = date1;
                        impR.BillOfEntryDate = date2;
                        impR.PBDate = date3;
                        impR.ImportPermitDate = date4;
                        impR.LCorPODate = date5;
                        impR.InvoiceDate = date6;
                    }




                   
                })

                $scope.TotalAmount = $scope.TotalAmountTemp;
                $scope.totalCosQty = $scope.totalCosQtyTemp;
                $scope.TotaQty = $scope.TotaQtyTemp;

             
            }

        });

       
    }



});