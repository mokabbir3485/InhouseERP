
app.controller("ConsumptionCertificateReportController", function ($scope, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.CommercialInvoiceId = parseInt(sessionStorage.getItem("CommercialInvoiceIdCC"));
    $scope.CommercialInvoiceId = $cookieStore.get("CommercialInvoiceId");
    Clear();
    GetHTMLTableForReport('Consumption');
    function Clear() {
        $scope.TotalAmount = 0;
        $scope.TotalQuantity = 0;
        $scope.TotalQtyDescription = 0;
        $scope.TableHtmlData = {};
        $scope.CommercialInvoiceMasterList = [];
        $scope.ConsumptionReportList = [];
        $scope.RawMaterialsReportList = [];
        $scope.DescriptionReportList = [];
        GetCIMasterByCIid();
        GetConsumptionCertificateReport();
        //GetConsumptionCertificateDescriptionReport();
        GetConsumptionCertificateRawMaterialsReport();
        GetDateTimeFormat();
        $scope.IsSaved = false;
    }

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
    $scope.GetHTMLTableForReport = function () {
        GetHTMLTableForReport('Consumption');
    }
    function GetHTMLTableForReport(DocType) {
        $http({
            url: '/ExpCommercialInvoice/GetHTMLTableForReport?DocumentId=' + $scope.CommercialInvoiceId + '&DocType=' + DocType,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.TableHtmlDataList = data;
            if ($scope.TableHtmlDataList.length > 0) {
                $scope.IsSaved = true;
                $("#HtmlTable").html($scope.TableHtmlDataList[0].HtmlData.replaceAll("source-html", ""));
                $('.alertify-logs').show();
                alertify.log('Loading Saved Report!!!', 'success', '5000');
            } else {
                $scope.NewReportLoad();
            }
            
        });
    }
    $scope.NewReportLoad = function () {
        //$route.reload();
        Clear();
    }

    $scope.saveHtml = function () {
        $('.hideButton').hide();
        $('#result').hide();
        if ($scope.TableHtmlDataList.length > 0) {
            $scope.TableHtmlData.Id = $scope.TableHtmlDataList[0].Id;
        } else {
            $scope.TableHtmlData.Id = 0;
        }
        $scope.TableHtmlData.DocumentId = $scope.CommercialInvoiceId;
        $scope.TableHtmlData.HtmlData = String($("#source-html")[0].outerHTML);
        $scope.TableHtmlData.DocType = 'Consumption';
        var parms = JSON.stringify({ tableHtmlData: $scope.TableHtmlData });
        $http.post('/ExpCommercialInvoice/PostHTMLTableForReport', parms).success(function (data) {
            if (data > 0) {
                $('.alertify-logs').show();
                alertify.log('Consumption Certificate Report Save Successfully!', 'success', '5000');
                //Clear();
                $scope.TableHtmlData = {};
            } else {
                $('.alertify-logs').show();
                alertify.log('Server Errors!', 'error', '5000');
            }
            $('.hideButton').show();
            $('#result').show();
        }).error(function (data) {
            $('.alertify-logs').show();
            alertify.log('Server Errors!', 'error', '5000');
            $('.hideButton').hide();
            $('#result').show();
        });
    }

    function GetCIMasterByCIid() {
        $scope.TotalAmount = 0;
        $http({
            url: '/ExpCommercialInvoice/GetCIMasterByInvoiceId?commercialInvoiceId=' + $scope.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CommercialInvoiceMasterList = data;
            $scope.TotalAmount = (data[0].Amount - data[0].CPTCost).toFixed(2);
            $scope.CommercialInvoiceMasterList[0].CPTCost = data[0].CPTCost.toFixed(2);
            $scope.CommercialInvoiceMasterList[0].Amount = data[0].Amount.toFixed(2);
            $scope.CommercialInvoiceMasterList[0].PiRefNo = $scope.CommercialInvoiceMasterList[0].PiRefNo.split(",");
            $scope.CommercialInvoiceMasterList[0].PiRefDate = $scope.CommercialInvoiceMasterList[0].PiRefDate.split(",");
            
        });
    }
    function GetConsumptionCertificateReport() {
        $http({
            url: '/CertificateOfOrigin/GetConsumptionCertificateReport?ciId=' + $scope.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ConsumptionReportList = data;

            var res1 = $scope.ConsumptionReportList[0].StatementDate.substring(0, 5);
            if (res1 == "/Date") {
                var parsedDate1 = new Date(parseInt($scope.ConsumptionReportList[0].StatementDate.substr(6)));
                var date1 = ($filter('date')(parsedDate1, 'dd.MM.yyyy')).toString();
                $scope.ConsumptionReportList[0].StatementDate = date1;
            }
            if ($scope.ConsumptionReportList[0].BillOfEntryDate != null) {
                var res2 = $scope.ConsumptionReportList[0].BillOfEntryDate.substring(0, 5);
                if (res2 == "/Date") {
                    var parsedDate2 = new Date(parseInt($scope.ConsumptionReportList[0].BillOfEntryDate.substr(6)));
                    var date2 = ($filter('date')(parsedDate2, 'dd.MM.yyyy')).toString();
                    $scope.ConsumptionReportList[0].BillOfEntryDate = date2;
                }

                $scope.ConsumptionReportList[0].BillOfEntryDate = $scope.ConsumptionReportList[0].BillOfEntryDate.split("-").reverse().join(".");
            }
            
            
            if ($scope.ConsumptionReportList[0].DEPZPermissionDate != null) {
                var res3 = $scope.ConsumptionReportList[0].DEPZPermissionDate.substring(0, 5);
                if (res3 == "/Date") {
                    var parsedDate3 = new Date(parseInt($scope.ConsumptionReportList[0].DEPZPermissionDate.substr(6)));
                    var date3 = ($filter('date')(parsedDate3, 'dd.MM.yyyy')).toString();
                    $scope.ConsumptionReportList[0].DEPZPermissionDate = date3;
                }
                $scope.ConsumptionReportList[0].DEPZPermissionDate = $scope.ConsumptionReportList[0].DEPZPermissionDate.split("-").reverse().join(".");
            }
            

            var res4 = $scope.ConsumptionReportList[0].LcDate.substring(0, 5);
            if (res4 == "/Date") {
                var parsedDate4 = new Date(parseInt($scope.ConsumptionReportList[0].LcDate.substr(6)));
                var date4 = ($filter('date')(parsedDate4, 'dd.MM.yyyy')).toString();
                $scope.ConsumptionReportList[0].LcDate = date4;
            }

            var res5 = $scope.ConsumptionReportList[0].InvoiceDate.substring(0, 5);
            if (res5 == "/Date") {
                var parsedDate5 = new Date(parseInt($scope.ConsumptionReportList[0].InvoiceDate.substr(6)));
                var date5 = ($filter('date')(parsedDate5, 'dd.MM.yyyy')).toString();
                $scope.ConsumptionReportList[0].InvoiceDate = date5;
            }
            GetConsumptionCertificateDescriptionReport();
        });
    }
    function GetConsumptionCertificateDescriptionReport() {
        $http({
            url: '/CertificateOfOrigin/GetDescriptionOfGoodsUpdate?ConsumptionCertificateId=' + $scope.ConsumptionReportList[0].ConsumptionCertificateId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.DescriptionReportList = [];
            //$scope.TotalAmount = 0;
            $scope.TotalQuantity = 0;
            $scope.TotalQtyDescription = 0;

            $scope.DescriptionReportList = data;

            for (var i = 0; i < $scope.DescriptionReportList.length; i++) {
                $scope.DescriptionReportList[i].UnitPrice = parseFloat($scope.DescriptionReportList[i].UnitPrice).toFixed(2);
                $scope.DescriptionReportList[i].Amount = parseFloat($scope.DescriptionReportList[i].Amount).toFixed(2);

            }

            for (var i = 0; i < $scope.DescriptionReportList.length; i++) {
                if ($scope.DescriptionReportList[i].ItemName == "Barcode Ribbon") {
                    $scope.DescriptionReportList[i].QtyDescription = 0;
                }

            }

            
            angular.forEach($scope.DescriptionReportList, function (item) {
                //$scope.TotalAmount += parseFloat(item.Amount);
                $scope.TotalQuantity += item.Quantity;
                $scope.TotalQtyDescription += parseFloat(item.QtyDescription);

                
            })
            $scope.TotalQtyDescription = parseFloat($scope.TotalQtyDescription).toFixed(2);

            //$scope.TotalAmount = parseFloat($scope.TotalAmount).toFixed(2);
            $scope.LabelObj = $scope.DescriptionReportList.find(o => o.SubCategoryId === 1);
            $scope.RibbonObj = $scope.DescriptionReportList.find(o => o.SubCategoryId === 4);
            $scope.ItemCounter = 0;
            if ($scope.LabelObj != undefined) {
                $scope.ItemCounter += 1;
            }
            if ($scope.RibbonObj != undefined) {
                $scope.ItemCounter += 1;
            }

        });
    }
    function GetConsumptionCertificateRawMaterialsReport() {
        $http({
            url: '/CertificateOfOrigin/ConsuptionCertificateRawMatrial?CommercialInvoiceId=' + $scope.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.RawMaterialsReportList = [];
            $scope.RawMaterialsReportList = data;
            

            angular.forEach($scope.RawMaterialsReportList, function (item) {
                item.PreviousBalance = item.PreviousBalance.toFixed(2);
                item.ExportQty = item.ExportQty.toFixed(2);
                item.ClosingBalance = item.ClosingBalance.toFixed(2);
            })
            
        });
    }


});