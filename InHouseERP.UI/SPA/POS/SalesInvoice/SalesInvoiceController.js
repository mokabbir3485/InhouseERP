app.controller("SalesInvoiceController", function ($scope, $rootScope, $cookieStore, $http, $window, $filter) {
    Clear();

    
    $scope.dblClick = function () {
        $scope.IsReadOnly = false;
    }

    function Clear() {
        $scope.IsUpdate = false;
        $scope.IsReadOnly = true;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.ScreenId = parseInt(sessionStorage.getItem("SalesInvoiceScreenId"));

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Sales Invoice').ScreenId;
        GetUsersPermissionDetails();

        $scope.ddlCompany = null;
        $scope.DeliveryIds = '';
        $scope.Companylist = [];
        $scope.DeliveryList = [];
        $scope.SavedDeliveryList = [];
        $scope.companyPaymentList = [];
        $scope.pos_CompanySalesInvoice = {};
        $scope.pos_CompanySalesInvoice.SalesInvoiceId = 0;
        $scope.pos_CompanySalesInvoice.DeliveryIds = '';
        $scope.pos_CompanySalesInvoice.IsOnCredit = true;
        $scope.pos_CompanySalesInvoice.SalesInvoiceDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetSalesInvoiceNo();
        $scope.pos_SalesInvoiceDetailList = [];
        $scope.SalesInvoiceCheckList = [];
        GetActiveCompany();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetCompanySalesInvoicePaged($scope.currentPage);

        $scope.ManualSalesInvoiceList = [];
        $scope.CurrencyList = [];
        GetAllCurrency();
      
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
      //  GetUsersPermissionDetails();
        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];
        $scope.EmailSendNotification = {};
        $scope.ddlPaymentType = null;
        $scope.PaymentTypeList = [];
        GetAllActivePaymentType();
        GetAllActiveMBankingServiceType();
        GetAllBankAccount();
        GetAllChequeType();
        GetAllManualSalesInvoice();
        $scope.BankAccountList = [];
        $scope.ChequeTypeList = [];

        $scope.ddlPaymentType = null;
        $scope.ddlBankAccount = null;
        $scope.ddlChequeType = null;
        $scope.ddlServiceName = null;
        $scope.ddlReceiverBankAccount = null;
        $scope.ddlCompanyBankAccount = null;
        $scope.ddlPayOrderBankAccount = null;
        $scope.ddlChecqueBankAccount = null;
        $scope.CompanyBankAccountList = [];
        $scope.ReceiverBankAccountList = [];

        $scope.TotalDeliveryQuantity = 0;
        $scope.TotalItemAmount = 0;
        $scope.TotalItemAmountBDT = 0;
        $scope.CPTCost = 0
        $scope.CPTCostBDT = 0;
        $scope.TotalAountCost = 0;
        $scope.TotalAountOfCptCost = 0;
        $scope.TotalAmoutInWithCpt = 0;
    }
    function ReportNotificationDetail_Get() {


        $http({

            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'SI',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
            console.log('Mail', $scope.AppNotificationSetupList);
        });

    }


    function AppNotificationLogPost(NotificaitonTitle) {
        $scope.AppNotificationLogList = [];


        // angular.forEach(SalesOrderList, function (aSO) {
        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle;

            if (aNotify.DepartmentId == 7) {

                if (aNotify.SectionId == $scope.LoginUser.SectionId) {

                    obj.NotificationDetail = ' Sales Invoice No : ' + $scope.pos_CompanySalesInvoice.SalesInvoiceNo + ' ~  Company Name : ' + $scope.ddlCompany.CompanyName + ' ~ Employee Name : ' + $scope.LoginUser.FullName;

                    $scope.AppNotificationLogList.push(obj);
                }
            } else {

                obj.NotificationDetail = ' Sales Invoice No : ' + $scope.pos_CompanySalesInvoice.SalesInvoiceNo + ' ~  Company Name : ' + $scope.ddlCompany.CompanyName  + ' ~ Employee Name : ' + $scope.LoginUser.FullName;
                $scope.AppNotificationLogList.push(obj);
            }

            // })


        })


        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) { });
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
           /// $scope.PaymentTypeList = data;

           // $scope.PaymentTypeListNew = data;
            angular.forEach(data, function (aPaymentType) {
                if (aPaymentType.PaymentTypeId != 5 && aPaymentType.PaymentTypeId != 6) {
                    $scope.PaymentTypeList.push(aPaymentType);
                }

            });
         
        })
    }


    $scope.OnPaymentMethod = function () {
        $scope.pos_CompanySalesInvoice.IsOnCredit;

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
    $scope.onDivShowGetById = function (PaymentTypeId, PaymentGroupId) {

        if (PaymentTypeId == 3) {

            $scope.pos_CompanySalesInvoice.TransactionNo = '';
            $scope.pos_CompanySalesInvoice.MoneyReceiptNo = '';
            $scope.pos_CompanySalesInvoice.MobileNo = '';
            $scope.ddlServiceName = null;
        }
        else if (PaymentTypeId == 4) {
            $scope.pos_CompanySalesInvoice.ChequeNo = '';
            $scope.pos_CompanySalesInvoice.MoneyReceiptNo = '';
            $scope.pos_CompanySalesInvoice.ChequeDate = '';
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#Selectbankddl').select2('destroy');
            $('#Selectbankddl').val('').select2({
                placeholder: "Select Company Bank Name",
                //theme: "classic",
                dropdownAutoWidth: false
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
            $scope.pos_CompanySalesInvoice.ChequeNo = '';
            $scope.pos_CompanySalesInvoice.ChequeDate = '';
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#Selectbankddl').select2('destroy');
            $('#Selectbankddl').val('').select2({
                placeholder: "Select Customer Bank Name",
                //theme: "classic",
                dropdownAutoWidth: false
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
            $scope.pos_CompanySalesInvoice.TransactionNo = '';
            $scope.pos_CompanySalesInvoice.MobileNo = '';
            $scope.pos_CompanySalesInvoice.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        } else if (PaymentGroupId == 5) {
            $scope.chequeShowDiv = false;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;

            $scope.pos_CompanySalesInvoice.ChequeNo = '';
            $scope.pos_CompanySalesInvoice.MoneyReceiptNo = '';
            $scope.pos_CompanySalesInvoice.ChequeDate = '';
            $scope.ddlBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#Selectbankddl').select2('destroy');
            $('#Selectbankddl').val('').select2({
                placeholder: "Select Customer Bank Name",
                //theme: "classic",
                dropdownAutoWidth: false
            });
            $scope.pos_CompanySalesInvoice.MobileNo = '';
            $scope.pos_CompanySalesInvoice.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
        else {
            $scope.chequeShowDiv = false;
            $scope.OtherShowDiv = false;
            $scope.CashShowDiv = false;

            $scope.pos_CompanySalesInvoice.ChequeNo = '';
            $scope.pos_CompanySalesInvoice.MoneyReceiptNo = '';
            $scope.pos_CompanySalesInvoice.ChequeDate = '';
            $scope.ddlBankAccount = null;
            $scope.ddlReceiverBankAccount = null;
            $scope.ddlCompanyBankAccount = null;
            $scope.ddlPayOrderBankAccount = null;
            $scope.ddlChecqueBankAccount = null;
            $('#Selectbankddl').select2('destroy');
            $('#Selectbankddl').val('').select2({
                placeholder: "Select Customer Bank Name",
                //theme: "classic",
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
            $scope.pos_CompanySalesInvoice.TransactionNo = '';
            $scope.pos_CompanySalesInvoice.MobileNo = '';
            $scope.pos_CompanySalesInvoice.MobileBankingServiceId = 0;
            $scope.ddlServiceName = null;
        }
    }



    //function ReportNotificationDetail_Get() {


    //    $http({
    //        url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'SI',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (notification) {
    //        $scope.ReportNotificationDetailList = notification;


    //        console.log('Mail', $scope.ReportNotificationDetailList);
    //    });

    //}

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
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }
    function GetActiveCompany() {
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Companylist = data;
            
        })
    }

    function GetAllManualSalesInvoice() {
        $http({
            url: '/SalesInvoice/GetAllManualSalesInvoice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ManualSalesInvoiceList = data;
            
        })
    }

    $scope.GetDelivery = function (CompanyId) {
        $scope.DeliveryList = [];
        $scope.SalesInvoiceCheckList = [];
      
        $http({
            url: '/Delivery/GetStockDeliveryByCompanyId?CompanyId=' + CompanyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.DeliveryList = data;
            console.log('Inv',data);
            angular.forEach($scope.DeliveryList, function (aData) {
                var res1 = aData.DeliveryDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.DeliveryDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.DeliveryDate = date1;
                }
            })

            
        });
    }


    $scope.getMaxSalesInvoiceByDate = function () {
        GetSalesInvoiceNo();
    }
    function GetSalesInvoiceNo() {
        
        if ($scope.pos_CompanySalesInvoice.SalesInvoiceDate != "") {
            var dateParts = ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
            var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
            $http({
                url: '/SalesInvoice/GetSalesInvoiceNo',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.MaxSalesInvoiceNo = data;
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
                    $scope.pos_CompanySalesInvoice.SalesInvoiceNo = 'SI/' + $scope.finYearHeadOffice + '/' + $scope.MaxSalesInvoiceNo;
                });
            });
        } else {
            $("#txtFromDate1").focus();
        }
      
        
    }


    function GetAllCurrency() {

        $http({
            url: "/SalesOrder/GetAllCurrency",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.CurrencyList = data;
        })
    }
    
    function GetStockDeliveryDetailByDeliveryId(row) {
          
        $http({
            url: '/Delivery/GetStockDeliveryDetailByDeliveryId?DeliveryId=' + row.DeliveryId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (row.selectedIsCheck == true) {
                if ($scope.isSoExists == false) {
                    $scope.CPTCost += row.CPTCost;
                    $scope.CPTCostBDT += row.CPTCostBDT;
                  
                }
            }

            angular.forEach(data, function (aData) {
                if (row.selectedIsCheck == true) {

                    $scope.TotalDeliveryQuantity += aData.DeliveryQuantity;
                    $scope.TotalAmoutInWithCpt += aData.ItemAmount;
                    $scope.TotalItemAmount += aData.ItemAmount * aData.ConversionRate;

                    $scope.TotalItemAmountBDT += aData.ItemAmountBDT;
                    $scope.pos_SalesInvoiceDetailList.push(aData);

                } else {



                    //$scope.CPTCost -= row.CPTCost;
                    //$scope.CPTCostBDT -= row.CPTCostBDT;
                    $scope.TotalAmoutInWithCpt -= aData.ItemAmount;
                    $scope.TotalDeliveryQuantity -= aData.DeliveryQuantity;
                    $scope.TotalItemAmount -= aData.ItemAmount * aData.ConversionRate;
                    $scope.TotalItemAmountBDT -= aData.ItemAmountBDT;



                    var DetailList = $scope.pos_SalesInvoiceDetailList.filter((d) => d.DeliveryId == aData.DeliveryId);
                    if (DetailList.length > 0) {
                        var index3 = $scope.pos_SalesInvoiceDetailList.indexOf(DetailList[0]);
                        $scope.pos_SalesInvoiceDetailList.splice(index3, 1);
                    }


                    var CheckDetail = $scope.SalesInvoiceCheckList.filter((d) => d.DeliveryId == aData.DeliveryId);

                    if (CheckDetail.length > 0) {

                        var index2 = $scope.SalesInvoiceCheckList.indexOf(CheckDetail[0]);
                        $scope.SalesInvoiceCheckList.splice(index2, 1);
                    }

                    var temp = $scope.pos_SalesInvoiceDetailList.filter(aData => aData.SalesOrderId == row.SalesOrderId);
                    if (temp.length > 0) {
                        $scope.isSoRemove = true;
                    } else {
                        $scope.isSoRemove = false;
                    }
                 

                }
               

            });
        
            if (row.selectedIsCheck == false) {

                if ($scope.isSoRemove == false) {

                    $scope.CPTCost -= row.CPTCost;
                    $scope.CPTCostBDT -= row.CPTCostBDT;
                }
            }

            $scope.TotalAountCost = $scope.CPTCost + $scope.TotalAmoutInWithCpt;
            $scope.TotalAountOfCptCost = $scope.TotalItemAmount + $scope.CPTCostBDT;
           
          
        });

       
       
    }

 
    $scope.onCheckVal = function (row) {


      

    
        if (row.selectedIsCheck == true) {

            var temp = $scope.SalesInvoiceCheckList.filter(aData => aData.SalesOrderId == row.SalesOrderId);
            if (temp.length > 0) {
                $scope.isSoExists = true;
            } else {
                $scope.isSoExists = false;
            }

            if ($scope.SalesInvoiceCheckList.length == 0)
            {
                $scope.SalesInvoiceCheckList.push(row);
               
                GetStockDeliveryDetailByDeliveryId(row);
            }
            else
            {
                if ($scope.SalesInvoiceCheckList[0].CurrencyId == row.CurrencyId)
                {
                   
                   /* $scope.isSoExists =temp.SalesOrderId= ? true : false;*/
                    
                    $scope.SalesInvoiceCheckList.push(row);

                    GetStockDeliveryDetailByDeliveryId(row);
                }

                else
                {
                    row.selectedIsCheck = false;
                    alertify.log('Doesn`t Check Same Type Currency" !!!', 'error', '5000');
                }

            }

        } else
        {


           
           
          
            GetStockDeliveryDetailByDeliveryId(row);

            // if ($scope.pos_SalesInvoiceDetailList.length > 0) {
            //    $scope.CPTCost = 0
            //    $scope.CPTCostBDT = 0;
            //    $scope.pos_SalesInvoiceDetailList = [];
            //    $scope.SalesInvoiceCheckList = [];

            //}
            //if ($scope.SalesInvoiceCheckList.length == 0) {
            //    $scope.CPTCost = 0
            //    $scope.CPTCostBDT = 0;
            //    $scope.pos_SalesInvoiceDetailList = [];
            //    $scope.SalesInvoiceCheckList = [];
            //}
           

            //angular.forEach($scope.pos_SalesInvoiceDetailList, function (aData) {

            //    if (row.selectedIsCheck == false && row.SalesOrderId == aData.SalesOrderId) {
            //        $scope.TotalDeliveryQuantity -= aData.DeliveryQuantity;
            //        $scope.TotalItemAmount -= aData.ItemAmount;
            //        $scope.TotalItemAmountBDT -= aData.ItemAmountBDT;
            //    }
                


            //})

           
            //$scope.TotalDeliveryQuantity -= row.DeliveryQuantity;
            //$scope.TotalItemAmount -= row.ItemAmount;
            //$scope.TotalItemAmountBDT -= row.ItemAmountBDT;

            //var index2 = $scope.SalesInvoiceCheckList.indexOf(row);
            //$scope.SalesInvoiceCheckList.splice(index2, 1);

        
          
            //var rowList = [];
            //rowList.push(row.DeliveryId);
            //$scope.pos_SalesInvoiceDetailList = $scope.pos_SalesInvoiceDetailList.filter(el => (rowList.indexOf(el.DeliveryId) == -1));

            //angular.forEach($scope.SalesInvoiceCheckList, function (aData) {

              


                //if (aData.SalesOrderId == row.SalesOrderId && $scope.SalesInvoiceCheckList[0].SalesOrderId == aData.SalesOrderId) {
                //    $scope.CPTCost = row.CPTCost;
                //    $scope.CPTCostBDT = row.CPTCostBDT;

                //} else {

                //    $scope.CPTCost -= row.CPTCost;
                //    $scope.CPTCostBDT -= row.CPTCostBDT;

                //}

          //  })

          

           
         
            //$scope.TotalItemAmount += $scope.CPTCost;
            //$scope.TotalItemAmountBDT += $scope.CPTCostBDT;
           
        }

      

    }

    $("#dtChequeDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarChequeDate = function () {
        $("#dtChequeDate").focus();
        $("#dtChequeDate").trigger("click");
    }

    $("#SalesInvoiceDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarSalesInvoiceDate = function () {
        $("#SalesInvoiceDate").focus();
        $("#SalesInvoiceDate").trigger("click");
    }


    //$("#VatChallanDate").datepicker({
    //    dateFormat: "M d, yy"
    //});

    //$scope.CalendarVatChallanDate = function () {
    //    $("#VatChallanDate").focus();
    //    $("#VatChallanDate").trigger("click");
    //}

    


    function PostSalesInvoice() {
        $scope.pos_CompanySalesInvoice.DeliveryIds = "";
        $scope.pos_CompanySalesInvoice.CPTCost = 0;

        angular.forEach($scope.SalesInvoiceCheckList, function (aData) {
            $scope.pos_CompanySalesInvoice.DeliveryIds += $scope.pos_CompanySalesInvoice.DeliveryIds === '' ? ('' + aData.DeliveryId) : (',' + aData.DeliveryId);
           // $scope.pos_CompanySalesInvoice.CPTCost += aData.CPTCost;
        })

        $scope.pos_CompanySalesInvoice.CPTCost = $scope.CPTCost;
        if ($scope.pos_CompanySalesInvoice.CPTCost == 0) {
            $scope.pos_CompanySalesInvoice.IsCPT = false;
        } else {
            $scope.pos_CompanySalesInvoice.IsCPT = true;
        }
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $scope.pos_CompanySalesInvoice.CreatorId = $scope.LoginUser.UserId;
                $scope.pos_CompanySalesInvoice.UpdatorId = $scope.LoginUser.UserId;
                console.log($scope.pos_CompanySalesInvoice);

                $scope.pos_CompanySalesInvoice.CompanyId = $scope.ddlCompany.CompanyId;

                if ($scope.ddlChequeType == null || $scope.ddlChequeType == undefined) {
                    $scope.pos_CompanySalesInvoice.ChequeTypeId = 0;
                } else {
                    $scope.pos_CompanySalesInvoice.ChequeTypeId = $scope.ddlChequeType.ChequeTypeId;
                }

                if ($scope.ddlServiceName == null || $scope.ddlServiceName == undefined) {
                    $scope.pos_CompanySalesInvoice.MobileBankingServiceId = 0;
                } else {
                    $scope.pos_CompanySalesInvoice.MobileBankingServiceId = $scope.ddlServiceName.MobileBankingServiceId;
                }

                if ($scope.ddlPaymentType == null || $scope.ddlPaymentType == undefined) {
                    $scope.pos_CompanySalesInvoice.PaymentTypeId = 0;
                } else {
                    $scope.pos_CompanySalesInvoice.PaymentTypeId = $scope.ddlPaymentType.PaymentTypeId;
                }

                $scope.pos_CompanySalesInvoice.PaymentDate = $scope.pos_CompanySalesInvoice.SalesInvoiceDate;
                $scope.pos_CompanySalesInvoice.CurrencyId = $scope.SalesInvoiceCheckList[0].CurrencyId;

                var params = JSON.stringify({ pos_SalesInvoice: $scope.pos_CompanySalesInvoice, pos_SalesInvoiceDetail: $scope.pos_SalesInvoiceDetailList, _pos_InvoicePayment: $scope.pos_CompanySalesInvoice });
                $http({
                    url: '/SalesInvoice/Post',
                    method: 'POST',
                    data:params
                }).success(function (data) {
                    AppNotificationLogPost('Sales Invoice Create');
                    if (data > 0) {
                        EmailSend();
                        alertify.log('Sales Invoice saved successfully!', 'success', '5000');
                        $scope.SalesInvoiceCheckList = [];
                        Clear();
                    }
                });

            }
        })
    }

    $scope.Save = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.pos_CompanySalesInvoice.SalesInvoiceId == 0 && $scope.CreatePermission) {
                //alertify.confirm("Are you sure to save?", function (e) {
                //    if (e) {
                        PostSalesInvoice();
                //    }
                //})
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId > 0 && $scope.RevisePermission) {
                //alertify.confirm("Are you sure to update?", function (e) {
                //    if (e) {
                        PostSalesInvoice();
                //    }
                //})
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.pos_CompanySalesInvoice.SalesInvoiceId == 0 && $scope.CreatePermission) {
                PostSalesInvoice();
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId > 0 && $scope.RevisePermission) {
                PostSalesInvoice();
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }

        
    }




    function EmailSend() {


        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })


        $scope.EmailSendNotification.EmailSubject = "Sales Invoice";
        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        //  $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var currentDate = new Date();
        var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> A new Sales Invoice has been Done. <br/> ' +
            'SalesInvoice No: <strong > ' + $scope.pos_CompanySalesInvoice.SalesInvoiceNo + '</strong><br/>' +
            'SalesInvoice Date: <strong>' + ($filter('date')($scope.pos_CompanySalesInvoice.SalesInvoiceDate, 'dd/MM/yyyy')).toString() + '</strong><br/>' +
            //'Company Name: <strong>' + $scope.ddlInternalWorkOrder.CompanyName + '</strong><br/>' +
            'Company Name: <strong>' + $scope.ddlCompany.CompanyName + '</strong>' + '<br/>' +
            'Create Date: ' + CreatedDate + '<br/><br />' +

            'Regards,<br/>' +
            'Software Team <br/>' +
            'Retail Technologies Ltd.</p>'

        var params = JSON.stringify({ emailSend: $scope.EmailSendNotification });

        $http({
            url: "/EmailSender/EmailSend",
            method: "POST",
            data: params,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {

            console.log(response.data);
        });
    }

    $scope.Reset = function () {
        Clear();
        $scope.stockReceive.ddlStore.$setPristine();
        $scope.stockReceive.ddlStore.$setUntouched();

    }

    $scope.OpenPopupWindow = function (aCompanySalesInvoice, IsManualInvoice) {
        $window.open("#/SalesInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SalesInvoiceId", JSON.stringify(siId));
        aCompanySalesInvoice.IsManualInvoice = IsManualInvoice;
        $cookieStore.put("aCompanySalesInvoice", aCompanySalesInvoice);
        event.stopPropagation();
    };



    $scope.reloadBtn = function () {
        $('#txtFromDateForSI').val('');
        $('#txtToDateForSI').val('');
        $('#textSearchCompanyName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchCompanyName = null;
        GetCompanySalesInvoicePaged(1);
    }

    $scope.CompanySalesInvoiceSearch = function () {
        GetCompanySalesInvoicePaged(1);

    }

    function GetCompanySalesInvoicePaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSI").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForSI").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        //var SearchCriteria = "";

        //if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria = "([SalesInvoiceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
        //    //alert("Name, Date Success!!!!!");
        //}
        //else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
        //    SearchCriteria = "[SalesInvoiceNo] LIKE '%" + $scope.SearchCompanyName + "%' OR [CompanyName] LIKE '%" + $scope.SearchCompanyName + "%'";
        //    //alert("Name Success!!!!!");
        //}
        //else if ($scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria = "[SalesInvoiceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
        //    //alert("Date Success!!!!!");
        //}

        var SearchCriteria = "";
        var SearchCriteria1 = "";

        if ($scope.LoginUser.DepartmentName != null) {
            if ($scope.LoginUser.DepartmentName.match("Sales")) {
                SearchCriteria = "UpdatorDeptId=" + $scope.LoginUser.DepartmentId + " and UpdatorSectionId=" + $scope.LoginUser.SectionId;
            } else {
                SearchCriteria = "";
            }
        }


        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria1 = "([SalesInvoiceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SalesInvoiceNo] LIKE '%" + $scope.SearchCompanyName + "%' OR [CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
            SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria1 = "([SalesInvoiceNo] LIKE '%" + $scope.SearchCompanyName + "%' OR [CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
            SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria1 = "([SalesInvoiceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')";
            SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/SalesInvoice/GetSalesInvoicePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.SalesInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SalesInvoiceDate = date1;
                    }



                })

            }
            else {
                alertify.log('Sales Invoice  Not Found', 'error', '5000');
            }
            $scope.CompanySalesInvoiceListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetCompanySalesInvoicePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetCompanySalesInvoicePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetCompanySalesInvoicePaged($scope.currentPage);
        }
        //  }


    }

    $("#txtFromDateForSI").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForSI = function () {
        $("#txtFromDateForSI").focus();
        $("#txtFromDateForSI").trigger("click");
    }


    $("#txtToDateForSI").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForSI = function () {
        $("#txtToDateForSI").focus();
        $("#txtToDateForSI").trigger("click");
    }

})