app.controller("MaterialsDemandController", function ($scope, $rootScope, $cookieStore, $http, $filter, $window, $location, $timeout) {
    Clear();
    
    //#region Function
    function Clear() {

        //  document.getElementById("btnAdd").disabled = false;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.FullName = $scope.LoginUser.FullName;
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Materials Demand').ScreenId;
        GetUsersPermissionDetails();

     
        $scope.BranchId = $scope.LoginUser.BranchId;
        $scope.UserId = $scope.LoginUser.UserId;
       // $scope.ScreenId = parseInt(sessionStorage.getItem("MaterialsDemandScreenId")); 

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForMaterialsDemand($scope.currentPage);
        $scope.MaterialsDemandListForGrid = [];

        $scope.inv_MaterialsDemand = {};
        $scope.inv_MaterialsDemand.MaterialsDemandId = 0;
        $scope.MaterialsDemandDetail = {};
        $scope.MaterialsDemandDetailList = [];
        $scope.AllCombinationlist = [];
        GetAllItem();
        $scope.Storelist = [];
        $scope.DepartmentList = [];
        $scope.BranchList = [];
        $scope.EmployeeList = [];
        $scope.ItemUnitlist = [];
        $scope.iwolist = [];
        $scope.ItemSearchResultList = [];
        $scope.VoidList = [];
        $scope.matrialTypeList = [];
        $scope.CategoryList = [];
        GetAllCategory();
        GetAllmatrialType();
        //#endregion
        GetCombinationWithPrice();
        DepartmentGetByBranchAndDeptTypeId()
        GetAllUserDepartment();
        GetAllBranch();
        GetAllEmployee();
        GetAllItemUnit();
        GetByCombinationand();
        GetInternalWorkOrderDynamic();
        GetMaterialsDemandNo();
        $scope.inv_MaterialsDemand.DemandDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        //$scope.inv_MaterialsDemand.DeliveryDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.inv_MaterialsDemand.DeliveryDate = null;
      
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
       // GetUsersPermissionDetails();

        $scope.AppNotificationSetupList = [];
        GetAppNotificationSetupByReportCode();
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
                else if (aPermissionDetails.FunctionName == 'Remove') {
                    $scope.RemovePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }

    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'MD',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(MaterialsDemand, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];

        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle
            obj.NotificationDetail = 'Materials Demand No: ' + MaterialsDemand.MaterialsDemandNo + ' From Department Name: ' + MaterialsDemand.FromDepartmentName + ' Prepared By: ' + $scope.FullName;
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

    //$scope.getMaxMaterialsDemandNoByDate = function () {
    //    GetMaterialsDemandNo();
    //}
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

    $("#ddlRawMatrial").select2({
        placeholder: "Search for: Item Name ~ ItemDescription ~ Size Code ~ Sub Category",
        //theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });

    $("#txtDeliveryDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.DeliveryDateChangeForDemand = function () {
        $("#txtDeliveryDate").focus();

    }
    $("#txtDemandDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.DemandDateChangeForDemand = function () {
        $("#txtDemandDate").focus();

    }
    function GetMaterialsDemandNo() {
        //var dateParts = ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        //var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
        //$http({
        //    url: '/MaterialsDemand/GetMaterialsDemandNo?DemandDate=' + from,
        //    method: 'GET',
        //    headers: { 'Content-Type': 'application/json' }
        //}).success(function (data) {
        //    $scope.inv_MaterialsDemand.MaterialsDemandNo = data;
        //});



        $http({
            url: '/MaterialsDemand/GetMaterialsDemandNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxMatNo = data;
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
                $scope.inv_MaterialsDemand.MaterialsDemandNo = 'DM/' + $scope.finYearEPZ + '/' + $scope.MaxMatNo;
            });


        });

        
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
        if ($scope.ddlRawMatrial != null && $scope.ddlDepartment != null) {
            if ($scope.ddlRawMatrial.CategoryId == 2) { //Hardware
                SearchStockAdjustment($scope.ddlDepartment.DepartmentId, $scope.ddlRawMatrial.ItemId, null, null);
            }
            else if ($scope.ddlRawMatrial.SubCategoryId != 3 && $scope.ddlmatrialType != null) { //Finish Good Ribbon, Rawmaterial, plain label
                SearchStockAdjustment($scope.ddlDepartment.DepartmentId, $scope.ddlRawMatrial.ItemId, $scope.ddlmatrialType.MaterialTypeId, null);
            }
            else if ($scope.ddlRawMatrial.SubCategoryId == 3 && $scope.ddlmatrialType != null && $scope.ddlLabelBrand != null) { //Pre printed Label
                SearchStockAdjustment($scope.ddlDepartment.DepartmentId, $scope.ddlRawMatrial.ItemId, $scope.ddlmatrialType.MaterialTypeId, $scope.ddlLabelBrand.LabelBrandId);
            }
        }

    }


    function SearchStockAdjustment(depId, ItemId, MaterialTypeId, LabelBrandId) {

        $scope.StockAdjustment = {};


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
                
            });
        }

    }
    function GetAllUserDepartment() {
        $http({
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //$scope.DepartmentList = data;

            angular.forEach(data, function (aData) {
                aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                $scope.DepartmentList.push(aData);
            })

            $scope.ddlDepartment = { DepartmentId: $scope.LoginUser.DepartmentId }
            $scope.inv_MaterialsDemand.DemandFromDeptId = $scope.ddlDepartment.DepartmentId;
        });
    }
    function GetAllBranch() {
        $http({
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BranchList = data;
            $scope.ddlBranch = { BranchId: $scope.BranchId};
        });
    }


    function DepartmentGetByBranchAndDeptTypeId() {
        $http({

            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //$scope.Storelist = data;

            angular.forEach(data, function (aData) {
                aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                $scope.Storelist.push(aData);
            })
        });
    }
    function GetCombinationWithPrice() {
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllCombinationlist = JSON.parse(data);

            $scope.rawMatrialFilterWithItem = [];
            angular.forEach($scope.AllCombinationlist, function (aData) {
                if (aData.CategoryName == "Raw Materials") {
                    $scope.rawMatrialFilterWithItem.push(aData);
                }

            });
        })
    }
    function GetInternalWorkOrderDynamic() {
        var criteria = `IWO.IsApproved=1 and CAST(IWO.[InternalWorkOrderDate] AS DATE)>=DATEADD(MONTH, -1, CAST(GETDATE() AS DATE))`;

        //'CAST(IWO.[InternalWorkOrderDate] AS DATE)>=DATEADD(MONTH, -1, CAST(GETDATE() AS DATE))'
       //         AND(IWO.[InternalWorkOrderId] NOT IN(SELECT DISTINCT[InternalWorkOrderId] FROM inv_Requisition))
       //         AND((SELECT COUNT(*) FROM inv_InternalWorkOrderDetail D WHERE D.InternalWorkOrderId = IWO.InternalWorkOrderId AND D.ItemId >=0 ) > 0)
       //         AND(IWO.[InternalWorkOrderId] NOT IN
       //         (SELECT[InternalWorkOrderId] FROM inv_InternalWorkOrderDetail IWOD 
			    //INNER JOIN ad_Item I ON I.ItemId = IWOD.FinishedItemId
			    //INNER JOIN ad_ItemSubCategory ISC ON ISC.SubCategoryId = I.SubCategoryId
			    //WHERE ISC.CategoryId = 2
       //         ))`;
        $http({
            url: '/InternalWorkOrder/GetInternalWorkOrderDynamic?searchCriteria=' + criteria + "&orderBy=InternalWorkOrderDate",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.InternalWorkOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.InternalWorkOrderDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.InternalWorkOrderDate = date1;
                    }
                })
            }

            $scope.iwolist = data;
        });
    }



    function GetByCombinationand() {
        $scope.AllCombinationlistWithPriceListRaw = [];
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllCombinationlistWithPriceList = JSON.parse(data);
            angular.forEach(JSON.parse(data), function (adata) {
                if (adata.CategoryName == "Raw Materials") {
                    $scope.AllCombinationlistWithPriceListRaw.push(adata);
                }
            })

        })

    }



    $scope.RedirectItemEntry = function () {
        $window.location.href = '/Home/Index#/ItemEntry';
    }



    //$scope.ClearIwo = function () {
    //    $scope.ddlIwo.InternalWorkOrderId = null;

    //    $('#iwoSelect2').select2('destroy');
    //    $('#iwoSelect2').val('').select2({
    //        placeholder: "Select Iwo"
    //    });

        
    //}


    $scope.OpenReport = function () {
        var iwoId = 0;
        if ($scope.ddlIwo.InternalWorkOrderId == 0 || $scope.ddlIwo.InternalWorkOrderId == undefined || $scope.ddlIwo.InternalWorkOrderId == null) {
            iwoId = $scope.ddlIwo.InternalWorkOrderId;
        } else {
            iwoId = $scope.ddlIwo.InternalWorkOrderId;
        }
        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("IWOID", iwoId);

        event.stopPropagation();
    }


    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            setTimeout(function () {
                $("#ddlPreparedBy").select2().val($scope.LoginUser.EmployeeId).trigger("change");
            }, 0);

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
            $scope.AllCombinationSearch = [];
            $scope.ddlMu = { ItemUnitId: 2 };
            $scope.ddlCategory = { CategoryId: 4 };

            angular.forEach($scope.ItemSearchResultList, function (aCombination) {
                if (aCombination.CategoryId == $scope.ddlCategory.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        });
        
    }
    $scope.CheckPurchaseTypeFlag = function (aCategory) {


        $scope.AllCombinationSearch = [];

        if (aCategory.CategoryId == 4) {
            $scope.ItemCombination = {};
            $scope.ddlRawMatrial = null;

            $scope.ddlMu = { ItemUnitId: 2 };

            angular.forEach($scope.ItemSearchResultList, function (aCombination) {
                if (aCombination.CategoryId == aCategory.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });

        } else if (aCategory.CategoryId == 1) {
            $scope.ItemCombination = {};
            $scope.ddlRawMatrial = null;

            $scope.ddlMu = { ItemUnitId: 2 };

            angular.forEach($scope.ItemSearchResultList, function (aCombination) {
                if (aCombination.CategoryId == aCategory.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });

        }
        else if (aCategory.CategoryId == 2) {
            $scope.ItemCombination = {};
            $scope.ddlRawMatrial = null;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.ItemSearchResultList, function (aCombination) {

                if (aCombination.CategoryId == aCategory.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }

        else if (aCategory.CategoryId == 5) {
            $scope.ItemCombination = {};
            $scope.ddlRawMatrial = null;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.ItemSearchResultList, function (aCombination) {

                if (aCombination.CategoryId == aCategory.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }
        else if (aCategory.CategoryId == 5) {
            $scope.ItemCombination = {};
            $scope.ddlRawMatrial = null;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.ItemSearchResultList, function (aCombination) {

                if (aCombination.CategoryId == aCategory.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }
        else if (aCategory.CategoryId == 6) {
            $scope.ItemCombination = {};
            $scope.ddlRawMatrial = null;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.ItemSearchResultList, function (aCombination) {

                if (aCombination.CategoryId == aCategory.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }

        else if (aCategory.CategoryId == 3) {
            $scope.ItemCombination = {};
            $scope.ddlRawMatrial = null;
            $scope.ddlMu = { ItemUnitId: 1 };

            angular.forEach($scope.ItemSearchResultList, function (aCombination) {

                if (aCombination.CategoryId == aCategory.CategoryId) {
                    $scope.AllCombinationSearch.push(aCombination);
                }

            });
        }
        else {
            $scope.AllCombinationSearch = [];
        }




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


            angular.forEach(data, function (aItem) {
                if (aItem.ItemUnitId !== 0) {
                    $scope.ItemUnitlist.push(aItem);
                }

            })

           // $scope.ddlMU = { ItemUnitId: 2, UnitName: 'Roll(s)'};
        });
    }
    $scope.LoadItemSpecification = function (aRawMatrial) {
        $scope.ItemSpecification = aRawMatrial.ItemName + ' ' + aRawMatrial.ItemDescription;
        //$scope.CurrentQuantity = aRawMatrial.CurrentQuantity;
    }
    $scope.AddMaterialsDemandDetail = function () {
        $scope.MaterialsDemandDetail = {};
        if ($scope.ddlIwo != undefined) {
            $scope.MaterialsDemandDetail.InternalWorkOrderId = $scope.ddlIwo.InternalWorkOrderId;
            $scope.MaterialsDemandDetail.InternalWorkOrderNo = $scope.ddlIwo.InternalWorkOrderNo;
        }
        
        //$scope.MaterialsDemandDetail.ItemId = $scope.ddlRawMatrial.ItemId;
        //$scope.MaterialsDemandDetail.ItemName = $scope.ddlRawMatrial.ItemName;
        $scope.MaterialsDemandDetail.NameOfMaterials = $scope.NameOfMaterials;
        $scope.MaterialsDemandDetail.ItemSpecification = $scope.ItemSpecification;
        $scope.MaterialsDemandDetail.CustomerName = $scope.CustomerName;
        $scope.MaterialsDemandDetail.MCName = $scope.MCName;
        $scope.MaterialsDemandDetail.StockDetails = $scope.StockDetails;
        
        $scope.MaterialsDemandDetail.DemandQuantity = $scope.DemandQuantity;
/*        $scope.MaterialsDemandDetail.CurrentQuantity = $scope.StockAdjustment.CurrentQuantity;*/
        $scope.MaterialsDemandDetail.DemandUnitId = $scope.ddlMU.ItemUnitId;
        $scope.MaterialsDemandDetail.UnitName = $scope.ddlMU.UnitName;
        $scope.MaterialsDemandDetail.DemandUnitId = $scope.ddlMU.ItemUnitId;


        //if ($scope.ddlmatrialType == undefined || $scope.ddlmatrialType == null) {
        //    $scope.ddlmatrialType = {};
        //    $scope.ddlmatrialType.MaterialTypeId = null;

        //} else {
        //    $scope.MaterialsDemandDetail.MaterialTypeId = $scope.ddlmatrialType.MaterialTypeId;
        //    $scope.MaterialsDemandDetail.Combination = $scope.ddlmatrialType.Combination;
        //}
        //if ($scope.ddlLabelBrand == undefined || $scope.ddlLabelBrand == null) {
        //    $scope.ddlLabelBrand = {};
        //    $scope.ddlLabelBrand.LabelBrandId = null;
        //} else {
        //    $scope.MaterialsDemandDetail.LabelBrandId = $scope.ddlLabelBrand.LabelBrandId;
        //    $scope.MaterialsDemandDetail.LabelBrandName = $scope.ddlLabelBrand.LabelBrandName;
        //}


        $scope.MaterialsDemandDetailList.push($scope.MaterialsDemandDetail);

        $scope.NameOfMaterials = '';
        $scope.ItemSpecification = '';
        $scope.CustomerName = '';
        $scope.MCName = '';
        $scope.StockDetails = '';
        $scope.DemandQuantity = null;
        //$scope.CurrentQuantity = null;
        //$scope.ddlMU = null;
        //$scope.ddlRawMatrial = null;
        //$('#ddlRawMatrial').select2('destroy');
        //$('#ddlRawMatrial').val('').select2({
        //    placeholder: "Search for: Item Name ~ ItemDescription ~ Size Code ~ Sub Category"
        //});
        //$scope.ClearMaterialType();
    }
    $scope.removeMaterialsDemandDetail = function (aDemandDetail, index) {
        
        $scope.MaterialsDemandDetailList.splice(index, 1);
        if (aDemandDetail.MaterialsDemandId != undefined) {
            $scope.VoidList.push(aDemandDetail);
        }
    }

    $scope.resetForm = function () {
        Clear();
    };

    function PostMaterialsDemand() {

        $scope.inv_MaterialsDemand.UpdatorId = $scope.LoginUser.UserId;
        $scope.inv_MaterialsDemand.BranchId = $scope.ddlBranch.BranchId;
        $scope.inv_MaterialsDemand.DemandFromDeptId = $scope.ddlDepartment.DepartmentId;

        //var DemandedDate = $("#txtDate").val();
        //$scope.inv_MaterialsDemand.DemandDate = DemandedDate.split("/").reverse().join("-");

        //var DeliveredDate = $("#txtDeliveryDate").val();
        //$scope.inv_MaterialsDemand.DeliveryDate = DeliveredDate.split("/").reverse().join("-");

        var parms = JSON.stringify({ inv_MaterialsDemand: $scope.inv_MaterialsDemand, inv_MaterialsDemandDetail: $scope.MaterialsDemandDetailList, VoidList: $scope.VoidList });

        $http.post('/MaterialsDemand/Post', parms).success(function (data) {

            if (data != "") {
                AppNotificationLogPost($scope.inv_MaterialsDemand, 'Materials Demand Created!');
                Clear();
                $scope.MaterialsDemandForm.$setPristine();
                $scope.MaterialsDemandForm.$setUntouched();
                alertify.log('Demand  No: ' + data + ' Save Successfully!', 'success', '5000');
            }

            else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        });


    }
    $scope.SaveMaterialsDemand = function () {

        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.inv_MaterialsDemand.MaterialsDemandId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostMaterialsDemand();
                    }
                })
            }
            else if ($scope.inv_MaterialsDemand.MaterialsDemandId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.inv_MaterialsDemand.MaterialsDemandId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostMaterialsDemand();
                    }
                })
            }
            else if ($scope.inv_MaterialsDemand.MaterialsDemandId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.inv_MaterialsDemand.MaterialsDemandId == 0 && $scope.CreatePermission) {
                PostMaterialsDemand();
            }
            else if ($scope.inv_MaterialsDemand.MaterialsDemandId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.inv_MaterialsDemand.MaterialsDemandId > 0 && $scope.RevisePermission) {
                PostMaterialsDemand();
            }
            else if ($scope.inv_MaterialsDemand.MaterialsDemandId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }

        
    }

    $scope.SelMaterialsDemand = function (aMaterialsDemand) {
        window.scroll(0, 0);
        $scope.inv_MaterialsDemand = aMaterialsDemand;
        setTimeout(function () {
            $("#ddlPreparedBy").select2().val(aMaterialsDemand.PreparedById).trigger("change");
        }, 0);


       //

        $scope.ddlBranch = { BranchId: aMaterialsDemand.BranchId};
        $scope.ddlDepartment = { DepartmentId: aMaterialsDemand.DemandFromDeptId};
        $scope.ddlStore = { DepartmentId: aMaterialsDemand.DemandToDeptId };
        //checkdepartmentId(aMaterialsDemand.DemandFromDeptId);

        $http({
            url: '/MaterialsDemand/GetMaterialsDemandDetailByMaterialsDemandId?MaterialsDemandId=' + aMaterialsDemand.MaterialsDemandId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length) {
                $scope.MaterialsDemandDetailList = data;
               // $scope.ddlMU = { ItemUnitId: data[0].DemandUnitId }
            }

        });
    }



    $scope.MaterialDemandedReportBtn = function (MaterialsDemand) {
        $window.open("#/MaterialsDemandReport", "popup", "width=850,height=550,left=280,top=80");
    
        $cookieStore.put("MaterialsDemandData", MaterialsDemand);
        event.stopPropagation();
    };




    $("#txtFromReq").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForReq = function () {
        $("#txtFromReq").focus();
        $("#txtFromReq").trigger("click");
    }


    $("#txtToDateForReq").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForReq = function () {
        $("#txtToDateForReq").focus();
        $("#txtToDateForReq").trigger("click");
    }


    $scope.reloadBtn = function () {
        $('#txtFromReq').val('');
        $('#txtToDateForReq').val('');
        $('#DemandNo').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.DemandNo = null;
        GetPagedForMaterialsDemand(1);
    }

    $scope.MaterialsDemandSearch = function () {
        GetPagedForMaterialsDemand(1);

    }

    function GetPagedForMaterialsDemand(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromReq").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForReq").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.DemandNo != undefined && $scope.DemandNo != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([DemandDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([MaterialsDemandNo] LIKE '%" + $scope.DemandNo + "%')";

        }
        else if ($scope.DemandNo !== undefined && $scope.DemandNo != null && $scope.DemandNo != "") {
            SearchCriteria = "[MaterialsDemandNo] LIKE '%" + $scope.DemandNo + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[DemandDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }

        $http({
            url: encodeURI('/MaterialsDemand/GetMaterialsDemandPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.MaterialsDemandListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;

            if ($scope.MaterialsDemandListForGrid.length > 0) {
                angular.forEach($scope.MaterialsDemandListForGrid, function (aDemand) {
                    var res1 = aDemand.DemandDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aDemand.DemandDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aDemand.DemandDate = date1;
                    }
                    var res2 = aDemand.DeliveryDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(aDemand.DeliveryDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        aDemand.DeliveryDate = date2;
                    }
                })

            }
            else {
                alertify.log('Materials Demand  Not Found', 'error', '5000');
            }

        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForMaterialsDemand($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForMaterialsDemand($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForMaterialsDemand($scope.currentPage);
        }
        //  }


    }


});