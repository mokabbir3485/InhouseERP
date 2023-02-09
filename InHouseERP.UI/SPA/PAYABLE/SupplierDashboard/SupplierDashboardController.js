app.controller("SupplierDashboardController", function ($scope, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    var Valuation = sessionStorage.getItem("ValuationSession");
    if (Valuation != null) {
        $scope.CurrentValuationSetup = JSON.parse(sessionStorage.ValuationSession);
    }
    Clear();

    function Clear() {
        $scope.IsPaymentReport = false;
        $scope.IsPurchase = false;
        $scope.DashboardTypeList = [{ 'DashboardTypeId': 1, 'DashboardTypeName': 'Purchase' }, { 'DashboardTypeId': 2, 'DashboardTypeName': 'Payment' }]
        GetActiveSupplier();
        $('#ddlSupplier').focus();
        $scope.ddlDashboardType = null;
        $scope.invPBDetailsFiledHide = false;
        $scope.PurchaseShowDiv = false;
        $scope.PaymentShowDiv = false;
        $scope.showdis = false;

        $scope.PurchaseBillList = [];
        $scope.PurchaseBillDetailList = [];
        $scope.PaymentList = [];
        $scope.PaymentDetailList = [];
        $scope.paymentTypelist = [];
        GetAllActivePaymentType();

        $scope.SupplierOptions = [];
        $scope.SupplierDemandList = [];



        $scope.example8settings = {
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
            //selectionLimit: 1,
            //smartButtonMaxItems: 1,
            //dynamicTitle: true,
            //smartButtonTextConverter: function (itemText) { return itemText; }
        };

        //$("#SelectMandatoryHide button").removeClass("selectMendatory").addClass("selectNotMandetory");
        $scope.SupplierPlaceholder = {
            //  buttonDefaultText: "Select Material Demands",
            searchPlaceholder: "Search Supplier",

        };

    }

    function GetActiveSupplier() {
        $http({
            url: '/Supplier/GetDynamic?searchCriteria=IsActive=1&orderBy=SupplierName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierList = data;

           
            angular.forEach(data, function (aSec) {
                $scope.SupplierOptions.push({ id: aSec.SupplierId, label: aSec.SupplierName });
            })
            
        })
    }


    function GetAllActivePaymentType() {
        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aPay) {
                if (aPay.PaymentTypeId != 6) {
                    $scope.paymentTypelist.push(aPay);
                }
            })


        })
    }

    $scope.GetSupplierList = function () {
        if ($scope.SupplierDemandList.length > 0) {

        } else {
            $scope.TotalActualAmount = 0;
            $scope.TotalPaidAmount = 0;
            $scope.VatAitWithPaidAmount = 0;
            $scope.TotalAmountSum = 0;
            $scope.PurchaseBillList = [];
            $scope.PaymentList = [];
          
        }
    }

    $scope.onLoadBtn = function () {

        if ($scope.SupplierDemandList.length > 0) {
           
            $scope.TypeIds = '';
            angular.forEach($scope.SupplierDemandList, function (data) {
                $scope.TypeIds += $scope.TypeIds == '' ? data.id : (',' + data.id)
            });


            $scope.TotalPaidAmount = 0;
            $scope.TotalActualAmount = 0;
            $scope.TotalAmountSum = 0;
            $scope.VatAitWithPaidAmount = 0;
            var PaymentTypeId = null;
            var fromDate = $("#txtFromDateForSD").val();
            /// fromDate = fromDate.split("/").reverse().join("-");
            var toDate = $("#txtToDateForSD").val();
            // toDate = toDate.split("/").reverse().join("-");
            var SearchCriteria = '';



            if ($scope.ddlDashboardType.DashboardTypeId == 1) {
                SearchCriteria = "([PBDate] between '" + fromDate + "' and '" + toDate + "') and PBV.[SupplierId] IN (" + $scope.TypeIds + ")";
                $scope.PurchaseBillList = [];
                $scope.PaymentList = [];
                $http({
                    url: '/SupplierDashboard/GetPurchaseBillDynamic?searchCriteria=' + SearchCriteria + '&orderBy=PBId',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.PurchaseBillList = data;

                    angular.forEach($scope.PurchaseBillList, function (aData) {
                        aData.DisplaySta = false;


                        var res1 = aData.PBDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aData.PBDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aData.PBDate = date1;
                        }
                        $scope.TotalAmountSum += aData.TotalAmountAfterDiscount;

                        //$http({
                        //    url: '/SupplierDashboard/GetPurchaseBillDetailByPBId?PBId=' + aData.PBId + '&Islocal=' + aData.Islocal,
                        //    method: 'GET',
                        //    headers: { 'Content-Type': 'application/json' }
                        //}).success(function (data) {
                        //    angular.forEach(data, function (aData) {
                        //        aData.TotalPurchaseBillAmount +=aData.PBPrice;
                        //    })

                        //});


                    })

                    // 

                });
            } else if ($scope.ddlDashboardType.DashboardTypeId == 2) {
                //SearchCriteria = "([PBDate] between '" + fromDate + "' and '" + toDate + "') and SP.SupplierId =" + $scope.ddlSupplier.SupplierId + "";
                $scope.PurchaseBillList = [];
                $scope.PaymentList = [];

                if ($scope.ddlpayment == null || $scope.ddlpayment == undefined) {
                    PaymentTypeId = null;
                } else {
                    PaymentTypeId = $scope.ddlpayment.PaymentTypeId;
                }
                $http({
                    url: '/SupplierDashboard/SupplierPaymentDetailReport?SupplierIds=' + $scope.TypeIds + '&FromDate=' + fromDate + '&ToDate=' + toDate + '&PaymentTypeId=' + PaymentTypeId,
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.PaymentList = data;

                    angular.forEach($scope.PaymentList, function (aData) {
                        aData.DisplaySta = false;
                        $scope.TotalPaidAmount += aData.PaidAmount;
                        $scope.TotalActualAmount += aData.ActualAmount;
                        aData.PaidAmountVATAIT = aData.PaidAmount + aData.TotalVAT + aData.TotalAIT;
                        $scope.VatAitWithPaidAmount += aData.PaidAmount + aData.TotalVAT + aData.TotalAIT;
                        var res1 = aData.PaymentDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aData.PaymentDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aData.PaymentDate = date1;
                        }



                    })
                    //   
                });
            }

        }
        else {
            $scope.TotalActualAmount = 0;
            $scope.TotalPaidAmount = 0;
            $scope.VatAitWithPaidAmount = 0;
            $scope.TotalAmountSum = 0;
            $scope.PurchaseBillList = [];
            $scope.PaymentList = [];
            alertify.log('Supplier Name can`t be null', 'error', '5000');
           
        }
     
        
    }

    $scope.AutoCollasePurchaseBill = function (aPurchaseBill) {
        if ($scope.ddlDashboardType.DashboardTypeId == 1) {
            angular.forEach($scope.PurchaseBillList, function (aData) {
                if (aData.PBId == aPurchaseBill.PBId && aPurchaseBill.DisplaySta == true) {
                    aData.DisplaySta = true;
                } else {
                    aData.DisplaySta = false;
                }
            })
        } else if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            angular.forEach($scope.PaymentDetailList, function (aData) {
                if (aData.SupplierPaymentDetailId == aPurchaseBill.SupplierPaymentDetailId && aPurchaseBill.DisplaySta2 == true) {
                    aData.DisplaySta2 = true;
                } else {
                    aData.DisplaySta2 = false;
                }
            })
            

        }

        
    }

    $scope.AutoCollasePayment = function (aPayment) {
        angular.forEach($scope.PaymentList, function (aData) {
            if (aData.SupplierPaymentId == aPayment.SupplierPaymentId && aPayment.DisplaySta == true) {
                aData.DisplaySta = true;
            } else {
                aData.DisplaySta = false;
            }
        })
    }

    $scope.GetPurchaseBillDetail = function (PBId, Islocal) {
        $scope.PurchaseBillDetailList = [];
        $http({
            url: '/SupplierDashboard/GetPurchaseBillDetailByPBId?PBId=' + PBId + '&Islocal=' + Islocal,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PurchaseBillDetailList = data;

        });


    }
    //IsLocalPurchase

    $scope.GetPaymentDetail = function (SupplierPaymentId) {
        $scope.PaymentDetailList = [];
        $http({
            url: '/SupplierDashboard/GetPaymentDetailBySPId?SupplierPaymentId=' + SupplierPaymentId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaymentDetailList = data;

            angular.forEach($scope.PaymentDetailList, function (aData) {
                aData.DisplaySta2 = false;
                var res1 = aData.PBDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.PBDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.PBDate = date1;
                }

            });
            
        });


    }

    $scope.onDivShowGetById = function (id) {
        if (id == 1) {
            $scope.PurchaseShowDiv = true;
            $scope.PaymentShowDiv = false;
            $scope.IsPaymentReport = false;
            $scope.IsPurchase = true;
        }
        else if (id == 2) {
            $scope.PaymentShowDiv = true;
            $scope.PurchaseShowDiv = false;
            $scope.IsPaymentReport = true;
            $scope.IsPurchase = false;
        }
        else {
            $scope.PurchaseShowDiv = false;
            $scope.PaymentShowDiv = false;
            $scope.IsPaymentReport = false;
            $scope.IsPurchase = false;
        }
    }
    

    $("#txtFromDateForSD").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForSD = function () {
        $("#txtFromDateForSD").focus();
        $("#txtFromDateForSD").trigger("click");
    }


    $("#txtToDateForSD").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChangeForSD = function () {
        $("#txtToDateForSD").focus();
        $("#txtToDateForSD").trigger("click");
    }


    $scope.PrintBtn = function () {

        //  $(".PrintBtnId").attr("hidden", true);
        if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            $scope.IsPaymentReport = true;
        } else {
            $scope.IsPurchase = true;
        }
      
        $(".main-footer").attr("hidden", true);
        $(".PrintBtnId").show();
        window.print();
    }

})