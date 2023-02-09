

app.controller("SalesOrderEntryController", function ($rootScope,$scope, $rootScope, $cookieStore, $http, $window, $filter, POFileService) {


    Clear();

    //#region function region
    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.FullName = $scope.LoginUser.FullName;

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Sales Order').ScreenId;
        GetUsersPermissionDetails();

        //Server side pagination
        $scope.ProductBtn = 'Add';
        $scope.CompanyBtn = 'Edit';
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;

        
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchSalesOrderAndCompanyName = '';
        $scope.SalesOrderType = '';
        $scope.ddlEmployee = "";

        $scope.TotalAmount = 0;
        $scope.TotalAmountBDT = 0;
        $scope.TotalOrderQty = 0;
        $scope.ConversionRate = 80;
        $scope.IsConversionRate = false;
        $scope.IsItemList = false;
        $scope.IsEditItemInfo = false;
        $scope.IsSelectItem = false;
        $scope.IsUpdateDetail = false;
        GetSalesOrderPaged($scope.currentPage);
        $scope.POReference = {};
        $scope.POReferencelist = [];
        $scope.ddlMu = { ItemUnitId: 2, UnitName: 'Roll(s)' };
        $scope.found = false;
        $scope.HsCodeList = [];
        $scope.MaterialTypeList = [];
        $scope.LabelBrandList = [];
        $rootScope.ItemSearchList = [];
        $rootScope.ItemSearchListForSO = [];
        $scope.ad_Item = {};
        $scope.VoidList = [];
        $scope.ItemAdditionalAttribute = {};
        $scope.pos_SalesOrderDetailAdAttributeLst = [];
        $scope.prictTypeList = [];
        $scope.Branchlist = [];
        $scope.pos_SalesOrderDetai = 0;
        $scope.salesOrder = {};
        $scope.SalesOrderTypeList = ["Local", "Export"];
        //$scope.CurrencyList = ["BDT", "USD"];
        $scope.CurrencyList = [];
        $rootScope.companyList = [];
        /*$scope.SelectedItem = {};*/
        $scope.salesOrder.SalesOrderType = "Export";
        $scope.salesOrder.CurrencyType = "USD";
        $scope.ddlCurrency = { CurrencyId: 2 };
        $scope.salesOrder.CurrencyId = 2;
        $scope.SalesOrderList = [];
        $scope.SalesOrderType = null;
        $scope.CurrencyType = null,
        $scope.ddlPreparedBy = null;
        $scope.ddlCompany = null;
        $scope.company = {};
        $scope.ddlCompanySearch = null;
        $scope.ddlPriceTypeBy = null;
        $scope.pos_SalesOrderDetail = {};
        $scope.salesOrder.SalesOrderId = 0;
        $scope.AddProductLbl = 'Add';
        $scope.BtnColor = 'customBtn custmoBtnReset';
        //$scope.BtnColor = 'customBtn custmoBtnSearch';

        $scope.AddOverHeadLbl = 'Add OverHead';
        $scope.btnSave = 'Save';
        $scope.OrderNoSearch = null;
        //GetUsersPermissionDetails();
        //ScreenLock();
        //GetAllItem();
        GetAllEmployee();
        GetActiveCompany();
        GetAllPriceType();
        GetAllVariety();
        GetAllItemUnit();
        GetAllBranch();
        GetHsCode();
        GetMaterialType();
        GetAllCurrency();

        $scope.ddlFactory = {};
        GetByCombinationand();
        $scope.AmendmentReasonList = [];
        $scope.exp_AmendmentRequest = {};
        GetAmendmentReason();
        GetAllStorewithDepartment();
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.UserData = JSON.parse(sessionStorage.UserDataSession);
        }
        

        $scope.salesOrder.PreparedById = $scope.UserData.EmployeeId;

        //mrf b: 5100
        //mrf f: 3000
        //c b: 5000
        //c f: 2800

        //mrf Redil b: 5200
        //mrf f: 2900
        //c Redil b: 4500
        //c f: 2800 

        //mrf:8100
        //c:7300



        //$scope.FromDate = $filter('date')(new Date().toJSON().slice(0, 10), 'yyyy-MM-dd');
        //$scope.ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'yyyy-MM-dd');


        $scope.salesOrder.SalesOrderDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetSalerOrderNo();
        $scope.pos_SalesOrderDetail.DueDate = "";
        $scope.pos_SalesOrderDetail.DueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

        $scope.CompanyBillingAddressList = [];
        $scope.CompanyDeliveryAddressList = [];
        $scope.IsEditCompany = true;
        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];

        $scope.EmailSendNotification = {};

        $scope.AppNotificationSetupList = [];
        GetAppNotificationSetupByReportCode();
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

    $("#itemNameSO").select2({
        placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
        //theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });


    function ReportNotificationDetail_Get() {
        $http({
            url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'SO',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.ReportNotificationDetailList = notification;
            console.log("SO Mail", $scope.ReportNotificationDetailList);
        });
    }
    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'SO',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(SalesOrder, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];
        //angular.forEach(SalesOrderList, function (aSO) {
            angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
                var obj = {}
                obj = aNotify
                obj.NotificaitonTitle = NotificaitonTitle
                if (aNotify.DepartmentId == 7) {
                    if (aNotify.SectionId == $scope.LoginUser.SectionId) {
                        obj.NotificationDetail = 'Sales Order No: ' + SalesOrder.SalesOrderNo + ' Company Name: ' + SalesOrder.CompanyName + ' Prepared By: ' + $scope.FullName
                        $scope.AppNotificationLogList.push(obj);
                    }
                } else {
                    obj.NotificationDetail = 'Sales Order No: ' + SalesOrder.SalesOrderNo + ' Company Name: ' + SalesOrder.CompanyName + ' Prepared By: ' + $scope.FullName
                    $scope.AppNotificationLogList.push(obj);
                }
                //}

            })
        //})


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
    //$scope.GetItemById = function (ItemId) {
    //    $http({
    //        url: '/Item/GetItemById?ItemId=' + ItemId,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        if (data.length) {
    //            $scope.SelectedItem = data[0];
    //        }
    //    })
    //}

    function GetCompanyBillingDeliveryAddress() {
        if ($scope.ddlCompany != null || $scope.ddlCompany != undefined) {

            $http({
                url: '/Company/GetCompanyBillDeliveryAddressByCompanyId?CompanyId=' + $scope.ddlCompany.CompanyId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (companyAddressList) {
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


    function ListClear() {
        $scope.ProductBtn = 'Add';
        $scope.AddProductLbl = 'Add';
        $scope.BtnColor = 'customBtn custmoBtnReset';
        //$scope.BtnColor = 'customBtn custmoBtnSearch';
        $scope.pos_SalesOrderDetail = {};
        $scope.ItemSearchCombination = null;
        $scope.IsEditItemInfo = false;
        $scope.IsUpdateDetail = false;
        $scope.IsSelectItem = false;
        //$scope.ddlMu = null;
        $scope.ddlMu = { ItemUnitId: 2, UnitName: 'Roll(s)' };
        $scope.ddlItemName = null;
        $('#itemNameSO').select2('destroy');
        $('#itemNameSO').val('').select2({
            placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
            templateResult: formatOutput,
            //theme: "classic",
            //dropdownAutoWidth: false
        });
        $('#MaterialType1').select2('destroy');
        $('#MaterialType1').val('').select2({
            placeholder: "--Material  Type--",
            theme: "classic",
        });
        $('#LabelBrand').select2('destroy');
        $('#LabelBrand').val('').select2({
            placeholder: "--Label Brand--",
            //theme: "classic",
        });
        $scope.pos_SalesOrderDetail.DueDate = "";
        $scope.HSCode = "";
        $scope.pos_SalesOrderDetail.DueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $('#SearchTextBox').focus();
        $scope.ddlHsCode = null;
        $scope.ad_Item = {};
    }
    function GetAllBranch() {
        $http({
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Branchlist = Enumerable.From(data).Where(function (x) {
                //return (x.BranchId == 2 || x.BranchId == 3);
                return (x.BranchId != 1);
            }).ToArray();

        });

    }

    $scope.SalesOrderDetailItemGetByCompanyId = function (CompanyId) {
        $http({
            url: '/SalesOrder/SalesOrderDetailItemGetByCompanyId?companyId=' + CompanyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $rootScope.ItemSearchListSOD = data;

            angular.forEach($rootScope.ItemSearchListSOD,
                function (aData) {
                    aData.TempItemName = aData.ItemName +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemDescriptionTwo +
                        " ~ " + "Unit Price:" +
                        aData.OrderPrice +
                        " ~ " + "Unit Per Package:" +
                        aData.UnitPerPackage +
                        " ~ " +
                        aData.HsCode +
                        " ~ " + "Size Code:" +
                        aData.ItemCode +
                        " ~ " + "Package Per Container:" +
                        aData.PackagePerContainer +
                        " ~ " + "Package Weight:" +
                        aData.PackageWeight +
                        " ~ " + "Container Weight:" +
                        aData.ContainerWeight +
                        " ~ " + "Item Id:" +
                        aData.ItemId;
                });
        })
    }
    $scope.GetCompanyWiseItemForSOByCompanyId = function (ItemId) {
        $http({
            url: '/Item/GetCompanyWiseItemForSO?ItemId=' + ItemId + '&CompanyId=' + $scope.ddlCompany.CompanyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyWiseItem = data;
            if ($scope.CompanyWiseItem.length > 0) {
                $scope.ddlItemName = $scope.CompanyWiseItem[0];
                $scope.ddlMaterialType = { MaterialTypeId: $scope.ddlItemName.MaterialTypeId };
            } else {
                $scope.ddlItemName = $scope.ddlItemNameAll;
            }
            loadItemDetails($scope.ddlItemName);
            if ($scope.ddlItemName.SubCategoryId == 3) {
                GetLabelBrand($scope.ddlItemName);
            } else {
                $('#LabelBrand').select2('destroy');
                $('#LabelBrand').val('').select2({
                    placeholder: "--Label Brand--",
                    //theme: "classic",
                });
                $scope.ddlLabelBrand = null;
                $scope.pos_SalesOrderDetail.LabelBrandId = 0;
                $scope.ad_Item.LabelBrandId = 0;
            }

            if ($scope.ddlItemName.SubCategoryId == 4) {
                $scope.ddlMu = { ItemUnitId: 2, UnitName: 'Roll(s)'}
            }
        })
    }
    function GetHsCode() {

        $http({
            url: "/ItemHsCode/Get",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.HsCodeList = data;
        })
    }
    function GetMaterialType() {

        $http({
            url: "/MaterialType/GetAllMaterialType",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.MaterialTypeList = data;
            angular.forEach($scope.MaterialTypeList, function (aData) {
                aData.MaterialType = aData.MaterialTypeName + ' ~ ' + aData.MaterialTypeCode;
            })

        })
    }
    function GetLabelBrand(aItem) {
        $scope.LabelBrandList = [];
        var searchCriteria = 'IsActive = 1'
        $http({
            url: "/LabelBrand/GetLabelBrandDynamic?searchCriteria=" + searchCriteria,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            //$scope.LabelBrandList = data;
            angular.forEach(data, function (aData) {
                if (aData.CompanyId == $scope.ddlCompany.CompanyId && aData.ItemId == aItem.ItemId) {
                    $scope.LabelBrandList.push(aData);
                }
            })

            $scope.ddlLabelBrand = { LabelBrandId: aItem.LabelBrandId };
            if ($scope.ad_Item.LabelBrandId != 0) {
                setTimeout(function () {
                    $("#LabelBrand").select2().val(aItem.LabelBrandId);
                }, 0);
            }

        })
    }
    $scope.GetLabelBrand = function () {
        GetLabelBrand();
    }
    function GetAllCurrency() {

        $http({
            url: "/SalesOrder/GetAllCurrency",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.CurrencyList = data;
        })
    }

    $("#txtFromDateForSO").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForSO = function () {
        $("#txtFromDateForSO").focus();
        //$("#txtFromDateForSO").trigger("click");
    }


    $("#txtToDateForSO").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChangeForSO = function () {
        $("#txtToDateForSO").focus();
        //$("#txtToDateForSO").trigger("click");
    }




    $("#txtDueDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.CalendartxtDueDate = function () {
        $("#txtDueDate").focus();
        //$("#txtDueDate").trigger("click");
    }


    $("#txtInvoiceDueDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    //$("#txtInvoiceDueDate").datepicker({
    //    changeMonth: true,
    //    changeYear: true,
    //    showButtonPanel: true,
    //    dateFormat: 'MM yy',

    //    onClose: function () {
    //        var iMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
    //        var iYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
    //        $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
    //    },

    //    beforeShow: function () {
    //        if ((selDate = $(this).val()).length > 0) {
    //            iYear = selDate.substring(selDate.length - 4, selDate.length);
    //            iMonth = jQuery.inArray(selDate.substring(0, selDate.length - 5),
    //                $(this).datepicker('option', 'monthNames'));
    //            $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, 1));
    //            $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
    //        }
    //    }
    //});


    $scope.CalendartxtInvoiceDueDate = function () {
        $("#txtInvoiceDueDate").focus();
        //$("#txtInvoiceDueDate").trigger("click");
    }

    $("#txtSalesOrderDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.CalendartxtSalesOrderDate = function () {
        $("#txtSalesOrderDate").focus();
        //$("#txtSalesOrderDate").trigger("click");
    }


    $("#txtPoDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.CalendartxttxtPoDate = function () {
        $("#txtPoDate").focus();
        //$("#txtPoDate").trigger("click");
    }

    $("#txtPO_Date").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.CalendartxtPO_Date = function () {
        $("#txtPO_Date").focus();
        //$("#txtPO_Date").trigger("click");
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
    
    $scope.getMaxSalesOrderByDate = function () {
        GetSalerOrderNo();
    }
    function GetSalerOrderNo() {
        if ($scope.salesOrder.SalesOrderId == 0) {
            if ($scope.salesOrder.SalesOrderDate != "") {
                var dateParts = ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
                $http({
                    url: '/SalesOrder/GetSalesOrderNo',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.MaxSalesOrderNo = data;
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
                        $scope.salesOrder.SalesOrderNo = 'SO/' + $scope.finYearHeadOffice + '/' + $scope.MaxSalesOrderNo;
                    });

                });

            } else {
                $("#txtSalesOrderDate").focus();
            }
        }
        else {
            var currentDate = $scope.salesOrder.CurrentSalesOrderDate.split("/");
            var currentFiscalYrRange = Number(currentDate[1]) > 6 ? (currentDate[2] + '-' + (Number(currentDate[2]) + 1)) : ((currentDate[2] - 1) + '-' + currentDate[2]);

            var changedDate = $("#txtSalesOrderDate").val().split("/");
            var changedFiscalYrRange = Number(changedDate[1]) > 6 ? (changedDate[2] + '-' + (Number(changedDate[2]) + 1)) : ((changedDate[2] - 1) + '-' + changedDate[2]);

            if (currentFiscalYrRange != changedFiscalYrRange) {
                alertify.log('Cannot change Fiscal Year from ' + currentFiscalYrRange + ' to ' + changedFiscalYrRange, 'error', '5000');
                $("#txtSalesOrderDate").val($scope.salesOrder.CurrentSalesOrderDate);
            }
        }
    }

    function GetAllPriceType() {
        $http({
            url: '/PriceType/GetAllPriceType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.prictTypeList = data;

            angular.forEach($scope.prictTypeList,
                function (aActivePriceType) {
                    if (aActivePriceType.IsDefault == true) {
                        $scope.salesOrder.PriceTypeId = aActivePriceType.PriceTypeId;
                        $scope.ddlPriceTypeBy = { PriceTypeId: aActivePriceType.PriceTypeId }
                    }
                });
        });
    }

    function GetActiveCompany() {
        if ($scope.LoginUser.DepartmentName != null) {
            if ($scope.LoginUser.DepartmentName.match("Sales")) {
                var criteria = "C.IsActive=1 and E.SectionId=" + $scope.LoginUser.SectionId + " OR C.CompanyTypeId=16";
            } else {
                var criteria = "C.IsActive=1";
            }
        }
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (companyList) {
            $rootScope.companyList = companyList;

            //if ($scope.LoginUser.DepartmentName.match("Sales")) {
            //    angular.forEach(companyList, function (aData) {
            //        if (aData.SectionId == $scope.LoginUser.SectionId) {
            //            $rootScope.companyList.push(aData);
            //        }
            //    })
            //} else {
            //    $rootScope.companyList = companyList;
            //}

        })
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
            $scope.ItemUnitlistM = angular.copy(data);
        });
    }

    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.ListViewPermission = false;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            var LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var searchCriteria = 'P.RoleId=' + LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
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

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;

            setTimeout(function () {

                $("#ddlPreparedBySO").select2({
                    theme: "classic",
                }).val($scope.UserData.EmployeeId).trigger("change");

            }, 0);

            $scope.salesOrder.PreparedById = $scope.UserData.EmployeeId;
            
        });
    }



    //Report Button
    //$scope.OpenReport = function (salesOrderNo) {
    //    $window.open("/ErpReports/RV_Pos_SalesOrderBySalesOrderId.aspx?SalesOrderId=" + salesOrderNo, "_blank", "width=790,height=630,left=340,top=25");
    //    event.stopPropagation();
    //}
    function OpenReport(SOId) {
        $window.open("#/SalesOrderReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SalesOrderId", JSON.stringify(SOId));
        $cookieStore.put("SalesOrderId", SOId);
        event.stopPropagation();
    }
    $scope.OpenReport = function (SOId) {
        OpenReport(SOId);
    };


    function GetByCombinationand() {
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllCombinationlist = JSON.parse(data);
        })
    }

    function GetUnitNameById(id) {
        var UnitName = '';
        angular.forEach($scope.ItemUnitlist, function (aUnit) {
            if (aUnit.ItemUnitId == id) { UnitName = aUnit.UnitName; }
        });
        return UnitName;
    }


    $scope.GetEmployeeByCompany = function (Company) {
        if (Company != undefined) {
            $scope.ddlCompany = Company;
        }

        if ($scope.ddlCompany == undefined) {
            return;
        }
        var refEmpId = $scope.ddlCompany.RefEmployeeId;
        var refEmployee = Enumerable.From($scope.employeeList).Where('$.EmployeeId==' + refEmpId).FirstOrDefault();
        $scope.ddlPreparedBy = refEmployee;

            setTimeout(function () {
                //$('#ddlPreparedBySO').select2('destroy');
                $("#ddlPreparedBySO").select2({
                    theme: "classic",
                }).val(refEmployee.EmployeeId);

            }, 0); 

        $scope.salesOrder.PreparedById = refEmployee.EmployeeId;
    }
    $scope.GetCompanyAddress = function (Company) {

        $scope.IsEditCompany = false;
        if (Company != undefined) {
            $scope.ddlCompany = Company;
        }
        GetCompanyBillingDeliveryAddress();
        //if (!angular.isUndefined($scope.ddlCompany) && $scope.ddlCompany != null) {
        //$scope.salesOrder.CompanyNameBilling = $scope.ddlCompany.CompanyName;
        //$('#CompanyNameBilling').val($scope.salesOrder.CompanyNameBilling);
        //$scope.salesOrder.BillingAddress = $scope.ddlCompany.AddressBilling;
        // $('#BillingAddress').val($scope.salesOrder.BillingAddress);
        //$http({
        //    url: '/Company/GetCompanyAddressByCompanyId',
        //    method: "GET",
        //    params: { companyId: $scope.ddlCompany.CompanyId },
        //    headers: { 'Content-Type': 'application/json' }
        //}).success(function (data) {
        //    angular.forEach(data, function (aData) {
        //        if (aData.IsDefault && aData.AddressType === 'Billing') {
        //            $scope.salesOrder.BillingAddress = aData.Address;
        //            $('#BillingAddress').val(aData.Address);
        //        }
        //    });
        //});

        //}
        //else {
        //    $scope.salesOrder.CompanyNameBilling = null;
        //    $scope.salesOrder.BillingAddress = null;
        //}




    }





    $scope.SaveSalesOrder = function () {
        angular.forEach($scope.pos_SalesOrderDetailAdAttributeLst, function (aSO) {
            if (isNaN(parseFloat(aSO.OrderPrice)) || !isFinite(aSO.OrderPrice)) {
                alertify.log('Enter correct price for ' + aSO.Combination, 'error', '5000');
                return;
            }
        })

        $scope.salesOrder.CompanyId = $scope.ddlCompany.CompanyId;
        $scope.salesOrder.CompanyName = $scope.ddlCompany.CompanyName;
        $scope.salesOrder.PriceTypeId = $scope.ddlPriceTypeBy.PriceTypeId;
        $scope.salesOrder.PreparedById = $scope.ddlPreparedBy.EmployeeId;
        $scope.salesOrder.PreparedByName = $scope.ddlPreparedBy.FullName;
        $scope.salesOrder.RefEmployeeId = $scope.ddlPreparedBy.EmployeeId;
        $scope.salesOrder.ConversionRate = $scope.ConversionRate;
        $scope.salesOrder.CurrencyId = $scope.ddlCurrency.CurrencyId;

        if ($scope.salesOrder.SalesOrderId == 0 && $scope.CreatePermission) {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    SaveOrder('Saved');
                }
            })
        }
        else if ($scope.salesOrder.SalesOrderId == 0 && !$scope.CreatePermission) {
            alertify.log('You do not have permission to save!', 'error', '5000');
        }
        else if ($scope.salesOrder.SalesOrderId > 0 && $scope.RevisePermission) {
            alertify.confirm("Are you sure to update?", function (e) {
                if (e) {
                    SaveOrder('Revised');
                }
            })
        }
        else if ($scope.salesOrder.SalesOrderId > 0 && !$scope.RevisePermission) {
            alertify.log('You do not have permission to Update!', 'error', '5000');
        }


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



            $scope.AllCombinationSearch = Enumerable.From($scope.AllCombinationlist).Where(SearchCriteria).Take(10).ToArray();

            $scope.VisibilityOfSuggession = true;
        }
        else {
            $scope.AllCombinationSearch = Enumerable.From($scope.AllCombinationlist).Take(10).ToArray();
            $scope.VisibilityOfSuggession = false;
        }
    }

    //$scope.LoadACombination = function (aCombination) {
    //    $scope.pos_SalesOrderDetail = aCombination;
    //    $scope.pos_SalesOrderDetail.DueDate = "";
    //    $scope.pos_SalesOrderDetail.DueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
    //    //$scope.pos_SalesOrderDetail.DueDate = $scope.pos_SalesOrderDetail.DueDate.split("/").reverse().join("-");

    //    // var Due = ($scope.pos_SalesOrderDetail.DueDate.split("-").reverse().join("/")).toString(); 


    //    $scope.VisibilityOfSuggession = false;
    //    $scope.ItemSearchCombination = $scope.pos_SalesOrderDetail.Combination;
    //    $scope.pos_SalesOrderDetail.ItemDescription = $scope.pos_SalesOrderDetail.NameAndDesc;

    //    $scope.AllCombinationSearch = [];
    //    //$scope.ddlMu = { ItemUnitId: $scope.pos_SalesOrderDetail.DefaultSaleMeasurementId }
    //    $scope.ddlMu = { ItemUnitId: 2 }
    //    $scope.pos_SalesOrderDetail.CurrentQuantity = $scope.pos_SalesOrderDetail.StockQty;
    //    $('#txtOrderQty').focus();
    //}



    $scope.setCurrency = function (Currency) {
        if (Currency == "Local") {
            $scope.salesOrder.CurrencyType = "BDT";
            $scope.ddlCurrency = { CurrencyId: 1 };
            $scope.salesOrder.CurrencyId = 1;
            $scope.ConversionRate = 1;
            $scope.IsConversionRate = true;
        }
        if (Currency == "Export") {
            $scope.salesOrder.CurrencyType = "USD";
            $scope.ddlCurrency = { CurrencyId: 2 };
            $scope.salesOrder.CurrencyId = 2;
            $scope.ConversionRate = 80;
            $scope.IsConversionRate = false;
        }
    }
    $scope.setConversionRate = function (CurrencyId) {
        if (CurrencyId == 1) {
            $scope.ConversionRate = 1;
            $scope.IsConversionRate = true;
        }
        if (CurrencyId == 2) {
            $scope.ConversionRate = 80;
            $scope.IsConversionRate = false;
        }
    }





    $scope.foundChange = function () {
        $scope.found = true;
    };

    $scope.resetForm = function () {
        $scope.Mood = "";
        Clear();
        //$scope.salesOrderForm.$setPristine();
        //$scope.salesOrderForm.$setUntouched();
        $scope.ItemSearchCombination = '';
        //$("#txtSalesOrderDate").focus();
    }



    $scope.SearchSalesOrder = function () {
        var fromDate = $("#txtFromDateForSO").val();
        var toDate = $("#txtToDateForSO").val();
        var companyId;
        fromDate = fromDate.split("/");
        fromDate = fromDate[1] + "-" + fromDate[2] + "-" + fromDate[0];
        toDate = toDate.split("/");
        toDate = toDate[1] + "-" + toDate[2] + "-" + toDate[0];

        if ($scope.ddlCompanySearch !== undefined && $scope.ddlCompanySearch != null) {
            companyId = $scope.ddlCompanySearch.CompanyId;
        }
        $http({
            url: '/SalesOrder/GetSalesOrderForEdit?fromDate=' + fromDate + '&toDate=' + toDate + '&companyId=' + companyId,
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
            else
                alertify.log('No Sales Order Found', 'error', '5000');

            $scope.SalesOrderList = data;

        });
    }

    $scope.priceOrAmountChange = function (fromPriceChange) {
        if (fromPriceChange) {
            if (angular.isUndefined($scope.pos_SalesOrderDetail.OrderPrice) || $scope.pos_SalesOrderDetail.OrderPrice == null) {
                if ($("#txtPrice").val() === "" && event.data === ".")
                    return;
                else
                    $scope.pos_SalesOrderDetail.OrderPrice = 0;
                $scope.pos_SalesOrderDetail.Amount = 0;
            }
            else
                $scope.pos_SalesOrderDetai = 0;
            $scope.pos_SalesOrderDetail.Amount = 0;
            $scope.pos_SalesOrderDetai = ($scope.pos_SalesOrderDetail.OrderPrice) * ($scope.pos_SalesOrderDetail.OrderQty);
            $scope.pos_SalesOrderDetail.Amount = parseFloat($scope.pos_SalesOrderDetai.toFixed(6));

            $scope.pos_SalesOrderDetail.VatPercentage = 0;
            $scope.pos_SalesOrderDetail.VatAmount = 0;

        }
    }
    $scope.priceOrAmountChangeForQty = function () {
        if (angular.isUndefined($scope.pos_SalesOrderDetail.OrderPrice) || $scope.pos_SalesOrderDetail.OrderPrice == null) {
            if ($("#txtPrice").val() === "" && event.data === ".")
                return;

            $scope.pos_SalesOrderDetail.Amount = 0;
        } else
            $scope.pos_SalesOrderDetai = 0;
        $scope.pos_SalesOrderDetail.Amount = 0;
        $scope.pos_SalesOrderDetai = ($scope.pos_SalesOrderDetail.OrderPrice) * ($scope.pos_SalesOrderDetail.OrderQty);
        $scope.pos_SalesOrderDetail.Amount = parseFloat($scope.pos_SalesOrderDetai.toFixed(6));

        $scope.pos_SalesOrderDetail.VatPercentage = 0;
        $scope.pos_SalesOrderDetail.VatAmount = 0;

    }
    $scope.priceChangeForAmount = function () {
        $scope.OrderPrice = $scope.pos_SalesOrderDetail.Amount / $scope.pos_SalesOrderDetail.OrderQty;
        $scope.pos_SalesOrderDetail.OrderPrice = parseFloat($scope.OrderPrice.toFixed(6));

    }
    $scope.VatAmountCalculetion = function () {
        $scope.pos_SalesOrderDetail.Amount = 0;
        $scope.pos_SalesOrderDetai = ($scope.pos_SalesOrderDetail.OrderPrice) * ($scope.pos_SalesOrderDetail.OrderQty);
        $scope.pos_SalesOrderDetail.VatAmount = parseFloat((($scope.pos_SalesOrderDetai * $scope.pos_SalesOrderDetail.VatPercentage) / 100).toFixed(6));
        if (isNaN($scope.pos_SalesOrderDetail.VatAmount) || $scope.pos_SalesOrderDetail.VatAmount == undefined || $scope.pos_SalesOrderDetail.VatAmount == null || $scope.pos_SalesOrderDetail.VatAmount == '') {
            $scope.pos_SalesOrderDetail.VatAmount = 0;
        }
        $scope.pos_SalesOrderDetail.Amount = parseFloat($scope.pos_SalesOrderDetai.toFixed(6)) + parseFloat($scope.pos_SalesOrderDetail.VatAmount.toFixed(6));

    }

    $scope.CPTChecked = function (IsSelected) {
        if (!IsSelected) {
            if ($scope.salesOrder.CPTCost != null && $scope.TotalAmount != 0) {
                $scope.TotalAmount = $scope.TotalAmount - $scope.salesOrder.CPTCost;
                $scope.CPTCostBDT = $scope.ConversionRate * $scope.salesOrder.CPTCost;
                $scope.TotalAmountBDT = $scope.TotalAmountBDT - $scope.CPTCostBDT;

                $scope.CPTCostBDT = 0;
            }
            $scope.salesOrder.CPTCost = null;
            $scope.CPTCostBDT = 0;
        }
    }



    $scope.CloseItemModal = function () {
        setTimeout(function () {
            if (angular.isUndefined($scope.ItemSearchCombination) || $scope.ItemSearchCombination == null)
                $('#SearchTextBox').focus();
            else
                $('#txtOrderQty').focus();
        }, 1000);
    };
    $scope.GetAllItem = function () {
        GetAllItem();
    }

    //function formatOutput(optionElement) {
    //    if (!optionElement.id) { return optionElement.text; }
    //    var $state = $(
    //        '<span><strong>' + optionElement.element.value + '</strong> ' + optionElement.text + '</span>'
    //    );
    //    return $state;
    //};

    function GetAllItem() {
        $rootScope.ItemSearchListForSO = [];
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                if (aData.CategoryId != 4 && aData.CategoryId != 6) {
                    aData.TempItemName = aData.ItemName
                        +
                        " ~ " +
                        aData.ItemDescription +
                        //" ~ " +
                        //aData.ItemDescriptionTwo
                        //+
                        " ~ " + "Size Code: " +
                        aData.ItemCode +
                        " ~ " + "Sub Category: " +
                        aData.SubCategoryName;
                    $rootScope.ItemSearchListForSO.push(aData)
                }
            })

        });
    };


    function loadItemDetails(aItem) {
        if (aItem != undefined && aItem != null) {
            $scope.pos_SalesOrderDetail.ItemDescription = aItem.ItemDescription;


            $scope.pos_SalesOrderDetail.ItemAddAttId = aItem.ItemId;
            $scope.aItem = aItem;
            $scope.ad_Item = aItem;
            $scope.ddlHsCode = { HsCodeId: $scope.ad_Item.HsCodeId };
            $scope.IsSelectItem = true;

            $scope.ddlMaterialType = { MaterialTypeId: $scope.ad_Item.MaterialTypeId };
            if ($scope.ad_Item.MaterialTypeId != 0) {
                setTimeout(function () {
                    $("#MaterialType1").select2().val($scope.ad_Item.MaterialTypeId).trigger("change");
                }, 0);
            }


            //$scope.ddlLabelBrand = { LabelBrandId: $scope.ad_Item.LabelBrandId };
            //if ($scope.ad_Item.LabelBrandId != 0) {
            //    setTimeout(function () {
            //        $("#LabelBrand").select2().val($scope.ad_Item.LabelBrandId).trigger("change");
            //    }, 0);
            //}
            
            $scope.HSCode = aItem.HsCode;

            $scope.SelectedItem = Enumerable.From($rootScope.ItemSearchListForSO).Where('$.ItemId==' + $scope.pos_SalesOrderDetail.ItemAddAttId).FirstOrDefault();
            if ($scope.SelectedItem != undefined) {
                //$scope.ddlMu = { ItemUnitId: $scope.SelectedItem.UnitId };
                //$scope.ddlMu = { ItemUnitId: aItem.UnitId };
                $scope.ddlMu = { ItemUnitId: 2, UnitName: 'Roll(s)' };
                //$scope.pos_SalesOrderDetail.ItemDescription = $scope.SelectedItem.ItemName + " " + $scope.SelectedItem.ItemDescription;
            }

            $scope.pos_SalesOrderDetail.OrderPrice = aItem.OrderPrice;

            //$http({
            //    url: "/ItemAdditionalAttribute/GetItemAdditionalAttributeByItemId?ItemId=" + $scope.ad_Item.ItemId,
            //    method: "GET",
            //    headers: { 'Content-Type': "application/json" }
            //}).success(function (data) {

            //    $scope.ItemAdditionalAttribute = data[0];

            //})
        }

    }
    $scope.loadItemDetails = function (aItem) {
        if (aItem != null) {
            $('#itemNameSO').select2('destroy');
            $('#itemNameSO').val(aItem.ItemId).select2({
                placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
                templateResult: formatOutput,
                //theme: "classic",
                //dropdownAutoWidth: false
            });
            //loadItemDetails(aItem);
        } else {
            $('#itemNameSO').select2('destroy');
            $('#itemNameSO').val('').select2({
                placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
                templateResult: formatOutput,
                //theme: "classic",
                //dropdownAutoWidth: false
            });
            $scope.pos_SalesOrderDetail.OrderPrice = null;
            return;
        }
    }

    function GetAllStorewithDepartment() {

        $http({
            url: '/StockValuation/GetAll_CurrentStock',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.sockQtyWithRequestQtyList = [];
            $scope.sockQtyWithRequestQtyList = data;
            $scope.sockQtyWithRequestQty = Enumerable.From($scope.sockQtyWithRequestQtyList).ToArray();
        });
    }
    $scope.RemoveItemAttr = function (aDetail) {
        var index = $scope.pos_SalesOrderDetailAdAttributeLst.indexOf(aDetail);
        $scope.TotalOrderQty -= aDetail.OrderQty;
        $scope.TotalAmount -= parseFloat(aDetail.Amount);
        $scope.TotalAmountBDT -= parseFloat(aDetail.AmountBDT);
        $scope.pos_SalesOrderDetailAdAttributeLst.splice(index, 1);
        if ($scope.pos_SalesOrderDetailAdAttributeLst.length > 0) {
            $scope.IsItemList = true;
        } else {
            $scope.IsItemList = false;
            $scope.TotalAmount = 0;
            $scope.TotalAmountBDT = 0;

        }
        if (aDetail.SalesOrderDetailId != undefined) {
            $scope.VoidList.push(aDetail);
        }
        
    }
    $scope.AddSalesOrderDetail = function (AddProductLbl) {
        if (AddProductLbl == 'Add') {
            if ($scope.ad_Item.CategoryId != 2) {
                if ($scope.ad_Item.MaterialTypeId == null || $scope.ad_Item.MaterialTypeId == undefined || $scope.ad_Item.MaterialTypeId == 0) {
                    alertify.log('Please Select Material Type!!!', 'error', '5000');
                    return;
                }
            }
            if ($scope.ad_Item.SubCategoryId == 3) {
                if ($scope.ad_Item.LabelBrandId == null || $scope.ad_Item.LabelBrandId == undefined || $scope.ad_Item.LabelBrandId == 0) {
                    alertify.log('Please Select Label Brand!!!', 'error', '5000');
                    return;
                }
            }

            $scope.pos_SalesOrderDetail.ItemAddAttId = $scope.ddlItemNameAll.ItemId;

            $scope.stockList = [];
            angular.forEach($scope.sockQtyWithRequestQty, function (aData) {

                if ($scope.ddlItemNameAll.CategoryId == 2) {
                    if ($scope.aItem.ItemId == aData.ItemId) {
                        var stockItem = {};
                        stockItem.CurrentQuantity = aData.CurrentQuantity;
                        stockItem.DepartmentName = aData.DepartmentName;
                        $scope.stockList.push(stockItem);
                    }
                } else {
                    if ($scope.aItem.ItemId == aData.ItemId && $scope.ddlMaterialType.MaterialTypeId == aData.MaterialTypeId) {
                        var stockItem = {};
                        stockItem.CurrentQuantity = aData.CurrentQuantity;
                        stockItem.DepartmentName = aData.DepartmentName;
                        $scope.stockList.push(stockItem);
                    }
                }


            });
            var Attribute = Object.assign({}, $scope.ad_Item, $scope.pos_SalesOrderDetail);
            Attribute.stockList = $scope.stockList;
            Attribute.OrderUnitId = $scope.ddlMu.ItemUnitId;
            Attribute.UnitName = $scope.ddlMu.UnitName;

            $scope.ad_Item = {};
            $scope.ddlHsCode = null;

            $scope.Amount = Attribute.Amount;
            $scope.TotalAmount += Number($scope.Amount);
            $scope.TotalOrderQty += Attribute.OrderQty;

            Attribute.OrderPriceBDT = Attribute.OrderPrice * $scope.ConversionRate;
            Attribute.AmountBDT = Number($scope.Amount) * $scope.ConversionRate;
            $scope.TotalAmountBDT += Attribute.AmountBDT;


            if ($scope.pos_SalesOrderDetail.BuyerName == null) {
                Attribute.BuyerName = "";
            }
            else {
                Attribute.BuyerName = $scope.pos_SalesOrderDetail.BuyerName;
            }

            if ($scope.SN == undefined || $scope.SN == null) {
                $scope.pos_SalesOrderDetailAdAttributeLst.push(Attribute);
            } else {
                $scope.pos_SalesOrderDetailAdAttributeLst.splice($scope.SN - 1, 0, Attribute);
                $scope.SN = null;
            }

            if ($scope.pos_SalesOrderDetailAdAttributeLst.length > 0) {
                $scope.IsItemList = true;
            } else {
                $scope.IsItemList = false;
            }

            if ($scope.pos_SalesOrderDetailAdAttributeLst.length == 1) {

                if ($scope.salesOrder.CPTCost) {
                    $scope.TotalAmount = $scope.TotalAmount + $scope.salesOrder.CPTCost;
                    $scope.CPTCostBDT = $scope.ConversionRate * $scope.salesOrder.CPTCost;
                    $scope.TotalAmountBDT = $scope.TotalAmountBDT + $scope.CPTCostBDT;
                }

            }

            $scope.pos_SalesOrderDetail = {};
            $scope.ItemSearchCombination = null;
            $scope.IsSelectItem = false;

            $('#itemNameSO').select2('destroy');
            $('#itemNameSO').val('').select2({
                placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
                templateResult: formatOutput,
                theme: "classic",
                dropdownAutoWidth: false
            });
            $('#MaterialType1').select2('destroy');
            $('#MaterialType1').val('').select2({
                placeholder: "--Material  Type--",
                theme: "classic",
            });
            $('#LabelBrand').select2('destroy');
            $('#LabelBrand').val('').select2({
                placeholder: "--Label Brand--",
                //theme: "classic",
            });
            $scope.ddlMu = { ItemUnitId: 2, UnitName: 'Roll(s)'};
            $scope.ddlItemName = null;
            $scope.pos_SalesOrderDetail.DueDate = "";
            $scope.pos_SalesOrderDetail.DueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
            $('#SearchTextBox').focus();

        } else {
            $scope.stockList = [];
            angular.forEach($scope.sockQtyWithRequestQty, function (aData) {

                if ($scope.pos_SalesOrderDetail.CategoryId == 2) {
                    if ($scope.pos_SalesOrderDetail.ItemId == aData.ItemId) {
                        var stockItem = {};
                        stockItem.CurrentQuantity = aData.CurrentQuantity;
                        stockItem.DepartmentName = aData.DepartmentName;
                        $scope.stockList.push(stockItem);
                    }
                } else {
                    if ($scope.pos_SalesOrderDetail.ItemId == aData.ItemId && $scope.ddlMaterialType.MaterialTypeId == aData.MaterialTypeId) {
                        var stockItem = {};
                        stockItem.CurrentQuantity = aData.CurrentQuantity;
                        stockItem.DepartmentName = aData.DepartmentName;
                        $scope.stockList.push(stockItem);
                    }
                }


            });
            $scope.pos_SalesOrderDetail.stockList = $scope.stockList;
            if ($scope.ddlItemNameAll != undefined) {
                $scope.pos_SalesOrderDetail.ItemId = $scope.ddlItemNameAll.ItemId;
                $scope.pos_SalesOrderDetail.ItemAddAttId = $scope.ddlItemNameAll.ItemId;
            }
            //$scope.pos_SalesOrderDetail.ItemId = $scope.pos_SalesOrderDetail.ItemId;
            //$scope.pos_SalesOrderDetail.ItemAddAttId = $scope.pos_SalesOrderDetail.ItemId;
            if ($scope.ddlLabelBrand != undefined) {
                $scope.pos_SalesOrderDetail.LabelBrandId = $scope.ddlLabelBrand.LabelBrandId;
            } else {
                $scope.pos_SalesOrderDetail.LabelBrandId = 0;
            }
            
            $scope.pos_SalesOrderDetail.ItemName = $scope.ad_Item.ItemName;
            $scope.pos_SalesOrderDetail.ItemDescription = $scope.ad_Item.ItemDescription;
            $scope.pos_SalesOrderDetail.ItemDescriptionTwo = $scope.ad_Item.ItemDescriptionTwo;

            $scope.AmountCalculation();
            ListClear();
        }

    }

    $scope.SelAdditionalInfo = function (AdditionalInfo) {
        $scope.AddProductLbl = 'Update';
        //$scope.BtnColor = 'customBtn custmoBtnReset';
        $scope.BtnColor = 'customBtn custmoBtnSearch';
        $scope.ad_Item = AdditionalInfo;
        $scope.pos_SalesOrderDetail = AdditionalInfo;
        
        $scope.ddlMu = { ItemUnitId: AdditionalInfo.OrderUnitId };

        //$('#itemNameSO').select2('destroy');
        //$('#itemNameSO').val($scope.ad_Item.ItemId).select2();
        //$scope.ddlItemNameAll = { ItemId: $scope.ad_Item.ItemId};
        $('#itemNameSO').select2('destroy');
        $('#itemNameSO').val($scope.ad_Item.ItemId).select2({
            placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
            templateResult: formatOutput,
            theme: "classic",
            dropdownAutoWidth: false
        });
        $scope.ddlItemNameAll = AdditionalInfo;
        $scope.ddlHsCode = { HsCodeId: $scope.ad_Item.HsCodeId };

        $scope.ddlMaterialType = { MaterialTypeId: $scope.ad_Item.MaterialTypeId };
        setTimeout(function () {
            $("#MaterialType1").select2().val($scope.ad_Item.MaterialTypeId).trigger("change");
        }, 0);

        if (AdditionalInfo.SubCategoryId == 3) {
            GetLabelBrand($scope.ad_Item);
        } else {
            $('#LabelBrand').select2('destroy');
            $('#LabelBrand').val('').select2({
                placeholder: "--Label Brand--",
                //theme: "classic",
            });
            $scope.ddlLabelBrand = null;
            $scope.pos_SalesOrderDetail.LabelBrandId = 0;
            $scope.ad_Item.LabelBrandId = 0;
        }
        
        //$scope.ddlLabelBrand = { LabelBrandId: $scope.ad_Item.LabelBrandId };
        //setTimeout(function () {
        //    $("#LabelBrand").select2().val($scope.ad_Item.LabelBrandId).trigger("change");
        //}, 0);

        $scope.IsEditItemInfo = true;
        $scope.IsUpdateDetail = true;
        $scope.IsSelectItem = true;
    }
    $scope.AmountCalculation = function () {
        $scope.Amount = 0;
        $scope.TotalAmount = 0;
        $scope.TotalAmountBDT = 0;
        $scope.CPTCostBDT = 0;
        $scope.TotalOrderQty = 0;

        angular.forEach($scope.pos_SalesOrderDetailAdAttributeLst, function (aData) {
            $scope.Amount = aData.Amount;
            $scope.TotalAmount += Number($scope.Amount);
            $scope.TotalOrderQty += aData.OrderQty;

            aData.OrderPriceBDT = aData.OrderPrice * $scope.ConversionRate;
            aData.AmountBDT = Number($scope.Amount) * $scope.ConversionRate;
            $scope.TotalAmountBDT += aData.AmountBDT;

            if ($scope.salesOrder.CPTCost) {
                $scope.TotalAmount = $scope.TotalAmount + $scope.salesOrder.CPTCost;
                $scope.CPTCostBDT = $scope.ConversionRate * $scope.salesOrder.CPTCost;
                $scope.TotalAmountBDT = $scope.TotalAmountBDT + $scope.CPTCostBDT;
            }
        })
    }

    //$('#txtFromDateForSO').val('');
    //$('#txtToDateForSO').val('');
    //$('#textSalesOrderNoAndCompany').val('');
    //$scope.FromDate = "";
    //$scope.ToDate = "";
    //$scope.SearchSalesOrderAndCompanyName = '';
    //$scope.SalesOrderType = '';

    $scope.reloadBtn = function () {
        $('#txtFromDateForSO').val('');
        $('#txtToDateForSO').val('');
        $('#textSalesOrderNoAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchSalesOrderAndCompanyName = '';
        $scope.SalesOrderType = '';
        $scope.ddlEmployee = '';
        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').val('').select2({
            placeholder: "Search for: Prepared By",
            //theme: "classic",
            //dropdownAutoWidth: false
        });

        GetSalesOrderPaged(1);
    }

    $scope.SalesOrderSearch = function () {
        GetSalesOrderPaged(1);

    }

    function GetSalesOrderPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSO").val();
        if (formDateChange != undefined) {
            $scope.FromDate = formDateChange.split('/').reverse().join('-');
        } else {
            $scope.FromDate = "";
        }
        var toDateChange = $("#txtToDateForSO").val();
        if (toDateChange != undefined) {
            $scope.ToDate = toDateChange.split('/').reverse().join('-');
        } else {
            $scope.ToDate = "";
        }
        if ($scope.SalesOrderType == undefined) {
            $scope.SalesOrderType = "";
        }
        if ($scope.ddlEmployee == undefined) {
            $scope.ddlEmployee = "";
        }

        var FullSearchCriteria = "";
        var SearchCriteria = "";
        var SearchCriteria1 = "";
        var SearchCriteria2 = "";
        var SearchCriteria3 = "";
        var SearchCriteria4 = "";

        if ($scope.LoginUser.DepartmentName != null) {
            if ($scope.LoginUser.DepartmentName.match("Sales")) {
                SearchCriteria = "Updator.DepartmentId=" + $scope.LoginUser.DepartmentId + " and Updator.SectionId=" + $scope.LoginUser.SectionId;
            } else {
                SearchCriteria = "";
            }
        }

        SearchCriteria1 = $scope.SearchSalesOrderAndCompanyName != "" ? "([SO].[SalesOrderNo] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%' OR [SO].[CompanyNameBilling] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%')" : "";
        SearchCriteria2 = $scope.FromDate != "" && $scope.ToDate != "" ? "([SO].[SalesOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')" : "";
        SearchCriteria3 = $scope.SalesOrderType != "" ? "([SO].[SalesOrderType] LIKE '%" + $scope.SalesOrderType + "%')" : "";
        SearchCriteria4 = $scope.ddlEmployee != "" ? "[E].[SectionId]=" + $scope.ddlEmployee.SectionId : "";

        FullSearchCriteria = (SearchCriteria == "" ? "" : (' AND ' + SearchCriteria)) + (SearchCriteria1 == "" ? "" : (' AND ' + SearchCriteria1)) + (SearchCriteria2 == "" ? "" : (' AND ' + SearchCriteria2)) + (SearchCriteria3 == "" ? "" : (' AND ' + SearchCriteria3)) + (SearchCriteria4 == "" ? "" : (' AND ' + SearchCriteria4));

        FullSearchCriteria = FullSearchCriteria.substring(5);

        //SearchCriteria += SearchCriteria == "" ? FullSearchCriteria : (' AND ' + FullSearchCriteria);

        //if ($scope.SearchSalesOrderAndCompanyName != undefined && $scope.SearchSalesOrderAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria1 = "([SO].[SalesOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SO].[SalesOrderNo] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%' OR [SO].[CompanyNameBilling] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%')";
        //    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
        //    //alert("Name, Date Success!!!!!");
        //}
        //else if ($scope.SearchSalesOrderAndCompanyName !== undefined && $scope.SearchSalesOrderAndCompanyName != null && $scope.SearchSalesOrderAndCompanyName != "") {
        //    SearchCriteria1 = "([SO].[SalesOrderNo] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%' OR [SO].[CompanyNameBilling] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%')";
        //    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
        //    //alert("Name Success!!!!!");
        //}
        //else if ($scope.SalesOrderType !== undefined && $scope.SalesOrderType != null && $scope.SalesOrderType != "") {
        //    SearchCriteria1 = "([SO].[SalesOrderType] LIKE '%" + $scope.SalesOrderType + "%')";
        //    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
        //    //alert("SalesOrderType Success!!!!!");
        //}
        //else if ($scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria1 = "([SO].[SalesOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')";
        //    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
        //    //alert("Date Success!!!!!");
        //}

        $http({
            url: encodeURI('/SalesOrder/GetSalesOrderPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + FullSearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data != "") {
                if (data.ListData.length > 0) {
                    angular.forEach(data.ListData, function (aSd) {
                        var res1 = aSd.SalesOrderDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.SalesOrderDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.SalesOrderDate = date1;

                        }

                    })

                }
                else {
                    $scope.SalesOrderListPaged = [];
                    alertify.log('Sales Order  Not Found', 'error', '5000');

                }
            }


            $scope.AttachPoNameList = [];
            angular.forEach(data.ListData, function (aSo) {

                if (aSo.AttachmentName == "" || aSo.AttachmentName == undefined) {
                    var soAttchName = aSo.AttachmentName;
                    aSo.AttachmentNameFilter = soAttchName;
                    $scope.AttachPoNameList.push(soAttchName);
                } else {
                    var soAttchName = aSo.AttachmentName.split(",");
                    $scope.AttachPoNameList.push(soAttchName);
                    if (soAttchName != "") {
                        aSo.AttachmentNameFilter = soAttchName;
                    }

                }

                $scope.SalesOrderListPaged = data.ListData;
            })

            //  console.log(" $scope.AttachPoNameList", $scope.SalesOrderListPaged);
            $scope.total_count = data.TotalRecord;

            ///console.log(" $scope.SalesOrderListPaged",$scope.SalesOrderListPaged);
        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetSalesOrderPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSalesOrderPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSalesOrderPaged($scope.currentPage);
        }
        //  }


    }


    $scope.GetSalesOrderDetails = function (aSO) {
        if (aSO.DocStatus !== 'Draft') {
            alertify.log('This SO can not be modified', 'error', '2000');
            return;
        }
        $scope.ddlItemNameAll = null;
        $('#itemNameSO').select2('destroy');
        $('#itemNameSO').val('').select2({
            placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
            templateResult: formatOutput,
            //theme: "classic",
            //dropdownAutoWidth: false
        });
        $scope.ad_Item = {};
        $scope.pos_SalesOrderDetail = {};

        $scope.btnSave = "Update";
        $scope.salesOrder = aSO;

        $scope.salesOrder.CurrentSalesOrderDate = aSO.SalesOrderDate;
        $scope.ConversionRate = $scope.salesOrder.ConversionRate;
        $scope.ddlCurrency = { CurrencyId: $scope.salesOrder.CurrencyId };
        $scope.ddlBrunch = { BranchId: $scope.salesOrder.FactoryId };

        //$scope.salesOrder.SalesOrderNo = aSO.SalesOrderNo.split('/')[2];
        $("#txtSalesOrderDate").val(aSO.SalesOrderDate);

        if (aSO.DeliveryDate) {
            var res1 = aSO.DeliveryDate.substring(0, 5);
            if (res1 == "/Date") {
                var parsedDate1 = new Date(parseInt(aSO.DeliveryDate.substr(6)));
                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                aSO.DeliveryDate = date1;
            }
        }



        $scope.company.CompanyName = aSO.CompanyName;
        //GetEmpId();
        $scope.ddlCompany = Enumerable.From($rootScope.companyList).Where('$.CompanyId==' + aSO.CompanyId).FirstOrDefault();
        if ($scope.ddlCompany == undefined) {
            $scope.ddlCompany = { CompanyId: aSO.CompanyId }
        }
        setTimeout(function () {
            $("#companyNameSO").select2({
                theme: "classic",
            }).val(aSO.CompanyId);
            //}).val(aSO.CompanyId).trigger("change");

        }, 0);

        GetAllItem();
        $scope.ddlPriceTypeBy = { "PriceTypeId": aSO.PriceTypeId };

        //  $("#ddlPreparedBy").select2('destroy');
        $scope.ddlPreparedBy = Enumerable.From($scope.employeeList).Where('$.EmployeeId==' + aSO.PreparedById).FirstOrDefault();
        if ($scope.ddlPreparedBy == undefined) {
            $scope.ddlPreparedBy = { "EmployeeId": aSO.PreparedById };
        }
        //$("#ddlPreparedBySO").select2('destroy'); 
        ////setTimeout(function () {
        //$("#ddlPreparedBySO").select2().val(aSO.PreparedById).trigger("change");

        ////}, 0);

        setTimeout(function () {
            $("#ddlPreparedBySO").select2({
                theme: "classic",
            }).val(aSO.PreparedById).trigger("change");

        }, 0);

        var criteria = "[SOD].[SalesOrderId]= " + aSO.SalesOrderId + " AND [SOD].[IsVoid]= 0";
        $http({
            url: '/SalesOrder/GetSalesOrderDetailDynamic?searchCriteria=' + criteria + "&orderBy='SalesOrderId'",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length) {



                $scope.TotalAmount = 0;
                $scope.TotalAmountBDT = 0;
                $scope.TotalOrderQty = 0;
                $scope.IsItemList = true;
                $scope.pos_SalesOrderDetailAdAttributeLst = [];
                angular.forEach(data, function (aSoDetail) {
                    
                    if (aSoDetail.DueDate != null) {

                        var res2 = aSoDetail.DueDate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSoDetail.DueDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSoDetail.DueDate = date1;
                        }
                    }

                    $scope.stockList = [];
                    $scope.StockItemList = [];


                    angular.forEach($scope.sockQtyWithRequestQty, function (aData) {

                        if (aSoDetail.ItemAddAttId == aData.ItemId && aSoDetail.MaterialTypeId == aData.MaterialTypeId) {
                            var stockItem = {};
                            stockItem.CurrentQuantity = aData.CurrentQuantity;
                            stockItem.DepartmentName = aData.DepartmentName;
                            $scope.stockList.push(stockItem);
                            aSoDetail.stockList = $scope.stockList;

                        }
                    });


                    $scope.Amount = aSoDetail.Amount;
                    $scope.TotalAmount += Number($scope.Amount);
                    $scope.TotalOrderQty += aSoDetail.OrderQty;


                    //if ($scope.ConversionRate != undefined && $scope.ConversionRate != 1) {
                    aSoDetail.OrderPriceBDT = aSoDetail.OrderPrice * $scope.ConversionRate;
                    aSoDetail.AmountBDT = Number($scope.Amount) * $scope.ConversionRate;
                    $scope.TotalAmountBDT += aSoDetail.AmountBDT;
                    //} else {
                    //aSoDetail.AmountBDT = 0;
                    //aSoDetail.OrderPriceBDT = 0;
                    //}

                    $scope.pos_SalesOrderDetailAdAttributeLst.push(aSoDetail);
                })
                if ($scope.salesOrder.CPTCost) {
                    $scope.TotalAmount = $scope.TotalAmount + $scope.salesOrder.CPTCost;
                    $scope.CPTCostBDT = $scope.ConversionRate * $scope.salesOrder.CPTCost;
                    $scope.TotalAmountBDT = $scope.TotalAmountBDT + $scope.CPTCostBDT;
                }
            }
            //$scope.Mood = "Revise";
            //$window.scrollTo(0, 0); 

        });

        $http({
            url: '/SalesOrder/GetPOReference?DocType=SO' + "&DocumentId=" + aSO.SalesOrderId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length) {


                $scope.POReferencelist = [];
                angular.forEach(data, function (aPODetail) {
                   
                    var res2 = aPODetail.PODate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPODetail.PODate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aPODetail.PODate = date1;
                    }
              

                    $scope.POReferencelist.push(aPODetail);
                })
                if ($scope.POReferencelist.length) {
                    $scope.salesOrder.isPO = true;
                }
            }
            $scope.Mood = "Edit";
            $window.scrollTo(0, 0);

        });

    }

    $scope.GetAmendment = function (aSalesOrder) {
        // $scope.Mood = "Revise";
        $scope.AmendmentRequestEmailObjectInaSalesOrder = aSalesOrder;
        $scope.AmendmentRequestEmailObjectInaSalesOrder.PreparedByName = aSalesOrder.RefEmployeeName;
        $scope.PaymentProcessForAmendment = {
            SalesOrderNo: aSalesOrder.SalesOrderNo,
            CompanyName: aSalesOrder.CompanyName
        }
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
        $scope.exp_AmendmentRequest.ApprovalType = "SOAmendment";

        var parms = JSON.stringify({ expApproval: $scope.exp_AmendmentRequest });
        $http.post('/ExpApproval/Save', parms).success(function (data) {
            AmendmentRequestEmailSend();
            if (data > 0) {
                ///  $scope.Mood = "Sales Order";
                AppNotificationLogPost($scope.AmendmentRequestEmailObjectInaSalesOrder, 'Sales Order Amendment Request!')
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
            'Sales Order No: <strong > ' + $scope.AmendmentRequestEmailObjectInaSalesOrder.SalesOrderNo + '</strong><br/>' +
            'Sales Order Date: <strong>' + $scope.AmendmentRequestEmailObjectInaSalesOrder.SalesOrderDate + '</strong><br/>' +
            'Company Name: <strong>' + $scope.AmendmentRequestEmailObjectInaSalesOrder.CompanyName + '</strong><br/>' +
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

    $scope.remarkDisable = function () {
        if ($scope.salesOrder.ReferenceNo == "") {
            $scope.Disableremark = false;
        } else {
            $scope.Disableremark = true;
            $('#Remarks').val('');
        }

    }



    $scope.EditItem = function () {
        if ($scope.ddlItemName != null || $scope.ddlItemName != undefined) {
            $scope.$broadcast('EditItem', $scope.ddlItemName);
        } else {
            $scope.$broadcast('ResetForm');
        }

        $('#itemModal').modal('show');
    }
    $scope.EditCompany = function () {
        if ($scope.ddlCompany != null || $scope.ddlCompany != undefined) {
            $scope.ddlCompany.DisableForUpdate = true;
            $scope.$broadcast('EditCompany', $scope.ddlCompany);
        } else {
            $scope.$broadcast('ResetForm');
        }

        $('#companyModal').modal('show');

    }
    $scope.CheckCalculativeValue = function () {
        $('#CalculativeValueModal').modal('show');

    }
    $scope.ConfirmCalculativeValue = function () {
        $('#CalculativeValueModal').modal('hide');
        //angular.forEach($scope.pos_SalesOrderDetailAdAttributeLst, function (aData) {
        //    if (aData.ItemId == $scope.ad_Item.ItemId) {
        //        aData.PcPerRoll = $scope.ad_Item.PcPerRoll;
        //        aData.RollPerCarton = $scope.ad_Item.RollPerCarton;
        //        aData.RollWeight = $scope.ad_Item.RollWeight;
        //        aData.CartonWeight = $scope.ad_Item.CartonWeight;
        //        aData.CartonSize = $scope.ad_Item.CartonSize;
        //    }
        //})
    }
    $scope.CheckNonCalculativeValue = function () {
        $('#NonCalculativeValueModal').modal('show');
    }
    $scope.ConfirmNonCalculativeValue = function () {
        $('#NonCalculativeValueModal').modal('hide');

        //angular.forEach($scope.pos_SalesOrderDetailAdAttributeLst, function (aData) {
        //    if (aData.ItemId == $scope.ad_Item.ItemId) {
        //        aData.ItemDescription = $scope.ad_Item.ItemDescription;
        //        aData.ItemDescriptionTwo = $scope.ad_Item.ItemDescriptionTwo;
        //        aData.HsCodeId = $scope.ad_Item.HsCodeId;
        //    }
        //})
    }
    $scope.CheckTaggedItemForRibbon = function () {
        $('#TaggedItemForRibbonModal').modal('show');
    }
    $scope.ConfirmTaggedItemForRibbon = function () {
        $('#TaggedItemForRibbonModal').modal('hide');
    }

    $scope.SelectFile = function (data) {
        $scope.PoAttachmentName =[];
        var incrementNumberOfImage = 0;

        $scope.MultiplePoFileUploadList = [];

        for (var i = 0; i < data.files.length; i++) {

            var fileSize = data.files[i].size;
            var file = Math.round((fileSize / 1024));
            var fileMb = parseFloat(file / 1024);

            if (fileMb <=25.3) {

                $scope.PoAttachmentName.push(data.files[i].name);
                if (data.files.length > 0) {
                    incrementNumberOfImage = incrementNumberOfImage + 1;
                }

                $scope.FileSplitArray = data.files[i].name.split('.').pop();

                data.files[i].FileSplitArray = data.files[i].name.split('.').pop();
                data.files[i].num = incrementNumberOfImage;

                $scope.MultiplePoFileUploadList.push(data.files[i]);
            } else {
             
                $("#PONo").val('');
                $("#txtPO_Date").val('');
                $scope.POReference.PODate = '';
                $scope.POReference.PONo = '';
                angular.element(`input[name='PoFileName']`).val(null);
                alertify.log('File is bigger than 25MB', 'error', '5000');
               
            }

        }

    }


    $scope.PoImageList = [];

    $scope.AddPOReference = function () {
        var isValid = true;
        var isValid1 = true;

        if ($scope.POReference.PONo == '' || $scope.POReference.PONo == undefined) {
            alertify.log('PO No can`t be empty', 'error', '5000');
            isValid = false;
            return;
        }
        if ($scope.POReference.PODate == '' || $scope.POReference.PODate == undefined) {
            alertify.log('PO date can`t be empty', 'error', '5000');
            isValid1 = false;
            return;
            
        }

        if (isValid && isValid1) {
         

            $scope.TodayDate = $filter('date')(new Date().toJSON().slice(0, 10), 'dd-MM-yyyy');
            var TempMiniteAndSecond = "";
           // var minitAndSecond = new Date($scope.salesOrder.DeliveryDate);
          //  minitAndSecond.setSeconds(7530);


            const d = new Date();
            TempMiniteAndSecond = d.getHours()+'_'+ d.getMinutes() +'_'+ d.getSeconds();
          //  console.log(minitAndSecond.getHours(), minitAndSecond.getMinutes(), 'Second', minitAndSecond.getSeconds());

            $scope.POReference.DocType = "SO";
            $scope.POReference.DocumentId = 0;


            var AttachmentName = [];
            var POList = [];
            

            var PoReplace = "";
            angular.forEach($scope.MultiplePoFileUploadList, function (aData) {

                PoReplace = $scope.POReference.PONo.replace(/[^\w\s]/gi, '_');

                AttachmentName.push(PoReplace + "_" + $scope.TodayDate + '_' + TempMiniteAndSecond+'_'+ aData.num + "." + aData.FileSplitArray);
                POList.push(PoReplace + "_" + $scope.TodayDate + '_' + TempMiniteAndSecond+'_'+ aData.num + "." + aData.FileSplitArray);
                //PoFileUpload
                aData.PONo = PoReplace + "_" + $scope.TodayDate + '_' + TempMiniteAndSecond+'_' + aData.num + "." + aData.FileSplitArray;
                // angular.element(`input[name='PoFileName']`).val(null);
            });

            $scope.POReference.POTempNo = $scope.POReference.PONo;

            if (PoReplace == "") {
                $scope.POReference.PONo;
                $scope.POReference.POName;
                $scope.POReference.AttachmentName = "";

            } else {
                $scope.POReference.PONo = PoReplace;
                $scope.POReference.POName = PoReplace;
            }
            $scope.PoAttachmentName = [];

            if ($scope.MultiplePoFileUploadList == undefined) {
                $scope.MultiplePoFileUploadList = [];
            }

            if ($scope.MultiplePoFileUploadList.length != 0) {

                $scope.POReference.AttachmentName = AttachmentName.join(',');
                $scope.POReference.POFileName = POList.join(',');
                $scope.POReference.PoFileUpload = $scope.MultiplePoFileUploadList;
                angular.element(`input[name='PoFileName']`).val(null);
            } else {
                $scope.POReference.AttachmentName = "";
                $scope.POReference.POFileName = "";
                angular.element(`input[name='PoFileName']`).val(null);
                $scope.POReference.PoFileUpload = undefined;
            }

            $scope.POReferencelist.push($scope.POReference);

            if ($scope.POReferencelist.length > 0) {

                angular.element(`input[name='PoFileName']`).val(null);
                //  $scope.POReference.PONo = "";
                $("#PONo").val('');
                $scope.POReference = {};
            }

            $scope.MultiplePoFileUploadList = [];
        //($scope.POReference.PONo != "" || $scope.POReference.PONo != undefined) && (POReference.PODate != "" || POReference.PODate != undefined)




        }

    
      


    }
    //$scope.removePOReference = function (aPOReference) {
    //    var ind = $scope.POReferencelist.indexOf(aPOReference);
    //    $scope.POReferencelist.splice(ind, 1);
    //    $scope.POReference = {};
    //}


    $scope.FileUpload = function () {

        for (var i = 0; i < $scope.POReferencelist.length; i++) {

            if ($scope.POReferencelist[i].PoFileUpload != undefined || $scope.POReferencelist[i].PoFileUpload != null) {

                for (var j = 0; j < $scope.POReferencelist[i].PoFileUpload.length; j++) {

                    POFileService.UploadFile($scope.POReferencelist[i].PoFileUpload[j]).then(function (d) {

                    }, function (e) {
                        alert(e);
                    });

                    //POFileService.UploadFile($scope.POReferencelist.PoFileUpload).then(function (d) {
                    //    alert("upload successfull!!!");
                    //    // console.log(d);

                    //}, function (e) {
                    //    alert(e);
                    //});

                }
            }

        }

        
     
    }


    function SaveOrder(status) {
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.salesOrder.CreatorId = $scope.UserId;
        $scope.salesOrder.UpdatorId = $scope.UserId;
 
        var erroMsg = [];
        if (!erroMsg.length) {
            for (var i = 0; i < $scope.POReferencelist.length; i++) {


                if ($scope.POReferencelist[i].PoFileUpload!= undefined || $scope.POReferencelist[i].PoFileUpload !=null) {
                    for (var j = 0; j < $scope.POReferencelist[i].PoFileUpload.length; j++) {

                        POFileService.UploadFile($scope.POReferencelist[i].PoFileUpload[j]).then(function (d) {

                        }, function (e) {
                            alert(e);
                        });

                    }
                }

               
              }
            if ($scope.salesOrder.SalesOrderId == 0) {


                angular.forEach($scope.POReferencelist, function (aPo) {
                    if (aPo.POTempNo == undefined || aPo.POTempNo == "") {
                        aPo.PONo = aPo.PONo;
                    } else {
                        aPo.PONo = aPo.POTempNo;
                    }

                });

                var parms = JSON.stringify({ salesOrder: $scope.salesOrder, pos_SaleOrderBillDetaillst: $scope.pos_SalesOrderDetailAdAttributeLst, POReferencelist: $scope.POReferencelist, VoidList: $scope.VoidList });


                $http.post('/SalesOrder/Save', parms).success(function (data) {
                    if (data != '') {
                        var SoIdsAndNo = data.split(",");
                        var soIds = SoIdsAndNo[0];
                        var soId = Number(soIds);
                        var soNo = SoIdsAndNo[1];
                        EmailSend(soNo)
                        AppNotificationLogPost($scope.salesOrder, 'A New Sales Order Created!')
                        Clear();
                        $('#ddlPreparedBySO').select2('destroy');
                        $('#ddlPreparedBySO').val('').select2({
                            placeholder: "Search for: Prepared By",
                            theme: "classic",
                            dropdownAutoWidth: false
                        });
                        $('#companyNameSO').select2('destroy');
                        $('#companyNameSO').val('').select2({
                            placeholder: "Search for: Company Name",
                            theme: "classic",
                            dropdownAutoWidth: false
                        });
                        $scope.ddlItemNameAll = null;
                        $('#itemNameSO').select2('destroy');
                        $('#itemNameSO').val('').select2({
                            placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
                            templateResult: formatOutput,
                            //theme: "classic",
                            //dropdownAutoWidth: false
                        });
                        $scope.ad_Item = {};
                        $scope.pos_SalesOrderDetail = {};

                        alertify.log('Sales Order No: ' + soNo + ' ' + status + ' Successfully!', 'success', '5000');
                        $scope.salesOrderForm.$setPristine();
                        $scope.salesOrderForm.$setUntouched();


                    } else {
                        alertify.log('Server Errors!', 'error', '5000');
                    }
                }).error(function (data) {
                    alertify.log('Server Errors!', 'error', '5000');
                });
            } else {
                var parms = JSON.stringify({ salesOrder: $scope.salesOrder, pos_SaleOrderBillDetaillst: $scope.pos_SalesOrderDetailAdAttributeLst, VoidList: $scope.VoidList, POReferencelist: $scope.POReferencelist });

                $http.post('/SalesOrder/Save', parms).success(function (data) {

                    var SoIdsAndNo = data.split(",");
                    var soIds = SoIdsAndNo[0];
                    var soId = Number(soIds);
                    var soNo = SoIdsAndNo[1];
                    AppNotificationLogPost($scope.salesOrder, 'Sales Order Updated!')

                   // EmailSend(soNo)

                    Clear();
                    if (data != '') {
                        $('#ddlPreparedBySO').select2('destroy');
                        $('#ddlPreparedBySO').val('').select2({
                            placeholder: "Search for: Prepared By",
                            theme: "classic",
                            dropdownAutoWidth: false
                        });
                        $('#companyNameSO').select2('destroy');
                        $('#companyNameSO').val('').select2({
                            placeholder: "Search for: Company Name",
                            theme: "classic",
                            dropdownAutoWidth: false
                        });


                        alertify.log('Sales Order No: ' + soNo + ' ' + status + ' Successfully!', 'success', '5000');
                        $scope.salesOrderForm.$setPristine();
                        $scope.salesOrderForm.$setUntouched();


                    } else {
                        alertify.log('Server Errors!', 'error', '5000');
                    }
                }).error(function (data) {
                    alertify.log('Server Errors!', 'error', '5000');
                });
            }
           
        }

        else {
            alertify.log(erroMsg[0].msg, 'error', '5000');
        }

    }

   

    function EmailSend(soNo) {
        $scope.EmailSendNotification.EmailSubject = "Sales Order";
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
            '<p> Dear User,<br/> A new Sales Order has been Created. <br/> ' +
            'Sales Order No: <strong > ' + soNo + '</strong><br/>' +
            'Sales Order Date: <strong>' + $scope.salesOrder.SalesOrderDate + '</strong><br/>' +
            'Company Name: <strong>' + $scope.ddlCompany.CompanyName + '</strong><br/>' +
            'Prepared by: <strong>' + $scope.ddlPreparedBy.FullName + '</strong>' + '<br/>' +
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
    
    $scope.IsDowanload = true;
    $scope.downLoadFilePopupBtn = function () {
        
        alertify.confirm("Do you Want to Dowanload ?", function (e) {
            if (e) {
             
                $("#PoDownloadId")[0].click()
            } else {
               
            }
        })
        event.stopPropagation();
    }



    $scope.deleteFile = function (FileName) {
        deleteFile(FileName);

    };



    function deleteFile(FileName) {
        $http({
            url: '/SalesOrder/PODeleteFile?FileName=' + FileName,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //$scope.IwoDdlFilterList = data;
            alert("success");
        })

    }
   
    $scope.ClearImage = function (PoObj) {
        var Attachment = PoObj.AttachmentName.split(',')
        var isUpdateImgHide = false;
        var result = confirm("Are you sure about removing this Attachment?");
        if (result) {
           

            if (PoObj.AttachmentName != null && PoObj.AttachmentName != undefined && PoObj.AttachmentName != '') {

                //for (var i = 0; i < $scope.POReferencelist.length; i++) {
                //    var fileName = $scope.POReferencelist[i].AttachmentName;
               
                angular.forEach(Attachment, function (aData) {
                    deleteFile(aData);
                });
               // }
               
            }
            //AttachmentName
            var ind = $scope.POReferencelist.indexOf(PoObj);
            $scope.POReferencelist.splice(ind, 1);

          
            $scope.POReference = {};
          }


    };


    

  
}).factory('POFileService', function ($http, $q) { // explained abour controller and service in part 2

    var fac = {};
    fac.UploadFile = function (file) {
       // console.log('', file);
        if (file != undefined) {
            var formData = new FormData();
            formData.append("file", file);
            var defer = $q.defer();
           // console.log('File Saver', file);


            $http.post("/SalesOrder/SavePOFiles?PONo=" + file.PONo, formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                })
                .then(function (d) {
                    defer.resolve(d);
                   // console.log('Update', d);
                });


            return defer.promise;
        }
        

    }

    return fac;

});

app.directive('salesOrderDirective', [function () {
    return {
        restrict: 'AE',
        //scope: {
        //    //data: '='
        //},
        controller: 'SalesOrderEntryController',
        link: function (scope, $scope, $rootScope, element, attrs) {

            scope.$on('updateItem', function (event, item, ItemSearchList) {
                $('#itemModal').modal('hide');
                //$rootScope.ItemSearchListForSO = ItemSearchList;
                //$rootScope.ItemSearchList = ItemSearchList;
                setTimeout(function () {
                    $("#itemNameSO").select2().val(item.ItemId).trigger("change");

                }, 0);
            });
            scope.$on('updateCompany', function (event, company, companyList) {
                $('#companyModal').modal('hide');
                $rootScope.companyList = companyList;

                if (company.IsNew == true) {
                    
                    setTimeout(function () {
                        $("#companyNameSO").select2().val(company.CompanyId).trigger("change");

                    }, 0);
                } else {
                    $scope.ddlCompany = { CompanyId: company.CompanyId }
                }
                scope.GetCompanyAddress(company);
                scope.GetEmployeeByCompany(company); 
            });
        },
    };
}]);



//if ($scope.SearchSalesOrderAndCompanyName != undefined && $scope.SearchSalesOrderAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
//    SearchCriteria1 = "([SO].[SalesOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate +
//        "') and ([SO].[SalesOrderNo] LIKE '%" + $scope.SearchSalesOrderAndCompanyName +
//        "%' OR [SO].[CompanyNameBilling] LIKE '%" + $scope.SearchSalesOrderAndCompanyName +
//        "%' OR [E].[FirstName] LIKE '%" + $scope.SearchSalesOrderAndCompanyName +
//        "%' OR [E].[MiddleName] LIKE '%" + $scope.SearchSalesOrderAndCompanyName +
//        "% OR [E].[LastName] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%')";
//    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
//    //alert("Name, Date Success!!!!!");
//}
//else if ($scope.SearchSalesOrderAndCompanyName !== undefined && $scope.SearchSalesOrderAndCompanyName != null && $scope.SearchSalesOrderAndCompanyName != "") {
//    SearchCriteria1 = "([SO].[SalesOrderNo] LIKE '%" + $scope.SearchSalesOrderAndCompanyName +
//        "%' OR [SO].[CompanyNameBilling] LIKE '%" + $scope.SearchSalesOrderAndCompanyName +
//        "%' OR [E].[FirstName] LIKE '%" + $scope.SearchSalesOrderAndCompanyName +
//        "%' OR [E].[MiddleName] LIKE '%" + $scope.SearchSalesOrderAndCompanyName +
//        "%' OR [E].[LastName] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%')";
//    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
//    //alert("Name Success!!!!!");
//}


//if ($scope.SearchSalesOrderAndCompanyName != undefined && $scope.SearchSalesOrderAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
//    SearchCriteria1 = "([SO].[SalesOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SO].[SalesOrderNo] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%' OR [SO].[CompanyNameBilling] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%')";
//    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
//    //alert("Name, Date Success!!!!!");
//}
//else if ($scope.SearchSalesOrderAndCompanyName !== undefined && $scope.SearchSalesOrderAndCompanyName != null && $scope.SearchSalesOrderAndCompanyName != "") {
//    SearchCriteria1 = "([SO].[SalesOrderNo] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%' OR [SO].[CompanyNameBilling] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%')";
//    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
//    //alert("Name Success!!!!!");
//}
//else if ($scope.SalesOrderType !== undefined && $scope.SalesOrderType != null && $scope.SalesOrderType != "") {
//    SearchCriteria1 = "([SO].[SalesOrderType] LIKE '%" + $scope.SalesOrderType + "%')";
//    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
//    //alert("SalesOrderType Success!!!!!");
//}
//else if ($scope.FromDate != "" && $scope.ToDate != "") {
//    SearchCriteria1 = "([SO].[SalesOrderDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')";
//    SearchCriteria += SearchCriteria == "" ? SearchCriteria1 : (' AND ' + SearchCriteria1);
//    //alert("Date Success!!!!!");
//}