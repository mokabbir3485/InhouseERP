app.controller("ProformaInvoiceApproveController",
    function($scope, $cookieStore, $http, $filter, $window) {
        
        Clear();
        function Clear() {
            var UserData = sessionStorage.getItem("UserDataSession");
            if (UserData != null) {
                $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            }
            $scope.FullName = $scope.LoginUser.FullName;
            $scope.name = "Proforma Invoice Approve";
            $scope.OTP = "";
            $scope.count = 0;
            $scope.DisNewPiSaveBtn = false;
            $scope.DisPiAmendmentSaveBtn = false; 
           // $scope.DisPiOTPSaveBtn = false;

            $scope.PerformaInvoiceApproveList = [];
            $scope.ProformaInvoiceNewApproveList = [];
            $scope.PiNewApproval = [];
            $scope.PiAmendmentList = [];

            GetAllAmendmentApproveRequest();
            GetAllNewPIApprove();
            ReportNotificationDetail_Get();
            $scope.ReportNotificationDetailList = [];

            $scope.EmailSendNotification = {};

            $scope.AppNotificationSetupList = [];
            GetAppNotificationSetupByReportCode();
        }
        function ReportNotificationDetail_Get() {
            $http({
                url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'PIA',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (notification) {
                $scope.ReportNotificationDetailList = notification;
            });
        }
        function GetAppNotificationSetupByReportCode() {
            $http({
                url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'PIA',
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
                obj.NotificationDetail = 'Proforma Invoice No: ' + $scope.PiNos + ' Company Name: ' + $scope.CompanyNames + ' Approved By: ' + $scope.FullName;
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
        function GetAllAmendmentApproveRequest() {
            $http({
                url: '/ExpApproval/GetProformaInvoice?approvalType=PIAmendment',
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
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
                $scope.PerformaInvoiceApproveList = data;
            });
        }

        function GetAllNewPIApprove() { 
            $http({
                url: '/ExpApproval/GetProformaInvoice?approvalType=PINew',
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            }).success(function (data) {
                if (data.length > 0) {
                    angular.forEach(data,
                        function(aSd) {
                            var res1 = aSd.DocDate.substring(0, 5);
                            if (res1 == "/Date") {
                                var parsedDate1 = new Date(parseInt(aSd.DocDate.substr(6)));
                                var date1 = ($filter('date')(parsedDate1, 'mediumDate')).toString();
                                aSd.DocDate = date1;
                            }
                        });
                }
                $scope.ProformaInvoiceNewApproveList = data;
            });
        }

        $scope.OpenReports = function (invoiceId) {
            $window.open("#/ProformaInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
            $cookieStore.put("InvoiceId", invoiceId);
            event.stopPropagation();
        }

        $scope.CheckDuplicatePassword = function (password) {

            $http({
                url: '/ExpApproval/CheckDuplicate?approvalType=PiAmendment&approvalPassword=' + password,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                if (data.length > 0) {
                    $scope.count = 1;
                    $('#idOTP').focus();
                    $scope.found = true;
                    return;
                } else {
                    $scope.count = 0;
                    $scope.found = false;
                }
            });
        }
        $scope.LoadInvoice = function (password) {
                                
            $http({
                url: '/ExpApproval/exp_ExpAmendment_GetForEdit?approvalType=ExpAmendment&approvalPassword=' + password,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {

                if (data[0]) {
                    var res1 = data[0].ApplicationDate.substring(0, 5);
                    var res2 = data[0].LcDate.substring(0, 5);
                    var res3 = data[0].ExportContactDate.substring(0, 5);
                    if (res1 && res2 && res3 == "/Date") {
                        var parsedDate1 = new Date(parseInt(data[0].ApplicationDate.substr(6)));
                        var parsedDate2 = new Date(parseInt(data[0].LcDate.substr(6)));
                        var parsedDate3 = new Date(parseInt(data[0].ExportContactDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        var date3 = ($filter('date')(parsedDate3, 'MMM dd, yyyy')).toString();
                        data[0].ApplicationDate = date1;
                        data[0].LcDate = date2;
                        data[0].ExportContactDate = date3;
                    }
                }
                $scope.exp_PaymentProcess = data[0];
            });
        }
        $scope.SelectNewPiApproveList = function (row, select) {
            row.Ischeck = select;
            row.IsApproved = true;
            row.ApprovedBy = row.UpdateBy = $scope.LoginUser.UserId;

            if (row.Ischeck) {
                row.ApprovalId = row.ApprovalId;
                $scope.PiNewApproval.push(row);
            }
            else {
                var RowIndexList = [];

                angular.forEach($scope.PiNewApproval, function (salesApprove) {
                    if (salesApprove.Ischeck === row.Ischeck) {
                        var ind = $scope.PiNewApproval.indexOf(salesApprove);
                        RowIndexList.push(ind);
                    }
                });
                for (var i = RowIndexList.length - 1; i >= 0; i--) {
                    $scope.PiNewApproval.splice(RowIndexList[i], 1);
                }
            }
            if ($scope.PiNewApproval.length > 0) {
                $scope.DisNewPiSaveBtn = true;
            }
            else {
                $scope.DisNewPiSaveBtn = false;
            }
        }

        $scope.SelectPiAmendmentRequestList = function (row) {
            var array = [];
            row.IsApproved = true;
            row.ApprovedBy = row.UpdateBy = $scope.LoginUser.UserId;

            if (row.optionsRadio === "true") {
                $scope.DisPiAmendmentSaveBtn = true;
                row.ApprovalId = row.ApprovalId;
                array.push(row);
            }
            else {
                $scope.DisPiAmendmentSaveBtn = false;
            }
            $scope.PiAmendmentList = array;
        }
        function EmailContentForNewApproval() {
            $scope.EmailSendNotification.EmailSubject = "Approved For Proforma Invoice No: " + $scope.PiNos;

            var d = Date(Date.now());
            var a = d.toString();
            $scope.CreatedDate = a.split('GMT');

            $scope.EmailSendNotification.EmailBody =
                '<p> Dear User,<br/><strong> Your created Proforma Invoice has been approved.</strong> <br/><br/> ' +
                'Proforma Invoice No: <strong > ' + $scope.PiNos + '</strong><br/>' +
                'Company Name: <strong>' + $scope.CompanyNames + '</strong><br/>' +
                'Approved By: <strong>' + $scope.FullName + '</strong>' + '<br/>' +
                'Approved Date: <strong>' + $scope.CreatedDate[0] + '</strong>' + '<br/><br />' +

                'Regards,<br/>' +
                'Software Team <br/>' +
                'Retail Technologies Ltd.</p>'
        }
        function EmailContentForAmendmentApprove() {
            $scope.EmailSendNotification.EmailSubject = "Amendment Approved For Proforma Invoice No: " + $scope.PiNos;

            var d = Date(Date.now());
            var a = d.toString();
            $scope.CreatedDate = a.split('GMT');

            $scope.EmailSendNotification.EmailBody =
                '<p> Dear User,<br/><strong> Your amendment request for proforma invoice has been approved.</strong> <br/><br/> ' +
                'Password: <strong > ' + $scope.Passwords + '</strong><br/>' +
                'Proforma Invoice No: <strong > ' + $scope.PiNos + '</strong><br/>' +
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
        $scope.SaveNewPiApprove = function () {

            if ($scope.PiNewApproval.length <= 0) {
                alertify.log('Please select at least one new PI', 'error', '3000');
                return;
            }
            alertify.confirm("Are you sure to submit?", function (e) {
                if (e) {
                    $scope.PiNos = '';
                    $scope.CompanyNames = '';
                    angular.forEach($scope.PiNewApproval, function (aData) {
                        $scope.PiNos += $scope.PiNos == '' ? aData.DocNo : (',' + aData.DocNo);
                        $scope.CompanyNames += $scope.CompanyNames == '' ? aData.Party : (',' + aData.Party);
                    });
                    var params = JSON.stringify({ expApproval: $scope.PiNewApproval });
                    $http.post('/ExpApproval/UpdateApproval', params).success(function (data) {
                        if (data > 0) {
                            AppNotificationLogPost('Proforma Invoice Approved!');
                            
                            EmailContentForNewApproval();
                            EmailSend();
                            alertify.log('New Proforma invoice approved successfully!', 'success', '5000');
                            GetAllNewPIApprove();
                            $scope.PiNewApproval = [];
                        }
                        else {
                            alertify.log('Network Error, refresh page and try again', 'error', '5000');
                        }
                    }).error(function (msg) {
                        alertify.log('Network Error, refresh page and try again', 'error', '5000');
                    });
                }
            })
        }

        $scope.SavePiAmendmentApprove = function () {

            if ($scope.count > 0) {
                alertify.log(' Password already used!', 'already', '2000');
                return;
            }
            angular.forEach($scope.PiAmendmentList, function (pass) {
                pass.ApprovalPassword = $scope.OTP;
            });

            alertify.confirm("Are you sure to submit?", function (e) {
                if (e) {
                    $scope.PiNos = '';
                    $scope.CompanyNames = '';
                    $scope.Passwords = '';
                    angular.forEach($scope.PiAmendmentList, function (aData) {
                        $scope.PiNos += $scope.PiNos == '' ? aData.DocNo : (',' + aData.DocNo);
                        $scope.CompanyNames += $scope.CompanyNames == '' ? aData.Party : (',' + aData.Party);
                        $scope.Passwords += $scope.Passwords == '' ? aData.ApprovalPassword : (',' + aData.ApprovalPassword);
                    });
                    var params = JSON.stringify({ expApproval: $scope.PiAmendmentList });
                    $http.post('/ExpApproval/UpdateApproval', params).success(function (data) {
                        if (data > 0) {
                            AppNotificationLogPost('Proforma Invoice Amendment Approved!');
                            EmailContentForAmendmentApprove();
                            EmailSend();
                            alertify.log('Proforma invoice amendment approved successfully!', 'success', '5000');
                            GetAllAmendmentApproveRequest();
                            $('#idOTP').val('');
                            $scope.PiAmendmentList = [];
                            Clear();
                        }
                        else {
                            alertify.log('Network Error, refresh page and try again', 'error', '5000');
                        }
                    }).error(function (msg) {
                        alertify.log('Network Error, refresh page and try again', 'error', '5000');
                    });
                }
            })
        }

        $scope.ResetPiNewForm = function()
        {
            GetAllNewPIApprove();
        }

        $scope.ResetPiAmendForm = function () {
            GetAllAmendmentApproveRequest();
            $scope.DisPiAmendmentSaveBtn = false;
            $scope.OTP = "";

        }

    });
