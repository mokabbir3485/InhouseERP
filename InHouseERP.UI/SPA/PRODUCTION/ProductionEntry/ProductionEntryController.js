app.controller("ProductionEntryController", function ($scope, $cookieStore, $http, $window, $filter, $rootScope) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    //$scope.BranchId = $scope.LoginUser.BranchId;

      $scope.BranchAddress ="Address";
     $cookieStore.put('BranchAddress', $scope.BranchAddress);
   
    //var UserData = sessionStorage.getItem("UserDataSession");
    //if (UserData != null) {
    //    $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    //}

    //console.log("LoginUser",$scope.LoginUser);

    Clear();
 

    function Clear() {

     
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            console.log($scope.LoginUser);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Production Entry').ScreenId;
        //    GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Production Entry').ScreenId;
        //        GetUsersPermissionDetails();
        //    }, 500);
        //}


        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Production Entry').ScreenId;
        GetUsersPermissionDetails();


        $scope.countLoding = 1;
        $scope.IsLoading = true;
      

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForProduction($scope.currentPage);
        
        $scope.productionListForGrid = [];

       // $scope.LoginUser = $cookieStore.get('UserData');
        //$scope.UserId = $scope.LoginUser.UserId;
       // $scope.ScreenId = $cookieStore.get('ProductionEntryScreenId');
        $scope.ddlStore = null;
        $scope.btnSave = "Save";
        $scope.found = true;
        $scope.Production = {};
        $scope.ProductionDetailList = [];
        $scope.VarietyList = [];
        $scope.AllCombinationlist = [];
        $scope.iwolist = [];
        $scope.AllRawMaterialAndCombination = [];
        //$scope.ConfirmationMessageForAdmin = false;
        //ScreenLock();
        //GetConfirmationMessageForAdmin();
        $scope.Production.ProductionDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
      
       // ProductionNumberAutoGenarator();
        $scope.Storelist = [];
        $scope.ItemUnitlist = [];
        GetAllItemUnit();
        GetInternalOrderDetailData();
      

        ProductionNumberAutoGenarator();

        GetByCombinationand();
        GetByCombinationLike();
        DepartmentGetByBranchAndDeptTypeId();

        //GetUsersPermissionDetails();

        GetAllEmployee();

        GetAllVariety();

        //$scope.productionDetail = {};
        //$scope.productionDetail.UsedMaterialQtyInRoll = 0;
        //$scope.productionDetail.UsedMaterialLengthinMeter = 0;
        //$scope.productionDetail.UsedMaterialWeigntInKg = 0;
        //$scope.productionDetail.UsedMaterialAreaInSqm = 0;
        //$scope.ddlWastageItemUnit = { ItemUnitId: 1 };
        //$scope.ddlProductionItemUnit = { ItemUnitId: 1 };
        // $scope.ddlProductionItemUnit = { ItemUnitId: 1 };
        $scope.machineList = [];
        GetAllMachine();
        $scope.ddlMachine = null;
        $scope.ddlAllIwoData = null;

        GetByCombinationand();
        $scope.AllCombinationlistWithPriceList = [];
        $scope.AllCombinationlistWithPriceListRaw = [];
   

        $scope.productionDetail = {};
        $scope.ProductionDetailListUpdateArray = [];

        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];
        $scope.EmailSendNotification = {};
        $scope.ProductionDetailList = [];
        $scope.ProductionWiseIwoListDistinct = [];
        $scope.DepartmentWiseStockList = [];

        $scope.matrialPaperTypeList = [];
        GetAllmatrialpaperType();
    }
    function formatOutput(optionElement) {
        //if (!optionElement.id) { return optionElement.text; }
        var ItemCombination = '';
        var DescriptionPart = optionElement.text.split('Production No: ');
        var ProductionNo = DescriptionPart[1];
        if (ProductionNo != undefined) {
            if (ProductionNo != '') {
                ItemCombination = '<strong style="background-color: #dd4b39; color: white;">' + DescriptionPart[0] + 'Production No: ' + DescriptionPart[1] + '</strong>';
            } else {
                //ItemCombination = DescriptionPart[0] + 'Production No: ' + DescriptionPart[1];
                ItemCombination = DescriptionPart[0]
            }
        }


        var $state = $(
            '<span>' + ItemCombination + '</span>'
        );
        return $state;
    };

    $("#ddlAllIwoSelect2").select2({
        placeholder: "Select Iwo",
        //theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });
    function GetAllmatrialpaperType() {

        $http({
            url: '/MaterialType/GetAllMaterialType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data, function (aData) {
                aData.Combination = aData.MaterialTypeName + ' ~ ' + aData.MaterialTypeCode
                $scope.matrialPaperTypeList.push(aData);
            })

        });
    }

    //function ReportNotificationDetail_Get() {


    //    $http({
          
    //        url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'SITC',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (notification) {
    //        $scope.ReportNotificationDetailList = notification;


    //        console.log('$scope.ReportNotificationDetailList', $scope.ReportNotificationDetailList);
    //    });

    //}

    function ReportNotificationDetail_Get() {


        $http({
            //  url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'IWO',
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'Production',
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
                    obj.NotificationDetail = ' Production No :' + $scope.Production.ProductionNo + ' : ' + $scope.ddlAllIwoData.combination + ' Employee Name : ' + $scope.LoginUser.FullName;
                    $scope.AppNotificationLogList.push(obj);


                }
            } else {
               
                obj.NotificationDetail = ' Production No :' + $scope.Production.ProductionNo + ' : ' + $scope.ddlAllIwoData.combination + ' Employee Name : ' + $scope.LoginUser.FullName;
                $scope.AppNotificationLogList.push(obj);
            }



        })


        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) { });
    }

   

    $scope.OpenReport = function () {
        //$scope.ddlIwoId;

        var iwoId = 0;
        if ($scope.ddlAllIwoData.InternalWorkOrderId == 0 || $scope.ddlAllIwoData.InternalWorkOrderId == undefined || $scope.ddlAllIwoData.InternalWorkOrderId == null) {
            iwoId = $scope.ddlAllIwoData.InternalWorkOrderId;
        } else {
            iwoId = $scope.ddlAllIwoData.InternalWorkOrderId;
        }
        $cookieStore.put("IWOID", iwoId);
        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80"); 
        event.stopPropagation();
    }

    $scope.RedirectItemEntry = function () {
        // $location.path('/Home/Index/ItemEntry');
        $window.location.href = '/Home/Index#/ItemEntry';
    }

    function GetByCombinationand() {
      
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllCombinationlistWithPriceList = JSON.parse(data);
            console.log(" $scope.AllCombinationlistWithPriceList", $scope.AllCombinationlistWithPriceList);

            angular.forEach(JSON.parse(data), function (adata) {
                if (adata.CategoryName == "Raw Materials") {
                    $scope.AllCombinationlistWithPriceListRaw.push(adata);
                    console.log(" $scope.AllCombinationlistWithPriceListRaw", $scope.AllCombinationlistWithPriceListRaw);
                }
            })
            
        })

    }


    function GetAllMachine() {
        $http({
            url: "/Production/GetAllMachine",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.machineList = data;
            console.log($scope.machineList);
          
       });
    }


    function GetAllItemUnit() {
        $http({
            url: "/Unit/GetAllUnit",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
          
            angular.forEach(data,function (aData) {

                if (aData.ItemUnitId == 1 || aData.ItemUnitId == 2 ) {
                    $scope.ItemUnitlist.push(aData);
                }
               

                console.log("Unit",$scope.ItemUnitlist);
            })
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

      function DepartmentGetByBranchAndDeptTypeId() {
        $http({

           // url: '/Department/DepartmentGetByBranchAndDeptTypeId?departmentTypeIds=' +'4' + "&branchId=" + $scope.LoginUser.BranchId,
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                //if (aData.DepartmentName.match("/Production/gi")) {
                //    aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                //    $scope.Storelist.push(aData);
                //}

                if (aData.DepartmentName.match(/Production/gi)) {
                    aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                    $scope.Storelist.push(aData);
                }
            })

        });
    }


    //function GetAllStore() {
    //    $http({
    //        url: '/User/GetUserStoreByUserId?userId=' + $scope.LoginUser.UserId,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (userOutletList) {
    //        $scope.Storelist = userOutletList;
    //        if ($scope.Storelist.length == 1) {
    //            $scope.ddlStore = { 'DepartmentId': $scope.Storelist[0].DepartmentId };
    //            $scope.Production.DepartmentId = $scope.Storelist[0].DepartmentId;
    //            $scope.Production.DepartmentName = $scope.Storelist[0].DepartmentName;
    //        }
    //    });
    //}
   

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            $scope.ddlPreparedBy = { EmployeeId: $scope.LoginUser.EmployeeId };
            
        });
    }
  
    function GetInternalOrderDetailData() {
        //var criteria = "IsApproved=1 AND ([InternalWorkOrderId] NOT IN (SELECT [InternalWorkOrderId] FROM pro_Production)) AND ([InternalWorkOrderId] IN (SELECT DISTINCT [InternalWorkOrderId] FROM inv_Requisition R WHERE RequisitionId IN (SELECT RequisitionId FROM inv_StockIssue WHERE RequisitionId=R.RequisitionId))) AND (SELECT COUNT(*) FROM inv_InternalWorkOrderDetail D WHERE D.InternalWorkOrderId=IWO.InternalWorkOrderId AND D.ItemId>0)>0";
        //var criteria = "IsApproved=1 AND ([InternalWorkOrderId] NOT IN (SELECT [InternalWorkOrderId] FROM pro_Production)) AND ([InternalWorkOrderId] IN (SELECT DISTINCT [InternalWorkOrderId] FROM inv_Requisition R WHERE RequisitionId IN (SELECT RequisitionId FROM inv_StockIssue WHERE RequisitionId=R.RequisitionId))) AND (SELECT COUNT(*) FROM inv_InternalWorkOrderDetail D INNER JOIN ad_Item I ON D.FinishedItemId = I.ItemId INNER JOIN ad_ItemSubCategory SC ON I.SubCategoryId = SC.SubCategoryId WHERE D.InternalWorkOrderId=IWO.InternalWorkOrderId AND D.ItemId>0 AND SC.CategoryId <> 2)>0";
        $http({
            url: "/InternalWorkOrder/inv_InternalWorkOrder_ForProduction",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ProductionWiseIwoListDistinct = Enumerable.From(data)
                .Distinct(function (x) {
                    return x.InternalWorkOrderId
                }).ToArray();

            if (data.length > 0) {
                angular.forEach(data, function (aIwo) {
                    var res1 = aIwo.InternalWorkOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aIwo.InternalWorkOrderDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aIwo.InternalWorkOrderDate = date1;
                    }
                })
            }
            angular.forEach($scope.ProductionWiseIwoListDistinct,function (aData) {
                var combination = {};
                //aData.combination = " IWO No : " + aData.InternalWorkOrderNo + " ~ CName : " + aData.CompanyName + " ~ IWO Date : " + aData.InternalWorkOrderDate + " ~ PofDelivery : " + aData.PlaceOfDelivery;
                aData.combination = " IWO No : " + aData.InternalWorkOrderNo + " ~ CName : " + aData.CompanyName + " ~ Production No: " + aData.ProductionNo;
                $scope.iwolist.push(aData);

            });
            $scope.iwolist.sort((a, b) => (
                (a.ProductionNo !== '') - (b.ProductionNo !== '')
                //|| a.state - b.state
                //|| b.category_id - a.category_id
            ));
            
        });
    }

    function GetByCombinationLike() {
        $http({
            url: '/Item/GetByCombinationLike',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            var jsonData = JSON.parse(data);
            $scope.AllRawMaterialAndCombination = Enumerable.From(JSON.parse(data))
                                                  //.Distinct("$.ItemName")
                                                 // .Where("$.CategoryName =='Finished Goods'")
                                                  .OrderBy("$.ItemName")
                .ToArray();
            
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

    function GetAllVariety() {
        $http({
            url: "/Item/GetLimitedProperty",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.VarietyList = data;
            
        });
    }

    //function GetMaxProductionNo() {
    //    var date = $('#ProductionDate').val();
    //    if (date != "") {
    //        $http({
    //            url: '/Production/GetMaxProductionNo?deliveryDate=' + date,
    //            method: 'GET',
    //            headers: { 'Content-Type': 'application/json' }
    //        }).success(function (data) {
    //            $scope.found = false;
    //            $scope.Production.ProductionNo = parseInt(data);
    //        });
    //    } else {
    //        $('#ProductionDate').focus();
    //    }
    //}

    //$scope.ProductionNumberGenarator = function () {
    //    ProductionNumberAutoGenarator();
    //}
  
    function ProductionNumberAutoGenarator() {
       
                //var dateParts =
                //    ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                //var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
                $http({
                    url: '/Production/GetMaxProductionNo',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (ProductionNo) {
                    $scope.MaxProductionNo = ProductionNo;
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
                        $scope.Production.ProductionNo = 'PRO/' + $scope.finYearEPZ + '/' + $scope.MaxProductionNo;
                    });
                    

                });

            }
   

    ////Duplicacy check start

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

    function ValidProuductionQty(productionDetail) {
        if (angular.isUndefined(productionDetail.ProductionQuantity) || productionDetail.ProductionQuantity == null || productionDetail.ProductionQuantity <= 0) {
            return false;
        }
        var percentAmount = 10;
        var productionTenPrcntAmount = ((parseFloat(productionDetail.ProductionQtyForValidation) * percentAmount) / 100);
        var withTenPercentShort = ((parseFloat(productionDetail.ProductionQtyForValidation) - productionTenPrcntAmount));

        if (productionDetail.ProductionQuantity < withTenPercentShort) {
            productionDetail.ProductionQuantity = productionDetail.ProductionQtyForValidation;;
            return false;
        }
        var withTenPercentExtra = ((parseFloat(productionDetail.ProductionQtyForValidation) + productionTenPrcntAmount));

        if (productionDetail.ProductionQuantity > withTenPercentExtra) {
            productionDetail.ProductionQuantity = productionDetail.ProductionQtyForValidation;;
            return false;
        }
        return true;
    }

   

    function OnChangeRollAndPcesCalculation() {

    }

    $scope.resetForm = function () {
        $scope.ProductionDetailList = [];
        $('#ddlAllIwoSelect2').select2('destroy');
        $('#ddlAllIwoSelect2').val('').select2({
            placeholder: "Select IWO"
        });

        //$('#ddlStore').val(null).trigger('change');

        $scope.ProductionDetailList = [];
        //$('#ddlStore').select2('destroy');
        //$('#ddlStore').val('').select2({
        //    placeholder: "Stock In Store"
        //});

      //  $('#ddlPreparedBy').val(null).trigger('change'); 
        Clear();
        $scope.productionEntryForm.$setPristine();
        $scope.productionEntryForm.$setUntouched();
    }

    $scope.getMaxProductionNo = function () {
        GetMaxProductionNo();
    }

    $scope.CheckValidProductionQty = function (productionDetail) {
        //if (angular.isUndefined(productionDetail.ProductionQuantity) || productionDetail.ProductionQuantity == null || productionDetail.ProductionQuantity <= 0) {
        //    productionDetail.ProductionQuantity = productionDetail.ProductionQtyForValidation;
        //    alertify.log("Production Qty Can Not be </br><strong style='color:yellow;'>Less Than Or Equal Zero And Blank</strong>.", "error", "5000");
        //    return;
        //}
        //var percentAmount = 10;
        //var productionTenPrcntAmount = ((parseFloat(productionDetail.ProductionQtyForValidation) * percentAmount) / 100);
        //var withTenPercentExtra = ((parseFloat(productionDetail.ProductionQtyForValidation) + productionTenPrcntAmount));
        //var withTenPercentShort = ((parseFloat(productionDetail.ProductionQtyForValidation) - productionTenPrcntAmount));

        //if (productionDetail.ProductionQuantity < withTenPercentShort) {
        //    var con = confirm("Production Qty Allow Only " + percentAmount + "% Shortage. But Your Qty Seems Shortage More Than 10%. Are you sure to save?");

        //    if (!con) {
        //        var prodDetailObjt = Enumerable.From($scope.ProductionDetailList).Where("$.InternalWorkOrderDetailId==" + productionDetail.InternalWorkOrderDetailId).FirstOrDefault();
        //        prodDetailObjt.ProductionQuantity = prodDetailObjt.ProductionQtyForValidation;
        //    }
            //alertify.confirm("Production Qty Allow Only <strong> " + percentAmount + "% Shortage</strong>. </br>But Your Qty Seems Shortage More Than 10%.<br/>Are you sure to save?", function (e) {
            //    if (e) {
            //        var prodDetailObjt = Enumerable.From($scope.ProductionDetailList).Where("$.InternalWorkOrderDetailId==" + productionDetail.InternalWorkOrderDetailId).FirstOrDefault();
            //        prodDetailObjt.ProductionQuantity = productionDetail.ProductionQuantity;
            //    } else {                    
            //        productionDetail.ProductionQuantity = prodDetailObjt.ProductionQuantityForValidation;
            //    }
            //});

           // return;
      //  }
        //if (productionDetail.ProductionQuantity > withTenPercentExtra) {
        //    var con = confirm("Production Qty Allow Only " + percentAmount + "% Extra Production. But Your Qty Seems Extra Production More Than 10%. Are you sure to save?");

        //    if (!con) {
        //        var prodDetailObjt = Enumerable.From($scope.ProductionDetailList).Where("$.InternalWorkOrderDetailId==" + productionDetail.InternalWorkOrderDetailId).FirstOrDefault();
        //        prodDetailObjt.ProductionQuantity = prodDetailObjt.ProductionQtyForValidation;
        //        return;
        //    }
            //alertify.confirm("Production Qty Allow Only<strong> " + percentAmount + "% Extra Production</strong>. </br>But Your Qty Seems Extra Production More Than 10%.<br/>Are you sure to save?", function (e) {
            //    if (e) {
            //        productionDetail.ProductionQuantity = productionDetail.ProductionQuantity;
            //    } else {
            //        var prodDetailObjt = Enumerable.From($scope.ProductionDetailList).Where("$.InternalWorkOrderDetailId==" + productionDetail.InternalWorkOrderDetailId).FirstOrDefault();
            //        prodDetailObjt.ProductionQuantity = prodDetailObjt.ProductionQuantityForValidation;
            //    }
            //});

       // }
    }
   
   
    $scope.RefreshDdlStore = function (iwo) {
        $scope.ddlStore = null;

        if (iwo.ProductionNo != '') {
            alertify.confirm("<b style='color:red;'>" + iwo.ProductionNo + "</b>" + "<span> This Production has already been made by this IWO.</span>", function (e) {
                if (!e) {
                    $scope.ddlAllIwoData = null;
                    $("#ddlAllIwoSelect2").val('').select2({
                        placeholder: "Select IWO",

                    });
                }
            })

        }
    }

    $scope.getInternalWorkOrderDetails = function () {
        $scope.StockQty = 0;
        $scope.StockUnitName = "";

         if ($scope.ddlStore == null) {
            $scope.ProductionDetailListItem = [];
            $scope.ProductionDetailListItem = [];
            $scope.ProductionDetailList = [];
         
        }
        $scope.ProductionDetailListItem = [];
        $scope.ProductionDetailListItem = [];
        $scope.ProductionDetailList = [];
       
        if ($scope.ddlAllIwoData != null && $scope.ddlStore != null) {
          
      
            $http({
                url: "/InternalWorkOrder/GetInternalWorkOrderDetailByInternalWorkOrderIdForProduction?internalWorkId=" + $scope.ddlAllIwoData.InternalWorkOrderId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                console.log(data);
                $scope.Production.InternalWorkOrderId = $scope.ddlAllIwoData.InternalWorkOrderId;

             

               
                angular.forEach(data, function (adata) {

                    $scope.FinishedAndRibbonUnitId = 0;
                    if (JSON.stringify(adata.SubCategoryName.toLowerCase().match(/ribbon/g)) === '["ribbon"]') {
                        $scope.FinishedAndRibbonUnitId = 2;
                    } else {
                        $scope.FinishedAndRibbonUnitId = 1;
                    }

                       // var FinishedItem = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + adata.FinishedItemId).FirstOrDefault();

                       // var RawMaterialItem = Enumerable.From($scope.AllRawMaterialAndCombination).Where('$.ItemId==' + adata.ItemId).FirstOrDefault();

                       // if (RawMaterialItem == undefined) {
                           // RawMaterialItem = "";

                      //  }


                          if (adata.CategoryId !== 2) {

                            var ProductionDetail = {
                                UnitName: adata.UnitName,
                                RawUnitId: adata.RawUnitId,
                                RawUnitName: adata.RawUnitName,
                                RawMaterialTypeId: adata.RawMaterialTypeId,
                                RawMaterialTypeName: adata.RawMaterialTypeName,

                                FinishedItemName: adata.FinishedItemName,

                                QtyPerRoll: adata.QtyPerRoll,
                                RawMaterialItemName: adata.RawMaterialItem,
                                RawMaterialItemBarcode: adata.Barcode,
                                ItemId: adata.FinishedItemId,
                                Core: adata.Core,
                                UsedRoll: 0,
                                UsedRollMeter: 0,
                                UsedMaterialUnitCost: adata.UnitCost,
                                Wastage: 0,
                                WastageRemarks: "",
                                ProductionQuantity: adata.OrderQty,
                                ProductionQtyForValidation: adata.OrderQty,
                                InternalWorkOrderId: adata.InternalWorkOrderId,
                                InternalWorkOrderDetailId: adata.InternalWorkOrderDetailId,
                                ProductionDetailId: 0,
                                ProductionId: 0,
                                RawMatrialItemId: adata.ItemId,
                                PcPerRoll: adata.PcPerRoll,
                                MaterialTypeId: adata.MaterialTypeId,
                                LabelBrandId: adata.LabelBrandId,
                                LabelBrandName: adata.LabelBrandName,
                                MaterialTypeName: adata.MaterialTypeName,
                                ProductionQtyInRoll: 0,
                                WastageItemUnitId: { ItemUnitId: $scope.FinishedAndRibbonUnitId },
                                ProductionItemUnitId: { ItemUnitId: $scope.FinishedAndRibbonUnitId },

                                ddlMaterial: { MaterialTypeId: adata.MaterialTypeId },

                                SoUnitId: adata.OrderUnitId,

                                WastageQtyInRoll: 0,

                                UsedMaterialQtyInRoll: 0,
                                UsedMaterialWeigntInKg: 0,
                                UsedMaterialAreaInSqm: 0,
                                WastageQty: 0,
                                MaterialRollLengthInMeter: 0,

                                UsedMaterialLengthinMeterVal: adata.MaterialRollLengthInMeter,
                                UsedMaterialWeigntInKgVal: adata.RollWeightInKg,
                                UsedMaterialAreaInSqmVal: adata.MaterialRollAreaInSqMeter,
                                RequisitionQuantity: adata.RequisitionQuantity,
                                FGMaterialType: adata.FGMaterialType,
                                FGMaterialTypeId: adata.FGMaterialTypeId,
                                UsedMatrialVal: 0,
                                //CurrentStockQuantity: $scope.DepartmentWiseStock.CurrentQuantity,
                                //StockUnitName: $scope.DepartmentWiseStock.UnitName

                            }
                            $http({
                                /*  url: '/StockAdjustment/SearchCurrentQuantity?ItemId=' + adata.ItemId + '&depId=' + $scope.ddlStore.DepartmentId + '&MaterialTypeId=' + adata.MaterialTypeId,*/
                                url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + $scope.ddlStore.DepartmentId + "&ItemId=" + adata.ItemId + "&MaterialTypeId=" + adata.MaterialTypeId + "&LabelBrandId=" + null,
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' }
                            }).success(function (data) {
                                $scope.DepartmentWiseStockList = data;

                               
                                if ($scope.DepartmentWiseStockList.length == 0) {
                                    ProductionDetail.CurrentStockQuantity = 0;
                                    ProductionDetail.StockUnitName = 'N/A';
                                } else {
                                    ProductionDetail.CurrentStockQuantity = $scope.DepartmentWiseStockList[0].CurrentQuantity;
                                    ProductionDetail.TempCurrentStockQuantity = $scope.DepartmentWiseStockList[0].CurrentQuantity;
                                    ProductionDetail.StockItemId = $scope.DepartmentWiseStockList[0].ItemId;
                                    
                                    ProductionDetail.StockUnitName = $scope.DepartmentWiseStockList[0].UnitName;

                                }

                                ///////
                                $scope.PcPerRollConversion = 0;
                                $scope.IsFlag = false;
                                if (ProductionDetail.SoUnitId == 1) {
                                    $scope.PcPerRollConversion = Number((ProductionDetail.ProductionQuantity).toFixed(5))

                                }
                                else {
                                    $scope.PcPerRollConversion = Number((ProductionDetail.ProductionQuantity / ProductionDetail.QtyPerRoll).toFixed(5))
                                    $scope.IsFlag = true;
                                }

                                if (ProductionDetail.ProductionItemUnitId.ItemUnitId == 2) {
                                    ProductionDetail.ProductionQtyInRoll = ProductionDetail.ProductionQuantity;
                                }
                                else if (ProductionDetail.ProductionItemUnitId.ItemUnitId == 1) {
                                    var ProductionQty = 0;

                                    if (!$scope.IsFlag) {
                                        ProductionQty = ($scope.PcPerRollConversion / ProductionDetail.QtyPerRoll).toFixed(5)
                                        ProductionDetail.ProductionQtyInRoll = Number(ProductionQty);
                                    }
                                    else {
                                        ProductionQty = (ProductionDetail.ProductionQuantity / ProductionDetail.QtyPerRoll).toFixed(5)
                                        ProductionDetail.ProductionQtyInRoll = Number(ProductionQty);

                                    }

                                } else {
                                    ProductionDetail.ProductionQtyInRoll = 0;
                                }


                                if (ProductionDetail.WastageQtyInRoll == null || ProductionDetail.WastageQtyInRoll == undefined || ProductionDetail.WastageQtyInRoll == 0) {
                                    ProductionDetail.WastageQtyInRoll = 0;
                                }
                                if (ProductionDetail.WastageQty == 0 || ProductionDetail.WastageQty == null || ProductionDetail.WastageQty == undefined) {
                                    ProductionDetail.WastageQty = 0;
                                }


                                ProductionDetail.Machine = { MachineId: $scope.machineList[0].MachineId };
                                ProductionDetail.MachineId = $scope.machineList[0].MachineId;
                                ////
                                $scope.ProductionDetailList.push(ProductionDetail);

                                //angular.forEach($scope.ProductionDetailListItem, function (aData) {
                                    //$scope.PcPerRollConversion = 0;
                                    //$scope.IsFlag = false;
                                    //if (aData.SoUnitId == 1) {
                                    //    $scope.PcPerRollConversion = Number((aData.ProductionQuantity).toFixed(5))

                                    //}
                                    //else {
                                    //    $scope.PcPerRollConversion = Number((aData.ProductionQuantity / aData.QtyPerRoll).toFixed(5))
                                    //    $scope.IsFlag = true;
                                    //}

                                    //if (aData.ProductionItemUnitId.ItemUnitId == 2) {
                                    //    aData.ProductionQtyInRoll = aData.ProductionQuantity;
                                    //}
                                    //else if (aData.ProductionItemUnitId.ItemUnitId == 1) {
                                    //    var ProductionQty = 0;

                                    //    if (!$scope.IsFlag) {
                                    //        ProductionQty = ($scope.PcPerRollConversion / aData.QtyPerRoll).toFixed(5)
                                    //        aData.ProductionQtyInRoll = Number(ProductionQty);
                                    //    }
                                    //    else {
                                    //        ProductionQty = (aData.ProductionQuantity / aData.QtyPerRoll).toFixed(5)
                                    //        aData.ProductionQtyInRoll = Number(ProductionQty);

                                    //    }

                                    //} else {
                                    //    aData.ProductionQtyInRoll = 0;
                                    //}

                                    //if (aData.WastageQtyInRoll == null || aData.WastageQtyInRoll == undefined || aData.WastageQtyInRoll == 0) {
                                    //    aData.WastageQtyInRoll = 0;
                                    //}
                                    //if (aData.WastageQty == 0 || aData.WastageQty == null || aData.WastageQty == undefined) {
                                    //    aData.WastageQty = 0;
                                    //}


                                    //aData.Machine = { MachineId: $scope.machineList[0].MachineId };
                                    //aData.MachineId = $scope.machineList[0].MachineId;


                                    //$scope.ProductionDetailList.push(aData);

                               // });
                            })
                            
                            
                        }
                   
                   
                    
                });


                

               // GetByCombinationandDepertment();
                
            });
        }
       
        
     
    }

    

    $scope.RemoveItemProduction = function (obj) {
        var ind = $scope.ProductionDetailList.indexOf(obj);
        $scope.ProductionDetailList.splice(ind, 1);
        if ($scope.ProductionDetailList.length < 0 || $scope.ProductionDetailList.length==0 ) {

            $("#ddlPreparedBy").val('').select2({
                placeholder: "Receive By",

            });

            $("#ddlAllIwoSelect2").val('').select2({
                placeholder: "Select IWO",

            });

        }
    }

    $scope.Onclear = function () {
        $scope.ProductionDetailList = [];
        $scope.iwolist = [];
        $scope.ddlAllIwoData = null;
        GetInternalOrderDetailData();
        $scope.ddlStore == null
    }

    $scope.ItemInfoList = [];

    $scope.FinishedGoodsItemSqmLmKgModalBtn = function (productionDetailObj) {
        $scope.FinishedId = productionDetailObj.ItemId;
        $scope.ItemInfoList = [];

      
        //    console.log('productionDetailObj',productionDetailObj);
        $scope.itemInfoName = "Item";
        $("#itemSqmLmKgModal").modal('show');
        angular.forEach($scope.AllCombinationlist, function (adata) {
          
            if ($scope.FinishedId == adata.ItemId) {
                var itemrollkgsqm = {};
                if (adata.RollLenghtInMeter == undefined || adata.RollLenghtInMeter == null) {
                    adata.RollLenghtInMeter = 0;
                }
                else if (adata.RollAreaInSqMeter == undefined || adata.RollAreaInSqMeter == null) {
                    adata.RollAreaInSqMeter = 0;
                }
                else if (adata.PackageWeight == undefined || adata.PackageWeight == null) {
                    adata.PackageWeight = 0;
                }
                itemrollkgsqm.UsedMaterialLengthinMeterVal = adata.RollLenghtInMeter;
                itemrollkgsqm.UsedMaterialAreaInSqmVal = adata.RollAreaInSqMeter;
                itemrollkgsqm.UsedMaterialWeigntInKgVal = adata.PackageWeight;

                $scope.ItemInfoList.push(itemrollkgsqm);
            }
        })


    }

    $scope.itemSqmLmKgModalBtn = function (productionDetailObj) {
        $scope.FinishedId = productionDetailObj.ItemId;
        $scope.ItemInfoList = [];
    //    console.log('productionDetailObj',productionDetailObj);
        $scope.itemInfoName = "Materials";
        $("#itemSqmLmKgModal").modal('show');

       
        //if (productionDetailObj.ItemId == productionDetailObj.ItemId) {

        //}

        
        angular.forEach($scope.AllCombinationlist, function (adata) {

            if (adata.ItemId == productionDetailObj.RawMatrialItemId) {
                var itemrollkgsqm = {};
                if (adata.RollLenghtInMeter == undefined || adata.RollLenghtInMeter == null) {
                    adata.RollLenghtInMeter = 0;
                }
                else if (adata.RollAreaInSqMeter == undefined || adata.RollAreaInSqMeter == null) {
                    adata.RollAreaInSqMeter = 0;
                }
                else if (adata.PackageWeight == undefined || adata.PackageWeight == null) {
                    adata.PackageWeight = 0;
                }
                itemrollkgsqm.UsedMaterialLengthinMeterVal = adata.RollLenghtInMeter;
                itemrollkgsqm.UsedMaterialAreaInSqmVal = adata.RollAreaInSqMeter;
                itemrollkgsqm.UsedMaterialWeigntInKgVal = adata.PackageWeight;

                $scope.ItemInfoList.push(itemrollkgsqm); 
            }

          
        })




        //angular.forEach($scope.AllCombinationlistWithPriceListRaw, function (aData) {
        //    if (issueObj.ItemId == aData.ItemId) {

        //        if (aData.RollLenghtInMeter == 0 || aData.RollLenghtInMeter == null || aData.RollLenghtInMeter == undefined) {
        //            aData.RollLenghtInMeter = 0;
        //        }
        //        if (aData.RollAreaInSqMeter == 0 || aData.RollAreaInSqMeter == null || aData.RollAreaInSqMeter == undefined) {
        //            aData.RollAreaInSqMeter = 0;
        //        }
        //        if (aData.PackageWeight == 0 || aData.PackageWeight == null || aData.PackageWeight == undefined) {
        //            aData.PackageWeight = 0;
        //        }

        //        $scope.ItemInfoList.push(aData);
        //    }
        //});
    }

    $scope.ConvertRollToMeter = function (ProductionObj) {
        //if (!angular.isUndefined(productionDetail.UsedRoll) && productionDetail.UsedRoll > 0) {
        //    productionDetail.UsedRollMeter = (parseFloat(productionDetail.UsedRoll) * 1000);
        //} else {
        //    productionDetail.UsedRoll = 0;
        //    productionDetail.UsedRollMeter = 0;
        //}

       // $scope.productionDetail.ProductionQtyInRoll;

        if (ProductionObj.QtyPerRoll == 0 || ProductionObj.QtyPerRoll == undefined) {
            ProductionObj.QtyPerRoll = 0;
        }

        if (ProductionObj.ProductionItemUnitId.ItemUnitId == 2) {
            var RollCal = (ProductionObj.ProductionQuantity).toFixed(5);

            ProductionObj.ProductionQtyInRoll = Number(RollCal);
        }
        else if (ProductionObj.ProductionItemUnitId.ItemUnitId == 1) {

            if (ProductionObj.QtyPerRoll == 0) {
                ProductionObj.ProductionQtyInRoll = 0;
            } else {
                var RollCal = (ProductionObj.ProductionQuantity / ProductionObj.PcPerRoll).toFixed(5);
                ProductionObj.ProductionQtyInRoll = Number(RollCal);
            }
           
        } else {
            ProductionObj.ProductionQtyInRoll = 0;
        }

      
       
        
    }

    $scope.PcPerRollValidation = function (production) {
        if (production.ProductionItemUnitId.ItemUnitId == 1) {

        
            var RollCal = (production.ProductionQtyInRoll * production.PcPerRoll).toFixed(5);
            production.ProductionQuantity = Number(RollCal);
          

        } 
    }

    $scope.ConvertWastageToMeter = function (productionDetailObj) {

     
        if (productionDetailObj.WastageQty == undefined || productionDetailObj.WastageQty == 0 ) {
            productionDetailObj.WastageQty = 0;
        }
        if (productionDetailObj.WastageQtyInRoll == 0 || productionDetailObj.WastageQtyInRoll == undefined) {
            productionDetailObj.WastageQtyInRoll = 0;
        }
      
        var QtyRawMatrial = 0;
      
      
        //if (productionDetailObj.WastageItemUnitId.ItemUnitId == 2) {

        //        QtyRawMatrial = (productionDetailObj.WastageQty).toFixed(5);
        //        productionDetailObj.WastageQtyInRoll = Number(QtyRawMatrial);
        //        productionDetailObj.WastagePercent = Number(((productionDetailObj.WastageQtyInRoll * 100) / (productionDetailObj.ProductionQtyInRoll + productionDetailObj.WastageQtyInRoll)).toFixed(3));
        //}
        //else
          if (productionDetailObj.WastageItemUnitId.ItemUnitId == 1) {

            productionDetailObj.WastageQtyInRoll = Number((productionDetailObj.WastageQty / productionDetailObj.PcPerRoll).toFixed(5));
            //productionDetailObj.WastageQtyInRoll = Number(QtyRawMatrial);
            //  productionDetailObj.WastagePercent = Number(((productionDetassilObj.WastageQtyInRoll * 100) / (productionDetailObj.ProductionQtyInRoll + productionDetailObj.WastageQtyInRoll)).toFixed(3));
            productionDetailObj.WastagePercent = Number(((productionDetailObj.WastageQty * 100) / (productionDetailObj.AttainableQty)).toFixed(3))
          }
          else {
           
            productionDetailObj.WastageQtyInRoll= 0;
         }
    }

    $scope.ReverseCalForWastageUnit = function (production) {
        var QtyRawMatrial = 0;
        if (production.WastageQtyInRoll==null) {
            production.WastageQtyInRoll = 0;
        }
        if (production.WastageItemUnitId.ItemUnitId == 1) {
            QtyRawMatrial = (production.WastageQtyInRoll * production.QtyPerRoll).toFixed(5);
            production.WastageQty = Number(QtyRawMatrial);
        }
    }

    $scope.StockList = [];
    function CommonCurrentStock(DepartmentId, ItemId, MaterialTypeId) {
        $http({
            url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + DepartmentId + "&ItemId=" + ItemId + "&MaterialTypeId=" + MaterialTypeId + "&LabelBrandId=" + null,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.StockList = data;
        });
    }

    $scope.RawmatStockCheck = function (dllRawMat) {
       // CommonCurrentStock($scope.ddlStore.DepartmentId, dllRawMat.ItemId, dllRawMat.ddlMaterial.MaterialTypeId);
        $http({
            url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + $scope.ddlStore.DepartmentId + "&ItemId=" + dllRawMat.RawMatrialItemId + "&MaterialTypeId=" + dllRawMat.ddlMaterial.MaterialTypeId + "&LabelBrandId=" + null,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aStock) {
                    dllRawMat.CurrentStockQuantity = aStock.CurrentQuantity;
                })
            } else {
                dllRawMat.CurrentStockQuantity = 0;
            }
            
        });
       
    }
  
    $scope.UsedRawMatrialCalculation = function (usedMatrial) {
        $scope.TempUsedMatrialVal = 0;
        var UsedMatrial = usedMatrial.UsedMaterialQtyInRoll;
        usedMatrial.UsedMatrialVal = UsedMatrial;

     

        if (usedMatrial.UsedMatrialVal == null || usedMatrial.UsedMatrialVal == undefined) {
            usedMatrial.UsedMatrialVal = 0;
        }

        angular.forEach($scope.ProductionDetailList,function (aData) {
            $scope.TempUsedMatrialVal += aData.UsedMatrialVal;
        })

        var isValid = false;
        var val = 0;
        for (var i = 0; i < $scope.ProductionDetailList.length; i++) {

            if (usedMatrial.RawMatrialItemId == $scope.ProductionDetailList[i].StockItemId) {
               
                val += $scope.ProductionDetailList[i].UsedMatrialVal;
              
                if ($scope.ProductionDetailList[i].TempCurrentStockQuantity >= val) {
                  /*  if (val >= $scope.TempUsedMatrialVal) {*/
                    $scope.ProductionDetailList[i].CurrentStockQuantity = usedMatrial.TempCurrentStockQuantity - $scope.TempUsedMatrialVal;
                   /* } else {*/
                    //    $scope.ProductionDetailList[i].CurrentStockQuantity = usedMatrial.TempCurrentStockQuantity - $scope.TempUsedMatrialVal;
                    //}

                     
                    }
                    else {

                        $scope.ProductionDetailList[i].UsedMaterialQtyInRoll = 0;
                        $scope.ProductionDetailList[i].UsedMatrialVal = 0;
                        $scope.ProductionDetailList[i].CurrentStockQuantity = usedMatrial.TempCurrentStockQuantity;
                        isValid = true;

                    }
                
               
            }
          
        }

        if (isValid) {
            alertify.log("Issue Quantity greater than Current Quantity ", 'error', '3000')
        }

       
        for (var i = 0; i < $scope.ProductionDetailList.length; i++) {
            if (usedMatrial.RawMatrialItemId != $scope.ProductionDetailList[i].StockItemId) {
                if (usedMatrial.TempCurrentStockQuantity >= usedMatrial.UsedMaterialQtyInRoll) {
                    usedMatrial.CurrentStockQuantity = usedMatrial.TempCurrentStockQuantity - usedMatrial.UsedMaterialQtyInRoll;
                }
                else {
                    $scope.ProductionDetailList[i].UsedMaterialQtyInRoll = 0;
                    alertify.log("Issue Quantity greater than Current Quantity ", 'error', '3000')
                }
               
            }
           
        }
        


    }

   

    //$scope.ConvertMeterToRoll = function (productionDetail) {
    //    if (!angular.isUndefined(productionDetail.UsedRollMeter) && productionDetail.UsedRollMeter > 0) {
    //        productionDetail.UsedRoll = (parseFloat(productionDetail.UsedRollMeter) / 1000);
    //    } else {
    //        productionDetail.UsedRoll = 0;
    //        productionDetail.UsedRollMeter = 0;
    //    }
    //}

    //$scope.CheckDuplicateProductionNo = function () {
    //    var date = $("#ProductionDate").val();
    //    if (date == "") {
    //        $("#ProductionDate").focus();
    //        alertify.log('Please select date.', 'error', '5000');
    //        return;
    //    }
    //    if ($scope.Production.ProductionNo == "" || angular.isUndefined($scope.Production.ProductionNo) || $scope.Production.ProductionNo == null) {
    //        GetMaxProductionNo();
    //    } else {
    //        $http({
    //            url: '/Production/CheckDuplicateProductionNo?ProductionNo=' + $scope.Production.ProductionNo + "&date=" + date,
    //            method: 'GET',
    //            headers: { 'Content-Type': 'application/json' }
    //        }).success(function (data) {
    //            if (data.length > 0) {
    //                $scope.found = true;
    //                alertify.log("Production No. " + $scope.Production.ProductionNo + ' already exists!', 'error', '3000');
    //                $scope.Production.ProductionNo = "";
    //                $('#ProductionNo').focus();
    //            } else {
    //                $scope.found = false;
    //            }
    //        });
    //    }
    //}

   
    $scope.saveProduction = function () {

      

        if ($scope.ddlAllIwoData != undefined || $scope.ddlAllIwoData != null) {
            var deliveryDate = $('#ProductionDate').val();
            var Production = $scope.Production;



            if (deliveryDate == "" || !Production.ProductionNo || !Production.ProductionNo || !ddlPreparedBy) {
                alertify.log('Please fill all required field in master section!', 'error', '5000');
                return;
            }

            var isValidForSave = true;
            var isValidatoinSave = false;

            var productionDetail = $scope.ProductionDetailList;

         

            $scope.Production.PreparedById = $scope.ddlPreparedBy.EmployeeId;
            $scope.Production.CreatorId = $scope.LoginUser.UserId;
            $scope.Production.UpdatorId = $scope.LoginUser.UserId;
         
            var isFlaseItemList = true;
            angular.forEach(productionDetail,function (aData) {

                if (aData.UsedMaterialQtyInRoll == 0 || aData.UsedMaterialQtyInRoll == undefined) {
                    isFlaseItemList = false;
                } else {
                    isFlaseItemList = true;
                }
            })
          
            if ($scope.ddlStore != null || $scope.ddlStore != undefined) {

                if (isFlaseItemList) {
                   

                    var flag = true;
                    $scope.ItemName = "";
                    angular.forEach(productionDetail,function (aData) {
                        if (aData.MaterialTypeId == 0 || aData.MaterialTypeId == undefined) {
                            flag = false;
                            $scope.ItemName = aData.FinishedItemName;
                        }
                    })

                    if (flag) {
                       
                        alertify.confirm("Are you sure to save ?", function (e) {


                            if (e) {

                              

                                //$scope.Production.ProductionDate = f;
                                //  $scope.Production.ProductionDate = f;
                                if (($scope.Production.ProductionId == 0 || $scope.Production.ProductionId == undefined) && $scope.CreatePermission) {

                                    angular.forEach(productionDetail, function (aData) {
                                        aData.WastageItemUnitId = aData.WastageItemUnitId.ItemUnitId;
                                        aData.ProductionItemUnitId = aData.ProductionItemUnitId.ItemUnitId;

                                        aData.ProductionItemUnitId = { ItemUnitId: aData.ProductionItemUnitId}
                                        aData.WastageItemUnitId = { ItemUnitId: aData.WastageItemUnitId }

                                        aData.WastageItemUnitId = aData.WastageItemUnitId.ItemUnitId;
                                        aData.ProductionItemUnitId = aData.ProductionItemUnitId.ItemUnitId;
                                        aData.Raw_MaterialTypeId =aData.ddlMaterial.MaterialTypeId;
                                        aData.AttainableQty = aData.AttainableQty;

                                        $scope.ProductionDetailListUpdateArray.push(aData);
                                    });
                                   
                                    $.ajax({
                                        url: "/Production/Save",
                                        contentType: "application/json;charset=utf-8",
                                        type: "POST",
                                        data: JSON.stringify({ pro_Production: $scope.Production, pro_ProductionDetailList: $scope.ProductionDetailListUpdateArray }),
                                        success: function (data) {
                                            AppNotificationLogPost("Production Create");
                                            var ProIdsAndNo = data.split(",");
                                            var proIds = ProIdsAndNo[1];
                                            var prodId = Number(proIds);
                                            var prodNo = ProIdsAndNo[0];


                                            EmailSend($scope.Production);
                                            if (data != "") {
                                                //  $window.open("#/ProductionReport", "popup", "width=850,height=550,left=280,top=80");
                                                $('#ddlAllIwoSelect2').select2('destroy');
                                                $('#ddlAllIwoSelect2').val('').select2({
                                                    placeholder: "Select IWO"
                                                });

                                              

                                                $window.open("#/ProductionReport", "popup", "width=850,height=550,left=280,top=80");
                                                $cookieStore.put("productionId", prodId);
                                                // sessionStorage.setItem("productionId", JSON.stringify(prodId));
                                                //$('#ddlStore').val(null).trigger('change');
                                                // $('#ddlPreparedBy').val(null).trigger('change'); 

                                                alertify.log(' Production No: ' + prodNo + ' ' + status + ' Successfully!', 'success', '5000');

                                                $scope.productionEntryForm.$setPristine();
                                                $scope.productionEntryForm.$setUntouched();
                                                Clear();

                                            }
                                        }, error: function (msg) {
                                            alertify.log('Server Save Errors!', 'error', '10000');
                                        }
                                    });
                                }
                                else {
                                    alertify.log('You do not have permission to save!', 'error', '10000');
                                }


                            }
                        });
                    } else {
                        alertify.log('Material Type Not Found', 'error', '5000');
                    }
                 
                } else {
                    alertify.log('Material Info must be Entry!!!', 'error', '5000');
                }

              


            } else {
                alertify.log('Please Select Department !!!', 'error', '5000');
            }

        } else {
            alertify.log('Select Internal Work order !!!', 'error', '5000');
        }

       
      
    }


    function ProductionSaveWithValidation() {

    }

    function EmailSend(production) {


        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })

      

        $scope.EmailSendNotification.EmailSubject = "Production Saved";
        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        //  $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var currentDate = new Date();
        var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> A new Production has been Done. <br/> ' +
            'Production No : <strong > ' + production.ProductionNo + '</strong><br/>' +
             'Production Date: <strong>' + ($filter('date')(production.ProductionDate, 'dd/MM/yyyy')).toString() + '</strong><br/>' +
        //'Company Name: <strong>' + $scope.ddlInternalWorkOrder.CompanyName + '</strong><br/>' +
        'Prepard by: <strong>' + $scope.ddlPreparedBy.FullName + '</strong>' + '<br/>' +
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


    $("#ProductionDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ProductionDateChange = function () {
        $("#ProductionDate").focus();
        $("#ProductionDate").trigger("click");
    }


    $("#txtFromProduction").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForProduction = function () {
        $("#txtFromProduction").focus();
        $("#txtFromProduction").trigger("click");
    }


    $("#txtToDateForProduction").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForProduction = function () {
        $("#txtToDateForProduction").focus();
        $("#txtToDateForProduction").trigger("click");
    }

    $scope.reloadBtn = function () {
        $('#txtFromProduction').val('');
        $('#txtToDateForProduction').val('');
        $('#ProductionAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchProductionNoAndStore = null;
        GetPagedForProduction(1);
        $scope.isReportDisabled = false;
    }

    $scope.ProductionSearch = function () {
        GetPagedForProduction(1);

    }

    function GetPagedForProduction(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromProduction").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForProduction").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchProductionNoAndStore != undefined && $scope.SearchProductionNoAndStore != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([ProductionDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([ProductionNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%' OR IWO.[InternalWorkOrderNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%' OR SO.[CompanyNameBilling] LIKE '%" + $scope.SearchProductionNoAndStore + "%')";

        }
        else if ($scope.SearchProductionNoAndStore !== undefined && $scope.SearchProductionNoAndStore != null && $scope.SearchProductionNoAndStore != "") {
            SearchCriteria = "[ProductionNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%' OR IWO.[InternalWorkOrderNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%' OR SO.[CompanyNameBilling] LIKE '%" + $scope.SearchProductionNoAndStore + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[ProductionDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }



        $http({
            url: encodeURI('/Production/GetPagedProduction?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.productionListForGrid = data.ListData;
          //  $scope.total_count = data.TotalRecord;
            $scope.total_count = data.TotalRecord;
            if ($scope.productionListForGrid.length > 0) {
                angular.forEach($scope.productionListForGrid, function (aPro) {
                    var res1 = aPro.ProductionDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPro.ProductionDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aPro.ProductionDate = date1;
                    }
                })

            }
            else {

                alertify.log('Production No Not Found', 'error', '5000');

            }
            
        });
    }

    $scope.getData = function (curPage) {
        $scope.isReportDisabled = false;
        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForProduction($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForProduction($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForProduction($scope.currentPage);
        }
        //  }


    }

    $scope.ProductionReport = function (production) {

        var productionId =production.ProductionId;
        $window.open("#/ProductionReport", "popup", "width=850,height=550,left=280,top=80");

         $cookieStore.put("productionId", productionId);
        //sessionStorage.setItem("productionId", JSON.stringify(productionId));
        event.stopPropagation();

    }

});