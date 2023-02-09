app.controller("LocalPurchaseBillController", function ($scope, $rootScope, $cookieStore, $http, $filter, $timeout, $window) {
    // $scope.LoginUser = $cookieStore.get('UserData');

    load();
    Clear();

    function Clear() {
       // $scope.inv_PurchaseBillLocal.PBDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        /*  $scope.inv_PurchaseBillLocal.ManualPODate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');*/
    }

    function load() {
      //  
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            $scope.FullName = $scope.LoginUser.FullName;
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Local Purchase Bill').ScreenId;
        GetUsersPermissionDetails();

        

        $scope.ddlmatrialPaperType = null;
        $scope.ad_Item = {};
        $scope.ProductBtn = 'Add Product';
        $scope.ddlMu = null;
        $scope.TotalPBPriceCal = 0;
        $scope.TotalAfterDiscount = 0;
        $scope.TotaInclusiveprice = 0;
        $scope.TotalQty = 0;

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedPB($scope.currentPage);
        $scope.ddlPriceType = { PriceTypeId: 1 };
        
        //$("#txtDateOfLocalPB").val("");

        //$("#txtPODateOfLocalPB").val("");

        $scope.inv_PurchaseBill = {};

        $scope.AddProductLbl = 'Add Product';
        $scope.AddOverHeadLbl = 'Add OverHead';
        $scope.inv_PurchaseBillDetail = {};
        $scope.supplierlist = [];
        $scope.AddresList = [];
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
        ClearProductCtrl();
        $scope.invPBDetailsFiledHide = false;
        // $scope.rbButton = true;
        $scope.btnIcon = "+";

        $scope.inv_PurchaseBillLocal = {};
        $scope.inv_PurchaseBillLocal.LPBId = 0;
        $scope.ddlMu = { ItemUnitId: 2 }
        $scope.inv_PurchaseBillLocal.CategoryId = 4;

        $scope.CategoryList = [];
        GetAllCategory();
        $scope.hiddenFiled = false;
        $scope.inv_PurchaseBillDetailsItemCombination = {};

       


        GetMaxLocalPurchaseBillNo();

        $scope.IsJumboRoll = false;

        $scope.IsRawHide = true;
        $scope.IsHardware = false;

        $scope.TotalAditionalDiscountAmount = 0;
        $scope.TotalAditionalDiscount = 0;

        //For MaterialDemands
        $scope.materialsDemandList = [];

        $scope.example8settings = {
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
            //selectionLimit: 1,
            //smartButtonMaxItems: 1,
            //dynamicTitle: true,
            //smartButtonTextConverter: function (itemText) { return itemText; }
        };

        ///Multiple Select Not Mandatory ///
        $("#SelectMandatoryHide button").removeClass("selectMendatory").addClass("selectNotMandetory");
        $scope.materialDemandsPlaceholder = {
            //  buttonDefaultText: "Select Material Demands",
            searchPlaceholder: "Search Demands No",

        };

        GetAllMaterialsDemand();
        $scope.materialsDemandOptions = [];
        GetAllmatrialpaperType();
        $scope.matrialPaperTypeList = [];
        $scope.ddlmatrialPaperType = null;

        GetAllOrgnazition();
        $scope.OrgnazitionList = [];
        $scope.LocalPurchaseBillRemoveIdList = [];
        GetAllBranch();
        $scope.Branchlist = [];
        GetAllPO();
        $scope.PurchaseOrderlist = [];

        $scope.AppNotificationSetupList = [];
        GetAppNotificationSetupByReportCode();

        $scope.inv_PurchaseBillLocal.PBDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.inv_PurchaseBillLocal.IsStockable = true;
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

    $("#itemNameId1").select2({
        placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
        //theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });
    $("#itemNameId").select2({
        placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
        //theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });
    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'LPB',
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
    function GetAllBranch() {
        $http({
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Branchlist = data;
        });

    }
    function GetAllPO() {
        $scope.PurchaseOrderlist = [];
        $http({
            url: '/PurchaseOrder/GetAllPO',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            /*$scope.PurchaseOrderlist = data;*/

            angular.forEach(data, function (aData) {
                if (aData.IsLocal == true) {
                    $scope.PurchaseOrderlist.push(aData);
                }
            })
        });

    }
    $scope.GetPurchaseOrderDetailByPOId = function (POId) {
        $scope.TotalQty = 0;
        $scope.TotalPBPriceCal = 0;
        $scope.TotalEInClusiveCost = 0;
        $scope.inv_PurchaseBillLocal.TotalVAT = 0;
        $scope.inv_PurchaseBillLocal.TotalSD = 0;
        $http({
            url: '/PurchaseOrder/GetPurchaseOrderDetailByPOId?POId=' + POId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.inv_StockPBDetailAdAttributeLst = data;
            angular.forEach($scope.inv_StockPBDetailAdAttributeLst, function (aDetail) {
                aDetail.ItemUnit = { ItemUnitId: aDetail.UnitId };
                aDetail.DiscountAmount = 0;
                aDetail.SdPercentage = 0;
                aDetail.SdAmount = 0;
                aDetail.Amount = (aDetail.Qty * aDetail.UnitPrice) - aDetail.DiscountAmount;
                aDetail.TotalCost = aDetail.Amount + aDetail.SdAmount + aDetail.VatAmount;


                aDetail.RollWidthInMeter = 0;
                aDetail.RollLenghtInMeter = 0;
                aDetail.PcPerRoll = 0;
                aDetail.RollPerCarton = 0;
                aDetail.RollWeight = 0;
                aDetail.UnitPerCarton = 0;
                aDetail.CartonWeight = 0;
                aDetail.CartonSize = '';

                $scope.TotalQty += aDetail.Qty;
                $scope.TotalPBPriceCal += aDetail.Amount;
                $scope.TotalEInClusiveCost += aDetail.TotalCost;

                $scope.inv_PurchaseBillLocal.TotalVAT += aDetail.VatAmount;
                $scope.inv_PurchaseBillLocal.TotalSD += aDetail.SdAmount;
                $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = $scope.TotalEInClusiveCost;

            })
        });
    }
    //$scope.SlideHide = false;

    //$("#SlideDiv").click(function () {
    //    $scope.SlideHide = true;

    //    setTimeout(function () {
    //        $("#slideContainer").slideToggle("slow");

    //    },100);

    //});
    //$(".slideContainer").hide()
    //$(".SlideDiv").click(function () {

    //    $(".slideContainer").slideToggle("slow");

    //});



    function GetAllOrgnazition() {

        $http({
            url: '/Company/GetAllOrgnazition',
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {

            angular.forEach(data, function (aData) {
                if (aData.IsActive == true) {


                    $scope.ddlOrganization = { Id: aData.Id }
                    $scope.OrgnazitionList.push(aData);
                }
            })


        });
    }


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


    function GetAllCategory() {
        $http({
            url: "/Category/GetAllCategory",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.CategoryList = data;
            
        });
    }




    $scope.ClearDdl = function () {
        //$('.ItemNameClear').select2('destroy');
        //$('.ItemNameClear').val('').select2({
        //    placeholder: "Select Item"
        //});
        //$scope.ItemSearchCombination =null;
    }

    $scope.MatrialDemandList = [];

    function GetAllMaterialsDemand() {

        $http({
            url: '/PurchaseBill/GetAllMaterialsDemandNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MatrialDemandList = data;
            angular.forEach(data, function (aSec) {
                $scope.materialsDemandOptions.push({ id: aSec.MaterialsDemandId, label: aSec.MaterialsDemandNo });
            })
        });
    }


    $scope.GetmaterialsDemandList = function () {
        $scope.materialsDemandIds = '';
        angular.forEach($scope.materialsDemandList, function (data) {
            $scope.materialsDemandIds += '' ? ('' + data.id) : (data.id + ',');

            // InvIds += InvIds === '' ? ('' + e.InvoiceId) : (',' + e.InvoiceId);

        });

        $scope.demandFilterIds = $scope.materialsDemandIds.substring(0, $scope.materialsDemandIds.length - 1);


    }


    if ($scope.inv_PurchaseBillLocal.CategoryId == 4) {
        document.getElementById("itemInfoId").disabled = true;
    }
    $scope.CheckPurchaseTypeFlag = function (aCategory) {
        $scope.inv_PurchaseBillLocal.CategoryId = aCategory.CategoryId;


        $scope.AllCombinationSearch = [];

        if ($scope.inv_PurchaseBillLocal.CategoryId == 4) {
            $scope.ItemCombination = {};
            $scope.ItemSearchCombination = null;

            document.getElementById("itemInfoId").disabled = false;

            $scope.ddlMu = { ItemUnitId: 2 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == $scope.inv_PurchaseBillLocal.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });

        } else if ($scope.inv_PurchaseBillLocal.CategoryId == 1) {
            $scope.ItemCombination = {};
            $scope.ItemSearchCombination = null;

            document.getElementById("itemInfoId").disabled = false;

            $scope.ddlMu = { ItemUnitId: 2 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == $scope.inv_PurchaseBillLocal.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });

        }
        else if ($scope.inv_PurchaseBillLocal.CategoryId == 2) {
            $scope.ItemCombination = {};
            $scope.ItemSearchCombination = null;

            //   document.getElementById("itemInfoId1").disabled = true;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {

                if (aCombination.CategoryId == $scope.inv_PurchaseBillLocal.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }

        else if ($scope.inv_PurchaseBillLocal.CategoryId == 5) {
            $scope.ItemCombination = {};
            $scope.ItemSearchCombination = null;

            // document.getElementById("itemInfoId1").disabled = true;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {

                if (aCombination.CategoryId == $scope.inv_PurchaseBillLocal.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }
        else if ($scope.inv_PurchaseBillLocal.CategoryId == 5) {
            $scope.ItemCombination = {};
            $scope.ItemSearchCombination = null;

            // document.getElementById("itemInfoId1").disabled = true;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {

                if (aCombination.CategoryId == $scope.inv_PurchaseBillLocal.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }
        else if ($scope.inv_PurchaseBillLocal.CategoryId == 6) {
            $scope.ItemCombination = {};
            $scope.ItemSearchCombination = null;

            //  document.getElementById("itemInfoId1").disabled = true;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {

                if (aCombination.CategoryId == $scope.inv_PurchaseBillLocal.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }

        else if ($scope.inv_PurchaseBillLocal.CategoryId == 3) {
            $scope.ItemCombination = {};
            $scope.ItemSearchCombination = null;

            //document.getElementById("itemInfoId1").disabled = true;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.AllCombinationlist, function (aCombination) {

                if (aCombination.CategoryId == $scope.inv_PurchaseBillLocal.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }
        else {
            $scope.AllCombinationSearch = [];
        }




    }

    $scope.checkDiscountFiledHiden = function () {
        if ($scope.ItemCombination.IsDiscount == true) {
            $scope.ItemCombination.disabled = true;
            $scope.ItemCombination.DiscountAmount = 0;
        } else {
            $scope.ItemCombination.disabled = false;
            $scope.ItemCombination.DiscountAmount = 0;
            $scope.ItemCombination.DiscountPercentage = 0;
        }


        if ($scope.ItemCombination.DiscountPercentage == undefined) {
            $scope.ItemCombination.DiscountPercentage = 0;
        }

        var OverallDisPer = 0;
        OverallDisPer = $scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty;

        $scope.ItemCombination.PurchaseUnitPrice = $scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty;

    }


    $("#txtDateOfLocalPB").datepicker({
        dateFormat: "M d yy",
        changeMonth: true,
        changeYear: true,

        onSelect: function () {

            // $("#txtDateOfPB2").change();       
            $scope.OnSelectdate = $("#txtDateOfLocalPB").val();
            var today = $scope.OnSelectdate;
            $scope.financial_year = "";

            // var today = $("#txtDateOfPB2").val();
            var getMonth = today.substring(0, 3);


            var getFullYear = today.substring(6, 11);
            var fullYear = parseInt(getFullYear);

            console.log('Day', today);
            console.log('month', getMonth);
            console.log('year', parseInt(getFullYear));

            if (getMonth > 6) {
                $scope.financial_year = (fullYear - 1) + "-" + fullYear;
            } else {
                $scope.financial_year = fullYear + "-" + (fullYear + 1)
            }

            var getYear1 = $scope.financial_year.substring(2, 4);
            var getYear2 = $scope.financial_year.substring(7, 9);
            $scope.getAllYear = getYear1 + "-" + getYear2;



        }

    });
    GetMaxLocalPurchaseBillNo();
    function GetMaxLocalPurchaseBillNo() {
        $http({
            url: '/PurchaseBill/GetMaxLocalPurchaseBillNo',
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
                $scope.inv_PurchaseBillLocal.PBNo = 'LPB/' + $scope.finYearHeadOffice + '/' + $scope.MaxPBNo;
                //$scope.inv_PurchaseBilldate = data;
                //$scope.inv_PurchaseBillLocal.PBNo = data;
            });
        });
    }

    $scope.PBDateChange = function () {
        $("#txtDateOfLocalPB").focus();
        $("#txtDateOfLocalPB").trigger("click");

    }




    $scope.hideBtnColapse = function () {
        $scope.invPBDetailsFiledHide == true;

        //ainv_PurchaseBill.ShipmentInfo = ainv_PurchaseBill.ShipmentInfo == null ? "" : ainv_PurchaseBill.ShipmentInfo;
        $scope.invPBDetailsFiledHide = $scope.invPBDetailsFiledHide == false ? true : false;
        //if ($scope.btnIcon == "+") {
        //    $scope.invDetailsFiledHide = true;
        //} 
    }

    $scope.CalendartxtChallanDueDate = function () {
        $("#txtChallanDueDate").focus();
        $("#txtChallanDueDate").trigger("click");
    }

    $("#txtChallanDueDate").datepicker({
        dateFormat: "M d, yy"
    });

    function GetByCombinationand() {
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.AllCombinationlist = angular.fromJson(data);

            $scope.AllCombinationSearch = [];
            $scope.ddlMu = { ItemUnitId: 2 };
            $scope.ddlCategory = { CategoryId: 4 };
            $scope.inv_PurchaseBillLocal.CategoryId = 4;

            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == $scope.inv_PurchaseBillLocal.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });



        });
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
            //  
        })
    }

    function GetSupplier() {
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierlistSearch = angular.copy(data);
            angular.forEach(data, function (aData) {
                if (aData.SuppilerTypeName == "Local") {
                    $scope.supplierlist.push(aData);
                }

            })
        })
    }



    $scope.SupplierDetailShow = false;
    $scope.SupplierCombineAddressAndRegNo = function (supId) {
        /*  Purchase Department*/

        if (supId.SupplierName.match(/Purchase/gi)) {
            $scope.SupplierDetailShow = true;
        }
        else {
            $scope.SupplierDetailShow = false;
        }

        $http({
            url: '/Supplier/GetSupplerAddressById?supplierId=' + supId.SupplierId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.AddresList = data;
            angular.forEach($scope.AddresList, function (adata) {
                if (adata.AddressType == 'Billing' && adata.IsDefault == true) {

                    $scope.inv_PurchaseBillLocal.Address = adata.Address;
                }
            });
        })

        
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
            //  
        });
    }

    function UpdatePriceAndQuantity() {
        $http({
            url: '/StockValuation/GetByItemAndUnitAndDepartment?itemId=' + $scope.inv_PurchaseBillDetail.ItemId + '&unitId=' + $scope.inv_PurchaseBillDetail.PBUnitId + '&transactiontypeid=1&pricetypeId=' + $scope.ddlPriceType.PriceTypeId + '&departmentId=null',
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

    

    $scope.ItemSearchCombinationTextChange = function () {
        if ($scope.ItemSearchCombination != undefined && $scope.ItemSearchCombination != null && $scope.ItemSearchCombination != "") {
            var SingleSearchItem = $scope.ItemSearchCombination.split(" ");
            var SearchCriteria = "";
            myHilitor = new Hilitor2("SearchResults");
            myHilitor.remove();
            for (var i = 0; i < SingleSearchItem.length; i++) {
                myHilitor.setMatchType("open");
                if (SearchCriteria == "") {
                    SearchCriteria = "~($.Combination).toUpperCase().indexOf('" + SingleSearchItem[i] + "'.toUpperCase())";
                } else {
                    SearchCriteria += " && ~($.Combination).toUpperCase().indexOf('" + SingleSearchItem[i] + "'.toUpperCase())";
                }

                myHilitor.apply(SingleSearchItem[i]);
            }

            $scope.AllCombinationSearch = Enumerable.From($scope.AllCombinationlist).Where(SearchCriteria).Take(7).ToArray();
            $scope.AllCombinationSearchRaw = Enumerable.From($scope.AllCombinationlist).Where(function (x) {
                return x.CategoryId == 4;
            }).ToArray();
            console.log('Raw', $scope.AllCombinationSearchRaw);
            //  "Finished Goods"
            $scope.AllCombinationSearchHardware = Enumerable.From($scope.AllCombinationlist).Where(function (x) {
                return x.CategoryId == 2;
            }).ToArray();

            console.log('Hardware', $scope.AllCombinationSearch);

            $scope.VisibilityOfSuggession = true;
        }
        else {
            $scope.AllCombinationSearch = Enumerable.From($scope.AllCombinationlist).Take(7).ToArray();
            $scope.VisibilityOfSuggession = false;
        }
    }

    $scope.LoadACombination = function (aCombination) {
        aCombination.PurchaseUnitPrice = 0;
        $scope.ItemCombination = aCombination;
        $scope.PurchaseUnitPrice = 0;
        $scope.PurchaseUnitPrice = aCombination.PurchaseUnitPrice;
    }



    $scope.unitFilter = function (RawItem) {
        return function (pram) {
            return (pram.ItemUnitId == RawItem.UnitId) || (pram.ItemUnitId == RawItem.PackageId) || (pram.ItemUnitId == RawItem.ContainerId);
        };
    }




    $scope.ad_Item = {};
    $scope.AddPBDetail = function () {
        var isValid = true;
        if (isNaN($scope.inv_PurchaseBillLocal.AdditionDiscount)) {
            $scope.inv_PurchaseBillLocal.AdditionDiscount = 0;
        }


        if (!angular.isUndefined($scope.ItemCombination) && (angular.isUndefined($scope.ItemCombination.AttributeQty) || $scope.ItemCombination.AttributeQty < 1)) {
            $scope.ItemCombination.AttributeQty = 0;
            alertify.log("Minimum 1 Quantity is required", "error", "5000");

            isValid = false;
            return;
        }
        if (!angular.isUndefined($scope.ItemCombination) && (angular.isUndefined($scope.ItemCombination.PurchaseUnitPrice) || $scope.ItemCombination.PurchaseUnitPrice == null)) {
            alertify.log("Minimum zero price is required", "error", "5000");


            isValid = false;
            return;
        }
        if (($scope.ItemCombination.CategoryId == 1 || $scope.ItemCombination.CategoryId == 4) && $scope.ddlmatrialPaperType == null) {
            alertify.log("Please select paper type !!!", "error", "5000");
            isValid = false;

        }

        if (isValid) {
            var Item = {};
            $scope.ItemCombination.ValueOfAttribute = [$scope.ItemCombination.AttributeNames];
            var Attribute = $scope.ItemCombination;
            Item.ItemId = $scope.ItemCombination.ItemId;
            Item.UnitId = $scope.ddlMu.ItemUnitId;
            Item.UnitPrice = $scope.ItemCombination.PerUnitPrice;

            Item.BilledQty = 0;
            Item.POQuantity = 0;
            Item.ReceivedQty = 0;
            Item.Qty = $scope.ItemCombination.AttributeQty;
            Item.UnitPrice = $scope.ItemCombination.PerUnitPrice;

            //var itemDetailsByItemId = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + Attribute.ItemId).FirstOrDefault();
            Item.ItemName = $scope.ItemCombination.ItemName;
            Item.ItemCode = $scope.ItemCombination.ItemCode;

            if ($scope.ItemCombination.VatPercentage == undefined || $scope.ItemCombination.VatPercentage == null) {
                Item.VatPercentage = 0;
            } else {
                Item.VatPercentage = Number($scope.ItemCombination.VatPercentage);
            }
            Item.VatPercentage = $scope.ItemCombination.VatPercentage;

            if ($scope.ItemCombination.SdPercentage == undefined || $scope.ItemCombination.SdPercentage == null) {
                Item.SdPercentage = 0;
            } else {
                Item.SdPercentage = Number($scope.ItemCombination.SdPercentage);
            }
            Item.SdPercentage = $scope.ItemCombination.SdPercentage;


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

                if ($scope.ddlHsCode == null || $scope.ddlHsCode == undefined) {
                    Item.HsCodeId = $scope.ItemCombination.HsCodeId;
                } else {
                    Item.HsCodeId = $scope.ddlHsCode.HsCodeId;
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


            Item.TotalCost = $scope.ItemCombination.TotalCost;
            Item.UnitPrice = $scope.ItemCombination.PerUnitPrice;
            Item.CategoryId = $scope.ddlCategory.CategoryId;

            Item.UnitPrice = $scope.ItemCombination.PerUnitPrice;
            if (isNaN($scope.ItemCombination.DiscountAmount) || $scope.ItemCombination.DiscountAmount == undefined) {
                $scope.ItemCombination.DiscountAmount = 0;
            }

            Item.Amount = ($scope.ItemCombination.AttributeQty * $scope.ItemCombination.PerUnitPrice) - $scope.ItemCombination.DiscountAmount;

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
            Item.TotalCost = $scope.ItemCombination.TotalCost;
            Item.PerUnitPrice = $scope.ItemCombination.PerUnitPrice;
            Item.ItemName = $scope.ItemCombination.ItemName;
            Item.HsCodeId = $scope.ItemCombination.HsCodeId;
            Item.DiscountAmount = $scope.ItemCombination.DiscountAmount;

            Item.TotalUnitAndQty = Number($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty);
            Item.SubCategoryId = $scope.ItemCombination.SubCategoryId;

            Item.SdAmount = Number($scope.ItemCombination.SdAmount);

            Item.VatAmount = Number($scope.ItemCombination.VatAmount);
            Item.AIT_Amount = Number($scope.ItemCombination.AIT_Amount);


            if ($scope.inv_PurchaseBillLocal.TotalVAT == undefined || $scope.inv_PurchaseBillLocal.TotalVAT == null) {
                $scope.inv_PurchaseBillLocal.TotalVAT = 0;
            }
            if ($scope.inv_PurchaseBillLocal.TotalSD == undefined || $scope.inv_PurchaseBillLocal.TotalSD == null) {
                $scope.inv_PurchaseBillLocal.TotalSD = 0;

            }

            $scope.inv_PurchaseBillLocal.TotalVAT += $scope.ItemCombination.VatAmount;
            $scope.inv_PurchaseBillLocal.TotalSD += $scope.ItemCombination.SdAmount;


            if ($scope.ddlmatrialPaperType == null) {
                Item.MaterialTypeId = 0;
            } else {
                Item.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
            }

            Item.CategoryId = $scope.ItemCombination.CategoryId;
            Item.ItemUnit = { ItemUnitId: $scope.ddlMu.ItemUnitId };
            $scope.inv_PurchaseBillDetaillst.push(Item);

            $scope.TotalEInClusiveCost = 0;
            $scope.TotalCostAfterDiscount = 0;
            $scope.TotalPBPriceCal = 0;
            $scope.TotalQty = 0;
            $scope.TotalAmountPB = 0;

            $scope.TotalAfterDiscount = 0;
            $scope.TotaInclusiveprice = 0;

            var discountAmount = 0;

            var discountCal = 0;
            var PbPerUnitPriceAndQty = 0;
            var TotalPBPriceCalVal = 0;
            var TotalAfterDiscountVal = 0;
            var TotaInclusiveprice = 0;
            $scope.unitprice = 0;
            $scope.TotalUnitPrice = 0;
            var Additionaldiscount = 0;
            $scope.TotalAditionalDiscountAmount = 0;
            var additionalDis = 0;
            var totalPrice = 0;

            angular.forEach($scope.inv_PurchaseBillDetaillst, function (adata) {
                $scope.TotalQty += adata.Qty;

                if (adata.DiscountPercentage == null || adata.DiscountPercentage == undefined || adata.DiscountAmount == null || adata.DiscountAmount == undefined) {
                    $scope.TotalEInClusiveCost += adata.TotalCost;
                    discountCal = adata.Amount;
                    discountAmount = discountCal;
                    adata.TotalCostAfterDiscount = discountAmount;
                    Attribute.TotalCostAfterDiscount = discountAmount;
                    $scope.unitprice += adata.PerUnitPrice;

                    Additionaldiscount = ($scope.TotalEInClusiveCost).toFixed(2);
                    $scope.TotalAditionalDiscountAmount = Number(Additionaldiscount);

                    totalPrice += adata.TotalCost;

                } else {
                    $scope.TotalEInClusiveCost += adata.TotalCost;
                    discountCal = adata.Amount //* (adata.DiscountAmount / 100);
                    discountAmount = adata.PerUnitPrice //- discountCal;
                    adata.TotalCostAfterDiscount = discountAmount;
                    Attribute.TotalCostAfterDiscount = discountAmount;
                    $scope.unitprice += adata.PerUnitPrice;

                    Additionaldiscount = ($scope.TotalEInClusiveCost).toFixed(2);
                    $scope.TotalAditionalDiscountAmount = Number(Additionaldiscount);


                    totalPrice += adata.TotalCost;


                }

                PbPerUnitPriceAndQty += adata.UnitPrice * adata.Qty;

                TotalPBPriceCalVal += adata.Amount;

                $scope.TotalPBPriceCal = (TotalPBPriceCalVal).toFixed(2);

                TotalAfterDiscountVal += adata.TotalCostAfterDiscount;
                $scope.TotalAfterDiscount = (TotalAfterDiscountVal).toFixed(2);

                TotaInclusiveprice = $scope.TotalEInClusiveCost;
                $scope.TotaInclusiveprice = (TotaInclusiveprice).toFixed(2);

                additionalDis = ($scope.inv_PurchaseBillLocal.AdditionDiscount).toFixed(2);
                $scope.TotalAditionalDiscount = Number(additionalDis);

                if ($scope.inv_PurchaseBillLocal.AdditionDiscount == undefined || $scope.inv_PurchaseBillLocal.AdditionDiscount == 0) {
                    $scope.inv_PurchaseBillLocal.AdditionDiscount = 0;
                }

                var AditionalDiscount = $scope.TotalEInClusiveCost - $scope.inv_PurchaseBillLocal.AdditionDiscount;
                //$scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = Number((AditionalDiscount + $scope.inv_PurchaseBillLocal.TotalSD + $scope.inv_PurchaseBillLocal.TotalVAT).toFixed(2));
                $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = Number((AditionalDiscount).toFixed(2));
            });

            angular.copy($scope.inv_StockPBDetailAdAttributeLst.push(Item));

            $scope.TotalQty = 0;
            $scope.TotalPBPriceCal = 0;
            $scope.TotalEInClusiveCost = 0;
            $scope.inv_PurchaseBillLocal.TotalVAT = 0;
            $scope.inv_PurchaseBillLocal.TotalSD = 0;

            angular.forEach($scope.inv_StockPBDetailAdAttributeLst, function (aDetail) {
                aDetail.ItemUnit = { ItemUnitId: aDetail.UnitId };
                aDetail.Amount = (aDetail.Qty * aDetail.UnitPrice) - aDetail.DiscountAmount;
                aDetail.TotalCost = aDetail.Amount + aDetail.SdAmount + aDetail.VatAmount;

                $scope.TotalQty += aDetail.Qty;
                $scope.TotalPBPriceCal += aDetail.Amount;
                $scope.TotalEInClusiveCost += aDetail.TotalCost;

                $scope.inv_PurchaseBillLocal.TotalVAT += aDetail.VatAmount;
                $scope.inv_PurchaseBillLocal.TotalSD += aDetail.SdAmount;
                $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = $scope.TotalEInClusiveCost;

            })


            $scope.ItemCombination = {};

            $scope.ItemSearchCombination = null;
            $('#itemNameId').select2('destroy');
            $('#itemNameId').val('').select2({
                placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code",
                theme: "classic",
                dropdownAutoWidth: false
            });





            $('#itemNameId1').select2('destroy');
            $('#itemNameId1').val('').select2({
                placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code",
                theme: "classic",
                dropdownAutoWidth: false
            });

            $('#ddlmatrialPaperTypeLocal').select2('destroy');
            $('#ddlmatrialPaperTypeLocal').val('').select2({
                placeholder: "--Material Paper Type--",

            });
            $scope.ddlmatrialPaperType = null;

        }
        else {
            $scope.ItemCombination.AttributeQty = 0;
            $scope.ItemCombination.PerUnitPrice = 0;
            $scope.ItemCombination.PBIncludePrice = 0;
        }



    }

    $scope.CalculateQty = function (aPurchaseBillDetail, Percentage) {
        aPurchaseBillDetail.Amount = (aPurchaseBillDetail.Qty * aPurchaseBillDetail.UnitPrice) - aPurchaseBillDetail.DiscountAmount;
        
        $scope.inv_PurchaseBillLocal.TotalVAT = 0;
        $scope.inv_PurchaseBillLocal.TotalSD = 0;
        $scope.TotalQty = 0;
        $scope.TotalPBPriceCal = 0;
        $scope.TotalEInClusiveCost = 0;


        angular.forEach($scope.inv_StockPBDetailAdAttributeLst, function (aData) {
            $scope.TotalPBPriceCal += aData.Amount;
            
        });

        if (aPurchaseBillDetail.SdAmount == undefined || aPurchaseBillDetail.SdAmount == null) {
            aPurchaseBillDetail.SdAmount = 0;
        }
        if (aPurchaseBillDetail.VatAmount == undefined || aPurchaseBillDetail.VatAmount == null) {
            aPurchaseBillDetail.VatAmount = 0;
        }
        if (aPurchaseBillDetail.SdPercentage == undefined || aPurchaseBillDetail.SdPercentage == null) {
            aPurchaseBillDetail.SdPercentage = 0;
        }
        if (aPurchaseBillDetail.VatPercentage == undefined || aPurchaseBillDetail.VatPercentage == null) {
            aPurchaseBillDetail.VatPercentage = 0;
        }


        if (Percentage != undefined) {
            aPurchaseBillDetail.SdAmount = ($scope.TotalPBPriceCal * aPurchaseBillDetail.SdPercentage) / 100;
            aPurchaseBillDetail.VatAmount = ($scope.TotalPBPriceCal * aPurchaseBillDetail.VatPercentage) / 100;
        }
        

        aPurchaseBillDetail.TotalCost = aPurchaseBillDetail.Amount + aPurchaseBillDetail.SdAmount + aPurchaseBillDetail.VatAmount;

        var totalVatAmount = aPurchaseBillDetail.VatAmount * 100;
        var temp = (totalVatAmount / $scope.TotalPBPriceCal).toFixed(2);
        aPurchaseBillDetail.VatPercentage = Number(temp);

        var totalSdAmount = aPurchaseBillDetail.SdAmount * 100;
        var temp = (totalSdAmount / $scope.TotalPBPriceCal).toFixed(2);
        aPurchaseBillDetail.SdPercentage = Number(temp);

        angular.forEach($scope.inv_StockPBDetailAdAttributeLst, function (aData) {
            $scope.TotalQty += aData.Qty;
            $scope.TotalEInClusiveCost += aData.TotalCost;
            $scope.inv_PurchaseBillLocal.TotalVAT += aData.VatAmount;
            $scope.inv_PurchaseBillLocal.TotalSD += aData.SdAmount;
            $scope.TotalEInClusiveCost = $scope.TotalEInClusiveCost;
        });

        $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = $scope.TotalEInClusiveCost;

        if ($scope.inv_PurchaseBillLocal.AdditionDiscount == undefined || $scope.inv_PurchaseBillLocal.AdditionDiscount == null) {
            $scope.inv_PurchaseBillLocal.AdditionDiscount = 0;
        }
        $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount - $scope.inv_PurchaseBillLocal.AdditionDiscount;


    }
    $scope.AmountCalculation = function () {
        $scope.TotalQty = 0;
        $scope.TotalPBPriceCal = 0;
        $scope.TotalEInClusiveCost = 0;
        angular.forEach($scope.inv_StockPBDetailAdAttributeLst, function (aData) {
            $scope.TotalQty += aData.Qty;
            $scope.TotalPBPriceCal += aData.Amount;
            $scope.TotalEInClusiveCost += aData.TotalCost;
        })
    }
    $scope.localPurcheaseBillUpdate = function (aPb) {

        $scope.LocalPurchaseBillRemoveIdList = [];


        $scope.inv_PurchaseBillLocal = aPb;
        $scope.IsReceived = aPb.IsReceived;

        if ($scope.IsReceived == 1) {
            alertify.log("This Purchase bill's stock is already received!!! So, any item-related information can't be changed!!!", "success", "8000");
        }

        $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = aPb.TotalAmountAfterDiscount;
        $scope.inv_PurchaseBillLocal.AdditionDiscount = aPb.AdditionDiscount;
        $scope.inv_PurchaseBillLocal.TotalAIT = aPb.TotalAIT;
        $scope.inv_PurchaseBillLocal.TotalVAT = aPb.TotalVAT;
        $scope.inv_PurchaseBillLocal.TotalSD = aPb.TotalSD;
       

        if (aPb.ManualPODate !=null) {
            var res1 = aPb.ManualPODate.substring(0, 5);
            if (res1 == "/Date") {
                var parsedDate1 = new Date(parseInt(aPb.ManualPODate.substr(6)));
                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                aPb.ManualPODate = date1;
            }
        }

       
        var res2 = aPb.PBDate.substring(0, 5);

     
        if (res2 == "/Date") {
            var parsedDate2 = new Date(parseInt(aPb.PBDate.substr(6)));
            var date2 = ($filter('date')(parsedDate3, 'MMM dd, yyyy')).toString();
            aPb.PBDate = date2;

        }
        $scope.ddlBrunch = { BranchId: aPb.BranchId};

        $("#localDdlEmployeeSelect").val(aPb.PreparedById).select2({
            // placeholder: "--Prepared By--",
            theme: "classic"
        })
        $scope.ddlEmployee = { EmployeeId: aPb.PreparedById };
        $scope.ddlSupplier = { SupplierId: aPb.SupplierId }

        setTimeout(function () {
            $("#ddlSupplier").select2({
                theme: "classic"
            }).val(aPb.SupplierId).trigger("change");
        }, 0);
        

        $("#ddlPurchaseOrder").val(aPb.POId).select2({
            //theme: "classic"
        })
        $scope.ddlPurchaseOrder = { POId: aPb.POId }

        // $scope.materialsDemandOptions.push({ id: aPb.MaterialsDemandIds, label: aPb.MaterialsDemandNo });

        angular.forEach($scope.MatrialDemandList, function (aSec) {
            if (aPb.MaterialsDemandIds == aSec.MaterialsDemandId) {
                // $scope.materialsDemandOptions.push({ id: aSec.MaterialsDemandId, label: aSec.MaterialsDemandNo });
                $scope.materialsDemandList.push({ id: aSec.MaterialsDemandId, label: aSec.MaterialsDemandNo });
            }

        })

        angular.forEach($scope.Branchlist, function (aBranch) {
            if (aBranch.BranchId == aPb.BranchId) {
                $scope.ddlBranch = { BranchId: aBranch.BranchId };
            }
        })

        var PbPerUnitPriceAndQty = 0;
        $scope.inv_PurchaseBillDetaillst = [];
        $scope.inv_StockPBDetailAdAttributeLst = [];
        $scope.TotalPBPriceCal = 0;
        $scope.TotalAfterDiscount = 0;
        $scope.TotaInclusiveprice = 0;
        $scope.TotalEInClusiveCost = 0;
        $scope.TotalUnitPrice = 0;
        $scope.TotalQty = 0;
        $http({
            url: '/PurchaseBill/UpdateForLocalPurchaseBillGetById?LPBId=' + aPb.LPBId,
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {

            angular.forEach(data, function (aData) {

                aData.UnitperPrice = aData.UnitPrice;
                PbPerUnitPriceAndQty += aData.UnitperPrice * aData.Qty;


                var ImpurchaseBillObj = {};
                ImpurchaseBillObj.LPBDetailId = aData.LPBDetailId;
                ImpurchaseBillObj.LPBId = aData.LPBId;
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
                ImpurchaseBillObj.Amount = aData.Amount;
                ImpurchaseBillObj.DiscountAmount = aData.DiscountAmount;

                ImpurchaseBillObj.TotalCostAfterDiscount = aData.TotalCostAfterDiscount;

                //ImpurchaseBillObj.CurrencyType = aData.CurrencyType;
                //ImpurchaseBillObj.ConversionRate = aData.ConversionRate;
                //ImpurchaseBillObj.TotalConversion = aData.TotalConversion;

                ImpurchaseBillObj.TotalCost = aData.TotalCost;
                ImpurchaseBillObj.FinalUnitPrice = aData.FinalUnitPrice;

                ImpurchaseBillObj.SdPercentage = Number(aData.SdPercentage);
                ImpurchaseBillObj.SdAmount = aData.SdAmount;
                ImpurchaseBillObj.MaterialTypeId = aData.MaterialTypeId;
                ImpurchaseBillObj.VatPercentage = Number(aData.VatPercentage);
                ImpurchaseBillObj.VatAmount = aData.VatAmount;

                ImpurchaseBillObj.TotalUnitAndQty = aData.UnitPrice * aData.Qty;
                ImpurchaseBillObj.UnitperPrice = aData.UnitPrice;

                $scope.TotalPBPriceCal += Number(aData.UnitPrice * aData.Qty) - aData.DiscountAmount;
                $scope.TotalAfterDiscount += Number(aData.TotalCostAfterDiscount);

                $scope.TotaInclusiveprice += Number(aData.TotalCost);
                $scope.TotalEInClusiveCost += Number(aData.TotalCost);
                //$scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = $scope.inv_PurchaseBillLocal.TotalAIT + $scope.TotalEInClusiveCost;

                // $scope.TotalUnitPrice += aData.UnitPrice;
                $scope.TotalQty += aData.Qty;

                $scope.inv_PurchaseBillDetaillst.push(ImpurchaseBillObj);
                $scope.inv_StockPBDetailAdAttributeLst.push(ImpurchaseBillObj);
            });

        });

    }


    GetAllSerialAndWarrentyNumber();
    $scope.warrentySerialList = [];
    function GetAllSerialAndWarrentyNumber() {
        $http({
            url: '/PurchaseBill/GetAllWarrentyAndSerial',
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.warrentySerialList = data;
        });
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

    $scope.CheckItemQty = function () {

    }

    $scope.CheckPrice = function (pbDetailAdAttribute) {
        if (angular.isUndefined(pbDetailAdAttribute.AttributeUnitPrice) || pbDetailAdAttribute.AttributeUnitPrice < 0) {
            pbDetailAdAttribute.AttributeUnitPrice = 0;
            alertify.log("Minimum zero price is required", "error", "5000");
            return;
        }
    }

    //$scope.CheckDuplicatePBNo = function () {

    //    var date = $("#txtDateOfLocalPB").val();
    //    if (date == "") {
    //        $("#txtDateOfLocalPB").focus();
    //        alertify.log('Please select date.', 'error', '5000');
    //        return;
    //    }

    //    if (angular.isUndefined($scope.inv_PurchaseBill.PBNo) || $scope.inv_PurchaseBill.PBNo == null) {
    //        $("#txtReceiveNo").focus();
    //        alertify.log('Purchase Bill No. is required.', 'error', '5000');
    //        return;
    //    }

    //    $http({
    //        url: '/PurchaseBill/CheckDuplicatePBNo?PBNo=' + $scope.inv_PurchaseBill.PBNo + "&date=" + date,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        if (data.length > 0) {
    //            $scope.found = true;
    //            alertify.log("P.B No. " + $scope.inv_PurchaseBill.PBNo + ' already exists!', 'error', '3000');
    //            $scope.inv_PurchaseBill.PBNo = "";
    //            $('#PbNo').focus();
    //        } else {
    //            $scope.found = false;
    //        }
    //    });


    //}

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


        $scope.LocalPurchaseBillRemoveIdList.push(aDetail.LPBDetailId);

        var inclusivePrice = ($scope.TotalEInClusiveCost - aDetail.TotalCost).toFixed(3);
        $scope.TotalEInClusiveCost = Number(inclusivePrice);

        if ($scope.inv_StockPBDetailAdAttributeLst.length == 1) {
            var TotalDisAmount = ($scope.inv_PurchaseBillLocal.TotalDisCountParenAmount - $scope.inv_PurchaseBillLocal.AdditionDiscount)
            var totalAmount = Number((TotalDisAmount - $scope.inv_PurchaseBillLocal.TotalAIT).toFixed(2));
            var tempTotal = Number((totalAmount - aDetail.TotalCost).toFixed(2));
            $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = Number((tempTotal).toFixed(2));
            $scope.inv_PurchaseBillLocal.AdditionDiscount = 0;
            $scope.inv_PurchaseBillLocal.TotalAIT = 0;
            $scope.inv_PurchaseBillLocal.TotalVAT = 0;
            $scope.inv_PurchaseBillLocal.TotalSD = 0;

            GetPagedPB(1);


        }
        else {
            var TotalDisAmount = Number(($scope.inv_PurchaseBillLocal.TotalDisCountParenAmount - aDetail.TotalCost).toFixed(2));
            $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = Number(((TotalDisAmount - aDetail.VatAmount) - (aDetail.SdAmount)).toFixed(2));


            var TotalVat = Number(($scope.inv_PurchaseBillLocal.TotalVAT - aDetail.VatAmount).toFixed(2));
            $scope.inv_PurchaseBillLocal.TotalVAT = Number(TotalVat);

            var Sd = Number(($scope.inv_PurchaseBillLocal.TotalSD - aDetail.SdAmount).toFixed(2));
            $scope.inv_PurchaseBillLocal.TotalSD = Sd;
        }








        //var afterDiscount = 0;
        //afterDiscount = ($scope.TotalAfterDiscount - aDetail.TotalCostAfterDiscount).toFixed(2);
        //$scope.TotalAfterDiscount = Number(afterDiscount);

        var exclPrice = 0;
        exclPrice = ($scope.TotalPBPriceCal - aDetail.Amount).toFixed(2);
        $scope.TotalPBPriceCal = Number(exclPrice);

        // var unitPrice = 0;
        // unitPrice = ($scope.TotalUnitPrice - aDetail.UnitPrice).toFixed(2);
        // $scope.TotalUnitPrice = Number(unitPrice);

        var pbQty = 0;
        pbQty = ($scope.TotalQty - aDetail.Qty).toFixed(2);
        $scope.TotalQty = Number(pbQty);

        //var totalAditionalDiscount = 0;
        //totalAditionalDiscount = ($scope.TotalAditionalDiscountAmount - aDetail.TotalCost).toFixed(2);
        //$scope.TotalAditionalDiscountAmount = Number(totalAditionalDiscount);


        var ind = $scope.inv_StockPBDetailAdAttributeLst.indexOf(aDetail);
        $scope.inv_StockPBDetailAdAttributeLst.splice(ind, 1);
        angular.forEach($scope.inv_PurchaseBillDetaillst, function (ainv_PurchaseBillDetaillst) {
            if (Enumerable.From($scope.inv_StockPBDetailAdAttributeLst).Where('$.ItemId==' + ainv_PurchaseBillDetaillst.ItemId).ToArray().length < 1) {
                var ind = $scope.inv_PurchaseBillDetaillst.indexOf(ainv_PurchaseBillDetaillst);
                $scope.inv_PurchaseBillDetaillst.splice(ind, 1);
            }
        });

    }


    $("#txtPODateOfLocalPB").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.CalendartxtPODate = function () {
        $("#txtPODateOfLocalPB").focus();
        $("#txtPODateOfLocalPB").trigger("click");
    }
    function PostLPB() {
        var hasProblemWithSerialNo = false;
        var pbItemList = $scope.inv_StockPBDetailAdAttributeLst;

        angular.forEach(pbItemList, function (aData) {
            delete aData.ItemCode;
            delete aData.IsVoid;
            delete aData.ItemUnit;
            delete aData.MaterialTypeCode;
            delete aData.PODetailId;
            delete aData.POId;
            delete aData.SdPercentage;
            delete aData.UnitName;
            delete aData.VATAmount;
            delete aData.VATPercentage;
        })


        if ($scope.ddlBrunch == null || $scope.ddlBrunch == undefined) {
            alertify.log("Must Be Branch Entry", 'error', '10000');
        }
        else if ($scope.inv_PurchaseBillLocal.PBDate == null || $scope.inv_PurchaseBillLocal.PBDate == undefined) {
            alertify.log("Must Be Purchase Bill Date  Entry", 'error', '10000');

        }

        else if ($scope.inv_PurchaseBillLocal.PBNo == null || $scope.inv_PurchaseBillLocal.PBNo == undefined) {
            alertify.log("Must Purchase No  Entry", 'error', '10000');

        }
        else if ($scope.ddlEmployee == null || $scope.ddlEmployee == undefined) {
            alertify.log("Must Be Employee Name  Entry", 'error', '10000');

        }
        else if ($scope.ddlSupplier == null || $scope.ddlSupplier == undefined) {
            alertify.log("Must Be Supplier Name  Entry", 'error', '10000');

        }
        //else if ($scope.inv_PurchaseBillLocal.ShipmentInfo == null || $scope.inv_PurchaseBillLocal.ShipmentInfo == undefined) {
        //    alertify.log("Must Be Shipment Info   Entry", 'error', '10000');

        //}
        //else if ($scope.inv_PurchaseBillLocal.Address == null || $scope.inv_PurchaseBillLocal.Address == undefined) {
        //    alertify.log("Must Be Address  Entry", 'error', '10000');

        //}

        else if ($scope.ddlSupplier == null || $scope.ddlSupplier == undefined) {
            alertify.log("Must Be Supplier Name  Entry", 'error', '10000');

        }

        //else if ($scope.inv_PurchaseBillLocal.ShipmentInfo == null || $scope.inv_PurchaseBillLocal.ShipmentInfo == undefined) {
        //    alertify.log("Must Be Shipment Info  Entry", 'error', '10000');

        //}
        else if ($scope.inv_StockPBDetailAdAttributeLst.length == 0 || $scope.inv_StockPBDetailAdAttributeLst.length == null || $scope.inv_StockPBDetailAdAttributeLst.length == undefined) {
            alertify.log("Please Add a Item Detail List !!!", 'error', '10000');
        }
        else {
          
            $scope.inv_PurchaseBillLocal.SupplierId = $scope.ddlSupplier.SupplierId;
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {


                    var additionalAfterDiscount = 0;
                    if ($scope.inv_PurchaseBillLocal.AdditionDiscount != undefined && $scope.inv_PurchaseBillLocal.AdditionDiscount != null) {

                        // additionalAfterDiscount = $scope.TotaInclusiveprice * ($scope.inv_PurchaseBillLocal.AdditionDiscount / 100)
                        $scope.inv_PurchaseBillLocal.AdditionDiscount;
                        $scope.inv_PurchaseBillLocal.TotalAmountAfterDiscount = $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount;

                        $scope.inv_PurchaseBillLocal.TotalAmount = $scope.TotaInclusiveprice;

                        /*Number($scope.TotaInclusiveprice) - $scope.inv_PurchaseBillLocal.AdditionDiscount;*/
                        $scope.inv_PurchaseBillLocal.AdditionDiscount;

                        // $scope.inv_PurchaseBillLocal.TotalAmount = Number($scope.TotaInclusiveprice);

                    } else {
                        $scope.inv_PurchaseBillLocal.TotalAmountAfterDiscount = $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount;
                        $scope.inv_PurchaseBillLocal.TotalAmount = $scope.TotaInclusiveprice;
                        //  $scope.inv_PurchaseBillLocal.TotalAmount = $scope.TotaInclusiveprice;
                        $scope.inv_PurchaseBillLocal.AdditionDiscount;
                    }

                    $scope.inv_PurchaseBillLocal.IsApproved = false;

                    $scope.inv_PurchaseBillLocal.SupplierName = $scope.ddlSupplier.SupplierName;
                    $scope.inv_PurchaseBillLocal.PreparedById = $scope.ddlEmployee.EmployeeId;
                    $scope.inv_PurchaseBillLocal.PreparedBy = $scope.ddlEmployee.FullName;
                    $scope.inv_PurchaseBillLocal.CreatorId = $scope.LoginUser.UserId;
                    $scope.inv_PurchaseBillLocal.UpdatorId = $scope.LoginUser.UserId;
                    $scope.inv_PurchaseBillLocal.PriceTypeId = $scope.ddlPriceType.PriceTypeId;
                    $scope.inv_PurchaseBillLocal.PriceTypeName = $scope.ddlPriceType.PriceTypeName;

                    $scope.inv_PurchaseBillLocal.OrganizationId = $scope.LoginUser.BranchId;
                    $scope.inv_PurchaseBillLocal.BranchId = $scope.ddlBrunch.BranchId;

                    if ($scope.demandFilterIds == "" || $scope.demandFilterIds == undefined || $scope.demandFilterIds == null) {
                        $scope.inv_PurchaseBillLocal.MaterialsDemandIds = "";
                    } else {
                        $scope.inv_PurchaseBillLocal.MaterialsDemandIds = $scope.demandFilterIds;
                    }

                    //if ($scope.inv_PurchaseBillLocal.ManualPODate == "") {
                    //    $scope.inv_PurchaseBillLocal.ManualPODate = null;
                    //}




                    //from = $("#txtDateOfLocalPB").val().split("/");

                    //var f = new Date(from[2], from[1] - 1, from[0]);
                    //$scope.inv_PurchaseBillLocal.PBDate = f;

                    //var iDD = $("#txtPODateOfLocalPB").val();
                    //$scope.inv_PurchaseBillLocal.ManualPODate = iDD.split("/").reverse().join("-");

                    $scope.inv_PurchaseBillLocal.PBDate = $("#txtDateOfLocalPB").val();
                    $scope.inv_PurchaseBillLocal.ManualPODate = $("#txtPODateOfLocalPB").val();
                    $.ajax({
                        url: "/PurchaseBill/LocalPBSave",
                        contentType: "application/json;charset=utf-8",
                        type: "POST",
                        data: JSON.stringify({ Local_inv_PurchaseBill: $scope.inv_PurchaseBillLocal, Local_inv_PurchaseBillDetailLst: pbItemList, LocalPurchaseBillRemoveIdList: $scope.LocalPurchaseBillRemoveIdList }),
                        success: function (data) {
                            var PBIdWithPBNo = data.split(",");
                            var PBIds = PBIdWithPBNo[0];
                            var PBId = Number(PBIds);
                            var PBNo = PBIdWithPBNo[1];
                            if (data != "") {
                                AppNotificationLogPost($scope.inv_PurchaseBillLocal, 'Local Purchase Bill Created!');
                                //$window.open("#/LocalPurchaseReport", "popup", "width=850,height=550,left=280,top=80");
                                //$cookieStore.put("LPBId", PBId);
                                if (PBNo == "") {
                                    alertify.log('LPB No : ' + data + ' ' + status + ' Successfully!', 'success', '5000');
                                } else {
                                    alertify.log('LPB No : ' + PBNo + ' ' + status + ' Successfully!', 'success', '5000');
                                }
                               
                                load();

                                $scope.TotalAditionalDiscountAmount = 0;
                                $scope.TotalQty = 0;
                                $scope.TotalUnitPrice = 0;
                                $scope.TotalPBPriceCal = 0;
                                $scope.TotalPBPriceCal = 0;
                                $scope.TotalAfterDiscount = 0;
                                $scope.TotaInclusiveprice = 0;

                            }
                        }, error: function (msg) {
                            alertify.log('Server Save Errors!', 'error', '10000');
                        }
                    });
                }
            })
        }
    }
    $scope.LocalSavePB = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.inv_PurchaseBillLocal.LPBId == 0 && $scope.CreatePermission) {
                //alertify.confirm("Are you sure to save?", function (e) {
                //    if (e) {
                PostLPB();
                //    }
                //})
            }
            else if ($scope.inv_PurchaseBillLocal.LPBId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.inv_PurchaseBillLocal.LPBId > 0 && $scope.RevisePermission) {
                //alertify.confirm("Are you sure to update?", function (e) {
                //    if (e) {
                PostLPB();
                //    }
                //})
            }
            else if ($scope.inv_PurchaseBillLocal.LPBId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.inv_PurchaseBillLocal.LPBId == 0 && $scope.CreatePermission) {
                PostLPB();
            }
            else if ($scope.inv_PurchaseBillLocal.LPBId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.inv_PurchaseBillLocal.LPBId > 0 && $scope.RevisePermission) {
                PostLPB();
            }
            else if ($scope.inv_PurchaseBillLocal.LPBId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }


    }



    $scope.Reset = function () {


        $scope.ItemCombination = {};
        $scope.TotalAditionalDiscountAmount = 0;
        $scope.TotalQty = 0;
        $scope.TotalUnitPrice = 0;
        $scope.TotalPBPriceCal = 0;
        $scope.TotalPBPriceCal = 0;
        $scope.TotalAfterDiscount = 0;
        $scope.TotaInclusiveprice = 0;

        load();

        $scope.inv_PurchaseBillLocal = {};
        //$scope.inv_PurchaseBillLocal = {};
        //$scope.ItemCombination = {};


        $("#txtDateOfLocalPB").val("");

        $('#itemNameId').val('').select2({
            placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code",
            theme: "classic",
            dropdownAutoWidth: false
        });

        $('#itemNameId1').select2('destroy');
        $('#itemNameId1').val('').select2({
            placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code",
            theme: "classic",
            dropdownAutoWidth: false
        });

        $('#localDdlEmployeeSelect').select2('destroy');
        $("#localDdlEmployeeSelect").val('').select2({
            placeholder: "--Prepared By--"
        })

        $('#ddlmatrialPaperTypeLocal').select2('destroy');
        $("#ddlmatrialPaperTypeLocal").val('').select2({
            placeholder: "--Prepared By--"
        })



        //$scope.inv_PurchaseBillLocal.PBDate = $filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy');
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
    $scope.ConvertToFixedValue = function (num) {

        //$scope.convertNum = num.Number;

        if (num != null) {
            $scope.convertNum = num.Number;
        }
        LocalPbCalculationMethod();
        //ItemInsideCalculation();


        // ConvertHsCodeValToFixed();
        //CurrencyCommonCalculation();

    }


    $scope.DiscountAmountMinusMethod = function () {
        if ($scope.ItemCombination.PurchaseUnitPrice == null || $scope.ItemCombination.PurchaseUnitPrice == undefined) {
            $scope.ItemCombination.PurchaseUnitPrice = 0;
        }

        if ($scope.ItemCombination.PBIncludePrice < $scope.ItemCombination.DiscountAmount) {

            $scope.ItemCombination.DiscountAmount = 0;
            $scope.ItemCombination.DiscountPercentage = 0;
            alertify.log('Do not Sufficent In Dscount Amount', 'error', '5000')
        } else {
            $scope.ItemCombination.DiscountPercentage = 0;
            $scope.ItemCombination.PurchaseUnitPrice = ($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty) - $scope.ItemCombination.DiscountAmount;
        }

        var TotalCostAmount = 0;
        var totalCostAmount = 0;
        TotalCostAmount = $scope.ItemCombination.SdAmount + $scope.ItemCombination.VatAmount + $scope.ItemCombination.PurchaseUnitPrice;
        totalCostAmount = (TotalCostAmount).toFixed(2);
        $scope.ItemCombination.TotalCost = Number(totalCostAmount);


    }

    $scope.SdAmountcalCulation = function () {

        var TotalCostAmount = 0;
        var totalCostAmount = 0;
        var totalVatAmount = 0;
        totalVatAmount = $scope.ItemCombination.SdAmount * 100;
        var temp = (totalVatAmount / $scope.ItemCombination.PurchaseUnitPrice).toFixed(2);
        $scope.ItemCombination.SdPercentage = Number(temp);

        if ($scope.ItemCombination.VatAmount == undefined || $scope.ItemCombination.VatAmount == null) {
            $scope.ItemCombination.VatAmount = 0;
        }

        TotalCostAmount = $scope.ItemCombination.SdAmount + $scope.ItemCombination.VatAmount + $scope.ItemCombination.PurchaseUnitPrice;
        totalCostAmount = (TotalCostAmount).toFixed(2);
        $scope.ItemCombination.TotalCost = Number(totalCostAmount);
    }  


    $scope.VatAmountcalCulation = function () {

        var TotalCostAmount = 0;
        var totalCostAmount = 0;
        var totalVatAmount = 0;
        totalVatAmount = $scope.ItemCombination.VatAmount * 100;
        var temp = (totalVatAmount / $scope.ItemCombination.PurchaseUnitPrice).toFixed(2);
        $scope.ItemCombination.VatPercentage = Number(temp);

        if ($scope.ItemCombination.SdAmount == undefined || $scope.ItemCombination.SdAmount == null) {
            $scope.ItemCombination.SdAmount = 0;
        }

        TotalCostAmount = $scope.ItemCombination.SdAmount + $scope.ItemCombination.VatAmount + $scope.ItemCombination.PurchaseUnitPrice;
        totalCostAmount = (TotalCostAmount).toFixed(2);
        $scope.ItemCombination.TotalCost = Number(totalCostAmount);
    }

    function LocalPbCalculationMethod() {


        if ($scope.ItemCombination.VatAmount == null || $scope.ItemCombination.VatAmount == undefined) {
            $scope.ItemCombination.VatAmount = 0;
        }

        if ($scope.ItemCombination.SdAmount == undefined || $scope.ItemCombination.SdAmount == null) {
            $scope.ItemCombination.SdAmount = 0;
        }

        if ($scope.ItemCombination.SdPercentage == null || $scope.ItemCombination.SdPercentage == undefined) {
            $scope.ItemCombination.SdPercentage = 0;
        }

        if ($scope.ItemCombination.VatPercentage == undefined || $scope.ItemCombination.VatPercentage == null) {
            $scope.ItemCombination.VatPercentage = 0;
        }



        if ($scope.ItemCombination.TotalCost == undefined) {
            $scope.ItemCombination.TotalCost = 0;
        }


        if ($scope.convertNum == null || $scope.convertNum == undefined) {
            $scope.convertNum = 0;
        }



        if ($scope.ItemCombination.PBIncludePrice < $scope.ItemCombination.DiscountAmount) {
            $scope.ItemCombination.DiscountAmount = 0;
            alertify.log('Do not Sufficent In Dscount Discount Amount', 'error', '5000')
        }
        else {

            if ($scope.ItemCombination.DiscountPercentage == null || $scope.ItemCombination.DiscountPercentage == undefined || $scope.ItemCombination.DiscountPercentage != 0) {
                var discountAmount = 0;

                var discountAmount = 0;

                var convertDisamount = (discountAmount).toFixed(2);

                var dis = $scope.ItemCombination.DiscountPercentage
                if (dis < 100) {
                    $scope.ItemCombination.DiscountPercentage;
                }

                if (100 < dis) {
                    $scope.ItemCombination.DiscountPercentage = 0;
                    alertify.log('Do not Sufficent In Dscount Percentage', 'error', '5000')
                } else {

                    discountAmount = ($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty) * ($scope.ItemCombination.DiscountPercentage / 100);

                    $scope.ItemCombination.PurchaseUnitPrice = ($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty) - discountAmount;

                }

                var convertDisamount = (discountAmount).toFixed(2);
                $scope.ItemCombination.DiscountAmount = Number(convertDisamount);
            } else {
                if ($scope.ItemCombination.DiscountAmount == undefined || $scope.ItemCombination.DiscountAmount == null) {
                    $scope.ItemCombination.DiscountAmount = 0;
                }
                var tempDisCountAmount = ($scope.ItemCombination.DiscountAmount).toFixed(2);
                $scope.ItemCombination.DiscountAmount = Number(tempDisCountAmount);
            }


        }



        if ($scope.ItemCombination.DiscountPercentage == undefined) {

            var OverallDisPer = 0;
            OverallDisPer = ($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty) * (0 / 100);

            $scope.ItemCombination.PurchaseUnitPrice = ($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty) - OverallDisPer;
        } else {

            var OverallDisPer = 0;
            OverallDisPer = ($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty) * ($scope.ItemCombination.DiscountPercentage / 100);

            $scope.ItemCombination.PurchaseUnitPrice = $scope.ItemCombination.PurchaseUnitPrice;

        }




        var totalInclPrice = 0;
        totalInclPrice = ($scope.ItemCombination.PerUnitPrice * $scope.ItemCombination.AttributeQty).toFixed(2);
        $scope.ItemCombination.PBIncludePrice = Number(totalInclPrice);

        var TotaSdAmount = 0;
        var convartSDVal = 0;

        if ($scope.ItemCombination.PurchaseUnitPrice == undefined || $scope.ItemCombination.PurchaseUnitPrice == null) {
            $scope.ItemCombination.PurchaseUnitPrice = 0;
        }


        if ($scope.ItemCombination.SdPercentage == undefined || $scope.ItemCombination.SdPercentage == null) {
            TotaSdAmount = Number($scope.ItemCombination.PurchaseUnitPrice * 0);
            convartSDVal = (TotaSdAmount).toFixed(2);
            $scope.ItemCombination.SdAmount = Number(convartSDVal);
        }
        else {


            TotaSdAmount = Number($scope.ItemCombination.PurchaseUnitPrice * ($scope.ItemCombination.SdPercentage / 100));
            convartSDVal = (TotaSdAmount).toFixed(2);
            $scope.ItemCombination.SdAmount = Number(convartSDVal);

        }

        var TotaVatAmount = 0;
        var totalVatConvert = 0;

        if ($scope.ItemCombination.VatPercentage == undefined || $scope.ItemCombination.VatPercentage == null) {

            TotaVatAmount = Number($scope.ItemCombination.PurchaseUnitPrice * 0);
            totalVatConvert = (TotaVatAmount).toFixed(2);
            $scope.ItemCombination.VatAmount = Number(totalVatConvert);
        } else {
            TotaVatAmount = Number($scope.ItemCombination.PurchaseUnitPrice * ($scope.ItemCombination.VatPercentage / 100));
            totalVatConvert = (TotaVatAmount).toFixed(2);
            $scope.ItemCombination.VatAmount = Number(totalVatConvert);
        }

        var TotalCostAmount = 0;
        var totalCostAmount = 0;
        TotalCostAmount = $scope.ItemCombination.SdAmount + $scope.ItemCombination.VatAmount + $scope.ItemCombination.PurchaseUnitPrice;
        totalCostAmount = (TotalCostAmount).toFixed(2);
        $scope.ItemCombination.TotalCost = Number(totalCostAmount);



        var roll = $scope.ItemCombination.RollLenghtInMeterVal;
        var SqrMeter = $scope.ItemCombination.RollAreaInSqMeterVal;
        var kg = $scope.ItemCombination.PackageWeight;

        if (roll == undefined || roll == null) {
            roll = 0;
        }
        if (SqrMeter == undefined || SqrMeter == null) {
            SqrMeter = 0;
        }
        if (kg == undefined || kg == null) {
            kg = 0;
        }

        if ($scope.ItemCombination.RollLenghtInMeter == undefined || $scope.ItemCombination.RollLenghtInMeter == null) {
            $scope.ItemCombination.RollLenghtInMeter = 0;
        }

    }


    
    $scope.CalculateAditionalDiscount = function () {
        $scope.TotalEInClusiveCost = 0;

        angular.forEach($scope.inv_StockPBDetailAdAttributeLst, function (aData) {
            $scope.TotalEInClusiveCost += aData.TotalCost;
        });

        $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = $scope.TotalEInClusiveCost;

        if ($scope.inv_PurchaseBillLocal.AdditionDiscount == undefined || $scope.inv_PurchaseBillLocal.AdditionDiscount == null) {
            $scope.inv_PurchaseBillLocal.AdditionDiscount = 0;
        }
        $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount = $scope.inv_PurchaseBillLocal.TotalDisCountParenAmount - $scope.inv_PurchaseBillLocal.AdditionDiscount;


    }

    $scope.LocalPBCalCulation = function () {

        LocalPbCalculationMethod();
    }

    function GetPagedPB(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForPB").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForPB").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

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
            url: encodeURI('/PurchaseBill/LocalPagedPB?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.PurchaseBillList = data.ListData;
            console.log('IWO Groi List Edit', $scope.PurchaseBillList);
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
                alertify.log('Local Purchase Bill  Not Found', 'error', '5000');
            }



        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedPB($scope.currentPage);
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


    //$scope.OpenReportMusuk1 = function (pbId) {
    //    var pbId = pbId.PBId;
    //    if (pbId == true) {
    //        $window.open("#/Mushak6_1", "popup", "width=850,height=550,left=280,top=80");

    //        $cookieStore.put("PBId", pbId);
    //        event.stopPropagation();
    //    } else {
    //        $window.open("#/Mushak6_1", "popup", "width=850,height=550,left=280,top=80");

    //        $cookieStore.put("PBId", pbId);
    //        event.stopPropagation();
    //    }


    //};

    $scope.OpenReportMusuk1 = function (aPurchaseBill) {
        //var pbId = pbId.PBId;
        if (aPurchaseBill.MaterialTypeId == true) {
            $cookieStore.put("PBId", aPurchaseBill.LPBId);
            $window.open("#/Mushak6_1", "popup", "width=850,height=550,left=280,top=80");

            event.stopPropagation();
        } else {
            $cookieStore.put("PBId", aPurchaseBill.LPBId);
            $window.open("#/Mushak6_2", "popup", "width=850,height=550,left=280,top=80");


            event.stopPropagation();
        }

    }
    $scope.purcheaseBillReport = function (pbId) {
        var Id = pbId.LPBId;

        $window.open("#/LocalPurchaseReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("LPBId", Id);
        event.stopPropagation();
    }

    $scope.onSelectToSupplierAndLocalPb = function (LocalPurchaseBillList) {
        $cookieStore.put("LocalPB", LocalPurchaseBillList.SupplierId);
        $cookieStore.put("LocalLPBId", LocalPurchaseBillList.LPBId);
        $window.location.href = '/Home/Index#/SupplierPayment';
        console.log(LocalPurchaseBillList);
    }



    //$scope.purcheaseBillReport = function (pbId) {
    //    var pbId = pbId.PBId;
    //    $window.open("/ErpReports/RV_Inv_PurchaseBillByPBId.aspx?PBId=" + pbId, "_blank", "width=790,height=630,left=340,top=25");
    //}

    $scope.ItemAndItemAttrSqmLmAndRollKg = function (Combination) {


        $http({
            url: "/Item/GetByTopItem?itemId=" + Combination.ItemId,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.ad_Item = data[0];
            $scope.ddlHsCode = { HsCodeId: data[0].HsCodeId }

        });

        $('#itemSqmLmKgModal').modal('show');

        //if ($scope.inv_PurchaseBillLocal.CategoryId == 2) {
        //    $scope.IntemNameInfo = "Item";
        //} else {
        //    $scope.IntemNameInfo = "Materials";
        //}
        //$scope.ItemInfoList = [];
        //$scope.ItemInfoList.push(Combination);
        //$('#itemSqmLmKgModal').modal('show');
    }

    $scope.ModalClose = function () {
        $scope.ItemInfoList = [];
    }


    $scope.RedirectToItemEntry = function () {
        //  $window.location.href = '/Home/Index#/ItemEntry';
    }

});

