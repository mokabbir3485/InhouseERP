app.controller("CompanyVATController", function ($scope, $rootScope, $cookieStore, $http, $filter, $window) {


    Clear();
    //$scope.VAT_CompanyVATIssue.TotalAmount = 0;
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        if ($rootScope.$PermissionList !== undefined) {
            $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Company VAT').ScreenId;
            // GetUsersPermissionDetails();
        }
        else {
            setTimeout(function () {
                $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Company VAT').ScreenId;
                // GetUsersPermissionDetails();
            }, 500);
        }


        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForVATIssue($scope.currentPage);

        $scope.Name = "Company VAT";
        $scope.ddlCompany = null;
        $scope.VAT_CompanyVATIssue = {};

        GetCompanyPayment_GetByCompanyIdForCompanyVATIssue();
        $scope.CompanyBillList = [];
        $scope.CheckCompanyBillIssue = [];
        $scope.CompanyVatIssueGetPagedlist = [];

       // $scope.VAT_CompanyVATIssue.TrChallanDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
       // $scope.VAT_CompanyVATIssue.ChallanDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.VAT_CompanyVATIssue.ChequeDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        getMaxCompanyVatIssue();
        GetAllActivePaymentType();
        $scope.paymentTypelist = [];
        $scope.ColDynamic = "col-md-3";
        $scope.ColDynamicRemarks = "col-md-3";
        $scope.ChequeTypeList = [];
        GetAllChequeType();
        $scope.MBankingServiceList = [];
        GetAllActiveMBankingServiceType();
        $scope.ChequePaymentSubTypeList = [];
        $scope.MobilePaymentSubTypeList = [];
        GetAllPaymentSubType();

        $scope.CompanyBankAccountList = [];
        $scope.ReceiverBankAccountList = [];
        $scope.BankAccountList = [];

        GetAllBankAccount();
        GetByVoucherGenerate();

        GetAllEmployee();
        $scope.EmployeeList = [];

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

        $scope.CompanyIdList = [];
        $scope.example8data = [];
        $scope.companyPlaceholder = {
            buttonDefaultText: "Select Customer",
            searchPlaceholder: "Search Customer"
        };
        $scope.selectCompany = document.getElementById("selectCompany").getElementsByTagName('button')[0];
        $scope.selectCompanyMenu = document.getElementById("selectCompany").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectCompany.setAttribute("disabled", "disabled");
        $scope.selectCompany.style.width = "100%";
        $scope.selectCompanyMenu.style.width = "100%";
    }


    $("#CompanytxtPayOrderDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangePayOrderDate = function () {
        $("#CompanytxtPayOrderDate").focus();
        $("#CompanytxtPayOrderDate").trigger("click");
    }

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

    $("#ChallanNoDatetext").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForChallanDate = function () {
        $("#ChallanNoDatetext").focus();
        $("#ChallanNoDatetext").trigger("click");
    }

    $("#IssueDateText").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForIssueDate = function () {
        $("#IssueDateText").focus();
        $("#IssueDateText").trigger("click");
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

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            $scope.ddlPreparedBy = { EmployeeId: $scope.LoginUser.EmployeeId };

        });
    }


    function getMaxCompanyVatIssue() {

        $http({
            url: '/CompanyVatAit/GetMaxCompanyVatIssueNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxTrChallanNo = data;
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
                $scope.VAT_CompanyVATIssue.TrChallanNo = 'RTL/' + $scope.finYearEPZ + '/' + $scope.MaxTrChallanNo;
            });


        });


    }

    function GetCompanyPayment_GetByCompanyIdForCompanyVATIssue() {
        $http({
            url: '/CompanyVatAit/GetCompanyPayment_GetByCompanyIdForCompanyVATIssue',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyList = data.filter((Sup, aData, index) => index.findIndex(v => v.CompanyId === Sup.CompanyId) === aData);

            angular.forEach($scope.CompanyList, function (aData) {
                $scope.example8data.push({ id: aData.CompanyId, label: aData.CompanyName });
            })
        });
    }

    $scope.GetByCompany = function () {
        // $scope.CompanyIdList;
        $scope.CompanyIds = '';
        angular.forEach($scope.CompanyIdList, function (data) {
            $scope.CompanyIds += $scope.CompanyIds == '' ? data.id : (',' + data.id)

        });

        $http({
            url: '/CompanyVatAit/GetCompanyPayment_GetByCompanyIdForCompanyVATIssue?CompanyIds=' + $scope.CompanyIds,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.SalesInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SalesInvoiceDate = date1;
                    }

                    aSd.VATAmount = aSd.TotalVAT;
                })
            }
            else
                alertify.log('No Company Payment Found', 'error', '5000');

            $scope.CompanyBillList = data;
        });



    }

    $scope.CheckCompanyVatIssue = function () {
        $scope.$CompanyBillList1 = $scope.CompanyBillList.filter(aData => aData.IsCheck == true);
        $scope.VAT_CompanyVATIssue.TotalVATAmount = 0;
        $scope.VAT_CompanyVATIssue.TotalAmount = 0;
        angular.forEach($scope.$CompanyBillList1, function (aData) {
            $scope.VAT_CompanyVATIssue.TotalVATAmount += aData.VATAmount;
            $scope.VAT_CompanyVATIssue.TotalAmount += aData.BillAmount;

        })

    }


    function GetAllActivePaymentType() {

        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            var data1 = data.filter(aData => aData.PaymentTypeId != 5 && aData.PaymentTypeId != 6 && aData.PaymentTypeId != 7 && aData.PaymentTypeId != 10 && aData.PaymentTypeId != 11)
            $scope.paymentTypelist = data1;

        });
    }



    $scope.CompanyVatSave = function () {
        $scope.CheckCompanyBillIssueFilter = [];

        var isValid = true;
        if ($scope.ddlPreparedBy == null || $scope.ddlPreparedBy == undefined) {
            alertify.log('Submitted by must be entry!!!', 'error', '5000');
            return;
        }

        $scope.VAT_CompanyVATIssue.SubmittedBy = $scope.ddlPreparedBy.EmployeeId;
        $scope.VAT_CompanyVATIssue.CreatorId = $scope.LoginUser.UserId;
        $scope.VAT_CompanyVATIssue.UpdatorId = $scope.LoginUser.UserId;

        if ($scope.ddlPayment == null || $scope.ddlPayment == undefined) {
            alertify.log('Payment method must be entry!!!', 'error', '5000');
            return;
        } else {
            $scope.VAT_CompanyVATIssue.PaymentTypeId = $scope.ddlPayment.PaymentTypeId;
        }
        $scope.VAT_CompanyVATIssue.MobileBankingServiceId = $scope.ddlServiceName == null ? 0 : $scope.ddlServiceName.PaymentSubTypeId;
        $scope.VAT_CompanyVATIssue.ChequeTypeId = $scope.ddlChequeType == null ? 0 : $scope.ddlChequeType.PaymentSubTypeId;
        $scope.VAT_CompanyVATIssue.PayerBankAccountId = $scope.ddlCompanyBankAccount == null ? 0 : $scope.ddlCompanyBankAccount.BankAccountId;
        $scope.VAT_CompanyVATIssue.PayerBankAccountId = $scope.ddlReceiverBankAccount == null ? 0 : $scope.ddlReceiverBankAccount.BankAccountId;


        if ($scope.$CompanyBillList1.lngth != 0) {
            var prams = JSON.stringify({ rcv_CompanyVAT: $scope.VAT_CompanyVATIssue, rcv_CompanyVATDetails: $scope.$CompanyBillList1 });
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {

                    $http.post('/CompanyVatAit/Save', prams).success(function (data) {
                        if (data > 0) {
                            Clear();
                            $scope.$CompanyBillList1 = [];
                            alertify.log('Company VAT Issue Save' + status + ' Successfully!', 'success', '5000');
                        } else {
                            alertify.log('Server Errors!', 'error', '5000');
                        }
                    }).error(function (data) {
                        alertify.log('Server Errors!', 'error', '5000');
                    });

                }
            });
        } else {
            alertify.log('Bill Details Must be entry', 'error', '5000');
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


                if (aData.AccountFor == 'Company') {
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
        var Bank = $scope.ReceiverBankAccountList.filter(i => !$scope.CompanyBankAccountList.includes(i.BankAccountId));
        $scope.ReceiverBankAccountList = Bank;

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
            //$scope.VAT_CompanyVATIssue.AdvanceAmount = $scope.CompanyPaymentList[0].AdvanceAmount;

        }
        else if (aPayment.Code == "bd") {
            //ddlId 6
            $scope.ColDynamic = "col-md-4";
            $scope.ColDynamicRemarks = "col-md-5"
            // SalesInvoiceCommon();
            //  $scope.VAT_CompanyVATIssue.OnAccountAmount = $scope.CompanyPaymentList[0].OnAccountAmount;
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
            $scope.ColDynamic = "col-md-3"
            $scope.ColDynamicRemarks = "col-md-3"
        }
    }


    $scope.onChequeGetById = function (PaymentTypeId, PaymentGroupId) {
        if (PaymentTypeId == 3) {
            $scope.VAT_CompanyVATIssue.ChequeDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM d, yyyy');
        }
        GetAllBankAccount();

        if (PaymentTypeId == 3) {

            $scope.VAT_CompanyVATIssue.TransactionNo = '';
            $scope.VAT_CompanyVATIssue.MoneyReceiptNo = '';
            // $scope.VAT_CompanyVATIssue.ReceiptVoucherNo = '';
            $scope.VAT_CompanyVATIssue.MobileNo = '';
            $scope.VAT_CompanyVATIssue.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;

            $('#bankddlCompanyOnlinePayment').select2('destroy');
            $("#bankddlCompanyOnlinePayment").val('').select2({
                //  placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                //  placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                // placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                //  placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
        }
        else if (PaymentTypeId == 6) {
            $scope.VAT_CompanyVATIssue.ChequeNo = '';
            // $scope.VAT_CompanyVATIssue.ReceiptVoucherNo = '';
            $scope.VAT_CompanyVATIssue.MoneyReceiptNo = '';
            $scope.VAT_CompanyVATIssue.ChequeDate = '';
            $scope.VAT_CompanyVATIssue.BankAccountId = 0;
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
                // placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                // placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                //   placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                //  placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
        }
        else if (PaymentTypeId == 4) {

            $scope.VAT_CompanyVATIssue.ChequeNo = '';
            //  $scope.VAT_CompanyVATIssue.ReceiptVoucherNo = '';
            $scope.VAT_CompanyVATIssue.MoneyReceiptNo = '';
            $scope.VAT_CompanyVATIssue.ChequeDate = '';
            $scope.VAT_CompanyVATIssue.BankAccountId = 0;
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
                // placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                //   placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                // placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                // placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });

        } else if (PaymentTypeId == 1) {


            $scope.VAT_CompanyVATIssue.ChequeNo = '';
            $scope.VAT_CompanyVATIssue.ChequeDate = '';
            $scope.VAT_CompanyVATIssue.BankAccountId = 0;
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
                // placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                //placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                //  placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $scope.VAT_CompanyVATIssue.TransactionNo = '';
            $scope.VAT_CompanyVATIssue.MobileNo = '';
            $scope.VAT_CompanyVATIssue.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        } else if (PaymentGroupId == 5) {
            $scope.VAT_CompanyVATIssue.MoneyReceiptNo = '';
            $scope.VAT_CompanyVATIssue.ChequeNo = '';

            $scope.VAT_CompanyVATIssue.ChequeDate = '';
            $scope.VAT_CompanyVATIssue.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;

            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                // placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrder').select2('destroy');
            $("#bankddlPayOrder").val('').select2({
                //  placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false

            });
            $scope.VAT_CompanyVATIssue.MobileNo = '';
            $scope.VAT_CompanyVATIssue.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }

        else {
            // $scope.VAT_CompanyVATIssue.ReceiptVoucherNo = '';
            $scope.VAT_CompanyVATIssue.MoneyReceiptNo = '';
            $scope.VAT_CompanyVATIssue.ChequeNo = '';

            $scope.VAT_CompanyVATIssue.ChequeDate = '';
            $scope.VAT_CompanyVATIssue.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;

            $('#bankddl').select2('destroy');
            $("#bankddl").val('').select2({
                // placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrder').select2('destroy');
            $("#bankddlPayOrder").val('').select2({
                //  placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false

            });
            $('#bankddlCompanyOnlinePayment').select2('destroy');
            $("#bankddlCompanyOnlinePayment").val('').select2({
                // placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                // placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlCompanyOnlinePaymentForCheque').select2('destroy');
            $("#bankddlCompanyOnlinePaymentForCheque").val('').select2({
                //   placeholder: "Select Customer Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePaymentForCheque').select2('destroy');
            $("#bankddlReceiverOnlinePaymentForCheque").val('').select2({
                //  placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $scope.VAT_CompanyVATIssue.TransactionNo = '';
            $scope.VAT_CompanyVATIssue.MobileNo = '';
            $scope.VAT_CompanyVATIssue.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }

    }

    function GetByVoucherGenerate() {

        $http({
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=RV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.VAT_CompanyVATIssue.ReceiptVoucherNo = data;
            console.log('Rcv', data);

        });

    }

    $scope.Reset = function () {
        Clear();
    }


    $("#txtFromVAT").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForVAT = function () {
        $("#txtFromVAT").focus();
        $("#txtFromVAT").trigger("click");
    }


    $("#txtToDateForVAT").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForVAT = function () {
        $("#txtToDateForVAT").focus();
        $("#txtToDateForVAT").trigger("click");
    }

    $scope.reloadBtn = function () {
        $('#txtFromVAT').val('');
        $('#txtToDateForVAT').val('');
        $('#ProductionAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchProductionNoAndStore = null;
        GetPagedForVATIssue(1);
        $scope.isReportDisabled = false;
    }

    $scope.SpplierVATSearch = function () {
        GetPagedForVATIssue(1);

    }

    function GetPagedForVATIssue(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromVAT").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForVAT").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchProductionNoAndStore != undefined && $scope.SearchProductionNoAndStore != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([CV].[TrChallanDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([CV].[TrChallanNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%')";

        }
        else if ($scope.SearchProductionNoAndStore !== undefined && $scope.SearchProductionNoAndStore != null && $scope.SearchProductionNoAndStore != "") {
            SearchCriteria = "[CV].[TrChallanNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[CV].[TrChallanDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }



        $http({
            url: encodeURI('/CompanyVatAit/VATCompanyGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.CompanyVatIssueGetPagedlist = data.ListData;
            //  $scope.total_count = data.TotalRecord;
            $scope.total_count = data.TotalRecord;
            if (data.ListData.length > 0) {

                angular.forEach(data.ListData, function (aPro) {

                    var res1 = aPro.ChallanDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPro.ChallanDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aPro.ChallanDate = date1;
                    }

                    var res2 = aPro.TrChallanDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPro.TrChallanDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aPro.TrChallanDate = date1;
                    }
                })

            }
            else {

                alertify.log('VAT Issue Not Found', 'error', '5000');

            }

        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForVATIssue($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForVATIssue($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForVATIssue($scope.currentPage);
        }
        //  }


    }
    
    $scope.ReportView = function (aSupVat) {
        var mushakBtn = {};
        mushakBtn.TrChallanId = aSupVat.TrChallanId;
        mushakBtn.IsCompanyVAT = true;

        $window.open("#/TreasuryChallan", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("TDSIssue", mushakBtn);
        event.stopPropagation();
    }

});