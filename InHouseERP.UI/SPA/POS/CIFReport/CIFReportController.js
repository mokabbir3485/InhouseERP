
app.controller('CIFReportController', function ($rootScope,$http, $scope, $cookieStore, $filter, $location, $cookies) {
    $scope.Company = {};
    //$scope.Company = $cookies.getObject('Company');
    var CompanyData = sessionStorage.getItem("Company");
    if (CompanyData != null) {
        $scope.Company = JSON.parse(sessionStorage.Company);
    }
    if ($scope.Company.CIFFromDate == undefined || $scope.Company.CIFToDate == undefined) {
        $scope.Company.CIFFromDate = null;
        $scope.Company.CIFToDate = null;

    }

    Clear();
    function Clear() {
        //$scope.url = $location.absUrl();
        //let myIframe = document.getElementById("myIframe");
        //let url_string = "https://www.chd4.com/index.php";
        //let page = "viewpage";
        ////let height = "90";
        //let geo = "uk";

        ////let adsURL = url_string + "?page=" + page + "&size=" + width + "x" + height;
        //let adsURL = url_string + "?page=" + page;
        //console.log(adsURL);
        //myIframe.src = adsURL;


        GetDateTimeFormat();
        GetBy_inv_CIFProductReports();
        //GetBy_inv_CIFCustomerReports();
        $scope.CIFProductList = [];
        $scope.CIFCustomerList = [];
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
    //endDate
    function GetBy_inv_CIFCustomerReports() {
        $http({
            url: "/InternalWorkOrder/GetBy_inv_CIFCustomerReports?CompanyId=" + $scope.Company.companyId,
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CIFCustomerList = data[0];

            var res1 = $scope.CIFCustomerList.DateOfOrigin.substring(0, 5);
            if (res1 == "/Date") {
                var parsedDate1 = new Date(parseInt($scope.CIFCustomerList.DateOfOrigin.substr(6)));
                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                $scope.CIFCustomerList.DateOfOrigin = date1;
            }


        });
    }
    function GetBy_inv_CIFProductReports() {
        $http({
            url: "/InternalWorkOrder/GetBy_inv_CIFProductReports?CompanyId=" + $scope.Company.companyId + '&PreparedById=' + $scope.Company.PreparedById + '&startDate=' + $scope.Company.CIFFromDate + '&endDate=' + $scope.Company.CIFToDate,
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CIFProductList = data;
            angular.forEach($scope.CIFProductList, function (aData) {
                var res1 = aData.SalesOrderDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.SalesOrderDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.SalesOrderDate = date1;
                }
            })
            //var res1 = $scope.CIFProductList[0].DateOfOrigin.substring(0, 5);
            //if (res1 == "/Date") {
            //    var parsedDate1 = new Date(parseInt($scope.CIFProductList[0].DateOfOrigin.substr(6)));
            //    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
            //    $scope.CIFProductList[0].DateOfOrigin = date1;
            //}

            //angular.forEach($scope.CIFProductList, function (e) {
            //    if (e.RollDirection == 'Face In') {
            //        e['FaceIn'] = true;
            //        e['FaceOut'] = false;
            //        e['ClockWise'] = false;
            //        e['AntiClockWise'] = false;

            //    }
            //    if (e.RollDirection == 'Face Out') {
            //        e['FaceIn'] = false;
            //        e['FaceOut'] = true;
            //        e['ClockWise'] = false;
            //        e['AntiClockWise'] = false;

            //    }
            //    if (e.RollDirection == 'Clock Wise') {
            //        e['FaceIn'] = false;
            //        e['FaceOut'] = false;
            //        e['ClockWise'] = true;
            //        e['AntiClockWise'] = false;

            //    }
            //    if (e.RollDirection == 'Anti Clock Wise') {
            //        e['FaceIn'] = false;
            //        e['FaceOut'] = false;
            //        e['ClockWise'] = false;
            //        e['AntiClockWise'] = true;

            //    }
            //    if (e.RollDirection == 'N/A') {
            //        e['FaceIn'] = false;
            //        e['FaceOut'] = false;
            //        e['ClockWise'] = false;
            //        e['AntiClockWise'] = false;

            //    }
            //    if (e.RollDirection == '') {
            //        e['FaceIn'] = false;
            //        e['FaceOut'] = false;
            //        e['ClockWise'] = false;
            //        e['AntiClockWise'] = false;
            //    }
            //    //////////////////////////
            //    if (e.Core == 40) {
            //        e['40'] = true;
            //        e['Core76'] = false;
            //        e['Core25'] = false;
            //        e['Core12'] = false;

            //    }
            //    if (e.Core == 76) {
            //        e['Core40'] = false;
            //        e['Core76'] = true;
            //        e['Core25'] = false;
            //        e['Core12'] = false;

            //    }
            //    if (e.Core == 25) {
            //        e['Core40'] = false;
            //        e['Core76'] = false;
            //        e['Core25'] = true;
            //        e['Core12'] = false;

            //    }
            //    if (e.Core == 12.5) {
            //        e['Core40'] = false;
            //        e['Core76'] = false;
            //        e['Core25'] = false;
            //        e['Core12'] = true;

            //    }
            //    if (e.Core == 0) {
            //        e['Core40'] = false;
            //        e['Core76'] = false;
            //        e['Core25'] = false;
            //        e['Core12'] = false;

            //    }

            //})
        });
    }



});