app.controller("PostCiProcessController", function ($scope, $cookieStore, $http, $filter, $window) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.UserId = $scope.LoginUser.UserId;
    ClearForCC();
    clearForDC();
    clearForTC();
    clearForBD();
    Clear();
    
    function Clear() {
        $scope.button = "Save";
        $scope.CommercialInvoiceListForReport = [];
        $scope.ddlConsCommercialInvoiceForReport = null;
        GetAllCommercialInvoiceForReport();
    }

    function GetAllCommercialInvoiceForReport() {
        $http({
            url: '/ExpCommercialInvoice/GetAllCommercialInvoice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data) {
                angular.forEach(data, function (e) {
                    var isDate = isNaN(e.CommercialInvoiceDate);
                    if (isDate) {
                        var res1 = e.CommercialInvoiceDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(e.CommercialInvoiceDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            e.CommercialInvoiceDate = date1;

                        }
                    }
                    if (e.IsSubmitted == true && e.DocStatus != 'New Approval Pending') {
                        e.CompanyNameWithCiNum = e.CommercialInvoiceNo + "  ~  " + e.CompanyName;
                        $scope.CommercialInvoiceListForReport.push(e);
                    }
                });
            }
            
        });
    }
    //Delivery challan Part
    function clearForDC() {
        $scope.ddlConsCommercialInvoiceForDC = null;
        $scope.CommercialInvoiceListForDC = [];
        $scope.CommercialInvoiceListForDCGrid = [];
        $scope.CommercialInvoiceListForDCOriginal = [];
        $scope.disDDLForDC = false;
        GetAllCommercialInvoiceForDC();

        $scope.currentPageDC = 1;
        $scope.PerPageDC = 10;
        $scope.total_countDC = 0;
        GetDeliveryChallanPaged($scope.currentPageDC);
    }

    function GetAllCommercialInvoiceForDC() {
        $http({
            url: '/ExpCommercialInvoice/GetExpCommercialInvoiceDynamic?searchCriteria=CI.CommercialInvoiceId not in (SELECT CommercialInvoiceId FROM exp_DeliveryChallan)&orderBy=CI.CommercialInvoiceId DESC',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CommercialInvoiceListForDC = data;
            angular.forEach($scope.CommercialInvoiceListForDC, function (aData) {
                aData.CompanyNameWithCINo = aData.CommercialInvoiceNo + "  ~  " + aData.CompanyName;
            });
            
        });
    }
    //function GetAllCommercialInvoiceForDC() {

    //    $http({
    //        url:'/ExpCommercialInvoice/GetAllCommercialInvoice',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        if (data) {
    //            angular.forEach(data, function (e) {
    //                var isDate = isNaN(e.CommercialInvoiceDate);
    //                if (isDate) {
    //                    var res1 = e.CommercialInvoiceDate.substring(0, 5);
    //                    if (res1 == "/Date") {
    //                        var parsedDate1 = new Date(parseInt(e.CommercialInvoiceDate.substr(6)));
    //                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
    //                        e.CommercialInvoiceDate = date1;

    //                    }
    //                }
    //                if (e.IsSubmitted == true && e.DocStatus != 'New Approval Pending') {
    //                    $scope.CommercialInvoiceListForDCOriginal.push(e);
    //                }

    //                if (e.IsSubmitted == true && e.DocStatus != 'New Approval Pending' && e.DcGateNo == "" && e.VehicleRegNo == "") {
    //                    $scope.CommercialInvoiceListForDC.push(e);
    //                }

    //                if (e.IsSubmitted == true && e.DocStatus != 'New Approval Pending' && e.DcGateNo != "" && e.VehicleRegNo != "") {
    //                    $scope.CommercialInvoiceListForDCGrid.push(e);
    //                }

    //            });
    //        }
    //    });
    //}
    $scope.SaveDeliveryChallan = function () {
        $scope.disDDLForDC = false;
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $window.scrollTo(0, 0);
                $scope.exp_DeliveryChallan.UpdatedBy = $scope.UserId;
                var params = JSON.stringify({ exp_DeliveryChallan: $scope.exp_DeliveryChallan });

                $http.post('/ExpCommercialInvoice/DeliveryChallanPost', params).success(function (data) {
                    if (data > 0) {
                        alertify.log(' saved successfully!', 'success', '5000');
                        clearForDC();
                        $scope.exp_DeliveryChallan.DcGateNo = "";
                        $scope.exp_DeliveryChallan.VehicleRegNo = "";
                        $scope.consumptionCertificateForm.$setPristine();
                        $scope.consumptionCertificateForm.$setUntouched();
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
                window.scrollTo(0, 0);
            }
        })
    }
    $scope.UpdateDeliveryGet = function (aDeliveryChallan) {
        $scope.disDDLForDC = true;
        $scope.exp_DeliveryChallan = aDeliveryChallan;
        $scope.CommercialInvoiceListForDC = $scope.DeliveryChallanListPaged;

        $scope.ddlConsCommercialInvoiceForDC = { CommercialInvoiceId: aDeliveryChallan.CommercialInvoiceId };

        window.scrollTo(0, 0);
    }
    $scope.DeliveryChalanOneBtnTable = function (CommercialInvoiceId) {
        $window.open("#/DeliveryChalan", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdDC", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };
    $scope.resetChallanGateForm = function () {
        document.getElementById("btnResetForDC").disabled = true;
        setTimeout(function () {
            document.getElementById("btnResetForDC").disabled = false;
        }, 1500);
        $scope.exp_DeliveryChallan.DcGateNo = "";
        $scope.exp_DeliveryChallan.VehicleRegNo = "";
        clearForDC();
        $scope.consumptionCertificateForm.$setPristine();
        $scope.consumptionCertificateForm.$setUntouched();
        //$timeout(function () {
        //    document.getElementById("btnResetForDC").disabled = false;
        //}, 3000);
        
    }
    $scope.DeliveryChalanOneBtn = function (CommercialInvoiceId) {
        $window.open("#/DeliveryChalan", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdDC", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };

    $scope.reloadBtnDC = function () {
        $('#txtFromDateForDC').val('');
        $('#txtToDateForDC').val('');
        $('#textInvoiceNoAndCompany').val('');
        $scope.FromDateDC = "";
        $scope.ToDateDC = "";
        $scope.SearchInvoiceAndCompanyNameDC = null;
        GetDeliveryChallanPaged(1);
    }

    $scope.DeliveryChallanSearch = function () {
        GetDeliveryChallanPaged(1);

    }

    function GetDeliveryChallanPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPageDC * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForDC").val();
        $scope.FromDateDC = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForDC").val();
        $scope.ToDateDC = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchInvoiceAndCompanyNameDC != undefined && $scope.SearchInvoiceAndCompanyNameDC != "" && $scope.FromDateDC != "" && $scope.ToDateDC != "") {
            SearchCriteria = "([CommercialInvoiceDate] between '" + $scope.FromDateDC + "' and '" + $scope.ToDateDC + "') and ([CommercialInvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyNameDC + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyNameDC + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchInvoiceAndCompanyNameDC !== undefined && $scope.SearchInvoiceAndCompanyNameDC != null && $scope.SearchInvoiceAndCompanyNameDC != "") {
            SearchCriteria = "[CommercialInvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyNameDC + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyNameDC + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDateDC != "" && $scope.ToDateDC != "") {
            SearchCriteria = "[CommercialInvoiceDate] between '" + $scope.FromDateDC + "' and '" + $scope.ToDateDC + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/ExpCommercialInvoice/DeliveryChallanGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPageDC + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.CommercialInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.CommercialInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.CommercialInvoiceDate = date1;
                    }

                })

            }
            else {
                alertify.log('Delivery Challan  Not Found', 'error', '5000');
            }
            $scope.DeliveryChallanListPaged = data.ListData;
            $scope.total_countDC = data.TotalRecord;

            
        });
    }

    $scope.getDataDC = function (curPage) {

        if ($scope.PerPageDC > 100) {
            $scope.PerPageDC = 100;
            $scope.currentPageDC = curPage;
            GetDeliveryChallanPaged($scope.currentPageDC);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPageDC < 1) {
            $scope.PerPageDC = 1;
            $scope.currentPageDC = curPage;
            GetDeliveryChallanPaged($scope.currentPageDC);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPageDC = curPage;
            GetDeliveryChallanPaged($scope.currentPageDC);
        }


    }

    $("#txtFromDateForDC").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForDC = function () {
        $("#txtFromDateForDC").focus();
        $("#txtFromDateForDC").trigger("click");
    }


    $("#txtToDateForDC").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChangeForDC = function () {
        $("#txtToDateForDC").focus();
        $("#txtToDateForDC").trigger("click");
    }





    //TruckChllan Part
    function clearForTC() {
        //TruckChallan

        $scope.ddlConsCommercialInvoiceForTC = null;
        $scope.TCFooterSorting = 0;
        $scope.TCId = 0;
        $scope.CommercialInvoiceListForTC = [];
        $scope.TruckChallanList = [];
        $scope.TruckChallanUniqueList = [];
        $scope.exp_TruckChallan = [];
        $scope.TruckChallanSingle = [];
        $scope.OrginalCiListForTC = [];
        $scope.disDDLForTC = false;
        GetAllTruckChallan();
        GetAllCommercialInvoiceForTruckChallan();

        $scope.currentPageTC = 1;
        $scope.PerPageTC = 10;
        $scope.total_countTC = 0;
        GetTruckChallanPaged($scope.currentPageTC);
    }
    function GetAllCommercialInvoiceForTruckChallan() {
        $http({
            url: '/ExpCommercialInvoice/GetExpCommercialInvoiceDynamic?searchCriteria=CI.CommercialInvoiceId NOT IN(SELECT CommercialInvoiceId FROM exp_TruckChallan)&orderBy=CI.CommercialInvoiceId DESC',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CommercialInvoiceListForTC = data;
            angular.forEach($scope.CommercialInvoiceListForTC, function (aData) {
                aData.CompanyNameWithCINo = aData.CommercialInvoiceNo + "  ~  " + aData.CompanyName;
            });
            
        });
    }
    //function GetAllCommercialInvoiceForTruckChallan() {
    //    $http({
    //        url: '/ExpCommercialInvoice/GetAllCommercialInvoice',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        if (data) {
    //            angular.forEach(data, function (e) {
    //                var isDate = isNaN(e.CommercialInvoiceDate);
    //                if (isDate) {
    //                    var res1 = e.CommercialInvoiceDate.substring(0, 5);
    //                    if (res1 == "/Date") {
    //                        var parsedDate1 = new Date(parseInt(e.CommercialInvoiceDate.substr(6)));
    //                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
    //                        e.CommercialInvoiceDate = date1;

    //                    }
    //                }
    //                if (e.IsSubmitted == true && e.DocStatus != 'New Approval Pending') {
    //                    $scope.CommercialInvoiceListForTC.push(e);
    //                }
    //                $scope.OrginalCiListForTC = $scope.CommercialInvoiceListForTC;
    //            });
    //            GetUpdateCIForTC();
    //        }
    //    });
    //}
    $scope.UpdateTruckChallanDetails = function (aTruckChallan) {
        $scope.TruckChallanSingle = [];
        $scope.Result = [];

        $scope.CommercialInvoiceListForTC = [];
        $scope.CommercialInvoiceListForTC = $scope.TruckChallanListPaged;
        $scope.TruckChallanSingle.push(aTruckChallan);
        $scope.Result = $scope.TruckChallanList.filter(o1 => $scope.TruckChallanSingle.some(o2 => o1.CommercialInvoiceId == o2.CommercialInvoiceId));

        angular.forEach($scope.Result, function (data) {

            if (data.Sort == 1) {
                $scope.TCId1 = data.TruckChallanId;
                $scope.ddlConsCommercialInvoiceForTC = { CommercialInvoiceId: aTruckChallan.CommercialInvoiceId };
                $scope.exp_TruckChallan.TruckNo = data.TruckNo;
                $scope.exp_TruckChallan.TCFooter1 = data.Footers;
            }
            if (data.Sort == 2) {
                $scope.TCId2 = data.TruckChallanId;
                $scope.exp_TruckChallan.TCFooter2 = data.Footers;
            }
            if (data.Sort == 3) {
                $scope.TCId3 = data.TruckChallanId;
                $scope.exp_TruckChallan.TCFooter3 = data.Footers;
            }
            if (data.Sort == 4) {
                $scope.TCId4 = data.TruckChallanId;
                $scope.exp_TruckChallan.TCFooter4 = data.Footers;
            }
            if (data.Sort == 5) {
                $scope.TCId5 = data.TruckChallanId;
                $scope.exp_TruckChallan.TCFooter5 = data.Footers;
            }
            
            
        });
        
        $scope.exp_TruckChallan.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
        $scope.disDDLForTC = true;
        window.scrollTo(0, 0);
    }
    function GetAllTruckChallan() {
        $http({
            url: '/ExpCommercialInvoice/GetAllTruckChallan',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.TruckChallanList = data;
            
            //GetUpdateCIForTC();
        });

    }
    //function GetUpdateCIForTC() {
    //    var CINumbers = [];
    //    var key = 'CommercialInvoiceId';
    //    if ($scope.TruckChallanList.length != 0 && $scope.CommercialInvoiceListForTC.length != 0) {
    //        $scope.TruckChallanUniqueList = [...new Map($scope.TruckChallanList.map(item =>
    //            [item[key], item])).values()];

    //        var listToDelete = [];
    //        for (var i = 0; i < $scope.TruckChallanUniqueList.length; i++) {
    //            listToDelete.push($scope.TruckChallanUniqueList[i].CommercialInvoiceId);
    //        }

    //        $scope.CommercialInvoiceListForTC = $scope.CommercialInvoiceListForTC.filter(el => (listToDelete.indexOf(el.CommercialInvoiceId) == -1));
    //    }
    //    else {
    //        return;
    //    }

        
    //}
    //Truck challan save 
    $scope.SaveTruckChallan = function () {
        $scope.TCFooter = {};
        $scope.TCInfo = [];

        $scope.UpdatedDate = new Date().toISOString().slice(0, 10)

        if ($scope.TCId1) {
            if ($scope.exp_TruckChallan.TCFooter1) {
                $scope.TCFooter.TruckChallanId = $scope.TCId1;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter1;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            } else {
                $scope.TCFooter.TruckChallanId = $scope.TCId1;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
            if ($scope.exp_TruckChallan.TCFooter2) {
                $scope.TCFooter.TruckChallanId = $scope.TCId2;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter2;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            } else {
                $scope.TCFooter.TruckChallanId = $scope.TCId2;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
            if ($scope.exp_TruckChallan.TCFooter3) {
                $scope.TCFooter.TruckChallanId = $scope.TCId3;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter3;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            } else {
                $scope.TCFooter.TruckChallanId = $scope.TCId3;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
            if ($scope.exp_TruckChallan.TCFooter4) {
                $scope.TCFooter.TruckChallanId = $scope.TCId4;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter4;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            } else {
                $scope.TCFooter.TruckChallanId = $scope.TCId4;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
            if ($scope.exp_TruckChallan.TCFooter5) {
                $scope.TCFooter.TruckChallanId = $scope.TCId5;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter5;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            } else {
                $scope.TCFooter.TruckChallanId = $scope.TCId5;
                $scope.TCFooter.CommercialInvoiceId = $scope.exp_TruckChallan.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
        }
        else {
            if ($scope.exp_TruckChallan.TCFooter1) {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter1;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
            else {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
            if ($scope.exp_TruckChallan.TCFooter2) {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter2;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            } else {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
            if ($scope.exp_TruckChallan.TCFooter3) {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter3;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            } else {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
            if ($scope.exp_TruckChallan.TCFooter4) {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter4;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            } else {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
            if ($scope.exp_TruckChallan.TCFooter5) {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = $scope.exp_TruckChallan.TCFooter5;
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }else {
                $scope.TCFooter.TruckChallanId = 0;
                $scope.TCFooter.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForTC.CommercialInvoiceId;
                $scope.TCFooter.TruckNo = $scope.exp_TruckChallan.TruckNo;
                $scope.TCFooter.UpdatedBy = $scope.LoginUser.UserId;
                $scope.TCFooter.UpdatedDate = $scope.UpdatedDate;
                $scope.TCFooter.Footers = "";
                $scope.TCFooter.Sort = ++$scope.TCFooterSorting;
                $scope.TCInfo.push($scope.TCFooter);
                $scope.TCFooter = {};
            }
        }

        
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $window.scrollTo(0, 0);
                var params = JSON.stringify({ exp_TruckChallan: $scope.TCInfo });

                $http.post('/ExpCommercialInvoice/SaveTruckChallan', params).success(function (data) {
                    if (data > 0) {
                        alertify.log('Saved successfully!', 'success', '5000');
                        clearForTC();
                        $scope.exp_TruckChallan.TruckNo = "";
                        $scope.exp_TruckChallan.TCFooter1 = "";
                        $scope.exp_TruckChallan.TCFooter2 = "";
                        $scope.exp_TruckChallan.TCFooter3 = "";
                        $scope.exp_TruckChallan.TCFooter4 = "";
                        $scope.exp_TruckChallan.TCFooter5 = "";
                        $scope.consumptionCertificateForm.$setPristine();
                        $scope.consumptionCertificateForm.$setUntouched();
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                    clearForTC();
                    $scope.exp_TruckChallan.TruckNo = "";
                    $scope.exp_TruckChallan.TCFooter1 = "";
                    $scope.exp_TruckChallan.TCFooter2 = "";
                    $scope.exp_TruckChallan.TCFooter3 = "";
                    $scope.exp_TruckChallan.TCFooter4 = "";
                    $scope.exp_TruckChallan.TCFooter5 = "";
                    $scope.consumptionCertificateForm.$setPristine();
                    $scope.consumptionCertificateForm.$setUntouched();
                    return;
                });
            }
        })
        window.scrollTo(0, 0);
    }
    $scope.resetTruckChallanForm = function () {
        document.getElementById("btnResetForTC").disabled = true;
        setTimeout(function () {
            document.getElementById("btnResetForTC").disabled = false;
        }, 1500);
        $scope.exp_TruckChallan.TruckNo = "";
        $scope.exp_TruckChallan.TCFooter1 = "";
        $scope.exp_TruckChallan.TCFooter2 = "";
        $scope.exp_TruckChallan.TCFooter3 = "";
        $scope.exp_TruckChallan.TCFooter4 = "";
        $scope.exp_TruckChallan.TCFooter5 = "";
        clearForTC();
        $scope.consumptionCertificateForm.$setPristine();
        $scope.consumptionCertificateForm.$setUntouched();
    }
    $scope.TrackChalanBtn = function (CommercialInvoiceId) {
        $window.open("#/TruckChallanReport", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdTC", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    }; 

    $scope.reloadBtnTC = function () {
        $('#txtFromDateForTC').val('');
        $('#txtToDateForTC').val('');
        $('#textInvoiceNoAndCompany').val('');
        $scope.FromDateTC = "";
        $scope.ToDateTC = "";
        $scope.SearchInvoiceAndCompanyNameTC = null;
        GetTruckChallanPaged(1);
    }

    $scope.TruckChallanSearch = function () {
        GetTruckChallanPaged(1);

    }

    function GetTruckChallanPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPageTC * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForTC").val();
        $scope.FromDateTC = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForTC").val();
        $scope.ToDateTC = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "1=1";

        if ($scope.SearchInvoiceAndCompanyNameTC != undefined && $scope.SearchInvoiceAndCompanyNameTC != "" && $scope.FromDateTC != "" && $scope.ToDateTC != "") {
            SearchCriteria = "([CommercialInvoiceDate] between '" + $scope.FromDateTC + "' and '" + $scope.ToDateTC + "') and ([CommercialInvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyNameTC + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyNameTC + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchInvoiceAndCompanyNameTC !== undefined && $scope.SearchInvoiceAndCompanyNameTC != null && $scope.SearchInvoiceAndCompanyNameTC != "") {
            SearchCriteria = "([CommercialInvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyNameTC + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyNameTC + "%')";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDateTC != "" && $scope.ToDateTC != "") {
            SearchCriteria = "([CommercialInvoiceDate] between '" + $scope.FromDateTC + "' and '" + $scope.ToDateTC + "')";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/ExpCommercialInvoice/TruckChallanGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPageTC + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.CommercialInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.CommercialInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.CommercialInvoiceDate = date1;
                    }

                })

            }
            else {
                alertify.log('Truck Challan  Not Found', 'error', '5000');
            }
            $scope.TruckChallanListPaged = data.ListData;
            $scope.total_countTC = data.TotalRecord;
            

        });
    }

    $scope.getDataTC = function (curPage) {

        if ($scope.PerPageTC > 100) {
            $scope.PerPageTC = 100;
            $scope.currentPageTC = curPage;
            GetTruckChallanPaged($scope.currentPageTC);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPageTC < 1) {
            $scope.PerPageTC = 1;
            $scope.currentPageTC = curPage;
            GetTruckChallanPaged($scope.currentPageTC);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPageTC = curPage;
            GetTruckChallanPaged($scope.currentPageTC);
        }


    }

    $("#txtFromDateForTC").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForTC = function () {
        $("#txtFromDateForTC").focus();
        $("#txtFromDateForTC").trigger("click");
    }


    $("#txtToDateForTC").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChangeForTC = function () {
        $("#txtToDateForTC").focus();
        $("#txtToDateForTC").trigger("click");
    }

        // BankDocument part
    function clearForBD() {
        //Bank
        $scope.IsEdit = false;
        $scope.ddlCommercialInvoiceForBankDoc = null;
        $scope.CommercialInvoiceForBankDocList = [];
        $scope.BankDocumentlist = [];

        $scope.BankDocumentDetaillist = [];
        $scope.BankdocNamelist = [];
        $scope.CommercialInvoiceForBankDocListOrginal = [];
        $scope.BankDocument = {};
        $scope.BankDocument.BankApplicationTo = 'Manager';
        $scope.BankDocument.BankDocumentToDepartment = 'Trade & Finance Department';
        $scope.disDDLForBD = false;
        $scope.hideAddBtn = false;
        GetBankdoc();
        GetAllCommercialInvoiceForBankDoc();
        ClearBankDocumentDetail();

        $("#txtApplicationDate").datepicker({
            dateFormat: "M d, yy",
            changeMonth: true,
            changeYear: true
        });

        $scope.CalendarApplication = function () {
            $("#txtApplicationDate").focus();
            $("#txtApplicationDate").trigger("click");
        }

        $scope.currentPageBD = 1;
        $scope.PerPageBD = 10;
        $scope.total_countBD = 0;
        GetBankDocumentPaged($scope.currentPageBD);
    }
    function GetAllCommercialInvoiceForBankDoc() {
        $http({
            url: '/ExpCommercialInvoice/GetExpCommercialInvoiceDynamic?searchCriteria=CI.CommercialInvoiceId NOT IN(SELECT CommercialInvoiceId FROM exp_BankDocument)&orderBy=CI.CommercialInvoiceId DESC',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CommercialInvoiceForBankDocList = data;
            angular.forEach($scope.CommercialInvoiceForBankDocList, function (aData) {
                aData.CompanyNameWithCINo = aData.CommercialInvoiceNo + "  ~  " + aData.CompanyName;
            });
            
        });
    }
    //function GetAllCommercialInvoiceForBankDoc() {
    //    $http({
    //        url: '/ExpCommercialInvoice/GetAllCommercialInvoice',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        if (data) {
    //            angular.forEach(data, function (e) {
    //                var isDate = isNaN(e.CommercialInvoiceDate);
    //                if (isDate) {
    //                    var res1 = e.CommercialInvoiceDate.substring(0, 5);
    //                    if (res1 == "/Date") {
    //                        var parsedDate1 = new Date(parseInt(e.CommercialInvoiceDate.substr(6)));
    //                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
    //                        e.CommercialInvoiceDate = date1;

    //                    }
    //                }
    //                if (e.IsSubmitted == true && e.DocStatus != 'New Approval Pending') {
    //                    $scope.CommercialInvoiceForBankDocList.push(e);
    //                }
    //                $scope.CommercialInvoiceForBankDocListOrginal = $scope.CommercialInvoiceForBankDocList;
    //            });
    //            GetUpdateCIForBD();
    //        }

    //    });
    //}
    $scope.GetBankDocumentlistByBankAccountId = function () {
        if ($scope.ddlCommercialInvoiceForBankDoc.ImporterBankId != null) {
            $http({
                url: '/BankDocumentEntry/GetBankDocumentlistByBankAccountId?BankAccountId=' + $scope.ddlCommercialInvoiceForBankDoc.ImporterBankId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.BankDocumentlist = data;

            });
        } else {
            $scope.BankDocumentlist = [
                { NameOfDocument: 'TT Copy', OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'Sales Contract', OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'Delivery Challan', OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'Commercial Invoice', OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'PACKING LIST', OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'BILL OF EXCHANGE 1', OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'BILL OF EXCHANGE 2', OriginSet: '01', Sets: '01' },
                { NameOfDocument: "BENEFICIARY'S CERTIFICATE", OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'CERTIFICATE OF ORIGIN', OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'EXP Copy', OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'BILL OF ENTRY', OriginSet: '01', Sets: '01' },
                { NameOfDocument: 'EXPORT PERMIT', OriginSet: '01', Sets: '01' }
            ];
        }
        
    }

    function GetBankdoc() {
        $http({
            url: '/BankDocument/GetAllBankDocument',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankDocumentDetaillist = data;
            
            //GetUpdateCIForBD();
        });
    }

    //function GetUpdateCIForBD() {
    //    if ($scope.BankDocumentDetaillist.length != 0 && $scope.CommercialInvoiceForBankDocList.length != 0) {
    //        var listToDelete = [];
    //        for (var i = 0; i < $scope.BankDocumentDetaillist.length; i++) {
    //            listToDelete.push($scope.BankDocumentDetaillist[i].CommercialInvoiceId);
    //        }

    //        $scope.CommercialInvoiceForBankDocList = $scope.CommercialInvoiceForBankDocList.filter(el => (listToDelete.indexOf(el.CommercialInvoiceId) == -1));

    //    } else {
    //        return;
    //    }

        
    //}

    function GetBankdocName(BankDocumentId) {
        $window.scrollTo(0, 0);
        $http({
            url: '/BankDocument/GetAllBankDocumentDetail?BankDocumentId=' + BankDocumentId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankdocNamelist = [];
            var slNo = 1;
            angular.forEach(data, function (aData) {
                var documentName = {};
                documentName = aData;
                documentName.SlNo = slNo;
                $scope.BankdocNamelist.push(aData);
                slNo++;
            });

            $scope.BankdocNamelist = data;
            $scope.BankDocumentlist = $scope.BankdocNamelist;
        });
    }
    $scope.UpdateBankDocument = function (aBankDocumentDetail) {
        $scope.disDDLForBD = true;
        $scope.IsEdit = true;
        $scope.CommercialInvoiceForBankDocList = $scope.BankDocumentListPaged;
        GetBankdocName(aBankDocumentDetail.BankDocumentId);
        $scope.BankDocument = aBankDocumentDetail;
        $scope.ddlCommercialInvoiceForBankDoc = { CommercialInvoiceId: aBankDocumentDetail.CommercialInvoiceId };
        window.scrollTo(0, 0);
    }
    $scope.UpdateDocumentName = function (aDocumentName) {
        $("#txtNameOfDocumentHidden").val(aDocumentName.NameOfDocument);
        $("#txtOriginSetHidden").val(aDocumentName.OriginSet);
        $("#txtSetsHidden").val(aDocumentName.Sets);
        $scope.BankDocumentDetail = aDocumentName;
    } 
    $scope.removeDocumentName = function (aBankDocument) {
            if (aBankDocument.BankDocumentDetailId == undefined) {
                var ind = $scope.BankDocumentlist.indexOf(aBankDocument);
                $scope.BankDocumentlist.splice(ind, 1);
                //alertify.confirm().destroy();
                return;
            }
        alertify.confirm("Are you sure to delete?", function (e) {
            if (e) {
                var ind = $scope.BankDocumentlist.indexOf(aBankDocument);
                $scope.BankDocumentlist.splice(ind, 1);
                $http.post('/BankDocument/DeleteBankDocumentName?BankDocumentDetailId=' + aBankDocument.BankDocumentDetailId).success(function (data) {
                    if (data > 0) {
                        alertify.log('Deleted Successfully!', 'success', '5000');
                    } else {
                        alertify.log('Delete Failed!', 'error', '5000');
                    }
                }).error(function (data) {
                    alertify.log('Server Errors!', 'error', '5000');
                });
            }
        });
    };
    //Bank doc  and detail save
    $scope.SaveBankDocuments = function () {

        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $window.scrollTo(0, 0);
                $scope.BankDocument.UpdatedBy = $scope.LoginUser.UpdatorId;
                var params = JSON.stringify({ exp_BankDocument: $scope.BankDocument, exp_BankDocumentDetail: $scope.BankDocumentlist });

                $http.post('/BankDocument/Save', params).success(function (data) {
                    if (data > 0) {
                        alertify.log(' saved successfully!', 'success', '5000');
                        clearForBD();
                        //$scope.BankDocument.BankApplicationTo = "";
                        //$scope.BankDocument.BankDocumentToDepartment = "";
                        //$scope.BankDocument.AppDate = "";
                        clearForBD();
                        $scope.consumptionCertificateForm.$setPristine();
                        $scope.consumptionCertificateForm.$setUntouched();
                    }
                }).error(function (msg) {;
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
                window.scrollTo(0, 0);
            }
        })
    }
    $scope.AddBankDocumentDetail = function () {

        if (!$scope.BankDocumentlist.length) {
            $scope.BankDocumentDetail.SlNo = 1;
        } else {
            $scope.BankDocumentDetail.SlNo = Enumerable.From($scope.BankDocumentlist).Max('$.SlNo') + 1;
        }

        if ($scope.SN == undefined || $scope.SN == null) {
            $scope.BankDocumentlist.push($scope.BankDocumentDetail);
        } else {
            $scope.BankDocumentlist.splice($scope.SN - 1, 0, $scope.BankDocumentDetail);
            $scope.SN = null;
        }
        $scope.BankDocumentDetail = {};

        $scope.consumptionCertificateForm.$setPristine();
        $scope.consumptionCertificateForm.$setUntouched();
        ClearBankDocumentDetail();

    };
    function ClearBankDocumentDetail() {
        $scope.BankDocumentDetail = new Object();
    }
    $scope.ResetBankDetailForm = function () {
        document.getElementById("btnResetForBD").disabled = true;
        setTimeout(function () {
            document.getElementById("btnResetForBD").disabled = false;
        }, 1000);

        clearForBD();
        $scope.BankDocument.BankApplicationTo = "";
        $scope.BankDocument.BankDocumentToDepartment = "";
        $scope.BankDocument.AppDate = "";
        $scope.consumptionCertificateForm.$setPristine();
        $scope.consumptionCertificateForm.$setUntouched();
    }
    $scope.bankDocumentBtn = function (CommercialInvoiceId) {
        $window.open("#/BankReport", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdBD", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };

    $scope.reloadBtnBD = function () {
        $('#txtFromDateForBD').val('');
        $('#txtToDateForBD').val('');
        $('#textInvoiceNoAndCompany').val('');
        $scope.FromDateBD = "";
        $scope.ToDateBD = "";
        $scope.SearchInvoiceAndCompanyNameBD = null;
        GetBankDocumentPaged(1);
    }

    $scope.BankDocumentSearch = function () {
        GetBankDocumentPaged(1);

    }

    function GetBankDocumentPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPageBD * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForBD").val();
        $scope.FromDateBD = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForBD").val();
        $scope.ToDateBD = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "1=1";

        if ($scope.SearchInvoiceAndCompanyNameBD != undefined && $scope.SearchInvoiceAndCompanyNameBD != "" && $scope.FromDateBD != "" && $scope.ToDateBD != "") {
            SearchCriteria = "([CommercialInvoiceDate] between '" + $scope.FromDateBD + "' and '" + $scope.ToDateBD + "') and ([CommercialInvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyNameBD + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyNameBD + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchInvoiceAndCompanyNameBD !== undefined && $scope.SearchInvoiceAndCompanyNameBD != null && $scope.SearchInvoiceAndCompanyNameBD != "") {
            SearchCriteria = "([CommercialInvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyNameBD + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyNameBD + "%')";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDateBD != "" && $scope.ToDateBD != "") {
            SearchCriteria = "([CommercialInvoiceDate] between '" + $scope.FromDateBD + "' and '" + $scope.ToDateBD + "')";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/BankDocument/BankDocumentGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPageBD + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.CommercialInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.CommercialInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.CommercialInvoiceDate = date1;
                    }
                    var res1 = aSd.AppDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.AppDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.AppDate = date1;
                    }

                })

            }
            else {
                alertify.log('Bank Document  Not Found', 'error', '5000');
            }
            $scope.BankDocumentListPaged = data.ListData;
            $scope.total_countBD = data.TotalRecord;


        });
    }

    $scope.getDataBD = function (curPage) {

        if ($scope.PerPageBD > 100) {
            $scope.PerPageBD = 100;
            $scope.currentPageBD = curPage;
            GetBankDocumentPaged($scope.currentPageBD);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPageBD < 1) {
            $scope.PerPageBD = 1;
            $scope.currentPageBD = curPage;
            GetBankDocumentPaged($scope.currentPageBD);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPageBD = curPage;
            GetBankDocumentPaged($scope.currentPageBD);
        }


    }

    $("#txtFromDateForBD").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForBD = function () {
        $("#txtFromDateForBD").focus();
        $("#txtFromDateForBD").trigger("click");
    }


    $("#txtToDateForBD").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChangeForBD = function () {
        $("#txtToDateForBD").focus();
        $("#txtToDateForBD").trigger("click");
    }

    //Report Btn List
    function showCoPisReport(coOrpi) {

        $scope.CData = {};
        $scope.CData.CommercialInvoiceId = $scope.ddlConsCommercialInvoiceForReport.CommercialInvoiceId;
        $scope.CData.CertificateType = coOrpi;
        $window.open("#/CertificateReport", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CiData", JSON.stringify($scope.CData));
        $cookieStore.put("CiData", $scope.CData);
        event.stopPropagation();
    }
    $scope.CofOriginDdl = function () {
        showCoPisReport('co');
    };
    $scope.CertificateOfPreInspectionBtn = function () {
        showCoPisReport('pi')
    };
    $scope.BinificaryCertificateBtn = function (CommercialInvoiceId) {
        $window.open("#/BeneficiaryCertificateReport", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdBC", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };
    //$scope.ConsuptionCertificateBtn = function (CommercialInvoiceId) {
    //    $window.open("#/ConsumptionCertificateReport", "popup", "width=850,height=550,left=280,top=80");
    //    sessionStorage.setItem("CommercialInvoiceId", JSON.stringify(CommercialInvoiceId));
    //    event.stopPropagation();

    //};
    $scope.BillOfExchangeCertificateBtn = function (CommercialInvoiceId) {
        $window.open("#/BillOfExchangeReport", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdBE1", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };
    $scope.BillOfExchange2CertificateBtn = function (CommercialInvoiceId) {
        $window.open("#/BillOfExchangeReport2", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdBE2", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };
    $scope.DeliveryChalanTwoBtn = function (CommercialInvoiceId) {
        $window.open("#/DeliveryChallanReport", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdDCR", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };
    $scope.PackingListBtn = function (CommercialInvoiceId) {
        $window.open("#/PackingReport", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdPL", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };
    $scope.PackingDocumentReportBtn = function (CommercialInvoiceId) {
        $window.open("#/PackingDocumentReport", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdPD", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };

    $scope.OpenReportsForConsumptionCertificate = function (CommercialInvoiceId) {
        $window.open("#/ConsumptionCertificateReport", "popup", "width=850,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceIdCC", JSON.stringify(CommercialInvoiceId));
        $cookieStore.put("CommercialInvoiceId", CommercialInvoiceId);
        event.stopPropagation();

    };


    ///============Abir Start =======================>>>>>
    //==========Abir====>>
    function ClearForCC() {
        $scope.button = "Save";
        //document.getElementById("ddlCommercialInvoiceCC").disabled = false;
        $scope.disDDLForCC = false;
        $scope.consuptionCertificateForTable = [];
        $scope.consuptionCertificateForTableOrginal = [];
        $scope.consuptionCertificateForddl = [];
        $scope.ConsumptionCertificateList = [];
        $scope.ddlConsumptionCertificate = null;
        $scope.ddlChalanComInvoice = null;
        $scope.ddlOthersCommercialInvoice = null;
        $scope.ExportGoodslist = [];
        $scope.RawMateriallist = [];
        $scope.RawMaterial = {};
        $scope.RawMaterial.ImportBondNo = " (Raw Materials)";
        $scope.ConsumptionCertificate = {};
        //GetAllConsumptionCertificate();
        GetConsumptionCertificateForDrop();

        $scope.currentPageCC = 1;
        $scope.PerPageCC = 10;
        $scope.total_countCC = 0;
        GetConsumptionCertificatePaged($scope.currentPageCC);

        $("#txtStatementDate").datepicker({
            dateFormat: "M d, yy",
            changeMonth: true,
            changeYear: true
        });
        $scope.CalendartxtDueDate = function () {
            $("#txtStatementDate").focus();
            $("#txtStatementDate").trigger("click");
        }

        $('#txtBillOfEntryDate').datepicker({
            dateFormat: "M d, yy",
            changeMonth: true,
            changeYear: true
        });
        $scope.CalendarOpenBillOfEntryDate = function () {
            $("#txtBillOfEntryDate").focus();
            $("#txtBillOfEntryDate").trigger("click");
        }

        $('#txtEpzPermissionDate').datepicker({
            dateFormat: "M d, yy",
            changeMonth: true,
            changeYear: true

        });

        $scope.CalendarOpenDEPZDate = function () {
            $("#txtEpzPermissionDate").focus();
            $("#txtEpzPermissionDate").trigger("click");
        }

    }
   //==========Abir====>>

    $scope.GetDescriptionOfGoods = function (CiId) {
        $http({
            url: '/CertificateOfOrigin/GetDescriptionOfGoods?ciId=' + CiId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ExportGoodslist = data;
        });
    }
    $scope.GetDescriptionOfGoodsUpdate = function (ConsumptionCertificateId) {
        $window.scrollTo(0, 0);

        $http({
            url: '/CertificateOfOrigin/GetDescriptionOfGoodsUpdate?ConsumptionCertificateId=' + ConsumptionCertificateId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ExportGoodslist = data;
        });
    }

    $scope.ConsumptionCertificateBtn = function (CiId) {
        $http({
            url: '/CertificateOfOrigin/ConsuptionCertificate?CommercialInvoiceId=' + CiId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (adata) {
                    var res1 = adata.StatementDate.substring(0, 5);
                    var res2 = adata.EpzPermissionDate.substring(0, 5);
                    var res3 = adata.BillOfEntryDate.substring(0, 5);
                    if (res1 == "/Date" || res2 == "/Date" || res3 == "/Date") {
                        var parseDate1 = new Date(parseInt(adata.StatementDate.substr(6)));
                        var parseDate2 = new Date(parseInt(adata.EpzPermissionDate.substr(6)));
                        var parseDate3 = new Date(parseInt(adata.BillOfEntryDate.substr(6)));
                        var date1 = ($filter('date')(parseDate1, 'dd/MM/yyyy')).toString();
                        var date2 = ($filter('date')(parseDate2, 'dd/MM/yyyy')).toString();
                        var date3 = ($filter('date')(parseDate3, 'dd/MM/yyyy')).toString();
                        adata.StatementDate = date1;
                        adata.EpzPermissionDate = date2;
                        adata.BillOfEntryDate = date3;
                    }
                });
            }
            var Certificate = Enumerable.From(data).FirstOrDefault();
            $scope.ConsumptionCertificate = Certificate;

        });
    }
    $scope.GetRawMetrialUpdateBtn = function (CiId) {
        $window.scrollTo(0, 0);
        $http({
            url: '/CertificateOfOrigin/ConsuptionCertificateRawMatrial?CommercialInvoiceId=' + CiId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.RawMateriallist = data;
        });
    }

    $scope.RawMatrialSRemove = function (rawMatrialId) {

        for (var i = 0; i < $scope.RawMateriallist.length; i++) {
            if ($scope.RawMateriallist[i].ConsumptionCertificateRawMaterialsId == undefined) {
                var ind = $scope.RawMateriallist.indexOf(rawMatrialId);
                $scope.RawMateriallist.splice(ind, 1);
                alertify.confirm().destroy();
                return;
            }
        }
        alertify.confirm("This Data Will Be Remove?", function (e) {
            if (e) {
                var ind = $scope.RawMateriallist.indexOf(rawMatrialId);
                $scope.RawMateriallist.splice(ind, 1);
                $http({
                    url: "/CertificateOfOrigin/ConsumptionCertificateRawMatrialDelete?ConsumptionCertificateRawMatrialId=" + rawMatrialId,
                    method: "GET",
                }).success(function (data) {
                    if (data > 0) {
                        alertify.log('Deleted Successfully!', 'success');
                    } else {
                        alertify.log('Delete Failed!', 'error', '5000');
                    }
                });

            }

        });

    }

    $scope.SaveConsumptionCertificate = function () {

        var type;
        var errorMsg = [];

        if ($scope.RawMateriallist.length < 1) {
            alertify.log('At least one Raw Material list is required with default!', 'error', '5000');
            return;
        }

        $scope.ddlConsumptionCertificate.CommercialInvoiceId;

        //if ($scope.ConsumptionCertificate.StatementDate != null) {
        //    var txtPoDate = $("#txtStatementDate").val()
        //    $scope.ConsumptionCertificate.StatementDate = txtPoDate.split("/").reverse().join("-");
        //}

        //if ($scope.ConsumptionCertificate.BillOfEntryDate != null) {
        //    var txtPoDate = $("#txtBillOfEntryDate").val()
        //    $scope.ConsumptionCertificate.BillOfEntryDate = txtPoDate.split("/").reverse().join("-");
        //}
        //if ($scope.ConsumptionCertificate.EpzPermissionDate != null) {
        //    var txtPoDate = $("#txtEpzPermissionDate").val()
        //    $scope.ConsumptionCertificate.EpzPermissionDate = txtPoDate.split("/").reverse().join("-");
        //}

        if (!errorMsg.length) {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {

                    var params = JSON.stringify({ exp_ConsumptionCertificate: $scope.ConsumptionCertificate, _exp_ConsumptionCertificateDescription: $scope.ExportGoodslist, exp_ConsumptionCertificateRawMaterials: $scope.RawMateriallist });
                    $http.post('/CertificateOfOrigin/SaveCc', params).success(function (aData) {
                        if (aData > 0) {
                            alertify.log(' saved successfully!', 'success', '5000');
                            ClearForCC();
                            $scope.consumptionCertificateForm.$setPristine();
                            $scope.consumptionCertificateForm.$setUntouched();
                        }

                    }).error(function (msg) {
                        alertify.log('Save failed, refresh page and try again', 'error', '5000');
                    });
                }
            });
        }

        else {
            alertify.log(errorMsg[0].msg, 'error', '5000');
            $scope.consumptionCertificateForm.$setPristine();
            $scope.consumptionCertificateForm.$setUntouched();
        }
    }


    function ClearRawMaterials() {
        $scope.RawMaterial = {};
        $scope.RawMaterial.ImportBondNo = " (Raw Materials)";
        $scope.rawMatrialBtn = "Add";
        $scope.rawMatrialRemoveBtn = "Remove";
    }

    $scope.UpdateConsumptionCertificateDetails = function (aConsumptionCertificate) {
        $scope.consuptionCertificateForddl = $scope.ConsumptionCertificateListPaged;
        $scope.ddlConsumptionCertificate = { CommercialInvoiceId: aConsumptionCertificate.CommercialInvoiceId };
        //$('#ddlCommercialInvoiceCC').select2('destroy');
        //$('#ddlCommercialInvoiceCC').val(aConsumptionCertificate.CommercialInvoiceId).select2();
        $scope.ConsumptionCertificate = aConsumptionCertificate;

        //document.getElementById("ddlCommercialInvoiceCC").disabled = true;
        $scope.disDDLForCC = true;

        var res = aConsumptionCertificate.StatementDate.substring(0, 5);
        if (res == "/Date") {
            var parsedDate = new Date(parseInt($scope.ConsumptionCertificate.StatementDate.substr(6)));
            $scope.ConsumptionCertificate.StatementDate = $filter('date')(parsedDate, 'MMM dd, yyyy');

        }
        if (aConsumptionCertificate.BillOfEntryDate != null) {
            var res1 = aConsumptionCertificate.BillOfEntryDate.substring(0, 5);
            if (res1 == "/Date") {
                var parsedDate = new Date(parseInt($scope.ConsumptionCertificate.BillOfEntryDate.substr(6)));
                $scope.ConsumptionCertificate.BillOfEntryDate = $filter('date')(parsedDate, 'MMM dd, yyyy');
            }
        }
        if (aConsumptionCertificate.EpzPermissionDate != null) {
            var res2 = aConsumptionCertificate.EpzPermissionDate.substring(0, 5);
            if (res2 == "/Date") {
                var parsedDate = new Date(parseInt($scope.ConsumptionCertificate.EpzPermissionDate.substr(6)));
                $scope.ConsumptionCertificate.EpzPermissionDate = $filter('date')(parsedDate, 'MMM dd, yyyy');
            }
        }
        


    }

    $scope.AddRawMaterials = function () {

        if (!$scope.RawMateriallist.length) {
            $scope.RawMaterial.SlNo = 1;
        } else {
            $scope.RawMaterial.SlNo = Enumerable.From($scope.RawMateriallist).Max('$.SlNo') + 1;
        }
        $scope.RawMateriallist.push($scope.RawMaterial);
        $scope.consumptionCertificateForm.$setPristine();
        $scope.consumptionCertificateForm.$setUntouched();
        ClearRawMaterials();


    };
    function GetConsumptionCertificateForDrop() {
        $http({
            url: '/ExpCommercialInvoice/GetExpCommercialInvoiceDynamic?searchCriteria=CI.CommercialInvoiceId NOT IN(SELECT CommercialInvoiceId FROM exp_ConsumptionCertificate)&orderBy=CI.CommercialInvoiceId DESC',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.consuptionCertificateForddl = data;
            angular.forEach($scope.consuptionCertificateForddl, function (aData) {
                aData.CompanyNameWithCINo = aData.CommercialInvoiceNo + "  ~  " + aData.CompanyName;
            })

            /*data.CompanyNameWithCommercialInvoiceNum = data.CommercialInvoiceNo + "  ~  " + data.CompanyName*/
            
        });
    }


    $scope.ResetCommercialOrders = function () {
        ClearForCC();
        document.getElementById("ResetCommercialOrdersBtn").disabled = true;
        setTimeout(function () {

            document.getElementById("ResetCommercialOrdersBtn").disabled = false;
        }, 1500);
        $scope.consumptionCertificateForm.$setPristine();
        $scope.consumptionCertificateForm.$setUntouched();
    }

    $scope.raMatrialSubstraction = function () {
        var ClosingBalance = $scope.RawMaterial.PreviousBalance - $scope.RawMaterial.ExportQty;
        $scope.RawMaterial.ClosingBalance = parseFloat(ClosingBalance).toFixed(2);
    }

    $scope.reloadBtnCC = function () {
        $('#txtFromDateForCC').val('');
        $('#txtToDateForCC').val('');
        $('#textInvoiceNoAndCompany').val('');
        $scope.FromDateCC = "";
        $scope.ToDateCC = "";
        $scope.SearchInvoiceAndCompanyNameCC = null;
        GetConsumptionCertificatePaged(1);
    }

    $scope.ConsumptionCertificateSearch = function () {
        GetConsumptionCertificatePaged(1);

    }

    function GetConsumptionCertificatePaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPageCC * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForCC").val();
        $scope.FromDateCC = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForCC").val();
        $scope.ToDateCC = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "1=1";

        if ($scope.SearchInvoiceAndCompanyNameCC != undefined && $scope.SearchInvoiceAndCompanyNameCC != "" && $scope.FromDateCC != "" && $scope.ToDateCC != "") {
            SearchCriteria = "([CommercialInvoiceDate] between '" + $scope.FromDateCC + "' and '" + $scope.ToDateCC + "') and ([CommercialInvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyNameCC + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyNameCC + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchInvoiceAndCompanyNameCC !== undefined && $scope.SearchInvoiceAndCompanyNameCC != null && $scope.SearchInvoiceAndCompanyNameCC != "") {
            SearchCriteria = "([CommercialInvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyNameCC + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyNameCC + "%')";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDateCC != "" && $scope.ToDateCC != "") {
            SearchCriteria = "([CommercialInvoiceDate] between '" + $scope.FromDateCC + "' and '" + $scope.ToDateCC + "')";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/CertificateOfOrigin/GetConsumptionCertificatePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPageCC + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.CommercialInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.CommercialInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.CommercialInvoiceDate = date1;
                    }
                    var res1 = aSd.StatementDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.StatementDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.StatementDate = date1;
                    }

                })

            }
            else {
                alertify.log('Consumption Certificate  Not Found', 'error', '5000');
            }
            $scope.ConsumptionCertificateListPaged = data.ListData;
            $scope.total_countCC = data.TotalRecord;

            
        });
    }

    $scope.getDataCC = function (curPage) {

        if ($scope.PerPageCC > 100) {
            $scope.PerPageCC = 100;
            $scope.currentPageCC = curPage;
            GetConsumptionCertificatePaged($scope.currentPageCC);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPageCC < 1) {
            $scope.PerPageCC = 1;
            $scope.currentPageCC = curPage;
            GetConsumptionCertificatePaged($scope.currentPageCC);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPageCC = curPage;
            GetConsumptionCertificatePaged($scope.currentPageCC);
        }


    }

    $("#txtFromDateForCC").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForCC = function () {
        $("#txtFromDateForCC").focus();
        $("#txtFromDateForCC").trigger("click");
    }


    $("#txtToDateForCC").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChangeForCC = function () {
        $("#txtToDateForCC").focus();
        $("#txtToDateForCC").trigger("click");
    }
    ///<<<=======Abir End======================>>>>


  
   



});