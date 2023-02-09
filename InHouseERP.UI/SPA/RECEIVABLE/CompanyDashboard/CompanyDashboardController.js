app.controller("CompanyDashboardController", function ($scope, $cookieStore, $http, $window, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.CompanyDashboard = parseInt(sessionStorage.getItem("CompanyDashboardScreenId"));
    Clear();

    function Clear() {

        $scope.DashboardTypeList = [{ 'DashboardTypeId': 1, 'DashboardTypeName': 'Sales' }, { 'DashboardTypeId': 2, 'DashboardTypeName': 'Payment' }, { 'DashboardTypeId': 3, 'DashboardTypeName': 'Advanced' }, { 'DashboardTypeId': 4, 'DashboardTypeName': 'OnAccount' }]
        GetActiveCompany();
        $('#ddlCompany').focus();
        $scope.ddlDashboardType = null;
        $scope.ddlCompany = null;
        $scope.SalesShowDiv = false;
        $scope.PaymentShowDiv = false;
        $scope.advanced = false;
        $scope.onAccount = false;

        $scope.SalesList = [];
        $scope.SalesDetailList = [];
        $scope.PaymentList = [];
        $scope.PaymentDetailList = [];
        $scope.AdvancedPaymentDetailList = [];
        $scope.OnAccountDetailList = [];
       

        $scope.CompanyOptions = [];
        $scope.CompanyModelList = [];

        $scope.Companysettings = {
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
           
        };

        $scope.CompanyPlaceholder = {
            buttonDefaultText: "Search Customer",
            searchPlaceholder: "Search Customer",

        };


        $scope.paymentTypelist = [];
        GetAllActivePaymentType();

        $scope.PaymentOptions = [];
        $scope.PaymentModelList = [];

        $scope.Paymentsettings = {
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
        };

        $scope.PaymentPlaceholder = {
            buttonDefaultText: "Search Payment",
            searchPlaceholder: "Search Payment",

        };



    }

    $scope.PrintBtn = function () {

      
        //if ($scope.ddlDashboardType.DashboardTypeId == 2) {
        //    $scope.IsPaymentReport = true;
        //} else {
        //    $scope.IsPurchase = true;
        //}

        $(".main-footer").attr("hidden", true);
        $(".PrintBtnId").show();
        window.print();
    }

    function GetActiveCompany() {
        var criteria = "C.IsActive=1";
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyName",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyList = data;
            angular.forEach($scope.CompanyList, function (aSec) {
                $scope.CompanyOptions.push({ id: aSec.CompanyId, label: aSec.CompanyName });
            })
        })
    }


    function GetAllActivePaymentType() {
        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.paymentTypelist = data;

            angular.forEach($scope.paymentTypelist, function (aSec) {
                $scope.PaymentOptions.push({ id: aSec.PaymentTypeId, label:' [ ' + aSec.PaymentGroupName + ' ] : ' + aSec.PaymentTypeName });
            })


        })
    }

    $scope.onLoadBtn = function () {
        var fromDate = $("#txtFromDateForSD").val();
        //fromDate = fromDate.split("/").reverse().join("-");
        var toDate = $("#txtToDateForSD").val();
       // toDate = toDate.split("/").reverse().join("-");

        $scope.CompanyIds = '';
        angular.forEach($scope.CompanyModelList, function (data) {
            $scope.CompanyIds += $scope.CompanyIds == '' ? data.id : (',' + data.id)
        });

        $scope.PaymentIds = '';
        angular.forEach($scope.PaymentModelList, function (data) {
            $scope.PaymentIds += $scope.PaymentIds == '' ? data.id : (',' + data.id)
        });

        var SearchCriteria = '';

        if ($scope.ddlDashboardType.DashboardTypeId == 1) {
            $scope.AdvancedPaymentDetailList = [];

            if ($scope.CompanyIds !="") {
                SearchCriteria = "([SalesInvoiceDate] between '" + fromDate + "' and '" + toDate + "') and  CompanyId IN (" + $scope.CompanyIds + ")";
                
            } else {
                SearchCriteria = "([SalesInvoiceDate] between '" + fromDate + "' and '" + toDate + "')";
            }

            $http({
                url: '/CompanyDashboard/GetDynamicForSalesInvoice?searchCriteria=' + SearchCriteria + '&orderBy=SalesInvoiceId',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.SalesList = data;
                console.log('$scope.SalesList', $scope.SalesList);
                angular.forEach($scope.SalesList, function (aData) {
                    aData.DisplaySta = false;


                    var res1 = aData.SalesInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.SalesInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.SalesInvoiceDate = date1;
                    }

                })

            });
        } else if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            $scope.AdvancedPaymentDetailList = [];
           // if ($scope.CompanyIds !="") {

              //  SearchCriteria = "([CP].[PaymentDate] between '" + fromDate + "' and '" + toDate + "') AND [CP].[CompanyId]  IN (" + $scope.CompanyIds + ") OR [CP].[PaymentTypeId]  IN (" + $scope.PaymentIds + ") ";
              //  SearchCriteria = "([CP].[PaymentDate] between '" + fromDate + "' and '" + toDate + "') AND ([CP].[CompanyId]  IN (" + $scope.CompanyIds + ") OR [CP].[CompanyId]  ='') AND ([CP].[PaymentTypeId] in(" + $scope.PaymentIds+") OR [CP].[PaymentTypeId]='')";
             //   SearchCriteria = "([CP].[PaymentDate] between '" + fromDate + "' and '" + toDate + "') AND ([CP].[CompanyId]  IN (" + $scope.CompanyIds + ") OR [CP].[CompanyId]  ='') AND ([CP].[PaymentTypeId] in(" + $scope.PaymentIds+") OR [CP].[PaymentTypeId]='')";
           // } else {
            //SearchCriteria = "([PaymentDate] between '" + fromDate + "' and '" + toDate + "') and CompanyId =" + '' + "";
               // SearchCriteria = "([PaymentDate] between '" + fromDate + "' and '" + toDate + "')";
           //}

            $http({
                url: '/CompanyDashboard/GetPaymentDashboard?CompanyIds=' + $scope.CompanyIds + '&PaymentTypeIds=' + $scope.PaymentIds + '&FromDate=' + fromDate + '&ToDate=' + toDate,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.PaymentList = data;
                console.log('$scope.PaymentList', $scope.PaymentList);
                $scope.TotalReceivedAmount = 0;
                $scope.TotalActualAmount = 0;

                angular.forEach($scope.PaymentList, function (aData) {
                    aData.DisplaySta = false;
                    $scope.TotalReceivedAmount += aData.ReceivedAmount;
                    $scope.TotalActualAmount += aData.ActualAmount;

                    var res1 = aData.PaymentDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.PaymentDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.PaymentDate = date1;
                    }

                })
            });
        }
        else if ($scope.ddlDashboardType.DashboardTypeId == 3) {
            $scope.advanced = true;
       
            var PaymentTypeId = 5;
            if ($scope.CompanyIds != "") {
                SearchCriteria = "(AdvanceDate between '" + fromDate + "' and '" + toDate + "')";
            } else {
                SearchCriteria = "(AdvanceDate between '" + fromDate + "' and '" + toDate + "') and CompanyId IN (" + $scope.CompanyIds + ")";

            }

            $http({
                url: '/CompanyDashboard/GetAdvancedDynamic?searchCriteria=' + SearchCriteria + '&orderBy=AdvanceId',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.TotalAdvancedAmount = 0;
               
                $scope.AdvancedPaymentDetailList = [];
                angular.forEach(data, function (aData) {
                    aData.DisplaySta = false;
                    var advAmount = 0;
                  
                    var res1 = aData.AdvanceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.AdvanceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.AdvanceDate = date1;
                    }

                    advAmount += aData.AdvanceAmount;
                    $scope.TotalAdvancedAmount += aData.AdvanceAmount;
                    $scope.AdvancedPaymentDetailList.push(aData);
                })
               
            });
        }

        else if ($scope.ddlDashboardType.DashboardTypeId == 4) {
            $scope.onAccount = true;
            var PaymentTypeId = 6;
            if ($scope.CompanyIds != "") {
                SearchCriteria = "(OnAccountDate between '" + fromDate + "' and '" + toDate + "')";
            } else {
                SearchCriteria = "(OnAccountDate between '" + fromDate + "' and '" + toDate + "') and  CompanyId IN (" + $scope.CompanyIds + ")";

            }

            $http({
                url: '/CompanyDashboard/CompanyOnAccountPayment_GetDynamic?searchCriteria=' + SearchCriteria + '&orderBy=OnAccountId',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.OnAccountDetailList = data;
                $scope.TotalOnAccountAmount = 0;
                angular.forEach($scope.OnAccountDetailList, function (aData) {
                    aData.DisplaySta = false;


                    var res1 = aData.OnAccountDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.OnAccountDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.OnAccountDate = date1;
                    }
                    $scope.TotalOnAccountAmount += aData.OnAccountAmount;
                })
            });
        }


    }

    $scope.AutoCollaseSales = function (aSales) {
        if ($scope.ddlDashboardType.DashboardTypeId == 1) {
            angular.forEach($scope.SalesList, function (aData) {
                if (aData.SalesInvoiceId == aSales.SalesInvoiceId && aSales.DisplaySta == true) {
                    aData.DisplaySta = true;
                } else {
                    aData.DisplaySta = false;
                }
            })
        } else if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            angular.forEach($scope.PaymentDetailList, function (aData) {
                if (aData.CompanyPaymentId == aSales.CompanyPaymentId && aSales.DisplaySta2 == true) {
                    aData.DisplaySta2 = true;
                } else {
                    aData.DisplaySta2 = false;
                }
            })


        }


    }

    $scope.AutoCollasePayment = function (aPayment) {
        angular.forEach($scope.PaymentList, function (aData) {
            if (aData.CompanyPaymentId == aPayment.CompanyPaymentId && aPayment.DisplaySta == true) {
                aData.DisplaySta = true;
            } else {
                aData.DisplaySta = false;
            }
        })
    }

    $scope.GetSalesDetail = function (SalesInvoiceId) {
        $scope.SalesDetailList = [];
        $http({
            url: '/CompanyDashboard/GetSalesInvoiceDetailBySalesInvoiceId?SalesInvoiceId=' + SalesInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalesDetailList = data;
        });


    }
    

    $scope.GetPaymentDetail = function (CompanyPaymentId) {
        $scope.PaymentDetailList = [];
        $http({
            url: '/CompanyDashboard/GetCompanyPaymentDetailByCompanyPaymentId?CompanyPaymentId=' + CompanyPaymentId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaymentDetailList = data;
            console.log('$scope.PaymentDetailList', $scope.PaymentDetailList);
            angular.forEach($scope.PaymentDetailList, function (aData) {
                aData.DisplaySta2 = false;
                //var res1 = aData.SalesInvoiceDate.substring(0, 5);
                //if (res1 == "/Date") {
                //    var parsedDate1 = new Date(parseInt(aData.SalesInvoiceDate.substr(6)));
                //    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                //    aData.SalesInvoiceDate = date1;
                //}

            });
        });


    }

    $scope.onDivShowGetById = function (id) {
        if (id == 1) {
            $scope.SalesShowDiv = true;
            $scope.PaymentShowDiv = false;
            $scope.advanced = false;
            $scope.onAccount = false;
        }
        else if (id == 2) {
            $scope.PaymentShowDiv = true;
            $scope.SalesShowDiv = false;
            $scope.advanced = false;
            $scope.onAccount = false;
        } else if (id == 3) {
            $scope.advanced = true;
            $scope.SalesShowDiv = false;
            $scope.PaymentShowDiv = false;
            $scope.onAccount = false;
        }
        else if (id == 4) {
            $scope.onAccount = true;
            $scope.advanced = false;
            $scope.SalesShowDiv = false;
            $scope.PaymentShowDiv = false;
           
        }
        else {
            $scope.onAccount = false;
            $scope.SalesShowDiv = false;
            $scope.PaymentShowDiv = false;
            $scope.advanced = false;
        }
    }
    $scope.OpenReport = function (companies) {
        $window.open("#/CompanyPaymentReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("CompanyPayment", JSON.stringify(companies));
        event.stopPropagation();
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

})