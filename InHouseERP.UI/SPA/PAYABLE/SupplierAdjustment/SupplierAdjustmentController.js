app.controller("SupplierAdjustmentController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {
    


    Clear();


    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Supplier Payment Adjustment').ScreenId;
        GetUsersPermissionDetails();

        $scope.ddlSupplier = null;
        $scope.isPaidPaymentAmount = true;
        $scope.supplierlist = [];
        $scope.supplierlistSearch = [];
        $scope.isCheckArrayList = [];
        $scope.isCheckIndexList = [];
        $scope.TotalActualAmountList = [];
        $scope.supplierPaymentList = [];
        $scope.proc_SupplierPaymentAdjustment = {};
        $scope.proc_SupplierPaymentAdjustment.SPAId = 0;
        //$scope.proc_SupplierPaymentAdjustment.SPAId == 0
        $scope.proc_SupplierPaymentAdjustmentDetail = [];
        GetSupplier();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetSupplierPaymentAdjustmentPaged($scope.currentPage);
  
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
      //  GetUsersPermissionDetails();

        $scope.proc_SupplierPaymentAdjustment.SPADate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        CompanyAdvcancedNo();
        $scope.proc_SupplierPaymentAdjustment.SPAId = 0;
    }
    ///Adjustment date=====>>>

    $("#txtFromDate1").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForSPADate = function () {
        $("#txtFromDate1").focus();
        $("#txtFromDate1").trigger("click");
    }


    function GetConfirmationMessageForAdmin() {
        $http({
            url: '/Role/GetConfirmationMessageForAdmin',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ConfirmationMessageForAdmin = (data === 'true');
        });
    }


    function CompanyAdvcancedNo() {

        $http({
            url: '/SupplierPaymentAndAdjustment/GetMaxSupplierPaymentAdjustment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.GetMaxAdvanceNo = data;
            var criteria = "IsActive=1";
            $http({
                url: '/FiscalYear/GetDynamic?searchCriteria=' + criteria + "&orderBy=FiscalYearId",
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                angular.forEach(data, function (aData) {
                    if (aData.BranchId == 1) {
                        $scope.finYearHeadOffice = aData.FiscalYearName;
                    } else if (aData.BranchId == 3) {
                        $scope.finYearEPZ = aData.FiscalYearName;
                    }
                })
                $scope.proc_SupplierPaymentAdjustment.SPANo = 'SPA/' + $scope.finYearEPZ + '/' + $scope.GetMaxAdvanceNo;

            });


        });

    }

    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.RemovePermission = false;
        $scope.ListViewPermission = false;

        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {
                if (aPermissionDetails.FunctionName == 'Create') {
                    $scope.CreatePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Revise') {
                    $scope.RevisePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Remove') {
                    $scope.RemovePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }


    function GetSupplier() {
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierlist = data;

            $scope.supplierlistSearch = angular.copy(data);
            if (data.length == 1)
                $scope.ddlSupplier = { SupplierId: data[0].SupplierId, SupplierName: data[0].SupplierName };
            
        })
    }
    $scope.LocalPBAndImportPB = [
        { Id: 0, Name: "Import Purchase Bill" },
        { Id: 1, Name: "Local Purchase Bill" }

    ];

    //$scope.onLocalPBAndImportPB = function (id) {
    //    $scope.isLocalCheckId = id;
    //    if (id == 0) {
    //        $scope.isLocalId = false;
    //    } else {
    //        $scope.isLocalId = true;
    //    }

    //}
    $scope.onSuppilerInfoLoad = function (supId) {
        // alert(supId);
        $scope.supplierId = supId;
    }

    $scope.SelSupplierPaymentAdjustment = function (aSupplierPaymentAdjustment) {
        window.scrollTo(0, 0);
        $scope.proc_SupplierPaymentAdjustment = aSupplierPaymentAdjustment;

        $scope.ddlSupplier = { "SupplierId": aSupplierPaymentAdjustment.SupplierId, "SupplierName": aSupplierPaymentAdjustment.SupplierName };

        setTimeout(function () {

            $("#supplierId").select2().val(aSupplierPaymentAdjustment.SupplierId);

        }, 0);

        $http({
            url: '/SupplierPaymentAndAdjustment/SupplierAdjustmentDetailGetById?SPAId=' + aSupplierPaymentAdjustment.SPAId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.supplierPaymentList = data;

            if ($scope.supplierPaymentList.length > 0) {
                angular.forEach($scope.supplierPaymentList, function (aData) {
                    var res1 = aData.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aData.PBDate = date1;
                    }

                    aData.AfterAdjust = aData.ActualAmount - aData.AdjustedAmount;
                })

            }

            //

        });

    }


    $scope.onLoadImportAndLoacalBtn = function () {


        $http({
            url: '/SupplierPaymentAndAdjustment/SupplierAdjustmentGetById?supId=' + $scope.supplierId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.supplierPaymentList = data;

            angular.forEach(data,function (aD) {
             //   aD.AfterAdjust = aD.ActualAmount - aD.AdjustedAmount;
                aD.AdjustedAmountTemp = aD.AdjustedAmount;
                aD.AfterAdjustedAmountTemp = aD.ActualAmount - aD.AdjustedAmount;
               // aD.AdjustedAmount = aD.ActualAmount - aD.AdjustedAmount;
                aD.AdjustedAmount = aD.PayableAmount;
               // aD.AfterAdjust =

                aD.AfterAdjust = aD.PayableAmount - aD.AdjustedAmount;
            })

            if ($scope.supplierPaymentList.length > 0) {
                angular.forEach($scope.supplierPaymentList, function (aData) {
                    var res1 = aData.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aData.PBDate = date1;
                    }
                })

            }
            
        });
    }


    $scope.onCheckVal = function (row, select, indx) {
        row.isCheck = select;
        row.index = indx;
        if (row.isCheck == true) {
           // row.AdjustedAmount = 0;
           // row.AfterAdjust = row.AfterAdjustedAmountTemp - row.AdjustedAmount;

            $scope.proc_SupplierPaymentAdjustmentDetail.push(row);
           

        } else {

            var index2 = $scope.proc_SupplierPaymentAdjustmentDetail.indexOf(row);
            $scope.proc_SupplierPaymentAdjustmentDetail.splice(index2, 1);

        }



    }
    $scope.onCalAdjust = function (row) {
       // if (row.AfterAdjust == 0) {
        // row.AfterAdjust = row.AfterAdjustedAmountTemp - row.AdjustedAmount;
        //} else {
        //    row.AfterAdjust = row.AfterAdjust - row.AdjustedAmount;
        //}

        if (row.AfterAdjust == undefined) {
            row.AfterAdjust = 0;
        }
        if (row.AfterAdjustedAmountTemp >= row.AdjustedAmount ) {

            row.AfterAdjust = row.PayableAmount - row.AdjustedAmount;
        } else {
            alertify.log('Adjust Amount greater then After adjusted amount !', 'error', '5000');
            row.AdjustedAmount = 0;
            row.AfterAdjust = 0;
        }
       
    }


    function PostAdjustment() {
        $scope.proc_SupplierPaymentAdjustment.UpdatedBy = $scope.LoginUser.UserId;
        $scope.proc_SupplierPaymentAdjustment.SPADate = $scope.proc_SupplierPaymentAdjustment.SPADate.split('/').reverse().join('-');
        var parms = JSON.stringify({ proc_SupplierPaymentAdjustment: $scope.proc_SupplierPaymentAdjustment, proc_SupplierPaymentAdjustmentDetail: $scope.proc_SupplierPaymentAdjustmentDetail });

        $http.post('/SupplierPaymentAndAdjustment/Post', parms).success(function (data) {
            if (data > 0) {

                alertify.log('Adjustment ' + status + ' Successfully!', 'success', '5000');
                //$window.open("/ErpReports/RV_Pos_SalesOrderBySalesOrderId.aspx?SalesOrderId=" + data, "_blank", "width=790,height=630,left=340,top=25");

                Clear();
                $scope.Adjustment.$setPristine();
                $scope.Adjustment.$setUntouched();


            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }

    $scope.Save = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.proc_SupplierPaymentAdjustment.SPAId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostAdjustment();
                    }
                })
            }
            else if ($scope.proc_SupplierPaymentAdjustment.SPAId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.proc_SupplierPaymentAdjustment.SPAId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostAdjustment();
                    }
                })
            }
            else if ($scope.proc_SupplierPaymentAdjustment.SPAId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.proc_SupplierPaymentAdjustment.SPAId == 0 && $scope.CreatePermission) {
                PostAdjustment();
            }
            else if ($scope.proc_SupplierPaymentAdjustment.SPAId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.proc_SupplierPaymentAdjustment.SPAId > 0 && $scope.RevisePermission) {
                PostAdjustment();
            }
            else if ($scope.proc_SupplierPaymentAdjustment.SPAId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }

        
    }


    //$scope.UpdateAmount = function () {
    //    $scope.isPaidPaymentAmount = true;
    //    $scope.updatePaidlist = $scope.isCheckArrayList;
    //    //$scope.isCheckArrayList = [];
    //    $scope.supplierIsCheckPaymentCalculationList = [];
    //    $scope.paidAmmount = 0;

    //    $scope.paid = 0;
    //    $scope.vatAmount = 0;
    //    $scope.paid = $scope.inv_supplierPayment.PaidAmount;
    //    $scope.vatAmount = $scope.inv_supplierPayment.TotalVAT;
    //    angular.forEach($scope.updatePaidlist, function (aData) {

    //        if ($scope.paid != 0 || $scope.vatAmount != 0) {
    //            if (aData.VatAmount <= $scope.vatAmount) {
    //                aData.TotalVAT = aData.VatAmount;
    //                $scope.vatAmount = $scope.vatAmount - aData.VatAmount;
    //            } else {
    //                aData.TotalVAT = $scope.vatAmount;
    //                $scope.vatAmount = 0;
    //            }

    //            if (aData.ActualAmount <= $scope.paid) {
    //                aData.PaidAmount = aData.ActualAmount;
    //                $scope.paid = $scope.paid - aData.ActualAmount;
    //                $scope.supplierIsCheckPaymentCalculationList.push(aData);
    //            }
    //            else {
    //                aData.PaidAmount = $scope.paid;
    //                $scope.paid = 0;
    //                $scope.supplierIsCheckPaymentCalculationList.push(aData);
    //            }
    //        }
    //        else {
    //            $scope.paid = 0;
    //            aData.PaidAmount = $scope.paid;
    //            $scope.vatAmount = 0;
    //            aData.TotalVAT = $scope.vatAmount;
    //            $scope.supplierIsCheckPaymentCalculationList.push(aData);
    //        }

    //    });

    //}


    $scope.Reset = function () {
        Clear();
        $scope.stockReceive.ddlStore.$setPristine();
        $scope.stockReceive.ddlStore.$setUntouched();

    }




    $scope.reloadBtn = function () {
        $('#txtFromDateForSPA').val('');
        $('#txtToDateForSPA').val('');
        $('#textSearchSupplierName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchSupplierName = null;
        GetSupplierPaymentAdjustmentPaged(1);
    }
    $scope.OpenPopupWindow = function (SPAObj) {
        $window.open("#/SupplierAdjustmentReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SPAId", JSON.stringify(SPAId));
        $cookieStore.put('SPAObj', SPAObj);
        event.stopPropagation();
    };
    $scope.SupplierPaymentAdjustmentSearch = function () {
        GetSupplierPaymentAdjustmentPaged(1);

    }

    function GetSupplierPaymentAdjustmentPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSPA").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForSPA").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchSupplierName != undefined && $scope.SearchSupplierName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([SPADate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%' or [PBNo] LIKE '%" + $scope.SearchSupplierName + "%' or [SPANo] LIKE '%" + $scope.SearchSupplierName + "%' )";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchSupplierName !== undefined && $scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
            SearchCriteria = "[SupplierName] LIKE '%" + $scope.SearchSupplierName + "%' or [SPANo] LIKE '%" + $scope.SearchSupplierName + "%' or [PBNo] LIKE '%" + $scope.SearchSupplierName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[SPADate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/SupplierPaymentAndAdjustment/GetSupplierPaymentAdjustmentPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data != "") {
                if (data.ListData.length > 0) {
                    angular.forEach(data.ListData, function (aSd) {
                        var res1 = aSd.SPADate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.SPADate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.SPADate = date1;
                        }



                    })

                }
                else {
                    alertify.log('Supplier Payment Adjustment  Not Found', 'error', '5000');
                }
            }
            $scope.SupplierPaymentAdjustmentListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;

            
        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetSupplierPaymentAdjustmentPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSupplierPaymentAdjustmentPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSupplierPaymentAdjustmentPaged($scope.currentPage);
        }
        //  }


    }

    $("#txtFromDateForSPA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForSPA = function () {
        $("#txtFromDateForSPA").focus();
        $("#txtFromDateForSPA").trigger("click");
    }


    $("#txtToDateForSPA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForSPA = function () {
        $("#txtToDateForSPA").focus();
        $("#txtToDateForSPA").trigger("click");
    }

})