app.controller("LabelRibbonExportReportController", function ($scope, $cookieStore, $http, $filter) {
    

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    //$scope.LabelRibbonExportReporttObj = JSON.parse(sessionStorage.getItem("LabelRibbonExportReport"));
    $scope.LabelRibbonExportReporttObj = $cookieStore.get("LabelRibbonExportReport");
    $scope.dontGroup = false;
    GetDateTimeFormat();
    function GetDateTimeFormat() {
        function formatDate(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
        }
        var currentDatetime = new Date();
        $scope.currentDatetimeFormated = formatDate(currentDatetime);

    }
    GetExpImpLabelExport();


    $scope.LabelExportlist = [];
    function GetExpImpLabelExport() {
        $http({
            url: '/ExportReport/GetExpImpLabelExport?FromDate=' + $scope.LabelRibbonExportReporttObj.FromDate + '&ToDate=' + $scope.LabelRibbonExportReporttObj.ToDate + '&CategoryType=' + $scope.LabelRibbonExportReporttObj.Name,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.LabelExportlist = data;

            $scope.$LabelExportlist = $scope.LabelExportlist;
            $scope.LabelExportlist = Array.from(
                $scope.LabelExportlist.reduce((m, o) => m.set(o.BondNo, (m.get(o.BondNo) || []).concat(o)), new Map),
                ([BondNo, CIObject]) => ({ BondNo, CIObject })
            );


            var num = 0;
            angular.forEach($scope.LabelExportlist, function (LabelExport) {
                
                
                angular.forEach(LabelExport.CIObject, function (aLabelExport) {
                    $scope.BondObj = {};
                    num = ++num;
                    aLabelExport.SN = num;
                    var res1 = aLabelExport.BondDate.substring(0, 5);
                    var res2 = aLabelExport.ImportBillOfEntryDate.substring(0, 5);
                    var res3 = aLabelExport.ImportLCDate.substring(0, 5);
                    var res4 = aLabelExport.ImportPermitDate.substring(0, 5);
                    var res5 = aLabelExport.ImportInvoiceDate.substring(0, 5);
                    //var res6 = aLabelExport.LcScDate.substring(0, 5);
                    if (res1 == "/Date" || res2 == "/Date" || res3 == "/Date" || res4 == "/Date" || res5 == "/Date") {
                        var parseDate1 = new Date(parseInt(aLabelExport.BondDate.substr(6)));
                        var parseDate2 = new Date(parseInt(aLabelExport.ImportBillOfEntryDate.substr(6)));
                        var parseDate3 = new Date(parseInt(aLabelExport.ImportLCDate.substr(6)));
                        var parseDate4 = new Date(parseInt(aLabelExport.ImportPermitDate.substr(6)));
                        var parseDate5 = new Date(parseInt(aLabelExport.ImportInvoiceDate.substr(6)));
                        //var parseDate6 = new Date(parseInt(aLabelExport.LcScDate.substr(6)));

                        var date1 = ($filter('date')(parseDate1, 'dd.MM.yyyy')).toString();
                        var date2 = ($filter('date')(parseDate2, 'dd.MM.yyyy')).toString();
                        var date3 = ($filter('date')(parseDate3, 'dd.MM.yyyy')).toString();
                        var date4 = ($filter('date')(parseDate4, 'dd.MM.yyyy')).toString();
                        var date5 = ($filter('date')(parseDate5, 'dd.MM.yyyy')).toString();
                        //var date6 = ($filter('date')(parseDate6, 'dd.MM.yyyy')).toString();

                        aLabelExport.BondDate = date1;
                        aLabelExport.ImportBillOfEntryDate = date2;
                        aLabelExport.ImportLCDate = date3;
                        aLabelExport.ImportPermitDate = date4;
                        aLabelExport.ImportInvoiceDate = date5;
                        //aLabelExport.LcScDate = date6;
                    }
                    $scope.BondObj.BondNo = aLabelExport.BondNo;
                    $scope.BondObj.BondDate = aLabelExport.BondDate;
                    $scope.BondObj.ImportBillOfEntryNo = aLabelExport.ImportBillOfEntryNo;
                    $scope.BondObj.ImportBillOfEntryDate = aLabelExport.ImportBillOfEntryDate;
                    $scope.BondObj.ImportLCNo = aLabelExport.ImportLCNo;
                    $scope.BondObj.ImportLCDate = aLabelExport.ImportLCDate;
                    $scope.BondObj.ImportPermitNo = aLabelExport.ImportPermitNo;
                    $scope.BondObj.ImportPermitDate = aLabelExport.ImportPermitDate;
                    $scope.BondObj.ImportInvoiceNo = aLabelExport.ImportInvoiceNo;
                    $scope.BondObj.ImportInvoiceDate = aLabelExport.ImportInvoiceDate;
                    $scope.BondObj.TotalImportInKG = aLabelExport.TotalImportInKG;
                    $scope.BondObj.TotalImportAmountInKG = aLabelExport.TotalImportAmountInKG;
                    LabelExport.BondObj = $scope.BondObj;
                    //LabelExport.BondObj.CIObject = LabelExport.events;
                    /*aLabelExport.BondObj = $scope.childObj;*/
                })
                
            })
            console.log($scope.LabelExportlist);
        });
    }



})