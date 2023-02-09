app.controller("SupplierRefundEntryController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {
    
    Clear();

    function Clear() {
      
        var Valuation = sessionStorage.getItem("ValuationSession");
        if (Valuation != null) {
            $scope.CurrentValuationSetup = JSON.parse(sessionStorage.ValuationSession);
        }
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Supplier Refund').ScreenId;
        GetUsersPermissionDetails();


        $scope.BankAccountList = [];
        $scope.MBankingServiceList = [];
        $scope.PaymentTypeList = [];
        $scope.ChequeTypeList = [];
        $scope.pay_SupplierRefund = {};
        $scope.pay_SupplierRefund.RefundId = 0;
        $scope.JVNo = '';
        $scope.BalanceAmount = null;
        $scope.AdvanceAmount = null;
        
        GetActiveSupplier();
        GetAllActivePaymentType();
        GetAllActiveMBankingServiceType();
        GetAllBankAccount();
        GetAllChequeType();
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetSupplierRefundPaged(1);
        $('#ddlSupplier').focus();
        $scope.chequeShowDiv = false;
        $scope.OtherShowDiv = false;
        
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        //GetUsersPermissionDetails();

        $scope.pay_SupplierRefund.RefundDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetByVoucherGenerate();
        CompanyAdvcancedNo();
    }

    function GetByVoucherGenerate() {

        $http({
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=PV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
          //  $scope.pay_SupplierRefund.PaymentVoucherNo = data;

        });

    }



    function CompanyAdvcancedNo() {
     
        $http({
            url: '/SupplierPaymentAndAdjustment/GetMaxSupplierPaymentRefund',
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
                $scope.pay_SupplierRefund.RefundNo = 'SPR/' + $scope.finYearEPZ + '/' + $scope.GetMaxAdvanceNo;

            });


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

    function GetActiveSupplier() {
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierList = data;
            
        })
    }

    $scope.CheckRefundableAmount = function (ddlSup) {
        angular.forEach($scope.supplierList, function (aData) {
            if (ddlSup.SupplierId == aData.SupplierId) {
                $scope.AdvanceAmount = aData.AdvanceAmount;
            }
        });
    }


    $scope.CheckValidAmount = function () {
        if ($scope.pay_SupplierRefund.PaidAmount >= 0 && $scope.AdvanceAmount >= $scope.pay_SupplierRefund.PaidAmount) {

        } else {
            $scope.pay_SupplierRefund.PaidAmount = $scope.AdvanceAmount;
            alertify.log('Refundable Amount greater than Refuand Amount', 'error', '5000');
        }
        $scope.BalanceAmount = $scope.AdvanceAmount - $scope.pay_SupplierRefund.PaidAmount;
     
    }

    function GetAllActivePaymentType() {
        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaymentTypeList = data;
            $scope.ddlPaymentType = { PaymentTypeId: 5 }
            $scope.pay_SupplierRefund.PaymentTypeId = 5;
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

            $scope.BankConcat = "";
            angular.forEach(data, function (aData) {
                //$scope.BankConcat = 
                var obj = {};
                obj.BankAccountId = aData.BankAccountId;
                obj.BankName = aData.BankName + "  ~  " + aData.BranchName + "  ~  " + aData.AccountNo;
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
    $scope.onDivShowGetById = function (id) {

        if (id == 3) {
            $scope.chequeShowDiv = true;
            $scope.OtherShowDiv = false;


            $scope.pay_SupplierRefund.TransactionNo = '';
            $scope.pay_SupplierRefund.MobileNo = '';
            $scope.pay_SupplierRefund.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else if (id == 4) {
            $scope.OtherShowDiv = true;
            $scope.chequeShowDiv = false;

            $scope.pay_SupplierRefund.ChequeNo = '';
            $scope.pay_SupplierRefund.ChequeDate = '';
            $scope.pay_SupplierRefund.BankAccountId = 0;
            $scope.ddlBankAccount = null;
        }
        else {
            $scope.chequeShowDiv = false;
            $scope.OtherShowDiv = false;

            $scope.pay_SupplierRefund.ChequeNo = '';
            $scope.pay_SupplierRefund.ChequeDate = '';
            $scope.pay_SupplierRefund.BankAccountId = 0;
            //$scope.ddlBankAccount.BankAccountId = 0;
            $scope.ddlBankAccount = null;

            $scope.pay_SupplierRefund.TransactionNo = '';
            $scope.pay_SupplierRefund.MobileNo = '';
            $scope.pay_SupplierRefund.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
    }



    $scope.test = function (supplier) {
        console.log(supplier);
    }
    function PostRefund() {
        $scope.pay_SupplierRefund.UpdatorId = $scope.LoginUser.UpdatorId;
        $scope.pay_SupplierRefund.CreatorId = $scope.LoginUser.CreatorId;
        var params = JSON.stringify({ pay_SupplierRefund: $scope.pay_SupplierRefund });
        $http.post('/SupplierRefund/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Refund saved successfully!', 'success', '5000');
                $scope.ResetForm();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
    }
    $scope.SaveRefund = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.pay_SupplierRefund.RefundId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostRefund();
                    }
                })
            }
            else if ($scope.pay_SupplierRefund.RefundId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pay_SupplierRefund.RefundId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostRefund();
                    }
                })
            }
            else if ($scope.pay_SupplierRefund.RefundId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.pay_SupplierRefund.RefundId == 0 && $scope.CreatePermission) {
                PostRefund();
            }
            else if ($scope.pay_SupplierRefund.RefundId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pay_SupplierRefund.RefundId > 0 && $scope.RevisePermission) {
                PostRefund();
            }
            else if ($scope.pay_SupplierRefund.RefundId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
    }

    $scope.SelSupplierRefund = function (aSupplierRefund) {
        window.scrollTo(0, 0);
        $scope.pay_SupplierRefund = aSupplierRefund;

        $scope.ddlSupplier = { SupplierId: aSupplierRefund.SupplierId, SupplierName: aSupplierRefund.SupplierName };
        $('#ddlSupplier').select2('destroy');
        $('#ddlSupplier').val(aSupplierRefund.SupplierId).select2();
        $scope.ddlPaymentType = { PaymentTypeId: aSupplierRefund.PaymentTypeId };


        if (aSupplierRefund.PaymentTypeId == 3) {
            $scope.chequeShowDiv = true;
            $scope.OtherShowDiv = false;
            $scope.ddlBankAccount = { BankAccountId: aSupplierRefund.BankAccountId };
            $scope.ddlChequeType = { ChequeTypeId: aSupplierRefund.ChequeTypeId };
        }
        else if (aSupplierRefund.PaymentTypeId == 4) {
            $scope.OtherShowDiv = true;
            $scope.chequeShowDiv = false;
            $scope.ddlServiceName = { MobileBankingServiceId: aSupplierRefund.MobileBankingServiceId };
        }
    }

    $scope.ResetForm = function () {
        $scope.pay_SupplierRefund = {};
        $scope.AdvanceAmount = 0;
        //$scope.stopPropagation();
        //$scope.supplier.selected = undefined;
       // $scope.selected = undefined;
        //$scope.ddlSupplier = { SupplierName: '' };
        $('#ddlSupplier').select2('destroy');
        $('#ddlSupplier').val('').select2({
            placeholder: "Select Supplier",
            theme: "classic",
            dropdownAutoWidth: false
        });

       //$select.search = undefined;

       // $('.ui-select-match-text').val('').trigger('change');

        //$scope.ddlSupplier = "";
        //$scope.ddlSupplier.SupplierName = {};
        //$scope.ddlSupplier = null;

        $scope.ddlPaymentType = null;
        Clear();
        $scope.supplierRefundEntryForm.$setPristine();
        $scope.supplierRefundEntryForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForSR').val('');
        $('#txtToDateForSR').val('');
        $('#textSupplierName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchSupplierName = null;
        GetSupplierRefundPaged(1);
    }
    $scope.OpenPopupWindow = function (SupplierRefundObj) {
        $window.open("#/SupplierRefundReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SupplierRefundObj", JSON.stringify(SupplierRefundObj));
        $cookieStore.put("SupplierRefundObj", SupplierRefundObj);
        event.stopPropagation();
    };
    $scope.SupplierRefundSearch = function () {
        GetSupplierRefundPaged(1);

    }

    function GetSupplierRefundPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSR").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForSR").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchSupplierName != undefined && $scope.SearchSupplierName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([RefundDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchSupplierName !== undefined && $scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
            SearchCriteria = "[SupplierName] LIKE '%" + $scope.SearchSupplierName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[RefundDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/SupplierRefund/GetSupplierRefundPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.RefundDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.RefundDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.RefundDate = date1;
                    }
                    if (aSd.ChequeDate != null) {
                        var res2 = aSd.ChequeDate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate2 = new Date(parseInt(aSd.ChequeDate.substr(6)));
                            var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                            aSd.ChequeDate = date2;
                        }
                    }


                })

            }
            else {
                alertify.log('Supplier Refund  Not Found', 'error', '5000');
            }
            $scope.SupplierRefundListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetSupplierRefundPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSupplierRefundPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSupplierRefundPaged($scope.currentPage);
        }


    }

    $("#txtFromDateForSR").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForSR = function () {
        $("#txtFromDateForSR").focus();
        $("#txtFromDateForSR").trigger("click");
    }


    $("#txtToDateForSR").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForSR = function () {
        $("#txtToDateForSR").focus();
        $("#txtToDateForSR").trigger("click");
    }


    $("#dtRefundDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarRefundDate = function () {
        $("#dtRefundDate").focus();
        $("#dtRefundDate").trigger("click");
    }

    $("#dtChequeDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarChequeDate = function () {
        $("#dtChequeDate").focus();
        $("#dtChequeDate").trigger("click");
    }
})