app.controller("SalesOrderApproveController", function ($rootScope,$scope, $cookieStore, $window, $http, $filter, $window) {
    //#region GLOBAL VARIABLES & METHODS CALL
    
    Clear();
    

    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            $scope.FullName = $scope.LoginUser.FullName;
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Sales Order Approve').ScreenId;
        GetUsersPermissionDetails();

        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Sales Order Approve').ScreenId;
        //    GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Sales Order Approve').ScreenId;
        //        GetUsersPermissionDetails();
        //    }, 500);
        //}

        var today = ($filter('date')(new Date(), 'MMM dd, yyyy')).toString();
        $scope.pos_SalesOrder = { AcknowledgedBy: $scope.LoginUser.UserId, AcknowledgedDate: today };
        //$scope.MinDate = new Date(parseInt($scope.CurrentValuationSetup.FromDate.replace('/Date(', '')));
        $scope.FromDate = today;
        $scope.ToDate = today;
        $scope.VoucherNoExist = false;
        $scope.DisBtn = false;
        $scope.btnDisable = true;


        $scope.SalesApproveList1 = [];
        $scope.pos_SalesApproveList = [];
        $scope.SalesOrderApproveList = [];
        $scope.SalesOrderAmendmentList = [];

        GetActiveCompany();
        GetAllSalesOrderAmendmentApprove();
        GetSalesOrderAmendment();

        ReportNotificationDetail_Get();
        GetAppNotificationSetupByReportCode();
        $scope.ReportNotificationDetailList = [];
        $scope.AppNotificationSetupList = [];
        $scope.EmailSendNotification = {};

       // GetUsersPermissionDetails();
    }
    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.ListViewPermission = false;
        $scope.ApprovedPermission = false;
        $scope.AmendmentApprovedPermission = false;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            var LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var searchCriteria = 'P.RoleId=' + LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {
                //if (aPermissionDetails.FunctionName == 'Create') {
                //    $scope.CreatePermission = aPermissionDetails.CanExecute;
                //}
                //else if (aPermissionDetails.FunctionName == 'Revise') {
                //    $scope.RevisePermission = aPermissionDetails.CanExecute;
                //}
                //else if (aPermissionDetails.FunctionName == 'ListView') {
                //    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                //}
                if (aPermissionDetails.FunctionName == 'Create') {
                    $scope.CreatePermission = aPermissionDetails.CanExecute;
                }else if (aPermissionDetails.FunctionName == 'Approved') {
                    $scope.ApprovedPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Amendment Approved') {
                    $scope.AmendmentApprovedPermission = aPermissionDetails.CanExecute;
                }
                
            });
        });
    }
    function ReportNotificationDetail_Get() {
        $http({
            url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'SOA',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.ReportNotificationDetailList = notification;
        });

    }
    


    function GetAllSalesOrderAmendmentApprove() {
        $http({
            url: '/ExpApproval/GetSalesOrder?approvalType=SoNew' + '&DepartmentName=' + $scope.LoginUser.DepartmentName + '&SectionId=' + $scope.LoginUser.SectionId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.DocDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.DocDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'mediumDate')).toString();
                        aSd.DocDate = date1;
                    }
                })
            }
            $scope.SalesApproveList1 = data;
        });
    }


    function GetSalesOrderAmendment() {

        $http({
            url: '/ExpApproval/GetSalesOrder?approvalType=SOAmendment' + '&DepartmentName=' + $scope.LoginUser.DepartmentName + '&SectionId=' + $scope.LoginUser.SectionId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalesOrderAmendmentList = data;
            //angular.forEach(data,function (aData) {
            //    aData.FactoryName = aData.FactoryName;
               
            //})
            
            console.log($scope.SalesOrderAmendmentList);
        });
    }
    $scope.SelectAmendmentRequestList = function (row, select) {
        var array = [];
        row.Ischeck = select;
        row.IsApproved = true;
        row.ApprovedBy = row.UpdateBy = $scope.LoginUser.UserId;

        if (row.Ischeck) {
            row.ApprovalId = row.ApprovalId;
            array.push(row);
            $scope.btnAmendmentReqDis = true;
        }
        $scope.AmendmentRequestList = array;

    }
    function SaveAmendmentRequest() {

        $http({
            url: '/ExpApproval/CheckDuplicate?approvalType=SOAmendment&approvalPassword=' + $scope.aPassword,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                alertify.log(' Password already used!', 'already', '5000');
                txtPassword.focus();
                return;
            }
            else {

                if ($scope.AmendmentRequestList.length <= 0) {
                    alertify.log('Please select at least one new approval', 'error', '5000');
                    return;
                }
                angular.forEach($scope.AmendmentRequestList, function (c) {
                    c.ApprovalPassword = $scope.aPassword;
                });
                var param = JSON.stringify({ expApproval: $scope.AmendmentRequestList });
                $http.post('/ExpApproval/UpdateApproval', param).success(function (data) {
                    AmendmentRequestEmailSend();
                    if (data > 0) {
                        AppNotificationLogPost($scope.AmendmentRequestList, 'Sales Order Amendment Approved!')
                        $scope.AmendmentRequestList = [];
                        alertify.log('SO Approved Successfully!', 'success', '5000');
                        Clear();
                        $window.scrollTo(0, 0);
                        $scope.salesOrderApproveForm.$setPristine();
                        $scope.salesOrderApproveForm.$setUntouched();
                        $scope.aPassword = '';
                    }
                    else if (data == 0) {
                        alertify.log('Network Errors!', 'error', '5000');
                    }
                }).error(function (data) {
                    alertify.log('Network Errors !', 'error', '5000');
                });
            }
        })
       
    }
    $scope.SaveAmendmentRequest = function () {
        if ($scope.CreatePermission) {
            alertify.confirm("Are you sure to submit?", function (e) {
                if (e) {
                    SaveAmendmentRequest();
                }
            })
        }
        else if (!$scope.CreatePermission) {
            alertify.log('You do not have permission to submit!', 'error', '5000');
        }

    }


    function AmendmentRequestEmailSend() {

        $scope.EmailSendNotification.EmailSubject = "Amendment Approved ";
        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })

        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var currentDate = new Date();
        var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> Amendment Approved For Sales Order <br/> ' +
            'Amendment Password: <strong > ' +$scope.aPassword + '</strong><br/>' +
            'Sales Order No: <strong > ' + $scope.SalesOrderAmendmentList[0].DocNo + '</strong><br/>' +
          /*  'Sales Order Date: <strong>' + $scope.SalesOrderAmendmentList[0].DocType + '</strong><br/>' +*/
            'Company Name: <strong>' + $scope.SalesOrderAmendmentList[0].Party + '</strong><br/>' +
            'Amendment by: <strong>' + $scope.LoginUser.FullName + '</strong>' + '<br/>' +
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

            // console.log(response.data);
        });
    }

    //$scope.OpenReport = function (salesOrderNo) {
    //    console.log(salesOrderNo);

    //    $window.open("/ErpReports/RV_Pos_SalesOrderBySalesOrderId.aspx?SalesOrderId=" + salesOrderNo, "_blank", "width=790,height=630,left=340,top=25");
    //}

    function OpenReport(SOId) {
        $window.open("#/SalesOrderReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SalesOrderId", JSON.stringify(SOId));
        $cookieStore.put("SalesOrderId", SOId);
        event.stopPropagation();
    }
    $scope.OpenReport = function (SOId) {
        OpenReport(SOId);
    };
    function GetActiveCompany() {
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.companyList = data;
        })
    }
    //#endregion 

    //#region EVENTS
    $scope.SearchSalesOrder = function () {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var dateSplit = $scope.FromDate.split(' ');
        var date = dateSplit[1].replace(',', '');
        var year = dateSplit[2];
        var month;
        for (var j = 0; j < months.length; j++) {
            if (dateSplit[0] == months[j]) {
                month = months.indexOf(months[j]) + 1;
            }
        }
        var fromDate = year + "-" + month + "-" + date;

        dateSplit = $scope.ToDate.split(' ');
        date = dateSplit[1].replace(',', '');
        year = dateSplit[2];
        for (var j = 0; j < months.length; j++) {
            if (dateSplit[0] == months[j]) {
                month = months.indexOf(months[j]) + 1;
            }
        }
        var toDate = year + "-" + month + "-" + date;

        var criteria = "IsAcknowledged=0 AND SalesOrderDate BETWEEN '" + fromDate + "' AND '" + toDate + "'";

        if ($scope.ddlCompany !== undefined && $scope.ddlCompany != null) {
            criteria += " AND SO.CompanyId=" + $scope.ddlCompany.CompanyId;
        }

        $http({
            url: '/SalesOrder/GetSalesOrderDynamic?searchCriteria=' + criteria + "&orderBy='SalesOrderDate'",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.SalesOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
                        // console.log(parsedDate1);
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aSd.SalesOrderDate = date1;
                    }
                })
            }
            else
                alertify.log('No Sales Order Found', 'error', '5000');

            $scope.SalesApproveList = data;
        });
    }

    $scope.CheckVoucherNoExists = function () {
        if (!angular.isUndefined($scope.pos_SalesOrder.VoucherNo) && $scope.pos_SalesOrder.VoucherNo != null && $scope.pos_SalesOrder.VoucherNo != '') {
            $http({
                url: "/CompanyAdvance/CheckVoucherNoExists?voucherNo=" + $scope.pos_SalesOrder.VoucherNo,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                if (data.length && data[0].VoucherCount > 0) {
                    alertify.log('Voucher No.' + $scope.pos_SalesOrder.VoucherNo + ' already exists!', 'error', '5000');
                    $scope.VoucherNoExist = true;
                    $('#txtVoucherNo').focus();
                }
                else {
                    $scope.VoucherNoExist = false;
                }
            });
        }
    }

    $scope.RowSelect = function () {
        $scope.pos_SalesApproveList = Enumerable.From($scope.SalesApproveList).Where('$.selected==true').ToArray();
        $scope.pos_SalesOrder.Amount = Enumerable.From($scope.pos_SalesApproveList).Sum('$.Amount').toFixed(2);
        $scope.btnDisable = false;
    }

    $scope.SelectSalesOrderApproveList = function (row, select) {
        row.Ischeck = select;
        row.IsApproved = true;
        row.ApprovedBy = row.UpdateBy = $scope.LoginUser.UserId;

        if (row.Ischeck) {
            row.ApprovalId = row.ApprovalId;
            $scope.SalesOrderApproveList.push(row);
        }
        else {
            var RowIndexList = [];

            angular.forEach($scope.SalesOrderApproveList, function (salesApprove) {
                if (salesApprove.Ischeck === row.Ischeck) {
                    var ind = $scope.SalesOrderApproveList.indexOf(salesApprove);
                    RowIndexList.push(ind);
                }
            });
            for (var i = RowIndexList.length - 1; i >= 0; i--) {
                $scope.SalesOrderApproveList.splice(RowIndexList[i], 1);
            }
        }

        if ($scope.SalesOrderApproveList.length > 0) {
            $scope.DisBtn = true;
        }
        else {
            $scope.DisBtn = false;
        }

        $scope.SoNumberList = [];
        $scope.SoDateFilter = [];
        angular.forEach($scope.SalesOrderApproveList, function (aSoNum) {
            $scope.SoNumberList.push(aSoNum.DocNo);
            $scope.SoDateFilter.push(aSoNum.DocDate);
        });

        $scope.FilterSoNo = "";
        $scope.FilterSoDate = "";
      
        //angular.forEach($scope.SoNumberList, function (aSo) {
        //    $scope.FilterSoNo = aSo
        //});

        for (var i = 0; i < $scope.SoNumberList.length; i++) {
            $scope.FilterSoNo += ',' + $scope.SoNumberList[i];
         
        }
        for (var i = 0; i < $scope.SoDateFilter.length; i++) {
             $scope.FilterSoDate += '&' + $scope.SoDateFilter[i];
            // $scope.FilterSoDate += $scope.SoDateFilter[i] == '&' ? $scope.SoDateFilter[i] : (' & ' + $scope.SoDateFilter[i])
        }
    }

    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'SOA',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(SalesOrderList, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];
        angular.forEach(SalesOrderList, function (aSO) {
            angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
                var obj = {}
            /*    obj = aNotify*/
                obj.AppNotificationId = aNotify.AppNotificationId;
                obj.DepartmentId = aNotify.DepartmentId;
                obj.EmployeeId = aNotify.EmployeeId;
                obj.EmployeeName = aNotify.EmployeeName;
                obj.IsActive = aNotify.IsActive;
                obj.ReportId = aNotify.ReportId;
                obj.ReportName = aNotify.ReportName;
                obj.RoleId = aNotify.RoleId;
                obj.RoleName = aNotify.RoleName;
                obj.ScreenUrl = aNotify.ScreenUrl;
                obj.SectionId = aNotify.SectionId;
                obj.Status = aNotify.Status;
                obj.UserId = aNotify.UserId;

                obj.NotificaitonTitle = NotificaitonTitle
                //if ($scope.LoginUser.DepartmentName != null) {
                //if ($scope.LoginUser.DepartmentName.match("Sales")) {
                if (aNotify.DepartmentId == 7) {
                    if (aNotify.SectionId == aSO.SectionId) {
                        obj.NotificationDetail = 'Sales Order No: ' + aSO.DocNo + ' Company Name: ' + aSO.Party + ' Approved By: ' + $scope.FullName
                        $scope.AppNotificationLogList.push(obj);
                    }
                } else {
                    obj.NotificationDetail = 'Sales Order No: ' + aSO.DocNo + ' Company Name: ' + aSO.Party + ' Approved By: ' + $scope.FullName
                    $scope.AppNotificationLogList.push(obj);
                }
                //}
                
            })
        })


        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $scope.AppNotificationLogList = [];
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) {
            if (data > 0) {

            }
            else {
                //alertify.log('Network Error, refresh page and try again', 'error', '5000');
            }
        }).error(function (msg) {
            //alertify.log('Network Error, refresh page and try again', 'error', '5000');
        });
    }

    function SaveSalesOrderApprove() {
        if ($scope.SalesOrderApproveList.length <= 0) {
            alertify.log('Please select at least one sales order', 'error', '5000');
            return;
        }
        
        var params = JSON.stringify({ expApproval: $scope.SalesOrderApproveList });
        $http.post('/ExpApproval/UpdateApproval', params).success(function (data) {



            if (data > 0) {
                AppNotificationLogPost($scope.SalesOrderApproveList, 'Sales Order Approved!');
                
                EmailSend();
                $window.scrollTo(0, 0);
                alertify.log('Sales Order Approved successfully!', 'success', '5000');
                GetAllSalesOrderAmendmentApprove();
                $scope.SalesOrderApproveList = [];

            }
            else {
                alertify.log('Network Error, refresh page and try again', 'error', '5000');
            }
        }).error(function (msg) {
            alertify.log('Network Error, refresh page and try again', 'error', '5000');
        });
         
    }
    $scope.SaveSalesOrderApprove = function () {
        if ($scope.CreatePermission) {
            alertify.confirm("Are you sure to submit?", function (e) {
                if (e) {
                    SaveSalesOrderApprove();
                }
            })
        }
        else if (!$scope.CreatePermission) {
            alertify.log('You do not have permission to submit!', 'error', '5000');
        }
        
    }


    function EmailSend() {

       

        $scope.EmailSendNotification.EmailSubject = "Sales Order Approved";
        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })

        angular.forEach($scope.SalesOrderApproveList, function (aCheck) {

            $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
            var currentDate = new Date();
            var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

            $scope.EmailSendNotification.EmailBody =
                '<p> Dear User,<br/> A new Sales Order has been Approved. <br/> ' +
            'Sales Order No: <strong > ' + $scope.FilterSoNo.slice(1) + '</strong><br/>' +
                'Sales Order Date: <strong>' + $scope.FilterSoDate.slice(1)+ '</strong><br/>' +
               'Company Name: <strong>' + aCheck.Party + '</strong><br/>' +
               'Approved by: <strong>' + $scope.LoginUser.FullName+ '</strong>' + '<br/>' +
                'Create Date: ' + CreatedDate + '<br/><br />' +
                'Approve Date: ' + CreatedDate + '<br/><br />' +

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
        });

       

       
    }

    $scope.SaveAcknowledgement = function () {
        var accountsTrn = {};
        accountsTrn.Narration = 'Orders: ';

        angular.forEach($scope.pos_SalesApproveList, function (aSd) {
            aSd.AcknowledgedBy = $scope.pos_SalesOrder.AcknowledgedBy;
            aSd.AcknowledgedDate = $scope.pos_SalesOrder.AcknowledgedDate;
            if (accountsTrn.Narration === 'Orders: ')
                accountsTrn.Narration += aSd.SalesOrderNo + '(' + aSd.CompanyName + ')';
            else
                accountsTrn.Narration += ', ' + aSd.SalesOrderNo + '(' + aSd.CompanyName + ')';
        });

        accountsTrn.ActionType = 'Journal';
        accountsTrn.RefType = 'Sale';
        accountsTrn.FromAccountCode = '4001';   //Sales
        accountsTrn.ToAccountCode = '1001';     //AR
        //accountsTrn.Narration = 'Sold goods to ' + $scope.pos_SalesOrder.CompanyName + ' [Order No: ' + $scope.pos_SalesOrder.SalesOrderNo + ']';
        accountsTrn.TxDate = $scope.pos_SalesOrder.AcknowledgedDate;
        accountsTrn.RefNumber = 1;
        accountsTrn.Amount = $scope.pos_SalesOrder.Amount;
        accountsTrn.CreatorId = $scope.pos_SalesOrder.AcknowledgedBy;

        alertify.confirm("Are you sure to submit?", function (e) {
            if (e) {
                var params = JSON.stringify({ accountsTransaction: accountsTrn, SalesApproveList: $scope.pos_SalesApproveList, purBillList: [] });
                $http.post('/AccountsTransaction/Acknowledge', params).success(function (data) {
                    if (data > 0) {
                        alertify.log('Acknowledgements saved successfully!', 'success', '5000');
                        Clear();
                        $scope.SalesApproveList = [];
                        $scope.ddlCompany = null;
                        $window.scrollTo(0, 0);
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

    $scope.ResetForm = function () {
        Clear();
        $scope.SalesApproveList = [];
        $scope.ddlCompany = null;
      //  $scope.saleAcknowledgementEntryForm.$setPristine();
       // $scope.saleAcknowledgementEntryForm.$setUntouched();
    }

    $scope.ShowReport = function (purBillId) {
        $window.open("/ErpReports/RV_Inv_PurchaseBillByPBId.aspx?PBId=" + purBillId, "_blank", "width=790,height=630,left=340,top=25");
    }
    //#endregion

})