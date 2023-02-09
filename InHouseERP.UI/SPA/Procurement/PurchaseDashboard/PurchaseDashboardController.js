app.controller("PurchaseDashboardController", function ($scope, $cookieStore, $window, $cookies, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.PurchaseDashboard = parseInt(sessionStorage.getItem("PurchaseDashboardScreenId"));
    Clear();

    function Clear() {
        $scope.DashboardTypeList = [{ 'DashboardTypeId': 1, 'DashboardTypeName': 'Supplier' }, { 'DashboardTypeId': 2, 'DashboardTypeName': 'Item' }]
        $scope.SupplierList = [];

        $scope.ddlDashboardType = null;
        $scope.SupplierShowDiv = false;
        $scope.ShowDiv = false;;

        $scope.PurchaseDashboardList = [];
        $scope.SupplierItemList = [];
        GetSupplierItem();
    }

    function GetSupplierItem() {
        $http({
            url: '/ProcurementDashboard/GetSupplierItem',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierItemList = data;
        })
    }
    $scope.onLoadBtn = function () {
        $scope.PurchaseFromDate = $("#txtFromDateForSD").val();
        $scope.PurchaseToDate = $("#txtToDateForSD").val();

        var whereCondition = '';

        if ($scope.ddlDashboardType.DashboardTypeId == 1) {
            if ($scope.PurchaseFromDate != "" && $scope.PurchaseToDate != "") {
                whereCondition = "(CAST(PB.[PBDate] as Date) between '" + $scope.PurchaseFromDate + "' and '" + $scope.PurchaseToDate + "') and PB.SupplierId =" + $scope.ddlSupplier.Id + "";
            } else if ($scope.PurchaseFromDate != "") {
                whereCondition = "(CAST(PB.[PBDate] as Date)>='" + $scope.PurchaseFromDate + "') and PB.SupplierId =" + $scope.ddlSupplier.Id + "";
            } else if ($scope.PurchaseToDate != "") {
                whereCondition = "(CAST(PB.[PBDate] as Date)<='" + $scope.PurchaseToDate + "') and PB.SupplierId =" + $scope.ddlSupplier.Id + "";
            } else if ($scope.ddlSupplier.Id != undefined) {
                whereCondition = "PB.SupplierId =" + $scope.ddlSupplier.Id + "";
            }
        } else if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            if ($scope.PurchaseFromDate != "" && $scope.PurchaseToDate != "") {
                whereCondition = "(CAST(PB.[PBDate] as Date) between '" + $scope.PurchaseFromDate + "' and '" + $scope.PurchaseToDate + "') and I.ItemId =" + $scope.ddlSupplier.Id + "";
            } else if ($scope.PurchaseFromDate != "") {
                whereCondition = "(CAST(PB.[PBDate] as Date)>='" + $scope.PurchaseFromDate + "') and I.ItemId =" + $scope.ddlSupplier.Id + "";
            } else if ($scope.PurchaseToDate != "") {
                whereCondition = "(CAST(PB.[PBDate] as Date)<='" + $scope.PurchaseToDate + "') and I.ItemId =" + $scope.ddlSupplier.Id + "";
            } else if ($scope.ddlSupplier.Id != "") {
                whereCondition = "I.ItemId =" + $scope.ddlSupplier.Id + "";
            }
        }

        $http({
            url: '/ProcurementDashboard/GetPurchaseDashboard?whereCondition=' + whereCondition + '&orderByExpression=PBDate',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PurchaseDashboardList = data;


            $scope.$PurchaseDashboardList = $scope.PurchaseDashboardList;
            $scope.PurchaseDashboardList = Array.from(
                $scope.PurchaseDashboardList.reduce((m, o) => m.set(o.SupplierName, (m.get(o.SupplierName) || []).concat(o)), new Map),
                ([SupplierName, events]) => ({ SupplierName, events })
            );
            console.log('$scope.$PurchaseDashboardList', $scope.$PurchaseDashboardList);
            console.log('$scope.PurchaseDashboardList', $scope.PurchaseDashboardList);
            angular.forEach($scope.PurchaseDashboardList, function (aData) {
                aData.DisplaySta = false;
                aData.DisplaySta2 = false;
                aData.TotalAmount = 0;
                angular.forEach(aData.events, function (aEvent) {
                    aEvent.DisplaySta = false;
                    aEvent.DisplaySta2 = false;
                    var res1 = aEvent.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aEvent.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aEvent.PBDate = date1;
                    }
                    aData.TotalAmount += aEvent.Amount;
                })
            })


        });
    }

    $scope.GetPurchaseDetail = function (PurchaseId, IsLocal) {
        $scope.PurchaseDetailList = [];
        //$scope.TotalAmount = 0;
        var url = '';
        if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            url = '/ProcurementDashboard/PurchaseDashboard_GetPurchaseDetailByPurchaseId?PurchaseId=' + PurchaseId + '&IsLocal=' + IsLocal + '&ItemId=' + $scope.ddlSupplier.Id;
        } else {
            url = '/ProcurementDashboard/PurchaseDashboard_GetPurchaseDetailByPurchaseId?PurchaseId=' + PurchaseId + '&IsLocal=' + IsLocal + '&ItemId=0';
        }
        $http({
            url: url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PurchaseDetailList = data;
            angular.forEach($scope.PurchaseDetailList, function (aData) {
                aData.DisplaySta2 = false;
                //$scope.TotalAmount += aData.Amount;
            });
            /*console.log($scope.PurchaseDetailList)*/
        });


    }
    $scope.AutoCollasePurchase = function (aPurchase) {
        angular.forEach($scope.PurchaseDashboardList, function (aData) {
            angular.forEach(aData.events, function (aEvent) {
                aEvent.DisplaySta2 = false;
                if (aEvent.PBId == aPurchase.PBId && aEvent.IsLocal == aPurchase.IsLocal) {
                    aEvent.DisplaySta2 = true;
                } else {
                    aEvent.DisplaySta2 = false;
                }
            })
        })
    }
    $scope.AutoCollasePurchaseDetail = function (aPurchaseDetail) {
        angular.forEach($scope.PurchaseDetailList, function (aData) {
            if (aData.PBDetailId == aPurchaseDetail.PBDetailId && aData.IsLocal == aPurchaseDetail.IsLocal && aPurchaseDetail.DisplaySta3 == true) {
                aData.DisplaySta3 = true;
            } else {
                aData.DisplaySta3 = false;
            }
        })

        if ($scope.PurchaseDetailList.length > 0 && aPurchaseDetail.CategoryId == 2) {
            //var criteria = "ItemId=" + aPurchaseDetail.ItemId;
            $http({
                url: "/ProcurementDashboard/GetPurchaseBillDetailSerialLocalAndImport?ItemId=" + aPurchaseDetail.ItemId,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.WarrentyAndSerialNoDetailAdAttributeLst = data;

            })

        }
    }

    function uniqueByKey(array, key) {
        return [...new Map(array.map((x) => [x[key], x])).values()];
    }

    $scope.onDivShowGetById = function (id) {
        $scope.ddlSupplier = null;
        $scope.$SupplierList = [];
        $scope.SupplierList = [];
        $('#ddlSupplier').select2('destroy');
        $('#ddlSupplier').val('').select2({
            placeholder: "Select Supplier/Item",
            theme: "classic",
            dropdownAutoWidth: false
        });

        if (id == 1) {
            $scope.SupplierList = uniqueByKey($scope.SupplierItemList, 'SupplierId');
            angular.forEach($scope.SupplierList, function (aData) {
                aData.Id = aData.SupplierId;
                aData.Name = aData.SupplierName;
            })
        }
        else if (id == 2) {
            $scope.SupplierList = uniqueByKey($scope.SupplierItemList, 'ItemId');
            angular.forEach($scope.SupplierList, function (aData) {
                aData.Id = aData.ItemId;
                aData.Name = aData.ItemName;
            })
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