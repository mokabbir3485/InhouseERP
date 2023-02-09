app.controller("CompanyAdjustmentController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {


    Clear();


    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Company Adjustment').ScreenId;

        

        $scope.companyAllCheck = false;
        $scope.AdjustmentColumHide = true;
        $scope.previousAdjistmentHide = false;



        $scope.ddlCompany = null;
        $scope.isCompanyAdjustedAmount = false;
        $scope.supplierlist = [];
        $scope.supplierlistSearch = [];
        $scope.isCheckArrayList = [];
        $scope.isCheckIndexList = [];
        $scope.TotalActualAmountList = [];
        $scope.companyPaymentAdjustmentList = [];
        $scope.rcv_CompanyPaymentAdjustment = {};
        $scope.rcv_CompanyPaymentAdjustmentDetail = [];
        $scope.CompanyList = [];
       
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.CompanyPaymentAdjustmentListPaged = [];
        GetCompanyPaymentAdjustmentPaged($scope.currentPage);

        GetAllCompany();

        $scope.rcv_CompanyPaymentAdjustment.CPADate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.selectedAll = false;
        $scope.LoaderEnable = true;
        $scope.saveBtn = "Save";
        $scope.CompanyAllCheckList = [];
        $scope.IsCheckDisabled = true;
        GetCompanyPaymentMaxNo();
    }


    /// Adjustment Date====>>>

    $("#txtCompanyAdjustmentDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarCAdjustmentDate = function () {
        $("#txtCompanyAdjustmentDate").focus();
        $("#txtCompanyAdjustmentDate").trigger("click");
    }



    function GetCompanyPaymentMaxNo() {

        $http({
            url: '/CompanyPaymentAdjustment/GetCompanyPaymentAdjustmentMaxNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxCompanyPaymentNo = data;
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
                $scope.rcv_CompanyPaymentAdjustment.CPANo = 'CPA/' + $scope.finYearHeadOffice + '/' + $scope.MaxCompanyPaymentNo;
            });

        });
    }

    function GetAllCompany() {

        $http({
           // url: '/Company/CompanyGetAll',
            url: '/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyList = data;
            console.log($scope.CompanyList);
            
            $scope.LoaderEnable = false;
        })
    }
   
   
   

    //$scope.CompanyPaymentCompanyAdjustment = function (aCompanyPaymentCompanyAdjustment) {
    //    $scope.isDropdownDisabled = true;
    //    $scope.companyPaymentAdjustmentList = [];
    //    $scope.AdjustmentColumHide = false;
    //    $scope.previousAdjistmentHide = true;
    //    $scope.saveBtn = "Update";
    //    window.scrollTo(0, 0);
    //    $scope.rcv_CompanyPaymentAdjustment = aCompanyPaymentCompanyAdjustment;

    //    $scope.ddlCompany = { "CompanyId": aCompanyPaymentCompanyAdjustment.CompanyId, "CompanyName": aCompanyPaymentCompanyAdjustment.CompanyName };

    //    setTimeout(function () {

    //        $("#companySelect2").select2().val(aCompanyPaymentCompanyAdjustment.CompanyId).trigger("change");

    //    }, 0);
       
    //    $http({
    //        url: '/CompanyPaymentAdjustment/CompanyPaymentAdjustmentGetByCPAId?CPAId=' + aCompanyPaymentCompanyAdjustment.CPAId,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
          

    //        if (data.length > 0) {
    //            angular.forEach(data, function (aData) {
    //                var res1 = aData.InvoiceDate.substring(0, 5);
    //                if (res1 == "/Date") {
    //                    var parsedDate1 = new Date(parseInt(aData.InvoiceDate.substr(6)));
    //                    var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
    //                    aData.InvoiceDate = date1;
    //                }
                   
    //                aData.AfterAdjust = aData.ReceivableAmount - aData.AdjustedAmount;
    //                aData.AfterAdjustedAmount = aData.AdjustedAmount;
    //                if (aData.AfterAdjustedAmount == 0) {
    //                    aData.selectedIsCheck = false;
    //                 //   $scope.companyAllCheck = false;
    //                    $scope.companyPaymentAdjustmentList.push(aData);
    //                } else {
    //                    //if (aData.AfterAdjustedAmount == 0) {
    //                    //    $scope.companyAllCheck = false;
    //                    //} else {
    //                    //    $scope.companyAllCheck = true;
    //                    //}
    //                    aData.selectedIsCheck = true;
    //                 $scope.companyPaymentAdjustmentList.push(aData);
    //             }
                  
    //            });

    //        }

    //        //

    //    });

    //}


    $scope.onLoadImportAndLoacalBtn = function () {
        $scope.selectedAll = false;
      
        if ($scope.rcv_CompanyPaymentAdjustment.CPAId == 0 || $scope.rcv_CompanyPaymentAdjustment.CPAId == undefined) {

            $http({
                url: '/CompanyPaymentAdjustment/GetByCompanyPaymentAdjustmentType?CompanyId=' + $scope.ddlCompany.CompanyId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.IsCheckDisabled = false;
               
                $scope.companyPaymentAdjustmentList = data;

                angular.forEach(data, function (aD) {
                    //   aD.AfterAdjust = aD.ActualAmount - aD.AdjustedAmount;
                    aD.AdjustedAmountTemp = aD.AdjustedAmount;
                    //aD.AfterAdjustedAmount = aD.ActualAmount - aD.AdjustedAmount;
                    aD.AfterAdjustedAmount = aD.ReceivableAmount;
                    aD.TempAfterAdjustedAmount = aD.ActualAmount - aD.AdjustedAmount;
                    aD.AfterAdjust = aD.ReceivableAmount - aD.AfterAdjustedAmount;
                })

                if ($scope.companyPaymentAdjustmentList.length > 0) {
                    angular.forEach($scope.companyPaymentAdjustmentList, function (aData) {
                        var res1 = aData.InvoiceDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aData.InvoiceDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                            aData.InvoiceDate = date1;
                        }
                    })

                }

            });
        }

      
    }


   // $scope.CheckBoxFlag = true;

    $scope.onCheckVal = function (row,select, indx) {

        row.isCheck = row.selectedIsCheck;
        row.index = indx;
        if (row.isCheck == true) {
          // row.AdjustedAmount = row.AfterAdjustedAmount;
            $scope.rcv_CompanyPaymentAdjustmentDetail.push(row);
        } else {
            $scope.companyAllCheck = false;
            var index2 = $scope.rcv_CompanyPaymentAdjustmentDetail.indexOf(row);
            $scope.rcv_CompanyPaymentAdjustmentDetail.splice(index2, 1);
        }



        if ($scope.companyPaymentAdjustmentList.length == $scope.rcv_CompanyPaymentAdjustmentDetail.length) {

            $scope.companyAllCheck = true;
            $scope.CompanyAllCheckList = $scope.rcv_CompanyPaymentAdjustmentDetail;
        } else {
            $scope.companyAllCheck = false;
            //$scope.CompanyAllCheckList = $scope.rcv_CompanyPaymentAdjustmentDetail;
            $scope.CompanyAllCheckList = $scope.rcv_CompanyPaymentAdjustmentDetail;
        }

        if ($scope.companyAllCheck == false) {
            $scope.CompanyAllCheckList = $scope.companyPaymentAdjustmentList;
           // $scope.CompanyAllCheckList = $scope.rcv_CompanyPaymentAdjustmentDetail;
        }
        
        console.log("$scope.rcv_CompanyPaymentAdjustmentDetail", $scope.rcv_CompanyPaymentAdjustmentDetail);

    }

    $scope.checkAll = function () {
        if ($scope.companyAllCheck) {
            $scope.companyAllCheck = true;
          
        } else {
            $scope.companyAllCheck = false;
           
        }


        if ($scope.companyAllCheck == true) {
            $scope.CheckAndAllCheckList = [];
            $scope.CompanyAllCheckList = [];
            angular.forEach($scope.companyPaymentAdjustmentList, function (item) {
                item.selectedIsCheck = $scope.companyAllCheck;
              
                $scope.CompanyAllCheckList.push(item);
            });
        }
        else {
            $scope.CheckAndAllCheckList = [];
            $scope.CompanyAllCheckList = [];
            angular.forEach($scope.companyPaymentAdjustmentList, function (item) {
                item.selectedIsCheck = $scope.companyAllCheck;
             
                $scope.CompanyAllCheckList.push(item);
            });
        }

        console.log("$scope.rcv_CompanyPaymentAdjustmentDetail", $scope.rcv_CompanyPaymentAdjustmentDetail);
    }

    $scope.onCalAdjust = function (row) {
       // row.AfterAdjust = row.ReceivableAmount - row.AfterAdjustedAmount;
        //if (row.selectedIsCheck == undefined || row.selectedIsCheck == false) {
        //    row.AfterAdjustedAmount = 0;
        //    alertify.log('Must be checked !', 'error', '5000');
        //} 
       // row.AfterAdjustedAmount = row.ActualAmount - row.ReceivableAmount;
        var Temp = row.ActualAmount - row.AfterAdjustedAmount;

        if (row.ReceivableAmount >= row.AfterAdjustedAmount) {

          //  row.AfterAdjust = row.TempAfterAdjustedAmount - row.AfterAdjustedAmount;
            row.AfterAdjust = row.ReceivableAmount - row.AfterAdjustedAmount;
        } else {
            alertify.log('Adjust Amount greater then After adjusted amount !', 'error', '5000');
            row.AfterAdjustedAmount = 0;
            row.AfterAdjust=0;
        }
       
    }



   



    $scope.Save = function () {
        var isValidation = false;
        $scope.rcv_CompanyPaymentAdjustment.CompanyId = $scope.ddlCompany.CompanyId;
       
        if ($scope.rcv_CompanyPaymentAdjustment.CPADate != null || $scope.rcv_CompanyPaymentAdjustment.CPADate != undefined) {
            $scope.rcv_CompanyPaymentAdjustment.CPADate = $scope.rcv_CompanyPaymentAdjustment.CPADate.split('/').reverse().join('-');
            isValidation = true;
        } else {
            alertify.log('Company Payment Date must be Entry!', 'error', '5000');
            $scope.rcv_CompanyPaymentAdjustment.CPADate = "";
        }

        $scope.CompanyPaymentAdjustmentSave = [];

        angular.forEach($scope.CompanyAllCheckList, function (aComP) {

            if (aComP.selectedIsCheck == true) {
                var comPay = {};
                comPay.IsLocalSale = aComP.IsLocalSale;
                comPay.InvoiceId = aComP.InvoiceId;
                comPay.AdjustedAmount = aComP.AfterAdjustedAmount;
                comPay.CPADetailId = aComP.CPADetailId;
                comPay.CPAId = aComP.CPAId;
                $scope.CompanyPaymentAdjustmentSave.push(comPay);
            }
          
        });
        if ($scope.CompanyPaymentAdjustmentSave.length == 0) {
            alertify.log('Check at least one invoice!', 'error', '5000');
            return;
        }
        if (isValidation) {


            if ($scope.CompanyAllCheckList.length > 0) {
                var parms = JSON.stringify({ _rcv_CompanyPaymentAdjustment: $scope.rcv_CompanyPaymentAdjustment, _rcv_CompanyPaymentAdjustmentDetail: $scope.CompanyPaymentAdjustmentSave });


                $http.post('/CompanyPaymentAdjustment/CompanyPaymentAdjustmentSave', parms).success(function (data) {
                    $scope.isDropdownDisabled = false;
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
            else {
                alertify.log('Please Check This Invoice !!!', 'error', '5000');
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
        $scope.companyAllCheck = false;
        $scope.isDropdownDisabled = false;
        $scope.companyPaymentAdjustmentList = [];
        $scope.IsCheckDisabled = true;
        $("#companySelect2").select2({
            selectOnClose: true,
            placeholder: "--- Select Company---"
        });

        $('#companySelect2').select2('destroy');
        $('#companySelect2').val('').select2({
            placeholder: "--- Select Company---"
        });
        //Clear();
    
    }

    $("#txtFromDateForCPA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForCPA = function () {
        $("#txtFromDateForCPA").focus();
        $("#txtFromDateForCPA").trigger("click");
    }


    $("#txtToDateForCPA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForCPA = function () {
        $("#txtToDateForCPA").focus();
        $("#txtToDateForCPA").trigger("click");
    }


    $scope.reloadBtn = function () {
        $('#txtFromDateForCPA').val('');
        $('#txtToDateForCPA').val('');
        $('#textSearchCompanyName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchCompanyName = null;
        GetCompanyPaymentAdjustmentPaged(1);
    }
    $scope.OpenPopupWindow = function (CompanyAdjustmentObj) {
        $window.open("#/CompanyAdjustmentReport", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("CompanyAdjustmentObj", CompanyAdjustmentObj.CPAId);

        event.stopPropagation();
    };

    $scope.CompanyPaymentCompanyAdjustmentSearch = function () {
        GetCompanyPaymentAdjustmentPaged(1);

    }

    function GetCompanyPaymentAdjustmentPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForCPA").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForCPA").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "(CPA.CPADate between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and (C.CompanyName LIKE '%" + $scope.SearchCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria = "C.CompanyName LIKE '%" + $scope.SearchCompanyName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "CPA.CPADate between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/CompanyPaymentAdjustment/CompanyPaymentAdjustmentGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.CompanyPaymentAdjustmentListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.CPADate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.CPADate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.CPADate = date1;
                    }



                })

            }
            else {
                alertify.log('Company Payment Adjustment  Not Found', 'error', '5000');
            }
           

            
        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetCompanyPaymentAdjustmentPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetCompanyPaymentAdjustmentPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetCompanyPaymentAdjustmentPaged($scope.currentPage);
        }
        //  }


    }

   

})