app.controller("StockReceiveDashboardController", function ($scope, $cookieStore, $window, $cookies, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.StockReceiveDashboard = parseInt(sessionStorage.getItem("StockReceiveDashboardScreenId"));
    Clear();

    function Clear() {
        $scope.DashboardTypeList = [{ 'DashboardTypeId': 1, 'DashboardTypeName': 'Supplier' }, { 'DashboardTypeId': 2, 'DashboardTypeName': 'Purchase Number' }, { 'DashboardTypeId': 3, 'DashboardTypeName': 'Receive Number' }, { 'DashboardTypeId': 4, 'DashboardTypeName': 'Item' }]
        $scope.ddlDashboardType = null;

        $scope.SupplierItemList = [];
    }

    function GetAllSupplier() {
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierItemList = data;
            angular.forEach($scope.SupplierItemList,
                function (aData) {
                    aData.Name = aData.SupplierName
                    aData.Id = aData.SupplierId;
                });
        })
    }
    function GetAllReceiveNo() {
        $http({
            url: '/StockReceiveDashboard/GetAllReceiveAndPurchaseNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierItemList = data;
            angular.forEach($scope.SupplierItemList,
                function (aData) {
                    aData.Name = aData.ReceiveNo
                    aData.Id = aData.SRId;
                });
        })
    }
    function GetAllPurchaseNo() {
        $http({
            url: '/StockReceiveDashboard/GetAllReceiveAndPurchaseNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierItemList = data;
            angular.forEach($scope.SupplierItemList,
                function (aData) {
                    aData.Name = aData.PBNo
                    aData.Id = aData.PBId;
                });
        })
    }
    function GetAllProduct() {
        var SearchCriteria = '1=1';
        $http({
            url: '/Item/GetItemSearchResult?searchCriteria=' + SearchCriteria,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierItemList = data;
            angular.forEach($scope.SupplierItemList,
                function (aData) {
                    aData.Name = aData.ItemName
                        +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " + "Size Code: " +
                        aData.ItemCode +
                        " ~ " + "Sub Category: " +
                        aData.SubCategoryName;
                    aData.Id = aData.ItemId;
                });

        });
    }
    $scope.onLoadBtn = function () {

        $scope.CIFFromDate = $("#txtFromDateForSD").val();
        $scope.CIFToDate = $("#txtToDateForSD").val();

        var whereCondition = '';

        if ($scope.ddlDashboardType.DashboardTypeId == 1) {
            if ($scope.CIFFromDate != "" && $scope.CIFToDate != "") {
                whereCondition = "(SR.[ReceiveDate] between '" + $scope.CIFFromDate + "' and '" + $scope.CIFToDate + "') and PB.SupplierId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.CIFFromDate != "") {
                whereCondition = "(SR.[ReceiveDate]>='" + $scope.CIFFromDate + "') and PB.SupplierId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.CIFToDate != "") {
                whereCondition = "(SR.[ReceiveDate]<='" + $scope.CIFToDate + "') and PB.SupplierId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.ddlSupplierItem.Id != undefined) {
                whereCondition = "PB.SupplierId =" + $scope.ddlSupplierItem.Id + "";
            }
        } else if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            if ($scope.CIFFromDate != "" && $scope.CIFToDate != "") {
                whereCondition = "(SR.[ReceiveDate] between '" + $scope.CIFFromDate + "' and '" + $scope.CIFToDate + "') and PB.PBId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.CIFFromDate != "") {
                whereCondition = "(SR.[ReceiveDate]>='" + $scope.CIFFromDate + "') and PB.PBId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.CIFToDate != "") {
                whereCondition = "(SR.[ReceiveDate]<='" + $scope.CIFToDate + "') and PB.PBId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.ddlSupplierItem.Id != "") {
                whereCondition = "PB.PBId =" + $scope.ddlSupplierItem.Id + "";
            }
        }else if ($scope.ddlDashboardType.DashboardTypeId == 3) {
            if ($scope.CIFFromDate != "" && $scope.CIFToDate != "") {
                whereCondition = "(SR.[ReceiveDate] between '" + $scope.CIFFromDate + "' and '" + $scope.CIFToDate + "') and SR.SRId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.CIFFromDate != "") {
                whereCondition = "(SR.[ReceiveDate]>='" + $scope.CIFFromDate + "') and SR.SRId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.CIFToDate != "") {
                whereCondition = "(SR.[ReceiveDate]<='" + $scope.CIFToDate + "') and SR.SRId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.ddlSupplierItem.Id != "") {
                whereCondition = "SR.SRId =" + $scope.ddlSupplierItem.Id + "";
            }
        } else if ($scope.ddlDashboardType.DashboardTypeId == 4) {
            if ($scope.CIFFromDate != "" && $scope.CIFToDate != "") {
                whereCondition = "(SR.[ReceiveDate] between '" + $scope.CIFFromDate + "' and '" + $scope.CIFToDate + "') and SRD.ItemId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.CIFFromDate != "") {
                whereCondition = "(SR.[ReceiveDate]>='" + $scope.CIFFromDate + "') and SRD.ItemId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.CIFToDate != "") {
                whereCondition = "(SR.[ReceiveDate]<='" + $scope.CIFToDate + "') and SRD.ItemId =" + $scope.ddlSupplierItem.Id + "";
            } else if ($scope.ddlSupplierItem.Id != "") {
                whereCondition = "SRD.ItemId =" + $scope.ddlSupplierItem.Id + "";
            }
        }

        $http({
            url: '/StockReceiveDashboard/GetStockReceiveDashboard?whereCondition=' + whereCondition + '&orderByExpression=SR.ReceiveDate',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.StockReceiveDashboardList = data;

            $scope.StockReceiveDashboardList = Array.from(
                $scope.StockReceiveDashboardList.reduce((m, o) => m.set(o.ReceiveNo, (m.get(o.ReceiveNo) || []).concat(o)), new Map),
                ([ReceiveNo, events]) => ({ ReceiveNo, events })
            );

            angular.forEach($scope.StockReceiveDashboardList, function (aData) {
                angular.forEach(aData.events, function (aEvent) {
                    aEvent.DisplaySta = false;
                    aEvent.DisplaySta2 = false;
                    var res1 = aEvent.ReceiveDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aEvent.ReceiveDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aEvent.ReceiveDate = date1;
                    }
                    var res1 = aEvent.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aEvent.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aEvent.PBDate = date1;
                    }
                })

                aData.DisplaySta = false;
                aData.DisplaySta2 = false;
                aData.SupplierName = aData.events[0].SupplierName;
                aData.PBNo = aData.events[0].PBNo;
                aData.PBDate = aData.events[0].PBDate;
                aData.ReceiveNo = aData.events[0].ReceiveNo;
                aData.ReceiveDate = aData.events[0].ReceiveDate;
                aData.ReceivedBy = aData.events[0].ReceivedBy;
                aData.PreparedBy = aData.events[0].PreparedBy;
                aData.PBType = aData.events[0].PBType;


                
            })


        });
    }

    //$scope.AutoCollaseSalesOrder = function (aSalesOrder) {
    //    angular.forEach($scope.StockReceiveDashboardList, function (aData) {
    //        angular.forEach(aData.events, function (aEvent) {
    //            aEvent.DisplaySta2 = false;
    //            if (aEvent.SalesOrderId == aSalesOrder.SalesOrderId) {
    //                aEvent.DisplaySta2 = true;
    //            } else {
    //                aEvent.DisplaySta2 = false;
    //            }
    //        })
    //    })
    //}


    $scope.onDivShowGetById = function (id) {
        $scope.ddlSupplierItem = null;
        $scope.SupplierItemList = [];
        $('#ddlSupplierItem').select2('destroy');
        $('#ddlSupplierItem').val('').select2({
            placeholder: "Select Supplier/Item",
            theme: "classic",
            dropdownAutoWidth: false
        });

        if ($scope.ddlDashboardType.DashboardTypeId == 1) {
            GetAllSupplier();
        } else if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            GetAllPurchaseNo();
        }else if ($scope.ddlDashboardType.DashboardTypeId == 3) {
            GetAllReceiveNo();
        }
         else if ($scope.ddlDashboardType.DashboardTypeId == 4) {
            GetAllProduct();
        }


    }


    $("#txtFromDateForSD").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForSD = function () {
        $("#txtFromDateForSD").val('');
        $("#txtFromDateForSD").focus();
        $("#txtFromDateForSD").trigger("click");
    }


    $("#txtToDateForSD").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.ToDateChangeForSD = function () {
        $("#txtToDateForSD").val('');
        $("#txtToDateForSD").focus();
        $("#txtToDateForSD").trigger("click");

    }

})