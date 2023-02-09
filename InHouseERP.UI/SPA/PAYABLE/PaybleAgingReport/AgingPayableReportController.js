
app.controller("AgingPayableReportController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    Clear();

    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        if ($rootScope.$PermissionList !== undefined) {
            $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Payable Aging Report').ScreenId;
           // GetUsersPermissionDetails();
        }
        else {
            setTimeout(function () {
                $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Payable Aging Report').ScreenId;
              //  GetUsersPermissionDetails();
            }, 500);
        }

        $scope.HeadingName = "Aging Report";
        $scope.ddlFinancialCycle = null;
        $scope.ddldateRange = null;
        $scope.FinancialCycleList = [];
       // $scope.DateRangeList = [];
       //GetDynamicFiscalYear();
        $scope.AllAgeingReportShow = true;
        $scope.SlotAgeingReportShow = false;
        $scope.AgingReportHide = true;
       
        $scope.AgingReportList = [];
        $scope.ddldateRange = { Id: 30 };
        $scope.SlotHeader1 = "0-30 Days";
        $scope.SlotHeader2 = "31-60 Days";
        $scope.SlotHeader3 = "61-90 Days";
        $scope.SlotHeader4 = "91-120 Days";
        $scope.SlotHeader5 = "120+ Days";
       
    }

    $scope.DateRangeList = [
        { Id: 15, DateRange: "15 Days" },
        { Id: 30, DateRange: "30 Days" },
        { Id: 60, DateRange: "60 Days" },
        { Id: 90, DateRange: "90 Days" },

    ];
 
    $scope.print = function () {
        $(".main-footer").attr("hidden", true);
        window.print();
    }
    $scope.DateRangeWithSlotReportShow = function () {
        $scope.SlotAgeingReportShow = true;
        $scope.AllAgeingReportShow = false;
    }

    if ($scope.ddldateRange.Id==30) {
        AgingReport();
    }
  
    $scope.AgingReportShowWithDayRange = function () {
        AgingReport();
    }


    function AgingReport() {
        $scope.AgingReportList = [];
        $http({
            url: '/AgingReport/PayableAgingReport?DayRange=' + $scope.ddldateRange.Id,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.totalReciable = 0;
            $scope.toFixedtotalReciable = 0;
            $scope.TotalSlot1 = 0;
            $scope.TotalSlot2 = 0;
            $scope.TotalSlot3 = 0;
            $scope.TotalSlot4 = 0;
            $scope.TotalSlot5 = 0;

            $scope.toFixedTotalSlot1 = 0;
            $scope.toFixedTotalSlot2 = 0;
            $scope.toFixedTotalSlot3 = 0;
            $scope.toFixedTotalSlot4 = 0;
            $scope.toFixedTotalSlot5 = 0;
           
       
            angular.forEach(data, function (aData) {

                if ($scope.ddldateRange.Id == 15) {
                    $scope.SlotHeader1 = "0-15 Days";
                    $scope.SlotHeader2 = "15-30 Days";
                    $scope.SlotHeader3 = "31-45 Days";
                    $scope.SlotHeader4 = "46-60 Days";
                    $scope.SlotHeader5 = "60+ Days";
                } else if ($scope.ddldateRange.Id == 30) {
                    $scope.SlotHeader1 = "0-30 Days";
                    $scope.SlotHeader2 = "31-60 Days";
                    $scope.SlotHeader3 = "61-90 Days";
                    $scope.SlotHeader4 = "91-120 Days";
                    $scope.SlotHeader5 = "120+ Days";
                }
                else if ($scope.ddldateRange.Id == 60) {
                    $scope.SlotHeader1 = "0-60 Days";
                    $scope.SlotHeader2 = "61-120 Days";
                    $scope.SlotHeader3 = "121-180 Days";
                    $scope.SlotHeader4 = "181-240 Days";
                    $scope.SlotHeader5 = "240+ Days";
                }
                else if ($scope.ddldateRange.Id == 90) {
                    $scope.SlotHeader1 = "0-90 Days";
                    $scope.SlotHeader2 = "91-180 Days";
                    $scope.SlotHeader3 = "181-270 Days";
                    $scope.SlotHeader4 = "271-360 Days";
                    $scope.SlotHeader5 = "360+ Days";
                }

                $scope.totalReciable += Number((aData.TotalReceivable).toFixed(2));
                $scope.TotalSlot1 += Number((aData.Slot_01).toFixed(2));
                $scope.TotalSlot2 += Number((aData.Slot_02).toFixed(2));
                $scope.TotalSlot3 += Number((aData.Slot_03).toFixed(2));
                $scope.TotalSlot4 += Number((aData.Slot_04).toFixed(2));
                $scope.TotalSlot5 += Number((aData.Slot_05).toFixed(2));

                $scope.AgingReportList.push(aData);
                // console.log(" $scope.AgingReportList", $scope.AgingReportList);
            });
            $scope.toFixedtotalReciable = ($scope.totalReciable).toFixed(2);
            $scope.toFixedTotalSlot1 = ($scope.TotalSlot1).toFixed(2);
            $scope.toFixedTotalSlot2 = ($scope.TotalSlot2).toFixed(2);
            $scope.toFixedTotalSlot3 = ($scope.TotalSlot3).toFixed(2);
            $scope.toFixedTotalSlot4 = ($scope.TotalSlot4).toFixed(2);
            $scope.toFixedTotalSlot5 = ($scope.TotalSlot5).toFixed(2);
        })
    }

});