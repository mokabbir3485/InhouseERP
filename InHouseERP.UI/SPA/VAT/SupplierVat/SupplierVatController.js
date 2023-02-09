app.controller("SupplierVatController", function ($scope, $rootScope, $cookieStore, $http, $filter, $window) {

   
    Clear();
    $scope.Vat_SupplierVatIssue.TotalAmount = 0;
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        if ($rootScope.$PermissionList !== undefined) {
            $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Supplier Vat').ScreenId;
           // GetUsersPermissionDetails();
        }
        else {
            setTimeout(function () {
                $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Supplier Vat').ScreenId;
               // GetUsersPermissionDetails();
            }, 500);
        }

        
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForVDSIssue($scope.currentPage);

        $scope.Name = "Supplier Vat";
        $scope.ddlSupplier = null;
        $scope.Vat_SupplierVatIssue = {};

        GetPbForSupplier();
        $scope.SupplierBillList = [];
        $scope.SupplierBillFilterList = [];
        $scope.SupplierBillList1 = [];
        $scope.CheckSupplierBillIssue = [];
        $scope.SupplierVdsIssueGetPagedlist = [];

       // $scope.Vat_SupplierVatIssue.VDSIssueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
      //  $scope.Vat_SupplierVatIssue.ChallanDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.Vat_SupplierVatIssue.ChequeDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        getMaxSupplierVdsIssue();
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

        $scope.SupplierIdList = [];
        $scope.example8data = [];
        $scope.supplierPlaceholder = {
            buttonDefaultText: "Select Supplier",
            searchPlaceholder: "Search Supplier"
        };

        $scope.example8settings = {
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
         
        };

        $scope.selectSupplier = document.getElementById("selectSupplier").getElementsByTagName('button')[0];
        $scope.selectSupplierMenu = document.getElementById("selectSupplier").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectCompany.setAttribute("disabled", "disabled");
        $scope.selectSupplier.style.width = "100%";
        $scope.selectSupplierMenu.style.width = "100%";
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


    function getMaxSupplierVdsIssue() {
       
        $http({
            url: '/VAT/GetMaxSupplierVdsIssueNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxReqNo = data;
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
                $scope.Vat_SupplierVatIssue.VDSIssueNo = 'VDS/' + $scope.finYearEPZ + '/' + $scope.MaxReqNo;
            });


        });


    }

    function GetPbForSupplier() {
        $http({
            url: '/PurchaseBill/proc_PurchaseBillNo_GetForVDSIssue',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierBillFilterList = data;
            $scope.SupplierBillList = data.filter((Sup, aData, index) => index.findIndex(v => v.SupplierName === Sup.SupplierName) === aData);

            angular.forEach($scope.SupplierBillList, function (aData) {
                $scope.example8data.push({ id: aData.SupplierId, label: aData.SupplierName });
            })
        });
    }

    $scope.GetBySupplier = function () {
       // $scope.SupplierIdList;
        $scope.SupplierIds = '';
        angular.forEach($scope.SupplierIdList, function (data) {
            $scope.SupplierIds += $scope.SupplierIds == '' ? data.id : (',' + data.id)

        });

        $http({
            url: '/VAT/pay_SupplierPayment_GetBySupplierIdForVDSIssue?SupplierIds=' + $scope.SupplierIds,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.PBDate = date1;
                    }

                    aSd.VDSAmount = aSd.TotalVAT;
                    aSd.VDSAmount = aSd.TotalVAT;
                })
            }
            else
                alertify.log('No Purchase Bill Found', 'error', '5000');

            $scope.SupplierBillList1 = data;
        });

       

    }

   $scope.CheckSupplierVatIssue = function () {
        $scope.$SupplierBillList1 = $scope.SupplierBillList1.filter(aData => aData.IsCheck == true);
       $scope.Vat_SupplierVatIssue.TotalVDSAmount = 0;
       $scope.Vat_SupplierVatIssue.TotalAmount = 0;
        angular.forEach($scope.$SupplierBillList1, function (aData) {
            $scope.Vat_SupplierVatIssue.TotalVDSAmount += aData.VDSAmount;
            $scope.Vat_SupplierVatIssue.TotalAmount += aData.BillAmount;
            
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

   

    $scope.SupplierVatSave = function () {
        $scope.CheckSupplierBillIssueFilter = [];

        var isValid = true;
        if ($scope.ddlPreparedBy == null || $scope.ddlPreparedBy == undefined) {
            alertify.log('Submitted by must be entry!!!', 'error', '5000');
            return;
        }

        $scope.Vat_SupplierVatIssue.SubmittedBy = $scope.ddlPreparedBy.EmployeeId;
        $scope.Vat_SupplierVatIssue.CreatorId = $scope.LoginUser.UserId;
        $scope.Vat_SupplierVatIssue.UpdatorId = $scope.LoginUser.UserId;

        //if ($scope.ddlServiceName == null || $scope.ddlServiceName == undefined) {
        //    $scope.Vat_SupplierVatIssue.MobileBankingServiceId = 0;
        //} else {
        //    $scope.Vat_SupplierVatIssue.MobileBankingServiceId = $scope.ddlServiceName.PaymentSubTypeId;
        //}

        //if ($scope.ddlChequeType == null || $scope.ddlChequeType == undefined) {
        //    $scope.Vat_SupplierVatIssue.ChequeTypeId = 0;
        //} else {
        //    $scope.Vat_SupplierVatIssue.ChequeTypeId = $scope.ddlChequeType.PaymentSubTypeId;
        //}

        if ($scope.ddlPayment == null || $scope.ddlPayment == undefined) {
            alertify.log('Payment method must be entry!!!', 'error', '5000');
            return;
        } else {
            $scope.Vat_SupplierVatIssue.PaymentTypeId = $scope.ddlPayment.PaymentTypeId;
        }
        $scope.Vat_SupplierVatIssue.MobileBankingServiceId = $scope.ddlServiceName == null ? 0 : $scope.ddlServiceName.PaymentSubTypeId;
        $scope.Vat_SupplierVatIssue.ChequeTypeId = $scope.ddlChequeType == null ? 0 : $scope.ddlChequeType.PaymentSubTypeId;
        $scope.Vat_SupplierVatIssue.PayerBankAccountId = $scope.ddlCompanyBankAccount == null ? 0 : $scope.ddlCompanyBankAccount.BankAccountId;
        $scope.Vat_SupplierVatIssue.PayerBankAccountId = $scope.ddlReceiverBankAccount == null ? 0 : $scope.ddlReceiverBankAccount.BankAccountId;


      
       
        //if ($scope.ddlCompanyBankAccount == null || $scope.ddlCompanyBankAccount == undefined) {
        //    $scope.Vat_SupplierVatIssue.PayerBankAccountId = 0;
        //} else {
        //    $scope.Vat_SupplierVatIssue.PayerBankAccountId = $scope.ddlCompanyBankAccount.BankAccountId;
        //}

        //if ($scope.ddlReceiverBankAccount == null || $scope.ddlReceiverBankAccount == undefined) {
        //    $scope.Vat_SupplierVatIssue.PayerBankAccountId = 0;
        //} else {
        //    $scope.Vat_SupplierVatIssue.PayerBankAccountId = $scope.ddlReceiverBankAccount.BankAccountId;
        //}
        
     

        if ($scope.$SupplierBillList1.lngth !=0) {
            var prams = JSON.stringify({ _VAT_VDS: $scope.Vat_SupplierVatIssue, _vatDetails: $scope.$SupplierBillList1 });
            console.log($scope.Vat_SupplierVatIssue);
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {

                    $http.post('/VAT/Save', prams).success(function (data) {
                        //if (data > 0) {
                          //  $scope.Btn = "Save";
                            Clear();
                            $scope.$SupplierBillList1 = [];
                           // $scope.Vat_SupplierVatIssue = {};
                            alertify.log('Supplier VAT Issue Save' + status + ' Successfully!', 'success', '5000');
                        //}
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


                if (aData.AccountFor == 'Supplier') {
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
            //$scope.Vat_SupplierVatIssue.AdvanceAmount = $scope.CompanyPaymentList[0].AdvanceAmount;

        }
        else if (aPayment.Code == "bd") {
            //ddlId 6
            $scope.ColDynamic = "col-md-4";
            $scope.ColDynamicRemarks = "col-md-5"
            // SalesInvoiceCommon();
            //  $scope.Vat_SupplierVatIssue.OnAccountAmount = $scope.CompanyPaymentList[0].OnAccountAmount;
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
            $scope.Vat_SupplierVatIssue.ChequeDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM d, yyyy');
        }
        GetAllBankAccount();

        if (PaymentTypeId == 3) {

            $scope.Vat_SupplierVatIssue.TransactionNo = '';
            $scope.Vat_SupplierVatIssue.MoneyReceiptNo = '';
            // $scope.Vat_SupplierVatIssue.ReceiptVoucherNo = '';
            $scope.Vat_SupplierVatIssue.MobileNo = '';
            $scope.Vat_SupplierVatIssue.MobileBankingServiceId = 0;
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
            $scope.Vat_SupplierVatIssue.ChequeNo = '';
            // $scope.Vat_SupplierVatIssue.ReceiptVoucherNo = '';
            $scope.Vat_SupplierVatIssue.MoneyReceiptNo = '';
            $scope.Vat_SupplierVatIssue.ChequeDate = '';
            $scope.Vat_SupplierVatIssue.BankAccountId = 0;
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

            $scope.Vat_SupplierVatIssue.ChequeNo = '';
            //  $scope.Vat_SupplierVatIssue.ReceiptVoucherNo = '';
            $scope.Vat_SupplierVatIssue.MoneyReceiptNo = '';
            $scope.Vat_SupplierVatIssue.ChequeDate = '';
            $scope.Vat_SupplierVatIssue.BankAccountId = 0;
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


            $scope.Vat_SupplierVatIssue.ChequeNo = '';
            $scope.Vat_SupplierVatIssue.ChequeDate = '';
            $scope.Vat_SupplierVatIssue.BankAccountId = 0;
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
            $scope.Vat_SupplierVatIssue.TransactionNo = '';
            $scope.Vat_SupplierVatIssue.MobileNo = '';
            $scope.Vat_SupplierVatIssue.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        } else if (PaymentGroupId == 5) {
            $scope.Vat_SupplierVatIssue.MoneyReceiptNo = '';
            $scope.Vat_SupplierVatIssue.ChequeNo = '';

            $scope.Vat_SupplierVatIssue.ChequeDate = '';
            $scope.Vat_SupplierVatIssue.BankAccountId = 0;
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
            $scope.Vat_SupplierVatIssue.MobileNo = '';
            $scope.Vat_SupplierVatIssue.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }

        else {
            // $scope.Vat_SupplierVatIssue.ReceiptVoucherNo = '';
            $scope.Vat_SupplierVatIssue.MoneyReceiptNo = '';
            $scope.Vat_SupplierVatIssue.ChequeNo = '';

            $scope.Vat_SupplierVatIssue.ChequeDate = '';
            $scope.Vat_SupplierVatIssue.BankAccountId = 0;
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
            $scope.Vat_SupplierVatIssue.TransactionNo = '';
            $scope.Vat_SupplierVatIssue.MobileNo = '';
            $scope.Vat_SupplierVatIssue.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }

    }

    function GetByVoucherGenerate() {

        $http({
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=RV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Vat_SupplierVatIssue.ReceiptVoucherNo = data;
            console.log('Rcv', data);

        });

    }

    $scope.Reset = function () {
        Clear();
    }


    $("#txtFromVDS").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForVDS = function () {
        $("#txtFromVDS").focus();
        $("#txtFromVDS").trigger("click");
    }


    $("#txtToDateForVDS").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForVDS = function () {
        $("#txtToDateForVDS").focus();
        $("#txtToDateForVDS").trigger("click");
    }

    $scope.reloadBtn = function () {
        $('#txtFromVDS').val('');
        $('#txtToDateForVDS').val('');
        $('#ProductionAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchProductionNoAndStore = null;
        GetPagedForVDSIssue(1);
        $scope.isReportDisabled = false;
    }

    $scope.SpplierVDSSearch = function () {
        GetPagedForVDSIssue(1);

    }

    function GetPagedForVDSIssue(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromVDS").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForVDS").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchProductionNoAndStore != undefined && $scope.SearchProductionNoAndStore != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([V].[VDSIssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([V].[VDSIssueNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%')";

        }
        else if ($scope.SearchProductionNoAndStore !== undefined && $scope.SearchProductionNoAndStore != null && $scope.SearchProductionNoAndStore != "") {
            SearchCriteria = "[V].[VDSIssueNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[V].[VDSIssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }



        $http({
            url: encodeURI('/Vat/VAT_VDSCertifications_GetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.SupplierVdsIssueGetPagedlist = data.ListData;
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

                    var res2 = aPro.VDSIssueDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPro.VDSIssueDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aPro.VDSIssueDate = date1;
                    }
                })

            }
            else {

                alertify.log('VDS Issue Not Found', 'error', '5000');

            }

        });
    }

    $scope.getData = function (curPage) {
     
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForVDSIssue($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForVDSIssue($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForVDSIssue($scope.currentPage);
        }
        //  }


    }

    $scope.ReportView = function (aSupVds) {
        var mushakBtn = {};
        mushakBtn.VDSIssueId = aSupVds.VDSIssueId;
        mushakBtn.IsVdsFlag = true;


    
            


        //$window.open("#/Mushak6_6", "popup", "width=850,height=550,left=280,top=80");
        //$cookieStore.put("Mushak6_6", mushakBtn);


        $window.open("#/TreasuryChallan", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("TDSIssue", mushakBtn);
        event.stopPropagation();
    }

  
});