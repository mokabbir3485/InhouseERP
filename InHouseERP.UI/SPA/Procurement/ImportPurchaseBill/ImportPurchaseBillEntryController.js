
app.controller("ImportPurchaseBillEntryController", function ($scope, $rootScope, $cookieStore, $http, $filter, $timeout, $window) {
  
    load();
  
    function load() {
        $scope.RowItemId = 0;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            $scope.FullName = $scope.LoginUser.FullName;
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Import Purchase').ScreenId;
        GetUsersPermissionDetails();




        $scope.ItemCombination = {};
        $scope.ItemCombination.TotalCost = 0;
        $scope.ad_Item = {};

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.ScreenId = parseInt(sessionStorage.getItem("ImportPurchaseBillScreenId"));

        $scope.ddlBond = null;

        $scope.TotalPBPriceCal = 0;
        $scope.TotalAfterDiscount = 0;
        $scope.TotaInclusiveprice = 0;
        $scope.TotalQty = 0;

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.convertValueDdl = null;

        GetPagedPB($scope.currentPage);

        $("#txtDateOfPB1").val("");
        $scope.inv_PurchaseBill = {};

        $scope.ddlPriceType = { PriceTypeId: 1 };
        $scope.ProductBtn = 'Add Product';
        $scope.AddProductLbl = 'Add Product';
        $scope.AddOverHeadLbl = 'Add OverHead';
        $scope.inv_PurchaseBillDetail = {};
        $scope.ItemCombination = {};
        $scope.supplierlist = [];
        $scope.supplierAddresList = [];
        $scope.supplierRegList = [];
        $scope.supplierlistSearch = [];
        $scope.inv_PurchaseBillDetaillst = [];
        $scope.inv_StockPBDetailAdAttributeLst = [];
        $scope.PurchaseBillList = [];
        $scope.IsReceived = 0;
        $scope.ConfirmationMessageForAdmin = false;
        $scope.inv_PurchaseBillOverHead = {};
        $scope.inv_PurchaseBillOverHeadlst = [];
        $scope.HsCodeList = [];
        GetPBNo();
        GetHsCode();
        GetPriceType();
        GetAllVariety();
        GetSupplier();
        GetAllEmployee();
        GetByCombinationand();
        GetConfirmationMessageForAdmin();
        GetAllItemUnit();
        GetOverhead();
       // GetUsersPermissionDetails();
        GetAllSupplerAddress();
        ClearProductCtrl();
        $scope.invPBDetailsFiledHide = false;
        // $scope.rbButton = true;
        $scope.btnIcon = "+";
        $scope.SalesOrderTypeList = ["Local", "Export"];
        $scope.ddlCurrencyType = null;
        $scope.CurrencyList = [
            { Id: 1, CurrencyType: "BDT" }, { Id: 2, CurrencyType: "USD" }];

        $scope.inv_PurchaseBill = {};
        $scope.inv_PurchaseBill.PBId = 0;
        $scope.inv_PurchaseBill.IsRaw = "true";

        $scope.inv_PurchaseBill.isRawMaterials = "true";
        //$scope.inv_PurchaseBill.isRawMaterials = "false";

        $scope.ddlCategory = null;

        $scope.hiddenFiled = false;
        $scope.inv_PurchaseBillDetailsItemCombination = {};
        $scope.CurrentQuantityList = [];


        $scope.ddlMu = { ItemUnitId: 2 }

        $scope.IsJumboRoll = false;

        $scope.IsRawHide = true;
        $scope.IsHardware = false;

        $scope.inv_PurchaseBill.CategoryId = 4;

        //$scope.PurchaseType = [];
        //PurchaseItemType();

        $scope.convertValueDdl = null;
        $scope.TotalAditionalDiscountAmount = 0;
        $scope.TotalAditionalDiscount = 0;


        if ($scope.inv_PurchaseBill.AdditionDiscount == null || $scope.inv_PurchaseBill.AdditionDiscount == undefined) {
            $scope.TotalAditionalDiscount = 0;
        } else {
            $scope.TotalAditionalDiscount = $scope.inv_PurchaseBill.AdditionDiscount;
        }


        GetAllBond();
        $scope.BondList = [];
        $scope.CategoryList = [];
        GetAllCategory();

        $scope.StockReceiveNoList = [];
        //GetAllReceiveNo();
        $scope.ddlRecivedId = null;

        $scope.StockReceiveNoListAftersave = [];
        GetAllReceiveNoAfterSave();
        GetAllmatrialpaperType();
        $scope.matrialPaperTypeList = [];
        $scope.ddlmatrialPaperType = null;

        $scope.ddlCurrencyType = { Id: 2 }
        $scope.currencyDisable = true;
        //$scope.ItemCombination.ConversionRate = 85;
        GetAllOrgnazition();
        $scope.OrgnazitionList = [];
        $scope.ddlOrganization = null;
        $scope.ItemRemoveIdList = [];

        GetHsCode();
        $scope.HsCodeList = [];
        GetAllBranch();
        $scope.Branchlist = [];

        $scope.inv_PurchaseBill.ConversionRate = 85;
        GetAllPO();
        $scope.PurchaseOrderlist = [];

        $scope.AppNotificationSetupList = [];
        GetAppNotificationSetupByReportCode();
    }
    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'IPB',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(PurchaseBill, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];
        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle
            obj.NotificationDetail = 'Purchase Bill No: ' + PurchaseBill.PBNo + ' Supplier Name: ' + PurchaseBill.SupplierName + ' Prepared By: ' + $scope.FullName;
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
    function GetAllPO() {
        $scope.PurchaseOrderlist = [];
        $http({
            url: '/PurchaseOrder/GetAllPO',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                if (aData.IsLocal == false) {
                    $scope.PurchaseOrderlist.push(aData);
                }
            })
        });

    }
    function GetHsCode() {

        $http({
            url: "/ItemHsCode/Get",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.HsCodeList = data;
            //console.log(data);
        })
    }

  
    function GetAllOrgnazition() {
        
        $http({
            url: '/Company/GetAllOrgnazition',
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            
            angular.forEach(data,function (aData) {
                if (aData.IsActive==true) {
                  
                 
                    $scope.ddlOrganization = { Id: aData.Id}
                    $scope.OrgnazitionList.push(aData);
                }
            })

            
        });
    }
    //Date Time ======>
    $scope.inv_PurchaseBill.PBDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');


    $("#txtDateOfPB1").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForPBDate = function () {
        $("#txtDateOfPB1").focus();
        $("#txtDateOfPB1").trigger("click");
    }

    // Invoice Date=====>>
    $scope.inv_PurchaseBill.InvoiceDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
    $("#invoiceDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForInvoiceDate = function () {
        $("#invoiceDate").focus();
        $("#invoiceDate").trigger("click");
    }
    // LC Date =====>
    $scope.inv_PurchaseBill.LCorPODate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
    $("#PODate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForLCorPODate = function () {
        $("#PODate").focus();
        $("#PODate").trigger("click");
    }


    // Bond Date =====>
    //$scope.inv_PurchaseBill.BondDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
    $("#BondDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForBondDate = function () {
        $("#BondDate").focus();
        $("#BondDate").trigger("click");
    }
    // Importer Date =====>

    $scope.inv_PurchaseBill.ImportPermitDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
    $("#ImportDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForBondDate = function () {
        $("#ImportDate").focus();
        $("#ImportDate").trigger("click");
    }

    // Importer Date =====>

    $scope.inv_PurchaseBill.BillOfEntryDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
    $("#BillOfEntryDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForBillOfEntryDate = function () {
        $("#BillOfEntryDate").focus();
        $("#BillOfEntryDate").trigger("click");
    }

    $scope.PaperTypeList = [];
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


    ////   Check Receive No========>

    $scope.CheckReceiveNo = function () {



        $http({
            url: '/Receive/GetAllRecivedNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.StockReceiveNoList = data;

            //angular.forEach($scope.StockReceiveNoListAftersave, function (aData) {
            //    angular.forEach(data, function (aRec) {
            //        if (aData.SRId != aRec.SRId) {
            //            $scope.StockReceiveNoList.push(aRec);
            //        }
            //    })

            //})

        });
    }


    function GetAllReceiveNoAfterSave() {
        $http({
            url: '/PurchaseBill/GetAllPurchaseBillWithStockReceivedReference',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.StockReceiveNoListAftersave = data;

        });
    }


    //function GetAllReceiveNo() {


    //}

   


    if ($scope.inv_PurchaseBill.CategoryId == 4) {
        document.getElementById("itemInfoId").disabled = true;
    }

    function GetAllBranch() {
        $http({
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Branchlist = data;
           

        });

    }
    function GetAllBond() {
        $http({
            url: '/Bond/GetAllBond',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BondList = data;
            
        });
    }


    $scope.bonNoWithDate = function (bond) {

        var res1 = bond.BondDate.substring(0, 5);
        if (res1 == "/Date") {
            var parsedDate1 = new Date(parseInt(bond.BondDate.substr(6)));




            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
            bond.BondDate = date1;
            $scope.inv_PurchaseBill.BondDate = bond.BondDate;
        }
    }

    $scope.checkDiscountFiledHiden = function () {
        if ($scope.ItemCombination.IsDiscount == true) {
            $scope.ItemCombination.disable = true;
            $scope.ItemCombination.DiscountAmount = 0;
        } else {
            $scope.ItemCombination.disable = false;
            $scope.ItemCombination.DiscountAmount = 0;
            $scope.ItemCombination.DiscountPercentage = 0;
        }

        if ($scope.ItemCombination.DiscountPercentage == undefined) {
            $scope.ItemCombination.DiscountPercentage = 0;
        }

        var OverallDisPer = 0;
        OverallDisPer = $scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty;

        $scope.ItemCombination.TotalDiscountPrice = $scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty;
    }




    $scope.hideBtnColapse = function () {
        $scope.invPBDetailsFiledHide == true;

        $scope.invPBDetailsFiledHide = $scope.invPBDetailsFiledHide == false ? true : false;

    }

    function GetAllCategory() {
        $http({
            url: "/Category/GetAllCategory",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            //$scope.CategoryList = data;
          /*  $scope.CategoryList = data;*/
            angular.forEach(data, function (aData) {
                if (aData.CategoryId != 3 && aData.CategoryId != 6 ) {
                    $scope.CategoryList.push(aData);
                }
            })
        });
    }

    $scope.CheckPurchaseTypeFlag = function (aCategory) {

        $scope.inv_PurchaseBill.CategoryId = aCategory.CategoryId;

        $scope.AllCombinationSearch = [];

        if (aCategory.CategoryId == 1) {

            $scope.ItemCombination = {};
            //$scope.ItemSearchCombination = null;
            document.getElementById("itemInfoId").disabled = false;
            $scope.ddlMu = { ItemUnitId: 2 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == aCategory.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                   
                }
            });
            console.log("Hardware", $scope.AllCombinationSearch);

            $("#ddlHsCode").select2({
                theme: "classic",
                placeholder: "--HS Code--",
            })
        }
        else if (aCategory.CategoryId == 1)
        {

            $scope.ItemCombination = {};
            //$scope.ItemSearchCombination = null;
            document.getElementById("itemInfoId").disabled = false;
            $scope.ddlMu = { ItemUnitId: 2 };
         
            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == $scope.inv_PurchaseBill.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }
            });

            $("#ddlHsCode").select2({
                theme: "classic",
                placeholder: "--HS Code--",
            })

        }
        else if (aCategory.CategoryId == 2) {
            $scope.ItemCombination = {};
            // $scope.ItemSearchCombination = null;
            document.getElementById("itemInfoId").disabled = true;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == $scope.inv_PurchaseBill.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });

            $("#ddlHsCode").select2({
                theme: "classic",
                placeholder: "--HS Code--",
            })
        }
        else if (aCategory.CategoryId == 4) {
            $scope.ItemCombination = {};
            // $scope.ItemSearchCombination = null;
            document.getElementById("itemInfoId").disabled = true;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == $scope.inv_PurchaseBill.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });

            $("#ddlHsCode").select2({
                theme: "classic",
                placeholder: "--HS Code--",
            })
        }

        else if (aCategory.CategoryId == 5) {
            $scope.ItemCombination = {};
            // $scope.ItemSearchCombination = null;
            document.getElementById("itemInfoId").disabled = true;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == $scope.inv_PurchaseBill.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });

            $("#ddlHsCode").select2({
                theme: "classic",
                placeholder: "--HS Code--",
            })
        }

        else if (aCategory.CategoryId == 3) {
            $scope.ItemCombination = {};
            // $scope.ItemSearchCombination = null;
            document.getElementById("itemInfoId").disabled = true;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == $scope.inv_PurchaseBill.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });

            $("#ddlHsCode").select2({
                theme: "classic",
                placeholder: "--HS Code--",
            })
        }

        else {
            $scope.AllCombinationSearch = [];
        }

        //


    }

    function GetPBNo() {
        $http({
            url: '/PurchaseBill/GetPurchaseBillNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (PBNo) {
            $scope.MaxPBNo = PBNo;
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
                $scope.inv_PurchaseBill.PBNo = 'IPB/' + $scope.finYearEPZ + '/' + $scope.MaxPBNo;
            });
            
        });
    }




    $scope.PBDateChange = function () {
        $("#txtDateOfPB1").focus();
        $("#txtDateOfPB1").trigger("click");

    }


    $scope.CalendartxtChallanDueDate = function () {
        $("#txtChallanDueDate").focus();
        $("#txtChallanDueDate").trigger("click");
    }

    $("#txtChallanDueDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ItemList = [];
    function GetByCombinationand() {
        $http({
            url: "/Item/GetCombinationWithPrice",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.AllCombinationlist = angular.fromJson(data);
            $scope.AllCombinationSearch = [];
            $scope.ddlMu = { ItemUnitId: 2 };
            $scope.ddlCategory = { CategoryId: 4 };
            $scope.inv_PurchaseBill.CategoryId = 4;
            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == 4) {
                    $scope.AllCombinationSearch.push(aCombination);
                }
                //$scope.ItemList.push(aCombination);
            });




            
        })
    }

    function GetConfirmationMessageForAdmin() {
        $http({
            url: '/Role/GetConfirmationMessageForAdmin',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ConfirmationMessageForAdmin = (data === 'true');
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

    function GetAllVariety() {
        $http({
            url: "/Item/GetLimitedProperty",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.VarietyList = data;
            
        });
    }

    function GetPriceType() {
        $http({
            url: '/PriceType/GetAllPriceType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.pricetypeentrylist = data;
            if (data.length == 1)
                $scope.ddlPriceType = { PriceTypeId: data[0].PriceTypeId, PriceTypeName: data[0].PriceTypeName };
        })
    }

    function GetSupplier() {
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {


            $scope.supplierlistSearch = angular.copy(data);
            //if (data.length == 1)
            //    $scope.ddlSupplier = { SupplierId: data[0].SupplierId, SupplierName: data[0].SupplierName };

            angular.forEach(data, function (aData) {
                if (aData.SuppilerTypeName != "Local") {
                    $scope.supplierlist.push(aData);

                }
            })
            
        })
    }
    function GetAllSupplerAddress() {
        $http({
            url: '/Supplier/GetAllSupplerAddress',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.supplierAddresList = data;
            console.log("$scope.supplierAddresList", $scope.supplierAddresList);
            


        })
    }



    $scope.SupplierCombineAddressAndRegNo = function (supId) {

        angular.forEach($scope.supplierlist, function (adata) {

            if (supId == adata.SupplierId) {
                $scope.inv_PurchaseBill.NID = adata.NID;
                $scope.inv_PurchaseBill.SuppilerTypeName = adata.SuppilerTypeName;
                //$scope.inv_PurchaseBill.Address = adata.Address;
            } else {
                $scope.inv_PurchaseBill.NID = "";
                $scope.inv_PurchaseBill.SuppilerTypeName = "";
            }

        });
        angular.forEach($scope.supplierAddresList, function (adata) {

            if (supId == adata.SupplierId) {
                $scope.inv_PurchaseBill.Port = adata.Port;
                $scope.inv_PurchaseBill.Address = adata.Address;
            }
            else {
                $scope.inv_PurchaseBill.Port = "";
                $scope.inv_PurchaseBill.Address = "";
            }
        });
    }


    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
            $scope.ddlEmployee = { EmployeeId: $scope.LoginUser.EmployeeId, FullName: $scope.LoginUser.FullName };
            
        });
    }

    function GetOverhead() {
        $http({
            url: '/OverHead/GetAllOverhead',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.OverheadList = data;
        });
    }

    function Pad(number, length) {
        if (number.length > length) {
            return number;
        }
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

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

    function UpdatePriceAndQuantity() {
        $http({
            url: '/StockValuation/GetByItemAndUnitAndDepartment?itemId=' + $scope.inv_PurchaseBillDetail.ItemId + '&unitId=' + $scope.inv_PurchaseBillDetail.UnitId + '&transactiontypeid=1&pricetypeId=' + $scope.ddlPriceType.PriceTypeId + '&departmentId=null',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            var res = data;
            $scope.inv_PurchaseBillDetail.CurrentQuantity = res.CurrentQuantity;
            $scope.inv_PurchaseBillDetail.Price = res.Price;
        });
    }

    function GetUnitNameById(id) {
        var UnitName = '';
        angular.forEach($scope.ItemUnitlist, function (aUnit) {
            if (aUnit.ItemUnitId == id) { UnitName = aUnit.UnitName; }
        });
        return UnitName;
    }

    function ClearProductCtrl() {

        $scope.inv_PurchaseBillDetail = {};
        $scope.AddProductLbl = 'Add Product';


    }

    function clearOverHead() {
        $scope.inv_PurchaseBillOverHead = {};
        $scope.AddOverHeadLbl = 'Add OverHead';
        $scope.ddlOverhead = null;
    }

    $scope.LoadACombination = function (aCombination) {
      
          $('#ddlHsCode').select2('destroy');
          $("#ddlHsCode").val(aCombination.HsCodeId).select2({
              theme: "classic",
              placeholder: "--HS Code--",
          })
          $scope.ddlHsCode = { HsCodeId: aCombination.HsCodeId}
          aCombination.ConversionRate = $scope.ItemCombination.ConversionRate;
      
      
        // $scope.ItemCombination.ConversionRate = $scope.ItemCombination.ConversionRate;
        $scope.ItemCombination = aCombination;

        //$scope.ItemSearchCombination = $scope.ItemCombination.Combination;
        $scope.TotalDiscountPrice = 0;
        $scope.TotalDiscountPrice = aCombination.TotalDiscountPrice;


    }



    $scope.unitFilter = function (RawItem) {
        return function (pram) {
            return (pram.ItemUnitId == RawItem.UnitId) || (pram.ItemUnitId == RawItem.PackageId) || (pram.ItemUnitId == RawItem.ContainerId);
        };
    }


  
    $scope.AddPBDetail = function () {
        $scope.AddProductLbl = "Add Product";
        $scope.TotalQty = 0;
        $scope.TotalAfterDiscount = 0;
        $scope.TotalUnitPrice = 0;


        $scope.TotalEInClusiveCost = 0;
        $scope.TotalCostAfterDiscount = 0;
        $scope.TotalPBPriceCal = 0;
        $scope.TotalQty = 0;
        $scope.TotalAmountPB = 0;
        $scope.TotalAfterDiscount = 0;
        $scope.TotaInclusiveprice = 0;
        var discountAmount = 0;
        var discountCal = 0;
        $scope.PerItemDiscountPriceCal = 0;
        $scope.TotalQtyAndPrice = 0;
        var totalAfterDisCountVal = 0;
        var PbPerUnitPriceAndQty = 0;
        $scope.unitPrice = 0;
        $scope.TotalUnitPrice = 0;
        var Additionaldiscount = 0;
        $scope.TotalAditionalDiscountAmount = 0;

      

        if (isNaN($scope.inv_PurchaseBill.AdditionDiscount)) {
            $scope.inv_PurchaseBill.AdditionDiscount = 0;
        }

        if ($scope.ItemCombination.PBDetailId == 0 || $scope.ItemCombination.PBDetailId == undefined && $scope.RowItemId == 0) {

            if ($scope.ddlHsCode.HsCodeId == null || $scope.ddlHsCode == null) {
                alertify.log("Hs Code Must Be Entry !!!", "error", "5000");
                return;
            }
            else if (($scope.ItemCombination.CategoryId == 1 || $scope.ItemCombination.CategoryId == 4) && $scope.ddlmatrialPaperType == null) {
                alertify.log("Please select paper type !!!", "error", "5000");
                return;
            }
            else if ($scope.ItemCombination.AttributeQty == undefined || $scope.ItemCombination.AttributeQty == 0) {

                alertify.log("Minimum 1 Quantity is required", "error", "5000");

                return;
            }
            else if ($scope.ItemCombination.PerUnitPrice == undefined || $scope.ItemCombination.PerUnitPrice == 0) {
                alertify.log("Minimum 1 Price is required", "error", "5000");
            }

            else {



                var Item = {};
                $scope.ItemCombination.ValueOfAttribute = [$scope.ItemCombination.AttributeNames];
                var Attribute = $scope.ItemCombination;
                Item.ItemId = $scope.ItemCombination.ItemId;
                Item.UnitId = $scope.ddlMu.ItemUnitId;
                Item.AttributeUnitPrice = $scope.ItemCombination.TotalDiscountPrice;

                Item.BilledQty = 0;
                Item.POQuantity = 0;
                Item.ReceivedQty = 0;
                Item.Qty = Attribute.AttributeQty;


                var itemDetailsByItemId = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + Attribute.ItemId).FirstOrDefault();

                Item.ItemName = $scope.ItemCombination.ItemName;


                Item.ItemCode = $scope.ItemCombination.ItemCode;

                Item.CurrentStock = $scope.ItemCombination.CurrentStock;


                if ($scope.ddlHsCode != null || $scope.ddlHsCode != undefined) {

                    Item.HsCodeId = $scope.ddlHsCode.HsCodeId;
                } else {
                    alertify.log("Hs Code Not Found Must be entry !!!", "error", "5000");
                    return;
                }





                if ($scope.ItemCombination.VatPercentage == undefined || $scope.ItemCombination.VatPercentage == null) {
                    Item.VatPercentage = 0;
                } else {
                    Item.VatPercentage = Number($scope.ItemCombination.VatPercentage);
                }
                Item.VatPercentage = $scope.ItemCombination.VatPercentage;



                if ($scope.ad_Item != null || $scope.ad_Item != undefined) {

                    if ($scope.ad_Item.ItemName == "" || $scope.ad_Item.ItemName == null || $scope.ad_Item.ItemName == undefined) {
                        Item.ItemName = $scope.ItemCombination.ItemName;
                    } else {
                        Item.ItemName = $scope.ad_Item.ItemName;
                    }

                    if ($scope.ad_Item.ItemDescription == "" || $scope.ad_Item.ItemDescription == null || $scope.ad_Item.ItemDescription) {
                        Item.ItemDescription = $scope.ItemCombination.ItemDescription;
                    } else {
                        Item.ItemDescription = $scope.ad_Item.ItemDescription;
                    }

                    if ($scope.ad_Item.ItemDescriptionTwo == "" || $scope.ad_Item.ItemDescriptionTwo == null || $scope.ad_Item.ItemDescriptionTwo == undefined) {
                        Item.ItemDescriptionTwo = $scope.ItemCombination.ItemDescriptionTwo;
                    } else {
                        Item.ItemDescriptionTwo = $scope.ad_Item.ItemDescriptionTwo;
                    }



                    if ($scope.ad_Item.RollWidthInMeter == undefined || $scope.ad_Item.RollWidthInMeter == null) {
                        Item.RollWidthInMeter = 0;
                    } else {
                        Item.RollWidthInMeter = $scope.ad_Item.RollWidthInMeter;
                    }


                    if ($scope.ad_Item.RollLenghtInMeter == undefined || $scope.ad_Item.RollLenghtInMeter == null) {
                        Item.RollLenghtInMeter = 0;
                    } else {
                        Item.RollWidthInMeter = $scope.ad_Item.RollWidthInMeter;
                    }

                    if ($scope.ad_Item.RollAreaInSqMeter == undefined || $scope.ad_Item.RollAreaInSqMeter == null) {
                        Item.RollAreaInSqMeter = 0;
                    } else {
                        Item.RollAreaInSqMeter = $scope.ad_Item.RollAreaInSqMeter;
                    }


                    if ($scope.ad_Item.PcPerRoll == undefined || $scope.ad_Item.PcPerRoll == null) {
                        Item.PcPerRoll = 0;
                    } else {
                        Item.PcPerRoll = $scope.ad_Item.PcPerRoll;
                    }


                    if ($scope.ad_Item.RollPerCarton == undefined || $scope.ad_Item.RollPerCarton == null) {
                        Item.RollPerCarton = 0;
                    } else {
                        Item.RollPerCarton = $scope.ad_Item.RollPerCarton;
                    }

                    if ($scope.ad_Item.UnitPerCarton == undefined || $scope.ad_Item.UnitPerCarton == null) {
                        Item.UnitPerCarton = 0;
                    } else {
                        Item.UnitPerCarton = $scope.ad_Item.UnitPerCarton;
                    }


                    if ($scope.ad_Item.RollWeight == undefined || $scope.ad_Item.RollWeight == null) {
                        Item.RollWeight = 0;
                    } else {
                        Item.RollWeight = $scope.ad_Item.RollWeight;
                    }

                    if ($scope.ad_Item.CartonSize == undefined || $scope.ad_Item.CartonSize == null) {
                        Item.CartonSize = 0;
                    } else {
                        Item.CartonSize = $scope.ad_Item.CartonSize;
                    }

                }



                Item.UnitPrice = $scope.ItemCombination.PerUnitPrice;
                Item.CategoryId = $scope.ddlCategory.CategoryId;

                Item.PerUnitPrice = $scope.ItemCombination.PerUnitPrice;

                Item.Amount = $scope.ItemCombination.AttributeQty * $scope.ItemCombination.PerUnitPrice;;

                Item.TotalCostAfterDiscount = $scope.ItemCombination.TotalCostAfterDiscount;

                Item.VDS = $scope.ItemCombination.VDS;
                if ($scope.ddlmatrialPaperType == null) {
                    Item.MaterialTypeId = 0;
                } else {
                    Item.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
                }

                var discountAmount = 0;
                Item.DiscountAmount = $scope.ItemCombination.DiscountAmount;
                Item.DiscountPercentage = $scope.ItemCombination.DiscountPercentage;

                Item.TotalPBPrice = $scope.ItemCombination.TotalDiscountPrice;
                Item.TotalCostAfterDiscount = $scope.ItemCombination.TotalCostAfterDiscount;
                Item.DiscountAmount = $scope.ItemCombination.DiscountAmount;
                Item.DiscountPercentage = $scope.ItemCombination.DiscountPercentage;

                Item.UnitperPrice = $scope.ItemCombination.PerUnitPrice;

                Item.ItemName = $scope.ItemCombination.ItemName;
                Item.ItemDescription = $scope.ItemCombination.ItemDescription;
                Item.ItemDescriptionTwo = $scope.ItemCombination.ItemDescriptionTwo
                Item.HsCodeId = $scope.ddlHsCode.HsCodeId;

                Item.RollWidthInMeter = $scope.ItemCombination.RollWidthInMeter;
                Item.RollLenghtInMeter = $scope.ItemCombination.RollLenghtInMeter;
                Item.RollAreaInSqMeter = $scope.ItemCombination.RollAreaInSqMeter;
                Item.PcPerRoll = $scope.ItemCombination.PcPerRoll;
                Item.RollPerCarton = $scope.ItemCombination.RollPerCarton;
                Item.UnitPerCarton = $scope.ItemCombination.UnitPerCarton;
                Item.RollWeight = $scope.ItemCombination.RollWeight;
                Item.CartonWeight = $scope.ItemCombination.CartonWeight;
                Item.CartonSize = $scope.ItemCombination.CartonSize;

                Item.TotalCostAfterDiscount = $scope.ItemCombination.TotalDiscountPrice;

                Item.DiscountAmount = $scope.ItemCombination.DiscountAmount;
                Item.TotalUnitAndQty = Number($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty);




                if ($scope.ddlmatrialPaperType == null) {
                    Item.MaterialTypeId = 0;
                } else {
                    Item.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
                }



                Item.RollLenghtInMeter = $scope.ItemCombination.RollLenghtInMeter;
                Item.RollAreaInSqMeter = $scope.ItemCombination.RollAreaInSqMeter;
                Item.RollWeightInKg = $scope.ItemCombination.RollWeightInKg;
                Item.RollWidthInMeter = $scope.ItemCombination.RollWidthInMeter;

                Item.UnitPrice = $scope.ItemCombination.PerUnitPrice;

                Item.UnitperPrice = $scope.ItemCombination.PerUnitPrice;
                Item.AttributeQty = $scope.ItemCombination.AttributeQty;
                Item.SubCategoryId = $scope.ItemCombination.SubCategoryId;
                Item.CategoryId = $scope.ItemCombination.CategoryId;
                Item.ItemUnit = { ItemUnitId: $scope.ddlMu.ItemUnitId };

                $scope.inv_PurchaseBillDetaillst.push(Item);
               

                angular.forEach($scope.inv_PurchaseBillDetaillst, function (adata) {
                    $scope.TotalQty += adata.Qty;

                    if (adata.DiscountAmount == null || adata.DiscountAmount == undefined || adata.DiscountPercentage == null || adata.DiscountPercentage == undefined) {
                        $scope.TotalEInClusiveCost += adata.Amount;
                        discountCal = adata.Amount;
                    
                        $scope.PerItemDiscountPriceCal += discountAmount;
                        $scope.unitPrice += adata.UnitperPrice;
                        Additionaldiscount = $scope.TotalEInClusiveCost - $scope.inv_PurchaseBill.AdditionDiscount;
                        $scope.TotalAditionalDiscountAmount = Additionaldiscount;

                    } else {
                        $scope.TotalEInClusiveCost += adata.Amount;
                        discountCal = adata.PBPrice //* (adata.DiscountAmount / 100);
                        discountAmount = adata.PBPrice //- discountCal;
                       
                        $scope.PerItemDiscountPriceCal += discountAmount;
                        $scope.unitPrice += adata.UnitperPrice;
                     
                        Additionaldiscount = $scope.TotalEInClusiveCost - $scope.inv_PurchaseBill.AdditionDiscount;
                        $scope.TotalAditionalDiscountAmount = Additionaldiscount;
                    }

                    PbPerUnitPriceAndQty += adata.UnitperPrice * adata.Qty;
                    $scope.TotalPBPriceCal += adata.TotalPBPrice;
                    $scope.TotalQtyAndPrice = (PbPerUnitPriceAndQty).toFixed(3);
                    totalAfterDisCountVal += Number(adata.TotalCostAfterDiscount);
                    $scope.TotalAfterDiscount = Number((totalAfterDisCountVal).toFixed(3));
                    $scope.TotaInclusiveprice = Number(($scope.TotalEInClusiveCost).toFixed(3));
                    $scope.TotalUnitPrice = ($scope.unitPrice).toFixed(3);


                    $scope.TotalAditionalDiscount = $scope.inv_PurchaseBill.AdditionDiscount;

                });




                // }


                //$scope.inv_PurchaseBillDetail = {};
                // $scope.ItemSearchCombination = null;


                angular.copy($scope.inv_StockPBDetailAdAttributeLst.push(Item));
                //$('#SelectitemName1').select2('destroy');
                //$('#SelectitemName1').val('').select2({
                //    placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code",
                //    theme: "classic",
                //    dropdownAutoWidth: false

                //});


                $scope.ItemCombination = {};
                $scope.ad_Item = {};
                $scope.ItemCombination.ConversionRate = 85;
                $('#SelectitemName').select2('destroy');
                $('#SelectitemName').val('').select2({
                  //  placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code",
                    theme: "classic",
                    dropdownAutoWidth: false

                });
                $('#ddlmatrialPaperTypeId').select2('destroy');
                $('#ddlmatrialPaperTypeId').val('').select2({
                    placeholder: "--Material Paper Type--",

                });
                $('#ddlHsCode').select2('destroy');
                $("#ddlHsCode").val('').select2({
                    theme: "classic",
                    placeholder: "--HS Code--",
                })

                $scope.ItemSearchCombination = null;
                $scope.ddlHsCode = null;
                $scope.ddlmatrialPaperType = null;
                //}
                //else {
                //    alertify.log('This Combination already Exist, Try another one !!!', 'error', '5000');
                //}


            }

         
        } else {

          

            angular.forEach($scope.inv_StockPBDetailAdAttributeLst, function (adata) {
           

                if (adata.PBDetailId == $scope.ItemCombination.PBDetailId && adata.ItemId == $scope.ItemCombination.ItemId) {
                    adata.UnitPrice = $scope.ItemCombination.PerUnitPrice;
                    adata.UnitperPrice = $scope.ItemCombination.PerUnitPrice;
                    adata.Qty = $scope.ItemCombination.AttributeQty;
                    adata.TotalCostAfterDiscount = $scope.ItemCombination.TotalDiscountPrice;
                  //  adata.DiscountPercentage = $scope.ItemCombination.TotalDiscountPrice;
                    adata.PBIncludePrice = adata.Qty * adata.UnitPrice;
                    adata.AttributeQty = $scope.ItemCombination.AttributeQty;

                    PbPerUnitPriceAndQty += adata.UnitperPrice * adata.Qty;
                    adata.HsCodeId = $scope.ddlHsCode.HsCodeId;
                    adata.ItemId = $scope.ItemSearchCombination.ItemId;

                    if ($scope.ddlmatrialPaperType != null || $scope.ddlmatrialPaperType != undefined) {
                        adata.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
                      
                    } else {
                        adata.MaterialTypeId =0;
                    }
                   
                   

                   
                }
               
                $scope.TotalPBPriceCal += adata.TotalPBPrice;
                $scope.TotalQtyAndPrice = (PbPerUnitPriceAndQty).toFixed(3);
                totalAfterDisCountVal += Number(adata.TotalCostAfterDiscount);
                $scope.TotalAfterDiscount = Number((totalAfterDisCountVal).toFixed(3));
                $scope.TotaInclusiveprice = Number(($scope.TotalEInClusiveCost).toFixed(3));
                $scope.TotalUnitPrice += Number((adata.UnitPrice).toFixed(3));
                $scope.TotalQty += adata.Qty;

                //$scope.TotalAditionalDiscount = $scope.inv_PurchaseBill.AdditionDiscount;
                $scope.RowItemId = 0;


              

            });
            $scope.ItemCombination = {};
            $scope.ad_Item = {};
            $scope.ItemCombination.ConversionRate = 85;
            $('#SelectitemName').select2('destroy');
            $('#SelectitemName').val('').select2({
                theme: "classic",
            });
            $('#ddlmatrialPaperTypeId').select2('destroy');
            $('#ddlmatrialPaperTypeId').val('').select2({


            });
            $('#ddlHsCode').select2('destroy');
            $("#ddlHsCode").val('').select2({
                theme: "classic",

            })

            $scope.ItemSearchCombination = null;
            $scope.ddlHsCode = null;
            $scope.ddlmatrialPaperType = null;
           
           
        }

        document.getElementById("SelectitemName").disabled = false;
       // document.getElementById("ddlmatrialPaperTypeId").disabled = false;
      

       

    }

    
    $scope.PurchaseBillRowUpdate = function (rowUpdate) {
        document.getElementById("SelectitemName").disabled = true;
       
        // $scope.ItemCombination = rowUpdate;
        $scope.AddProductLbl = "Update";
        $scope.RowItemId = rowUpdate.ItemId;
        $scope.ItemCombination = rowUpdate;
        $scope.ItemCombination.PBDetailId = rowUpdate.PBDetailId;

        $scope.ItemCombination.AttributeQty = rowUpdate.Qty;
        $scope.ItemCombination.PBIncludePrice = rowUpdate.Qty * rowUpdate.UnitPrice;
        $scope.ItemCombination.DiscountAmount = rowUpdate.DiscountAmount;
        $scope.ItemCombination.DiscountPercentage = (rowUpdate.DiscountAmount * (100 / (rowUpdate.Qty * rowUpdate.UnitPrice)));
        $scope.ItemCombination.PerUnitPrice = rowUpdate.UnitPrice;
        $scope.ItemCombination.TotalDiscountPrice = rowUpdate.TotalCostAfterDiscount;

        $scope.ItemCombination.PBId = rowUpdate.PBId;
        $scope.ItemCombination.CategoryId = rowUpdate.CategoryId;
        $scope.ItemCombination.SubCategoryId = rowUpdate.SubCategoryId;
        $scope.ItemCombination.ItemId = rowUpdate.ItemId;
        $scope.ItemCombination.PaperTypeId = rowUpdate.PaperTypeId;

        $scope.ItemCombination.HsCodeId = rowUpdate.HsCodeId;
        $scope.ItemCombination.UnitId = rowUpdate.UnitId;
        $scope.ItemCombination.ItemUnit = { ItemUnitId: rowUpdate.UnitId };
        $scope.ItemCombination.UnitPrice = rowUpdate.UnitPrice;
        $scope.ItemCombination.PBPrice = rowUpdate.PBPrice;

        $scope.ItemCombination.TotalCostAfterDiscount = rowUpdate.TotalCostAfterDiscount;

        $scope.ItemCombination.CurrencyType = rowUpdate.CurrencyType;
        $scope.ItemCombination.ConversionRate = Number(rowUpdate.ConversionRate);
        $scope.ItemCombination.TotalConversion = rowUpdate.TotalConversion;




        var HsCodeList = $scope.HsCodeList.filter((aData) => aData.HsCodeId == rowUpdate.HsCodeId);
        $('#ddlHsCode').select2('destroy');
        $("#ddlHsCode").val(HsCodeList[0].HsCodeId).select2({
            theme: "classic",
        });
        $scope.ddlHsCode = { HsCodeId: rowUpdate.HsCodeId }


        var ItemList = $scope.AllCombinationlist.filter((aData) => aData.ItemId == rowUpdate.ItemId);

        $('#SelectitemName').select2('destroy');
        $("#SelectitemName").val(ItemList[0].ItemId).select2({
            theme: "classic",
        });

        $scope.ItemSearchCombination = { ItemId: rowUpdate.ItemId, Combination: ItemList[0].Combination }
        $scope.AllCombinationSearch = ItemList;
        //$scope.ItemSearchCombination.ItemId = $scope.ItemSearchCombination.ItemId;

        if (rowUpdate.CategoryId != 2) {
            if (rowUpdate.MaterialTypeId != 0 || rowUpdate.MaterialTypeId != undefined) {
                var PaperTypeList = $scope.PaperTypeList.filter((aData) => aData.MaterialTypeId == rowUpdate.MaterialTypeId);
                $scope.ddlCategory.CategoryId = rowUpdate.CategoryId;
                $('#ddlmatrialPaperTypeId').select2('destroy');
                $("#ddlmatrialPaperTypeId").val(PaperTypeList[0].MaterialTypeId).select2({
                    theme: "classic",
                });
                $scope.ddlmatrialPaperType = { MaterialTypeId: rowUpdate.MaterialTypeId }
            }
            
          
        } else {
         //   document.getElementById("ddlmatrialPaperTypeId").disabled = true;

            $scope.ddlCategory.CategoryId = rowUpdate.CategoryId;
            $('#ddlmatrialPaperTypeId').select2('destroy');
            $("#ddlmatrialPaperTypeId").val('').select2({
                theme: "classic",
            });

        }
       
        $scope.ddlMu = { ItemUnitId: rowUpdate.ItemUnit.ItemUnitId }

        //angular.forEach($scope.AllCombinationlist, function (aCombination) {


        //    if (aCombination.ItemId == rowUpdate.ItemId) {
        //        if (aCombination.CategoryId == rowUpdate.CategoryId) {
        //            $('#SelectitemName').select2('destroy');
        //            $("#SelectitemName").val(aCombination.ItemId).select2({
        //                theme: "classic",
        //            });
        //            $scope.AllCombinationSearch.push(aCombination);
        //            $scope.ItemSearchCombination = { ItemId: aCombination.ItemId}
        //        }
        //        else {
        //            $('#SelectitemName1').select2('destroy');
        //            $("#SelectitemName1").val(aCombination.ItemId).select2({

        //                theme: "classic",
        //                dropdownAutoWidth: false
        //            });
        //            $scope.ItemSearchCombination = { ItemId: aCombination.ItemId }
        //            $scope.AllCombinationSearch.push(aCombination);
        //        }

        //        }

        //});




        //$("#SelectReciveId").val(rowUpdate.MaterialTypeId).select2({
        //    placeholder: "--Prepared By --",
        //    theme: "classic",
        //    dropdownAutoWidth: false
        //})







        //angular.forEach($scope.PaperTypeList, function (aData) {


        //    if (rowUpdate.MaterialTypeId == aData.MaterialTypeId) {



        //        aData.Combination = aData.MaterialTypeName + ' ~ ' + aData.MaterialTypeCode;
        //        $scope.ddlmatrialPaperType = { MaterialTypeId: aData.MaterialTypeId }
        //        $scope.matrialPaperTypeList.push(aData);
        //    }


        //})
      
    }
   
    $scope.purcheaseBillUpdate = function (aPb) {
        $scope.IsReceived = aPb.IsReceived;
        if ($scope.IsReceived == 1) {
            alertify.log("This Purchase bill's stock is already received!!! So, any item-related information can't be changed!!!", "success", "8000");
        }
        

      
        var res1 = aPb.BillOfEntryDate.substring(0, 5);
        if (res1 == "/Date") {
            var parsedDate1 = new Date(parseInt(aPb.BillOfEntryDate.substr(6)));
            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
            aPb.BillOfEntryDate = date1;

           
            var parsedDate3 = new Date(parseInt(aPb.ImportPermitDate.substr(6)));
            var date3 = ($filter('date')(parsedDate3, 'MMM dd, yyyy')).toString();
            aPb.ImportPermitDate = date3;


            var parsedDate4 = new Date(parseInt(aPb.InvoiceDate.substr(6)));
            var date4 = ($filter('date')(parsedDate4, 'MMM dd, yyyy')).toString();
            aPb.InvoiceDate = date4;


            var parsedDate5 = new Date(parseInt(aPb.LCorPODate.substr(6)));
            var date5 = ($filter('date')(parsedDate5, 'MMM dd, yyyy')).toString();
            aPb.LCorPODate = date5;

          
        }

        $("#selectBond").val(aPb.BondId).select2({
            placeholder: "--Select Bond--",
            // theme: "classic",
            dropdownAutoWidth: false
        });

        $scope.ddlBond = { BondId: aPb.BondId}
        $("#SelectReciveId").val(aPb.PreparedById).select2({
            placeholder: "--Prepared By --",
            theme: "classic",
            dropdownAutoWidth: false
        });
        $scope.ddlEmployee = { EmployeeId: aPb.PreparedById };

     
       // $scope.ddlBranch = { BranchId: aPb.BranchId };

        $scope.currencyDisable = true;
        $scope.ddlCurrencyType = { Id: aPb.CurrencyId};

        angular.forEach($scope.BondList, function (aBond) {
            if (aPb.BondId == aBond.BondId) {

                if (res1 == "/Date") {
                    var parsedDate8 = new Date(parseInt(aBond.BondDate.substr(6)));
                    var date8 = ($filter('date')(parsedDate8, 'MMM dd, yyyy')).toString();
                    $scope.inv_PurchaseBill.BondDate = date8;
                }
            }
        });

        GetAllBranch();
        $scope.Branchlist= $scope.Branchlist.filter((aData) => aData.BranchId == aPb.BranchId)
        $scope.ddlBrunch = { BranchId: $scope.Branchlist[0].BranchId };
        $scope.ddlSupplier = { SupplierId: aPb.SupplierId }
        setTimeout(function () {
            $("#ddlImportSupplier").select2().val(aPb.SupplierId).trigger("change");
        }, 0);

        $("#ddlPurchaseOrder").val(aPb.POId).select2({
            //theme: "classic",
        })
        $scope.ddlPurchaseOrder = { POId: aPb.POId }
  
        angular.forEach($scope.supplierlist, function (adata) {

            if (aPb.SupplierId == adata.SupplierId) {
              
                $scope.inv_PurchaseBill.NID = adata.NID;
                $scope.inv_PurchaseBill.SuppilerTypeName = adata.SuppilerTypeName;

            } else {
                $scope.inv_PurchaseBill.NID = "";
                $scope.inv_PurchaseBill.SuppilerTypeName = "";
            }

        });

        angular.forEach($scope.supplierAddresList, function (adata) {

            if (aPb.SupplierId == adata.SupplierId) {
                $scope.inv_PurchaseBill.Port = adata.Port;
                $scope.inv_PurchaseBill.Address = adata.Address;
            }
            else {
                $scope.inv_PurchaseBill.Port = "";
                $scope.inv_PurchaseBill.Address = "";
            }
        });

        $scope.ItemCombination.ConversionRate = 85;
        $scope.ddlCurrencyType = { Id: 2 }

        //  $scope.ddlBranch = { BranchId: aBranch.BranchId };
     

        $scope.inv_PurchaseBill.PBId = aPb.PBId;
        $scope.inv_PurchaseBill.PBNo = aPb.PBNo;
        $scope.inv_PurchaseBill.PBDate = aPb.PBDate;
        $scope.inv_PurchaseBill.SupplierId = aPb.SupplierId;
        $scope.inv_PurchaseBill.ShipmentInfo = aPb.ShipmentInfo;
        $scope.inv_PurchaseBill.Address = aPb.Address;
        $scope.inv_PurchaseBill.InvoiceNo = aPb.InvoiceNo;
        $scope.inv_PurchaseBill.InvoiceDate = aPb.InvoiceDate;
        $scope.inv_PurchaseBill.LCorPONo = aPb.LCorPONo;
        $scope.inv_PurchaseBill.LCorPODate = aPb.LCorPODate;
        $scope.inv_PurchaseBill.BondId = aPb.BondId;
        $scope.inv_PurchaseBill.ImportPermitNo = aPb.ImportPermitNo;
        $scope.inv_PurchaseBill.ImportPermitDate = aPb.ImportPermitDate;
        $scope.inv_PurchaseBill.BillOfEntryNo = aPb.BillOfEntryNo;
        $scope.inv_PurchaseBill.BillOfEntryDate = aPb.BillOfEntryDate;
        $scope.inv_PurchaseBill.PreparedById = aPb.PreparedById;
        $scope.inv_PurchaseBill.isRawMaterials = aPb.isRawMaterials;
        $scope.inv_PurchaseBill.AdditionDiscount = aPb.AdditionDiscount;
        $scope.inv_PurchaseBill.TotalAmount = aPb.TotalAmount;
        $scope.inv_PurchaseBill.TotalAmountAfterDiscount = aPb.TotalAmountAfterDiscount;
        $scope.inv_PurchaseBill.Remarks = aPb.Remarks;
        $scope.inv_PurchaseBill.IsApproved = aPb.IsApproved;
        $scope.inv_PurchaseBill.isVDS = aPb.isVDS;
        $scope.inv_PurchaseBill.ApprovedDate = aPb.ApprovedDate;
        $scope.inv_PurchaseBill.CreatorId = aPb.CreatorId;
        $scope.inv_PurchaseBill.CreateDate = aPb.CreateDate;
        $scope.inv_PurchaseBill.UpdatorId = aPb.UpdatorId;
        $scope.inv_PurchaseBill.UpdateDate = aPb.UpdateDate;
        $scope.inv_PurchaseBill.TotalPriceInBDT = aPb.TotalPriceInBDT;
        $scope.inv_PurchaseBill.CurrencyId = aPb.CurrencyId;
        $scope.inv_PurchaseBill.ConversionRate = aPb.ConversionRate;
       
        //$scope.inv_PurchaseBill.OrganizationId =$scope.inv_PurchaseBill.OrganizationId;
    

        var SerialAndWarrentyList = [];
        var PbPerUnitPriceAndQty = 0;
        $scope.TotalQtyAndPrice = 0;
        $scope.TotaInclusiveprice = 0;
        $scope.TotalAfterDiscount = 0;
        $scope.TotalQty = 0;
        $scope.inv_PurchaseBillDetaillst = [];
        $scope.inv_StockPBDetailAdAttributeLst = [];
        $scope.TotalUnitPrice = 0;
        $http({
            url: '/PurchaseBill/GetByPbIdForUpdate?IPBId=' + aPb.PBId,
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {

            angular.forEach(data, function (aData) {
                aData.UnitperPrice = aData.UnitPrice;
                PbPerUnitPriceAndQty += aData.UnitperPrice * aData.Qty;
                $scope.TotalQty += aData.Qty;

                var ImpurchaseBillObj = {};
                ImpurchaseBillObj.PBDetailId = aData.PBDetailId;
                ImpurchaseBillObj.PBId = aData.PBId;
                ImpurchaseBillObj.CategoryId = aData.CategoryId;
                ImpurchaseBillObj.SubCategoryId = aData.SubCategoryId;
                ImpurchaseBillObj.ItemId = aData.ItemId;
                ImpurchaseBillObj.PaperTypeId = aData.PaperTypeId;
                ImpurchaseBillObj.ItemName = aData.ItemName;
                ImpurchaseBillObj.ItemDescription = aData.ItemDescription;
                ImpurchaseBillObj.ItemDescriptionTwo = aData.ItemDescriptionTwo;
                ImpurchaseBillObj.HsCodeId = aData.HsCodeId;
                ImpurchaseBillObj.RollWidthInMeter = aData.RollWidthInMeter;
                ImpurchaseBillObj.RollLenghtInMeter = aData.RollLenghtInMeter;
                ImpurchaseBillObj.RollAreaInSqMeter = aData.RollAreaInSqMeter;
                ImpurchaseBillObj.PcPerRoll = aData.PcPerRoll;
                ImpurchaseBillObj.RollPerCarton = aData.RollPerCarton;
                ImpurchaseBillObj.UnitPerCarton = aData.UnitPerCarton;
                ImpurchaseBillObj.RollWeight = aData.RollWeight;
                ImpurchaseBillObj.CartonWeight = aData.CartonWeight;
                ImpurchaseBillObj.CartonSize = aData.CartonSize;
                ImpurchaseBillObj.UnitId = aData.UnitId;
                ImpurchaseBillObj.ItemUnit = { ItemUnitId: aData.UnitId };
                ImpurchaseBillObj.Qty = aData.Qty;
                ImpurchaseBillObj.UnitPrice = aData.UnitPrice;
                ImpurchaseBillObj.Amount = aData.Amount;
                ImpurchaseBillObj.DiscountAmount = aData.DiscountAmount;
                ImpurchaseBillObj.TotalCostAfterDiscount = aData.TotalCostAfterDiscount;
                ImpurchaseBillObj.CurrencyType = aData.CurrencyType;
                ImpurchaseBillObj.ConversionRate = Number(aData.ConversionRate);
                ImpurchaseBillObj.TotalConversion = aData.TotalConversion;
                ImpurchaseBillObj.MaterialTypeId = aData.MaterialTypeId;
                ImpurchaseBillObj.TotalUnitAndQty = aData.UnitperPrice * aData.PBQty;

                ImpurchaseBillObj.DiscountPercentage = (aData.DiscountAmount * (100/ (aData.UnitperPrice * aData.Qty)));
                ImpurchaseBillObj.UnitperPrice = aData.UnitperPrice;
                $scope.TotalQtyAndPrice += Number(aData.UnitperPrice);

                $scope.TotalUnitPrice += Number(aData.UnitperPrice);

                $scope.TotalAfterDiscount += Number(aData.TotalCostAfterDiscount);
                $scope.TotaInclusiveprice += Number(aData.Amount);
                $scope.inv_PurchaseBillDetaillst.push(ImpurchaseBillObj);
                $scope.inv_StockPBDetailAdAttributeLst.push(ImpurchaseBillObj);
            });
       
        });

        /// Item List Row Update ===============>>

      
         
       
    }

    $scope.OnDropdowanClear = function () {
     

        $('#SelectitemName').select2('destroy');
        $('#SelectitemName').val('').select2({
           // placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code",
            theme: "classic",
           // dropdownAutoWidth: false
        });
    }



    $scope.GetPBDetails = function (aPurchaseBill) {
        // $scope.invDetailsFiledHide = true;
        $scope.ddlEmployee = { EmployeeId: aPurchaseBill.PreparedById };
        $scope.ddlSupplier = { SupplierId: aPurchaseBill.SupplierId };
        $scope.inv_PurchaseBill = aPurchaseBill;
      
        var res = aPurchaseBill.PBDate.substring(0, 5);
        if (res == "/Date") {
            var parsedDate = new Date(parseInt(aPurchaseBill.PBDate.substr(6)));
            $scope.inv_PurchaseBill.PBDate = $filter('date')(parsedDate, 'MMM dd, yyyy');
        }

        angular.forEach($scope.supplierlist, function (adata) {
            if ($scope.ddlSupplier == adata.SupplierId) {
                $scope.inv_PurchaseBill.NID = adata.NID;
                //$scope.inv_PurchaseBill.SuppilerTypeName = adata.SuppilerTypeName="Not set";
            }
        });

        angular.forEach($scope.supplierAddresList, function (adata) {
            if ($scope.ddlSupplier == adata.SupplierId) {
                $scope.inv_PurchaseBill.Port = adata.Port;
                $scope.inv_PurchaseBill.Address = adata.Address;
            }

        });
        $scope.inv_PurchaseBillDetaillst = [];
        $scope.inv_StockPBDetailAdAttributeLst = [];
        $scope.inv_PurchaseBillOverHeadlst = [];
        $http({
            //url: "/PurchaseBill/PurchaseBillDetailGetByPBId?pbId+",
            url: '/PurchaseBill/PurchaseBillDetailGetByPBId?pbId=' + aPurchaseBill.PBId,
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            angular.forEach(data, function (aData) {

                //var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + aData.ItemId).FirstOrDefault();
                //var checkCategory = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + ItemCombination.ItemId).FirstOrDefault();


                //  $scope.ItemCombination.ValueOfAttribute = [$scope.ItemCombination.AttributeNames];
                var Attribute = {};

                Attribute.CurrentStock = aData.CurrentStock;

                Attribute.ConversionRate = aData.ConversionRate;
                Attribute.TotalConversion = aData.TotalConversion;

                Attribute.SdPercentage = aData.SdPercentage;
                Attribute.SdAmount = aData.SdAmount;
                Attribute.CdPercentage = aData.CdPercentage;
                Attribute.CdAmount = aData.CdAmount;
                Attribute.VatPercentage = aData.VatPercentage;
                Attribute.VatAmount = aData.VatAmount;
                Attribute.TaxPercentage = aData.TaxPercentage;
                Attribute.TaxAmount = aData.TaxAmount;
                Attribute.RdPercentage = aData.RdPercentage;
                Attribute.RdAmount = aData.RdAmount;
                Attribute.AitPercentage = aData.AitPercentage;
                Attribute.AitAmount = aData.AitAmount;
                Attribute.AtPercentage = aData.AtPercentage;

                Attribute.AtAmount = aData.AtAmount;
                Attribute.TtiPercentage = aData.TtiPercentage;
                Attribute.TtiAmount = aData.TtiAmount;

                Attribute.TotalCost = aData.TotalCost;
                Attribute.VDS = aData.VDS;
                Attribute.PBDetailId = aData.PBDetailId;
                Attribute.PBId = aData.PBId;
                Attribute.PBPrice = aData.PBPrice;
                Attribute.UnitId = aData.UnitId;
                Attribute.ItemName = aData.ItemName;
                Attribute.PackageId = aData.PackageId;
                Attribute.ContainerId = aData.ContainerId;
                Attribute.UnitName = aData.UnitName;

                //Attribute.isRawMaterials = aData.isRawMaterials;
                Attribute.ItemId = aData.ItemId;
                var itemDetailsByItemId = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + aData.ItemId).FirstOrDefault();
                Attribute.SerialAndWarrentyList = [];
                //var Serial = Enumerable.From($scope.warrentySerialList).Where('$.PBDetailId==' + aData.PBDetailId).FirstOrDefault();
                //console.log('Serial', Serial);
                //angular.forEach($scope.warrentySerialList, function (serialData) {
                //    if (aData.PBDetailId == serialData.PBDetailId) {
                //        $scope.pb
                //    }
                //});
                if (itemDetailsByItemId.CategoryId == 2) {

                    $http({
                        //url: "/PurchaseBill/PurchaseBillDetailGetByPBId?pbId+",
                        url: '/PurchaseBill/PurchaseBillDetailSerialSerialId?SerialId=' + aData.PBDetailId,
                        method: "GET",
                        headers: { 'Content-Type': "application/json" }
                    }).success(function (data) {

                        angular.forEach(data, function (sdata) {
                            var SerialAndWarrentyList = [];
                            SerialAndWarrentyList.ItemId = sdata.ItemId;
                            SerialAndWarrentyList.SerialNo = sdata.SerialNo;
                            SerialAndWarrentyList.WarrentyInDays = sdata.WarrentyInDays;
                            Attribute.SerialAndWarrentyList.push(SerialAndWarrentyList);
                        });
                    });
                }

                //$http({
                //    url: '/PurchaseBill/PurchaseBillDetailGetByOverHead?PbId=' + aData.PBId,
                //    method: "GET",
                //    headers: { 'Content-Type': "application/json" }
                //}).success(function (data) {
                //    angular.forEach(data, function (overHeadData) {
                //        var overheadAttrList = [];
                //        overheadAttrList.Amount = overHeadData.Amount;
                //        overheadAttrList.OverHeadName = overHeadData.OverHeadName;
                //        overheadAttrList.OverHeadId = overHeadData.OverHeadId;
                //        overheadAttrList.PBId = overHeadData.PBId;
                //        overheadAttrList.OverHeadName = overHeadData.OverHeadName;
                //        $scope.inv_PurchaseBillOverHeadlst.push(overheadAttrList);
                //    })


                //});


                $scope.inv_StockPBDetailAdAttributeLst.push(Attribute);

                flag = true;
                angular.forEach($scope.inv_PurchaseBillDetaillst, function (aItem) {
                    if (aItem.ItemId == aData.ItemId) {
                        flag = false;
                    }
                });

                if (flag) {
                    var Item = {};
                    angular.forEach($scope.VarietyList, function (aItem) {
                        if (aItem.ItemId == aData.ItemId) {
                            Item = aItem;
                            console.log(aItem.ItemId);
                        }

                    })
                    Item.HeaderOfAttribute = [];

                    Item.UnitName = GetUnitNameById(aData.UnitId);
                    Item.HeaderOfAttribute = ["Description"];
                    Item.Qty = aData.Qty;
                    Item.PBPrice = aData.PBPrice;

                    $scope.inv_PurchaseBillDetaillst.push(Item);
                }

            });

            // console.log('$scope.HsCodeList ', $scope.inv_PurchaseBillOverHeadlst);
        })



    }



    $scope.AppendSerialAndWarrentyWhenQtyChange = function (stockReceiveDetailAdAttribute) {
        if (angular.isUndefined(stockReceiveDetailAdAttribute.AttributeQty) || stockReceiveDetailAdAttribute.AttributeQty < 1) {
            stockReceiveDetailAdAttribute.AttributeQty = 1;
            alertify.log("Minimum 1 Quantity is required.", "error", "5000");
            return;
        }

        if (stockReceiveDetailAdAttribute.AttributeQty > 999) {
            stockReceiveDetailAdAttribute.AttributeQty = 1;
            alertify.log("Maximum Quantity is 999.", "error", "5000");
            return;
        }

        var changegQty = Enumerable.From($scope.inv_StockPBDetailAdAttributeLst)
            .Where('$.ItemId==' + stockReceiveDetailAdAttribute.ItemId + '&& $.ItemAddAttId==' + stockReceiveDetailAdAttribute.ItemAddAttId)
            .FirstOrDefault();
        if (!angular.isUndefined(changegQty)) {
            changegQty.PBQty = stockReceiveDetailAdAttribute.AttributeQty;
            changegQty.Amount = changegQty.PBQty * changegQty.PBPrice;
        }
        if (stockReceiveDetailAdAttribute.SerialAndWarrentyList.length > 0) {
            var SerialAndWarrentyList = [];
            var tableRowNo = 1;
            for (var i = 0; i < stockReceiveDetailAdAttribute.AttributeQty; i++) {
                var SerialAndWarrenty = {
                    ItemAddAttId: stockReceiveDetailAdAttribute.ItemAddAttId,
                    TableRowNo: tableRowNo,
                    SerialNo: "",
                    WarrentyInDays: 0,
                };
                SerialAndWarrentyList.push(SerialAndWarrenty);
                tableRowNo++;
            }
            stockReceiveDetailAdAttribute.SerialAndWarrentyList = [];
            stockReceiveDetailAdAttribute.SerialAndWarrentyList = SerialAndWarrentyList;
        }



    };

    $scope.ItemCombination.PerUnitPrice = 0;
    $scope.ItemCombination.AttributeQty = 0;
    $scope.ItemCombination.TotalDiscountPrice = 0;

    $scope.CheckItemQty = function () {
        if ($scope.ItemCombination.PerUnitPrice == undefined) {
            $scope.ItemCombination.PerUnitPrice = 0;
        }
        if ($scope.ItemCombination.AttributeQty == undefined) {
            $scope.ItemCombination.AttributeQty = 0;
        }
        if ($scope.ItemCombination.TotalDiscountPrice == undefined) {
            $scope.ItemCombination.TotalDiscountPrice = 0;
        }


        var ConvertDiscountAmount = 0;
        var PbUnitPriceWithDiscount = 0;
        var tempDiscount = 0;

        if ($scope.ItemCombination.DiscountPercentage <= 80) {
            ConvertDiscountAmount = ($scope.ItemCombination.DiscountPercentage / 100);

            PbUnitPriceWithDiscount = $scope.ItemCombination.AttributeQty * $scope.ItemCombination.PerUnitPrice;

            tempDiscount = PbUnitPriceWithDiscount * ConvertDiscountAmount;

            $scope.ItemCombination.TotalDiscountPrice = PbUnitPriceWithDiscount - tempDiscount;
            $scope.ItemCombination.DiscountAmount = tempDiscount;
        }
        //else {
        //    alertify.log('Discount Must be less then 100 ', 'error', '500')
        //}
    }

    $scope.CheckPrice = function (pbDetailAdAttribute) {
        if (angular.isUndefined(pbDetailAdAttribute.AttributeUnitPrice) || pbDetailAdAttribute.AttributeUnitPrice < 0) {
            pbDetailAdAttribute.AttributeUnitPrice = 0;
            alertify.log("Minimum zero price is required", "error", "5000");
            return;
        }
    }

    $scope.CheckDuplicatePBNo = function () {

        var date = $("#txtDateOfPB1").val();
        if (date == "") {
            $("#txtDateOfPB1").focus();
            alertify.log('Please select date.', 'error', '5000');
            return;
        }

        if (angular.isUndefined($scope.inv_PurchaseBill.PBNo) || $scope.inv_PurchaseBill.PBNo == null) {
            $("#txtReceiveNo").focus();
            alertify.log('Purchase Bill No. is required.', 'error', '5000');
            return;
        }

        $http({
            url: '/PurchaseBill/CheckDuplicatePBNo?PBNo=' + $scope.inv_PurchaseBill.PBNo + "&date=" + date,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                $scope.found = true;
                alertify.log("P.B No. " + $scope.inv_PurchaseBill.PBNo + ' already exists!', 'error', '3000');
                $scope.inv_PurchaseBill.PBNo = "";
                $('#PbNo').focus();
            } else {
                $scope.found = false;
            }
        });


    }

    $scope.autoWarrantyInDaysValue = function (SerialDtAttri) {
        var WarrentyInDays = SerialDtAttri.WarrentyInDays;

        var ItemAddAttId = SerialDtAttri.ItemId;
        angular.forEach($scope.inv_StockPBDetailAdAttributeLst, function (adata) {
            {
                angular.forEach(adata.SerialAndWarrentyList, function (serial) {
                    if (serial.ItemId == ItemAddAttId) {
                        serial.WarrentyInDays = WarrentyInDays;
                    }

                    if (serial.WarrentyInDays == "" || serial.WarrentyInDays == null) {
                        serial.WarrentyInDays = 0;
                    }
                });

            }
        });
    }

    $scope.checkDuplicateSerialNo = function (SerialDtAttri) {
        if (SerialDtAttri.SerialNo == '' || angular.isUndefined(SerialDtAttri.SerialNo))
            return;

        var isFound = false;
        var serialNoFound = "";
        var serialListByItemAddAttr = {};
        serialListByItemAddAttr = Enumerable.From($scope.inv_StockPBDetailAdAttributeLst).Where('$.ItemId==' + SerialDtAttri.ItemId).FirstOrDefault();

        if (!serialListByItemAddAttr.SerialAndWarrentyList.length) {
            return;
        }

        for (var i = 0; i < serialListByItemAddAttr.SerialAndWarrentyList.length; i++) {
            if (serialListByItemAddAttr.SerialAndWarrentyList[i].SerialNo == SerialDtAttri.SerialNo && serialListByItemAddAttr.SerialAndWarrentyList[i].TableRowNo != SerialDtAttri.TableRowNo) {
                serialNoFound = SerialDtAttri.SerialNo;
                SerialDtAttri.SerialNo = "";
                isFound = true;
                break;
            }
        }
        if (isFound) {
            alertify.log('<b style="color:yellow;font-weight:bold;">' + serialNoFound + "</b> Found as a Duplicate Value.", "error", "5000");
            return;
        }

        var minTableRowNo = Enumerable.From(serialListByItemAddAttr.SerialAndWarrentyList)
            .Min("$.TableRowNo");

        if (SerialDtAttri.TableRowNo == minTableRowNo) {
            //here we'll use alert for auto serial confirmation
            if (1 == 1) {
                var indexOfStr = -1;
                var serialNo = SerialDtAttri.SerialNo;

                for (var i = serialNo.length - 1; i >= 0; i--) {
                    if (parseInt(serialNo[i]) || serialNo[i] == "0") {
                        indexOfStr = i;
                    } else {
                        break;
                    }
                }

                if (indexOfStr > -1) {

                    var number = parseInt(serialNo.substring(indexOfStr, serialNo.length));
                    var numberLength = serialNo.substring(indexOfStr, serialNo.length).length;
                    var textPart = serialNo.substring(0, indexOfStr);

                    angular.forEach(serialListByItemAddAttr.SerialAndWarrentyList, function (adata) {
                        adata.SerialNo = textPart + Pad(number.toString(), numberLength);
                        number++;
                    })
                }
            }
        }
        var notEmptySerial = [];
        var pPurchaseBillDetailSerialList = [];
        notEmptySerial = Enumerable.From(serialListByItemAddAttr.SerialAndWarrentyList).Where('$.SerialNo!=""').ToArray();

        for (var i = 0; i < notEmptySerial.length; i++) {
            pPurchaseBillDetailSerial = {
                DepartmentId: 0,
                ItemAddAttId: notEmptySerial[i].ItemAddAttId,
                PBDetailId: notEmptySerial[i].PBDetailId,
                PBDetailSerialId: notEmptySerial[i].PBDetailSerialId,
                SerialNo: notEmptySerial[i].SerialNo,
                WarrentyInDays: notEmptySerial[i].WarrentyInDays
            }
            pPurchaseBillDetailSerialList.push(pPurchaseBillDetailSerial);
        }

        if (pPurchaseBillDetailSerialList.length) {
            $.ajax({
                url: "/WarrentyAndSerialNo/GetWarrantyAndSerialNoDynamic",
                contentType: "application/json;charset=utf-8",
                type: "POST",
                data: JSON.stringify({ pPurchaseBillDetailSerialList: pPurchaseBillDetailSerialList }),
                success: function (dataFound) {
                    if (dataFound.SerialNo == null)
                        return;

                    var duplicateCount = 0;
                    var isSerialExist = Enumerable.From($scope.inv_StockPBDetailAdAttributeLst).Where('$.ItemId==' + dataFound.ItemId).FirstOrDefault();

                    if (!angular.isUndefined(isSerialExist)) {
                        for (var i = 0; i < isSerialExist.SerialAndWarrentyList.length; i++) {
                            isSerialExist.SerialAndWarrentyList[i].SerialNo = "";
                            duplicateCount++;
                        }
                    }

                    if (duplicateCount > 0) {
                        var dupNo = 1;
                        if (duplicateCount > 1) {
                            dupNo = duplicateCount
                        }
                        alertify.log(dupNo + ' Duplicate Serial No Found., Try again !!!', 'error', '5000');
                    }
                }, error: function (msg) {
                    alertify.log('Server Save Errors!', 'error', '10000');
                }
            });
        }
    }

    $scope.setEmptyStringIfNull = function (SerialDtAttri) {
        if (angular.isUndefined(SerialDtAttri.SerialNo)) {
            SerialDtAttri.SerialNo = "";
        }
    }

    $scope.UpdatePriceAndQuantityFromddlMU = function () {
        if ($scope.ddlSalesMu) {
            $scope.inv_PurchaseBillDetail.PBUnitId = $scope.ddlSalesMu.ItemUnitId;
            $scope.inv_PurchaseBillDetail.ItemName = $scope.ddlSalesMu.UnitName;
            UpdatePriceAndQuantity();
        }
    }

    $scope.AddOverHead = function () {
        if (!$scope.inv_PurchaseBillOverHead.Amount) {
            alertify.log('Enter Amount', 'error', '10000');
        }
        else {
            if ($scope.AddOverHeadLbl == 'Add OverHead') {
                var flag = true;
                angular.forEach($scope.inv_PurchaseBillOverHeadlst, function (aDetails) {
                    if (aDetails.OverHeadId == $scope.ddlOverhead.OverHeadId) {
                        flag = false;
                    }
                });
                if (flag) {
                    $scope.inv_PurchaseBillOverHead.OverHeadId = $scope.ddlOverhead.OverHeadId;
                    $scope.inv_PurchaseBillOverHead.OverHeadName = $scope.ddlOverhead.OverHeadName;
                    $scope.inv_PurchaseBillOverHeadlst.push($scope.inv_PurchaseBillOverHead);
                    clearOverHead();
                }
                else {
                    alertify.log('OverHead alredy exist!', 'error', '10000');
                }
            }
            else {
                clearOverHead();
            }
        }
    }

    $scope.RemoveOverHead = function (index) {
        $scope.inv_PurchaseBillOverHeadlst.splice(index, 1);
        clearOverHead();
    }

    $scope.RowClickOninv_PurchaseBillOverHeadlst = function (ainv_PurchaseBillOverHead) {
        $scope.inv_PurchaseBillOverHead = ainv_PurchaseBillOverHead;
        $scope.ddlOverhead = { "OverHeadId": ainv_PurchaseBillOverHead.OverHeadId };
        $scope.AddOverHeadLbl = 'Update OverHead';
    }

    $scope.RemoveItemAttr = function (aDetail) {


        var inclusivePrice = $scope.TotaInclusiveprice - aDetail.TotalCost;
        $scope.TotaInclusiveprice = inclusivePrice;

        var afterDiscount = 0;
        afterDiscount = $scope.TotalAfterDiscount - aDetail.TotalCostAfterDiscount;
        $scope.TotalAfterDiscount = afterDiscount;

        var exclPrice = 0;
        exclPrice = $scope.TotalQtyAndPrice - aDetail.AttributeUnitPrice;
        $scope.TotalQtyAndPrice = exclPrice;

        var unitPrice = 0;
        unitPrice = $scope.TotalUnitPrice - aDetail.UnitperPrice;
        $scope.TotalUnitPrice = unitPrice;

        var pbQty = 0;
        pbQty = $scope.TotalQty - aDetail.Qty;
        $scope.TotalQty = pbQty;

        var totalAditionalDiscount = 0;
        totalAditionalDiscount = $scope.TotalAditionalDiscountAmount - aDetail.TotalCost;
        $scope.TotalAditionalDiscountAmount = totalAditionalDiscount;


        $scope.ItemRemoveIdList.push(aDetail.PBDetailId);
        
        var ind = $scope.inv_StockPBDetailAdAttributeLst.indexOf(aDetail);
        $scope.inv_StockPBDetailAdAttributeLst.splice(ind, 1);

        angular.forEach($scope.inv_PurchaseBillDetaillst, function (ainv_PurchaseBillDetaillst) {

            if (Enumerable.From($scope.inv_StockPBDetailAdAttributeLst).Where('$.ItemId==' + ainv_PurchaseBillDetaillst.ItemId).ToArray().length < 1) {
                var ind = $scope.inv_PurchaseBillDetaillst.indexOf(ainv_PurchaseBillDetaillst);
                $scope.inv_PurchaseBillDetaillst.splice(ind, 1);
            }
        });

        //$scope.TotalPBPriceCal = 0;
        //$scope.TotalAfterDiscount = 0;
        //$scope.TotaInclusiveprice = 0;
        //$scope.TotalQty = 0;



    }

    function PostPB() {
        //var hasProblemWithSerialNo = false;
        var pbItemList = $scope.inv_StockPBDetailAdAttributeLst;
        //console.log($scope.inv_StockPBDetailAdAttributeLst);

        //for (var i = 0; i < pbItemList.length; i++) {
        //    if (pbItemList[i].SerialAndWarrentyList.length > 0) {
        //        var emptySerialNo = null;
        //        emptySerialNo = Enumerable.From(pbItemList[i].SerialAndWarrentyList).Where('$.SerialNo!=""').FirstOrDefault();

        //        if (!angular.isUndefined(emptySerialNo)) {
        //            var count = Enumerable.From(pbItemList[i].SerialAndWarrentyList).Where('$.SerialNo!=""').Count();
        //            if (count != pbItemList[i].SerialAndWarrentyList.length) {
        //                hasProblemWithSerialNo = true;
        //                break;
        //            }
        //        }
        //    }
        //}

        //if (hasProblemWithSerialNo) {
        //    alertify.log("You've to fill all Serial No Where you already put some.", 'error', '10000');
        //    return;
        //}

        //var from = $("#txtDateOfPB1").val().split("/");
        //if (from.length < 2) {
        //    alertify.log("Please select PB Date", 'error', '10000');
        //    return;
        //}

       if ($scope.ddlBrunch == null || $scope.ddlBrunch == undefined) {
            alertify.log("Must Be Branch Entry", 'error', '10000');
       }
       else if ($scope.inv_PurchaseBill.PBDate == null || $scope.inv_PurchaseBill.PBDate == undefined) {
            alertify.log("Must Be PBDate Entry", 'error', '10000');

        } else if ($scope.inv_PurchaseBill.InvoiceNo == null || $scope.inv_PurchaseBill.InvoiceNo == undefined) {
            alertify.log("Must Be Invoice No Entry", 'error', '10000');

        }
        else if ($scope.inv_PurchaseBill.InvoiceDate == null || $scope.inv_PurchaseBill.InvoiceDate == undefined) {
            alertify.log("Must Be Invoice Date Entry", 'error', '10000');

        }
        else if ($scope.inv_PurchaseBill.LCorPONo == null || $scope.inv_PurchaseBill.LCorPONo == undefined) {
            alertify.log("Must Be LCorPO No  Entry", 'error', '10000');

        }
        else if ($scope.inv_PurchaseBill.LCorPODate == null || $scope.inv_PurchaseBill.LCorPODate == undefined) {
            alertify.log("Must Be LCorPO Date  Entry", 'error', '10000');

        }
        //else if ($scope.ddlBond == null || $scope.ddlBond == undefined) {
        //    alertify.log("Must Be Bond  Entry", 'error', '10000');

        //}
        //else if ($scope.inv_PurchaseBill.BondDate == null || $scope.inv_PurchaseBill.BondDate == undefined) {
        //    alertify.log("Must Be Bond Date  Entry", 'error', '10000');

        //}
        //else if ($scope.inv_PurchaseBill.ImportPermitNo == null || $scope.inv_PurchaseBill.ImportPermitNo == undefined) {
        //    alertify.log("Must Be ImportPermit No  Entry", 'error', '10000');

        //}
        //else if ($scope.inv_PurchaseBill.ImportPermitDate == null || $scope.inv_PurchaseBill.ImportPermitDate == undefined) {
        //    alertify.log("Must Be Import Permit Date   Entry", 'error', '10000');

        //}
        else if ($scope.inv_PurchaseBill.BillOfEntryNo == null || $scope.inv_PurchaseBill.BillOfEntryNo == undefined) {
            alertify.log("Must Be Bill Of EntryNo  Entry", 'error', '10000');

        }
        else if ($scope.inv_PurchaseBill.BillOfEntryDate == null || $scope.inv_PurchaseBill.BillOfEntryDate == undefined) {
            alertify.log("Must Be Bill Of Entry Date  Entry", 'error', '10000');

        }

        else if ($scope.ddlSupplier == null || $scope.ddlSupplier == undefined) {
            alertify.log("Must Be Supplier Name  Entry", 'error', '10000');

        }

        else if ($scope.inv_PurchaseBill.ShipmentInfo == null || $scope.inv_PurchaseBill.ShipmentInfo == undefined) {
            alertify.log("Must Be Shipment Info  Entry", 'error', '10000');

        }
        else if ($scope.inv_StockPBDetailAdAttributeLst.length == 0 || $scope.inv_PurchaseBillDetaillst.length == 0) {
            alertify.log("Please Add a Item Detail List !!!", 'error', '10000');

        }
        else {

            alertify.confirm("Are you sure to save?", function (e) {
            if (e) {

            //var warrentyAndSerialList = [];
            //for (var i = 0; i < pbItemList.length; i++) {
            //    var serialList = Enumerable.From(pbItemList[i].SerialAndWarrentyList).Where('$.SerialNo!=""').ToArray();
            //    console.log(serialList);

            //    if (serialList.length) {
            //        angular.forEach(serialList, function (sData) {
            //            serial = {
            //                PBDetailId: 0,
            //                DepartmentId: 0,
            //                SerialNo: sData.SerialNo,
            //                WarrentyInDays: sData.WarrentyInDays,
            //                ItemId: sData.ItemId
            //            }
            //            warrentyAndSerialList.push(serial);
            //        });
            //    }
            //}

            //var pbListItem = [];
            //angular.forEach(pbItemList, function (aData) {
            //    aData.TotalCostAfterDiscount = aData.TotalCostAfterDiscount;
            //    pbListItem.push(aData);
            //});

                var additionalAfterDiscount = 0;

            if ($scope.inv_PurchaseBill.AdditionDiscount != undefined && $scope.inv_PurchaseBill.AdditionDiscount != null) {

                
                //  additionalAfterDiscount = $scope.TotaInclusiveprice * ($scope.inv_PurchaseBill.AdditionDiscount / 100)
                $scope.inv_PurchaseBill.TotalAmountAfterDiscount = $scope.TotalAfterDiscount - $scope.inv_PurchaseBill.AdditionDiscount;
                // $scope.inv_PurchaseBill.TotalAmountAfterDiscount = additionalAfterDiscount;
                $scope.inv_PurchaseBill.AdditionDiscount;

                $scope.inv_PurchaseBill.TotalAmount = $scope.TotalAfterDiscount;

                $scope.inv_PurchaseBill.TotalPriceInBDT = $scope.inv_PurchaseBill.TotalAmountAfterDiscount * $scope.inv_PurchaseBill.ConversionRate;

            } else {
                $scope.inv_PurchaseBill.TotalAmountAfterDiscount = $scope.TotalAfterDiscount;
                $scope.inv_PurchaseBill.TotalAmount = $scope.TotalAfterDiscount ;
                $scope.inv_PurchaseBill.AdditionDiscount;
                $scope.inv_PurchaseBill.TotalPriceInBDT = $scope.inv_PurchaseBill.TotalAmountAfterDiscount * $scope.inv_PurchaseBill.ConversionRate;
            }

            // $scope.inv_PurchaseBill.TotalAmount = $scope.TotalAmountPB;


                $scope.inv_PurchaseBill.IsApproved = false;
                $scope.inv_PurchaseBill.SupplierId = $scope.ddlSupplier.SupplierId;
                $scope.inv_PurchaseBill.SupplierName = $scope.ddlSupplier.SupplierName;
                $scope.inv_PurchaseBill.PreparedById = $scope.ddlEmployee.EmployeeId;
                $scope.inv_PurchaseBill.PreparedBy = $scope.ddlEmployee.FullName;
                $scope.inv_PurchaseBill.CreatorId = $scope.LoginUser.UserId;
                $scope.inv_PurchaseBill.UpdatorId = $scope.LoginUser.UserId;
                $scope.inv_PurchaseBill.BranchId = $scope.ddlBrunch.BranchId;
                $scope.inv_PurchaseBill.OrganizationId = $scope.LoginUser.BranchId;

                if ($scope.ddlCurrencyType != null) {
                    $scope.inv_PurchaseBill.CurrencyId = $scope.ddlCurrencyType.Id;
                } else {
                    alertify.log('Currency Type Must Be Entry','error', '5000');
                }

                if ($scope.inv_PurchaseBill.ConversionRate == null || $scope.inv_PurchaseBill.ConversionRate == undefined) {
                    alertify.log('Conversation Rate Must Be Entry', 'error', '5000');
                } 

                $scope.inv_PurchaseBill.PriceTypeId = $scope.ddlPriceType.PriceTypeId;
                if ($scope.ddlBond == null || $scope.ddlBond == undefined) {
                    $scope.inv_PurchaseBill.BondId = 0;
                } else {

                    $scope.inv_PurchaseBill.BondId = $scope.ddlBond.BondId;
                }
           

                $scope.inv_PurchaseBill.OrganizationId = $scope.ddlOrganization.Id;
        

            $scope.inv_PurchaseBill.PriceTypeName = $scope.ddlPriceType.PriceTypeName;
            $scope.inv_PurchaseBill.SuppilerTypeName = "";
            $scope.inv_PurchaseBill.IsLocalPurchase = 0;
                if ($scope.inv_PurchaseBill.StockRecivedReference == true) {
                    if ($scope.ddlRecivedId !=null) {
                        $scope.inv_PurchaseBill.SRId = $scope.ddlRecivedId.SRId;
                    }
               
            } else {
                $scope.inv_PurchaseBill.SRId = 0;
            }
            //from = $("#txtDateOfPB1").val().split("/");
            //var f = new Date(from[2], from[1] - 1, from[0]);
            //var from = $("#txtDateOfPB1").val();
            //$scope.inv_PurchaseBill.PBDate = from.split("/").reverse().join("-");

            //var InvoiceDate = $scope.inv_PurchaseBill.InvoiceDate.split("/").reverse().join("-");
            //$scope.inv_PurchaseBill.InvoiceDate = InvoiceDate;

            //var LCorPODate = $scope.inv_PurchaseBill.LCorPODate.split("/").reverse().join("-");
            //$scope.inv_PurchaseBill.LCorPODate = LCorPODate;

            //var BondDate = $scope.inv_PurchaseBill.BondDate.split("/").reverse().join("-");
            //$scope.inv_PurchaseBill.BondDate = BondDate;



            //    var ImportPermitDate = $scope.inv_PurchaseBill.ImportPermitDate.split("/").reverse().join("-");
            //    $scope.inv_PurchaseBill.ImportPermitDate = ImportPermitDate;

            //    var BillOfEntryDate = $scope.inv_PurchaseBill.BillOfEntryDate.split("/").reverse().join("-");
            //    $scope.inv_PurchaseBill.BillOfEntryDate = BillOfEntryDate;

            // $scope.inv_PurchaseBill.PBDate = f;

                var params = JSON.stringify({ ainv_PurchaseBill: $scope.inv_PurchaseBill, inv_PurchaseBillDetailLst: pbItemList, ItemRemoveIdList: $scope.ItemRemoveIdList });
                console.log(params);
                    $.ajax({
                        url: "/PurchaseBill/Save",
                        contentType: "application/json;charset=utf-8",
                        type: "POST",
                        data: params,
                        success: function (data) {
                            var PBIdWithPBNo = data.split(",");
                            var PBIds = PBIdWithPBNo[0];
                            var PBId = Number(PBIds);
                            var PBNo = PBIdWithPBNo[1];
                            if (data != '') {
                                AppNotificationLogPost($scope.inv_PurchaseBill, 'Import Purchase Bill Created!');
                             
                                if (PBNo == "") {
                                    alertify.log('IPB No : ' + $scope.inv_PurchaseBill.PBNo + ' ' + status + ' Successfully!', 'success', '5000');
                                } else {
                                    alertify.log('IPB No: ' + PBNo + ' ' + status + ' Successfully!', 'success', '5000');
                                }

                                if (PBId == null || PBId == undefined) {
                                    $cookieStore.put("PBId", PBId);
                                    $window.open("#/ImportPurchaseReport", "popup", "width=850,height=550,left=280,top=80");
                                } 
                              
                               // alertify.log('Purchase Bill No:' + PBNo + ' Saved Successfully!', 'success', '5000');
                               
                                load();
                                $scope.purchaseBillEntry.$setPristine();
                                $scope.purchaseBillEntry.$setUntouched();
                                //$scope.TotalPBPriceCal = null;
                                //$scope.TotalAfterDiscount = null;
                                //$scope.TotaInclusiveprice = null;
                                //$scope.TotalQty = null;
                                $scope.TotalAditionalDiscountAmount = 0;
                                $scope.TotalQty = 0;
                                $scope.TotalQtyAndPrice = 0;
                                $scope.TotalUnitPrice = 0;
                                $scope.TotalAfterDiscount = 0;
                                $scope.TotaInclusiveprice = 0;
                                Clear();
                            } else {
                                alertify.log('Server Save Errors!', 'error', '5000');
                            }
                        }, error: function (msg) {
                            alertify.log('Server Save Errors!', 'error', '5000');
                        }

                    });
                }
            })
        }
    }

    $scope.SavePB = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.inv_PurchaseBill.PBId == 0 && $scope.CreatePermission) {
                PostPB();

            }
            else if ($scope.inv_PurchaseBill.PBId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.inv_PurchaseBill.PBId > 0 && $scope.RevisePermission) {

                PostPB();

            }
            else if ($scope.inv_PurchaseBill.PBId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.inv_PurchaseBill.PBId == 0 && $scope.CreatePermission) {
                PostPB();
            }
            else if ($scope.inv_PurchaseBill.PBId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.inv_PurchaseBill.PBId > 0 && $scope.RevisePermission) {
                PostPB();
            }
            else if ($scope.inv_PurchaseBill.PBId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }




    }

    $scope.Reset = function () {
        document.getElementById("itemInfoId").disabled = true;
        //for (var i = 0; i < $scope.PurchaseType.length; i++) {
        //    //  $scope.PurchaseType[i].IsChecked = false;
        //    $scope.PurchaseType[i].disabled = false;
        //}
       // load();
      //  $scope.inv_PurchaseBill = {};
        Clear();
        $scope.ItemCombination = {};
        $scope.inv_PurchaseBillDetaillst = [];
        $scope.inv_StockPBDetailAdAttributeLst = [];
        $scope.inv_PurchaseBill.BondId = 0;
        $scope.purchaseBillEntry.$setPristine();
        $scope.purchaseBillEntry.$setUntouched();
        $scope.ItemSearchCombination = null;
       // $("#txtDateOfPB1").val("");
        $scope.TotalAditionalDiscountAmount = 0;
        $scope.TotalQty = 0;
        $scope.TotalQtyAndPrice = 0;
        $scope.TotalUnitPrice = 0;
        $scope.TotalAfterDiscount = 0;
        $scope.TotaInclusiveprice = 0;

        

        $('#SelectitemName').select2('destroy');
        $('#SelectitemName').val('').select2({
           // placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code",
            theme: "classic",
            dropdownAutoWidth: false
        });
        $('#SelectReciveId').select2('destroy');
        $("#SelectReciveId").val('').select2({
            placeholder: "--Prepared By --",
            theme: "classic",
            dropdownAutoWidth: false
        })

        $("#selectBond").val('').select2({
            placeholder: "--Select Bond--",
           // theme: "classic",
            dropdownAutoWidth: false
        })

        //$('#SelectitemName').select2('destroy');
        //$('#SelectitemName').val('').select2({
        //    placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code",
        //    theme: "classic",
        //    dropdownAutoWidth: false
        //});

        GetByCombinationand();


      

    }

   


    $("#txtFromDateForPB").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForPB = function () {
        $("#txtFromDateForPB").focus();
        $("#txtFromDateForPB").trigger("click");
    }


    $("#txtToDateForPB").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForPB = function () {
        $("#txtToDateForPB").focus();
        $("#txtToDateForPB").trigger("click");
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForPB').val('');
        $('#txtToDateForPB').val('');
        $('#PBAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchPBAndCompanyName = null;
        GetPagedPB(1);
    }

    $scope.PBSearch = function () {
        GetPagedPB(1);

    }













    $scope.totalCalculationCD = function () {
        $scope.inv_PurchaseBillDetail.RdAmount;
    }

    function GetHsCode() {

        $http({
            url: "/ItemHsCode/Get",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.HsCodeList = angular.copy(data);
            console.log('$scope.HsCodeList ', $scope.HsCodeList);
        })
    }


    $scope.convertValueDdlList = [
        { Id: 1, Number: 2 },
        { Id: 2, Number: 3 },
        { Id: 3, Number: 4 },
        { Id: 4, Number: 5 },
    ];






    $scope.CurrencyTypeConvertion = function (CurId) {
      //  $scope.ddlCurrencyType = { Id: 2 };
        //AllCommonCurrencyCalculation();
        //ItemInsideCalculation();
        if (CurId == 1) {
            $scope.inv_PurchaseBill.ConversionRate = 1;
        } else {
            $scope.inv_PurchaseBill.ConversionRate = 85;
        }
    }


    $scope.itemCombinationCalculation = function () {
        $scope.hsCodeConvertVal = $scope.ItemCombination.HsCodeId;
        //$scope.ItemCombination.ConversionRate = ;
        $scope.ddlCurrencyType = { Id: 2 };


        //$scope.invDetailsFiledHide = true;
        AllCommonCurrencyCalculation();


        //$scope.hasCode = angular.copy($scope.ItemCombination.HsCodeId);

        //angular.forEach($scope.HsCodeList, function (adata) {
        //    if ($scope.ItemCombination.HsCodeId == adata.HsCodeId) {

        //        //var cdPercent =adata.CD;
        //        $scope.ItemCombination.CdPercentage = adata.CD;

        //        $scope.ItemCombination.RdPercentage = adata.RD;

        //        $scope.ItemCombination.SdPercentage = adata.SD;

        //        $scope.ItemCombination.VatPercentage = adata.VAT;

        //        $scope.ItemCombination.AitPercentage = adata.AIT;

        //        $scope.ItemCombination.AtPercentage = adata.AT;

        //        $scope.ItemCombination.TtiPercentage = adata.TTI;

        //    }
        //})
      //  CurrencyCommonCalculation();

    }

    $scope.ConvertToFixedValue = function (num) {

        if (num != null) {
            $scope.convertNum = num.Number;
        }
      

    }




    $scope.DiscountAmountMinusMethod = function () {

        if ($scope.ItemCombination.TotalDiscountPrice == null || $scope.ItemCombination.TotalDiscountPrice == undefined) {
            $scope.ItemCombination.TotalDiscountPrice = 0;
        }

        if ($scope.ItemCombination.DiscountAmount != undefined || $scope.ItemCombination.DiscountAmount !=null) {
            var tempTotal = $scope.ItemCombination.PBIncludePrice - $scope.ItemCombination.DiscountAmount;

            $scope.ItemCombination.DiscountPercentage = Number((($scope.ItemCombination.DiscountAmount * 100) / $scope.ItemCombination.PBIncludePrice).toFixed(2));

            // $scope.ItemCombination.TotalCost = $scope.ItemCombination.TotalDiscountPrice - $scope.ItemCombination.DiscountAmount;
            $scope.ItemCombination.TotalDiscountPrice = Number((tempTotal).toFixed(2));
        }
      

    }


    $scope.DiscountPercentageCal = function () {

        if ($scope.ItemCombination.DiscountPercentage != undefined || $scope.ItemCombination.DiscountPercentage != null) {

            var totalDis = Number(($scope.ItemCombination.PBIncludePrice - $scope.ItemCombination.DiscountPercentage).toFixed(2));
            var totalAmount = Number(($scope.ItemCombination.DiscountPercentage / 100).toFixed(2));

            $scope.ItemCombination.DiscountAmount = Number((totalAmount * $scope.ItemCombination.PBIncludePrice).toFixed(2));

            var totalDiscountAmount = Number(($scope.ItemCombination.PBIncludePrice - $scope.ItemCombination.DiscountAmount).toFixed(2));
            $scope.ItemCombination.TotalDiscountPrice = Number(totalDiscountAmount);
        }
        else {
            $scope.ItemCombination.TotalDiscountPrice = Number(($scope.ItemCombination.PBIncludePrice).toFixed(2));
        }
       

    }

    $scope.SDCalculationMethod = function () {

        $scope.ItemCombination.SdAmount = $scope.totalSdAmount;
    }

    //$scope.ConvertToFixedValueItem = function (num) {
    //    $scope.convertval = num.Number; 
    //}

    function ConvertHsCodeValToFixed() {
        angular.forEach($scope.HsCodeList, function (adata) {

            if ($scope.hsCodeConvertVal == adata.HsCodeId) {

                var cdPercent = (adata.CD).toFixed($scope.convertNum);
                $scope.ItemCombination.CdPercentage = Number(cdPercent);

                var rdPercent = (adata.RD).toFixed($scope.convertNum);
                $scope.ItemCombination.RdPercentage = Number(rdPercent);

                var sdPercent = (adata.SD).toFixed($scope.convertNum);
                $scope.ItemCombination.SdPercentage = Number(sdPercent);

                var vatPercent = (adata.VAT).toFixed($scope.convertNum);
                $scope.ItemCombination.VatPercentage = Number(vatPercent);

                var aitPercent = (adata.AIT).toFixed($scope.convertNum);
                $scope.ItemCombination.AitPercentage = Number(aitPercent);

                var atPercent = (adata.AT).toFixed($scope.convertNum);
                $scope.ItemCombination.AtPercentage = Number(atPercent);

                var tTIPercent = (adata.TTI).toFixed($scope.convertNum);
                $scope.ItemCombination.TtiPercentage = Number(tTIPercent);

            }
        })
    }


    function AllCommonCurrencyCalculation() {


        //if ($scope.ItemCombination.PerUnitPrice == undefined) {
        //    $scope.ItemCombination.PerUnitPrice = 0;
        //}
        //if ($scope.ItemCombination.AttributeQty == undefined) {
        //    $scope.ItemCombination.AttributeQty = 0;
        //}
        //if ($scope.ItemCombination.TotalDiscountPrice == undefined) {
        //    $scope.ItemCombination.TotalDiscountPrice = 0;
        //}
        //if ($scope.ItemCombination.DiscountAmount == undefined) {
        //    $scope.ItemCombination.DiscountAmount = 0;
        //}

    
        //var ConvertDiscountAmount = 0;
        //var PbUnitPriceWithDiscount = 0;
        //var tempDiscount = 0;

    

        //ConvertDiscountAmount = ($scope.ItemCombination.DiscountPercentage / 100);

    
        //PbUnitPriceWithDiscount = $scope.ItemCombination.TotalDiscountPrice;

        //tempDiscount = (PbUnitPriceWithDiscount * ConvertDiscountAmount).toFixed(2);

        //$scope.ItemCombination.TotalDiscountPrice = PbUnitPriceWithDiscount - tempDiscount;

        //$scope.ItemCombination.DiscountAmount = Number(tempDiscount);



        //var roll = $scope.ItemCombination.RollLenghtInMeterVal;
        //var SqrMeter = $scope.ItemCombination.RollAreaInSqMeterVal;
        //var kg = $scope.ItemCombination.PackageWeight;

        //if (roll == undefined || roll == null) {
        //    roll = 0;
        //}
        //if (SqrMeter == undefined || SqrMeter == null) {
        //    SqrMeter = 0;
        //}
        //if (kg == undefined || kg == null) {
        //    kg = 0;
        //}
   
        //if ($scope.ItemCombination.RollLenghtInMeter == undefined || $scope.ItemCombination.RollLenghtInMeter == null) {
        //    $scope.ItemCombination.RollLenghtInMeter = 0;
        //}
        //if ($scope.ItemCombination.AttributeQty == undefined || $scope.ItemCombination.AttributeQty == null) {
        //    $scope.ItemCombination.AttributeQty = 0;
        //}
        //if ($scope.ItemCombination.RollAreaInSqMeter == undefined || $scope.ItemCombination.RollAreaInSqMeter == null) {
        //    $scope.ItemCombination.RollAreaInSqMeter = 0;
        //}
        //if ($scope.ItemCombination.RollWeightInKg == undefined || $scope.ItemCombination.RollWeightInKg == null) {
        //    $scope.ItemCombination.RollWeightInKg = 0;
        //}
        //if ($scope.ItemCombination.WidthPerRoll == undefined || $scope.ItemCombination.WidthPerRoll == null) {
        //    $scope.ItemCombination.WidthPerRoll = 0;
        //}

        //$scope.ItemCombination.RollLenghtInMeter = $scope.ItemCombination.AttributeQty * roll;

        //if ($scope.ItemCombination.PBIncludePrice == undefined || $scope.ItemCombination.PBIncludePrice == null) {
        //    $scope.ItemCombination.PBIncludePrice = 0;
        //}


        //var totalInclPrice = 0;
        //totalInclPrice = ($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty).toFixed(2);
        //$scope.ItemCombination.PBIncludePrice = Number(totalInclPrice);


    

        //if ($scope.ItemCombination.DiscountPercentage == null || $scope.ItemCombination.DiscountPercentage == undefined || $scope.ItemCombination.DiscountPercentage != 0) {
        //    var dis = $scope.ItemCombination.DiscountPercentage
        //    if (dis < 100) {
        //        $scope.ItemCombination.DiscountPercentage;
        //    }

        //    if ($scope.ItemCombination.PBIncludePrice < dis) {
        //        $scope.ItemCombination.DiscountPercentage = 0;

        //        $scope.ItemCombination.TotalDiscountPrice = 0;

        //        alertify.log('Do not Sufficent In Dscount Percentage', 'error', '5000');

        //    } else {
        //        if ($scope.ItemCombination.DiscountPercentage == undefined) {
        //            var discountAmount = 0;
        //            discountAmount = ($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty).toFixed(2);

        //            $scope.ItemCombination.TotalDiscountPrice = Number(discountAmount);
        //        } else {
        //            var discountAmount = 0;
        //            var tempUPrice = Number(($scope.ItemCombination.PerUnitPrice - $scope.ItemCombination.DiscountPercentage).toFixed(2));
        //            discountAmount = ((tempUPrice * $scope.ItemCombination.AttributeQty) * ($scope.ItemCombination.DiscountPercentage / 100)).toFixed(2);
        //            $scope.ItemCombination.DiscountAmount = Number(discountAmount);

        //            $scope.ItemCombination.TotalDiscountPrice = Number(($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty).toFixed(2));
        //        }


         
        //    }


        //} else {

        //    var tempDisCountAmount = ($scope.ItemCombination.DiscountAmount).toFixed($scope.convertNum);
        //    $scope.ItemCombination.DiscountAmount = Number(tempDisCountAmount);
        //}





        //angular.forEach($scope.AllCombinationlist, function (aItem) {
        //    if (aItem.ItemId == $scope.ItemCombination.ItemId) {

        //        $scope.ItemCombination.RollAreaInSqMeter = $scope.ItemCombination.AttributeQty * aItem.RollAreaInSqMeter;
        //        $scope.ItemCombination.RollLenghtInMeter = $scope.ItemCombination.AttributeQty * aItem.RollLenghtInMeter;
        //        $scope.ItemCombination.RollWeightInKg = Number(($scope.ItemCombination.AttributeQty * aItem.PackageWeight).toFixed(2));

        //        $scope.ItemCombination.WidthPerRoll = $scope.ItemCombination.AttributeQty * aItem.RollWidthInMeter;
        //    }
        //})

        //if ($scope.ddlCurrencyType == null) {
        //    $scope.ddlCurrencyType = {};
        //    $scope.ddlCurrencyType.Id = 2;
        //}


        //if ($scope.ddlCurrencyType.Id == 2) {

        //    if ($scope.ItemCombination.TotalDiscountPrice == undefined) {
            
        //        $scope.currencyCalculation = 0 * $scope.ItemCombination.ConversionRate;
        //        var currencyCal = ($scope.currencyCalculation).toFixed($scope.convertNum);
        //        $scope.ItemCombination.TotalConversion = Number(currencyCal);
        //    }
        //    else {
               
        //        if ($scope.ItemCombination.ConversionRate == undefined) {
        //            $scope.currencyCalculation = $scope.ItemCombination.TotalDiscountPrice * 1;
        //            var currencyCal = ($scope.currencyCalculation).toFixed($scope.convertNum);
        //            $scope.ItemCombination.TotalConversion = Number(currencyCal);
        //        } else {
        //            $scope.currencyCalculation = $scope.ItemCombination.TotalDiscountPrice * 1;
                 
        //            var currencyCal = ($scope.currencyCalculation).toFixed($scope.convertNum);
        //            $scope.ItemCombination.TotalConversion = Number(currencyCal);
        //        }



        //    }

        //}
        //if ($scope.ddlCurrencyType.Id == 1) {

      
        //    $scope.currencyCalculation = $scope.ItemCombination.TotalDiscountPrice * 1;
        //    var currencyCal = ($scope.currencyCalculation).toFixed($scope.convertNum);
        //    $scope.ItemCombination.TotalConversion = Number(currencyCal);
          
        //}

        //$scope.PBsum = 0;
        //var T1 = 0, T2 = 0, T3 = 0, T4 = 0;
      
        //var parcent = 20 / 100;

        //T1 = $scope.currencyCalculation;
        //T2 = T1 * parcent;
        //T3 = (T1 + T2) * parcent;
        //T4 = (T1 + T2 + T3) * parcent;
        //$scope.PBsum = T1 + T2 + T3 + T4;

      
    }

    $scope.PBConversionRateMethod = function () {

        $scope.ItemCombination.PBIncludePrice = $scope.ItemCombination.AttributeQty * $scope.ItemCombination.PerUnitPrice;
        $scope.ItemCombination.TotalDiscountPrice = $scope.ItemCombination.PBIncludePrice;

        $scope.ItemCombination.DiscountPercentage = 0;
        $scope.ItemCombination.DiscountAmount = 0;
       // AllCommonCurrencyCalculation();
    }



    //$scope.ConversionRateMethod = function () {
    //   // AllCommonCurrencyCalculation();
    //}



    


    function GetPagedPB(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;



        var formDateChange = $("#txtFromDateForPB").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForPB").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";



        if ($scope.SearchPBAndCompanyName != undefined && $scope.SearchPBAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([PB].[PBDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([PB].[PBNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [PB].[SupplierName] LIKE '%" + $scope.SearchPBAndCompanyName + "%')";

        }
        else if ($scope.SearchPBAndCompanyName !== undefined && $scope.SearchPBAndCompanyName != null && $scope.SearchPBAndCompanyName != "") {
            SearchCriteria = "[PB].[PBNo] LIKE '%" + $scope.SearchPBAndCompanyName + "%' OR [PB].[SupplierName] LIKE '%" + $scope.SearchPBAndCompanyName + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[PB].[PBDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }


        $http({
            url: encodeURI('/PurchaseBill/GetPagedPB?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {


            $scope.PurchaseBillList = data.ListData;

            $scope.total_count = data.TotalRecord;

            if ($scope.PurchaseBillList.length > 0) {
                angular.forEach($scope.PurchaseBillList, function (aSd) {
                    var res1 = aSd.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.PBDate = date1;
                    }
                })

            }
            else {
                alertify.log('Purchase Bill  Not Found', 'error', '5000');
            }


            


        });


    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedPB(curPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedPB($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedPB($scope.currentPage);
        }
        //  }


    }


    $scope.OpenReportMusuk1 = function (aPurchaseBill) {
        // var pbId = pbId.PBId;

        //$window.open("#/Mushak6_1", "popup", "width=850,height=550,left=280,top=80");

        //$cookieStore.put("PBId", pbId);
        //event.stopPropagation();

        if (aPurchaseBill.isRawMaterials == true) {

            sessionStorage.setItem("PBId", aPurchaseBill.PBId);

            $window.open("#/Mushak6_1", "popup", "width=850,height=550,left=280,top=80");

            event.stopPropagation();
        } else {

            sessionStorage.setItem("PBId", aPurchaseBill.PBId);
            $window.open("#/Mushak6_2", "popup", "width=850,height=550,left=280,top=80");


            event.stopPropagation();
        }


    };



    $scope.purcheaseBillReport = function (pbId) {
        var Id = pbId.PBId;

        $window.open("#/ImportPurchaseReport", "popup", "width=850,height=550,left=280,top=80");

        //sessionStorage.setItem("PBId", Id);
        $cookieStore.put("PBId", Id);

        event.stopPropagation();
    }


    $scope.onSelectToSupplierAndPb = function (ImportPurchaseBillList) {


        sessionStorage.setItem("ImportPB", ImportPurchaseBillList.SupplierId);


        sessionStorage.setItem("ImportPBId", ImportPurchaseBillList.PBId);

        $window.location.href = '/Home/Index#/SupplierPayment';
        console.log(ImportPurchaseBillList);

    }

    $scope.RedirectToItemEntry = function () {
        //  $window.location.href = '/Home/Index#/ItemEntry';
    }

    $scope.RollCalculation = function () {
        var roll = 500;
        //   $scope.ItemCombination.AttributeQty;
        if ($scope.ItemCombination.RollLenghtInMeter == undefined || $scope.ItemCombination.RollLenghtInMeter == null) {
            $scope.ItemCombination.RollLenghtInMeter = 0;
        }
        if ($scope.ItemCombination.AttributeQty == undefined || $scope.ItemCombination.AttributeQty == null) {
            $scope.ItemCombination.AttributeQty = 0;
        }

        $scope.ItemCombination.RollLenghtInMeter = $scope.ItemCombination.AttributeQty * roll;

      
    }


    $scope.ad_Item = {};
    $scope.ItemAndItemAttrSqmLmAndRollKg = function (Combination) {
       
      

        $http({
            url: "/Item/GetByTopItem?itemId="+Combination.ItemId,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
          
            if (data[0].CartonSize == "") {
                $scope.ad_Item.CartonSize = null;
            } else {
                $scope.ad_Item.CartonSize = data[0].CartonSize
            }
            if (data[0].CartonWeight == 0) {
                $scope.ad_Item.CartonWeight = null;
            } else {
                $scope.ad_Item.CartonWeight = data[0].CartonWeight
            }
            if (data[0].ContainerSize == 0) {
                $scope.ad_Item.ContainerSize = null;
            } else {
                $scope.ad_Item.ContainerSize = data[0].ContainerSize
            }
               
            if (data[0].ContainerSize == 0) {
                $scope.ad_Item.ContainerSize = null;
            } else {
                $scope.ad_Item.ContainerSize = data[0].ContainerSize
            }
                
            if (data[0].ContainerWeight == 0) {
                $scope.ad_Item.ContainerWeight = null;
            } else {
                $scope.ad_Item.ContainerWeight = data[0].ContainerWeight
            }
                
            if (data[0].ItemCode == "") {
                $scope.ad_Item.ItemCode = null;
            } else {
                $scope.ad_Item.ItemCode = data[0].ItemCode
            }

            if (data[0].ItemDescription == "") {
                $scope.ad_Item.ItemDescription = null;
            } else {
                $scope.ad_Item.ItemDescription = data[0].ItemDescription
            }
            if (data[0].ItemName == "") {
                $scope.ad_Item.ItemName = null;
            } else {
                $scope.ad_Item.ItemName = data[0].ItemName
            }
            if (data[0].ItemNameDescription1And2 == "") {
                $scope.ad_Item.ItemNameDescription1And2 = null;
            } else {
                $scope.ad_Item.ItemNameDescription1And2 = data[0].ItemNameDescription1And2
            }
                
            if (data[0].PackageWeight == 0) {
                $scope.ad_Item.PackageWeight = null;
            } else {
                $scope.ad_Item.PackageWeight = data[0].PackageWeight
            }

            if (data[0].PcPerRoll == 0) {
                $scope.ad_Item.PcPerRoll = null;
            } else {
                $scope.ad_Item.PcPerRoll = data[0].PcPerRoll
            }

            if (data[0].RollAreaInSqMeter == 0) {
                $scope.ad_Item.RollAreaInSqMeter = null;
            } else {
                $scope.ad_Item.RollAreaInSqMeter = data[0].RollAreaInSqMeter
            }
                
            if (data[0].RollLenghtInMeter == 0) {
                $scope.ad_Item.RollLenghtInMeter = null;
            } else {
                $scope.ad_Item.RollLenghtInMeter = data[0].RollLenghtInMeter
            }
                
            if (data[0].RollPerCarton == 0) {
                $scope.ad_Item.RollPerCarton = null;
            } else {
                $scope.ad_Item.RollPerCarton = data[0].RollPerCarton
            }
                
            if (data[0].RollWeight == 0) {
                $scope.ad_Item.RollWeight = null;
            } else {
                $scope.ad_Item.RollWeight = data[0].RollWeight
            }
            if (data[0].RollWeightInKg == 0) {
                $scope.ad_Item.RollWeightInKg = null;
            } else {
                $scope.ad_Item.RollWeightInKg = data[0].RollWeightInKg
            }
            if (data[0].RollWidthInMeter == 0) {
                $scope.ad_Item.RollWidthInMeter = null;
            } else {
                $scope.ad_Item.RollWidthInMeter = data[0].RollWidthInMeter
            }
       
            $scope.ad_Item.ItemName = data[0].ItemName;
            $scope.ad_Item.ItemCode = data[0].ItemCode;
            $scope.ad_Item.ItemDescription = data[0].ItemDescription;
            $scope.ad_Item.ItemDescriptionTwo = data[0].ItemDescriptionTwo;
            $scope.ad_Item.ItemDescriptionTwo = data[0].ItemDescriptionTwo;

           })
          

        $('#itemSqmLmKgModal').modal('show');


    }
    $scope.ItemEntryList = [];
    $scope.ModalClose = function () {

       // $scope.ItemEntryList.push($scope.ad_Item);
        //$scope.ad_Item = {};
    }

   

    function Clear() {
        $scope.inv_PurchaseBill.PBId = 0;
    
        $scope.inv_PurchaseBill.SupplierId = "";
        $scope.inv_PurchaseBill.ShipmentInfo = "";
        $scope.inv_PurchaseBill.Address = "";
        $scope.inv_PurchaseBill.InvoiceNo = "";
        $scope.inv_PurchaseBill.LCorPONo = "";
        $scope.inv_PurchaseBill.BondId = 0;
        $scope.inv_PurchaseBill.ImportPermitNo = "";
        $scope.inv_PurchaseBill.BillOfEntryNo = "";
        $scope.inv_PurchaseBill.PreparedById = 0;
        $scope.inv_PurchaseBill.AdditionDiscount = 0;
        $scope.inv_PurchaseBill.TotalAmount = 0;
        $scope.inv_PurchaseBill.TotalAmountAfterDiscount = 0;
        $scope.inv_PurchaseBill.Remarks = "";
        $scope.inv_PurchaseBill.IsApproved = 0;

        $scope.TotalQtyAndPrice = 0;
        $scope.TotaInclusiveprice = 0;
        $scope.TotalAfterDiscount = 0;

        $scope.inv_PurchaseBill.PBDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.inv_PurchaseBill.InvoiceDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.inv_PurchaseBill.LCorPODate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.inv_PurchaseBill.BondDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.inv_PurchaseBill.ImportPermitDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.inv_PurchaseBill.BillOfEntryDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');



    }

});
