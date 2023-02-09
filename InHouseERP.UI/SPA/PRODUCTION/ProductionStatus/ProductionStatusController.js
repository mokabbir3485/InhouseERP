app.controller("ProductionStatusController", function ($scope, $cookieStore, $http, $filter) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    //$scope.CurrentValuationSetup = $cookieStore.get('Valuation');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
   // console.log('$scope.LoginUser', $scope.LoginUser);
    Clear();

    function Clear() {
        $scope.ProductionStatusList = [];
        $scope.ProductionStatusDetailList = [];
        $scope.ProductionOrIWONo = '';
        
    }



    $scope.onLoadBtn = function () {
        var fromDate = $("#txtFromDateForPS").val();
        fromDate = fromDate.split("/").reverse().join("-");
        var toDate = $("#txtToDateForPS").val();
        toDate = toDate.split("/").reverse().join("-");
        //var SearchCriteria = '';

        //SearchCriteria = "([PBDate] between '" + fromDate + "' and '" + toDate + "') and SupplierId =" + $scope.ddlSupplier.SupplierId + "";

        $http({
            url: '/ProductionStatus/GetProductionStatusByNoAndDate?ProductionOrIWONo=' + $scope.ProductionOrIWONo + '&FromDate=' + fromDate + '&ToDate=' + toDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ProductionStatusList = data;

            angular.forEach($scope.ProductionStatusList, function (aData) {
                aData.DisplaySta = false;
                if (aData.ProductionDate != undefined) {
                    var res1 = aData.ProductionDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.ProductionDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.ProductionDate = date1;
                    }
                }
                if (aData.InternalWorkOrderDate != undefined) {
                    var res1 = aData.InternalWorkOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.InternalWorkOrderDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.InternalWorkOrderDate = date1;
                    }
                }
                if (aData.ProductionStatus == true) {
                    aData.ProductionStatusName = 'Completed';
                } else {
                    aData.ProductionStatusName = 'Pending';
                }
                

            })
            $("#txtToDateForPS").val('');
            $("#txtFromDateForPS").val('');

        });


    }

    $scope.AutoCollaseProductionStatus = function (aProductionStatus) {

        angular.forEach($scope.ProductionStatusList, function (aData) {
            if (aData.ProductionId == aProductionStatus.ProductionId && aProductionStatus.ProductionId != 0 && aProductionStatus.DisplaySta == true) {
                aData.DisplaySta = true;
            } else {
                aData.DisplaySta = false;
            }
        })



    }

    $scope.GetProductionStatusDetail = function (aProductionStatus) {
        $scope.ProductionStatusDetailList = [];
        var SearchCriteria = 'ProductionId=' + aProductionStatus.ProductionId;
        $http({
            url: '/Production/GetDynamicProductionDetail?SearchCriteria=' + SearchCriteria + '&orderBy=ProductionId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ProductionStatusDetailList = data;

        });


    }
    

    $("#txtFromDateForPS").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForPS = function () {
        $("#txtFromDateForPS").focus();
        $("#txtFromDateForPS").trigger("click");
    }


    $("#txtToDateForPS").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForPS = function () {
        $("#txtToDateForPS").focus();
        $("#txtToDateForPS").trigger("click");
    }

})