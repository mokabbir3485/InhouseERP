app.controller("CompanyRefundEntryController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {
    
    Clear();


    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var Valuation = sessionStorage.getItem("ValuationSession");
        if (Valuation != null) {
            $scope.CurrentValuationSetup = JSON.parse(sessionStorage.ValuationSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Company Refund').ScreenId;
        GetUsersPermissionDetails();
       

        $scope.BankAccountList = [];
        $scope.MBankingServiceList = [];
        $scope.PaymentTypeList = [];
        $scope.ChequeTypeList = [];
        $scope.CompanyAdvanceAmountList = [];
        $scope.rcv_CompanyRefund = {};
        $scope.rcv_CompanyRefund.RefundId = 0;
        $scope.AdvanceAmount = null;
        $scope.BalanceAmount = null;
        getAllActiveImporter();
        GetAllActivePaymentType();
        GetAllActiveMBankingServiceType();
        GetAllBankAccount();
        GetAllChequeType();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetCompanyRefundPaged(1);
        $('#companyRefund').focus();
        $scope.chequeShowDiv = false;
        $scope.OtherShowDiv = false;
        $scope.ddlPaymentType = { PaymentTypeId: 5 }
        $scope.ddlCompany = null;
        $scope.companyList = [];
        $scope.LoaderEnable = true;
        //$scope.isPayAmountDisable = true;
        $scope.GetPagedLoaderEnable = true;
        $scope.ddlChequeTypeFlag = true;
      
        $scope.rcv_CompanyRefund.RefundDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');


        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
       // GetUsersPermissionDetails();

        GetByVoucherGenerate();

        GetAllPaymentSubType();
        $scope.ChequePaymentSubTypeList = [];
        $scope.MobilePaymentSubTypeList = [];

        $scope.ddlServiceName = null;
        GetCompanyPaymentMaxNo();

    }



    function GetCompanyPaymentMaxNo() {

        $http({
            url: '/CompanyPaymentAdjustment/GetCompanyPaymentRefundMaxNo',
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
                $scope.rcv_CompanyRefund.CompanyPaymentRefundNo = 'CPR/' + $scope.finYearHeadOffice + '/' + $scope.MaxCompanyPaymentNo;
            });

        });
    }

    function GetAllPaymentSubType() {

        $http({
            url: '/PaymentType/GetAllActiveSubPaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data, function (aData) {
                if (aData.PaymentTypeId == 4) {
                    $scope.MobilePaymentSubTypeList.push(aData);
                } else if (aData.PaymentTypeId == 3) {
                    $scope.ChequePaymentSubTypeList.push(aData);
                }
            })


        });

    }

    $("#dtChequetxt").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarChequeDate = function () {
        $("#dtChequetxt").focus();
        $("#dtChequetxt").trigger("click");
    }



    function GetByVoucherGenerate() {

        $http({
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=RV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.rcv_CompanyRefund.ReceiptVoucherNo = "N/A";

        });

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


    function getAllActiveImporter() {
        $http({
            url: "/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyId",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.companyList = data;
            
            $scope.LoaderEnable = false;
            
        });
    };

    //$scope.OnAdvancedAmountCheck = function (companyId) {
    //    angular.forEach($scope.CompanyAdvanceAmountList,function (aData) {
    //        if (companyId == aData.CompanyId) {
    //            $scope.AdvanceAmount =aData.AdvanceAmount;
    //        }
    //    })
       
    //}

    function GetAllActivePaymentType() {
        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaymentTypeListNew = data;
            angular.forEach($scope.PaymentTypeListNew, function (aPaymentType) {
             /*   if (aPaymentType.PaymentTypeId != 5 && aPaymentType.PaymentTypeId != 6) {*/
                    $scope.PaymentTypeList.push(aPaymentType);
                //}

            });
            $scope.ddlPaymentType = { PaymentTypeId:5}
            
        })
    }

    function GetAllActiveMBankingServiceType() {
        $http({
            url: '/PaymentType/GetAllActiveMBankingServiceType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MBankingServiceList = data;
            
        })
    }

    function GetAllBankAccount() {

        $http({
            url: '/BankAccount/GetAllBankAccount',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            //$scope.BankConcat = "";
            //angular.forEach(data, function (aData) {
            //    //$scope.BankConcat = 
            //    var obj = {};
            //    obj.BankAccountId = aData.BankAccountId;
            //    obj.BankName = aData.BankName + "  ~  " + aData.BranchName + "  ~  " + aData.AccountNo;
            //    $scope.BankAccountList.push(obj);
            //})

            $scope.BankConcat = "";
            angular.forEach(data, function (aData) {
                //$scope.BankConcat = 
                var obj = {};
                obj.BankAccountId = aData.BankAccountId;
                if (aData.AccountNo == "" || aData.BankName == "" || aData.BranchName == "") {
                    obj.BankName = "Bank Name : " + aData.BankName + " ,  Branch Name : " + "Not Found" + ", Account NO : " + "Not Found";
                } else {
                    obj.BankName = "Bank Name : " + aData.BankName + " , Branch Name : " + aData.BranchName + ", Account NO : " + aData.AccountNo;
                }

                $scope.BankAccountList.push(obj);
            })

            
        });
    }
    function GetAllChequeType() {

        $http({
            url: '/PaymentType/GetAllChequeType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ChequeTypeList = data;
            
        })
    }
    function GetCompanyAdvanceAmount(CompanyId) {
     //   $scope.rcv_CompanyRefund.RefundAmount = 0;
        $http({
            url: '/CompanyAdvanceRefund/GetCompanyAdvance_GetAmountByCompanyId?CompanyId=' + CompanyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyAdvanceAmountList = data;
            angular.forEach(data,function (aData) {
                $scope.AdvanceAmount = aData.AdvanceAmount;
            })

           

            /*$scope.BalanceAmount = $scope.AdvanceAmount - $scope.rcv_CompanyRefund.RefundAmount;*/
        });
    }
    $scope.GetCompanyAdvanceAmount = function (CompanyId) {
        GetCompanyAdvanceAmount(CompanyId);
    }
    $scope.CheckValidAmount = function () {
        if ($scope.rcv_CompanyRefund.RefundAmount >= 0 && $scope.AdvanceAmount >= $scope.rcv_CompanyRefund.RefundAmount) {
           
        } else {
            $scope.rcv_CompanyRefund.RefundAmount = $scope.AdvanceAmount;
            alertify.log('Refundable Amount greater than Refuand Amount', 'error', '5000');
        }
        $scope.BalanceAmount = $scope.AdvanceAmount - $scope.rcv_CompanyRefund.RefundAmount;
    }
    //$scope.CalBalanceAmount = function () {
        
    //}
    $scope.onDivShowGetById = function (id) {
       // GetAllBankAccount();
        if (id == 1) {
            $scope.rcv_CompanyRefund.ChequeDate = '';
            $scope.rcv_CompanyRefund.ChequeNo = '';
            $scope.rcv_CompanyRefund.MobileBankingServiceId = 0;

            $scope.rcv_CompanyRefund.TransactionNo = '';
            $scope.rcv_CompanyRefund.MobileNo = '';
            // $scope.rcv_CompanyRefund.MoneyReceiptNo = '';
            $scope.rcv_CompanyRefund.MobileBankingServiceId = 0;
          //  $scope.ddlServiceName = null;
            $("#CompanyRefundBankAccount").val("").select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false
            });

            $("#CompanyRefundPayOrderBankAccount").val("").select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });

        }
        else if (id == 2) {
            // $scope.rcv_CompanyRefund.ChequeDate = '';
            // $scope.rcv_CompanyRefund.ChequeNo = '';
            // $scope.rcv_CompanyRefund.MobileBankingServiceId = 0;
            $scope.rcv_CompanyRefund.MoneyReceiptNo = '';
            $scope.rcv_CompanyRefund.TransactionNo = '';
            $scope.rcv_CompanyRefund.MobileNo = '';
            $scope.rcv_CompanyRefund.MoneyReceiptNo = '';
            $scope.rcv_CompanyRefund.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;


        } else if (id == 3) {

            $scope.rcv_CompanyRefund.MoneyReceiptNo = '';
            $scope.rcv_CompanyRefund.TransactionNo = '';
            $scope.rcv_CompanyRefund.MobileNo = '';
            $scope.rcv_CompanyRefund.MoneyReceiptNo = '';
            $scope.rcv_CompanyRefund.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else if (id == 4) {
            $scope.rcv_CompanyRefund.MoneyReceiptNo = '';
            $scope.rcv_CompanyRefund.TransactionNo = '';
          
            $scope.rcv_CompanyRefund.ChequeDate = '';
            $scope.rcv_CompanyRefund.ChequeNo = '';

            $("#CompanyRefundBankAccount").val("").select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false
            });

            $("#CompanyRefundPayOrderBankAccount").val("").select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
        } else {

            $scope.rcv_CompanyRefund.ChequeDate = '';
            $scope.rcv_CompanyRefund.ChequeNo = '';
            $scope.rcv_CompanyRefund.MobileBankingServiceId = 0;

            $scope.rcv_CompanyRefund.TransactionNo = '';
            $scope.rcv_CompanyRefund.MobileNo = '';
            $scope.rcv_CompanyRefund.MoneyReceiptNo = '';

            $scope.rcv_CompanyRefund.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
            $("#CompanyRefundBankAccount").val("").select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false
            });

            $("#CompanyRefundPayOrderBankAccount").val("").select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
        }
    
    }



    $scope.test = function (supplier) {
        console.log(supplier);
    }

    $scope.CheckMobileService = function (ddl) {
        console.log(ddl);
        $scope.PaymentSubTypeId = ddl.PaymentSubTypeId;
    }

    function PostRefund() {
        if ($scope.ddlCompany.CompanyId == null || $scope.ddlCompany.CompanyId == undefined || $scope.ddlCompany.CompanyId == 0) {
            alertify.log('Select Company Name', 'error', '5000');
        }

        
        // $scope.ddlSupplier = $scope.rcv_CompanyRefund;
        console.log("Sup", $scope.ddlSupplier);
        $scope.rcv_CompanyRefund.UpdatorId = $scope.LoginUser.UpdatorId;
        $scope.rcv_CompanyRefund.CreatorId = $scope.LoginUser.CreatorId;
        $scope.rcv_CompanyRefund.CompanyId = $scope.ddlCompany.CompanyId;
        // $scope.rcv_CompanyRefund.ChequeTypeId = $scope.ddlChequeType.ChequeTypeId;


        if ($scope.PaymentSubTypeId == undefined || $scope.PaymentSubTypeId == null) {
            $scope.rcv_CompanyRefund.MobileBankingServiceId = 0;
        } else {
        
            $scope.rcv_CompanyRefund.MobileBankingServiceId = $scope.PaymentSubTypeId;
        }

        if ($scope.ddlChequeType == undefined || $scope.ddlChequeType == null) {
            $scope.rcv_CompanyRefund.ChequeTypeId = 0;
        } else {
            $scope.rcv_CompanyRefund.ChequeTypeId = $scope.ddlChequeType.PaymentSubTypeId;
        }

        if ($scope.ddlPaymentType == undefined || $scope.ddlPaymentType == null) {
            $scope.rcv_CompanyRefund.PaymentTypeId = 0;
        } else {
            $scope.rcv_CompanyRefund.PaymentTypeId = $scope.ddlPaymentType.PaymentTypeId;
        }

        if ($scope.ddlBankAccount == undefined || $scope.ddlBankAccount == null) {
            $scope.rcv_CompanyRefund.BankAccountId = 0;
        } else {

            if ($scope.ddlBankAccount.BankAccountId == null || $scope.ddlBankAccount.BankAccountId == undefined) {
                $scope.rcv_CompanyRefund.BankAccountId;
            } else {
                $scope.rcv_CompanyRefund.BankAccountId = $scope.ddlBankAccount.BankAccountId;
            }
        }

        //var RefundDateConvert = $scope.rcv_CompanyRefund.RefundDate;
        //var date = RefundDateConvert.split("/");
        //var f = new Date(date[2], date[1] - 1, date[0]);
        //$scope.rcv_CompanyRefund.RefundDate = f;

        var params = JSON.stringify({ _rcv_CompanyAdvanceRefund: $scope.rcv_CompanyRefund });


        $http.post('/CompanyAdvanceRefund/CompanyRefundPost', params).success(function (data) {
            if (data > 0) {
                alertify.log('Refund saved successfully!', 'success', '5000');
                // $scope.ResetForm();
                Clear();
                $scope.ddlPaymentType = null;
                $scope.ddlCompany = null;
                $scope.AdvanceAmount = null;
                $('#companyRefund').select2('destroy');
                $('#companyRefund').val('').select2({
                    placeholder: "--- Select Company---"
                });

                $('#CompanyRefundBankAccount').select2('destroy');
                $('#CompanyRefundBankAccount').val('').select2({
                    placeholder: "Bank Name : Not Found, Branch : Not Found , AccountNo : Not Found"
                });

                GetCompanyRefundPaged();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
          
    }
    $scope.SaveRefund = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if (($scope.rcv_CompanyRefund.RefundId == 0 || $scope.rcv_CompanyRefund.RefundId == undefined) && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostRefund();
                    }
                })
            }
            else if ($scope.rcv_CompanyRefund.RefundId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rcv_CompanyRefund.RefundId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostRefund();
                    }
                })
            }
            else if ($scope.rcv_CompanyRefund.RefundId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.rcv_CompanyRefund.RefundId == 0 && $scope.CreatePermission) {
                PostRefund();
            }
            else if ($scope.rcv_CompanyRefund.RefundId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rcv_CompanyRefund.RefundId > 0 && $scope.RevisePermission) {
                PostRefund();
            }
            else if ($scope.rcv_CompanyRefund.RefundId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }

        
    }

    $scope.SelCompanyRefund = function (aCompanyRefund) {
       
        $scope.rcv_CompanyRefund.RefundAmount = aCompanyRefund.RefundAmount;
        $scope.rcv_CompanyRefund = aCompanyRefund;
        $scope.ddlPaymentType = { PaymentTypeId: aCompanyRefund.PaymentTypeId };
        
        if ($scope.ddlCompany == null || $scope.ddlCompany == undefined) {
            //$scope.rcv_CompanyRefund.CompanyId = aCompanyRefund.CompanyId;
            $scope.ddlCompany = { CompanyId: aCompanyRefund.CompanyId };
        } else {
            $scope.rcv_CompanyRefund.CompanyId = aCompanyRefund.CompanyId;
        }
        GetCompanyAdvanceAmount(aCompanyRefund.CompanyId);
        
        if ($scope.ddlBankAccount == null || $scope.ddlBankAccount == undefined) {
            $scope.ddlBankAccount = { BankAccountId: aCompanyRefund.BankAccountId };
        } else {
            $scope.rcv_CompanyRefund.BankAccountId = aCompanyRefund.BankAccountId;
        }

        $('#companyRefund').select2('destroy');
        $('#CompanyRefundBankAccount').select2('destroy');
        $('#CompanyRefundBankAccount').val('').select2({
            placeholder: "Bank Name : Not Found, Branch : Not Found , AccountNo : Not Found"
        });
     
        $('#companyRefund').val(aCompanyRefund.CompanyId).select2();
     
       /* $scope.rcv_CompanyRefund.BankAccountId = aCompanyRefund.BankAccountId;*/
      
    

        if (aCompanyRefund.PaymentTypeId == 3) {

            $scope.ddlChequeType = { ChequeTypeId: aCompanyRefund.ChequeTypeId };
           
            $('#CompanyRefundBankAccount').val(aCompanyRefund.BankAccountId).select2();

           
             
                $scope.chequeShowDiv = true;
                $scope.OtherShowDiv = false;
            

          
        }
        else if (aCompanyRefund.PaymentTypeId == 4) {
            $scope.OtherShowDiv = true;
            $scope.chequeShowDiv = false;
            $scope.ddlServiceName = { MobileBankingServiceId: aCompanyRefund.MobileBankingServiceId };
        }

        window.scrollTo(0, 0);
    }

    $scope.ResetForm = function () {
        Clear();
        $scope.rcv_CompanyRefund = {};
        $scope.ddlPaymentType = null;
        $scope.ddlCompany = null;

        $('#companyRefund').select2('destroy');
        $('#companyRefund').val('').select2({
            placeholder: "--- Select Company---"
        });
       // $scope.BankAccountList = [];
        //$('#CompanyRefundBankAccount').select2('destroy');
        //$('#CompanyRefundBankAccount').val('').select2({
        //    placeholder: "Bank Name : Not Found, Branch : Not Found , AccountNo : Not Found"
        //});


        

        //$scope.supplierRefundEntryForm.$setPristine();
        //$scope.supplierRefundEntryForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForCR').val('');
        $('#txtToDateForCR').val('');
        $('#textSupplierName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchCompanyName = null;
        GetCompanyRefundPaged(1);
        $scope.GetPagedLoaderEnable = false;
    }
    //$scope.OpenPopupWindow = function (RefundId) {
    //    $window.open("#/CompanyRefundReport", "popup", "width=800,height=550,left=280,top=80");
    //    $cookieStore.put("RefundId", RefundId);

    //    event.stopPropagation();
    //};
    $scope.CompanyRefundSearch = function () {
        GetCompanyRefundPaged(1);

    }

    function GetCompanyRefundPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForCR").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForCR").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([RefundDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria = "[CompanyName] LIKE '%" + $scope.SearchCompanyName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[RefundDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/CompanyAdvanceRefund/GetCompanyRefundPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.RefundDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.RefundDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aSd.RefundDate = date1;
                    }
                    if (aSd.ChequeDate != null) {
                        var res2 = aSd.ChequeDate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate2 = new Date(parseInt(aSd.ChequeDate.substr(6)));
                            var date2 = ($filter('date')(parsedDate2, 'dd/MM/yyyy')).toString();
                            aSd.ChequeDate = date2;
                        }
                    }


                })

            }
            else {
                alertify.log('Company Refund  Not Found', 'error', '5000');
            }
            $scope.CompanyRefundListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;

            
        });
    }

    $scope.getData = function (curPage) {
        $scope.GetPagedLoaderEnable = false;
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetCompanyRefundPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetCompanyRefundPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetCompanyRefundPaged($scope.currentPage);
        }


    }

    $("#txtFromDateForCR").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForCR = function () {
        $("#txtFromDateForCR").focus();
        $("#txtFromDateForCR").trigger("click");
    }


    $("#txtToDateForCR").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForCR = function () {
        $("#txtToDateForCR").focus();
        $("#txtToDateForCR").trigger("click");
    }


    $("#textRefundDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeRefundDate = function () {
        $("#textRefundDate").focus();
        $("#textRefundDate").trigger("click");
    }

    $("#dtChequetxt").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarChequeDate = function () {
        $("#dtChequetxt").focus();
        $("#dtChequetxt").trigger("click");
    }


    $("#dtPayOrdertxt").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarPayorderDate = function () {
        $("#dtPayOrdertxt").focus();
        $("#dtPayOrdertxt").trigger("click");
    }


    $scope.OpenPopupWindow = function (companyRefund) {
        $window.open("#/CompanyRefundReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("CompanyRefundId", companyRefund.RefundId);

        event.stopPropagation();
    }
})