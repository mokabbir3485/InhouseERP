
app.controller("WarrentyAndSerialNoEntryController", function ($scope, $rootScope, $cookieStore, $http, $filter, $window) {

    //var UserData = sessionStorage.getItem("UserDataSession");
    //if (UserData != null) {
    //    $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    //}
    //$scope.ScreenId = parseInt(sessionStorage.getItem("StockReceiveScreenId"));
  
    Clear();

    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Warrenty And Serial No').ScreenId;
        GetUsersPermissionDetails();

        

        $scope.IPBAndLPBDdl = null;
        $scope.WarrentyAndSerialListShow = true;
        //GetPagedPB($scope.currentPage);
        
       
        $scope.WarrentyAndSerialNoList = [];
        $scope.WarrentyAndSerialNoDetailAdAttribute = {};
        $scope.WarrentyAndSerialNoDetailAdAttribute.SerialNo = '';
        $scope.IsManual = false;
        $scope.PBId = 0;
        $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
        $scope.WarrentyAndSerialNoDetailList = [];
        $scope.inv_PurchaseBillDetailSerial = {};
        $scope.inv_PurchaseBillDetailSerial.PBDetailSerialId = 0;
        $scope.VarietyList = [];
        $scope.Storelist = [];
        $scope.EmployeeList = [];
        $scope.ActivePriceTypeList = [];
        $scope.ItemUnitlist = [];
        $scope.btnSave = "Save";
        GetAllEmployee();
        GetAllStore();
        GetActivePriceType();
        GetByCombinationand();
        GetAllVariety();
        GetAllItemUnit();
        ClearReceiveDetail();
      //  GetUsersPermissionDetails();
      //  GetTopForWarrentyAndSerialNo();
        GetAllDepartment();
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetWarrantyAndSerialNoPaged($scope.currentPage);
    }

    document.getElementById("warrentyAndSerialBtn").disabled = false;
    document.getElementById("warrentyAndSerialReportBtn").disabled = false;

  

    function GetAllDepartment() {
        $http({
            url: '/Department/GetAllDepartment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.DepartmentList = data;
            
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

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            $scope.ddlReceiveBy = { EmployeeId: $scope.LoginUser.EmployeeId };
            
        });
    }

    function GetAllStore() {
        $http({
            url: '/User/GetUserStoreByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (userOutletList) {
            $scope.Storelist = userOutletList;
            if ($scope.Storelist.length == 1) {
                $scope.ddlStore = { 'DepartmentId': $scope.Storelist[0].DepartmentId };
                $scope.inv_PurchaseBillDetailSerial.DepartmentId = $scope.Storelist[0].DepartmentId;
                $scope.inv_PurchaseBillDetailSerial.DepartmentName = $scope.Storelist[0].DepartmentName;
                
            }
        });
    }

    function GetActivePriceType() {
        var criteria = "IsActive=1";
        $http({
            url: '/PriceType/GetPriceTypeDynamic?searchCriteria=' + criteria + '&orderBy=PriceTypeName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (activePriceTypeList) {
            $scope.ActivePriceTypeList = activePriceTypeList;
            angular.forEach($scope.ActivePriceTypeList, function (aActivePriceType) {
                if (aActivePriceType.IsDefault == true) {
                    $scope.ddlPriceType = { 'PriceTypeId': aActivePriceType.PriceTypeId }
                }
            })
        })
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
            
        });
    }

    function ClearReceiveDetail() {
        $scope.ReceiveDetail = {};
        $scope.DetailAddBtn = "Add Product";
        $scope.VarietyList = [];
        GetAllVariety();
    }


    

    //function GetTopForWarrentyAndSerialNo(curPage) {

    //    if (curPage == null) curPage = 1;
    //    var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
    //    var SearchCriteria = "1=1";
    //    $http({
    //       // url: "/PurchaseBill/WarrantyAndSerialGetPaged?",
    //        url:'/PurchaseBill/LocalPB?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {
           
    //        if (data.length > 0) {
    //            angular.forEach(data, function (aPb) {
    //                var res1 = aPb.PBDate.substring(0, 5);
    //                if (res1 == "/Date") {
    //                    var parsedDate1 = new Date(parseInt(aPb.PBDate.substr(6)));
    //                    var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
    //                    aPb.PBDate = date1;
    //                }
    //            })
    //        }
    //        $scope.WarrentyAndSerialNoList = data.ListData;
    //        console.log('$scope.WarrentyAndSerialNoList',$scope.WarrentyAndSerialNoList);
    //    });
    //}

    function GetByCombinationand() {
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            var allProduct = JSON.parse(data);
            $scope.AllCombinationlist = allProduct; //Enumerable.From(allProduct).Where("$.CategoryName=='Hardware'").ToArray();
            
        })
    }

    function GetWarrentyByItemId(ItemId) {

        return ItemId;
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

    $scope.ShowOrHideSerialGrid = function () {
        //$scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
        //$scope.WarrentyAndSerialNoDetailList = [];
        //$scope.WarrentyAndSerialNoList = [];
        //if ($scope.IsManual) {
        //    $scope.WarrentyAndSerialNoList = [];
        //} else {
        //   // GetTopForWarrentyAndSerialNo();
        //  //  LocalPB($scope.currentPage);
        //}
        $scope.IsManual == false;
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
            $scope.VisibilityOfSuggession = true;
        }
        else {
            $scope.AllCombinationSearch = Enumerable.From($scope.AllCombinationlist).Take(7).ToArray();
            $scope.VisibilityOfSuggession = false;
        }
    }

    $scope.LoadACombination = function (aCombination) {
        $scope.ItemCombination = aCombination;
        $scope.VisibilityOfSuggession = false;
        $scope.ItemSearchCombination = $scope.ItemCombination.Combination;
        $scope.AllCombinationSearch = [];
        $scope.ddlMu = { ItemUnitId: $scope.ItemCombination.DefaultPurchaseMeasurementId }
        //$('#txtQty').focus();
    }

    $scope.addManualSerail = function () {
        if (!angular.isUndefined($scope.ItemCombination) && (angular.isUndefined($scope.ItemCombination.AttributeQty) || $scope.ItemCombination.AttributeQty < 1)) {
            $scope.ItemCombination.AttributeQty = 1;
            alertify.log("Minimum 1 Quantity is required", "error", "5000");
            return;
        }

        if (!angular.isUndefined($scope.ItemCombination) && $scope.ItemCombination.AttributeQty > 1000) {
            $scope.ItemCombination.AttributeQty = 1;
            alertify.log("Maximum Quantity is 1000", "error", "5000");
            return;
        }

        var ItemCombination = $scope.ItemCombination;
        console.log(ItemCombination);
        var flag = true;

        angular.forEach($scope.WarrentyAndSerialNoDetailList, function (aItem) {
            if (aItem.ItemAddAttId == ItemCombination.ItemAddAttId) {
                flag = false;
            }
        });
        if (flag) {
            $http({
                url: "/StockValuation/GetByDepartmentAndItemAddAttId?departmentId=" + $scope.ddlDepartment.DepartmentId + "&itemAddAttId=" + ItemCombination.ItemId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (stockValuationAttributeList) {
                if (stockValuationAttributeList.length && stockValuationAttributeList[0].CurrentQuantity > 0) {
                    var criteria = "DeliveryDetailId=0 AND HSWS.[DepartmentId]=" + $scope.ddlDepartment.DepartmentId + " AND ItemAddAttId=" + ItemCombination.ItemAddAttId;
                    $http({
                        url: '/WarrentyAndSerialNo/GetWarrantyAndSerialNoDynamicForSingle?whereCondition=' + criteria,
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }).success(function (warrentySerialNoList) {
                        if ((warrentySerialNoList.length + ItemCombination.AttributeQty) <= stockValuationAttributeList[0].CurrentQuantity) {
                            var Item = {};
                            angular.forEach($scope.VarietyList, function (aItem) {
                                if (aItem.ItemId == ItemCombination.ItemId) {
                                    Item = aItem;
                                }
                            });

                            //Item.HeaderOfAttribute = [];
                            //var HeaderOfAttribute = [];
                            //var a = ItemCombination.AttributeNames.split(',');

                            //for (var i = 0; i < a.length; i++) {
                            //    var val = a[i].split(':');
                            //    HeaderOfAttribute.push(val[0].trim());
                            //}

                            //Item.HeaderOfAttribute = HeaderOfAttribute;
                            //$scope.WarrentyAndSerialNoDetailList.push(Item);

                            //var ValueOfAttribute = [];
                            //var a = ItemCombination.AttributeNames.split(',');

                            //for (var i = 0; i < a.length; i++) {
                            //    var val = a[i].split(':');
                            //    ValueOfAttribute.push(val[1].trim());
                            //}

                            //ItemCombination.ValueOfAttribute = ValueOfAttribute;
                            var Attribute = ItemCombination;
                            Attribute.Qty = $scope.ItemCombination.AttributeQty;
                            Attribute.WarrentyInDays = 0;
                            Attribute.AttributeQty = $scope.ItemCombination.AttributeQty;
                            Attribute.SerialNo = "";
                            Attribute.DepartmentId = $scope.ddlDepartment.DepartmentId;
                            var tableRowNo = 1;

                            for (var i = 0; i < $scope.ItemCombination.AttributeQty; i++) {
                                if (i == 0) {
                                    Attribute.PBDetailSerialId = 0;
                                    Attribute.TableRowNo = tableRowNo;
                                    tableRowNo++;
                                    $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(Attribute);
                                }
                                else {
                                    var attributeCopy = angular.copy(Attribute);
                                    attributeCopy.PBDetailSerialId = 0;
                                    attributeCopy.TableRowNo = tableRowNo;
                                    tableRowNo++;
                                    $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(attributeCopy);
                                }
                            }

                            $scope.WarrentyAndSerialNoDetailAdAttributeLst = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).OrderBy('$.TableRowNo').ToArray();
                            GetByCombinationand();
                            $scope.ItemCombination = {};
                            $scope.ItemSearchCombination = null;
                        }
                        else {
                            if (stockValuationAttributeList[0].CurrentQuantity == warrentySerialNoList.length)
                                alertify.log(ItemCombination.Combination.split(' - ')[0] + " in " + $scope.ddlDepartment.DepartmentName + ": Stock Qty: " + stockValuationAttributeList[0].CurrentQuantity
                                    + ", and Available Serial Qty: " + warrentySerialNoList.length + " are Equal. Cannot enter any Manual Serial No.", 'error', '10000');
                            else
                                alertify.log(ItemCombination.Combination.split(' - ')[0] + " in " + $scope.ddlDepartment.DepartmentName + ": Stock Qty: " + stockValuationAttributeList[0].CurrentQuantity
                                    + ", Available Serial Qty: " + warrentySerialNoList.length + ". Maximum Manual Serial Qty can be " + "Stock Qty - Available Serial Qty = "
                                    + (stockValuationAttributeList[0].CurrentQuantity - warrentySerialNoList.length), 'error', '10000');
                        }
                    });
                }
                else {
                    if (!stockValuationAttributeList.length)
                        alertify.log('No ' + ItemCombination.Combination + ' found in ' + $scope.ddlDepartment.DepartmentName, 'error', '5000');
                    else
                        alertify.log(ItemCombination.Combination + ' Quantity in ' + $scope.ddlDepartment.DepartmentName + ' is Negative ('
                            + stockValuationAttributeList[0].CurrentQuantity + '). Please contact support immediately.', 'error', '5000');
                }
            });
        }
        else {
            alertify.log('This Combination already Exist, Try another one', 'error', '5000');
        }
    };

   


   


    $scope.setEmptyStringIfNull = function (SerialDtAttri) {
        if (angular.isUndefined(SerialDtAttri.SerialNo)) {
            SerialDtAttri.SerialNo = "";
        }
    }

    $scope.CheckDuplicateSerialNo = function (WarrentyAndSerialNoDetailAdAttribute) {
        //if (WarrentyAndSerialNoDetailAdAttribute.SerialNo == '' || angular.isUndefined(WarrentyAndSerialNoDetailAdAttribute.SerialNo))
        //    return;


        var sList = [];

        var pPurchaseBillDetailSerialList = [];
        var isFound = false;
        var serialNoFound = "";
        sList = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst)
               .Where('$.ItemId==' + WarrentyAndSerialNoDetailAdAttribute.ItemId)
              .ToArray();

        if (!sList.length) {
            return;
        }

        for (var i = 0; i < sList.length; i++) {
            if (sList[i].SerialNo == WarrentyAndSerialNoDetailAdAttribute.SerialNo && sList[i].TableRowNo != WarrentyAndSerialNoDetailAdAttribute.TableRowNo) {
                serialNoFound = WarrentyAndSerialNoDetailAdAttribute.SerialNo;
                WarrentyAndSerialNoDetailAdAttribute.SerialNo = "";
                isFound = true;
                break;
            }
        }
        if (isFound) {
            alertify.log('<b style="color:yellow;font-weight:bold;">' + serialNoFound + "</b> Found as a Duplicate Value.", "error", "5000");
            return;
        }

        
        var notEmptySerial = [];
        var pPurchaseBillDetailSerialList = [];
        notEmptySerial = Enumerable.From(sList).Where('$.SerialNo!=""').ToArray();

        for (var i = 0; i < notEmptySerial.length; i++) {
            pPurchaseBillDetailSerial = {
                DepartmentId: 0,
                ItemId: notEmptySerial[i].ItemId,
                PBDetailId: notEmptySerial[i].PBDetailId,
                PBDetailSerialId: notEmptySerial[i].PBDetailSerialId,
                SerialNo: notEmptySerial[i].SerialNo,
                WarrentyInDays: notEmptySerial[i].WarrentyInDays
            }
            pPurchaseBillDetailSerialList.push(pPurchaseBillDetailSerial);
        }

        if (pPurchaseBillDetailSerialList.length) {
            var parms = JSON.stringify({ pPurchaseBillDetailSerialList: pPurchaseBillDetailSerialList });

            $http.post('/WarrentyAndSerialNo/GetLocalWarrantyAndSerialNoDynamic', parms).success(function (dataFound) {

                    if (dataFound.SerialNo == null)
                        return;


                    var isSerialExist = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).Where('$.ItemId==' + dataFound.ItemId + '&& $.SerialNo=="' + dataFound.SerialNo + '"').FirstOrDefault();

                    if (!angular.isUndefined(isSerialExist)) {
                        for (var i = 0; i < $scope.WarrentyAndSerialNoDetailAdAttributeLst.length; i++) {
                            if ($scope.WarrentyAndSerialNoDetailAdAttributeLst[i].SerialNo == WarrentyAndSerialNoDetailAdAttribute.SerialNo && $scope.WarrentyAndSerialNoDetailAdAttributeLst[i].TableRowNo == WarrentyAndSerialNoDetailAdAttribute.TableRowNo) {
                                //serialNoFound = aWarrentyAndSerialNoDetail.SerialNo;
                                WarrentyAndSerialNoDetailAdAttribute.SerialNo = "";
                                break;
                            }
                        }
                        alertify.log('Duplicate Serial No Found., Try again !!!', 'error', '5000');
                    }

            }).error(function (data) {
                alertify.log('Server Save Errors!', 'error', '5000');
            });

            $http.post('/WarrentyAndSerialNo/GetImportWarrantyAndSerialNoDynamic', parms).success(function (dataFound) {

                    if (dataFound.SerialNo == null)
                        return;


                    var isSerialExist = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).Where('$.ItemId==' + dataFound.ItemId + '&& $.SerialNo=="' + dataFound.SerialNo + '"').FirstOrDefault();

                    if (!angular.isUndefined(isSerialExist)) {
                        for (var i = 0; i < $scope.WarrentyAndSerialNoDetailAdAttributeLst.length; i++) {
                            if ($scope.WarrentyAndSerialNoDetailAdAttributeLst[i].SerialNo == WarrentyAndSerialNoDetailAdAttribute.SerialNo && $scope.WarrentyAndSerialNoDetailAdAttributeLst[i].TableRowNo == WarrentyAndSerialNoDetailAdAttribute.TableRowNo) {
                                //serialNoFound = aWarrentyAndSerialNoDetail.SerialNo;
                                WarrentyAndSerialNoDetailAdAttribute.SerialNo = "";
                                break;
                            }
                        }
                        alertify.log('Duplicate Serial No Found., Try again !!!', 'error', '5000');
                    }

            }).error(function (data) {
                alertify.log('Server Save Errors!', 'error', '5000');
            });
        }

    }


    function SaveWarrentyAndSerial(Status) {
        
        var params = {};
        if ($scope.PBIdDdl == 1) {
            params = JSON.stringify({ inv_localDetailseriallist: $scope.WarrentyAndSerialNoDetailAdAttributeLst });
        } else {
            params = JSON.stringify({ inv_PurchaseBillDetailSerial: $scope.WarrentyAndSerialNoDetailAdAttributeLst });
        }

        $.ajax({
            url: "/WarrentyAndSerialNo/SaveWarrantyAndSerialNo",
            contentType: "application/json;charset=utf-8",
            type: "POST",
            //data: JSON.stringify({ inv_PurchaseBillDetailSerial: $scope.WarrentyAndSerialNoDetailAdAttributeLst, inv_localDetailseriallist: $scope.WarrentyAndSerialNoDetailAdAttributeLst }),
            data: params,
            success: function (data) {
                if (data > 0) {
                    Clear();
                    alertify.log('Warranty and Serial No ' + Status + ' Successfully!', 'success', '5000');
                }
            }, error: function (msg) {
                alertify.log('Server Save Errors!', 'error', '10000');
            }
        });

    }
    $scope.Save = function () {
        if (!angular.isUndefined(Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).Where('$.SerialNo==""').FirstOrDefault())) {
            alertify.log('Please provide all Serial number', 'error', '5000');
        } else if (!angular.isUndefined(Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).Where('$.SerialNo=="0"').FirstOrDefault())) {
            alertify.log('Please provide all Serial number', 'error', '5000');
        } else if (!angular.isUndefined(Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).Where('$.WarrentyInDays==null').FirstOrDefault())) {
            alertify.log('Please provide all Warrenty In Days', 'error', '5000');
        }
        else {
            if ($scope.inv_PurchaseBillDetailSerial.PBDetailSerialId == 0  && $scope.WarrentyAndSerialNoDetailList[0].PBDetailId == undefined) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        SaveWarrentyAndSerial('Saved');
                    }
                })
            }
            else if ($scope.inv_PurchaseBillDetailSerial.PBDetailSerialId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.WarrentyAndSerialNoDetailList[0].PBDetailId != 0 && $scope.WarrentyAndSerialNoDetailList[0].PBDetailId != undefined) {
                updateWarrentyAndSerialNo(); 
            }
            else {
                alertify.log(msg, 'error', '5000');
            }
        }
    }

    $scope.Reset = function () {

        $('#ddlWarrenatyAndSeral').select2('destroy');
        $('#ddlWarrenatyAndSeral').val('').select2({
            placeholder: "Select Purchase Bill"
        });
        Clear();
    }


    $("#txtFromDateForWarenty").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForWarrenty = function () {
        $("#txtFromDateForWarenty").focus();
        $("#txtFromDateForWarenty").trigger("click");
    }


    $("#txtToDateForWarenty").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForWarrenty = function () {
        $("#txtToDateForWarenty").focus();
        $("#txtToDateForWarenty").trigger("click");
    }

    


    function ImportPB(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
      //  var SearchCriteria = "1=1";
        var formDateChange = $("#txtFromDateForWarenty").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForWarenty").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');
        $scope.SearchPBAndCompanyName = $("#PBAndCompany").val();
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
            url: '/PurchaseBill/ImportPagedPB?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
          
          
            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aPb) {
                    var res1 = aPb.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPb.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aPb.PBDate = date1;
                    }
                })
            }
            $scope.WarrentyAndSerialNoList = data.ListData;
            $scope.total_count = data.TotalRecord;
            console.log('$scope.WarrentyAndSerialNoList', $scope.WarrentyAndSerialNoList);
        });
    }

    function LocalPagedPB(curPage) {
        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
       // var SearchCriteria = "1=1";
        var formDateChange = $("#txtFromDateForWarenty").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForWarenty").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');
        $scope.SearchPBAndCompanyName = $("#PBAndCompany").val();
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
            url: '/PurchaseBill/LocalPagedPB?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
           
            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aPb) {
                    var res1 = aPb.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPb.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aPb.PBDate = date1;
                    }
                })
            }
            $scope.WarrentyAndSerialNoList = data.ListData;
            $scope.total_count = data.TotalRecord;
          
            console.log('$scope.WarrentyAndSerialNoList', $scope.WarrentyAndSerialNoList);
        });
    }


    
   


    $scope.warrentyAndPbList = [
       
        { Id: 1, Name: "Local Purchase Bill" },
        { Id: 2, Name: "Import Purchase Bill" },
    ];

    $scope.LocalWarrantyAndSerialNumber = function (id) {
        $scope.PBIdDdl = id;
    }


    $scope.GetPBDetails = function (aPB) {

        if ($scope.PBIdDdl == 1) {
            $http({
                url: "/PurchaseBill/GetLocalPBById?id=" + aPB.LPBId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.PBId = aPB.LPBId;
                $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
                $scope.WarrentyAndSerialNoDetailList = [];
                var tableRowNo = 1;

                angular.forEach(data, function (adata) {
                    //var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + adata.ItemId).FirstOrDefault();
                    //console.log(ItemCombination);
                    //var checkCategory = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + ItemCombination.ItemId).FirstOrDefault();
                    if (adata.CategoryId == 2 && adata.NoSerial == false) {


                        var Attribute = {};
                        //Attribute.Qty = adata.Qty;
                        //Attribute.WarrentyInDays = adata.WarrentyInDays;
                        Attribute.AttributeQty = 1;
                        Attribute.SerialNo = "";
                        Attribute.LPBDetailId = adata.LPBDetailId;
                        Attribute.ItemId = adata.ItemId;

                        var criteria = "[LPBDetailId]=" + adata.LPBDetailId;
                        $http({
                            url: '/WarrentyAndSerialNo/GetLocalWarrantyAndSerialNoDynamicForSingle?whereCondition=' + criteria,
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' }
                        }).success(function (purchaseBillDetailSerialList) {
                            //Existing
                            if (purchaseBillDetailSerialList.length) {
                                angular.forEach(purchaseBillDetailSerialList, function (aPurchaseBillDetailSerial) {
                                    if (tableRowNo == 1) {
                                        Attribute.PBDetailSerialId = aPurchaseBillDetailSerial.LPBDetailSerialId;
                                        Attribute.TableRowNo = tableRowNo;
                                        Attribute.SerialNo = aPurchaseBillDetailSerial.SerialNo;
                                        Attribute.ItemId = adata.ItemId;
                                        tableRowNo++;
                                        $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(Attribute);
                                    }
                                    else {
                                        var attributeCopy = angular.copy(Attribute);
                                        attributeCopy.PBDetailSerialId = aPurchaseBillDetailSerial.LPBDetailSerialId;
                                        attributeCopy.TableRowNo = tableRowNo;
                                        attributeCopy.ItemId = adata.ItemId;
                                        attributeCopy.SerialNo = aPurchaseBillDetailSerial.SerialNo;
                                        tableRowNo++;
                                        $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(attributeCopy);
                                    }
                                });
                            }

                            else {
                                for (var i = 0; i < adata.Qty; i++) {

                                    if (i == 0) {
                                        Attribute.LPBDetailSerialId = 0;
                                        Attribute.TableRowNo = tableRowNo;
                                        Attribute.ItemId = adata.ItemId;
                                        tableRowNo++;
                                        $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(Attribute);
                                    }
                                    else {
                                        var attributeCopy = angular.copy(Attribute);
                                        attributeCopy.LPBDetailSerialId = 0;
                                        attributeCopy.TableRowNo = tableRowNo;
                                        attributeCopy.ItemId = adata.ItemId;
                                        tableRowNo++;
                                        $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(attributeCopy);
                                    }
                                }
                            }

                            flag = true;

                            angular.forEach($scope.WarrentyAndSerialNoDetailList, function (aItem) {
                                if (aItem.ItemId == adata.ItemId) {
                                    flag = false;
                                }
                            });

                            if (flag) {
                                var Item = {};
                                angular.forEach($scope.VarietyList, function (aItem) {
                                    if (aItem.ItemId == adata.ItemId) {
                                        Item = aItem;
                                    }
                                })

                                Item.Description = adata.ItemDescription + ' ~ ' + adata.ItemDescriptionTwo;
                                Item.Qty = adata.Qty;
                                Item.WarrentyInDays = adata.WarrentyInDays;
                                Item.ItemId = adata.ItemId;
                                $scope.WarrentyAndSerialNoDetailList.push(Item);
                            }

                            $scope.WarrentyAndSerialNoDetailAdAttributeLst = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).OrderBy('$.TableRowNo').ToArray();
                            //GetByCombinationand();

                            angular.forEach($scope.WarrentyAndSerialNoDetailList, function (aItem) {
                                aItem.WarrentyAndSerialNoDetailAdAttributeLst = [];
                                angular.forEach($scope.WarrentyAndSerialNoDetailAdAttributeLst, function (aSerialNo) {
                                    if (aItem.ItemId == aSerialNo.ItemId) {
                                        aItem.WarrentyAndSerialNoDetailAdAttributeLst.push(aSerialNo);
                                    }
                                })

                            })
                            console.log($scope.WarrentyAndSerialNoDetailList)
                        });
                    }
                });
            });
        }
        else {
            $http({
                url: "/PurchaseBill/GetPBById?id=" + aPB.PBId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.PBId = aPB.PBId;
                $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];
                $scope.WarrentyAndSerialNoDetailList = [];
                var tableRowNo = 1;

                angular.forEach(data, function (adata) {
                    //var ItemCombination = Enumerable.From($scope.AllCombinationlist).Where('$.ItemId==' + adata.ItemId).FirstOrDefault();
                  //  console.log(ItemCombination);
                   // var checkCategory = Enumerable.From($scope.VarietyList).Where('$.ItemId==' + ItemCombination.ItemId).FirstOrDefault();
                    if (adata.CategoryId == 2 && adata.NoSerial == false) {

                        var Attribute = {};
                        //Attribute.Qty = adata.Qty;
                        //Attribute.WarrentyInDays = adata.WarrentyInDays;
                        Attribute.AttributeQty = 1;
                        Attribute.SerialNo = "";
                        Attribute.PBDetailId = adata.PBDetailId;

                        for (var i = 0; i < adata.Qty; i++) {

                            if (i == 0) {
                                Attribute.PBDetailSerialId = 0;
                                Attribute.TableRowNo = tableRowNo;
                                Attribute.ItemId = adata.ItemId;
                                tableRowNo++;
                                $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(Attribute);
                            }
                            else {
                                var attributeCopy = angular.copy(Attribute);
                                attributeCopy.PBDetailSerialId = 0;
                                attributeCopy.TableRowNo = tableRowNo;
                                attributeCopy.ItemId = adata.ItemId;
                                tableRowNo++;
                                $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(attributeCopy);
                            }
                        }

                        flag = true;

                        angular.forEach($scope.WarrentyAndSerialNoDetailList, function (aItem) {
                            if (aItem.ItemId == adata.ItemId) {
                                flag = false;
                            }
                        });

                        if (flag) {
                            var Item = {};
                            angular.forEach($scope.VarietyList, function (aItem) {
                                if (aItem.ItemId == adata.ItemId) {
                                    Item = aItem;
                                }
                            })

                           // Item.Description = ItemCombination.AttributeNames;
                            Item.Description = adata.ItemDescription + ' ~ ' + adata.ItemDescriptionTwo;
                            Item.Qty = adata.Qty;
                            Item.WarrentyInDays = adata.WarrentyInDays;
                            Item.ItemId = adata.ItemId;
                            $scope.WarrentyAndSerialNoDetailList.push(Item);
                        }
                        $scope.WarrentyAndSerialNoDetailAdAttributeLst = Enumerable.From($scope.WarrentyAndSerialNoDetailAdAttributeLst).OrderBy('$.TableRowNo').ToArray();
                            //GetByCombinationand();
                        angular.forEach($scope.WarrentyAndSerialNoDetailList, function (aItem) {
                            aItem.WarrentyAndSerialNoDetailAdAttributeLst = [];
                            angular.forEach($scope.WarrentyAndSerialNoDetailAdAttributeLst, function (aSerialNo) {
                                if (aItem.ItemId == aSerialNo.ItemId) {
                                    aItem.WarrentyAndSerialNoDetailAdAttributeLst.push(aSerialNo);
                                }
                            })

                        })

                        
                    }
                });
            });
        }

       
    }







    function GetTopForWarrentyAndSerialNoImportPurchase() {
        $http({
            url: "/PurchaseBill/GetTopForImportWarrentyAndSerialNo?top=10000",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aPb) {
                    var res1 = aPb.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPb.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aPb.PBDate = date1;
                    }
                })
            }
            $scope.WarrentyAndSerialNoList = data;
        });
    }
    function GetTopForWarrentyAndSerialNoLocalPurchase() {
        $http({
            url: "/PurchaseBill/GetTopForLocalWarrentyAndSerialNo?top=1000",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aPb) {
                    var res1 = aPb.PBDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPb.PBDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aPb.PBDate = date1;
                    }
                })
            }
            $scope.WarrentyAndSerialNoList = data;
        });
    }

    $scope.localAndImportWarrantyAndSerialNumber = function () {



        if ($scope.PBIdDdl == 1) {
        
            GetTopForWarrentyAndSerialNoLocalPurchase();
           
        } else if ($scope.PBIdDdl == 2) {

            GetTopForWarrentyAndSerialNoImportPurchase();
         
        } else {
            $scope.WarrentyAndSerialNoList = [];
        
        }
    }

    $scope.checkSN = function () {
        angular.forEach($scope.WarrentyAndSerialNoListPaged, function (aData) {
            if (aData.SerialNo == $scope.WarrentyAndSerialNoDetailAdAttribute.SerialNo) {
                alertify.log('Serial No is Exists', 'error', '5000');
            }
        })
    }
    $scope.SelWarrentyAndSerialNo = function (aWarrentyAndSerialNo) {
        
      
        window.scrollTo(0, 0);
        $scope.WarrentyAndSerialNoDetailList = [];

        $scope.WarrentyAndSerialNoDetailList.push(aWarrentyAndSerialNo);


        var SerialNoArr = aWarrentyAndSerialNo.SerialNo.split(',');
        var WarrentyInDaysArr = aWarrentyAndSerialNo.WarrentyInDays_Str.split(',');
        var PBDetailSerialIdsArr = aWarrentyAndSerialNo.PBDetailSerialIds.split(',');
        $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];

        SerialNoArr.forEach(function (v, i) {
            var obj = {};
            obj.SerialNo = v;
            obj.WarrentyInDays = parseInt(WarrentyInDaysArr[i]);
            obj.PBDetailSerialId = parseInt(PBDetailSerialIdsArr[i]);
            obj.IsLocal = aWarrentyAndSerialNo.IsLocal;
            obj.IsLocal = aWarrentyAndSerialNo.IsLocal;
            $scope.WarrentyAndSerialNoDetailAdAttributeLst.push(obj);
        });

        angular.forEach($scope.WarrentyAndSerialNoDetailList, function (aItem) {
            aItem.WarrentyAndSerialNoDetailAdAttributeLst = [];
            angular.forEach($scope.WarrentyAndSerialNoDetailAdAttributeLst, function (aSerialNo) {
                //if (aItem.ItemId == aSerialNo.ItemId) {
                    aItem.WarrentyAndSerialNoDetailAdAttributeLst.push(aSerialNo);
                //}
            })

        })
        
    }
    function updateWarrentyAndSerialNo() {
        var parms = JSON.stringify({ _inv_PurchaseBillDetailSerial: $scope.WarrentyAndSerialNoDetailAdAttributeLst });
        $http.post('/WarrentyAndSerialNo/UpdateWarrantyAndSerialNo', parms).success(function (data) {
            if (data == "0") {
                alertify.log('Warrenty And Serial No Save Successfully!', 'success', '5000');
                Clear();
                
                $scope.warrentyAndSerialNo.$setPristine();
                $scope.warrentyAndSerialNo.$setUntouched();

            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }


    $scope.reloadBtn = function () {
        $('#textItemName').val('');
        $scope.SearchItemName = null;
        GetWarrantyAndSerialNoPaged(1);
    }

    $scope.WarrantyAndSerialNoSearch = function () {
        GetWarrantyAndSerialNoPaged(1);

    }

    function GetWarrantyAndSerialNoPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;


        var SearchCriteria = "";


        if ($scope.SearchItemName !== undefined && $scope.SearchItemName != null && $scope.SearchItemName != "") {
            SearchCriteria = "[ItemName] LIKE '%" + $scope.SearchItemName + "%' OR [SerialNo] LIKE '%" + $scope.SearchItemName + "%'";
            //alert("Name Success!!!!!");
        }

        $http({
            url: encodeURI('/WarrentyAndSerialNo/GetWarrantyAndSerialNoPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    if (aSd.IsLocal == true) {
                        aSd.PBType = "Local";
                    } else {
                        aSd.PBType = "Import";
                    }

                })

            }
            else {
                alertify.log('Warranty And Serial No  Not Found', 'error', '5000');
            }
            $scope.WarrentyAndSerialNoListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;

            
        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetWarrantyAndSerialNoPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetWarrantyAndSerialNoPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetWarrantyAndSerialNoPaged($scope.currentPage);
        }
        //  }


    }


    $scope.OpenReport = function (aWarrentyAndSerialNo) {

        $window.open("#/WarrentyAndSerialNoReport", "popup", "width=850,height=550,left=280,top=80");

        $cookieStore.put("WarrentyAndSerialNoReportObj", aWarrentyAndSerialNo);

        event.stopPropagation();
    }

   
});


