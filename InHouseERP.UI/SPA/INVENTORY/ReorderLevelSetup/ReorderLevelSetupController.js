app.controller("ReorderLevelSetupController", function ($scope, $rootScope, $cookieStore, $http, $httpParamSerializer) {

    Clear();
    $scope.ReorderLevelList = [];
    $scope.Storelist = [];
    $scope.CategoryList = [];
    $scope.SubcategoryList = [];
    $scope.ItemSearchResultList = [];
    $scope.SearchBtnDisable = false;
    $scope.ExportBtnDisable = false;
    $scope.ddlSrcSubategory = null;
    $scope.ImportExcelListData = [];
    $scope.ItemUnitlist = [];
  


    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Reorder Level Setup').ScreenId;
        //    // GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Reorder Level Setup').ScreenId;
        //        //  GetUsersPermissionDetails();
        //    }, 500);
        //}

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Reorder Level Setup').ScreenId;
        //GetUsersPermissionDetails();

        $scope.ReorderLevelList = [];
        $scope.ddlStoreDisable = false;
        GetAllStore();
        GetAllCategory();
        GetAllSubCategory();
        GetAllProduct();
        GetAllItemUnit();
        $scope.ddlStore = null;
        $scope.ddlSrcCategory = null;
        $scope.ddlSrcSubategory = null;
        $scope.ddlProduct = null;
        $('#browsFile').val("");
        angular.element("input[type='file']").val("");
        $scope.AllItemList = [];
        GetAllItem();


        $scope.subcategorySection = [];
        $scope.subCategorysectionIdList = [];

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

        $scope.itemListSection = [];
        $scope.itemsectionIdList = [];
        $scope.itemListsettings = {
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
        }

        $scope.ddlStore = null;
        $scope.ddlSrcCategory = null;
        $scope.ddlSrcSubategory = null;


    }

    function GetAllStore() {
        //$scope.LoginUser = $cookieStore.get('UserData');
        $http({
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (userOutletList) {
            $scope.Storelist = userOutletList;

            if ($scope.Storelist.length == 1) {
                $scope.ddlStore = { 'DepartmentId': $scope.Storelist[0].DepartmentId };
            }
        });
    }

    function GetAllProduct() {
        var SearchCriteria = '1=1';
        $http({
            url: '/Item/GetItemSearchResult?searchCriteria=' + SearchCriteria,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemSearchResultList = angular.copy(data);
        });
    }

   

    $scope.ItemsectionPlaceholder = {
        buttonDefaultText: "Select Item",
        searchPlaceholder: "Search Item"
    };

    $scope.sectionPlaceholder = {
        buttonDefaultText: "Select Sub Category",
        searchPlaceholder: "Search Sub Category"
    };

    $scope.SelectSection = function () {
        $scope.SectionIds = '';
        angular.forEach($scope.subCategorysectionIdList, function (data) {
            $scope.SectionIds += $scope.SectionIds == '' ? data.id : (',' + data.id)

        });
    }


    function GetAllItem() {
        $http({
            url: '/Item/GetAllItem',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllItemList = data;
        });
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

    function GetAllItemUnit() {
        $http({
            url: '/Unit/GetAllUnit',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //Delete unuse property 
            data.forEach(function (aData) {
                delete aData.CreatorId;
                delete aData.CreateDate;
                delete aData.UpdatorId;
                delete aData.UpdateDate;
            });
            $scope.ItemUnitlist = data;
        });
    }

    function GetAllSubCategory() {
        $http({
            url: '/Subcategory/GetAllSubategory',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SubcategoryList = data;
           // $scope.subcategorySection = data;

            angular.forEach(data, function (aSCat) {
                $scope.subcategorySection.push({ id: aSCat.SubCategoryId, label: aSCat.SubCategoryName });
            })
        });
    }

    //$scope.$watch('ReorderLevelList', function (newValue, oldValue) {
    //    if (newValue !== oldValue) {
    //        if ($scope.ReorderLevelList.length > 0) {
    //            $scope.ExportBtnDisable = true;
    //        } else {
    //            $scope.ExportBtnDisable = false;
    //        }
    //    }
    //});

    $scope.ClearsorList = function () {
        $scope.ReorderLevelList = [];
    }

    $scope.SelectCategory = function () {
        $scope.ddlProduct = new Object();
        var SearchCriteria = '1=1';
        if ($scope.ddlSrcCategory != null) {
            SearchCriteria += ' AND C.CategoryId=' + $scope.ddlSrcCategory.CategoryId;
        }

        $http({
            url: '/Item/GetItemSearchResult?searchCriteria=' + SearchCriteria,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemSearchResultList = data;
           
        });
    };
   
   

    $scope.SelectSubategory = function () {
        document.getElementById("dropdowanDisable").disabled = false;
        $scope.ReorderLevelList = [];
        $scope.ddlProduct = new Object();
        var SearchCriteria = '1=1';
        if ($scope.ddlSrcCategory != null) {
            SearchCriteria += ' AND C.CategoryId=' + $scope.ddlSrcCategory.CategoryId;
        }
        if ($scope.ddlSrcSubategory != null) {
            SearchCriteria += ' AND I.SubCategoryId=' + $scope.ddlSrcSubategory.SubCategoryId;
        }
        $http({
            url: '/Item/GetItemSearchResult?searchCriteria=' + SearchCriteria,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemSearchResultList = data;
            angular.forEach(data, function (aItem) {
                $scope.itemListSection.push({ id: aItem.ItemId, label: aItem.ItemName + " " + aItem.ItemDescription + " " + aItem.ItemDescriptionTwo + " " + aItem.ItemCode});

            });
        });
    };

    $scope.unitFilter = function (RawItem) {
        return function (pram) {
            return (pram.ItemUnitId == RawItem.UnitId) || (pram.ItemUnitId == RawItem.PackageId) || (pram.ItemUnitId == RawItem.ContainerId);
        };
    };

    $scope.SearchReorderlevel = function () {
        $scope.ExportBtnDisable = true;
        //var ItemIds = $scope.itemsectionIdList;
        $scope.ReorderLevelList = [];

        $scope.ItemIds = '';
        angular.forEach($scope.itemsectionIdList, function (data) {
            $scope.ItemIds += $scope.ItemIds == '' ? data.id : (',' + data.id);
        });
       
        $http({
            url: '/ReorderLevelSetup/SearchReorderlevel?depId=' + $scope.ddlStore.DepartmentId + '&categoryId=' + $scope.ddlSrcCategory.CategoryId + '&subcategoryId=' + $scope.ddlSrcSubategory.SubCategoryId + '&itemIds=' + $scope.ItemIds,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
           // 
            if (data.length > 0 && data != null) {

                if ($scope.ddlSrcSubategory == null || $scope.ddlSrcSubategory == undefined || $scope.ddlSrcCategory == null || $scope.ddlProduct == null || $scope.ddlProduct == null == undefined || $scope.ddlProduct == undefined) {
                    $scope.ReorderLevelList = data;
                } else {
                    angular.forEach(data, function (aData) {
                        aData.SubCategoryName = $scope.ddlSrcSubategory.SubCategoryName;
                        $scope.ReorderLevelList.push(aData);
                    });
                }
                
              
                angular.forEach($scope.ReorderLevelList, function (aReorderLevel) {
                    if (aReorderLevel.ReorderUnitId > 0) {
                        aReorderLevel.ddlUnitReorderlevel = { "ItemUnitId": aReorderLevel.ReorderUnitId };
                    }
                    else {
                        var reorderUnitId = aReorderLevel.ContainerId > 0 ? aReorderLevel.ContainerId : (aReorderLevel.PackageId > 0 ? aReorderLevel.PackageId : aReorderLevel.UnitId);
                        aReorderLevel.ddlUnitReorderlevel = { "ItemUnitId": reorderUnitId };
                        aReorderLevel.ReorderUnitId = reorderUnitId;

                        angular.forEach($scope.ItemUnitlist, function (aUnit) {
                            if (aUnit.ItemUnitId == reorderUnitId) {
                                aReorderLevel.UnitName = aUnit.UnitName;
                            }
                        })
                    }
                });
            }
            else {
                alertify.log('No data found.', 'Error', 5000);
            }
        });
    };

    $scope.RemoveItemReorder = function (itemReorder) {
        var ind = $scope.ReorderLevelList.indexOf(itemReorder);
        $scope.ReorderLevelList.splice(ind,1);
    }

    $scope.exportData = function () {
        var mystyle = {
            headers: true,
            columns: [
                { columnid: 'DepartmentName', width: 100 },
                { columnid: 'CategoryName', width: 100 },
                { columnid: 'SubCategoryName', width: 100 },
                { columnid: 'ItemName', width: 200 },
                { columnid: 'UnitName', width: 100 },
                { columnid: 'MinReorderLevel', width: 100 },
                { columnid: 'MaxReorderLevel', width: 100 },
              /*  { columnid: 'ContainerId', width: 0 },*/
                { columnid: 'StockQty', width: 0 },
                //{ columnid: 'ReorderLevelId', width: 0 },
                //{ columnid: 'ReorderUnitId', width: 0 }

                /*    { columnid: 'ItemCode', width: 100 },*/
              //  { columnid: 'Difference', width: 0 },
               // { columnid: 'PackageId', width: 0 },
               // { columnid: 'UnitId', width: 0 },
             
             //   { columnid: 'DepartmentId', width: 0 },
               // { columnid: 'ItemId', width: 0 },
              
            ]
        };
        alasql('SELECT * INTO XLSXML("ReorderLevelData.xls",?) FROM ?', [mystyle, $scope.ReorderLevelList]);
    };



    $scope.SimpleExcelFileDowanload = function () {
        var mystyle = {
            headers: true,
            columns: [
                { columnid: 'DepartmentName', width: 100 },
                { columnid: 'CategoryName', width: 100 },
                { columnid: 'SubCategoryName', width: 100 },
                { columnid: 'ItemName', width: 200 },
                { columnid: 'UnitName', width: 100 },
                { columnid: 'MinReorderLevel', width: 100 },
                { columnid: 'MaxReorderLevel', width: 100 },
                { columnid: 'StockQty', width: 0 },
                /*   { columnid: 'ContainerId', width: 0 },*/
                /*    { columnid: 'ItemCode', width: 100 },*/
              
                //  { columnid: 'Difference', width: 0 },
                // { columnid: 'PackageId', width: 0 },
                // { columnid: 'UnitId', width: 0 },
               /* { columnid: 'ReorderLevelId', width: 0 },*/
                //   { columnid: 'DepartmentId', width: 0 },
                // { columnid: 'ItemId', width: 0 },
               /* { columnid: 'ReorderUnitId', width: 0 }*/
            ]
        };
        alasql('SELECT * INTO XLSX("SimpleReorderFile.xlsx",?) FROM ?', [mystyle,0]);
    };


    $scope.AddReorderLevel = function (depId) {
        $scope.ReorderLevelist_save = [];

        angular.forEach($scope.ReorderLevelList, function (aReorderLevel) {
            //if (aReorderLevel.MinReorderLevel > 0 && aReorderLevel.ReorderUnitId >= 1)
            //{
            //    aReorderLevel.selected = true;
            //}
            //else {
            //    aReorderLevel.selected = false;
            //}
         
          //  if (aReorderLevel.selected) {
                var ItemReOder = {};
                ItemReOder.UnitName = aReorderLevel.UnitName;
                ItemReOder.ItemName = aReorderLevel.ItemName;
                ItemReOder.MaxReorderLevel = aReorderLevel.MaxReorderLevel;
                ItemReOder.MinReorderLevel = aReorderLevel.MinReorderLevel;
                ItemReOder.ReorderUnitId = aReorderLevel.ddlUnitReorderlevel.ItemUnitId;
                ItemReOder.ItemId = aReorderLevel.ItemId;

                if ($scope.ddlStore == null || $scope.ddlStore == undefined) {
                    ItemReOder.DepartmentId = aReorderLevel.DepartmentId;
                } else {
                    ItemReOder.DepartmentId = $scope.ddlStore.DepartmentId;
                   
                }
              
             
                $scope.ReorderLevelist_save.push(ItemReOder);
           // }
        });



        //Save
        $.ajax({
            url: "/ReorderLevelSetup/SaveReorderLevel",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            type: "POST",
            data: JSON.stringify({ SaveReorderLevellist: $scope.ReorderLevelist_save }),
            success: function (data) {
                alertify.log('Reorder Level Saved Successfully!', 'success', '5000');
                $scope.ExportBtnDisable = false;
                Clear();
                $scope.reorderLevelSetupForm.$setPristine();
                $scope.reorderLevelSetupForm.$setUntouched();
            }, error: function (msg) {
                alertify.log('Server Save Errors!', 'error', '5000');
            }
        });
    };

    $scope.resetReorderLevelSetupForm = function () {
        $scope.ExportBtnDisable = false;
        Clear();
        $scope.reorderLevelSetupForm.$setPristine();
        $scope.reorderLevelSetupForm.$setUntouched();
    };

    //$scope.selectedFile = null;
    //$scope.msg = "";


    //$scope.loadFile = function (files) {

    //    $scope.$apply(function () {

    //        $scope.selectedFile = files[0];

    //    });

    //    var file = $scope.selectedFile;

    //    if (file) {

    //        var reader = new FileReader();

    //        reader.onload = function (e) {

    //            var data = e.target.result;

    //            var workbook = XLSX.read(data, { type: 'binary' });

    //            var first_sheet_name = workbook.SheetNames[0];

    //            $scope.ReorderLevelList = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);



    //        }

    //        reader.onerror = function (ex) {

    //        }

    //        reader.readAsBinaryString(file);
    //    }

    //}





    
});

app.directive("fileread", [function () {
    
    return {
        link: function ($scope, $elm) {
            $elm.on('change', function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function () {
                        var data = evt.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        $scope.ImportExcelListData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

                      
                        angular.forEach($scope.ImportExcelListData, function (aData) {
                            angular.forEach($scope.AllItemList, function (aItem) {
                                if (aData.ItemCode == aItem.ItemCode) {
                                    aData.ItemId = aItem.ItemId;
                                }
                            });

                            angular.forEach($scope.Storelist, function (aStore) {
                                if (aData.DepartmentName == aStore.DepartmentName) {
                                    aData.DepartmentId = aStore.DepartmentId;
                                }
                            })

                            angular.forEach($scope.ItemUnitlist, function (aU) {
                               
                                if (aData.UnitName == aU.UnitName) {

                                    aData.ddlUnitReorderlevel = { ItemUnitId: aU.ItemUnitId };
                                  
                                    $scope.ReorderLevelList.push(aData);
                                    console.log("ReorderLevelList", $scope.ReorderLevelList);
                                }

                            });

                           

                            
                        })

                        var erroMsg = [];
                        //Excel Header Formate Checking...
                        for (var i = 0; i < 1; i++) {
                            var aReorderLevel = $scope.ReorderLevelList[0]
                            var length = aReorderLevel.length;
                            var check = [];
                            for (ColumnName in aReorderLevel) {
                                if (ColumnName != 'CategoryName' && ColumnName != 'DepartmentName' && ColumnName != 'SubCategoryName' && ColumnName != 'ItemName' && ColumnName != 'UnitName' && ColumnName != 'MinReorderLevel' && ColumnName != 'MaxReorderLevel' && ColumnName != 'StockQty' && ColumnName != 'ddlUnitReorderlevel' && ColumnName !='ItemCode') {
                                    erroMsg.push({
                                        msg: "Invalid File Format"
                                    });
                                }
                                else {
                                    if (check.length) {
                                        var mathced = 0;
                                        for (var i = 0; i < check.length; i++) {
                                            if (check[i] == ColumnName) {
                                                mathced += 1;
                                            }
                                        }
                                        if (mathced == 0) {
                                            check.push(ColumnName);
                                        }
                                        else {
                                            erroMsg.push({
                                                msg: "Invalid File Format"
                                            });
                                        }
                                    }
                                    else {
                                        check.push(ColumnName);
                                    }
                                }
                            }
                            if (check.length != 10) {
                                erroMsg.push({
                                    msg: "Invalid File Format"
                                });
                            }
                        }

                        //Excel Row Value Checking...
                        angular.forEach($scope.ReorderLevelList, function (aReorderLevel) {
                            if (!IsNumerics(aReorderLevel.MinReorderLevel)) {
                                aReorderLevel.MinReorderLevel = 0;
                            }
                            if (!IsNumerics(aReorderLevel.MaxReorderLevel)) {
                                aReorderLevel.MaxReorderLevel = 0;
                            }

                            //var checked = false;
                            //angular.forEach($scope.ItemUnitlist, function (aItemUnit) {
                            //    if (aReorderLevel.UnitName == aItemUnit.UnitName && aReorderLevel.ReorderUnitId == aItemUnit.ItemUnitId) {
                            //        checked = true;
                            //    }
                            //});

                            //if (!checked) {
                            //    aReorderLevel.ddlUnitReorderlevel = null;
                            //}
                            //else {
                            //    aReorderLevel.ddlUnitReorderlevel = { ItemUnitId: aReorderLevel.ReorderUnitId };
                            //}

                        });

                        //if (erroMsg.length != 0) {
                        //    alertify.log(erroMsg[0].msg + ' on ' + erroMsg.length + ' Places', 'error', '5000');
                        //    $scope.ReorderLevelList = [];
                        //}
                        //else {

                        //    angular.forEach($scope.ReorderLevelList, function (aReorderLevel) {
                        //        aReorderLevel.ddlUnitReorderlevel = { "ItemUnitId": aReorderLevel.ReorderUnitId };
                        //    })

                        //    $scope.ddlStore = { DepartmentId: $scope.ReorderLevelList[0].DepartmentId };
                        //}
                    });
                };
                reader.readAsBinaryString(changeEvent.target.files[0]);
            });
        }
    }
}]);

