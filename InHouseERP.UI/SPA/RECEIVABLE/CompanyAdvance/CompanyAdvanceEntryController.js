app.controller("CompanyAdvanceEntryController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {
    
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
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Company Advance').ScreenId;
        GetUsersPermissionDetails();
     
      
        $scope.ddlBankAccount = null;
        $scope.ddlReceiverBankAccount = null;
        $scope.ddlCompanyBankAccount = null;
        $scope.ddlPayOrderBankAccount = null;
        $scope.ddlChecqueBankAccount = null;
        $scope.CompanyBankAccountList = [];
        $scope.ReceiverBankAccountList = [];
        $scope.BankAccountList = [];
        $scope.MBankingServiceList = [];
        $scope.PaymentTypeList = [];
        $scope.AdvancePaymentSectorList = [];
        $scope.ChequeTypeList = []
        $scope.rcv_CompanyAdvance = {};
        //$scope.rcv_CompanyAdvance.AdvanceAmount = 0;
        //$scope.ServiceNameList = [{ ServiceId: 1, ServiceName: 'Bkash' }, { ServiceId: 2, ServiceName: 'Roket' }, { ServiceId: 3, ServiceName: 'UPay' },]
        GetActiveCompany();
        GetAllActivePaymentType();
        GetAllActiveMBankingServiceType();
        GetAllBankAccount();
        GetAllChequeType();
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetCompanyAdvancePaged(1);
        $('#ddlCompany').focus();
        $scope.chequeShowDiv = false;
        $scope.OtherShowDiv = false;
        $scope.CashShowDiv = false;

       
        $scope.LoaderEnable = true;
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
       // GetUsersPermissionDetails();
        CompanyAdvcancedNo();
        $scope.rcv_CompanyAdvance.AdvanceDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetByVoucherGenerate();

        GetAllPaymentSubType();
        GetAllAdvancePaymentSector();
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
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=RV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
          $scope.rcv_CompanyAdvance.ReceiptVoucherNo = "N/A";
         
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

    function CompanyAdvcancedNo() {
        $scope.AdvancePaymentNo = '';
        //var dateParts =
        //    ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        //var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
        //$http({
        //    url: '/CompanyAdvance/GetMaxCompanyAdvancedNo?companyAdvancedDate=' + from,
        //    method: 'GET',
        //    headers: { 'Content-Type': 'application/json' }
        //}).success(function (data) {
        //    $scope.AdvancePaymentNo= data;
            
        //    
        //});

        $http({
            url: '/CompanyAdvance/GetMaxCompanyAdvancedNo',
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
                $scope.AdvancePaymentNo = 'CA/' + $scope.finYearEPZ + '/' + $scope.GetMaxAdvanceNo;

            });

            
        });

    }


    function GetActiveCompany() {
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.companyList = data;
            
            $scope.LoaderEnable = false;
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
            $scope.BankAccountList = data;
            angular.forEach($scope.BankAccountList, function (aData) {
                if (aData.AccountFor == 'Customer') {
                    if (aData.AccountNo == "" || aData.BankName == "" || aData.BranchName == "") {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " ,  Branch Name : " + "Not Found" + ", Account NO : " + "Not Found, " + aData.CompanyName;
                    } else {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " , Branch Name : " + aData.BranchName + ", Account NO : " + aData.AccountNo + ", " + aData.CompanyName;
                    }
                    $scope.CompanyBankAccountList.push(aData);
                } else if (aData.AccountFor == 'Exporter') {
                    if (aData.AccountNo == "" || aData.BankName == "" || aData.BranchName == "") {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " ,  Branch Name : " + "Not Found" + ", Account NO : " + "Not Found";
                    } else {
                        aData.BankNameTemp = "Bank Name : " + aData.BankName + " , Branch Name : " + aData.BranchName + ", Account NO : " + aData.AccountNo;
                    }
                    $scope.ReceiverBankAccountList.push(aData);
                }


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

    $scope.onDivShowGetById = function (PaymentTypeId, PaymentGroupId) {
         
        if (PaymentTypeId == 3) {
            $scope.chequeShowDiv = true;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;


            $scope.rcv_CompanyAdvance.TransactionNo = '';
            $scope.rcv_CompanyAdvance.MoneyReceiptNo = '';
            $scope.rcv_CompanyAdvance.MobileNo = '';
            $scope.rcv_CompanyAdvance.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else if (PaymentTypeId == 4) {
            $scope.OtherShowDiv = true;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = false;

            $scope.rcv_CompanyAdvance.ChequeNo = '';
            $scope.rcv_CompanyAdvance.MoneyReceiptNo = '';
            $scope.rcv_CompanyAdvance.ChequeDate = '';
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Company Bank Name",
                //theme: "classic",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrder').select2('destroy');
            $("#bankddlPayOrder").val('').select2({
                placeholder: "Select Company Bank Name",
            });
            $('#bankddlCompanyOnlinePayment').select2('destroy');
            $("#bankddlCompanyOnlinePayment").val('').select2({
                placeholder: "Select Company Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });

        } else if (PaymentTypeId == 1) {
            $scope.OtherShowDiv = false;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = true;

            $scope.rcv_CompanyAdvance.ChequeNo = '';
            $scope.rcv_CompanyAdvance.ChequeDate = '';
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Bank Name",
                //theme: "classic",
                dropdownAutoWidth: false
            });
               $('#bankddlPayOrder').select2('destroy');
               $("#bankddlPayOrder").val('').select2({
                   placeholder: "Select Bank Name",
               });
            $('#bankddlCompanyOnlinePayment').select2('destroy');
            $("#bankddlCompanyOnlinePayment").val('').select2({
                placeholder: "Select Company Bank Name",
                dropdownAutoWidth: false
            });
            $('#bankddlReceiverOnlinePayment').select2('destroy');
            $("#bankddlReceiverOnlinePayment").val('').select2({
                placeholder: "Select Receiver Bank Name",
                dropdownAutoWidth: false
            });
            $scope.rcv_CompanyAdvance.TransactionNo = '';
            $scope.rcv_CompanyAdvance.MobileNo = '';
            $scope.rcv_CompanyAdvance.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        } else if (PaymentGroupId == 5) {
            $scope.chequeShowDiv = false;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;

            $scope.rcv_CompanyAdvance.ChequeNo = '';
            $scope.rcv_CompanyAdvance.MoneyReceiptNo = '';
            $scope.rcv_CompanyAdvance.ChequeDate = '';
            $scope.ddlBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Customer Bank Name",
                //theme: "classic",
                dropdownAutoWidth: false
            });
            $('#bankddlPayOrder').select2('destroy');
            $("#bankddlPayOrder").val('').select2({
                placeholder: "Select Customer Bank Name",
            });
            $scope.rcv_CompanyAdvance.MobileNo = '';
            $scope.rcv_CompanyAdvance.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else {
            $scope.chequeShowDiv = false;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;

            $scope.rcv_CompanyAdvance.ChequeNo = '';
            $scope.rcv_CompanyAdvance.MoneyReceiptNo = '';
            $scope.rcv_CompanyAdvance.ChequeDate = '';
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#bankddl').select2('destroy');
            $('#bankddl').val('').select2({
                placeholder: "Select Customer Bank Name",
                //theme: "classic",
                dropdownAutoWidth: false
            });
               $('#bankddlPayOrder').select2('destroy');
               $("#bankddlPayOrder").val('').select2({
                   placeholder: "Select Customer Bank Name",
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
            $scope.rcv_CompanyAdvance.TransactionNo = '';
            $scope.rcv_CompanyAdvance.MobileNo = '';
            $scope.rcv_CompanyAdvance.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
    }



    function PostAdvance() {
        $scope.rcv_CompanyAdvance.UpdatorId = $scope.LoginUser.UpdatorId;
        $scope.rcv_CompanyAdvance.CreatorId = $scope.LoginUser.CreatorId;

        if ($scope.ddlChequeType == null || $scope.ddlChequeType == undefined) {
            $scope.rcv_CompanyAdvance.ChequeTypeId = 0;
        } else {
            $scope.rcv_CompanyAdvance.ChequeTypeId = $scope.ddlChequeType.PaymentSubTypeId;
        }

        if ($scope.ddlServiceName == null || $scope.ddlServiceName == undefined) {
            $scope.rcv_CompanyAdvance.MobileBankingServiceId = 0;
        } else {
            $scope.rcv_CompanyAdvance.MobileBankingServiceId = $scope.ddlServiceName.PaymentSubTypeId;
        }

        $scope.rcv_CompanyAdvance.AdvancePaymentNo = $scope.AdvancePaymentNo;
        var params = JSON.stringify({ rcv_CompanyAdvance: $scope.rcv_CompanyAdvance });
        $http.post('/CompanyAdvance/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Company Advance saved successfully!', 'success', '5000');
                $scope.ResetForm();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
    }

    $scope.SaveAdvance = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if (($scope.rcv_CompanyAdvance.AdvanceId == 0 || $scope.rcv_CompanyAdvance.AdvanceId == undefined) && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostAdvance();
                    }
                })
            }
            else if ($scope.rcv_CompanyAdvance.AdvanceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rcv_CompanyAdvance.AdvanceId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostAdvance();
                    }
                })
            }
            else if ($scope.rcv_CompanyAdvance.AdvanceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.rcv_CompanyAdvance.AdvanceId == 0 && $scope.CreatePermission) {
                PostAdvance();
            }
            else if ($scope.rcv_CompanyAdvance.AdvanceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rcv_CompanyAdvance.AdvanceId > 0 && $scope.RevisePermission) {
                PostAdvance();
            }
            else if ($scope.rcv_CompanyAdvance.AdvanceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
    }

    $scope.SelCompanyAdvance = function (aCompanyAdvance) {
        window.scrollTo(0, 0);
        $scope.rcv_CompanyAdvance = aCompanyAdvance;
        $scope.AdvancePaymentNo = aCompanyAdvance.AdvancePaymentNo;
        $scope.rcv_CompanyAdvance.ChequeDate = aCompanyAdvance.ChequeDate;
        setTimeout(function () {

            $("#ddlCompany").select2().val(aCompanyAdvance.CompanyId).trigger("change");

        }, 0);
        setTimeout(function () {
            $("#PaymentSector").select2({
                theme: "classic"
            }).val(aCompanyAdvance.PaymentSectorId).trigger("change");
        }, 0);
        setTimeout(function () {
            $("#paymentType").select2({
                theme: "classic"
            }).val(aCompanyAdvance.PaymentTypeId);
        }, 0);
        $scope.ddlPaymentType = { PaymentTypeId: aCompanyAdvance.PaymentTypeId };


        setTimeout(function () {
            $("#bankddl").select2().val(aCompanyAdvance.CustomerBankAccountId).trigger("change");
        }, 0);

        setTimeout(function () {
            $("#bankddlPayOrder").select2().val(aCompanyAdvance.CustomerBankAccountId).trigger("change");
        }, 0);
        $scope.ddlChequeType = { PaymentSubTypeId: aCompanyAdvance.ChequeTypeId };
        $scope.ddlServiceName = { PaymentSubTypeId: aCompanyAdvance.MobileBankingServiceId };

        setTimeout(function () {
            $("#bankddlCompanyOnlinePayment").select2().val(aCompanyAdvance.CustomerBankAccountId).trigger("change");
        }, 0);
        setTimeout(function () {
            $("#bankddlReceiverOnlinePayment").select2().val(aCompanyAdvance.ReceiverBankAccountId).trigger("change");
        }, 0);

        if (aCompanyAdvance.PaymentTypeId == 3) {
            $scope.chequeShowDiv = true;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;
        }
        else if (aCompanyAdvance.PaymentTypeId == 4) {
            $scope.OtherShowDiv = true;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = false;

        } else if (aCompanyAdvance.PaymentTypeId == 1) {
            $scope.OtherShowDiv = false;
            $scope.chequeShowDiv = false;
            $scope.CashShowDiv = true;

        } else if (aCompanyAdvance.PaymentTypeId == 8 || aCompanyAdvance.PaymentTypeId == 9 || aCompanyAdvance.PaymentTypeId == 10) {
            $scope.ddlPaymentType.PaymentGroupId = 5;
            
        }

        
    }

    $scope.ResetForm = function () {
        $scope.rcv_CompanyAdvance = {};
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
        $scope.companyAdvanceEntryForm.$setPristine();
        $scope.companyAdvanceEntryForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForCA').val('');
        $('#txtToDateForCA').val('');
        $('#textCompanyName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchCompanyName = null;
        GetCompanyAdvancePaged(1);
        $scope.GetPagedLoaderEnable = false;
    }
    $scope.OpenPopupWindow = function (CompanyAdvanceObj) {
        $window.open("#/CompanyAdvanceReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("CompanyAdvanceObj", JSON.stringify(CompanyAdvanceObj));
        $cookieStore.put('CompanyAdvanceObj', CompanyAdvanceObj);
        event.stopPropagation();
    };

    $scope.CompanyAdvanceSearch = function () {
        GetCompanyAdvancePaged(1);

    }

    function GetCompanyAdvancePaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForCA").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForCA").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "(CA.[AdvanceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and (C.[CompanyName] LIKE '%" + $scope.SearchCompanyName + "%' Or ST.[SectorName] LIKE '%" + $scope.SearchCompanyName + "%' Or PT.[PaymentTypeName] LIKE '%" + $scope.SearchCompanyName + "%' Or CA.[Remarks] LIKE '%" + $scope.SearchCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria = "C.[CompanyName] LIKE '%" + $scope.SearchCompanyName + "%' Or ST.[SectorName] LIKE '%" + $scope.SearchCompanyName + "%' Or PT.[PaymentTypeName] LIKE '%" + $scope.SearchCompanyName + "%' Or CA.[Remarks] LIKE '%" + $scope.SearchCompanyName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "CA.[AdvanceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/CompanyAdvance/GetCompanyAdvancePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
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
                alertify.log('Company Advance  Not Found', 'error', '5000');
            }
            $scope.CompanyAdvanceListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;
            

        });
    }

    $scope.getData = function (curPage) {
        $scope.GetPagedLoaderEnable = false;
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetCompanyAdvancePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetCompanyAdvancePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetCompanyAdvancePaged($scope.currentPage);
        }


    }

    $("#txtFromDateForCA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForCA = function () {
        $("#txtFromDateForCA").focus();
        $("#txtFromDateForCA").trigger("click");
    }


    $("#txtToDateForCA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForCA = function () {
        $("#txtToDateForCA").focus();
        $("#txtToDateForCA").trigger("click");
    }


    $("#textAdvanceDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarAdvanceDate = function () {
        $("#textAdvanceDate").focus();
        $("#textAdvanceDate").trigger("click");
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