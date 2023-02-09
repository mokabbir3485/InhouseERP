
app.controller("BeneficiaryCertificateReportController", function ($scope, $route, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    };
    //$scope.CommercialInvoiceId = parseInt(sessionStorage.getItem("CommercialInvoiceIdBC"));
    $scope.CommercialInvoiceId = $cookieStore.get("CommercialInvoiceId");
    Clear();

    GetHTMLTableForReport('Beneficiary');
    function Clear() {
        $scope.CiInfoDetailReportList = [];
        $scope.CommercialInvoiceMasterList = [];
        GetCIMasterByCIid();
        GetCIInfoDetailReport();
        $scope.TableHtmlData = {};
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
        GetHTMLTableForReport('Beneficiary');
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
        $scope.TableHtmlData.DocType = 'Beneficiary';
        var parms = JSON.stringify({ tableHtmlData: $scope.TableHtmlData });
        $http.post('/ExpCommercialInvoice/PostHTMLTableForReport', parms).success(function (data) {
            if (data > 0) {
                $('.alertify-logs').show();
                alertify.log('Beneficiary Certificate Report Save Successfully!', 'success', '5000');
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
    $scope.test = function () {
        $("#AppBody").html($scope.CommercialInvoiceMasterList[0].BeneficiaryCertificate);
    }
    function GetCIMasterByCIid() {
        $http({
            url: '/ExpCommercialInvoice/GetCIMasterByInvoiceId?commercialInvoiceId=' + $scope.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CommercialInvoiceMasterList = data;
            console.log($scope.CommercialInvoiceMasterList[0]);
            $scope.CommercialInvoiceMasterList[0].Amount = parseFloat($scope.CommercialInvoiceMasterList[0].Amount).toLocaleString('en', { minimumFractionDigits: 2 });

            $scope.CommercialInvoiceMasterList[0].CommercialInvoiceNo = $scope.CommercialInvoiceMasterList[0].CommercialInvoiceNo.replace("CI", "BC");

            //{ { BillForReportList[0].PINo } } Date: { { BillForReportList[0].PIDate } }
            var arrPI = $scope.CommercialInvoiceMasterList[0].PiRefNo.split(",");
            var arrDate = $scope.CommercialInvoiceMasterList[0].PiRefDate.split(",");

            var dateTime = [];

            for (var i in arrPI) {

                var timeIndex = i;
                var startTime = arrDate[timeIndex]
                dateTime.push([arrPI[i], startTime].join(','))
            }

            var res = dateTime.join(" & ");

            $scope.PiRefInfo = res.replaceAll(",", ", Date: ");

            $("#AppBody").html($scope.CommercialInvoiceMasterList[0].BeneficiaryCertificate.replaceAll("~", $scope.PiRefInfo));
            //////////////////////////////////////////////////////

            
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


});