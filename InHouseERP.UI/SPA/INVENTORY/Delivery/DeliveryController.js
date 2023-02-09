app.controller("DeliveryController", function ($scope, $rootScope, $cookieStore, $http, $filter, $window) {

   // $scope.LoginUser = $cookieStore.get('UserData');


    Load();
    Clear();
   
    function Load() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.branchId = $scope.LoginUser.BranchId;
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Delivery').ScreenId;
        GetUsersPermissionDetails();

        $scope.SalesOrderTypeList = [{ 'SalesOrderTypeId': 1, 'SalesOrderType': 'Local' }, { 'SalesOrderTypeId': 2, 'SalesOrderType': 'Export' }];
        $scope.ddlSalesOrderType = { SalesOrderTypeId: 1 };
        $scope.IsLocal = true;
        $scope.CommercialInvoiceListForDelivery = [];
        $scope.SalesOrderList = [];
        $scope.IsCiDelivery = false;
        GetAllCommercialInvoiceForDelivery();
        DemoDelivery();
        //$scope.VarietyList = [];
        $scope.Storelist = [];
        GetAllVariety();
        GetAllEmployee();
       // GetAllStore();
        DepartmentGetByBranchAndDeptTypeId();
        GetUnit();
       // GetUsersPermissionDetails();
        $scope.SalesOrderDropdowanIsDisable1 = false;
        
    }

    function Clear() {

        DemoDelivery();

        $scope.SerialList = [];
        $scope.ddlWarrentyAndSerialNo = null;
        $scope.warrantyAndSerialNo = "";
        $scope.warrantyAndSerialList = [];
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedDelivery($scope.currentPage);
        $scope.deliveryListForGrid = [];

        $scope.sOrDate = "";
        $scope.ScreenId = $cookieStore.get('DeliveryScreenId');
        $scope.FromScreenId = $cookieStore.get('DeliveryScreenId');
        $scope.found = false;
        $scope.inv_StockDeliveryDetail = {};
        $scope.inv_StockDelivery = {};
        $scope.inv_StockDelivery.DeliveryId = 0;
        $scope.ddlStore = null;
        $scope.DeliveryDetailList = [];
        $scope.inv_stockDeliveryDetailAttributeLst = [];
        $scope.inv_stockDeliveryDetailList = [];
        $scope._inv_StockIssueDetailAdAttribute = [];
       
        $scope.btnSave = "Save";
        var currentDate = new Date();
        //$scope.inv_StockDelivery.DeliveryDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');
        $scope.inv_StockDelivery.BillDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');
        //LoginUser = $cookieStore.get('UserData');
        $scope.ddlDeliverydBy = { "EmployeeId": $scope.LoginUser.EmployeeId };
        $scope.inv_StockDelivery.DeliverydById = $scope.LoginUser.EmployeeId;
        $scope.inv_StockDelivery.DeliverydBy = $scope.LoginUser.FullName;
        GetTopSalesOrderDetailData('Local');
        GetByCombinationand();
        $scope.ddlChallanStore = null;
        $scope.inv_StockDeliveryNonSODetail = {};
        $scope.inv_StockDeliveryNonSO = {};
        $scope.inv_StockDeliveryNonSO.DeliveryId = 0;
        $scope.ddlChallanBy = { "EmployeeId": $scope.LoginUser.EmployeeId };
        $scope.inv_StockDeliveryNonSO.UpdatorId = $scope.LoginUser.EmployeeId;
        $scope.inv_StockDeliveryNonSO.DeliverydBy = $scope.LoginUser.FullName;
        $scope.StockDeliveryNonSODetailList = [];
        $scope.ManualDeliveryList = [];

        $scope.inv_StockDelivery.DeliveryDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        
        //getMaxRequNoByDate();
       // GetMaxOrderNo();
       
        $scope.stockValuationList = [];
       

        //GetMaxStockDeliveryOrderNumber();

        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];
        $scope.EmailSendNotification = {};
        ManualDeliveryGetAll();
    }

    $("#txtDeliveryDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForDelivery = function () {
        $("#txtDeliveryDate").focus();
        $("#txtDeliveryDate").trigger("click");
    }


    //function ReportNotificationDetail_Get() {


    //    $http({
    //        url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'DE',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (notification) {
    //        $scope.ReportNotificationDetailList = notification;


    //        console.log('Mail', $scope.ReportNotificationDetailList);
    //    });

    //}


    function ReportNotificationDetail_Get() {


        $http({

            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'DE',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
            console.log('Mail', $scope.AppNotificationSetupList);
        });

    }


    function AppNotificationLogPost(NotificaitonTitle, DepartmentName) {
        $scope.AppNotificationLogList = [];


        // angular.forEach(SalesOrderList, function (aSO) {
        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle;

            if (aNotify.DepartmentId == 7) {

                if (aNotify.SectionId == $scope.LoginUser.SectionId) {

                    obj.NotificationDetail = ' Delivery No : ' + $scope.inv_StockDelivery.DeliveryNo + ' Company Name : ' + $scope.CompanyName + ' ~ Store Name : ' + DepartmentName + ' ~ Employee Name : ' + $scope.LoginUser.FullName;

                    $scope.AppNotificationLogList.push(obj);
                }
            } else {

            
            
                obj.NotificationDetail = ' Delivery No : ' + $scope.inv_StockDelivery.DeliveryNo + ' Company Name : ' + $scope.CompanyName + ' ~ Store Name : ' + DepartmentName + ' ~ Employee Name : ' + $scope.LoginUser.FullName;
                $scope.AppNotificationLogList.push(obj);
            }

            // })


        })


        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) { });
    }


    function ManualDeliveryGetAll() {
        $http({
            url: '/Delivery/GetAllManualDeliveryNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (aDel) {
            $scope.ManualDeliveryList = aDel;
        });
    }
    $scope.SalesOrderDropdowanIsDisable = true;
    if ($scope.ddlSalesOrderType.SalesOrderTypeId) {
        $scope.SalesOrderDropdowanIsDisable = false;
    }

    $scope.GetChange = function (SalesOrderTypeId) {
        $scope.inv_stockDeliveryDetailAttributeLst = [];
        
       
        if ($scope.ddlStore == null) {
            $scope.SalesOrderDropdowanIsDisable = true;
        } else {
            $scope.SalesOrderDropdowanIsDisable = false;
        }
        if (SalesOrderTypeId == 1) {
            $scope.IsLocal = true;
            LoadAllList();
            //$("#ddlStoreSelect2").val('').select2({
            //    placeholder: "Select Department",

            //});
            //$scope.ddlStore = null;
        } else {
            $scope.IsLocal = false;
            $scope.DeliveryList = [];
            $scope.inv_stockDeliveryDetailList = [];
            //$scope.IsCiDelivery = true;
            //$("#ddlStoreSelect2").val('').select2({
            //    placeholder: "Select Department",

            //});
            //$scope.ddlStore = null;
        }
    }
    function GetAllCommercialInvoiceForDelivery() {
        $http({
            url: '/ExpCommercialInvoice/GetAllCommercialInvoice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data) {
                angular.forEach(data, function (e) {
                    var isDate = isNaN(e.CommercialInvoiceDate);
                    if (isDate) {
                        var res1 = e.CommercialInvoiceDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(e.CommercialInvoiceDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            e.CommercialInvoiceDate = date1;

                        }
                    }
                    if (e.IsSubmitted == true && e.DocStatus != 'New Approval Pending') {
                        e.CompanyNameWithCiNum = e.DcChallanNo + "  ~  " + e.CompanyName;
                        $scope.CommercialInvoiceListForDelivery.push(e);
                    }
                });
            }
        });
    }

    $scope.GetSalesOrderForDeliveryByCommercialInvoiceId = function (CommercialInvoiceId) {

        $http({
            url: '/SalesOrder/GetSalesOrderForDeliveryByCommercialInvoiceId?CommercialInvoiceId=' + CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalesOrderList = data;
            $scope.DeliveryList = [];
            $scope.IsCiDelivery = true;
            angular.forEach($scope.SalesOrderList, function (aSd) {
                var FilteredItem = Enumerable.From($scope.$StockDeliveryList).Where("$.SalesOrderId === " + aSd.SalesOrderId).FirstOrDefault();
                if (FilteredItem != undefined) {
                    $scope.DeliveryList.push(FilteredItem);
                }
                //else {
                //    $scope.DeliveryList = [];
                //    $scope.inv_stockDeliveryDetailList = [];
                //}
                

            });

            
            
        });
    }
    function LoadAllList() {
        $('#ddlCommercialInvoiceAll').select2('destroy');
        $("#ddlCommercialInvoiceAll").val('').select2({
            placeholder: "Search for: Commercial Invoice No",
            //theme: "classic"
        });
        $scope.ddlSalesOrderType = { SalesOrderTypeId: 1, SalesOrderType: 'Local' };
        $scope.DeliveryList = [];
        $scope.inv_stockDeliveryDetailList = [];
        $scope.IsCiDelivery = false;
        $scope.ddlCommercialInvoiceForDelivery = null;
    }
    $scope.LoadAllList = function () {
        LoadAllList();
        
    }

 


    //$scope.GetByStockFromDepartment = function (ddlStore) {
    //    $http({
    //        // url: '/StockValuation/GetAll_CurrentStock',
    //        url: '/Item/GetByDepartmentAndCombinationLike?departmentId=' + ddlStore.DepartmentId,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {

    //        $scope.stockValuationList = JSON.parse(data);
    //    });
    //}


   

    function DemoDelivery() {
        var dateParts =
            ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];

        $http({
            url: '/Delivery/GetMaxStockDeliverySLNumber',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (DeliveryNo) {
            $scope.MaxDeliveryNo = DeliveryNo;
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
                $scope.inv_StockDelivery.DeliveryNo = 'DN/' + $scope.finYearEPZ + '/' + $scope.MaxDeliveryNo;
            //$scope.inv_StockDelivery.DeliveryNo = data;
            });
        });
    }

    //$scope.getMaxDeliveryNo = function () {
      
    //  //  GetMaxOrderNo();
    //}

    //function GetMaxStockDeliveryOrderNumber() {
    //    var dateParts =
    //        ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    //    var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];

    //    $http({
    //        url: '/Delivery/GetMaxStockDeliveryOrderNumber?deliveryDate=' + from,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        //$scope.inv_Requisition = data;
    //        $scope.inv_StockDelivery.OrderNo = data;
    //      //$scope.inv_StockDelivery.DeliveryNo = "DN/" + $scope.getAllYear + "/" + parseInt(data);

    //    });
    //}

    function SuccessMessage(message) {
        return '<div class="alert alert-warning  alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="topInfo">' + message + '</div></div>';
    }
    $scope.GetTopSalesOrderDetailData = function (SalesOrderType) {
        GetTopSalesOrderDetailData(SalesOrderType)
    }
    $scope.StockDeliveryListItem = [];

    function GetTopSalesOrderDetailData(SalesOrderType) {
        //$scope.StockDeliveryList = [];
        var criteria = 0;
        $http({
            url: '/SalesOrder/GetTopForDelivery?topQty=' + criteria,
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
            $scope.StockDeliveryListItem = data;
            $scope.StockDeliveryList = Enumerable.From($scope.StockDeliveryListItem).Distinct(function (x) {
                return x.SalesOrderId;
            }).ToArray();

            $scope.IsCiDelivery = false;
            console.log('$scope.StockDeliveryList', $scope.StockDeliveryList);
            $scope.$StockDeliveryList = $scope.StockDeliveryList;

            $scope.StockDeliveryList = [];
            angular.forEach($scope.$StockDeliveryList, function (aData) {
                if (aData.SalesOrderType == SalesOrderType) {
                    $scope.StockDeliveryList.push(aData);
                }
            })

            //$scope.StockDeliveryList = Enumerable.From($scope.$StockDeliveryList).Where("$.SalesOrderType ===" + SalesOrderType).ToArray();
            

        });
    }

    function GetUnit() {
        $http({
            url: '/Unit/GetAllUnit',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.unitlist = data;
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

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
        });
    }

    //function GetAllStore() {
    //    $http({
    //        url: '/Department/GetAllStore',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        $scope.Storelist = data;
            
    //    });
    //}
  

    function DepartmentGetByBranchAndDeptTypeId() {

        $http({

           // url: '/Department/DepartmentGetByBranchAndDeptTypeId?departmentTypeIds=' + '1,3' + '&branchId=' + $scope.branchId,
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
           // $scope.Storelist = data;
            angular.forEach(data, function (aData) {
                if (aData.DepartmentName.match(/Store/gi)) {
                    aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                    $scope.Storelist.push(aData);
                }
            })

           
            //console.log('Load for Storelist', data);
        });
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
                if (aPermissionDetails.FunctionName == 'Create' ) {
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

    $scope.SalesOrderList = [];

    function GetAllSalesOrder() {
        //  var cretira = "SO.[CompanyId]=" + CompanyId;
        var cretira = "1=1";
            $http({
                url: '/SalesOrder/GetSalesOrderDynamic?searchCriteria=' + cretira,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (salesOrder) {
                $scope.StockDeliveryList = salesOrder;

                angular.forEach($scope.StockDeliveryList,function (adata) {
                    var res1 = adata.SalesOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDueDate1 = new Date(parseInt(adata.SalesOrderDate.substr(6)));
                        var date1 = ($filter('date')(parsedDueDate1, 'dd/MM/yyyy')).toString();
                        adata.SalesOrderDate = date1;
                    }
                })

            });
     


    }

    $scope.UpdateDelivery = function (DeliveryUpdate) {

      
        var Department = $scope.Storelist.filter((data => data.DepartmentId == DeliveryUpdate.DeliveryFromDepartmentId));

        //$scope.ddlStore = { DepartmentId: Department[0].DepartmentId, DepartmentName: Department[0].DepartmentName };
        $scope.DepartmentName = Department[0].DepartmentName;

       //AppNotificationLogPost("Delivery Modified", Department[0].DepartmentName);

       // GetTopSalesOrderDetailData(DeliveryUpdate.SalesOrderType);
      //  GetSalesOrderDetailsLoad(DeliveryUpdate.SalesOrderId);
        $scope.inv_StockDelivery = DeliveryUpdate;
        $scope.inv_stockDeliveryDetailAttributeLst = [];
        $scope.btnSave = "Update";
        $scope.inv_StockDelivery.ManualDeliveryNo = DeliveryUpdate.ManualDeliveryNumber;
        $scope.ddlSalesOrder = { SalesOrderId: DeliveryUpdate.SalesOrderId };

        $("#ddlStoreSelect2").val(DeliveryUpdate.DeliveryFromDepartmentId).select2({
            theme: "classic"
        });

        $scope.StockDeliveryList = [];
        var cretira = "1=1"; 
        $http({
            url: '/SalesOrder/GetSalesOrderDynamic?searchCriteria=' + cretira,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (salesOrder) {

            $scope.StockDeliveryList = salesOrder;

            angular.forEach($scope.StockDeliveryList, function (adata) {
                var res1 = adata.SalesOrderDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDueDate1 = new Date(parseInt(adata.SalesOrderDate.substr(6)));
                    var date1 = ($filter('date')(parsedDueDate1, 'dd/MM/yyyy')).toString();
                    adata.SalesOrderDate = date1;
                }
            });

            var StockDeliveryListItem = $scope.StockDeliveryList.filter((aData) => aData.SalesOrderId == DeliveryUpdate.SalesOrderId && DeliveryUpdate.SalesOrderType == aData.SalesOrderType);
           
            $scope.CompanyName = StockDeliveryListItem[0].CompanyName;
          //  setTimeout(function () {
                if (StockDeliveryListItem.length > 0) {

                    $("#ddlSalesOrder").val(StockDeliveryListItem[0].SalesOrderId).select2({
                        theme: "classic"
                    });

                  
                }
         
             $scope.ddlSalesOrder = { SalesOrderId: DeliveryUpdate.SalesOrderId };
            //}, 100);
           
        });


       // GetAllSalesOrder();
      

       

        $scope.SalesOrderTypeList = [{ 'SalesOrderTypeId': 1, 'SalesOrderType': 'Local' }, { 'SalesOrderTypeId': 2, 'SalesOrderType': 'Export' }];
        var soTypeList = $scope.SalesOrderTypeList.filter((aSo) => aSo.SalesOrderType == DeliveryUpdate.SalesOrderType);

        $scope.SalesOrderTypeList = soTypeList;
        setTimeout(function () {
            if (soTypeList.length > 0) {
                $scope.ddlSalesOrderType = { SalesOrderTypeId: soTypeList[0].SalesOrderTypeId }
            }
        }, 100);

       
        $scope.ddlStore = { DepartmentId: DeliveryUpdate.DeliveryFromDepartmentId }

        $("#ddlDeliverydBy").val(DeliveryUpdate.DeliverydById).select2({
            theme: "classic"
        });
        $scope.ddlDeliverydBy = { EmployeeId: DeliveryUpdate.DeliverydById }
     

        $http({
            url: "/Delivery/GetStockDeliveryDetailByDeliveryId?DeliveryId=" + DeliveryUpdate.DeliveryId,
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).success(function (data) {
            $scope.inv_stockDeliveryDetailAttributeLst = data;
        })
    }

    function SaveSDelivery(status) {
        var detaildata = [];
        var serialList = [];
        var serialListForServer = [];
        var errorCount = [];
        var errorMessage = "";
        var itemAddAttIdStringConcat = "";

        var deliverDateText = $('#txtDeliveryDate').val();
        //var deliverDate = deliverDateText.split("/");
        //var dDate = new Date(deliverDate[2], deliverDate[1] - 1, deliverDate[0]);

        //if (deliverDateText < $scope.sOrDate) {
        //    $('#txtDeliveryDate').val(deliverDateText);
        //    alertify.log("Delivery date can not before Sales Order date.", "error", "5000");
        //    return;
        //}

       

        $http({
            url: "/StockValuation/GetByDepartmentAndItemAddAttId?departmentId=" + $scope.ddlStore.DepartmentId + "&itemAddAttId=" + itemAddAttIdStringConcat,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (stockValuationAttributeList) {
            for (var i = 0; i < $scope.inv_stockDeliveryDetailAttributeLst.length; i++) {
                var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + $scope.inv_stockDeliveryDetailAttributeLst[i].ItemId).FirstOrDefault();

                //$scope.inv_stockDeliveryDetailAttributeLst[i].ItemName = ItemCombination.AttributeNames.split(':')[1];
                var deliveryQty = $scope.inv_stockDeliveryDetailAttributeLst[i].DeliveryQuantity;
                //if (deliveryQty > $scope.inv_stockDeliveryDetailAttributeLst[i].StockQty) {
                //    alertify.log('Stock quantity less than Delivery quantity', 'error', '5000');
                //    return;
                //}

                //if ((deliveryQty + $scope.inv_stockDeliveryDetailAttributeLst[i].DeliveredQty) > $scope.inv_stockDeliveryDetailAttributeLst[i].OrderQty) {
                //    errorCount++;
                //    errorMessage = 'Cannot deliver more than order quantity for ' + $scope.inv_stockDeliveryDetailAttributeLst[i].ItemName;
                //    break;
                //}

                if ($scope.inv_stockDeliveryDetailAttributeLst[i].SerialList != undefined) {
                    if ($scope.inv_stockDeliveryDetailAttributeLst[i].SerialList.length) {
                        var serial = Enumerable.From($scope.inv_stockDeliveryDetailAttributeLst[i].SerialList).Where('$.IsChecked').ToArray()
                        serial.ItemId = $scope.inv_stockDeliveryDetailAttributeLst[i].ItemId;
                        serialList.push(serial);

                        var numberOfCheckedSerialNo = Enumerable.From($scope.inv_stockDeliveryDetailAttributeLst[i].SerialList).Where('$.IsChecked').Count();

                        if ($scope.inv_stockDeliveryDetailAttributeLst[i].SerialList[0].SerialNo!=="0") {
                             if (numberOfCheckedSerialNo != deliveryQty) {
                                errorCount++;
                                errorMessage = 'Number of checked serial  and delivery quantity does not match for ' + $scope.inv_stockDeliveryDetailAttributeLst[i].ItemName;
                                break;
                            }
                        }
                       
                    }
                }
               
            }

            if (errorCount > 0) {
                alertify.log(errorMessage, 'error', '5000');
                return;
            }
            var departmentId = $scope.inv_StockDelivery.DeliveryFromDepartmentId;
            console.log(serialList);
            angular.forEach(serialList, function (aSerial) {
                if (aSerial.length) {
                    angular.forEach(aSerial, function (serialData) {
                        var pbDetailSerial = {
                            PBDetailSerialId: serialData.PBDetailSerialId,
                            DepartmentId: departmentId,
                            ItemId: aSerial.ItemId,
                            PBDetailId: 0,
                            WarrentyInDays: 0,
                            SerialNo: serialData.SerialNo,
                            WarrentyInDays: serialData.WarrentyInDays,
                            IsLocal: serialData.IsLocal,
                            Serial_From: serialData.Serial_From
                        };
                        serialListForServer.push(pbDetailSerial);
                    });
                }
            });

            $scope.inv_StockDelivery.IsApproved = $scope.HasApproval ? true : false;
            $scope.inv_StockDelivery.CreatorId = $scope.LoginUser.UserId;
            $scope.inv_StockDelivery.UpdatorId = $scope.LoginUser.UserId;
            $scope.inv_StockDelivery.DepartmentId = $scope.ddlStore.DepartmentId;
            $scope.inv_StockDelivery.EmployeeId = $scope.ddlDeliverydBy.EmployeeId;

            if ($scope.ddlCommercialInvoiceForDelivery != undefined) {
                $scope.inv_StockDelivery.CiDcChallanId = $scope.ddlCommercialInvoiceForDelivery.CiDcChallanId;
            }


            if (($scope.inv_StockDelivery.DeliveryId == 0 || $scope.inv_StockDelivery.DeliveryId == undefined) && $scope.CreatePermission) {
                $.ajax({
                    url: "/Delivery/SaveDelivery",
                    contentType: "application/json;charset=utf-8",
                    type: "POST",
                    data: JSON.stringify({ inv_stockDelivery: $scope.inv_StockDelivery, inv_stockDeliveryDetail: $scope.inv_stockDeliveryDetailAttributeLst, serialList: serialListForServer }),
                    success: function (data) {
                        $scope.CompanyName = $scope.ddlSalesOrder.CompanyName;
                        AppNotificationLogPost("Delivery Create", $scope.ddlStore.DepartmentName);
                        var DIdIdsAndNo = data.split(",");
                        var DIds = DIdIdsAndNo[0];
                        var DId = Number(DIds);
                        var DNo = DIdIdsAndNo[1];
                        EmailSend();

                        setTimeout(function () {
                            $('#ddlStoreSelect2').val(null).trigger('change');
                        }, 0);
                        if (data != "") {
                            alertify.log(' Delivery No: ' + DNo + ' ' + status + ' Successfully!', 'success', '5000');
                            LoadAllList();
                            Clear();
                            $scope.deliveryForm.$setPristine();
                            $scope.deliveryForm.$setUntouched();

                        } else {
                            alertify.log('Server Save Errors!', 'error', '10000');
                        }
                    }, error: function (msg) {
                        alertify.log('Server Save Errors!', 'error', '10000');
                    }
                });
            } else {
                alertify.log('You do not have permission to save!', 'error', '10000');
            }
          
        });
    }

    function UpdateSDelivery(status) {

        if ($scope.inv_StockDelivery.DeliveryId > 0 && $scope.RevisePermission) {
            angular.forEach($scope.inv_stockDeliveryDetailAttributeLst, function (aData) {
                aData.ItemDescription = aData.Combination;
            })
            $.ajax({
                url: "/Delivery/SaveDelivery",
                contentType: "application/json;charset=utf-8",
                type: "POST",
                data: JSON.stringify({ inv_stockDelivery: $scope.inv_StockDelivery, inv_stockDeliveryDetail: $scope.inv_stockDeliveryDetailAttributeLst }),
                success: function (data) {
                    AppNotificationLogPost("Delivery Update", $scope.DepartmentName);
                    setTimeout(function () {
                        $('#ddlStoreSelect2').val(null).trigger('change');
                    }, 0);
                    setTimeout(function () {
                        $('#ddlSalesOrder').val(null).trigger('change');
                    }, 0);
                    setTimeout(function () {
                        $('#ddlDeliverydBy').val(null).trigger('change');
                    }, 0);
                    setTimeout(function () {
                        $('#ddlCommercialInvoiceAll').val(null).trigger('change');
                    }, 0);
                    if (data != "") {
                        alertify.log(' Delivery ' + status + ' Successfully!', 'success', '5000');
                        LoadAllList();
                        Clear();
                        $scope.deliveryForm.$setPristine();
                        $scope.deliveryForm.$setUntouched();

                    } else {
                        alertify.log('Server Update Errors!', 'error', '10000');
                    }
                }, error: function (msg) {
                    alertify.log('Server Update Errors!', 'error', '10000');
                }
            });
        } else {
            alertify.log('You do not have permission to Update!', 'error', '10000');
        }
    }


    function EmailSend() {


        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })


        $scope.EmailSendNotification.EmailSubject = "Delivery";
        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        //  $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var currentDate = new Date();
        var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> A new Delivery has been Done. <br/> ' +
            'Delivery No: <strong > ' + $scope.inv_StockDelivery.DeliveryNo + '</strong><br/>' +
            'Delivery Date: <strong>' + ($filter('date')($scope.inv_StockDelivery.DeliveryDate, 'dd/MM/yyyy')).toString() + '</strong><br/>' +
            //'Company Name: <strong>' + $scope.ddlInternalWorkOrder.CompanyName + '</strong><br/>' +
           'Deliveryd By: <strong>' + $scope.ddlDeliverydBy.FullName + '</strong>' + '<br/>' +
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

   


    //$scope.LoadDataWhenDepartmentChange = function () {
    //    $scope.inv_stockDeliveryDetailList = [];
    //    $scope.inv_stockDeliveryDetailAttributeLst = [];
    //    if (ddlCommercialInvoiceForDelivery == undefined) {
    //        GetTopSalesOrderDetailData();
    //    }
        
    //    GetByCombinationand();
    //}

    



    $("#txtFromDateForDC").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForDelivery = function () {
        $("#txtFromDateForDC").focus();
        $("#txtFromDateForDC").trigger("click");
    }


    $("#txtToDateForDC").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForDelivery = function () {
        $("#txtToDateForDC").focus();
        $("#txtToDateForDC").trigger("click");
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForDC').val('');
        $('#txtToDateForDC').val('');
        $('#IWOAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchDcOredrDcNoAndCompanyName = null;
        GetPagedDelivery(1);
    }

    $scope.DeliverySearch = function () {
        GetPagedDelivery(1);

    }
   
    function GetPagedDelivery(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
        
        var formDateChange = $("#txtFromDateForDC").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForDC").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchDcOredrDcNoAndCompanyName != undefined && $scope.SearchDcOredrDcNoAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([SD].[DeliveryDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SD].[DeliveryNo] LIKE '%" + $scope.SearchIWOAndCompanyName + "%' OR C.CompanyName LIKE '%" + $scope.SearchIWOAndCompanyName + "%' OR [SO].[SalesOrderNo] LIKE '%" + $scope.SearchIWOAndCompanyName + "%')";
        
        }
        else if ($scope.SearchDcOredrDcNoAndCompanyName !== undefined && $scope.SearchDcOredrDcNoAndCompanyName != null && $scope.SearchDcOredrDcNoAndCompanyName != "") {
            SearchCriteria = "[SD].[DeliveryNo] LIKE '%" + $scope.SearchDcOredrDcNoAndCompanyName + "%' OR C.CompanyName LIKE '%" + $scope.SearchDcOredrDcNoAndCompanyName + "%'  OR [SO].[SalesOrderNo] LIKE '%" + $scope.SearchDcOredrDcNoAndCompanyName + "%'";
            
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[SD].[DeliveryDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
          
        }
       


        $http({
            url: encodeURI('/Delivery/GetPagedDelivery?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.deliveryListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;
            $scope.AttachPoNameList = [];


            angular.forEach(data.ListData, function (aSd) {

                if (aSd.AttachmentName == "" || aSd.AttachmentName == undefined || aSd.AttachmentName == null) {
                    var soAttchName = aSd.AttachmentName;
                    aSd.AttachmentNameFilter = soAttchName;
                    $scope.AttachPoNameList.push(soAttchName);
                } else {
                    var soAttchName = aSd.AttachmentName.split(",");
                    $scope.AttachPoNameList.push(soAttchName);
                    if (soAttchName != "") {
                        aSd.AttachmentNameFilter = soAttchName;
                    }

                }
            });

            if ($scope.deliveryListForGrid.length > 0) {
                angular.forEach($scope.deliveryListForGrid, function (aSd) {
                    var res1 = aSd.DeliveryDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.DeliveryDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.DeliveryDate = date1;
                    }
                 
                })

               

              

            }
            else {
                alertify.log('Delivery  Not Found', 'error', '5000');
            }



        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedDelivery($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedDelivery($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedDelivery($scope.currentPage);
        }
        //  }


    }





    //$scope.CheckDuplicateDeliveryNo = function () {
    //    var date = $("#txtDeliveryDate").val();
    //    if (date == "") {
    //        $("#txtDeliveryDate").focus();
    //        alertify.log('Please select date.', 'error', '5000');
    //        return;
    //    }
    //    if ($scope.inv_StockDelivery.DeliveryNo == "" || angular.isUndefined($scope.inv_StockDelivery.DeliveryNo) || $scope.inv_StockDelivery.DeliveryNo == null) {
    //        GetMaxProductionNo();
    //    } else {
    //        $http({
    //            url: '/Delivery/CheckDuplicateDeliveryNo?DeliveryNo=' + $scope.inv_StockDelivery.DeliveryNo + "&date=" + date,
    //            method: 'GET',
    //            headers: { 'Content-Type': 'application/json' }
    //        }).success(function (data) {
    //            if (data.length > 0) {
    //                $scope.found = true;
    //                alertify.log("Delivery No. " + $scope.inv_StockDelivery.DeliveryNo + ' already exists!', 'error', '3000');
    //                $scope.inv_StockDelivery.DeliveryNo = "";
    //                $('#txtDeliveryDate').focus();
    //            } else {
    //                $scope.found = false;
    //            }
    //        });
    //    }
    //}

    $scope.RemoveItemAttr = function (aDetail) {
        var ind = $scope.inv_stockDeliveryDetailAttributeLst.indexOf(aDetail);
        $scope.inv_stockDeliveryDetailAttributeLst.splice(ind, 1);
        angular.forEach($scope.inv_stockDeliveryDetailList, function (ainv_StockDeliveryDetaillst) {
            if (Enumerable.From($scope.inv_stockDeliveryDetailAttributeLst).Where('$.ItemId==' + ainv_StockDeliveryDetaillst.ItemId).ToArray().length < 1) {
                var ind = $scope.inv_stockDeliveryDetailList.indexOf(ainv_StockDeliveryDetaillst);
                $scope.inv_stockDeliveryDetailList.splice(ind, 1);
            }
        });
    }

    function SumAttQty() {

        var isDelivery = false;
        angular.forEach($scope.inv_stockDeliveryDetailAttributeLst, function (aDetailAdAttribute) {

            //if (aDetailAdAttribute.stockQtyItem > aDetailAdAttribute.DeliveryQuantity) {
            //    aDetailAdAttribute.DeliveryQuantity = aDetailAdAttribute.stockQtyItem;
            //}
            if (aDetailAdAttribute.DeliveryQuantity <= 0 || aDetailAdAttribute.DeliveryQuantity == undefined || aDetailAdAttribute.DeliveryQuantity == null) {

                //aDetailAdAttribute.DeliveryQuantity = aDetailAdAttribute.OrderQty - aDetailAdAttribute.DeliveredQty;
                aDetailAdAttribute.DeliveryQuantity;
                isDelivery = false;
                //alertify.log('Delivery quantity can not be blank or zero.  ', 'error', '5000');
            }
            else if (aDetailAdAttribute.DeliveryQuantity > (aDetailAdAttribute.OrderQty - aDetailAdAttribute.DeliveredQty)) {

                aDetailAdAttribute.DeliveryQuantity = aDetailAdAttribute.OrderQty - aDetailAdAttribute.DeliveredQty;

                if ((aDetailAdAttribute.SubCategoryId == 1 || aDetailAdAttribute.SubCategoryId == 3) && aDetailAdAttribute.OrderUnitId == 2) { //Roll
                    aDetailAdAttribute.DeliveryQuantityInPcs = aDetailAdAttribute.DeliveryQuantity * aDetailAdAttribute.PcPerRoll;
                } else if (aDetailAdAttribute.SubCategoryId == 1 || aDetailAdAttribute.SubCategoryId == 3){
                    aDetailAdAttribute.DeliveryQuantityInPcs = aDetailAdAttribute.DeliveryQuantity;
                }
                
                isDelivery = true;
               
                //alertify.log('Delivery quantity can not more than ' + aDetailAdAttribute.DeliveryQuantity + '.', 'error', '5000');
            }



            //else if (aDetailAdAttribute.stockQtyItem > (aDetailAdAttribute.OrderQty - aDetailAdAttribute.DeliveredQty) ) {

            //}
        });
        angular.forEach($scope.inv_stockDeliveryDetailList, function (aStockDeliveryDetail) {
            aStockDeliveryDetail.SDQuantity = Enumerable.From($scope.inv_stockDeliveryDetailAttributeLst).Where("$.SalesOrderDetailId == '" + aStockDeliveryDetail.SalesOrderDetailId + "'").Sum('$.DeliveryQuantity');

        });

        if (isDelivery) {
            alertify.log('Delivery Qty not greater than Order Quantity ', 'error', '5000');
        }


        //angular.forEach($scope.inv_stockDeliveryDetailAttributeLst, function (aAttr) {
        //    if (aAttr.stockQtyItem > aAttr.OrderQty) {

        //    }
        //    //console.log(aAttr);
        //})

    }

    $scope.SumAttQty = function (AdAttribute) {
       // SumAttQty();
        if ((AdAttribute.SubCategoryId == 1 || AdAttribute.SubCategoryId == 3) && AdAttribute.OrderUnitId == 2) {
            AdAttribute.DeliveryQuantityInPcs = AdAttribute.DeliveryQuantity * AdAttribute.PcPerRoll;
        } else if (AdAttribute.SubCategoryId == 1 || AdAttribute.SubCategoryId == 3){
            AdAttribute.DeliveryQuantityInPcs = AdAttribute.DeliveryQuantity;
        }
        

    }

    $scope.SaveStockDelivery = function () {

        if ($scope.btnSave != 'Update') {
            for (var i = 0; i < $scope.inv_stockDeliveryDetailAttributeLst.length; i++) {
                if ($scope.inv_stockDeliveryDetailAttributeLst[i].stockQtyItem == undefined) {
                    $scope.inv_stockDeliveryDetailAttributeLst[i].stockQtyItem = 0;
                    isStock = false;
                    alertify.log("You do not have sufficient stock to deliver this product", "error", "5000");
                    return;
                }
                if ($scope.inv_stockDeliveryDetailAttributeLst[i].SubCategoryId == 1 || $scope.inv_stockDeliveryDetailAttributeLst[i].SubCategoryId == 3) {
                    if ($scope.inv_stockDeliveryDetailAttributeLst[i].stockQtyItem < $scope.inv_stockDeliveryDetailAttributeLst[i].DeliveryQuantityInPcs) {
                        if ($scope.inv_stockDeliveryDetailAttributeLst[i].CategoryId == 2) {
                            alertify.log("You do not have sufficient stock in Hardware: " + $scope.inv_stockDeliveryDetailAttributeLst[i].Combination, "error", "5000");
                            return;
                        } else {
                            alertify.log("You do not have sufficient stock in Finishied Product: " + $scope.inv_stockDeliveryDetailAttributeLst[i].Combination, "error", "5000");
                            return;
                        }

                    }
                } else {
                    if ($scope.inv_stockDeliveryDetailAttributeLst[i].stockQtyItem < $scope.inv_stockDeliveryDetailAttributeLst[i].DeliveryQuantity) {
                        if ($scope.inv_stockDeliveryDetailAttributeLst[i].CategoryId == 2) {
                            alertify.log("You do not have sufficient stock in Hardware: " + $scope.inv_stockDeliveryDetailAttributeLst[i].Combination, "error", "5000");
                            return;
                        } else {
                            alertify.log("You do not have sufficient stock in Finishied Product: " + $scope.inv_stockDeliveryDetailAttributeLst[i].Combination, "error", "5000");
                            return;
                        }

                    }
                }

            }


            var flag = true;
            angular.forEach($scope.inv_stockDeliveryDetailAttributeLst, function (aData) {
                if ((aData.MaterialTypeId == 0 || aData.MaterialTypeId == undefined) && aData.CategoryId != 2) {
                    flag = false;
                }

                aData.ItemDescription = aData.Combination;
            })

            if ($scope.CreatePermission = true) {
                if (flag) {
                    if ($scope.inv_stockDeliveryDetailAttributeLst.length != 0) {
                        alertify.confirm("Are you sure to save?", function (e) {
                            if (e) {
                                SaveSDelivery('Saved');
                            }
                        })
                    } else {
                        alertify.log('Item Details Not Found', 'error', '5000');
                    }

                } else {
                    alertify.log('Material Type Not Found', 'error', '5000');
                }

            }
            else {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
        } else {
            if ($scope.RevisePermission = true) {

                    if ($scope.inv_stockDeliveryDetailAttributeLst.length != 0) {
                        alertify.confirm("Are you sure to save?", function (e) {
                            if (e) {
                                UpdateSDelivery('Update');
                            }
                        })
                    } else {
                        alertify.log('Item Details Not Found', 'error', '5000');
                    }

                

            }
            else {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
        }

        

    }


    document.getElementById("btnSave").disabled = true;

    $scope.DetailEmpty = function () {
        $scope.inv_stockDeliveryDetailAttributeLst = [];
        document.getElementById("btnSave").disabled = true;
    }


    function GetSalesOrderDetailsLoad(aSO) {
        var departmentId = $scope.inv_StockDelivery.DeliveryFromDepartmentId;
        if (angular.isUndefined(departmentId)) {
            alertify.log("Please select a department first. ", "error", "5000");
            return;
        }


        var searchCriteria = "SOD.[SalesOrderId]=" + aSO.SalesOrderId + " AND (A.IsApproved=1 ) and IWD.IsVoid=0";
        $http({
            url: "/Delivery/GetSalesOrderDetailDynamic?searchCriteria=" + searchCriteria + "&orderBy='SalesOrderDetailId'",
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).success(function (data) {
            console.log('Delivery Info', data);
            var msgShowText = "";

            var soDateText = aSO.SalesOrderDate.split("/");
            $scope.sOrDate = new Date(soDateText[2], (parseInt(soDateText[1]) - 1), soDateText[0]);
            $scope.inv_stockDeliveryDetailAttributeLst = [];
            $scope.inv_stockDeliveryDetailList = [];
            angular.forEach(data, function (adata) {

                //if (adata.SubCategoryId == 1 || adata.SubCategoryId == 3) {
                //    adata.DeliveredQty = (adata.DeliveredQty / adata.PcPerRoll).toFixed(2);
                //}

                if (adata.DeliveredQty < adata.OrderQty) {
                    if (adata.DueDate != null) {
                        var res1 = adata.DueDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDueDate1 = new Date(parseInt(adata.DueDate.substr(6)));
                            var date1 = ($filter('date')(parsedDueDate1, 'dd/MM/yyyy')).toString();
                            adata.DueDate = date1;
                        }
                    }

                    //angular.forEach($scope.stockValuationList, function (aData) {
                    //    if (adata.CategoryId == 2) {
                    //        if (aData.ItemId == adata.ItemId && aData.DepartmentId == $scope.ddlStore.DepartmentId) {
                    //            adata.stockQtyItem = aData.CurrentQuantity;
                    //            adata.StockUnitName = aData.UnitName;
                    //        }
                    //    } else if (adata.SubCategoryId == 3) {
                    //        if (aData.ItemId == adata.ItemId && aData.MaterialTypeId == adata.MaterialTypeId && aData.LabelBrandId == adata.LabelBrandId && aData.DepartmentId == $scope.ddlStore.DepartmentId) {
                    //            adata.stockQtyItem = aData.CurrentQuantity;
                    //            adata.StockUnitName = aData.UnitName;

                    //        }
                    //    }
                    //    else {
                    //        if (aData.ItemId == adata.ItemId && aData.MaterialTypeId == adata.MaterialTypeId && aData.DepartmentId == $scope.ddlStore.DepartmentId) {
                    //            adata.stockQtyItem = aData.CurrentQuantity;
                    //            adata.StockUnitName = aData.UnitName;

                    //        }

                    //    }


                    //})
                    var LabelBrandId = 0;
                    $scope.PaperTypeId = adata.MaterialTypeId;
                    if (adata.LabelBrandId == 0) {
                        LabelBrandId = null;
                        adata.LabelBrandId = 0;
                    } else {
                        LabelBrandId = adata.LabelBrandId;
                        adata.LabelBrandId = adata.LabelBrandId;
                    }
                    //if (adata.MaterialTypeId == 59 ) {
                    //    $scope.PaperTypeId = null;
                    //}
                    if (adata.MaterialTypeId ==0) {
                        $scope.PaperTypeId = null;
                    }
                    
                  

                    $http({
                        url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + $scope.ddlStore.DepartmentId + "&ItemId=" + adata.ItemId + "&MaterialTypeId=" + $scope.PaperTypeId + "&LabelBrandId=" + LabelBrandId,
                        method: "GET",
                        headers: { 'Content-Type': "application/json" }
                    }).success(function (data) {
                        if (data.length > 0) {
                            adata.stockQtyItem = data[0].CurrentQuantity;
                            adata.StockUnitName = data[0].UnitName;
                        } else {
                            adata.stockQtyItem = 0;
                            adata.StockUnitName = "";
                        }


                    });


                    if (adata.CategoryId != 2) {

                        $scope.inv_StockDelivery.SalesOrderId = aSO.SalesOrderId;

                        adata.DeliveryQuantity = adata.OrderQty - adata.DeliveredQty;
                        if ((adata.SubCategoryId == 1 || adata.SubCategoryId == 3) && adata.OrderUnitId == 2) {
                            adata.DeliveryQuantityInPcs = adata.DeliveryQuantity * adata.PcPerRoll;
                        } else if (adata.SubCategoryId == 1 || adata.SubCategoryId == 3) {
                            adata.DeliveryQuantityInPcs = adata.DeliveryQuantity;
                        }

                        adata.DeliveryUnitPrice = adata.OrderPrice;
                        adata.DeliveryUnitId = adata.OrderUnitId;




                        document.getElementById("btnSave").disabled = false;
                        $scope.inv_stockDeliveryDetailAttributeLst.push(adata);


                    } else if (adata.CategoryId == 2) {

                        adata.DeliveryQuantity = adata.OrderQty - adata.DeliveredQty;
                        adata.DeliveryUnitPrice = adata.OrderPrice;
                        $scope.inv_StockDelivery.SalesOrderId = aSO.SalesOrderId;
                        adata.DeliveryUnitId = adata.OrderUnitId;
                        var criteria = "HSWS.[DepartmentId]=" + $scope.ddlStore.DepartmentId + " AND ItemId=" + adata.ItemId;

                        $http({
                            url: '/WarrentyAndSerialNo/GetWarrantyAndSerialNoDynamicForSingle?whereCondition=' + criteria,
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' }
                        }).success(function (warrentySerialNoList) {
                            var SerialList = [];

                            if (warrentySerialNoList.length) {
                                angular.forEach(warrentySerialNoList, function (serialNoByPBDetailId) {

                                    var SerialNo = {
                                        SerialNo: serialNoByPBDetailId.SerialNo,
                                        WarrentyInDays: serialNoByPBDetailId.WarrentyInDays,
                                        PBDetailSerialId: serialNoByPBDetailId.PBDetailSerialId,
                                        IsChecked: false,
                                        IsLocal: serialNoByPBDetailId.IsLocal,
                                        Serial_From: serialNoByPBDetailId.Serial_From,
                                    };
                                    SerialList.push(SerialNo);
                                });

                                adata.SerialList = SerialList;
                                $scope.inv_stockDeliveryDetailAttributeLst.push(adata);

                            } else if (adata.CategoryId == 2 && adata.NoSerial == false) {
                                alertify.log(adata.Combination.split(' - ')[0] + "Serial No. Not Found", "error", "5000");
                            } else {
                                $scope.inv_stockDeliveryDetailAttributeLst.push(adata);
                            }



                        });
                        document.getElementById("btnSave").disabled = false;
                    }
                    else if (adata.CategoryId == 2 || !$scope.inv_stockDeliveryDetailAttributeLst.SerialList.length) {

                        alertify.log(adata.Combination.split(' - ')[0] + " Serial No. Not Found", "error", "5000");
                    }



                }



            });
        });
    }

    function GetAllCurrentStock() {

    }
    $scope.GetSalesOrderDetails = function (aSO) {

        if ($scope.btnSave !== "Update") {
            GetSalesOrderDetailsLoad(aSO);
        }
            
       
       
       
    }

    $scope.CountCheckedDeliveryQuantity = function (stockDeliveryDetails) {
        var qty = 0;
        angular.forEach(stockDeliveryDetails.SerialList, function (sData) {
            if (sData.IsChecked) {
                qty++;
                if (stockDeliveryDetails.OrderQty < qty) {
                    sData.IsChecked = false;
                }

            }
        });
       
        stockDeliveryDetails.DeliveryQuantity = qty;
        SumAttQty();
    };

    //$scope.getMaxDeliveryNo = function () {
    //    var date = $('#txtDeliveryDate').val();
    //    $scope.inv_StockDelivery.BillDate = date;
    //}

    $scope.resetForm = function () {

     
       
        Load();
        Clear();
        //$('#ddlStoreSelect2').select2('destroy');
      

        setTimeout(function () {
            $('#ddlStoreSelect2').val(null).trigger('change');
        },0);
        $scope.IsNonSO = false;
        //$scope.deliveryForm.$setPristine();
        //$scope.deliveryForm.$setUntouched();
        setTimeout(function () {
           
            $('#ddlSalesOrder').val(null).trigger('change');
        }, 0);
        //$("#ddlSalesOrder").val('').select2({
        //    theme: "classic"
        //});
    }

    $scope.resetFormChk = function () {
        Clear();
        $scope.deliveryForm.$setPristine();
        $scope.deliveryForm.$setUntouched();
    }

    $scope.addChallanItem = function () {
        var itemChk = Enumerable.From($scope.StockDeliveryNonSODetailList).Where("$.ItemDescription.toLowerCase() === '" + $scope.inv_StockDeliveryNonSODetail.ItemDescription.toLowerCase() + "'").FirstOrDefault();
        if (itemChk && itemChk !== null) {
            alertify.log("Item already added to list", "error", "5000");
            return;
        }
        $scope.StockDeliveryNonSODetailList.push($scope.inv_StockDeliveryNonSODetail);
        $scope.inv_StockDeliveryNonSODetail = {};
        $('#txtItemDesc').focus();
    }

    $scope.removeItem = function (aDetail) {
        var ind = $scope.StockDeliveryNonSODetailList.indexOf(aDetail);
        $scope.StockDeliveryNonSODetailList.splice(ind, 1);
    }

    $scope.getMaxchallanNo = function () {
        var date = $('#txtChallanDate').val();
        $http({
            url: '/Delivery/GetMaxDeliveryNo?deliveryDate=' + date,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.inv_StockDeliveryNonSO.DeliveryNo = parseInt(data);
        });
    }

    $scope.SaveChallan = function () {
      //  if ($scope.CreatePermission) {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    var poDate = $("#txtChallanDate").val().split("/");
                    $scope.inv_StockDeliveryNonSO.DeliveryDate = new Date(poDate[2], poDate[1] - 1, poDate[0]);

                    var parms = JSON.stringify({ inv_stockDeliveryNonSO: $scope.inv_StockDeliveryNonSO, inv_stockDeliveryNonSODetailLst: $scope.StockDeliveryNonSODetailList });
                    $http.post('/DeliveryNonSO/SaveDeliveryNonSO', parms).success(function (data) {
                        if (data > 0) {
                            $scope.resetForm();
                            $scope.LoadAllList();
                            $('#ddlStoreSelect2').val(null).trigger('change');
                            alertify.log('Challan Saved Successfully!', 'success', '5000');
                        } else {
                            alertify.log('Server Errors!', 'error', '5000');
                        }
                    }).error(function (data) {
                        alertify.log('Server Errors!', 'error', '5000');
                    });
                }
            })
        //}
        //else {
        //    alertify.log('You do not have permission to save!', 'error', '5000');
        //}
    }

    $scope.GetForTopDeliveryListLoad = [];

    $scope.DepartmentWiseSalesOrderLoad = function (id) {
        $scope.GetForTopDeliveryListLoad = [];

        angular.forEach($scope.StockDeliveryList,function (adata) {
            if (adata.DepartmentId == id) {
                $scope.GetForTopDeliveryListLoad.push(adata);
                console.log("GetForTopDeliveryListLoad", $scope.GetForTopDeliveryListLoad);
            } else if (id==1065) {
                $scope.GetForTopDeliveryListLoad.push(adata);
                console.log("GetForTopDeliveryListLoad", $scope.GetForTopDeliveryListLoad);
            }
            //else {
            //    $scope.GetForTopDeliveryListLoad = [];
            //}
        })
     
    }

    $scope.OpenReport = function (DeliveryId) {
        var obj = {};
        obj.DeliveryId = DeliveryId;
        obj.IsManual = false;
        $window.open("#/DeliveryReport", "popup", "width=850,height=550,left=280,top=80");

        $cookieStore.put("DeliveryId", obj);
        //sessionStorage.setItem("DeliveryId", JSON.stringify(DeliveryId));
        event.stopPropagation();

    };

    //$scope.checkWarrantyAndSerialNoLoad = function (obj) {
    //    $scope.inv_stockDeliveryDetailAttributeLst[0].SerialList = $scope.warrantyAndSerialList;
    //    angular.forEach($scope.inv_stockDeliveryDetailAttributeLst, function (adata) {
    //        angular.forEach(adata.SerialList ,function (data) {
    //            if (obj == data.SerialNo) {
    //                $scope.inv_stockDeliveryDetailAttributeLst[0].SerialList = [];
    //                $scope.inv_stockDeliveryDetailAttributeLst[0].SerialList.push(data);
    //            } 
    //        })
    //    })

    //    if (obj == "") {
    //        $scope.inv_stockDeliveryDetailAttributeLst[0].SerialList = [];
    //        $scope.inv_stockDeliveryDetailAttributeLst[0].SerialList = $scope.warrantyAndSerialList;
    //    }
        
        
        
    //}

    //$scope.warrantyTest = function () {
    //    $scope.inv_stockDeliveryDetailAttributeLst[0].SerialList = $scope.SerialList;
    //    console.log("Warrenty", $scope.inv_stockDeliveryDetailAttributeLst[0].SerialList);
    //}

    //

});
