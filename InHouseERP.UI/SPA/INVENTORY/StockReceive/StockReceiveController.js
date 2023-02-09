app.controller("StockReceiveController", function ($scope, $cookieStore, $http, $filter, $window, $rootScope) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    //$scope.branchId = $scope.LoginUser.BranchId;
    //console.log('$scope.LoginUser', $scope.LoginUser);



  

    Clear();


    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            $scope.FullName = $scope.LoginUser.FullName;
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Stock Receive').ScreenId;
        //    GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Stock Receive').ScreenId;
        //        GetUsersPermissionDetails();
        //    }, 500);
        //}

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Stock Receive').ScreenId;
        GetUsersPermissionDetails();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        StockReciveGetPaged($scope.currentPage);

        $scope.stockReciveListForGrid = [];

      

        //$('#ddlReceiveBy').val(null).trigger('change');
        //$('#ddlStore').val(null).trigger('change');
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        // GetTopForWarrentyAndSerialNo($scope.currentPage);
        $scope.IPBAndLPBDdl = null;
        $scope.WarrentyAndSerialListShow = true;
        $scope.PBId = 0;
        $scope.PBDate = null;
        $scope.inv_StockReceiveDetailAdAttributeLst = [];
        $scope.inv_StockReceiveDetailList = [];
        $scope.inv_StockReceive = {};
        $scope.inv_StockReceive.SRId = 0;
        $scope.VarietyList = [];
        $scope.Storelist = [];
        $scope.EmployeeList = [];
        $scope.ActivePriceTypeList = [];
        $scope.ItemUnitlist = [];
        $scope.btnSave = "Save";
        $scope.ddlStore = null;
        GetAllEmployee();
        //GetAllStore();
        GetActivePriceType();
        GetAllVariety();
        var currentDate = new Date();
        $scope.inv_StockReceive.ReceiveDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetAllItemUnit();
        ClearReceiveDetail();
       // GetUsersPermissionDetails();
        //  GetAllActivePB();
        $scope.WarrentyAndSerialNoList = [];
        DepartmentGetByBranchAndDeptTypeId();
        $scope.ItemAttrGridCalList = [];
        $scope.IsGrnHideAndShow = true;
        $scope.isReciveEnable = true;
        $scope.AllCombinationlist = [];
        GetByCombinationand();
        $scope.ddlItem = null;
        $scope.isItemDisable = true;
        $scope.inv_StockReceiveWithOut = {};
        $scope.ReceiveWithoutPurchaseBillList = [];

        //$scope.PurchaseType = [];
        //PurchaseItemType();
        $scope.inv_StockReceiveWithOut.SRUnitPrice = 0;

       // $scope.inv_StockReceive.MaterialTypeId = '2';
        //$scope.inv_StockReceive.MaterialTypeId = 1;

        $scope.IsGrnHideAndShow = true;
    
        $scope.IsGRN = false;
        if ($scope.IsGRN == true) {
            $scope.IsGrnHideAndShow = false;
            //$scope.IsGrnHide = true;
            //$scope.IsGrnHide = true;
            $('#ddlStore').select2('destroy');
            $('#ddlStore').val('').select2({
                placeholder: "--Select Store--",
                theme: "classic",
            });
            $scope.TotalPrice = 0;
            $scope.TotalQty = 0;
           
        } else {
            $scope.IsGrnHideAndShow = true;
            $scope.IsGrnHide = false;
            $('#ddlStore1').select2('destroy');
            $('#ddlStore1').val('').select2({
                placeholder: "--Select Store--",
                theme: "classic",
            });
            $scope.TotalPrice = 0;
            $scope.TotalQty = 0;
        }

       
        $scope.inv_PurchaseWithoutStockReceiveDetailList = [];
        ReciveNo();

        $scope.ItemDisabled = true;
        $scope.TotalQty = 0;
        $scope.TotalPrice = 0;


        GetAllmatrialpaperType();
        $scope.MaterialTypeList = [];
        $scope.ddlMaterialType = null;
        $scope.isHardWare = true;
        $scope.AppNotificationSetupList = [];
        GetAppNotificationSetupByReportCode();
    }
    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'SR',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(inv_StockReceive, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];

        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle
            obj.NotificationDetail = 'Stock Receive No: ' + inv_StockReceive.ReceiveNo + ' Purchase Bill No: ' + inv_StockReceive.PBNo + ' Supplier Name: ' + inv_StockReceive.SupplierName + ' Prepared By: ' + $scope.FullName;
            $scope.AppNotificationLogList.push(obj);

        })
        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
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
    //====> Material Type =====>>>

    function GetAllmatrialpaperType() {
        $http({
            url: '/MaterialType/GetAllMaterialType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data, function (aData) {
                aData.Combination = aData.MaterialTypeName + ' ~ ' + aData.MaterialTypeCode
                $scope.MaterialTypeList.push(aData);
            })

        });
    }


    //Stock Recive Date======>>>>
    $("#txtFromDate1").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForReceiveDate = function () {
        $("#txtFromDate1").focus();
        $("#txtFromDate1").trigger("click");
    }

    $("#txtFromDate2").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForReceiveDate2 = function () {
        $("#txtFromDate2").focus();
        $("#txtFromDate2").trigger("click");
    }
      
   
    $scope.GrnHidebtn = function () {
       
     
        $scope.isReciveEnable = false;
     
        if ($scope.IsGRN == true) {
             $scope.TotalQty = 0;
             $scope.TotalPrice = 0;
            $scope.IsGrnHide = true;
            $scope.IsGrnHideAndShow = false;
            $scope.isReciveEnable = false;
            $scope.inv_StockReceiveDetailList = [];
            $scope.inv_PurchaseWithoutStockReceiveDetailList = [];
            //$scope.inv_StockReceive.MaterialTypeId = "true";
            $scope.WarrentyAndSerialNoList = [];
          ///  $scope.inv_StockReceive.MaterialTypeId = true;
            $('#ddlStore').select2('destroy');
            $('#ddlStore').val('').select2({
                placeholder: "--Select Store--",
                theme: "classic",
            });
            $scope.TotalPrice = 0;
            $scope.TotalQty = 0;
        } else {
            $scope.TotalQty = 0;
            $scope.TotalPrice = 0;
            $scope.IsGrnHideAndShow = true;
            $scope.IsGrnHide = false;
            $scope.isReciveEnable = false;
            $scope.inv_StockReceiveDetailList = [];
            $scope.inv_PurchaseWithoutStockReceiveDetailList = [];
            //$scope.inv_StockReceive.MaterialTypeId = "true";
            $scope.WarrentyAndSerialNoList = [];
            //$scope.inv_StockReceive.MaterialTypeId = true;
            $('#ddlStore1').select2('destroy');
            $('#ddlStore1').val('').select2({
                placeholder: "--Select Store--",
                theme: "classic",
            });

            $scope.TotalPrice = 0;
            $scope.TotalQty = 0;
        }
     
    }

    $scope.GetByLotNoWithStoreId = function () {
    /*    $scope.ItemDisabled = false;*/
        //var fromDateText = $scope.inv_StockReceive.ReceiveDate;
        //var from = fromDateText.split("/")
        //var f = new Date(from[2], from[1] - 1, from[0]);
        //var ReceiveDate = f;

        var date = $scope.inv_StockReceive.ReceiveDate;
        //var ReceiveDate = date.split("/").reverse().join("-");
        $http({
            url: '/Receive/GetByLotNoWithStore?departmentId=' + $scope.ddlStore.DepartmentId + '&receiveDate=' + date,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.inv_StockReceive.LotNo = data[0].LotNo;
        });
    }

    $scope.MatrialTypeValidationWithItem = function () {
        alert("Ok");
    }

    function ReciveNo() {


        //var dateParts =
        //    ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        //var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
        //$http({
        //    url: '/Receive/GetMaxReceiveNo?receiveDate=' + from,
        //    method: 'GET',
        //    headers: { 'Content-Type': 'application/json' }
        //}).success(function (data) {
        //    $scope.inv_StockReceive.PurchaseWithoutReciveNo = data;
         
        //});

        $http({
            url: '/Receive/GetMaxReceiveNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxReciveNo = data;
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
                $scope.inv_StockReceive.PurchaseWithoutReciveNo = 'WSR/' + $scope.finYearEPZ + '/' + $scope.MaxReciveNo;
            });


        });
    }


    //$scope.ReceivedWithoutPurchaseSumOfQty = function () {
    //    angular.forEach($scope.ItemAttrGridCalList, function (aData) {

    //        angular.forEach($scope.inv_PurchaseWithoutStockReceiveDetailList, function (aItemUp) {
    //            if (aData.ItemId == aItemUp.ItemId) {
    //                if (aItemUp.SRQuantity != undefined || aItemUp.SRQuantity != null) {
    //                    aItemUp.RollLenghtInMeter = parseFloat(aData.RollLenghtInMeter * aItemUp.SRQuantity).toFixed(2);
    //                    aItemUp.RollAreaInSqMeter = parseFloat(aData.RollAreaInSqMeter * aItemUp.SRQuantity).toFixed(2);
    //                    aItemUp.PackageWeight = parseFloat(aData.PackageWeight * aItemUp.SRQuantity).toFixed(2);
    //                    aItemUp.IssuedWidth = parseFloat(aData.RollWidthInMeter * aItemUp.SRQuantity).toFixed(2);
    //                    aItemUp.RollWidthInMeter = parseFloat(aData.RollWidthInMeter * aItemUp.SRQuantity).toFixed(2);
    //                } else {
    //                    aItemUp.RollLenghtInMeter = aData.RollLenghtInMeter *1;
    //                    aItemUp.RollAreaInSqMeter = aData.RollAreaInSqMeter * 1;
    //                    aItemUp.PackageWeight = aData.PackageWeight * 1;
    //                    aItemUp.IssuedWidth = aData.RollWidthInMeter * 1;
    //                    aItemUp.RollWidthInMeter = aData.RollWidthInMeter *1;
    //                }
                  
    //            }
    //        })

    //    });
    //}

    $scope.ReceiveWithoutPurchaseAdd = function () {
        // $scope.inv_StockReceive = {};
        var isValidItem = true;
        angular.forEach($scope.inv_PurchaseWithoutStockReceiveDetailList, function (aItem) {
            if (aItem.ItemId == $scope.ddlItem.ItemId) {
                isValidItem = false;
            }
        });

        if (isValidItem) {
            if ($scope.ddlItem.RollLenghtInMeter == null || $scope.ddlItem.RollLenghtInMeter == undefined) {
                $scope.ddlItem.RollLenghtInMeter = 0;
            }
            if ($scope.ddlItem.RollWidthInMeter == null || $scope.ddlItem.RollWidthInMeter == undefined) {
                $scope.ddlItem.RollWidthInMeter = 0;
            }
            if ($scope.ddlItem.RollAreaInSqMeter == null || $scope.ddlItem.RollAreaInSqMeter == undefined) {
                $scope.ddlItem.RollAreaInSqMeter = 0;
            }

            if ($scope.ddlItem.PackageWeight == null || $scope.ddlItem.PackageWeight == undefined) {
                $scope.ddlItem.PackageWeight = 0;
            }
            if ($scope.ddlItem.UnitPerPackage == null || $scope.ddlItem.UnitPerPackage == undefined) {
                $scope.ddlItem.UnitPerPackage = 0;
            }

            $scope.inv_StockReceiveWithOut.ItemName = $scope.ddlItem.ItemName;

            $scope.inv_StockReceiveWithOut.ItemDescription = $scope.ddlItem.ItemDescription;
            $scope.inv_StockReceiveWithOut.ItemDescriptionTwo = $scope.ddlItem.ItemDescriptionTwo;
            $scope.inv_StockReceiveWithOut.ItemId = $scope.ddlItem.ItemId;
            $scope.inv_StockReceiveWithOut.RollLenghtInMeter = parseFloat($scope.ddlItem.RollLenghtInMeter * $scope.inv_StockReceiveWithOut.SRQuantity).toFixed(2);
            $scope.inv_StockReceiveWithOut.RollWidthInMeter = parseFloat($scope.ddlItem.RollWidthInMeter * $scope.inv_StockReceiveWithOut.SRQuantity).toFixed(2);
            $scope.inv_StockReceiveWithOut.RollAreaInSqMeter = parseFloat($scope.ddlItem.RollAreaInSqMeter * $scope.inv_StockReceiveWithOut.SRQuantity).toFixed(2);
            $scope.inv_StockReceiveWithOut.PackageWeight = parseFloat($scope.ddlItem.PackageWeight * $scope.inv_StockReceiveWithOut.SRQuantity).toFixed(2);
            $scope.inv_StockReceiveWithOut.UnitPerPackage = parseFloat($scope.ddlItem.UnitPerPackage * $scope.inv_StockReceiveWithOut.SRQuantity).toFixed(2);
            $scope.inv_StockReceiveWithOut.SRUnitId = $scope.ddlMu.ItemUnitId;
            $scope.inv_StockReceiveWithOut.SRUnitPrice = parseFloat($scope.inv_StockReceiveWithOut.SRUnitPrice).toFixed(2);
        
            //$scope.inv_StockReceiveWithOut.MaterialTypeId = $scope.inv_StockReceive.MaterialTypeId;
            $scope.inv_StockReceiveWithOut.CategoryId = $scope.ddlItem.CategoryId;
            //if ($scope.ddlMaterialType == null) {
            //    $scope.inv_StockReceiveWithOut.MaterialTypeId = 0;
            //} else {
            //    $scope.inv_StockReceiveWithOut.MaterialTypeId = $scope.ddlMaterialType.MaterialTypeId;
            //}
           

            //angular.forEach($scope.matrialPaperTypeList, function (aMat) {
            //    if ($scope.ddlMaterialType != null) {
            //        if (aMat.MaterialTypeId == $scope.ddlMaterialType.MaterialTypeId) {
            //            $scope.inv_StockReceiveWithOut.MatPaperTypeCombination = $scope.ddlMaterialType.Combination;
            //            $scope.inv_StockReceiveWithOut.MaterialTypeId = $scope.ddlMaterialType.MaterialTypeId;
            //        } else {
            //            $scope.inv_StockReceiveWithOut.MatPaperTypeCombination ="Ribbon Not allowed";
            //        }
            //    } else {
            //        $scope.inv_StockReceiveWithOut.MaterialTypeId = 0;
            //    }
              
            //})
            $scope.inv_StockReceiveWithOut.MatPaperTypeCombination = $scope.ddlMaterialType.Combination;
            $scope.inv_StockReceiveWithOut.MaterialTypeId = $scope.ddlMaterialType.MaterialTypeId;
            $scope.inv_PurchaseWithoutStockReceiveDetailList.push($scope.inv_StockReceiveWithOut);

           

            $scope.inv_StockReceiveWithOut = {};

            $('#SelectitemName').select2('destroy');
            $('#SelectitemName').val('').select2({
                placeholder: "Search for: Item Name ~ Description ~ Item Code",
            });
            $('#ddlMaterialTypeId').select2('destroy');
            $('#ddlMaterialTypeId').val('').select2({
                placeholder: "--Material Type--",
            });
        } else {
            alertify.log('Item Already Exists !!!', 'error', '5000');
        }
       
        //angular.forEach($scope.inv_StockReceiveDetailList, function (aData) {
        //    $scope.ReceiveWithoutPurchaseBillList.push(aData);
        //});
        $scope.inv_StockReceiveWithOut.SRUnitPrice = 0;

        $scope.TotalQty = 0;
        $scope.TotalPrice = 0;
        angular.forEach($scope.inv_PurchaseWithoutStockReceiveDetailList, function (aData) {
            $scope.TotalQty += aData.SRQuantity;
            $scope.TotalPrice += aData.SRQuantity * aData.SRUnitPrice;

        });
       
    }


    function GetByCombinationand() {
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemAttrGridCalList = JSON.parse(data);
            $scope.AllCombinationlist = JSON.parse(data);

            $scope.ddlMu = { ItemUnitId: 2 };
         
            $scope.isReciveEnable = false;
            
        });
    }

    GetAllItem();
    function GetAllItem() {
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.ItemList = data;

            angular.forEach($scope.ItemList,
                function (aData) {
                    aData.Name = aData.ItemName +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemCode +
                        " ~ " + "Sub Category: " +
                        aData.SubCategoryName;
                });
        });
    };

    function GetAllItemUnit() {
        $http({
            url: '/Unit/GetAllUnit',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            data.forEach(function (aData) {
                delete aData.CreatorId;
                delete aData.CreateDate;
                delete aData.UpdatorId;
                delete aData.UpdateDate;
            });
            $scope.ItemUnitlist = data;
         
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

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            console.log("$scope.EmployeeList", $scope.EmployeeList);
            $scope.ddlReceiveBy = { EmployeeId: $scope.LoginUser.EmployeeId };
           
            
        });
    }

    function DepartmentGetByBranchAndDeptTypeId() {

        $http({

            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
          //  $scope.Storelist = data;
            angular.forEach(data, function (aData) {
               // aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;

                if (aData.DepartmentName.match(/Store/gi)) {
                    aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                    $scope.Storelist.push(aData);
                }

                
            })
           // console.log('Load for Storelist', data);
           // 
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
    //            $scope.inv_StockReceive.DepartmentId = $scope.Storelist[0].DepartmentId;
    //            $scope.inv_StockReceive.DepartmentName = $scope.Storelist[0].DepartmentName;
    //        }
    //    });
    //}

    function GetActivePriceType() {
        var criteria = "IsActive=1";
        $http({
            url: '/PriceType/GetPriceTypeDynamic?searchCriteria=' + criteria + '&orderBy=PriceTypeName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (activePriceTypeList) {
            $scope.ActivePriceTypeList = activePriceTypeList;
            angular.forEach($scope.ActivePriceTypeList, function (aActivePriceType) {
                if (aActivePriceType.IsDefault == true) {
                    $scope.ddlPriceType = { 'PriceTypeId': aActivePriceType.PriceTypeId }
                }
            })
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

    

    function SuccessMessage(message) {
        return '<div class="alert alert-warning  alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="topInfo">' + message + '</div></div>';
    }

    function ClearReceiveDetail() {
        $scope.ReceiveDetail = {};
        // $scope.ddlMu = null;
        $scope.DetailAddBtn = "Add Product";
        $scope.VarietyList = [];
        GetAllVariety();
    }


    $scope.LoadACombination = function (item) {
      
        if (item.CategoryId == 2) {
            $scope.isHardWare = true;
            $scope.ddlMaterialType = null;

            $('#ddlMaterialTypeId').select2('destroy');
            $("#ddlMaterialTypeId").select2({
                placeholder: "--Material Type--",
                theme: "classic",
            });
        } else {
            $scope.isHardWare = false;
        }
    }

    function SaveReceive(Status) {
        var detaildata = [];
        var serialList = [];
        var localSerialList = [];
        var serialListForServer = [];
        var serialListForLocalServer = [];
        var errorCount = 0;
        for (var i = 0; i < $scope.inv_StockReceiveDetailAdAttributeLst.length; i++) {
            if ($scope.inv_StockReceiveDetailAdAttributeLst[i].SerialList != undefined) {
                if ($scope.inv_StockReceiveDetailAdAttributeLst[i].SerialList.length) {
                    var attributeQty = $scope.inv_StockReceiveDetailAdAttributeLst[i].AttributeQty;
                    var receivedQty = $scope.inv_StockReceiveDetailAdAttributeLst[i].ReceivedQty;
                    serialList.push(Enumerable.From($scope.inv_StockReceiveDetailAdAttributeLst[i].SerialList).Where('$.IsChecked').ToArray());
                    var numberOfCheckedSerialNo = Enumerable.From($scope.inv_StockReceiveDetailAdAttributeLst[i].SerialList).Where('$.IsChecked').Count();
                    if (numberOfCheckedSerialNo != attributeQty) {
                        errorCount++;
                        break
                    }
                }
            } 
            if ($scope.inv_StockReceiveDetailAdAttributeLst[i].localSerialList != undefined) {
                if ($scope.inv_StockReceiveDetailAdAttributeLst[i].localSerialList.length) {
                    var attributeQty = $scope.inv_StockReceiveDetailAdAttributeLst[i].AttributeQty;
                    var receivedQty = $scope.inv_StockReceiveDetailAdAttributeLst[i].ReceivedQty;
                    localSerialList.push(Enumerable.From($scope.inv_StockReceiveDetailAdAttributeLst[i].localSerialList).Where('$.IsChecked').ToArray());
                    var numberOfCheckedSerialNo = Enumerable.From($scope.inv_StockReceiveDetailAdAttributeLst[i].localSerialList).Where('$.IsChecked').Count();
                    if (numberOfCheckedSerialNo != attributeQty) {
                        errorCount++;
                        break
                    }
                }
            }
            

        }

        if (errorCount > 0) {
            //$("#txtFromDate1").val($("#txtFromDate1Hidden").val());
            //$("#txtFromDate1Hidden").val("");

            $scope.inv_StockReceive.ReceiveDate = "";
            alertify.log('Number of Checked Serial No And Recive Quantity Does not Match!', 'error', '5000');
            return;
        }
        var departmentId = $scope.inv_StockReceive.DepartmentId;
        angular.forEach(serialList, function (aSerial) {
            if (aSerial.length) {
                angular.forEach(aSerial, function (serialData) {
                    var pbDetailSerial = {
                        PBDetailSerialId: serialData.PBDetailSerialId,
                        DepartmentId: departmentId,
                        PBDetailId: 0,
                        WarrentyInDays: 0,
                        SerialNo: serialData.SerialNo,
                    }
                    serialListForServer.push(pbDetailSerial);
                });

                
            }
        });
        angular.forEach(localSerialList, function (aSerial) {
            if (aSerial.length) {
                

                angular.forEach(aSerial, function (serialData) {
                    var pbDetailSerial = {
                        LPBDetailSerialId: serialData.LPBDetailSerialId,
                        DepartmentId: departmentId,
                        PBDetailId: 0,
                        WarrentyInDays: 0,
                        SerialNo: serialData.SerialNo,
                    }
                    serialListForLocalServer.push(pbDetailSerial);
                });
            }
        });
        angular.forEach($scope.inv_StockReceiveDetailAdAttributeLst, function (adetaildata) {
            var newdetail = {
                ItemId: adetaildata.ItemId,
                SRQuantity: adetaildata.AttributeQty,
                SRUnitPrice: adetaildata.UnitPrice,
                ItemName: adetaildata.ItemName,
                RollLenghtInMeter: adetaildata.RollLenghtInMeter,
                RollAreaInSqMeter: adetaildata.RollAreaInSqMeter,
                PackageWeight: adetaildata.PackageWeight,
                SRUnitId: adetaildata.ItemUnitId,
                RollWidthInMeter: adetaildata.IssuedWidth,

                CategoryId: adetaildata.CategoryId,
                SubCategoryId: adetaildata.SubCategoryId,
                MaterialTypeId: adetaildata.MaterialTypeId,
                ItemName: adetaildata.ItemName,
                ItemDescription: adetaildata.ItemDescription,
                ItemDescriptionTwo: adetaildata.ItemDescriptionTwo,
                HsCodeId: adetaildata.HsCodeId,
              //  RollWidthInMeter: adetaildata.RollWidthInMeter,
                RollLenghtInMeter: adetaildata.RollLenghtInMeter,
                RollAreaInSqMeter: adetaildata.RollAreaInSqMeter,
                PcPerRoll: adetaildata.PcPerRoll,
                RollPerCarton: adetaildata.RollPerCarton,
                UnitPerCarton: adetaildata.UnitPerCarton,
                PackageWeight: adetaildata.PackageWeight,
                RollWeight: adetaildata.PackageWeight,
                CartonWeight: adetaildata.CartonWeight,
                CartonSize: adetaildata.CartonSize,
                PBDetailId: adetaildata.PBDetailId,

                //FreeUnitId: 1, 
                //FreeQty: 1,
                //SRUnitName: "Hard Data from Js",
                //FreeUnitName: "Hard Data from Js"
            };

            detaildata.push(newdetail);
        });
        // return;
        var params = "";
        if ($scope.IsGRN) {
            $scope.inv_StockReceive.ReceiveNo = $scope.inv_StockReceive.PurchaseWithoutReciveNo;
            $scope.inv_StockReceive.PBNo = "";
            $scope.inv_StockReceive.PBId = null;
            $scope.inv_StockReceive.IsLocalPurchase = null;
            params = JSON.stringify({ stockReceive: $scope.inv_StockReceive, stockReceiveDetailLst: $scope.inv_PurchaseWithoutStockReceiveDetailList });
        } else {
            params = JSON.stringify({ stockReceive: $scope.inv_StockReceive, stockReceiveDetailLst: detaildata, serialList: serialListForServer, localSerialList: serialListForLocalServer });
        }
      
        $.ajax({
            url: "/Receive/StockSave",
            contentType: "application/json;charset=utf-8",
            type: "POST",
            data: params,
            success: function (data) {
                var DIdIdsAndNo = data.split(",");
                var srIds = DIdIdsAndNo[0];
                var SRId = Number(srIds);
                var SRNo = DIdIdsAndNo[1];
                if (data !="") {

                    AppNotificationLogPost($scope.inv_StockReceive, 'Stock Receive Created!');

                    serialListForServer = [];
                    serialListForLocalServer = [];
                    Clear();
                    $scope.inv_StockReceiveDetailList = [];
                    $scope.WarrentyAndSerialNoList = [];
                    $scope.stockReceive.$setPristine();
                    $scope.stockReceive.$setUntouched();

                    $('#ddlMaterialTypeId').select2('destroy');
                    $("#ddlMaterialTypeId").select2({
                        placeholder: "--Material Type--",
                        theme: "classic",
                    });
                    // $("#successMesg").html(SuccessMessage("Stock Recived Successfully and Recive No. is: <b>" + data.StockReciveNo + "</b>"));
                    alertify.log(' SR No: ' + SRNo + ' ' + status + ' Successfully!', 'success', '5000');

                }
                  
            }, error: function (msg) {
                alertify.log('Server Save Errors!', 'error', '10000');
            }
        });
    }
   

    $scope.SumOfRecivedQty = function () {
        ItemRecivedCalculation();
    }

    function ItemRecivedCalculation() {
        angular.forEach($scope.ItemAttrGridCalList, function (aData) {

            angular.forEach($scope.inv_StockReceiveDetailAdAttributeLst, function (aItemUp) {

              
                if (aData.ItemId == aItemUp.ItemId) {
                    aItemUp.RollLenghtInMeter = aData.RollLenghtInMeter * aItemUp.AttributeQty;
                    aItemUp.RollAreaInSqMeter = aData.RollAreaInSqMeter * aItemUp.AttributeQty;
                    aItemUp.PackageWeight = aData.PackageWeight * aItemUp.AttributeQty;
                    aItemUp.IssuedWidth = aData.RollWidthInMeter * aItemUp.AttributeQty;
                    aItemUp.RollWidthInMeter = aData.RollWidthInMeter * aItemUp.AttributeQty;
                }
            })

        });
    }

 


    //$scope.GetRollCalculation = function (itemObjList) {

    //    $scope.TempCalculationItemList = [];
    //    angular.forEach($scope.AllCombinationlist, function (aData) {
    //        if (itemObjList.ItemId == aData.ItemId) {
    //            var itemObj = {};
    //            itemObj.RollLenghtInMeterTemp = aData.RollLenghtInMeter;
    //            itemObj.RollAreaInSqMeterTemp = aData.RollAreaInSqMeter;
    //            itemObj.ItemId = aData.ItemId;
    //            $scope.TempCalculationItemList.push(itemObj);
    //        }
    //    });

    //    angular.forEach($scope.TempCalculationItemList,function (aItem) {
    //        if (itemObjList.ItemId == aItem.ItemId) {
              
    //            itemObjList.RollLenghtInMeter = aItem.RollLenghtInMeterTemp * itemObjList.AttributeQty;
    //            itemObjList.RollAreaInSqMeter = aItem.RollAreaInSqMeterTemp * itemObjList.AttributeQty;

    //            //sumofRecived.PackageWeight = aData.PackageWeight * sumofRecived.AttributeQty;
    //        }

    //    })

        
    //}

    function SumAttQty() {
        var isDelivery = false;

       
        angular.forEach($scope.inv_StockReceiveDetailAdAttributeLst, function (aDetailAdAttribute) {
         
            if (aDetailAdAttribute.AttributeQty == 0 ) {
                aDetailAdAttribute.AttributeQty = 0;
               
            }
            if (aDetailAdAttribute.AttributeQty <= 0 || aDetailAdAttribute.AttributeQty == null || aDetailAdAttribute.AttributeQty == undefined) {
                //aDetailAdAttribute.IssuedWidth = 0;
                aDetailAdAttribute.AttributeQty;
                    isDelivery = false;
             
            }
            else if (aDetailAdAttribute.AttributeQty > (aDetailAdAttribute.Qty - aDetailAdAttribute.ReceivedQty )) {
                aDetailAdAttribute.AttributeQty = aDetailAdAttribute.Qty - aDetailAdAttribute.ReceivedQty;
                isDelivery = true;
            }
        });

        if (isDelivery) {
            alertify.log('Recive Qty not a greater than Recived Quantity ', 'error', '5000');
        }

    }



    $scope.CheckDuplicateReceiveNo = function () {
        var date = $("#txtFromDate1").val();
        if (date == "") {
            $("#txtFromDate1").focus();
            alertify.log('Please select date.', 'error', '5000');
            return;
        }

        if (angular.isUndefined($scope.inv_StockReceive.ReceiveNo) || $scope.inv_StockReceive.ReceiveNo == null) {
            $("#txtReceiveNo").focus();
            alertify.log('Stock recive No. is required.', 'error', '5000');
            return;
        }

        $http({
            url: '/Receive/CheckDuplicateSRNo?ReceiveNo=' + $scope.inv_StockReceive.ReceiveNo + "&date=" + date,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                $scope.found = true;
                alertify.log("Stock Recive No. " + $scope.inv_StockReceive.ReceiveNo + ' already exists!', 'error', '3000');
                $scope.inv_StockReceive.ReceiveNo = "";
                $('#txtReceiveNo').focus();
            } else {
                $scope.found = false;
            }
        });
    }

    $scope.foundChange = function () {
        $scope.found = true;
    }

    $scope.unitFilter = function (RawItem) {
        return function (pram) {
            return (pram.ItemUnitId == RawItem.UnitId) || (pram.ItemUnitId == RawItem.PackageId) || (pram.ItemUnitId == RawItem.ContainerId);
        };
    }

    $scope.RemoveItemAttr = function (inv_StockReceiveDetailAdAttribute) {
        var ind = $scope.inv_StockReceiveDetailList.indexOf(inv_StockReceiveDetailAdAttribute);
        $scope.inv_StockReceiveDetailList.splice(ind, 1);

        var ind = $scope.inv_StockReceiveDetailAdAttributeLst.indexOf(inv_StockReceiveDetailAdAttribute);
        $scope.inv_StockReceiveDetailAdAttributeLst.splice(ind, 1);

       

        SumAttQty();
    }

    $scope.RemoveItemWithoutReq = function (inv_StockReceiveDetail) {
        var ind1 = $scope.inv_PurchaseWithoutStockReceiveDetailList.indexOf(inv_StockReceiveDetail);
        $scope.inv_PurchaseWithoutStockReceiveDetailList.splice(ind1, 1);
    }

    $scope.SumAttQty = function () {
        SumAttQty();
    }
    $scope.CheckDuplicateSerialNo = function (ItemId, serial) {
        if (serial.IsChecked) {
            var pPurchaseBillDetailSerial = {}
            var pPurchaseBillDetailSerialList = [];
            pPurchaseBillDetailSerial.ItemId = ItemId;
            pPurchaseBillDetailSerial.SerialNo = serial.SerialNo;
            pPurchaseBillDetailSerialList.push(pPurchaseBillDetailSerial);


            var parms = JSON.stringify({ OpeningSerialList: pPurchaseBillDetailSerialList });

            $http.post('/StockOpeningQty/GetHardwareWarrantyAndSerial_GetDynamic', parms).success(function (dataFound) {

                if (dataFound.SerialNo == null) {
                    return;
                } else {
                    serial.IsChecked = false;
                    alertify.log('Duplicate Serial No Found., Try again !!!', 'error', '5000');

                }
                    


                //var isSerialExist = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).Where('$.ItemId==' + dataFound.ItemId + '&& $.SerialNo=="' + dataFound.SerialNo + '"').FirstOrDefault();

                //if (!angular.isUndefined(isSerialExist)) {
                //    for (var i = 0; i < $scope.WarrentyAndSerialNoDetailAdAttributeLst.length; i++) {
                //        if ($scope.WarrentyAndSerialNoDetailAdAttributeLst[i].SerialNo == WarrentyAndSerialNoDetailAdAttribute.SerialNo && $scope.WarrentyAndSerialNoDetailAdAttributeLst[i].TableRowNo == WarrentyAndSerialNoDetailAdAttribute.TableRowNo) {
                //            WarrentyAndSerialNoDetailAdAttribute.SerialNo = "";
                //            break;
                //        }
                //    }
                //    alertify.log('Duplicate Serial No Found., Try again !!!', 'error', '5000');
                //}

            }).error(function (data) {
                alertify.log('Server Save Errors!', 'error', '5000');
            });
        }
        
    }
    $scope.Save = function () {

        if ($scope.ddlStore == null || $scope.ddlStore == undefined) {
            alertify.log('Please Select Store !!!', 'error', '5000');
        } else {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    var totQty = 0;
                    if ($scope.found) {
                        $('#txtReceiveNo').focus();
                    }
                    else {
                        $scope.inv_StockReceive.IsApproved = $scope.HasApproval ? false : true;
                        $scope.inv_StockReceive.PBId = $scope.PBId;
                        $scope.inv_StockReceive.PBNo = $scope.PBNo;
                        $scope.inv_StockReceive.PONo = $scope.PONo;
                        // $scope.inv_StockReceive.PBId = $scope.PBId;
                        $scope.inv_StockReceive.SupplierId = 0;
                        $scope.inv_StockReceive.SupplierName = $scope.ddlPurchaseBill.SupplierName;
                        $scope.inv_StockReceive.ReceivedById = $scope.ddlReceiveBy.EmployeeId;
                        $scope.inv_StockReceive.ReceivedBy = 'N/A';
                        $scope.inv_StockReceive.CreatorId = $scope.LoginUser.UserId;
                        $scope.inv_StockReceive.UpdatorId = $scope.LoginUser.UserId;
                        //$("#txtFromDate1Hidden").val("");
                        //$("#txtFromDate1Hidden").val($("#txtFromDate1").val());
                        //var fromDateText = $("#txtFromDate1").val();
                        //var from = fromDateText.split("/")
                        //var f = new Date(from[2], from[1] - 1, from[0]);
                        //$scope.inv_StockReceive.ReceiveDate = f;

                        //if ($scope.inv_StockReceive.ReceiveDate < $scope.PBDate) {
                        //    alertify.log('Recive date can not before of PB Date!', 'error', '5000');
                        //    $("#txtFromDate1").val(fromDateText);
                        //    return;
                        //}
                        if ($scope.inv_StockReceive.SRId == 0 && $scope.CreatePermission) {
                            SaveReceive('Saved');
                        }
                        else if ($scope.inv_StockReceive.SRId == 0 && !$scope.CreatePermission) {
                            alertify.log('You do not have permission to save!', 'error', '5000');
                        }

                        else if ($scope.inv_StockReceive.SRId > 0 && $scope.RevisePermission) {
                            SaveReceive('Updated');
                        }
                        else if ($scope.inv_StockReceive.SRId > 0 && !$scope.RevisePermission) {ReceiveWithoutPurchaseBillList
                            alertify.log('You do not have permission to Update!', 'error', '5000');
                        }

                    }
                }
            });
        }
       
    }

    $scope.Reset = function () {
     
        Clear();
     
    
       
        //if ($scope.IsGRN == true) {
        //    $scope.IsGrnHide = false;
        //    $scope.IsGrnHideAndShow = true;
       
        //}
      //  $('#ddlReceiveBy').val(null).trigger('change');
      //  $('#ddlStore').val(null).trigger('change');
      ////  $('#IPBAndLPBDdlSelect3').val(null).trigger('change');
        //  $('#IPBAndLPBDdlSelect3').val(null).trigger('change');
       // $scope.IsGrnHideAndShow = false;
      //  $scope.IsGrnHide = true;
        $scope.TotalQty = 0;
        $scope.TotalPrice = 0;
    
        $scope.ReceiveWithoutPurchaseBillList = [];
        $scope.inv_PurchaseWithoutStockReceiveDetailList = [];
      
      
   
        
         
        $scope.inv_StockReceiveDetailList = [];
        
        $scope.stockReceive.ddlStore.$setPristine();
        $scope.stockReceive.ddlStore.$setUntouched();

        $('#ddlMaterialTypeId').select2('destroy');
        $("#ddlMaterialTypeId").select2({
            placeholder: "--Material Type--",
            theme: "classic",
        });

    }

    

    $scope.CountCheckedReciveQty = function (stockReciveDetails) {
        var qty = 0;
        if ($scope.IPBAndLPBDdl.Id == 1) {
            angular.forEach(stockReciveDetails.localSerialList, function (sData) {
                if (sData.IsChecked) {
                    qty++;
                }
            });
        } else {
            angular.forEach(stockReciveDetails.SerialList, function (sData) {
                if (sData.IsChecked) {
                    qty++;
                }
            });
        }
       
        stockReciveDetails.AttributeQty = qty;

    };


    $scope.Reset = function () {
        Clear();
    }


    $("#txtFromDateForWarenty").datepicker({
        dateFormat: "dd/MM/yyyy"
    });

    $scope.FormDateChangeForWarrenty = function () {
        $("#txtFromDateForWarenty").focus();
        $("#txtFromDateForWarenty").trigger("click");
    }


    $("#txtToDateForWarenty").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForWarrenty = function () {
        $("#txtToDateForWarenty").focus();
        $("#txtToDateForWarenty").trigger("click");
    }




    function ImportPB(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
        //  var SearchCriteria = "1=1";
        var formDateChange = $("#txtFromDateForWarenty").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForWarenty").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');
        $scope.SearchPBAndCompanyName = $("#PBAndCompany").val();
        var SearchCriteria = "";

        if ($scope.SearchPBAndCompanyName != undefined && $scope.SearchPBAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            // SearchCriteria = "([PBDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([PBNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%')";
            SearchCriteria = "([PBDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([PBNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [SupplierName] LIKE '%" + $scope.SearchPBAndCompanyName + "%')";

        }
        else if ($scope.SearchPBAndCompanyName !== undefined && $scope.SearchPBAndCompanyName != null && $scope.SearchPBAndCompanyName != "") {
            SearchCriteria = "[PBNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [SupplierName] LIKE '%" + $scope.SearchPBAndCompanyName + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[PBDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }



        $http({
            url: '/PurchaseBill/ImportPagedPB?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {


            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aPb) {
                    var res1 = aPb.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPb.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aPb.PBDate = date1;
                    }
                })
            }
            $scope.WarrentyAndSerialNoList = data.ListData;
            $scope.total_count = data.TotalRecord;
            console.log('$scope.WarrentyAndSerialNoList', $scope.WarrentyAndSerialNoList);
        });
    }

    function LocalPagedPB(curPage) {
        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
        // var SearchCriteria = "1=1";
        var formDateChange = $("#txtFromDateForWarenty").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForWarenty").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');
        $scope.SearchPBAndCompanyName = $("#PBAndCompany").val();
        var SearchCriteria = "";

        if ($scope.SearchPBAndCompanyName != undefined && $scope.SearchPBAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            // SearchCriteria = "([PBDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([PBNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%')";
            SearchCriteria = "([PBDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([PBNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [SupplierName] LIKE '%" + $scope.SearchPBAndCompanyName + "%')";

        }
        else if ($scope.SearchPBAndCompanyName !== undefined && $scope.SearchPBAndCompanyName != null && $scope.SearchPBAndCompanyName != "") {
            SearchCriteria = "[PBNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [SupplierName] LIKE '%" + $scope.SearchPBAndCompanyName + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[PBDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }

        $http({
            url: '/PurchaseBill/LocalPagedPB?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aPb) {
                    var res1 = aPb.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPb.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aPb.PBDate = date1;
                    }
                })
            }
            $scope.WarrentyAndSerialNoList = data.ListData;
            $scope.total_count = data.TotalRecord;

            console.log('$scope.WarrentyAndSerialNoList', $scope.WarrentyAndSerialNoList);
        });
    }






    $scope.warrentyAndPbList = [

        { Id: 1, Name: "Local Purchase Bill" },
        { Id: 2, Name: "Import Purchase Bill" },
    ];

    $scope.LocalWarrantyAndSerialNumber = function (id) {
        $scope.PBIdDdl = id;
       
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForWarenty').val('');
        $('#txtToDateForWarenty').val('');
        $('#PBAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchPBAndCompanyName = null;

    }


   
    function GetAllActiveImportPB() {
        $http({
            url: "/PurchaseBill/GetTopForReceive?TopQty=10000",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aPb) {
                    var res1 = aPb.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPb.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aPb.PBDate = date1;
                    }
                })
            }
            $scope.WarrentyAndSerialNoList = data;
           // 
        });
    }
    function GetAllActiveLocalPB() {
        $http({
            url: "/PurchaseBill/GetTopForLocalReceive?TopQty=10000",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aPb) {
                    var res1 = aPb.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPb.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aPb.PBDate = date1;
                    }
                })
            }
            $scope.WarrentyAndSerialNoList = data;
           // 
        });
    }

    $scope.localAndImportWarrantyAndSerialNumber = function () {

      


        if ($scope.PBIdDdl == 1) {
            GetAllActiveLocalPB();
            $scope.inv_StockReceive.IsLocalPurchase = true;
            $scope.inv_StockReceiveDetailList = [];
          
        } else if ($scope.PBIdDdl == 2) {
            
            GetAllActiveImportPB();
            $scope.inv_StockReceive.IsLocalPurchase = false;
            $('#ddlStore1').select2('destroy');
            $('#ddlStore1').val('').select2({
                placeholder: "--Select Store--",
                theme: "classic",
            });
            $('#PurchaseBillSelect2').select2('destroy');
            $("#PurchaseBillSelect2").val('').select2({
                //  placeholder: "--Material Paper Type--",
                theme: "classic",

            });
            $scope.inv_StockReceiveDetailList = [];
        } else {
            $scope.WarrentyAndSerialNoList = [];
            $scope.pageSizeHide = false;
            $scope.inv_StockReceive.IsLocalPurchase = false;
            $('#ddlStore').select2('destroy');
            $('#ddlStore').val('').select2({
                placeholder: "--Select Store--",
                theme: "classic",
            });

            $('#PurchaseBillSelect2').select2('destroy');
            $("#PurchaseBillSelect2").val('').select2({
                //  placeholder: "--Material Paper Type--",
                theme: "classic",

            });
        }
    }



   


    $scope.GetPBDetails = function (aPB) {

        if ($scope.PBIdDdl == 2) {
            $http({
                url: "/PurchaseBill/GetPBById?id=" + aPB.PBId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {

                $scope.PBId = aPB.PBId;
                $scope.PBNo = aPB.PBNo;
                $scope.PONo = aPB.PONo;
                var pDate = aPB.PBDate.split("/");
                $scope.PBDate = new Date(pDate[2], (parseInt(pDate[1]) - 1), pDate[0]);
                $scope.inv_StockReceiveDetailAdAttributeLst = [];
                $scope.inv_StockReceiveDetailList = [];
                angular.forEach(data, function (adata) {
                    //var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + adata.ItemId).FirstOrDefault();
                   // var checkCategory = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + ItemCombination.ItemId).FirstOrDefault();

                    var criteria = " [DepartmentId]=0 AND PBDetailId=" + adata.PBDetailId;
                    $http({
                        url: '/WarrentyAndSerialNo/GetImportWarrantyAndSerialNoDynamicForSingle?whereCondition=' + criteria,
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }).success(function (warrentySerialNoList) {
                            $scope.inv_StockReceive.ReceiveNo = aPB.PBNo.replace("IPB", "SR");
                            var Attribute = {};
                            adata.ItemCode = adata.ItemCode;
                            adata.Qty = adata.Qty;
                            adata.AttributeUnitPrice = adata.Amount;
                            adata.ReceivedQty = adata.ReceivedQty;
                            adata.ItemUnitId = adata.UnitId;
                            adata.UnitPrice = adata.UnitPrice;
                            adata.MaterialTypeName = adata.MaterialTypeName;
                           
                            adata.MaterialTypeId = adata.MaterialTypeId;
                            if (adata.PackageWeight == 0 || adata.PackageWeight == undefined || adata.PackageWeight == null) {
                                adata.PackageWeight = 0;
                            } else if (adata.RollAreaInSqMeter == 0 || adata.RollAreaInSqMeter == undefined || adata.RollAreaInSqMeter == null) {
                                adata.RollAreaInSqMeter = 0;
                            } else if (adata.RollLenghtInMeter == 0 || adata.RollLenghtInMeter == undefined || adata.RollLenghtInMeter==0) {
                                adata.RollLenghtInMeter = 0;
                            }
                            adata.AttributeQty = Number(parseFloat(adata.Qty - adata.ReceivedQty).toFixed(2));
                            adata.IssuedWidth = Number(parseFloat(adata.IssuedWidth * (adata.Qty - adata.ReceivedQty)).toFixed(2));

                            adata.RollWidthInMeter = parseFloat(adata.RollWidthInMeter).toFixed(2);
                            adata.TotalCostAfterDiscount = parseFloat(adata.TotalCostAfterDiscount / adata.Qty).toFixed(2);

                           
                            adata.IssuedWidth = parseFloat(adata.IssuedWidth * adata.AttributeQty).toFixed(2);
                            adata.RollLenghtInMeter = parseFloat(adata.RollLenghtInMeter * adata.AttributeQty).toFixed(2);
                            adata.RollAreaInSqMeter = parseFloat(adata.RollAreaInSqMeter * adata.AttributeQty).toFixed(2);
                            adata.PackageWeight = parseFloat(adata.PackageWeight * adata.AttributeQty).toFixed(2);

                            adata.RollWidthInMeter = parseFloat(adata.RollWidthInMeter * adata.AttributeQty).toFixed(2);

                            adata.MaterialTypeName = adata.MaterialTypeName;
                            adata.MaterialTypeId = adata.MaterialTypeId;

                            adata.MaterialTypeId = adata.MaterialTypeId;
                            adata.PBDetailId = adata.PBDetailId;
                           
                            adata.PcPerRoll = adata.PcPerRoll
                            adata.RollPerCarton = adata.RollPerCarton
                            adata.UnitPerCarton = adata.UnitPerCarton
                            adata.RollWeight = adata.RollWeight
                            adata.CartonWeight = adata.CartonWeight
                            adata.CartonSize = adata.CartonSize
                            adata.HsCodeId = adata.HsCodeId
                           adata.UnitPrice = parseFloat(adata.UnitPrice).toFixed(2);

                            adata.CategoryId = adata.CategoryId;
                            adata.CategoryName = adata.CategoryName;
                         

                            var SerialList = [];

                        if (adata.CategoryId == 2 && warrentySerialNoList.length > 0) {
                            angular.forEach(warrentySerialNoList, function (serialNoByPBDetailId) {
                                var SerialNo = {
                                    SerialNo: serialNoByPBDetailId.SerialNo,
                                    PBDetailSerialId: serialNoByPBDetailId.PBDetailSerialId,
                                    IsChecked: false
                                };
                                SerialList.push(SerialNo);
                            });
                        } else if (adata.CategoryId == 2 && adata.NoSerial == false) {
                            alertify.log('Serial No. not found ', 'error', '5000');
                        }

                            adata.SerialList = SerialList;
                                $scope.inv_StockReceiveDetailAdAttributeLst.push(adata);
                                 adata.HeaderOfAttribute = [];
                                var HeaderOfAttribute = [];
                                var hasSerialNo = false;
                                if (SerialList.length > 0)
                                    hasSerialNo = true;

                                adata.HasSerialNo = hasSerialNo;
                                adata.UnitPrice = adata.UnitPrice;
                                adata.MaterialTypeName = adata.MaterialTypeName;
                                adata.MaterialTypeId = adata.MaterialTypeId;
                            $scope.inv_StockReceiveDetailList.push(adata);
                    });
                });
            });
        }

       
    }

    $scope.GetLocalPBDetails = function (LocalData) {

        if ($scope.PBIdDdl==1) {
            $http({
                url: "/PurchaseBill/GetLocalPBById?id=" + LocalData.LPBId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {

                $scope.PBId = LocalData.LPBId;
                $scope.PBNo = LocalData.PBNo;
                $scope.PONo = LocalData.PONo;
                var pDate = LocalData.PBDate.split("/");
                $scope.PBDate = new Date(pDate[2], (parseInt(pDate[1]) - 1), pDate[0]);
                $scope.TempSerial = [];
                $scope.inv_StockReceiveDetailAdAttributeLst = [];
                $scope.inv_StockReceiveDetailList = [];
                angular.forEach(data, function (adata) {
                  //  var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + adata.ItemId).FirstOrDefault();
                  //  var checkCategory = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + ItemCombination.ItemId).FirstOrDefault();

                    var criteria = " [DepartmentId]=0 AND LPBDetailId=" + adata.LPBDetailId;
                    $http({
                        url: '/WarrentyAndSerialNo/GetLocalWarrantyAndSerialNoDynamicForSingle?whereCondition=' + criteria,
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }).success(function (warrentySerialNoList) {
                        $scope.TempSerial = warrentySerialNoList;
                        //if (checkCategory.CategoryId != 2 || (checkCategory.CategoryId == 2)) {
                        //if (warrentySerialNoList > 0 || adata.NoSerial == false) {

                            $scope.inv_StockReceive.ReceiveNo = LocalData.PBNo.replace("LPB", "SR");
                            //var ValueOfAttribute = [];
                            //var a = ItemCombination.AttributeNames.split(',');
                            //for (var i = 0; i < a.length; i++) {
                            //    var val = a[i].split(':');
                            //    ValueOfAttribute.push(val[1].trim());
                            //}
                            //ItemCombination.ValueOfAttribute = ValueOfAttribute;
                          //  var Attribute = ItemCombination;
                            adata.ItemCode = adata.ItemCode;
                            adata.AttributeQty = adata.Qty;
                            adata.Qty = adata.Qty;
                            adata.PBDetailId = adata.PBDetailId;
                            adata.AttributeUnitPrice = adata.Amount;
                            adata.PerUnitPrice = adata.UnitPrice;
                            adata.ReceivedQty = adata.ReceivedQty;
                            adata.MaterialTypeName = adata.MaterialTypeName;
                            adata.MaterialTypeId = adata.MaterialTypeId;

                           
                            if (adata.PackageWeight == 0 || adata.PackageWeight == undefined || adata.PackageWeight == null) {
                                adata.PackageWeight = 0;
                            } else if (adata.RollAreaInSqMeter == 0 || adata.RollAreaInSqMeter == undefined || adata.RollAreaInSqMeter == null) {
                                adata.RollAreaInSqMeter = 0;
                            } else if (adata.RollLenghtInMeter == 0 || adata.RollLenghtInMeter == undefined || adata.RollLenghtInMeter == 0) {
                                adata.RollLenghtInMeter = 0;
                            }
                            adata.ItemUnitId = adata.UnitId;
                            adata.PBDetailId = adata.LPBDetailId;
                            adata.TotalCostAfterDiscount = parseFloat(adata.TotalCostAfterDiscount / adata.Qty).toFixed(2);
                            adata.IssuedWidth = parseFloat(adata.IssuedWidth * adata.AttributeQty).toFixed(2);

                            adata.AttributeQty = Number(parseFloat(adata.Qty - adata.ReceivedQty).toFixed(2));
                            adata.IssuedWidth = Number(parseFloat(adata.IssuedWidth * (adata.Qty - adata.ReceivedQty)).toFixed(2));


                            adata.RollLenghtInMeter = parseFloat(adata.RollLenghtInMeter * adata.AttributeQty).toFixed(2);
                            adata.RollAreaInSqMeter = parseFloat(adata.RollAreaInSqMeter * adata.AttributeQty).toFixed(2);
                            adata.PackageWeight = parseFloat(adata.PackageWeight * adata.AttributeQty).toFixed(2);
                            adata.RollWidthInMeter = parseFloat(adata.RollWidthInMeter * adata.AttributeQty).toFixed(2);

                           adata.UnitPrice = parseFloat(adata.UnitPrice).toFixed(2);
                            adata.CategoryId = adata.CategoryId;

                            adata.MaterialTypeName = adata.MaterialTypeName;
                            adata.MaterialTypeId = adata.MaterialTypeId;


                            adata.PcPerRoll = adata.PcPerRoll
                            adata.RollPerCarton = adata.RollPerCarton
                            adata.UnitPerCarton = adata.UnitPerCarton
                            adata.RollWeight = adata.RollWeight
                            adata.PackageWeight = adata.PackageWeight
                            adata.CartonWeight = adata.CartonWeight
                            adata.CartonSize = adata.CartonSize
                            adata.HsCodeId = adata.HsCodeId

                            adata.CategoryName = adata.CategoryName;

                          

                            var localSerialList = [];

                        if (adata.CategoryId == 2 && warrentySerialNoList.length > 0) {
                                angular.forEach(warrentySerialNoList, function (aSerial) {
                                    var SerialNo = {
                                        SerialNo: aSerial.SerialNo,
                                        LPBDetailSerialId: aSerial.LPBDetailSerialId,
                                        IsChecked: false
                                    };
                                    localSerialList.push(SerialNo);
                                });
                        } else if (adata.CategoryId == 2 && adata.NoSerial == false) {
                                alertify.log('Serial No. not found ', 'error', '5000');
                            }

                            adata.localSerialList = localSerialList;
                            if (adata.ReceivedQty < adata.Qty)
                                $scope.inv_StockReceiveDetailAdAttributeLst.push(adata);
                                adata.HeaderOfadata = [];
                                var HeaderOfadata = [];
                                var hasSerialNo = false;
                            if (localSerialList.length > 0)
                                    hasSerialNo = true;

                                adata.HasSerialNo = hasSerialNo;
                                adata.PerUnitPrice = adata.PerUnitPrice;
                               adata.MaterialTypeName = adata.MaterialTypeName;
                               adata.MaterialTypeId = adata.MaterialTypeId;
                              $scope.inv_StockReceiveDetailList.push(adata);
                           // }
                        //} else {
                        //    alertify.log('Serial No. not found ', 'error', '5000');
                        //}
                        
                    });
                });
            });
        }

        



    }




    $("#txtFromDateForRC").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForRecived = function () {
        $("#txtFromDateForRC").focus();
        $("#txtFromDateForRC").trigger("click");
    }


    $("#txtToDateForRC").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForRecived = function () {
        $("#txtToDateForRC").focus();
        $("#txtToDateForRC").trigger("click");
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForRC').val('');
        $('#txtToDateForRC').val('');
        $('#stockRecivedAndNumber').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.stockRecivedAndNumber = null;
        StockReciveGetPaged(1);
    }

    $scope.StockRecivedSearch = function () {
        StockReciveGetPaged(1);

    }

    function StockReciveGetPaged(curPage) {
       // document.getElementById("StockReportBtnId").disabled = false;

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForRC").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForRC").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.stockRecivedAndNumber != undefined && $scope.stockRecivedAndNumber != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([SR].[ReceiveDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SR].[ReceiveNo] LIKE '%" + $scope.stockRecivedAndNumber + "%' OR [SR].[SupplierName] LIKE '%" + $scope.stockRecivedAndNumber + "%')";

        }
        else if ($scope.stockRecivedAndNumber !== undefined && $scope.stockRecivedAndNumber != null && $scope.stockRecivedAndNumber != "") {
            SearchCriteria = "[SR].[ReceiveDate] LIKE '%" + $scope.stockRecivedAndNumber + "%' OR [SR].[LotNo] LIKE '%" + $scope.stockRecivedAndNumber + "%' OR [SR].[ReceiveNo] LIKE '%" + $scope.stockRecivedAndNumber + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[SR].[ReceiveDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }



        $http({
            url: encodeURI('/Receive/GetPagedStockRecive?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
          

            $scope.stockReciveListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;

            if (data!="") {
                if ($scope.stockReciveListForGrid.length > 0) {
                    angular.forEach($scope.stockReciveListForGrid, function (aSd) {
                        var res1 = aSd.ReceiveDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.ReceiveDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                            aSd.ReceiveDate = date1;
                        }
                    })

                }
                else {
                    alertify.log('Stock Receive  Not Found', 'error', '5000');
                }
            }
           

            

        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            StockReciveGetPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            StockReciveGetPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            StockReciveGetPaged($scope.currentPage);
        }
        //  }


    }

    $scope.OpenReport = function (Item) {

        $window.open("#/StockReciveReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("StockRecive", Item);
       // sessionStorage.setItem("StockRecive", JSON.stringify(Item));
        event.stopPropagation();
    }



});