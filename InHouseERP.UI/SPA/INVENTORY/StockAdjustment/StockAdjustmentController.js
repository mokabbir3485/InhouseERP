app.controller("StockAdjustmentController", function ($scope, $rootScope, $cookieStore, $http, $filter, $rootScope) {
    $scope.AdjustmentDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

    $("#txtAdjustmentDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.CalendartxtAdjustmentDate = function () {
        $("#txtAdjustmentDate").focus();
        $("#txtAdjustmentDate").trigger("click");
    }
    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Stock Adjustment').ScreenId;

        
        $scope.CategoryList = [];
        $scope.SubcategoryList = [];
        $scope.DepartmentList = [];
        $scope.StockAdjustmentList = [];
        $scope.StockAdjustmentCheckList = [];
        $scope.StockAdjustment = {};
        $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
        $scope.StockAdjustment.AdjPcQty = 0;
        $scope.StoreList = [];
        $scope.listXsl = [];
        $scope.ItemSearchResultList = [];
        $scope.ItemUnitlist = [];
        $scope.categoryId = 0;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $rootScope.saveBtn = 'Save';

        GetAllCategory();
        GetAllSubCategory();
        GetAllDepartment();
        GetAllStore();
        GetAllProduct();
        $scope.mySwitch = false;
        $scope.IsRemoveBtnDisable = false;
        $scope.IsAddBtnDisable = false;
        $scope.IsDublicate = false;
        $scope.ddlStore = null;
        $scope.txtOpening = null;
        angular.element("input[type='file']").val("");
        $scope.ddlCategory = null;
        $scope.ddlSubCategory = null;
        $scope.ddlProduct = null;
        $scope.StockAdjustmentList = [];
        $('#fileName').val('');
        $scope.saveBtn = 'Save';


        $scope.ddlmatrialType = null;
        $scope.matrialTypeList = [];
        GetAllmatrialType();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;

        GetStockAdjustmentPaged($scope.currentPage);

        StockAdjustmentReason();
        $scope.ReasonList = [];

    }
    $scope.focusSearchBox = function () {
        $('.searchBox').focus()
    }
    Clear();

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

    $("#ddlProduct").select2({
        placeholder: "Search for: Item Name ~ ItemDescription ~ Size Code ~ Sub Category",
        //theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });
    function GetAllmatrialType() {
        $http({
            url: '/MaterialType/GetAllMaterialType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data, function (aData) {
                aData.Combination = aData.MaterialTypeName + ' ~ ' + aData.MaterialTypeCode
                $scope.matrialTypeList.push(aData);
            })

        });
    }
    $scope.GetLabelBrand = function (ddlProduct) {
        GetLabelBrand(ddlProduct);
    }
    function GetLabelBrand(ddlProduct) {
        $scope.LabelBrandList = [];
        var searchCriteria = 'IsActive = 1'
        $http({
            url: "/LabelBrand/GetLabelBrandDynamic?searchCriteria=" + searchCriteria,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            //$scope.LabelBrandList = data;
            angular.forEach(data, function (aData) {
                if (aData.ItemId == ddlProduct.ItemId) {
                    $scope.LabelBrandList.push(aData);
                }
            })

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

    function GetAllSubCategory() {
        $http({
            url: '/Subcategory/GetAllSubategory',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SubcategoryList = data;
        });
    }

    function GetAllDepartment() {
        $http({
            url: '/Department/GetAllDepartment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.DepartmentList = data;
        });
    }

    function GetAllStore() {
        $http({
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (userOutletList) {
            $scope.StoreList = userOutletList;
        });
    }


    function StockAdjustmentReason() {
        $http({
            url: '/StockAdjustment/StockAdjustmentReason',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ReasonList = data;
        });
    }

    function GetAllProduct() {
        var SearchCriteria = '1=1';
        $http({
            url: '/Item/GetItemSearchResult?searchCriteria=' + SearchCriteria,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemSearchResultList = data;
            angular.forEach($scope.ItemSearchResultList,
                function (aData) {
                    aData.Description = aData.ItemName
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
                });

        });
    }

    $scope.AddWarrentyAndSerialNoDetailAdAttribute = function (WarrentyAndSerialNoDetailAdAttribute) {
        //$scope.WarrentyAndSerialNoList = [];
        WarrentyAndSerialNoDetailAdAttribute.ItemId = $scope.ddlProduct.ItemId;
        WarrentyAndSerialNoDetailAdAttribute.DepartmentId = $scope.ddlStore.DepartmentId;
        WarrentyAndSerialNoDetailAdAttribute.IsInQuantity = true;
        WarrentyAndSerialNoDetailAdAttribute.Status = 'Add Serial No.';


        $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(WarrentyAndSerialNoDetailAdAttribute);
        $scope.WarrentyAndSerialNoList.push(WarrentyAndSerialNoDetailAdAttribute);

        $scope.StockAdjustment.AdjPcQty += 1;
        $scope.IsRemoveBtnDisable = true;
        $scope.WarrentyAndSerialNoDetailAdAttribute = {};
    }

    $scope.RemoveWarrentyAndSerialNo = function (aWarrentyAndSerialNoDetail) {
        //$scope.WarrentyAndSerialNoList = [];
        var ind = $scope.WarrentyAndSerialNoDetailAdAttributeLst.indexOf(aWarrentyAndSerialNoDetail);
        $scope.WarrentyAndSerialNoDetailAdAttributeLst.splice(ind, 1);
        $scope.StockAdjustment.AdjPcQty -= 1;
        $scope.IsAddBtnDisable = true;
        aWarrentyAndSerialNoDetail.IsInQuantity = false;
        aWarrentyAndSerialNoDetail.Status = 'Remove Serial No.';
        $scope.WarrentyAndSerialNoList.push(aWarrentyAndSerialNoDetail);
    }

    $scope.AddWarrentyAndSerialNoInput = function (AdjPcQty, IsWarrantyAndSerial) {
        AdjPcQty = Math.abs(AdjPcQty);
        if (IsWarrantyAndSerial) {
            $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];

            for (var i = 0; i < AdjPcQty; i++) {
                var Attribute = {}
                Attribute.SerialNo = '';
                Attribute.WarrentyInDays = 0;
                Attribute.TableRowNo = i + 1;
                Attribute.DepartmentId = $scope.ddlStore.DepartmentId;
                Attribute.ItemId = $scope.ddlProduct.ItemId;

                $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(Attribute);
            }
        } else {
            $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
        }


    }
    $scope.CheckDuplicateSerialNo = function (WarrentyAndSerialNoDetailAdAttribute) {
        var serialNoFound = "";
        var isFound = false;
        for (var i = 0; i < $scope.WarrentyAndSerialNoDetailAdAttributeLst.length; i++) {
            if ($scope.WarrentyAndSerialNoDetailAdAttributeLst[i].SerialNo == WarrentyAndSerialNoDetailAdAttribute.SerialNo) {
                serialNoFound = $scope.WarrentyAndSerialNoDetailAdAttribute.SerialNo;
                $scope.WarrentyAndSerialNoDetailAdAttribute.SerialNo = "";
                isFound = true;
                break;
            }
        }

        if (isFound) {
            alertify.log('<b style="color:yellow;font-weight:bold;">' + serialNoFound + "</b> Found as a Duplicate Value.", "error", "5000");
            return;
        }
        

        var OpeningSerialList = [];

        OpeningSerialList.push({ SerialNo: WarrentyAndSerialNoDetailAdAttribute.SerialNo, ItemId: $scope.ddlProduct.ItemId });
        var parms = JSON.stringify({ OpeningSerialList: OpeningSerialList });
        $http.post('/StockOpeningQty/GetHardwareWarrantyAndSerial_GetDynamic', parms).success(function (dataFound) {
            if (dataFound.SerialNo == null) {
                return;
            }
            var isSerialExist = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).Where('$.ItemId==' + dataFound.ItemId + '&& $.SerialNo=="' + dataFound.SerialNo + '"').FirstOrDefault();
            if (!angular.isUndefined(isSerialExist)) {
                serialNoFound = $scope.WarrentyAndSerialNoDetailAdAttribute.SerialNo;
                $scope.WarrentyAndSerialNoDetailAdAttribute.SerialNo = "";
                alertify.log('<b style="color:yellow;font-weight:bold;">' + serialNoFound + "</b> Found as a Duplicate Value in Current Stock.", "error", "5000");
            }
        }).error(function (data) {
            alertify.log('Server Save Errors!', 'error', '5000');
        });

    }

    $scope.AddStockAdjustment = function () {
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                if ($scope.StockAdjustmentList.length > 0) {
                    angular.forEach($scope.StockAdjustmentList, function (aData) {
                        aData.UpdatorId = $scope.LoginUser.UserId;
                    })
                    var parms = JSON.stringify({ StockAdjustmentCheckList: $scope.StockAdjustmentList });
                    $http.post('/StockAdjustment/PostAdjustment', parms).success(function (data) {
                        if (parseInt(data) > 0) {
                            alertify.log('Stock Opening Qty Adjustment Save Successfully!', 'success', '5000');
                            Clear();
                            $scope.StockAdjustmentForm.$setPristine();
                            $scope.StockAdjustmentForm.$setUntouched();
                        } else {
                            alertify.log('Server Errors!', 'error', '5000');
                        }

                    }).error(function (data) {
                        alertify.log('Server Save Errors!', 'error', '5000');
                    });
                }
                else {
                    alertify.log('Save failed.', 'error', '5000');
                }
            }
        })

        

    };


    $scope.ClearStockAdjustmentList = function () {
        $scope.StockAdjustmentList = [];
    }
    $scope.ClearMaterialType = function () {
        $scope.ddlmatrialType = null;
        $scope.ddlLabelBrand = null;
        $('#MaterialType1').select2('destroy');
        $('#MaterialType1').val('').select2({
            placeholder: "--Material Material Type--"
        });
        $('#LabelBrand').select2('destroy');
        $('#LabelBrand').val('').select2({
            //placeholder: "--Label Brand--"
        });
    }
    $scope.OnChangeItem = function () {
        if ($scope.ddlProduct != null && $scope.ddlStore != null) {
            if ($scope.ddlProduct.CategoryId == 2) { //Hardware
                SearchStockAdjustment($scope.ddlStore.DepartmentId, $scope.ddlProduct.ItemId, null, null);
            }
            else if ($scope.ddlProduct.SubCategoryId != 3 && $scope.ddlmatrialType != null) { //Finish Good Ribbon, Rawmaterial, plain label
                SearchStockAdjustment($scope.ddlStore.DepartmentId, $scope.ddlProduct.ItemId, $scope.ddlmatrialType.MaterialTypeId, null);
            }
            else if ($scope.ddlProduct.SubCategoryId == 3 && $scope.ddlmatrialType != null && $scope.ddlLabelBrand != null) { //Pre printed Label
                SearchStockAdjustment($scope.ddlStore.DepartmentId, $scope.ddlProduct.ItemId, $scope.ddlmatrialType.MaterialTypeId, $scope.ddlLabelBrand.LabelBrandId);
            }
        }
        
    }


    function SearchStockAdjustment (depId, ItemId, MaterialTypeId, LabelBrandId) {
        $scope.IsRemoveBtnDisable = false;
        $scope.IsAddBtnDisable = false;
        $scope.StockAdjustment = {};
        $scope.WarrentyAndSerialNoList = [];
        $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];

        if (depId != undefined && ItemId != undefined) {
            if ($scope.ddlmatrialType == undefined || $scope.ddlmatrialType == null) {
                $scope.ddlmatrialType = {};
                $scope.ddlmatrialType.MaterialTypeId = null;
                $('#MaterialType1').select2('destroy');
                $('#MaterialType1').val('').select2({
                    placeholder: "--Material Material Type--"
                });
            }
            if ($scope.ddlLabelBrand == undefined || $scope.ddlLabelBrand == null) {
                $scope.ddlLabelBrand = {};
                $scope.ddlLabelBrand.LabelBrandId = null;
                $('#LabelBrand').select2('destroy');
                $('#LabelBrand').val('').select2({
                    //placeholder: "--Label Brand--"
                });
            }
            $http({
                url: '/StockAdjustment/SearchCurrentQuantity?ItemId=' + ItemId + '&depId=' + depId + '&MaterialTypeId=' + MaterialTypeId + '&LabelBrandId=' + LabelBrandId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.StockAdjustment = data[0];
                if (data.length == 0) {
                    $scope.IsCurrentStock = true;
                } else {
                    $scope.IsCurrentStock = false;
                }
                if (data.length > 0 && $scope.ddlProduct.CategoryId == 2) {
                    var criteria = "HSWS.DepartmentId=" + $scope.ddlStore.DepartmentId + " AND ItemId=" + $scope.ddlProduct.ItemId;
                    $http({
                        url: "/StockAdjustment/GetHardwareWarrantyAndSerial_GetDynamic?criteria=" + criteria + "&orderBy='SerialNo'",
                        method: "GET",
                        headers: { 'Content-Type': "application/json" }
                    }).success(function (data) {
                        $scope.WarrentyAndSerialNoDetailAdAttributeLst = data;

                    })
                    
                }
            });
        }

    }
    $scope.AddStockAdjustmentList = function () {
        if ($scope.ddlProduct.CategoryId != 2) {
            if ($scope.ddlmatrialType == null || $scope.ddlmatrialType == undefined) {
                alertify.log('Please select material type!', 'error', '5000');
                return;
            }
            
        }
        if ($scope.ddlProduct.SubCategoryId == 3) {
            if ($scope.ddlLabelBrand == null || $scope.ddlLabelBrand.LabelBrandId == 0 || $scope.ddlLabelBrand == undefined) {
                alertify.log('Please select label brand!', 'error', '5000');
                return;
            }

        }
       
        if ($scope.ddlReasonId == null || $scope.ddlLabelBrand == undefined) {
            alertify.log('Please select Reason !', 'error', '5000');
            return;
        }

   
        $scope.StockAdjustment.CategoryId = $scope.ddlProduct.CategoryId;
        $scope.StockAdjustment.SubCategoryId = $scope.ddlProduct.SubCategoryId;
        $scope.StockAdjustment.AdjustmentDate = $scope.AdjustmentDate;
        $scope.StockAdjustment.ReasonId = $scope.ddlReasonId.ReasonId;

        if ($scope.StockAdjustment.AdjRollQty == 0 && $scope.StockAdjustment.AdjPcQty == 0) {
            alertify.log('Please insert quantity!', 'error', '5000');
            return;
        }
        $scope.StockAdjustment.WarrentyAndSerialNoList = $scope.WarrentyAndSerialNoList;

        //BalanceQty
        if ($scope.StockAdjustment.AdjRollQty != 0) {
            $scope.StockAdjustment.BalanceQty = $scope.StockAdjustment.CurrentQuantity + $scope.StockAdjustment.AdjRollQty;
        } else {
            $scope.StockAdjustment.BalanceQty = $scope.StockAdjustment.CurrentQuantity + $scope.StockAdjustment.AdjPcQty;
        }
        

        $scope.StockAdjustmentList.push($scope.StockAdjustment);
        $scope.StockAdjustment = {};
        $scope.WarrentyAndSerialNoList = [];
        $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
        $scope.ddlProduct = null;
        $scope.ddlmatrialType = null;
        $('#MaterialType1').select2('destroy');
        $('#MaterialType1').val('').select2({
            placeholder: "--Material Material Type--"
        });
        $scope.ddlLabelBrand = null;
        $('#LabelBrand').select2('destroy');
        $('#LabelBrand').val('').select2({
            //placeholder: "--Label Brand--"
        });
        $('#ddlProduct').select2('destroy');
        $('#ddlProduct').val('').select2({
            placeholder: "Search for: Item Name ~ ItemDescription ~ Item Code",
            templateResult: formatOutput,
        });

        
    };
    $scope.RemoveStockAdjustment = function (alistXsl) {
        var ind = $scope.StockAdjustmentList.indexOf(alistXsl);
        $scope.StockAdjustmentList.splice(ind, 1);
    }
    $scope.resetForm = function () {
        Clear();
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
    $scope.reloadBtn = function () {
        $('#txtFromDateForSO').val('');
        $('#txtToDateForSO').val('');
        $('#textDepartmentNameAndItemSize').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchDepartmentNameAndItemSize = null;
        GetStockAdjustmentPaged(1);
    }

    $scope.StockAdjustmentSearch = function () {
        GetStockAdjustmentPaged(1);

    }

    function GetStockAdjustmentPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSO").val();
        if (formDateChange != undefined) {
            $scope.FromDate = formDateChange.split('/').reverse().join('-');
        }
        var toDateChange = $("#txtToDateForSO").val();
        if (toDateChange != undefined) {
            $scope.ToDate = toDateChange.split('/').reverse().join('-');
        }


        var SearchCriteria = "";



        if ($scope.SearchDepartmentNameAndItemSize != undefined && $scope.SearchDepartmentNameAndItemSize != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([SA].[AdjustmentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([D].[DepartmentName] LIKE '%" + $scope.SearchDepartmentNameAndItemSize + "%' OR [I].[ItemCode] LIKE '%" + $scope.SearchDepartmentNameAndItemSize + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchDepartmentNameAndItemSize !== undefined && $scope.SearchDepartmentNameAndItemSize != null && $scope.SearchDepartmentNameAndItemSize != "") {
            SearchCriteria = "([D].[DepartmentName] LIKE '%" + $scope.SearchDepartmentNameAndItemSize + "%' OR [I].[ItemCode] LIKE '%" + $scope.SearchDepartmentNameAndItemSize + "%')";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([SA].[AdjustmentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')";
            //alert("Date Success!!!!!");
        }

        $http({
            url: encodeURI('/StockAdjustment/GetStockAdjustmentPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data != "") {
                if (data.ListData.length > 0) {
                    angular.forEach(data.ListData, function (aSd) {
                        var res1 = aSd.AdjustmentDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.AdjustmentDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.AdjustmentDate = date1;

                        }

                    })

                }
                else {
                    $scope.StockAdjustmentListPaged = [];
                    alertify.log('Stock Adjustment  Not Found', 'error', '5000');

                }
            }

            $scope.StockAdjustmentListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetStockAdjustmentPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetStockAdjustmentPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetStockAdjustmentPaged($scope.currentPage);
        }
        //  }


    }
});

