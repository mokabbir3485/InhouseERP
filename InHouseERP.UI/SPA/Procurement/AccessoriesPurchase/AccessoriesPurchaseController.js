app.controller("AccessoriesPurchaseController", function ($scope, $rootScope, $cookieStore, $http, $window, $filter) {
    Clear();


    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Accessories Purchase').ScreenId;
        GetUsersPermissionDetails();

        $scope.UserId = $scope.LoginUser.UserId;
        //$scope.ScreenId = parseInt(sessionStorage.getItem("AccessoriesPurchaseScreenId"));
        $scope.ddlSupplier = null;
        $scope.ddlSalesOrder = null;
        $scope.Total = 0;
        $scope.TotalAmount = 0;
        $scope.TotalQuantity = 0;
        $scope.TotalVatAmount = 0;
        $scope.TotalDiscountAmount = 0;

        $scope.TotalAmountBDT = 0;
        $scope.ConversionRate = 1;
        $scope.IsItemList = false;
        $scope.IsConversionRate = true;
        $scope.Supplierlist = [];
        $scope.SalesOrderList = [];
        $scope.SupplierBillingAddressList = [];
        $scope.ProductNameList = [];
        $scope.AccessoriesPurchaseDetail = {};
        $scope.AccessoriesPurchaseDetailList = [];
        $scope.DeletedAccessoriesPurchaseDetailList = [];
        $scope.supplierPaymentList = [];
        $scope.proc_AccessoriesPurchase = {};
        $scope.ddlCurrency = { CurrencyId: 1 };
        $scope.proc_AccessoriesPurchase.CurrencyId = 1;
        $scope.proc_AccessoriesPurchase.PurchaseId = 0;
        $scope.proc_AccessoriesPurchase.PurchaseDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetMaxAccessoriesPurchaseNo();
        $scope.pos_SupplierAccessoriesPurchaseDetails = [];
        GetAllProductName();
        GetSupplierBillingAddress();
        $scope.AddProductLbl = 'Add';
        $scope.SaveBtn = 'Save';

        $scope.ddlMu = { ItemUnitId: 2 };
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetSupplierAccessoriesPurchasePaged($scope.currentPage);

        GetAllItemUnit();
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
       // GetUsersPermissionDetails();

        $scope.ShowIsEdit = false;

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
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }
    



    function GetSupplierBillingAddress() {

        $http({
            url: '/AccessoriesPurchase/GetAllAccessoriesPurchase',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (supplierAddressList) {
            $scope.SupplierBillingAddressList = supplierAddressList;

        });
    }
    function GetAllProductName() {

        $http({
            url: '/AccessoriesPurchase/GetAccessoriesPurchaseDetailByPurchaseId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (Date) {
            $scope.ProductNameList = Date;
            $scope.UnitNameList = Date;

        });
    }

    function GetMaxAccessoriesPurchaseNo() {

        $http({
            url: '/AccessoriesPurchase/GetMaxAccessoriesPurchaseNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxPurchaseNo = parseInt(data);
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
                $scope.PurchaseNo1 = 'AP/' + $scope.finYearHeadOffice + '/';
                $scope.PurchaseNo2 = $scope.MaxPurchaseNo;
            });
        });



    }
    $("#AccessoriesPurchaseDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarAccessoriesPurchaseDate = function () {
        $("#AccessoriesPurchaseDate").focus();
        $("#AccessoriesPurchaseDate").trigger("click");
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
        $scope.UnitPrice = $scope.AccessoriesPurchaseDetail.Total / $scope.AccessoriesPurchaseDetail.Quantity;
        $scope.AccessoriesPurchaseDetail.UnitPrice = parseFloat($scope.UnitPrice.toFixed(6));

    }

    $scope.priceOrAmountChange = function (fromPriceChange) {
        if (fromPriceChange) {
            $scope.AccessoriesPurchaseDetail.VatAmount = 0;
            $scope.AccessoriesPurchaseDetail.DiscountAmount = 0;
            if (angular.isUndefined($scope.AccessoriesPurchaseDetail.UnitPrice) || $scope.AccessoriesPurchaseDetail.UnitPrice == null) {
                if ($("#txtPrice").val() === "" && event.data === ".")
                    return;
                else
                    $scope.AccessoriesPurchaseDetail.UnitPrice = 0;
                $scope.AccessoriesPurchaseDetail.Total = 0;
            }
            else
                $scope.AccessoriesPurchaseDetai = 0;
            $scope.AccessoriesPurchaseDetail.Total = 0;
            $scope.AccessoriesPurchaseDetai = ($scope.AccessoriesPurchaseDetail.UnitPrice) * ($scope.AccessoriesPurchaseDetail.Quantity);
            $scope.AccessoriesPurchaseDetail.Total = parseFloat($scope.AccessoriesPurchaseDetai.toFixed(6));
        }
    }
    $scope.priceOrAmountChangeForQty = function () {
        $scope.AccessoriesPurchaseDetail.VatAmount = 0;
        $scope.AccessoriesPurchaseDetail.DiscountAmount = 0;
        if (angular.isUndefined($scope.AccessoriesPurchaseDetail.UnitPrice) || $scope.AccessoriesPurchaseDetail.UnitPrice == null) {
            if ($("#txtPrice").val() === "" && event.data === ".")
                return;

            $scope.AccessoriesPurchaseDetail.Total = 0;
        } else
            $scope.AccessoriesPurchaseDetai = 0;
        $scope.AccessoriesPurchaseDetail.Total = 0;
        $scope.AccessoriesPurchaseDetai = ($scope.AccessoriesPurchaseDetail.UnitPrice) * ($scope.AccessoriesPurchaseDetail.Quantity);
        $scope.AccessoriesPurchaseDetail.Total = parseFloat($scope.AccessoriesPurchaseDetai.toFixed(6));

    }
    $scope.AmountCalculation = function () {
        $scope.Total = 0;
        $scope.TotalAmount = 0;
        $scope.TotalQuantity = 0;
        $scope.TotalDiscountAmount = 0;
        $scope.TotalVatAmount = 0;

        angular.forEach($scope.AccessoriesPurchaseDetailList, function (aData) {
            $scope.Total = aData.Total;
            $scope.TotalAmount += Number($scope.Total);
            $scope.TotalQuantity += aData.Quantity;
            $scope.TotalDiscountAmount += aData.DiscountAmount;
            $scope.TotalVatAmount += aData.VatAmount;


        })
    }

    $scope.VatAmountCalculetion = function () {
        if (isNaN($scope.AccessoriesPurchaseDetail.VatAmount) || $scope.AccessoriesPurchaseDetail.VatAmount == undefined || $scope.AccessoriesPurchaseDetail.VatAmount == null || $scope.AccessoriesPurchaseDetail.VatAmount == '') {
            $scope.AccessoriesPurchaseDetail.VatAmount = 0;
        }
        $scope.AccessoriesPurchaseDetail.Total = parseFloat($scope.SubTotal.toFixed(6)) + parseFloat($scope.AccessoriesPurchaseDetail.VatAmount.toFixed(6));

    }
    $scope.DiscountAmountCalculetion = function () {
        
        $scope.AccessoriesPurchaseDetail.Total = 0;
        $scope.AccessoriesPurchaseDetail.VatAmount = 0;
        $scope.Total = ($scope.AccessoriesPurchaseDetail.UnitPrice) * ($scope.AccessoriesPurchaseDetail.Quantity);
        if (isNaN($scope.AccessoriesPurchaseDetail.DiscountAmount) || $scope.AccessoriesPurchaseDetail.DiscountAmount == undefined || $scope.AccessoriesPurchaseDetail.DiscountAmount == null || $scope.AccessoriesPurchaseDetail.DiscountAmount == '') {
            $scope.AccessoriesPurchaseDetail.DiscountAmount = 0;
        }
        $scope.AccessoriesPurchaseDetail.Total = parseFloat($scope.Total.toFixed(6)) - parseFloat($scope.AccessoriesPurchaseDetail.DiscountAmount.toFixed(6));
        $scope.SubTotal = $scope.AccessoriesPurchaseDetail.Total;
    }

    $scope.AddAccessoriesPurchaseDetail = function () {
        if ($scope.AddProductLbl == 'Add') {
            $scope.Total = $scope.AccessoriesPurchaseDetail.Total;
            $scope.TotalAmount += Number($scope.Total);
            $scope.TotalQuantity += $scope.AccessoriesPurchaseDetail.Quantity;
            $scope.TotalVatAmount += $scope.AccessoriesPurchaseDetail.VatAmount;
            $scope.TotalDiscountAmount += $scope.AccessoriesPurchaseDetail.DiscountAmount;

            if (!$scope.AccessoriesPurchaseDetailList.length) {
                $scope.AccessoriesPurchaseDetail.SlNo = 1;
            } else {
                $scope.AccessoriesPurchaseDetail.SlNo = Enumerable.From($scope.AccessoriesPurchaseDetailList).Max('$.SlNo') + 1;
            }
            $scope.AccessoriesPurchaseDetailList.push($scope.AccessoriesPurchaseDetail);
            
            $scope.AccessoriesPurchaseDetail = {};
            

        } else {
            $scope.AmountCalculation();
            $scope.AccessoriesPurchaseDetail = {};
            
        }
        $scope.AddProductLbl = 'Add';
    }
    $scope.RemoveAccessoriesPurchaseDetail = function (aAccessoriesPurchaseDetail) {
        var ind = $scope.AccessoriesPurchaseDetailList.indexOf(aAccessoriesPurchaseDetail);
        $scope.TotalQuantity -= aAccessoriesPurchaseDetail.Quantity;
        $scope.TotalAmount -= parseFloat(aAccessoriesPurchaseDetail.Total);
        $scope.TotalVatAmount -= parseFloat(aAccessoriesPurchaseDetail.VatAmount);;
        $scope.TotalDiscountAmount -= parseFloat(aAccessoriesPurchaseDetail.DiscountAmount);;
        $scope.AccessoriesPurchaseDetailList.splice(ind, 1);

        if ($scope.AccessoriesPurchaseDetailList.length > 0) {
            $scope.IsItemList = true;
        } else {
            $scope.IsItemList = false;
            $scope.TotalAmount = 0;
            $scope.TotalAmountBDT = 0;
        }

        if (aAccessoriesPurchaseDetail.PurchaseDetailId) {
            $scope.DeletedAccessoriesPurchaseDetailList.push(aAccessoriesPurchaseDetail);
        }
    }

    $scope.Edit = function (aSupplierAccessoriesPurchase) {
        window.scroll(0, 0);
        $scope.SaveBtn = 'Update';
        $scope.proc_AccessoriesPurchase = aSupplierAccessoriesPurchase;

        

        var maxNumber = aSupplierAccessoriesPurchase.PurchaseNo.split('/');
        $scope.PurchaseNo1 = maxNumber[0] + '/' + maxNumber[1] + '/';
        $scope.PurchaseNo2 = parseInt(maxNumber[2]);
        $scope.TotalAmount = 0;
        $scope.TotalQuantity = 0;
        $scope.TotalVatAmount = 0;
        $scope.TotalDiscountAmount = 0;


        $http({
            url: '/AccessoriesPurchase/GetAccessoriesPurchaseDetailByPurchaseId?PurchaseId=' + aSupplierAccessoriesPurchase.PurchaseId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AccessoriesPurchaseDetailList = data;
            //var slNo = 1;
            angular.forEach($scope.AccessoriesPurchaseDetailList, function (aData) {
                $scope.Total = aData.TotalAmount;
                aData.Total = aData.TotalAmount;
                $scope.TotalAmount += Number($scope.Total);
                $scope.TotalQuantity += aData.Quantity;
                $scope.TotalVatAmount += aData.VatAmount;
                $scope.TotalDiscountAmount += aData.DiscountAmount;
            })

        });


    }

    $scope.SelAccessoriesPurchaseDetail = function (aAccessoriesPurchaseDetail) {
        $scope.AddProductLbl = 'Update';
        $scope.AccessoriesPurchaseDetail = aAccessoriesPurchaseDetail;

    }

    function PostAccessoriesPurchase() {
        $scope.proc_AccessoriesPurchase.PurchaseNo = $scope.PurchaseNo1 + $scope.PurchaseNo2;
        $http({
            url: "/AccessoriesPurchase/GetAccessoriesPurchaseNoExist?PurchaseNo=" + $scope.proc_AccessoriesPurchase.PurchaseNo,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.InvoiceNoExistList = data;
            if (!$scope.InvoiceNoExistList[0].IsExist || $scope.SaveBtn == 'Update') {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        $scope.proc_AccessoriesPurchase.TotalAmount = 0;
                        //$scope.proc_AccessoriesPurchase.TotalVatAmount = 0;
                        angular.forEach($scope.AccessoriesPurchaseDetailList, function (aData) {
                            $scope.proc_AccessoriesPurchase.TotalAmount += aData.Total;
                            //$scope.proc_AccessoriesPurchase.TotalVatAmount += aData.VatAmount;

                        })
                        if ($scope.proc_AccessoriesPurchase.AdditionalDiscount == null || $scope.proc_AccessoriesPurchase.AdditionalDiscount == undefined) {
                            $scope.proc_AccessoriesPurchase.AdditionalDiscount = 0;
                        }
                        $scope.proc_AccessoriesPurchase.NetTotal = $scope.proc_AccessoriesPurchase.TotalAmount - $scope.proc_AccessoriesPurchase.AdditionalDiscount;
                        $scope.proc_AccessoriesPurchase.CreatorId = $scope.LoginUser.UserId;
                        $scope.proc_AccessoriesPurchase.UpdatorId = $scope.LoginUser.UserId;

                        var params = JSON.stringify({ proc_AccessoriesPurchase: $scope.proc_AccessoriesPurchase, proc_AccessoriesPurchaseDetail: $scope.AccessoriesPurchaseDetailList, DeletedAccessoriesPurchaseDetailList: $scope.DeletedAccessoriesPurchaseDetailList});
                        $http({
                            url: '/AccessoriesPurchase/PostAccessoriesPurchase',
                            method: 'POST',
                            data: params
                        }).success(function (data) {
                            if (data > 0) {
                                alertify.log('Accessories purchase saved successfully!', 'success', '5000');
                                Clear();
                            }
                        });

                    }
                })
            } else {
                alertify.log('Purchase number is exist!!! Please change purchase number!', 'error', '5000');
            }
        })

    }

    $scope.Save = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.proc_AccessoriesPurchase.PurchaseId == 0 && $scope.CreatePermission) {
                PostAccessoriesPurchase();
            }
            else if ($scope.proc_AccessoriesPurchase.PurchaseId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.proc_AccessoriesPurchase.PurchaseId > 0 && $scope.RevisePermission) {
                PostAccessoriesPurchase();
            }
            else if ($scope.proc_AccessoriesPurchase.PurchaseId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.proc_AccessoriesPurchase.PurchaseId == 0 && $scope.CreatePermission) {
                PostAccessoriesPurchase();
            }
            else if ($scope.proc_AccessoriesPurchase.PurchaseId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.proc_AccessoriesPurchase.PurchaseId > 0 && $scope.RevisePermission) {
                PostAccessoriesPurchase();
            }
            else if ($scope.proc_AccessoriesPurchase.PurchaseId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }


    }




    $scope.Reset = function () {
        Clear();
        $scope.stockReceive.ddlStore.$setPristine();
        $scope.stockReceive.ddlStore.$setUntouched();

    }

    $scope.OpenPopupWindow = function (PurchaseId) {
        $window.open("#/AccessoriesPurchaseReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("PurchaseId", JSON.stringify(siId));
        $cookieStore.put("PurchaseId", PurchaseId);
        event.stopPropagation();
    };



    $scope.reloadBtn = function () {
        $('#txtFromDateForSI').val('');
        $('#txtToDateForSI').val('');
        $('#textSearchSupplierName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchSupplierName = null;
        GetSupplierAccessoriesPurchasePaged(1);
    }

    $scope.SupplierAccessoriesPurchaseSearch = function () {
        GetSupplierAccessoriesPurchasePaged(1);

    }

    function GetSupplierAccessoriesPurchasePaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSI").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForSI").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchSupplierName != undefined && $scope.SearchSupplierName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            //SearchCriteria = "([PurchaseDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%')";
            SearchCriteria = "([PurchaseDate] between '" + $scope.FromDate + "' and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%' OR [ChallanNo] LIKE '%" + $scope.SearchSupplierName + "%' OR [PurchaseNo] LIKE '%" + $scope.SearchSupplierName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchSupplierName !== undefined && $scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
            SearchCriteria = "[SupplierName] LIKE '%" + $scope.SearchSupplierName + "%' OR [ChallanNo] LIKE '%" + $scope.SearchSupplierName + "%' OR [PurchaseNo] LIKE '%" + $scope.SearchSupplierName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[PurchaseDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/AccessoriesPurchase/GetPagedAccessoriesPurchase?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.PurchaseDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.PurchaseDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.PurchaseDate = date1;
                    }

                })

            }
            else {
                alertify.log('Purchase  Not Found', 'error', '5000');
            }
            $scope.SupplierAccessoriesPurchaseListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetSupplierAccessoriesPurchasePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSupplierAccessoriesPurchasePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSupplierAccessoriesPurchasePaged($scope.currentPage);
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