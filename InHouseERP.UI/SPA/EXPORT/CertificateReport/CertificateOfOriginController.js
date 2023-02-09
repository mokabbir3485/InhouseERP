app.controller('CertificateOfOriginController', function ($scope, $route, $http, $cookieStore) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    //var CiData = sessionStorage.getItem("CiData");
    //if (CiData != null) {
    //    $scope.CData = JSON.parse(sessionStorage.CiData);
    //}
    $scope.CData = $cookieStore.get("CiData");
    Clear();
    if ($scope.CData.CertificateType == 'pi') {
        GetHTMLTableForReport('Inspection');
    } else {
        GetHTMLTableForReport('Origin');
    }
    function Clear() {
        $scope.NetWeight = 0;
        $scope.GrossWeight = 0;
        $scope.CommercialInvoiceList = [];

        $scope.CertificateOfOriginList = [];
        $scope.TableHtmlData = {};
        GetAllCertificateOforigin();
        GetCIInfoDetailReport();
        //GetAllCertificateOfPre();
        GetDateTimeFormat();
        
        
        $scope.certificateOfOriginCiId = [];
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

    $scope.GetHTMLTableForReportCOO = function () {
        GetHTMLTableForReport('Origin');
    }
    $scope.GetHTMLTableForReportPIC = function () {
        GetHTMLTableForReport('Inspection');
    }
    function GetHTMLTableForReport(DocType) {
        $http({
            url: '/ExpCommercialInvoice/GetHTMLTableForReport?DocumentId=' + $scope.CData.CommercialInvoiceId + '&DocType=' + DocType ,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            
            $scope.TableHtmlDataList = data;
            if ($scope.TableHtmlDataList.length > 0) {
                $("#HtmlTable").html($scope.TableHtmlDataList[0].HtmlData);
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

    $scope.saveHtmlForCOO = function () {
        $('.hideButton').hide();
        $('#result').hide();
        if ($scope.TableHtmlDataList.length > 0) {
            $scope.TableHtmlData.Id = $scope.TableHtmlDataList[0].Id;
        } else {
            $scope.TableHtmlData.Id = 0;
        }
        $scope.TableHtmlData.DocumentId = $scope.CData.CommercialInvoiceId;
        $scope.TableHtmlData.HtmlData = String($("#source-html")[0].outerHTML);
        $scope.TableHtmlData.DocType = 'Origin';
        var parms = JSON.stringify({ tableHtmlData: $scope.TableHtmlData });
        $http.post('/ExpCommercialInvoice/PostHTMLTableForReport', parms).success(function (data) {
            if (data > 0) {
                alertify.log('Certificate Of Origin Report Save Successfully!', 'success', '5000');
                //Clear();
                $scope.TableHtmlData = {};
            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
            $('.hideButton').show();
            $('#result').show();
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
            $('.hideButton').hide();
            $('#result').show();
        });
    }
    $scope.saveHtmlForPIC = function () {
        $('.hideButton').hide();
        $('#result').hide();
        if ($scope.TableHtmlDataList.length > 0) {
            $scope.TableHtmlData.Id = $scope.TableHtmlDataList[0].Id;
        } else {
            $scope.TableHtmlData.Id = 0;
        }
        $scope.TableHtmlData.DocumentId = $scope.CData.CommercialInvoiceId;
        $scope.TableHtmlData.HtmlData = String($("#source-html")[0].outerHTML);
        $scope.TableHtmlData.DocType = 'Inspection';
        var parms = JSON.stringify({ tableHtmlData: $scope.TableHtmlData });
        $http.post('/ExpCommercialInvoice/PostHTMLTableForReport', parms).success(function (data) {
            if (data > 0) {
                alertify.log('Pre Inspection Certificate Report Save Successfully!', 'success', '5000');
                //Clear();
                $scope.TableHtmlData = {};
            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
            $('.hideButton').show();
            $('#result').show();
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
            $('.hideButton').hide();
            $('#result').show();
        });
    }

    function GetAllCertificateOforigin() {

        $http({
            url: "/CertificateOfOrigin/GetAllCertificateOforiginType?CommercialInvoiceId=" + $scope.CData.CommercialInvoiceId + "&CertificateType=" + $scope.CData.CertificateType,
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).success(function (Cofdata) {
            $scope.CertificateOfOriginList = Cofdata;
            $scope.NetWeight = (parseFloat($scope.CertificateOfOriginList[0].LabelNetWeight) + parseFloat($scope.CertificateOfOriginList[0].RibbonNetWeight)).toFixed(2) + ' kg';
            $scope.GrossWeight = (parseFloat($scope.CertificateOfOriginList[0].LabelGrossWeight) + parseFloat($scope.CertificateOfOriginList[0].RibbonGrossWeight)).toFixed(2) + ' kg';

            //{ { BillForReportList[0].PINo } } Date: { { BillForReportList[0].PIDate } }
            var arrPI = $scope.CertificateOfOriginList[0].PINo.split(" & ");
            var arrDate = $scope.CertificateOfOriginList[0].PIDate.split(" & ");
            var dateTime = [];

            for (var i in arrPI) {

                var timeIndex = i;
                var startTime = arrDate[timeIndex]
                dateTime.push([arrPI[i], startTime].join(','))
            }

            var res = dateTime.join(" & ");

            $scope.PiRefInfo = res.replaceAll(",", ", Date: ");
            
        });


    }

    function GetCIInfoDetailReport() {
        $http({
            url: '/ExpCommercialInvoice/GetCIInfoDetailReport?commercialInvoiceId=' + $scope.CData.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CiInfoDetailReportList = data;
            
        });
    }

    //function GetAllCertificateOfPre(CertificateType = "pi") {

    //    $http({
    //        url: "/CertificateOfOrigin/GetAllCertificateOforigin?CommercialInvoiceId=" + $scope.CommercialInvoiceId + "&CertificateType=" + CertificateType,
    //        method: "GET",
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (Cofdata) {
    //        $scope.CertificateOfOriginList = Cofdata;;
    //    });


    //}



});