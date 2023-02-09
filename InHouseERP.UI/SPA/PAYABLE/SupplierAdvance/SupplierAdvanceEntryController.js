app.controller("SupplierAdvanceEntryController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {
    
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
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Supplier Advance').ScreenId;
        GetUsersPermissionDetails();


        $scope.UserId = $scope.LoginUser.UserId;
        $scope.ScreenId = parseInt(sessionStorage.getItem("SupplierAdvanceScreenId")); 
        $scope.ddlBankAccount = null;
        $scope.ddlPayerBankAccount = null;
        $scope.ddlSuppilerBankAccount = null;
        $scope.ddlPayOrderBankAccount = null;
        $scope.ddlChecqueBankAccount = null;
        $scope.BankAccountList = [];
        $scope.MBankingServiceList = [];
        $scope.PaymentTypeList = [];
        $scope.ChequeTypeList = [];
        $scope.AdvancePaymentSectorList = [];
        $scope.SuppilerBankAccountList = [];
        $scope.PayerBankAccountList = [];
        $scope.pay_SupplierAdvance = {};
        $scope.pay_SupplierAdvance.AdvanceId = 0;
        //$scope.ServiceNameList = [{ ServiceId: 1, ServiceName: 'Bkash' }, { ServiceId: 2, ServiceName: 'Roket' }, { ServiceId: 3, ServiceName: 'UPay' },]
        GetActiveSupplier();
        GetAllActivePaymentType();
        GetAllActiveMBankingServiceType();
        GetAllBankAccount();
        GetAllChequeType();
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetSupplierAdvancePaged(1);
        $('#ddlSupplier').focus();
        $scope.chequeShowDiv = false;
        $scope.OtherShowDiv = false;
        $scope.CashShowDiv = false;
      
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        //GetUsersPermissionDetails();
        SupplierAdvcancedNo();
        GetByVoucherGenerate();
        $scope.pay_SupplierAdvance.AdvanceDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

        GetAllPaymentSubType();
        $scope.ChequePaymentSubTypeList = [];
        $scope.MobilePaymentSubTypeList = [];
        GetAllAdvancePaymentSector();

       
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
    function GetAllAdvancePaymentSector() {
        $http({
            url: '/CompanyAdvance/GetAllAdvancePaymentSector',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AdvancePaymentSectorList = data;
        });

    }
    function GetByVoucherGenerate() {

        $http({
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=PV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
           // $scope.pay_SupplierAdvance.PaymentVoucherNo = "N/A";

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


    function SupplierAdvcancedNo() {
        $http({
            url: '/SupplierAdvance/GetMaxSupAdvancedNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxAdvanceNo = data;
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
                $scope.pay_SupplierAdvance.AdvancePaymentNo = 'SA/' + $scope.finYearEPZ + '/' + $scope.MaxAdvanceNo;
            });


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
            url: '/Supplier/GetDynamic?searchCriteria=IsActive=1&orderBy=SupplierName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierList = data;
        })
    }


    function GetAllActivePaymentType() {
        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                if (aData.PaymentTypeId != 5 && aData.PaymentTypeId != 6) {
                    $scope.PaymentTypeList.push(aData);
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

    $scope.onDivShowGetById = function (PaymentTypeId, PaymentGroupId) {

        if (PaymentTypeId == 3) {
            $scope.chequeShowDiv = true;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;

            
            $scope.pay_SupplierAdvance.TransactionNo = '';
            $scope.pay_SupplierAdvance.MoneyReceiptNo = '';
            $scope.pay_SupplierAdvance.MoneyReceiptNo = '';
            $scope.pay_SupplierAdvance.MobileNo = '';
            $scope.pay_SupplierAdvance.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
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
        }
        else if (PaymentTypeId == 4) {
            $scope.OtherShowDiv = true;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = false;
            
            $scope.pay_SupplierAdvance.ChequeNo = '';
            $scope.pay_SupplierAdvance.MoneyReceiptNo = '';
            $scope.pay_SupplierAdvance.ChequeDate = '';
            $scope.pay_SupplierAdvance.BankAccountId = 0;
            $scope.pay_SupplierAdvance.MoneyReceiptNo = '';
            $scope.ddlBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Bank Name",
                //theme: "classic",
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
            $('#bankddlSupplierPayOrder').select2('destroy');
            $("#bankddlSupplierPayOrder").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
        } else if (PaymentTypeId == 1) {
            $scope.OtherShowDiv = false;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = true;
            
            $scope.pay_SupplierAdvance.ChequeNo = '';
            $scope.pay_SupplierAdvance.ChequeDate = '';
            $scope.pay_SupplierAdvance.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Bank Name",
                theme: "classic",
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
            $('#bankddlSupplierPayOrder').select2('destroy');
            $("#bankddlSupplierPayOrder").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
            $scope.pay_SupplierAdvance.TransactionNo = '';
            $scope.pay_SupplierAdvance.MobileNo = '';
            $scope.pay_SupplierAdvance.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        } else if (PaymentGroupId == 5) {
            $scope.chequeShowDiv = false;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;
            $scope.pay_SupplierAdvance.MoneyReceiptNo = '';
            $scope.pay_SupplierAdvance.ChequeNo = '';
            $scope.pay_SupplierAdvance.MoneyReceiptNo = '';
            $scope.pay_SupplierAdvance.ChequeDate = '';
            $scope.pay_SupplierAdvance.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Bank Name",
                //theme: "classic",
                dropdownAutoWidth: false
            });
            $('#bankddlSupplierPayOrder').select2('destroy');
            $("#bankddlSupplierPayOrder").val('').select2({
                placeholder: "Select Bank Name",
                dropdownAutoWidth: false

            });
            
            $scope.pay_SupplierAdvance.MobileNo = '';
            $scope.pay_SupplierAdvance.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;


        }
        else {
            $scope.chequeShowDiv = false;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;
            $scope.pay_SupplierAdvance.MoneyReceiptNo = '';
            $scope.pay_SupplierAdvance.ChequeNo = '';
            $scope.pay_SupplierAdvance.MoneyReceiptNo = '';
            $scope.pay_SupplierAdvance.ChequeDate = '';
            $scope.pay_SupplierAdvance.BankAccountId = 0;
            $scope.ddlBankAccount = null;
            $scope.ddlPayerBankAccount = null;
            $scope.ddlSuppilerBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Bank Name",
                //theme: "classic",
                dropdownAutoWidth: false
            });
            $('#bankddlSupplierPayOrder').select2('destroy');
            $("#bankddlSupplierPayOrder").val('').select2({
                placeholder: "Select Bank Name",
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
            $scope.pay_SupplierAdvance.TransactionNo = '';
            $scope.pay_SupplierAdvance.MobileNo = '';
            $scope.pay_SupplierAdvance.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
    }


    

    function PostAdvance() {
        $scope.pay_SupplierAdvance.UpdatorId = $scope.LoginUser.UpdatorId;
        $scope.pay_SupplierAdvance.CreatorId = $scope.LoginUser.CreatorId;

        if ($scope.ddlServiceName == null || $scope.ddlServiceName == undefined) {
            $scope.pay_SupplierAdvance.MobileBankingServiceId = 0;
        } else {
            $scope.pay_SupplierAdvance.MobileBankingServiceId = $scope.ddlServiceName.PaymentSubTypeId;
        }

        if ($scope.ddlChequeType == undefined || $scope.ddlChequeType == null) {
            $scope.pay_SupplierAdvance.ChequeTypeId = 0;
        } else {
            $scope.pay_SupplierAdvance.ChequeTypeId = $scope.ddlChequeType.PaymentSubTypeId;
        }

        var params = JSON.stringify({ proc_SupplierAdvance: $scope.pay_SupplierAdvance });
        $http.post('/SupplierAdvance/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Advance saved successfully!', 'success', '5000');
                $scope.ResetForm();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
    }
    $scope.SaveAdvance = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.pay_SupplierAdvance.AdvanceId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostAdvance();
                    }
                })
            }
            else if ($scope.pay_SupplierAdvance.AdvanceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pay_SupplierAdvance.AdvanceId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostAdvance();
                    }
                })
            }
            else if ($scope.pay_SupplierAdvance.AdvanceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.pay_SupplierAdvance.AdvanceId == 0 && $scope.CreatePermission) {
                PostAdvance();
            }
            else if ($scope.pay_SupplierAdvance.AdvanceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pay_SupplierAdvance.AdvanceId > 0 && $scope.RevisePermission) {
                PostAdvance();
            }
            else if ($scope.pay_SupplierAdvance.AdvanceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }

    }

    $scope.SelSupplierAdvance = function (aSupplierAdvance) {
        window.scrollTo(0, 0);
        $scope.pay_SupplierAdvance = aSupplierAdvance;
        
        $scope.ddlPaymentType = { PaymentTypeId: aSupplierAdvance.PaymentTypeId };
        setTimeout(function () {
            $("#PaymentSector").select2({
                theme: "classic"
            }).val(aSupplierAdvance.PaymentSectorId).trigger("change");
        }, 0);

        setTimeout(function () {
            $("#bankddlSupplierPayOrder").select2({
                theme: "classic"
            }).val(aSupplierAdvance.SupplierBankAccountId).trigger("change");
        }, 0);

        setTimeout(function () {

            $("#bankddl").select2().val(aSupplierAdvance.PayerBankAccountId).trigger("change");

        }, 0);
        $scope.ddlChequeType = { PaymentSubTypeId: aSupplierAdvance.ChequeTypeId };
        $scope.ddlServiceName = { PaymentSubTypeId: aSupplierAdvance.MobileBankingServiceId };
        if (aSupplierAdvance.PaymentTypeId == 3) {
            $scope.chequeShowDiv = true;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;
            

        }
        else if (aSupplierAdvance.PaymentTypeId == 4) {
            $scope.OtherShowDiv = true;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = false;
            
        } else if (aSupplierAdvance.PaymentTypeId == 1) {
            $scope.OtherShowDiv = false;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = true;
        } else if (aSupplierAdvance.PaymentTypeId == 8 || aSupplierAdvance.PaymentTypeId == 9 || aSupplierAdvance.PaymentTypeId == 10) {
            $scope.ddlPaymentType.PaymentGroupId = 5;
            setTimeout(function () {

                $("#bankddlSuppilerOnlinePayment").select2().val(aSupplierAdvance.SupplierBankAccountId).trigger("change");

            }, 0);
            setTimeout(function () {

                $("#bankddlPayerOnlinePayment").select2().val(aSupplierAdvance.PayerBankAccountId).trigger("change");

            }, 0);
        }
        
        setTimeout(function () {

            $("#ddlSupplier").select2().val(aSupplierAdvance.SupplierId).trigger("change");

        }, 0);
    }

    $scope.ResetForm = function () {
        $scope.pay_SupplierAdvance = {};
        $scope.ddlSupplier = null;

        setTimeout(function () {
            $("#ddlSupplier").select2({
                placeholder: "Select Supplier"
            }).val('').trigger("change");
            $("#bankddl").select2({
                placeholder: "Select Bank Name"
            }).val('').trigger("change");

        }, 0);

        $scope.ddlPaymentType = null;
        Clear();
        $scope.supplierAdvanceEntryForm.$setPristine();
        $scope.supplierAdvanceEntryForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForSA').val('');
        $('#txtToDateForSA').val('');
        $('#textSupplierName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchSupplierName = null;
        GetSupplierAdvancePaged(1);
    }
    $scope.OpenPopupWindow = function (SupplierAdvanceObj) {
        $window.open("#/SupplierAdvanceReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SupplierAdvanceObj", JSON.stringify(SupplierAdvanceObj));
        $cookieStore.put('SupplierAdvanceObj', SupplierAdvanceObj);
        event.stopPropagation();
    };

    $scope.SupplierAdvanceSearch = function () {
        GetSupplierAdvancePaged(1);

    }

    function GetSupplierAdvancePaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSA").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForSA").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchSupplierName != undefined && $scope.SearchSupplierName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([AdvanceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%' Or [SectorName] LIKE '%" + $scope.SearchSupplierName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchSupplierName !== undefined && $scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
            SearchCriteria = "[SupplierName] LIKE '%" + $scope.SearchSupplierName + "%' Or [SectorName] LIKE '%" + $scope.SearchSupplierName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[AdvanceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/SupplierAdvance/GetSupplierAdvancePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.AdvanceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.AdvanceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.AdvanceDate = date1;
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
                alertify.log('Supplier Advance  Not Found', 'error', '5000');
            }
            $scope.SupplierAdvanceListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetSupplierAdvancePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSupplierAdvancePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSupplierAdvancePaged($scope.currentPage);
        }


    }

    $("#txtFromDateForSA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForSA = function () {
        $("#txtFromDateForSA").focus();
        $("#txtFromDateForSA").trigger("click");
    }


    $("#txtToDateForSA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForSA = function () {
        $("#txtToDateForSA").focus();
        $("#txtToDateForSA").trigger("click");
    }


    $("#dtAdvanceDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarAdvanceDate = function () {
        $("#dtAdvanceDate").focus();
        $("#dtAdvanceDate").trigger("click");
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

    $scope.CalendarPayorderDate = function () {
        $("#dtPayOrderDate").focus();
        $("#dtPayOrderDate").trigger("click");
    }

})