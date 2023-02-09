
app.directive('itemDirective', [function () {
    return {
        restrict: 'EA',
        controller: function ($scope, $rootScope, $http, $route, $cookieStore, $window) {
            $scope.name = 'My name is directive controller';
            
            

            Clear();
            BindData();

            function Clear() {
                var UserData = sessionStorage.getItem("UserDataSession");
                if (UserData != null) {
                    $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
                }
                $scope.UserId = $scope.LoginUser.UserId;
                $scope.FullName = $scope.LoginUser.FullName;
                $scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));


                var PermissionData = sessionStorage.getItem("PermissionDataSession");
                if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                $scope.ProductScreenId = Permission.find(v => v.ScreenName == 'Product').ScreenId;
                GetUsersPermissionDetails();


                $scope.name = 'Shuvo';
                $scope.DuplicateBarcodeFound = false;
                $scope.ScreenLockInfo = [];
                $scope.ItemPackageUnitlist = [];
                $scope.ItemMainlist = [];
                $scope.AllItemSearch = [];
                $scope.FirstAttributeList = [];
                $scope.ItemSearchResultList = [];
                $scope.SpecialItemList = [];
                $scope.DeleteTagRibbonWithLabelList = [];
                //$scope.ItemNameList = ["Barcode Label", "Barcode Ribbon"];
                $scope.ItemNameList = [
                    { 'ItemName': 'Barcode Label' },
                    { 'ItemName': 'Barcode Ribbon' },
                    { 'ItemName': 'Sequential Label' },
                    { 'ItemName': 'Jumbo Roll' }

                ];
                
                $scope.HsCodeList = [];
                $scope.ControlHeadList = [];
                $scope.found = false;
                $scope.ad_Item = {};
                $scope.DeleteTagRibbonWithLabelIdObj = {};
                $scope.ItemAdditionalAttribute = {};
                $scope.ad_ItemVat = {};
                $scope.ad_ItemVat.Vat = 0;
                $scope.ad_ItemVat.Sd = 0;
                $scope.ad_Item.IsActive = true;
                $scope.ad_Item.ItemId = 0;
                $scope.ad_Item.HardwareAttributeId = 0;
                $scope.ad_Item.UnitPerPackage = 1;
                //$scope.ad_Item.ContainerId = 0;
                RemoveImgURL("imgFram");
                $scope.ddlCategory = null;
                $scope.ddlSubCategory = null;
                $scope.ddlItemUnit = null;
                $scope.ad_Item.ContainerId = 0;
                $scope.btnItemDeleleShow = false;
                $scope.ad_Item.IsActive = true;
                $scope.ConfirmationMessageForAdmin = false;
                GetConfirmationMessageForAdmin();
                //GetUsersPermissionDetails();
                GetByCombinationValue();
                GetHsCode();
                GetAllControlHead();
                GetAllItemForSpecial();
                ReportNotificationDetail_Get();
                $scope.ReportNotificationDetailListForIE = [];

                $scope.EmailSendNotification = {};
                //GetItemSearchResultPaged($scope.currentPage, $scope.SearchCriteria);

                $scope.btnSaveItem = "Save";
                $scope.btnUnitPackage = $scope.ddlItemPackage;

                $scope.btnPackageWeight = "Roll Weight";
                $scope.btnPackagePerContainer = "Package Per Container";
                $scope.btnContainerWeight = "Carton Weight";
                $scope.btnContainerSize = "Carton Size";
                $scope.Package = false;
                $scope.Container = false;
                $scope.ItemUnitlist2 = [];
                $scope.ItemUnitlist3 = [];

            }
            function ReportNotificationDetail_Get() {
                $http({
                    url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'IE',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (notification) {
                    $scope.ReportNotificationDetailListForIE = notification;
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

                var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ProductScreenId;
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

            function GetAllControlHead() {

                $http({
                    url: '/ItemAdditionalAttribute/GetAllControlHead',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (ControlHeadList) {
                    $scope.ControlHeadList = ControlHeadList;

                })
            }
            $scope.hideButton = function () {
                if ($scope.IsSpecialItem == true) {
                    $scope.IsSpecialItem = false;
                } else {
                    $scope.IsSpecialItem = true;
                }
            };
            $scope.AddSpecialItem = function (ddlSpecialItem) {
                $scope.SpecialItemList.push(ddlSpecialItem);
                $scope.ddlSpecialItem = null;
                $('#SpecialItem').select2('destroy');
                $('#SpecialItem').val('').select2({
                    placeholder: "Search for company wise: Item Name ~ Description ~ Item Code ~ Pc(s) Per Roll ~ Roll Per Carton ~ Hs Code",
                    
                });
            }
            
            $scope.RemoveSpecialItem = function (aSpecialItem) {
                var index = $scope.SpecialItemList.indexOf(aSpecialItem);
                $scope.SpecialItemList.splice(index, 1);
                if (aSpecialItem.Id > 0) {
                    $scope.DeleteTagRibbonWithLabelIdObj = {};
                    $scope.DeleteTagRibbonWithLabelIdObj.Id = aSpecialItem.Id;
                    $scope.DeleteTagRibbonWithLabelList.push($scope.DeleteTagRibbonWithLabelIdObj);
                }
            }
            function GetRibbonInPerLabelCarton_GetAllLabel(RibbonId) {
                $http({
                    url: "/Item/GetRibbonInPerLabelCarton_GetAllLabel?RibbonId=" + RibbonId,
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    $scope.SpecialItemList = data;
                    angular.forEach($scope.SpecialItemList,
                        function (aData) {
                            aData.TempItemName = aData.ItemName +
                                " ~ " +
                                aData.ItemDescription +
                                " ~ " +
                                aData.ItemDescriptionTwo +
                                " ~ " + "Unit Per Package:" +
                                aData.UnitPerPackage +
                                " ~ " +
                                aData.HsCode +
                                " ~ " + "Item Code:" +
                                aData.ItemCode +
                                " ~ " + "Package Per Container:" +
                                aData.PackagePerContainer +
                                " ~ " + "Package Weight:" +
                                aData.PackageWeight +
                                " ~ " + "Container Weight:" +
                                aData.ContainerWeight +
                                " ~ " + "Item Id:" +
                                aData.ItemId;
                            $scope.IsSpecialItemModel = true;
                            $scope.IsSpecialItem = true;
                        }); 
                    
                })
            }
            $scope.hideBtnColapse = function () {
                $scope.IsChecked == false;

                //ainv_PurchaseBill.ShipmentInfo = ainv_PurchaseBill.ShipmentInfo == null ? "" : ainv_PurchaseBill.ShipmentInfo;
                //$scope.IsChecked = $scope.IsChecked == false ? true : false;
                //if ($scope.btnIcon == "+") {
                //    $scope.invDetailsFiledHide = true;
                //} 
            }
            function GetAllItemForSpecial() {
                $http({
                    url: "/Item/GetAllItem",
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    $scope.ItemSearchForSpecialList = data;

                    angular.forEach($scope.ItemSearchForSpecialList,
                        function (aData) {
                            aData.TempItemName = aData.ItemName +
                                " ~ " +
                                aData.ItemDescription +
                                " ~ " +
                                aData.ItemDescriptionTwo +
                                " ~ " + "Unit Per Package:" +
                                aData.UnitPerPackage +
                                " ~ " +
                                aData.HsCode +
                                " ~ " + "Item Code:" +
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
                });
            };
            function BindData() {
                $scope.CategoryList = [];
                $scope.SubcategoryList = [];
                $scope.ItemUnitlist = [];
                GetAllCategory();
                GetAllSubCategory();
                GetAllItemUnit();
            }

            $scope.itemNameId = function () {
                var itemname = $scope.ad_Item.ItemName;
                //console.log(itemname);
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
            function GetAllCategory() {
                $http({
                    url: "/Category/GetAllCategory",
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    $scope.CategoryList = data;
                });
            }

            function GetAllSubCategory() {
                $http({
                    url: "/Subcategory/GetAllSubategory",
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    $scope.SubcategoryList = data;
                });
            }

            function GetAllItemUnit() {
                $http({
                    url: "/Unit/GetAllUnit",
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {

                    $scope.ItemUnitlist = data;
                    //angular.forEach(data, function (aData) {
                    //    if (aData.ItemUnitId != 1003) {
                    //        $scope.ItemUnitlist.push(aData);
                    //    }
                    //})
                    //console.log($scope.ItemUnitlist);
                });
            }


            function GetByCombinationValue() {
                $http({
                    url: "/Item/GetByCombinationValue",
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    $scope.ItemMainlist = data;
                });
            }


            $scope.Unit = function (e) {
                $scope.ItemUnitlist2 = [];
                if (e != null || e != undefined) {
                    if (e.ItemUnitId == 1) {
                        angular.forEach($scope.ItemUnitlist, function (Unit) {
                            if (Unit.ItemUnitId != 1 && Unit.ItemUnitId != 3 && Unit.ItemUnitId != 1003) {
                                $scope.ItemUnitlist2.push(Unit);
                            }
                        })

                    }

                    else if (e.ItemUnitId <= 2 && e.ItemUnitId > 1) {
                        angular.forEach($scope.ItemUnitlist, function (Unit) {
                            if (Unit.ItemUnitId != 2 && Unit.ItemUnitId != 1 && Unit.ItemUnitId != 1003) {
                                $scope.ItemUnitlist2.push(Unit);
                            }


                        })

                    } else if (e.ItemUnitId == 1003) {
                        angular.forEach($scope.ItemUnitlist, function (Unit) {
                            if (Unit.ItemUnitId != 2 && Unit.ItemUnitId != 1 && Unit.ItemUnitId != 1003) {
                                $scope.ItemUnitlist2.push(Unit);
                            }
                        })
                    }

                    else if (e.ItemUnitId <= 3 && e.ItemUnitId > 1 && e.ItemUnitId > 2) {
                        angular.forEach($scope.ItemUnitlist, function (Unit) {
                            if (Unit.ItemUnitId != 2 && Unit.ItemUnitId != 1 && Unit.ItemUnitId != 3 && Unit.ItemUnitId != 1003) {
                                $scope.ItemUnitlist2.push(Unit);
                            }
                        })
                    }
                    else {
                        e.ItemUnitId = 0;
                    }
                }


            }
            $scope.PackageUnit = function (e) {
                $scope.ItemUnitlist3 = [];

                if (e != null || e != undefined) {

                    if (e.ItemUnitId <= 2) {
                        angular.forEach($scope.ItemUnitlist, function (Unit) {
                            if (Unit.ItemUnitId != 2 && Unit.ItemUnitId != 1 && Unit.ItemUnitId != 1003) {
                                $scope.ItemUnitlist3.push(Unit);
                            }
                        })
                    }
                }




            }

            $scope.CategoryChange1 = function (SubCategoryId) {
                $scope.AllItemSearch = [];
                $scope.FirstAttributeList = [];
                //$scope.ad_Item.ItemName = null;
                //$scope.ad_Item.ItemDescription = null;
                //$scope.itemEntryNewForm.$setUntouched();
                //$scope.itemEntryNewForm.$setPristine();

                if (SubCategoryId == 4 || SubCategoryId == 14) {
                    //GetRibbonInPerLabelCarton_GetAllLabel(item.ItemId);
                    $scope.IsLabel = false;
                } else {
                    $scope.IsLabel = true;
                    $scope.IsSpecialItemModel = false;
                    $scope.IsSpecialItem = false;
                    $scope.SpecialItemList = [];
                }
            };

            $scope.SelectddlItemUnit = function (item) {
                if (item) {
                    $scope.ItemPackageUnitlist = angular.copy($scope.ItemUnitlist);
                } else {
                    $scope.ItemPackageUnitlist = null;
                }
                $window.scrollTo(0, 0);
            };

            $scope.ItemSearchTextChange = function (subCategoryId) {
                $scope.ad_Item.ItemDescription = null;
                ad_Item.ItemName;
                var ItemSearchList = Enumerable.From($scope.ItemMainlist).Where("$.SubCategoryId==" + subCategoryId)
                    .ToArray();

                if ($scope.ad_Item.ItemName != undefined &&
                    $scope.ad_Item.ItemName != null &&
                    $scope.ad_Item.ItemName != "") {
                    var SingleSearchItem = $scope.ad_Item.ItemName.split(" ");
                    var SearchCriteria = "";
                    myHilitor = new Hilitor2("SearchResults");
                    myHilitor.remove();
                    for (var i = 0; i < SingleSearchItem.length; i++) {
                        myHilitor.setMatchType("open");
                        if (SearchCriteria == "") {
                            SearchCriteria =
                                "~($.ItemName).toUpperCase().indexOf('" + SingleSearchItem[i] + "'.toUpperCase())";
                        } else {
                            SearchCriteria += " && ~($.ItemName).toUpperCase().indexOf('" +
                                SingleSearchItem[i] +
                                "'.toUpperCase())";
                        }

                        myHilitor.apply(SingleSearchItem[i]);
                    }

                    $scope.AllItemSearch = Enumerable.From(ItemSearchList).Where(SearchCriteria).Take(8).ToArray();
                    $scope.ShowItemSearch = true;
                } else
                    $scope.ShowItemSearch = false;

                var firstAttribute = Enumerable
                    .From((Enumerable.From(ItemSearchList).Select("x => { FirstAttribute: x['FirstAttribute'] }")
                        .ToArray())).Distinct("$.FirstAttribute").ToArray();
                for (var i = 0; i < firstAttribute.length; i++) {
                    var obj = {};
                    obj.AttributeValue = firstAttribute[i].FirstAttribute;
                    $scope.FirstAttributeList.push(obj);
                }
            };

            $scope.LoadAnItem = function (aItem) {
                //console.log($scope.aItem);
                $scope.ad_Item.ItemName = aItem.ItemName;
                $scope.ShowItemSearch = false;
                $scope.AllItemSearch = [];

                $("#txtFirstDescription").focus();

                //var ItemSearchList = Enumerable.From($scope.ItemMainlist).Where("$.SubCategoryId==" + $scope.ddlSubCategory.SubCategoryId).ToArray();

                //var firstAttribute = Enumerable.From((Enumerable.From(ItemSearchList).Select("x => { FirstAttribute: x['FirstAttribute'] }").ToArray())).Distinct("$.FirstAttribute").ToArray();
                //for (var i = 0; i < firstAttribute.length; i++) {
                //    var obj = {};
                //    obj.AttributeValue = firstAttribute[i].FirstAttribute;
                //    $scope.FirstAttributeList.push(obj);
                //}
            };

            $scope.FirstDescriptionTextChange = function () {
                if ($scope.ad_Item.ItemDescription != undefined &&
                    $scope.ad_Item.ItemDescription != null &&
                    $scope.ad_Item.ItemDescription != "") {
                    $scope.FirstAttributeSearch = Enumerable.From($scope.FirstAttributeList)
                        .Where("~($.AttributeValue).toUpperCase().indexOf('" +
                            $scope.ad_Item.ItemDescription +
                            "'.toUpperCase())").Take(8).ToArray();
                    $scope.ShowFirstAttribute = true;
                } else
                    $scope.ShowFirstAttribute = false;
            };

            $scope.LoadFirstAttributeValue = function (attributeValue) {
                $scope.ad_Item.ItemDescription = attributeValue;
                $scope.ShowFirstAttribute = false;
                $("#txtItemCode").focus();
            };

            $scope.CheckDuplicateBarcode = function () {
                var where = "ItemCode='" + $scope.ad_Item.ItemCode + "' ";
                if ($scope.ad_Item.ItemId > 0)
                    where += "AND ItemId<>" + $scope.ad_Item.ItemId;
                $http({
                    url: "/Item/GetItemSearchResult?searchCriteria=" + where,
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    if (data.length > 0) {
                        alertify.log($scope.ad_Item.ItemCode + " Item Code already exists!", "already", "5000");
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

            $scope.CartonSizeChange = function () {
                if ($scope.ad_Item.ContainerWeight == 0.346) {
                    $scope.ad_Item.ContainerSize = "(33 X 33 X 16)";
                } else if ($scope.ad_Item.ContainerWeight == 0.414) {
                    $scope.ad_Item.ContainerSize = "(35 X 35 X 23)";
                } else if ($scope.ad_Item.ContainerWeight == 0.500) {
                    $scope.ad_Item.ContainerSize = "(35 X 35 X 27)";
                } else {
                    $scope.ad_Item.ContainerSize = "";
                }
            }

            function findDiff(original, edited) {
                var diff = {}
                for (var key in original) {
                    if (original[key] !== edited[key]) diff[key] = edited[key];
                }
                return diff;
            }
            //$scope.Changed = findDiff($scope.user, $scope.ad_Item);
            $scope.test = function () {
                var ChangeName = '';
                var form = $scope.itemEntryTwoForm;
                //var dirtyFormControls = [];
                //var dirtyFormControlsValue = [];
                angular.forEach(form, function (value, key) {
                    if (typeof value === 'object' && value.hasOwnProperty('$modelValue') && value.$dirty) {
                        //dirtyFormControls.push(value.$name);
                        //dirtyFormControlsValue.push(value.$modelValue);
                        if (typeof value.$modelValue === 'object') {
                            value.$modelValue = "Changed " + value.$name + " Value.";
                        }
                        ChangeName += value.$name + ": <strong style='color: red'>" + value.$modelValue + "</strong><br/>";
                    }
                        
                });
                //console.log(dirtyFormControls);
                //console.log(dirtyFormControlsValue);
                console.log(ChangeName);

                //var result = dirtyFormControlsValue.reduce(function (result, field, index) {
                //    result[dirtyFormControls[index]] = field;
                //    return result;
                //}, {})

                //console.log(result);
            }
            $scope.resetChange = function () {
                $scope.ad_Item = angular.copy($scope.user);
            };
            function MailContainCreator (){
                var d = Date(Date.now());
                var a = d.toString();
                $scope.CreatedDate = a.split('GMT');
                var form = $scope.itemEntryTwoForm;
                $scope.ChangedItemName = "";
                angular.forEach(form, function (value, key) {
                    if (typeof value === 'object' && value.hasOwnProperty('$modelValue') && value.$dirty) {
                        if (typeof value.$modelValue === 'object') {
                            value.$modelValue = "Changed " + value.$name + " Value.";
                        }
                        $scope.ChangedItemName += value.$name + ": <strong style='color: red'>" + value.$modelValue + "</strong><br/>";
                    }

                });
                //if ($scope.itemEntryTwoForm.ItemName.$dirty) { $scope.ChangedItemName += "Item Name: <strong style='color: red'>" + $scope.ad_Item.ItemName + "</strong><br/>" }
                //if ($scope.itemEntryTwoForm.DescriptionOne.$dirty) { $scope.ChangedItemName += "Item Description: <strong style='color: red'>" + $scope.ad_Item.ItemDescription + "</strong><br/>" }
                //if ($scope.itemEntryTwoForm.DescriptionTwo.$dirty) { $scope.ChangedItemName += "Item Description Two: <strong style='color: red'>" + $scope.ad_Item.ItemDescriptionTwo + "</strong><br/>" }
                //if ($scope.itemEntryTwoForm.UnitPackage.$dirty) { $scope.ChangedItemName += "Unit Per Package: <strong style='color: red'>" + $scope.ad_Item.UnitPerPackage + "</strong><br/>" }
                //if ($scope.itemEntryTwoForm.HSCode.$dirty) { $scope.ChangedItemName += "Hs Code: <strong style='color: red'>" + $scope.ad_Item.HsCode + "</strong><br/>" }
                //if ($scope.itemEntryTwoForm.SizeCode.$dirty) { $scope.ChangedItemName += "Item Code: <strong style='color: red'>" + $scope.ad_Item.ItemCode + "</strong><br/>" }
                //if ($scope.itemEntryTwoForm.PackagePerContainer != undefined) { if ($scope.itemEntryTwoForm.PackagePerContainer.$dirty) { $scope.ChangedItemName += "Package Per Container: <strong style='color: red'>" + $scope.ad_Item.PackagePerContainer + "</strong><br/>" } }
                //if ($scope.itemEntryTwoForm.PackageWeight.$dirty) { $scope.ChangedItemName += "Package Weight: <strong style='color: red'>" + $scope.ad_Item.PackageWeight + "</strong><br/>" }
                //if ($scope.itemEntryTwoForm.ContainerWeight.$dirty) { $scope.ChangedItemName += "Container Weight: <strong style='color: red'>" + $scope.ad_Item.ContainerWeight + "</strong><br/>" }

                //if ($scope.itemEntryTwoForm.WidthPerRoll.$dirty) { if ($scope.ItemAdditionalAttribute.RollWidthInMeter != null) { $scope.ChangedItemName += "Roll Width In Meter: <strong style='color: red'>" + $scope.ItemAdditionalAttribute.RollWidthInMeter + "</strong><br/>" } else { $scope.ChangedItemName += "Roll Width In Meter: <strong style='color: red'>Value Removed</strong><br/>" } }
                //if ($scope.itemEntryTwoForm.LengthPerRoll.$dirty) { if ($scope.ItemAdditionalAttribute.RollLenghtInMeter != null) { $scope.ChangedItemName += "Roll Lenght In Meter: <strong style='color: red'>" + $scope.ItemAdditionalAttribute.RollLenghtInMeter + "</strong><br/>" } else { $scope.ChangedItemName += "Roll Lenght In Meter: <strong style='color: red'>Value Removed</strong><br/>" } }
                //if ($scope.itemEntryTwoForm.AreaPerRoll.$dirty) { if ($scope.ItemAdditionalAttribute.RollAreaInSqMeter != null) { $scope.ChangedItemName += "Roll Area In Square Meter: <strong style='color: red'>" + $scope.ItemAdditionalAttribute.RollAreaInSqMeter + "</strong><br/>" } else { $scope.ChangedItemName += "Roll Area In Square Meter: <strong style='color: red'>Value Removed</strong><br/>" } }
                //if ($scope.itemEntryTwoForm.Sd.$dirty) { if ($scope.ad_ItemVat.Sd != null) { $scope.ChangedItemName += "SD: <strong style='color: red'>" + $scope.ad_ItemVat.Sd + "</strong><br/>" } else { $scope.ChangedItemName += "SD: <strong style='color: red'>Value Removed</strong><br/>" } }
                //if ($scope.itemEntryTwoForm.Vat.$dirty) { if ($scope.ad_ItemVat.Vat != null) { $scope.ChangedItemName += "VAT: <strong style='color: red'>" + $scope.ad_ItemVat.Vat + "</strong><br/>" } else { $scope.ChangedItemName += "VAT: <strong style='color: red'>Value Removed</strong><br/>" } }

                $scope.TempItemName = "";
                if ($scope.ad_Item.ItemName) { $scope.TempItemName += "Item Name: <strong>" + $scope.ad_Item.ItemName + "</strong><br/>" }
                if ($scope.ad_Item.ItemDescription) { $scope.TempItemName += "Item Description: <strong>" + $scope.ad_Item.ItemDescription + "</strong><br/>" }
                if ($scope.ad_Item.ItemDescriptionTwo) { $scope.TempItemName += "Item Description Two: <strong>" + $scope.ad_Item.ItemDescriptionTwo + "</strong><br/>" }
                if ($scope.ad_Item.HsCode) { $scope.TempItemName += "Hs Code: <strong>" + $scope.ad_Item.HsCode + "</strong><br/>" }
                if ($scope.ad_Item.ItemCode) { $scope.TempItemName += "Size Code: <strong>" + $scope.ad_Item.ItemCode + "</strong><br/>" }

                if ($scope.ad_Item.UnitId == 1) { if ($scope.ad_Item.UnitPerPackage) { $scope.TempItemName += "Pcs Per Roll: <strong>" + $scope.ad_Item.UnitPerPackage + "</strong><br/>" }}
                if ($scope.ad_Item.UnitId == 2) { if ($scope.ad_Item.UnitPerPackage) { $scope.TempItemName += "Roll Per Carton: <strong>" + $scope.ad_Item.UnitPerPackage + "</strong><br/>" } }
                else { if ($scope.ad_Item.PackagePerContainer) { $scope.TempItemName += "Roll Per Carton: <strong>" + $scope.ad_Item.PackagePerContainer + "</strong><br/>" } }
                if ($scope.ad_Item.PackageWeight) { $scope.TempItemName += "Roll Weight: <strong>" + $scope.ad_Item.PackageWeight + "</strong><br/>" }
                if ($scope.ad_Item.ContainerWeight) { $scope.TempItemName += "Carton Weight: <strong>" + $scope.ad_Item.ContainerWeight + "</strong><br/>" }
                if ($scope.ad_Item.ContainerSize) { $scope.TempItemName += "Carton Size: <strong>" + $scope.ad_Item.ContainerSize + "</strong>" }
                
                $scope.TempItemAdditional = "";
                if ($scope.ItemAdditionalAttribute.RollWidthInMeter) { $scope.TempItemAdditional += "Roll Width In Meter: <strong>" + $scope.ItemAdditionalAttribute.RollWidthInMeter + "</strong><br/>" } //else if ($scope.ItemAdditionalAttribute.RollWidthInMeter == null) { $scope.TempItemAdditional += "Roll Width In Meter: <strong>Value Removed</strong><br/>" }
                if ($scope.ItemAdditionalAttribute.RollLenghtInMeter) { $scope.TempItemAdditional += "Roll Lenght In Meter: <strong>" + $scope.ItemAdditionalAttribute.RollLenghtInMeter + "</strong><br/>" } //else if ($scope.ItemAdditionalAttribute.RollLenghtInMeter == null) { $scope.TempItemAdditional += "Roll Lenght In Meter: <strong>Value Removed</strong><br/>" }
                if ($scope.ItemAdditionalAttribute.RollAreaInSqMeter) { $scope.TempItemAdditional += "Roll Area In Square Meter: <strong>" + $scope.ItemAdditionalAttribute.RollAreaInSqMeter + "</strong><br/>" } //else if ($scope.ItemAdditionalAttribute.RollAreaInSqMeter == null) { $scope.TempItemAdditional += "Roll Area In Square Meter: <strong>Value Removed</strong><br/>" }
                if ($scope.ad_ItemVat.Sd) { $scope.TempItemAdditional += "SD: <strong>" + $scope.ad_ItemVat.Sd + "</strong><br/>" } //else if ($scope.ad_ItemVat.Sd == null) { $scope.TempItemAdditional += "SD: <strong>Value Removed</strong><br/>" }
                if ($scope.ad_ItemVat.Vat) { $scope.TempItemAdditional += "VAT: <strong>" + $scope.ad_ItemVat.Vat + "</strong>" } //else if ($scope.ad_ItemVat.Vat == null) { $scope.TempItemAdditional += "VAT: <strong>Value Removed</strong><br/>" }
                
            }
            function EmailSend() {
                $scope.EmailSendNotification.EmailSubject = "Size Code " + $scope.ad_Item.ItemCode + " " + $scope.type + " Successfully";
                $scope.ToEmailList = [];
                angular.forEach($scope.ReportNotificationDetailListForIE, function (aEmail) {
                    var emailName = {};
                    emailName = aEmail.EmailId;
                    $scope.ToEmailList.push(emailName);
                })
                $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
                MailContainCreator();
                if ($scope.type == 'Saved') { $scope.ChangedItemName = 'New Item Saved.' }
                if ($scope.TempItemAdditional == '') { $scope.TempItemAdditional = 'No Additional Info.' }
                $scope.EmailSendNotification.EmailBody =
                    '<p> Dear User,<br/> <strong>A Product has been ' + $scope.type + '.</strong> <br/><br/> ' + $scope.TempItemName +
                    '<br/><strong><u>Item Additional: <u/></strong> <br/>' + $scope.TempItemAdditional +
                    '<br/><strong><u>Changed Item: <u/></strong> <br/>' + $scope.ChangedItemName +
                    '<br/>Name: <strong>' + $scope.FullName +
                    '</strong><br/>Date: <strong>' + $scope.CreatedDate[0] + '<strong><br/><br />' +

                    'Regards,<br/>' +
                    'Software Team <br/>' +
                    'Retail Technologies Ltd.</p>';
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

            function PostItem() {
                var parms = JSON.stringify({ item: $scope.ad_Item, itemVat: $scope.ad_ItemVat, TagRibbonWithLabel: $scope.SpecialItemList, DeleteTagRibbonWithLabel: $scope.DeleteTagRibbonWithLabelList });
                $scope.type = $scope.ad_Item.ItemId == 0 ? "Saved" : "Updated";

                $http.post("/Item/Post", parms).success(function (data) {
                    if (data > 0) {
                        if ($scope.ItemAdditionalAttribute != undefined) {
                            if ($scope.ad_Item.ItemId == 0) {
                                $scope.ItemAdditionalAttribute.ItemId = parseInt(data);

                            } else {
                                $scope.ItemAdditionalAttribute.ItemId = $scope.ad_Item.ItemId;
                            }
                        } else {
                            if ($scope.ad_Item.ItemId == 0) {
                                $scope.ItemAdditionalAttribute = {};
                                $scope.ItemAdditionalAttribute.ItemId = parseInt(date);

                            } else {
                                $scope.ItemAdditionalAttribute = {};
                                $scope.ItemAdditionalAttribute.ItemId = $scope.ad_Item.ItemId;
                            }
                        }
                        if ($scope.itemEntryTwoForm.$dirty) {
                            EmailSend();
                        }
                        

                        var parms = JSON.stringify({ ItemAdditionalAttribute: $scope.ItemAdditionalAttribute });
                        $http.post("/ItemAdditionalAttribute/SaveItemAdditionalAttribute", parms).success(function (data) { 
                            Clear();
                            $('#ddlControlHead').select2('destroy');
                            $('#ddlControlHead').val('').select2({
                                //placeholder: "Search for: Company Name",
                                //theme: "classic",
                                dropdownAutoWidth: false
                            });
                        }).error(function (data) {
                            alertify.log("Server Errors!", "error", "5000");
                        });

                        alertify.log("Product " + $scope.type + " Successfully", "success", "5000");

                        Clear();
                        $route.reload();
                        //$scope.$broadcast('GetItemPaged');
                        $("#cmbCategory").focus();
                        window.scroll(0, 0);
                    } else {
                        alertify.log("Server Errors!", "error", "5000");
                    }
                }).error(function (data) {
                    alertify.log("Server Errors!", "error", "5000");
                });
            }
            $scope.SaveItem = function () {
                if ($scope.DuplicateBarcodeFound) {
                    txtItemCode.focus();
                    return;
                }

                $scope.ad_Item.SubCategoryId = $scope.ddlSubCategory.SubCategoryId;
                $scope.ad_Item.ItemName = $scope.ad_Item.ItemName;
                $scope.ad_Item.UnitId = $scope.ddlItemUnit.ItemUnitId;
                if ($scope.ddlItemPackage == undefined) {
                    $scope.ad_Item.PackageId = 0;
                }
                else {
                    $scope.ad_Item.PackageId = $scope.ddlItemPackage.ItemUnitId;
                }
                if ($scope.ddlItemContainer == undefined) {
                    $scope.ad_Item.ContainerId = 0;
                }
                else {
                    $scope.ad_Item.ContainerId = $scope.ddlItemContainer.ItemUnitId;
                }

                $scope.ad_Item.CreatorId = $scope.UserId;
                $scope.ad_Item.UpdatorId = $scope.UserId;

                if ($scope.ad_Item.ItemId == undefined) {
                    $scope.ad_Item.ItemId = 0;
                }
                if ($scope.ConfirmationMessageForAdmin) {
                    if ($scope.ad_Item.ItemId == 0 && $scope.CreatePermission) {
                        alertify.confirm("Are you sure to save?", function (e) {
                            if (e) {
                                PostItem();
                            }
                        })
                    }
                    else if ($scope.ad_Item.ItemId == 0 && !$scope.CreatePermission) {
                        alertify.log('You do not have permission to save!', 'error', '5000');
                    }
                    else if ($scope.ad_Item.ItemId > 0 && $scope.RevisePermission) {
                        alertify.confirm("Are you sure to update?", function (e) {
                            if (e) {
                                PostItem();
                            }
                        })
                    }
                    else if ($scope.ad_Item.ItemId > 0 && !$scope.RevisePermission) {
                        alertify.log('You do not have permission to Update!', 'error', '5000');
                    }
                }
                else {
                    if ($scope.ad_Item.ItemId == 0 && $scope.CreatePermission) {
                        PostItem();
                    }
                    else if ($scope.ad_Item.ItemId == 0 && !$scope.CreatePermission) {
                        alertify.log('You do not have permission to save!', 'error', '5000');
                    }
                    else if ($scope.ad_Item.ItemId > 0 && $scope.RevisePermission) {
                        PostItem();
                    }
                    else if ($scope.ad_Item.ItemId > 0 && !$scope.RevisePermission) {
                        alertify.log('You do not have permission to Update!', 'error', '5000');
                    }
                }
                
            };
            function itemVatAll(itemId) {
                $http({
                    url: "/Item/GetItemVatById?ItemId=" + itemId,
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    if (data.length > 0) {
                        $scope.ad_ItemVat = data[0];
                        $scope.IsChecked = true;
                    } else {
                        $scope.ad_ItemVat = {};
                        $scope.IsChecked = false;
                        $scope.ad_ItemVat.Sd = 0;
                        $scope.ad_ItemVat.Vat = 0;
                    }
                    

                })
            }

            $scope.itemVatAll = function (itemId) {
                itemVatAll(itemId);
            }
            function SelItem(item) {
                $scope.btnSaveItem = "Update";
                //$scope.ad_Item = item;
                $scope.user = item;
                $scope.ad_Item = angular.copy($scope.user);
                //console.log($scope.ad_Item);
                $scope.ddlCategory = { "CategoryId": item.CategoryId };
                $scope.ddlSubCategory = { "SubCategoryId": item.SubCategoryId };
                $scope.ddlHsCode = { "HsCodeId": item.HsCodeId };

                var objUnit = Enumerable.From($scope.ItemUnitlist).Where("$.ItemUnitId ==" + item.UnitId).FirstOrDefault();
                $scope.ddlItemUnit = objUnit;

                var objPackage = Enumerable.From($scope.ItemUnitlist).Where("$.ItemUnitId ==" + item.PackageId)
                    .FirstOrDefault();
                $scope.ddlItemPackage = objPackage;

                var objContainer = Enumerable.From($scope.ItemUnitlist).Where("$.ItemUnitId ==" + item.ContainerId)
                    .FirstOrDefault();
                $scope.ddlItemContainer = objContainer;

                $http({
                    url: "/ItemAdditionalAttribute/GetItemAdditionalAttributeByItemId?ItemId=" + item.ItemId,
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {

                    $scope.ItemAdditionalAttribute = data[0];
                    setTimeout(function () {
                        $("#ddlControlHead").select2().val($scope.ItemAdditionalAttribute.HeadCode).trigger("change");

                    }, 0);
                })

                //$scope.ddlItemContainer = { "ItemUnitId": item.ContainerId };

                //$scope.lblUnitPerPackage = $('#ddlItemUnit').text() + ' Per ' + $('#ddlItemPackage').text();
                if (item.SubCategoryId == 4 || item.SubCategoryId == 14) {
                    GetRibbonInPerLabelCarton_GetAllLabel(item.ItemId);
                    $scope.IsLabel = false;
                } else {
                    $scope.IsLabel = true;
                    $scope.IsSpecialItemModel = false;
                    $scope.IsSpecialItem = false;
                    $scope.SpecialItemList = [];
                }
                
                $window.scrollTo(0, 0);
            }

            $scope.SelItem = function (item) {
                SelItem(item);
                

            };

            $scope.ResetForm = function () {
                Clear();
                $scope.item = null;
                $scope.IsChecked = false;
                $("#cmbCategory").focus();
            };
            $scope.$on('ResetForm', function (event) {
                $scope.ResetForm();
            });
            $scope.$on('EditItem', function (event, item) {
                $scope.item = item;
                SelItem($scope.item);
                itemVatAll($scope.item.ItemId)
            });

            $scope.updateItem = function () {
                GetAllItemLoad();
                
            }

            function GetAllItemLoad () {
                $http({
                    url: "/Item/GetAllItem",
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    $rootScope.ItemSearchList = data;

                    angular.forEach($rootScope.ItemSearchList,
                        function (aData) {
                            aData.TempItemName = aData.ItemName +
                                " ~ " +
                                aData.ItemDescription +
                                " ~ " +
                                aData.ItemDescriptionTwo +
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

                    //$.each($scope.ItemSearchList, function (idx, val) {
                    //    $scope.ItemSearchList[idx].TempItemName = val.TempItemName.toUpperCase();
                    //});
                    if ($scope.item != null || $scope.item != undefined) {
                        var SelectedItem = $rootScope.ItemSearchList.find(item => item.ItemId === $scope.item.ItemId);
                    } else {
                        var SelectedItem = _.last($rootScope.ItemSearchList);
                    }

                    

                    $scope.$broadcast('updateItem', SelectedItem, $rootScope.ItemSearchList);
                    
                });
            };


        },
        scope: {
            component: '=data'
        },
        link: function (scope, element, attrs, vm) {

        },
        
        templateUrl: "/SPA/ReusableComponent/ItemEntryComponent/ItemEntryReuse.html"
    };
}]);