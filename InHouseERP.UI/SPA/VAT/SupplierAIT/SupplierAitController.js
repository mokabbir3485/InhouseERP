app.controller("SupplierAITController", function ($scope, $cookieStore, $window, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    Clear();

    function Clear() {
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetSupplierAitPaged($scope.currentPage);
        $scope.pay_SupplierAit = {};
       // $scope.pay_SupplierAit.TDSIssueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
       // $scope.pay_SupplierAit.ChallanDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.pay_SupplierAit.PaymentDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetTDSIssueNo();
        GetAllEmployee();
        GetActiveSupplier();
        GetAllActivePaymentType();
        GetAllPaymentSubType();
        GetAllBankAccount();
        
        $scope.PurchaseBillList = [];
        $scope.paymentTypelist = [];
        $scope.ChequePaymentSubTypeList = [];
        $scope.MobilePaymentSubTypeList = [];
        $scope.BankAccountList = [];
        $scope.PayerBankAccountList = [];

        $scope.pay_SupplierAit.ChequeDate = null;

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
        $scope.SupplierIdList = [];
        $scope.example8data = [];
        $scope.supplierPlaceholder = {
            buttonDefaultText: "Select Supplier",
            searchPlaceholder: "Search Supplier"
        };
        $scope.selectSupplier = document.getElementById("selectSupplier").getElementsByTagName('button')[0];
        $scope.selectSupplierMenu = document.getElementById("selectSupplier").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectCompany.setAttribute("disabled", "disabled");
        $scope.selectSupplier.style.width = "100%";
        $scope.selectSupplierMenu.style.width = "100%";


    }
    $("#dtSupplierAitDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
        //minDate: $scope.MinDate,
        //maxDate: new Date(parseInt($scope.CurrentValuationSetup.ToDate.replace('/Date(', '')))
    });

    $scope.CalendarOpenSupplierAitDate = function () {
        $("#dtSupplierAitDate").focus();
        $("#dtSupplierAitDate").trigger("click");
    }
    $("#dtChallanDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
        //minDate: $scope.MinDate,
        //maxDate: new Date(parseInt($scope.CurrentValuationSetup.ToDate.replace('/Date(', '')))
    });

    $scope.CalendarOpenChallanDate = function () {
        $("#dtChallanDate").focus();
        $("#dtChallanDate").trigger("click");
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
    $("#txtForPayOrderDate").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ChangeForPayOrderDate = function () {
        $("#txtForPayOrderDate").focus();
        $("#txtForPayOrderDate").trigger("click");
    }
    $("#txtForChequeDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForChequeDate = function () {
        $("#txtForChequeDate").focus();
        $("#txtForChequeDate").trigger("click");
    }
    function GetTDSIssueNo() {
        $http({
            url: '/PurchaseAcknowledgement/GetTDSIssueNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxTDSIssueNo = data;
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
                $scope.pay_SupplierAit.TDSIssueNo = 'TDS/' + $scope.finYearHeadOffice + '/' + $scope.MaxTDSIssueNo;
            });
        });  

    }
    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;

            setTimeout(function () {

                $("#ddlSubmittedBy").select2({
                    theme: "classic",
                }).val($scope.LoginUser.EmployeeId).trigger("change");

            }, 0);

            $scope.pay_SupplierAit.SubmittedBy = $scope.LoginUser.EmployeeId;

        });
    }
    function GetActiveSupplier() {
        $http({
            //url: '/Supplier/GetDynamic?searchCriteria=IsActive=1&orderBy=SupplierName',
            url: '/PurchaseAcknowledgement/GetSupplierPayment_GetBySupplierIdForAIT',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierList = [...new Map(data.map(item =>
                [item['SupplierId'], item])).values()];

            angular.forEach($scope.supplierList, function (aData) {
                $scope.example8data.push({ id: aData.SupplierId, label: aData.SupplierName });
            })
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
    function GetAllBankAccount() {

        $http({
            url: '/BankAccount/GetAllBankAccount',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankAccountList = data;
            angular.forEach($scope.BankAccountList, function (aData) {
                if (aData.AccountFor == 'Exporter') {
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
    $scope.SearchPurchaseBill = function () {
        $scope.SupplierIds = '';
        angular.forEach($scope.SupplierIdList, function (data) {
            $scope.SupplierIds += $scope.SupplierIds == '' ? data.id : (',' + data.id)

        });
        $http({
            url: '/PurchaseAcknowledgement/GetSupplierPayment_GetBySupplierIdForAIT?SupplierId=' + $scope.SupplierIds,
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
                })
            }
            else
                alertify.log('No Purchase Bill Found', 'error', '5000');

            $scope.PurchaseBillList = data;
        });
    }

    $scope.RowSelect = function () {
        $scope.$PurchaseBillList = Enumerable.From($scope.PurchaseBillList).Where('$.selected==true').ToArray();
        $scope.TotalAITAmount = 0;
        $scope.TotalBillAmount = 0;
        angular.forEach($scope.$PurchaseBillList, function (aData) {
            $scope.TotalAITAmount += aData.AITAmount;
            $scope.TotalBillAmount += aData.BillAmount;

        })
        $scope.pay_SupplierAit.TotalAITAmount = $scope.TotalAITAmount;
        $scope.pay_SupplierAit.TotalBillAmount = $scope.TotalBillAmount;
    }

    $scope.SaveSupplierAit = function () {

        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $scope.pay_SupplierAit.UpdatorId = $scope.LoginUser.UserId;
                //angular.forEach($scope.$PurchaseBillList, function (aData) {
                //    aData.IssueDate = $scope.IssueDate;
                //    aData.UpdatorId = $scope.LoginUser.UserId;
                //    //aData.SumOfTotalVAT += aData.TotalVAT;
                //    //aData.SumOfTotalAIT += aData.TotalAIT;
                //    //aData.SumOfTotalAmount += aData.TotalAITAmount;

                //})

                var params = JSON.stringify({ pay_SupplierAit: $scope.pay_SupplierAit, purBillList: $scope.$PurchaseBillList });
                $http.post('/PurchaseAcknowledgement/SupplierAitCreate', params).success(function (data) {
                    if (data > 0) {
                        alertify.log('Supplier Ait saved successfully!', 'success', '5000');
                        Clear();
                        $scope.PurchaseBillList = [];
                        $scope.ddlSupplier = null;
                        $('#ddlSupplier').select2('destroy');
                        $('#ddlSupplier').val('').select2({
                            placeholder: "Select Supplier Name",
                            theme: "classic",
                            dropdownAutoWidth: false
                        });
                        $scope.SupplierAitForm.$setPristine();
                        $scope.SupplierAitForm.$setUntouched();
                    }
                    else {
                        alertify.log('Save failed, refresh page and try again', 'error', '5000');
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
            }
        })
    }
    $scope.resetForm = function () {
        Clear();
        $scope.PurchaseBillList = [];
        $scope.ddlSupplier = null;
        $('#ddlSupplier').select2('destroy');
        $('#ddlSupplier').val('').select2({
            placeholder: "Select Supplier Name",
            theme: "classic",
            dropdownAutoWidth: false
        });
        $scope.SupplierAitForm.$setPristine();
        $scope.SupplierAitForm.$setUntouched();
    }


    $scope.OpenPopupWindow = function (TDSIssueId) {
        var mushakBtn = {};
        mushakBtn.TDSIssueId = TDSIssueId.TDSIssueId;
        mushakBtn.IsVdsFlag = false;

        $window.open("#/TreasuryChallan", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("TDSIssue", mushakBtn);
        event.stopPropagation();
    };

    $scope.onChequeGetById = function (PaymentTypeId, PaymentGroupId) {
        if (PaymentTypeId == 3) {

            $scope.pay_SupplierAit.TransactionNo = '';
            $scope.pay_SupplierAit.MoneyReceiptNo = '';
            $scope.pay_SupplierAit.MobileNo = '';
            $scope.pay_SupplierAit.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
            $scope.pay_SupplierAit.MoneyReceiptNo = '';
        }
        else if (PaymentTypeId == 4) {
            $scope.pay_SupplierAit.MoneyReceiptNo = '';
            $scope.pay_SupplierAit.ChequeNo = '';
            $scope.pay_SupplierAit.MoneyReceiptNo = '';
            $scope.pay_SupplierAit.ChequeDate = null;
            $scope.pay_SupplierAit.PayerBankAccountId = 0;
            $scope.ddlPayerBankAccount = null;
            $('#bankddlPayerOnlinePayment').select2('destroy');
            $("#bankddlPayerOnlinePayment").val('').select2({
                placeholder: "Select Payer Bank Name",
                dropdownAutoWidth: false
            });

        } else if (PaymentTypeId == 1) {


            $scope.pay_SupplierAit.ChequeNo = '';
            $scope.pay_SupplierAit.ChequeDate = null;
            $scope.pay_SupplierAit.PayerBankAccountId = 0;
            $scope.ddlPayerBankAccount = null;

            $('#bankddlPayerOnlinePayment').select2('destroy');
            $("#bankddlPayerOnlinePayment").val('').select2({
                placeholder: "Select Payer Bank Name",
                dropdownAutoWidth: false
            });

            $scope.pay_SupplierAit.TransactionNo = '';
            $scope.pay_SupplierAit.MobileNo = '';
            $scope.pay_SupplierAit.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        } else if (PaymentGroupId == 5) {
            $scope.pay_SupplierAit.MoneyReceiptNo = '';
            $scope.pay_SupplierAit.ChequeNo = '';
            $scope.pay_SupplierAit.MoneyReceiptNo = '';
            $scope.pay_SupplierAit.ChequeDate = null;
            $scope.pay_SupplierAit.PayerBankAccountId = 0;
            $scope.ddlPayerBankAccount = null;
            $scope.pay_SupplierAit.MobileNo = '';
            $scope.pay_SupplierAit.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else {
            $scope.pay_SupplierAit.MoneyReceiptNo = '';
            $scope.pay_SupplierAit.ChequeNo = '';
            $scope.pay_SupplierAit.MoneyReceiptNo = '';
            $scope.pay_SupplierAit.ChequeDate = null;
            $scope.pay_SupplierAit.PayerBankAccountId = 0;
            $scope.ddlPayerBankAccount = null;

            $('#bankddlPayerOnlinePayment').select2('destroy');
            $("#bankddlPayerOnlinePayment").val('').select2({
                placeholder: "Select Payer Bank Name",
                dropdownAutoWidth: false
            });

            $scope.pay_SupplierAit.MobileNo = '';
            $scope.pay_SupplierAit.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }


    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForSI').val('');
        $('#txtToDateForSI').val('');
        $('#textSearchChallanCodeNo').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchChallanCodeNo = null;
        GetSupplierAitPaged(1);
    }

    $scope.SupplierAitSearch = function () {
        GetSupplierAitPaged(1);

    }

    function GetSupplierAitPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        $scope.FromDate = $("#txtFromDateForSI").val();
        $scope.ToDate = $("#txtToDateForSI").val();

        var SearchCriteria = "";

       
        if ($scope.SearchChallanCodeNo != undefined && $scope.SearchChallanCodeNo != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([TDSIssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([ChallanNo] LIKE '%" + $scope.SearchChallanCodeNo + "%' or [TDSIssueNo] LIKE '%" + $scope.SearchChallanCodeNo + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchChallanCodeNo !== undefined && $scope.SearchChallanCodeNo != null && $scope.SearchChallanCodeNo != "") {
            SearchCriteria = "[ChallanNo] LIKE '%" + $scope.SearchChallanCodeNo + "%' or [TDSIssueNo] LIKE '%" + $scope.SearchChallanCodeNo + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[TDSIssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }

        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/PurchaseAcknowledgement/GetTDSIssuePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.TDSIssueDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.TDSIssueDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.TDSIssueDate = date1;
                    }

                    
                    var res3 = aSd.PaymentDate.substring(0, 5);
                    if (res3 == "/Date") {
                        var parsedDate3 = new Date(parseInt(aSd.PaymentDate.substr(6)));
                        var date3 = ($filter('date')(parsedDate3, 'MMM dd, yyyy')).toString();
                        aSd.PaymentDate = date3;
                    }



                })

            }
            else {
                alertify.log('Supplier Tax  Not Found', 'error', '5000');
            }
            $scope.SupplierAitListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetSupplierAitPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSupplierAitPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSupplierAitPaged($scope.currentPage);
        }
        //  }


    }

    $("#txtFromDateForSI").datepicker({
        dateFormat: "M dd, yy"
    });

    $scope.FormDateChangeForSI = function () {
        $("#txtFromDateForSI").focus();
        $("#txtFromDateForSI").trigger("click");
    }


    $("#txtToDateForSI").datepicker({
        dateFormat: "M dd, yy"
    });

    $scope.ToDateChangeForSI = function () {
        $("#txtToDateForSI").focus();
        $("#txtToDateForSI").trigger("click");
    }
})