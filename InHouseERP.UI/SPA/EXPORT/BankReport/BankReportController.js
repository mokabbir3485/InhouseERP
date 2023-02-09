app.controller("BankReportController", function ($scope, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.CommercialInvoiceId = parseInt(sessionStorage.getItem("CommercialInvoiceIdBD"));
    $scope.CommercialInvoiceId = $cookieStore.get("CommercialInvoiceId");
    Clear();
    GetHTMLTableForReport('Bank');
    function Clear() {
        $scope.TableHtmlData = {};
        $scope.BankDocTableDataRow = [];
        $scope.BankDocForReport = [];
        $scope.BankDoc = [];
        GetCIMasterByCIid();
        GetBankDocForReport();
        GetDateTimeFormat();
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
        GetHTMLTableForReport('Bank');
    }
    function GetHTMLTableForReport(DocType) {
        $http({
            url: '/ExpCommercialInvoice/GetHTMLTableForReport?DocumentId=' + $scope.CommercialInvoiceId + '&DocType=' + DocType,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.TableHtmlDataList = data;
            if ($scope.TableHtmlDataList.length > 0) {
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
        $scope.TableHtmlData.DocType = 'Bank';
        var parms = JSON.stringify({ tableHtmlData: $scope.TableHtmlData });
        $http.post('/ExpCommercialInvoice/PostHTMLTableForReport', parms).success(function (data) {
            if (data > 0) {
                $('.alertify-logs').show();
                alertify.log('Bank Document Report Save Successfully!', 'success', '5000');
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
            console.log($scope.CommercialInvoiceMasterList[0]);
            $window.document.title = 'Enclosed Doc Application ' + '- ' + $scope.CommercialInvoiceMasterList[0].CommercialInvoiceNo.replaceAll("/", "-");
            $scope.CommercialInvoiceMasterList[0].PiRefNo = $scope.CommercialInvoiceMasterList[0].PiRefNo.split(",");
            $scope.CommercialInvoiceMasterList[0].PiRefDate = $scope.CommercialInvoiceMasterList[0].PiRefDate.split(",");
            
        });
    } 

    function GetBankDocForReport() {
        $http({
            url: '/ExpCommercialInvoice/GetBankDocForReport?commercialInvoiceId=' + $scope.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankDocForReport = data;

            angular.forEach($scope.BankDocForReport, function (aBankDocDetail) {
                var res2 = aBankDocDetail.AppDate.substring(0, 5);
                if (res2 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aBankDocDetail.AppDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'dd.MM.yyyy')).toString();
                    aBankDocDetail.AppDate = date1;
                }
            })
            
        });
    }

});