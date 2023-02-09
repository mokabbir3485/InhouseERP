
app.controller("BillOfExchangeReport2Controller", function ($scope, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.CommercialInvoiceId = parseInt(sessionStorage.getItem("CommercialInvoiceIdBE2"));
    $scope.CommercialInvoiceId = $cookieStore.get("CommercialInvoiceId");
    Clear();
    GetHTMLTableForReport('Bill2');
    function Clear() {
        $scope.TableHtmlData = {};
        $scope.POReferencelist = [];
        $scope.CiInfoDetailReportList = [];
        $scope.BillForReportList = [];
        GetCIMasterByCIid();
        GetCIInfoDetailReport();
        GetBillOfExchangeForReport();
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
        GetHTMLTableForReport('Bill2');
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
                $("#HtmlTable").html($scope.TableHtmlDataList[0].HtmlData);
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
        $scope.TableHtmlData.DocType = 'Bill2';
        var parms = JSON.stringify({ tableHtmlData: $scope.TableHtmlData });
        $http.post('/ExpCommercialInvoice/PostHTMLTableForReport', parms).success(function (data) {
            if (data > 0) {
                $('.alertify-logs').show();
                alertify.log('Bill Of Exchange2 Certificate Report Save Successfully!', 'success', '5000');
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
        $http({
            url: '/ExpCommercialInvoice/GetCIMasterByInvoiceId?commercialInvoiceId=' + $scope.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CommercialInvoiceMasterList = data;
            $scope.CommercialInvoiceMasterList[0].CommercialInvoiceNo = $scope.CommercialInvoiceMasterList[0].CommercialInvoiceNo.replace("CI", "BOE");
            
        });
    }

    function GetCIInfoDetailReport() {
        $http({
            url: '/ExpCommercialInvoice/GetCIInfoDetailReport?commercialInvoiceId=' + $scope.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CiInfoDetailReportList = data;

            
        });
    }
    function GetBillOfExchangeForReport() {
        $http({
            url: '/ExpCommercialInvoice/GetBillOfExchangeForReport?commercialInvoiceId=' + $scope.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BillForReportList = data;
            $scope.BillForReportList[0].Amount = parseFloat($scope.BillForReportList[0].Amount).toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.BillForReportList[0].PiRefNo = $scope.BillForReportList[0].BOENumber.replace("BOE", "PI");
            //{ { BillForReportList[0].PINo } } Date: { { BillForReportList[0].PIDate } }
            var arrPI = $scope.BillForReportList[0].PINo.split(" & ");
            var arrDate = $scope.BillForReportList[0].PIDate.split(" & ");
            var dateTime = [];

            for (var i in arrPI) {

                var timeIndex = i;
                var startTime = arrDate[timeIndex]
                dateTime.push([arrPI[i], startTime].join(','))
            }

            var res = dateTime.join(" & ");

            $scope.PiRefInfo = res.replaceAll(",", ", Date: ");

            ////////////////////////////////////////////////
            //var arrPONo = $scope.BillForReportList[0].PONo.split(",");
            //var arrPODate = $scope.BillForReportList[0].PODate.split(",");

            //var dateTimePO = [];

            //for (var i in arrPONo) {

            //    var timeIndex = i;
            //    var startTime = arrPODate[timeIndex]
            //    dateTimePO.push([arrPONo[i], startTime].join(','))
            //}

            //var res = dateTimePO.join(" & ");

            //$scope.POInfo = res.replaceAll(",", ", Date: ");


            //if ($scope.BillForReportList[0].LcScDate != null) {
            //    var res1 = $scope.BillForReportList[0].LcScDate.substring(0, 5);
            //    if (res1 == "/Date") {
            //        var parsedDate1 = new Date(parseInt($scope.BillForReportList[0].LcScDate.substr(6)));
            //        var date1 = ($filter('date')(parsedDate1, 'dd.MM.yyyy')).toString();
            //        $scope.BillForReportList[0].LcScDate = date1;
            //    }
            //}

            //if ($scope.BillForReportList[0].ApplicationDate != null) {
            //    var res1 = $scope.BillForReportList[0].ApplicationDate.substring(0, 5);
            //    if (res1 == "/Date") {
            //        var parsedDate1 = new Date(parseInt($scope.BillForReportList[0].ApplicationDate.substr(6)));
            //        var date1 = ($filter('date')(parsedDate1, 'dd.MM.yyyy')).toString();
            //        $scope.BillForReportList[0].ApplicationDate = date1;
            //    }
            //}

            //if ($scope.BillForReportList[0].ExpDate != null) {
            //    var res1 = $scope.BillForReportList[0].ExpDate.substring(0, 5);
            //    if (res1 == "/Date") {
            //        var parsedDate1 = new Date(parseInt($scope.BillForReportList[0].ExpDate.substr(6)));
            //        var date1 = ($filter('date')(parsedDate1, 'dd.MM.yyyy')).toString();
            //        $scope.BillForReportList[0].ExpDate = date1;
            //    }
            //}


            

        });
    }

});