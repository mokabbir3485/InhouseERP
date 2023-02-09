app.controller("InternalWorkOrderEntryController", function ($rootScope,$scope, $cookieStore, $http, $window, $filter, FileService) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    console.log('$scope.LoginUser', $scope.LoginUser);
    Clear();

    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Internal Work Order').ScreenId;
        //    GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Internal Work Order').ScreenId;
        //        GetUsersPermissionDetails();
        //    }, 500);
        //}

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Internal Work Order').ScreenId;
        GetUsersPermissionDetails();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedIwo($scope.currentPage);
        $scope.iwoListPaged = [];
        $scope.salesOrdDate = "";
        $scope.isValidForSave = true;
        $scope.IsFinishedGoods = true;
        $scope.UserId = $scope.LoginUser.UserId;
        //$scope.ScreenId = parseInt(sessionStorage.getItem("InternalWorkOrderScreenId"));
        $scope.found = true;
        $scope.iwolist = [];
        $scope.iwoListForGrid = [];
        $scope.ddlInternalWorkOrder = null;
        $scope.inv_InternalOrderDetail = {};
        //$scope.inv_InternalOrderDetail.ddlItemIdList = [];

        $scope.IwoDdlFilterList = [];

        $scope.VarietyList = [];
        $scope.inv_InternalOrderDetailList = [];
        $scope.DepartmentListGetAll = [];
        $scope.iwo = {};
        $scope.FromDepartmentList = [];
        $scope.ToDepartmentList = [];

        $scope.sockQtyWithRequestQty = [];
        $scope.inv_InternalOrderDetailListItem = [];

        $scope.iwo.InternalWorkOrderId = 0;
        $scope.internalWorkOrder = {};
        $scope.internalWorkOrder.SalesOrderId = 0;
        $scope.internalWorkOrder.InternalWorkOrderNo = "";

        $scope.iwo.IsActive = true;
        $scope.btnSave = "Save";
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        $scope.btnShowDelete = false;
        GetByCombinationand();
        GetAllVariety();
        GetAllEmployee();
        departmentGetByBranchAndDeptTypeId();
        GetTopSalesOrderDetailData();
        GetAllActiveCompany();
       // GetUsersPermissionDetails();
        //ScreenLock();
        GetByCombinationLike();
        GetAllStock();
        GetAllDepartment();
        $scope.Storelist = [];
        // GetrawMatrialStockCheck();

        $scope.QtyPerRollList = [{ Qty: '500' }, { Qty: '1000' }, { Qty: '2000' }, { Qty: '2500' }, { Qty: '5000' }, { Qty: '10000' }, { Qty: '3125' }, { Qty: '2400' }];
        $scope.test = false;


        //File Upload Method

        ClearFileUpload();

        $scope.ShowImageName = false;



        $scope.ddlSalesOrder = null;
        GetTopSalesOrderDetailDataSoNo();
        $scope.SalesOrderNoList = [];
        $scope.ddlAmendmentReason = null;

        GetAmendmentReason();

        $scope.PlaceHolder = "Select Raw Matrial...";
        $scope.PurchaseOrderlist = [];
        $scope.isUpdate = false;
        $scope.EmailSendNotification = {};

        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];
        $scope.EmailSendNotification = {};
        $scope.ddlPreparedBy = { EmployeeId: $scope.LoginUser.EmployeeId };
        $scope.isDisableDDl = false;
        $scope.ddlPreparedBy.EmployeeId = $scope.LoginUser.EmployeeId;

        $scope.ItemResetForSo = false;
        $scope.DeleteForIWOIdsList = [];
        $scope.DetailIsVoidFlag = [];
    }
    $("#txtInternalWorkOrderDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.DateChangeForInternalWorkOrderDate = function () {
        $("#txtInternalWorkOrderDate").focus();

    }

    $("#txtToDateForIWO").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.ToDateChangeForIWO = function () {
        $("#txtToDateForIWO").focus();

    }
   
    $("#txtFromDateForIWO").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.FromDateChangeForIWO = function () {
        $("#txtFromDateForIWO").focus();

    }
   
    //$("#txtDeliveryDateForIWO").datepicker({
    //    dateFormat: "M dd, yy",
    //    changeMonth: true,
    //    changeYear: true,
    //});

    //$scope.DeliveryDateChangeForIWO = function () {
    //    $("#txtDeliveryDateForIWO").focus();

    //}
   

    




    


    //$scope.Download = function (AttachmentName) {
    //   // console.log(AttachmentName);
    //    $http({
    //        method: 'POST',
    //        url: '/SalesOrder/GenerateFileData',
    //        params: { fileName: AttachmentName }
    //    }).success(function (data) {
    //        console.log("Dowanload PDF",data);
    //        window.location = '/SalesOrder/Download?fileName=' + data.FileName;
    //    });
    //};
    ///Loading Spaner Js Method=====>>

   


   

    $scope.OpenSalesOrderReport = function () {
        $window.open("#/SalesOrderReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SalesOrderId", JSON.stringify(SOId));
        $cookieStore.put("SalesOrderId", $scope.ddlSalesOrder.SalesOrderId);
        event.stopPropagation();
    }
    //Multiselect Dropdown


    $scope.supplierPlaceholder = {
        buttonDefaultText: "Select Supplier",
        searchPlaceholder: "Search Supplier"
    };
    $scope.rawDdlList = {};
    //$scope.rawDdlList = {};

    $scope.ddlItemIdList = [];
    $scope.supplierList = [];
    $scope.supplierSetting = {
        checkBoxes: true,
        scrollableHeight: '200px',
        scrollable: true,
        dynamicTitle: true,
        selectionOf: true,
        //showUncheckAll: false,
        // showCheckAll: false,
        enableSearch: true,
        buttonDefaultText: false,
        singleSelection: true,
        selectionLimit: 1,
        closeOnSelect: true,
        closeOnDeselect: true,
        smartButtonMaxItems: 1,
    }


    $scope.ddlItem = null;
    $scope.rawDdlList = {};

    $scope.getByRawMatrialId = function (ddlItemIdList) {
        if (ddlItemIdList.id) {
            angular.forEach($scope.inv_InternalOrderDetailListItem, function (aData) {

                if (aData.ItemId == ddlItemIdList.id) {
                    aData.rawDdlList.push({ id: aData.ItemId });

                } else {
                    aData.rawDdlList = {};
                }
            })
        }

        console.log(ddlItemIdList);
        console.log($scope.inv_InternalOrderDetailListItem);

    }

    //$('body').trigger('on','#iwCompany','select2:select', function (e) {

    //});

    //  $('body').trigger('#iwCompany','change.select2');

    function ClearFileUpload() {

        $scope.Message = "";
        $scope.FileInvalidMessage = "";
        $scope.SelectedFileForUpload = [];
        $scope.FileDescription = "";
        $scope.IsFormSubmitted = false;
        $scope.IsFileValid = false;
        $scope.IsFormValid = false;

    }


    $scope.GetAmendment = function (iwo) {

        $scope.AmmendmentRequestEmailSendObj = iwo;
       

        $scope.PaymentProcessForAmendment = {
            SalesOrderId: iwo.SalesOrderId,
            InternalWorkOrderNo: iwo.InternalWorkOrderNo,
            CompanyName: iwo.CompanyNameOnBill,
        }
        $scope.DocumentId = iwo.InternalWorkOrderId;

    
        //$scope.exp_AmendmentRequest.DocumentedId = iwo.InternalWorkOrderId;
    }
    function GetAmendmentReason() {
        $http({
            url: '/ExpAmendmentReason/GetAllAmendmentReason',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AmendmentReasonList = data;
        });
    }


    $scope.SaveAmendmentRequest = function () {
        $scope.exp_AmendmentRequest.ApprovalType = "IWOAmendment";
        $scope.exp_AmendmentRequest.DocumentId = $scope.DocumentId;

        var parms = JSON.stringify({ expApproval: $scope.exp_AmendmentRequest });
        $http.post('/ExpApproval/Save', parms).success(function (data) {
            AppNotificationLogPost("IWO Ammendment Request");
            if (data > 0) {
                AmendmentRequestEmailSend();
                alertify.log('Amendment Request Saved Successfully!', 'success', '5000');
                Clear();

            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }


    function AmendmentRequestEmailSend() {

        $scope.EmailSendNotification.EmailSubject = "Request For Amendment";
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
            '<p> Dear User,<br/> Amendment Request For Sales Order <br/> ' +
            'Reason For Amendment : <strong > ' + $scope.exp_AmendmentRequest.RequestRemarks + '</strong><br/>' +
            'Internal Work Order No: <strong > ' + $scope.AmmendmentRequestEmailSendObj.InternalWorkOrderNo + '</strong><br/>' +
            'Internal Work Order Date: <strong>' + $scope.AmmendmentRequestEmailSendObj.InternalWorkOrderDate + '</strong><br/>' +
            'Company Name: <strong>' + $scope.AmmendmentRequestEmailSendObj.CompanyNameOnBill + '</strong><br/>' +
            'Prepared by: <strong>' + $scope.LoginUser.FullName + '</strong>' + '<br/>' +
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


    $scope.stopPropagation = function () {
        $("#AmendmentModal").modal('show');
        event.stopPropagation();

    }


    $scope.QtyPerRollTextChange = function (qty) {
        if (qty != undefined && qty != null && qty != "") {
            var SingleSearchItem = qty.split(" ");
            var SearchCriteria = "";
            myHilitor = new Hilitor2("SearchResultsQPR");
            myHilitor.remove();
            for (var i = 0; i < SingleSearchItem.length; i++) {
                myHilitor.setMatchType("open");
                if (SearchCriteria == "") {
                    SearchCriteria = "~($.Qty).toUpperCase().indexOf('" + SingleSearchItem[i] + "'.toUpperCase())";
                } else {
                    SearchCriteria += " && ~($.Qty).toUpperCase().indexOf('" + SingleSearchItem[i] + "'.toUpperCase())";
                }

                myHilitor.apply(SingleSearchItem[i]);
            }

            $scope.QtyPerRollSearch = Enumerable.From($scope.QtyPerRollList).Where(SearchCriteria).Take(10).ToArray();
            $scope.VisibilityOfSuggession = true;
        }
        else {
            $scope.QtyPerRollSearch = Enumerable.From($scope.QtyPerRollList).Take(10).ToArray();
            $scope.VisibilityOfSuggession = false;
        }
    }

    $scope.QtyPerRollSuggestionClick = function () {
        $scope.VisibilityOfSuggession = false;
        $scope.QtyPerRollSearch = [];
    }

    function departmentGetByBranchAndDeptTypeId() {

        $http({

            /*  url: '/Department/DepartmentGetByBranchAndDeptTypeId?departmentTypeIds=' + '1,3,4,5,7' + '&branchId=' + null,*/
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
        
            angular.forEach(data, function (aData) {
                aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                $scope.Storelist.push(aData);
            })
           // console.log('Load for Storelist', data);
        });
    }

    function GetByCombinationLike() {
        //  var searchCriteria = "C.CategoryName='Raw Materials'";
        $http({
            // url: '/Item/GetItemForIwoDynamic?searchCriteria=' + searchCriteria,
            url: '/Item/GetByCombinationLike',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //console.log("Before Parse ",data);

            $scope.AllRawCombination = JSON.parse(data);
            //console.log("After Parse", $scope.AllRawCombination);

            $scope.AllRawMaterialAndCombination = Enumerable.From($scope.AllRawCombination).Where(function (x) {
                return x.CategoryName == "Raw Materials";
            }).ToArray();
            console.log('AllRawMaterialAndCombination', $scope.AllRawMaterialAndCombination);
        })
    }

    function GetByCombinationand() {
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllCombinationlist = JSON.parse(data);
        })
    }

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            // $scope.ddlPreparedBy = { EmployeeId: $scope.LoginUser.EmployeeId };
        });
    }
    function GetAllActiveCompany() {

        if ($scope.LoginUser.DepartmentName != null) {
            if ($scope.LoginUser.DepartmentName.match("Sales")) {
                var criteria = "C.IsActive=1 and E.SectionId=" + $scope.LoginUser.SectionId + " OR C.CompanyTypeId=16";
            } else {
                var criteria = "C.IsActive=1";
            }
        }
       


       // var criteria = "C.IsActive=1";
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyName",

            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.IwoDdlFilterList = data;
            
            // console.log("$scope.IwoDdlFilterList ",$scope.IwoDdlFilterList );

        })

    }


    function GetTopSalesOrderDetailDataSoNo() {
        $scope.SalesOrderNoList = [];
        //var criteria = "A.IsApproved = 1 AND SalesOrderId NOT IN (SELECT SalesOrderId FROM inv_InternalWorkOrder)";
        //var criteria = "A.IsApproved = 1 AND (SELECT COUNT(ItemAddAttId) FROM pos_SalesOrderDetail WHERE SalesOrderId = SO.SalesOrderId) > (SELECT COUNT(FinishedItemId) FROM inv_InternalWorkOrderDetail IWOD INNER JOIN inv_InternalWorkOrder IWO ON IWOD.InternalWorkOrderId = IWO.InternalWorkOrderId WHERE IWO.SalesOrderId = SO.SalesOrderId)";
        //var criteria = "A.IsApproved = 1";
        var criteria = "A.IsApproved = 1";
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
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aSd.SalesOrderDate = date1;
                    }
                })
            }
            $scope.SalesOrderNoList = data;
            

        });
    }


    function GetTopSalesOrderDetailData() {
        $scope.iwoListForGrid = [];
        //var criteria = "A.IsApproved = 1 AND SalesOrderId NOT IN (SELECT SalesOrderId FROM inv_InternalWorkOrder)";
        var criteria = "A.IsApproved = 1 AND (SELECT COUNT(ItemAddAttId) FROM pos_SalesOrderDetail WHERE SalesOrderId = SO.SalesOrderId) > (SELECT COUNT(FinishedItemId) FROM inv_InternalWorkOrderDetail IWOD INNER JOIN inv_InternalWorkOrder IWO ON IWOD.InternalWorkOrderId = IWO.InternalWorkOrderId WHERE IWO.SalesOrderId = SO.SalesOrderId)";
        //var criteria = "A.IsApproved = 1";
        //var criteria = "A.IsApproved = 1";
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
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aSd.SalesOrderDate = date1;
                    }
                })
            }

            $scope.iwoListForGrid = data;
            
            ////$scope.IwoDdlFilterList = Enumerable.From(data).Distinct(function (x) {
            //    return x.CompanyId
            //}).ToArray();

            //  console.log('iwo Distinct Data', $scope.IwoDdlFilterList);
            // console.log('iwo load for Grid ', $scope.iwoListForGrid);




        });
    }

    $scope.CompanyLoadForGridIwo = function (companyId) {


        $scope.ddlPreparedBy = { EmployeeId: $scope.LoginUser.EmployeeId };
        $('#ddlPreparedBy').select2('destroy');
        $('#ddlPreparedBy').val($scope.LoginUser.EmployeeId).select2();

        $scope.internalWorkOrder = {};

        $scope.inv_InternalOrderDetailListItem = [];
        $scope.iwolist = [];
        $scope.btnSave = "Save";

        $scope.ddlPreparedBy = null;
        $scope.ddlStore = null;
        $scope.CompanyIdList = companyId;

        angular.forEach($scope.iwoListForGrid, function (aData) {
            if ($scope.CompanyIdList == aData.CompanyId) {

                //angular.forEach(aData, function (aCom) {
                var company = {};
                company.CompanyId = aData.CompanyId;
                company.SalesOrderId = aData.SalesOrderId;
                company.SalesOrderNo = aData.SalesOrderNo;
                company.SalesOrderDate = aData.SalesOrderDate;
                company.CompanyName = aData.SalesOrderNo;
                $scope.iwolist.push(company);
                // })
                document.getElementById("IwFilterSalesOrder").disabled = false;
            }

        });

        $scope.btnSave = "Save";
     

        //$http({
        //    url: "/Company/GetCompanyAddresses?companyId=" + companyId,
        //    method: 'GET',
        //    headers: { 'Content-Type': 'application/json' }
        //}).success(function (data) {
        //    $scope.internalWorkOrder.PlaceOfDelivery = data[0].Address;
        //});


    }

    function GetAllVariety() {
        $http({
            url: "/Item/GetLimitedProperty",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.VarietyList = data;
            
        });
    }

    function GetConfirmationMessageForAdmin() {
        $http({
            url: '/InternalWorkOrder/GetConfirmationMessageForAdmin',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ConfirmationMessageForAdmin = (data === 'true');
        });
    }


    ////Duplicacy check start

    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.RemovePermission = false;
        $scope.ListView = false;
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
                }
            });

            //if ($scope.CreatePermission == false) {
            //    alertify.log('Don`t have Create Permission!', 'error', '10000');
            //}
            //else if ($scope.ListView == false) {
            //    alertify.log('Don`t have List View Permission!', 'error', '10000');
            //}
        });
    }

    function ScreenLock() {
        $http({
            url: '/Permission/CheckScreenLock',
            method: 'GET',
            params: { userId: $scope.UserId, screenId: $scope.ScreenId },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data != '') {
                $scope.ScreenLockInfo = data;
                alertify.alert('This page is locked by ' + $scope.ScreenLockInfo[0].Username);
                window.location = '/Home/Index#/Home';
            }
            else {
                $scope.s_ScreenLock = new Object();
                $scope.s_ScreenLock.UserId = $scope.UserId;
                $scope.s_ScreenLock.ScreenId = $scope.ScreenId;
                var parms = JSON.stringify({ screenLock: $scope.s_ScreenLock });
                $http.post('/Permission/CreateScreenLock', parms).success(function (data) {
                });
            }
        });
    }


    $scope.FileUpload = function () {
        FileService.UploadFile($scope.SelectedFileForUpload).then(function (d) {
            alert("upload successfull!!!");
            console.log(d);

        }, function (e) {
            alert(e);
        });
    }





    function SaveIWO(iwoDetialList) {
      
        $scope.IWOItemList = iwoDetialList;
        //  $scope.internalWorkOrder.InternalWorkOrderDate = f;

        //var a = $scope.internalWorkOrder.InternalWorkOrderDate;
        //var from = a.split("/");
        //var f = new Date(from[2], from[1] - 1, from[0]);

        //$scope.internalWorkOrder.InternalWorkOrderDate = f;

        $scope.internalWorkOrder.DepartmentId = $scope.ddlStore.DepartmentId;
        if ($scope.ddlPreparedBy == null || $scope.ddlPreparedBy == undefined) {
            $scope.internalWorkOrder.PreparedById = $scope.LoginUser.EmployeeId;
        } else {
            $scope.internalWorkOrder.PreparedById = $scope.ddlPreparedBy.EmployeeId;
        }
       
        $scope.internalWorkOrder.CreatorId = $scope.LoginUser.UserId;
        $scope.internalWorkOrder.UpdatorId = $scope.LoginUser.UserId;


        for (var i = 0; i < $scope.SelectedFileForUpload.length; i++) {

            $scope.SelectedFileForUpload[i].SODId = $scope.SelectedFileForUpload[i].ArtFileName;
           // $scope.SelectedFileForUpload[i].SODId = $scope.IWOItemList.find(x => x.ItemId == $scope.SelectedFileForUpload[i].ItemId).SalesOrderDetailId;
            $scope.SelectedFileForUpload[i].ItemCode = $scope.IWOItemList.find(x => x.ItemId == $scope.SelectedFileForUpload[i].ItemId).Barcode;
            $scope.SelectedFileForUpload[i].ArtFileName = $scope.SelectedFileForUpload[i].ArtFileName;

            $scope.ArtWorkFileName = $scope.SelectedFileForUpload[i].ArtFileName;
            FileService.UploadFile($scope.SelectedFileForUpload[i]).then(function (d) {
                //alert("upload successfull!!!");
                // console.log(d);

            }, function (e) {
                alert(e);
            });

        }




        var inv_InternalWorkOrderDetailList = [];
      
        for (var i = 0; i < iwoDetialList.length; i++) {
            var imgName = "";

            if ($scope.btnSave != "Save") {
                iwoDetialList[i].FinishedItemAddAttId = iwoDetialList[i].FinishedItemId;
            }
            //var dDate = iwoDetialList[i].DeliveryDate.split("/");
            //var fData = new Date(dDate[2], dDate[1] - 1, dDate[0]);
            if (iwoDetialList[i].CategoryName == "Finished Goods" && iwoDetialList[i].SubCategoryName != "Barcode Ribbon (R)") {

              
                var artWorkList = [];
                var artWorkConcat = '';
                var isArtWork = false;
                var SalesOrderId = 0;
                angular.forEach($scope.SelectedFileForUpload, function (aData) {
                   // var item = {};
                    // item.ArtFileName = aData.ArtFileName;
                    if (iwoDetialList[i].SalesOrderDetailId == aData.SalesOrderDetailId) {
                        artWorkList.push(aData.ArtFileName);
                        artWorkConcat = artWorkList.join(',');
                        imgName = artWorkConcat;
                        SalesOrderId = aData.SalesOrderDetailId;
                    }
                    
                });

                if (SalesOrderId != iwoDetialList[i].SalesOrderDetailId) {
                         
                         imgName = "";
               
                    var obj = {};
                    if (iwoDetialList[i].ArtWork == undefined) {
                        imgName = "";
                    } else {
                       // obj.ArtWork = iwoDetialList[i].ArtWork;
                       // iwoDetialList[i].ArtWork.toString()
                        imgName = iwoDetialList[i].ArtWork.toString()
                    }
                     
                     if (iwoDetialList[i].ArtWork == undefined) {
                        
                    }
                    //if (iwoDetialList[i].ArtWork != "") {
                    //    imgName = iwoDetialList[i].ArtWork
                    //}
                }
              


                //if (iwoDetialList[i].ArtWork=="") {
                //    imgName = '';
                //}

                //if (typeof (iwoDetialList[i].ArtWork) == "string") {
                //    imgName = iwoDetialList[i].ArtWork;
                //}
                //if (iwoDetialList[i].ArtWork == "") {
                //    imgName = '';
                //} else if (iwoDetialList[i].ArtWork.FileList != "FileList") {
                //    imgName = iwoDetialList[i].ArtWork;
                //}

                //else if (typeof iwoDetialList[i].ArtWork === 'string' || iwoDetialList[i].ArtWork instanceof String) {
                //    imgName = iwoDetialList[i].ArtWork;
                //}
                
                //if (iwoDetialList[i].ArtWork !== "") {

                //    if (typeof (iwoDetialList[i].ArtWork) != "string" || iwoDetialList[i].ArtWork != "") {
                //        var artWorkList = [];
                //        var artWorkConcat = '';
                //        var isArtWork = false;
                //        angular.forEach(iwoDetialList[i].ArtWork, function (adata) {


                //            if (adata.name != null) {
                //                //imgName = 'Art' + '_' + adata.SODId + '_' + adata.name;
                //                artWorkList.push(adata);
                //                isArtWork = true;
                //            }

                //        });

                //        if (isArtWork) {
                //            artWorkConcat = artWorkList.join(',');
                //            imgName = artWorkConcat;
                //        } else {
                //            //mgName = iwoDetialList[i].ArtWork;

                          
                //            if (iwoDetialList[i].ArtWork == null || iwoDetialList[i].ArtWork == undefined || iwoDetialList[i].ArtWork == '') {
                //                imgName = '';
                //            }
                //            else {
                //                artWorkConcat = iwoDetialList[i].ArtWork.join(',');
                //                imgName = artWorkConcat;
                //            }
                //        }

                //    } else {
                //        imgName = iwoDetialList[i].ArtWork;

                //    }
                //}





                if (angular.isUndefined(iwoDetialList[i].ddlRollDirection)) {
                    iwoDetialList[i].RollDirection = "N/A";
                }

                if (iwoDetialList[i].ddlItem == null) {
                    $scope.hardwareItemId = 0;
                    $scope.ItemSaveCheckId = 0;
                } else {
                    $scope.ItemSaveCheckId = iwoDetialList[i].ddlItem.ItemId;
                    // $scope.hardwareItemId = iwoDetialList[i].FinishedItemId;;
                }


                if (iwoDetialList[i].ArtWork !=="") {

                }
                var iwoOrderDetail = {

                    InternalWorkOrderDetailId: iwoDetialList[i].InternalWorkOrderDetailId,
                    InternalWorkOrderId: iwoDetialList[i].InternalWorkOrderId,
                    FinishedItemId: iwoDetialList[i].FinishedItemAddAttId,
                    //ItemAddAttId: iwoDetialList[i].CombinationList[0].ItemAddAttId,
                    ItemName: iwoDetialList[i].FinishedItemName,

                    ItemDescription: iwoDetialList[i].ItemDescription,
                    ItemDescriptionTwo: iwoDetialList[i].ItemDescriptionTwo,
                    LabelBrandId: iwoDetialList[i].LabelBrandId,
                    LabelBrandName: iwoDetialList[i].LabelBrandName,
                    OrderQty: iwoDetialList[i].OrderQty,
                    OrderUnitId: iwoDetialList[i].OrderUnitId,

                    Core: parseFloat(iwoDetialList[i].ddlCore),
                    QtyPerRoll: iwoDetialList[i].QtyPerRoll,
                    RollDirection: iwoDetialList[i].ddlRollDirection,
                    DeliveryDate: iwoDetialList[i].DeliveryDate,
                    OrderQty: iwoDetialList[i].OrderQty,
                    SalesOrderDetailId: iwoDetialList[i].SalesOrderDetailId,
                   
                    CategoryName: iwoDetialList[i].CategoryName,

                    Ups: iwoDetialList[i].Ups,
                    Radius: iwoDetialList[i].Radius,
                    Color: iwoDetialList[i].Color,

                    DetailRemarks: iwoDetialList[i].DetailRemarks,

                    ArtWork: imgName,
                    ShowImg: true,
                    PaperTypeId: iwoDetialList[i].PaperTypeId
                }

                inv_InternalWorkOrderDetailList.push(iwoOrderDetail);
            } else {


                var iwoOrderDetail = {
                    InternalWorkOrderDetailId: iwoDetialList[i].InternalWorkOrderDetailId,
                    InternalWorkOrderId: iwoDetialList[i].InternalWorkOrderId,
                    FinishedItemId: iwoDetialList[i].FinishedItemAddAttId,
                    ItemName: iwoDetialList[i].FinishedItemName,
                    ItemDescription: iwoDetialList[i].ItemDescription,
                    ItemDescriptionTwo: iwoDetialList[i].ItemDescriptionTwo,
                    LabelBrandId: iwoDetialList[i].LabelBrandId,
                    LabelBrandName: iwoDetialList[i].LabelBrandName,
                    OrderQty: iwoDetialList[i].OrderQty,
                    OrderUnitId: iwoDetialList[i].OrderUnitId,
                    ItemId: 0,
                    Core: 0.00,
                    QtyPerRoll: 0,
                    RollDirection: "N/A",
                    DeliveryDate: iwoDetialList[i].DeliveryDate,
                    OrderQty: iwoDetialList[i].OrderQty,
                    SalesOrderDetailId: iwoDetialList[i].SalesOrderDetailId,


                    CategoryName: iwoDetialList[i].CategoryName,

                    Ups: iwoDetialList[i].Ups,
                    Radius: iwoDetialList[i].Radius,
                    Color: iwoDetialList[i].Color,

                    DetailRemarks: iwoDetialList[i].DetailRemarks,

                    ArtWork: imgName,
                    ShowImg: true,
                    PaperTypeId: iwoDetialList[i].PaperTypeId

                }

                inv_InternalWorkOrderDetailList.push(iwoOrderDetail);

            }


        }
        if (($scope.internalWorkOrder.InternalWorkOrderId == undefined || $scope.internalWorkOrder.InternalWorkOrderId ==0)  && $scope.CreatePermission) {
            InternalWorkOrderSave(inv_InternalWorkOrderDetailList);
        }
        else if (!$scope.CreatePermission) {
            alertify.log('You do not have permission to save!', 'error', '10000');
        }
        else if ($scope.internalWorkOrder.InternalWorkOrderId != 0 && $scope.CreatePermission) {
            InternalWorkOrderSave(inv_InternalWorkOrderDetailList);
        }
        else if (!$scope.RevisePermission) {
            alertify.log('You do not have permission to Update!', 'error', '10000');
        }
       

     



    }


    function ReportNotificationDetail_Get() {


        $http({
            //  url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'IWO',
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'IWO',
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
                       
                        if (NotificaitonTitle == "IWO Ammendment Request") {
                            obj.NotificationDetail = ' Internal WorkOrder No : ' + $scope.AmmendmentRequestEmailSendObj.InternalWorkOrderNo + ' Company Name : ' + $scope.AmmendmentRequestEmailSendObj.CompanyNameBilling + ' Employee Name : ' + $scope.AmmendmentRequestEmailSendObj.PreparedByName;
                            $scope.AppNotificationLogList.push(obj);
                        } else {
                            $scope.ddlInternalWorkOrder.FullName = $scope.LoginUser.FullName;
                            obj.NotificationDetail = ' Internal WorkOrder No : ' + $scope.internalWorkOrder.InternalWorkOrderNo + ' Company Name : ' + $scope.ddlInternalWorkOrder.CompanyName + ' Employee Name : ' + $scope.ddlInternalWorkOrder.FullName;
                            $scope.AppNotificationLogList.push(obj);
                        }
                     
                      
                    }
                } else {
                    $scope.ddlInternalWorkOrder.FullName = $scope.LoginUser.FullName;
                    obj.NotificationDetail = ' Internal WorkOrder No : ' + $scope.internalWorkOrder.InternalWorkOrderNo + ' Company Name : ' + $scope.ddlInternalWorkOrder.CompanyName + ' Employee Name : ' + $scope.ddlInternalWorkOrder.FullName;
                    $scope.AppNotificationLogList.push(obj);
                }

           // })


        })

        if ($scope.AppNotificationLogList.length > 0) {
            var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
            $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) { });
        }
      
    }


    function InternalWorkOrderSave(inv_InternalWorkOrderDetailList) {
     
        $.ajax({
            url: "/InternalWorkOrder/Save",
            contentType: "application/json;charset=utf-8",
            type: "POST",
            data: JSON.stringify({ inv_InternalWorkOrder: $scope.internalWorkOrder, inv_InternalWorkOrderDetailList: inv_InternalWorkOrderDetailList, DeleteForIWOIds: $scope.DeleteForIWOIdsList}),
            success: function (data) {
                // $scope.ddlStore = null;

                var IwoIdsAndNo = data.split(",");
                var iwoIds = IwoIdsAndNo[1];
                var iwoId = Number(iwoIds);
                var IwoNo = IwoIdsAndNo[0];

                if ( $scope.internalWorkOrder.InternalWorkOrderId != undefined) {
                    AppNotificationLogPost("Internal Workorder Update");
                } else {
                    AppNotificationLogPost("Internal Workorder Create");
                }
               


               // EmailSend(IwoNo, $scope.internalWorkOrder);
                if (data != "") {

                    if ($scope.btnSave != "Update") {




                        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");

                        $cookieStore.put("IWOID", iwoIds);
                        // $("#ErrorMsgShow").css({ "background-color": "Red", "font-size": "200%" });

                        alertify.log('IWO NO' + iwoIds + status + ' Successfully!', 'success', '5000');
                        $scope.isDisableDDl = false;
                        $('#iwCompany').select2('destroy');
                        $('#iwCompany').val('').select2({
                            placeholder: "Select Company"
                        });
                        $('#ddlPreparedBy').select2('destroy');
                        $('#ddlPreparedBy').val('').select2({
                            placeholder: "Receive By"
                        });
                        //$('#ddlStoreSelect2').select2('destroy');
                        //$('#ddlStoreSelect2').val('').select2({
                        //    placeholder: "Select Department For IWO"
                        //});

                    }
                    if ($scope.btnSave == "Update") {



                        $scope.isDisableDDl = false;

                        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");

                        $cookieStore.put("IWOID", iwoIds);

                        //alertify.log(`<p style="color: #000000;">IWO NO : ${IwoNo}</p>` + status + ' Successfully!', 'success', '5000');
                        alertify.log('IWO NO' + iwoIds + status + ' Successfully!', 'success', '5000');
                        $scope.isDisableDDl = false;
                        $('#iwCompany').select2('destroy');
                        $('#iwCompany').val('').select2({
                            placeholder: "Select Company"
                        });
                        $('#ddlPreparedBy').select2('destroy');
                        $('#ddlPreparedBy').val('').select2({
                            placeholder: "Receive By"
                        });
                        //$('#ddlStoreSelect2').select2('destroy');
                        //$('#ddlStoreSelect2').val('').select2({
                        //    placeholder: "Select Department For IWO"
                        //});


                    }

                    Clear();
                    GetPagedIwo(1);
                    $scope.internalWorkOrderForm.$setPristine();
                    $scope.internalWorkOrderForm.$setUntouched();

                }

            }, error: function (msg) {
                alertify.log('Server Save Errors!', 'error', '10000');
            }
        });
    }

    
  


    function EmailSend(IwoNo,internalWorkOrder) {

        var EmployeName = "";
        if ($scope.ddlPreparedBy == null || $scope.ddlPreparedBy == undefined) {
            EmployeName = $scope.LoginUser.FullName;
        }
       
        else {
            EmployeName = $scope.ddlPreparedBy.FullName;
        }
        
        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })

        $scope.EmailSendNotification.EmailSubject = "Internal Work Order Saved";
        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
      //  $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var currentDate = new Date();
        var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> A new Internal WorkOrder has been Created. <br/> ' +
            'Internal Work Order No: <strong > ' + IwoNo + '</strong><br/>' +
            'Internal Work Order Date: <strong>' + ($filter('date')(internalWorkOrder.InternalWorkOrderDate, 'dd/MM/yyyy')).toString()  + '</strong><br/>' +
            'Company Name: <strong>' + $scope.ddlInternalWorkOrder.CompanyName + '</strong><br/>' +
            'Prepared by: <strong>' + EmployeName + '</strong>' + '<br/>' +
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




    function GetAllStock() {

        $http({
            url: '/StockValuation/GetAll_CurrentStock',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.sockQtyWithRequestQtyList = [];
            $scope.sockQtyWithRequestQtyList = data;
            //$scope.sockQtyWithRequestQty = Enumerable.From($scope.sockQtyWithRequestQtyList).Where(function (x) {
            //    return x.DepartmentName == "Production (U)" || x.DepartmentName == "Store (U)" || x.DepartmentName == "Supply Chain Management";
            //}).ToArray();
            $scope.sockQtyWithRequestQty = Enumerable.From($scope.sockQtyWithRequestQtyList).ToArray();
            console.log(" $scope.sockQtyWithRequestQty", $scope.sockQtyWithRequestQty)

        });
    }

    // Check Stock 
    $scope.RawMatrialstockList = [];

    //options = {
    //    types: '(cities)',
    //    country: 'ca'
    //}


    //$scope.checkddlstockramatrial = function (itemId) {
    //    var str = itemId;
    //    str1 = str.slice(-4);
    //    console.log(Number(str1));

    //    $scope.itemId = Number(str1);



    //    var val = $('#CompanySearchInput').val()

    //    var xyz = $('#CompanySearch option').filter(function () {
    //        return this.value;
    //    }).data('xyz');




    //    //$scope.ItemId = xyz;
    //    $scope.ItemFilterId = Enumerable.From($scope.sockQtyWithRequestQty).Where('$.ItemId==' + $scope.ItemId).FirstOrDefault();

    //    var itemIds = angular.element(`input[id='ItemId_${$scope.ItemId}']`).val($scope.ItemId);

    //    // angular.element(`input[id='imageName_${id}']`).val(null);

    //    var ids = itemIds;

    //    angular.forEach($scope.sockQtyWithRequestQty, function (aData) {

    //        if ($scope.itemId.ItemAddAttId == aData.ItemId) {
              
    //        }
    //    });

    //}

    $scope.itemIdGet = function () {
        $('.IwoToltipChange').tooltip('enable')
      //  $('#element1').tooltip('enable')
    }

    $scope.CheckToltip = function () {
        $('.IwoToltipChange').tooltip('enable')
    }
    $scope.getWorkOrderDetails = function (iwo) {
        $('.IwoToltipChange').tooltip('enable')
       // $('#element1').tooltip('enable')
        $scope.isDisableDDl = false;
        $scope.PurchaseOrderlist = [];
        $scope.PlaceHolder = "Select Raw Matrial...";
        //$('#ddlStoreSelect2').select2('destroy');
        //$('#ddlStoreSelect2').val(1078).select2();

        var currentDate = new Date();
        $scope.internalWorkOrder.InternalWorkOrderDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.inv_InternalOrderDetailList = [];
        $scope.inv_InternalOrderDetailListItem = [];

        // console.log('Iwo Item', iwo);
        PoNumberLoad(iwo.SalesOrderId);


        $http({
            url: '/InternalWorkOrder/InternalWorkOrderGetMaxNoBySalesOrderId?SalesOrderId=' + iwo.SalesOrderId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
        
                $scope.internalWorkOrder.InternalWorkOrderNo = data[0].InternalWorkOrderNo;
     
           
        });

        $http({
            url: '/SalesOrder/GetItemForIWO?salesOrderId=' + iwo.SalesOrderId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
           
            if (data.length == 0) {
                $scope.internalWorkOrder.PlaceOfDelivery = "N/A";
            } else {
                $scope.internalWorkOrder.PlaceOfDelivery = data[0].AddressDelivery;
            }
            var sOrdDate = iwo.SalesOrderDate.split("/");
            $scope.salesOrdDate = new Date(sOrdDate[2], (parseInt(sOrdDate[1]) - 1), sOrdDate[0]);


          
            var rawMaterial = {
                Core: 0,
                QtyPerRoll: 0,
                RollDirection: "",
                DeliveryDate: ""
            }
            angular.forEach(data, function (adata) {
                //if (adata.ArtWork == undefined) {
                //    adata.ArtWork = 'empty.png';
                //}
                var rawItemList = [];
                $scope.internalWorkOrder.SalesOrderId = iwo.SalesOrderId;


                rawItemList = Enumerable.From($scope.AllRawMaterialAndCombination)
                    .Select(function (x) {
                        return {
                            'ItemName': x['ItemName'],
                            'Combination': x['Combination'],

                            'ItemId': x['ItemId']
                        };
                    }).ToArray();



                //var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + adata.ItemId).FirstOrDefault();
               // var checkCategory = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + ItemCombination.ItemId).FirstOrDefault();
                var Department = [];
                var currentQty = [];
                $scope.DepartmentList = [];
                $scope.CurrentStockList = [];

                angular.forEach($scope.sockQtyWithRequestQty, function (data) {
                    if (adata.ItemId == data.ItemId) {

                        Department.push({ 'DepartmentName': data.DepartmentName });
                        currentQty.push({ 'CurrentQuantity': data.CurrentQuantity });

                    }

                });


                var dueDate = "";
                var res1 = adata.DeliveryDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDueDate1 = new Date(parseInt(adata.DeliveryDate.substr(6)));
                    var date1 = ($filter('date')(parsedDueDate1, 'MMM dd, yyyy')).toString();
                    dueDate = date1;
                }
                //var date = new Date();
                //dueDate = $filter('date')(date.toJSON().slice(0, 10), 'dd/MM/yyyy');


                if (adata.CategoryName === "Finished Goods" && adata.SubCategoryName != "Barcode Ribbon (R)") {
                    var CombinationList = [];
                    var RMaterialList = [];

                    RMaterialList.push(rawMaterial);


                    $scope.rawMatrialDDlList = [];

                    angular.forEach(rawItemList, function (raw) {
                        $scope.rawMatrialDDlList.push({ id: raw.ItemId, label: raw.Combination });
                    });

                    var inv_InternalOrderDetai = {
                        //ItemId: ItemCombination.ItemId,
                        ItemId: adata.ItemId,
                        FinishedItemName: adata.FinishedItemName,
                        ItemDescription: adata.ItemDescription,
                        ItemDescriptionTwo: adata.ItemDescriptionTwo,
                        LabelBrandId: adata.LabelBrandId,
                        LabelBrandName: adata.LabelBrandName,
                        OrderUnitId: adata.OrderUnitId,
                       // ItemName: ItemCombination.Combination,
                        ItemName: adata.ItemName,
                        UnitName: adata.UnitName,
                       // FinishedItemAddAttId: ItemCombination.ItemId,
                        FinishedItemAddAttId: adata.ItemId,
                        Barcode: adata.Barcode,
                        RawItemList: rawItemList,
                       // QtyPerRoll: ItemCombination.UnitPerPackage,
                        QtyPerRoll: adata.PcPerRoll,
                        OrderQty: adata.OrderQty,
                        DeliveryDate: dueDate,
                        DeliveryDate2: dueDate,
                        ddlItem: adata.ItemId,

                        Ups: adata.Ups,
                        Radius: adata.Radius,
                        Color: adata.Color,
                        DetailRemarks: adata.DetailRemarks,

                        DepartmentName: Department,
                        CurrentQuantity: currentQty,

                        RawMaterialList: RMaterialList,
                        //HeaderOfAttribute: HeaderOfAttribute,
                        CategoryName: adata.CategoryName,
                        SubCategoryName: adata.SubCategoryName,
                        SalesOrderDetailId: adata.SalesOrderDetailId,
                        ArtWork: adata.ArtWork,
                        ShowImg: true,
                        ddlRollDirection: adata.RollDirection,
                        rawDdlList: $scope.rawDdlList,
                        disabled: true,
                        PaperTypeName: adata.PaperTypeName,
                        PaperTypeId: adata.PaperTypeId,
                        iframeImage: "..//UploadedFiles//ArtWork//Art_0_m2r.jpg"
                        
                    }
                    $scope.inv_InternalOrderDetailList.push(inv_InternalOrderDetai);
                    $scope.inv_InternalOrderDetailListItem.push(inv_InternalOrderDetai);

                    console.log('Iwo List Item', $scope.inv_InternalOrderDetailList);
                } else {
                    var HeaderOfAttribute = ["Delivery Date"];
                    var inv_InternalOrderDetai = {
                        // ItemId: ItemCombination.ItemId,
                        ItemId: 0,
                      //  ItemName: ItemCombination.Combination,
                        ItemName: adata.ItemName,
                       // FinishedItemAddAttId: ItemCombination.ItemId,
                        FinishedItemAddAttId: adata.ItemId,
                        FinishedItemName: adata.FinishedItemName,
                        ItemDescription: adata.ItemDescription,
                        ItemDescriptionTwo: adata.ItemDescriptionTwo,
                        LabelBrandId: adata.LabelBrandId,
                        LabelBrandName: adata.LabelBrandName,
                        OrderUnitId: adata.OrderUnitId,

                        UnitName: adata.UnitName,
                        Barcode: adata.Barcode,
                        OrderQty: adata.OrderQty,
                        SalesOrderDate: adata.SalesOrderDate,
                        DeliveryDate: dueDate,
                        DeliveryDate2: dueDate,
                        Ups: adata.Ups,
                        Radius: adata.Radius,
                        Color: adata.Color,
                        DetailRemarks: adata.DetailRemarks,
                        //QtyPerRoll: ItemCombination.UnitPerPackage,
                        QtyPerRoll:adata.PcPerRoll,
                        DepartmentName: Department,
                        CurrentQuantity: currentQty,
                        ddlRollDirection: adata.RollDirection,
                        HeaderOfAttribute: HeaderOfAttribute,
                        CategoryName: adata.CategoryName,
                        SubCategoryName: adata.SubCategoryName,
                        SalesOrderDetailId: adata.SalesOrderDetailId,
                        ArtWork: adata.ArtWork,
                        ShowImg: true,
                        ddlItem: adata.ItemId,
                        rawDdlList: $scope.rawDdlList,
                        disabled: true,
                        PaperTypeName: adata.PaperTypeName,
                        PaperTypeId: adata.PaperTypeId,
                        iframeImage: "..//UploadedFiles//ArtWork//Art_0_m2r.jpg"
                    }
                    $scope.inv_InternalOrderDetailList.push(inv_InternalOrderDetai);
                    $scope.inv_InternalOrderDetailListItem.push(inv_InternalOrderDetai);
                }
            });

            console.log('Convert Item', $scope.inv_InternalOrderDetailListItem);
            $("#txtPlaceOfDelivery").focus();
        });
       
    }




    function PoNumberLoad(SalesOrderId) {
        $http({
            //url: '/ExpInvoice/GetPOReference?DocType=' + iwo.SalesOrderId,
            url: '/ExpInvoice/GetPOReference?DocType=SO' + "&DocumentId=" + SalesOrderId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PurchaseOrderlist = data;


            angular.forEach($scope.PurchaseOrderlist, function (po) {

                var res1 = po.PODate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(po.PODate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    po.PODate = date1;
                }

                if (po.AttachmentName != "" || po.AttachmentName != undefined) {
                    //  $scope.POAttachmentList.push(po.AttachmentName);
                    po.POArrayList = po.AttachmentName.split(',');
                }
            })


        });
    }



    // IWO Reset For SO

    $scope.IWOItemResetWithGetSOItemLoad = function () {
        $scope.SalesOrderDetailListForItem = [];
       
       // $scope.inv_InternalOrderDetailListItem = [];

        if ($scope.ddlSalesOrder != null) {

            $http({
                url: '/InternalWorkOrder/IWOItemResetWithGetBySOItemLoad?SalesOrderId=' + $scope.ddlSalesOrder.SalesOrderId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {

                $scope.internalWorkOrder.PlaceOfDelivery = data[0].AddressDelivery;
                var rawMaterial = {
                    Core: 0,
                    QtyPerRoll: 0,
                    RollDirection: "",
                    DeliveryDate: ""
                }
                angular.forEach(data, function (adata) {

                  

                 
                    if (adata.SalesOrderDetailId == 0) {
                        $scope.IsResetBtn = true;
                    } else {
                        $scope.IsResetBtn = false;
                    }
                   
                   // var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + adata.FinishedItemId).FirstOrDefault();
                   // var checkCategory = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + adata.FinishedItemId).FirstOrDefault();

                    var Department = [];
                    var currentQty = [];


                    angular.forEach($scope.sockQtyWithRequestQty, function (data) {
                        if (adata.FinishedItemId == data.ItemId) {

                            Department.push({ 'DepartmentName': data.DepartmentName });
                            currentQty.push({ 'CurrentQuantity': data.CurrentQuantity });

                        }

                    });

                    var dueDate = "";
                    var res1 = adata.DeliveryDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDueDate1 = new Date(parseInt(adata.DeliveryDate.substr(6)));
                        var date1 = ($filter('date')(parsedDueDate1, 'MMM dd, yyyy')).toString();
                        dueDate = date1;
                    }
                   

                    if (adata.CategoryName === "Finished Goods" && adata.SubCategoryName != "Barcode Ribbon (R)") {
                        var CombinationList = [];
                        var RMaterialList = [];

                        RMaterialList.push(rawMaterial);


                        $scope.rawMatrialDDlList = [];

                    
                        var inv_InternalOrderDetai = {
                            //ItemId: ItemCombination.ItemId,
                            ItemId: adata.FinishedItemId,
                            FinishedItemId: adata.FinishedItemId,
                            // ItemName: ItemCombination.Combination,
                            ItemName: adata.ItemName,
                            FinishedItemName: adata.FinishedItemName,
                            ItemDescription: adata.ItemDescription,
                            ItemDescriptionTwo: adata.ItemDescriptionTwo,
                            LabelBrandId: adata.LabelBrandId,
                            LabelBrandName: adata.LabelBrandName,
                            OrderUnitId: adata.OrderUnitId,
                            UnitName: adata.UnitName,

                            // FinishedItemAddAttId: ItemCombination.ItemId,
                            FinishedItemAddAttId: adata.FinishedItemId,
                            Barcode: adata.Barcode,
                            // RawItemList: rawItemList,
                            // QtyPerRoll: ItemCombination.UnitPerPackage,
                            QtyPerRoll: adata.PcPerRoll,
                            OrderQty: adata.OrderQty,
                            DeliveryDate: dueDate,
                            DeliveryDate2: dueDate,
                            ddlItem: adata.ItemId,

                            Ups: adata.Ups,
                            Radius: adata.Radius,
                            Color: adata.Color,
                            DetailRemarks: adata.DetailRemarks,

                            DepartmentName: Department,
                            CurrentQuantity: currentQty,

                            RawMaterialList: RMaterialList,
                            //HeaderOfAttribute: HeaderOfAttribute,
                            CategoryName: adata.CategoryName,
                            SubCategoryName: adata.SubCategoryName,
                            SalesOrderDetailId: adata.SalesOrderDetailId,
                            ArtWork: adata.ArtWork,
                            ShowImg: true,
                            ddlRollDirection: adata.RollDirection,
                            rawDdlList: $scope.rawDdlList,
                            disabled: true,
                            MaterialTypeName: adata.MaterialTypeName,
                            PaperTypeName: adata.MaterialTypeName,
                            PaperTypeId: adata.MaterialTypeId,
                            iframeImage: "..//UploadedFiles//ArtWork//Art_0_m2r.jpg",
                            IsVoid: adata.IsVoid
                        }
                        // $scope.inv_InternalOrderDetailList.push(inv_InternalOrderDetai);
                        //$scope.inv_InternalOrderDetailListItem.push(inv_InternalOrderDetai);
                        $scope.SalesOrderDetailListForItem.push(inv_InternalOrderDetai);


                        console.log('Iwo List Item', $scope.inv_InternalOrderDetailList);
                    } else {
                        var HeaderOfAttribute = ["Delivery Date"];
                        var inv_InternalOrderDetai = {
                            // ItemId: ItemCombination.ItemId,
                            ItemId: 0,
                            //  ItemName: ItemCombination.Combination,
                            ItemName: adata.ItemName,
                            FinishedItemName: adata.FinishedItemName,
                            ItemDescription: adata.ItemDescription,
                            ItemDescriptionTwo: adata.ItemDescriptionTwo,
                            LabelBrandId: adata.LabelBrandId,
                            LabelBrandName: adata.LabelBrandName,
                            OrderUnitId: adata.OrderUnitId,
                            UnitName: adata.UnitName,
                            // FinishedItemAddAttId: ItemCombination.ItemId,
                            FinishedItemAddAttId: adata.FinishedItemId,
                            UnitName: adata.UnitName,
                            Barcode: ItemCombination.Barcode,
                            OrderQty: adata.OrderQty,
                            SalesOrderDate: adata.SalesOrderDate,
                            DeliveryDate: dueDate,
                            DeliveryDate2: dueDate,
                            Ups: adata.Ups,
                            Radius: adata.Radius,
                            Color: adata.Color,
                            DetailRemarks: adata.DetailRemarks,
                            //QtyPerRoll: ItemCombination.UnitPerPackage,
                            QtyPerRoll: adata.PcPerRoll,
                            DepartmentName: Department,
                            CurrentQuantity: currentQty,
                            ddlRollDirection: adata.RollDirection,
                            HeaderOfAttribute: HeaderOfAttribute,
                            CategoryName: adata.CategoryName,
                            SubCategoryName: adata.SubCategoryName,
                            SalesOrderDetailId: adata.SalesOrderDetailId,
                            ArtWork: adata.ArtWork,
                            ShowImg: true,
                            ddlItem: adata.FinishedItemId,
                            FinishedItemId: adata.FinishedItemId,
                            rawDdlList: $scope.rawDdlList,
                            disabled: true,
                            DepartmentName: Department,
                            CurrentQuantity: currentQty,
                            MaterialTypeName: adata.MaterialTypeName,
                            PaperTypeName: adata.MaterialTypeName,
                            PaperTypeId: adata.MaterialTypeId,
                            iframeImage: "..//UploadedFiles//ArtWork//Art_0_m2r.jpg",
                            IsVoid: adata.IsVoid
                        }
                      
                        $scope.SalesOrderDetailListForItem.push(inv_InternalOrderDetai);
                    }

                });


                //$scope.SalesOrderAddList = [];

                //var SODIdForSOList = [];
                //angular.forEach($scope.SalesOrderDetailListForItem, function (aData) {
                //    SODIdForSOList.push(aData.SalesOrderDetailId);
                //})

                //var SODIdForIWOList = [];
                //var SOItemForIWOList = [];
                //angular.forEach($scope.inv_InternalOrderDetailListItem, function (aData) {
                //    SODIdForIWOList.push(aData.SalesOrderDetailId);
                //    SOItemForIWOList.push(aData.ItemId);
                //})

              


                //var RemomeItemList = $scope.inv_InternalOrderDetailListItem.filter(i => !SODIdForSOList.includes(i.SalesOrderDetailId))

                //if (RemomeItemList.length > 0) {
                //    angular.forEach(RemomeItemList, function (ad) {
                //        ad.IsVoid = true;
                //        $scope.DeleteForIWOIdsList.push(ad.InternalWorkOrderDetailId);
                        
                //    })
                //}

                //var AddItemList = $scope.SalesOrderDetailListForItem.filter(i => !SODIdForIWOList.includes(i.SalesOrderDetailId))
                //angular.forEach(AddItemList, function (ad) {
                //    $scope.inv_InternalOrderDetailListItem.push(ad);
                //});


                //var NewItemChange = $scope.SalesOrderDetailListForItem.filter(i => !SOItemForIWOList.includes(i.ItemId));
                //angular.forEach(NewItemChange, function (ad) {
                //    $scope.inv_InternalOrderDetailListItem.push(ad);
                //});
                //console.log(NewItemChange);

                //var result = []
                //result = $scope.inv_InternalOrderDetailListItem.filter(iwo => iwo.IsVoid == false || iwo.IsVoid == undefined);
                //$scope.inv_InternalOrderDetailListItem = result;



             
               

                //angular.forEach($scope.inv_InternalOrderDetailListItem, function (aData) {
                //    angular.forEach(AddItemList, function (aItem) {
                //        if (aData.SalesOrderDetailId == aItem.SalesOrderDetailId) {

                //            $scope.inv_InternalOrderDetailListItem.push(aItem);
                //        }
                //    });
                //})
                var RemomeItemList = $scope.inv_InternalOrderDetailListItem.filter(i => !$scope.SalesOrderDetailListForItem.includes(i.SalesOrderDetailId))
                if (RemomeItemList.length > 0) {
                    angular.forEach(RemomeItemList, function (ad) {
                        ad.IsVoid = true;
                        $scope.DeleteForIWOIdsList.push(ad.InternalWorkOrderDetailId);
                    })
                }

                var TempAddItemList = $scope.inv_InternalOrderDetailListItem.filter(i => !$scope.SalesOrderDetailListForItem.includes(i.SalesOrderDetailId))

                console.log(TempAddItemList);

                var AddItemList = $scope.SalesOrderDetailListForItem.filter(i => !$scope.inv_InternalOrderDetailListItem.includes(i.SalesOrderDetailId))



                console.log(AddItemList);

                angular.forEach(AddItemList, function (addItem) {
                    angular.forEach(TempAddItemList, function (aTemp) {
                        if (addItem.SalesOrderDetailId == aTemp.SalesOrderDetailId) {
                            //addItem.QtyPerRoll = aTemp.QtyPerRoll;
                             
                            addItem.OrderQty = addItem.OrderQty;
                            addItem.OrderUnitId = addItem.OrderUnitId;
                            addItem.UnitName = addItem.UnitName;

                            addItem.ddlCore = aTemp.ddlCore;
                            addItem.ddlRollDirection = aTemp.ddlRollDirection;
                            addItem.Ups = aTemp.Ups;
                            addItem.Radius = aTemp.Radius;
                            addItem.Color = aTemp.Color;
                            addItem.DetailRemarks = aTemp.DetailRemarks;
                            addItem.imageTextShowArray = aTemp.ArtWork;
                            addItem.ArtWork = aTemp.ArtWork;
                          
                        }
                    })
                })
                if (AddItemList.length > 0) {
                    $scope.inv_InternalOrderDetailListItem = AddItemList
                }
              
            });



          

          

        }
    }
    //Update For IWO

    $scope.ItemAttrList = [];






    $scope.getForIWODetailsUpdate = function (iwo) {

        $scope.ItemResetForSo = true;
        $scope.isUpdateImage = false;
       
        //  $scope.isUpdate = false;




        $scope.inv_InternalOrderDetailListItem = [];
        $scope.iwolist = [];



        $scope.TestList = [];



        $scope.ddlInternalWorkOrder = { CompanyId: iwo.CompanyId };
        $scope.ddlSalesOrder = { SalesOrderId: iwo.SalesOrderId };



        // $('#IwFilterSalesOrder').val(iwo.SalesOrderId).trigger('change');

        $('#iwCompany').select2('destroy');
        $('#iwCompany').val(iwo.CompanyId).select2();





        // $scope.iwolist = [];
        angular.forEach($scope.SalesOrderNoList, function (aSo) {

            if (aSo.SalesOrderId == iwo.SalesOrderId) {

                $('#IwFilterSalesOrder').select2('destroy');
                $('#IwFilterSalesOrder').val(aSo.SalesOrderId).select2();
             
                $scope.iwolist.push(aSo);
                $scope.TestList.push(aSo);
            }
        })


        //$("#iwCompany").select2().val(iwo.CompanyId).trigger("change");

        $scope.rawItemList = [];
        $scope.btnSave = "Update";



        $scope.internalWorkOrder = iwo;
        $scope.ddlInternalWorkOrder.CompanyName = iwo.CompanyNameOnBill;
        $scope.ddlInternalWorkOrder.FullName = iwo.PreparedByName;


        $scope.ddlPreparedBy = { "EmployeeId": iwo.PreparedById };
        $scope.ddlStore = { "DepartmentId": iwo.DepartmentId };

        $('#ddlPreparedBy').select2('destroy');
        $('#ddlPreparedBy').val(iwo.PreparedById).select2();

        //$('#ddlStoreSelect2').select2('destroy');
       // $('#ddlStoreSelect2').val(iwo.DepartmentId).select2();

        $scope.ddlStore = { DepartmentId: iwo.DepartmentId};

        $scope.PreparedById = Enumerable.From($scope.EmployeeList).Where("$.EmployeeId ==" + iwo.PreparedById)
            .FirstOrDefault();

        $scope.ddlStore = Enumerable.From($scope.Storelist).Where("$.DepartmentId ==" + iwo.DepartmentId)
            .FirstOrDefault();

        PoNumberLoad(iwo.SalesOrderId);




        $http({
            url: '/InternalWorkOrder/GetInternalWorkOrderDetailByInternalWorkOrderId?internalWorkId=' + iwo.InternalWorkOrderId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            
            $scope.internalWorkOrder.PlaceOfDelivery=data[0].AddressDelivery;

            $scope.isDisableDDl = false;
            //if (data.length == 0) {
            //     alertify.log('Item List not Found!', 'error', '5000');
            //} else {

            angular.forEach(data, function (aData) {

                $scope.updateImageSperate = '';
                $scope.updateImageSperateList = '';
                $scope.ImageNameTextList = '';
                $scope.ImageNameTextListArray = [];


                $scope.isImageShow = false;
                if (iwo.InternalWorkOrderId != null) {
                    $scope.isImageShow = true;
                }

                //if (aData.ArtWork == [""] || aData.ArtWork=="") {
                //    aData.ShowImg = true;
                //}
                if (aData.ArtWork == undefined || aData.ArtWork == [""] || aData.ArtWork == "") {

                    aData.ShowImg = true;
                    //$scope.updateImageSperate ="";
                    aData.PdfFile = true;
                    angular.element(`input[id='imageUpdateName_${aData.ItemId}']`).val($scope.updateImageSperateList);
                } else {
                    aData.PdfFile = true;
                    aData.ShowImg = false;
                  
                    $scope.updateImageSperate = aData.ArtWork.split(',');
                    $scope.updateImageSperateList = $scope.updateImageSperate.join();
                    $scope.ImageNameTextList = $scope.updateImageSperate.join(",");
                 
                    $scope.ImageNameTextListArray = $scope.updateImageSperate;
                   // var SplitList = aData.ArtWork.endsWith(',');
                   
                    angular.element(`input[id='imageUpdateName_${aData.ItemId}']`).val($scope.updateImageSperate);
                 

                  


                }
                $scope.rawItemList = [];
                $scope.rawItemList = Enumerable.From($scope.AllRawMaterialAndCombination)
                    .Select(function (x) {
                        return {
                            'ItemName': x['ItemName'],
                            'Combination': x['Combination'],
                            'ItemId': x['ItemId']
                        };
                    }).ToArray();

                $scope.rawItem = {};
                if (aData.ItemId != 0) {
                    $scope.rawItem = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId ==' + aData.ItemId).FirstOrDefault();
                    $scope.updateForItemId = 0;
                } else {
                    $scope.rawItem.ItemId = 0;
                    $scope.updateForItemId = aData.ItemId;
                }

                var Department = [];
                var currentQty = [];

                angular.forEach($scope.sockQtyWithRequestQty, function (data) {
                    if (aData.FinishedItemId == data.ItemId) {
                        Department.push({ 'DepartmentName': data.DepartmentName });
                        currentQty.push({ 'CurrentQuantity': data.CurrentQuantity });

                    }

                });

               // var DeliveryDate = "";
                var res2 = aData.DeliveryDate.substring(0, 5);
                if (res2 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.DeliveryDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.DeliveryDate = date1;
                }

                if (aData.CategoryName === "Finished Goods" && aData.SubCategoryName != "Barcode Ribbon (R)") {

                    aData.Core = aData.Core.toString();
                    // aData.ItemId = aData.ItemId.toString();
                    var thumb = {};
                    var itemObj = {

                        InternalWorkOrderId: aData.InternalWorkOrderId,
                        InternalWorkOrderDetailId: aData.InternalWorkOrderDetailId,
                        SalesOrderDetailId: aData.SalesOrderDetailId,
                        ItemId: aData.FinishedItemId,
                        ItemName: aData.ItemName,

                        FinishedItemName: aData.FinishedItemName,
                        ItemDescription: aData.ItemDescription,
                        ItemDescriptionTwo: aData.ItemDescriptionTwo,
                        LabelBrandId: aData.LabelBrandId,
                        LabelBrandName: aData.LabelBrandName,
                        OrderUnitId: aData.OrderUnitId,

                        CategoryName: aData.CategoryName,
                        Barcode: aData.Barcode,
                        RawItemList: $scope.rawItemList,
                        UnitName: aData.UnitName,
                        OrderQty: aData.OrderQty,
                        QtyPerRoll: aData.QtyPerRoll,
                        DeliveryDate: aData.DeliveryDate,
                        DeliveryDate2: aData.DeliveryDate,

                        DepartmentName: Department,
                        CurrentQuantity: currentQty,
                        Ups: aData.Ups,
                        Radius: aData.Radius,
                        Color: aData.Color,

                        DetailRemarks: aData.DetailRemarks,
                        ddlRollDirection: aData.RollDirection,
                        ddlCore: aData.Core,
                        FinishedItemId: aData.FinishedItemId,
                        ddlItem: { ItemId: $scope.rawItem.ItemId, Combination: $scope.rawItem.Combination },

                        ArtWork: $scope.updateImageSperate,
                        thumb: $scope.updateImageSperateList,
                        ShowImg: aData.ShowImg,
                        imageTextShow: $scope.ImageNameTextList,
                        imageTextShowArray: $scope.ImageNameTextListArray,
                        disabled: true,
                        isImageShow: $scope.isImageShow,
                        PaperTypeId:aData.PaperTypeId,
                        PaperTypeName: aData.PaperTypeName,
                        IsVoid: aData.IsVoid
                    }


                    $scope.inv_InternalOrderDetailListItem.push(itemObj);
                    // $scope.inv_InternalOrderDetailListItem.ddlItem = { ItemId: aData.ItemId };
                } else {
                    aData.Core = aData.Core.toString();
                    var itemObj = {

                        InternalWorkOrderId: aData.InternalWorkOrderId,
                        InternalWorkOrderDetailId: aData.InternalWorkOrderDetailId,
                        SalesOrderDetailId: aData.SalesOrderDetailId,
                        ItemName: aData.ItemName,

                        FinishedItemName: aData.FinishedItemName,
                        ItemDescription: aData.ItemDescription,
                        ItemDescriptionTwo: aData.ItemDescriptionTwo,
                        LabelBrandId: aData.LabelBrandId,
                        LabelBrandName: aData.LabelBrandName,
                        OrderUnitId: aData.OrderUnitId,

                        CategoryName: aData.CategoryName,
                        Barcode: aData.Barcode,
                        RawItemList: $scope.rawItemList,
                        ItemId: aData.ItemId,
                        OrderQty: aData.OrderQty,
                        QtyPerRoll: aData.QtyPerRoll,
                        DeliveryDate: aData.DeliveryDate,
                        DeliveryDate2: aData.DeliveryDate,
                        UnitName: aData.UnitName,
                        DepartmentName: Department,
                        CurrentQuantity: currentQty,
                        Ups: aData.Ups,
                        Radius: aData.Radius,
                        Color: aData.Color,
                        FinishedItemId: aData.FinishedItemId,
                        DetailRemarks: aData.DetailRemarks,
                        ddlRollDirection: aData.RollDirection,
                        ddlCore: aData.Core,
                       // ddlCore: { ddlCore: aData.Core },
                        ddlItem: { ddlItem: aData.ItemId },

                        ArtWork: $scope.updateImageSperate,
                        thumb: $scope.updateImageSperateList,
                        ShowImg: aData.ShowImg,
                        imageTextShow: $scope.ImageNameTextList,
                        imageTextShowArray: $scope.ImageNameTextListArray,
                        SalesOrderId: aData.SalesOrderId,
                        disabled: true,
                        isImageShow: $scope.isImageShow,
                        PaperTypeId: aData.PaperTypeId,
                        PaperTypeName: aData.PaperTypeName,
                        IsVoid: aData.IsVoid
                    }

                    $scope.inv_InternalOrderDetailListItem.push(itemObj);
                }


              //  console.log(' update Push inv_InternalOrderDetailList', $scope.inv_InternalOrderDetailListItem);

            });
            // }
        });

        window.scrollTo(0, 0);


        document.getElementById("iwCompany").disabled = true;
        document.getElementById("ddlStoreSelect2").disabled = true;




    }

    function GetAllDepartment() {
        $http({
            url: '/Department/GetAllDepartment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (department) {
            $scope.DepartmentListGetAll = department;
            console.log("Department", $scope.DepartmentListGetAll);

        })

    }


    $scope.departmentForIwoSet = function (deptId) {



        //var listForItem = $scope.inv_InternalOrderDetailListItem;
        //angular.forEach($scope.DepartmentListGetAll, function (aDep) {
        //    if (aDep.DepartmentId == deptId) {
        //        $scope.inv_InternalOrderDetailListItem = [];
        //        angular.forEach(listForItem, function (iwoListData) {
        //            if (iwoListData.CategoryName == "Hardware") {
        //                $scope.inv_InternalOrderDetailListItem.push(iwoListData);
        //            }
        //            //else {
        //            //    $scope.inv_InternalOrderDetailListItem.push(iwoListData);
        //            //}
        //            //if (iwoListData.CategoryName == "Finished Goods") {
        //            //    $scope.inv_InternalOrderDetailListItem.push(iwoListData);
        //            //}
        //        });
        //    }
        //});
        // getLoadFordropdown(deptId) 
    }
    function getLoadFordropdown(deptId) {

        if (deptId == 1078) {
            $scope.CategoryName = 'Finished Goods';
        } else if (deptId == 1065) {
            $scope.CategoryName = 'Hardware';
        } else {
            $scope.inv_InternalOrderDetailListItem = [];
        }

        $scope.btnSave = "Save";
        $scope.inv_InternalOrderDetailListItem = [];
        var listForItem = $scope.inv_InternalOrderDetailList;

        angular.forEach($scope.DepartmentListGetAll, function (dept) {
            if (dept.DepartmentId == deptId) {
                $scope.DepartmentIds = dept.DepartmentId;
            }
        })
        angular.forEach(listForItem, function (adata) {

            if (adata.CategoryName === $scope.CategoryName && adata.SubCategoryName != "Barcode Ribbon (R)") {
                $scope.inv_InternalOrderDetailListItem.push(adata);
            } else if (adata.CategoryName === $scope.CategoryName) {
                $scope.inv_InternalOrderDetailListItem.push(adata);

            }

        });

    }



    $scope.CheckDuplicateIWONo = function (internalWorkOrderNo) {
        var date = $("#txtIwoDate").val();
        if (date == "") {
            $("#txtIwoDate").focus();
            alertify.log('Please select date.', 'error', '5000');
            return;
        }

        if (angular.isUndefined($scope.internalWorkOrder.InternalWorkOrderNo) || $scope.internalWorkOrder.InternalWorkOrderNo == null) {
            $("#txtReceiveNo").focus();
            alertify.log('IWO No. is required.', 'error', '5000');
            return;
        }

        $http({
            url: '/InternalWorkOrder/CheckDuplicateIWO?InternalWorkOrderNo=' + $scope.internalWorkOrder.InternalWorkOrderNo + "&date=" + date,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            console.log('Iwo Data', data);
            if (data.length > 0) {
                alertify.log("Internal Work Order No. ' <b>" + $scope.internalWorkOrder.InternalWorkOrderNo + "<b> '" + " already exists!", "error", "5000");
                $scope.internalWorkOrder.InternalWorkOrderNo = "";
                $('#InternalWorkOrderNo').focus();
                $scope.found = true;
            } else {
                $scope.found = false;
            }
        });

    };

    //$scope.getRawCombinationList = function (rawItem, inv_InternalOrderDetail) {
    //    var combinationList = [];
    //    var selectedRow = Enumerable.From($scope.inv_InternalOrderDetailList)
    //                     .Where('$.FinishedItemAddAttId==' + inv_InternalOrderDetail.FinishedItemAddAttId)
    //                     .FirstOrDefault();
    //    selectedRow.CombinationList = combinationList;
    //    if (rawItem != null) {
    //        combinationList = Enumerable.From($scope.AllRawCombination)
    //                          .Where("$.ItemId ==" + rawItem.ItemId)
    //                          .OrderBy("$.Combination")
    //                          .Select(function (x) {
    //                              return {
    //                                  'Combination': x['Combination'],
    //                                  'ItemAddAttId': x['ItemAddAttId']
    //                              };
    //                          })
    //                          .ToArray();

    //        //var selectedRow = Enumerable.From($scope.inv_InternalOrderDetailList)
    //        //                  .Where('$.ItemId==' + inv_InternalOrderDetail.ItemId)
    //        //                  .FirstOrDefault();

    //        selectedRow.CombinationList = combinationList;
    //    }
    //}

    $scope.RemoveProduct = function (ProductDtlRow) {


        //var ind = $scope.inv_InternalOrderDetailListItem.indexOf(ProductDtlRow);
        //$scope.inv_InternalOrderDetailListItem.splice(ind, 1);
        // console.log($scope.inv_InternalOrderDetailListItem);

        if (ProductDtlRow.InternalWorkOrderDetailId == undefined || ProductDtlRow.InternalWorkOrderDetailId == 0) {
            if ($scope.inv_InternalOrderDetailListItem.length > 1) {
                var ind = $scope.inv_InternalOrderDetailListItem.indexOf(ProductDtlRow);
                $scope.inv_InternalOrderDetailListItem.splice(ind, 1);
                //  alertify.confirm().destroy();
                return;
            }

        }

        $scope.DeleteForIWOIdsList.push(ProductDtlRow.InternalWorkOrderDetailId);

        if ($scope.inv_InternalOrderDetailListItem.length > 1) {

            var ind = $scope.inv_InternalOrderDetailListItem.indexOf(ProductDtlRow);
            $scope.inv_InternalOrderDetailListItem.splice(ind, 1);
            //alertify.confirm("Are you sure to delete?", function (e) {
            //    if (e) {


            //        $http.get('/InternalWorkOrder/IWOItemUpdatedForDelete?internalWorkDetailId=' + ProductDtlRow.InternalWorkOrderDetailId).success(function (data) {
            //            if (data > 0) {
            //                alertify.log('Deleted Successfully!', 'success', '5000');
            //            }
            //        }).error(function (data) {
            //            alertify.log('Server Errors!', 'error', '5000');
            //        });
            //    }

            //});
        }
        else {
            alertify.log("At least  One Item Manadatory", 'error', '5000');
        }


    }

    $scope.saveInternalWorkOrder = function () {


        //$scope.isValidForSave = true;
        //var dateText = $scope.internalWorkOrder.InternalWorkOrderDate;

        //var date = $scope.internalWorkOrder.InternalWorkOrderDate.split("/")
        //var f = new Date(date[2], date[1] - 1, date[0]);

        //if (f < $scope.salesOrdDate) {
        //    //$scope.internalWorkOrder.InternalWorkOrderDate = dateText;
        //    alertify.log('IWO date cannot before Sales Order Date!', 'error', '5000');
        //    return;
        //}

        var iwoDetialList = $scope.inv_InternalOrderDetailListItem;

        if ($scope.inv_InternalOrderDetailListItem.length != 0) {
            for (var i = 0; i < iwoDetialList.length; i++) {
              
                if (iwoDetialList[i].CategoryName == "Finished Goods" && iwoDetialList[i].SubCategoryName != "Barcode Ribbon (R)" &&
                    (angular.isUndefined(iwoDetialList[i].ddlCore) || iwoDetialList[i].ddlCore == null ||
                        angular.isUndefined(iwoDetialList[i].ddlItem) || iwoDetialList[i].ddlItem == null ||
                        angular.isUndefined(iwoDetialList[i].ddlRollDirection) || iwoDetialList[i].ddlRollDirection == null ||
                        iwoDetialList[i].Core < 1 || iwoDetialList[i].QtyPerRoll < 1 || angular.isUndefined(iwoDetialList[i].QtyPerRoll) ||
                        iwoDetialList[i].OrderQty < 1 || angular.isUndefined(iwoDetialList[i].DeliveryDate))) {
                    // $scope.isValidForSave = false;
                    break;
                }

            }



            //if (!$scope.isValidForSave) {
            //    alertify.log('Please fill all required field in details section!', 'error', '5000');
            //    return;
            //}


            //angular.forEach(iwoDetialList, function (aData) {

            //    if ($scope.RawMatrialstockList.length != 0) {
            //        $scope.RawMatrialstockList = [];
            //        alertify.confirm("Are you sure to save?", function (e) {
            //            if (e) {
            //                SaveIWO(f, iwoDetialList);
            //            }
            //        });
            //    }

            //    angular.forEach(aData.CurrentQuantity, function (stock) {
            //        $scope.RawMatrialstockList = [];
            //        if (stock.CurrentQuantity != 0) {
            //            alertify.confirm("Are you sure to save?", function (e) {
            //                if (e) {
            //                    SaveIWO(f, iwoDetialList);
            //                }
            //            });
            //        }

            //        else {
            //            alertify.log('Stock Are not AvailAble!', 'error');
            //        }
            //    })
            //});


            var currentQtyList = [];
            var iwoSaveDataList = [];
            var currentQty = [];
            var isStock = true;
            var isRawMatrial = true;
            //angular.forEach(iwoDetialList, function (aData) {

            //    if (aData.CategoryName=="Hardware") {

            //        if (aData.CurrentQuantity.length != 0) {

            //            for (var i = 0; i < aData.CurrentQuantity.length; i++) {
            //                if (aData.CurrentQuantity[i].CurrentQuantity == 0 || aData.CurrentQuantity[i].CurrentQuantity == null) {
            //                    // iwoSaveDataList.push(aData);
            //                    isStock = false;
            //                    //if (aData.CategoryName == "Finished Goods") {
            //                    //    isStock = true;
            //                    //}
            //                }
            //            }
            //        } else {
            //            isStock = false;
            //        }

            //    }


            //});

            //angular.forEach(iwoDetialList, function (aData) {

            //    if (aData.CurrentQuantity.length != 0) {

            //        for (var i = 0; i < aData.CurrentQuantity.length; i++) {
            //            if (aData.CurrentQuantity[i].CurrentQuantity == 0 || aData.CurrentQuantity[i].CurrentQuantity == null) {
            //                // iwoSaveDataList.push(aData);
            //                isStock = false;
            //                if (aData.CategoryName == "Finished Goods") {
            //                    isStock = true;
            //                }
            //            }
            //        }
            //    } else {
            //        isStock = false;
            //    }
            //    //angular.forEach(aData.CurrentQuantity, function (data) {
            //    //    if (data.CurrentQuantity == 0 || data.CurrentQuantity == undefined) {
            //    //        currentQtyList.push(data);
            //    //    } else {
            //    //        currentQtyList.push(aData);
            //    //    }
            //    //});
            //});

            //angular.forEach($scope.sockQtyWithRequestQty, function (aData) {
            //    if (aData.CurrentQuantity == undefined || aData.CurrentQuantity == null || aData.CurrentQuantity == 0) {
            //        aData.CurrentQuantity = 0;
            //    } else if (aData.ItemId == null && aData.ItemId == undefined || aData.ItemId==0) {
            //        aData.ItemId = 0;
            //    }
            //    angular.forEach($scope.inv_InternalOrderDetailListItem,function (aIwo) {
            //        if (aData.ItemId == aIwo.FinishedItemAddAttId && aIwo.CategoryName == "Hardware") {
            //            if (aData.CurrentQuantity == 0 || aData.CurrentQuantity == undefined || aData.CurrentQuantity == null) {
            //                isStock = false;
            //            } else {
            //                isStock = false;
            //            }
            //        }

            //    })
            //})


          
            if (isStock) {

                if ($scope.ddlSalesOrder == null || $scope.ddlSalesOrder == undefined) {
                    alertify.log('Select Department For IWO', 'error', '5000');
                } else {
                    alertify.confirm("Are you sure to save?", function (e) {

                        if (e) {

                            SaveIWO(iwoDetialList);
                            document.getElementById("iwCompany").disabled = false;
                            $('#iwCompany').select2('destroy');
                            $('#iwCompany').val('').select2({
                                placeholder: "Select Company"
                            });
                            $('#ddlPreparedBy').select2('destroy');
                            $('#ddlPreparedBy').val('').select2({
                                placeholder: "Receive By"
                            });

                            //$('#ddlStoreSelect2').select2('destroy');
                            //$('#ddlStoreSelect2').val('').select2({
                            //    placeholder: "Select Department For IWO"
                            //});
                        }
                    });
                }
               


            }
            else {
                alertify.log('Stock are not available', 'error', '5000');
            }

        } else {
            alertify.log('Item List Not Found', 'error', '5000');
        }


    }



    

    $scope.resetForm = function () {
      
        $('#ddlPreparedBy').select2('destroy');
        $('#ddlPreparedBy').val('').select2({
            placeholder: "Receive By"
        });

     

        $scope.isDisableDDl = false;
        $scope.ddlPreparedBy = { EmployeeId: $scope.LoginUser.EmployeeId };

        Clear();


        //$scope.ddlPreparedBy = null;
        //$scope.ddlStore = null;
        //$scope.ddlInternalWorkOrder = null;
        //setTimeout(function () {
        //    $("#iwCompany").select2({
        //        placeholder: "Select Company"
        //    }).val('').trigger("change");

        //}, 0);



        $('#iwCompany').select2('destroy');
        $('#iwCompany').val('').select2({
            placeholder: "Select Company"
        });

        $('#ddlPreparedBy').select2('destroy');
        $('#ddlPreparedBy').val('').select2({
            placeholder: "Receive By"
        });

        //$('#ddlStoreSelect2').select2('destroy');

        //$('#ddlStoreSelect2').val('').select2({
        //    placeholder: "Select Department For IWO"
        //});
        $scope.internalWorkOrder = {};
        $scope.iwolist = [];
        $scope.inv_InternalOrderDetailListItem = [];
        //$('#ddlPreparedBy').val(null).trigger('change');
        //$('#ddlStoreSelect2').val(null).trigger('change');

        //setTimeout(function () {
        //    $("#ddlPreparedBy").select2({
        //        placeholder: "Receive By"
        //    }).val('').trigger("change");

        //}, 0);


        //setTimeout(function () {
        //    $("#ddlStoreSelect2").select2({
        //        placeholder: "Select Department For IWO"
        //    }).val('').trigger("change");

        //}, 0);

        document.getElementById("IwFilterSalesOrder").disabled = true;
        document.getElementById("iwCompany").disabled = false;
        document.getElementById("ddlStoreSelect2").disabled = false;
        $scope.btnSave = "Save";
        // Clear();
        //$scope.internalWorkOrderForm.$setPristine();
        //$scope.internalWorkOrderForm.$setUntouched();
    }


    $("body").on("focus", "[id=IWODetailsTable] .DeliveryDatePicker", function () {
        $(this).datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'dd/mm/yyyy'
        });

    });

    //$("body").on("change", "[id=IWODetailsTable] .DeliveryDatePicker", function () {
    //    var deliDate;
    //    if (!angular.isUndefined($scope.internalWorkOrder.InternalWorkOrderDate)) {
    //        var iwoAr = $scope.internalWorkOrder.InternalWorkOrderDate.split("/");
    //        var iwoDate = new Date(iwoAr[2], iwoAr[1] - 1, iwoAr[0]);

    //        deliDate = $(this).val();
    //        var deliveryArr = $(this).val().split("/");

    //        var deliveryDate = new Date(deliveryArr[2], deliveryArr[1] - 1, deliveryArr[0])

    //        if (deliveryDate < iwoDate) {
    //            $scope.isValidForSave = false;
    //            $(this).val("");
    //            alertify.log("Delivery Date must be less than IWO Date", "error", "5000");
    //        } else {
    //            angular.forEach($scope.inv_InternalOrderDetailList, function (aIWO) {
    //                aIWO.DeliveryDate = deliDate;
    //            })
    //        }
    //    }
    //});


    //Get Paged


    //$("#txtForIWO").datepicker({
    //    dateFormat: "d/M/yy"
    //});

    //$scope.IwoDate = function () {
    //    $("#txtForIWO").focus();
    //    $("#txtForIWO").trigger("click");
    //}

    //$("#txtFromDateForIWO").datepicker({
    //    dateFormat: "M d, yy"
    //});

    //$scope.FormDateChangeForSO = function () {
    //    $("#txtFromDateForIWO").focus();
    //    $("#txtFromDateForIWO").trigger("click");
    //}


    //$("#txtToDateForIWO").datepicker({
    //    dateFormat: "M d, yy"
    //});

    //$scope.ToDateChangeForSO = function () {
    //    $("#txtToDateForIWO").focus();
    //    $("#txtToDateForIWO").trigger("click");
    //}

    $scope.reloadBtn = function () {
        $('#txtFromDateForIWO').val('');
        $('#txtToDateForIWO').val('');
        $('#IWOAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchIWOAndCompanyName = null;
        GetPagedIwo(1);
    }

    $scope.searchBtn = function () {
        GetPagedIwo(1);
    }

    $scope.IWOSearch = function () {
        GetPagedIwo(1);

    }

    function GetPagedIwo(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;



        //var formDateChange = $("#txtFromDateForIWO").val();
        //$scope.FromDate = formDateChange.split('/').reverse().join('-');

        //var toDateChange = $("#txtToDateForIWO").val();
        //$scope.ToDate = toDateChange.split('/').reverse().join('-');

        $scope.FromDate = $("#txtFromDateForIWO").val();
        $scope.ToDate = $("#txtToDateForIWO").val();

        var SearchCriteria = "";
        var SearchCriteria1 = "";
      

        if ($scope.LoginUser.DepartmentName != null) {
            if ($scope.LoginUser.DepartmentName.match("Sales")) {
                SearchCriteria1 = "Updator.DepartmentId=" + $scope.LoginUser.DepartmentId + " and Updator.SectionId=" + $scope.LoginUser.SectionId;
            } else {
                SearchCriteria1 = "";
            }
        }
        // SearchCriteria = "[IWO].[IsApproved]=1";

        if ($scope.SearchIWOAndCompanyName != undefined && $scope.SearchIWOAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria1 = "([IWO].[InternalWorkOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([IWO].[InternalWorkOrderNo] LIKE '%" + $scope.SearchIWOAndCompanyName + "%' OR [SO].[CompanyNameBilling] LIKE '%" + $scope.SearchIWOAndCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
            SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
        }
        else if ($scope.SearchIWOAndCompanyName !== undefined && $scope.SearchIWOAndCompanyName != null && $scope.SearchIWOAndCompanyName != "") {
            SearchCriteria1 = "[IWO].[InternalWorkOrderNo] LIKE '%" + $scope.SearchIWOAndCompanyName + "%' OR [SO].[CompanyNameBilling] LIKE '%" + $scope.SearchIWOAndCompanyName + "%'";
            //alert("Name Success!!!!!");
            SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria1 = "[IWO].[InternalWorkOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
            SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
        }

        //


        //var SearchCriteria = "[IWO].[IsApproved]=0";


        $http({
            url: encodeURI('/InternalWorkOrder/GetPagedIWO?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria1 + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.iwoListPaged = data.ListData;

            console.log('IWO Groi List Edit', $scope.iwoListPaged);
            $scope.total_count = data.TotalRecord;

            if ($scope.iwoListPaged.length > 0) {

                //angular.forEach($scope.iwoListPaged,function (aDataDisable) {
                // if (aDataDisable.IsApproved == true) {

                //     document.getElementById("UpdatebtnDisable").disabled = true;
                // } else {
                //     document.getElementById("UpdatebtnDisable").disabled = false;
                // }
                //})

                angular.forEach($scope.iwoListPaged, function (aSd) {




                    if (aSd.AttachmentName != null || aSd.AttachmentName != undefined) {
                        $scope.PoAttachmentList = [];

                        var poText = aSd.AttachmentName.split(",");
                        $scope.PoAttachmentList = poText;
                        aSd.PoListFilter = $scope.PoAttachmentList;

                    } else {
                        aSd.PoListFilter = "";
                    }


                    if (aSd.ArtWorkName != undefined || aSd.ArtWorkName != null) {
                        $scope.ArtWorkList = [];
                        var text = aSd.ArtWorkName.split(",");
                        $scope.ArtWorkList = text;
                       // $scope.url = encodeURI("../../../UploadedFiles/ArtWork/" + text);
                        aSd.ArtWorkFilter = $scope.ArtWorkList;
                       // aSd.url = $scope.url;
                     //   aSd.ArtWorkFilter = $scope.url;
                        
                    }



                    var res1 = aSd.InternalWorkOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.InternalWorkOrderDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.InternalWorkOrderDate = date1;
                    }
                });

            }
            else {
                alertify.log('Iwo  Not Found', 'error', '5000');
            }



        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedIwo($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedIwo($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedIwo($scope.currentPage);
        }
        //  }


    }

    //$scope.OpenReport = function (InternalWorkOrderId) {
    //    $window.open("/ErpReports/RV_inv_InternalWorkOrderByInternalWorkOrderId.aspx?internalWorkOrderId=" + InternalWorkOrderId, "_blank", "width=1150,height=630,left=125,top=25");
    //    event.stopPropagation();
    //}


    $scope.OpenReport = function (iwoId) {
        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");

        $cookieStore.put("IWOID", iwoId);
       // sessionStorage.setItem("IWOID", JSON.stringify(iwoId));
        event.stopPropagation();

    };







    $scope.$watch("internalWorkOrderForm.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });



    // THIS IS REQUIRED AS File Control is not supported 2 way binding features of Angular
    // ------------------------------------------------------------------------------------
    //File Validation
    $scope.ChechFileValid = function (file) {
        var isValid = false;
        if ($scope.SelectedFileForUpload != null) {
            //if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'application/pdf') && file.size <= (512 * 1024)) {
            if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'application/pdf')) {
                $scope.FileInvalidMessage = "";
                isValid = true;
            }
            else {
                $scope.FileInvalidMessage = "Selected file is Invalid. (only file type png, jpeg and gif and 512 kb size allowed)";
            }
        }
        else {
            $scope.FileInvalidMessage = "Image required!";
        }
        $scope.IsFileValid = isValid;
    };



    $scope.ClearImage = function (id) {
        var isUpdateImgHide = false;
        var result = confirm("Are you sure about removing this picture?");
        if (result) {
            if ($scope.inv_InternalOrderDetailListItem[id].ArtWork != null && $scope.inv_InternalOrderDetailListItem[id].ArtWork != undefined && $scope.inv_InternalOrderDetailListItem[id].ArtWork != '') {

             
                for (var i = 0; i < $scope.inv_InternalOrderDetailListItem[id].ArtWork.length; i++) {
                    var fileName = $scope.inv_InternalOrderDetailListItem[id].ArtWork[i];
                  
                    if (typeof fileName === "string") {
                        deleteFile(fileName);
                    } 

                    //if ($scope.SelectedFileForUpload.length >0) {
                    //    for (var i = 0; i < $scope.SelectedFileForUpload.length; i++) {

                    //        if ($scope.SelectedFileForUpload[i].SalesOrderDetailId == $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId) {
                             
                    //            $scope.SelectedFileForUpload.splice($scope.SelectedFileForUpload[i], 1);

                    //            console.log($scope.SelectedFileForUpload);
                    //        }


                    //    }
                    //}
                   
                      
                    
                }

                $http({
                    url: '/InternalWorkOrder/InternalWorkOrderDetail_For_UpdateArtWork?internalWorkOrderDetailId=' + $scope.inv_InternalOrderDetailListItem[id].InternalWorkOrderDetailId,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {

                });


            }

  

            $scope.inv_InternalOrderDetailListItem[id].thumb = '';
            $scope.inv_InternalOrderDetailListItem[id].imageTextShow = '';
            $scope.inv_InternalOrderDetailListItem[id].imageTextShowArray = '';
           

            $scope.inv_InternalOrderDetailListItem[id].ArtWork = '';

            $scope.inv_InternalOrderDetailListItem[id].ShowImg = true;
            //var SelectedFile = Enumerable.From($scope.SelectedFileForUpload)
            //    .Where("$.ItemId === " + $scope.inv_InternalOrderDetailListItem[id].ItemId).FirstOrDefault();
            //var index = $scope.SelectedFileForUpload.indexOf(SelectedFile);

            //$scope.SelectedFileForUpload.splice(index, 1);



            angular.element(`input[id='image_${id}']`).val(null);
            angular.element(`input[id='imageUpdateName_${id}']`).val(null);
            angular.element(`input[id='imageName_${id}']`).val(null);

           

            angular.element(`p[id='imageNameList_${id}']`).text(null);
            angular.element(`p[id='imageNameFilterList_${id}']`).text(null);
        }



    };



    $scope.SelectFile = function (data) {
       // $scope.SelectedFileForUpload = [];
        var incrementNumberOfImage = 0;
      
        $scope.MultipleImageListFilter = [];
        $scope.MultipleImageList = [];
        $scope.isUpdateImage = false;
    
        var isUpdateImgHide = false;
        var id = data.id.split("_");

        id = id[id.length - 1];


        //if ($scope.SelectedFileForUpload.length>0) {
         
        //    for (var i = 0; i < $scope.SelectedFileForUpload.length; i++) {

        //        if ($scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId == $scope.SelectedFileForUpload[i].SalesOrderDetailId) {
        //            $scope.SelectedFileForUpload.splice($scope.SelectedFileForUpload[i], 1);
        //            console.log();
        //        }
        //    }
        //}
       

        $scope.inv_InternalOrderDetailListItem[id].ShowImg = true;
        // $scope.inv_InternalOrderDetailListItem[id].ShowImg = false;

        var idIndex = Number(id);





        //for (var i = 0; i < $scope.inv_InternalOrderDetailListItem[idIndex].length; i++) {
        //    $scope.inv_InternalOrderDetailListItem[i].ShowImg = true;

        //}



        //$scope.isHideImageUpdate = isUpdateImgHide;

        $scope.inv_InternalOrderDetailListItem[id].ShowImg == true;

        // angular.element(`input[id='imageName_${id}']`).val($scope.isUpdate);
        //  if (id) {

        //}



        var ItemId = data.name.split("_");
        ItemId = ItemId[ItemId.length - 1];

      
        for (var i = 0; i < data.files.length; i++) {
       
            data.files[i].ItemId = parseInt(ItemId);
           
        }
                

        var SelectedFileForUploadName = [];
        var SelectedFileForUploadNameList = [];
        $scope.ImageListName = '';
        $scope.ImageListShow = [];
        var SelectedFileForUploadNameConcat = '';

        //for (var i = 0; i < $scope.SelectedFileForUpload.length; i++) {
        //    if ($scope.SelectedFileForUpload[i].SalesOrderDetailId == $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId ) {
        //        $scope.SelectedFileForUpload.splice($scope.SelectedFileForUpload[i], 1);

        //        $scope.SelectedFileForUpload.splice($scope.SelectedFileForUpload[i], 1);
        //        console.log('Index',i);
        //    }
        //}

        //var listToDelete = [];
        //listToDelete.push($scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId);

        //for (var i = 0; i < $scope.SelectedFileForUpload.length; i++) {
        //    var obj = $scope.SelectedFileForUpload[i];

        //    if (listToDelete.indexOf(obj.SalesOrderDetailId) !== -1) {
        //        $scope.SelectedFileForUpload.splice(i, 1);
        //    }
        //}

        //console.log($scope.SelectedFileForUpload);

        $scope.SelectedFileForUpload = $scope.SelectedFileForUpload.filter(x => {
            return x.SalesOrderDetailId != $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId;
        })
        console.log($scope.SelectedFileForUpload);

        //function removeFromArray(orginal, indextemp) {

        //    return orginal.filter(value => !indextemp.includes(value));
        //}
        //var orginal1 = [];
        //var indextemp1 = $scope.inv_InternalOrderDetailListItem[id];
        //    orginal1 = $scope.SelectedFileForUpload;

        //var item = removeFromArray(orginal1, indextemp1);

        

      

        //console.log('Img',item);
      //  const nums = [1, 2, 3, 4, 5, 6];
        //const remove = [1, 2, 4, 6];

       


        for (var i = 0; i < data.files.length; i++) {

            var fileSize = data.files[i].size;
            var file = Math.round((fileSize / 1024));
            var fileMb = parseFloat(file / 1024);
            var fileName = data.files[i].name;

            if (fileMb <= 25.3) {

                var img = data.files[i].name.replace(/[^\w\s]/gi, '_');
                var splitImg = data.files[i].name.split(".").pop();
                if (data.files.length > 0) {
                    incrementNumberOfImage = incrementNumberOfImage + 1;
                }

                SelectedFileForUploadName.push('Art_' + $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId + '_' + incrementNumberOfImage + '.' + splitImg);
                SelectedFileForUploadNameList.push('Art_' + $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId + '_' + incrementNumberOfImage + '.' + splitImg);
                data.files[i].SalesOrderDetailId = $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId;
                data.files[i].ItemId = $scope.inv_InternalOrderDetailListItem[id].ItemId;
                data.files[i].ArtFileName = 'Art_' + $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId + '_' + incrementNumberOfImage + '.' + splitImg;


               

                $scope.MultipleImageListFilter.push(data.files[i]);

              
            }
            else {

                angular.element(`input[id='imageUpdateName_${id}']`).val(null);
                alertify.log('File is bigger than 25MB' + ' ' + fileName+' ', 'error', '5000');
            }

        }

        SelectedFileForUploadNameConcat = SelectedFileForUploadName.join();
        $scope.ImageListName = SelectedFileForUploadNameList.join("    ,    ");
        angular.forEach($scope.MultipleImageListFilter, function (aData) {

            $scope.SelectedFileForUpload.push(aData);
            $scope.MultipleImageList.push(aData);
        });


       

      

        var elem = document.getElementById(data.id);
        console.log('elem', elem);

        $scope.inv_InternalOrderDetailListItem[id].ShowImg = true;
        $scope.imagesrc = [];
    
        $scope.inv_InternalOrderDetailListItem[id].thumb = [];

        angular.element(`input[id='imageName_${id}']`).val(SelectedFileForUploadNameConcat);
        angular.element(`p[id='imageNameList_${id}']`).text($scope.ImageListName);
        angular.element(`input[id='imageUpdateName_${id}']`).val(null);

        //for (var i = 0; i < data.files.length; i++) {
        //    if (data.files[i].type != "application/pdf") {

        //        var reader = new FileReader();
        //        reader.fileName = data.files[i].name;
        //        reader.onload = function (event) {
        //            var image = {};
        //            image.src = event.target.result;
        //            $scope.inv_InternalOrderDetailListItem[id].thumb.push(image);

        //            $scope.$apply();
        //        }
        //        reader.readAsDataURL(data.files[i]);
        //    }
            
        //}


    }


    $scope.deleteFile = function (FileName) {
        //if (typeof FileName === "string") {
            deleteFile(FileName);
       // }
      

    };



    function deleteFile(FileName) {

       // if (typeof FileName === "string") {

            $http({
                url: '/Item/ArtDeleteFile?FileName=' + FileName,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                //$scope.IwoDdlFilterList = data;
                // alert("success");
            })
        //}
       

    }

    $scope.IsDowanload = true;
    //$scope.downLoadFilePopupBtn = function () {

    //    alertify.confirm("Do you Want to Dowanload ?", function (e) {
    //        if (e) {
    //            //$("#AnDownload").click();
    //            $("#PoDownloadId")[0].click()
    //        } else {

    //        }
    //    })
    //    event.stopPropagation();
    //}


}).factory('FileService', function ($http, $q) { // explained abour controller and service in part 2

    var fac = {};
    fac.UploadFile = function (file) {
        var formData = new FormData();
        formData.append("file", file);
        var defer = $q.defer();
        //var SODId = $scope.IWOItemList[file.index].SalesOrderDetailId;
        //var ItemCode = $scope.IWOItemList[file.index].Barcode;
        console.log('File', file);

        $http.post("/Item/SaveFiles?SODId="+file.SODId +'&ArtFileName='+file.ArtFileName, formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
            .then(function (d) {
                defer.resolve(d);
                console.log('Update', d);
            });


        return defer.promise;

    }

    return fac;

});