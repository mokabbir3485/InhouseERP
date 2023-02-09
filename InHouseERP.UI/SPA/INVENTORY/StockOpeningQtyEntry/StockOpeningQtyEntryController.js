app.controller("StockOpeningQtyEntryController", function ($scope,$rootScope, $cookieStore, $http, $filter) {

    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Stock Opening Quantity').ScreenId;
      //  GetUsersPermissionDetails();

        $scope.CategoryList = [];
        $scope.SubcategoryList = [];
        $scope.DepartmentList = [];
        $scope.OpeningQuantityList = [];
        $scope.OpeningQuantityCheckList = [];
        $scope.LabelBrandList = [];
        $scope.StockOpeningQuantity = {};
        $scope.StockOpeningQuantity.WarrentyAndSerialNoList = [];
        $scope.StoreList = [];
        $scope.listXsl = [];
        $scope.ItemSearchResultList = [];
        $scope.ItemUnitlist = [];
        $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
        $scope.categoryId = 0;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $rootScope.saveBtn = 'Save';

        GetAllCategory();
        GetAllSubCategory();
        GetAllDepartment();
        GetAllStore();
        GetAllProduct();
        //GetLabelBrand();
        $scope.mySwitch = false;
        $scope.ddlStore = null;
        $scope.txtOpening = null;
        angular.element("input[type='file']").val("");
        $scope.ddlCategory = null;
        $scope.ddlSubCategory = null;
        $scope.ddlProduct = null;
        $scope.OpeningQuantityList = [];
        $('#fileName').val('');
        $scope.saveBtn = 'Save';

        
        $scope.ddlmatrialType = null;
        $scope.matrialTypeList = [];
        GetAllmatrialType();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;

        GetStockOpeningPaged($scope.currentPage);
    }

    $scope.focusSearchBox = function () {
        $('.searchBox').focus()
    }
    Clear();
    $scope.OpeningDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

    $("#txtOpeningDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });
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


    $scope.CalendartxtOpeningDate = function () {
        $("#txtOpeningDate").focus();
        $("#txtOpeningDate").trigger("click");
    }
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

    $scope.AddWarrentyAndSerialNoInput = function (PcQty, IsWarrantyAndSerial) {
        if (IsWarrantyAndSerial) {
            $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];

            for (var i = 0; i < PcQty; i++) {
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
    $scope.AddWarrentyInDaysAll = function (WarrentyInDays) {
        angular.forEach($scope.WarrentyAndSerialNoDetailAdAttributeLst, function (aData) {
            aData.WarrentyInDays = WarrentyInDays;
        })
    }
    $scope.CheckDuplicateSerialNo = function (aWarrentyAndSerialNoDetail) {

        var sList = [];
        sList = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst)
            .Where('$.ItemId==' + aWarrentyAndSerialNoDetail.ItemId)
            .ToArray();

        if (!sList.length) {
            return;
        }
        var serialNoFound = "";

        var isFound = false;
        for (var i = 0; i < $scope.WarrentyAndSerialNoDetailAdAttributeLst.length; i++) {
            if ($scope.WarrentyAndSerialNoDetailAdAttributeLst[i].SerialNo == aWarrentyAndSerialNoDetail.SerialNo && $scope.WarrentyAndSerialNoDetailAdAttributeLst[i].TableRowNo != aWarrentyAndSerialNoDetail.TableRowNo) {
                serialNoFound = aWarrentyAndSerialNoDetail.SerialNo;
                aWarrentyAndSerialNoDetail.SerialNo = "";
                isFound = true;
                break;
            }
        }

        if (isFound) {
            alertify.log('<b style="color:yellow;font-weight:bold;">' + serialNoFound + "</b> Found as a Duplicate Value.", "error", "5000");
            return;
        }
        ////////////////////////// Check Duplicate SerialNo from DB
        
        var notEmptySerial = [];
        var OpeningSerialList = [];
        notEmptySerial = Enumerable.From(sList).Where('$.SerialNo!=""').ToArray();

        for (var i = 0; i < notEmptySerial.length; i++) {
            OpeningSerial = {
                DepartmentId: 0,
                ItemId: notEmptySerial[i].ItemId,
                SerialNo: notEmptySerial[i].SerialNo,
                WarrentyInDays: notEmptySerial[i].WarrentyInDays
            }
            OpeningSerialList.push(OpeningSerial);
        }

        var parms = JSON.stringify({ OpeningSerialList: OpeningSerialList });
        $http.post('/StockOpeningQty/GetHardwareWarrantyAndSerial_GetDynamic', parms).success(function (dataFound) {
            if (dataFound.SerialNo == null) {
                return;
            }
            var isSerialExist = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).Where('$.ItemId==' + dataFound.ItemId + '&& $.SerialNo=="' + dataFound.SerialNo + '"').FirstOrDefault();
            if (!angular.isUndefined(isSerialExist)) {
                for (var i = 0; i < $scope.WarrentyAndSerialNoDetailAdAttributeLst.length; i++) {
                    if ($scope.WarrentyAndSerialNoDetailAdAttributeLst[i].SerialNo == aWarrentyAndSerialNoDetail.SerialNo && $scope.WarrentyAndSerialNoDetailAdAttributeLst[i].TableRowNo == aWarrentyAndSerialNoDetail.TableRowNo) {
                        serialNoFound = aWarrentyAndSerialNoDetail.SerialNo;
                        aWarrentyAndSerialNoDetail.SerialNo = "";
                        break;
                    }
                }
                alertify.log('<b style="color:yellow;font-weight:bold;">' + serialNoFound + "</b> Found as a Duplicate Value in Current Stock.", "error", "5000");
            }
        }).error(function (data) {
            alertify.log('Server Save Errors!', 'error', '5000');
        });

    }

    $scope.AddOpeningList = function () {

        if ($scope.ddlProduct.CategoryId != 2) {
            if ($scope.ddlmatrialType == null) {
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

        if ($scope.StockOpeningQuantity.PcQty == null || $scope.StockOpeningQuantity.PcQty == undefined) {
            $scope.StockOpeningQuantity.PcQty = 0;
        }
        if ($scope.StockOpeningQuantity.RollQty == null || $scope.StockOpeningQuantity.RollQty == undefined) {
            $scope.StockOpeningQuantity.RollQty = 0;
        }

        $scope.StockOpeningQuantity.CategoryId = $scope.ddlProduct.CategoryId;
        $scope.StockOpeningQuantity.SubCategoryId = $scope.ddlProduct.SubCategoryId;
        $scope.StockOpeningQuantity.OpeningDate = $scope.OpeningDate;

        var serialNoNotFound = false;

        if ($scope.IsWarrantyAndSerial) {
            if ($scope.WarrentyAndSerialNoDetailAdAttributeLst.length > 0) {
                for (var i = 0; i < $scope.WarrentyAndSerialNoDetailAdAttributeLst.length; i++) {
                    if ($scope.WarrentyAndSerialNoDetailAdAttributeLst[i].SerialNo == '' || $scope.WarrentyAndSerialNoDetailAdAttributeLst[i].SerialNo == '0' || $scope.WarrentyAndSerialNoDetailAdAttributeLst[i].WarrentyInDays == null) {
                        serialNoNotFound = true;
                        break;
                    }
                }

            }
        }


        if (serialNoNotFound) {
            alertify.log('Insert warrenty in days and serial number properly!', 'error', '5000');
            return;
        } else {
            if ($scope.WarrentyAndSerialNoDetailAdAttributeLst.length > 0) {
                $scope.StockOpeningQuantity.WarrentyAndSerialNoList = $scope.WarrentyAndSerialNoDetailAdAttributeLst;
            }
            else {
                $scope.WarrentyAndSerialNoList = null;
                $scope.StockOpeningQuantity.WarrentyAndSerialNoList = $scope.WarrentyAndSerialNoList;
            }

            $scope.OpeningQuantityList.push($scope.StockOpeningQuantity);
            $scope.StockOpeningQuantity = {};
            //$scope.ddlStore = null;
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
                placeholder: "Search for: Item Name ~ ItemDescription ~ Size Code",
                templateResult: formatOutput,
            });
            $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
            $scope.IsWarrantyAndSerial = false;
        }


    };

    $scope.AddOpeningQty = function () {
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                if ($scope.OpeningQuantityList.length > 0) {
                    angular.forEach($scope.OpeningQuantityList, function (aData) {
                        aData.UpdatorId = $scope.LoginUser.UserId;
                    })
                    var parms = JSON.stringify({ OpeningQuantityCheckList: $scope.OpeningQuantityList });
                    $http.post('/StockOpeningQty/PostOpeningQty', parms).success(function (data) {
                        alertify.log('Item Stock Save Successfully!', 'success', '5000');
                        Clear();
                        $scope.StockOpeningQtyEntryForm.$setPristine();
                        $scope.StockOpeningQtyEntryForm.$setUntouched();
                    }).error(function (data) {
                        alertify.log('Server Save Errors!', 'error', '5000');
                    });
                }
                else {
                    alertify.log('Save failed.', 'error', '5000');
                }
            }
        })
         
        
        
    }



    $scope.ClearOpenintQtyList = function () {
        $scope.OpeningQuantityList = [];
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
    $scope.SearchOpeningQuantity = function (depId, ItemId) {
        if (depId != undefined && ItemId != undefined) {
            if ($scope.ddlmatrialType == undefined || $scope.ddlmatrialType == null) {
                $scope.ddlmatrialType = {};
                $scope.ddlmatrialType.MaterialTypeId = 0;
                $('#MaterialType1').select2('destroy');
                $('#MaterialType1').val('').select2({
                    placeholder: "--Material Material Type--"
                });
            }
            if ($scope.ddlLabelBrand == undefined || $scope.ddlLabelBrand == null) {
                $scope.ddlLabelBrand = {};
                $scope.ddlLabelBrand.LabelBrandId = 0;
                $('#LabelBrand').select2('destroy');
                $('#LabelBrand').val('').select2({
                    //placeholder: "--Label Brand--"
                });
            }
            $http({
                url: '/StockOpeningQty/SearchOpeningQuantity?ItemId=' + ItemId + '&depId=' + depId + '&MaterialTypeId=' + $scope.ddlmatrialType.MaterialTypeId + '&LabelBrandId=' + $scope.ddlLabelBrand.LabelBrandId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.StockOpeningQuantity = data[0];
                SearchWarrantyAndSerial($scope.StockOpeningQuantity.StockOpeningQtyId);
                if ($scope.StockOpeningQuantity.StockOpeningQtyId != 0) {
                    $scope.DisAddBtn = true;
                    alertify.log('There is already an opening stock Quantity  for this item.', 'error', '5000');
                } else {
                    $scope.DisAddBtn = false;
                }
                
                
            });
        }
        
    }
    function SearchWarrantyAndSerial(StockOpeningQtyId) {
        $http({
            url: '/StockOpeningQty/OpeningStockWarrantyAndSerialGetByStockOpeningQtyId?StockOpeningQtyId=' + StockOpeningQtyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.WarrentyAndSerialNoDetailAdAttributeLst = data;
                
        });
       
        
    }
    
    $scope.RemoveOpening = function (alistXsl) {
        var ind = $scope.OpeningQuantityList.indexOf(alistXsl);
        $scope.OpeningQuantityList.splice(ind, 1);
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
        GetStockOpeningPaged(1);
    }

    $scope.StockOpeningSearch = function () {
        GetStockOpeningPaged(1);

    }

    function GetStockOpeningPaged(curPage) {

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
            SearchCriteria = "([OS].[OpeningDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([D].[DepartmentName] LIKE '%" + $scope.SearchDepartmentNameAndItemSize + "%' OR [I].[ItemCode] LIKE '%" + $scope.SearchDepartmentNameAndItemSize + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchDepartmentNameAndItemSize !== undefined && $scope.SearchDepartmentNameAndItemSize != null && $scope.SearchDepartmentNameAndItemSize != "") {
            SearchCriteria = "([D].[DepartmentName] LIKE '%" + $scope.SearchDepartmentNameAndItemSize + "%' OR [I].[ItemCode] LIKE '%" + $scope.SearchDepartmentNameAndItemSize + "%')";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([OS].[OpeningDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')";
            //alert("Date Success!!!!!");
        }

        $http({
            url: encodeURI('/StockOpeningQty/GetStockOpeningPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data != "") {
                if (data.ListData.length > 0) {
                    angular.forEach(data.ListData, function (aSd) {
                        var res1 = aSd.OpeningDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aSd.OpeningDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aSd.OpeningDate = date1;

                        }

                    })

                }
                else {
                    $scope.StockOpeningListPaged = [];
                    alertify.log('Stock Opening  Not Found', 'error', '5000');

                }
            }

            $scope.StockOpeningListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;

        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetStockOpeningPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetStockOpeningPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetStockOpeningPaged($scope.currentPage);
        }
        //  }


    }
});

