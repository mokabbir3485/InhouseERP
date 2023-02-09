
app.controller("SuppilerPaymentController", function ($scope, $rootScope, $http, $filter, $cookieStore, $timeout, $window) {

 
    Clear();
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Supplier Payment').ScreenId;

        $scope.supplierPaymentGetPagedList = [];
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedSP($scope.currentPage);

        $scope.currentPageOB = 1;
        $scope.PerPageOB = 10;
        $scope.total_countOB = 0;
        $scope.SearchSupplierName = "";

        $scope.SupplierOpeningBalanceList = [];
        $scope.pay_supplierPayment = {};
        $scope.ddlSupplier = null;
        $scope.ddlBankAccount = null;
        $scope.ddlPayerBankAccount = null;
        $scope.ddlSuppilerBankAccount = null;
        $scope.ddlPayOrderBankAccount = null;
        $scope.ddlChecqueBankAccount = null;

        $scope.supplierlist = [];
        $scope.supplierPaymentList = [];
        $scope.SuppilerBankAccountList = [];
        $scope.PayerBankAccountList = [];
        $scope.paymentTypelist = [];
        $scope.ChequeTypeList = [];

        $scope.isCheckArrayList = [];
        $scope.proc_SupplierOpeningBalancePayment = {};
       
        $scope.ddlCheque = null;

        $scope.pay_supplierPayment.IsCheque = "true";
      
        $scope.pay_supplierPayment.PaymentDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.CurrencyTypeList = [];
        GetAllCurrency();
        $scope.pay_supplierPayment.ConversionAmount = 80;

        GetSupplier();
        GetAllBankAccount();
        GetAllActivePaymentType();
        GetAllChequeType();

        $scope.ddlServiceName = null;
        GetAllActiveMBankingServiceType();
        $scope.MBankingServiceList = [];
        GetByVoucherGenerate();
        $scope.PayAmountInType = "USD";

        $scope.ddlCurrencyType = null;
        $scope.ddlEmployee = null;

        GetAllPaymentSubType();
        $scope.ChequePaymentSubTypeList = [];
        $scope.MobilePaymentSubTypeList = [];

        GetSupplierPaymentMaxNo();
        GetSupplierOpeningPaymentMaxNo();
        GetAllEmployee();
        $scope.pay_supplierPayment.TotalVATConversion = 0;
        $scope.pay_supplierPayment.PaidAmountConversion = 0;
        $scope.pay_supplierPayment.TotalAITConversion = 0;
        $scope.pay_supplierPayment.TotalVATConversion = 0;
      
    }
    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;

            //setTimeout(function () {

            //    $("#ddlEmployee").select2({
            //        //theme: "classic",
            //    }).val($scope.UserData.EmployeeId).trigger("change");

            //}, 0);

            //$scope.pay_supplierPayment.EmployeeId = $scope.UserData.EmployeeId;

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
    function GetSupplierPaymentMaxNo() {

        $http({
            url: '/SupplierPaymentAndAdjustment/GetSupplierPaymentMaxNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxSupplierPaymentNo = data;
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
                $scope.pay_supplierPayment.SupplierPaymentNo = 'SP/' + $scope.finYearHeadOffice + '/' + $scope.MaxSupplierPaymentNo;
            });

        });
    }
    function GetSupplierOpeningPaymentMaxNo() {

        $http({
            url: '/SupplierPaymentAndAdjustment/GetSupplierOpeningPaymentMaxNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxSupplierOpeningPaymentNo = data;
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
                $scope.SupplierOpeningPaymentNo = 'SOP/' + $scope.finYearHeadOffice + '/' + $scope.MaxSupplierOpeningPaymentNo;
            });

        });
    }
    function GetByVoucherGenerate() {

        $http({
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=PV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.pay_supplierPayment.PaymentVoucherNo = data;

        });

    }

    /// Payment Date====>>>

    $("#supplierPaymentDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForsupplierPaymentDate = function () {
        $("#supplierPaymentDate").focus();
        $("#supplierPaymentDate").trigger("click");
    }

    $("#supplierPaymentDate1").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForsupplierPaymentDate1 = function () {
        $("#supplierPaymentDate1").focus();
        $("#supplierPaymentDate1").trigger("click");
    }


    /// Cheque Date====>>>

    $("#txtForChequeDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForChequeDate = function () {
        $("#txtForChequeDate").focus();
        $("#txtForChequeDate").trigger("click");
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

    function GetAllActiveMBankingServiceType() {
        $http({
            url: '/PaymentType/GetAllActiveMBankingServiceType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MBankingServiceList = data;

        })
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
    function GetAllActivePaymentType() {
        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aPay) {
                if (aPay.PaymentTypeId !=6) {
                    $scope.paymentTypelist.push(aPay);
                }
            })
           
            
        })
    }

    function GetSupplier() {
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierlist = data;
            if (data.length == 1)
                $scope.ddlSupplier = { SupplierId: data[0].SupplierId, SupplierName: data[0].SupplierName };
            
        })
    }


    $scope.hideButton = function () {
        GetByVoucherGenerate();
        $scope.pay_supplierPayment = {};
        $scope.pay_supplierPayment.ConversionAmount = 80;
        $scope.PayAmountInType = "USD";
        $scope.ddlCurrencyType = { CurrencyId: 2 };

        if ($scope.isOpening == true) {
            $scope.isOpening = false;
            $scope.supplierPaymentList = [];
            GetSupplierPaymentMaxNo();
            
        } else {
            $scope.isOpening = true;
            GetSupplierPaymentMaxNo();
        }
    };

    $scope.LocalPBAndImportPB = [
        { Id: 0, Name: "Import Purchase Bill" },
        { Id: 1, Name: "Local Purchase Bill" }

    ];

    
    function GetAllBankAccount() {

        $http({
            url: '/BankAccount/GetAllBankAccount',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankAccountList = data;
            angular.forEach($scope.BankAccountList, function (aData) {
                if (aData.AccountFor == 'Supplier') {
                    if (aData.AccountNo == "" || aData.BankName == "" || aData.BranchName == "") {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " ,  Branch Name : " + "Not Found" + ", Account NO : " + "Not Found, " + aData.CompanyName;
                    } else {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " , Branch Name : " + aData.BranchName + ", Account NO : " + aData.AccountNo + ", " + aData.CompanyName;
                    }
                    $scope.SuppilerBankAccountList.push(aData);
                } else if (aData.AccountFor == 'Exporter') {
                    if (aData.AccountNo == "" || aData.BankName == "" || aData.BranchName == "") {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " ,  Branch Name : " + "Not Found" + ", Account NO : " + "Not Found";
                    } else {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " , Branch Name : " + aData.BranchName + ", Account NO : " + aData.AccountNo;
                    }
                    $scope.PayerBankAccountList.push(aData);
                }
                
                
            })

            

        });
    }
    $scope.SupplierOpeningBalance_GetBySupplierId = function (SupplierId) {

        $http({
            url: '/SupplierOpeningBalance/SupplierOpeningBalance_GetBySupplierId?SupplierId=' + SupplierId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierOpeningBalanceList = data;
            angular.forEach($scope.SupplierOpeningBalanceList, function (aSd) {
                var res1 = aSd.OpeningDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aSd.OpeningDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aSd.OpeningDate = date1;
                }
            })
            
            $scope.pay_supplierPayment.PaidAmount = $scope.SupplierOpeningBalanceList[0].TotalPayableAmount;
            $scope.pay_supplierPayment.ConvertedAmount = $scope.SupplierOpeningBalanceList[0].TotalPayableAmount * $scope.pay_supplierPayment.ConversionAmount;

        });
    }
    $scope.CheckPaidAndOpeningAmount = function (PaidAmount) {
        if ($scope.SupplierOpeningBalanceList[0].TotalPayableAmount < PaidAmount) {
            $scope.pay_supplierPayment.PaidAmount = $scope.SupplierOpeningBalanceList[0].TotalPayableAmount;
            $scope.pay_supplierPayment.ConvertedAmount = $scope.SupplierOpeningBalanceList[0].TotalPayableAmount;
            alertify.log('Paid amount is greater then opening Amount', 'error', '5000');
        }
    }
    
    $scope.onChequeGetById = function (PaymentTypeId, PaymentGroupId) {

        if (PaymentTypeId==2) {
            //GetAllBankAccount();
            $('#ddlEmployeeSelect').select2('destroy');
            $("#ddlEmployeeSelect").val('').select2({
                placeholder: "Select Employee",
                dropdownAutoWidth: false

            });
        }

        if (PaymentTypeId == 3) {
            $scope.checqueShowDiv = true;
            //GetAllBankAccount();
            $('#ddlEmployeeSelect').select2('destroy');
            $("#ddlEmployeeSelect").val('').select2({
                placeholder: "Select Employee",
                dropdownAutoWidth: false

            });
        } else {
            $scope.checqueShowDiv = false;
            $scope.ddlBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            //$scope.BankAccountList = [];
            $('#ddlEmployeeSelect').select2('destroy');
            $("#ddlEmployeeSelect").val('').select2({
                placeholder: "Select Employee",
                //dropdownAutoWidth: false

            });
            
        }


        if (PaymentTypeId == 3) {
            $('#ddlEmployeeSelect').select2('destroy');
            $("#ddlEmployeeSelect").val('').select2({
                placeholder: "Select Employee",
                //dropdownAutoWidth: false

            });
            $scope.pay_supplierPayment.TransactionNo = '';
            $scope.pay_supplierPayment.MoneyReceiptNo = '';
            $scope.pay_supplierPayment.MobileNo = '';
            $scope.pay_supplierPayment.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
            $scope.pay_supplierPayment.MoneyReceiptNo = '';
        }
        else if (PaymentTypeId == 4) {
            $scope.pay_supplierPayment.MoneyReceiptNo = '';
            $scope.pay_supplierPayment.ChequeNo = '';
            $scope.pay_supplierPayment.MoneyReceiptNo = '';
            $scope.pay_supplierPayment.ChequeDate = '';
            $scope.pay_supplierPayment.SupplierBankAccountId = 0;
            $scope.pay_supplierPayment.PayerBankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#ddlEmployeeSelect').select2('destroy');
            $("#ddlEmployeeSelect").val('').select2({
                placeholder: "Select Employee",
                //dropdownAutoWidth: false

            });
            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                placeholder: "Select Suppiler Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlSuppilerOnlinePayment').select2('destroy');
            $("#bankddlSuppilerOnlinePayment").val('').select2({
                placeholder: "Select Suppiler Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayerOnlinePayment').select2('destroy');
            $("#bankddlPayerOnlinePayment").val('').select2({
                placeholder: "Select Payer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrderPayment').select2('destroy');
            $("#bankddlPayOrderPayment").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });

        } else if (PaymentTypeId == 1) {


            $scope.pay_supplierPayment.ChequeNo = '';
            $scope.pay_supplierPayment.ChequeDate = '';
            $scope.pay_supplierPayment.SupplierBankAccountId = 0;
            $scope.pay_supplierPayment.PayerBankAccountId = 0;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#ddlEmployeeSelect').select2('destroy');
            $("#ddlEmployeeSelect").val('').select2({
                placeholder: "Select Employee",
                //dropdownAutoWidth: false

            });
            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                placeholder: "Select Suppiler Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlSuppilerOnlinePayment').select2('destroy');
            $("#bankddlSuppilerOnlinePayment").val('').select2({
                placeholder: "Select Suppiler Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayerOnlinePayment').select2('destroy');
            $("#bankddlPayerOnlinePayment").val('').select2({
                placeholder: "Select Payer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrderPayment').select2('destroy');
            $("#bankddlPayOrderPayment").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
            $scope.pay_supplierPayment.TransactionNo = '';
            $scope.pay_supplierPayment.MobileNo = '';
            $scope.pay_supplierPayment.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        } else if (PaymentGroupId == 5) {
            $scope.pay_supplierPayment.MoneyReceiptNo = '';
            $scope.pay_supplierPayment.ChequeNo = '';
            $scope.pay_supplierPayment.MoneyReceiptNo = '';
            $scope.pay_supplierPayment.ChequeDate = '';
            $scope.pay_supplierPayment.SupplierBankAccountId = 0;
            $scope.pay_supplierPayment.PayerBankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#ddlEmployeeSelect').select2('destroy');
            $("#ddlEmployeeSelect").val('').select2({
                placeholder: "Select Employee",
                //dropdownAutoWidth: false

            });
            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                placeholder: "Select Suppiler Bank Name",
                dropdownAutoWidth: false
            });
           
            $('#bankddlPayOrderPayment').select2('destroy');
            $("#bankddlPayOrderPayment").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
            $scope.pay_supplierPayment.MobileNo = '';
            $scope.pay_supplierPayment.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else {
            $scope.pay_supplierPayment.MoneyReceiptNo = '';
            $scope.pay_supplierPayment.ChequeNo = '';
            $scope.pay_supplierPayment.MoneyReceiptNo = '';
            $scope.pay_supplierPayment.ChequeDate = '';
            $scope.pay_supplierPayment.SupplierBankAccountId = 0;
            $scope.pay_supplierPayment.PayerBankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#ddlEmployeeSelect').select2('destroy');
            $("#ddlEmployeeSelect").val('').select2({
                placeholder: "Select Employee",
                //dropdownAutoWidth: false

            });
            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                placeholder: "Select Suppiler Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlSuppilerOnlinePayment').select2('destroy');
            $("#bankddlSuppilerOnlinePayment").val('').select2({
                placeholder: "Select Suppiler Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayerOnlinePayment').select2('destroy');
            $("#bankddlPayerOnlinePayment").val('').select2({
                placeholder: "Select Payer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrderPayment').select2('destroy');
            $("#bankddlPayOrderPayment").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });

            $scope.pay_supplierPayment.MobileNo = '';
            $scope.pay_supplierPayment.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }


    }

    $scope.onLoadImportAndLoacalBtn = function () {
        $scope.isCheckArrayList = [];
        $scope.ddlCheque = null;
        
        $http({
            url: '/SupplierPaymentAndAdjustment/SupplierPaymentGetById?supId=' + $scope.ddlSupplier.SupplierId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ddlCheque = null;
            $scope.pay_supplierPayment = {};
            $scope.supplierPaymentList = [];
            GetByVoucherGenerate();
            GetSupplierPaymentMaxNo();
            angular.forEach(data, function (adata) {
                var res1 = adata.PBDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(adata.PBDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    adata.PBDate = date1;
                }
                //if (adata.PayableAmount != 0) {
                    if (adata.PaidAmount != adata.ActualAmount) {
                        $scope.isCheckArrayList = [];
                       // adata.AmountWithVatAit = adata.SupplierPayAmount;
                        adata.AmountWithVatAit = adata.SupplierPayAmount + adata.VatAmount + adata.AitAmount;
                        $scope.supplierPaymentList.push(adata);
                    }
                //} 
            })
        });
    }



    $scope.CheckAdvancedAmout = function (obj) {
        var TemptotalPayAmount = 0;

        if (obj.PaymentTypeId == 5) {
            var totalPayAmount = 0;
            var flag = false;
            angular.forEach($scope.isCheckArrayList, function (aData) {
                if (aData.selectedIsCheck == true) {
                    totalPayAmount += aData.AmountWithVatAit;
                }
            });

            if (flag) {
                alertify.log('Advance Amount Less than Paid Amount  !', 'error', '5000');
            }

        } else {

            angular.forEach($scope.isCheckArrayList, function (aData) {
                TemptotalPayAmount += aData.AmountWithVatAit;
                $scope.pay_supplierPayment.PaidAmount = TemptotalPayAmount;
            });
          
          
        }

    }
   


    $scope.SupplierpaymentSave = function ()
    {
      
      //  $scope.pay_supplierPayment.ConversionAmount = $scope.pay_supplierPayment.ConversionAmount;

        if ($scope.ddlSupplier != undefined) {
            $scope.pay_supplierPayment.SupplierId = $scope.ddlSupplier.SupplierId;
        }
        

        if ($scope.pay_supplierPayment.SupplierBankAccountId == null || $scope.pay_supplierPayment.SupplierBankAccountId == undefined || $scope.pay_supplierPayment.PayerBankAccountId == null || $scope.pay_supplierPayment.PayerBankAccountId == undefined)
        {
            $scope.pay_supplierPayment.SupplierBankAccountId = 0;
            $scope.pay_supplierPayment.PayerBankAccountId = 0;
        }

        if ($scope.pay_supplierPayment.PaymentDate == null || $scope.pay_supplierPayment.PaymentDate == undefined || $scope.pay_supplierPayment.PaymentDate == '')
        {
            alertify.log('Please Select Payment Date  !', 'error', '5000');
        }
        else if ($scope.ddlCheque == null || $scope.ddlCheque == undefined || $scope.ddlCheque == 0)
        {
            alertify.log('Please Select Payment Type  !', 'error', '5000');
        } 
        else
        {

            $scope.pay_supplierPayment.PaymentTypeId = $scope.ddlCheque.PaymentTypeId;
            $scope.pay_supplierPayment.CurrencyId = $scope.ddlCurrencyType.CurrencyId;
            $scope.pay_supplierPayment.ConversionRate = $scope.pay_supplierPayment.ConversionAmount;
        if ($scope.IsOpeningPayment == true) {
            $scope.proc_SupplierOpeningBalancePayment.UpdatedBy = $scope.LoginUser.UserId;
            $scope.pay_supplierPayment.SupplierId = $scope.ddlOpeningSupplier.SupplierId;
            $scope.proc_SupplierOpeningBalancePayment = $scope.pay_supplierPayment;
            $scope.proc_SupplierOpeningBalancePayment.SupplierOpeningPaymentNo = $scope.SupplierOpeningPaymentNo;

            alertify.confirm("Are you sure to save?", function (e) {

                if (e) {
                    $http({
                        url: "/SupplierPaymentAndAdjustment/SaveSupplierOpeningPayment",
                        method: "POST",
                        data: JSON.stringify({ proc_SupplierOpeningBalancePayment: $scope.proc_SupplierOpeningBalancePayment }),
                    }).success(function (data) {
                        if (data > 0) {
                            $('#OpeningSupplierId').select2('destroy');
                            $('#OpeningSupplierId').val('').select2({
                                placeholder: "Select Opening Supplier",
                                theme: "classic",
                                dropdownAutoWidth: false
                            });
                            alertify.log('Supplier Payment ' + status + ' Successfully!', 'success', '5000');

                            Clear();
                            $scope.checqueShowDiv = false;
                            $scope.suplierPaymentDetailList = [];
                            $scope.isCheckArrayList = [];
                        }

                        else {
                            alertify.log('Server Errors!', 'error', '5000');
                        }

                    })
                }

            });

        }
        else {

            if ($scope.ddlServiceName == null || $scope.ddlServiceName == undefined) {
                $scope.ddlServiceName = {};
                $scope.ddlServiceName.MobileBankingServiceId = 0;
            } else {
                $scope.pay_supplierPayment.MobileBankingServiceId = $scope.ddlServiceName.PaymentSubTypeId;
            }

            if ($scope.ddlChequeType == null || $scope.ddlChequeType == undefined) {
                $scope.pay_supplierPayment.ChequeTypeId = 0;
            } else {
                $scope.pay_supplierPayment.ChequeTypeId = $scope.ddlChequeType.PaymentSubTypeId;
            }

            var totalAmount = 0;
            $scope.suplierPaymentDetailList = [];
            angular.forEach($scope.isCheckArrayList, function (aData) {
                var suplierDetail = {};
                suplierDetail.VAT = angular.copy(aData.VatAmount);
                suplierDetail.AIT = angular.copy(aData.AitAmount);
                suplierDetail.PayableAmount = aData.PayableAmount;
                suplierDetail.SupplierPaymentId = 0;
                suplierDetail.ActualAmount = aData.ActualAmount;
                suplierDetail.PaidAmount = aData.SupplierPayAmount;
                suplierDetail.IsVDS = aData.IsVDS;

                totalAmount += aData.AmountWithVatAit
                suplierDetail.PBId = aData.PBId;
                var pbNo = aData.PBNo.split('/');

                if (pbNo[0] == "LPB") {
                    suplierDetail.IsLocalPurchase = true;
                } else {
                    suplierDetail.IsLocalPurchase = false;
                }
                $scope.suplierPaymentDetailList.push(suplierDetail);
            });

            var flag = false;
            if (totalAmount == $scope.pay_supplierPayment.PaidAmount) {
                flag = true;
            }

            if (flag) {


                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        $http({
                            url: "/SupplierPaymentAndAdjustment/SaveSupplierPayment",
                            method: "POST",
                            data: JSON.stringify({ _SupplierPayment: $scope.pay_supplierPayment, proc_SupplierPaymentsdetail: $scope.suplierPaymentDetailList }),
                        }).success(function (data) {
                            if (data > 0) {
                                $('#supplierId').select2('destroy');
                                $('#supplierId').val('').select2({
                                    placeholder: "Select Supplier",
                                    theme: "classic",
                                    dropdownAutoWidth: false
                                });
                                $('#bankddlOnlinePayment').select2('destroy');
                                $('#bankddlOnlinePayment').val('').select2({
                                    placeholder: "Select Exporter Bank Name",
                                    theme: "classic",
                                    dropdownAutoWidth: false
                                });
                                alertify.log('Supplier Payment ' + status + ' Successfully!', 'success', '5000');
                                Clear();
                                $scope.checqueShowDiv = false;
                                $scope.suplierPaymentDetailList = [];
                                $scope.isCheckArrayList = [];
                                //$scope.onLoadImportAndLoacalBtn();
                                $scope.pay_supplierPayment = {};
                                $scope.supplierPaymentList = [];
                                $scope.suplierPaymentDetailList = [];
                                $scope.isCheckArrayList = [];

                                $scope.SupplierPayment.$setPristine();
                                $scope.SupplierPayment.$setUntouched();
                            }
                            else {
                                alertify.log('Server Errors!', 'error', '5000');
                            }

                        })
                    }
                });

            } else {
                alertify.log('Pay Amount Are not Same in Total Paid Amount', 'error', '5000');
            }

        }

        }

    }
    $scope.TotalPayAmount = 0;
    $scope.onCheckVal = function (row, select, indx) {
        $scope.ddlCheque = null;
      
       
        if (row.selectedIsCheck == true) {
            if ($scope.isCheckArrayList.length == 0) {
                $scope.SelectedCurrencyId = row.CurrencyId;
            }
            if ($scope.SelectedCurrencyId == row.CurrencyId) {
                row.selectedIsCheck = true;
            } else {
                row.selectedIsCheck = false;
                alertify.log('You must select same currency type !!!', 'error', '5000');
                return;
            }
            if ($scope.pay_supplierPayment.PaidAmount == undefined) {
                $scope.pay_supplierPayment.PaidAmount = 0;
            }
            if ($scope.pay_supplierPayment.TotalVAT == undefined) {
                $scope.pay_supplierPayment.TotalVAT = 0;
            }
            if ($scope.pay_supplierPayment.TotalAIT == undefined) {
                $scope.pay_supplierPayment.TotalAIT = 0;
            }

            $scope.pay_supplierPayment.TotalVAT += row.VatAmount;
            $scope.pay_supplierPayment.TotalAIT  += row.AitAmount;
            $scope.pay_supplierPayment.PaidAmount += row.SupplierPayAmount;

            $scope.TotalPayAmount += row.AmountWithVatAit;

            if (row.CurrencyId == 1) {
                $scope.PayAmountInType = "BDT";
                $scope.ddlCurrencyType = { CurrencyId: row.CurrencyId }
            } else {
                $scope.PayAmountInType = "USD";
                ddlCurrencyType = { CurrencyId: row.CurrencyId }
            }

            $scope.isCheckArrayList.push(row);


            $scope.SelectedCurrencyId = row.CurrencyId;

            $scope.ddlCurrencyType = { CurrencyId: row.CurrencyId }

            if ($scope.ddlCurrencyType.CurrencyId == 1) {
                if ($scope.pay_supplierPayment.ConvertedAmount == undefined || $scope.pay_supplierPayment.ConvertedAmount == null) {
                    $scope.pay_supplierPayment.ConvertedAmount = $scope.pay_supplierPayment.PaidAmount + row.VatAmount + row.AitAmount;
                } else {
                    $scope.pay_supplierPayment.ConvertedAmount += row.AmountWithVatAit + row.VatAmount + row.AitAmount * $scope.pay_supplierPayment.ConversionAmount;
                   
                }
                $scope.pay_supplierPayment.ConversionAmount = 1;
            } else if ($scope.ddlCurrencyType.CurrencyId == 2) {
                if ($scope.pay_supplierPayment.ConvertedAmount == undefined || $scope.pay_supplierPayment.ConvertedAmount == null) {
                    $scope.pay_supplierPayment.ConvertedAmount = 0;
                }
               
             //   $scope.pay_supplierPayment.ConversionAmount = 80;

                // $scope.pay_supplierPayment.ConversionAmount = 80;
                if ($scope.pay_supplierPayment.ConversionAmount == 0 || $scope.pay_supplierPayment.ConversionAmount == undefined) {
                    $scope.pay_supplierPayment.ConversionAmount = 85;
                }
                if ($scope.pay_supplierPayment.PaidAmountConversion == undefined) {
                    $scope.pay_supplierPayment.PaidAmountConversion = 0;
                }
                $scope.pay_supplierPayment.PaidAmountConversion += row.AmountWithVatAit * $scope.pay_supplierPayment.ConversionAmount;
                $scope.pay_supplierPayment.TotalAITConversion += row.AitAmount * $scope.pay_supplierPayment.ConversionAmount;
                $scope.pay_supplierPayment.TotalVATConversion += row.VatAmount * $scope.pay_supplierPayment.ConversionAmount;



                /* $scope.pay_supplierPayment.ConvertedAmount += row.AmountWithVatAit + row.VatAmount + row.AitAmount;*/

                $scope.pay_supplierPayment.ConvertedAmount += (row.AmountWithVatAit * $scope.pay_supplierPayment.ConversionAmount) + (row.VatAmount * $scope.pay_supplierPayment.ConversionAmount) + (row.AitAmount * $scope.pay_supplierPayment.ConversionAmount);
               
            }
        }
        else {
            if ($scope.pay_supplierPayment.PaidAmount == undefined) {
                $scope.pay_supplierPayment.PaidAmount = 0;
            }
            if (row.CurrencyId == 1) {
                $scope.PayAmountInType = "BDT";
            } else {
                $scope.PayAmountInType = "USD";
            }

            $scope.pay_supplierPayment.PaidAmount -= row.PayableAmount;
            $scope.pay_supplierPayment.TotalVAT -= row.VatAmount;
            $scope.pay_supplierPayment.TotalAIT -= row.AitAmount;
            $scope.TotalPayAmount -= row.AmountWithVatAit;

            //$scope.pay_supplierPayment.PaidAmountConversion -= row.AmountWithVatAit * $scope.pay_supplierPayment.ConversionAmount;
            //$scope.pay_supplierPayment.TotalAITConversion -= row.VatAmount * $scope.pay_supplierPayment.ConversionAmount;
            //$scope.pay_supplierPayment.TotalVATConversion -= row.AitAmount * $scope.pay_supplierPayment.ConversionAmount;

            //if ($scope.pay_supplierPayment.PaidAmount == 0) {
            //    $scope.pay_supplierPayment.ConvertedAmount = 0;
            //}
            if ($scope.ddlCurrencyType.CurrencyId == 1) {

                $scope.pay_supplierPayment.ConvertedAmount -= row.AmountWithVatAit + row.VatAmount + row.AitAmount * 1;
            }
            else {
                $scope.pay_supplierPayment.ConversionAmount = 85;
                if ($scope.pay_supplierPayment.ConversionAmount == 0 || $scope.pay_supplierPayment.ConversionAmount == undefined) {
                    $scope.pay_supplierPayment.ConversionAmount = 85;
                }
                //$scope.pay_supplierPayment.ConvertedAmount -= (row.AmountWithVatAit + row.VatAmount + row.AitAmount) * 80;


                $scope.pay_supplierPayment.PaidAmountConversion -= row.AmountWithVatAit * $scope.pay_supplierPayment.ConversionAmount;
                $scope.pay_supplierPayment.TotalAITConversion -= row.AitAmount * $scope.pay_supplierPayment.ConversionAmount;
                $scope.pay_supplierPayment.TotalVATConversion -= row.VatAmount * $scope.pay_supplierPayment.ConversionAmount;
                /* $scope.pay_supplierPayment.ConvertedAmount += row.AmountWithVatAit + row.VatAmount + row.AitAmount;*/

                $scope.pay_supplierPayment.ConvertedAmount -= (row.AmountWithVatAit + row.VatAmount + row.AitAmount ) * $scope.pay_supplierPayment.ConversionAmount;
            }
            var index = $scope.isCheckArrayList.indexOf(row);
            $scope.isCheckArrayList.splice(index, 1);
            
        }

        if ($scope.isCheckArrayList.length==0) {
            $scope.pay_supplierPayment.PaidAmountConversion = 0;
            $scope.pay_supplierPayment.TotalAITConversion = 0;
            $scope.pay_supplierPayment.TotalVATConversion = 0;
            $scope.pay_supplierPayment.ConvertedAmount = 0;

            $scope.pay_supplierPayment.TotalVAT = 0;
            $scope.pay_supplierPayment.TotalAIT = 0;
            $scope.pay_supplierPayment.PaidAmount = 0;
           

        }


    }


    $scope.VatAitValidation = function (supp) {
        var TotalAit = supp.SupplierPayAmount - supp.VatAmount;
        var TotalVat = supp.SupplierPayAmount - supp.AitAmount;

        if (TotalVat >= supp.VatAmount) {

        } else {
            supp.VatAmount = 0;
            alertify.log('VAT Amount greater than Pay Amount !!!', 'error', '5000');
        }
        if (TotalAit >= supp.AitAmount) {

        } else {
            supp.AitAmount = 0;
            alertify.log('AIT Amount greater than Pay Amount !!!', 'error', '5000');
        }
    }

    $scope.PayAmountValidationCheck = function (supp) {
        $scope.pay_supplierPayment.PaidAmount = 0;
        $scope.pay_supplierPayment.TotalVAT = 0;
        $scope.pay_supplierPayment.TotalAIT = 0;
        $scope.TotalPayAmount = 0;

        $scope.pay_supplierPayment.PaidAmountConversion = 0;
        $scope.pay_supplierPayment.TotalAITConversion = 0;
        $scope.pay_supplierPayment.TotalVATConversion = 0;

        angular.forEach($scope.isCheckArrayList, function (aData) {
            aData.AmountWithVatAit = 0;
            $scope.pay_supplierPayment.TotalVAT += aData.VatAmount;
            $scope.pay_supplierPayment.TotalAIT += aData.AitAmount;
            $scope.pay_supplierPayment.PaidAmount += aData.SupplierPayAmount;
           
            aData.AmountWithVatAit = aData.SupplierPayAmount + aData.VatAmount + aData.AitAmount;
            $scope.TotalPayAmount += aData.SupplierPayAmount + aData.VatAmount + aData.AitAmount;

         //   $scope.pay_supplierPayment.PaidAmount += aData.AmountWithVatAit;



            if ($scope.ddlCurrencyType.CurrencyId == 1) {
                $scope.pay_supplierPayment.ConvertedAmount = ($scope.pay_supplierPayment.PaidAmount + $scope.pay_supplierPayment.TotalVAT + $scope.pay_supplierPayment.TotalAIT) * 1;
                $scope.pay_supplierPayment.PaidAmountConversion += $scope.pay_supplierPayment.PaidAmount * 1;
                $scope.pay_supplierPayment.TotalAITConversion += $scope.pay_supplierPayment.VatAmount * 1;
                $scope.pay_supplierPayment.TotalVATConversion += $scope.pay_supplierPayment.AitAmount * 1;
            }
            else {
                if ($scope.pay_supplierPayment.ConversionAmount == null || $scope.pay_supplierPayment.ConversionAmount == undefined) {

                    $scope.pay_supplierPayment.ConvertedAmount += $scope.pay_supplierPayment.PaidAmount * 85;
                    $scope.pay_supplierPayment.PaidAmountConversion = $scope.pay_supplierPayment.PaidAmount * 85;
                    $scope.pay_supplierPayment.TotalAITConversion = $scope.pay_supplierPayment.VatAmount * 85;
                    $scope.pay_supplierPayment.TotalVATConversion = $scope.pay_supplierPayment.AitAmount * 85;
                } else {

                    $scope.pay_supplierPayment.PaidAmountConversion = $scope.pay_supplierPayment.PaidAmount * $scope.pay_supplierPayment.ConversionAmount;
                    $scope.pay_supplierPayment.TotalAITConversion = $scope.pay_supplierPayment.TotalAIT * $scope.pay_supplierPayment.ConversionAmount;
                    $scope.pay_supplierPayment.TotalVATConversion = $scope.pay_supplierPayment.TotalVAT * $scope.pay_supplierPayment.ConversionAmount;

                    $scope.pay_supplierPayment.ConvertedAmount = ($scope.pay_supplierPayment.PaidAmount + $scope.pay_supplierPayment.TotalVAT + $scope.pay_supplierPayment.TotalAIT) * $scope.pay_supplierPayment.ConversionAmount;
                   // $scope.pay_supplierPayment.ConvertedAmount = ($scope.pay_supplierPayment.PaidAmount + aData.VatAmount + aData.AitAmount) * $scope.pay_supplierPayment.ConversionAmount;
                }

            }

         

        })

    }

    $scope.ChangeCurrencyType = function () {
        if ($scope.ddlCurrencyType.CurrencyId == 2) {
            $scope.pay_supplierPayment.ConversionAmount = 80;
        } else {
            $scope.pay_supplierPayment.ConversionAmount = 1;
        }
    }

    $scope.AmountConversionMethod = function () {
        if ($scope.pay_supplierPayment.TotalVAT == undefined) {
            $scope.pay_supplierPayment.TotalVAT = 0;
        }
        if ($scope.pay_supplierPayment.TotalAIT == undefined) {
            $scope.pay_supplierPayment.TotalAIT = 0;
        }
        if ($scope.ddlCurrencyType.CurrencyId == 2) {
            $scope.pay_supplierPayment.ConvertedAmount = ($scope.pay_supplierPayment.PaidAmount + $scope.pay_supplierPayment.TotalVAT + $scope.pay_supplierPayment.TotalAIT) * ($scope.pay_supplierPayment.ConversionAmount);
        }
        else if ($scope.ddlCurrencyType.CurrencyId == 1) {
            if ($scope.pay_supplierPayment.PaidAmount != undefined || $scope.pay_supplierPayment.PaidAmount != null) {
                $scope.pay_supplierPayment.ConvertedAmount = ($scope.pay_supplierPayment.PaidAmount + $scope.pay_supplierPayment.TotalVAT + $scope.pay_supplierPayment.TotalAIT);
                $scope.pay_supplierPayment.ConversionAmount = 1;
            }
        }

    }
    $scope.Reset = function () {
        $scope.ddlSupplier = null;
        $scope.pay_supplierPayment = {};
        $scope.supplierPaymentList = [];
        $scope.suplierPaymentDetailList = [];
        $scope.isCheckArrayList = [];
     
        $scope.ddlSupplier = { SupplierId: null };
        $scope.onLoadImportAndLoacalBtn();

        $('#supplierId').select2('destroy');
        $('#supplierId').val('').select2({
            placeholder: "Select Supplier"
        });
        $('#OpeningSupplierId').select2('destroy');
        $('#OpeningSupplierId').val('').select2({
            placeholder: "Select Opening Supplier"
        });

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

    $scope.reloadBtnSP = function () {
        $('#txtFromDateForPB').val('');
        $('#txtToDateForPB').val('');
        $('#PBAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchPBAndCompanyName = null;
        GetPagedSP(1);
    }

    $scope.SPSearch = function () {
        GetPagedSP(1);

    }
    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedSP(curPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedSP($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedSP($scope.currentPage);
        }
        //  }


    }
    function GetPagedSP(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;



        var formDateChange = $("#txtFromDateForPB").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForPB").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";


        if ($scope.SearchPBAndCompanyName != undefined && $scope.SearchPBAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([PaymentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SupplierPaymentNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [SupplierName] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [PaymentTypeName] LIKE '%" + $scope.SearchPBAndCompanyName + "%')";

        }
        else if ($scope.SearchPBAndCompanyName !== undefined && $scope.SearchPBAndCompanyName != null && $scope.SearchPBAndCompanyName != "") {
            SearchCriteria = "[SupplierPaymentNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [SupplierName] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [PaymentTypeName] LIKE '%" + $scope.SearchPBAndCompanyName + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[PaymentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }

        $http({
            url: encodeURI('/SupplierPaymentAndAdjustment/GetSupplierPaymentGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.supplierPaymentGetPagedList = data.ListData;
            $scope.total_count = data.TotalRecord;
            if ($scope.supplierPaymentGetPagedList.length > 0) {
                angular.forEach($scope.supplierPaymentGetPagedList, function (aData) {
                    if (aData.IsOpeningPayment == true) {
                        aData.OpeningPayment = 'Pay From Opening';
                    } else {
                        aData.OpeningPayment = 'Pay For Bill';
                    }
                    if (aData.PaymentDate != null) {
                        var res1 = aData.PaymentDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aData.PaymentDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aData.PaymentDate = date1;
                        }
                    }
                    
                    if (aData.ChequeDate != null) {
                        var res2 = aData.ChequeDate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate2 = new Date(parseInt(aData.ChequeDate.substr(6)));
                            var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                            aData.ChequeDate = date2;

                        }
                    }
                    
                  
                })

            }
            else {
                alertify.log('Supplier Payment  Not Found', 'error', '5000');
            }

            

        });
    }


    $scope.reloadBtnOpeningBalance = function () {
        $('#txtFromDateForOB').val('');
        $('#txtToDateForOB').val('');
        $('#textSupplierName').val('');
        $scope.FromDateOB = "";
        $scope.ToDateOB = "";
        $scope.SearchSupplierName = null;
        GetSupplierOpeningBalancePaged(1);
    }

    $scope.SupplierOpeningBalanceSearch = function () {
        GetSupplierOpeningBalancePaged(1);

    }

    function GetSupplierOpeningBalancePaged(curPage) {

        document.getElementById("ReportBtnId").disabled = false;

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPageOB * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForOB").val();
        $scope.FromDateOB = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForOB").val();
        $scope.ToDateOB = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";
        if ($scope.FromDateOB != "") {
            SearchCriteria = "[FromDate]= '" + $scope.FromDateOB + "'";
            //alert("From Success!!!!!");
        }
        if ($scope.ToDateOB != "") {
            SearchCriteria = "[ToDate]= '" + $scope.ToDateOB + "'";
            //alert("To Date Success!!!!!");
        }
        if ($scope.FromDateOB != "" && $scope.ToDateOB != "") {
            SearchCriteria = "[FromDate]= '" + $scope.FromDateOB + "' and [ToDate]= '" + $scope.ToDateOB + "'";
            //alert("From To Date Success!!!!!");
        }
        if ($scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
            SearchCriteria = "[SupplierName] LIKE '%" + $scope.SearchSupplierName + "%'";
            //alert("Name Success!!!!!");
        }
        if ($scope.FromDateOB != "" && $scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
            SearchCriteria = "([FromDate]= '" + $scope.FromDateOB + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%')";
            //alert("From Date name Success!!!!!");
        }
        if ($scope.ToDateOB != "" && $scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
            SearchCriteria = "([ToDate]= '" + $scope.ToDateOB + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%')";
            //alert("To Date name Success!!!!!");
        }
        if ($scope.SearchSupplierName != null && $scope.SearchSupplierName != "" && $scope.FromDateOB != "" && $scope.ToDateOB != "") {
            SearchCriteria = "([FromDate]= '" + $scope.FromDateOB + "' and [ToDate]= '" + $scope.ToDateOB + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%')";
            //alert("Name, Date Success!!!!!");
        }

        $http({
            url: encodeURI('/SupplierOpeningBalance/GetSupplierOpeningBalancePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPageOB + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.OpeningDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.OpeningDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.OpeningDate = date1;
                    }
                })

            }

            $scope.SupplierOpeningBalanceListPaged = data.ListData;
            $scope.total_countOB = data.TotalRecord;

            
        });
    }

    $scope.getDataOB = function (curPage) {

        if ($scope.PerPageOB > 100) {
            $scope.PerPageOB = 100;
            $scope.currentPageOB = curPage;
            GetSupplierOpeningBalancePaged($scope.currentPageOB);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPageOB < 1) {
            $scope.PerPageOB = 1;
            $scope.currentPageOB = curPage;
            GetSupplierOpeningBalancePaged($scope.currentPageOB);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPageOB = curPage;
            GetSupplierOpeningBalancePaged($scope.currentPageOB);
        }


    }

    $("#txtFromDateForOB").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForOB = function () {
        $("#txtFromDateForOB").focus();
        $("#txtFromDateForOB").trigger("click");
    }


    $("#txtToDateForOB").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForOB = function () {
        $("#txtToDateForOB").focus();
        $("#txtToDateForOB").trigger("click");
    }



    $("#txtForPayOrderDate").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ChangeForPayOrderDate = function () {
        $("#txtForPayOrderDate").focus();
        $("#txtForPayOrderDate").trigger("click");
    }


    $scope.OpenReport = function (supplierPayment) {
        $window.open("#/SupplierPaymentReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("supplierIds",null);
        $cookieStore.put("paymentIds",null);
         $cookieStore.put("SupplierPaymentObject", JSON.stringify(supplierPayment));
        event.stopPropagation();
    }
});