app.controller("ReviseSalesOrderEntryController", function ($rootScope,$scope, $cookieStore, $rootScope, $http, $window, $filter, POFileService) {

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
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Revise Sales Order').ScreenId;
        GetUsersPermissionDetails();

        
        $scope.TotalAmount = 0;
        $scope.TotalAmountBDT = 0;
        $scope.TotalOrderQty = 0;
        $scope.ConversionRate = 80;
        $scope.IsConversionRate = false;
        $scope.IsItemList = false;
        $scope.IsEditItemInfo = false;
        //$scope.CanItemChange = true;
        $scope.IsUpdateDetail = false;
        $scope.IsSelectItem = false;
        $scope.ProductBtn = 'Add';
        $scope.CompanyBtn = 'Edit';
        $scope.POReference = {};
        $scope.salesOrder = {};
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
        $scope.SalesOrderTypeList = ["Local", "Export"];
        $scope.salesOrder.SalesOrderType = "Export";
        //$scope.CurrencyList = ["BDT", "USD"];
        $scope.CurrencyList = [];
        $scope.ddlCurrency = { CurrencyId: 2 };
        $scope.salesOrder.CurrencyId = 2;
        $scope.CompanyListSearch = [];
        $scope.SalesOrderList = [];
        $scope.SalesOrderType = null;
        $scope.CurrencyType = null,
        $scope.ddlPreparedBy = null;
        $scope.ddlCompany = null;
        $scope.company = {}; 
        $scope.ddlCompanySearch = null;
        $scope.ddlPriceTypeBy = null;
        $scope.salesOrder = {};
        $scope.pos_SalesOrderDetail = {};
        $scope.salesOrder.SalesOrderId = 0;
        $scope.AddProductLbl = 'Add';
        $scope.BtnColor = 'customBtn custmoBtnReset';
        //$scope.BtnColor = 'customBtn custmoBtnSearch';
        $scope.AddOverHeadLbl = 'Add OverHead';
        $scope.btnSave = 'Save';
        $scope.OrderNoSearch = null;
      //  GetUsersPermissionDetails();
        //ScreenLock();
        GetAllEmployee();
        GetActiveCompany();
        GetAllPriceType();
        GetAllBranch();
        GetAllVariety();
        GetAllItemUnit();
        GetHsCode();
        GetMaterialType();
        GetAllCurrency();
        //GetAllItem();
        $scope.ddlFactory = {};
        GetByCombinationand();
        GetAllStorewithDepartment();
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.UserData = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.salesOrder.PreparedById = $scope.UserData.EmployeeId;


          

        //$scope.FromDate = $filter('date')(new Date().toJSON().slice(0, 10), 'yyyy-MM-dd');
        //$scope.ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'yyyy-MM-dd');


        $scope.salesOrder.SalesOrderDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetSalerOrderNo();
        $scope.pos_SalesOrderDetail.DueDate = "";
        $scope.pos_SalesOrderDetail.DueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

        $scope.IsEditCompany = true;
        $scope.CompanyBillingAddressList = [];
        $scope.CompanyDeliveryAddressList = [];
        $scope.ReportNotificationDetailList = [];
        ReportNotificationDetail_Get();

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

    $("#itemNameRSO").select2({
        placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
        //theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });
    function ReportNotificationDetail_Get() {
        $http({
            url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'SOR',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.ReportNotificationDetailList = notification;
            console.log("SO Mail", $scope.ReportNotificationDetailList);
        });
    }
    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'SOR',
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
        //$scope.ddlMu = null;
        $scope.ddlMu = { ItemUnitId: 2, UnitName: 'Roll(s)' };
        $scope.ddlItemName = null;
        $scope.IsEditItemInfo = false;
        $scope.IsUpdateDetail = false;
        $scope.IsSelectItem = false;
        $('#itemNameRSO').select2('destroy');
        $('#itemNameRSO').val('').select2({
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
    function GetAllCategory() {
        $http({
            url: '/Category/GetAllCategory',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CategoryList = data;
        });
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
    //#endregion
    function GetSalerOrderNo() {
        if ($scope.salesOrder.SalesOrderId == 0) {
            // var date = $("#txtSalesOrderDate").val();
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
            var login = JSON.parse(sessionStorage.UserDataSession);
        }
        var searchCriteria = 'P.RoleId=' + login.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
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

                $("#ddlPreparedByRSO").select2({
                    theme: "classic",
                }).val($scope.UserData.EmployeeId).trigger("change");

            }, 0);

            $scope.salesOrder.PreparedById = $scope.UserData.EmployeeId;
            
        });
    }

    function SaveOrder(status) {
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.salesOrder.CreatorId = $scope.UserId;
        $scope.salesOrder.UpdatorId = $scope.UserId;
  
        var erroMsg = [];
        if (!erroMsg.length) {

            for (var i = 0; i < $scope.POReferencelist.length; i++) {


                if ($scope.POReferencelist[i].PoFileUpload != undefined || $scope.POReferencelist[i].PoFileUpload != null) {
                    for (var j = 0; j < $scope.POReferencelist[i].PoFileUpload.length; j++) {

                        POFileService.UploadFile($scope.POReferencelist[i].PoFileUpload[j]).then(function (d) {

                        }, function (e) {
                            alert(e);
                        });

                    }
                }

            }


            var IsAmendment = true;
            $scope.salesOrder.IsAmendment = IsAmendment;
            $window.scrollTo(0, 0);


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
                    AppNotificationLogPost($scope.salesOrder, 'Sales Order Revised!')
                    $('#ddlPreparedByRSO').select2('destroy');
                    $('#ddlPreparedByRSO').val('').select2({
                        placeholder: "Search for: Prepared By",
                        theme: "classic",
                        dropdownAutoWidth: false
                    });
                    $('#companyNameRSO').select2('destroy');
                    $('#companyNameRSO').val('').select2({
                        placeholder: "Search for: Company Name",
                        theme: "classic",
                        dropdownAutoWidth: false
                    });
                    $scope.ddlItemNameAll = null;
                    $('#itemNameRSO').select2('destroy');
                    $('#itemNameRSO').val('').select2({
                        placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
                        templateResult: formatOutput,
                        theme: "classic",
                        dropdownAutoWidth: false
                    });
                    $scope.ad_Item = {};
                    $scope.pos_SalesOrderDetail = {};
                    alertify.log('Sales Order No: ' + data + ' ' + status + ' Successfully!', 'success', '5000');
                    //$window.open("/ErpReports/RV_Pos_SalesOrderBySalesOrderId.aspx?SalesOrderId=" + data, "_blank", "width=790,height=630,left=340,top=25");

                    Clear();
                    $scope.reviseSalesOrderForm.$setPristine();
                    $scope.reviseSalesOrderForm.$setUntouched();


                } else {
                    alertify.log('Server Errors!', 'error', '5000');
                }
            }).error(function (data) {
                alertify.log('Server Errors!', 'error', '5000');
            });
        }

        else {
            alertify.log(erroMsg[0].msg, 'error', '5000');
        }

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

    function GetAllCompanyType() {
        var criteria = " [IsActive]=1";
        $http({
            url: '/Company/GetCompanyType?searchCriteria=' + criteria + '&orderBy=CompanyTypeName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyTypeList = data;
        });
    }
    //Company Entry Start Form Here.
    function SaveCompany() {

        $.ajax({
            url: "/Company/SaveCompany",
            contentType: "application/json;charset=utf-8",
            type: "POST",
            data: JSON.stringify({
                _ad_Company: $scope.ad_Company,
                _ad_CompanyAddressList: $scope.companyAddresslist,
                ad_CompanyBillPolicyList: $scope.companyBillPolicylist
            }),
            success: function (data) {
                alertify.log("Company Details Updated Successfully.", "success", "5000");
                if ($scope.ad_Company.CompanyId > 0) {
                    $http({
                        url: "/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyId",
                        method: "GET",
                        headers: { 'Content-Type': "application/json" }
                    }).success(function (companyData) {
                        $rootScope.companyList = companyData;
                        $http({
                            url: "/Company/GetCompanyAddressByCompanyId",
                            method: "GET",
                            params: { companyId: $scope.ad_Company.CompanyId },
                            headers: { 'Content-Type': "application/json" }
                        }).success(function (comAddData) {
                            $scope.companyAddresslist = [];
                            var slNo = 1;
                            angular.forEach(comAddData,
                                function (aData) {
                                    var companyAddress = {};
                                    companyAddress = aData;
                                    companyAddress.Status = "No";
                                    if (aData.IsDefault) {
                                        companyAddress.Status = "Yes";
                                    }
                                    companyAddress.SlNo = slNo;
                                    $scope.companyAddresslist.push(aData);
                                    slNo++;
                                });
                            $scope.ddlCompany = { "CompanyId": $scope.ad_Company.CompanyId };
                            $scope.ddlCompany.CompanyName = $scope.ad_Company.CompanyName;
                            var company = Enumerable.From($rootScope.companyList)
                                .Where("$.CompanyId === " + $scope.ddlImporter.CompanyId).FirstOrDefault();

                            if (!angular.isUndefined(company) && company !== null) {
                                $scope.exportInvoice.CompanyNameBilling = company.CompanyNameBilling;
                                $scope.exportInvoice.AddressBilling = company.AddressBilling;
                                $scope.exportInvoice.CompanyNameDelivery = company.CompanyNameDelivery;
                                $scope.exportInvoice.AddressDelivery = company.AddressDelivery;
                                $scope.exportInvoice.RefEmployeeId = company.RefEmployeeId;
                            }
                            $scope.ddlPreparedBy = { EmployeeId: $scope.ad_Company.RefEmployeeId };

                            if (data > 0) {
                                if ($scope.ad_Company.CompanyId > 0) {
                                    alertify.log("Company Details Updated Successfully.", "success", "5000");
                                }
                                if ($scope.ad_Company.CompanyId == 0) {
                                    alertify.log("Company Details Saved Successfully.", "success", "5000");
                                }

                                ClearCompany();
                                //$scope.companyEntryForm.$setPristine();
                                //$scope.companyEntryForm.$setUntouched();
                                $("#companyModal").modal("hide");
                            } else {
                                alertify.log("Server Errors!", "error", "5000");
                            }
                        });
                    });
                }
            },
            error: function () {
                alertify.log("Server Errors!", "error", "5000");
            }
        });
    }
    $scope.CheckDuplicateCompanyName = function () {
        var criteria = " [CompanyName]='" + $scope.ad_Company.CompanyName + "'";
        if ($scope.ad_Company.CompanyId > 0) {
            criteria += " AND CompanyId<>" + $scope.ad_Company.CompanyId;
        }

        $http({
            url: "/Company/GetCompanyDynamic?searchCriteria=" + criteria + "&orderBy=CompanyId",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            if (data.length > 0) {
                $scope.duplicateCompName = true;
                alertify.log($scope.ad_Company.CompanyName + " Name No. already exists!", "already", "5000");
                $("#txtCompanyName").focus();
            } else {
                $scope.duplicateCompName = false;
            }
        });
    };
    function ClearCompany() {
        $scope.companyAddresslist = [];
        $scope.companyBillPolicylist = [];
        $scope.companyTypeList = [];
        $scope.Branchlist = [];
        $scope.msgAlert = "Save";
        $scope.hidePayable = true;
        $scope.duplicateCompName = false;
        $scope.duplicateCompCode = false;

        $scope.ad_Company = {};
        $scope.ddlCompanyType = null;
        $scope.ddlBranch = null;
        $scope.ad_Company.CompanyId = 0;
        $scope.ad_Company.IsActive = true;
        $scope.buttonSupp = "Save";
        $scope.btnDeleteShow = false;

        $scope.ddlEmployeeRef = { "EmployeeId": $scope.LoginUser.EmployeeId };
        $scope.CompanyTypeList = [];
        $scope.EmployeeListForAdd = [];
        //ClearCompanyAddress();
        //ClearCompanyBillPolicy();
        GetAllCompanyType();
        GetAllEmployee();
    }



    //function ClearCompanyAddress() {
    //    $scope.ad_CompanyAddress = new Object();
    //    $scope.ad_CompanyAddress.AddressType = "Billing";
    //    $scope.buttonSuppAddress = "Add";
    //    $scope.ad_CompanyAddress.IsDefault = true;
    //    $scope.buttonComAddress = "Add";
    //    $scope.btnSuppAddressDeleteShow = false;
    //    $scope.addressRowIndex = "";
    //}

    //function ClearCompanyBillPolicy() {
    //    $scope.ad_CompanyBillPolicy = new Object();
    //    $scope.buttonBillPolicy = "Add";
    //    $scope.btnSuppBillPolicyDeleteShow = false;
    //    $scope.billRowIndex = "";
    //}
    //$scope.GetEmpId = function () {
    //    GetEmpId();
        
    //}
    //function GetEmpId() {
    //    var val = $('#CompanySearchInput').val()
    //    var xyz = $('#CompanySearch option').filter(function () {
    //        return this.value == val;
    //    }).data('xyz');


    //    $scope.CompanyId = xyz;

    //    $scope.ddlCompany = Enumerable.From($rootScope.companyList).Where('$.CompanyId==' + $scope.CompanyId).FirstOrDefault();
    //}

    $scope.GetEmployeeByCompanyRevise1 = function (Company) {
        if (Company != undefined) {
            $scope.ddlCompany = Company;
        }

        if ($scope.ddlCompany == undefined) {
            return;
        }
        var refEmpId = $scope.ddlCompany.RefEmployeeId;
        var refEmployee = Enumerable.From($scope.employeeList).Where('$.EmployeeId==' + refEmpId).FirstOrDefault();
        $scope.ddlPreparedBy = refEmployee;
        //$scope.ddlPreparedBy = { EmployeeId: refEmployee.EmployeeId };
        //$scope.ddlPreparedBy = { "EmployeeId": refEmployee.EmployeeId };
        if (Company == undefined) {
            setTimeout(function () {
                $('#ddlPreparedByRSO').select2('destroy');
                $("#ddlPreparedByRSO").select2({
                    theme: "classic",
                }).val(refEmployee.EmployeeId);

            }, 0);
        } else {
            setTimeout(function () {
            $('#ddlPreparedByRSO').select2('destroy');
            $("#ddlPreparedByRSO").select2({
                theme: "classic",
            }).val(refEmployee.EmployeeId);

            }, 0);
        }
        $scope.salesOrder.PreparedById = refEmployee.EmployeeId;
    }
    $scope.GetCompanyAddressRevise = function (Company) {
        if (Company != undefined) {
            $scope.ddlCompany = Company;
        }
        GetCompanyBillingDeliveryAddress();
        //if (!angular.isUndefined($scope.ddlCompany) && $scope.ddlCompany != null) {
        //    $scope.salesOrder.CompanyNameOnBill = $scope.ddlCompany.CompanyName;
        //    $('#CompanyNameOnBill').val($scope.salesOrder.CompanyNameOnBill);
        //    $scope.salesOrder.BillingAddress = $scope.ddlCompany.AddressBilling;
        //    $('#BillingAddress').val($scope.salesOrder.BillingAddress);

        //} else {
        //    $scope.salesOrder.CompanyNameOnBill = null;
        //    $scope.salesOrder.BillingAddress = null;
        //}

        
    }
    $scope.CheckCompanyAddress = function (IsCompany) {
        if (IsCompany) {
            //alert(IsCompany + " IsCompany");
            $scope.ad_CompanyAddress.AddressCompanyName = $scope.ad_Company.CompanyName;
        }
        if (!IsCompany) {
            //alert(IsCompany + " IsCompany");
            $("#AddressCompanyName").focus();
            $scope.ad_CompanyAddress.AddressCompanyName = "";
        }
    };
    //$scope.LoadCompanyDetails = function () {
    //    $('#companyModal').modal('show');
    //    ClearCompany();
    //}
    $scope.AddItem = function () {
        $('#itemModal').modal('show'); 
    }
    //Address Add, Edit, Delete starts from here
    //$scope.CheckDuplicateCompanyCode = function () {
    //    var criteria = " [CompanyCode]='" + $scope.ad_Company.CompanyCode + "'";
    //    if ($scope.ad_Company.CompanyId > 0) {
    //        criteria += " AND CompanyId<>" + $scope.ad_Company.CompanyId;
    //    }

    //    $http({
    //        url: "/Company/GetCompanyDynamic?searchCriteria=" + criteria + "&orderBy=CompanyId",
    //        method: "GET",
    //        headers: { 'Content-Type': "application/json" }
    //    }).success(function (data) {
    //        if (data.length > 0) {
    //            $scope.duplicateCompCode = true;
    //            alertify.log('Code "' + $scope.ad_Company.CompanyCode + '" No. already exists!', "already", "5000");
    //            $("#txtCompanyCode").focus();
    //        } else {
    //            $scope.duplicateCompCode = false;
    //        }
    //    });
    //};

    //$scope.CheckDuplicateCompanyCode = function () {
    //    var criteria = " [CompanyCode]='" + $scope.ad_Company.CompanyCode + "'";
    //    if ($scope.ad_Company.CompanyId > 0) {
    //        criteria += " AND CompanyId<>" + $scope.ad_Company.CompanyId;
    //    }

    //    $http({
    //        url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + '&orderBy=CompanyId',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        if (data.length > 0) {
    //            $scope.duplicateCompCode = true;
    //            alertify.log('Code "' + $scope.ad_Company.CompanyCode + '" No. already exists!', 'already', '5000');
    //            $('#txtCompanyCode').focus();
    //        } else {
    //            $scope.duplicateCompCode = false;
    //        }
    //    });
    //}

    //$scope.AddCompany = function (companyModal) {
    //    if ($scope.companyAddresslist.length < 1) {
    //        alertify.log('At least one address is required with default!', 'error', '5000');
    //        return;
    //    }

    //    var hasDefaultAddress = Enumerable.From($scope.companyAddresslist).Where('$.IsDefault').FirstOrDefault();
    //    if (hasDefaultAddress == null || angular.isUndefined(hasDefaultAddress)) {
    //        alertify.log('One default address is required!', 'error', '5000');
    //        return;
    //    }
    //    $scope.ad_Company.CreatorId = $scope.LoginUser.UserId;
    //    $scope.ad_Company.UpdatorId = $scope.LoginUser.UserId;
    //    $scope.ad_Company.RefEmployeeId = $scope.ddlEmployeeRef.EmployeeId;
    //    $scope.ad_Company.CompanyTypeId = $scope.ddlCompanyType.CompanyTypeId;
    //    alertify.confirm("Are you sure to Save?", function (e) {
    //        if (e) {
    //            SaveCompany(companyModal);
    //        }
    //    });


    //}

    //$scope.AddCompanyAddress = function () {
    //    var isExistDefaultBilling;
    //    var isExistDefaultDelivery;

    //    if ($scope.ad_CompanyAddress.IsDefault) {
    //        $scope.ad_CompanyAddress.Status = "Yes";
    //    } else {
    //        $scope.ad_CompanyAddress.Status = "No";
    //    }

    //    if ($scope.buttonComAddress == "Add") {
    //        if (!$scope.companyAddresslist.length) {
    //            $scope.ad_CompanyAddress.SlNo = 1;
    //        } else {
    //            $scope.ad_CompanyAddress.SlNo = Enumerable.From($scope.companyAddresslist).Max("$.SlNo") + 1;
    //        }
    //        var checkAddress = Enumerable.From($scope.companyAddresslist)
    //            .Where('$.Address =="' + $scope.ad_CompanyAddress.Address + '"').FirstOrDefault();

    //        if (!$scope.companyAddresslist.length) {
    //            $scope.companyAddresslist.push($scope.ad_CompanyAddress);
    //        } else {
    //            if (!$scope.isDefaultBilling) {
    //                angular.forEach($scope.companyAddresslist,
    //                    function (aAddress) {
    //                        if (aAddress.AddressType == $scope.ad_CompanyAddress.AddressType &&
    //                            aAddress.IsDefault == $scope.ad_CompanyAddress.IsDefault) {
    //                            if ($scope.ad_CompanyAddress.AddressType == "Billing") {
    //                                isExistDefaultBilling = aAddress;
    //                            }
    //                        }
    //                    });
    //                //isExistDefaultBilling = Enumerable.From($scope.companyAddresslist).Where('$.AddressType == "' + $scope.ad_CompanyAddress.AddressType + '" && $.IsDefault == "' + $scope.ad_CompanyAddress.IsDefault +'" ').FirstOrDefault();
    //                if (isExistDefaultBilling && $scope.ad_CompanyAddress.IsDefault) {
    //                    $scope.isDefaultBilling = true;
    //                }
    //            }
    //            if (!$scope.isDefaultDelivery) {
    //                angular.forEach($scope.companyAddresslist,
    //                    function (aAddress) {
    //                        if (aAddress.AddressType == $scope.ad_CompanyAddress.AddressType &&
    //                            aAddress.IsDefault == $scope.ad_CompanyAddress.IsDefault) {
    //                            if ($scope.ad_CompanyAddress.AddressType == "Delivery") {
    //                                isExistDefaultDelivery = aAddress;
    //                            }
    //                        }
    //                    });
    //                //isExistDefaultDelivery = Enumerable.From($scope.companyAddresslist).Where('$.AddressType == "' + $scope.ad_CompanyAddress.AddressType + '" && $.IsDefault == "' + $scope.ad_CompanyAddress.IsDefault +'" ').FirstOrDefault();
    //                if (isExistDefaultDelivery && $scope.ad_CompanyAddress.IsDefault) {
    //                    $scope.isDefaultDelivery = true;
    //                }
    //            }
    //            if ($scope.isDefaultBilling) {
    //                alertify.log("Already billing address has default value", "error", "5000");
    //                $scope.isDefaultBilling = false;
    //                return;
    //            } else if ($scope.isDefaultDelivery) {
    //                alertify.log("Already delivery address has default value", "error", "5000");
    //                $scope.isDefaultDelivery = false;
    //                return;
    //            }
    //            if (!$scope.isDefaultBilling || !$scope.isDefaultDelivery) {
    //                $scope.companyAddresslist.push($scope.ad_CompanyAddress);
    //            }
    //        }

    //        $scope.companyEntryForm.$setPristine();
    //        $scope.companyEntryForm.$setUntouched();
    //    } else {
    //        var checkAddressForUpdate = Enumerable.From($scope.companyAddresslist)
    //            .Where('$.Address =="' +
    //                $scope.ad_CompanyAddress.Address +
    //                '" && $.SlNo!=' +
    //                $scope.ad_CompanyAddress.SlNo).FirstOrDefault();
    //        var updateAddress = Enumerable.From($scope.companyAddresslist)
    //            .Where("$.SlNo==" + $scope.ad_CompanyAddress.SlNo).FirstOrDefault();
    //        if (checkAddressForUpdate == null || angular.isUndefined(checkAddressForUpdate)) {
    //            updateAddress.Address = $scope.ad_CompanyAddress.Address;
    //        }

    //        $scope.companyEntryForm.$setPristine();
    //        $scope.companyEntryForm.$setUntouched();
    //    }
    //    $("#tbxCompanyAddressHidden").val("");
    //    ClearCompanyAddress();
    //};

    //$scope.CheckDefault = function (defaultAdd) {
    //    if (defaultAdd) {
    //        angular.forEach($scope.companyAddresslist, function (address) {
    //            if ($scope.ad_CompanyAddress.AddressType == 'Mailing') {
    //                if (address.Status == 'Yes' && address.AddressType == 'Mailing') {
    //                    alertify.log('One Default Mailing Address Accepted!', 'error', '5000');
    //                    $scope.ad_CompanyAddress.IsDefault = false;
    //                    return;
    //                }
    //            }
    //            if ($scope.ad_CompanyAddress.AddressType == 'Billing') {
    //                if (address.Status == 'Yes' && address.AddressType == 'Billing') {
    //                    alertify.log('One Default Billing Address Accepted!', 'error', '5000');
    //                    $scope.ad_CompanyAddress.IsDefault = false;
    //                    return;
    //                }
    //            }
    //        });
    //    }
    //};

    //$scope.SelCompanyAddress = function (customerAddress) {
    //    $("#tbxCompanyAddressHidden").val(customerAddress.Address);
    //    $scope.ad_CompanyAddress = customerAddress;
    //    $scope.buttonComAddress = "Update";
    //};

    //$scope.removeAddress = function (aCompanyAddress) {
    //    var ind = $scope.companyAddresslist.indexOf(aCompanyAddress);
    //    $scope.companyAddresslist.splice(ind, 1);
    //    ClearCompanyAddress();
    //}
    ////Bill Policy Add, Edit, Delete starts from here
    //$scope.AddCompanyBillPolicy = function () {

    //    if ($scope.buttonBillPolicy == "Add") {

    //        if (!$scope.companyBillPolicylist.length) {
    //            $scope.ad_CompanyBillPolicy.SlNo = 1;
    //        } else {
    //            $scope.ad_CompanyBillPolicy.SlNo = Enumerable.From($scope.companyBillPolicylist).Max('$.SlNo') + 1;
    //        }
    //        var checkPolicy = Enumerable.From($scope.companyBillPolicylist).Where('$.PolicyDescription =="' + $scope.ad_CompanyBillPolicy.PolicyDescription + '"').FirstOrDefault();
    //        if (checkPolicy != null || !angular.isUndefined(checkPolicy)) {
    //            alertify.log('Bill Policy <b style="color:yellow">' + $scope.ad_CompanyBillPolicy.PolicyDescription + '</b> Already Added!', 'error', '5000');
    //            $("#tbxPolicy").focus();
    //            return;
    //        }
    //        $scope.companyBillPolicylist.push($scope.ad_CompanyBillPolicy);

    //        $scope.companyEntryForm.$setPristine();
    //        $scope.companyEntryForm.$setUntouched();
    //    } else {
    //        var checkUpdateBPolicy = Enumerable.From($scope.companyBillPolicylist).Where('$.PolicyDescription =="' + $scope.ad_CompanyBillPolicy.PolicyDescription + '" && $.SlNo!=' + $scope.ad_CompanyBillPolicy.SlNo).FirstOrDefault();
    //        var updateBillPolicy = Enumerable.From($scope.companyBillPolicylist).Where('$.SlNo==' + $scope.ad_CompanyBillPolicy.SlNo).FirstOrDefault();
    //        if (checkUpdateBPolicy == null || angular.isUndefined(checkUpdateBPolicy)) {
    //            updateBillPolicy.PolicyDescription = $scope.ad_CompanyBillPolicy.PolicyDescription;
    //        } else {
    //            updateBillPolicy.PolicyDescription = $("#tbxPolicyHidden").val();
    //            alertify.log('Bill Policy <b style="color:yellow">' + checkUpdateBPolicy.PolicyDescription + '</b> Already Added!', 'error', '5000');
    //            $("#tbxPolicy").focus();
    //        }
    //    }
    //    $("#tbxPolicyHidden").val("");
    //    ClearCompanyBillPolicy();

    //};

    //$scope.SelCompanyBillPolicy = function (customerbillpolicy, index) {
    //    $("#tbxPolicyHidden").val(customerbillpolicy.PolicyDescription);
    //    $scope.ad_CompanyBillPolicy = customerbillpolicy;
    //    $scope.buttonBillPolicy = "Change";
    //    $scope.btnSuppBillPolicyDeleteShow = true;
    //};

    //$scope.removeBillPolicy = function (aBillPolicy) {
    //    var ind = $scope.companyBillPolicylist.indexOf(aBillPolicy);
    //    $scope.companyBillPolicylist.splice(ind, 1);
    //    ClearCompanyBillPolicy();
    //}
    //End Company Address 
    $scope.getMaxSalesOrderByDate = function () {
        GetSalerOrderNo();
    }
    //$scope.changePoDate = function () {
    //    if ($scope.salesOrder.IsNonSO) {
    //        $('#ReferenceNo').val('');
    //        $('#txtPoDate').val('');
    //        $scope.disblePo = true;

    //        $scope.salesOrder.ReferenceNo = "";
    //        $scope.salesOrder.PODate = "";
    //    }
    //    else {
    //        $scope.disblePo = false;
    //    }
    //}
    $scope.SaveSalesOrder = function () {
        SaveSalesOrder();
    }
    function SaveSalesOrder() {
        //if ($scope.salesOrder.IsNonSO) {
        //    if ($scope.salesOrder.Remarks === undefined || $scope.salesOrder.Remarks == null || $scope.salesOrder.Remarks == '') {
        //        alertify.log('Type Your Remarks', 'error', '5000');
        //        $('#Remarks').focus();
        //        return;
        //    }
        //    if ($scope.salesOrder.PODate === undefined || $scope.salesOrder.PODate == null || $scope.salesOrder.PODate == '') {
        //        $scope.salesOrder.PODate = null;
        //    }
        //}
        //else {
        //    if ($scope.salesOrder.ReferenceNo === undefined || $scope.salesOrder.ReferenceNo == null || $scope.salesOrder.ReferenceNo == '') {
        //        alertify.log('Type P.O No', 'error', '5000');
        //        $('#ReferenceNo').focus();
        //        return;
        //    }
        //    if ($scope.salesOrder.PODate === undefined || $scope.salesOrder.PODate == null || $scope.salesOrder.PODate == '') {
        //        alertify.log('Enter P.O Date', 'error', '5000');
        //        $('#txtPoDate').focus();
        //        return;
        //    }
        //}

        angular.forEach($scope.pos_SalesOrderDetailAdAttributeLst, function (aSO) {
            if (isNaN(parseFloat(aSO.OrderPrice)) || !isFinite(aSO.OrderPrice)) {
                alertify.log('Enter correct price for ' + aSO.Combination, 'error', '5000');
                return;
            }
        })

        //var criteria = "SO.SalesOrderNo='" + $scope.salesOrder.SalesOrderNo + "'";
        //if ($scope.salesOrder.SalesOrderId > 0) {
        //    criteria += " AND SO.SalesOrderId<>" + $scope.salesOrder.SalesOrderId;
        //}

        //$http({
        //    url: '/SalesOrder/GetSalesOrderDynamic?searchCriteria=' + criteria + '&orderBy=SO.SalesOrderNo',
        //    method: 'GET',
        //    headers: { 'Content-Type': 'application/json' }
        //}).success(function (data) {
        //    if (data.length > 0) {
        //        alertify.log('Sales Order No: ' + $scope.salesOrder.SalesOrderNo + ' already exists!', 'already', '5000');
        //    } else {
                //GetEmpId();
                $scope.salesOrder.CompanyId = $scope.ddlCompany.CompanyId;
                $scope.salesOrder.CompanyName = $scope.ddlCompany.CompanyName;
                $scope.salesOrder.PriceTypeId = $scope.ddlPriceTypeBy.PriceTypeId;
                $scope.salesOrder.PreparedById = $scope.ddlPreparedBy.EmployeeId;
                $scope.salesOrder.PreparedByName = $scope.ddlPreparedBy.FullName;
                $scope.salesOrder.RefEmployeeId = $scope.ddlPreparedBy.EmployeeId;
                $scope.salesOrder.ConversionRate = $scope.ConversionRate;
                $scope.salesOrder.CurrencyId = $scope.ddlCurrency.CurrencyId;
                
                if ($scope.CreatePermission) {
                    if ($scope.salesOrder.SalesOrderId == 0) {
                        alertify.confirm("Are you sure to save?", function (e) {
                            if (e) {
                                SaveOrder('Saved');
                            }
                        })
                    }
                    else {
                        alertify.confirm("Are you sure to revise?", function (e) {
                            if (e) {
                                SaveOrder('Revised');
                            }
                        })
                    }
                }
                else {
                    alertify.log('You do not have permission to save!', 'error', '5000');
                }
            //}
        //});
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

    $scope.LoadACombination = function (aCombination) {
        $scope.pos_SalesOrderDetail = aCombination;
        $scope.pos_SalesOrderDetail.DueDate = "";
        $scope.pos_SalesOrderDetail.DueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        //$scope.pos_SalesOrderDetail.DueDate = $scope.pos_SalesOrderDetail.DueDate.split("/").reverse().join("-");

       // var Due = ($scope.pos_SalesOrderDetail.DueDate.split("-").reverse().join("/")).toString();
       // var input = $("#txtDueDate ");
       //input.val(Due);
       // input.trigger('input'); // Use for Chrome/Firefox/Edge
       // //input.trigger('change')
       // //$("#txtDueDate").val('Due');

        $scope.VisibilityOfSuggession = false;
        $scope.ItemSearchCombination = $scope.pos_SalesOrderDetail.Combination;
        $scope.pos_SalesOrderDetail.ItemDescription = $scope.pos_SalesOrderDetail.NameAndDesc;

        $scope.AllCombinationSearch = [];
        //$scope.ddlMu = { ItemUnitId: $scope.pos_SalesOrderDetail.DefaultSaleMeasurementId }
        $scope.ddlMu = { ItemUnitId: 2, UnitName: 'Roll(s)' }
        $scope.pos_SalesOrderDetail.CurrentQuantity = $scope.pos_SalesOrderDetail.StockQty;
        $('#txtOrderQty').focus();
    }

    

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
        Clear();
        //$scope.reviseSalesOrderForm.$setPristine();
        //$scope.reviseSalesOrderForm.$setUntouched();
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
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SalesOrderDate = date1;
                    }
                })
            }
            else
                alertify.log('No Sales Order Found', 'error', '5000');

            $scope.SalesOrderList = data;
            
        });
    }

    //$scope.GetSalesOrderDetails = function (aSO) {
    //    $scope.btnSave = "Update";
    //    $scope.salesOrder = aSO;
    //    if (aSO.IsNonSO == 1) {
    //        $scope.salesOrder.IsNonSO = true;
    //    }
    //    $scope.salesOrder.CurrentSalesOrderDate = aSO.SalesOrderDate;
    //    $scope.salesOrder.SalesOrderNo = aSO.SalesOrderNo.split('/')[2];
    //    $("#txtSalesOrderDate").val(aSO.SalesOrderDate);
    //    // $("#txtPoDate").val(aSO.PODate);
    //    // $scope.PODate = aSO.PODate;

    //    var res1 = aSO.DeliveryDate.substring(0, 5);
    //    if (res1 == "/Date") {
    //        var parsedDate1 = new Date(parseInt(aSO.DeliveryDate.substr(6)));
    //        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
    //        aSO.DeliveryDate = date1;
    //    }

    //    if (aSO.PODate) {
    //        var res1 = aSO.PODate.substring(0, 5);
    //        if (res1 == "/Date") {
    //            var parsedDate1 = new Date(parseInt(aSO.PODate.substr(6)));
    //            var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
    //            aSO.PODate = date1;
    //        }
    //    }
    //    $scope.ddlCompany = { "CompanyId": aSO.CompanyId };
    //    $scope.ddlPriceTypeBy = { "PriceTypeId": aSO.PriceTypeId };
    //    $scope.ddlPreparedBy = { "EmployeeId": aSO.PreparedById };
    //    var criteria = "[SalesOrderId]=" + aSO.SalesOrderId;
    //    $http({
    //        url: '/SalesOrder/GetSalesOrderDetailDynamic?searchCriteria=' + criteria + "&orderBy='SalesOrderId'",
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
    //        if (data.length) {
    //            $scope.pos_SaleOrderBillDetaillst = [];
    //            $scope.pos_SalesOrderDetailAdAttributeLst = [];

    //            angular.forEach(data, function (aSoDetail) {
    //                $scope.pos_SalesOrderDetail = Enumerable.From($scope.AllCombinationlist).Where('$.ItemAddAttId==' + aSoDetail.ItemAddAttId).FirstOrDefault();
    //                $scope.pos_SalesOrderDetail.BuyerName = aSoDetail.BuyerName;

    //                //var ValueOfAttribute = [];
    //                //var a = $scope.pos_SalesOrderDetail.AttributeNames.split(',');
    //                //for (var i = 0; i < a.length; i++) {
    //                //    var val = a[i].split(':');
    //                //    ValueOfAttribute.push(val[1].trim());
    //                //}

    //                $scope.pos_SalesOrderDetail.ValueOfAttribute = [$scope.pos_SalesOrderDetail.AttributeNames];
    //                var Attribute = $scope.pos_SalesOrderDetail;
    //                Attribute.OrderUnitId = aSoDetail.OrderUnitId;
    //                Attribute.UnitName = GetUnitNameById(Attribute.OrderUnitId);
    //                Attribute.ItemDescription = aSoDetail.ItemDescription;
    //                var res2 = aSoDetail.DueDate.substring(0, 5);
    //                if (res2 == "/Date") {
    //                    var parsedDate1 = new Date(parseInt(aSoDetail.DueDate.substr(6)));
    //                    var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
    //                    Attribute.DueDateFormated = date1;

    //                    var dueDateValue = date1.split("/");
    //                    Attribute.DueDate = new Date(dueDateValue[2], dueDateValue[1] - 1, dueDateValue[0]);
    //                }

    //                //var dueDateValue = '17/04/2018'.split("/");
    //                //var salesOrderDate = new Date(dueDateValue[2], dueDateValue[1] - 1, dueDateValue[0]);
    //                //$scope.pos_SalesOrderDetail.DueDate = salesOrderDate;
    //                //Attribute.DueDate = salesOrderDate;
    //                //Attribute.DueDateFormated = '17/04/2018';

    //                Attribute.OrderPrice = aSoDetail.OrderPrice;
    //                Attribute.CurrentQuantity = $scope.pos_SalesOrderDetail.StockQty;
    //                Attribute.OrderQty = aSoDetail.OrderQty;
    //                Attribute.ItemName = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + Attribute.ItemId).Select('$.ItemName').FirstOrDefault();
    //                Attribute.ItemCode = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + Attribute.ItemId).Select('$.ItemCode').FirstOrDefault();
    //                $scope.pos_SalesOrderDetailAdAttributeLst.push(Attribute);

    //                var itemExist = false;
    //                if ($scope.pos_SaleOrderBillDetaillst.length) {
    //                    angular.forEach($scope.pos_SaleOrderBillDetaillst, function (aItem) {
    //                        if (aItem.ItemId == $scope.pos_SalesOrderDetail.ItemId) {
    //                            aItem.OrderQuantity += $scope.pos_SalesOrderDetail.OrderQty;
    //                            itemExist = true;
    //                        }
    //                    });
    //                }

    //                if (!itemExist) {
    //                    var Item = {};
    //                    angular.forEach($scope.VarietyList, function (aItem) {
    //                        if (aItem.ItemId == $scope.pos_SalesOrderDetail.ItemId) {
    //                            Item = aItem;
    //                        }
    //                    })
    //                    Item.OrderQuantity = $scope.pos_SalesOrderDetail.OrderQty;

    //                    //Item.HeaderOfAttribute = [];
    //                    //var HeaderOfAttribute = [];
    //                    //var a = $scope.pos_SalesOrderDetail.AttributeNames.split(',');
    //                    //for (var i = 0; i < a.length; i++) {
    //                    //    var val = a[i].split(':');
    //                    //    HeaderOfAttribute.push(val[0].trim());
    //                    //}

    //                    Item.HeaderOfAttribute = ["Description"];
    //                    $scope.pos_SaleOrderBillDetaillst.push(Item);

    //                }
    //            })
    //        }
    //        $scope.pos_SalesOrderDetail = {};
    //        $scope.Mood = "Revise";
    //        $window.scrollTo(0, 0);

    //    });
    //}

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

        $scope.pos_SalesOrderDetail.VatPercentage = 0;
        $scope.pos_SalesOrderDetail.VatAmount = 0;

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
    //Add Item
    $scope.CategoryChange = function () {
        $scope.AllItemSearch = [];
        $scope.FirstAttributeList = [];
        $scope.ad_Item.ItemName = null;
        $scope.ad_Item.ItemDescription = null;
        //$scope.itemEntryNewForm.$setUntouched();
        //$scope.itemEntryNewForm.$setPristine();
    }

    $scope.ItemSearchTextChange = function (subCategoryId) {
        $scope.ad_Item.ItemDescription = null;
        var ItemSearchList = Enumerable.From($scope.ItemMainlist).Where("$.SubCategoryId==" + subCategoryId).ToArray();

        if ($scope.ad_Item.ItemName != undefined && $scope.ad_Item.ItemName != null && $scope.ad_Item.ItemName != "") {
            var SingleSearchItem = $scope.ad_Item.ItemName.split(" ");
            var SearchCriteria = "";
            myHilitor = new Hilitor2("SearchResults");
            myHilitor.remove();
            for (var i = 0; i < SingleSearchItem.length; i++) {
                myHilitor.setMatchType("open");
                if (SearchCriteria == "") {
                    SearchCriteria = "~($.ItemName).toUpperCase().indexOf('" + SingleSearchItem[i] + "'.toUpperCase())";
                } else {
                    SearchCriteria += " && ~($.ItemName).toUpperCase().indexOf('" + SingleSearchItem[i] + "'.toUpperCase())";
                }

                myHilitor.apply(SingleSearchItem[i]);
            }

            $scope.AllItemSearch = Enumerable.From(ItemSearchList).Where(SearchCriteria).Take(8).ToArray();
            $scope.ShowItemSearch = true;
        }
        else
            $scope.ShowItemSearch = false;

        var firstAttribute = Enumerable.From((Enumerable.From(ItemSearchList).Select("x => { FirstAttribute: x['FirstAttribute'] }").ToArray())).Distinct("$.FirstAttribute").ToArray();
        for (var i = 0; i < firstAttribute.length; i++) {
            var obj = {};
            obj.AttributeValue = firstAttribute[i].FirstAttribute;
            $scope.FirstAttributeList.push(obj);
        }
    }

    $scope.LoadAnItem = function (aItem) {
        $scope.ad_Item.ItemName = aItem.ItemName;
        $scope.ShowItemSearch = false;
        $scope.AllItemSearch = [];
        $('#txtFirstDescription').focus();
    }

    $scope.FirstDescriptionTextChange = function () {
        if ($scope.ad_Item.ItemDescription != undefined && $scope.ad_Item.ItemDescription != null && $scope.ad_Item.ItemDescription != "") {
            $scope.FirstAttributeSearch = Enumerable.From($scope.FirstAttributeList).Where("~($.AttributeValue).toUpperCase().indexOf('" + $scope.ad_Item.ItemDescription + "'.toUpperCase())").Take(8).ToArray();
            $scope.ShowFirstAttribute = true;
        }
        else
            $scope.ShowFirstAttribute = false;
    }

    $scope.LoadFirstAttributeValue = function (attributeValue) {
        $scope.ad_Item.ItemDescription = attributeValue;
        $scope.ShowFirstAttribute = false;
        $('#txtItemCode').focus();
    }

    $scope.CheckDuplicateBarcode = function () {
        var where = "ItemCode='" + $scope.ad_Item.ItemCode + "' ";
        if ($scope.ad_Item.ItemId > 0)
            where += "AND ItemId<>" + $scope.ad_Item.ItemId;
        $http({
            url: "/Item/GetItemSearchResult?searchCriteria=" + where,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                alertify.log($scope.ad_Item.ItemCode + ' Size Code already exists!', 'already', '5000');
                txtItemCode.focus();
                $scope.DuplicateBarcodeFound = true;
            } else {
                $scope.DuplicateBarcodeFound = false;
            }
        });
    };

    $scope.ItemCodeChange = function () {
        $scope.DuplicateBarcodeFound = true;
    };

   $scope.ItemUnitFilter = function (itemUnit) {
        return itemUnit.ItemUnitId > 1;
    };
    $scope.PackageUnitFilter = function (itemUnit) {
        return itemUnit.ItemUnitId > 1 || itemUnit.ItemUnitId > 2;
    };

   


     
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
    function GetAllItem() {
        $rootScope.ItemSearchListForSO = [];
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                if (aData.CategoryId != 4 || aData.CategoryId != 6) {
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
            });
            //

        });
    };
    //function GetAllItem() {
    //    $rootScope.ItemSearchList = [];
    //    $http({
    //        url: "/Item/GetAllItem",
    //        method: "GET",
    //        headers: { 'Content-Type': "application/json" }
    //    }).success(function (data) {
    //        $rootScope.ItemSearchList = data;

    //        angular.forEach($rootScope.ItemSearchList,
    //            function (aData) {
    //                aData.TempItemName = aData.ItemName +
    //                    " ~ " +
    //                    aData.ItemDescription +
    //                    " ~ " +
    //                    aData.ItemDescriptionTwo +
    //                    " ~ " + "Unit Per Package:" +
    //                    aData.UnitPerPackage +
    //                    " ~ " +
    //                    aData.HsCode +
    //                    " ~ " + "Size Code:" +
    //                    aData.ItemCode +
    //                    " ~ " + "Package Per Container:" +
    //                    aData.PackagePerContainer +
    //                    " ~ " + "Package Weight:" +
    //                    aData.PackageWeight +
    //                    " ~ " + "Container Weight:" +
    //                    aData.ContainerWeight +
    //                    " ~ " + "Item Id:" +
    //                    aData.ItemId;
    //            });
    //        
    //    });
    //};
    function loadItemDetails(aItem) {
        if (aItem != undefined && aItem != null) {
            $scope.pos_SalesOrderDetail.ItemDescription = aItem.ItemDescription;


            $scope.pos_SalesOrderDetail.ItemAddAttId = aItem.ItemId;
            $scope.aItem = aItem;
            $scope.ad_Item = aItem;
            $scope.ddlHsCode = { HsCodeId: $scope.ad_Item.HsCodeId };
            $scope.ddlMaterialType = { MaterialTypeId: $scope.ad_Item.MaterialTypeId };
            $scope.IsSelectItem = true;
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
            $('#itemNameRSO').select2('destroy');
            $('#itemNameRSO').val(aItem.ItemId).select2({
                placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
                templateResult: formatOutput,
                //theme: "classic",
                //dropdownAutoWidth: false
            });
            //loadItemDetails(aItem);
        } else {
            $('#itemNameRSO').select2('destroy');
            $('#itemNameRSO').val('').select2({
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
            $scope.pos_SalesOrderDetail.CanRemoveItem = true;
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

            $('#itemNameRSO').select2('destroy');
            $('#itemNameRSO').val('').select2({
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
            $scope.ddlMu = { ItemUnitId: 2, UnitName: 'Roll(s)' };

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
            //$scope.CanRemoveItem = false;
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
        
        $scope.CanRemoveItem = $scope.pos_SalesOrderDetail.CanRemoveItem;
        $scope.ddlMu = { ItemUnitId: AdditionalInfo.OrderUnitId };

        //$('#itemNameRSO').select2('destroy');
        //$('#itemNameRSO').val($scope.ad_Item.ItemId).select2();

        $('#itemNameRSO').select2('destroy');
        $('#itemNameRSO').val($scope.ad_Item.ItemId).select2({
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
    $scope.GetSalesOrderDetails = function (aSO) {
        if (aSO.DocStatus !== 'Draft') {
            alertify.log('This SO can not be modified', 'error', '2000');
            return;
        }
        $scope.btnSave = "Update";
        $scope.salesOrder = aSO;
        //if (aSO.Remarks != "") {
        //    $scope.salesOrder.IsNonSO = true;
        //}
        $scope.salesOrder.CurrentSalesOrderDate = aSO.SalesOrderDate;
        $scope.salesOrder.SalesOrderNo = aSO.SalesOrderNo.split('/')[2];
        $("#txtSalesOrderDate").val(aSO.SalesOrderDate);
        // $("#txtPoDate").val(aSO.PODate);
        // $scope.PODate = aSO.PODate;

        var res1 = aSO.DeliveryDate.substring(0, 5);
        if (res1 == "/Date") {
            var parsedDate1 = new Date(parseInt(aSO.DeliveryDate.substr(6)));
            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
            aSO.DeliveryDate = date1;
        }

        //if (aSO.PODate) {
        //    var res1 = aSO.PODate.substring(0, 5);
        //    if (res1 == "/Date") {
        //        var parsedDate1 = new Date(parseInt(aSO.PODate.substr(6)));
        //        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
        //        aSO.PODate = date1;
        //    }
        //}

        $scope.company.CompanyName = aSO.CompanyName;
        //GetEmpId();

        var obj = $scope.ddlCompany;
        $scope.ddlPriceTypeBy = { "PriceTypeId": aSO.PriceTypeId };
        //$scope.ddlPreparedBy = { "EmployeeId": aSO.PreparedById };
        setTimeout(function () {
            $("#ddlPreparedByRSO").select2().val(aSO.PreparedById);

        }, 0);
        var criteria = "[SOD].[SalesOrderId]=" + aSO.SalesOrderId;
        $http({
            url: '/SalesOrder/GetSalesOrderDetailDynamic?searchCriteria=' + criteria + "&orderBy='SalesOrderId'",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length) {

               

                $scope.pos_SalesOrderDetailAdAttributeLst = [];
                angular.forEach(data, function (aSoDetail) {
                    var res2 = aSoDetail.DueDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSoDetail.DueDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSoDetail.DueDate = date1;
                    }
                
                    $scope.pos_SalesOrderDetailAdAttributeLst.push(aSoDetail);
                })

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
            $scope.Mood = "Revise";
            $window.scrollTo(0, 0);

        });

    }

    $scope.LoadSalesOrder = function (password) {
        $window.scrollTo(0, 0);
        $scope.ddlItemNameAll = null;
        $('#itemNameRSO').select2('destroy');
        $('#itemNameRSO').val('').select2({
            placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
            templateResult: formatOutput,
            //theme: "classic",
            //dropdownAutoWidth: false
        });
        $scope.ad_Item = {};
        $scope.pos_SalesOrderDetail = {};
        $http({
            url: '/SalesOrder/pos_SalesOrderAmendment_GetForEdit?approvalType=SOAmendment&approvalPassword=' + password,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (aSO) {
            if (aSO.length > 0) {
                GetAllItem();
                $scope.btnSave = "Update";
                $scope.salesOrder = aSO[0];
                //if (aSO.Remarks != "") {
                //    $scope.salesOrder.IsNonSO = true;
                //}
                $scope.salesOrder.CurrentSalesOrderDate = aSO[0].SalesOrderDate;
                $scope.ConversionRate = $scope.salesOrder.ConversionRate;
                $scope.ddlCurrency = { CurrencyId: $scope.salesOrder.CurrencyId };
                $scope.ddlBrunch = { BranchId: $scope.salesOrder.FactoryId };
                //$scope.salesOrder.SalesOrderNo = aSO[0].SalesOrderNo.split('/')[2];
                

                var res1 = aSO[0].SalesOrderDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aSO[0].SalesOrderDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aSO[0].SalesOrderDate = date1;
                }

                $("#txtSalesOrderDate").val(aSO[0].SalesOrderDate);
                // $("#txtPoDate").val(aSO.PODate);
                // $scope.PODate = aSO.PODate;
                if (aSO[0].DeliveryDate) {
                    var res1 = aSO[0].DeliveryDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSO[0].DeliveryDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSO[0].DeliveryDate = date1;
                    }
                }
                

                //if (aSO[0].PODate) {
                //    var res1 = aSO[0].PODate.substring(0, 5);
                //    if (res1 == "/Date") {
                //        var parsedDate1 = new Date(parseInt(aSO[0].PODate.substr(6)));
                //        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                //        aSO[0].PODate = date1;
                //    }
                //}
                if (aSO[0].CurrentSalesOrderDate) {
                    var res1 = aSO[0].CurrentSalesOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSO[0].CurrentSalesOrderDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSO[0].CurrentSalesOrderDate = date1;
                    }
                }

                $scope.company.CompanyName = aSO[0].CompanyName;
                //GetEmpId();
                $scope.ddlCompany = Enumerable.From($rootScope.companyList).Where('$.CompanyId==' + aSO[0].CompanyId).FirstOrDefault();
                if ($scope.ddlCompany == undefined) {
                    $scope.ddlCompany = { CompanyId: aSO[0].CompanyId };
                }
                setTimeout(function () {
                    $("#companyNameRSO").select2({
                        theme: "classic",
                    }).val(aSO[0].CompanyId);

                }, 0);
                GetAllItem();
                
                //$scope.ddlPreparedBy = { "EmployeeId": aSO[0].PreparedById };
                $scope.ddlPreparedBy = Enumerable.From($scope.employeeList).Where('$.EmployeeId==' + aSO[0].PreparedById).FirstOrDefault();
                if ($scope.ddlPreparedBy == undefined) {
                    $scope.ddlPriceTypeBy = { "PriceTypeId": aSO[0].PriceTypeId };
                }
                
                //$("#ddlPreparedByRSO").select2('destroy');
                //$("#ddlPreparedByRSO").select2().val(aSO[0].PreparedById);

                setTimeout(function () {
                    $("#ddlPreparedByRSO").select2({
                        theme: "classic",
                    }).val(aSO[0].PreparedById).trigger("change");

                }, 0);
                var criteria = "[SOD].[SalesOrderId]=" + aSO[0].SalesOrderId + " AND [SOD].[IsVoid]=0";

                $http({
                    url: '/SalesOrder/GetSalesOrderDetailDynamic?searchCriteria=' + criteria + "&orderBy='SalesOrderId'",
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    if (data.length) {
                        $scope.CanRemoveItem = data[0].CanRemoveItem;
                        $scope.TotalAmount = 0;
                        $scope.TotalAmountBDT = 0;
                        $scope.TotalOrderQty = 0;
                        $scope.IsItemList = true;
                        $scope.pos_SalesOrderDetailAdAttributeLst = [];
                        angular.forEach(data, function (aSoDetail) {
                            if ( aSoDetail.DueDate != null ) {
                                var res2 = aSoDetail.DueDate.substring(0, 5);
                                if (res2 == "/Date") {
                                    var parsedDate1 = new Date(parseInt(aSoDetail.DueDate.substr(6)));
                                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                    aSoDetail.DueDate = date1;
                                }
                            } 
                           
                            //$('#BillingAddress3').val(aSoDetail.BillingAddress);
                           

                              $scope.stockList = [];
                              $scope.StockItemList = [];
                           

                                angular.forEach($scope.sockQtyWithRequestQty, function (aData) {

                                    //if (aSoDetail.ItemAddAttId == aData.ItemId) {
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
                });
                $http({
                    url: '/SalesOrder/GetPOReference?DocType=SO' + "&DocumentId=" + $scope.salesOrder.SalesOrderId,
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
                    $scope.Mood = "Revise";
                    $window.scrollTo(0, 0);

                });
            }
            else {
                alertify.log(' Password is not matched!', 'already', '5000');
                $('#textOtp').val('');
                $scope.reviseSalesOrderForm.$setUntouched();

            }

            
        });
    }

    $scope.remarkDisable = function () {
        if ($scope.salesOrder.ReferenceNo == "") {
            $scope.Disableremark = false;
        } else {
            $scope.Disableremark = true;
            $('#Remarks').val('');
        }
        
    }


    $scope.SelectFile = function (data) {


        $scope.PoAttachmentName = [];
        var incrementNumberOfImage = 0;
      
        $scope.MultiplePoFileUploadList = [];

        for (var i = 0; i < data.files.length; i++) {

            var fileSize = data.files[i].size;
            var file = Math.round((fileSize / 1024));
            var fileMb = parseFloat(file / 1024);
            if (fileMb <= 25.3) {

                $scope.PoAttachmentName.push(data.files[i].name);
                if (data.files.length > 0) {
                    incrementNumberOfImage = incrementNumberOfImage + 1;
                }
                $scope.FileSplitArray = data.files[i].name.split('.').pop();
                data.files[i].FileSplitArray = data.files[i].name.split('.').pop();
                data.files[i].num = incrementNumberOfImage;
                $scope.MultiplePoFileUploadList.push(data.files[i]);

            }
            else {

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
            const d = new Date();
            TempMiniteAndSecond = d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds();

            $scope.POReference.DocType = "SO";
            $scope.POReference.DocumentId = 0;
            var AttachmentName = [];
            var POList = [];
            var PoReplace = "";
            angular.forEach($scope.MultiplePoFileUploadList, function (aData) {

                PoReplace = $scope.POReference.PONo.replace(/[^\w\s]/gi, '_');

                //AttachmentName.push(PoReplace + "_" + $scope.TodayDate + '_' + aData.num + "." + aData.FileSplitArray);
                //POList.push(PoReplace + "_" + $scope.TodayDate + '_' + aData.num + "." + aData.FileSplitArray);
      
                //aData.PONo = PoReplace + "_" + $scope.TodayDate + '_' + aData.num + "." + aData.FileSplitArray;


                AttachmentName.push(PoReplace + "_" + $scope.TodayDate + '_' + TempMiniteAndSecond + '_' + aData.num + "." + aData.FileSplitArray);
                POList.push(PoReplace + "_" + $scope.TodayDate + '_' + TempMiniteAndSecond + '_' + aData.num + "." + aData.FileSplitArray);
                //PoFileUpload
                aData.PONo = PoReplace + "_" + $scope.TodayDate + '_' + TempMiniteAndSecond + '_' + aData.num + "." + aData.FileSplitArray;
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

    $scope.removePOReference = function (aPOReference) {
        var ind = $scope.POReferencelist.indexOf(aPOReference);
        $scope.POReferencelist.splice(ind, 1);
        $scope.POReference = {};
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
        angular.forEach($scope.pos_SalesOrderDetailAdAttributeLst, function (aData) {
            if (aData.ItemId == $scope.ad_Item.ItemId) {
                aData.PcPerRoll = $scope.ad_Item.PcPerRoll;
                aData.RollPerCarton = $scope.ad_Item.RollPerCarton;
                aData.RollWeight = $scope.ad_Item.RollWeight;
                aData.CartonWeight = $scope.ad_Item.CartonWeight;
                aData.CartonSize = $scope.ad_Item.CartonSize;
            }
        })
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
        var isUpdateImgHide = false;
        var result = confirm("Are you sure about removing this Attachment?");
        if (result) {


            if (PoObj.AttachmentName != null && PoObj.AttachmentName != undefined && PoObj.AttachmentName != '') {


                if (PoObj.AttachmentName != null && PoObj.AttachmentName != undefined && PoObj.AttachmentName != '') {

                    //for (var i = 0; i < $scope.POReferencelist.length; i++) {
                    //    var fileName = $scope.POReferencelist[i].AttachmentName;
                    deleteFile(PoObj.AttachmentName);

                    // }

                }

            }

            var ind = $scope.POReferencelist.indexOf(PoObj);
            $scope.POReferencelist.splice(ind, 1);
            $scope.POReference = {};
        }


    };



}).factory('POFileService', function ($http, $q) { // explained abour controller and service in part 2

    var fac = {};
    fac.UploadFile = function (file) {
        console.log('', file);
        if (file != undefined) {
            var formData = new FormData();
            formData.append("file", file);
            var defer = $q.defer();
            console.log('File Saver', file);


            $http.post("/SalesOrder/SavePOFiles?PONo=" + file.PONo, formData,
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


    }

    return fac;

});

app.directive('salesOrderReviseDirective', [function () {
    return {
        restrict: 'AE',
        //scope: {
        //    //data: '='
        //},
        controller: 'ReviseSalesOrderEntryController',
        link: function (scope, $scope, $rootScope, element, attrs) {

            scope.$on('updateItem', function (event, item, ItemSearchList) {
                $('#itemModal').modal('hide');
                //$rootScope.ItemSearchListForSO = ItemSearchList;
                setTimeout(function () {
                    $("#itemNameRSO").select2().val(item.ItemId).trigger("change");

                }, 0);
            });
            scope.$on('updateCompany', function (event, company, companyList) {
                $('#companyModal').modal('hide');
                $rootScope.companyList = companyList;

                if (company.IsNew == true) {

                    setTimeout(function () {
                        $("#companyNameRSO").select2().val(company.CompanyId).trigger("change");

                    }, 0);
                } else {
                    $scope.ddlCompany = { CompanyId: company.CompanyId }
                }



                scope.GetCompanyAddressRevise(company);
                scope.GetEmployeeByCompanyRevise1(company);
            });
        },
    };
}]);