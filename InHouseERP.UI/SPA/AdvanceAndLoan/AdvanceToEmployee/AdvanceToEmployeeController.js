
app.controller("AdvanceToEmployeeController", function ($scope, $rootScope, $http, $filter, $cookieStore, $timeout, $window) {


    Clear();
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Advance To Employee').ScreenId;

        $scope.AdvanceToEmployeeGetPagedList = [];
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedSP($scope.currentPage);

        $scope.currentPageOB = 1;
        $scope.PerPageOB = 10;
        $scope.total_countOB = 0;
        $scope.SearchSupplierName = "";

        $scope.AdvanceToEmployee = {};
        $scope.ddlSupplier = null;
        $scope.ddlBankAccount = null;
        $scope.ddlPayerBankAccount = null;
        $scope.ddlSuppilerBankAccount = null;
        $scope.ddlPayOrderBankAccount = null;
        $scope.ddlChecqueBankAccount = null;

        $scope.employeeList = [];
        $scope.SuppilerBankAccountList = [];
        $scope.PayerBankAccountList = [];
        $scope.paymentTypelist = [];
        $scope.ChequeTypeList = [];

        $scope.ddlCheque = null;

        $scope.AdvanceToEmployee.PaymentDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');



        GetAllEmployee();
        GetAllBankAccount();
        GetAllActivePaymentType();
        GetAllChequeType();

        $scope.ddlServiceName = null;
        GetAllActiveMBankingServiceType();
        $scope.MBankingServiceList = [];

        $scope.ddlCurrencyType = null;

        GetAllPaymentSubType();
        $scope.ChequePaymentSubTypeList = [];
        $scope.MobilePaymentSubTypeList = [];

        GetAdvancePaymentMaxNo();

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
            //        theme: "classic",
            //    }).val($scope.LoginUser.EmployeeId).trigger("change");

            //}, 0);

            //$scope.AdvanceToEmployee.EmployeeId = $scope.LoginUser.EmployeeId;

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
    function GetAdvancePaymentMaxNo() {

        $http({
            url: '/AdvanceToEmployee/GetAdvancePaymentMaxNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxAdvancePaymentNo = data;
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
                $scope.AdvanceToEmployee.AdvancePaymentNo = 'APN/' + $scope.finYearHeadOffice + '/' + $scope.MaxAdvancePaymentNo;
            });

        });
    }



   
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
                if (aPay.PaymentTypeId != 6) {
                    $scope.paymentTypelist.push(aPay);
                }
            })


        })
    }




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



    $scope.onChequeGetById = function (PaymentTypeId, PaymentGroupId) {

        if (PaymentTypeId == 2) {
            //GetAllBankAccount();
            $scope.AdvanceToEmployee.TransactionNo = '';
        }

        if (PaymentTypeId == 3) {
            $scope.AdvanceToEmployee.TransactionNo = '';
            $scope.checqueShowDiv = true;
            //GetAllBankAccount();
        } else {
            $scope.AdvanceToEmployee.TransactionNo = '';
            $scope.checqueShowDiv = false;
            $scope.ddlBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            //$scope.BankAccountList = [];


        }


        if (PaymentTypeId == 3) {

            $scope.AdvanceToEmployee.TransactionNo = '';
            $scope.AdvanceToEmployee.MoneyReceiptNo = '';
            $scope.AdvanceToEmployee.MobileNo = '';
            $scope.AdvanceToEmployee.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
            $scope.AdvanceToEmployee.MoneyReceiptNo = '';
        }
        else if (PaymentTypeId == 4) {
            $scope.AdvanceToEmployee.MoneyReceiptNo = '';
            $scope.AdvanceToEmployee.ChequeNo = '';
            $scope.AdvanceToEmployee.ChequeDate = '';
            $scope.AdvanceToEmployee.ReceiverBankAccountId = 0;
            $scope.AdvanceToEmployee.PayerBankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
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
            $scope.AdvanceToEmployee.ChequeNo = '';
            $scope.AdvanceToEmployee.ChequeDate = '';
            $scope.AdvanceToEmployee.ReceiverBankAccountId = 0;
            $scope.AdvanceToEmployee.PayerBankAccountId = 0;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
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
            $scope.AdvanceToEmployee.TransactionNo = '';
            $scope.AdvanceToEmployee.MobileNo = '';
            $scope.AdvanceToEmployee.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        } else if (PaymentGroupId == 5) {
            $scope.AdvanceToEmployee.MoneyReceiptNo = '';
            $scope.AdvanceToEmployee.ChequeNo = '';
            $scope.AdvanceToEmployee.MoneyReceiptNo = '';
            $scope.AdvanceToEmployee.ChequeDate = '';
            $scope.AdvanceToEmployee.ReceiverBankAccountId = 0;
            $scope.AdvanceToEmployee.PayerBankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;

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
            $scope.AdvanceToEmployee.MobileNo = '';
            $scope.AdvanceToEmployee.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else {
            $scope.AdvanceToEmployee.TransactionNo = '';
            $scope.AdvanceToEmployee.MoneyReceiptNo = '';
            $scope.AdvanceToEmployee.ChequeNo = '';
            $scope.AdvanceToEmployee.MoneyReceiptNo = '';
            $scope.AdvanceToEmployee.ChequeDate = '';
            $scope.AdvanceToEmployee.ReceiverBankAccountId = 0;
            $scope.AdvanceToEmployee.PayerBankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;

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

            $scope.AdvanceToEmployee.MobileNo = '';
            $scope.AdvanceToEmployee.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }


    }



    $scope.AdvanceToEmployeeSave = function () {


        if ($scope.ddlEmployee != undefined) {
            $scope.AdvanceToEmployee.EmployeeId = $scope.ddlEmployee.EmployeeId;
        }
        $scope.AdvanceToEmployee.UpdatorId = $scope.LoginUser.UserId;

        if ($scope.AdvanceToEmployee.ReceiverBankAccountId == null || $scope.AdvanceToEmployee.ReceiverBankAccountId == undefined || $scope.AdvanceToEmployee.PayerBankAccountId == null || $scope.AdvanceToEmployee.PayerBankAccountId == undefined) {
            $scope.AdvanceToEmployee.ReceiverBankAccountId = 0;
            $scope.AdvanceToEmployee.PayerBankAccountId = 0;
        }

        if ($scope.AdvanceToEmployee.PaymentDate == null || $scope.AdvanceToEmployee.PaymentDate == undefined || $scope.AdvanceToEmployee.PaymentDate == '') {
            alertify.log('Please Select Payment Date  !', 'error', '5000');
        }
        else if ($scope.ddlCheque == null || $scope.ddlCheque == undefined || $scope.ddlCheque == 0) {
            alertify.log('Please Select Payment Type  !', 'error', '5000');
        }
        else
        {

            $scope.AdvanceToEmployee.PaymentTypeId = $scope.ddlCheque.PaymentTypeId;

            if ($scope.ddlServiceName == null || $scope.ddlServiceName == undefined) {
                $scope.ddlServiceName = {};
                $scope.ddlServiceName.MobileBankingServiceId = 0;
            } else {
                $scope.AdvanceToEmployee.MobileBankingServiceId = $scope.ddlServiceName.PaymentSubTypeId;
            }

            if ($scope.ddlChequeType == null || $scope.ddlChequeType == undefined) {
                $scope.AdvanceToEmployee.ChequeTypeId = 0;
            } else {
                $scope.AdvanceToEmployee.ChequeTypeId = $scope.ddlChequeType.PaymentSubTypeId;
            }


            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    $http({
                        url: "/AdvanceToEmployee/PostAdvanceToEmployee",
                        method: "POST",
                        data: JSON.stringify({ AdvanceToEmployee: $scope.AdvanceToEmployee }),
                    }).success(function (data) {
                        if (data > 0) {
                            $('#ddlEmployee').select2('destroy');
                            $('#ddlEmployee').val('').select2({

                                theme: "classic",
                                dropdownAutoWidth: false
                            });
                            $('#bankddlOnlinePayment').select2('destroy');
                            $('#bankddlOnlinePayment').val('').select2({
                                placeholder: "Select Exporter Bank Name",
                                theme: "classic",
                                dropdownAutoWidth: false
                            });
                            alertify.log('Advance To Employee Save Successfully!', 'success', '5000');
                            Clear();
                            $scope.checqueShowDiv = false;
                            $scope.AdvanceToEmployee = {};

                            $scope.AdvanceToEmployeeForm.$setPristine();
                            $scope.AdvanceToEmployeeForm.$setUntouched();
                        }
                        else {
                            alertify.log('Server Errors!', 'error', '5000');
                        }

                    })
                }
            });
        }

    }

    $scope.SelAdvanceToEmployee = function (Advance) {
        $scope.AdvanceToEmployee = Advance;
        setTimeout(function () {
            $("#ddlEmployee").select2({
                theme: "classic",
            }).val(Advance.EmployeeId).trigger("change");

        }, 0);
        setTimeout(function () {
            $("#bankddlPayOrderPayment").select2({
                theme: "classic",
            }).val(Advance.ReceiverBankAccountId).trigger("change");

        }, 0);
        setTimeout(function () {
            $("#ChequeTypeSelect2").select2({
                theme: "classic",
            }).val(Advance.ChequeTypeId).trigger("change");

        }, 0);
        setTimeout(function () {
            $("#bankddlPayerOnlinePayment2").select2({
                theme: "classic",
            }).val(Advance.PayerBankAccountId).trigger("change");

        }, 0);
        setTimeout(function () {
            $("#bankddl").select2({
                theme: "classic",
            }).val(Advance.ReceiverBankAccountId).trigger("change");

        }, 0);

        setTimeout(function () {
            $("#bankddlPayerOnlinePayment1").select2({
                theme: "classic",
            }).val(Advance.PayerBankAccountId).trigger("change");

        }, 0);

         setTimeout(function () {
             $("#bankddlSuppilerOnlinePayment").select2({
                theme: "classic",
             }).val(Advance.ReceiverBankAccountId).trigger("change");

        }, 0);



        $scope.ddlCheque = { PaymentTypeId: Advance.PaymentTypeId };
        $scope.ddlServiceName = { PaymentSubTypeId: Advance.PaymentSubTypeId };
    }
    $scope.Reset = function () {
        $scope.ddlEmployee = null;
        $scope.AdvanceToEmployee = {};

        $scope.ddlEmployee = { SupplierId: null };

        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').val('').select2({
            theme: "classic",
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
        $scope.SearchAdvanceNoAndEmployee = null;
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


        if ($scope.SearchAdvanceNoAndEmployee != undefined && $scope.SearchAdvanceNoAndEmployee != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "(AE.[PaymentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and (AE.[AdvancePaymentNo] LIKE '%" + $scope.SearchAdvanceNoAndEmployee + "%' OR E.[EmployeeName] LIKE '%" + $scope.SearchAdvanceNoAndEmployee + "%' OR PT.[PaymentTypeName] LIKE '%" + $scope.SearchAdvanceNoAndEmployee + "%')";

        }
        else if ($scope.SearchAdvanceNoAndEmployee !== undefined && $scope.SearchAdvanceNoAndEmployee != null && $scope.SearchAdvanceNoAndEmployee != "") {
            SearchCriteria = "AE.[AdvancePaymentNo] LIKE '%" + $scope.SearchAdvanceNoAndEmployee + "%' OR E.[EmployeeName] LIKE '%" + $scope.SearchAdvanceNoAndEmployee + "%' OR PT.[PaymentTypeName] LIKE '%" + $scope.SearchAdvanceNoAndEmployee + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "AE.[PaymentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }

        $http({
            url: encodeURI('/AdvanceToEmployee/GetAdvanceToEmployeeGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.AdvanceToEmployeeGetPagedList = data.ListData;
            $scope.total_count = data.TotalRecord;
            if ($scope.AdvanceToEmployeeGetPagedList.length > 0) {
                angular.forEach($scope.AdvanceToEmployeeGetPagedList, function (aData) {
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


    $("#txtForPayOrderDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForPayOrderDate = function () {
        $("#txtForPayOrderDate").focus();
        $("#txtForPayOrderDate").trigger("click");
    }


    $scope.OpenReport = function (AdvanceToEmployee) {
        $window.open("#/AdvanceToEmployeeReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("AdvanceToEmployeeObject", JSON.stringify(AdvanceToEmployee));
        event.stopPropagation();
    }
});