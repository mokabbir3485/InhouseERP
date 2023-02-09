app.controller("LoginController", function ($scope, $cookieStore, $http) {
    $scope.UserStatus = [];
    $scope.Ip = '';
    $scope.SmsCode = '';
    $scope.LoginUser = [];
    $scope.s_User = new Object();
    $scope.ValuationSetupCurrent = {};
    $scope.IsReqSmsCode = false;

    $scope.InputType = 'password';
    $scope.showHideClass ='fa fa-eye-slash';
    $scope.isShowIconPassword = true;
    $scope.isHiddenIconPassword = false;

    $scope.PasswordShowMethod = function () {
        showPassword();
    }

    $scope.HidePassword = function () {
        $scope.InputType = 'password';
        $scope.showHideClass = 'fa fa-eye-slash';
    }
    
   
    function showPassword () {
        if ($scope.s_User.Password != null) {
            if ($scope.InputType == 'password') {
                $scope.InputType = 'text';
                $scope.showHideClass = 'fa fa-eye';
                $scope.isShowIconPassword = false;
            } else {
                $scope.InputType = 'password';
                $scope.showHideClass = 'fa fa-eye-slash';
                $scope.isShowIconPassword = false;
                //$scope.showHideClass = 'glyphicon glyphicon-eye-open';
                
            }
        }
    }

   




    function RemoveAllScreenLock(UserId) {
        var parms = JSON.stringify({ userId: UserId });
        $http.post('/Permission/RemoveScreenLock', parms).success(function (data) {
        });
    }

    function GetUser(UserName, Password) {
        try {
            $http({
                url: '/User/GetUserForLogin',
                method: "GET",
                params: { userName: UserName, password: Password },
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.LoginUser = data;
                if ($scope.LoginUser != "" && !$scope.LoginUser.IsReqSmsCode) {
                    if ($scope.LoginUser.IsActive) {
                       // $cookieStore.put('UserData', $scope.LoginUser); // Remove cookies into the function 'RemoveCookies' of IndexController
                        sessionStorage.setItem("UserDataSession", JSON.stringify($scope.LoginUser));
                        sessionStorage.setItem("milisec", 0);
                        sessionStorage.setItem("sec", 0);
                        sessionStorage.setItem("min", 0);
                        sessionStorage.setItem("hour", 0);
                        RemoveAllScreenLock($scope.LoginUser.UserId);
                        GetUserCurrentStatus($scope.LoginUser.UserId);
                    }
                    else {
                        alertify.log('User is Inactive!', 'error', '5000');
                        // alertify.log(data, 'error', '5000');
                    }
                }
                else if ($scope.LoginUser != "" && $scope.LoginUser.IsReqSmsCode) {
                    $scope.IsReqSmsCode = true;
                    txtLoginCode.focus();
                    $scope.SmsCode = Math.floor(1000 + Math.random() * 9000);
                    document.getElementById("myText2").value = $scope.SmsCode;
                    //Send $scope.SmsCode to $scope.LoginUser.SmsMobileNo
                }
                else {
                    alertify.log('Invalid Login Information!', 'error', '5000');
                }
            })
        }
        catch (e) {
            console.log("Got an error!", e.description);
        }

    }

    function GetHasReceivable() {
        $scope.GetHasReceivable = false;
        $http({
            url: '/Setup/GetHasReceivable',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.GetHasReceivable = (data === 'true');
            if ($scope.GetHasReceivable) {
                $http({
                    url: '/Setup/GetCurrentValuationSetup',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.ValuationSetupCurrent = data;
                    if ($scope.ValuationSetupCurrent != "") {
                        //$cookieStore.put('Valuation', $scope.ValuationSetupCurrent);
                        sessionStorage.setItem("ValuationSession", JSON.stringify($scope.ValuationSetupCurrent));
                    }
                });
            }
        });
    }

    function GetUserCurrentStatus(UserId) {
        $http({
            url: '/LoginLogoutLog/GetUserCurrentStatus',
            method: "GET",
            params: { userId: UserId },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.UserStatus = data;
            if ($scope.UserStatus.IsLoggedIn) {
                //if ($scope.UserStatus.IpAddress == $scope.Ip) {
                //force log out
                $scope.ad_LoginLogoutLog = new Object();
                $scope.ad_LoginLogoutLog.UserId = $scope.UserStatus.UserId;
                $scope.ad_LoginLogoutLog.LogOutTime = new Date();
                $scope.ad_LoginLogoutLog.IsLoggedIn = false;
                var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
                $http.post('/User/UpdateLoginInfo', parms).success(function (data) { });
                //log in
                var login = sessionStorage.getItem("UserDataSession");
                if (login != null) {
                    var userStatus = JSON.parse(sessionStorage.UserDataSession);
                }
                $scope.ad_LoginLogoutLog = new Object();
                $scope.ad_LoginLogoutLog.UserId = userStatus.UserId;
                $scope.ad_LoginLogoutLog.LogInTime = new Date();
                $scope.ad_LoginLogoutLog.IpAddress = $scope.Ip;
                $scope.ad_LoginLogoutLog.IsLoggedIn = true;
                var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
                $http.post('/User/SaveLoginInfo', parms).success(function (data) { });
                window.location = '/Home/Index#/Home';

            }
            else {
                // log in
                var login = sessionStorage.getItem("UserDataSession");
                if (login != null) {
                    var userStatus = JSON.parse(sessionStorage.UserDataSession);
                }
                $scope.ad_LoginLogoutLog = new Object();
                $scope.ad_LoginLogoutLog.UserId = userStatus.UserId;
                $scope.ad_LoginLogoutLog.LogInTime = new Date();
                $scope.ad_LoginLogoutLog.IpAddress = $scope.Ip;
                $scope.ad_LoginLogoutLog.IsLoggedIn = true;
                var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
                $http.post('/User/SaveLoginInfo', parms).success(function (data) { });
                window.location = '/Home/Index#/Home';
            }
        });
    }

    function RemoveCookies() {
        //User Info remove
        sessionStorage.removeItem('UserDataSession');
        sessionStorage.removeItem('ValuationSession');
        //Permission remove
        //Security
        sessionStorage.removeItem('UnitPermission');
        sessionStorage.removeItem('SubcategoryPermission');
        sessionStorage.removeItem('ScreenPermission');
        sessionStorage.removeItem('RolePermission');
        sessionStorage.removeItem('PermissionPermission');
        sessionStorage.removeItem('ModulePermission');
        //admin
        sessionStorage.removeItem('FiscalYearEntryPermission');
        sessionStorage.removeItem('ProductPermission');
        sessionStorage.removeItem('MaterialPaperTypePermission');
        sessionStorage.removeItem('BankEntryPermission');
        sessionStorage.removeItem('EmployeePermission');
        sessionStorage.removeItem('DesignationPermission');
        sessionStorage.removeItem('DeclarationTypePermission');
        sessionStorage.removeItem('DepartmentTypePermission');
        sessionStorage.removeItem('DepartmentPermission');
        sessionStorage.removeItem('ChangePasswordPermission');
        sessionStorage.removeItem('CategoryPermission');
        sessionStorage.removeItem('BranchTypePermission');
        sessionStorage.removeItem('BranchPermission');
        sessionStorage.removeItem('ReportNotificationNamePermission');
        sessionStorage.removeItem('EmailNotificationSetupPermission');
        sessionStorage.removeItem('EmailSendPermission');
        sessionStorage.removeItem('PaymentTypePermission');
        sessionStorage.removeItem('PaymentGroupPermission');
        sessionStorage.removeItem('SupplierPermission');
        sessionStorage.removeItem('TerminalPermission');
        sessionStorage.removeItem('RequisitionPurposePermission');
        sessionStorage.removeItem('ReturnReasonPermission');
        sessionStorage.removeItem('AdjustmentNamePermission');
        sessionStorage.removeItem('AdjustmentPermission');
        sessionStorage.removeItem('AuditTypePermission');
        sessionStorage.removeItem('ItemAdditionalAttributePermission');
        sessionStorage.removeItem('ItemAdditionalAttributeValuePermission');
        sessionStorage.removeItem('ItemAdditionalAttributePricePermission');
        sessionStorage.removeItem('ApprovalSetupPermission');//added by touhid
        sessionStorage.removeItem('BankAccountPermission');
        sessionStorage.removeItem('BankDocumentEntryPermission');
        //Accounts
        sessionStorage.removeItem('ChartOfAccountsPermission');
        sessionStorage.removeItem('AccountTypePermission');
        sessionStorage.removeItem('AccountTypeDetailPermission');

        sessionStorage.removeItem('ReceiptVoucherPermission');
        sessionStorage.removeItem('PaymentVoucherPermission');
        sessionStorage.removeItem('JournalVoucherPermission');
        sessionStorage.removeItem('ContraVoucherPermission');

        sessionStorage.removeItem('CustomBondPermission');

        sessionStorage.removeItem('AttendancePolicyPermission');

        sessionStorage.removeItem('SetupPermission');
        sessionStorage.removeItem('ReorderLevelSetupPermission');
        sessionStorage.removeItem('OpeningQuantityPermission');
        sessionStorage.removeItem('PurchaseOrderPermission');
        sessionStorage.removeItem('ReceivePermission');
        sessionStorage.removeItem('RequisitionPermission');
        sessionStorage.removeItem('IssuePermission');
        sessionStorage.removeItem('JumboStockIssueEntryPermission');
        sessionStorage.removeItem('StockIssueWithoutRequisitionPermission');
        sessionStorage.removeItem('IssueApprovePermission'); //added by Tofael 26102016
        //sessionStorage.removeItem('InventoryReportsPermission'); //added by Tofael 28102016 
        sessionStorage.removeItem('HRReportsPermission'); //added by Tofael 28102016 
        sessionStorage.removeItem('SupplierPaymentHistoryPermission'); //added by Tofael 28102016 
        sessionStorage.removeItem('ExportReportUIPermission'); //added by Tofael 28102016
        sessionStorage.removeItem('InventoryAndSaleReportsMushakPermission'); 
        sessionStorage.removeItem('DeliveryPermission'); //added by Tofael 09112016 
        sessionStorage.removeItem('SalesInvoicePermission'); 
        sessionStorage.removeItem('StockStatusPermission'); 
        sessionStorage.removeItem('StockReceiveDashboardPermission');
        sessionStorage.removeItem('MaterialsDemandPermission'); 
        sessionStorage.removeItem('ProductionStatusPermission'); 
        sessionStorage.removeItem('ProductionDashboardPermission'); 
        sessionStorage.removeItem('ReturnToSupplierPermission');
        sessionStorage.removeItem('ReturnFromDepartmentPermission');
        sessionStorage.removeItem('StockAuditEntryPermission');
        sessionStorage.removeItem('StockDeclarationEntryPermission');
        sessionStorage.removeItem('InventoryApprovalsPermission');//added by touhid
        sessionStorage.removeItem('PurchaseRequisitionPermission');
        sessionStorage.removeItem('BillOfMaterialPermission');
        sessionStorage.removeItem('WarrentyAndSerialNoPermission');
        sessionStorage.removeItem('ImportReportUIPermission');
        sessionStorage.removeItem('SupplierPaymentAdjustmentPermission');
        sessionStorage.removeItem('InternalWorkOrderPermission');//added by touhid
        sessionStorage.removeItem('PurchaseBillPermission');
        sessionStorage.removeItem('LocalPurchaseBillPermission');
        sessionStorage.removeItem('PayableDashboardPermission');
        sessionStorage.removeItem('SupplierDashboardPermission');
        sessionStorage.removeItem('SupplierPaymentPermission');

        sessionStorage.removeItem('SupplierPaymentAdjustmentPermission');
        sessionStorage.removeItem('SupplierLedgerPermission');

        
        sessionStorage.removeItem('ProcurementDashboardPermission');
        sessionStorage.removeItem('ImportPurchaseBillPermission');
        sessionStorage.removeItem('ProductionEntryPermission');
        //POS
        sessionStorage.removeItem('CashDepositPermission');
        sessionStorage.removeItem('SalesOrderPermission');
        sessionStorage.removeItem('PosDashboardPermission');
        sessionStorage.removeItem('ReviseSalesOrderPermission');
        sessionStorage.removeItem('CustomerInformationFormationPermission');
        sessionStorage.removeItem('CIFDashboardPermission');
        sessionStorage.removeItem('ReviseInternalWorkOrderPermission');
        //Receivable
        sessionStorage.removeItem('CompanyAdvancePermission');
        sessionStorage.removeItem('PaymentOnAccountPermission');
        sessionStorage.removeItem('CompanyDashboardPermission');
        sessionStorage.removeItem('CompanyPaymentPermission');
        sessionStorage.removeItem('CompanyRefundPermission');
        sessionStorage.removeItem('AgingReportPermission');
        sessionStorage.removeItem('CompanyVatAitPermission');
        sessionStorage.removeItem('CompanyOpeningPermission');

        sessionStorage.removeItem('ReceivableDashboardPermission');
        sessionStorage.removeItem('CompanyAdjustmentPermission');
        sessionStorage.removeItem('SaleAcknowledgementPermission');
        sessionStorage.removeItem('SaleAdjustmentPermission');
        sessionStorage.removeItem('SupplierRefundPermission');
        //Payable
        sessionStorage.removeItem('SupplierAdvancePermission');
        sessionStorage.removeItem('SupplierOpeningBalancePermission');
        sessionStorage.removeItem('PurchaseAcknowledgementPermission');
        sessionStorage.removeItem('PurchaseAdjustmentPermission');
        sessionStorage.removeItem('AccountsPermission');
        //Accounts
        sessionStorage.removeItem('ChartOfAccountsPermission');

        sessionStorage.removeItem('TestPermission');

        //ScreenId remove
        //Security
        sessionStorage.removeItem('UnitScreenId');
        sessionStorage.removeItem('SubcategoryScreenId');
        sessionStorage.removeItem('ScreenScreenId');
        sessionStorage.removeItem('RoleScreenId');
        sessionStorage.removeItem('PermissionScreenId');
        sessionStorage.removeItem('ModuleScreenId');
        //admin
        sessionStorage.removeItem('FiscalYearEntryScreenId');
        sessionStorage.removeItem('ProductScreenId');
        sessionStorage.removeItem('MaterialPaperTypeScreenId');
        sessionStorage.removeItem('EmployeeScreenId');
        sessionStorage.removeItem('DesignationScreenId');
        sessionStorage.removeItem('DeclarationTypeScreenId');
        sessionStorage.removeItem('DepartmentScreenId');
        sessionStorage.removeItem('DepartmentScreenId');
        sessionStorage.removeItem('ChangePasswordScreenId');
        sessionStorage.removeItem('CategoryScreenId');
        sessionStorage.removeItem('BranchTypeScreenId');
        sessionStorage.removeItem('BranchScreenId');
        sessionStorage.removeItem('ReportNotificationNameScreenId');
        sessionStorage.removeItem('EmailNotificationSetupScreenId');
        sessionStorage.removeItem('EmailSendScreenId');
        sessionStorage.removeItem('PaymentTypeScreenId');
        sessionStorage.removeItem('PaymentGroupScreenId');
        sessionStorage.removeItem('SupplierScreenId');
        sessionStorage.removeItem('CustomBondScreenId');
        sessionStorage.removeItem('TestEntryScreenId');
        sessionStorage.removeItem('');

        sessionStorage.removeItem('TerminalScreenId');
        sessionStorage.removeItem('RequisitionPurposeScreenId');
        sessionStorage.removeItem('ReturnReasonScreenId');
        sessionStorage.removeItem('AdjustmentScreenId');
        sessionStorage.removeItem('AdjustmentNameScreenId');
        sessionStorage.removeItem('AuditTypeScreenId');
        sessionStorage.removeItem('ItemAdditionalAttributeScreenId');
        sessionStorage.removeItem('ItemAdditionalAttributeValueScreenId');
        sessionStorage.removeItem('ItemAdditionalAttributePriceScreenId');
        sessionStorage.removeItem('ApprovalSetupScreenId');
        sessionStorage.removeItem('BankAccountScreenId');
        sessionStorage.removeItem('BankDocumentEntryScreenId');
        //Account 
        sessionStorage.removeItem('ChartOfAccountsScreenId');
        sessionStorage.removeItem('AccountTypeScreenId');
        sessionStorage.removeItem('AccountTypeDetailScreenId');

        sessionStorage.removeItem('ReceiptVoucherScreenId');
        sessionStorage.removeItem('PaymentVoucherScreenId');
        sessionStorage.removeItem('JournalVoucherScreenId');
        sessionStorage.removeItem('ContraVoucherScreenId');


        //HR added by Raju 31/12/17
        sessionStorage.removeItem('AttendancePolicyScreenId');

        //inventory
        sessionStorage.removeItem('ReceiveScreenId');
        sessionStorage.removeItem('RequisitionScreenId');
        sessionStorage.removeItem('SetupScreenId');
        sessionStorage.removeItem('OpeningQuantityScreenId');
        sessionStorage.removeItem('IssueScreenId');
        sessionStorage.removeItem('JumboStockIssueEntryScreenId');
        sessionStorage.removeItem('StockIssueWithoutRequisitionScreenId');
        sessionStorage.removeItem('IssueApproveScreenId');//added by Tofael 26102016  
        sessionStorage.removeItem('InventoryReportsScreenId');//added by Tofael 28102016  
        sessionStorage.removeItem('InventoryAndSaleReportsMushakScreenId');
        sessionStorage.removeItem('DeliveryScreenId');//added by Tofael 09112016  
        sessionStorage.removeItem('SalesInvoiceScreenId'); 
        sessionStorage.removeItem('StockStatusScreenId'); 
        sessionStorage.removeItem('StockReceiveDashboardScreenId');
        sessionStorage.removeItem('MaterialsDemandScreenId'); 
        sessionStorage.removeItem('ProductionStatusScreenId'); 
        sessionStorage.removeItem('ProductionDashboardStatusScreenId'); 
        sessionStorage.removeItem('ReorderLevelSetupScreenId');
        sessionStorage.removeItem('ReturnToSupplierScreenId');
        sessionStorage.removeItem('ReturnFromDepartmentScreenId');
        sessionStorage.removeItem('StockAuditEntryScreenId');
        sessionStorage.removeItem('StockDeclarationEntryScreenId');
        sessionStorage.removeItem('InventoryApprovalsScreenId');
        sessionStorage.removeItem('PurchaseRequisitionScreenId');
        sessionStorage.removeItem('BillOfMaterialScreenId');
        sessionStorage.removeItem('BillOfMaterialScreenId');
        sessionStorage.removeItem('BillOfMaterialPermission');
        sessionStorage.removeItem('WarrentyAndSerialNoScreenId');
        sessionStorage.removeItem('ImportReportUIScreenId');
        sessionStorage.removeItem('SupplierPaymentAdjustmentScreenId');
        sessionStorage.removeItem('InternalWorkOrderScreenId');
        sessionStorage.removeItem('ProductionEntryScreenId');
        sessionStorage.removeItem('PurchaseBillScreenId');
        //POS
        sessionStorage.removeItem('CashDepositScreenId');
        sessionStorage.removeItem('SalesOrderScreenId');
        sessionStorage.removeItem('PosDashboardScreenId');
        sessionStorage.removeItem('ReviseSalesOrderScreenId');
        sessionStorage.removeItem('CustomerInformationFormationScreenId');
        sessionStorage.removeItem('CIFDashboardScreenId');
        sessionStorage.removeItem('ReviseInternalWorkOrderScreenId');
        //Receivable
        sessionStorage.removeItem('CompanyAdvanceScreenId');
        sessionStorage.removeItem('PaymentOnAccountScreenId');
        sessionStorage.removeItem('CompanyDashboardScreenId');
        sessionStorage.removeItem('CompanyPaymentScreenId');
        sessionStorage.removeItem('CompanyRefundScreenId');
        sessionStorage.removeItem('CompanyVatAitScreenId');
        sessionStorage.removeItem('CompanyOpeningScreenId');
        sessionStorage.removeItem('ReceivableDashboardScreenId');
        sessionStorage.removeItem('CompanyAdjustmentScreenId');
        sessionStorage.removeItem('SaleAcknowledgementScreenId');
        sessionStorage.removeItem('SaleAdjustmentScreenId');
        //Payable
        sessionStorage.removeItem('PurchaseAcknowledgementScreenId');
        sessionStorage.removeItem('PurchaseAdjustmentScreenId');
        sessionStorage.removeItem('SupplierAdvanceScreenId');
        sessionStorage.removeItem('SupplierOpeningBalanceScreenId');
        //Export
        sessionStorage.removeItem('ProformaInvoicePermission');
        sessionStorage.removeItem('ExportDashboardPermission');
        sessionStorage.removeItem('ExpGeneratePermission');
        sessionStorage.removeItem('CommercialInvoicePermission');
        sessionStorage.removeItem('ReviseProformaInvoicePermission');
        sessionStorage.removeItem('ReviseExpGeneratePermission');
        sessionStorage.removeItem('ReviseCommercialInvoicePermission');
        sessionStorage.removeItem('ExportReportsPermission');
        sessionStorage.removeItem('ExportReportsScreenId');

        sessionStorage.removeItem('ProformaInvoiceScreenId');
        sessionStorage.removeItem('ExportDashboardScreenId');
        sessionStorage.removeItem('ExpGenerateScreenId');
        sessionStorage.removeItem('CommercialInvoiceScreenId');
        sessionStorage.removeItem('ReviseProformaInvoiceScreenId');
        sessionStorage.removeItem('ReviseExpGenerateScreenId');
        sessionStorage.removeItem('ReviseCommercialInvoiceScreenId');

        sessionStorage.removeItem('SalesOrderApprovePermission');
        sessionStorage.removeItem('ProformaInvoiceApprovePermission');
        sessionStorage.removeItem('ExpGenerateApprovePermission');
        sessionStorage.removeItem('CommercialInvoiceApprovePermission');
        sessionStorage.removeItem('PostCiProcessPermission');
        sessionStorage.removeItem('ExportDocumentUploadPermission');

        sessionStorage.removeItem('SalesOrderApproveScreenId');
        sessionStorage.removeItem('ProformaInvoiceApproveScreenId');
        sessionStorage.removeItem('ExpGenerateApproveScreenId');
        sessionStorage.removeItem('CommercialInvoiceApproveScreenId');
        sessionStorage.removeItem('PostCiProcessScreenId');
        sessionStorage.removeItem('ExportDocumentUploadScreenId');
        sessionStorage.removeItem('LocalPurchaseBillScreenId');
        sessionStorage.removeItem('PayableDashboardScreenId');
        sessionStorage.removeItem('SupplierDashboardScreenId');
        sessionStorage.removeItem('SupplierPaymentScreenId');
        sessionStorage.removeItem('ProcurementDashboardScreenId');
        sessionStorage.removeItem('ImportPurchaseBillScreenId');
        sessionStorage.removeItem('SupplierPaymentAdjustmentScreenId');
        sessionStorage.removeItem('SupplierLedgerScreenId');
        sessionStorage.removeItem('HRReportsScreenId');
        sessionStorage.removeItem('SupplierPaymentHistoryScreenId');
        sessionStorage.removeItem('ExportReportUIScreenId');
 

        //Error Log
        sessionStorage.removeItem('errorMassage');
    }

    window.onpopstate = function (e) { window.history.forward(1); }

    $scope.Login = function () {
        var value = $("#myText").val();
        $scope.Ip = value;
        //RemoveCookies();
        $scope.LoginUser = [];
        GetUser($scope.s_User.Username, $scope.s_User.Password);
        GetHasReceivable();
    };

    $scope.MatchCode = function () {
        if ($scope.s_User.SmsCodeIn == $scope.SmsCode) {
            $cookieStore.put('UserData', $scope.LoginUser);
            sessionStorage.setItem("UserDataSession", JSON.stringify($scope.LoginUser));
            RemoveAllScreenLock($scope.LoginUser.UserId);
            GetUserCurrentStatus($scope.LoginUser.UserId);
        }
        else {
            alertify.log('Incorrect Code', 'error', '5000');
        }
    }
});
