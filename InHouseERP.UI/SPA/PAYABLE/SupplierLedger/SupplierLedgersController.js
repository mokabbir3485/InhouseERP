
app.controller("SupplierLedgersController", function ($scope, $http, $filter, $cookieStore, $cookies, $window) {

    Clear();
    function Clear() {
        $scope.name = "Supplier Ledger";

        $scope.showTableItem = false;
        $scope.supplierLedgerList = [];
        $scope.CheckAndAllCheckList = [];
        GetSupplier();
        //  $scope.selectedIsCheck = false;
        $scope.invPBDetailsFiledHide = false;
        $scope.supplierAllLedgerList = [];
        $scope.SupAllListShow = true;
        $scope.checkFilterListData = [];
        //$scope.allCheckedModel = false;

    }

    $("#txtFromDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChange = function () {
        $("#txtFromDate").focus();
        $("#txtFromDate").trigger("click");
    }


    $("#txtToDate").datepicker({
        dateFormat: "M dd, yy",
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

    $scope.supplierlistAll = [];
    $scope.supplierIdList = [];

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

    function GetSupplier() {
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierlist = data;
            
        })
    }

    $scope.onSuppilerInfoLoad = function (supId) {
        $scope.supplierId = supId;
    }

    $scope.onLoadBtn = function () {

        $scope.CheckAndAllCheckList = [];
        // $scope.supplierAllLedgerList = [];
        $scope.selectedAll = false;

        if ($scope.supplierId == undefined && $scope.supplierId == null) {
            $scope.showTableItem = false;
            $scope.supplierId = 0;
        } else {
            $scope.showTableItem = true;
        }

        var fromDate = $("#txtFromDate").val();
       /// fromDate = fromDate.split("/").reverse().join("-");
        var toDate = $("#txtToDate").val();
       // toDate = toDate.split("/").reverse().join("-");
        if ($scope.supplierId == 0 || $scope.supplierId == undefined || $scope.supplierId == null) {
            $scope.showTableItem = false;
            $scope.SupAllListShow = true;
            $http({
                url: '/SupplierPaymentAndAdjustment/GetAllSupplierLedger?supplierId=' + 0 + '&formDate=' + fromDate + '&toDate=' + toDate,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {

                $scope.supplierAllLedgerList = data;
                
            })
        } else {
            $scope.SupAllListShow = false;
            $scope.showTableItem = true;
            $http({
                url: '/SupplierPaymentAndAdjustment/GetAllSupplierLedger?supplierId=' + $scope.supplierId + '&formDate=' + fromDate + '&toDate=' + toDate,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {

                $scope.supplierAllLedgerList = data;
                
            })
        }

    }


    $scope.checkAll = function () {
        //$scope.CheckAndAllCheckList = [];
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        if ($scope.selectedAll == false) {
            $scope.CheckAndAllCheckList = [];
            angular.forEach($scope.supplierAllLedgerList, function (item) {
                item.Selected = $scope.selectedAll;
                //$scope.CheckAndAllCheckList.push(item);

            });
        } else {
            angular.forEach($scope.supplierAllLedgerList, function (item) {
                item.Selected = $scope.selectedAll;
                item.FromDate = $scope.FromDate;
                item.ToDate = $scope.ToDate;
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

        if ($scope.supplierAllLedgerList.length == $scope.CheckAndAllCheckList.length) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }


       
    }






    $scope.supplierLedgerReportBtn = function () {
        sessionStorage.setItem("SupplierLedgerReportData", JSON.stringify($scope.CheckAndAllCheckList));
        $window.open("#/SupplierLedgerReport", "popup", "width=850,height=550,left=280,top=80");
        //$cookieStore.put("SupplierLedgerReportData", $scope.CheckAndAllCheckList);
        console.log($scope.CheckAndAllCheckList);
        event.stopPropagation();

    };

    $scope.PaymentLedgerShowBtn = function () {
        $('#supplierledgerShow').modal('show');
    }


    $scope.CheckAllValue = function (isBool) {
        angular.forEach($scope.supplierAllLedgerList, function (item) {
            $scope.selectedIsCheck = isBool;
        });

        //if (isBool == true) {
        //    angular.forEach($scope.supplierAllLedgerList, function (aData) {
        //        if (aData.isCheck == false || aData.isCheck == undefined) {
        //           $scope.selectedIsCheck = true;
        //            aData.isCheck = true;
        //        } else {
        //            $scope.selectedIsCheck = false;
        //        } 
        //        $scope.checkList.push(aData);
        //    })

        //} else {
        //    angular.forEach($scope.supplierAllLedgerList, function (aData) {
        //        aData.isCheck = false;
        //        $scope.selectedIsCheck =aData.isCheck;
        //        $scope.checkList = [];

        //    })

        //}



        //console.log($scope.checkList);  


    }

})