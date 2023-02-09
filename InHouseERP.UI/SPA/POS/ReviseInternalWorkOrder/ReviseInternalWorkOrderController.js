

app.controller("ReviseInternalWorkOrderController", function ($rootScope,$scope, $cookieStore, $http, $window, $filter, FileService) {



    Clear();

    function Clear() {

        

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
     
        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Revise InternalWork Order').ScreenId;
        //    GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Revise InternalWork Order').ScreenId;
        //        GetUsersPermissionDetails();
        //    }, 500);
        //}

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Revise InternalWork Order').ScreenId;
        GetUsersPermissionDetails();

       // $scope.ScreenId = parseInt(sessionStorage.getItem("ReviseInternalWorkOrderScreenId"));
        $scope.DeleteForIWOIdsList = [];
        //Loading Js

     


      

        // Loading End

        //   GetPagedIwo($scope.currentPage);
        $scope.iwoListPaged = [];
        $scope.salesOrdDate = "";
        $scope.isValidForSave = true;
        $scope.IsFinishedGoods = true;
        //$scope.LoginUser = $cookieStore.get('UserData');
        //  $scope.UserId = $scope.LoginUser.UserId;

        $scope.found = true;
        $scope.iwolist = [];
        $scope.iwoListForGrid = [];
        $scope.ddlInternalWorkOrder = null;


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
       // GetTopSalesOrderDetailData();
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
    
        $scope.SalesOrderNoFilterList = [];
        $scope.ddlAmendmentReason = null;

        GetAmendmentReason();
      
        $scope.PurchaseOrderlist = [];
        $scope.isDisableDDl = false;

        $scope.CanRemoveItemFlag = true;

        ReportNotificationDetail_Get();
    }

   // GetTopSalesOrderDetailDataSoNo();
    //$scope.SalesOrderNoList = [];

    $("#txtInternalWorkOrderDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.DateChangeForInternalWorkOrderDate = function () {
        $("#txtInternalWorkOrderDate").focus();

    }

    ///Loading Spaner Js Method=====>>

  
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

            if (data > 0) {
                alertify.log('Amendment Request Saved Successfully!', 'success', '5000');
                Clear();

            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
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

            //  url: '/Department/DepartmentGetByBranchAndDeptTypeId?departmentTypeIds=' + '4,5' + '&branchId=' + null,
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //$scope.Storelist = data;

            //  console.log('Load for Storelist', data);

            angular.forEach(data, function (aData) {
                aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                $scope.Storelist.push(aData);
            })
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
            $scope.AllRawCombination = JSON.parse(data);
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
            // $scope.ddlPreparedByRevise = { EmployeeId: $scope.LoginUser.EmployeeId };
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


    //function GetTopSalesOrderDetailDataSoNo() {

    //    var criteria = "IWO.[IsApproved]=1";
       
    //    $http({
    //        url: '/InternalWorkOrder/GetInternalWorkOrderDynamic?searchCriteria=' + criteria + "&orderBy='InternalWorkOrderDate'",
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        $scope.SalesOrderNoList = data;
    //        $scope.iwolist = data;
           
    //    });
    //}


    //function GetTopSalesOrderDetailData() {
    //    $scope.iwoListForGrid = [];
    //    //var criteria = "A.IsApproved = 1 AND SalesOrderId NOT IN (SELECT SalesOrderId FROM inv_InternalWorkOrder)";
    //    var criteria = "A.IsApproved = 1 AND (SELECT COUNT(ItemAddAttId) FROM pos_SalesOrderDetail WHERE SalesOrderId = SO.SalesOrderId) > (SELECT COUNT(FinishedItemId) FROM inv_InternalWorkOrderDetail IWOD INNER JOIN inv_InternalWorkOrder IWO ON IWOD.InternalWorkOrderId = IWO.InternalWorkOrderId WHERE IWO.SalesOrderId = SO.SalesOrderId)";
    //    //var criteria = "A.IsApproved = 1";
    //    //var criteria = "A.IsApproved = 1";
    //    $http({
    //        url: '/SalesOrder/GetSalesOrderDynamic?searchCriteria=' + criteria + "&orderBy='SalesOrderDate'",
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        if (data.length > 0) {
    //            angular.forEach(data, function (aSd) {
    //                var res1 = aSd.SalesOrderDate.substring(0, 5);
    //                if (res1 == "/Date") {
    //                    var parsedDate1 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
    //                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
    //                    aSd.SalesOrderDate = date1;
    //                }
    //            })
    //        }
    //        $scope.iwoListForGrid = data;
    //        ////$scope.IwoDdlFilterList = Enumerable.From(data).Distinct(function (x) {
    //        //    return x.CompanyId
    //        //}).ToArray();
            
    //        //console.log('iwo Distinct Data', $scope.IwoDdlFilterList);
    //        //console.log('iwo load for Grid ', $scope.iwoListForGrid);

    //    });
    //}

  


    //$scope.CompanyLoadForGridIwo = function (companyId) {

    //    $scope.internalWorkOrder = {};

    //    $scope.inv_InternalOrderDetailListItem = [];
    //    $scope.iwolist = [];
    //    $scope.btnSave = "Save";

    //    $scope.ddlPreparedBy = null;
    //    $scope.ddlStore = null;
    //    $scope.CompanyIdList = companyId;

    //    angular.forEach($scope.iwoListForGrid, function (aData) {
    //        if ($scope.CompanyIdList == aData.CompanyId) {

    //            //angular.forEach(aData, function (aCom) {
    //            var company = {};
    //            company.CompanyId = aData.CompanyId;
    //            company.SalesOrderId = aData.SalesOrderId;
    //            company.SalesOrderNo = aData.SalesOrderNo;
    //            company.SalesOrderDate = aData.SalesOrderDate;
    //            company.CompanyName = aData.SalesOrderNo;
    //            $scope.iwolist.push(company);
    //            // })
    //            document.getElementById("IwFilterSalesOrder").disabled = false;
    //        }

    //    });

    //    $scope.btnSave = "Save";

    //}

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
             
            });
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




    function ReportNotificationDetail_Get() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'IWOR',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(NotificaitonTitle) {
        $scope.AppNotificationLogList = [];

  /*      angular.forEach(SalesOrderList, function (aSO) {*/
            angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
                var obj = {}
                obj = aNotify
                obj.NotificaitonTitle = NotificaitonTitle

                if (aNotify.DepartmentId == 7) {
                    if (aNotify.SectionId == $scope.LoginUser.SectionId) {
                        obj.NotificationDetail = 'Internal WorkOrder: ' + $scope.internalWorkOrder.InternalWorkOrderNo + ' Company Name: ' + $scope.internalWorkOrder.PlaceOfDelivery + 'Employee Name' + $scope.LoginUser.FullName;
                        $scope.AppNotificationLogList.push(obj);
                    }
                } else {
                    obj.NotificationDetail = 'Internal WorkOrder: ' + $scope.internalWorkOrder.InternalWorkOrderNo + ' Company Name: ' + $scope.internalWorkOrder.PlaceOfDelivery + 'Employee Name' + $scope.LoginUser.FullName;
                    $scope.AppNotificationLogList.push(obj);
                }
            })
       // })


        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) { })
    }


    function SaveIWO(iwoDetialList) {



        $scope.IWOItemList = iwoDetialList;

        var IsAmendment = true;
        $scope.internalWorkOrder.IsAmendment = IsAmendment;

        //var a = $scope.internalWorkOrder.InternalWorkOrderDate;
        //var from = a.split("/");
        //var f = new Date(from[2], from[1] - 1, from[0]);

        //$scope.internalWorkOrder.InternalWorkOrderDate = f;

        //$scope.internalWorkOrder.InternalWorkOrderDate = f;
        $scope.internalWorkOrder.DepartmentId = $scope.ddlStore.DepartmentId;
        $scope.internalWorkOrder.PreparedById = $scope.ddlPreparedBy.EmployeeId;
        $scope.internalWorkOrder.CreatorId = $scope.LoginUser.UserId;
        $scope.internalWorkOrder.UpdatorId = $scope.LoginUser.UserId;

        for (var i = 0; i < $scope.SelectedFileForUpload.length; i++) {

            $scope.SelectedFileForUpload[i].SODId = $scope.SelectedFileForUpload[i].ArtFileName;
            // $scope.SelectedFileForUpload[i].SODId = $scope.IWOItemList.find(x => x.ItemId == $scope.SelectedFileForUpload[i].ItemId).SalesOrderDetailId;
            $scope.SelectedFileForUpload[i].ItemCode = $scope.IWOItemList.find(x => x.ItemId == $scope.SelectedFileForUpload[i].ItemId).Barcode;
            $scope.SelectedFileForUpload[i].ArtFileName = $scope.SelectedFileForUpload[i].ArtFileName;

            $scope.ArtWorkFileName = $scope.SelectedFileForUpload[i].ArtFileName;

            //$scope.SelectedFileForUpload[i].SODId = $scope.IWOItemList.find(x => x.ItemId == $scope.SelectedFileForUpload[i].ItemId).SalesOrderDetailId;
            //$scope.SelectedFileForUpload[i].ItemCode = $scope.IWOItemList.find(x => x.ItemId == $scope.SelectedFileForUpload[i].ItemId).Barcode;

            FileService.UploadFile($scope.SelectedFileForUpload[i]).then(function (d) {
                //alert("upload successfull!!!");
                // console.log(d);

            }, function (e) {
                alert(e);
            });

        }




        var inv_InternalWorkOrderDetailList = [];
        for (var i = 0; i < iwoDetialList.length; i++) {
            if ($scope.btnSave != "Save") {
                iwoDetialList[i].FinishedItemAddAttId = iwoDetialList[i].FinishedItemId;
            }
            //var dDate = iwoDetialList[i].DeliveryDate.split("/");
            //var fData = new Date(dDate[2], dDate[1] - 1, dDate[0]);
            if (iwoDetialList[i].CategoryName == "Finished Goods" && iwoDetialList[i].SubCategoryName != "Barcode Ribbon (R)") {
                if (angular.isUndefined(iwoDetialList[i].ddlRollDirection)) {
                    iwoDetialList[i].RollDirection = "N/A";
                }



                var imgName = "";
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

                //if (iwoDetialList[i].ArtWork !== "") {

                //    if (typeof (iwoDetialList[i].ArtWork) != "string" || iwoDetialList[i].ArtWork != "") {
                //        var artWorkList = [];
                //        var artWorkConcat = '';
                //        var isArtWork = false;
                //        angular.forEach(iwoDetialList[i].ArtWork, function (adata) {


                //            if (adata.name != null) {
                              
                //                artWorkList.push('Art' + '_' + adata.SODId + '_' + adata.name);
                //                isArtWork = true;
                //            }

                //        });

                //        if (isArtWork) {
                //            artWorkConcat = artWorkList.join(',');
                //            imgName = artWorkConcat;
                //        } else {
                           
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


                if (iwoDetialList[i].ddlItem == null) {
                    $scope.hardwareItemId = 0;
                    $scope.ItemSaveCheckId = 0;
                } else {
                    $scope.ItemSaveCheckId = iwoDetialList[i].ddlItem.ItemId;
                    // $scope.hardwareItemId = iwoDetialList[i].FinishedItemId;;
                }

                var iwoOrderDetail = {

                    //ItemName: iwoDetialList[i].ItemName,
                    ItemDescription: iwoDetialList[i].ItemDescription,
                    ItemDescriptionTwo: iwoDetialList[i].ItemDescriptionTwo,
                    LabelBrandId: iwoDetialList[i].LabelBrandId,
                    LabelBrandName: iwoDetialList[i].LabelBrandName,
                    OrderUnitId: iwoDetialList[i].OrderUnitId,
                    ItemName: iwoDetialList[i].FinishedItemName,


                    InternalWorkOrderDetailId: iwoDetialList[i].InternalWorkOrderDetailId,
                    InternalWorkOrderId: iwoDetialList[i].InternalWorkOrderId,
                    FinishedItemAddAttId: iwoDetialList[i].FinishedItemAddAttId,
                    FinishedItemId: iwoDetialList[i].FinishedItemId,
                    //ItemAddAttId: iwoDetialList[i].CombinationList[0].ItemAddAttId,
                    ItemId: $scope.ItemSaveCheckId,
                    Core: parseFloat(iwoDetialList[i].ddlCore),
                    QtyPerRoll: iwoDetialList[i].QtyPerRoll,
                    RollDirection: iwoDetialList[i].ddlRollDirection,
                    DeliveryDate: iwoDetialList[i].DeliveryDate,
                    OrderQty: iwoDetialList[i].OrderQty,
                    SalesOrderDetailId: iwoDetialList[i].SalesOrderDetailId,
                    SalesOrderId: iwoDetialList[i].SalesOrderId,

                    CategoryName: iwoDetialList[i].CategoryName,

                    Ups: iwoDetialList[i].Ups,
                    Radius: iwoDetialList[i].Radius,
                    Color: iwoDetialList[i].Color,

                    DetailRemarks: iwoDetialList[i].DetailRemarks,

                    ArtWork: imgName,
                    ShowImg: true,
                    PaperTypeId: iwoDetialList[i].PaperTypeId,
                    PaperTypeName: iwoDetialList[i].PaperTypeName

                }
                inv_InternalWorkOrderDetailList.push(iwoOrderDetail);
            } else {


                var iwoOrderDetail = {
                    InternalWorkOrderDetailId: iwoDetialList[i].InternalWorkOrderDetailId,
                    InternalWorkOrderId: iwoDetialList[i].InternalWorkOrderId,
                    FinishedItemAddAttId: iwoDetialList[i].FinishedItemAddAttId,
                    SalesOrderId: iwoDetialList[i].SalesOrderId,

                    ItemDescription: iwoDetialList[i].ItemDescription,
                    ItemDescriptionTwo: iwoDetialList[i].ItemDescriptionTwo,
                    LabelBrandId: iwoDetialList[i].LabelBrandId,
                    LabelBrandName: iwoDetialList[i].LabelBrandName,
                    OrderUnitId: iwoDetialList[i].OrderUnitId,
                    ItemName: iwoDetialList[i].FinishedItemName,

                    FinishedItemId: iwoDetialList[i].FinishedItemId,
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
                    PaperTypeId: iwoDetialList[i].PaperTypeId,
                    PaperTypeName: iwoDetialList[i].PaperTypeName
                }

                inv_InternalWorkOrderDetailList.push(iwoOrderDetail);

            }


        }

        
        //var Date = $scope.internalWorkOrder.internalWorkOrderDate;
     
       // $scope.internalWorkOrder.InternalWorkOrderId; 
        $.ajax({
            url: "/InternalWorkOrder/Save",
            contentType: "application/json;charset=utf-8",
            type: "POST",
            data: JSON.stringify({ inv_InternalWorkOrder: $scope.internalWorkOrder, inv_InternalWorkOrderDetailList: inv_InternalWorkOrderDetailList, DeleteForIWOIds: $scope.DeleteForIWOIdsList }),
            success: function (data) {
                $scope.isDisableDDl = false;

                AppNotificationLogPost('Internal WorkOrder Revise');
       

                var IwoIdsAndNo = data.split(",");
                var iwoIds = IwoIdsAndNo[1];
                var iwoId = Number(iwoIds);
                var IwoNo = IwoIdsAndNo[0];

                if (data != "") {
                    $scope.isDisableDDl = false;
                    if ($scope.btnSave != "Update") {

                     

                        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");

                        $cookieStore.put("IWOID", iwoIds);

                      /*  alertify.log(`<p style="color: #000000;">IWO NO : ${IwoNo}</p>` + status + ' Saved Successfully!', 'success', '5000');*/
                        alertify.log('IWO NO' + IwoNo + status + ' Successfully!', 'success', '5000');
                      /*  alertify.log('IWO No : ' + IwoNo + ' ' + status + ' Successfully!', 'success', '5000');*/

                        $('#iwCompany').select2('destroy');
                        $('#iwCompany').val('').select2({
                            placeholder: "Select Company"
                        });
                        $('#ddlPreparedBy').select2('destroy');
                        $('#ddlPreparedBy').val('').select2({
                            placeholder: "Receive By"
                        });
                        $('#ddlStoreSelect2').select2('destroy');
                        $('#ddlStoreSelect2').val('').select2({
                            placeholder: "Select Department For IWO"
                        });

                    }
                    if ($scope.btnSave == "Update") {
                        $scope.isDisableDDl = false;
                      


                        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");

                        $cookieStore.put("IWOID", iwoId);

                       /* alertify.log(`<p style="color: #000000;">IWO NO : ${IwoNo}</p>` + status + 'Saved Successfully!', 'success', '5000');*/
                        alertify.log('IWO NO' + IwoNo + status + ' Successfully!', 'success', '5000');
                        $('#iwCompany').select2('destroy');
                        $('#iwCompany').val('').select2({
                            placeholder: "Select Company"
                        });
                        $('#ddlPreparedBy').select2('destroy');
                        $('#ddlPreparedBy').val('').select2({
                            placeholder: "Receive By"
                        });
                        $('#ddlStoreSelect2').select2('destroy');
                        $('#ddlStoreSelect2').val('').select2({
                            placeholder: "Select Department For IWO"
                        });


                    }

                    Clear();
                   // GetPagedIwo(1);
                    $scope.internalWorkOrderForm.$setPristine();
                    $scope.internalWorkOrderForm.$setUntouched();

                }
            }, error: function (msg) {
                alertify.log('Server Save Errors!', 'error', '10000');
            }
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
            
          //  console.log(" $scope.sockQtyWithRequestQty", $scope.sockQtyWithRequestQty)

        });
    }

    // Check Stock 
    $scope.RawMatrialstockList = [];
    $scope.checkDdlStockRamatrial = function (itemId) {
        $scope.itemId = itemId;

        angular.forEach($scope.sockQtyWithRequestQty, function (aData) {

            if ($scope.itemId.ItemAddAttId == aData.ItemId) {
                var stockItem = {};
                stockItem.CurrentQuantity = aData.CurrentQuantity;
                stockItem.DepartmentName = aData.DepartmentName;
                $scope.stockList.push(stockItem);
                console.log('stockList', $scope.stockList);
            }
        });

    }


    $scope.getWorkOrderDetails = function (iwo) {
        //$('#ddlStoreSelect2').select2('destroy');
        //$('#ddlStoreSelect2').val(1078).select2();

        var currentDate = new Date();
        $scope.internalWorkOrder.InternalWorkOrderDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.inv_InternalOrderDetailList = [];
        $scope.inv_InternalOrderDetailListItem = [];

        console.log('Iwo Item', iwo);
        $http({
            url: '/SalesOrder/GetItemForIWO?salesOrderId=' + iwo.SalesOrderId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            var sOrdDate = iwo.SalesOrderDate.split("/");
            $scope.salesOrdDate = new Date(sOrdDate[2], (parseInt(sOrdDate[1]) - 1), sOrdDate[0]);

            $scope.internalWorkOrder.InternalWorkOrderNo = iwo.SalesOrderNo.replace("SO", "IWO");
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



               // var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + adata.ItemAddAttId).FirstOrDefault();
               // var checkCategory = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + ItemCombination.ItemId).FirstOrDefault();
                var Department = [];
                var currentQty = [];
              

                angular.forEach($scope.sockQtyWithRequestQty, function (data) {
                    if (adata.ItemAddAttId == data.ItemId) {

                        Department.push({ 'DepartmentName': data.DepartmentName });
                        currentQty.push({ 'CurrentQuantity': data.CurrentQuantity });

                    }

                });


                var dueDate = "";
                var res1 = adata.DueDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDueDate1 = new Date(parseInt(adata.DueDate.substr(6)));
                    var date1 = ($filter('date')(parsedDueDate1, 'MMM dd, yyyy')).toString();
                    dueDate = date1;
                }
                //var date = new Date();
                //dueDate = $filter('date')(date.toJSON().slice(0, 10), 'dd/MM/yyyy');


                if (adata.CategoryName === "Finished Goods" && adata.SubCategoryName != "Barcode Ribbon (R)") {
                    var CombinationList = [];
                    var RMaterialList = [];

                    RMaterialList.push(rawMaterial);



                    // var HeaderOfAttribute = ['Raw Material', 'Core (mm)', 'Qty Per Roll', 'Roll Direction', 'Delivery Date'];
                    var inv_InternalOrderDetai = {
                        //ItemId: ItemCombination.ItemId,
                        ItemId: adata.ItemId,
                        ItemName: adata.Combination,
                        UnitName: adata.UnitName,
                        FinishedItemAddAttId: adata.ItemId,
                        Barcode: adata.Barcode,
                        RawItemList: rawItemList,
                        QtyPerRoll: adata.UnitPerPackage,
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
                        disabled: true,

                    }
                    $scope.inv_InternalOrderDetailList.push(inv_InternalOrderDetai);
                    $scope.inv_InternalOrderDetailListItem.push(inv_InternalOrderDetai);

                    console.log('Iwo List Item', $scope.inv_InternalOrderDetailList);
                } else {
                    var HeaderOfAttribute = ["Delivery Date"];
                    var inv_InternalOrderDetai = {
                        // ItemId: ItemCombination.ItemId,
                        ItemId: 0,
                        ItemName: adata.Combination,
                        FinishedItemAddAttId: adata.ItemId,
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
                        QtyPerRoll: adata.UnitPerPackage,
                        DepartmentName: Department,
                        CurrentQuantity: currentQty,

                        HeaderOfAttribute: HeaderOfAttribute,
                        CategoryName: adata.CategoryName,
                        SubCategoryName: adata.SubCategoryName,
                        SalesOrderDetailId: adata.SalesOrderDetailId,
                        ArtWork: adata.ArtWork,
                        ShowImg: true,
                        ddlItem: adata.ItemAddAttId,
                        disabled: true,

                    }
                    $scope.inv_InternalOrderDetailList.push(inv_InternalOrderDetai);
                    $scope.inv_InternalOrderDetailListItem.push(inv_InternalOrderDetai);
                }
            });

            $("#txtPlaceOfDelivery").focus();
        });
    }



    //Update For IWO GetIWOAmendmentWithPassword

    $scope.itemIdGet = function () {
        $('.IwoToltipChange').tooltip('enable')
    }
    $scope.CheckToltip = function () {
        $('.IwoToltipChange').tooltip('enable')
    }

    $scope.GetIWOAmendmentWithPassword = function (password) {

        $('.IwoToltipChange').tooltip('enable')
       // $('.IwoToltipChange').tooltip({ boundary: 'window' })
        
       
        $scope.PurchaseOrderlist = [];
      

        document.getElementById("btnSave").disabled = false;
        $scope.inv_InternalOrderDetailListItem = [];
        $scope.internalWorkOrder = {};
        if (password=='') {
            password = null;
        }

     

        $http({
            url: '/ExpApproval/CheckDuplicate?approvalType=IWOAmendment&approvalPassword=' + password,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

           /* angular.forEach(data, function (DocId) {*/

              
           // });

                      

            if (data.length > 0) {

                $http({
                    url: '/InternalWorkOrder/inv_ExpAmendment_GetForEdit?approvalType=IWOAmendment&approvalPassword=' + password,
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (iwo) {
                  //  $scope.ddlSalesOrder = { SalesOrderNo: iwo[0].SalesOrderNo, SalesOrderId: iwo[0].SalesOrderId };
                    // $scope.ddlSalesOrder = { SalesOrderId: amData.SalesOrderId };
                        //angular.forEach($scope.iwoListForGrid, function (aSo) {

                        //    if (aSo.SalesOrderId == iwo[0].SalesOrderId) {
                        //        $scope.ddlSalesOrder = { SalesOrderId: iwo[0].SalesOrderId};
                        //        $scope.iwolist.push(aSo);
                        //    }
                        //})

                   //  $scope.iwolist = $scope.SalesOrderNoList.filter(sod => sod.SalesOrderId == iwo[0].SalesOrderId);
                   // $scope.ddlSalesOrder = { SalesOrderId: iwo[0].SalesOrderId };
                    $scope.internalWorkOrder.SalesOrderId = iwo[0].SalesOrderId;

                    $scope.internalWorkOrder.SalesOrderNo = iwo[0].SalesOrderNo;


                    $http({
                        //url: '/ExpInvoice/GetPOReference?DocType=' + iwo.SalesOrderId,
                        url: '/ExpInvoice/GetPOReference?DocType=SO' + "&DocumentId=" + iwo[0].SalesOrderId,
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
                        })


                    });


                    if (iwo.length > 0) {
                     
                    }
                    else {
                        alertify.log(' Password is not matched!', 'already', '5000');
                        $('#txtOtP').val('');
                        $scope.password = "";
                    }

         
                    // console.log(aSO);
                    angular.forEach(iwo, function (amData) {

                       


                        $scope.internalWorkOrder.InternalWorkOrderNo = amData.InternalWorkOrderNo;
                        //  $scope.internalWorkOrder.InternalWorkOrderDate = amData.InternalWorkOrderDate;
                        $scope.internalWorkOrder.PlaceOfDelivery = amData.PlaceOfDelivery;
                        $scope.internalWorkOrder.InternalWorkOrderId = amData.InternalWorkOrderId;
                        $scope.internalWorkOrder.SalesOrderId = amData.SalesOrderId;
                        $scope.internalWorkOrder.Remarks = amData.Remarks;


                        //$scope.internalWorkOrder.EmployeeId = amData.PreparedById;
                        // $scope.internalWorkOrder.EmployeeId = amData.PreparedById;
                        // $scope.internalWorkOrder.DepartmentId = amData.DepartmentId;
                        var res2 = amData.InternalWorkOrderDate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate1 = new Date(parseInt(amData.InternalWorkOrderDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            // amData.InternalWorkOrderDate = date1;
                            $scope.internalWorkOrder.InternalWorkOrderDate = date1;
                        }

                      


                        $('#ddlPreparedByRevise').select2('destroy');
                        $('#ddlPreparedByRevise').val(amData.PreparedById).select2();


                        $scope.ddlPreparedBy = Enumerable.From($scope.EmployeeList).Where("$.EmployeeId ==" + amData.PreparedById)
                            .FirstOrDefault();

                       
                        //$('#ddlStoreSelect2').select2('destroy');
                        //$('#ddlStoreSelect2').val(amData.DepartmentId).select2();
                        $scope.ddlStore = { DepartmentId: amData.DepartmentId };

                        $('#IwReviseCompany').select2('destroy');
                        $('#IwReviseCompany').val(amData.CompanyId).select2();

                        //$('#IwFilterSalesOrder').select2('destroy');
                        //$('#IwFilterSalesOrder').val(amData.SalesOrderId).select2();
                        
                      

                        $http({
                            url: '/InternalWorkOrder/GetInternalWorkOrderDetailByInternalWorkOrderId?internalWorkId=' + amData.InternalWorkOrderId,
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' }
                        }).success(function (data) {
                            $scope.internalWorkOrder.PlaceOfDelivery = data[0].AddressDelivery;
                            $scope.isDisableDDl = false;


                           

                            angular.forEach(data, function (aData) {

                                if (aData.SalesOrderDetailId != 0 ) {
                                    $scope.SaveBtnFalseflag = false;
                                }

                              
                                if (aData.CanRemoveItem == 0) {
                                    $scope.CanRemoveItemFlag = false;
                                } else {
                                    $scope.CanRemoveItemFlag = true;
                                }
                                


                                $scope.updateImageSperate = '';
                                $scope.updateImageSperateList = '';
                                $scope.ImageNameTextList = "";
                                $scope.ImageNameTextListArray = [];
                                $scope.isImageShow = false;

                                if (iwo.InternalWorkOrderId != null) {
                                    $scope.isImageShow = true;
                                }

                                if (aData.ArtWork == undefined || aData.ArtWork == [""] || aData.ArtWork == "") {

                                    aData.ShowImg = true;
                                    angular.element(`input[id='imageUpdateName_${aData.ItemId}']`).val($scope.updateImageSperateList);
                                } else {
                                    aData.ShowImg = false;
                                    $scope.updateImageSperate = aData.ArtWork.split(',');
                                    $scope.updateImageSperateList = $scope.updateImageSperate.join();
                                    $scope.ImageNameTextList = $scope.updateImageSperate.join("  ,  ");

                                    $scope.ImageNameTextListArray = $scope.updateImageSperate;
                                    angular.element(`input[id='imageUpdateName_${aData.ItemId}']`).val($scope.updateImageSperateList);


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

                                var DeliveryDate = "";
                                var res2 = aData.DeliveryDate.substring(0, 5);
                                if (res2 == "/Date") {
                                    var parsedDate1 = new Date(parseInt(aData.DeliveryDate.substr(6)));
                                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                    aData.DeliveryDate = date1;
                                    DeliveryDate = aData.DeliveryDate;
                                }

                                if (aData.CategoryName === "Finished Goods" && aData.SubCategoryName != "Barcode Ribbon (R)") {

                                    aData.Core = aData.Core.toString();
                                    // aData.ItemId = aData.ItemId.toString();
                                    var itemObj = {
                                        UnitName: aData.UnitName,

                                        ItemName: aData.ItemName,
                                        ItemDescription: aData.ItemDescription,
                                        ItemDescriptionTwo: aData.ItemDescriptionTwo,
                                        LabelBrandId: aData.LabelBrandId,
                                        LabelBrandName: aData.LabelBrandName,
                                        OrderUnitId: aData.OrderUnitId,
                                        FinishedItemName: aData.FinishedItemName,

                                        InternalWorkOrderId: amData.InternalWorkOrderId,
                                        InternalWorkOrderDetailId: aData.InternalWorkOrderDetailId,
                                        SalesOrderDetailId: aData.SalesOrderDetailId,
                                        ItemId: $scope.rawItem.ItemId,
                                        SalesOrderId: $scope.internalWorkOrder.SalesOrderId,
                                        FinishedItemId: aData.FinishedItemId,
                                        ItemName: aData.ItemName,
                                        CategoryName: aData.CategoryName,
                                        Barcode: aData.Barcode,
                                        RawItemList: $scope.rawItemList,

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
                                        imageTextShow: $scope.ImageNameTextList,
                                        ShowImg: aData.ShowImg,
                                        disabled: true,
                                        isImageShow: $scope.isImageShow,
                                        PaperTypeId: aData.PaperTypeId,
                                        MaterialTypeName: aData.PaperTypeName,
                                        imageTextShowArray: $scope.ImageNameTextListArray,
                                        CanRemoveItem: aData.CanRemoveItem,
                                        IsVoid: aData.IsVoid
                                    }


                                    $scope.inv_InternalOrderDetailListItem.push(itemObj);
                                    // $scope.inv_InternalOrderDetailListItem.ddlItem = { ItemId: aData.ItemId };
                                } else {

                                    var itemObj = {

                                        UnitName: aData.UnitName,
                                        ItemName: aData.ItemName,
                                        ItemDescription: aData.ItemDescription,
                                        ItemDescriptionTwo: aData.ItemDescriptionTwo,
                                        LabelBrandId: aData.LabelBrandId,
                                        LabelBrandName: aData.LabelBrandName,
                                        OrderUnitId: aData.OrderUnitId,
                                        FinishedItemName: aData.FinishedItemName,

                                        InternalWorkOrderId: amData.InternalWorkOrderId,
                                        InternalWorkOrderDetailId: aData.InternalWorkOrderDetailId,
                                        SalesOrderDetailId: aData.SalesOrderDetailId,

                                        SalesOrderId: $scope.internalWorkOrder.SalesOrderId,
                                        FinishedItemId: aData.FinishedItemId,

                                        ItemName: aData.ItemName,
                                        CategoryName: aData.CategoryName,
                                        Barcode: aData.Barcode,
                                        RawItemList: $scope.rawItemList,
                                        ItemId: aData.ItemId,
                                        OrderQty: aData.OrderQty,
                                        QtyPerRoll: aData.QtyPerRoll,
                                        DeliveryDate: aData.DeliveryDate,
                                        DeliveryDate2: aData.DeliveryDate,

                                        DepartmentName: Department,
                                        CurrentQuantity: currentQty,
                                        Ups: aData.Ups,
                                        Radius: aData.Radius,
                                        Color: aData.Color,
                                        FinishedItemId: aData.FinishedItemId,
                                        DetailRemarks: aData.DetailRemarks,
                                        ddlRollDirection: aData.RollDirection,
                                        ddlCore: { ddlCore: aData.Core },
                                        ddlItem: { ddlItem: aData.ItemId },

                                        ArtWork: $scope.updateImageSperate,
                                        thumb: $scope.updateImageSperateList,
                                        imageTextShow: $scope.ImageNameTextList,
                                        ShowImg: aData.ShowImg,
                                        disabled: true,
                                        isImageShow: $scope.isImageShow,
                                        PaperTypeId: aData.PaperTypeId,
                                        MaterialTypeName: aData.PaperTypeName,
                                        imageTextShowArray: $scope.ImageNameTextListArray,
                                        CanRemoveItem: aData.CanRemoveItem,
                                        IsVoid: aData.IsVoid
                                    }

                                    $scope.inv_InternalOrderDetailListItem.push(itemObj);
                                }


                            //    console.log(' update Push inv_InternalOrderDetailList', $scope.inv_InternalOrderDetailListItem);

                               
                                });

                            // }
                        });


                    });

                });
            }
            else {

                alertify.log(' Password is not matched!', 'already', '5000');
                $('#txtOtP').val('');
               
            }


        });

        $scope.password = "";

        $('.tooltipAll').tooltip({ boundary: 'window' })
        $('#tooltipAll').tooltip({ boundary: 'window' })

      
    }

    $scope.ItemAttrList = [];

    $scope.SalesOrderDetailListForItem = [];

    //ItemResetForSalesOrder();


    function ItemResetForSalesOrder() {
        $scope.SalesOrderDetailListForItem = [];

        if ($scope.internalWorkOrder.SalesOrderId != undefined || $scope.internalWorkOrder.SalesOrder !=0) {

            $scope.SalesOrderDetailListForItem = []
            $http({
                url: '/InternalWorkOrder/IWOItemResetWithGetBySOItemLoad?SalesOrderId=' + $scope.internalWorkOrder.SalesOrderId,
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
                    //var rawItemList = [];

                    //rawItemList = Enumerable.From($scope.AllRawMaterialAndCombination)
                    //    .Select(function (x) {
                    //        return {
                    //            'ItemName': x['ItemName'],
                    //            'Combination': x['Combination'],

                    //            'ItemId': x['ItemId']
                    //        };
                    //    }).ToArray();



                    //  var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + adata.FinishedItemId).FirstOrDefault();
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
                    //var date = new Date();
                    //dueDate = $filter('date')(date.toJSON().slice(0, 10), 'dd/MM/yyyy');


                    if (adata.CategoryName === "Finished Goods" && adata.SubCategoryName != "Barcode Ribbon (R)") {
                        var CombinationList = [];
                        var RMaterialList = [];

                        RMaterialList.push(rawMaterial);


                        $scope.rawMatrialDDlList = [];

                        //angular.forEach(rawItemList, function (raw) {
                        //    $scope.rawMatrialDDlList.push({ id: raw.ItemId, label: raw.Combination });
                        //});


                        // var HeaderOfAttribute = ['Raw Material', 'Core (mm)', 'Qty Per Roll', 'Roll Direction', 'Delivery Date'];
                        var inv_InternalOrderDetai = {
                            //ItemId: ItemCombination.ItemId,
                            ItemId: adata.FinishedItemId,
                            FinishedItemId: adata.FinishedItemId,
                            // ItemName: ItemCombination.Combination,

                            ItemName: adata.ItemName,
                            ItemDescription: adata.ItemDescription,
                            ItemDescriptionTwo: adata.ItemDescriptionTwo,
                            LabelBrandId: adata.LabelBrandId,
                            LabelBrandName: adata.LabelBrandName,
                            OrderUnitId: adata.OrderUnitId,
                            FinishedItemName: adata.FinishedItemName,
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
                            PaperTypeId: adata.MaterialTypeId,
                            iframeImage: "..//UploadedFiles//ArtWork//Art_0_m2r.jpg",
                            IsVoid: adata.IsVoid
                        }
                        // $scope.inv_InternalOrderDetailList.push(inv_InternalOrderDetai);
                        //$scope.inv_InternalOrderDetailListItem.push(inv_InternalOrderDetai);
                        $scope.SalesOrderDetailListForItem.push(inv_InternalOrderDetai);


                      //  console.log('Iwo List Item', $scope.inv_InternalOrderDetailList);
                    } else {
                        var HeaderOfAttribute = ["Delivery Date"];
                        var inv_InternalOrderDetai = {
                            // ItemId: ItemCombination.ItemId,
                            ItemId: 0,
                            //  ItemName: ItemCombination.Combination,
                            ItemName: adata.ItemName,
                            ItemDescription: adata.ItemDescription,
                            ItemDescriptionTwo: adata.ItemDescriptionTwo,
                            LabelBrandId: adata.LabelBrandId,
                            LabelBrandName: adata.LabelBrandName,
                            OrderUnitId: adata.OrderUnitId,
                            FinishedItemName: adata.FinishedItemName,
                            UnitName: adata.UnitName,

                            // FinishedItemAddAttId: ItemCombination.ItemId,
                            FinishedItemAddAttId: adata.FinishedItemId,
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
                            PaperTypeId: adata.MaterialTypeId,
                            iframeImage: "..//UploadedFiles//ArtWork//Art_0_m2r.jpg",
                            IsVoid: adata.IsVoid
                        }
                        // $scope.inv_InternalOrderDetailList.push(inv_InternalOrderDetai);
                        // $scope.inv_InternalOrderDetailListItem.push(inv_InternalOrderDetai);
                        $scope.SalesOrderDetailListForItem.push(inv_InternalOrderDetai);
                    }





                });



                var RemomeItemList = $scope.inv_InternalOrderDetailListItem.filter(i => !$scope.SalesOrderDetailListForItem.includes(i.SalesOrderDetailId))

                if (RemomeItemList.length > 0) {
                    angular.forEach(RemomeItemList, function (ad) {
                        if (ad.InternalWorkOrderDetailId != undefined || ad.InternalWorkOrderDetailId != 0) {
                            ad.IsVoid = true;
                            $scope.DeleteForIWOIdsList.push(ad.InternalWorkOrderDetailId);
                        }

                    })
                }

                var TempAddItemList = $scope.inv_InternalOrderDetailListItem.filter(i => !$scope.SalesOrderDetailListForItem.includes(i.SalesOrderDetailId))

               // console.log(TempAddItemList);

                var AddItemList = $scope.SalesOrderDetailListForItem.filter(i => !$scope.inv_InternalOrderDetailListItem.includes(i.SalesOrderDetailId))



               // console.log(AddItemList);

                angular.forEach(AddItemList, function (addItem) {
                    angular.forEach(TempAddItemList, function (aTemp) {
                        if (addItem.SalesOrderDetailId == aTemp.SalesOrderDetailId) {
                            addItem.QtyPerRoll = aTemp.QtyPerRoll;

                            addItem.OrderQty = addItem.OrderQty;
                            addItem.ddlCore = aTemp.ddlCore;
                            addItem.ddlRollDirection = aTemp.ddlRollDirection;
                            addItem.Ups = aTemp.Ups;
                            addItem.Radius = aTemp.Radius;
                            addItem.Color = aTemp.Color;
                            addItem.DetailRemarks = aTemp.DetailRemarks;
                            addItem.imageTextShowArray = aTemp.ArtWork;
                            addItem.ArtWork = aTemp.ArtWork;
                        }
                    });
                });

                $scope.inv_InternalOrderDetailListItem = AddItemList


                $("#txtPlaceOfDelivery").focus();
            });
        }



        

    }

    $scope.IsResetBtn = true;
    $scope.IWOItemResetWithGetSOItemLoad = function () {
        ItemResetForSalesOrder();
       
  }

   
    function GetAllDepartment() {
        $http({
            url: '/Department/GetAllDepartment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (department) {
            $scope.DepartmentListGetAll = department;
            
            //console.log("Department", $scope.DepartmentListGetAll);

        })

    }


    $scope.departmentForIwoSet = function (deptId) {
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
           // console.log('Iwo Data', data);
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

    

    $scope.RemoveProduct = function (ProductDtlRow) {
        $scope.IsResetBtn = true;
        $scope.DeleteForIWOIdsList.push(ProductDtlRow.InternalWorkOrderDetailId);
        var ind = $scope.inv_InternalOrderDetailListItem.indexOf(ProductDtlRow);
        $scope.inv_InternalOrderDetailListItem.splice(ind, 1);

      
        //var ind = $scope.inv_InternalOrderDetailListItem.indexOf(ProductDtlRow);
        //$scope.inv_InternalOrderDetailListItem.splice(ind, 1);
        // console.log($scope.inv_InternalOrderDetailListItem);

        //if (ProductDtlRow.InternalWorkOrderDetailId == undefined || ProductDtlRow.InternalWorkOrderDetailId == 0) {
        //    if ($scope.inv_InternalOrderDetailListItem.length > 1) {
        //var ind = $scope.inv_InternalOrderDetailListItem.indexOf(ProductDtlRow);
        //$scope.inv_InternalOrderDetailListItem.splice(ind, 1);
        //$scope.DeleteForIWOIdsList = [];


                //  alertify.confirm().destroy();
        //        return;
        //    }

        //}
        //if ($scope.inv_InternalOrderDetailListItem.length > 1) {
        //    alertify.confirm("Are you sure to delete?", function (e) {
        //        if (e) {
        //            var ind = $scope.inv_InternalOrderDetailListItem.indexOf(ProductDtlRow);
        //            $scope.inv_InternalOrderDetailListItem.splice(ind, 1);

        //            $http.get('/InternalWorkOrder/IWOItemUpdatedForDelete?internalWorkDetailId=' + ProductDtlRow.InternalWorkOrderDetailId).success(function (data) {
        //                if (data > 0) {
        //                    alertify.log('Deleted Successfully!', 'success', '5000');
        //                }
        //            }).error(function (data) {
        //                alertify.log('Server Errors!', 'error', '5000');
        //            });
        //        }

        //    });
        //}
        //else {
        //    alertify.log("At least  One Item Manadatory", 'error', '5000');
        //}

       
    }

    $scope.saveInternalWorkOrder = function () {
        //$scope.isValidForSave = true;
        //var dateText = $scope.internalWorkOrder.InternalWorkOrderDate;
        var isSalesOrderDetailId = false;
        //var date = $scope.internalWorkOrder.InternalWorkOrderDate.split("/")
        //var f = new Date(date[2], date[1] - 1, date[0]);

        //if (f < $scope.salesOrdDate) {
        //    //$scope.internalWorkOrder.InternalWorkOrderDate = dateText;
        //    alertify.log('IWO date cannot before Sales Order Date!', 'error', '5000');
        //    return;
        //}

        //if (iwoDetialList[i].SalesOrderDetailId == 0) {

        //    ReviseTempIWOList.push(iwoDetialList[i]);
        //    isSalesOrderDetailId = true;
        //}

        //var iwoDetialList = [];
        //angular.forEach($scope.inv_InternalOrderDetailListItem,function (aData) {
           
        //    if (aData.SalesOrderDetailId != 0) {
        //        iwoDetialList.push(aData);
        //    }
        //})


        var isSalesOrderDetailId = true;

        var iwoDetialList = $scope.inv_InternalOrderDetailListItem;
        var ItemTemIwoList = [];
        if (iwoDetialList.length != 0) {

            for (var i = 0; i < iwoDetialList.length; i++) {

                if (iwoDetialList[i].SalesOrderDetailId == 0) {
                    isSalesOrderDetailId = false;
                    $scope.IsResetBtn = false;
                }

                if (iwoDetialList[i].SalesOrderDetailId != 0) {
                    ItemTemIwoList.push(iwoDetialList[i]);
                    $scope.IsResetBtn = true;
                }

                

                //if (iwoDetialList[i].CategoryName == "Finished Goods" && iwoDetialList[i].SubCategoryName != "Barcode Ribbon (R)" &&
                //    (angular.isUndefined(iwoDetialList[i].ddlCore) || iwoDetialList[i].ddlCore == null ||
                //        angular.isUndefined(iwoDetialList[i].ddlItem) || iwoDetialList[i].ddlItem == null ||
                //        angular.isUndefined(iwoDetialList[i].ddlRollDirection) || iwoDetialList[i].ddlRollDirection == null ||
                //        iwoDetialList[i].Core < 1 || iwoDetialList[i].QtyPerRoll < 1 || angular.isUndefined(iwoDetialList[i].QtyPerRoll) ||
                //        iwoDetialList[i].OrderQty < 1 || angular.isUndefined(iwoDetialList[i].DeliveryDate))) {
                   

                //    break;
                //}
             

            }

           
           // if ($scope.IsResetBtn) {

                if (isSalesOrderDetailId) {

                    alertify.confirm("Are you sure to save?", function (e) {
                        if (e) {
                            SaveIWO(ItemTemIwoList);
                            
                            //var test = ItemTemIwoList;
                            //document.getElementById("IwReviseCompany").disabled = false;
                            $('#IwReviseCompany').select2('destroy');
                            $('#IwReviseCompany').val('').select2({
                                placeholder: "Select Company"
                            });
                            $('#ddlPreparedByRevise').select2('destroy');
                            $('#ddlPreparedByRevise').val('').select2({
                                placeholder: "Receive By"
                            });

                            //$('#ddlStoreSelect2').select2('destroy');
                            //$('#ddlStoreSelect2').val('').select2({
                            //    placeholder: "Select Department For IWO"
                            //});
                        }
                    });



                } else {
                    alertify.log('Sales Order Item has changed, Please reset or Remove item first !', 'error', '5000');
                }


            //} else {
            //    alertify.log('False Item Must be remove!', 'error', '5000');
            //}

           
            
                     
        }
        else {
                alertify.log('Item List Not Found', 'error', '5000');
       }


    }



    

    $scope.resetForm = function () {


       /// document.getElementById('ResetForItem').disabled = true;
        document.getElementById('btnSave').disabled = true;
        //$scope.ddlPreparedBy = null;
        //$scope.ddlStore = null;
        //$scope.ddlInternalWorkOrder = null;
        //setTimeout(function () {
        //    $("#IwReviseCompany").select2({
        //        placeholder: "Select Company"
        //    }).val('').trigger("change");

        //}, 0);

        $scope.PurchaseOrderlist = [];

        $('#IwReviseCompany').select2('destroy');
        $('#IwReviseCompany').val('').select2({
            placeholder: "Select Company"
        });

        $('#ddlPreparedByRevise').select2('destroy');
        $('#ddlPreparedByRevise').val('').select2({
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

      //  document.getElementById("IwFilterSalesOrder").disabled = true;
       // document.getElementById("IwReviseCompany").disabled = false;
       // document.getElementById("ddlStoreSelect2").disabled = false;
        $scope.btnSave = "Save";
        // Clear();
        //$scope.internalWorkOrderForm.$setPristine();
        //$scope.internalWorkOrderForm.$setUntouched();
    }


    //$("body").on("focus", "[id=IWODetailsTable] .DeliveryDatePicker", function () {
    //    $(this).datepicker({
    //        autoclose: true,
    //        todayHighlight: true,
    //        format: 'dd/mm/yyyy'
    //    });

    //});

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
    
    

    //$scope.OpenReport = function (InternalWorkOrderId) {
    //    $window.open("/ErpReports/RV_inv_InternalWorkOrderByInternalWorkOrderId.aspx?internalWorkOrderId=" + InternalWorkOrderId, "_blank", "width=1150,height=630,left=125,top=25");
    //    event.stopPropagation();
    //}


    $scope.OpenReport = function (iwoId) {
        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");
        sessionStorage.setItem("IWOID", JSON.stringify(iwoId));
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
                    deleteFile(fileName);


                }
                $http({
                    url: '/InternalWorkOrder/InternalWorkOrderDetail_For_UpdateArtWork?internalWorkOrderDetailId=' + $scope.inv_InternalOrderDetailListItem[id].InternalWorkOrderDetailId,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {

                });


            }



            $scope.inv_InternalOrderDetailListItem[id].thumb = '';

            $scope.inv_InternalOrderDetailListItem[id].ArtWork = '';
            $scope.inv_InternalOrderDetailListItem[id].imageTextShow = '';
            $scope.inv_InternalOrderDetailListItem[id].imageTextShowArray = '';

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
        var incrementNumberOfImage = 0;
        $scope.MultipleImageListFilter = [];
        $scope.MultipleImageList = [];
        $scope.isUpdateImage = false;
        //= data.files[0];






        var isUpdateImgHide = false;
        var id = data.id.split("_");

        id = id[id.length - 1];

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
        var SelectedFileForUploadNameConcat = '';
        $scope.ImageListName = '';
        var SelectedFileForUploadNameList = [];


        $scope.SelectedFileForUpload = $scope.SelectedFileForUpload.filter(x => {
            return x.SalesOrderDetailId != $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId;
        })
        console.log($scope.SelectedFileForUpload);


        for (var i = 0; i < data.files.length; i++) {

            var fileSize = data.files[i].size;
            var file = Math.round((fileSize / 1024));
            var fileMb = parseFloat(file / 1024);
            var fileName = data.files[i].name;

            //SelectedFileForUploadName.push('Art_' + $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId + '_' + data.files[i].name);
            //SelectedFileForUploadNameList.push('Art_' + $scope.inv_InternalOrderDetailListItem[id].SalesOrderDetailId + '_' + data.files[i].name);

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
                alertify.log('File is bigger than 25MB' + ' ' + fileName + ' ', 'error', '5000');
            }
        }

        SelectedFileForUploadNameConcat = SelectedFileForUploadName.join();
        $scope.ImageListName = SelectedFileForUploadNameList.join("    ,    ");

        /// Art_5646_b1,Art_3468_b2

        angular.forEach($scope.MultipleImageListFilter, function (aData) {

            $scope.SelectedFileForUpload.push(aData);
            $scope.MultipleImageList.push(aData);
        });

        //var SelectedFile = Enumerable.From($scope.SelectedFileForUpload)
        //    .Where("$.ItemId == " + parseInt(ItemId)).FirstOrDefault();

        //var index = $scope.SelectedFileForUpload.indexOf(SelectedFile);
        //if (index > 0) {
        //    $scope.SelectedFileForUpload.splice(index, 1);
        //}






        //= data.files[0];
        var elem = document.getElementById(data.id);
        //console.log('elem', elem);

        $scope.inv_InternalOrderDetailListItem[id].ShowImg = true;



        $scope.imagesrc = [];
        $scope.inv_InternalOrderDetailListItem[id].thumb = [];
        for (var i = 0; i < data.files.length; i++) {
            var reader = new FileReader();
            reader.fileName = data.files[i].name;
            reader.onload = function (event) {
                var image = {};
                image.src = event.target.result;
                //$scope.imagesrc.push(image);
                $scope.inv_InternalOrderDetailListItem[id].thumb.push(image);

                $scope.$apply();
            }
            reader.readAsDataURL(data.files[i]);
        }



        // 
        //$scope.inv_InternalOrderDetailListItem[id].thumb = $scope.imagesrc;

        //for (var i = 0; i < $scope.imagesrc.length; i++) {
        //    $scope.inv_InternalOrderDetailListItem[id].thumb = $scope.imagesrc[i].src;
        //}


        //if (typeof (FileReader) != "undefined") {
        //    //var reader = new FileReader();

        //    //reader.onload = function (e) { 
        //    //    $scope.$apply(function () {
        //    //        $scope.inv_InternalOrderDetailListItem[id].thumb = e.target.result;

        //    //    });
        //    //};


        //    //reader.readAsDataURL(elem.files[0]);




        angular.element(`input[id='imageName_${id}']`).val(SelectedFileForUploadNameConcat);
        angular.element(`p[id='imageNameList_${id}']`).text($scope.ImageListName);


        angular.element(`input[id='imageUpdateName_${id}']`).val(null);



        //} else {
        //    alert("This browser does not support FileReader.");
        //}


    }


    $scope.deleteFile = function (FileName) {
        deleteFile(FileName);

    };



    function deleteFile(FileName) {
        $http({
            url: '/Item/ArtDeleteFile?FileName=' + FileName,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //$scope.IwoDdlFilterList = data;
            alert("success");
        })

    }



}).factory('FileService', function ($http, $q) { // explained abour controller and service in part 2

    var fac = {};
    fac.UploadFile = function (file) {
        var formData = new FormData();
        formData.append("file", file);
        var defer = $q.defer();
        //var SODId = $scope.IWOItemList[file.index].SalesOrderDetailId;
        //var ItemCode = $scope.IWOItemList[file.index].Barcode;
        $http.post("/Item/SaveFiles?SODId=" + file.SODId + '&ArtFileName=' + file.ArtFileName, formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
            .then(function (d) {
                defer.resolve(d);
              //  console.log('Update', d);
            });


        return defer.promise;

    }

    return fac;

});

