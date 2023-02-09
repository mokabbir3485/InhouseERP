app.controller("InventoryApprovalsController", function ($rootScope,$scope, $cookieStore, $window, $http, $filter, $window) {



    Clear();

    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Inventory Approvals').ScreenId;
        //    GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Inventory Approvals').ScreenId;
        //        GetUsersPermissionDetails();
        //    }, 500);
        //}

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Inventory Approvals').ScreenId;
        GetUsersPermissionDetails();

        $('.IwoToltipChange').tooltip('enable')
       // $scope.ScreenId = parseInt(sessionStorage.getItem("InventoryApprovalsScreenId"));
        $scope.SelectedFileForUpload = [];
        $scope.EmployeeList = [];
        $scope.GetModuleExAdminSecurityList = [];
        $scope.iwoDetailList = [];
        $scope.CoreList = [
            { Id: 12.5, CoreName: "12.5" },
            { Id: 25, CoreName: "25" },
            { Id: 40, CoreName: "40" },
            { Id: 76, CoreName: "76" },
        ];
        $scope.RollDirectionList = [
            { Id: "Face In", RollName: "FI" },
            { Id: "Face Out", RollName: "FO" },
            { Id: "Clock Wise", RollName: "CW" },
            { Id: "Anti Clock Wise", RollName: "ACW" },
        ];
        $scope.interWODate = "";
        $scope.VarietyList = [];
        $scope.AllCombinationlist = [];
        $scope.AllRawMaterialAndCombination = [];
        $scope.inv_InternalOrderDetailList = [];
        $scope.Approval = {};
        GetModuleExAdminSecurity();

        // hideAll();
        $scope.Approval.ApprovalDate = $filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy');


        $scope.exp_ApprovalDetailList = {};
        // GetIWOAmendment();

        $scope.InternalWorkOrderApprovalTypeList = [];
        $scope.InternalWorkOrderApprovalTypeList1 = [];
        $scope.AmendmentRequestApproveList = [];
        GetIWONewAmendment();

        $scope.PurchaseOrderlist = [];

        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];
        $scope.EmailSendNotification = {};
        $scope.EmployeeNameList = [];

        $scope.ngChangeEmployeeName = null;
        $scope.ddlApprovedBy = null;
       // GetUsersPermissionDetails();

        $scope.AmendmentRequestList = [];
        $scope.AppNotificationLogListData = [];

    }

    //function ReportNotificationDetail_Get() {


    //    $http({
    //        url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'IWOA',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (notification) {
    //        $scope.ReportNotificationDetailList = notification;


    //        console.log('$scope.ReportNotificationDetailList', $scope.ReportNotificationDetailList);
    //    });

    //}



    function ReportNotificationDetail_Get() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'IWOA',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }


   
    function AppNotificationLogPost(SalesOrderList, NotificaitonTitle) {

        angular.forEach(SalesOrderList, function (aSO) {
            angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
                var obj = {}
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

                obj.NotificaitonTitle = NotificaitonTitle;
                if (aNotify.DepartmentId == 7) {
                    if (aNotify.SectionId == aSO.SectionId) {
                        obj.NotificationDetail = ' Internal WorkOrder : ' + aSO.DocNo + ' Company Name : ' + aSO.Party + ' Approve By : ' + aSO.PreparedByName;
                        $scope.AppNotificationLogListData.push(obj);
                    }
                } else { 
                    obj.NotificationDetail = ' Internal WorkOrder : ' + aSO.DocNo + ' Company Name : ' + aSO.Party + ' Approve By : ' + aSO.PreparedByName;
                    $scope.AppNotificationLogListData.push(obj);
                }

            })

        })

       
        if ($scope.AppNotificationLogListData.length >0) {
            var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogListData });
            $scope.AppNotificationLogList = [];
            $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) {
            });
        }
    
    }


    ///Loading Spaner Js Method=====>>

   
    ///Ammentment Req======>>>



    function GetModuleExAdminSecurity() {
        $http({
            url: '/InventoryApprovals/GetModuleExAdminSecurity',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.GetModuleExAdminSecurityList = Enumerable.From(data).Where('$.ModuleName!="Common"').ToArray();;
            if (data.length == 1) {
                $scope.Approval.ddlApprovalType.ScreenId = data[0].ScreenId;
                $scope.ApprovalChange();
            }
        });
    }


    $scope.ApprovalChange = function () {
        $scope.dataList = [];
        $scope.iwoDetailList = [];
        $scope.colmnss = null;
        if ($scope.Approval.ddlApprovalType != undefined && $scope.Approval.ddlApprovalType != null && $scope.Approval.ddlApprovalType != "") {
            $http({
                url: '/AdvancedSearch/GetSearchResultForApproval',
                method: 'GET',
                params: { screenId: $scope.Approval.ddlApprovalType.ScreenId, fromScreenId: 0 },
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                console.log('GetSearchResultForApproval', data);
                if (data == '') {
                    $scope.NotFound = true;
                }
                else {
                    $scope.NotFound = false;
                    $scope.dataList = data;
                    $scope.cols = Object.keys($scope.dataList[0]);
                }
                console.log('load for dataList', $scope.dataList);
            })
        }
    }


    function GetIWOAmendment() {

        $http({
            url: '/ExpApproval/GetIwoApprovalType?approvalType=IWOAmendment' + '&DepartmentName=' + $scope.LoginUser.DepartmentName + '&SectionId=' + $scope.LoginUser.SectionId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.InternalWorkOrderApprovalTypeList = data;
            console.log($scope.InternalWorkOrderApprovalTypeList);
            
        });
    }


    function GetIWONewAmendment() {

        $http({
            /*url: '/ExpApproval/GetIwoApprovalType?approvalType=IWONew',*/
            url: '/ExpApproval/GetIwoApprovalType?approvalType=IWONew' + '&DepartmentName=' + $scope.LoginUser.DepartmentName + '&SectionId=' + $scope.LoginUser.SectionId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data, function (adata) {
                if (adata.IsApproved == false) {
                    $scope.InternalWorkOrderApprovalTypeList1 = data;
                    console.log('IWO New',$scope.InternalWorkOrderApprovalTypeList1);
                }
            })

            GetIWOAmendment();
            
        });
    }
    $scope._inv_InternalWorkOrder = [];
    $scope.SelectAmendmentRequestList = function (row, select) {

        $('.IwoToltipChange').tooltip('enable')
        // $('.IwoToltipChange').tooltip({ boundary: 'window' })

        $scope.ddlApprovedBy = { EmployeeId: $scope.LoginUser.EmployeeId };

        var array = [];
        row.Ischeck = select;
        row.IsApproved = true;
        row.ApprovedBy =$scope.LoginUser.UserId;
        
        if (row.Ischeck) {
            var IwoList = {};
            row.ApprovalId = row.ApprovalId;
            array.push(row);
            $scope.btnAmendmentReqDis = true;
            IwoList.ApprovedBy = $scope.LoginUser.UserId;
            IwoList.IsApproved = row.IsApproved;
            IwoList.InternalWorkOrderId = row.InternalWorkOrderId;
            $scope._inv_InternalWorkOrder.push(IwoList);
            $scope.AmendmentRequestList.push(row);
        } else {
            var index = $scope._inv_InternalWorkOrder.indexOf(row);
            $scope._inv_InternalWorkOrder.splice(index, 1);

            var index1 = $scope.AmendmentRequestList.indexOf(row);
            $scope.AmendmentRequestList.push(index1, 1);
        }

       
  
       
        
    }

    function SaveAmendmentRequest() {
        $scope.aPasswordForSendEmail = $scope.aPassword;
        $http({
            url: '/ExpApproval/CheckDuplicate?approvalType=IWOAmendment&approvalPassword=' + $scope.aPassword,
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
                    AppNotificationLogPost($scope.AmendmentRequestList, "IWO Amendment Request Approve");
                    if (data > 0) {
                       // AmendmentRequestEmailSend();
                        alertify.log('Internal Work Order Amendment Successfully!', 'success', '5000');
                        Clear();
                        $window.scrollTo(0, 0);
                        //    $scope.salesOrderApproveForm.$setPristine();
                        //$scope.salesOrderApproveForm.$setUntouched();
                        $scope.aPassword = '';
                    }
                    else if (data == 0) {
                        alertify.log('Network Errors!', 'error', '5000');
                    }
                }).error(function (data) {
                    alertify.log('Network Errors !', 'error', '5000');
                });

                $scope.aPassword = "";
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
            '<p> Dear User,<br/> Amendment Approved For Internal Work Order <br/> ' +
            'Amendment Password: <strong > ' + $scope.aPasswordForSendEmail + '</strong><br/>' +
            'Internal Work Order No: <strong > ' + $scope.AmendmentRequestList[0].DocNo + '</strong><br/>' +
            'Company Name: <strong>' + $scope.AmendmentRequestList[0].Party + '</strong><br/>' +
            'Amendment Approved by: <strong>' + $scope.LoginUser.FullName + '</strong>' + '<br/>' +
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

    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.RemovePermission = false;
        $scope.ListView = false;
        $scope.ApprovedPermission = false;
        $scope.AmendmentApprovedPermission = false;
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
                    $scope.ListView = aPermissionDetails.CanExecute;
                } else if (aPermissionDetails.FunctionName == 'Approved') {
                    $scope.ApprovedPermission = aPermissionDetails.CanExecute;
                } else if (aPermissionDetails.FunctionName == 'Amendment Approved') {
                    $scope.AmendmentApprovedPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }


    function Approve() {

        $.ajax({
            url: "/InventoryApprovals/SaveIWOApprove",
            contentType: "application/json;charset=utf-8",
            type: "POST",
            data: JSON.stringify({ _inv_InternalWorkOrder: $scope._inv_InternalWorkOrder, expApproval: $scope.AmendmentRequestList }),
            success: function (data) {
                AppNotificationLogPost($scope.AmendmentRequestList,"Internal Work Order Approved")
                $scope.AmendmentRequestList = [];
                GetIWONewAmendment();
                Clear();
                //var param = JSON.stringify({ expApproval: $scope.AmendmentRequestList });
                //$http.post('/ExpApproval/UpdateApproval', param).success(function (data) {
                //    if (data > 0) {
                //        $scope.aPassword = '';
                //    }
                //}).error(function (data) {
                //    GetIWONewAmendment();
                //    alertify.log('Network Errors !', 'error', '5000');
                //});
                $window.scrollTo(0, 0);
              
             
               // EmailSend();
                if (data > 0) {
                    $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");
                    $cookieStore.put("IWOID", data);
                    alertify.log('Approval Completed Successfully!', 'success', '5000');
                  
                }
             

            }, error: function (msg) {

                alertify.log('Server Save Errors!', 'error', '10000');
            }
        });
    }

    $scope.Approve = function () {
        if ($scope.CreatePermission) {
            alertify.confirm("Are you sure to submit?", function (e) {
                if (e) {
                    Approve();
                    GetIWONewAmendment();
                }
            })
        }
        else if (!$scope.CreatePermission) {
            alertify.log('You do not have permission to submit!', 'error', '5000');
        }

    }





    function EmailSend() {

        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })

        $scope.EmailSendNotification.EmailSubject = "Internal Work Order Approved";
        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        //  $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var currentDate = new Date();
        var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

        var res1 = $scope.AmendmentRequestList[0].DocDate.substring(0, 5);
        if (res1 == "/Date") {
            var parsedDate1 = new Date(parseInt($scope.AmendmentRequestList[0].DocDate.substr(6)));
            var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
            $scope.AmendmentRequestList[0].DocDate = date1;
        }

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> A new Internal WorkOrder  has been Approved. <br/> ' +
            'Internal Work Order No: <strong > ' + $scope.AmendmentRequestList[0].DocNo + '</strong><br/>' +
            'Internal Work Order Date: <strong>' + ($filter('date')($scope.AmendmentRequestList[0].DocDate, 'dd/MM/yyyy')).toString() + '</strong><br/>' +
            'Company Name: <strong>' + $scope.AmendmentRequestList[0].Party + '</strong><br/>' +
            'Prepared by: <strong>' + $scope.LoginUser.FullName + '</strong>' + '<br/>' +
            'Approved Date: ' + CreatedDate + '<br/><br />' +

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
        $scope.inv_InternalOrderDetailList = [];
        $scope.PurchaseOrderlist = [];
        //$scope.selectedAmendment = false;
        $scope.Approval = {};
        $scope.ddlApprovedBy = null;

        $("#radioCheckedBtn").val("");
        $("input:radio").attr("checked", false);
        // location.reload();
    }

    $scope.OpenReport = function (iwoId) {
        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("IWOID", iwoId);
        // sessionStorage.setItem("IWOID", JSON.stringify(iwoId));
        event.stopPropagation();

    };

});