
app.controller("CompanyPaymentController", function ($scope, $rootScope,$http, $filter, $cookieStore, $timeout, $window) {
    Clear();

    $scope.totalPaidAmount = 0;
    $scope.totalAITAmount = 0;
    $scope.totatVatAmount = 0;
  


    var paidAmount = 0;
    var vatAmount = 0;
    var aitAmount = 0;
    var totalAmount = 0;
    var ReceivableAmount = 0;
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Company Payment').ScreenId;
        GetUsersPermissionDetails();
        

        //Get Paged===>

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.CompanyCurrencyList = [];
        CompanyPaymentPaged($scope.currentPage);

        GetCompanyPaymentMaxNo();
        GetCompanyOpeningPaymentMaxNo();

        $scope.isPayListShow = false;
        $scope.CompanyPaymentTitle = "Company Payment Receive";
        $scope.ddlCompany = null;
        $scope.ddlPayment = null;
        $scope.ddlCiOrdSalesInvoice = null;
        $scope.IsCompanyType = false;
        $scope.ddlBankAccount = null;
        $scope.ddlReceiverBankAccount = null;
        $scope.ddlCompanyBankAccount = null;
        $scope.ddlPayOrderBankAccount = null;
        $scope.ddlChecqueBankAccount = null;
        $scope.CompanyBankAccountList = [];
        $scope.ReceiverBankAccountList = [];
        $scope.ReceiverBankAccountList1 = [];
        $scope.CompanyList = [];
        $scope.paymentTypelist = [];
        $scope.rec_CompanyPayment = {};
        $scope.rec_CompanyPayment.CompanyPaymentId = 0;
        $scope.CompanyTypeList = [];
        $scope.CompanyPaymentList = [];
        $scope.isCheckArrayList = [];
        $scope.companyIsCheckPaymentCalculationList = [];
        $scope.BankAccountList = [];

        $scope.companyPaymentGetPagedList = [];

        $scope.CiOrSalesInvoicelist = [
            { Id: 1, Name: "Local" },
            { Id: 2, Name: "Export" }
        ];

        $scope.rec_CompanyPayment.PaymentDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

        GetCompanyForPayment();
        GetAllActivePaymentType();
        GetAllBankAccount();

        $scope.CurrencyTypeList = [];
        GetAllCurrency();
        $scope.ColDynamic = "col-md-4";
        $scope.ColDynamicRemarks = "col-md-5";
        $scope.ddlChequeType = null;

        GetAllChequeType();
        $scope.ChequeTypeList = [];
        $scope.MBankingServiceList = [];
        $scope.OpeningCompanyList = [];
        $scope.CompanyOpeningBalanceList = [];
        GetAllActiveMBankingServiceType();
        $scope.ddlServiceName = null;
        $scope.ddlPaymentType = null;
        $scope.LoaderEnable = true;
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
       // GetUsersPermissionDetails();
        GetByVoucherGenerate();
        $scope.PayAmountInType = "BDT";
        $scope.PaymentSubTypeList = [];
        GetAllPaymentSubType();
        GetActiveCompany();
        $scope.ChequePaymentSubTypeList = [];
        $scope.MobilePaymentSubTypeList = [];
        $scope.Branchlist = [];
        GetAllBranch();

        $scope.ddlBranch = null;
    }

    $scope.rec_CompanyPayment.PaymentDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');


    $("#companyPaymentDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForPaymentDate = function () {
        $("#companyPaymentDate").focus();
        $("#companyPaymentDate").trigger("click");
    }

    $("#companyPaymentDate1").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForPaymentDate1 = function () {
        $("#companyPaymentDate1").focus();
        $("#companyPaymentDate1").trigger("click");
    }

    //Cheque Date =====>>>

    $("#CompanytxtChequeDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForChequeDate = function () {
        $("#CompanytxtChequeDate").focus();
        $("#CompanytxtChequeDate").trigger("click");
    }


    //$scope.hideButton = function (IsOpeningPayment) {
    //    if (IsOpeningPayment==true) {

    //    }
    //}
    function GetCompanyPaymentMaxNo() {

        $http({
            url: '/CompanyPayment/GetCompanyPaymentMaxNo',
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
                $scope.rec_CompanyPayment.CompanyPaymentNo = 'CP/' + $scope.finYearHeadOffice + '/' + $scope.MaxCompanyPaymentNo;
            });

        });
    }

    function GetCompanyOpeningPaymentMaxNo() {

        $http({
            url: '/CompanyPayment/GetCompanyOpeningPaymentMaxNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxCompanyOpeningPaymentNo = data;
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
                $scope.CompanyOpeningPaymentNo = 'COP/' + $scope.finYearHeadOffice + '/' + $scope.MaxCompanyOpeningPaymentNo;
            });

        });
    }

    function GetByVoucherGenerate() {

        $http({
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=RV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.rec_CompanyPayment.ReceiptVoucherNo = "N/A";
            console.log('Rcv', data);

        });

    }
    $scope.isOpeningFlagShow = true;
    $scope.hideButton = function () {
        GetByVoucherGenerate();
        if ($scope.isOpening == true) {
            $scope.isOpening = false;
            $scope.CompanyPaymentList = [];
            $scope.rec_CompanyPayment = {};
            $scope.CurrencyDiusabled = true;
            $scope.ddlCurrencyType = { CurrencyId: 1 }
            GetCompanyPaymentMaxNo();
         
        } else {
          
            $scope.isOpening = true;
            $scope.rec_CompanyPayment = {};
            $scope.currentPageOpening = 1;
            $scope.PerPageOpening = 10;
            $scope.total_countOpening = 0;
            CompanyOpeningPaymentPaged($scope.currentPageOpening);
            GetCompanyPaymentMaxNo();
        }

        if ($scope.IsOpeningPayment == true) {
            $scope.isOpeningFlagShow = false;
            $scope.rec_CompanyPayment.TotalVAT = 0;
            $scope.rec_CompanyPayment.TotalAIT = 0;
            $scope.rec_CompanyPayment.PaidAmountConversion = 0;
            $scope.rec_CompanyPayment.TotalAITConversion = 0;
            $scope.rec_CompanyPayment.TotalVATConversion = 0;

            $scope.rec_CompanyPayment.ConversionAmount = 1;
            
        } else {
            $scope.isOpeningFlagShow = true;
            $scope.rec_CompanyPayment.TotalVAT = 0;
            $scope.rec_CompanyPayment.TotalAIT = 0;
            $scope.rec_CompanyPayment.PaidAmountConversion = 0;
            $scope.rec_CompanyPayment.TotalAITConversion = 0;
            $scope.rec_CompanyPayment.TotalVATConversion = 0;
        }
    };
    function GetAllPaymentSubType() {

        $http({
            url: '/PaymentType/GetAllActiveSubPaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data,function (aData) {
                if (aData.PaymentTypeId == 4) {
                    $scope.MobilePaymentSubTypeList.push(aData);
                } else if (aData.PaymentTypeId == 3) {
                    $scope.ChequePaymentSubTypeList.push(aData);
                }
            })
           

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
    function GetCompanyForPayment() {
     
        $http({
            url: '/SalesInvoice/GetCompanyForPayment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyList = data;
            
            $scope.LoaderEnable = false;
        
        })
        
    }
    function GetActiveCompany() {
        var criteria = "C.IsActive=1";
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (companyList) {
            $scope.OpeningCompanyList = companyList;
        })
    }
    $scope.CompanyOpeningBalance_GetByCompanyId = function (CompanyId) {

        $http({
            url: '/CompanyOpening/CompanyOpeningBalance_GetByCompanyId?CompanyId=' + CompanyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyOpeningBalanceList = data;
            angular.forEach($scope.CompanyOpeningBalanceList, function (aSd) {
                var res1 = aSd.OpeningDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aSd.OpeningDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aSd.OpeningDate = date1;
                }
            })
            $scope.CurrencyDiusabled = true;

            $scope.rec_CompanyPayment.PaidAmount = $scope.CompanyOpeningBalanceList[0].TotalPayableAmount;
            $scope.rec_CompanyPayment.ConvertedAmount = $scope.CompanyOpeningBalanceList[0].TotalPayableAmount;

        });
    }
    $scope.CheckPaidAndOpeningAmount = function (PaidAmount) {
        if ($scope.CompanyOpeningBalanceList[0].TotalPayableAmount < PaidAmount) {
            $scope.rec_CompanyPayment.PaidAmount = $scope.CompanyOpeningBalanceList[0].TotalPayableAmount;
            $scope.rec_CompanyPayment.ConvertedAmount = $scope.CompanyOpeningBalanceList[0].TotalPayableAmount;
            alertify.log('Paid amount is greater then opening Amount', 'error', '5000');
        } else {
            $scope.rec_CompanyPayment.ConvertedAmount = PaidAmount;
        }
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

    function GetAllActiveMBankingServiceType() {
        $http({
            url: '/PaymentType/GetAllActiveMBankingServiceType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MBankingServiceList = data;
            

        })
    }
    

    function GetAllCurrency() {

        $http({
            url: '/SalesOrder/GetAllCurrency',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CurrencyTypeList = data;
        })
    }



    function GetAllActivePaymentType() {
        
        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aPay) {
               // if (aPay.PaymentTypeId !=2) {
                    $scope.paymentTypelist.push(aPay);
               // }
            })
        
          
        })
    }

    $scope.onChequeGetById = function (PaymentTypeId, PaymentGroupId) {
        if (PaymentTypeId==3) {
            $scope.rec_CompanyPayment.ChequeDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        }
        GetAllBankAccount();

        if (PaymentTypeId == 3) {
         
            $scope.rec_CompanyPayment.TransactionNo = '';
            $scope.rec_CompanyPayment.MoneyReceiptNo = '';
           // $scope.rec_CompanyPayment.ReceiptVoucherNo = '';
            $scope.rec_CompanyPayment.MobileNo = '';
            $scope.rec_CompanyPayment.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;

            $('#bankddlCompanyOnlinePayment').select2('destroy');
            $("#bankddlCompanyOnlinePayment").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
        }
        else if (PaymentTypeId == 6) {
            $scope.rec_CompanyPayment.ChequeNo = '';
           // $scope.rec_CompanyPayment.ReceiptVoucherNo = '';
            $scope.rec_CompanyPayment.MoneyReceiptNo = '';
            $scope.rec_CompanyPayment.ChequeDate = '';
            $scope.rec_CompanyPayment.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrder').select2('destroy');
            $("#bankddlPayOrder").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
            $('#bankddlCompanyOnlinePayment').select2('destroy');
            $("#bankddlCompanyOnlinePayment").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
        }
        else if (PaymentTypeId == 4) {
         
            $scope.rec_CompanyPayment.ChequeNo = '';
          //  $scope.rec_CompanyPayment.ReceiptVoucherNo = '';
            $scope.rec_CompanyPayment.MoneyReceiptNo = '';
            $scope.rec_CompanyPayment.ChequeDate = '';
            $scope.rec_CompanyPayment.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrder').select2('destroy');
            $("#bankddlPayOrder").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
            $('#bankddlCompanyOnlinePayment').select2('destroy');
            $("#bankddlCompanyOnlinePayment").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });

        } else if (PaymentTypeId == 1) {
           

            $scope.rec_CompanyPayment.ChequeNo = '';
            $scope.rec_CompanyPayment.ChequeDate = '';
            $scope.rec_CompanyPayment.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrder').select2('destroy');
            $("#bankddlPayOrder").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
            $('#bankddlCompanyOnlinePayment').select2('destroy');
            $("#bankddlCompanyOnlinePayment").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $scope.rec_CompanyPayment.TransactionNo = '';
            $scope.rec_CompanyPayment.MobileNo = '';
            $scope.rec_CompanyPayment.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        } else if (PaymentGroupId == 5) {
            $scope.rec_CompanyPayment.MoneyReceiptNo = '';
            $scope.rec_CompanyPayment.ChequeNo = '';

            $scope.rec_CompanyPayment.ChequeDate = '';
            $scope.rec_CompanyPayment.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;

            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrder').select2('destroy');
            $("#bankddlPayOrder").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false

            });
            $scope.rec_CompanyPayment.MobileNo = '';
            $scope.rec_CompanyPayment.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
      
        else {
           // $scope.rec_CompanyPayment.ReceiptVoucherNo = '';
            $scope.rec_CompanyPayment.MoneyReceiptNo = '';
            $scope.rec_CompanyPayment.ChequeNo = '';
    
            $scope.rec_CompanyPayment.ChequeDate = '';
            $scope.rec_CompanyPayment.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
         
            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrder').select2('destroy');
            $("#bankddlPayOrder").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false

            });
            $('#bankddlCompanyOnlinePayment').select2('destroy');
            $("#bankddlCompanyOnlinePayment").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $scope.rec_CompanyPayment.TransactionNo = '';
            $scope.rec_CompanyPayment.MobileNo = '';
            $scope.rec_CompanyPayment.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
          
    }




    //$scope.OnLoadSalesInvoicWithCI = function () {
    //    document.getElementById("companyLoadId").disabled = false;
    //}
    $scope.CompanyWithPaymentType = function () {
        SalesInvoiceCommon();
        $scope.CompanyCurrencyList = [];
        $scope.isCheckArrayList = [];
        $scope.CompanyPaymentList = [];
    }

    function SalesInvoiceCommon() {

        $scope.totalPaidAmount = 0;
        $scope.totalAITAmount = 0;
        $scope.totatVatAmount = 0;
        $scope.totalSum = 0;
    
        if ($scope.ddlCompany != null) {

            $scope.ddlCurrencyType = null;

            $scope.rec_CompanyPayment.ConvertedAmount = 0;
            $scope.rec_CompanyPayment.PaidAmount = null;
            $scope.rec_CompanyPayment.PaidAmount = 0;
           // $scope.isCheckArrayList = [];
            paidAmount = 0;
            $scope.TempTotalAdditionalCost = 0;

            $http({
                url: '/CompanyPayment/CompanyPaymentGetByCompanyType?CompanyId=' + $scope.ddlCompany.CompanyId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {


                $scope.OnAccount = 0;
                $scope.AdvanceAmount = 0;

                $scope.CompanyTypeList = data;
                $scope.CompanyPaymentList = data;
             
                angular.forEach(data, function (aData) {
                    var res1 = aData.InvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.InvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aData.InvoiceDate = date1;
                    }
                    // aData.PayAmount = aData.PayAmount - aData.VAT;
                    if (aData.AIT == undefined) {
                        aData.AIT = 0;
                    }
                    aData.Total = aData.PayAmount + aData.VAT + aData.AIT;
                    $scope.totalSum += aData.Total;

                    aData.TempPerSalesInvoicePayAmount = aData.PayAmount;
                    aData.PayableAmount = aData.PayAmount;
                    $scope.TempTotalAdditionalCost += aData.AdditionalCost;


                });
                
            })
        }

        else {
            $scope.CompanyPaymentList = [];
            $scope.isCheckArrayList = [];
            $scope.rec_CompanyPayment.PaidAmount = null;
            $scope.rec_CompanyPayment.ConvertedAmount = 0;
            $scope.ddlCurrencyType = null;
            paidAmount = 0;
        }



    }


    function GetAllBankAccount() {

        $http({
            url: '/BankAccount/GetAllBankAccount',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankAccountList = data;
            $scope.ReceiverBankAccountList = [];
            $scope.CompanyBankAccountList = [];

            angular.forEach($scope.BankAccountList, function (aData) {
             /*   if (aData.AccountRefId == $scope.ddlCompany.CompanyId) {*/

       
                if (aData.AccountFor == 'Customer') {
                    if (aData.AccountNo == "" || aData.BankName == "" || aData.BranchName == "") {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " ,  Branch Name : " + "Not Found" + ", Account NO : " + "Not Found, " + aData.CompanyName;
                    } else {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " , Branch Name : " + aData.BranchName + ", Account NO : " + aData.AccountNo + ", " + aData.CompanyName;
                    }
                    $scope.CompanyBankAccountList.push(aData);
                   // console.log('Importer', $scope.CompanyBankAccountList);
                } else if (aData.AccountFor == 'Exporter') {
                    if (aData.AccountNo == "" || aData.BankName == "" || aData.BranchName == "") {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " ,  Branch Name : " + "Not Found" + ", Account NO : " + "Not Found";
                    } else {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " , Branch Name : " + aData.BranchName + ", Account NO : " + aData.AccountNo;
                    }
                    $scope.ReceiverBankAccountList.push(aData);
                   // console.log('Exporter',$scope.ReceiverBankAccountList);
                    }

              //  }

            })
        });
    }

    $scope.CustomerbankCheck = function (ddlBank) {
     
        //angular.forEach($scope.ReceiverBankAccountList, function (aData) {
        //    if (ddlBank.BankAccountId == aData.BankAccountId) {
        //        $scope.ReceiverBankAccountList.push(aData);
        //    }
        //})
        var Bank = $scope.ReceiverBankAccountList.filter(i => !$scope.CompanyBankAccountList.includes(i.BankAccountId));
        $scope.ReceiverBankAccountList = Bank;
        
    }


    function GetAllBranch() {
        $http({
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Branchlist = data;

        });

    }

    function GetOnPaymentByCompanyId() {
        $http({
            url: '/CompanyPayment/CompanyPaymentOnAccountByCompanyId?CompanyId=' + $scope.ddlCompany.CompanyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.OnAccount = data[0].PaymentOnAmount;
            console.log(" $scope.OnAccount",$scope.OnAccount);
        });
    }

    function CompanyCurrentAdvancedGetByCompanyId() {
        $http({
            url: '/CompanyPayment/CompanyCurrentAdvancedGetByCompanyId?CompanyId=' + $scope.ddlCompany.CompanyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AdvanceAmount = data[0].AdvanceAmount;
            $scope.rec_CompanyPayment.AdvanceAmount = data[0].AdvanceAmount;
            console.log(" $scope.OnAccount", $scope.AdvanceAmount);
        });
    }

    $scope.advancedAmountHide = function (aPayment) {
       
        if (aPayment.Code == "csh") {
            //ddlId 1
            $scope.ColDynamic = "col-md-3";
            $scope.ColDynamicRemarks = "col-md-3"
        
        }
        else if (aPayment.Code == "adv") {
             //ddlId 5
            $scope.ColDynamic = "col-md-3";
            $scope.ColDynamicRemarks = "col-md-3";
          //  SalesInvoiceCommon();
            //$scope.rec_CompanyPayment.AdvanceAmount = $scope.CompanyPaymentList[0].AdvanceAmount;
          
        }
        else if (aPayment.Code == "bd") {
             //ddlId 6
            $scope.ColDynamic = "col-md-4";
            $scope.ColDynamicRemarks = "col-md-5"
           // SalesInvoiceCommon();
          //  $scope.rec_CompanyPayment.OnAccountAmount = $scope.CompanyPaymentList[0].OnAccountAmount;
        }
        else if (aPayment.Code == "oa") {
            //ddlId 7
            $scope.ColDynamic = "col-md-3";
            $scope.ColDynamicRemarks = "col-md-3"
        }
        else if (aPayment.Code == "eft") {
             //ddlId 8
            $scope.ColDynamic = "col-md-3";
            $scope.ColDynamicRemarks = "col-md-3";
        
        }
        else if (aPayment.Code == "rtgs") {
             //ddlId 9
            $scope.ColDynamic = "col-md-3"
            $scope.ColDynamicRemarks = "col-md-3"
        }
        else if (aPayment.Code == "ddtt") {
            $scope.ColDynamic = "col-md-3"
            $scope.ColDynamicRemarks = "col-md-3"
           
        }
        else if (aPayment.Code == "ft") {
               //ddlId 10
            $scope.ColDynamic = "col-md-3"
            $scope.ColDynamicRemarks = "col-md-3"
        }
        else if (aPayment.Code == "cd") {
             //ddlId 11
            $scope.ColDynamic = "col-md-3"
            $scope.ColDynamicRemarks = "col-md-3"
        }
        else {
            $scope.ColDynamic = "col-md-4"
            $scope.ColDynamicRemarks = "col-md-5"
        }
    }


    $scope.CheckAdvancedAmout = function (obj) {
     
        var TemptotalPayAmount = 0;
        if (obj.PaymentTypeId == 5) {
            $scope.rec_CompanyPayment.AdvanceAmount = $scope.CompanyPaymentList[0].AdvanceAmount;
        }
        if (obj.PaymentTypeId == 7) {
            $scope.rec_CompanyPayment.OnAccountAmount = $scope.CompanyPaymentList[0].OnAccountAmount;
        }
        if (obj.PaymentTypeId == 8) {
            $scope.rec_CompanyPayment.OpeningAmount = $scope.CompanyPaymentList[0].OpeningAmount;
          
        }
       

        if (obj.PaymentTypeId == 5) {
            var totalPayAmount = 0;
            var flag = false;
            angular.forEach($scope.isCheckArrayList, function (aData) {
                if (aData.selectedIsCheck == true) {
                    totalPayAmount += aData.PaidAmount;

                    if ($scope.CompanyPaymentList[0].AdvanceAmount < $scope.rec_CompanyPayment.PaidAmount) {
                        flag = true;
                        $scope.rec_CompanyPayment.PaidAmount = $scope.CompanyPaymentList[0].AdvanceAmount;
                    }
                }
            });

            if (flag) {
                alertify.log('Advance Amount Less than Pay Amount  !', 'error', '5000');
            }

        } 
        else {

            angular.forEach($scope.isCheckArrayList, function (aData) {
                TemptotalPayAmount += aData.PayAmount;
                $scope.rec_CompanyPayment.PaidAmount = TemptotalPayAmount;

                //$scope.rec_CompanyPayment.PaidAmount = $scope.CompanyPaymentList[0].AdvanceAmount;
            });


        }

    }

  
    // $scope.rec_CompanyPayment.PaidAmount = 0;
    $scope.TotalConversionAmount = 0;
    $scope.onCheckVal = function (row, select, indx) {
         
            row.isCheck = select;
            $scope.isCheck = select;
            row.index = indx;
        
        if ($scope.CompanyCurrencyList.length == 0 || $scope.CompanyCurrencyList == null) {

            if (row.CurrencyId == 1) {
                $scope.PayAmountInType = "BDT";
            } else {
                $scope.PayAmountInType = "USD";
            }

            if (row.selectedIsCheck == true) {
                $scope.rec_CompanyPayment.TotalUSD = 0;
                $scope.rec_CompanyPayment.PaidAmountConversion = 0;
                $scope.rec_CompanyPayment.TotalAITConversion = 0;
                $scope.rec_CompanyPayment.TotalVATConversion = 0;
                $scope.rec_CompanyPayment.TotalAdditionalCost = 0;
                row.selectedIsCheck = true;
                if (row.VAT == undefined) {
                    row.VAT = 0;
                }

                if (row.AIT == undefined) {
                    row.AIT = 0;
                }

                paidAmount += row.PayAmount;
                $scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);

              

                // paidAmount += row.PayAmount;
                //$scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);

                // ReceivableAmount += row.PayAmount;
                if ($scope.rec_CompanyPayment.TotalVAT == undefined || $scope.rec_CompanyPayment.TotalVAT==null) {
                    $scope.rec_CompanyPayment.TotalVAT = 0;
                }
                if ($scope.rec_CompanyPayment.TotalAIT == undefined || $scope.rec_CompanyPayment.TotalAIT == null) {
                    $scope.rec_CompanyPayment.TotalAIT = 0;
                }
            
               


                $scope.rec_CompanyPayment.TotalVAT += Number(row.VAT);
                $scope.rec_CompanyPayment.TotalAIT += Number(row.AIT);
                $scope.rec_CompanyPayment.TotalAdditionalCost += Number(row.AdditionalCost);

                $scope.totatVatAmount += row.VAT;
                $scope.totalAITAmount += row.AIT;
                $scope.totalPaidAmount = paidAmount;
                $scope.totalSum += row.Total;
                //$scope.TotalAdditionalCost += row.AdditionalCost;

                //row.Total = $scope.totalPaidAmount + $scope.totatVatAmount + $scope.totalAITAmount;
                //totalAmount += row.Total;
                //$scope.totalSum = totalAmount;

                $scope.ddlCurrencyType = { CurrencyId: row.CurrencyId }
                if ($scope.ddlCurrencyType.CurrencyId == 1) {

                    if (isNaN($scope.rec_CompanyPayment.TotalVAT)) {
                        $scope.rec_CompanyPayment.TotalVAT = 0;
                    }
                    if (isNaN($scope.rec_CompanyPayment.TotalAIT)) {
                        $scope.rec_CompanyPayment.TotalAIT = 0;
                    }
                    if (isNaN($scope.rec_CompanyPayment.ConversionAmount)) {
                        $scope.rec_CompanyPayment.ConversionAmount = 0;
                    }

                    if ($scope.rec_CompanyPayment.ConvertedAmount == undefined || $scope.rec_CompanyPayment.ConvertedAmount == null) {
                        $scope.rec_CompanyPayment.ConvertedAmount = 0;
                    }
                    $scope.rec_CompanyPayment.ConvertedAmount += (row.PayAmount * 1) + Number(row.AdditionalCost);
                    $scope.TotalConversionAmount += (row.PayAmount * 1) + Number(row.AdditionalCost);
                    $scope.rec_CompanyPayment.ConversionAmount = 1;

                } else if ($scope.ddlCurrencyType.CurrencyId == 2) {
                    $scope.rec_CompanyPayment.ConversionAmount = 80;
                    if ($scope.rec_CompanyPayment.ConvertedAmount == undefined || $scope.rec_CompanyPayment.ConvertedAmount == null) {
                        $scope.rec_CompanyPayment.ConvertedAmount = 0;
                    }
                    $scope.rec_CompanyPayment.ConvertedAmount += (row.PayAmount * $scope.rec_CompanyPayment.ConversionAmount) + Number(row.AdditionalCost);

                    $scope.TotalConversionAmount += (row.PayAmount * $scope.rec_CompanyPayment.ConversionAmount) + Number(row.AdditionalCost);

                    if ($scope.rec_CompanyPayment.TotalUSD == undefined || $scope.rec_CompanyPayment.TotalUSD == 0) {
                        $scope.rec_CompanyPayment.TotalUSD = 0;
                    }
                    $scope.rec_CompanyPayment.TotalUSD +=  row.PayAmount + row.AIT + row.VAT;
                    $scope.rec_CompanyPayment.ConversionAmount = 80;

                    $scope.rec_CompanyPayment.PaidAmountConversion += row.PayAmount * $scope.rec_CompanyPayment.ConversionAmount;
                    $scope.rec_CompanyPayment.TotalAITConversion += row.AIT * $scope.rec_CompanyPayment.ConversionAmount;
                    $scope.rec_CompanyPayment.TotalVATConversion += row.VAT * $scope.rec_CompanyPayment.ConversionAmount;
                }
                $scope.totalActualamount += row.ActualAmount;
              
                $scope.isCheckArrayList.push(row);
                $scope.CompanyCurrencyList.push(row);
            }
            else {
                //$scope.rec_CompanyPayment.PaidAmount = 0;
                //$scope.rec_CompanyPayment.ConvertedAmount = 0;
                if (row.CurrencyId == 1) {
                    $scope.PayAmountInType = "BDT";
                } else {
                    $scope.PayAmountInType = "USD";
                }

                //angular.forEach($scope.CompanyCurrencyList, function (aD) {
                //    if (aD.InvoiceId == row.InvoiceId) {
                //        aD.VAT = 0;
                //        aD.AIT = 0;
                //        $scope.rec_CompanyPayment.TotalVAT -= Number(row.VAT);
                //        $scope.rec_CompanyPayment.TotalAIT -= Number(row.AIT);
                //    }
                //})
                vatAmount -= row.VAT;
                aitAmount -= row.AIT;

                //row.VAT = 0;
                //row.AIT = 0;
               
                if ($scope.rec_CompanyPayment.TotalVAT == undefined || $scope.rec_CompanyPayment.TotalVAT == null) {
                    $scope.rec_CompanyPayment.TotalVAT = 0;
                }
                if ($scope.rec_CompanyPayment.TotalAIT == undefined || $scope.rec_CompanyPayment.TotalAIT == null) {
                    $scope.rec_CompanyPayment.TotalAIT = 0;
                }

                $scope.rec_CompanyPayment.TotalVAT += Number(row.VAT);
                $scope.rec_CompanyPayment.TotalAIT += Number(row.AIT);

                $scope.rec_CompanyPayment.ConvertedAmount = 0;
                paidAmount -= row.ReceivableAmount;

                $scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);
                $scope.rec_CompanyPayment.TotalAdditionalCost -= Number(row.AdditionalCost);
                //$scope.TotalAdditionalCost -= row.AdditionalCost;

                $scope.totatVatAmount -= row.VAT;
                $scope.totalAITAmount -= row.AIT;
                $scope.totalPaidAmount = paidAmount;
                $scope.totalSum -= row.Total;
                if ($scope.ddlCurrencyType.CurrencyId == 1) {
                    $scope.rec_CompanyPayment.ConvertedAmount = ($scope.rec_CompanyPayment.PaidAmount * 1) + Number(row.AdditionalCost);
                }
                else {
                    $scope.rec_CompanyPayment.ConversionAmount = 80;
                    $scope.rec_CompanyPayment.ConvertedAmount = ($scope.rec_CompanyPayment.PaidAmount * $scope.rec_CompanyPayment.ConversionAmount)  + Number(row.AdditionalCost);

                    if ($scope.rec_CompanyPayment.TotalUSD == undefined || $scope.rec_CompanyPayment.TotalUSD == 0) {
                        $scope.rec_CompanyPayment.TotalUSD = 0;
                    }
                    $scope.rec_CompanyPayment.PaidAmountConversion += row.PayAmount * $scope.rec_CompanyPayment.ConversionAmount;
                    $scope.rec_CompanyPayment.TotalAITConversion += row.AIT * $scope.rec_CompanyPayment.ConversionAmount;
                    $scope.rec_CompanyPayment.TotalVATConversion += row.VAT * $scope.rec_CompanyPayment.ConversionAmount;

                    $scope.rec_CompanyPayment.TotalUSD -=  row.PayAmount + row.AIT + row.VAT;
                    $scope.ddlCurrencyType = { CurrencyId:2}
                }

               // row.PayAmount -= row.PayAmount;

                row.selectedIsCheck = false;


                var index = $scope.isCheckArrayList.indexOf(row);
                $scope.isCheckArrayList.splice(index, 1);

                if ($scope.ddlCurrencyType.CurrencyId == 2) {
                    $scope.ddlCurrencyType = { CurrencyId: 2 }
                }
                if ($scope.isCheckArrayList.length == 0) {
                    $scope.ddlCurrencyType = null;
                    $scope.rec_CompanyPayment.ConversionAmount = null;
                }
                //var ind = $scope.companyIsCheckPaymentCalculationList.indexOf(row);

                // $scope.companyIsCheckPaymentCalculationList.splice(ind, 1);
                //  $scope.ddlCurrencyType = null;
                // $scope.rec_CompanyPayment.ConvertedAmount = 0;

            }

        } else {

            if ($scope.CompanyCurrencyList[0].CurrencyId == row.CurrencyId) {
                if (row.selectedIsCheck == true) {
                    row.selectedIsCheck = true;

                    if (row.CurrencyId == 1) {
                        $scope.PayAmountInType = "BDT";
                    } else {
                        $scope.PayAmountInType = "USD";
                    }

                    if (row.VAT == undefined) {
                        row.VAT = 0;
                    }

                    if (row.AIT == undefined) {
                        row.AIT = 0;
                    }

                    paidAmount += row.PayAmount;
                    $scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);

                    // paidAmount += row.PayAmount;
                    //$scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);

                    // ReceivableAmount += row.PayAmount;
                    if ($scope.rec_CompanyPayment.TotalVAT == undefined || $scope.rec_CompanyPayment.TotalVAT == null) {
                        $scope.rec_CompanyPayment.TotalVAT = 0;
                    }
                    if ($scope.rec_CompanyPayment.TotalAIT == undefined || $scope.rec_CompanyPayment.TotalAIT == null) {
                        $scope.rec_CompanyPayment.TotalAIT = 0;
                    }

                    $scope.rec_CompanyPayment.TotalVAT += Number(row.VAT);
                    $scope.rec_CompanyPayment.TotalAIT += Number(row.AIT);
                    $scope.rec_CompanyPayment.TotalAdditionalCost += Number(row.AdditionalCost);


                    $scope.totatVatAmount += row.VAT;
                    $scope.totalAITAmount += row.AIT;
                    $scope.totalPaidAmount = paidAmount;

                    $scope.totalSum += row.Total;

                    $scope.ddlCurrencyType = { CurrencyId: row.CurrencyId }
                    if ($scope.ddlCurrencyType.CurrencyId == 1) {
                        if ($scope.rec_CompanyPayment.ConvertedAmount == undefined || $scope.rec_CompanyPayment.ConvertedAmount == null) {
                            $scope.rec_CompanyPayment.ConvertedAmount = 0;
                        }
                        if ($scope.rec_CompanyPayment.TotalVAT == undefined) {
                            $scope.rec_CompanyPayment.TotalVAT = 0;
                        }
                        if ($scope.rec_CompanyPayment.TotalAIT == undefined) {
                            $scope.rec_CompanyPayment.TotalAIT = 0;
                        }
                        $scope.rec_CompanyPayment.ConvertedAmount += (row.PayAmount * 1) + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT + Number(row.AdditionalCost);
                        $scope.rec_CompanyPayment.ConversionAmount = 1;

                    } else if ($scope.ddlCurrencyType.CurrencyId == 2) {
                        $scope.ddlCurrencyType = { CurrencyId: 2 }
                        $scope.rec_CompanyPayment.ConversionAmount = 80;
                        if ($scope.rec_CompanyPayment.ConvertedAmount == undefined || $scope.rec_CompanyPayment.ConvertedAmount == null) {
                            $scope.rec_CompanyPayment.ConvertedAmount = 0;
                        }
                        if (isNaN($scope.rec_CompanyPayment.TotalVAT)) {
                            $scope.rec_CompanyPayment.TotalVAT = 0;
                        }
                        if (isNaN($scope.rec_CompanyPayment.TotalAIT)) {
                            $scope.rec_CompanyPayment.TotalAIT = 0;
                        }
                        if (isNaN($scope.rec_CompanyPayment.ConversionAmount)) {
                            $scope.rec_CompanyPayment.ConversionAmount = 80;
                        }
                        $scope.rec_CompanyPayment.ConvertedAmount += (row.PayAmount + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT) * $scope.rec_CompanyPayment.ConversionAmount  + Number(row.AdditionalCost);
                        $scope.rec_CompanyPayment.TotalUSD += row.PayAmount + row.AIT + row.VAT;

                        $scope.rec_CompanyPayment.PaidAmountConversion += row.PayAmount * $scope.rec_CompanyPayment.ConversionAmount;
                        $scope.rec_CompanyPayment.TotalAITConversion += row.AIT * $scope.rec_CompanyPayment.ConversionAmount;
                        $scope.rec_CompanyPayment.TotalVATConversion += row.VAT * $scope.rec_CompanyPayment.ConversionAmount;

                        if ($scope.rec_CompanyPayment.TotalUSD == undefined || $scope.rec_CompanyPayment.TotalUSD==null) {
                            $scope.rec_CompanyPayment.TotalUSD = 0;
                        }
                       // $scope.rec_CompanyPayment.TotalUSD += row.PayAmount + row.TotalVAT + row.TotalAIT;
                        //$scope.rec_CompanyPayment.ConversionAmount = 1;
                    }
                    $scope.totalActualamount += row.ActualAmount;
                    $scope.isCheckArrayList.push(row);
                    $scope.CompanyCurrencyList.push(row);
                }
                else {
                    //$scope.rec_CompanyPayment.PaidAmount = 0;
                    //$scope.rec_CompanyPayment.ConvertedAmount = 0;
                    if (row.CurrencyId == 1) {
                        $scope.PayAmountInType = "BDT";
                    } else {
                        $scope.PayAmountInType = "USD";
                    }

                    //angular.forEach($scope.CompanyCurrencyList, function (aD) {
                    //    if (aD.InvoiceId == row.InvoiceId) {
                    //        aD.VAT = 0;
                    //        aD.AIT = 0;
                    //        $scope.rec_CompanyPayment.TotalVAT -= Number(row.VAT);
                    //        $scope.rec_CompanyPayment.TotalAIT -= Number(row.AIT);
                    //    }
                    //})
                    vatAmount -= row.VAT;
                    aitAmount -= row.AIT;
                   // row.VAT = 0;
                    //row.AIT = 0;
                    if ($scope.rec_CompanyPayment.TotalVAT == undefined || $scope.rec_CompanyPayment.TotalVAT == null) {
                        $scope.rec_CompanyPayment.TotalVAT = 0;
                    }
                    if ($scope.rec_CompanyPayment.TotalAIT == undefined || $scope.rec_CompanyPayment.TotalAIT == null) {
                        $scope.rec_CompanyPayment.TotalAIT = 0;
                    }

                    $scope.rec_CompanyPayment.TotalVAT -= Number(row.VAT);
                    $scope.rec_CompanyPayment.TotalAIT -= Number(row.AIT);
                    $scope.rec_CompanyPayment.TotalAdditionalCost -= Number(row.AdditionalCost);

                    $scope.rec_CompanyPayment.ConvertedAmount = 0;
                    paidAmount -= row.PayAmount;

                    $scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);

                    $scope.totatVatAmount -= row.VAT;
                    $scope.totalAITAmount -= row.AIT;
                    $scope.totalPaidAmount = paidAmount;

                   // totalAmount -= row.Total;
                    $scope.totalSum -= row.Total;

                    //totalAmount -= row.VAT + row.AIT + row.PayAmount;
                    //row.Total = totalAmount;

         
                    //$scope.totalSum -= row.Total;

                    if ($scope.ddlCurrencyType.CurrencyId == 1) {
                        $scope.rec_CompanyPayment.ConvertedAmount = ($scope.rec_CompanyPayment.PaidAmount * 1) + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT + $scope.rec_CompanyPayment.TotalAdditionalCost;

                    }
                    else {
                        $scope.rec_CompanyPayment.ConversionAmount = 80;
                        $scope.rec_CompanyPayment.ConvertedAmount = ($scope.rec_CompanyPayment.PaidAmount * $scope.rec_CompanyPayment.ConversionAmount) + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT + $scope.rec_CompanyPayment.TotalAdditionalCost;
                        if ($scope.rec_CompanyPayment.TotalUSD == undefined || $scope.rec_CompanyPayment.TotalUSD == null) {
                            $scope.rec_CompanyPayment.TotalUSD = 0;
                        }

                        if ($scope.rec_CompanyPayment.TotalUSD == undefined || $scope.rec_CompanyPayment.TotalUSD==0) {
                            $scope.rec_CompanyPayment.TotalUSD = 0;
                        }
                        $scope.rec_CompanyPayment.PaidAmountConversion -= row.PayAmount * $scope.rec_CompanyPayment.ConversionAmount;
                        $scope.rec_CompanyPayment.TotalAITConversion -= row.AIT * $scope.rec_CompanyPayment.ConversionAmount;
                        $scope.rec_CompanyPayment.TotalVATConversion -= row.VAT * $scope.rec_CompanyPayment.ConversionAmount;
                        $scope.rec_CompanyPayment.TotalUSD -= row.PayAmount + row.AIT + row.VAT;
                    }

                   // row.PayAmount -= row.PayAmount;




                    var index = $scope.isCheckArrayList.indexOf(row);
                    $scope.isCheckArrayList.splice(index, 1);

                    if ($scope.ddlCurrencyType.CurrencyId == 2) {
                        $scope.ddlCurrencyType = { CurrencyId: 2 }
                    }
                    if ($scope.isCheckArrayList.length == 0) {
                        $scope.ddlCurrencyType = null;
                        $scope.rec_CompanyPayment.ConversionAmount = null;
                    }
                    //var ind = $scope.companyIsCheckPaymentCalculationList.indexOf(row);

                    // $scope.companyIsCheckPaymentCalculationList.splice(ind, 1);
                    //  $scope.ddlCurrencyType = null;
                    // $scope.rec_CompanyPayment.ConvertedAmount = 0;

                }
            } else {
                row.isCheck = false;
                row.selectedIsCheck = false;
                alertify.log('You must Select Same Currency Type"!!!', 'error', '5000');
            }

            if ($scope.isCheckArrayList == null || $scope.isCheckArrayList.length==0) {
                $scope.CompanyCurrencyList = [];
            }

            //angular.forEach($scope.supplierPaymentList, function (aData) {
            //    if (aData.CurrencyId == row.CurrencyId) {
            //        aData.IsDisabled = false;
            //    } else {
            //        aData.IsDisabled = true;
            //    }

            //})

            //if ($scope.isCheckArrayList.length == 0) {
            //    angular.forEach($scope.supplierPaymentList, function (aData) {
            //        aData.IsDisabled = false;

            //    })
            //}
           
        }

    }

    $scope.DollerConversion = function () {
        if (isNaN($scope.rec_CompanyPayment.PaidAmount) || $scope.rec_CompanyPayment.PaidAmount==0) {
            $scope.rec_CompanyPayment.PaidAmount = 0;
        }
        if (isNaN($scope.rec_CompanyPayment.TotalVAT) || $scope.rec_CompanyPayment.TotalVAT == 0) {
            $scope.rec_CompanyPayment.TotalVAT = 0;
        }
        if (isNaN($scope.rec_CompanyPayment.TotalAIT) || $scope.rec_CompanyPayment.TotalAIT == 0) {
            $scope.rec_CompanyPayment.TotalAIT = 0;
        }


        $scope.rec_CompanyPayment.ConvertedAmount = ($scope.rec_CompanyPayment.PaidAmount + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT) * $scope.rec_CompanyPayment.ConversionAmount;
        if ($scope.rec_CompanyPayment.TotalUSD == undefined || $scope.rec_CompanyPayment.TotalUSD == null) {
            $scope.rec_CompanyPayment.TotalUSD = 0;
        }
        $scope.rec_CompanyPayment.PaidAmountConversion = $scope.rec_CompanyPayment.PaidAmount * $scope.rec_CompanyPayment.ConversionAmount;
        $scope.rec_CompanyPayment.TotalAITConversion = $scope.rec_CompanyPayment.TotalVAT * $scope.rec_CompanyPayment.ConversionAmount;
        $scope.rec_CompanyPayment.TotalVATConversion = $scope.rec_CompanyPayment.TotalAIT * $scope.rec_CompanyPayment.ConversionAmount;

        $scope.rec_CompanyPayment.TotalUSD = $scope.rec_CompanyPayment.PaidAmount + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT;
    }

    //$scope.UpdateAmount = function () {

        

    //    if ($scope.isCheckArrayList.length > 0 ) {
    //        $scope.isPayListShow = true;
    //        CheckValueAndPayvalue();
    //    } else {
    //        alertify.log('Paid Amount at least One Manadatory !!!', 'error', '5000');
    //    }

    //    if ($scope.ddlCompany == null) {
    //        alertify.log('Please Must be select in Company !!!', 'error', '5000');
    //    }

    //}

    //$scope.vatAitCalculation = function (comObj) {
    //    $scope.rec_CompanyPayment.TotalVAT = 0;
    //    $scope.rec_CompanyPayment.TotalAIT = 0;

    //    if (comObj.VAT == null || comObj.VAT == undefined) {
    //        comObj.VAT = 0;
    //        // $scope.rec_CompanyPayment.TotalVAT = 0;
    //    }
    //    if (comObj.AIT == null || comObj.AIT == undefined) {
    //        comObj.AIT = 0;
    //        //$scope.rec_CompanyPayment.TotalAIT = 0;
    //    }

       
    //}

    $scope.VatAitValidation = function (companies) {
        var TotalAit = companies.PayableAmount - companies.VAT;
        var TotalVat = companies.PayableAmount - companies.AIT;

        if (TotalVat >= companies.VAT) {

        } else {
            companies.VAT = 0;
            alertify.log('VAT Amount greater than receive amount !!!', 'error', '5000');
        }
        if (TotalAit >= companies.AIT) {

        } else {
            companies.AIT = 0;
            alertify.log('AIT Amount greater than receive amount !!!', 'error', '5000');
        }


       
    }

   

    $scope.PayAmountValidationCheck = function (companies) {


        $scope.TempPayAmount = 0;
        $scope.PayAmountAITSDCal = 0;
        $scope.rec_CompanyPayment.PaidAmount = 0;
        $scope.TempPayAmount = angular.copy(companies.PayAmount)
        //companies.PayAmount = 0;
        $scope.ddlCurrencyType = { CurrencyId: companies.CurrencyId }

        $scope.TempPayAmount = 0;
        if (companies.ReceivableAmount >= companies.PayableAmount ) {

            var AitVat = companies.VAT + companies.AIT;
            $scope.TempPayAmount = companies.PayableAmount - AitVat;
            companies.PayAmount = angular.copy($scope.TempPayAmount);

        } else {
            companies.PayableAmount = companies.ReceivableAmount;
            companies.PayAmount = companies.ReceivableAmount;
            companies.AIT = 0;
            companies.VAT = 0;
            alertify.log('Receivable Amount greater than Pay Amount !!!', 'error', '5000');
        }
      



        //if (companies.PayAmount <= companies.ReceivableAmount) {
        //       if (companies.VAT != 0 || companies.AIT != 0) {
        //                    if (companies.PayAmount > 0) {
        //                        var AitVat = companies.VAT + companies.AIT;
        //                         $scope.TempPayAmount = companies.PayAmount - AitVat;
        //                         companies.PayAmount = angular.copy($scope.TempPayAmount);
        //                    } else {
        //                        companies.PayAmount = null;
        //                        companies.AIT = 0;
        //                        companies.VAT = 0;
        //                    }
        //            }
                  
        //        } else {
        //            companies.PayAmount = companies.ReceivableAmount;
        //            companies.AIT = 0;
        //            companies.VAT = 0;
        //            alertify.log('Receivable Amount greater than Pay Amount !!!', 'error', '5000');
        //        }
            

       
       
    
   
        //$scope.PayAmountAITSDCal = 0;
        //if (companies.PayAmount == undefined) {
        //    companies.PayAmount = 0;
        //}

        //if (companies.PayAmount > 0) {

        //    if (companies.ReceivableAmount >= companies.PayAmount) {
               
        //        if ((companies.PayAmount > companies.VAT || companies.VAT) && (companies.PayAmount > companies.AIT || companies.AIT == undefined)) {
        //            $scope.PayAmountAITSDCal = (companies.PayAmount - companies.VAT) - companies.AIT;
        //            companies.PayAmount = $scope.PayAmountAITSDCal;
                    
        //        } else {
        //            companies.VAT = null;
        //            companies.AIT = null;
        //        }




        //    } else {
        //        companies.PayAmount = null;
        //        alertify.log('Receivable Amount greater than Pay Amount !!!', 'error', '5000');

        //    }

        //} else {
        //    companies.PayAmount = null;
        //}
      
      
       

        paidAmount = 0;
        vatAmount = 0;
        aitAmount = 0;
        totalAmount = 0;
        $scope.rec_CompanyPayment.TotalVAT = 0;
        $scope.rec_CompanyPayment.TotalAIT = 0;
        $scope.rec_CompanyPayment.PaidAmountConversion =0;
        $scope.rec_CompanyPayment.TotalAITConversion = 0;
        $scope.rec_CompanyPayment.TotalVATConversion =0;
        $scope.totalSum = 0;
     
        angular.forEach($scope.isCheckArrayList, function (aData) {
          
            if (aData.selectedIsCheck == companies.selectedIsCheck) {

                vatAmount += aData.VAT;
                aitAmount += aData.AIT;

             
              //  totalAmount += aData.Total + vatAmount + aitAmount;

             
              

                $scope.rec_CompanyPayment.TotalVAT = Number(vatAmount);
                $scope.rec_CompanyPayment.TotalAIT = Number(aitAmount);

               

              
                //ReceivableAmount
                paidAmount += aData.PayAmount;

                //$scope.rec_CompanyPayment.TotalAITConversion = vatAmount * $scope.rec_CompanyPayment.ConversionAmount;
                //$scope.rec_CompanyPayment.TotalVATConversion = aitAmount * $scope.rec_CompanyPayment.ConversionAmount;
                //$scope.rec_CompanyPayment.PaidAmountConversion = paidAmount * $scope.rec_CompanyPayment.ConversionAmount;

                $scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);

                if (companies.InvoiceId == aData.InvoiceId) {
                    totalAmount += aData.VAT + aData.AIT + aData.PayAmount;
                    aData.Total = totalAmount;
                   
                }
                $scope.totalSum += aData.Total;

                $scope.totatVatAmount = vatAmount;
                $scope.totalAITAmount = aitAmount;
                $scope.totalPaidAmount = paidAmount;
               // $scope.totalSum = totalAmount;

              

                if ($scope.ddlCurrencyType.CurrencyId == 1) {
                    $scope.rec_CompanyPayment.ConvertedAmount = ($scope.rec_CompanyPayment.PaidAmount * 1) + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT;
                   
                }
                else {
                    if ($scope.rec_CompanyPayment.ConversionAmount == null || $scope.rec_CompanyPayment.ConversionAmount == undefined) {
                       
                        $scope.rec_CompanyPayment.ConvertedAmount = $scope.rec_CompanyPayment.PaidAmount * 80;
                    } else {

                        $scope.rec_CompanyPayment.ConvertedAmount = ($scope.rec_CompanyPayment.PaidAmount + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT) * $scope.rec_CompanyPayment.ConversionAmount;

                        if ($scope.rec_CompanyPayment.TotalUSD == undefined || $scope.rec_CompanyPayment.TotalUSD == null) {
                            $scope.rec_CompanyPayment.TotalUSD = 0;
                        }
                        $scope.rec_CompanyPayment.TotalUSD = $scope.rec_CompanyPayment.PaidAmount + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT;
                    }

                    $scope.rec_CompanyPayment.TotalAITConversion = vatAmount * $scope.rec_CompanyPayment.ConversionAmount;
                    $scope.rec_CompanyPayment.TotalVATConversion = aitAmount * $scope.rec_CompanyPayment.ConversionAmount;
                    $scope.rec_CompanyPayment.PaidAmountConversion = paidAmount * $scope.rec_CompanyPayment.ConversionAmount;
                  
                }
               

             
            } else {

               

                if (aData.isCheck != false) {
                    if (aData.selectedIsCheck != undefined || aData.selectedIsCheck != null) {

                        vatAmount -= aData.VAT;
                        aitAmount -= aData.AIT;
                        totalAmount -= aData.Total

                        $scope.rec_CompanyPayment.TotalVAT = Number(vatAmount);
                        $scope.rec_CompanyPayment.TotalAIT = Number(aitAmount);


                        paidAmount -= aData.PayAmount;
                        $scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);

                        $scope.totatVatAmount = vatAmount;
                        $scope.totalAITAmount = aitAmount;
                        $scope.totalPaidAmount = paidAmount;

                        aData.Total = paidAmount + vatAmount + aitAmount;
                        totalAmount += aData.Total;
                        $scope.totalSum = totalAmount;


                        $scope.rec_CompanyPayment.TotalAITConversion = vatAmount * $scope.rec_CompanyPayment.ConversionAmount;
                        $scope.rec_CompanyPayment.TotalVATConversion = aitAmount * $scope.rec_CompanyPayment.ConversionAmount;
                        $scope.rec_CompanyPayment.PaidAmountConversion = paidAmount * $scope.rec_CompanyPayment.ConversionAmount;

                        if ($scope.ddlCurrencyType.CurrencyId == 2) {
                            $scope.rec_CompanyPayment.ConvertedAmount -= $scope.rec_CompanyPayment.PaidAmount * 80;
                        }
                        else {
                            $scope.rec_CompanyPayment.ConvertedAmount -= $scope.rec_CompanyPayment.PaidAmount * 1;
                        }
                    }
                }
                
               

               
            }
        })

        
       

        //if (companies.isCheck == true) {
          
        //    paidAmount += companies.PayAmount;
        //    $scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);
        //} else {
        //    paidAmount -= companies.PayAmount;
        //    $scope.rec_CompanyPayment.PaidAmount = Number(paidAmount);
        //}
        
    }
    //Conversion Rate Calculation=======

    $scope.AmountConversionMethod = function () {

        //if ($scope.rec_CompanyPayment.ConversionAmount != null || $scope.rec_CompanyPayment.ConversionAmount != undefined) {
        //    $scope.rec_CompanyPayment.ConvertedAmount;
        //} else {
        //    $scope.rec_CompanyPayment.ConvertedAmount = 0;
        //    alertify.log('Conversion Rate Must Be Entry Amount !!!', 'error', '5000');
        //}

        //if ($scope.ddlCurrencyType.CurrencyId == 2) {
 
        //    $scope.rec_CompanyPayment.ConvertedAmount = $scope.rec_CompanyPayment.PaidAmount * $scope.rec_CompanyPayment.ConversionAmount;

        //} else if ($scope.ddlCurrencyType.CurrencyId == 1) {
           
        //    $scope.rec_CompanyPayment.ConversionAmount = 0;
        //    if ($scope.rec_CompanyPayment.PaidAmount != undefined || $scope.rec_CompanyPayment.PaidAmount != null) {

        //        $scope.rec_CompanyPayment.ConvertedAmount = $scope.rec_CompanyPayment.PaidAmount * 1;
        //        $scope.rec_CompanyPayment.ConversionAmount = 1;
               
        //    }

        //}
    }

    $scope.AmountConversionCurrency = function (curr) {
       
        if (curr.CurrencyId == 2) {
            $scope.rec_CompanyPayment.ConversionAmount = 80;
            $scope.rec_CompanyPayment.ConvertedAmount = $scope.rec_CompanyPayment.PaidAmount * $scope.rec_CompanyPayment.ConversionAmount;
          

        } else if (curr.CurrencyId == 1) {

            $scope.rec_CompanyPayment.ConversionAmount = 0;
            if ($scope.rec_CompanyPayment.PaidAmount != undefined || $scope.rec_CompanyPayment.PaidAmount != null) {

                $scope.rec_CompanyPayment.ConvertedAmount = $scope.rec_CompanyPayment.PaidAmount * 1;
                $scope.rec_CompanyPayment.ConversionAmount = 1;

            }

        }
    }

    $scope.TitAndVatCal = function () {
        
        if ($scope.rec_CompanyPayment.TotalVAT != undefined || $scope.rec_CompanyPayment.TotalAIT != undefined) {
            $scope.rec_CompanyPayment.ConvertedAmount = ($scope.rec_CompanyPayment.PaidAmount * $scope.rec_CompanyPayment.ConversionAmount) + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT;

            if ($scope.rec_CompanyPayment.TotalUSD == undefined || $scope.rec_CompanyPayment.TotalUSD == null) {
                $scope.rec_CompanyPayment.TotalUSD = 0;
            }

            $scope.rec_CompanyPayment.TotalUSD = $scope.rec_CompanyPayment.PaidAmount + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT;
        } else {
            if ($scope.rec_CompanyPayment.TotalVAT == undefined || $scope.rec_CompanyPayment.TotalVAT==null) {
                $scope.rec_CompanyPayment.TotalVAT = 0;
            }
            if ($scope.rec_CompanyPayment.TotalAIT == undefined || $scope.rec_CompanyPayment.TotalAIT == null) {
                $scope.rec_CompanyPayment.TotalAIT = 0;
            }
            $scope.rec_CompanyPayment.ConvertedAmount = ($scope.rec_CompanyPayment.PaidAmount * $scope.rec_CompanyPayment.ConversionAmount) + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT;
            if ($scope.rec_CompanyPayment.TotalUSD == undefined || $scope.rec_CompanyPayment.TotalUSD == null) {
                $scope.rec_CompanyPayment.TotalUSD = 0;
            }
            $scope.rec_CompanyPayment.TotalUSD = $scope.rec_CompanyPayment.PaidAmount + $scope.rec_CompanyPayment.TotalVAT + $scope.rec_CompanyPayment.TotalAIT;
        }
     }
       
    //function CheckValueAndPayvalue() {

    //    $scope.companyIsCheckPaymentCalculationList = [];
    //    $scope.updatePaidlist = $scope.isCheckArrayList;

    //    $scope.paidAmmountTemp = 0;
    //    $scope.paid = 0;
    //    $scope.paid = $scope.rec_CompanyPayment.PaidAmount;

    //    $scope.VatAmount = 0;
    //    $scope.VatAmount = $scope.rec_CompanyPayment.TotalVAT;

    //    $scope.AitAmount = 0;
    //    $scope.AitAmount = $scope.rec_CompanyPayment.TotalAIT;

    //    angular.forEach($scope.updatePaidlist, function (aData) {

    //        if ($scope.paid != 0) {

    //            if (aData.ActualAmount <= $scope.paid) {
    //                aData.PaidAmount = aData.ActualAmount;
    //            } else {
    //                aData.PaidAmount = ($scope.paid).toFixed(2);
    //                $scope.paid = 0;
    //            }
    //        }
    //        else {
    //            $scope.paid = 0;
              
    //            $scope.paidAmmountTemp = Number(aData.PaidAmount);
    //            aData.PaidAmount = $scope.paidAmmountTemp;
    //            aData.PaidAmount = $scope.paid.toFixed(2);
    //        }
    //        aData.VAT = $scope.VatAmount;
    //        aData.AIT = $scope.AitAmount;
    //        aData.IsLocalSales = $scope.IsCompanyType;
    //        $scope.rec_CompanyPayment.CompanyId = aData.CompanyId;
          


    //        $scope.companyIsCheckPaymentCalculationList.push(aData);


           

    //    });



    //}


    //function CheckValueAndPayvalue() {

       

    //    $scope.vatAmount = 0;
    //    $scope.aitAmountUp = 0;
     
    //    $scope.isPaidPaymentAmount = true;
     
    //    $scope.paidAmmount = 0;

    //    $scope.paid = 0;
      
    //    $scope.paid = $scope.rec_CompanyPayment.ConvertedAmount;


       

    //    if ($scope.rec_CompanyPayment.TotalAIT == undefined || $scope.rec_CompanyPayment.TotalAIT==null) {
    //        $scope.rec_CompanyPayment.TotalAIT = 0;
    //    }
    //    if ($scope.rec_CompanyPayment.TotalVAT == 0 || $scope.rec_CompanyPayment.TotalVAT == undefined) {
    //        $scope.rec_CompanyPayment.TotalVAT = 0;
    //    }

    //    $scope.vatAmount = $scope.rec_CompanyPayment.TotalAIT;
    //    $scope.aitAmount = $scope.rec_CompanyPayment.TotalVAT;

    //    $scope.TotalConvertedAmount = $scope.rec_CompanyPayment.ConvertedAmount;
        
    //    $scope.companyIsCheckPaymentCalculationList = [];
    //    angular.forEach($scope.isCheckArrayList, function (aData) {
           
    //      //  $scope.TotalConvertedAmount = ($scope.rec_CompanyPayment.ConvertedAmount / $scope.isCheckArrayList.length);
    //        //var TotalConversion = $scope.rec_CompanyPayment.ConvertedAmount;
    //        aData.PaidAmountInBDT = $scope.TotalConvertedAmount;
    //        var conversionAmountInBDT = 0;
    //        if ($scope.ddlCurrencyType.CurrencyId == 2) {
    //            conversionAmountInBDT = aData.ReceivableAmount * $scope.rec_CompanyPayment.ConversionAmount;
    //        } else {
    //            conversionAmountInBDT = aData.ReceivableAmount * 1;
    //        }


    //     //   if ($scope.paid != 0 || $scope.paid == 0 ) {
    //            var payamountObject = {};
    //            payamountObject.InvoiceNo = aData.InvoiceNo;
    //            if (aData.ActualAmount <= $scope.paid) {
    //                aData.PaidAmount = (aData.ActualAmount).toFixed(2);
    //                payamountObject.PaidAmount = aData.PaidAmount - aData.ReceivableAmount;
    //                payamountObject.ActualAmount = aData.ActualAmount;
                
    //                $scope.paid = $scope.paid - aData.ActualAmount;
    //            }

    //            else if (aData.ActualAmount >= $scope.paid) {
    //                aData.PaidAmount = (aData.ActualAmount).toFixed(2);
    //                payamountObject.PaidAmount = aData.PaidAmount - aData.ReceivableAmount;
    //                payamountObject.ActualAmount = aData.ActualAmount;

    //                $scope.paid = $scope.paid - aData.ActualAmount;
    //            }
    //            else {
    //                aData.PaidAmount = ($scope.paid).toFixed(2);
    //                payamountObject.PaidAmount = aData.PaidAmount;
    //                payamountObject.PaidAmount = aData.PaidAmount - aData.ReceivableAmount;
                  
    //                $scope.paid = 0;
    //            }

    //        //}
    //        //else {
    //        //    $scope.paid = 0;
    //        //    aData.PaidAmount = ($scope.paid).toFixed(2);

    //        //}


           
    //            if (conversionAmountInBDT <= $scope.TotalConvertedAmount) {
    //                aData.TotalConvertAmountInBDT = (conversionAmountInBDT).toFixed(2);
    //                payamountObject.AmountInBDT = Number(aData.TotalConvertAmountInBDT);
    //                payamountObject.ReceivableAmount = aData.ReceivableAmount;

                   
    //                $scope.TotalConvertedAmount = $scope.TotalConvertedAmount - conversionAmountInBDT;

    //            }
    //            else if ($scope.TotalConvertedAmount <= 0) {
    //                aData.TotalConvertAmountInBDT = ($scope.TotalConvertedAmount).toFixed(2);
    //                payamountObject.AmountInBDT = Number($scope.TotalConvertedAmount);
    //                payamountObject.ReceivableAmount = aData.ReceivableAmount;
    //            }
    //            else {

    //                // aData.TotalConvertAmountInBDT = ($scope.TotalConvertedAmount).toFixed(2);
    //                aData.TotalConvertAmountInBDT = ($scope.TotalConvertedAmount).toFixed(2);
    //                payamountObject.ReceivableAmount = aData.ReceivableAmount;
    //                payamountObject.AmountInBDT = Number($scope.TotalConvertedAmount);
    //                $scope.TotalConvertedAmount = 0;
                   
    //            }
           

           


    //        //Paid Amount Zero
            


    //         aData.IsLocalSale = $scope.IsCompanyType;
    //         payamountObject.InvoiceId = aData.InvoiceId;
    //         payamountObject.AIT = $scope.rec_CompanyPayment.TotalAIT;
    //         payamountObject.VAT = $scope.rec_CompanyPayment.TotalVAT;

    //        $scope.companyIsCheckPaymentCalculationList.push(payamountObject);


        
           

    //    });



    //}


    $scope.PayAmountInBDTCheck = function (company) {

        if (company.ReceivableAmount >= company.AmountInBDT) {
            company.AmountInBDT;

        } else {
            company.AmountInBDT = 0;
            alertify.log('Receivable Amount  greater than Blance Amount !!!', 'error', '5000');
        }
    }
    function PostCompanyPayment() {

        var mobileBankingValidation = true;
        var ConversionRate = true;
        var chequevalidation = true;
        if ($scope.ddlPayment.PaymentTypeId == 4) {
            if ($scope.ddlServiceName == null || $scope.ddlServiceName == undefined) {
                $scope.rec_CompanyPayment.MobileBankingServiceId = 0;
            } else {
                $scope.rec_CompanyPayment.MobileBankingServiceId = $scope.ddlServiceName.PaymentSubTypeId;
            }
            if ($scope.rec_CompanyPayment.MobileNo == "" || $scope.rec_CompanyPayment.MobileNo == undefined || $scope.rec_CompanyPayment.MobileNo == null) {
                //$scope.rec_CompanyPayment.MobileNo = "";
                mobileBankingValidation = false;
                alertify.log('MobileNo is Required !!!', 'error', '5000');
            }
            if ($scope.rec_CompanyPayment.TransactionNo == "" || $scope.rec_CompanyPayment.TransactionNo == undefined || $scope.rec_CompanyPayment.TransactionNo == null) {
                //$scope.rec_CompanyPayment.TransactionNo = "";
                mobileBankingValidation = false;
                alertify.log('TransactionNo is Required !!!', 'error', '5000');
            }
            if ($scope.ddlServiceName == undefined || $scope.ddlServiceName == null) {
                //$scope.rec_CompanyPayment.TransactionNo = "";
                mobileBankingValidation = false;
                alertify.log('Mobile Banking Name is Required !!!', 'error', '5000');
            }
           

        }

        

        if ($scope.ddlPayment.PaymentTypeId == 3) {

            if ($scope.rec_CompanyPayment.ChequeDate == "" || $scope.rec_CompanyPayment.ChequeDate == undefined || $scope.rec_CompanyPayment.ChequeDate == null) {

                chequevalidation = false;
                alertify.log('ChequeDate is Required !!!', 'error', '5000');
            }
            if ($scope.ddlChequeType == undefined || $scope.ddlChequeType == null) {
                chequevalidation = false;
                alertify.log('Cheque Name is Required !!!', 'error', '5000');
            }
        }

        if ($scope.rec_CompanyPayment.ChequeDate == undefined || $scope.rec_CompanyPayment.ChequeDate == "") {
            $scope.rec_CompanyPayment.ChequeDate = null;
        }
        $scope.rec_CompanyPayment.PaymentTypeId = $scope.ddlPayment.PaymentTypeId;
     
        $scope.rec_CompanyPayment.IsCheque = false;
        $scope.rec_CompanyPayment.CompanyId = $scope.ddlCompany.CompanyId;
        if ($scope.rec_CompanyPayment.PaymentDate == undefined || $scope.rec_CompanyPayment.PaymentDate == null) {
            alertify.log('Payment Date is Required !!!', 'error', '5000');
        }
      
     

        if ($scope.ddlChequeType == undefined || $scope.ddlChequeType == null) {
            $scope.rec_CompanyPayment.ChequeTypeId = 0;
        } else {
            $scope.rec_CompanyPayment.ChequeTypeId = $scope.ddlChequeType.PaymentSubTypeId;
        }

        if ($scope.ddlBranch == undefined || $scope.ddlBranch == null) {
            $scope.rec_CompanyPayment.BranchId = 0;
        } else {
            $scope.rec_CompanyPayment.BranchId = $scope.ddlBranch.BranchId;
        }

        $scope.rec_CompanyPayment.CurrencyId = $scope.ddlCurrencyType.CurrencyId;
        $scope.rec_CompanyPayment.ConversionRate = $scope.rec_CompanyPayment.ConversionAmount;
      //  $scope.rec_CompanyPayment.ConversionAmount = $scope.rec_CompanyPayment.ConvertedAmount;

        $scope.PaymentDetailListFilterWithSave = [];
        // isCheckArrayList
        var totalAmount = 0;
        angular.forEach($scope.isCheckArrayList, function (aData) {
            var PaymentObj = {};
            PaymentObj.VAT = aData.VAT;
            PaymentObj.AIT = aData.AIT;
            PaymentObj.PaidAmount = aData.PayAmount;
            PaymentObj.ReceivableAmount = aData.ReceivableAmount;
            PaymentObj.ActualAmount = aData.ActualAmount;
            PaymentObj.InvoiceId = aData.InvoiceId;
            PaymentObj.AdditionalCost = aData.AdditionalCost;
            totalAmount += aData.PayAmount
            PaymentObj.IsLocalSale = false;
            PaymentObj.IsVDS = aData.IsVDS;
            $scope.PaymentDetailListFilterWithSave.push(PaymentObj);
        });

        var flag = false;
        if (totalAmount == $scope.rec_CompanyPayment.PaidAmount) {
            flag = true;
        }
        $scope.rec_CompanyPayment.ConversionAmount = 0;
        
       // $scope.rec_CompanyPayment.ConversionAmount = $scope.rec_CompanyPayment.ConvertedAmount;
        $scope.rec_CompanyPayment.ConversionAmount = 0;
        $scope.rec_CompanyPayment.UpdatorId = $scope.LoginUser.UserId;
        var prams = JSON.stringify({ _rcv_CompanyPayment: $scope.rec_CompanyPayment, _rcv_CompanyPaymentDetail: $scope.PaymentDetailListFilterWithSave });

      
        ///  if ($scope.companyIsCheckPaymentCalculationList.length > 0 || $scope.companyIsCheckPaymentCalculationList.length == null) {

            if ($scope.ddlPayment.PaymentTypeId == 4) {

                if (mobileBankingValidation) {
                    SavePayment(prams);
                }
            } else if ($scope.ddlPayment.PaymentTypeId == 3) {
                if (chequevalidation) {
                    SavePayment(prams);
                }
            }
            else {
                SavePayment(prams);
            }
       
       
      
    }

    $scope.CompanyPaymentSave = function () {
       
        var totalAmount = 0;
        angular.forEach($scope.isCheckArrayList, function (aData) {
            var PaymentObj = {};
            PaymentObj.VAT = aData.VAT;
            PaymentObj.AIT = aData.AIT;
            PaymentObj.PaidAmount = aData.PayAmount;
            PaymentObj.ReceivableAmount = aData.ReceivableAmount;
            PaymentObj.ActualAmount = aData.ActualAmount;
            PaymentObj.InvoiceId = aData.InvoiceId;
            totalAmount += aData.PayAmount
            PaymentObj.IsLocalSale = false;
           // $scope.PaymentDetailListFilterWithSave.push(PaymentObj);
        });

        var flag = false;
        var flag2 = true;
        if (totalAmount == $scope.rec_CompanyPayment.PaidAmount) {
            flag = true;
        }
        if ($scope.rec_CompanyPayment.ConversionAmount == null || $scope.rec_CompanyPayment.ConversionAmount == undefined) {
            flag2 = false;
        }
        //if ($scope.rec_CompanyPayment.ConversionAmount==0) {
        //    flag2 = false;
        //}

        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.rec_CompanyPayment.CompanyPaymentId == 0 && $scope.CreatePermission) {

                if (flag) {

                    if (flag2) {
                        alertify.confirm("Are you sure to save?", function (e) {
                            if (e) {
                                PostCompanyPayment();
                            }
                        })
                    } else {
                        alertify.log('Conversion rate must be entry', 'error', '5000');
                    }
                   
                } else {
                    alertify.log('Pay Amount Are not Same in Total Paid Amount', 'error', '5000');
                }
              

            }
            else if ($scope.rec_CompanyPayment.CompanyPaymentId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rec_CompanyPayment.CompanyPaymentId > 0 && $scope.RevisePermission) {
                if (flag) {
                    alertify.confirm("Are you sure to update?", function (e) {
                        if (e) {
                            PostCompanyPayment();
                        }
                    })
                } else {
                    alertify.log('Pay Amount Are not Same in Total Paid Amount', 'error', '5000');
                }
               
            }
            else if ($scope.rec_CompanyPayment.CompanyPaymentId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.rec_CompanyPayment.CompanyPaymentId == 0 && $scope.CreatePermission) {

                if (flag) {
                    alertify.confirm("Are you sure to update?", function (e) {
                        if (e) {
                            PostCompanyPayment();
                        }
                    })
                } else {
                    alertify.log('Pay Amount Are not Same in Total Paid Amount', 'error', '5000');
                }

                
            }
            else if ($scope.rec_CompanyPayment.CompanyPaymentId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rec_CompanyPayment.CompanyPaymentId > 0 && $scope.RevisePermission) {
                if (flag) {
                    alertify.confirm("Are you sure to Save?", function (e) {
                        if (e) {
                            PostCompanyPayment();
                        }
                    })
                } else {
                    alertify.log('Pay Amount Are not Same in Total Paid Amount', 'error', '5000');
                }
                
            }
            else if ($scope.rec_CompanyPayment.CompanyPaymentId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }


        
      
    }
    $scope.SaveCompanyOpeningPayment = function () {
        SavePayment();
    }
    function SavePayment(prams) {
        

        if ($scope.IsOpeningPayment == true) {

            $scope.rec_CompanyPayment.UpdatedBy = $scope.LoginUser.UserId;
            $scope.rec_CompanyPayment.CompanyId = $scope.ddlOpeningCompany.CompanyId;
            $scope.rec_CompanyPayment.PaymentTypeId = $scope.ddlPayment.PaymentTypeId;
            $scope.rcv_CompanyOpeningBalancePayment = $scope.rec_CompanyPayment;
            $scope.rcv_CompanyOpeningBalancePayment.CompanyOpeningPaymentNo = $scope.CompanyOpeningPaymentNo;

            alertify.confirm("Are you sure to save?", function (e) {

                if (e) {
                    $http({
                        url: "/CompanyPayment/SaveCompanyOpeningPayment",
                        method: "POST",
                        data: JSON.stringify({ rcv_CompanyOpeningBalancePayment: $scope.rcv_CompanyOpeningBalancePayment }),
                    }).success(function (data) {
                        if (data > 0) {
                            $('#OpeningCompanySelect2').select2('destroy');
                            $('#OpeningCompanySelect2').val('').select2({
                                placeholder: "Select Opening Company",
                                theme: "classic",
                                dropdownAutoWidth: false
                            });
                            alertify.log('Company Payment Save Successfully!', 'success', '5000');

                            Clear();

                            //$scope.supplierIsCheckPaymentCalculationList = [];
                            //$scope.checqueShowDiv = false;
                            //$scope.suplierPaymentDetailList = [];
                            //$scope.isCheckArrayList = [];
                        }

                        else {
                            alertify.log('Server Errors!', 'error', '5000');
                        }

                    })
                }

            });

        }
        else {
            $http({
                url: "/CompanyPayment/CompanyPaymentSave",
                method: "POST",
                data: prams
            }).success(function (data) {

                if (data > 0) {
                    alertify.log('Supplier Payment ' + status + ' Successfully!', 'success', '5000');
                    Clear();

                }
                else {
                    alertify.log('Server Errors!', 'error', '5000');
                }

            })
        }
    }



    $scope.Reset = function () {
      //  document.getElementById("paymentbtn").disabled = true;
      //  document.getElementById("companyLoadId").disabled = true;
        $scope.ColDynamicRemarks = "col-md-5";
        $scope.isCheckArrayList = [];
        $scope.companyIsCheckPaymentCalculationList = [];
        $scope.isPayListShow = false;
        $scope.companyIsCheckPaymentCalculationList = [];
        $scope.CompanyPaymentList = [];
       
        $('#companySelect2').select2('destroy');
        $('#companySelect2').val('').select2({
            placeholder: "--- Select Company---"
        });

        CompanyPayment();
        $scope.ddlCiOrdSalesInvoice = null;
        $scope.ddlPayment = null;
        $scope.BankAccountList = [];

        $scope.CompanyPaymentList = [];
        $scope.rec_CompanyPayment.PaidAmount = 0;
        $scope.rec_CompanyPayment.ConvertedAmount = 0;
        $scope.ddlCurrencyType = null;
        
    }

    function CompanyPayment() {
        $scope.rec_CompanyPayment.ConversionAmount = 0;
        $scope.rec_CompanyPayment.TotalAIT = 0;
        $scope.rec_CompanyPayment.TotalVAT = 0;
        $scope.rec_CompanyPayment.PaidAmount = 0;
        $scope.rec_CompanyPayment.ConvertedAmount = 0;
        $scope.ddlCurrencyType = null;
    }


    $("#txtFromDateForPB").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForPB = function () {
        $("#txtFromDateForPB").focus();
        $("#txtFromDateForPB").trigger("click");
    }


    $("#txtToDateForPB").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForPB = function () {
        $("#txtToDateForPB").focus();
        $("#txtToDateForPB").trigger("click");
    }



    $("#txtFromDateForPBOpening").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForPBOpening = function () {
        $("#txtFromDateForPBOpening").focus();
        $("#txtFromDateForPBOpening").trigger("click");
    }


    $("#txtToDateForPBOpening").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForPBOpening = function () {
        $("#txtToDateForPBOpening").focus();
        $("#txtToDateForPBOpening").trigger("click");
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForPB').val('');
        $('#txtToDateForPB').val('');
        $('#PBAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchPBAndCompanyName = null;
        CompanyPaymentPaged(1);
    }
    $scope.reloadBtnOpening = function () {
        $('#txtFromDateForPBOpening').val('');
        $('#txtToDateForPBOpening').val('');
        $('#PBAndCompanyOpening').val('');
        $scope.FromDateOpening = "";
        $scope.ToDateOpening = "";
        $scope.SearchPBAndCompanyNameOpening = null;
        CompanyOpeningPaymentPaged(1);
    }

    $scope.CPSearch = function () {
        CompanyPaymentPaged(1);

    }
    $scope.CPSearchOpening = function () {
        CompanyOpeningPaymentPaged(1);

    }

    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            CompanyPaymentPaged(curPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            CompanyPaymentPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            CompanyPaymentPaged($scope.currentPage);
        }
    
    }
    $scope.getDataOpening = function (curPageOpening) {
        if ($scope.PerPageOpening > 100) {
            $scope.PerPageOpening = 100;
            $scope.currentPageOpening = curPageOpening;
            CompanyOpeningPaymentPaged(curPageOpening);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPageOpening < 1) {
            $scope.PerPageOpening = 1;
            $scope.currentPageOpening = curPageOpening;
            CompanyOpeningPaymentPaged($scope.currentPageOpening);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPageOpening = curPageOpening;
            CompanyOpeningPaymentPaged($scope.currentPageOpening);
        }
    
    }
    function CompanyPaymentPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForPB").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForPB").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchPBAndCompanyName != undefined && $scope.SearchPBAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([CP].[PaymentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([CP].[ReceiptVoucherNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [C].[CompanyName] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [CP].[CompanyPaymentNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%')";

        }
        else if ($scope.SearchPBAndCompanyName !== undefined && $scope.SearchPBAndCompanyName != null && $scope.SearchPBAndCompanyName != "") {
            SearchCriteria = "[CP].[ReceiptVoucherNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [C].[CompanyName] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [CP].[CompanyPaymentNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[CP].[PaymentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }
        $http({
            url: encodeURI('/CompanyPayment/CompanyPaymentGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.ListData.length != 0 || data.ListData.length != undefined || data.ListData.length != null ) {
               $scope.companyPaymentGetPagedList = data.ListData;

               $scope.total_count = data.TotalRecord;

                if ($scope.companyPaymentGetPagedList.length > 0) {

                    angular.forEach($scope.companyPaymentGetPagedList, function (aSd) {
                       if (aSd.ChequeNo == '' || aSd.ChequeNo==null) {
                           aSd.ChequeNo = 'N/A';
                       }
                       
                       var res1 = aSd.PaymentDate.substring(0, 5);
                       if (res1 == "/Date") {
                           var parsedDate1 = new Date(parseInt(aSd.PaymentDate.substr(6)));
                           var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                           aSd.PaymentDate = date1;
                       }
                        if (aSd.ChequeDate == undefined || aSd.ChequeDate == null) {
                            aSd.ChequeDate = "";
                       } else {
                           // var res2 = aSd.ChequeDate.substring(0, 5);
                           //if (res2 == "/Date") {
                           //    var parsedDate2 = new Date(parseInt(aSd.ChequeDate.substr(6)));
                           //    var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                           //    aSd.ChequeDate = date2;
                           //}
                       }
                   });

                   
               }
               else {
                   alertify.log('Company Payment  Not Found', 'error', '5000');
               }
            }
            
        });
        
    }
    function CompanyOpeningPaymentPaged(curPageOpening) {

        if (curPageOpening == null) curPageOpening = 1;
        var startRecordNoOpening = ($scope.PerPageOpening * (curPageOpening - 1)) + 1;

        var formDateChangeOpening = $("#txtFromDateForPBOpening").val();
        $scope.FromDateOpening = formDateChangeOpening.split('/').reverse().join('-');

        var toDateChangeOpening = $("#txtToDateForPBOpening").val();
        $scope.ToDateOpening = toDateChangeOpening.split('/').reverse().join('-');

        var SearchCriteriaOpening = "";

        if ($scope.SearchPBAndCompanyNameOpening != undefined && $scope.SearchPBAndCompanyNameOpening != "" && $scope.FromDateOpening != "" && $scope.ToDateOpening != "") {
            SearchCriteriaOpening = "([CP].[PaymentDate] between '" + $scope.FromDateOpening + "' and '" + $scope.ToDateOpening + "') and ([CP].[ReceiptVoucherNo] LIKE '%" + $scope.SearchPBAndCompanyNameOpening + "%' OR [C].[CompanyName] LIKE '%" + $scope.SearchPBAndCompanyNameOpening + "%' OR [CP].[CompanyOpeningPaymentNo] LIKE '%" + $scope.SearchPBAndCompanyNameOpening + "%')";

        }
        else if ($scope.SearchPBAndCompanyNameOpening !== undefined && $scope.SearchPBAndCompanyNameOpening != null && $scope.SearchPBAndCompanyNameOpening != "") {
            SearchCriteriaOpening = "[CP].[ReceiptVoucherNo] LIKE '%" + $scope.SearchPBAndCompanyNameOpening + "%' OR [C].[CompanyName] LIKE '%" + $scope.SearchPBAndCompanyNameOpening + "%' OR [CP].[CompanyOpeningPaymentNo] LIKE '%" + $scope.SearchPBAndCompanyNameOpening + "%'";

        }
        else if ($scope.FromDateOpening != "" && $scope.ToDateOpening != "") {
            SearchCriteriaOpening = "[CP].[PaymentDate] between '" + $scope.FromDateOpening + "' and '" + $scope.ToDateOpening + "'";

        }
        
        $http({
            url: encodeURI('/CompanyPayment/CompanyOpeningPaymentGetPaged?startRecordNo=' + startRecordNoOpening + '&rowPerPage=' + $scope.PerPageOpening + "&whereClause=" + SearchCriteriaOpening + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.ListData.length != 0 || data.ListData.length != undefined || data.ListData.length != null ) {
                $scope.companyOpeningPaymentGetPagedList = data.ListData;

                $scope.total_countOpening = data.TotalRecord;

                if ($scope.companyOpeningPaymentGetPagedList.length > 0) {

                    angular.forEach($scope.companyOpeningPaymentGetPagedList, function (aSd) {
                       if (aSd.ChequeNo == '' || aSd.ChequeNo==null) {
                           aSd.ChequeNo = 'N/A';
                       }
                       
                       var res1 = aSd.PaymentDate.substring(0, 5);
                       if (res1 == "/Date") {
                           var parsedDate1 = new Date(parseInt(aSd.PaymentDate.substr(6)));
                           var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                           aSd.PaymentDate = date1;
                       }
                        if (aSd.ChequeDate == undefined || aSd.ChequeDate == null) {
                            aSd.ChequeDate = "";
                       } else {
                           // var res2 = aSd.ChequeDate.substring(0, 5);
                           //if (res2 == "/Date") {
                           //    var parsedDate2 = new Date(parseInt(aSd.ChequeDate.substr(6)));
                           //    var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                           //    aSd.ChequeDate = date2;
                           //}
                       }
                   });

                   
               }
               else {
                    alertify.log('Company Opening Payment  Not Found', 'error', '5000');
               }
            }
            
        });
    }

    $scope.OpenReport = function (companies) {

        $window.open("#/CompanyPaymentReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("CompanyPayment", JSON.stringify(companies));
        event.stopPropagation();
    }


    $("#CompanytxtPayOrderDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangePayOrderDate = function () {
        $("#CompanytxtPayOrderDate").focus();
        $("#CompanytxtPayOrderDate").trigger("click");
    }

    ///======== Disable ==========>>>>
   
   
});