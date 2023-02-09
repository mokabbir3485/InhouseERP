app.controller("CommercialInvoiceApproveController", function ($scope, $cookieStore, $http, $filter, $window) {
    Clear();
    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.FullName = $scope.LoginUser.FullName;
        GetCommercialInvoice();
        GetCommercialInvoiceNew();
        $scope.CommercialInvoiceListNew = [];
        $scope.name = "CommercialInvoiceApprove";
        $scope.btnCiNewDis = false;
        $scope.btnAmendmentReqDis = false;
        $scope.OTP = null;
        $scope.CIApproveList = [];

        $scope.AmendmentRequestList = [];

        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];

        $scope.EmailSendNotification = {};

        $scope.AppNotificationSetupList = [];
        GetAppNotificationSetupByReportCode();
    } 
    function ReportNotificationDetail_Get() {
        $http({
            url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'CIA',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.ReportNotificationDetailList = notification;
        });
    }

    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'CIA',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(NotificaitonTitle) {
        $scope.AppNotificationLogList = [];

        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle
            obj.NotificationDetail = 'Commercial Invoice No: ' + $scope.CiNos + ' Company Name: ' + $scope.CompanyNames + ' Approved By: ' + $scope.FullName;
            $scope.AppNotificationLogList.push(obj);
        })

        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) {
            if (data > 0) {

            }
            else {
                alertify.log('Network Error, refresh page and try again', 'error', '5000');
            }
        }).error(function (msg) {
            alertify.log('Network Error, refresh page and try again', 'error', '5000');
        });
    }
    $scope.SelectCiNewList = function (row, select) {
        row.Ischeck = select;
        row.IsApproved = true;
        row.ApprovedBy = row.UpdateBy = $scope.LoginUser.UserId;

        if (row.Ischeck) {
            row.ApprovalId = row.ApprovalId;
            $scope.CIApproveList.push(row);
            //$scope.CIApproveList=row;
        }
        else {
            var RowIndexList = [];

            angular.forEach($scope.CIApproveList, function (salesApprove) {
                if (salesApprove.Ischeck === row.Ischeck) {
                    var ind = $scope.CIApproveList.indexOf(salesApprove);
                    RowIndexList.push(ind);
                }
            });
            for (var i = RowIndexList.length - 1; i >= 0; i--) {
                $scope.CIApproveList.splice(RowIndexList[i], 1);
            }
        }
        if ($scope.CIApproveList.length >0)
 {
            $scope.btnCiNewDis = true;
        }
        else {
            $scope.btnCiNewDis = false;
        }
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
    function EmailContentForNewApproval() {
        $scope.EmailSendNotification.EmailSubject = "Approved Commercial Invoice No: " + $scope.CiNos;

        var d = Date(Date.now());
        var a = d.toString();
        $scope.CreatedDate = a.split('GMT');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear user,<br/><strong> Your created commercial invoice has been approved.</strong> <br/><br/> ' +
            'Commercial invoice No: <strong > ' + $scope.CiNos + '</strong><br/>' +
            'Company name: <strong>' + $scope.CompanyNames + '</strong><br/>' +
            'Approved by: <strong>' + $scope.FullName + '</strong>' + '<br/>' +
            'Approved date: <strong>' + $scope.CreatedDate[0] + '</strong>' + '<br/><br />' +

            'Regards,<br/>' +
            'Software Team <br/>' +
            'Retail Technologies Ltd.</p>'
    }
    function EmailContentForAmendmentApprove() {
        $scope.EmailSendNotification.EmailSubject = "Amendment Request Approved For Commercial Invoice No: " + $scope.CiNos;

        var d = Date(Date.now());
        var a = d.toString();
        $scope.CreatedDate = a.split('GMT');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/><strong> Your amendment request for commercial invoice has been approved.</strong> <br/><br/> ' +
            'Password: <strong > ' + $scope.aPassword + '</strong><br/>' +
            'Commercial invoice No: <strong > ' + $scope.CiNos + '</strong><br/>' +
            'Company name: <strong>' + $scope.CompanyNames + '</strong><br/>' +
            'Approved by: <strong>' + $scope.FullName + '</strong>' + '<br/>' +
            'Approved date: <strong>' + $scope.CreatedDate[0] + '</strong>' + '<br/><br />' +

            'Regards,<br/>' +
            'Software Team <br/>' +
            'Retail Technologies Ltd.</p>'
    }
    function EmailSend() {
        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })

        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
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
    $scope.SaveNewApproval = function () {
       
       
        if ($scope.CIApproveList.length <= 0) {
            alertify.log('Please select at least one new approval', 'error', '5000');
            return;
        }
      
        $scope.CiNos = '';
        $scope.CompanyNames = '';
        angular.forEach($scope.CIApproveList, function (aData) {
            $scope.CiNos += $scope.CiNos == '' ? aData.DocNo : (',' + aData.DocNo);
            $scope.CompanyNames += $scope.CompanyNames == '' ? aData.Party : (',' + aData.Party);
        });
        var param = JSON.stringify({ expApproval: $scope.CIApproveList });
        $http.post('/ExpApproval/UpdateApproval', param).success(function (data) {

            if (data > 0) {
                AppNotificationLogPost('Commercial Invoice Approved!')
                EmailContentForNewApproval();
                EmailSend();
                $scope.CIApproveList = [];
                alertify.log('CI Send successfully!', 'success', '5000');
     
                Clear();

            }
            else if (data == 0) {
                alertify.log('Network Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Network Errors !', 'error', '5000');
        });
    }

    $scope.OpenReport = function (ciId) {
        $window.open("#/CommercialInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("CommercialInvoiceId", ciId);
        event.stopPropagation();
    };

    $scope.SaveAmendmentRequest = function () {
        $scope.CiNos = '';
        $scope.CompanyNames = '';
        $scope.Passwords = '';
        angular.forEach($scope.AmendmentRequestList, function (aData) {
            $scope.CiNos += $scope.CiNos == '' ? aData.DocNo : (',' + aData.DocNo);
            $scope.CompanyNames += $scope.CompanyNames == '' ? aData.Party : (',' + aData.Party);
        });
        $http({
            url: '/ExpApproval/CheckDuplicate?approvalType=CIAmendment&approvalPassword=' + $scope.aPassword,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                
                alertify.log(' Password already used!', 'already', '5000');
                txtPassword.focus();
                return;
            }
            else {
                
                EmailContentForAmendmentApprove();
                EmailSend();
                if ($scope.AmendmentRequestList.length <= 0) {
                    alertify.log('Please select at least one new approval', 'error', '5000');
                    return;
                }
                angular.forEach($scope.AmendmentRequestList, function (c) {
                    c.ApprovalPassword = $scope.aPassword;
                });
                var param = JSON.stringify({ expApproval: $scope.AmendmentRequestList });
                $http.post('/ExpApproval/UpdateApproval', param).success(function (data) {

                    if (data > 0) {
                        AppNotificationLogPost('Commercial Invoice Amendment Approved!')
                        alertify.log('CI Approved Successfully!', 'success', '5000');
                        Clear();
                        $scope.AmendmentRequestList = [];
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

    function GetCommercialInvoice() {

        $http({
            url: '/ExpApproval/GetCommercialInvoice?approvalType=CiAmendment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CommercialInvoiceApproveList= data;
            console.log($scope.CommercialInvoiceApproveList);
        });
    }
    function GetCommercialInvoiceNew() {

       $http({
            url: '/ExpApproval/GetCommercialInvoice?approvalType=CiNew',
          method: 'GET',
            headers: { 'Content-Type': 'application/json' }
       }).success(function (data) {
           $scope.CommercialInvoiceListNew = data;
          
           console.log($scope.CommercialInvoiceListNew);
        });
    }
});