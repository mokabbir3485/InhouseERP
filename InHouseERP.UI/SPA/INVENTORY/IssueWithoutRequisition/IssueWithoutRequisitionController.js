app.controller("IssueWithoutRequisitionController", function ($scope, $rootScope, $cookieStore, $window, $http, $filter) {
  //  $scope.LoginUser = $cookieStore.get('UserData');
   

    

    Clear();

    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.branchId = $scope.LoginUser.BranchId;
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Stock Transfer').ScreenId;
        //    GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Stock Transfer').ScreenId;
        //        GetUsersPermissionDetails();
        //    }, 500);
        //}

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Stock Transfer').ScreenId;
        GetUsersPermissionDetails();


        $scope.inv_StockIssue = {};
        $scope.inv_StockIssue.IssueId = 0;
        $scope.ConfirmationMessageForAdmin = false;
        $scope.ItemSearchResultList = [];
        $scope.Storelist = [];
        $scope.DepartmentList = [];
        $scope.VarietyList = [];
        $scope.employeeList = [];
        $scope.TransferTypeList = [];
        $scope.inv_PurchaseBill = [];
        $scope.SingleIssuelist = [];
        $scope.TransferSerialList = [];
        $scope.ItemUnitlist = [];
        $scope.inv_JumboStockIssue = {};
        $scope.inv_JumboStockIssueDetail = [];
        $scope._inv_StockIssueDetailAdAttribute = [];
        $scope._inv_StockIssueDetailAdAttributeDetail = [];
        $scope.stockTransfer = {};
        $scope.stockTransferDetail = [];
        $scope.ddlStore = null;
        $scope.btnSave = "Save";
        $scope.found = false;
        $scope.disabledItemType = false;
        $scope.ItemList = [];
        $scope.inv_StockIssue.MaterialTypeId = 0;
        $scope.MaterialTypeId = 0;
        $scope.ItemType = [];
        ItemType();
        // GetByCombinationLike();
        GetAllEmployee();
        //GetAllStockTransferType()
        GetIsApprove();
        GetUnit();
        GetConfirmationMessageForAdmin();
       /* DepartmentGetByBranchAndDeptTypeId();*/
        //GetAllDepartment();
        DetailClear();

        $scope.inv_StockIssue.IssueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetMaxIssueNo();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetStockTransferPaged($scope.currentPage);
        GetByCombinationand();
        $scope.AllCombinationItemlist = [];
        $scope.TransferQtyInRoll = true;
        $scope.TransferQtyInHarware = false; 
        $scope.ItemInfoList = [];
       // $scope.ddlUnit = { ItemUnitId: 1 }
        $scope.ItemCombination = {};
     //   GetUsersPermissionDetails();
        $scope.StocktransferObj = {};

        $scope.ddlProduction = null;
        $scope.ddlIwo = null;

        $scope.ProductionWiseIwoList = [];
        $scope.ProductionWiseIwoListDistinct = [];
        $scope.ProductionWiseIwoListFilter = [];
       // ProductionWiseInternalWorkOrder();

        $scope.LoaderFlag = false;

        GetAllmatrialpaperType();
        $scope.matrialPaperTypeList = [];
        
        GetAllLabelBrand();
        $scope.LabelBrandList = [];
        $scope.ddLabelBrand1 = null;
        $scope.ddLabelBrand = null;
        ReportNotificationDetail_Get();
    }


    function ReportNotificationDetail_Get() {


        $http({
           
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'ST',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
            console.log('Mail', $scope.AppNotificationSetupList);
        });

    }


    function AppNotificationLogPost(NotificaitonTitle) {
        $scope.AppNotificationLogList = [];


        // angular.forEach(SalesOrderList, function (aSO) {
        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle;

            if (aNotify.DepartmentId == 7) {

                if (aNotify.SectionId == $scope.LoginUser.SectionId) {

                    obj.NotificationDetail = ' Stock Transfer No : ' + $scope.inv_StockIssue.StockTransferNo + '~ Transfer Type : ' + $scope.ddlTransferType.StockTransferTypeName + ' ~ Employee Name : ' + $scope.LoginUser.FullName;

                    $scope.AppNotificationLogList.push(obj);
                }
            } else {
               
                obj.NotificationDetail = ' Stock Transfer No : ' + $scope.inv_StockIssue.StockTransferNo + ' ~ Transfer Type : ' + $scope.ddlTransferType.StockTransferTypeName + ' ~ Employee Name : ' + $scope.LoginUser.FullName;
                $scope.AppNotificationLogList.push(obj);
            }

            // })


        })


        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) { });
    }


    $("#txtIssueDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.DateChangeForStockTransfer = function () {
        $("#txtIssueDate").focus();
        $("#txtIssueDate").trigger("click");
    }

  
   
    function GetAllLabelBrand() {
        
        var searchCriteria = 'IsActive = 1'
        $http({
            url: "/LabelBrand/GetLabelBrandDynamic?searchCriteria=" + searchCriteria,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.LabelBrandList = data;

           

            
        });
    }

    $scope.IsLabelBrandDdl = false;
    ///======>>>> Production Wise IWO List
    $scope.CheckUpdate = function (row) {
      
        if ($scope.ItemCombination.AttributeQty == undefined) {
            $scope.ItemCombination.AttributeQty = 0;
        }
        if (row.IsChecked) {

            $scope.ItemCombination.AttributeQty = $scope.ItemCombination.AttributeQty + 1;
        } else {
            $scope.ItemCombination.AttributeQty = $scope.ItemCombination.AttributeQty - 1;
        }
    }

    $scope.ItemCombination.SubCategoryId = 0;
    $scope.CheckForISTM = function () {
        $scope.ItemCombination.SerialList = [];
        $scope.ItemCombination.SubCategoryId = 0;
        $scope.ItemCombination.CurrentQuantity = 0
        $scope.ItemCombination.UnitName = "";

        $scope.ItemCombination.ToCurrentQuantity = 0;
        $scope.ItemCombination.ToUnitName = "";

        $scope.ItemCombination.FormCurrentQuantity = 0;
        $scope.ItemCombination.FormUnitName = "";


        if ($scope.ddlTransferType !=null) {
           // if ($scope.ddlTransferType.StockTransferTypeId == 2) {
                if ($scope.ddlStore != null) {
                    $http({
                        url: '/InternalWorkOrder/ProductionWiseInternalWorkOrder?DepartmentId=' + $scope.ddlStore.DepartmentId + '&StockTransferTypeId=' + $scope.ddlTransferType.StockTransferTypeId,
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }).success(function (data) {
                        $scope.ProductionWiseIwoList = data;
                        $scope.ProductionWiseIwoListDistinct = Enumerable.From(data)
                            .Distinct(function (x) {
                                return x.InternalWorkOrderId
                            }).ToArray();

                        console.log(" $scope.ProductionWiseIwoListDistinct", $scope.ProductionWiseIwoListDistinct);
                    })
                }
            }
        //}
        $scope.SingleIssuelist = [];
        $scope._inv_StockIssueDetailAdAttribute = [];

        ItemInfoDropdownClear();


    }


    function ItemInfoDropdownClear() {
        $("#SearchTextBox").val('').select2({
            theme: "classic",
            templateResult: formatOutput,
        });

        $("#FormSearchTextBox").val('').select2({
          //  placeholder: "From Item Name ",
            templateResult: formatOutput,
        });
        $("#ToSearchTextBox").val('').select2({
            templateResult: formatOutput,
          //  placeholder: "To Item Name ",
        });

        $("#ToPaperType").val('').select2({
            //placeholder: "--Material Paper Type--",
        });

        $("#FormPaperType").val('').select2({
            
           // placeholder: "--Material Paper Type--",
        });

        $("#ddlPaperType").val('').select2({
           
           // theme: "classic",
        });




        $("#ddlItemSelect2").val('').select2({
            placeholder: "Select Item",
            theme: "classic",
            dropdownAutoWidth: false
          
        });
    }
   
    $scope.GetCheckInternalWorkOrderForId = function (IWO) {
        $scope.ProductionWiseIwoListFilter = [];
        angular.forEach($scope.ProductionWiseIwoList,function (aPro) {

            if (IWO.InternalWorkOrderId == aPro.InternalWorkOrderId) {
                $scope.ProductionWiseIwoListFilter.push(aPro);
            }
        })
       
        
    }


    $scope.CheckUnitName = function (unit) {
        console.log(unit);
        $scope.ItemUnitId = unit.ItemUnitId;
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

    function GetByCombinationand() {
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            //$scope.ItemList = data;

            angular.forEach(data, function (aData) {
            
                    aData.Combination = aData.ItemName +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemCode
                        +
                        " ~ " + "Sub Category: " +
                        aData.SubCategoryName;

                    $scope.ItemList.push(aData)
  



            })
        })
    }

    $("#SearchTextBox").select2({

        theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });

    $("#FormSearchTextBox").select2({

        theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });
    $("#ToSearchTextBox").select2({

        theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });

    $scope.BrandLabelEmpty = function () {
        //$("#ddlPaperType").val('').select2({
        //   // theme: "classic",
        //});
        //$("#FormPaperType").val('').select2({});
        
    }

    $scope.BrandCheckStock = function (ddlLabelBrandId) {
        if (ddlLabelBrandId == null) {
            var LableId = null;
        } else {
            var LableId = ddlLabelBrandId.LabelBrandId;
        }
        if ($scope.ddlPaperTypeId == null || $scope.ddlPaperTypeId == undefined) {
            var MaterialTypeId = null;
        } else {
            var MaterialTypeId = $scope.ddlPaperTypeId.MaterialTypeId;
        }
        if (MaterialTypeId !=null) {
            CommonCurrentStock($scope.ddlStore.DepartmentId, $scope.ItemSearchCombination.ItemId, MaterialTypeId, LableId);
        }
      
    }
    $scope.BrandCheckStock1 = function (ddlLabelBrandId) {
        
        if (ddlLabelBrandId == null) {
            var LableId = null;
        } else {
            var LableId = ddlLabelBrandId.LabelBrandId;
        }
        //if ($scope.formddlmatrialPaperType == null || $scope.formddlmatrialPaperType == undefined) {
        //    var MaterialTypeId = null;
        //} else {
        //    var MaterialTypeId = $scope.formddlmatrialPaperType.MaterialTypeId;
        //}
        if ($scope.formddlmatrialPaperType != null) {
            CommonCurrentStock($scope.ddlStore.DepartmentId, $scope.formSearchCombination.ItemId, $scope.formddlmatrialPaperType.MaterialTypeId, LableId);
        }
       
    }


    


    function CommonCurrentStock(departmentId,ItemId,materialId,LabelStockId) {
        $scope.ItemCombination.CurrentQuantity = 0;
      
        $scope.ItemCombination.FormCurrentQuantity = 0;

        $http({
            url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + departmentId + "&ItemId=" + ItemId + "&MaterialTypeId=" + materialId + "&LabelBrandId=" + LabelStockId,
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {

            if (data.length > 0) {

                if (data[0].ItemUnitId == 0 || data[0].ItemUnitId == undefined) {
                    $scope.ItemCombination.UnitName = "N/A";
                    $scope.ItemCombination.FormUnitName = "N/A";
                    $scope.ItemCombination.ItemUnitId = 0;
                } else {
                    $scope.ItemCombination.ItemUnitId = data[0].ItemUnitId;
                    $scope.ddlUnit = { ItemUnitId: data[0].ItemUnitId };
                    $scope.ItemCombination.UnitName = data[0].UnitName;
                    $scope.ItemCombination.FormUnitName = data[0].UnitName;
                }
                if (data[0].LabelBrandId == null || data[0].LabelBrandId == undefined) {
                    $scope.ItemCombination.LabelBrandName = "N/A";
                    $scope.ItemCombination.LabelBrandId = "";
                } else {
                    $scope.ItemCombination.LabelBrandName = data[0].LabelBrandName;
                    $scope.ItemCombination.LabelBrandId = data[0].LabelBrandId;
                }

                if (data[0].CategoryId == 0 || data[0].CategoryId == undefined) {
                    $scope.ItemCombination.CategoryId = 0;
                } else {
                    $scope.ItemCombination.CategoryId = data[0].CategoryId;
                }



                if (data[0].CurrentQuantity == undefined || data[0].CurrentQuantity == null) {

                    $scope.ItemCombination.FormCurrentQuantity = 0;
                } else {
                    $scope.ItemCombination.FormCurrentQuantity = data[0].CurrentQuantity;
                    $scope.ItemCombination.CurrentQuantity = data[0].CurrentQuantity;
                }

            } else {
                $scope.ItemCombination.FormCurrentQuantity = 0;
                $scope.ItemCombination.CurrentQuantity = 0;
            }


        });
    }

    $scope.IsMatrialType = true
    $scope.LoadACombination = function (aCombination) {
        if (aCombination != null) {
            if (aCombination.SubCategoryId == 3) {

                $("#ddLabelBrand1").val('').select2({
                    dropdownAutoWidth: false
                });

                $("#ddLabelBrand2").val('').select2({
                    dropdownAutoWidth: false
                });
                $scope.ddlLabelBrand = { LabelBrandId: null };
            }
        }
       

        if (aCombination != null) {
           

            $scope.ItemCombination.SerialList = [];
            //  ItemInfoDropdownClear();
            if (aCombination.CategoryId != 0 || aCombination.CategoryId != undefined) {
                if (aCombination.CategoryId == 2) {
                    $scope.IsMatrialType = false;
                } else {
                    $scope.IsMatrialType
                }
            }


            if (aCombination.CategoryId == 2) {
                var MatrialId = null;
                var LabelId = null;
                CommonCurrentStock($scope.ddlStore.DepartmentId, aCombination.ItemId, null, null);
            }
          
            var criteria = "HSWS.[DepartmentId]=" + $scope.ddlStore.DepartmentId + " AND ItemId=" + aCombination.ItemId;
            $http({
                url: '/WarrentyAndSerialNo/GetWarrantyAndSerialNoDynamicForSingle?whereCondition=' + criteria,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (warrentySerialNoList) {
                if (warrentySerialNoList.length > 0) {
                    $scope.ItemCombination.SerialList = warrentySerialNoList;
                    $scope.ItemCombination.AttributeQty = 0;
                    $scope.IsHardware = true;
                } else {
                    $scope.IsHardware = false;
                }
            })


            $("#ddLabelBrand1").val('').select2({
                dropdownAutoWidth: false
            });

            $("#ddLabelBrand2").val('').select2({
                dropdownAutoWidth: false
            });
            $("#ddlPaperType").val('').select2({
                //theme: "classic",
            });


            $scope.ItemCategoryId = aCombination.CategoryId;
            $scope.FilterItemId = aCombination.ItemId;

            $scope.ItemCombination = aCombination;

            //$scope.ddlUnit = { ItemUnitId: aCombination.UnitId };
            //$scope.LoadItemUnitId = aCombination.UnitId;

            $scope.ItemCombination.CurrentQuantity = 0;
        } else {

            $scope.ItemCombination.CurrentQuantity = 0;
            $scope.ItemCombination.ToCurrentQuantity = 0;
            $scope.ItemCombination.FormCurrentQuantity = 0;
        }
    }

    $scope.FormItemLoad = function (aCombination) {

        if (aCombination !=null) {
            if (aCombination.SubCategoryId == 3) {
                $("#ddLabelBrand1").val('').select2({
                    dropdownAutoWidth: false
                });

                $("#ddLabelBrand2").val('').select2({
                    dropdownAutoWidth: false
                });
                $scope.ddlLabelBrand = { LabelBrandId: null };
            }
        }
       

        if (aCombination != null) {

           

            $scope.ItemCombination.SerialList = [];
            $("#ddLabelBrand1").val('').select2({
                dropdownAutoWidth: false
            });

            $("#ddLabelBrand2").val('').select2({
                dropdownAutoWidth: false
            });
            $("#FormPaperType").val('').select2({});
            $scope.ItemCombination.FormCurrentQuantity = 0;
            $scope.ItemCombination = aCombination;
            if (aCombination.CategoryId == 2) {
                var MatrialId = null;
                var LabelId = null;
                CommonCurrentStock($scope.ddlStore.DepartmentId, aCombination.ItemId, null, null);
            }

            if (aCombination.CategoryId == 2) {
                var MatrialId = null;
                var LabelId = null;
               
            }

           

            var criteria = "HSWS.[DepartmentId]=" + $scope.ddlStore.DepartmentId + " AND ItemId=" + aCombination.ItemId;
            $http({
                url: '/WarrentyAndSerialNo/GetWarrantyAndSerialNoDynamicForSingle?whereCondition=' + criteria,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (warrentySerialNoList) {
                if (warrentySerialNoList.length > 0) {
                    $scope.ItemCombination.SerialList = warrentySerialNoList;
                    $scope.ItemCombination.AttributeQty = 0;
                    $scope.IsHardware = true;
                } else {
                    $scope.IsHardware = false;
                }

            })
        } else {
            $scope.ItemCombination.CurrentQuantity = 0;
            $scope.ItemCombination.ToCurrentQuantity = 0;
            $scope.ItemCombination.FormCurrentQuantity = 0;

        }
    }
    $scope.ToItemLoad = function () {
        //$scope.ItemCombination.ToCurrentQuantity = 0;
       // $scope.ItemCombination = aCombination.ItemId;
        $("#ToPaperType").val('').select2({});
       
    }


   

    $scope.ToBrandLabelStock = function () {

        if ($scope.ToLabelBrand == null) {
            $scope.ToLabelBrand.LabelBrandId = 0
        }

        $http({
            url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + $scope.ddlStore.DepartmentId + "&ItemId=" + $scope.ToSearchCombination.ItemId + "&MaterialTypeId=" + $scope.toddlmatrialPaperType.MaterialTypeId + "&LabelBrandId=" + $scope.ToLabelBrand.LabelBrandId,
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {

            if (data.length > 0) {
                if (data[0].ItemUnitId == 0 || data[0].ItemUnitId == undefined) {
                    $scope.ItemCombination.ToUnitName = "N/A";
                    $scope.ItemCombination.ItemUnitId = 0;
                } else {
                    $scope.ItemCombination.ItemUnitId = data[0].ItemUnitId;
                    $scope.ddlUnit = { ItemUnitId: data[0].ItemUnitId };
                    $scope.ItemCombination.ToUnitName = data[0].UnitName;
                }
                if (data[0].LabelBrandId == null || data[0].LabelBrandId == undefined) {
                    $scope.ItemCombination.LabelBrandName = "N/A";
                    $scope.ItemCombination.LabelBrandId = "";
                } else {
                    $scope.ItemCombination.LabelBrandName = data[0].LabelBrandName;
                    $scope.ItemCombination.LabelBrandId = data[0].LabelBrandId;
                }

                if (data[0].CategoryId == 0 || data[0].CategoryId == undefined) {
                    $scope.ItemCombination.CategoryId = 0;
                } else {
                    $scope.ItemCombination.CategoryId = data[0].CategoryId;
                }




                if (data[0].CurrentQuantity == undefined || data[0].CurrentQuantity == null) {
                    $scope.ItemCombination.FormCurrentQuantity = 0;
                } else {
                    $scope.ItemCombination.ToCurrentQuantity = data[0].CurrentQuantity;

                }
                // $scope.LoadItemUnitId = aCombination.UnitId;
            } else {

                $scope.ItemCombination.ToCurrentQuantity = 0;

            }

        });
    }

    $scope.ToPaperTypeId = function (ddlPaper) {

        $("#ToddLabelBrand2").val('').select2({});
        $scope.ToLabelBrand = null;
        
        if ($scope.ToSearchCombination !=null) {
            $scope.ItemCombination.CurrentQuantity = 0;
            $scope.ItemCombination.ToCurrentQuantity = 0;

            $http({
                url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + $scope.ddlStore.DepartmentId + "&ItemId=" + $scope.ToSearchCombination.ItemId + "&MaterialTypeId=" + ddlPaper.MaterialTypeId + "&LabelBrandId=" + null,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {

                if (data.length > 0) {
                    if (data[0].ItemUnitId == 0 || data[0].ItemUnitId == undefined) {
                        $scope.ItemCombination.ToUnitName = "N/A";
                        $scope.ItemCombination.ItemUnitId = 0;
                    } else {
                        $scope.ItemCombination.ItemUnitId = data[0].ItemUnitId;
                        $scope.ddlUnit = { ItemUnitId: data[0].ItemUnitId };
                        $scope.ItemCombination.ToUnitName = data[0].UnitName;
                    }
                    if (data[0].LabelBrandId == null || data[0].LabelBrandId == undefined) {
                        $scope.ItemCombination.LabelBrandName = "N/A";
                        $scope.ItemCombination.LabelBrandId = "";
                    } else {
                        $scope.ItemCombination.LabelBrandName = data[0].LabelBrandName;
                        $scope.ItemCombination.LabelBrandId = data[0].LabelBrandId;
                    }

                    if (data[0].CategoryId == 0 || data[0].CategoryId == undefined) {
                        $scope.ItemCombination.CategoryId = 0;
                    } else {
                        $scope.ItemCombination.CategoryId = data[0].CategoryId;
                    }




                    if (data[0].CurrentQuantity == undefined || data[0].CurrentQuantity == null) {
                        $scope.ItemCombination.FormCurrentQuantity = 0;
                    } else {
                        $scope.ItemCombination.ToCurrentQuantity = data[0].CurrentQuantity;

                    }
                    // $scope.LoadItemUnitId = aCombination.UnitId;
                } else {

                        $scope.ItemCombination.ToCurrentQuantity = 0;

                }
               
            });

        }
      
    }

    $scope.GetByCombinationLike = function () {
        $("#ddLabelBrand1").val('').select2({
            dropdownAutoWidth: false
        });

        $("#ddLabelBrand2").val('').select2({
            dropdownAutoWidth: false
        });
        $("#ddlPaperType").val('').select2({
           // theme: "classic",
        });
    }

    $scope.CheckForStockItem = function (ddlPaperType) {

        if ($scope.formSearchCombination != null) {
            if ($scope.formSearchCombination.SubCategoryId != 4 ) {
                LabelBrandId = null;
            } else {
                if ($scope.ddlLabelBrand == null || $scope.ddlLabelBrand == undefined) {
                    LabelBrandId = null;
                } else {
                    LabelBrandId = $scope.ddlLabelBrand.LabelBrandId;
                }
               
            }
        }

        if ($scope.ItemSearchCombination != null) {

            if ($scope.ItemSearchCombination.SubCategoryId != 4) {
                LabelBrandId = null;
            }
            else {
                if ($scope.ddlLabelBrand != null || $scope.ddlLabelBrand != undefined) {
                    LabelBrandId = $scope.ddlLabelBrand.LabelBrandId;
                } else {
                    LabelBrandId = null;
                }
                
            }
        }
       
        if (ddlPaperType == null) {

            PaperTypeId= null;
        } else {
            PaperTypeId = ddlPaperType.MaterialTypeId;
        }
        if ($scope.ddlTransferType.StockTransferTypeId != 5) {
            if (ddlPaperType == null) {
                $("#ddLabelBrand1").val('').select2({
                    dropdownAutoWidth: false
                });

                $("#ddLabelBrand2").val('').select2({
                    dropdownAutoWidth: false
                });
                $scope.ddlLabelBrand = null;

                $scope.ItemCombination.FormCurrentQuantity = 0;
                $scope.ItemCombination.ToCurrentQuantity = 0;
                $scope.ItemCombination.CurrentQuantity = 0;
                return;
            }
        }
        //if (ddlPaperType != null) {

            $http({
                url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + $scope.ddlStore.DepartmentId + "&ItemId=" + $scope.ItemCombination.ItemId + "&MaterialTypeId=" + PaperTypeId + "&LabelBrandId=" + LabelBrandId,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {

                if (data.length > 0) {

                    if (data[0].ItemUnitId == 0 || data[0].ItemUnitId == undefined) {
                        $scope.ItemCombination.UnitName = "N/A";
                        $scope.ItemCombination.FormUnitName = "N/A";
                        $scope.ItemCombination.ItemUnitId = 0;
                    } else {
                        $scope.ItemCombination.ItemUnitId = data[0].ItemUnitId;
                        $scope.ddlUnit = { ItemUnitId: data[0].ItemUnitId };
                        $scope.ItemCombination.UnitName = data[0].UnitName;
                        $scope.ItemCombination.FormUnitName = data[0].UnitName;
                    }

                    if (data[0].LabelBrandId == null || data[0].LabelBrandId == undefined || data[0].LabelBrandId == 0) {
                        $scope.ItemCombination.LabelBrandName = "N/A";
                        $scope.ItemCombination.LabelBrandId = "";
                    } else {
                        $scope.ItemCombination.LabelBrandName = data[0].LabelBrandName;
                        $scope.ItemCombination.LabelBrandId = data[0].LabelBrandId;
                        $scope.ItemCombination.FormCurrentQuantity = data[0].CurrentQuantity;
                        $scope.ItemCombination.CurrentQuantity = data[0].CurrentQuantity;
                    }

                    if (data[0].CategoryId == 0 || data[0].CategoryId == undefined) {
                        $scope.ItemCombination.CategoryId = 0;
                    } else {
                        $scope.ItemCombination.CategoryId = data[0].CategoryId;
                    }



                    if (data[0].CurrentQuantity == undefined || data[0].CurrentQuantity == null) {

                        $scope.ItemCombination.FormCurrentQuantity = 0;
                    } else {
                        $scope.ItemCombination.FormCurrentQuantity = data[0].CurrentQuantity;
                        $scope.ItemCombination.CurrentQuantity = data[0].CurrentQuantity;
                    }

                } else {
                    $scope.ItemCombination.FormCurrentQuantity = 0;
                    $scope.ItemCombination.CurrentQuantity = 0;

                }
            });
        //} else {
        //    $("#ddLabelBrand1").val('').select2({
        //        dropdownAutoWidth: false
        //    });

        //    $("#ddLabelBrand2").val('').select2({
        //        dropdownAutoWidth: false
        //    });
        //    $scope.ddlLabelBrand = null;

        //    $scope.ItemCombination.FormCurrentQuantity = 0;
        //    $scope.ItemCombination.ToCurrentQuantity = 0;
        //    $scope.ItemCombination.CurrentQuantity = 0;
        //}
      //Internal Item store Transfer

    }

    $scope.AddIssueDetail = function () {

        var isValid = true;
        var isValid1 = true;
        if ($scope.ItemCombination.AttributeQty == undefined || $scope.ItemCombination.AttributeQty == 0) {
            isValid = false;
           
            alertify.log('Transfer Quantity Must be entry !!!', 'error', '5000');
        }
        if ($scope.ddlUnit == null || $scope.ddlUnit == undefined) {
            isValid1 = false;
            alertify.log('Item Unit Must be entry !!!', 'error', '5000');
        }



        if ($scope.ddlPaperTypeId == null || $scope.ddlPaperTypeId == undefined) {
            $scope.ddlPaperTypeId = null;
        }
        if ($scope.formddlmatrialPaperType == null || $scope.formddlmatrialPaperType == undefined) {
            $scope.formddlmatrialPaperType = null;
        }
        if ($scope.toddlmatrialPaperType == null || $scope.toddlmatrialPaperType == undefined) {
            $scope.toddlmatrialPaperType = null;
        }

        if (isValid && isValid1) {

            if (($scope.ItemCombination.FormCurrentQuantity || $scope.ItemCombination.CurrentQuantity) >= $scope.ItemCombination.AttributeQty) {
                if ($scope.ddlUnit != null) {
                    var flag = true;
                    $scope.ItemCombination.UnitName;
                    var Attribute = $scope.ItemCombination;
                    Attribute.TransferQty = $scope.ItemCombination.AttributeQty;
                    Attribute.NoSerial = $scope.ItemCombination.NoSerial;
                    if ($scope.ddlUnit != null) {

                        angular.forEach($scope.ItemUnitlist, function (aUnit) {
                            if ($scope.ItemUnitId == aUnit.ItemUnitId) {
                                Attribute.UnitName = aUnit.UnitName;
                            }

                            if ($scope.LoadItemUnitId == aUnit.ItemUnitId) {
                                Attribute.UnitName = aUnit.UnitName;
                            }
                        });
                    }
                    //  Attribute.SerialList = $scope.ItemCombination.SerialList;
                    $scope._inv_StockIssueDetailAdAttribute.push(Attribute);

                    flag = true;

                    var Item = {};
                  

                    Item.RollLenghtInMeter = $scope.ItemCombination.RollLenghtInMeter;
                    Item.RollAreaInSqMeter = $scope.ItemCombination.RollAreaInSqMeter;
                    Item.PackageWeight = $scope.ItemCombination.PackageWeight;
                    Item.IssuedJumboWidth = $scope.ItemCombination.IssuedJumboWidth;
                    Item.NoSerial = $scope.ItemCombination.NoSerial;

                    if ($scope.ddlLabelBrand == null || $scope.ddlLabelBrand == undefined) {
                        Item.LabelBrandId = 0;
                        Item.LabelBrandName = "N/A";
                    } else {
                        Item.LabelBrandId = $scope.ddlLabelBrand.LabelBrandId;
                        Item.LabelBrandName = $scope.ddlLabelBrand.LabelBrandName;


                    }

                    if ($scope.ToLabelBrand == null || $scope.ToLabelBrand == undefined) {
                        Item.To_LabelBrandId = 0;
                        Item.ToLabelBrandName = "N/A";
                    } else {
                        Item.ToLabelBrandName = $scope.ToLabelBrand.LabelBrandName;
                        Item.To_LabelBrandId = $scope.ToLabelBrand.LabelBrandId;
                    }


                    Item.CategoryId = $scope.ItemCategoryId;
                    Item.Barcode = $scope.ItemCombination.ItemCode;
                    Item.UnitName = $scope.ItemCombination.UnitName;


                    if ($scope.ddlTransferType.StockTransferTypeId == 4) {

                        angular.forEach($scope.ItemUnitlist, function (aUnit) {
                            if ($scope.ddlUnit.ItemUnitId == aUnit.ItemUnitId) {
                                Item.UnitName = aUnit.UnitName;
                                Item.ItemUnit = { ItemUnitId: aUnit.ItemUnitId };

                                Item.ItemUnitId = $scope.ItemCombination.ItemUnitId;
                                Item.ItemUnit = { ItemUnitId: $scope.ItemCombination.ItemUnitId };
                            }

                            if ($scope.ddlUnit.ItemUnitId == aUnit.ItemUnitId) {
                                Item.UnitName = aUnit.UnitName;
                                Item.ItemUnit = { ItemUnitId: aUnit.ItemUnitId };

                                Item.ItemUnitId = $scope.ItemCombination.ItemUnitId;
                                Item.ItemUnit = { ItemUnitId: $scope.ItemCombination.ItemUnitId };
                            }
                        });

                        if ($scope.toddlmatrialPaperType == null) {
                            Item.MaterialTypeName = "N/A";
                        } else {
                            Item.MaterialTypeName = $scope.toddlmatrialPaperType.Combination;
                        }
                        if ($scope.formddlmatrialPaperType == null) {
                            Item.FromMaterialTypeName = "N/A";
                        } else {
                            Item.FromMaterialTypeName = $scope.formddlmatrialPaperType.Combination;
                        }



                        if ($scope.formddlmatrialPaperType == null) {
                            Item.MaterialTypeId = 0;
                            Item.To_MaterialTypeId = 0;
                        } else {
                            Item.MaterialTypeId = $scope.formddlmatrialPaperType.MaterialTypeId;
                            Item.To_MaterialTypeId = $scope.toddlmatrialPaperType.MaterialTypeId;
                        }


                        if ($scope.ddlLabelBrand == null || $scope.ddlLabelBrand == undefined) {
                            Item.LabelBrandId = 0;
                            Item.LabelBrandName = "N/A";
                        } else {
                            Item.LabelBrandId = $scope.ddlLabelBrand.LabelBrandId;
                            Item.LabelBrandName = $scope.ddlLabelBrand.LabelBrandName;


                        }

                        if ($scope.ToLabelBrand == null || $scope.ToLabelBrand == undefined) {
                            Item.To_LabelBrandId = 0;
                            Item.ToLabelBrandName = "N/A";
                        } else {
                            Item.ToLabelBrandName = $scope.ToLabelBrand.LabelBrandName;
                            Item.To_LabelBrandId = $scope.ToLabelBrand.LabelBrandId;
                        }


                        Item.IssueQuantity = $scope.ItemCombination.AttributeQty;
                        Attribute.IssueQuantity = Number($scope.ItemCombination.AttributeQty);
                        Item.IssueQuantity = Number($scope.ItemCombination.AttributeQty);
                        Item.TransferQty = $scope.ItemCombination.AttributeQty;


                        Item.ItemName = $scope.formSearchCombination.Combination;

                        Item.ToItemName = $scope.ToSearchCombination.Combination;



                        Item.To_ItemId = $scope.ToSearchCombination.ItemId;
                        Item.ItemId = $scope.formSearchCombination.ItemId;

                        Item.Barcode = $scope.ToSearchCombination.ItemCode;

                        Item.CurrentQuantity = $scope.ItemCombination.ToCurrentQuantity;



                        Item.CategoryId = $scope.ToSearchCombination.CategoryId;
                        Item.SubCategoryId = $scope.ToSearchCombination.SubCategoryId;



                    } else {

                        angular.forEach($scope.ItemUnitlist, function (aUnit) {
                            if ($scope.ddlUnit.ItemUnitId == aUnit.ItemUnitId) {
                                Item.UnitName = aUnit.UnitName;
                                Item.ItemUnit = { ItemUnitId: aUnit.ItemUnitId };
                            }

                            if ($scope.ddlUnit.ItemUnitId == aUnit.ItemUnitId) {
                                Item.UnitName = aUnit.UnitName;
                                Item.ItemUnit = { ItemUnitId: aUnit.ItemUnitId };

                                Item.ItemUnitId = $scope.ItemCombination.ItemUnitId;
                                Item.ItemUnit = { ItemUnitId: $scope.ItemCombination.ItemUnitId };
                            }
                        });
                        Item.TransferQty = $scope.ItemCombination.AttributeQty;
                        Item.IssueQuantity = Number($scope.ItemCombination.AttributeQty);

                        if ($scope.ddlPaperTypeId == null) {
                            Item.MaterialTypeId = 0;
                            Item.MaterialTypeName ="N/A";
                        } else {

                            Item.MaterialTypeId = $scope.ddlPaperTypeId.MaterialTypeId;
                            Item.MaterialTypeName = $scope.ddlPaperTypeId.MaterialTypeName;
                        }


                        if ($scope.ddlLabelBrand == null || $scope.ddlLabelBrand == undefined) {
                            Item.LabelBrandId = 0;
                            Item.LabelBrandName = "N/A";
                        } else {
                            Item.LabelBrandId = $scope.ddlLabelBrand.LabelBrandId;
                            Item.LabelBrandName = $scope.ddlLabelBrand.LabelBrandName;


                        }

                        if ($scope.ToLabelBrand == null || $scope.ToLabelBrand == undefined) {
                            Item.To_LabelBrandId = 0;
                            Item.ToLabelBrandName = "N/A";
                        } else {
                            Item.ToLabelBrandName = $scope.ToLabelBrand.LabelBrandName;
                            Item.To_LabelBrandId = $scope.ToLabelBrand.LabelBrandId;
                        }



                        Item.ItemId = $scope.ItemSearchCombination.ItemId;

                        Item.CurrentQuantity = $scope.ItemCombination.CurrentQuantity;
                        Item.Barcode = $scope.ItemCombination.ItemCode;

                        Item.ItemName = $scope.ItemCombination.Combination;
                        Item.ItemUnitId = $scope.ItemCombination.ItemUnitId;

                        Item.CategoryId = $scope.ItemSearchCombination.CategoryId;
                        Item.SubCategoryId = $scope.ItemSearchCombination.SubCategoryId;
                    }
                    Item.SerialList = $scope.ItemCombination.SerialList;
                    Item.NoSerial = $scope.ItemCombination.NoSerial;
                    $scope.SingleIssuelist.push(Item);

                    //if ($scope.ItemCombination.CategoryId == 2 && Item.NoSerial == false) {
                    //    $scope.Combination = $scope.ItemSearchCombination.Combination;
                    //    var criteria = "HSWS.[DepartmentId]=" + $scope.ddlStore.DepartmentId + " AND ItemId=" + $scope.ItemSearchCombination.ItemId;
                    //    $http({
                    //        url: '/WarrentyAndSerialNo/GetWarrantyAndSerialNoDynamicForSingle?whereCondition=' + criteria,
                    //        method: 'GET',
                    //        headers: { 'Content-Type': 'application/json' }
                    //    }).success(function (warrentySerialNoList) {
                    //        if (warrentySerialNoList.length > 0) {
                    //            Item.SerialList = warrentySerialNoList;
                    //        }
                    //        $scope.SingleIssuelist.push(Item);
                    //    })


                    //} else {
                    //    $scope.SingleIssuelist.push(Item);
                    //}



                    $scope.disabledItemType = true;
                    //  }


                    SumAttQty();
                    $scope.ItemCombination = {};
                    $scope.ItemSearchCombination = null;

                    $('#SearchTextBox').select2('destroy');
                    $('#SearchTextBox').val('').select2({
                        placeholder: "Type Item Name Or Any Other Related Info",
                        templateResult: formatOutput,
                    });

                    $('#FormSearchTextBox').select2('destroy');
                    $("#FormSearchTextBox").val('').select2({
                        placeholder: "From Item Name ",
                        templateResult: formatOutput,
                   
                    });
                    $('#ToSearchTextBox').select2('destroy');
                    $("#ToSearchTextBox").val('').select2({
                        placeholder: "To Item Name ",
                        templateResult: formatOutput,
                     
                    });

                    $('#ToPaperType').select2('destroy');
                    $("#ToPaperType").val('').select2({
                        placeholder: "--Material Paper Type--",

                    });


                    $('#FormPaperType').select2('destroy');
                    $("#FormPaperType").val('').select2({
                        placeholder: "--Material Paper Type--",

                    });


                    $('#SearchTextBox').focus();
                    $scope.ddlUnit = null;

                }
                else {
                    alertify.log('Item Unit Must be Entry !!!', 'error', '5000');
                }

            } else {
                alertify.log('Stock Quantity not sufficient', 'error', '5000');
            }
        }

      

        //angular.forEach($scope._inv_StockIssueDetailAdAttribute, function (aDetailAdAttribute) {

        //    if (aDetailAdAttribute.ItemId == $scope.ItemCombination.ItemId) {
        //        flag = false;
        //    }
        //});

        //if (flag) {

         
       
    }

    $scope.CountCheckedTransferQty = function (aIssue) {
        var qty = 0;

        angular.forEach(aIssue.SerialList, function (sData) {
            if (sData.IsChecked) {
                qty++;
            }
        });

        aIssue.TransferQty = qty;

    };

    $scope.CheckCurrentProductionStockWithItemLoad = function (production) {

    if (production!=null) {

        if (production.ProductionId == null || production.ProductionId == undefined) {
            production.ProductionId = 0;
        }
        if (production.DepartmentId == null || production.DepartmentId == undefined) {
            production.DepartmentId = 0;
        }

        if ($scope.ddlStore != null) {
            $http({
                url: '/Production/ProductionWiseDepartmentAndProductionById?ProductionId=' + production.ProductionId + '&DepartmentId=' + production.DepartmentId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {

              //  $scope.SingleIssuelist = data;
                $scope.SingleIssuelist = [];
               
                angular.forEach(data,function (aData) {
                    var Item = {};

                    angular.forEach($scope.ItemUnitlist, function (aUnit) {
                        if (aUnit.ItemUnitId == aData.ProductionItemUnitId) {
                            Item.ItemUnitId = aData.ProductionItemUnitId;
                            Item.ItemUnit = { ItemUnitId: aData.ProductionItemUnitId}
                        }
                    })
                 

                    Item.RollLenghtInMeter = aData.ProductionQtyInRoll;
                    Item.RollAreaInSqMeter = aData.RollAreaInSqMeter;
                    Item.PackageWeight = aData.RollAreaInSqMeter;

                    Item.IssueQuantity = aData.ProductionQuantity;

                    Item.CategoryId = aData.CategoryId;
                  //  Item.SubCategoryId = aData.SubCategoryId;
                    Item.ItemName = aData.ItemName;
                    Item.ItemId = aData.ItemId;
                   
                  

                    Item.TransferQty = aData.ProductionQuantity;
                    Item.IssuedJumboWidth = aData.ProductionQtyInRoll;

                    Item.Barcode = aData.ItemCode;
                    Item.UnitName = aData.UnitName;
                    Item.TransferQty = aData.ProductionQuantity;
                    Item.RollLenghtInMeter = aData.RollLenghtInMeter;
                    Item.RollAreaInSqMeter = aData.RollAreaInSqMeter;
                    Item.PackageWeight = aData.PackageWeight;
                    Item.CurrentQuantity = aData.CurrentQuantity;
                    Item.ProductionDetailId = aData.ProductionDetailId;
                    Item.MaterialTypeId = aData.MaterialTypeId;
                    Item.MaterialTypeName = aData.MaterialTypeName;

                    if (aData.LabelBrandId == 0 || aData.LabelBrandId == null || aData.LabelBrandId == undefined) {
                        Item.LabelBrandId =0;
                        Item.LabelBrandName ="N/A";
                    } else {
                        Item.LabelBrandId = aData.LabelBrandId;
                        Item.LabelBrandName = aData.LabelBrandName;
                    }
                 

                    Item.InternalWorkOrderId = aData.InternalWorkOrderId;
                    Item.ProductionId = aData.ProductionId;

                    $scope.StocktransferObj.InternalWorkOrderId = aData.InternalWorkOrderId;
                    $scope.StocktransferObj.ProductionId = aData.ProductionId;

                    $scope.SingleIssuelist.push(Item);

                   
                    var attr = {};
                    attr.Barcode = aData.ItemCode;
                    attr.UnitName = aData.UnitName;
                    attr.TransferQty = aData.ProductionQuantity;
                    attr.RollLenghtInMeter = aData.RollLenghtInMeter;
                    attr.RollAreaInSqMeter = aData.RollAreaInSqMeter;
                    attr.PackageWeight = aData.PackageWeight;
                    attr.CurrentQuantity = aData.CurrentQuantity;
                    attr.MaterialTypeId = aData.MaterialTypeId;
                    attr.MaterialTypeName = aData.MaterialTypeName;
                    if (aData.LabelBrandId == 0 || aData.LabelBrandId == null || aData.LabelBrandId == undefined) {
                        attr.LabelBrandId =0;
                        attr.LabelBrandName ="N/A";
                    } else {
                        attr.LabelBrandId = aData.LabelBrandId;
                        attr.LabelBrandName = aData.LabelBrandName;
                    }
                   
                    attr.InternalWorkOrderId = aData.InternalWorkOrderId;
                    attr.ProductionId = aData.ProductionId;
                    attr.ItemId = aData.ItemId;
                 
                    $scope._inv_StockIssueDetailAdAttribute.push(attr);
                });



                console.log("SingleIssuelist", $scope.SingleIssuelist);
            })
        }
       
    }

}

    

   

    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.RemovePermission = false;
        $scope.ListViewPermission = false;

        $scope.TransferTypeMaterialReturn = false;
        $scope.TransferTypeISTM = false;
        $scope.TransferTypeStoretoStoreTransfer = false;
        $scope.TransferTypeInternalItemStoreTransfer = false;
        $scope.TransferTypeItemToItemTransfer = false;

        $scope.TransferTypeFunctionList =[];

        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
         
            $scope.PermissionDetails = data;
            $scope.TransferTypeFunctionList = data.filter((aData) => aData.FunctionName == "Material Return" || aData.FunctionName == "ISTM" || aData.FunctionName == "Store to Store Transfer" || aData.FunctionName == "Item To Item Transfer" || aData.FunctionName == "Internal Item Store Transfer");
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
                else if (aPermissionDetails.FunctionName == 'Material Return' ) {
                    $scope.TransferTypeMaterialReturn  = aPermissionDetails.CanExecute;
                } else if (aPermissionDetails.FunctionName == 'ISTM') {
                    $scope.TransferTypeISTM = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Store to Store Transfer') {
                    $scope.TransferTypeStoretoStoreTransfer = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Item To Item Transfer') {
                    $scope.TransferTypeItemToItemTransfer = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Internal Item Store Transfer') {
                    $scope.TransferTypeInternalItemStoreTransfer = aPermissionDetails.CanExecute;
                }
            });
            GetAllStockTransferType();
        });
    }


    $scope.RedirectItemEntry = function () {
        // $location.path('/Home/Index/ItemEntry');
        $window.location.href = '/Home/Index#/ItemEntry';
    }

    
    function ItemType() {

        $http({
            url: '/PurchaseBill/PurchaseMaterialTypeGet',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemType = data;
            

        });
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

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
            $scope.ddlIssueeBy = { EmployeeId: $scope.LoginUser.EmployeeId};
            $scope.inv_StockIssue.IssuedById = $scope.LoginUser.EmployeeId;
            $scope.inv_StockIssue.IssuedBy = $scope.LoginUser.Username;
            $scope.stockTransfer.IssuedBy = $scope.LoginUser.EmployeeId;
            
        });
    }
    function GetAllStockTransferType() {
        $http({
            url: '/IssueWithoutRequisition/GetAllStockTransferType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
          
            $scope.TransferTypeFunctionList;
            angular.forEach(data, function (aTra) {
                angular.forEach($scope.TransferTypeFunctionList, function (aData) {
                    if (aData.FunctionName == aTra.StockTransferTypeName) {
                        $scope.TransferTypeList.push(aTra);
                    }
                })
            });

            //$scope.TransferTypeMaterialReturn = false;
            //$scope.TransferTypeISTM = false;
            //$scope.TransferTypeStoretoStoreTransfer = false;
            //$scope.TransferTypeItemToItemTransfer = false;

            //if ($scope.TransferTypeMaterialReturn == true) {
            //    $scope.TransferTypeList = data.filter((aData) => aData.StockTransferTypeId == 1)
            //} else if ($scope.TransferTypeISTM==true) {
            //    $scope.TransferTypeList = data.filter((aData) => aData.StockTransferTypeId == 2)
            //}
            //else if ($scope.TransferTypeStoretoStoreTransfer == true) {
            //    $scope.TransferTypeList = data.filter((aData) => aData.StockTransferTypeId == 3)
            //}
            //else if ($scope.TransferTypeItemToItemTransfer==true) {
            //    $scope.TransferTypeList = data.filter((aData) => aData.StockTransferTypeId == 4)
            //}
          

            
        });
    }


    function GetIsApprove() {
        $scope.HasApproval = false;
        $scope.ScreenId = $cookieStore.get('StockIssueWithoutRequisitionScreenId');
        $http({
            url: '/Approval/GetByScreenId?screenId=' + $scope.ScreenId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.HasApproval = data.IsRequired;
        })
    }

    function GetUnit() {
        $http({
            url: '/Unit/GetAllUnit',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemUnitlist = data;
            
        })
    }

    //function GetAllStore() {
    //    $http({
    //        url: '/User/GetUserStoreByUserId?userId=' + $scope.LoginUser.UserId,
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (userOutletList) {
    //        $scope.Storelist = userOutletList;
    //        if ($scope.Storelist.length == 1) {
    //            $scope.ddlStore = { 'DepartmentId': $scope.Storelist[0].DepartmentId };
    //            $scope.inv_StockIssue.IssueFromDepartmentId = $scope.Storelist[0].DepartmentId;
    //            $scope.inv_StockIssue.IssueFromDepartmentName = $scope.Storelist[0].DepartmentName;
    //            GetByCombinationandDepertment();
    //        }
    //    });
    //}

    $scope.CheckISTMLoadForStore = function (ddlTransferType) {
        GetAllDepartment(ddlTransferType);
    }



    $scope.LoadFormTransfer = function (ddlTransferType) {
       

        $('#ddlStoreSelect2').select2('destroy');
        $("#ddlStoreSelect2").val('').select2({
        });

        $('#ddlDepartment').select2('destroy');
        $("#ddlDepartment").val('').select2({
        });
        $scope.ProductionWiseIwoList = [];
        $scope.SingleIssuelist = [];

        DepartmentGetByBranchAndDeptTypeId(ddlTransferType);
        GetAllDepartment(ddlTransferType);

        $('#SearchTextBox').select2('destroy');
        $("#SearchTextBox").val('').select2({});
        $('#FormSearchTextBox').select2('destroy');
        $("#FormSearchTextBox").val('').select2({});
        $('#ToSearchTextBox').select2('destroy');
        $("#ToSearchTextBox").val('').select2({});
        $('#ToPaperType').select2('destroy');
        $("#ToPaperType").val('').select2({});
        $('#FormPaperType').select2('destroy');
        $("#FormPaperType").val('').select2({});
        $('#ddlPaperType').select2('destroy');
        $("#ddlPaperType").val('').select2({});
        $('#ddLabelBrand1').select2('destroy');
        $("#ddLabelBrand1").val('').select2({});
        $('#ddLabelBrand2').select2('destroy');
        $("#ddLabelBrand2").val('').select2({});
        $scope.ddlIwo = null;
        $('#SelectIWO').select2('destroy');
        $("#SelectIWO").val('').select2({
            theme: "classic",
        });
        $('#SelectProduction').select2('destroy');
        $("#SelectProduction").val('').select2({
            theme: "classic",
        });

        $('#ddlItemSelect2').select2('destroy');
        $("#ddlItemSelect2").val('').select2({});
        $('#ddlPaperTypeId').select2('destroy');
        $("#ddlPaperTypeId").val('').select2({})



     

       
    }
    function DepartmentGetByBranchAndDeptTypeId(ddlTransferType) {
        $http({
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Storelist = [];
            angular.forEach(data, function (aData) {

                if (ddlTransferType != undefined) {

                    if (ddlTransferType.StockTransferTypeId == 2) {

                        if (aData.DepartmentName.match(/Production/gi)) {
                            aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                            $scope.Storelist.push(aData);
                        }
                    } else {
                        aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                        $scope.Storelist.push(aData);
                    }
                }
               
            
            })
        });


        
    }

    function GetAllDepartment(ddlTransferType) {
        $http({
            //  url: '/Department/DepartmentGetByBranchAndDeptTypeId?branchId=' +null,
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            // url: '/Department/GetAllTypeWiseActiveDepartment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //$scope.DepartmentList = data;
            // 
            $scope.DepartmentList = [];
            angular.forEach(data, function (aData) {

                //aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                //$scope.DepartmentList.push(aData);


                if (ddlTransferType != undefined) {
                    if (ddlTransferType.StockTransferTypeId == 2) {

                        if (aData.DepartmentName.match(/Store/gi)) {
                            aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                            $scope.DepartmentList.push(aData);
                        }
                    } else {
                        aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                        $scope.DepartmentList.push(aData);
                    }
                }
                

            })

        });
    }

    function GetAllmatrialpaperType() {

        $http({
            url: '/MaterialType/GetAllMaterialType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data, function (aData) {
                aData.Combination = aData.MaterialTypeName + ' ~ ' + aData.MaterialTypeCode
                $scope.matrialPaperTypeList.push(aData);
            })

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

    function DetailClear() {
        $scope.inv_StockIssueDetail = {};
        $("#txtItemCode").removeAttr("disabled");
        $("#txtVariety").removeAttr("disabled");
        $scope.ItemCode = '';
        $scope.Product = '';
        $scope.ddlUnit = null;
        $scope.RemoveBtnShow = false;
        $scope.buttonAddIssue = "Add Transfer";
        GetAllVariety();
    }

    function GetMaxIssueNo() {
      

            //$scope.OnSelectdate = $scope.inv_StockIssue.IssueDate;
            //var today = $scope.OnSelectdate;
            //$scope.financial_year = "";
            //var getMonth = today.substring(0, 3);

            //var getFullYear = today.substring(6, 11);
            //var fullYear = parseInt(getFullYear);


            //if (getMonth > 6) {
            //    $scope.financial_year = (fullYear - 1) + "-" + fullYear;
            //} else {
            //    $scope.financial_year = fullYear + "-" + (fullYear + 1)
            //}

            //var getYear1 = $scope.financial_year.substring(2, 4);
            //var getYear2 = $scope.financial_year.substring(7, 9);
            //$scope.getAllYear = getYear1 + "-" + getYear2;

            //$http({
            //    url: '/Issue/GetMaxStockIssueNumber',
            //    method: 'GET',
            //    headers: { 'Content-Type': 'application/json' }
            //}).success(function (data) {
            //    //$scope.inv_Requisition = data;
            //    $scope.inv_StockIssue.IssueNo = "SIN/" + $scope.getAllYear + "/" + parseInt(data);

            //});

            var dateParts =
                ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
            var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];

            $http({
                url: '/Issue/GetMaxStockIssueNumber?issueDate=' + from,

                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                //$scope.inv_PurchaseBilldate = data;
                $scope.inv_StockIssue.IssueNo = data;

            });

           $http({
               url: '/IssueWithoutRequisition/GetMaxStockTransferNumber',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
           }).success(function (StockTransferNo) {
               $scope.MaxStockTransferNo = StockTransferNo;
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
                   $scope.inv_StockIssue.StockTransferNo = 'STN/' + $scope.finYearEPZ + '/' + $scope.MaxStockTransferNo;
               })
               

            });
        

        //var date = $("#txtIssueDate").val();
        //if (date != "") {
        //    $http({
        //        url: '/IssueWithoutRequisition/GetMaxIssueNoWithoutReqByDate?issueDate=' + date,
        //        method: 'GET',
        //        headers: { 'Content-Type': 'application/json' }
        //    }).success(function (data) {
        //        $scope.inv_StockIssue.IssueNo = parseInt(data);
        //    });
        //} else {
        //    $("#txtIssueDate").focus();
        //}

    }

    function SumAttQty() {
        //angular.forEach($scope._inv_StockIssueDetailAdAttribute, function (aDetailAdAttribute) {
        //    if (aDetailAdAttribute.AttributeQty < 1 || aDetailAdAttribute.AttributeQty == undefined || aDetailAdAttribute.AttributeQty == null)
        //    {
        //         aDetailAdAttribute.AttributeQty =1;
        //    }
        //});

        angular.forEach($scope.SingleIssuelist, function (aStockReceiveDetail) {
            aStockReceiveDetail.IssueUnitId = 1;
            aStockReceiveDetail.IssueUnitName = "Pcs";
            aStockReceiveDetail.IssueQuantity = Enumerable.From($scope._inv_StockIssueDetailAdAttribute).Where("$.ItemId == '" + aStockReceiveDetail.ItemId + "'").Sum('$.AttributeQty');
            aStockReceiveDetail.ReturnedQuantity = Enumerable.From($scope._inv_StockIssueDetailAdAttribute).Where("$.ItemId == '" + aStockReceiveDetail.ItemId + "'").Sum('$.CurrentQuantity');
            //aStockReceiveDetail.IssueUnitPrice = Enumerable.From($scope._inv_StockIssueDetailAdAttribute).Where("$.ItemId == '" + aStockReceiveDetail.ItemId + "'").Sum('$.IssueUnitPrice');
        });
      //  $scope.SingleIssuelist = Enumerable.From($scope.SingleIssuelist).Where("$.IssueQuantity != 0").ToArray();
    }

    //function GetByCombinationandDepertment() {
    //    if ($scope.ddlStore !=null) {
    //        $http({
    //            url: '/Item/GetByDepartmentAndCombinationLike?departmentId=' + $scope.ddlStore.DepartmentId,
    //            method: 'GET',
    //            headers: { 'Content-Type': 'application/json' }
    //        }).success(function (data) {
    //            $scope.AllCombinationlist = JSON.parse(data);
    //            $scope.ItemList = JSON.parse(data);
    //        })
    //    }
    //    else {
    //        $scope.ItemSearchCombination = null;
    //    }
    //}

    //$scope.getMaxIssWithoutReqNoByDate = function () {
    //    GetMaxIssueNo();
    //};

    
    

    


    $scope.ItemAndAttrInfoRollSqmWkg = function (itemObj) {
        $scope.ItemInfoList = [];
        $("#itemSqmLmKgModal").modal('show');

        angular.forEach($scope.AllCombinationItemlist, function (aData) {
            //$scope.ItemCombination = {};
            //$scope.ItemUnitFilterList = [];
            if (itemObj.ItemId == aData.ItemId) {

                var item = {};
                item.RollLenghtInMeterVal = aData.RollLenghtInMeter;
                item.RollAreaInSqMeterVal = aData.RollAreaInSqMeter;
                item.PackageWeightVal = aData.PackageWeight;

                $scope.ItemInfoList.push(item);
            }
        })



    }
    $scope.IsHardware = false;
    $scope.RollSqmAndKgCalculationWithAdd = function () {
        //if ($scope.ItemCombination.SerialList.length > 0) {
        //    $scope.ItemCombination.AttributeQty = 0;
        //    angular.forEach($scope.ItemCombination.SerialList, function (adata) {
        //        if (adata) {

        //        }
        //    })
        //}
      
        $scope.ItemCombination.IssuedJumboWidth = $scope.ItemCombination.AttributeQty * $scope.ItemSearchCombination.RollWidthInMeter;
        RollSqmAndKgCalculation();

    }
   

    function RollSqmAndKgCalculation() {

        if ($scope.ItemCombination.AttributeQty == null || $scope.ItemCombination.AttributeQty == undefined || $scope.ItemCombination.AttributeQty == 0) {
            $scope.ItemCombination.AttributeQty = 0;
           
        }
       
        if ($scope.ItemCombination.RollLenghtInMeter == null || $scope.ItemCombination.RollLenghtInMeter == undefined || $scope.ItemCombination.RollLenghtInMeter == 0) {
            $scope.ItemCombination.RollLenghtInMeter = 0;
        }

        if ($scope.ItemCombination.RollAreaInSqMeter == null || $scope.ItemCombination.RollAreaInSqMeter == undefined || $scope.ItemCombination.RollAreaInSqMeter == 0) {
            $scope.ItemCombination.RollAreaInSqMeter = 0;
        }

        if ($scope.ItemCombination.PackageWeight == null || $scope.ItemCombination.PackageWeight == undefined || $scope.ItemCombination.PackageWeight == 0) {
            $scope.ItemCombination.PackageWeight = 0;
        }




        angular.forEach($scope.AllCombinationItemlist, function (aData) {

            if ($scope.ItemCombination.ItemId == aData.ItemId) {
            if ($scope.ItemCombination.CurrentQuantity >= $scope.ItemCombination.AttributeQty) {
                $scope.ItemCombination.RollLenghtInMeter = aData.RollLenghtInMeter * $scope.ItemCombination.AttributeQty;
                $scope.ItemCombination.RollAreaInSqMeter = aData.RollAreaInSqMeter * $scope.ItemCombination.AttributeQty;
                $scope.ItemCombination.PackageWeight = aData.PackageWeight * $scope.ItemCombination.AttributeQty;
                return;
            } else {
                $scope.ItemCombination.RollLenghtInMeter = 0;
                $scope.ItemCombination.RollAreaInSqMeter = 0;
                $scope.ItemCombination.PackageWeight = 0;
                $scope.ItemCombination.AttributeQty = $scope.ItemCombination.CurrentQuantity;
                alertify.log('Current Qty Greater than Req. Qty !', 'error', '5000');

                }
            }



        });

   

    }


    $scope.RemoveItemAttr = function (aAttribute) {


        var ind = $scope.SingleIssuelist.indexOf(aAttribute);
        $scope.SingleIssuelist.splice(ind, 1);

        //var ind1 = $scope._inv_StockIssueDetailAdAttribute.indexOf(aAttribute);
        //$scope._inv_StockIssueDetailAdAttribute.splice(ind1, 1);

        angular.forEach($scope._inv_StockIssueDetailAdAttribute, function (aData) {
            if (aData.ItemId == aAttribute.ItemId) {
                var ind2 = $scope._inv_StockIssueDetailAdAttribute.indexOf(aData);
                $scope._inv_StockIssueDetailAdAttribute.splice(ind2, 1);
            }
        });

        $scope.ProductionWiseIwoListFilter = [];
        SumAttQty();
        if ($scope.SingleIssuelist.length == 0) {
            $scope.disabledItemType = false;
        }
    }
    $scope.itemInfoName = "Item";

    $scope.RollSqmMAndRollWeightCal = function (requestionObj) {


       
        //if (requestionObj.RollLenghtInMeter == null || requestionObj.RollLenghtInMeter == undefined) {
        //    requestionObj.RollLenghtInMeter = 0;
        //}
        //else if (requestionObj.RollAreaInSqMeter == 0 || requestionObj.RollAreaInSqMeter == null) {
        //    requestionObj.RollAreaInSqMeter = 0;
        //}
        //else if (requestionObj.PackageWeight == undefined || requestionObj.PackageWeight == null) {
        //    requestionObj.PackageWeight = 0;
        //}
        //var rollMeter = requestionObj.RollLenghtInMeter;
        //var rollSqm = requestionObj.RollAreaInSqMeter;
        //var rollKg = requestionObj.PackageWeight;

       
        //if (isNaN(requestionObj.RollLenghtInMeter)) {
        //    requestionObj.RollLenghtInMeter = 0;
        //}
        //requestionObj.RollLenghtInMeter = requestionObj.AttributeQty * requestionObj.RollLenghtInMeterVal;
        //requestionObj.RollAreaInSqMeter = requestionObj.AttributeQty * requestionObj.RollAreaInSqMeterVal;
        //requestionObj.PackageWeight = requestionObj.AttributeQty * requestionObj.PackageWeightVal;

        if (isNaN(requestionObj.TransferQty)) {
            requestionObj.TransferQty = 0;
        }
        if (isNaN(requestionObj.RollLenghtInMeter)) {
            requestionObj.RollLenghtInMeter = 0;
        }
        if (isNaN(requestionObj.RollAreaInSqMeter)) {
            requestionObj.RollAreaInSqMeter = 0;
        }
        if (isNaN(requestionObj.PackageWeight)) {
            requestionObj.PackageWeight = 0;
        }
        angular.forEach($scope.AllCombinationItemlist, function (aData) {

            if (requestionObj.ItemId == aData.ItemId) {
                if (requestionObj.CurrentQuantity >= requestionObj.TransferQty) {
                    requestionObj.RollLenghtInMeter = aData.RollLenghtInMeter * requestionObj.TransferQty;
                    requestionObj.RollAreaInSqMeter = aData.RollAreaInSqMeter * requestionObj.TransferQty;
                    requestionObj.PackageWeight = aData.PackageWeight * requestionObj.TransferQty;
                    return;
                } else {
                    requestionObj.RollLenghtInMeter = 0;
                    requestionObj.RollAreaInSqMeter = 0;
                    requestionObj.PackageWeight = 0;
                    requestionObj.TransferQty = requestionObj.CurrentQuantity;
                    alertify.log('Current Qty Greater than Req. Qty !', 'error', '5000');

                }
            }



        });
       
      


    }

    $scope.CheckDuplicateIssueNo = function () {
        var date = $("#txtIssueDate").val();
        if (date == "") {
            $("#txtIssueDate").focus();
            alertify.log('Please select date.', 'error', '5000');
            return;
        }
        if ($scope.inv_StockIssue.IssueNo == "" || angular.isUndefined($scope.inv_StockIssue.IssueNo) || $scope.inv_StockIssue.IssueNo == null) {
            GetMaxIssueNo();
        } else {
            $http({
                url: '/Issue/CheckDuplicateIssueNo?IssueNo=' + $scope.inv_StockIssue.IssueNo + "&date=" + date,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                if (data.length > 0) {
                    $scope.found = true;
                    alertify.log("Issue No. " + $scope.inv_StockIssue.IssueNo + ' already exists!', 'error', '3000');
                    $scope.inv_StockIssue.IssueNo = "";
                    $('#txtIssueNo').focus();
                } else {
                    $scope.found = false;
                }
            });
        }
    }

    $scope.foundChange = function () {
        $scope.found = true;
    }

    $scope.CheckItemQuantity = function (CurrentQuantity, AttributeQty) {
        if (CurrentQuantity < AttributeQty) {
            alertify.log('Attribute Qty must not be greater then CurrentQuantity', 'error', '10000');
            return CurrentQuantity;
        }
        else {
            return AttributeQty;
        }
    }

    $scope.SumAttQty = function () {
        SumAttQty();
    }

    $scope.SaveIssueWithoutRequisition = function () {

        if (($scope.StocktransferObj.StockTransferId == 0 || $scope.StocktransferObj.StockTransferId == undefined) && $scope.CreatePermission) {
            SaveStockTransfer();
        } else {
            alertify.log('Don`t have Create Permission!', 'error', '5000');
        }
    }

    function SaveStockTransfer() {
        var erroMsg = [];
        if ($scope.ddlReceiveBy.EmployeeId == undefined || $scope.ddlReceiveBy.EmployeeId == null) {
            alertify.log('Select Reference Name', 'error', '5000');
            return;
        }
        //for (var i = 0; i < $scope.SingleIssuelist.length; i++) {
        //    if ($scope.SingleIssuelist[i].IsSerialNo == false) {
        //        alertify.log($scope.SingleIssuelist[i].ItemName + '. This Item has no serial number!!!', 'error', '5000');
        //        $scope.IsSave = false;
        //        break;
        //    } else {
        //        $scope.IsSave = true;
        //    }
        //}
        
        $scope.TransferSerialList = [];
        /*if ($scope.IsSave) {*/
        $scope.IsSave = true;
        angular.forEach($scope.SingleIssuelist, function (aData) {
            if (aData.CategoryId == 2 && (aData.NoSerial == false || aData.NoSerial == undefined)) {
                    //if (aData.SerialList != undefined) {
                        var TransferSerial = Enumerable.From(aData.SerialList).Where('$.IsChecked').ToArray();
                        if (TransferSerial.length > 0) {
                            angular.forEach(TransferSerial, function (aTS) {
                                /*if (aTS.SerialNo != '0' && aTS.WarrentyInDays != 0) {*/
                                if (TransferSerial.length != aData.TransferQty) {
                                    $scope.IsSave = false;
                                        //alertify.log('Selected serials do not match with transfer qty!!!', 'error', '5000');
                                        return;
                                    }
                                    aTS.FromDepartmentId = $scope.ddlStore.DepartmentId;
                                    aTS.ToDepartmentId = $scope.ddlDepartment.DepartmentId;
                                    $scope.TransferSerialList.push(aTS);

                                /*}*/
                            })
                        } else {
                            $scope.IsSave = false;
                            //alertify.log('Selected serials do not match with transfer qty!!!', 'error', '5000');
                            return;
                        }
                        
                    //}



                }

            })
        if (!$scope.IsSave) {
            alertify.log('Selected serials do not match with transfer qty!!!', 'error', '5000');
        }
        //}
        

        if (erroMsg.length > 0) {
            angular.forEach(erroMsg, function (aErroMsg) {
                alertify.log(aErroMsg.msg, 'error', '5000');
            });
        }
        else {
            $scope.inv_StockIssue.CreatorId = $scope.LoginUser.UserId;
            $scope.inv_StockIssue.UpdatorId = $scope.LoginUser.UserId;
            $scope.inv_StockIssue.IsApproved = $scope.HasApproval ? false : true;


            if ($scope.btnSave == "Save" && $scope.IsSave) {

                $scope.StocktransferObj.StockTransferNo = $scope.inv_StockIssue.StockTransferNo;
                $scope.StocktransferObj.StockTransferDate = $scope.inv_StockIssue.IssueDate;
                $scope.StocktransferObj.StockTransferTypeId = $scope.inv_StockIssue.StockTransferTypeId;
                $scope.StocktransferObj.ToStore = $scope.inv_StockIssue.IssueToDepartmentId;
                $scope.StocktransferObj.FromStore = $scope.inv_StockIssue.IssueFromDepartmentId;
                $scope.StocktransferObj.UpdatorId = $scope.inv_StockIssue.UpdatorId;
                $scope.StocktransferObj.MaterialTypeId = $scope.MaterialTypeId;


                $scope.StocktransferObj.IssuedBy = $scope.ddlReceiveBy.EmployeeId;
                $scope.StocktransferObj.ReceivedBy = $scope.ddlIssueeBy.EmployeeId;





                //$scope.inv_JumboStockIssue = $scope.inv_StockIssue;


                $scope.inv_JumboStockIssue.ToDepartmentId = $scope.inv_StockIssue.IssueToDepartmentId;
                $scope.inv_JumboStockIssue.FromDepartmentId = $scope.inv_StockIssue.IssueFromDepartmentId;
                $scope.inv_JumboStockIssue.JIssueNo = $scope.inv_StockIssue.StockTransferNo;
                $scope.inv_JumboStockIssue.JIssueDate = $scope.inv_StockIssue.IssueDate;
                $scope.inv_JumboStockIssue.MaterialTypeId = $scope.MaterialTypeId;
                $scope.inv_JumboStockIssue.UpdatorId = $scope.inv_StockIssue.UpdatorId;
                $scope.inv_JumboStockIssue.CreatorId = $scope.inv_StockIssue.CreatorId;

                $scope.stockTransferDetail = [];
                angular.forEach($scope.SingleIssuelist, function (aData) {
                    var objTransfer = {};
                    objTransfer.StockTransferDetailId = 0;
                    objTransfer.StockTransferId = 0;
                    objTransfer.ItemId = aData.ItemId;
                    // objTransfer.CurrentQuantity = aData.ReturnedQuantity;
                    objTransfer.CurrentQuantity = aData.CurrentQuantity;
                    if (aData.ProductionDetailId != undefined || aData.ProductionDetailId != 0) {
                        objTransfer.TransferQuantity = aData.TransferQty;
                    } else {

                        objTransfer.TransferQuantity = aData.IssueQuantity;
                    }

                    objTransfer.IssuedPrice = aData.IssuedPrice;
                    objTransfer.ItemUnitId = aData.ItemUnitId;
                    objTransfer.ItemUnitName = aData.ItemUnitName;
                    objTransfer.RollLenghtInMeter = aData.RollLenghtInMeter;
                    objTransfer.RollAreaInSqMeter = aData.RollAreaInSqMeter;
                    objTransfer.PackageWeight = aData.PackageWeight;
                    objTransfer.MaterialTypeId = aData.MaterialTypeId;
                    objTransfer.LabelBrandId = aData.LabelBrandId;

                    objTransfer.To_LabelBrandId = aData.To_LabelBrandId;

                    objTransfer.LabelBrandName = aData.LabelBrandName;
                    objTransfer.IssuedJumboWidth = aData.IssuedJumboWidth;

                    objTransfer.ToStore = $scope.inv_StockIssue.IssueToDepartmentId;
                    objTransfer.FromStore = $scope.inv_StockIssue.IssueFromDepartmentId;

                    objTransfer.SubCategoryId = aData.SubCategoryId;
                    objTransfer.CategoryId = aData.CategoryId;
                    objTransfer.IssuedById = $scope.inv_StockIssue.EmployeeId;
                    objTransfer.ReceivedById = $scope.inv_StockIssue.EmployeeId;
                    objTransfer.ProductionDetailId = aData.ProductionDetailId;
                    objTransfer.ExceedOrShortage = aData.ExceedOrShortage;

                    objTransfer.To_ItemId = aData.To_ItemId;
                    objTransfer.To_MaterialTypeId = aData.To_MaterialTypeId;

                  


                    // objTransfer.ReceivedById = $scope.inv_StockIssue.EmployeeId;


                    $scope.stockTransferDetail.push(objTransfer);
                    var objJumboStock = {};

                    objJumboStock.JumboItemId = aData.ItemId;
                    objJumboStock.IssuedJumboWidth = aData.IssuedJumboWidth;
                    objJumboStock.IssuedJumboRollQty = aData.IssueQuantity;
                    objJumboStock.MaterialTypeId = aData.MaterialTypeId;
                    objJumboStock.LabelBrandId = aData.LabelBrandId;
                    objJumboStock.LabelBrandName = aData.LabelBrandName;
                    objJumboStock.To_ItemId = aData.To_ItemId;
                    objJumboStock.To_MaterialTypeId = aData.To_MaterialTypeId;

                    objJumboStock.SubCategoryId = aData.SubCategoryId;
                    objJumboStock.CategoryId = aData.CategoryId;

                    objTransfer.To_LabelBrandId = aData.To_LabelBrandId;
                    $scope.inv_JumboStockIssueDetail.push(objJumboStock);

                    //$scope.StocktransferObj.InternalWorkOrderId = aData.InternalWorkOrderId;
                    //$scope.StocktransferObj.ProductionId = aData.ProductionId;


                });

                var flag = true;
                if ($scope.StocktransferObj.StockTransferTypeId != 5) {
                    angular.forEach($scope.stockTransferDetail, function (aData) {
                        if ((aData.MaterialTypeId == 0 || aData.MaterialTypeId == undefined) && aData.CategoryId != 2) {
                            flag = false;
                        }
                    })
                }
                
                if (flag) {
                    alertify.confirm("Are you sure to save ?", function (e) {
                        if (e) {
                           
                            //var a = $scope.inv_StockIssue.IssueDate;

                            //var from = a.split("/");
                            //var f = new Date(from[2], from[1] - 1, from[0]);

                            //$scope.inv_StockIssue.IssueDate = $scope.inv_StockIssue.IssueDate.split("/").reverse().join("-");




                            //$scope.inv_JumboStockIssueDetail = $scope.SingleIssuelist;


                            /* stockIssue: $scope.inv_StockIssue, issueDetailLst: $scope.SingleIssuelist, inv_JumboStockIssue: $scope.inv_JumboStockIssue, inv_JumboStockIssueDetail: $scope.inv_JumboStockIssueDetail,*/
                            var parms = JSON.stringify({ stockTransfer: $scope.StocktransferObj, stockTransferDetail: $scope.stockTransferDetail, TransferSerialList : $scope.TransferSerialList });
                            $http.post('/IssueWithoutRequisition/SaveIssueWithoutReq', parms).success(function (data) {
                                /* $scope.inv_StockIssue.IssueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy');*/
                                AppNotificationLogPost("Stock Transfer Create");
                                if (data != "") {
                                

                                    Clear();
                                    //  alertify.log('Issue saved successfully!', 'success', '5000');
                                    $scope.ddlStoreSelect2 = null;
                                    $scope.ddlDepartment = null;
                                    $('#ddlReceiveBy').select2('destroy');
                                    $('#ddlReceiveBy').val('').select2({
                                        theme: "classic",
                                        placeholder: "Recived By"
                                    });
                                    $('#ddlIssueeBy').select2('destroy');
                                    $('#ddlIssueeBy').val('').select2({
                                        theme: "classic",
                                        placeholder: "Issueed By"
                                    });

                                    $('#ddlDepartment').select2('destroy');
                                    $('#ddlDepartment').val('').select2({
                                        theme: "classic",
                                       // placeholder: "To Store",
                                    });


                                    $('#ddlStoreSelect2').select2('destroy');
                                    $('#ddlStoreSelect2').val('').select2({
                                        theme: "classic",
                                      //  placeholder: "From Store",
                                    });



                                    $('#SearchTextBox').select2('destroy');
                                    $('#SearchTextBox').val('').select2({
                                        theme: "classic",
                                        placeholder: "Type Item Name Or Any Other Related Info"
                                    });

                                    $('#FormSearchTextBox').select2('destroy');
                                    $("#FormSearchTextBox").val('').select2({
                                        placeholder: "From Item Name ",
                                        theme: "classic",
                                        //dropdownAutoWidth: false
                                    });
                                    $('#ToSearchTextBox').select2('destroy');
                                    $("#ToSearchTextBox").val('').select2({
                                        placeholder: "To Item Name ",
                                        theme: "classic",
                                        //dropdownAutoWidth: false
                                    });

                                    $('#ToPaperType').select2('destroy');
                                    $("#ToPaperType").val('').select2({
                                        placeholder: "--Material Paper Type--",
                                    });


                                    $('#FormPaperType').select2('destroy');
                                    $("#FormPaperType").val('').select2({
                                        placeholder: "--Material Paper Type--",
                                    });

                                    $scope.ddlReceiveBy = null;
                                  
                                    alertify.log('Transfer No : ' + data + ' ' + status + ' Successfully!', 'success', '5000');
                                }
                                else {
                                    alertify.log('Server Errors!', 'error', '5000');
                                }

                                //DepartmentGetByBranchAndDeptTypeId();
                                //GetAllDepartment();
                            });
                        }
                    });
                } else {
                    alertify.log('Material Type Not Found!', 'error', '5000');
                }
              
            }
        }
    }


    $scope.MaterialReturnAndISTMReportBtn = function (aMaterialReturnAndISTMReport) {

        if (aMaterialReturnAndISTMReport.StockTransferTypeId == 1) {
            $window.open("#/MaterialReturnSlipReport", "popup", "width=850,height=550,left=280,top=80");
            $cookieStore.put("MaterialReturnReport", aMaterialReturnAndISTMReport);
            //sessionStorage.setItem("MaterialReturnReport", JSON.stringify(aMaterialReturnAndISTMReport));
        }
        else if (aMaterialReturnAndISTMReport.StockTransferTypeId == 2) {
            $window.open("#/ISTMReport", "popup", "width=850,height=550,left=280,top=80");
            $cookieStore.put("ISTMReport", aMaterialReturnAndISTMReport);
            // sessionStorage.setItem("ISTMReport", JSON.stringify(aMaterialReturnAndISTMReport));
        }
        else if (aMaterialReturnAndISTMReport.StockTransferTypeId == 3 || aMaterialReturnAndISTMReport.StockTransferTypeId == 4) {
            var StoreAndItemTransfer = {
                StockTransferId: aMaterialReturnAndISTMReport.StockTransferId,
                StockTransferTypeId: aMaterialReturnAndISTMReport.StockTransferTypeId,
              
            };

            $window.open("#/StoreAndItemTransfer", "popup", "width=850,height=550,left=280,top=80");
            $cookieStore.put("StoreAndItemTransferReport", StoreAndItemTransfer);
        }
        
        event.stopPropagation();

    };
    $scope.resetForm = function () {
        $scope.SingleIssuelist = [];
        $scope._inv_StockIssueDetailAdAttribute = [];
        $scope.ItemCombination = {};
        $scope.AllCombinationSearch = [];
        Clear();
        $scope.ddlStoreSelect2 = null;
        $scope.ddlDepartment = null;
        $scope.ddlReceiveBy = null;
        $('#ddlReceiveBy').select2('destroy');
        $('#ddlReceiveBy').val('').select2({
            placeholder: "Recived By"
        });
        $('#SearchTextBox').select2('destroy');
        $('#SearchTextBox').val('').select2({
            placeholder: "Type Item Name Or Any Other Related Info"
        });

        $('#ddlDepartment').select2('destroy');
        $('#ddlDepartment').val('').select2({
           // placeholder: "To Store",
        });


        $('#ddlStoreSelect2').select2('destroy');
        $('#ddlStoreSelect2').val('').select2({
            //placeholder: "From Store",
        });
    }

    $scope.unitFilter = function (item) {
        return function (pram) {
            return (pram.ItemUnitId == RawItem.UnitId) || (pram.ItemUnitId == RawItem.PackageId) || (pram.ItemUnitId == RawItem.ContainerId);
        };
    }


    $scope.reloadBtn = function () {
        $('#txtFromDateForST').val('');
        $('#txtToDateForST').val('');
        $('#textStockTransferNo').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchStockTransferNo = null;
        GetStockTransferPaged(1);
    }

    $scope.StockTransferSearch = function () {
        GetStockTransferPaged(1);

    }

    function GetStockTransferPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForST").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForST").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchStockTransferNo != undefined && $scope.SearchStockTransferNo != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([StockTransferDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([StockTransferNo] LIKE '%" + $scope.SearchStockTransferNo + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchStockTransferNo !== undefined && $scope.SearchStockTransferNo != null && $scope.SearchStockTransferNo != "") {
            SearchCriteria = "[StockTransferNo] LIKE '%" + $scope.SearchStockTransferNo + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[StockTransferDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/IssueWithoutRequisition/GetStockTransferPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.StockTransferDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.StockTransferDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.StockTransferDate = date1;
                    }
                })

            }
            else {
                alertify.log('Stock Transfer Not Found', 'error', '5000');
            }
            $scope.StockTransferListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetStockTransferPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetStockTransferPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetStockTransferPaged($scope.currentPage);
        }


    }

    $("#txtFromDateForST").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForCi = function () {
        $("#txtFromDateForST").focus();
        $("#txtFromDateForST").trigger("click");
    }


    $("#txtToDateForST").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForST = function () {
        $("#txtToDateForST").focus();
        $("#txtToDateForST").trigger("click");
    }


});