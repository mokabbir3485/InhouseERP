
app.controller('DeliveryChalanController', function ($http, $scope, $cookieStore) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.name = "Delivery Chalan";
   // $scope.CommercialInvoiceId = parseInt(sessionStorage.getItem("CommercialInvoiceIdDC"));
    $scope.CommercialInvoiceId = $cookieStore.get("CommercialInvoiceId");
    console.log("id", $scope.CommercialInvoiceId);

    Clear();
    GetHTMLTableForReport('ChalanGate');
    function Clear() {
        $scope.deliveryChalanList = [];
        $scope.deliveryChalanDetailsList = [];
        $scope.TableHtmlData = {};
        GetDeliveryChalan();
        GetDeliveryChalanDetailsList();
        GetCIMasterByCIid();

        $scope.totalItem = 0;
        $scope.itemDescription = 0;
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
        GetHTMLTableForReport('ChalanGate');
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
        $scope.TableHtmlData.DocType = 'ChalanGate';
        var parms = JSON.stringify({ tableHtmlData: $scope.TableHtmlData });
        $http.post('/ExpCommercialInvoice/PostHTMLTableForReport', parms).success(function (data) {
            if (data > 0) {
                $('.alertify-logs').show();
                alertify.log('Delivery Chalan Report Save Successfully!', 'success', '5000');
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

    function GetDeliveryChalan() {
        //  var CommercialInvoiceId = 33;

        $http({
            url: "/CertificateOfOrigin/GetChalanReportNoTwoList?CommercialInvoiceId=" + $scope.CommercialInvoiceId,
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.deliveryChalanList = data;
            console.log('List Data', $scope.deliveryChalanList);

            $scope.deliveryChalanList[0].EPDate = $scope.deliveryChalanList[0].EPDate.split("-").reverse().join(".");
            $scope.deliveryChalanList[0].BillOfEntryDate = $scope.deliveryChalanList[0].BillOfEntryDate.split("-").reverse().join(".");
            
        });


    }


    function GetDeliveryChalanDetailsList() {

        $http({
            url: "/CertificateOfOrigin/GetChalanReportNoTwoDetails?CommercialInvoiceId=" + $scope.CommercialInvoiceId,
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.deliveryChalanDetailsList = [];
            $scope.totalItem = 0;
            $scope.itemDescription = 0;

            $scope.deliveryChalanDetailsList = data;

            angular.forEach(data, function (adata) {
                if (adata.ItemName !== "Barcode Ribbon") {
                    $scope.itemDescription += adata.QtyDescription;
                }
                $scope.totalItem += (adata.Quantity);

            })
            $scope.totalItem = $scope.totalItem;
            $scope.itemDescription = $scope.itemDescription;
            console.log('totalItem Data', $scope.deliveryChalanDetailsList);
            
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

            var arrPI = $scope.CommercialInvoiceMasterList[0].PiRefNo.split(",");
            var arrDate = $scope.CommercialInvoiceMasterList[0].PiRefDate.split(",");
            var dateTime = [];

            for (var i in arrPI) {

                var timeIndex = i;
                var startTime = arrDate[timeIndex]
                dateTime.push([arrPI[i], startTime].join(','))
            }

            var res = dateTime.join(" & ");

            $scope.PiRefInfo = res.replaceAll(",", ", DATE: ");
            
        });
    }




    //var queryResult = Enumerable.From(jsonArray)
    //    .Where(function (x) { return x.user.id < 200 })
    //    .OrderBy(function (x) { return x.user.screen_name })
    //    .Select(function (x) { return x.user.screen_name + ':' + x.text })
    //    .ToArray();

    // console.log('Total Item',totalItem);


});