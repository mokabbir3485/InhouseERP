app.controller("ManualDeliveryEntryController", function ($scope, $rootScope, $cookieStore, $http, $filter, $window) {
   
    Clear();
    function Clear() {


        //  document.getElementById("btnAdd").disabled = false;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Manual Delivery').ScreenId;
        GetUsersPermissionDetails();

       
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.manualStockDeliveryListForGrid = [];
        GetPagedManualStockDelivery($scope.currentPage);

        $scope.SalesOrderTypeList = [{ 'SalesOrderTypeId': 1, 'SalesOrderType': 'Local' }, { 'SalesOrderTypeId': 2, 'SalesOrderType': 'Export' }];
        $scope.StockManualDelivery = {};
        $scope.ManualStockDelivery = {};
        $scope.ItemSearchCombination = null;
        $scope.ddlmatrialPaperType = null;
        $scope.ddlMu = null;
        $scope.ManualStockDelivery.DeliveryDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM d, yyyy');
        $scope.StockManualDeliveryList = [];
        $scope.matrialPaperTypeList = [];
        $scope.ItemUnitlist = [];
        $scope.AllCombinationlist = [];
        $scope.employeeList = [];
        $scope.Storelist = [];
        $scope.companyList = [];
        GetAllmatrialpaperType();
        GetAllItemUnit();
        GetByCombinationand();
        GetAllEmployee();
        DepartmentGetByBranchAndDeptTypeId();
        GetActiveCompany();
        GetCompanyBillingDeliveryAddress();
        GetManualDelivery();
       // GetAllCategory();
        //$scope.CategoryList = [];

      //  $scope.ScreenId = parseInt(sessionStorage.getItem('ManualDeliveryScreenId'));
        //GetUsersPermissionDetails();

        $scope.SalesOrderList = [];
        $scope.ItemCombinationList = [];
        $scope.SaveBtn = "Save";
        //GetAllSalesOrder();
    }



    function formatOutput(optionElement) {
        //if (!optionElement.id) { return optionElement.text; }
        var ItemCombination = '';
        var DescriptionPart = optionElement.text.split('Sub Category: ');
        var SubCategoryName = DescriptionPart[1];
        if (SubCategoryName == 'Pre Printed Label') {
            ItemCombination = '<strong style="background-color: #dd4b39; color: white;">' + DescriptionPart[0] + 'Sub Category: ' + DescriptionPart[1] + '</strong>';
        } else {
            ItemCombination = DescriptionPart[0] + 'Sub Category: ' + DescriptionPart[1];
        }

        var $state = $(
            '<span>' + ItemCombination + '</span>'
        );
        return $state;
    };

    //$("#itemNameSO").select2({
    //    placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
    //    //theme: "classic",
    //    dropdownAutoWidth: false,
    //    templateResult: formatOutput,
    //    width: 'resolve'
    //});

    $("#DeliveryManualSelectitemName").select2({
       // placeholder: "Search for: Item Name and Description ",
        theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });

    $scope.GetChange = function (SalesOrderTypeId) {
        if (SalesOrderTypeId == 1) {
            $scope.IsLocal = true;
         /*   LoadAllList();*/
        } else {
            $scope.IsLocal = false;
            //$scope.DeliveryList = [];
            //$scope.inv_stockDeliveryDetailList = [];
            //$scope.IsCiDelivery = true;
        }
    }



    function GetManualDelivery() {
        var dateParts =
            ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];

        $http({
            url: '/Delivery/GetMaxManualStockDeliverySLNumber',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (DeliveryNo) {
            $scope.MaxDeliveryNo = DeliveryNo;
            $scope.ManualStockDelivery.ManualDeliveryNo1 = 'MD-';
            $scope.ManualStockDelivery.ManualDeliveryNo2 = DeliveryNo;
            $scope.ManualStockDelivery.TemManualDeliveryNumber = DeliveryNo;
            //var criteria = "IsActive=1";
            //$http({
            //    url: '/FiscalYear/GetDynamic?searchCriteria=' + criteria + "&orderBy=FiscalYearId",
            //    method: 'GET',
            //    headers: { 'Content-Type': 'application/json' }
            //}).success(function (data) {
            //    angular.forEach(data, function (aData) {
            //        if (aData.BranchId == 1) {
            //            $scope.finYearHeadOffice = aData.FiscalYearName;
            //        } else if (aData.BranchId == 3) {
            //            $scope.finYearEPZ = aData.FiscalYearName;
            //        }
            //    })
            //    $scope.ManualStockDelivery.ManualDeliveryNo = 'MD/' + $scope.MaxDeliveryNo;
            //    //$scope.inv_StockDelivery.DeliveryNo = data;
            //});
        });
    }

    function GetCompanyBillingDeliveryAddress() {
        if ($scope.ddlCompany != null || $scope.ddlCompany != undefined) {

            $http({
                url: '/Company/GetCompanyBillDeliveryAddressByCompanyId?CompanyId=' + $scope.ddlCompany.CompanyId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (companyAddressList) {
                GetAllSalesOrder();
                $scope.CompanyBillingAddressList = [];
                $scope.CompanyDeliveryAddressList = [];
                angular.forEach(companyAddressList, function (aData) {
                    if (aData.AddressType == 'Billing') {
                        $scope.CompanyBillingAddressList.push(aData);
                    }
                    if (aData.AddressType == 'Delivery') {
                        $scope.CompanyDeliveryAddressList.push(aData);
                    }
                })

            });
        }
    }

    function GetAllSalesOrder() {
        if ($scope.ddlCompany !=null) {
            var cretira = "SO.[CompanyId]=" + $scope.ddlCompany.CompanyId;
            $http({
                url: '/SalesOrder/GetSalesOrderDynamic?searchCriteria=' + cretira,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (salesOrder) {
                $scope.SalesOrderList = salesOrder;

            });
        }
          
       
    }

    

    function GetAllmatrialpaperType() {
        $http({
            url: '/MaterialType/GetAllMaterialType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaperTypeList = data;
            angular.forEach(data, function (aData) {
                aData.Combination = aData.MaterialTypeName + ' ~ ' + aData.MaterialTypeCode
                $scope.matrialPaperTypeList.push(aData);
            })

        });
    }

    function GetAllItemUnit() {
        $http({
            url: '/Unit/GetAllUnit',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemUnitlist = data;
        });
    }


    function GetByCombinationand() {
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            //$scope.AllCombinationlist = angular.fromJson(data);
           // $scope.ItemCombinationList = angular.fromJson(data);
            angular.forEach(data, function (aData) {
                if (aData.CategoryId != 4) {

                    aData.TempItemName = aData.ItemName +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemCode
                        +
                        " ~ " + "Sub Category: " +
                        aData.SubCategoryName;

                    $scope.ItemCombinationList.push(aData)
                }



            })



           
        })
    }




    //$scope.CheckPurchaseTypeFlag = function (ddlCategory) {
    //    $scope.AllCombinationlist = [];
    //    angular.forEach($scope.ItemCombinationList, function (aData) {
    //        if (ddlCategory.CategoryId == aData.CategoryId) {
    //            $scope.AllCombinationlist.push(aData);
    //        } 
    //    })
    //}

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
        });
    }


    function DepartmentGetByBranchAndDeptTypeId() {

        $http({

            // url: '/Department/DepartmentGetByBranchAndDeptTypeId?departmentTypeIds=' + '1,3' + '&branchId=' + $scope.branchId,
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            // $scope.Storelist = data;
            angular.forEach(data, function (aData) {
                aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                $scope.Storelist.push(aData);
            })
           
        });
    }



    function GetActiveCompany() {

        var criteria = "C.IsActive=1";

        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (companyList) {
            $scope.companyList = companyList;

        })

    }

    $scope.CompanyAddress = function (ddlCompany) {
    
        $scope.ManualStockDelivery.Address = ddlCompany.AddressDelivery;
        GetCompanyBillingDeliveryAddress();
    }


    $scope.CheckDuplicateNumber = function () {
        var TempManualDeliveryNo = $scope.StockManualDelivery.ManualDeliveryNo1+''+$scope.StockManualDelivery.ManualDeliveryNo2.trim();
        $http({
            url: '/Delivery/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (duplicate) {
          

        })
    }

    $scope.ItemEdit = function (addItem) {
        $scope.StockManualDelivery.DeliveryQuantity = addItem.DeliveryQuantity;
        $scope.StockManualDelivery.PcPerRoll = addItem.PcPerRoll;
        $scope.StockManualDelivery.DeliveryUnitId = addItem.DeliveryUnitId;
      
        $scope.StockManualDelivery.DeliveryUnitPrice = addItem.DeliveryUnitPrice;

        $("#DeliveryManualSelectitemName").val(addItem.ItemId).select2({
            //placeholder: "Search for: Item Name and Description ",
            theme: "classic",
            dropdownAutoWidth: false
        });

        $("#ddlStockDeliverymatrialPaperTypeId").val(addItem.MaterialTypeId).select2({
            theme: "classic",
            //placeholder: "--Material Paper Type--",
        });

        $scope.ItemSearchCombination = { ItemId: addItem.ItemId, TempItemName: addItem.ItemDescription };

        $scope.ItemDescription = addItem.ItemDescription ;

        $scope.ddlmatrialPaperType = { MaterialTypeId: addItem.MaterialTypeId, Combination: addItem.MaterialTypeName};
        $scope.ddlMu = { ItemUnitId: addItem.ItemUnitId, UnitName: addItem.ItemUnitName };

        $scope.EditForItemId = addItem.ItemId;
       // $scope.SalesInvoiceDetail = addItem;
    }

    $scope.AddStockManualDelivery = function () {

        if ($scope.StockManualDelivery == undefined) {
            $scope.StockManualDelivery.DeliveryQuantity = 0;
            $scope.StockManualDelivery.DeliveryUnitPrice = 0
        }


        if ($scope.EditForItemId == $scope.ItemSearchCombination.ItemId) {
           
            angular.forEach($scope.StockManualDeliveryList, function (aData) {

                if (aData.ItemId == $scope.EditForItemId) {
                  
                    aData.ItemDescription = $scope.ItemDescription;
                    aData.Combination = $scope.ddlmatrialPaperType.Combination;
                    aData.MaterialTypeName = $scope.ddlmatrialPaperType.Combination;
                    aData.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
                    aData.DeliveryUnitId = $scope.ddlMu.ItemUnitId;
                    aData.ItemUnitId = $scope.ddlMu.ItemUnitId;
                    aData.UnitName = $scope.ddlMu.UnitName;
                    aData.ItemUnitName = $scope.ddlMu.UnitName;
                    aData.DeliveryQuantity = $scope.StockManualDelivery.DeliveryQuantity;
                    aData.PcPerRoll = $scope.StockManualDelivery.PcPerRoll;

                  
                   // $scope.StockManualDeliveryList.push(aData);

                    $scope.ItemSearchCombination = null;
                    $scope.ddlmatrialPaperType = null;
                    $scope.ddlMu = null;
                    $scope.StockManualDelivery.DeliveryQuantity = null;
                    $scope.StockManualDelivery.PcPerRoll = null;

                    $("#DeliveryManualSelectitemName").val('').select2({
                        placeholder: "Search for: Item Name and Description ",
                        theme: "classic",
                        dropdownAutoWidth: false
                    });

                    $("#ddlStockDeliverymatrialPaperTypeId").val('').select2({
                        theme: "classic",
                        placeholder: "--Material Paper Type--",
                    });
                }
               
               
            })
           
        }
        else {

            var itemAttr = {};
            if ($scope.StockManualDelivery.PcPerRoll == null || $scope.StockManualDelivery.PcPerRoll == undefined) {
                itemAttr.PcPerRoll = 0;
            } else {
                itemAttr.PcPerRoll = $scope.StockManualDelivery.PcPerRoll;
            }

            if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
                itemAttr.MaterialTypeName = "N/A";
                itemAttr.MaterialTypeId = 0;
            } else {
                itemAttr.MaterialTypeName = $scope.ddlmatrialPaperType.Combination;
                itemAttr.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
            }

            if ($scope.StockManualDelivery.DeliveryQuantity == undefined || $scope.StockManualDelivery.DeliveryQuantity == null) {
                itemAttr.DeliveryQuantity = 0;
            } else {
                itemAttr.DeliveryQuantity = $scope.StockManualDelivery.DeliveryQuantity;
            }
            if ($scope.StockManualDelivery.DeliveryUnitPrice == undefined || $scope.StockManualDelivery.DeliveryUnitPrice == null) {
                itemAttr.DeliveryUnitPrice = 0;
            } else {
                itemAttr.DeliveryUnitPrice = $scope.StockManualDelivery.DeliveryUnitPrice;
            }

            if ($scope.ItemSearchCombination == null || $scope.ItemSearchCombination == undefined) {
                $scope.ItemDescription = "N/A";
            } else {
                itemAttr.ItemId = $scope.ItemSearchCombination.ItemId;
                itemAttr.ItemDescription = $scope.ItemSearchCombination.ItemName + ' ~ ' + $scope.ItemSearchCombination.ItemDescription;
            }

            if ($scope.ddlMu == null || $scope.ddlMu == undefined) {
                itemAttr.ItemUnitName = "N/A";
                itemAttr.UnitName = "N/A";
                itemAttr.DeliveryUnitId = 0;
                itemAttr.ItemUnitId = 0;
            } else {
                itemAttr.ItemUnitName = $scope.ddlMu.UnitName;
                itemAttr.UnitName = $scope.ddlMu.UnitName;
                itemAttr.DeliveryUnitId = $scope.ddlMu.ItemUnitId;
                itemAttr.ItemUnitId = $scope.ddlMu.ItemUnitId;
            }



            if ($scope.StockManualDelivery.WarrantySerialNo == undefined || $scope.StockManualDelivery.WarrantySerialNo == null) {
                itemAttr.WarrantySerialNo = "0"
            } else {
                itemAttr.WarrantySerialNo = $scope.StockManualDelivery.WarrantySerialNo;
            }
            if ($scope.StockManualDelivery.WarrantyDays == undefined || $scope.StockManualDelivery.WarrantyDays == null) {
                itemAttr.WarrantyDays = 0;
            } else {
                itemAttr.WarrantyDays = $scope.StockManualDelivery.WarrantyDays;
            }



            $scope.StockManualDeliveryList.push(itemAttr);


            $("#DeliveryManualSelectitemName").val('').select2({
              //  placeholder: "Search for: Item Name and Description ",
                theme: "classic",
                dropdownAutoWidth: false
            });

            $("#ddlStockDeliverymatrialPaperTypeId").val('').select2({
                theme: "classic",
              //  placeholder: "--Material Paper Type--",
            });

            $scope.ItemSearchCombination = null;
            $scope.ddlmatrialPaperType = null;
            $scope.ddlMu = null;
            $scope.StockManualDelivery.DeliveryQuantity = null;
            $scope.StockManualDelivery.PcPerRoll = null;
        }

        //if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
        //    alertify.log('Matrial Paper Type  must be Entry', 'error', '5000');
        //}
        //if ($scope.ItemSearchCombination == null || $scope.ItemSearchCombination == undefined) {
        //    alertify.log('Item Name must be Entry', 'error', '5000');
        //}
        //else if ($scope.ddlMu == null || $scope.ddlMu == undefined) {
        //    alertify.log('Item unit must be Entry', 'error', '5000');
        //}
        //else if ($scope.StockManualDelivery.DeliveryQuantity == 0 || $scope.StockManualDelivery.DeliveryQuantity == undefined) {
        //    alertify.log('Delivery Quantity must be Entry', 'error', '5000');
        //}
        ////else if ($scope.StockManualDelivery.DeliveryUnitPrice == 0 || $scope.StockManualDelivery.DeliveryUnitPrice == undefined) {
        ////    alertify.log('Delivery Price must be Entry', 'error', '5000');
        ////}
        //else {
      

        
       // }

       
    }


    $scope.Reset = function () {
        Clear();
    }


    $scope.CheckManualDeliveryNo = function () {
        var ManualDeliveryNo = $scope.ManualStockDelivery.ManualDeliveryNo1 + '' + $scope.ManualStockDelivery.ManualDeliveryNo2;
        $http({
            url: '/Delivery/ManualDeliveryNoDuplicateCheek?manualDeliveryNo=' +ManualDeliveryNo,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (manualDelivery) {
            if (manualDelivery[0].IsExist) {
                alertify.log('Manual Delivery No Already Exists!', 'error', '5000');
              //  $scope.ManualStockDelivery.ManualDeliveryNo2 = "";
               // $scope.ManualStockDelivery.ManualDeliveryNo2 = $scope.ManualStockDelivery.TemManualDeliveryNumber;
            } 
        });
    }

    $scope.ManualDeliveryUpdate = function (ManualDelivery) {
        $scope.SaveBtn = "Update";
        $scope.ManualStockDelivery = ManualDelivery;

        var TempManualDeliveryNo1 = $scope.ManualStockDelivery.ManualDeliveryNo.split('-');

        var TempManualDeliveryNo2 = "";
        
        $scope.ManualStockDelivery.ManualDeliveryNo1 = 'MD-';
        $scope.ManualStockDelivery.ManualDeliveryNo2 = TempManualDeliveryNo1[1];

       

        $scope.ddlStore = { DepartmentId: ManualDelivery.DeliveryFromDepartmentId }
      
     

        $("#ddlDeliverydBy").val(ManualDelivery.DeliverydById).select2({
            theme: "classic",
        });
        $("#companyDelivery").val(ManualDelivery.CompanyId).select2({
            theme: "classic",
        });
      

        var cretira = "SO.[CompanyId]=" + ManualDelivery.CompanyId;
        $http({
            url: '/SalesOrder/GetSalesOrderDynamic?searchCriteria=' + cretira,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (salesOrder) {
            angular.forEach(salesOrder, function (aData) {
                if (aData.SalesOrderId == ManualDelivery.SalesOrderId) {
                    $("#ddlSalesOrder").val(ManualDelivery.SalesOrderId).select2({
                        theme: "classic",
                    });
                    $scope.ddlSalesOrder = { SalesOrderId: ManualDelivery.SalesOrderId };
                  
                }
                $scope.SalesOrderList.push(aData);
            })

        });

      

       

        if (ManualDelivery.OrderType == "Local") {
            $scope.SalesOrderTypeId = 1
        } else {
            $scope.SalesOrderTypeId = 2
        }
        $scope.ddlSalesOrderType = { SalesOrderTypeId: $scope.SalesOrderTypeId };

        $scope.ddlCompany = { CompanyId: ManualDelivery.CompanyId };
        $scope.ddlDeliverydBy = { EmployeeId: ManualDelivery.DeliverydById };
        $scope.ManualStockDelivery.DeliverydById = ManualDelivery.DeliverydById;
       
        $http({
            url: '/Delivery/GetByManualDeliveryId?manualDeliveryId=' + ManualDelivery.ManualDeliveryId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (delivery) {

            angular.forEach(delivery,function (aData) {
                if (aData.WarrantySerialNo =="0") {
                    aData.WarrantySerialNo = "N/A";
                }
                if (aData.MaterialTypeName == "" || aData.MaterialTypeName==null) {
                    aData.MaterialTypeName = "N/A";
                }
            })
            $scope.StockManualDeliveryList = delivery;


        })

    }

    $scope.DeleteByIdList=[]
    $scope.RemoveItemAttr = function (aDetail) {
        var ind = $scope.StockManualDeliveryList.indexOf(aDetail);
        $scope.StockManualDeliveryList.splice(ind, 1);

        $scope.DeleteByIdList.push(aDetail.ManualDeliveryDetailId);
    
    }




    $("#txtManualDeliveryDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ManualDateChangeForDelivery = function () {
        $("#txtManualDeliveryDate").focus();
        $("#txtManualDeliveryDate").trigger("click");
    }

    $("#txtManualPoDate").datepicker({
        dateFormat: "M d, yy"
    });
    $scope.ChangeForPODate = function () {
        $("#txtManualPoDate").focus();
        $("#txtManualPoDate").trigger("click");
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



    function ManualDeliverySave() {
        if ($scope.ddlSalesOrder == null) {
            $scope.ManualStockDelivery.SalesOrderId = 0;
        } else {
            $scope.ManualStockDelivery.SalesOrderId = $scope.ddlSalesOrder.SalesOrderId;
        }
        if ($scope.ddlCompany == null || $scope.ddlCompany == undefined) {
            $scope.ManualStockDelivery.CompanyId = 0;
        } else {
            $scope.ManualStockDelivery.CompanyId = $scope.ddlCompany.CompanyId;
        }

        if ($scope.ddlStore == null || $scope.ddlStore == undefined) {
            $scope.ManualStockDelivery.DeliveryFromDepartmentId = 0;
        } else {
            $scope.ManualStockDelivery.DeliveryFromDepartmentId = $scope.ddlStore.DepartmentId;
        }
      
      
        $scope.ManualStockDelivery.UpdatorId = $scope.LoginUser.UserId;

        if ($scope.ddlSalesOrderType == null) {
            $scope.ManualStockDelivery.OrderType = "";
        } else {
            $scope.ManualStockDelivery.OrderType = $scope.ddlSalesOrderType.SalesOrderType;
        }

        if ($scope.ddlDeliverydBy == null || $scope.ddlDeliverydBy == undefined) {
            $scope.ManualStockDelivery.DeliverydById = 0;
        } else {
            $scope.ManualStockDelivery.DeliverydById = $scope.ddlDeliverydBy.EmployeeId;
        }
        if ($scope.ManualStockDelivery.CompanyNameDelivery == undefined || $scope.ManualStockDelivery.CompanyNameDelivery==null) {
            $scope.ManualStockDelivery.CompanyNameDelivery = "";
        }

        if ($scope.ManualStockDelivery.AddressDelivery == undefined || $scope.ManualStockDelivery.AddressDelivery==null) {
            $scope.ManualStockDelivery.AddressDelivery = "";
        }

        var ManDeliveryNumber = $scope.ManualStockDelivery.ManualDeliveryNo2;
        $scope.ManualStockDelivery.ManualDeliveryNo = $scope.ManualStockDelivery.ManualDeliveryNo1 + '' + ManDeliveryNumber;

        var parms = JSON.stringify({ _ManualStockDelivery: $scope.ManualStockDelivery, _ManualStockDeliveryDetail: $scope.StockManualDeliveryList,DeleteByIdList:$scope.DeleteByIdList });
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {

                $http.post('/Delivery/SaveManualStockDelivery', parms).success(function (data) {

                    if (data > 0) {
                        alertify.log('Save Manual Delivery ' + data + ' Successfully!', 'success', '5000');
                        Clear();

                    } else {
                        alertify.log('Server Errors!', 'error', '5000');
                    }
                }).error(function (data) {
                    alertify.log('Server Errors!', 'error', '5000');
                });
            }
        })
    }

    $scope.SaveManualDelivery = function () {

        if ($scope.ManualStockDelivery.ManualDeliveryId == 0 || $scope.ManualStockDelivery.ManualDeliveryId == undefined) {
            if ($scope.CreatePermission) {
                ManualDeliverySave();
            } else {
                alertify.log('Do not have Create Permission!', 'error', '5000');
            }
        }
        else if ( $scope.ManualStockDelivery.ManualDeliveryId != 0) {
            if ($scope.RevisePermission) {
                ManualDeliverySave();
            }
            else {
                alertify.log('Do not have Revise Permission!', 'error', '5000');
            }
            
        }
       
        
    }

  
    //function GetAllCategory() {
    //    $http({
    //        url: "/Category/GetAllCategory",
    //        method: "GET",
    //        headers: { 'Content-Type': "application/json" }
    //    }).success(function (data) {
    
    //        angular.forEach(data, function (aData) {
    //            if (aData.CategoryId == 1 || aData.CategoryId == 2 || aData.CategoryId == 4) {
    //                $scope.CategoryList.push(aData);
    //            }
    //        })
    //    });
    //}



   
    //$scope.POReferencelist = [];
    //$scope.AddPOReference = function () {
    //    var obj = {};
    //    obj.PONo = $scope.ManualStockDelivery.PONo;
    //    obj.PODate = $scope.ManualStockDelivery.PODate;
    //    $scope.POReferencelist.push(obj);
    //    $scope.ManualStockDelivery.PONo = "";
    //    $scope.ManualStockDelivery.PODate = "";
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
        GetPagedManualStockDelivery(1);
    }

    $scope.DeliverySearch = function () {
        GetPagedManualStockDelivery(1);

    }

    $scope.SearchForCompanyAndDeliveryno = function () {
        GetPagedManualStockDelivery(1);
    }

    function GetPagedManualStockDelivery(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForDC").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForDC").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchDcOredrDcNoAndCompanyName != undefined && $scope.SearchDcOredrDcNoAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([MSD].[DeliveryDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([MSD].[ManualDeliveryNo] LIKE '%" + $scope.SearchDcOredrDcNoAndCompanyName + "%' OR [C].[CompanyName] LIKE '%" + $scope.SearchDcOredrDcNoAndCompanyName + "%' OR SO.SalesOrderNo LIKE '%" + $scope.SearchDcOredrDcNoAndCompanyName + "%')";

        }
        else if ($scope.SearchDcOredrDcNoAndCompanyName !== undefined && $scope.SearchDcOredrDcNoAndCompanyName != null && $scope.SearchDcOredrDcNoAndCompanyName != "") { 
            SearchCriteria = "[MSD].[ManualDeliveryNo] LIKE '%" + $scope.SearchDcOredrDcNoAndCompanyName + "%' OR [MSD].[CompanyNameDelivery] LIKE '%" + $scope.SearchDcOredrDcNoAndCompanyName + "%' OR SO.SalesOrderNo LIKE '%" + $scope.SearchDcOredrDcNoAndCompanyName + "%' ";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[MSD].[DeliveryDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }



        $http({
            url: encodeURI('/Delivery/GetPagedManualDelivery?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.manualStockDeliveryListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;
          

            if ($scope.manualStockDeliveryListForGrid.length > 0) {
                angular.forEach($scope.manualStockDeliveryListForGrid, function (aSd) {
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
            GetPagedManualStockDelivery($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedManualStockDelivery($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedManualStockDelivery($scope.currentPage);
        }
        //  }


    }


    $scope.OpenReport = function (ManualDeliveryId) {
        var obj = {};
        obj.DeliveryId = ManualDeliveryId;
        obj.IsManual = true;
        $window.open("#/DeliveryReport", "popup", "width=850,height=550,left=280,top=80");

        $cookieStore.put("DeliveryId", obj);
        //sessionStorage.setItem("DeliveryId", JSON.stringify(DeliveryId));
        event.stopPropagation();
    }

});