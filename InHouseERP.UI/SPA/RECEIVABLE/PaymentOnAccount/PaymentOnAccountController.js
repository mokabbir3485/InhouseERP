app.controller("PaymentOnAccountController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {

    var Valuation = sessionStorage.getItem("ValuationSession");
    if (Valuation != null) {
        $scope.CurrentValuationSetup = JSON.parse(sessionStorage.ValuationSession);
    }
    Clear();


    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Payment On Account').ScreenId;


        $scope.BankAccountList = [];
        $scope.MBankingServiceList = [];
        $scope.PaymentTypeList = [];
        $scope.ChequeTypeList = []
        $scope.rcv_PaymentOnAccount = {};
        //$scope.ServiceNameList = [{ ServiceId: 1, ServiceName: 'Bkash' }, { ServiceId: 2, ServiceName: 'Roket' }, { ServiceId: 3, ServiceName: 'UPay' },]
        GetActiveCompany();
        GetAllActivePaymentType();
        GetAllActiveMBankingServiceType();
        GetAllBankAccount();
        GetAllChequeType();
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPaymentOnAccountPaged(1);
        $('#ddlCompany').focus();
        $scope.chequeShowDiv = false;
        $scope.OtherShowDiv = false;
        $scope.CashShowDiv = false;
        CompanyPaymentOnAccount();
        $scope.rcv_PaymentOnAccount.OnAccountDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.btnSave = "Save";
        $scope.btnResetHide = true;
        $scope.btnColor = "btn btn-success";
        $scope.btnIcon = "fa fa-floppy-o";
        GetByVoucherGenerate();

        GetAllPaymentSubType();
        $scope.ChequePaymentSubTypeList = [];
        $scope.MobilePaymentSubTypeList = [];
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

    function GetByVoucherGenerate() {

        $http({
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=RV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.rcv_PaymentOnAccount.ReceiptVoucherNo ="N/A";

        });

    }

    function CompanyPaymentOnAccount() {
        var dateParts =
            ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
        $http({
            url: '/PaymentOnAccount/GetMaxCompanyPaymentOnAccount?companyOnPaymentDate=' + from,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.rcv_PaymentOnAccount.OnAccountNo = data;
            
        });
    }


    function GetActiveCompany() {
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.companyList = data;
        })
    }

    function GetAllActivePaymentType() {
        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaymentTypeListNew = data;
            angular.forEach($scope.PaymentTypeListNew, function (aPaymentType) {
                if (aPaymentType.PaymentTypeId != 5 && aPaymentType.PaymentTypeId != 6) {
                    $scope.PaymentTypeList.push(aPaymentType);
                }

            });
            
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
    $scope.onDivShowGetById = function (id) {

        if (id == 3) {
            $scope.chequeShowDiv = true;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;


            $scope.rcv_PaymentOnAccount.TransactionNo = '';
            $scope.rcv_PaymentOnAccount.MoneyReceiptNo = '';
            $scope.rcv_PaymentOnAccount.MobileNo = '';
            $scope.rcv_PaymentOnAccount.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else if (id == 4) {
            $scope.OtherShowDiv = true;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = false;

            $scope.rcv_PaymentOnAccount.ChequeNo = '';
            $scope.rcv_PaymentOnAccount.MoneyReceiptNo = '';
            $scope.rcv_PaymentOnAccount.ChequeDate = '';
            $scope.rcv_PaymentOnAccount.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Bank Name",
                //theme: "classic",
                dropdownAutoWidth: true
            });
            $('#bankddlOnAccountPayOrder').select2('destroy');
            $("#bankddlOnAccountPayOrder").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
        } else if (id == 1) {
            $scope.OtherShowDiv = false;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = true;

            $scope.rcv_PaymentOnAccount.ChequeNo = '';
            $scope.rcv_PaymentOnAccount.ChequeDate = '';
            $scope.rcv_PaymentOnAccount.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Bank Name",
                //theme: "classic",
                dropdownAutoWidth: true
            });
            $('#bankddlOnAccountPayOrder').select2('destroy');
            $("#bankddlOnAccountPayOrder").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });

            $scope.rcv_PaymentOnAccount.TransactionNo = '';
            $scope.rcv_PaymentOnAccount.MobileNo = '';
            $scope.rcv_PaymentOnAccount.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else {
            $scope.chequeShowDiv = false;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;

            $scope.rcv_PaymentOnAccount.ChequeNo = '';
            $scope.rcv_PaymentOnAccount.MoneyReceiptNo = '';
            $scope.rcv_PaymentOnAccount.ChequeDate = '';
            $scope.rcv_PaymentOnAccount.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Bank Name",
                //theme: "classic",
                dropdownAutoWidth: true
            });
            $('#bankddlOnAccountPayOrder').select2('destroy');
            $("#bankddlOnAccountPayOrder").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });

            $scope.rcv_PaymentOnAccount.TransactionNo = '';
            $scope.rcv_PaymentOnAccount.MobileNo = '';
            $scope.rcv_PaymentOnAccount.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
    }



    //$scope.CancaleBtn = function (canObj) {
    //    $scope.CanceledObject = canObj;
    //    alertify.confirm("Are you sure to cancel?", function (e) {
    //        if (e) {
    //            $scope.rcv_PaymentOnAccount.UpdatorId = $scope.LoginUser.UpdatorId;
    //            $scope.rcv_PaymentOnAccount.CreatorId = $scope.LoginUser.CreatorId;
            
    //            $scope.CanceledObject.IsCancelled = true;
    //            var params = JSON.stringify({ rcv_PaymentOnAccount: $scope.CanceledObject });
    //            $http.post('/PaymentOnAccount/Post', params).success(function (data) {
    //                if (data > 0) {
    //                    alertify.log('Successfully Cancelled !!!', 'success', '5000');
                     
    //                }
    //            }).error(function (msg) {
    //                alertify.log('cancel failed, refresh page and try again', 'error', '5000');
    //            });
    //        }
    //    })
    //}


    $scope.SaveOnAccount = function () {

        if ($scope.btnSave == "Cancel") {
            alertify.confirm("Are you sure to Cancel?", function (e) {
                if (e) {

                    OnAccountSaveMethod();
                }

            })
        } else {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {

                    OnAccountSaveMethod();
                }

            })
        }
       
    }

    function OnAccountSaveMethod() {
        $scope.rcv_PaymentOnAccount.UpdatorId = $scope.LoginUser.UpdatorId;
        $scope.rcv_PaymentOnAccount.CreatorId = $scope.LoginUser.CreatorId;
        //$scope.rcv_PaymentOnAccount.UpdateDate = new Date().toISOString().slice(0, 10);
        //$scope.rcv_PaymentOnAccount.UpdateDate = new Date().toISOString().slice(0, 10);
        //$scope.rcv_PaymentOnAccount.UpdateDate = updateDate.split("/").reverse().join("-");

        if ($scope.rcv_PaymentOnAccount.OnAccountId == 0 || $scope.rcv_PaymentOnAccount.OnAccountId == undefined) {
            $scope.rcv_PaymentOnAccount.IsCancelled = false;
        } else {
            $scope.rcv_PaymentOnAccount.IsCancelled = true;
        }

        if ($scope.ddlChequeType == null || $scope.ddlChequeType == undefined) {
            $scope.rcv_PaymentOnAccount.ChequeTypeId = 0;
        } else {
            $scope.rcv_PaymentOnAccount.ChequeTypeId = $scope.ddlChequeType.PaymentSubTypeId;
        }

        if ($scope.ddlServiceName == null || $scope.ddlServiceName == undefined) {
            $scope.rcv_PaymentOnAccount.MobileBankingServiceId = 0;
        } else {
            $scope.rcv_PaymentOnAccount.MobileBankingServiceId = $scope.ddlServiceName.PaymentSubTypeId;
        }


        var params = JSON.stringify({ rcv_PaymentOnAccount: $scope.rcv_PaymentOnAccount });
        $http.post('/PaymentOnAccount/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Company OnAccount saved successfully!', 'success', '5000');
                $scope.ResetForm();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });

    }

    $scope.CancaleBtn = function (aPaymentOnAccount) {
        //alertify.confirm("Are you sure to Cancel?", function (e) {
        //    if (e) {
                $scope.btnSave = "Cancel";
                $scope.btnColor = "btn btn-danger";
                $scope.btnIcon = "fa fa-close";
                window.scrollTo(0, 0);
                $scope.rcv_PaymentOnAccount = aPaymentOnAccount;


                $scope.ddlPaymentType = { PaymentTypeId: aPaymentOnAccount.PaymentTypeId };

                if (aPaymentOnAccount.PaymentTypeId == 3) {
                    $scope.chequeShowDiv = true;
                    $scope.OtherShowDiv = false;
                    $scope.CashShowDiv = false;

                    setTimeout(function () {

                        $("#bankddl").select2().val(aPaymentOnAccount.BankAccountId).trigger("change");

                    }, 0);
                    $scope.ddlChequeType = { ChequeTypeId: aPaymentOnAccount.ChequeTypeId };

                }
                else if (aPaymentOnAccount.PaymentTypeId == 4) {
                    $scope.OtherShowDiv = true;
                    $scope.chequeShowDiv = false;
                    $scope.CashShowDiv = false;
                    $scope.ddlServiceName = { MobileBankingServiceId: aPaymentOnAccount.MobileBankingServiceId };
                } else if (aPaymentOnAccount.PaymentTypeId == 1) {
                    $scope.OtherShowDiv = false;
                    $scope.chequeShowDiv = false;
                    $scope.CashShowDiv = true;
                }

                setTimeout(function () {

                    $("#ddlCompany").select2().val(aPaymentOnAccount.CompanyId).trigger("change");

                }, 0);
                $scope.btnResetHide = false;
        //    }
        //});
        window.scroll(0, 0);
      
    }

    $scope.ResetForm = function () {
        $scope.rcv_PaymentOnAccount = {};
        $scope.ddlCompany = null;

        setTimeout(function () {
            $("#ddlCompany").select2({
                placeholder: "Select Company"
            }).val('').trigger("change");
            $("#bankddl").select2({
                placeholder: "Select Bank Name"
            }).val('').trigger("change");

        }, 0);

        $scope.ddlPaymentType = null;
        Clear();
        $scope.PaymentOnAccountEntryForm.$setPristine();
        $scope.PaymentOnAccountEntryForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForPA').val('');
        $('#txtToDateForPA').val('');
        $('#textCompanyName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchCompanyName = null;
        GetPaymentOnAccountPaged(1);
        $scope.GetPagedLoaderEnable = false;
    }
    $scope.OpenPopupWindow = function (PaymentOnAccountObj) {
        $window.open("#/PaymentOnAccountReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("PaymentOnAccountObj", JSON.stringify(PaymentOnAccountObj));
        $cookieStore.put('PaymentOnAccountObj', PaymentOnAccountObj);
        event.stopPropagation();
    };

    $scope.PaymentOnAccountSearch = function () {
        GetPaymentOnAccountPaged(1);

    }
    $scope.isCancledDisabled = true;
    function GetPaymentOnAccountPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForPA").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForPA").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([OnAccountDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria = "[CompanyName] LIKE '%" + $scope.SearchCompanyName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[OnAccountDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/PaymentOnAccount/GetPaymentOnAccountPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.OnAccountDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.OnAccountDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.OnAccountDate = date1;
                    }
                    if (aSd.ChequeDate != null) {
                        var res2 = aSd.ChequeDate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate2 = new Date(parseInt(aSd.ChequeDate.substr(6)));
                            var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                            aSd.ChequeDate = date2;
                        }
                    }

                    if (aSd.IsCancelled == false) {
                        $scope.isCancledDisabled = false;
                    }

                })

            }
            else {
                alertify.log('Company On Account  Not Found', 'error', '5000');
            }
            $scope.PaymentOnAccountListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;
         
            
        });
    }

    $scope.getData = function (curPage) {
        $scope.GetPagedLoaderEnable = false;
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPaymentOnAccountPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPaymentOnAccountPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPaymentOnAccountPaged($scope.currentPage);
        }


    }

    $("#txtFromDateForPA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForPA = function () {
        $("#txtFromDateForPA").focus();
        $("#txtFromDateForPA").trigger("click");
    }


    $("#txtToDateForPA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForPA = function () {
        $("#txtToDateForPA").focus();
        $("#txtToDateForPA").trigger("click");
    }


    $("#dtOnAccountDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarOnAccountDate = function () {
        $("#dtOnAccountDate").focus();
        $("#dtOnAccountDate").trigger("click");
    }

    $("#dtChequeDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarChequeDate = function () {
        $("#dtChequeDate").focus();
        $("#dtChequeDate").trigger("click");
    }

    $("#dtPayOrderDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarPayOrderDate = function () {
        $("#dtPayOrderDate").focus();
        $("#dtPayOrderDate").trigger("click");
    }



})