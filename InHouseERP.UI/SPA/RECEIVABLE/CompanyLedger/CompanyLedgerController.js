
app.controller("CompanyLedgerController", function ($scope, $http, $filter, $cookieStore, $cookies, $window) {

    Clear();
    function Clear() {
        $scope.name = "Company Ledger";

        $scope.showTableItem = false;
        $scope.companyLedgerList = [];
        $scope.CheckAndAllCheckList = [];
        GetCompany();
        $scope.invPBDetailsFiledHide = false;
        $scope.companyAllLedgerList = [];
        $scope.SupAllListShow = true;
        $scope.checkFilterListData = [];

    }

    $("#txtFromDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChange = function () {
        $("#txtFromDate").focus();
        $("#txtFromDate").trigger("click");
    }


    $("#txtToDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChange = function () {
        $("#txtToDate").focus();
        $("#txtToDate").trigger("click");
    }

    $scope.hideBtnColapse = function () {
        $scope.invPBDetailsFiledHide == true;
        $scope.invPBDetailsFiledHide = $scope.invPBDetailsFiledHide == false ? true : false;
    }

    $scope.companylistAll = [];
    $scope.companyIdList = [];

    $scope.example8settings = {
        checkBoxes: true,
        scrollableHeight: '200px',
        scrollable: true,
        dynamicTitle: true,
        selectionOf: true,
        showUncheckAll: true,
        showCheckAll: true,
        enableSearch: true
    };



    function GetCompany() {
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.companylist = data;
            
        })
    }

    $scope.onSuppilerInfoLoad = function (supId) {
        $scope.companyId = supId;
    }

    $scope.onLoadBtn = function () {

        $scope.CheckAndAllCheckList = [];
        $scope.selectedAll = false;

        if ($scope.companyId == undefined && $scope.companyId == null) {
            $scope.showTableItem = false;
            $scope.companyId = 0;
        } else {
            $scope.showTableItem = true;
        }

        var fromDate = $("#txtFromDate").val();
        /// fromDate = fromDate.split("/").reverse().join("-");
        var toDate = $("#txtToDate").val();
        // toDate = toDate.split("/").reverse().join("-");
        $scope.SupAllListShow = false;
        $scope.showTableItem = true;
        $http({
            url: '/CompanyPaymentAdjustment/GetAllCompanyLedger?CompanyId=' + $scope.companyId + '&formDate=' + fromDate + '&toDate=' + toDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.companyAllLedgerList = data;
            
        })

    }


    $scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        if ($scope.selectedAll == false) {
            $scope.CheckAndAllCheckList = [];
            angular.forEach($scope.companyAllLedgerList, function (item) {
                item.Selected = $scope.selectedAll;

            });
        } else {
            angular.forEach($scope.companyAllLedgerList, function (item) {
                item.Selected = $scope.selectedAll;
                item.FromDate = $scope.FromDate
                item.ToDate = $scope.ToDate
                $scope.CheckAndAllCheckList.push(item);

            });
        }


    };

    $scope.checkFilterList = function (supLedList) {

        if (supLedList.Selected == true) {
            supLedList.FromDate = $scope.FromDate
            supLedList.ToDate = $scope.ToDate
            $scope.CheckAndAllCheckList.push(supLedList);

        } else {
            var index = $scope.CheckAndAllCheckList.indexOf(supLedList);
            $scope.CheckAndAllCheckList.splice(index, 1);

        }

        if ($scope.companyAllLedgerList.length == $scope.CheckAndAllCheckList.length) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }



    }

    $scope.companyLedgerReportBtn = function () {

        sessionStorage.setItem("CompanyLedgerReportData", JSON.stringify($scope.CheckAndAllCheckList));
        $window.open("#/CompanyLedgerReport", "popup", "width=850,height=550,left=280,top=80");
        console.log($scope.CheckAndAllCheckList);
        event.stopPropagation();

    };

    $scope.PaymentLedgerShowBtn = function () {
        $('#companyledgerShow').modal('show');
    }


    $scope.CheckAllValue = function (isBool) {
        angular.forEach($scope.companyAllLedgerList, function (item) {
            $scope.selectedIsCheck = isBool;
        });


    }

})