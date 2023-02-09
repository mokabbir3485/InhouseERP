app.controller("ManualSalesInvoiceController", function ($scope, $rootScope,$cookieStore, $http, $window, $filter) {
    Clear();


    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Manual Sales Invoice').ScreenId;
        GetUsersPermissionDetails();

        $scope.UserId = $scope.LoginUser.UserId;
       // $scope.ScreenId = parseInt(sessionStorage.getItem("ManualSalesInvoiceScreenId"));
        $scope.ddlCompany = null;
        $scope.ddlSalesOrder = null;
        $scope.Total = 0;
        $scope.TotalAmount = 0;
        $scope.TotalQuantity = 0;
        $scope.TotalAmountBDT = 0;
        $scope.ConversionRate = 1;
        $scope.IsItemList = false;
        $scope.IsConversionRate = true;
        $scope.Companylist = [];
        $scope.SalesOrderList = [];
        $scope.CompanyBillingAddressList = [];
        $scope.SalesInvoiceDetail = {};
        $scope.SalesInvoiceDetailList = [];
        $scope.DeletedSalesInvoiceDetailList = [];
        $scope.companyPaymentList = [];
        $scope.pos_CompanySalesInvoice = {};
        $scope.ddlCurrency = { CurrencyId: 1 };
        $scope.pos_CompanySalesInvoice.CurrencyId = 1;
        $scope.pos_CompanySalesInvoice.SalesInvoiceId = 0;
        $scope.pos_CompanySalesInvoice.ManualInvoiceDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetSalesInvoiceNo();
        $scope.pos_CompanySalesInvoiceDetails = [];
        GetActiveCompany();
        $scope.AddProductLbl = 'Add';
        $scope.SaveBtn = 'Save';

        $scope.ddlMu = { ItemUnitId: 2 };
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetCompanySalesInvoicePaged($scope.currentPage);
        //GetSalesOrderDynamic();
        $scope.CurrencyList = [];
        $scope.MaterialTypeList = [];
        GetAllCurrency();
        GetAllItemUnit(); 
        GetMaterialType();
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        //GetUsersPermissionDetails();
        


        $scope.ShowIsEdit = false;

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
    $('#ddlItem').select2({
        placeholder: "Search for: Item Name ~ Description ~ Item Code",
        theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });

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
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }
    function GetActiveCompany() {
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Companylist = data;

        })
    }


    $scope.GetSalesOrderDynamic = function (CompanyId) {
        GetSalesOrderDynamic(CompanyId);
    }
    function GetSalesOrderDynamic(CompanyId, SalesOrderId) {
        var searchCriteria = 'SO.CompanyId=' + CompanyId;
        $http({
            url: '/SalesOrder/GetSalesOrderDynamic?searchCriteria=' + searchCriteria + '&orderBy=SalesOrderNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalesOrderList = data;
            if ($scope.SalesOrderList.length > 0 && SalesOrderId != undefined) {
                $scope.ddlSalesOrder = { SalesOrderId: SalesOrderId };
                setTimeout(function () {
                    $("#ddlSalesOrder").select2({
                        theme: "classic",
                    }).val(SalesOrderId);
                }, 0);
            }
            
        })
    }


    $scope.GetCompanyBillingDeliveryAddress = function () {
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

    $scope.getMaxSalesInvoiceByDate = function () {
        GetSalesInvoiceNo();
    }
    function GetSalesInvoiceNo() {

        $http({
            url: '/SalesInvoice/GetManualInvoiceNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxSalesInvoiceNo = parseInt(data);
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
                $scope.ManualSalesInvoiceNo1 = 'MI-';
                $scope.ManualSalesInvoiceNo2 = $scope.MaxSalesInvoiceNo;
                //$scope.pos_CompanySalesInvoice.ManualInvoiceNo = 'MI-' + $scope.MaxSalesInvoiceNo;
            });
        });
        


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


    $("#ManualInvoiceDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarSalesInvoiceDate = function () {
        $("#ManualInvoiceDate").focus();
        $("#ManualInvoiceDate").trigger("click");
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
            $scope.SalesInvoiceDetail.ItemDescription = $scope.ddlItemNameAll.ItemName + ' ' + $scope.ddlItemNameAll.ItemDescription + ' ' + $scope.ddlItemNameAll.ItemDescriptionTwo;
            $scope.SalesInvoiceDetail.PcPerRoll = $scope.ddlItemName.PcPerRoll;
            $scope.SalesInvoiceDetail.UnitPrice = $scope.ddlItemName.UnitPrice;
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
    $scope.priceChangeForAmount = function () {
        $scope.UnitPrice = $scope.SalesInvoiceDetail.Total / $scope.SalesInvoiceDetail.Quantity;
        $scope.SalesInvoiceDetail.UnitPrice = parseFloat($scope.UnitPrice.toFixed(6));

    }
    
    $scope.priceOrAmountChange = function (fromPriceChange) {
        if (fromPriceChange) {
            if (angular.isUndefined($scope.SalesInvoiceDetail.UnitPrice) || $scope.SalesInvoiceDetail.UnitPrice == null) {
                if ($("#txtPrice").val() === "" && event.data === ".")
                    return;
                else
                    $scope.SalesInvoiceDetail.UnitPrice = 0;
                $scope.SalesInvoiceDetail.Total = 0;
            }
            else
                $scope.SalesInvoiceDetai = 0;
            $scope.SalesInvoiceDetail.Total = 0;
            $scope.SalesInvoiceDetai = ($scope.SalesInvoiceDetail.UnitPrice) * ($scope.SalesInvoiceDetail.Quantity);
            $scope.SalesInvoiceDetail.Total = parseFloat($scope.SalesInvoiceDetai.toFixed(6));
        }
    }
    $scope.priceOrAmountChangeForQty = function () {
        if (angular.isUndefined($scope.SalesInvoiceDetail.UnitPrice) || $scope.SalesInvoiceDetail.UnitPrice == null) {
            if ($("#txtPrice").val() === "" && event.data === ".")
                return;

            $scope.SalesInvoiceDetail.Total = 0;
        } else
            $scope.SalesInvoiceDetai = 0;
        $scope.SalesInvoiceDetail.Total = 0;
        $scope.SalesInvoiceDetai = ($scope.SalesInvoiceDetail.UnitPrice) * ($scope.SalesInvoiceDetail.Quantity);
        $scope.SalesInvoiceDetail.Total = parseFloat($scope.SalesInvoiceDetai.toFixed(6));

    }
    $scope.AmountCalculation = function () {
        $scope.Total = 0;
        $scope.TotalAmount = 0;
        $scope.TotalQuantity = 0;
        $scope.TotalAmountBDT = 0;

        angular.forEach($scope.SalesInvoiceDetailList, function (aData) {
            $scope.Total = aData.Total;
            $scope.TotalAmount += Number($scope.Total);
            $scope.TotalQuantity += aData.Quantity;

            aData.UnitPriceBDT = aData.UnitPrice * $scope.ConversionRate;
            aData.AmountBDT = Number($scope.Total) * $scope.ConversionRate;
            $scope.TotalAmountBDT += aData.AmountBDT;

        })
    }

    $scope.VatAmountCalculetion = function () {
        $scope.SalesInvoiceDetail.Total = 0;
        $scope.Total = ($scope.SalesInvoiceDetail.UnitPrice) * ($scope.SalesInvoiceDetail.Quantity);
        $scope.SalesInvoiceDetail.VatAmount = parseFloat((($scope.Total * $scope.SalesInvoiceDetail.VatPercentage) / 100).toFixed(6));
        if (isNaN($scope.SalesInvoiceDetail.VatAmount) || $scope.SalesInvoiceDetail.VatAmount == undefined || $scope.SalesInvoiceDetail.VatAmount == null || $scope.SalesInvoiceDetail.VatAmount == '') {
            $scope.SalesInvoiceDetail.VatAmount = 0;
        }
        $scope.SalesInvoiceDetail.Total = parseFloat($scope.Total.toFixed(6)) + parseFloat($scope.SalesInvoiceDetail.VatAmount.toFixed(6));

    }

    $scope.AddSalesInvoiceDetail = function () {
        if ($scope.AddProductLbl == 'Add') {
            $scope.Total = $scope.SalesInvoiceDetail.Total;
            $scope.TotalAmount += Number($scope.Total);
            $scope.TotalQuantity += $scope.SalesInvoiceDetail.Quantity;

            $scope.SalesInvoiceDetail.UnitPriceBDT = $scope.SalesInvoiceDetail.UnitPrice * $scope.ConversionRate;
            $scope.SalesInvoiceDetail.AmountBDT = Number($scope.Total) * $scope.ConversionRate;
            $scope.TotalAmountBDT += $scope.SalesInvoiceDetail.AmountBDT;

            if (!$scope.SalesInvoiceDetailList.length) {
                $scope.SalesInvoiceDetail.SlNo = 1;
            } else {
                $scope.SalesInvoiceDetail.SlNo = Enumerable.From($scope.SalesInvoiceDetailList).Max('$.SlNo') + 1;
            }

            $scope.SalesInvoiceDetail.ItemId = $scope.ddlItemName.ItemId;
            $scope.SalesInvoiceDetail.ItemUnitId = $scope.ddlMu.ItemUnitId;
            $scope.SalesInvoiceDetailList.push($scope.SalesInvoiceDetail);
            if ($scope.SalesInvoiceDetailList.length > 0) {
                $scope.IsItemList = true;
            } else {
                $scope.IsItemList = false;
            }
            $scope.SalesInvoiceDetail = {};
            $('#ddlItem').select2('destroy');
            $('#ddlItem').val('').select2({
                placeholder: "Search for: Item Name ~ Description ~ Item Code",
                //theme: "classic",
                //dropdownAutoWidth: false
            });
            $('#cmbMaterialType').select2('destroy');
            $('#cmbMaterialType').val('').select2({
                placeholder: "Select Material Type",
                theme: "classic",
                dropdownAutoWidth: false
            });
            $('#cmbMaterialType').select2('destroy');
            $('#cmbMaterialType').val('').select2({
                placeholder: "Select Material Type",
                theme: "classic",
                dropdownAutoWidth: false
            });
            $scope.ddlMaterialType = null;
            $scope.ddlMu = { ItemUnitId: 2 };

        } else {
            $scope.AmountCalculation();
            $scope.SalesInvoiceDetail = {};
            $('#ddlItem').select2('destroy');
            $('#ddlItem').val('').select2({
                placeholder: "Search for: Item Name ~ Description ~ Item Code",
                //theme: "classic",
                //dropdownAutoWidth: false
            });
            $('#cmbMaterialType').select2('destroy');
            $('#cmbMaterialType').val('').select2({
                placeholder: "Select Material Type",
                theme: "classic",
                dropdownAutoWidth: false
            });
            $scope.ddlMaterialType = null;
        }
        $scope.AddProductLbl = 'Add';
    }
    $scope.RemoveSalesInvoiceDetail = function (aSalesInvoiceDetail) {
        var ind = $scope.SalesInvoiceDetailList.indexOf(aSalesInvoiceDetail);
        $scope.TotalQuantity -= aSalesInvoiceDetail.Quantity;
        $scope.TotalAmount -= parseFloat(aSalesInvoiceDetail.Total);
        $scope.TotalAmountBDT -= parseFloat(aSalesInvoiceDetail.AmountBDT);
        $scope.SalesInvoiceDetailList.splice(ind, 1);

        if ($scope.SalesInvoiceDetailList.length > 0) {
            $scope.IsItemList = true;
        } else {
            $scope.IsItemList = false;
            $scope.TotalAmount = 0;
            $scope.TotalAmountBDT = 0;
        }

        if (aSalesInvoiceDetail.ManualInvoiceDetailId) {
            $scope.DeletedSalesInvoiceDetailList.push(aSalesInvoiceDetail);
        }
    }

    $scope.Edit = function (aCompanySalesInvoice) {
        window.scroll(0, 0);
        $scope.SaveBtn = 'Update';
        $scope.pos_CompanySalesInvoice = aCompanySalesInvoice;
        $('#ddlCompany').select2('destroy');
        $('#ddlCompany').val(aCompanySalesInvoice.CompanyId).select2({
            theme: "classic",
        });
        GetSalesOrderDynamic(aCompanySalesInvoice.CompanyId, aCompanySalesInvoice.SalesOrderId );

        $scope.ddlCompany = { CompanyId: aCompanySalesInvoice.CompanyId }
        $scope.ddlCurrency = { CurrencyId: aCompanySalesInvoice.CurrencyId }
        $scope.ConversionRate = $scope.pos_CompanySalesInvoice.ConversionRate;
        var maxNumber = aCompanySalesInvoice.ManualInvoiceNo.split('-');
        $scope.ManualSalesInvoiceNo1 = 'MI-';
        $scope.ManualSalesInvoiceNo2 = parseInt(maxNumber[1]);
        $scope.TotalAmount = 0;
        $scope.TotalQuantity = 0;
        $scope.TotalAmountBDT = 0;


        $http({
            url: "/SalesInvoice/GetManualInvoiceDetail?ManualInvoiceId=" + aCompanySalesInvoice.ManualInvoiceId,
            method: "Get", // pos_SalesInvoiceDetail_Get
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.SalesInvoiceDetailList = data;
            //var slNo = 1;
            angular.forEach($scope.SalesInvoiceDetailList , function (aData) {
                $scope.Total = aData.Total;
                $scope.TotalAmount += Number($scope.Total);
                $scope.TotalQuantity += aData.Quantity;

                aData.UnitPriceBDT = aData.UnitPrice * $scope.ConversionRate;
                aData.AmountBDT = Number($scope.Total) * $scope.ConversionRate;
                $scope.TotalAmountBDT += aData.AmountBDT;
                //aData.SlNo = slNo;
                //slNo++;
            })
        })

    }

    $scope.SelSalesInvoiceDetail = function (aSalesInvoiceDetail) {
        $scope.AddProductLbl = 'Update';
        $scope.SalesInvoiceDetail = aSalesInvoiceDetail;
        $('#ddlItem').select2('destroy');
        $('#ddlItem').val(aSalesInvoiceDetail.ItemId).select2({
            //placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
            //templateResult: formatOutput,
            theme: "classic",
            dropdownAutoWidth: false
        });
        $scope.ddlMu = { ItemUnitId: aSalesInvoiceDetail.ItemUnitId };
        $scope.ddlMaterialType = { MaterialTypeId: aSalesInvoiceDetail.MaterialTypeId };
        $('#cmbMaterialType').select2('destroy');
        $('#cmbMaterialType').val(aSalesInvoiceDetail.MaterialTypeId).select2();
        var maxNumber = aSalesInvoiceDetail.ManualInvoiceNo.split('-');
        $scope.ManualInvoiceNo = 'MI-' + maxNumber[1];

        $scope.ddlItemNameAll = { ItemId: aSalesInvoiceDetail.ItemId}
    }

    function PostSalesInvoice() {
        $scope.pos_CompanySalesInvoice.ManualInvoiceNo = $scope.ManualSalesInvoiceNo1 + $scope.ManualSalesInvoiceNo2;
        $http({
            url: "/SalesInvoice/GetManualInvoiceNoExist?ManualInvoiceNo=" + $scope.pos_CompanySalesInvoice.ManualInvoiceNo,
            method: "Get", 
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.InvoiceNoExistList = data;
            if (!$scope.InvoiceNoExistList[0].IsExist || $scope.SaveBtn == 'Update') {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        $scope.pos_CompanySalesInvoice.TotalAmount = 0;
                        $scope.pos_CompanySalesInvoice.TotalVatAmount = 0;
                        angular.forEach($scope.SalesInvoiceDetailList, function (aData) {
                            $scope.pos_CompanySalesInvoice.TotalAmount += aData.Total;
                            $scope.pos_CompanySalesInvoice.TotalVatAmount += aData.VatAmount;

                        })
                        $scope.pos_CompanySalesInvoice.CreatorId = $scope.LoginUser.UserId;
                        $scope.pos_CompanySalesInvoice.UpdatorId = $scope.LoginUser.UserId;
                        $scope.pos_CompanySalesInvoice.ConversionRate = $scope.ConversionRate;

                        $scope.pos_CompanySalesInvoice.CompanyId = $scope.ddlCompany.CompanyId;


                        var params = JSON.stringify({ pos_SalesInvoice: $scope.pos_CompanySalesInvoice, pos_SalesInvoiceDetail: $scope.SalesInvoiceDetailList, DeletedSalesInvoiceDetailList: $scope.DeletedSalesInvoiceDetailList });
                        $http({
                            url: '/SalesInvoice/PostManualInvoice',
                            method: 'POST',
                            data: params
                        }).success(function (data) {
                            if (data > 0) {
                                alertify.log('Sales Invoice saved successfully!', 'success', '5000');
                                Clear();
                            }
                        });

                    }
                })
            } else {
                alertify.log('Manual invoice number is exist!!! Please change manual invoice number!', 'error', '5000');
            }
        })
        
    }

    $scope.Save = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.pos_CompanySalesInvoice.SalesInvoiceId == 0 && $scope.CreatePermission) {
                PostSalesInvoice();
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId > 0 && $scope.RevisePermission) {
                //alertify.confirm("Are you sure to update?", function (e) {
                //    if (e) {
                PostSalesInvoice();
                //    }
                //})
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.pos_CompanySalesInvoice.SalesInvoiceId == 0 && $scope.CreatePermission) {
                PostSalesInvoice();
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId > 0 && $scope.RevisePermission) {
                PostSalesInvoice();
            }
            else if ($scope.pos_CompanySalesInvoice.SalesInvoiceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }


    }




    $scope.Reset = function () {
        Clear();
        $scope.stockReceive.ddlStore.$setPristine();
        $scope.stockReceive.ddlStore.$setUntouched();

    }

    $scope.OpenPopupWindow = function (aCompanySalesInvoice, IsManualInvoice) {
        $window.open("#/SalesInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SalesInvoiceId", JSON.stringify(siId));
        aCompanySalesInvoice.IsManualInvoice = IsManualInvoice;
        $cookieStore.put("aCompanySalesInvoice", aCompanySalesInvoice);
        event.stopPropagation();
    };



    $scope.reloadBtn = function () {
        $('#txtFromDateForSI').val('');
        $('#txtToDateForSI').val('');
        $('#textSearchCompanyName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchCompanyName = null;
        GetCompanySalesInvoicePaged(1);
    }

    $scope.CompanySalesInvoiceSearch = function () {
        GetCompanySalesInvoicePaged(1);

    }

    function GetCompanySalesInvoicePaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSI").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForSI").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            //SearchCriteria = "([ManualInvoiceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
            SearchCriteria = "([ManualInvoiceDate] between '" + $scope.FromDate + "' and ([CompanyName] LIKE '%" + $scope.SearchCompanyName + "%' OR [SO].[SalesOrderNo] LIKE '%" + $scope.SearchCompanyName + "%' OR [ManualInvoiceNo] LIKE '%" + $scope.SearchCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria = "[CompanyName] LIKE '%" + $scope.SearchCompanyName + "%' OR [SO].[SalesOrderNo] LIKE '%" + $scope.SearchCompanyName + "%' OR [ManualInvoiceNo] LIKE '%" + $scope.SearchCompanyName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[ManualInvoiceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/SalesInvoice/GetPagedManualInvoice?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.ManualInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.ManualInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.ManualInvoiceDate = date1;
                    }

                    
                    

                })

            }
            else {
                alertify.log('Sales Invoice  Not Found', 'error', '5000');
            }
            $scope.CompanySalesInvoiceListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetCompanySalesInvoicePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetCompanySalesInvoicePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetCompanySalesInvoicePaged($scope.currentPage);
        }
        //  }


    }

    $("#txtFromDateForSI").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForSI = function () {
        $("#txtFromDateForSI").focus();
        $("#txtFromDateForSI").trigger("click");
    }


    $("#txtToDateForSI").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForSI = function () {
        $("#txtToDateForSI").focus();
        $("#txtToDateForSI").trigger("click");
    }

})