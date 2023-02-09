

app.controller("PurchaseOrderEntryController", function ($scope, $rootScope, $cookieStore, $http, $window, $filter) {


    Clear();

    //#region function region
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Purchase Order').ScreenId;
        GetUsersPermissionDetails();

        
        //Server side pagination
        $scope.ProductBtn = 'Add';
        $scope.CompanyBtn = 'Edit';
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;


        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchPurchaseOrderAndSupplierName = '';
        $scope.SalesOrderType = '';
        $scope.ddlEmployee = "";

        $scope.TotalAmount = 0;
        $scope.TotalQuantity = 0;
        //GetPurchaseOrderPaged($scope.currentPage);
        $scope.PurchaseOrderDetail = {};
        $scope.ddlMu = { ItemUnitId: 2 };
        $scope.PurchaseOrderDetail.UnitId = 2;
        $scope.PurchaseOrderDetail.UnitName = 'Roll(s)';
        $scope.MaterialTypeList = [];
        $scope.ItemSearchList = [];
        $scope.ItemSearchListForSO = [];
        $scope.ItemAdditionalAttribute = {};
        $scope.PurchaseOrderDetailList = [];
        $scope.Branchlist = [];
        $scope.AmountDetail = 0;
        $scope.PurchaseOrder = {};
        $scope.SalesOrderTypeList = ["Local", "Export"];
        $scope.supplierlist = [];
        $scope.SupplierAddressList = [];
        $scope.VoidList = [];
        $scope.PurchaseOrder.SalesOrderType = "Export";
        $scope.PurchaseOrder.CurrencyType = "USD";
        $scope.ddlCurrency = { CurrencyId: 2 };
        $scope.PurchaseOrder.CurrencyId = 2;
        $scope.PurchaseOrder.AdditionalDiscount = 0;
        $scope.PurchaseOrder.AmountAfterDiscount = 0;
        $scope.SalesOrderList = [];
        $scope.SalesOrderType = null;
        $scope.ddlPreparedBy = null;
        $scope.ddlSupplier = null;
        
        $scope.PurchaseOrder.POId = 0;
        $scope.AddProductLbl = 'Add';
        $scope.BtnColor = 'customBtn custmoBtnReset';
        $scope.ddlMu = { ItemUnitId: 2 };
        $scope.ddlCategory = { CategoryId: 4 };
        $scope.PurchaseOrderDetail.CategoryId = 4;
        $scope.btnSave = 'Save';
        GetSupplierType();
        GetAllCategory();
        GetAllItem();
        GetAllEmployee();
        GetAllItemUnit();
        GetAllBranch();
        GetMaterialType();
        GetAllMaterialsDemand();

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.UserData = JSON.parse(sessionStorage.UserDataSession);
            $scope.FullName = $scope.UserData.FullName;
        }


        $scope.PurchaseOrder.PreparedById = $scope.UserData.EmployeeId;

        //$scope.FromDate = $filter('date')(new Date().toJSON().slice(0, 10), 'yyyy-MM-dd');
        //$scope.ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'yyyy-MM-dd');


        $scope.PurchaseOrder.PODate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetPurchaseOrderNo();

        $scope.TermsAndConditionForLocal =
            `<ol>
                <li>Supply products must be as per the approved sample by our QC/Store Department.</li>
                <li>Supply quantity should not exceed order quantity.</li>
                <li>Bill will be submitted in duplicate along with original Challan and P.O copy within Five (5) working days to our head office.</li>
                <li>Delivery will be made to our factory or Head office as instructed by the concern office between 9.00 am to 5.00 pm (working hour).</li>
                <li>VAT & TAX will be applied as per Govt. rule <b>& Mushak - 6.3</b> to be issued under our VAT Reg. No. as above.</li>
                <li>Payment will be made within Thirty (30) days after receiving the G.R.N from the site to store department by account payee cheque.</li>
                <li>Supply products should be in standard pack.</li>
                <li>RTL reserves the right to reject or cancel the purchase order without assigning any reason at any time.</li>
            </ol>`;

        $scope.TermsAndConditionForImport =
            `
                <span>SHIPPING TERMS CONDITIONS</span><br/><br/>
                <span>PAYMENT TERM &emsp;&emsp;&ensp;LC AT SIGHT</span><br/>
                <span>PHIPMENT &emsp;&emsp;&emsp;&emsp;&ensp;BY SEA</span><br/>
                <span>TRADE TERM&emsp;&emsp;&emsp;&emsp;FOB, SINGAPORE</span><br/>
                <span>DELIVERY LID TIME &emsp;&nbsp;WITHIN 7 WORKING DAYS AFTER RECEIVING LC</span><br/>
                <br/>
                <br/>
                <span>OTHER CONDITIONS</span>
                <br/>
                <br/>
                <span>QUANTITY AND VALUE MAY DIFFER + / - 10 % OF TOTAL QUANTITY AND VALUE OF PI</span><br/>
                <span>PLEASE MENTION PORT OF LOADING, COUNTRY OF ORIGIN IN IP</span>
            `;
        /*$(".summernote").summernote("code", $scope.PurchaseOrder.TermsAndCondition);*/

        $scope.AppNotificationSetupList = [];
        GetAppNotificationSetupByReportCode();
    }
    function SupplierTypeChange(SupplierTypeId) {
        if (SupplierTypeId == 1) {
            $scope.PurchaseOrder.TermsAndCondition = $scope.TermsAndConditionForLocal;
            $(".summernote").summernote("code", $scope.PurchaseOrder.TermsAndCondition);
        } else if (SupplierTypeId == 2) {
            $scope.PurchaseOrder.TermsAndCondition = $scope.TermsAndConditionForImport;
            $(".summernote").summernote("code", $scope.PurchaseOrder.TermsAndCondition);
        }
    }
    $scope.SupplierTypeChange = function (SupplierTypeId) {
        SupplierTypeChange(SupplierTypeId);
    }
    function formatOutput(optionElement) {
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
    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'PO',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(PurchaseOrder, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];
        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle
            obj.NotificationDetail = 'Purchase Order No: ' + PurchaseOrder.PONo + ' Supplier Name: ' + PurchaseOrder.SupplierName + ' Prepared By: ' + $scope.FullName;
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
    function GetSupplierType() {
        $http({
            url: '/Supplier/GetAllSupplerType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        ).success(function (data) {
            $scope.supplierTypeList = data;

            if ($scope.LocalViewPermission) {
                $scope.ddlSupplierType = { SupplierTypeId: 1 };
                SupplierTypeChange($scope.ddlSupplierType.SupplierTypeId);
                GetSupplier($scope.ddlSupplierType.SupplierTypeId);
            } else if ($scope.ImportViewPermission) {
                $scope.ddlSupplierType = { SupplierTypeId: 2 };
                SupplierTypeChange($scope.ddlSupplierType.SupplierTypeId);
                GetSupplier($scope.ddlSupplierType.SupplierTypeId);
            }

            

        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
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

    function GetAllItem() {
        $scope.ItemSearchListForSO = [];
        $scope.AllCombinationlist = [];
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            
            angular.forEach(data, function (aData) {
                aData.TempItemName = aData.ItemName
                    +
                    " ~ " +
                    aData.ItemDescription +
                    " ~ " + "Size Code: " +
                    aData.ItemCode +
                    " ~ " + "Sub Category: " +
                    aData.SubCategoryName;
                $scope.AllCombinationlist.push(aData)
            })

            angular.forEach($scope.AllCombinationlist, function (aCombination) {
                if (aCombination.CategoryId == $scope.PurchaseOrderDetail.CategoryId) {
                    $scope.ItemSearchListForSO.push(aCombination);
                }

            });
            if ($scope.AddProductLbl == 'Update') {
                $('#itemNameSO').select2('destroy');
                $('#itemNameSO').val($scope.PurchaseOrderDetail.ItemId).select2({
                    placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
                    templateResult: formatOutput,
                    theme: "classic",
                    dropdownAutoWidth: false
                });
                $scope.ddlItemNameAll = { ItemId: $scope.PurchaseOrderDetail.ItemId };
            }
            
        });
    };
    $scope.CheckPurchaseTypeFlag = function (aCategory) {
        $scope.ItemSearchListForSO = [];
        $scope.PurchaseOrderDetail = {};
        $scope.ddlItemNameAll = null;
        $scope.ddlMaterialType = null;
        $('#MaterialType1').select2('destroy');
        $('#MaterialType1').val('').select2({
            placeholder: "--Material  Type--",
            theme: "classic",
        });
        $scope.ddlMu = { ItemUnitId: 2 };
        $scope.PurchaseOrderDetail.UnitId = 2;
        $scope.PurchaseOrderDetail.UnitName = 'Roll(s)';
        angular.forEach($scope.AllCombinationlist, function (aCombination) {
            if (aCombination.CategoryId == aCategory.CategoryId) {
                $scope.ItemSearchListForSO.push(aCombination);
            }
        });
    }
    $scope.GetSupplierAddressBySupplierId = function (SupplierId) {

        $http({
            url: '/Supplier/GetSupplerAddressById?SupplierId=' + SupplierId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierAddressList = data;
            if ($scope.btnSave == 'Update') {
                $scope.ddlSupplierAddress = { AddressId: $scope.PurchaseOrder.SupplierAddressId };
            }
        });
      
    }


    function ListClear() {
        $scope.ProductBtn = 'Add';
        $scope.AddProductLbl = 'Add';
        $scope.BtnColor = 'customBtn custmoBtnReset';
        $scope.PurchaseOrderDetail = {};
        $scope.ddlItemNameAll = null;
        $scope.ddlMu = { ItemUnitId: 2 };
        $scope.PurchaseOrderDetail.UnitId = 2
        $scope.PurchaseOrderDetail.UnitName = 'Roll(s)';
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


    }
    $scope.resetTerms = function () {
        $(".summernote").summernote("reset");
        $(".summernote").summernote("code", $scope.PurchaseOrder.TermsAndCondition);
    };
    function GetAllBranch() {
        $http({
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //$scope.Branchlist = Enumerable.From(data).Where(function (x) {
            //    //return (x.BranchId == 2 || x.BranchId == 3);
            //    return (x.BranchId != 1);
            //}).ToArray();

            $scope.Branchlist = data;

        });

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

    $("#txtPODate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.CalendartxtPODate = function () {
        $("#txtPODate").focus();
        //$("#txtPODate").trigger("click");
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


    function GetPurchaseOrderNo() {
        $http({
            url: '/PurchaseOrder/GetPurchaseOrderNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxPONo = data;
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
                $scope.PurchaseOrder.PONo = 'PO/' + $scope.finYearHeadOffice + '/' + $scope.MaxPONo;
            });

        });
    }
    $scope.MatrialDemandList = [];

    function GetAllMaterialsDemand() {

        $http({
            url: '/PurchaseBill/GetAllMaterialsDemandNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MatrialDemandList = data;
            
        });
    }

    function GetSupplier(SupplierTypeId) {
        $scope.supplierlist = [];
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                if (aData.SupplierTypeId == SupplierTypeId) {
                    $scope.supplierlist.push(aData);
                }

            })
            if ($scope.btnSave == 'Update') {
                setTimeout(function () {
                    $("#ddlSupplier").select2({
                        theme: "classic",
                    }).val($scope.PurchaseOrder.SupplierId).trigger("change");
                }, 0);
            }
            


        })
    }
    $scope.GetSupplier = function (SupplierTypeId) {
        GetSupplier(SupplierTypeId);
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
        $scope.CheckedPermission = false;
        $scope.ListViewPermission = false;
        $scope.LocalViewPermission = false;
        $scope.ImportViewPermission = false;
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
                else if (aPermissionDetails.FunctionName == 'Checked') {
                    $scope.CheckedPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'LocalView') {
                    $scope.LocalViewPermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'ImportView') {
                    $scope.ImportViewPermission = aPermissionDetails.CanExecute;
                }
            });
            GetPurchaseOrderPaged(1);
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

            $scope.PurchaseOrder.PreparedById = $scope.UserData.EmployeeId;

        });
    }


    $scope.OpenReport = function (POId, IsLocal) {
        if (IsLocal == true) {
            $window.open("#/PurchaseOrderReport", "popup", "width=800,height=550,left=280,top=80");
        } else {
            $window.open("#/ImportPurchaseOrderReport", "popup", "width=800,height=550,left=280,top=80");
        }
        //$window.open("#/ImportPurchaseOrderReport", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("POId", POId);
        event.stopPropagation();
    };





    $scope.SavePurchaseOrder = function () {
        angular.forEach($scope.PurchaseOrderDetailList, function (aPO) {
            if (isNaN(parseFloat(aPO.UnitPrice)) || !isFinite(aPO.UnitPrice)) {
                alertify.log('Enter correct price for ' + aPO.Combination, 'error', '5000');
                return;
            }
        })

       

        if ($scope.PurchaseOrder.POId == 0 && $scope.CreatePermission) {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    SaveOrder('Saved');
                }
            })
        }
        else if ($scope.PurchaseOrder.POId == 0 && !$scope.CreatePermission) {
            alertify.log('You do not have permission to save!', 'error', '5000');
        }
        else if ($scope.PurchaseOrder.POId > 0 && $scope.RevisePermission) {
            alertify.confirm("Are you sure to update?", function (e) {
                if (e) {
                    SaveOrder('Revised');
                }
            })
        }
        else if ($scope.PurchaseOrder.POId > 0 && !$scope.RevisePermission) {
            alertify.log('You do not have permission to Update!', 'error', '5000');
        }


    }

    $scope.CheckPurchaseOrder = function () {
        angular.forEach($scope.PurchaseOrderDetailList, function (aPO) {
            if (isNaN(parseFloat(aPO.UnitPrice)) || !isFinite(aPO.UnitPrice)) {
                alertify.log('Enter correct price for ' + aPO.Combination, 'error', '5000');
                return;
            }
        })

       

        if ($scope.PurchaseOrder.POId == 0 && $scope.CreatePermission) {
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    SaveOrder('Saved');
                }
            })
        }
        else if ($scope.PurchaseOrder.POId == 0 && !$scope.CreatePermission) {
            alertify.log('You do not have permission to save!', 'error', '5000');
        }
        else if ($scope.PurchaseOrder.POId > 0 && $scope.RevisePermission) {
            alertify.confirm("Are you sure to update?", function (e) {
                if (e) {
                    $scope.PurchaseOrder.IsChecked = true;
                    $scope.PurchaseOrder.CheckedBy = $scope.UserData.EmployeeId;
                    SaveOrder('Revised');
                }
            })
        }
        else if ($scope.PurchaseOrder.POId > 0 && !$scope.RevisePermission) {
            alertify.log('You do not have permission to Update!', 'error', '5000');
        }


    }




    $scope.resetForm = function () {
        $scope.Mood = "";
        Clear();
        $scope.ddlItemNameAll = null;
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
                    var res1 = aSd.PODate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.PODate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aSd.PODate = date1;
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
            if (angular.isUndefined($scope.PurchaseOrderDetail.UnitPrice) || $scope.PurchaseOrderDetail.UnitPrice == null) {
                if ($("#txtPrice").val() === "" && event.data === ".")
                    return;
                else
                    $scope.PurchaseOrderDetail.UnitPrice = 0;
                $scope.PurchaseOrderDetail.Amount = 0;
            }
            else
                $scope.AmountDetail = 0;
            $scope.PurchaseOrderDetail.Amount = 0;
            $scope.AmountDetail = ($scope.PurchaseOrderDetail.UnitPrice) * ($scope.PurchaseOrderDetail.Quantity);
            $scope.PurchaseOrderDetail.Amount = parseFloat($scope.AmountDetail.toFixed(6));

            $scope.PurchaseOrderDetail.VATPercentage = 0;
            $scope.PurchaseOrderDetail.VATAmount = 0;

        }  
    }
    $scope.priceOrAmountChangeForQty = function () {
        if (angular.isUndefined($scope.PurchaseOrderDetail.UnitPrice) || $scope.PurchaseOrderDetail.UnitPrice == null) {
            if ($("#txtPrice").val() === "" && event.data === ".")
                return;

            $scope.PurchaseOrderDetail.Amount = 0;
        } else
            $scope.AmountDetail = 0;
        $scope.PurchaseOrderDetail.Amount = 0;
        $scope.AmountDetail = ($scope.PurchaseOrderDetail.UnitPrice) * ($scope.PurchaseOrderDetail.Quantity);
        $scope.PurchaseOrderDetail.Amount = parseFloat($scope.AmountDetail.toFixed(6));

        $scope.PurchaseOrderDetail.VATPercentage = 0;
        $scope.PurchaseOrderDetail.VATAmount = 0;

    }
    $scope.priceChangeForAmount = function () {
        $scope.UnitPrice = $scope.PurchaseOrderDetail.Amount / $scope.PurchaseOrderDetail.Quantity;
        $scope.PurchaseOrderDetail.UnitPrice = parseFloat($scope.UnitPrice.toFixed(6));

    }
    $scope.VatAmountCalculetion = function () {
        $scope.PurchaseOrderDetail.Amount = 0;
        $scope.AmountDetail = ($scope.PurchaseOrderDetail.UnitPrice) * ($scope.PurchaseOrderDetail.Quantity);
        $scope.PurchaseOrderDetail.VATAmount = parseFloat((($scope.AmountDetail * $scope.PurchaseOrderDetail.VATPercentage) / 100).toFixed(6));
        if (isNaN($scope.PurchaseOrderDetail.VATAmount) || $scope.PurchaseOrderDetail.VATAmount == undefined || $scope.PurchaseOrderDetail.VATAmount == null || $scope.PurchaseOrderDetail.VATAmount == '') {
            $scope.PurchaseOrderDetail.VATAmount = 0;
        }
        $scope.PurchaseOrderDetail.Amount = parseFloat($scope.AmountDetail.toFixed(6)) + parseFloat($scope.PurchaseOrderDetail.VATAmount.toFixed(6));

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

            $scope.PurchaseOrderDetail.ItemName = aItem.ItemName;
            $scope.PurchaseOrderDetail.ItemDescription = aItem.ItemDescription;
            $scope.PurchaseOrderDetail.ItemDescriptionTwo = aItem.ItemDescriptionTwo;
            $scope.PurchaseOrderDetail.ItemCode = aItem.ItemCode;
        } else {
            $('#itemNameSO').select2('destroy');
            $('#itemNameSO').val('').select2({
                placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
                templateResult: formatOutput,
                //theme: "classic",
                //dropdownAutoWidth: false
            });
            $scope.PurchaseOrderDetail.UnitPrice = null;
            return;
        }
    }

    $scope.RemoveItemAttr = function (aDetail) {
        var index = $scope.PurchaseOrderDetailList.indexOf(aDetail);
        $scope.TotalQuantity -= aDetail.Quantity;
        $scope.TotalAmount -= parseFloat(aDetail.Amount);
        $scope.PurchaseOrderDetailList.splice(index, 1);
        $scope.PurchaseOrder.AmountAfterDiscount = $scope.TotalAmount - $scope.PurchaseOrder.AdditionalDiscount;

        if (aDetail.SalesOrderDetailId != undefined) {
            $scope.VoidList.push(aDetail);
        }
    }
    $scope.AddSalesOrderDetail = function (AddProductLbl) {
        if (AddProductLbl == 'Add') {
            if ($scope.ddlItemNameAll.CategoryId != 2) {
                if ($scope.PurchaseOrderDetail.MaterialTypeId == null || $scope.PurchaseOrderDetail.MaterialTypeId == undefined || $scope.PurchaseOrderDetail.MaterialTypeId == 0) {
                    alertify.log('Please Select Material Type!!!', 'error', '5000');
                    return;
                }
            }
            $scope.Amount = $scope.PurchaseOrderDetail.Amount;
            $scope.TotalAmount += Number($scope.Amount);
            $scope.TotalQuantity += $scope.PurchaseOrderDetail.Quantity;
            $scope.PurchaseOrderDetailList.push($scope.PurchaseOrderDetail);
            $scope.PurchaseOrder.AmountAfterDiscount = $scope.TotalAmount - $scope.PurchaseOrder.AdditionalDiscount;

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
            
            $scope.ddlMu = { ItemUnitId: 2 };
            $scope.ddlItemName = null;
            $scope.PurchaseOrderDetail = {};
            $scope.PurchaseOrderDetail.UnitId = 2;
            $scope.PurchaseOrderDetail.UnitName = 'Roll(s)';
            $scope.PurchaseOrder.AdditionalDiscount = 0;
        } else {
            $scope.AmountCalculation();
            ListClear();
        }

    }

    $scope.SelAdditionalInfo = function (AdditionalInfo) {
        $scope.AddProductLbl = 'Update';
        $scope.BtnColor = 'customBtn custmoBtnSearch';
        $scope.PurchaseOrderDetail = AdditionalInfo;

        $scope.ddlMu = { ItemUnitId: AdditionalInfo.UnitId };
        $scope.PurchaseOrderDetail.UnitId = AdditionalInfo.UnitId;
        $scope.PurchaseOrderDetail.UnitName = AdditionalInfo.UnitName;
        //$('#itemNameSO').select2('destroy');
        //$('#itemNameSO').val(AdditionalInfo.ItemId).select2({
        //    placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
        //    templateResult: formatOutput,
        //    theme: "classic",
        //    dropdownAutoWidth: false
        //});
        //$scope.ddlItemNameAll = AdditionalInfo;
        $scope.ddlCategory = { CategoryId: $scope.PurchaseOrderDetail.CategoryId };
        GetAllItem();
        
        $scope.ddlMaterialType = { MaterialTypeId: AdditionalInfo.MaterialTypeId };
        setTimeout(function () {
            $("#MaterialType1").select2().val(AdditionalInfo.MaterialTypeId).trigger("change");
        }, 0);

       
    }
    $scope.AmountCalculation = function () {
        $scope.Amount = 0;
        $scope.TotalAmount = 0;
        $scope.PurchaseOrder.AmountAfterDiscount = 0;
        $scope.CPTCostBDT = 0;
        $scope.TotalQuantity = 0;

        angular.forEach($scope.PurchaseOrderDetailList, function (aData) {
            $scope.Amount = aData.Amount;
            $scope.TotalAmount += Number($scope.Amount);
            $scope.TotalQuantity += aData.Quantity;

        })
        $scope.PurchaseOrder.AmountAfterDiscount = $scope.TotalAmount - $scope.PurchaseOrder.AdditionalDiscount;
    }


    $scope.reloadBtn = function () {
        $('#txtFromDateForSO').val('');
        $('#txtToDateForSO').val('');
        $('#textPurchaseOrderNoAndSupplier').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchPurchaseOrderAndSupplierName = '';
        $scope.SalesOrderType = '';
        $scope.ddlEmployee = '';
        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').val('').select2({
            placeholder: "Search for: Prepared By",
            //theme: "classic",
            //dropdownAutoWidth: false
        });

        GetPurchaseOrderPaged(1);
    }

    $scope.PurchaseOrderSearch = function () {
        GetPurchaseOrderPaged(1);

    }

    function GetPurchaseOrderPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        //var SearchCriteria = "";
        //var SearchCriteria2 = "";

        


        //if ($scope.SearchPurchaseOrderAndSupplierName != undefined && $scope.SearchPurchaseOrderAndSupplierName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria += "([PODate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([PONo] LIKE '%" + $scope.SearchPurchaseOrderAndSupplierName + "%' OR [ManualPONo] LIKE '%" + $scope.SearchPurchaseOrderAndSupplierName + "%' OR [SupplierName] LIKE '%" + $scope.SearchPurchaseOrderAndSupplierName + "%')";

        //}
        //else if ($scope.SearchPurchaseOrderAndSupplierName !== undefined && $scope.SearchPurchaseOrderAndSupplierName != null && $scope.SearchPurchaseOrderAndSupplierName != "") {
        //    SearchCriteria += "[PONo] LIKE '%" + $scope.SearchPurchaseOrderAndSupplierName + "%' OR [ManualPONo] LIKE '%" + $scope.SearchPurchaseOrderAndSupplierName + "%' OR [SupplierName] LIKE '%" + $scope.SearchPurchaseOrderAndSupplierName + "%'";

        //}
        //else if ($scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria += "[PODate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        //}



        var FullSearchCriteria = "";
        var SearchCriteria = "";
        var SearchCriteria1 = "";
        var SearchCriteria2 = "";

        if ($scope.LocalViewPermission) {
            SearchCriteria = "IsLocal = 1";
        } else if ($scope.ImportViewPermission) {
            SearchCriteria = "IsLocal = 0";
        }

        if ($scope.LocalViewPermission && $scope.ImportViewPermission) {
            SearchCriteria = "";
        }

        SearchCriteria1 = $scope.SearchPurchaseOrderAndSupplierName != "" ? "([PONo] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%' OR [SupplierName] LIKE '%" + $scope.SearchSalesOrderAndCompanyName + "%' OR [ManualPONo] LIKE '%" + $scope.SearchPurchaseOrderAndSupplierName + "%')" : "";
        SearchCriteria2 = $scope.FromDate != "" && $scope.ToDate != "" ? "([PODate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')" : "";

        FullSearchCriteria = (SearchCriteria == "" ? "" : (' AND ' + SearchCriteria)) + (SearchCriteria1 == "" ? "" : (' AND ' + SearchCriteria1)) + (SearchCriteria2 == "" ? "" : (' AND ' + SearchCriteria2));

        FullSearchCriteria = FullSearchCriteria.substring(5);




        $http({
            url: encodeURI('/PurchaseOrder/GetPurchaseOrderPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + FullSearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data != "") {
                if (data.ListData.length > 0) {
                    angular.forEach(data.ListData, function (aSd) {
                        if (aSd.PODate) {
                            var res1 = aSd.PODate.substring(0, 5);
                            if (res1 == "/Date") {
                                var parsedDate1 = new Date(parseInt(aSd.PODate.substr(6)));
                                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                aSd.PODate = date1;

                            }
                        }
                        if (aSd.DeliveryDate) {
                            var res1 = aSd.DeliveryDate.substring(0, 5);
                            if (res1 == "/Date") {
                                var parsedDate1 = new Date(parseInt(aSd.DeliveryDate.substr(6)));
                                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                aSd.DeliveryDate = date1;

                            }
                        }
                       
                        
                        if (aSd.IsLocal) aSd.Type = 'Local'; else aSd.Type = 'Import';
                    })

                }
                else {
                    $scope.PurchaseOrderListPaged = [];
                    alertify.log('Purchase Order  Not Found', 'error', '5000');

                }
            }

            $scope.PurchaseOrderListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;

        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPurchaseOrderPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPurchaseOrderPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPurchaseOrderPaged($scope.currentPage);
        }
        //  }


    }


    $scope.GetPurchaseOrderDetails = function (aPO) {

        $scope.ddlItemNameAll = null;
        $('#itemNameSO').select2('destroy');
        $('#itemNameSO').val('').select2({
            placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
            templateResult: formatOutput,
            //theme: "classic",
            //dropdownAutoWidth: false
        });
        $scope.PurchaseOrderDetail = {};
        $scope.btnSave = "Update";
        $scope.PurchaseOrder = aPO;

        $scope.PurchaseOrder.CurrentPODate = aPO.PODate;
        $scope.ddlBrunch = { BranchId: $scope.PurchaseOrder.BranchId };
        if ($scope.PurchaseOrder.IsLocal) {
            $scope.ddlSupplierType = { SupplierTypeId: 1 };
        } else {
            $scope.ddlSupplierType = { SupplierTypeId: 2 };
        }
        GetSupplier($scope.ddlSupplierType.SupplierTypeId)
        /*$scope.ddlSupplierAddress = { AddressId: $scope.PurchaseOrder.SupplierAddressId };*/
        $(".summernote").summernote("code", $scope.PurchaseOrder.TermsAndCondition);
        $("#txtPODate").val(aPO.PODate);

        if (aPO.DeliveryDate) {
            var res1 = aPO.DeliveryDate.substring(0, 5);
            if (res1 == "/Date") {
                var parsedDate1 = new Date(parseInt(aPO.DeliveryDate.substr(6)));
                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                aPO.DeliveryDate = date1;
            }
        }

        //setTimeout(function () {
        //    $("#ddlSupplier").select2({
        //        theme: "classic",
        //    }).val(aPO.SupplierId).trigger("change");
        //}, 0);

        setTimeout(function () {
            $("#ddlMaterialsDemand").select2().val(aPO.MaterialsDemandId).trigger("change");

        }, 0);



        GetAllItem();
        $scope.ddlPriceTypeBy = { "PriceTypeId": aPO.PriceTypeId };
        $scope.ddlPreparedBy = Enumerable.From($scope.employeeList).Where('$.EmployeeId==' + aPO.PreparedById).FirstOrDefault();
        if ($scope.ddlPreparedBy == undefined) {
            $scope.ddlPreparedBy = { "EmployeeId": aPO.PreparedById };
        }

        setTimeout(function () {
            $("#ddlPreparedBySO").select2({
                theme: "classic",
            }).val(aPO.PreparedById).trigger("change");

        }, 0);

        var criteria = "POD.[POId]= " + aPO.POId + " AND POD.[IsVoid]= 0";
        $http({
            url: '/PurchaseOrder/GetPurchaseOrderDetailDynamic?searchCriteria=' + criteria + "&orderBy=POD.PODetailId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length) {



                $scope.TotalAmount = 0;
                $scope.TotalQuantity = 0;
                $scope.PurchaseOrderDetailList = [];
                angular.forEach(data, function (aSoDetail) {
                    $scope.Amount = aSoDetail.Amount;
                    $scope.TotalAmount += Number($scope.Amount);
                    $scope.TotalQuantity += aSoDetail.Quantity;

                   

                    $scope.PurchaseOrderDetailList.push(aSoDetail);
                })
                $scope.PurchaseOrder.AmountAfterDiscount = $scope.TotalAmount - $scope.PurchaseOrder.AdditionalDiscount;
            }

        });
        $scope.Mood = "Edit";
        $window.scrollTo(0, 0);
    }

    function SaveOrder(status) {
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.PurchaseOrder.CreatorId = $scope.UserId;
        $scope.PurchaseOrder.UpdatorId = $scope.UserId;
        //$scope.PurchaseOrder.Amount = $scope.TotalAmount;
        $scope.PurchaseOrder.Amount = 0;
        $scope.PurchaseOrder.TotalVAT = 0;
        var TermsAndCondition = $(".summernote").summernote("code");
        $scope.PurchaseOrder.TermsAndCondition = TermsAndCondition;


        /*$scope.PurchaseOrder.AdditionalInfo = $('#AdditionalInfo').val();*/

        angular.forEach($scope.PurchaseOrderDetailList, function (aData) {
            $scope.PurchaseOrder.TotalVAT += aData.VATAmount;
            $scope.PurchaseOrder.Amount += (aData.Quantity * aData.UnitPrice);
        })
        if ($scope.ddlSupplierType.SupplierTypeId == 1) {
            $scope.PurchaseOrder.IsLocal = true;
        } else {
            $scope.PurchaseOrder.IsLocal = false;
        }
        //if ($scope.PurchaseOrder.POId == 0) {

            var parms = JSON.stringify({ PurchaseOrder: $scope.PurchaseOrder, PurchaseOrderDetailList: $scope.PurchaseOrderDetailList, VoidList: $scope.VoidList });
        $http.post('/PurchaseOrder/Save', parms).success(function (data) {
            if (data != '') {
                AppNotificationLogPost($scope.PurchaseOrder, 'Purchase Order Created!');
                    var SoIdsAndNo = data.split(",");
                    var soNo = SoIdsAndNo[1];

                    Clear();
                    $('#ddlPreparedBySO').select2('destroy');
                    $('#ddlPreparedBySO').val('').select2({
                        placeholder: "Search for: Prepared By",
                        theme: "classic",
                        dropdownAutoWidth: false
                    });
                    $('#ddlSupplier').select2('destroy');
                    $('#ddlSupplier').val('').select2({
                        placeholder: "Search for: Supplier Name",
                        theme: "classic",
                        dropdownAutoWidth: false
                    });
                    $('#ddlMaterialsDemand').select2('destroy');
                    $('#ddlMaterialsDemand').val('').select2({
                        placeholder: "Search for: Materials Demand No",
                        theme: "classic",
                        dropdownAutoWidth: false
                    });
                    $scope.ddlSupplierType = null;
                    $scope.ddlItemNameAll = null;
                    $('#itemNameSO').select2('destroy');
                    $('#itemNameSO').val('').select2({
                        placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
                        templateResult: formatOutput,
                        //theme: "classic",
                        //dropdownAutoWidth: false
                    });
                    alertify.log('Purchase Order No: ' + soNo + ' ' + status + ' Successfully!', 'success', '5000');
                    $scope.PurchaseOrderEntryForm.$setPristine();
                    $scope.PurchaseOrderEntryForm.$setUntouched();


                } else {
                    alertify.log('Server Errors!', 'error', '5000');
                }
            }).error(function (data) {
                alertify.log('Server Errors!', 'error', '5000');
            });
        //}
        //else {
        //    var parms = JSON.stringify({ PurchaseOrder: $scope.PurchaseOrder, PurchaseOrderDetailList: $scope.PurchaseOrderDetailList, VoidList: $scope.VoidList });

        //    $http.post('/SalesOrder/Save', parms).success(function (data) {

        //        var SoIdsAndNo = data.split(",");
        //        var soIds = SoIdsAndNo[0];
        //        var soId = Number(soIds);
        //        var soNo = SoIdsAndNo[1];

        //        Clear();
        //        if (data != '') {
        //            $('#ddlPreparedBySO').select2('destroy');
        //            $('#ddlPreparedBySO').val('').select2({
        //                placeholder: "Search for: Prepared By",
        //                theme: "classic",
        //                dropdownAutoWidth: false
        //            });
        //            $('#ddlSupplier').select2('destroy');
        //            $('#ddlSupplier').val('').select2({
        //                placeholder: "Search for: Supplier Name",
        //                theme: "classic",
        //                dropdownAutoWidth: false
        //            });


        //            alertify.log('Sales Order No: ' + soNo + ' ' + status + ' Successfully!', 'success', '5000');
        //            $scope.PurchaseOrderEntryForm.$setPristine();
        //            $scope.PurchaseOrderEntryForm.$setUntouched();


        //        } else {
        //            alertify.log('Server Errors!', 'error', '5000');
        //        }
        //    }).error(function (data) {
        //        alertify.log('Server Errors!', 'error', '5000');
        //    });
        //}

       

    }




})


