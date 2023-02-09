app.controller("RequisitionController", function ($scope, $cookieStore, $http, $filter, $window, $location, $timeout, $rootScope) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    //$scope.BranchId = $scope.LoginUser.BranchId;
    //console.log("LoginUser", $scope.LoginUser);

    //var UserData = sessionStorage.getItem("UserDataSession");
    //if (UserData != null) {
    //    $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    //}
    //$scope.BranchId = $scope.LoginUser.BranchId;

    //console.log('$scope.LoginUser',$scope.LoginUser);

    Clear();

    //#region Function
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
          //  console.log('$scope.LoginUser',$scope.LoginUser);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        //if ($rootScope.$PermissionList !== undefined) {
        //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Requisition Entry').ScreenId;
        //    GetUsersPermissionDetails();
        //}
        //else {
        //    setTimeout(function () {
        //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Requisition Entry').ScreenId;
        //        GetUsersPermissionDetails();
        //    }, 500);
        //}

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Requisition Entry').ScreenId;
        GetUsersPermissionDetails();

        //Loading Js
        $scope.countLoding = 1;
        $scope.IsLoading = true;
     

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForRequisition($scope.currentPage);
        $scope.RequisitionListForGrid = [];

        $scope.ItemCombination = {};
        $scope.SelectListDdl = "true";
        //#region local variables
        $scope.ddlRequestionDdl = null;
        $scope.VarietyList = [];
        $scope.Storelist = [];
        $scope.DepartmentList = [];
        $scope.ItemSearchResultList = [];
        $scope.EmployeeList = [];
        $scope.RequisitionPurposeList = [];
        $scope.SearchBtnDisable = false;
        $scope.ScreenId = $cookieStore.get('RequisitionScreenId');
        $scope.ItemUnitlist = [];
        $scope.buttonAddIssue = "Add Item";
        $scope.unitname = '';
        $scope.RequisitionPurposename = '';
        //#endregion

        $scope.iwolist = [];
        $scope.inv_InternalOrderDetailList = [];
        $scope.AllCombinationlist = [];
        $scope.RequisitionDetailList = [];
        $scope.SingleIssuelist = [];
        $scope._inv_StockIssueDetailAdAttribute = [];
        $scope.inv_Requisition = {};
        $scope.inv_Requisition.RequisitionId = 0;
        $scope.inv_Requisition.InternalWorkOrderId = 0;
        $scope.RequisitionType = "IWO";
        $scope.inv_RequisitionDetail = {};
        $scope.ProductionRequisitionPurpose = {};
        $scope.SearchBtnDisable = false;
        $scope.ddlStoreDisable = false;
        GetAllVariety();

        //  GetAllStore();
        DepartmentGetByBranchAndDeptTypeId()
        GetAllUserDepartment();
        GetAllEmployee();
        $scope.ddlStore = new Object();
        $scope.reqDate = '';
        $scope.ddlDepartment = null;
        $scope.ddlPreparedBy = {};
        $scope.ddlRequisitionPurpose = null;
        $scope.Product = '';
        $scope.ddlSalesMu = null;
        $scope.ReqNo = '';
        $scope.Quantity = '';
        $scope.ddlProduct = null;
        $scope.btnSave = "Save";
        $scope.btnDeleteShow = false;
        GetAllItemUnit();
        GetInternalWorkOrderDynamic();
        GetByCombinationand();
        angular.element("input[type='file']").val("");
        GetAllRequisitionPurpose();
        $scope.AllCombinationlistWithPriceListRaw = [];
        $scope.inv_Requisition.RequisitionDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        
        //getMaxRequNoByDate();
        
     
        $scope.ddlMU = null;
        $scope.ItemUnitFilterList = [];
     
        $scope.AllCombinationlist = [];

        $scope.ItemInfoList = [];
        $scope.RollPerKgSqmList = [];

        $scope.ItemCombination = {};
        $scope.ItemCombination.PackageWeight = 0;
        $scope.ItemCombination.RollAreaInSqMeter = 0;
        $scope.ItemCombination.RollLenghtInMeter = 0;
        $scope.ItemCombination.AttributeQty = 0;
        GetCombinationWithPrice();
        $scope.AllCombinationlist = [];
        $scope.ItemCombination.CurrentQuantity = 0; 
        $scope.ddlIwo = null;
        $scope.ddlIwoId = {};
        //GetUsersPermissionDetails();

        $scope.ConfirmationMessageForAdmin = false;
        document.getElementById("requestionDDl").disabled = true;

        GetConfirmationMessageForAdmin();
        IwoGetDynamic();
        $scope.iwolistGetDynamicList = [];

       // document.getElementById("rawMatrialOveride").disabled = true;

        $scope.ddlMUDisable = false;
        getMaxReqNoByDate();

        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];
        $scope.EmailSendNotification = {};
        GetAllmatrialpaperType();
        $scope.matrialPaperTypeList = [];
        $scope.ddlmatrialPaperType = null;
        $scope.EditForRequisitionDetailId = 0;

    }

    function formatOutput(optionElement) {
        //if (!optionElement.id) { return optionElement.text; }
        var ItemCombination = '';
        var DescriptionPart = optionElement.text.split('Requisition No: ');
        var RequisitionNo = DescriptionPart[1];
        if (RequisitionNo != undefined) {
            if (RequisitionNo != 'null') {
                ItemCombination = '<strong style="background-color: #dd4b39; color: white;">' + DescriptionPart[0] + 'Requisition No: ' + DescriptionPart[1] + '</strong>';
            } else {
                ItemCombination = DescriptionPart[0]
            }
        }
        

        var $state = $(
            '<span>' + ItemCombination + '</span>'
        );
        return $state;
    };

    $(".iwoSelect2").select2({
        placeholder: "Select Iwo",
        //theme: "classic",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });


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



    function ReportNotificationDetail_Get() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'Req',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(requestion,NotificaitonTitle) {
        $scope.AppNotificationLogList = [];

        /*      angular.forEach(SalesOrderList, function (aSO) {*/
        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle

            if (aNotify.DepartmentId == 7) {
                if (aNotify.SectionId == $scope.LoginUser.SectionId) {
                    obj.NotificationDetail = 'Requestion No: ' + requestion.RequisitionNo  + ' Employee Name : ' + $scope.LoginUser.FullName;
                    $scope.AppNotificationLogList.push(obj);
                }
            } else {
                obj.NotificationDetail = 'Requestion No: ' + requestion.RequisitionNo + ' Employee Name : ' + $scope.LoginUser.FullName;
                $scope.AppNotificationLogList.push(obj);
            }
        })
        // })


        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) { })
    }


    //function ReportNotificationDetail_Get() {


    //    $http({
    //        url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'Req',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (notification) {
    //        $scope.ReportNotificationDetailList = notification;


    //        console.log('Mail', $scope.ReportNotificationDetailList);
    //    });

    //}

   

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
        $scope.ListView = false;

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
              
                else if (aPermissionDetails.FunctionName =='ListView') {
                    $scope.ListView = aPermissionDetails.CanExecute;
                }
            });
        });
    }


    
    function GetCombinationWithPrice() {
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllCombinationlist = JSON.parse(data);
            
        })
    }

    function GetAllUserDepartment() {
        $http({
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
           // $scope.DepartmentList = data;

            angular.forEach(data, function (aData) {
                if (aData.DepartmentName.match(/Production/gi)) {
                    aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                    $scope.DepartmentList.push(aData);
                }
               
            })
            
        });
    }


    function DepartmentGetByBranchAndDeptTypeId() {
        $http({

            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                if (aData.DepartmentName.match(/Store/gi)) {
                    aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                    $scope.Storelist.push(aData);
                }
            })
         /*   $scope.Storelist = data;*/
            

            //console.log('Load for Storelist', data);
        });
    }





    $scope.ClearDDl1 = function () {
        $("#requestionDDl").val("");
    }
    $scope.ClearDDl2 = function () {
        $("#ReqDdlCl").val("");

      
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
                    //console.log(" $scope.AllCombinationlistWithPriceListRaw",$scope.AllCombinationlistWithPriceListRaw);
                }
            })
            
        })

    }

   
    function GetInternalWorkOrderDynamic() {
      
       // var criteria = `IWO.IsApproved=1`
       // var criteria = `((select TOP 1 IsApproved from exp_Approval where approvaltype like 'iwo%' and DocumentId=IWO.[InternalWorkOrderId] order by ApprovalId desc)=1)
       //         AND(IWO.[InternalWorkOrderId] NOT IN(SELECT DISTINCT[InternalWorkOrderId] FROM inv_Requisition))
       //         AND((SELECT COUNT(*) FROM inv_InternalWorkOrderDetail D WHERE D.InternalWorkOrderId = IWO.InternalWorkOrderId AND D.ItemId >=0 ) > 0)
       //         AND(IWO.[InternalWorkOrderId] NOT IN
       //         (SELECT[InternalWorkOrderId] FROM inv_InternalWorkOrderDetail IWOD
			    //INNER JOIN vw_pos_SalesOrderDetail SOD ON SOD.ItemId = IWOD.FinishedItemId
			    //INNER JOIN ad_ItemSubCategory ISC ON ISC.SubCategoryId = SOD.SubCategoryId
			    //WHERE ISC.CategoryId = 2
       //         )
       //         AND IWO.IsCancelled=0)`;

        //var criteria = `((select TOP 1 IsApproved from exp_Approval where approvaltype like 'iwo%' and DocumentId=IWO.[InternalWorkOrderId] order by ApprovalId desc)=1)
        //AND(IWO.[InternalWorkOrderId] NOT IN(SELECT DISTINCT[InternalWorkOrderId] FROM inv_Requisition where IsCancelled=0))
        //AND(SELECT COUNT(*) FROM inv_InternalWorkOrderDetail D WHERE D.InternalWorkOrderId = IWO.InternalWorkOrderId AND D.ItemId >=0 ) > 0
        //AND IWO.IsCancelled=0 AND IWO.SalesOrderId NOT IN ( Select SD.SalesOrderId from inv_StockDeliveryDetail SDD inner join inv_StockDelivery SD on SD.DeliveryId=SDD.DeliveryId inner join vw_pos_SalesOrderDetail SOD on SOD.SalesOrderDetailId=SDD.SalesOrderDetailId where SDD.DeliveryQuantity>=SOD.OrderQty and SOD.SubCategoryName like '%Ribbon%')`;

        $http({
            url: '/Requisition/GetAllIWOForRequestion',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            //if (data.length > 0) {
            //    $scope.iwolist = [];
            //    angular.forEach(data, function (aSd) {
            //        var res1 = aSd.InternalWorkOrderDate.substring(0, 5);
            //        if (res1 == "/Date") {
            //            var parsedDate1 = new Date(parseInt(aSd.InternalWorkOrderDate.substr(6)));
            //            var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
            //            aSd.InternalWorkOrderDate = date1;
            //        }
            //    })
            //}
            $scope.iwolist = data;
            $scope.iwolist.sort((a, b) => (
                (a.RequisitionNo !== null) - (b.RequisitionNo !== null)
                //|| a.state - b.state
                //|| b.category_id - a.category_id
            ));
            

        });
    }

   
    


   
        $scope.RedirectItemEntry = function () {
           // $location.path('/Home/Index/ItemEntry');
           $window.location.href = '/Home/Index#/ItemEntry';
        }
   


    $scope.ClearIwo = function () {
        //$scope.iwolist = [];
        $scope.inv_InternalOrderDetailList = [];
      //  $scope.ddlIwo = null;
        $scope.ddlIwoId.InternalWorkOrderId = null;
        $scope.iwoDisable = false;
        document.getElementById("requestionDDl").disabled = true;
       // document.getElementById("rawMatrialOveride").disabled = true;

        $('.iwoSelect2').select2('destroy');
        $('.iwoSelect2').val('').select2({
            placeholder: "Select Iwo"
        });

        $('#requestionDDl').select2('destroy');
        $('#requestionDDl').val('').select2({
            placeholder: "Select Raw Material"
        });

        $scope.ddlIwo = null;
        document.getElementById("reportBtnDisable").disabled = true;
    }

    
    $scope.OpenReport = function () {
      
        var iwoId = 0;
        if ($scope.ddlIwoId.InternalWorkOrderId == 0 || $scope.ddlIwoId.InternalWorkOrderId == undefined || $scope.ddlIwoId.InternalWorkOrderId == null) {
            iwoId=  $scope.ddlIwo.InternalWorkOrderId;
        } else {
            iwoId = $scope.ddlIwoId.InternalWorkOrderId;
        }
         $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");
         ///sessionStorage.setItem("IWOID", JSON.stringify(iwoId));
         $cookieStore.put("IWOID", iwoId);
       
        event.stopPropagation();

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

    function DetailClear() {
        $scope.inv_RequisitionDetail = new Object();
        $scope.BarCode = '';
        $scope.VarietyName = '';
        $scope.ddlRequisitionPurpose = null;
        $scope.ddlSalesMu = null;
        $scope.inv_RequisitionDetail.RequisitionQuantity = "";
        $scope.btnDeleteShow = false;
    }



    function GetAllRequisitionPurpose() {
        $http({
            url: '/RequisitionPurpose/GetAllRequisitionPurpose',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.RequisitionPurposeList = data;
        
            requisitionTypeChange();
            
        });
    }

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            $scope.ddlPreparedBy = { EmployeeId: $scope.LoginUser.EmployeeId };
            
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


            //angular.forEach(data, function (aItem) {
            //    if (aItem.ItemUnitId==2) {
            //        $scope.ItemUnitlist.push(aItem);
            //    }
               
            //})
            $scope.ItemUnitlist = data.filter(aData => aData.ItemUnitId == 2 || aData.ItemUnitId==1004)

            
       
        });
    }

    function GetAllProduct() {
        var SearchCriteria = '1=1';
        if ($scope.categoryId != 0 && $scope.categoryId != undefined) {
            SearchCriteria += ' AND C.CategoryId=' + $scope.categoryId;
        }
        if ($scope.subcategoryId != 0 && $scope.subcategoryId != undefined) {
            SearchCriteria += ' AND I.SubCategoryId=' + $scope.subcategoryId;
            $scope.subcategoryId = 0;
        }
        $http({
            url: '/Item/GetItemSearchResult?searchCriteria=' + SearchCriteria,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemSearchResultList = data;
        });
    }

    function GetUnit(id) {
        angular.forEach($scope.unitlist, function (unit) {
            if (unit.ItemUnitId == id) {
                $scope.unitname = unit.UnitName;
            }
        })
    }

    function requisitionTypeChange() {
        if ($scope.RequisitionType == 'IWO') {
            $scope.inv_Requisition.RequisitionDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
            $scope.ProductionRequisitionPurpose = Enumerable.From($scope.RequisitionPurposeList).Where("$.RequisitionPurposeName == 'For Production'").FirstOrDefault();
        }
        else {
            // $scope.inv_Requisition.RequisitionDate = "";
            $scope.ProductionRequisitionPurpose = {};
        }

        // $scope.inv_Requisition.RequisitionNo = ""
        $scope.inv_InternalOrderDetailList = [];
        $scope.ddlDepartment = null;
        $scope.ddlStore = null;
        $scope.SingleIssuelist = [];
        $scope._inv_StockIssueDetailAdAttribute = [];
    }

    //#endregion
   
    function getMaxReqNoByDate() {
        var dateParts =
            ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
        
        $http({
            url: '/Requisition/GetMaxSalesOrderNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxReqNo = data;
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
                $scope.inv_Requisition.RequisitionNo = 'REQ/' + $scope.finYearEPZ + '/' + $scope.MaxReqNo;
            });

           
        });


    }

  
    $scope.getMaxRequNoByDate = function () {
      
    }

   

    $scope.getWorkOrderDetails = function (iwo) {

        document.getElementById("reportBtnDisable").disabled = false;
        $scope.SingleIssuelist = [];
        if (iwo.RequisitionNo == '' || iwo.RequisitionNo == null || iwo.RequisitionNo == undefined) {
            GetWorkOrderDetails(iwo);
            
        } else {
            //alertify.confirm(`${iwo.RequisitionNo} + This Requisition has already been made by this IWO.`, function (e) {
            alertify.confirm("<b style='color:red;'>" + iwo.RequisitionNo + "</b>" + "<span> This Requisition has already been made by this IWO.</span>" , function (e) {
                if (e) {
                    GetWorkOrderDetails(iwo);
                } else {
                    $scope.ClearIwo();
                }
            })
        }
        
        
     
    }

    function GetWorkOrderDetails(iwo) {

        if (angular.isUndefined($scope.ddlDepartment) || $scope.ddlDepartment == null) {
            alertify.log("Select From Department First.", "error", "5000");
            GetInternalWorkOrderDynamic();
            return;
        }
        if (angular.isUndefined($scope.ddlStore) || $scope.ddlStore == null) {
            alertify.log("Select To Department First.", "error", "5000");
            GetInternalWorkOrderDynamic();
            return;
        }

        else {
            $http({
                url: '/InternalWorkOrder/GetInternalWorkOrderDetailByInternalWorkOrderIdForRequisition?internalWorkId=' + iwo.InternalWorkOrderId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.inv_InternalOrderDetailList = [];
                //$scope.inv_Requisition.RequisitionNo = "";
                //$scope.ddlDepartment = null;
                if (data.length > 0) {
                    //$scope.inv_Requisition.RequisitionNo = iwo.InternalWorkOrderNo.replace("IWO", "RQI");
                    $scope.inv_Requisition.InternalWorkOrderId = iwo.InternalWorkOrderId;
                    // data = Enumerable.From(data).Where("$.ItemId>0").ToArray();
                    //var deptName = Enumerable.From($scope.DepartmentList).Where("$.DepartmentId==" + iwo.DepartmentId).FirstOrDefault();
                    //$scope.ddlDepartment = { DepartmentId: iwo.DepartmentId, DepartmentName: deptName.DepartmentName };
                    //$scope.FromDepartmentId = iwo.DepartmentId;
                    //$scope.FromDepartmentName = deptName.DepartmentName;
                    angular.forEach(data, function (adata) {

                        // var ItemCombination = Enumerable.From($scope.AllCombinationlistWithPriceListRaw).Where('$.ItemId==' + adata.ItemAddAttId).FirstOrDefault();

                        var res1 = adata.DeliveryDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(adata.DeliveryDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                            adata.DeliveryDate = date1;
                        }
                        //if (adata.ItemId == 0) {
                        //    document.getElementById("rawMatrialOveride").disabled = false;
                        //} else {
                        //    document.getElementById("rawMatrialOveride").disabled = true;
                        //}
                        var finishedItem = Enumerable.From($scope.AllCombinationlistWithPriceList).Where('$.ItemId==' + adata.FinishedItemId).FirstOrDefault();

                        if (adata.ItemId != 0) {
                            $scope.rawItem = Enumerable.From($scope.AllCombinationlistWithPriceList).Where('$.ItemId==' + adata.ItemId).FirstOrDefault();
                        } else {
                            $scope.rawItem = {};
                            $scope.rawItem.Combination = "";
                            $scope.rawItem.UnitName = "";
                            $scope.rawItem.ItemId = 0;
                        }

                        var _internalOrderDetail = {
                            FinishedItemName: adata.FinishedItemName,
                            Barcode: finishedItem.Barcode,
                            //  RawItemName: $scope.rawItem.Combination,
                            RawItemName: adata.RawItemName,
                            ItemName: adata.RawItemName,
                            Core: adata.Core,
                            OrderQty: adata.OrderQty,
                            QtyPerRoll: adata.PcPerRoll,
                            RollDirection: adata.RollDirection,
                            DeliveryDate: adata.DeliveryDate,
                            DetailRemarks: adata.DetailRemarks,
                            ItemId: $scope.rawItem.ItemId,
                            FinishedUnitName: adata.UnitName,
                            RawUnitName: $scope.rawItem.UnitName,
                            InternalWorkOrderDetailId: adata.InternalWorkOrderDetailId,
                            FinishedItemId: adata.FinishedItemId,
                            SalesOrderDetailId: adata.SalesOrderDetailId,
                            MaterialTypeId: adata.MaterialTypeId,
                            MaterialTypeName: adata.MaterialTypeName,

                        }
                        $scope.inv_InternalOrderDetailList.push(_internalOrderDetail);
                    });

                   /// $scope.SingleIssuelist = [];
                    $scope._inv_StockIssueDetailAdAttribute = [];
                }
            });
        }
    }


    function IwoGetDynamic() {
       
        criteria = `IWO.IsApproved=1`;

        $http({
            url: '/InternalWorkOrder/InternalWorkOrderGetDynamic?searchCriteria=' + criteria + "&orderBy='InternalWorkOrderDate'",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.iwolistGetDynamicList = data;
        });
    }

   

    //$scope.checkddlstockramatrial = function (aIssue) {
    //    console.log(aIssue);
    //}
  
    $scope.RequisitionUpdate = function (req) {

        $scope.EditForRequisitionDetailId = 0;
        $scope.btnSave = "Update";

        $scope.iwoDisable = true;
      
        $scope.copy_IssueDetailList = [];
        $scope._inv_StockIssueDetailAdAttribute = [];
        $scope.TestList = [];
        document.getElementById("ClearDisable").disabled = true;
   
        $('.iwoSelect2').select2('destroy');
        $(".iwoSelect2").prop("disabled", true);
        $scope.ddlIwo = { InternalWorkOrderId: req.InternalWorkOrderId}
        $scope.inv_Requisition = req;
        $scope.ddlPreparedBy = { EmployeeId: req.PreparedById };
        $scope.ddlDepartment = { DepartmentId: req.FromDepartmentId };
        $scope.ddlStore = { DepartmentId: req.ToDepartmentId };
            angular.forEach($scope.iwolistGetDynamicList, function (iwo) {

                if (req.InternalWorkOrderId == iwo.InternalWorkOrderId) {

                  
                    $('.iwoSelect2').val(iwo.InternalWorkOrderId).select2();

                    $scope.iwolist.push(iwo);
                    $scope.TestList.push(iwo);
                   // GetWorkOrderDetails($scope.ddlIwo);

                    $http({
                        url: '/InternalWorkOrder/GetInternalWorkOrderDetailByInternalWorkOrderIdForRequisition?internalWorkId=' + req.InternalWorkOrderId,
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }).success(function (data) {
                        $scope.inv_InternalOrderDetailList = [];
                       
                        if (data.length > 0) {
                        
                            $scope.inv_Requisition.InternalWorkOrderId = iwo.InternalWorkOrderId;
                          
                            angular.forEach(data, function (adata) {

                                var res1 = adata.DeliveryDate.substring(0, 5);
                                if (res1 == "/Date") {
                                    var parsedDate1 = new Date(parseInt(adata.DeliveryDate.substr(6)));
                                    var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                                    adata.DeliveryDate = date1;
                                }
                              
                                var finishedItem = Enumerable.From($scope.AllCombinationlistWithPriceList).Where('$.ItemId==' + adata.FinishedItemId).FirstOrDefault();

                                if (adata.ItemId != 0) {
                                    $scope.rawItem = Enumerable.From($scope.AllCombinationlistWithPriceList).Where('$.ItemId==' + adata.ItemId).FirstOrDefault();
                                } else {
                                    $scope.rawItem = {};
                                    $scope.rawItem.Combination = "";
                                    $scope.rawItem.UnitName = "";
                                    $scope.rawItem.ItemId = 0;
                                }

                                var _internalOrderDetail = {
                                    FinishedItemName: adata.FinishedItemName,
                                    Barcode: finishedItem.Barcode,
                                
                                    RawItemName: adata.RawItemName,
                                    ItemName: adata.RawItemName,
                                    Core: adata.Core,
                                    OrderQty: adata.OrderQty,
                                    QtyPerRoll: adata.PcPerRoll,
                                    RollDirection: adata.RollDirection,
                                    DeliveryDate: adata.DeliveryDate,
                                    DetailRemarks: adata.DetailRemarks,
                                    ItemId: $scope.rawItem.ItemId,
                                    FinishedUnitName: adata.UnitName,
                                    RawUnitName: $scope.rawItem.UnitName,
                                    InternalWorkOrderDetailId: adata.InternalWorkOrderDetailId,
                                    FinishedItemId: adata.FinishedItemId,
                                    SalesOrderDetailId: adata.SalesOrderDetailId,
                                    MaterialTypeId: adata.MaterialTypeId,
                                    MaterialTypeName: adata.MaterialTypeName,
                                    RequisitionNo: adata.RequisitionNo,
                                    IsCheckFlag :true,
                                }
                                $scope.inv_InternalOrderDetailList.push(_internalOrderDetail);
                            });
                            $scope._inv_StockIssueDetailAdAttribute = [];
                        }
                    });




                }
            })

      
      

        var res1 = req.RequisitionDate.substring(0, 5);
        if (res1 == "/Date") {
            var parsedDate1 = new Date(parseInt(req.RequisitionDate.substr(6)));
            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
            req.RequisitionDate = date1;
            
        }
        var parms = JSON.stringify({ requisitionId: req.RequisitionId });
        $http.post('/Item/GetCombinationByRequisition', parms).success(function (IssueDetailList) {

            $scope.copy_IssueDetailList = JSON.parse(IssueDetailList);
            $scope.SingleIssuelist = [];
            $scope.rawItemList = [];
            $scope.rawItemList = Enumerable.From($scope.AllRawMaterialAndCombination)
                .Select(function (x) {
                    return {
                        'ItemName': x['ItemName'],
                        'Combination': x['Combination'],
                        'ItemId': x['ItemId']
                    };
                }).ToArray();
            angular.forEach($scope.copy_IssueDetailList, function (aIssue) {

                if (aIssue.IssueQuantity == null || aIssue.IssueQuantity == undefined) {
                    aIssue.IssueQuantity = 0;
                }
                if (aIssue.RollLenghtInMeter == null || aIssue.RollLenghtInMeter == undefined) {
                    aIssue.RollLenghtInMeter = 0;
                }
                else if (aIssue.RollAreaInSqMeter == 0 || aIssue.RollAreaInSqMeter == null) {
                    aIssue.RollAreaInSqMeter = 0;
                }
                else if (aIssue.PackageWeight == undefined || aIssue.PackageWeight == null) {
                    aIssue.PackageWeight = 0;
                }

                $scope.ddlRequisitionPurpose = { RequisitionPurposeId: aIssue.RequisitionPurposeId}
             
                aIssue.AttributeQty = aIssue.RequisitionQuantity;
              
                aIssue.RawItemList = $scope.rawItemList;
                //aIssue.IssueQuantity = (aIssue.RequisitionQuantity - aIssue.IssuedQuantity) > aIssue.CurrentQuantity ? aIssue.CurrentQuantity : (aIssue.RequisitionQuantity - aIssue.IssuedQuantity);
                aIssue.IssueQuantity = aIssue.RequisitionQuantity;
                aIssue.RequestionQty = aIssue.RequisitionQuantity;
                aIssue.FinishedItemName = aIssue.FinishItemName;
                aIssue.RawItemName = aIssue.RawItemName;
                aIssue.RequisitionQuantity = aIssue.RequisitionQuantity;
             
                aIssue.InternalWorkOrderDetailId = aIssue.InternalWorkOrderDetailId;
                aIssue.ddlItem = { ItemId: aIssue.ItemId };

                aIssue.ItemId = aIssue.ddlItem;
              
                aIssue.DropDowanDisable = true;
                aIssue.MaterialTypeId = aIssue.MaterialTypeId;
                aIssue.MaterialTypeName = aIssue.MaterialTypeName + ' ~ ' + aIssue.MaterialTypeCode;
                aIssue.FinishedItemNamePaperType = aIssue.FGMaterialType;
                aIssue.RawItemId = aIssue.ddlItem.ItemId;
                aIssue.IsEdit = false;
                angular.forEach($scope.ItemUnitlist, function (aUnit) {
                    if (aUnit.ItemUnitId == aIssue.UnitId) {
                        aIssue.ItemUnitId = aUnit.ItemUnitId;
                        aIssue.UnitName = aUnit.UnitName;
                    }
                  
                })
              //  aIssue.PaperTypeId = $scope.ddlmatrialPaperType.PaperTypeId;

                //angular.forEach($scope.inv_InternalOrderDetailList, function (ad) {
                //    if (ad.InternalWorkOrderDetailId == aIssue.InternalWorkOrderDetailId) {
                //        ad.IsCheckFlag = true;
                //    }
                //});
            

              //  aIssue.ValueOfAttribute = [aIssue.AttributeNames];


                //$scope._inv_StockIssueDetailAdAttribute.push(aIssue);
                $scope.SingleIssuelist.push(aIssue);
                
            });

           
        });

    }






    $scope.RequisitionTypeChange = function () {
        requisitionTypeChange();
    };

    $scope.GetVarietyDetail = function () {
        if (typeof $scope.VarietyName === 'object' && $scope.VarietyName != null && $scope.VarietyName != undefined) {
            $scope.inv_RequisitionDetail = $scope.VarietyName;
            $scope.BarCode = $scope.inv_RequisitionDetail.ItemCode;
            $scope.inv_RequisitionDetail.RequisitionUnitId = $scope.inv_RequisitionDetail.PurchaseUnitId;
            $scope.inv_RequisitionDetail.RequisitionUnitName = GetUnitNameById($scope.inv_RequisitionDetail.PurchaseUnitId);
            $scope.ddlSalesMu = { ItemUnitId: $scope.inv_RequisitionDetail.PurchaseUnitId };
            $('#tbxQuantity').focus();
        }
        else {
            angular.forEach($scope.VarietyList, function (item) {
                if ($scope.VarietyName == item.ItemName) {
                    $scope.inv_RequisitionDetail = item;
                    $scope.BarCode = $scope.inv_RequisitionDetail.ItemCode;
                    $scope.inv_RequisitionDetail.RequisitionUnitId = $scope.inv_RequisitionDetail.PurchaseUnitId;
                    $scope.inv_RequisitionDetail.RequisitionUnitName = GetUnitNameById($scope.inv_RequisitionDetail.PurchaseUnitId);
                    $scope.ddlSalesMu = { ItemUnitId: $scope.inv_RequisitionDetail.PurchaseUnitId };
                }
            });
        }
    }


    $scope.unitFilter = function (RawItem) {
        return function (pram) {
            return (pram.ItemUnitId == RawItem.UnitId) || (pram.ItemUnitId == RawItem.PackageId) || (pram.ItemUnitId == RawItem.ContainerId);
        };
    }

    $scope.BarcodeSearch = function (e) {
        $scope.inv_RequisitionDetail = {};
        angular.forEach($scope.VarietyList, function (item) {
            if ($scope.BarCode == item.ItemCode) {
                $scope.inv_RequisitionDetail = item;
                $scope.VarietyName = $scope.inv_RequisitionDetail.ItemName;
                $scope.inv_RequisitionDetail.RequisitionUnitId = $scope.inv_RequisitionDetail.PurchaseUnitId;
                $scope.inv_RequisitionDetail.RequisitionUnitName = GetUnitNameById($scope.inv_RequisitionDetail.PurchaseUnitId);
                $scope.ddlSalesMu = { ItemUnitId: $scope.inv_RequisitionDetail.PurchaseUnitId };
                $('#tbxQuantity').focus();
            }
        });
    }

    function GetUnitNameById(id) {
        var UnitName = '';
        angular.forEach($scope.ItemUnitlist, function (aUnit) {
            if (aUnit.ItemUnitId == id) { UnitName = aUnit.UnitName; }
        });
        return UnitName;
    }

  

    $scope.removeRequisitionEntry = function () {
        $scope.RequisitionDetailList.splice($scope.REIndex, 1);
        DetailClear();
    }

    $scope.SelRequisitionEntry = function (aReqEntry, index) {
        $scope.UnitId = aReqEntry.UnitId;
        $scope.PackageId = aReqEntry.PackageId;
        $scope.ContainerId = aReqEntry.ContainerId;
        $scope.inv_RequisitionDetail = aReqEntry;
        $scope.ddlRequisitionPurpose = { "RequisitionPurposeId": aReqEntry.RequisitionPurposeId };
        $scope.ddlRequisitionPurpose.RequisitionPurposeName = aReqEntry.RequisitionPurposeName;
        $scope.ddlSalesMu = { "ItemUnitId": aReqEntry.UnitId };
        $scope.inv_RequisitionDetail.RequisitionUnitId = aReqEntry.UnitId;
        $scope.inv_RequisitionDetail.RequisitionUnitName = aReqEntry.UnitName;
        $scope.BarCode = aReqEntry.ItemCode;
        $scope.VarietyName = { "ItemId": aReqEntry.ItemId, "ItemName": aReqEntry.ItemName, "ItemCode": aReqEntry.ItemCode };
        $scope.inv_RequisitionDetail.RequisitionQuantity = aReqEntry.RequisitionQuantity;
        $scope.btnAdd = "Change";
        $scope.btnDeleteShow = true;
        $scope.REIndex = index;
    }

    $scope.resetForm = function () {
       
       // document.getElementById("rawMatrialOveride").disabled = true;
        document.getElementById("iwoSelect22").disabled = true;
        
        $scope.RollPerKgSqmList = [];
        Clear();

        $scope.rawMatrialFilterWithItem = [];
        $scope.ItemCombination.CurrentQuantity = 0;

        //$('#ddlDepartmentSelect2').val(null).trigger('change');
        //$('#ddlRequisitionSelect2').val(null).trigger('change');

        

        $('#ddlPreparedBy').select2('destroy');
        $('#ddlPreparedBy').val('').select2({
            placeholder: "Prepared By"
        });
        document.getElementById("reportBtnDisable").disabled = true;

        $scope.requisitionEntryForm.$setPristine();
        $scope.requisitionEntryForm.$setUntouched();
        document.getElementById("btnAdd").disabled = true;
    };

    


    $scope.SaveRequsition = function () {

        $scope.itemRawMatrialId;
        var erroMsg = [];
        if ($scope.ddlDepartment == null) {
            $scope.ddlDepartment.DepartmentId = 0;
        } else if ($scope.ddlPreparedBy == null) {
            $scope.ddlPreparedBy.EmployeeId = 0;
        }
        else if ($scope.ddlStore == null) {
            $scope.ddlStore.DepartmentId = 0;
        }

        angular.forEach($scope.SingleIssuelist, function (aItem) {
            aItem.ItemId = aItem.ItemId;
            aItem.AttributeQty = aItem.RequestionQty;
        });

        angular.forEach($scope._inv_StockIssueDetailAdAttribute, function (aItem) {
            aItem.ItemAddAttId = aItem.ItemId;
            aItem.ItemId = aItem.ItemId;
            aItem.AttributeQty = aItem.RequestionQty;
            aItem.RequisitionUnitId = aItem.ItemUnitId;
          
        });

        if ($scope.ddlPreparedBy == null || $scope.ddlPreparedBy == undefined) {
            alertify.log('Employee Must be Entry !!!', 'error', '5000');
        }
        else if ($scope.ddlDepartment == null || $scope.ddlDepartment == undefined) {
            alertify.log('From Store Must be Entry !!!', 'error', '5000');
        } else if ($scope.ddlStore == null || $scope.ddlStore == null) {
            alertify.log('To Store Must be Entry !!!', 'error', '5000');
        } else {
            if ($scope.inv_Requisition.RequisitionId == 0) {

                var flag = true;
                angular.forEach($scope.SingleIssuelist, function (aData) {
                    if (aData.MaterialTypeId == 0 || aData.MaterialTypeId == undefined || aData.MaterialTypeId == null) {
                        flag = false;
                    }
                });
                $scope.inv_Requisition.CreatorId = $scope.LoginUser.UserId;
                $scope.inv_Requisition.UpdatorId = $scope.LoginUser.UserId;
                $scope.inv_Requisition.IsApproved = $scope.HasApproval ? false : true;
                $scope.inv_Requisition.PreparedById = $scope.ddlPreparedBy.EmployeeId;
                $scope.inv_Requisition.PreparedBy = $scope.LoginUser.FullName;

                var parms = JSON.stringify({ requisition: $scope.inv_Requisition, requisitionDetail: $scope.SingleIssuelist, _inv_RequisitionDetailAdAttribute: $scope._inv_StockIssueDetailAdAttribute });
                if (flag) {
                    alertify.confirm("Are you sure to save ?", function (e) {
                        if (e) {

                            /// $scope.inv_Requisition.RequisitionDate = f;
                            

                            //$scope.inv_Requisition.ToDepartmentName = $scope.ddlStore.DepartmentName;
                            //$scope.inv_Requisition.ToDepartmentId = $scope.ddlStore.DepartmentId;








                            if ($scope.inv_Requisition.RequisitionId == 0 && $scope.CreatePermission) {
                                $http.post('/Requisition/Save', parms).success(function (data) {
                                    AppNotificationLogPost($scope.inv_Requisition,'Requestion Create');
                                    EmailSend($scope.inv_Requisition);

                                    if (data != "") {
                                        document.getElementById("btnAddIntemInfo").disabled = true;
                                        $scope.RequisitionType = "General";
                                        Clear();
                                        //$('#ddlDepartmentSelect2').val(null).trigger('change');
                                        //$('#ddlRequisitionSelect2').val(null).trigger('change');
                                        $scope.requisitionEntryForm.$setPristine();
                                        $scope.requisitionEntryForm.$setUntouched();
                                        // alertify.log('Requisition saved successfully!', 'success', '5000');
                                        alertify.log('Requisition  No: ' + data + ' ' + status + ' Successfully!', 'success', '5000');
                                    }

                                    else {
                                        alertify.log('Server Errors!', 'error', '5000');
                                    }
                                });
                            } else {
                                alertify.log('You do not have permission to save!', 'error', '10000');
                            }



                        }
                    });

                }
                else {
                    alertify.log('Matrial Type Must be Entry!', 'error', '10000');
                }
            }
            else {

                UpdateReq();
            }
        }
       

       

    
    }


    function UpdateReq() {

        if ($scope.ddlPreparedBy == null || $scope.ddlPreparedBy == undefined) {
            alertify.log('Employee Must be Entry !!!', 'error', '5000');
        }
        else if ($scope.ddlDepartment == null || $scope.ddlDepartment == undefined) {
            alertify.log('From Store Must be Entry !!!', 'error', '5000');
        } else if ($scope.ddlStore == null || $scope.ddlStore == null) {
            alertify.log('To Store Must be Entry !!!', 'error', '5000');
        }
        else {
            if ($scope.inv_Requisition.RequisitionId != 0 && $scope.RevisePermission) {
                $scope.singleListItem = [];
                $scope.ItemAttrList = [];
                alertify.confirm("Are you sure to Update ?", function (e) {
                    if (e) {
                        $scope.inv_Requisition.CreatorId = $scope.LoginUser.UserId;
                        $scope.inv_Requisition.UpdatorId = $scope.LoginUser.UserId;
                        $scope.inv_Requisition.IsApproved = $scope.HasApproval ? false : true;
                        $scope.inv_Requisition.PreparedById = $scope.ddlPreparedBy.EmployeeId;
                        $scope.inv_Requisition.PreparedBy = $scope.LoginUser.FullName;;

                        angular.forEach($scope.SingleIssuelist, function (aData) {
                            aData.ItemId = aData.ddlItem.ItemId;
                            $scope.singleListItem.push(aData);
                        })
                     

                        var flag = true;
                        angular.forEach($scope.SingleIssuelist, function (aData) {
                            if (aData.MaterialTypeId == 0 || aData.MaterialTypeId == undefined || aData.MaterialTypeId == null) {
                                flag = false;
                            } 
                        });
                        if (flag) {
                            var parms = JSON.stringify({ requisition: $scope.inv_Requisition, requisitionDetail: $scope.singleListItem, _inv_RequisitionDetailAdAttribute: $scope.ItemAttrList });
                            $http.post('/Requisition/Save', parms).success(function (data) {
                                //   alert("Saved");
                                AppNotificationLogPost($scope.inv_Requisition, 'Requestion Update');
                                if (data != "") {
                                    //$scope.RequisitionType = "General";
                                    Clear();
                                    $scope.SingleIssuelist = [];
                                    $scope.requisitionEntryForm.$setPristine();
                                    $scope.requisitionEntryForm.$setUntouched();
                                    alertify.log('Requisition  No: ' + data + ' ' + status + ' Successfully!', 'success', '5000');
                                }

                                else {
                                    alertify.log('Server Errors!', 'error', '5000');
                                }
                            });
                        }
                       



                    }
                });
            }
            else if ($scope.inv_Requisition.RequisitionId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '10000');
            }
        }
       
       

    }


    function EmailSend(req) {


        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })

        //$scope.EmpName = "";
        //if ($scope.ddlPreparedBy != null) {
        //    $scope.EmpName = $scope.ddlPreparedBy.FullName;
        //}
        //if ($scope.inv_Requisition.PreparedById != null || $scope.inv_Requisition.PreparedById != undefined) {
        //    $scope.EmpName = $scope.inv_Requisition.PreparedBy;
        //}

        //else {
        //    $scope.EmpName = req.PreparedBy;
        //}

       

        $scope.EmailSendNotification.EmailSubject = "Requestion Saved";
        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        //  $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var currentDate = new Date();
        var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> A new Requestion has been Created. <br/> ' +
            'Requestion No : <strong > ' + req.RequisitionNo + '</strong><br/>' +
            'Requestion Date: <strong>' + ($filter('date')(req.RequisitionDate, 'dd/MM/yyyy')).toString() + '</strong><br/>' +
            //'Company Name: <strong>' + $scope.ddlInternalWorkOrder.CompanyName + '</strong><br/>' +
            'Prepared by: <strong>' + req.PreparedBy + '</strong>' + '<br/>' +
            'Create Date: ' + CreatedDate + '<br/><br />' +

            'Regards,<br/>' +
            'Software Team <br/>' +
            'Retail Technologies Ltd.</p>'

        var params = JSON.stringify({ emailSend: $scope.EmailSendNotification });

        $http({
            url: "/EmailSender/EmailSend",
            method: "POST",
            data: params,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {

            console.log(response.data);
        });
    }

    function SumAttQty() {
        angular.forEach($scope._inv_StockIssueDetailAdAttribute, function (aDetailAdAttribute) {
            if (aDetailAdAttribute.AttributeQty < 1 || aDetailAdAttribute.AttributeQty == undefined || aDetailAdAttribute.AttributeQty == null)
            {
               
              aDetailAdAttribute.AttributeQty = 0.1;
            
            }

        });

      




        angular.forEach($scope.SingleIssuelist, function (aStockReceiveDetail) {
            aStockReceiveDetail.RequisitionUnitId = aStockReceiveDetail.ItemUnitId;
            aStockReceiveDetail.RequisitionUnitName = aStockReceiveDetail.UnitName;
            aStockReceiveDetail.IssueQuantity = Enumerable.From($scope._inv_StockIssueDetailAdAttribute).Where("$.ItemId == '" + aStockReceiveDetail.ItemId + "'").Sum('$.AttributeQty');
        });
       // $scope.SingleIssuelist = Enumerable.From($scope.SingleIssuelist).Where("$.IssueQuantity != 0").ToArray();
    }



    $scope.itemInfoDropdown = function () {
        $scope.ItemInfoList = [];
        $("#itemSqmLmKgModal").modal('show');

        angular.forEach($scope.AllCombinationlist, function (aData) {
            //$scope.ItemCombination = {};
            //$scope.ItemUnitFilterList = [];
            //if ($scope.dropDownItemId != 0) {
              
               
            //}
           

           // if ($scope.RawItemId != 0) {

                if ($scope.ddlRequestionDdl.ItemId == aData.ItemId) {
                    var item = {};
                    item.RollLenghtInMeterVal = aData.RollLenghtInMeter;
                    item.RollAreaInSqMeterVal = aData.RollAreaInSqMeter;
                    item.PackageWeightVal = aData.PackageWeight;

                    $scope.ItemInfoList.push(item);
                }
          //  }
            //else {
            //    if ($scope.dropDownItemId == aData.ItemId) {

            //        var item = {};
            //        item.RollLenghtInMeterVal = aData.RollLenghtInMeter;
            //        item.RollAreaInSqMeterVal = aData.RollAreaInSqMeter;
            //        item.PackageWeightVal = aData.PackageWeight;

            //        $scope.ItemInfoList.push(item);
            //    }
            //}
            
        })
    }

    $scope.ItemAndAttrInfoRollSqmWkg = function (itemObj) {
        $scope.ItemInfoList = [];
        $("#itemSqmLmKgModal").modal('show');

        angular.forEach($scope.AllCombinationlist, function (aData) {
            //$scope.ItemCombination = {};
            //$scope.ItemUnitFilterList = [];
            if (itemObj.ddlItem.ItemId == aData.ItemId) {
             
                var item = {};
                item.RollLenghtInMeterVal = aData.RollLenghtInMeter;
                item.RollAreaInSqMeterVal = aData.RollAreaInSqMeter;
                item.PackageWeightVal = aData.PackageWeight;

                $scope.ItemInfoList.push(item);
            }
        })

      
       
    }


    $scope.checkdepartmentId = function (storeObj) {
        $scope.AllCombinationlistItem = [];
        $scope.iwoDisable = false;
        document.getElementById("iwoSelect22").disabled = false;

        $scope.StoreByDepartmentId = storeObj.DepartmentId;
        $scope.AllCombination = [];
        $http({
            url: '/Item/GetByDepartmentAndAllCombinationLikeWithCurrent?departmentId=' + $scope.StoreByDepartmentId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.AllCombination = JSON.parse(data);

            //$scope.AllCombinationlistItem = Enumerable.From($scope.AllCombination).Distinct(function (x) {
            //    return x.Combination;
            //}).Where(function (x) {
            //    return x.CategoryId ==4;
            //    }).ToArray();
            angular.forEach($scope.AllCombination, function (aData) {
                if (aData.CategoryId == 4) {
                    $scope.AllCombinationlistItem.push(aData);
                }
            });
        })

     

          

    }

    GetByCombinationLike();
    function GetByCombinationLike() {
        $scope.iwoDisable = false;
        //  var searchCriteria = "C.CategoryName='Raw Materials'";
        $http({
            // url: '/Item/GetItemForIwoDynamic?searchCriteria=' + searchCriteria,
            url: '/Item/GetByCombinationLike',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllRawMaterialAndCombination = [];
            $scope.AllRawCombination = JSON.parse(data);
            $scope.AllRawMaterialAndCombination = Enumerable.From($scope.AllRawCombination).Where(function (x) {
                return x.CategoryId == 4;
            }).ToArray();
         
        })
    }

    function GetByCombinationandDepertment() {

    }

    $scope.RemoveItemAttr = function (aAttribute) {
       // $scope.inv_Requisition = {};
      //  $scope.btnSave = "Save";
        //Clear();
        var ind = $scope.SingleIssuelist.indexOf(aAttribute);
        $scope.SingleIssuelist.splice(ind, 1);
      //  SumAttQty();

        angular.forEach($scope.inv_InternalOrderDetailList, function (ad) {

            if (ad.InternalWorkOrderDetailId == aAttribute.InternalWorkOrderDetailId) {
                ad.IsCheckFlag = false;
            }
        });
    }


    $scope.RollSqmAndKgCalculationWithAdd = function () {

        RollPerSqmWeightCal();

    }


    function RollPerSqmWeightCal() {

        var isCurrent = false;

        if ($scope.ItemCombination.AttributeQty == null || $scope.ItemCombination.AttributeQty == undefined || $scope.ItemCombination.AttributeQty == 0) {
            $scope.ItemCombination.AttributeQty = 0;
            //$scope.ItemCombination.RollLenghtInMeter = 1;
            //$scope.ItemCombination.RollAreaInSqMeter = 1;
            //$scope.ItemCombination.PackageWeight = 1;
        }
        //if ($scope.ItemCombination.AttributeQty==0) {
        //    $scope.ItemCombination.AttributeQty = 1;
        //    $scope.ItemCombination.RollLenghtInMeter = 1;
        //    $scope.ItemCombination.RollAreaInSqMeter = 0;
        //    $scope.ItemCombination.PackageWeight = 0;
        //}
        if ($scope.ItemCombination.RollLenghtInMeter == null || $scope.ItemCombination.RollLenghtInMeter == undefined || $scope.ItemCombination.RollLenghtInMeter == 0) {
            $scope.ItemCombination.RollLenghtInMeter = 0;
        }

        if ($scope.ItemCombination.RollAreaInSqMeter == null || $scope.ItemCombination.RollAreaInSqMeter == undefined || $scope.ItemCombination.RollAreaInSqMeter == 0) {
            $scope.ItemCombination.RollAreaInSqMeter = 0;
        }

        if ($scope.ItemCombination.PackageWeight == null || $scope.ItemCombination.PackageWeight == undefined || $scope.ItemCombination.PackageWeight == 0) {
            $scope.ItemCombination.PackageWeight = 0;
        }

        
      
        
        //angular.forEach($scope.RollPerKgSqmList, function (aData) {

        //    if ($scope.ItemCombination.CurrentQuantity >= $scope.ItemCombination.AttributeQty) {
        //        $scope.ItemCombination.RollLenghtInMeter = aData.RollLenghtInMeter * $scope.ItemCombination.AttributeQty;
        //        $scope.ItemCombination.RollAreaInSqMeter = aData.RollAreaInSqMeter * $scope.ItemCombination.AttributeQty;
        //        $scope.ItemCombination.PackageWeight = aData.PackageWeight * $scope.ItemCombination.AttributeQty;
        //        //return;
        //        isCurrent = false;

        //    } else {
        //        $scope.ItemCombination.RollLenghtInMeter = 0;
        //        $scope.ItemCombination.RollAreaInSqMeter = 0;
        //        $scope.ItemCombination.PackageWeight = 0;
        //        $scope.ItemCombination.AttributeQty = $scope.ItemCombination.CurrentQuantity;
        //        isCurrent = true;
        //      //  alertify.log('Current Qty Greater than Req. Qty !', 'error', '5000');

        //    }

           

        //});

        //if (isCurrent) {
        //    alertify.log('Current Qty Greater than Req. Qty !', 'error', '5000');
        //}



        //$scope.ItemCombination.RollLenghtInMeter = $scope.ItemCombination.AttributeQty * $scope.ItemCombination.RollLenghtInMeter;
        //$scope.ItemCombination.RollAreaInSqMeter = $scope.ItemCombination.AttributeQty * $scope.ItemCombination.RollAreaInSqMeter;
        //$scope.ItemCombination.PackageWeight = $scope.ItemCombination.AttributeQty * $scope.ItemCombination.PackageWeight;
      
       
        //$scope.ItemCombination.RollLenghtInMeter = $scope.ItemCombination.RollLenghtInMeter * $scope.ItemCombination.AttributeQty;
        //$scope.ItemCombination.RollAreaInSqMeter = $scope.ItemCombination.RollAreaInSqMeter * $scope.ItemCombination.AttributeQty;
        //$scope.ItemCombination.PackageWeight = $scope.ItemCombination.PackageWeight * $scope.ItemCombination.AttributeQty;


      // }



    }

    $scope.RollQtyAreaInSqMeterCal = function () {
        RollPerSqmWeightCal();
    }

    $scope.PackageWeightQtyCal = function () {
        RollPerSqmWeightCal();
    }

    $scope.ChangeRollSqmAndKgCalculationWithAdd = function (itemUnitId) {

        //if (itemUnitId.ItemUnitId == 2) {
            
        //} else {
        //    $scope.ItemCombination.RollLenghtInMeter = 0;
        //    $scope.ItemCombination.RollAreaInSqMeter = 0;
        //    $scope.ItemCombination.PackageWeight = 0;
        //}

        if (itemUnitId !=null) {

            if (itemUnitId.ItemUnitId == 2) {
                $scope.ItemCombination.RollLenghtInMeter = itemUnitId.RollLenghtInMeter * $scope.ItemCombination.AttributeQty;
                $scope.ItemCombination.RollAreaInSqMeter = itemUnitId.RollAreaInSqMeter * $scope.ItemCombination.AttributeQty;
                $scope.ItemCombination.PackageWeight = itemUnitId.PackageWeight * $scope.ItemCombination.AttributeQty;

            } else if (itemUnitId.ItemUnitId == 1) {
                $scope.ItemCombination.RollLenghtInMeter = itemUnitId.RollLenghtInMeter / $scope.ItemCombination.AttributeQty;
                $scope.ItemCombination.RollAreaInSqMeter = itemUnitId.RollAreaInSqMeter / $scope.ItemCombination.AttributeQty;
                $scope.ItemCombination.PackageWeight = itemUnitId.PackageWeight / $scope.ItemCombination.AttributeQty;
            } else {

                $scope.ItemCombination.RollLenghtInMeter = 0;
                $scope.ItemCombination.RollAreaInSqMeter = 0;
                $scope.ItemCombination.PackageWeight = 0;
            }
        }
        

    }


    $scope.ItemCombinationObj = {};

    //GetAllStock()
    //function GetAllStock() {

    //    $http({
    //        url: '/StockValuation/GetAll_CurrentStock',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (data) {

    //        $scope.stockValuationList = data;
    //    });
    //}




    $scope.checkddlstockramatrial = function (item) {


        $scope.ddlRawItemId = item.ddlItem.ItemId;

     

        $http({
            url: '/Item/GetByDepartmentAndAllCombinationLikeWithCurrent?departmentId=' + $scope.ddlStore.DepartmentId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.AllCombination = JSON.parse(data);

            $scope.AllCombinationlistItem = Enumerable.From($scope.AllCombination).Distinct(function (x) {
                return x.Combination;
            }).Where(function (x) {
                return x.CategoryName == "Raw Materials";
            }).ToArray();

            angular.forEach($scope.AllCombinationlistItem,function (aData) {

                if (aData.CurrentQuantity != 0 || aData.CurrentQuantity != null) {
                    if (aData.ItemId == $scope.ddlRawItemId) {
                        angular.forEach($scope.SingleIssuelist, function (aItem) {

                            if (aItem.ddlItem.ItemId == $scope.ddlRawItemId) {
                                aItem.CurrentQuantity = aData.CurrentQuantity;
                            }
                            
                            //else {
                            //    aItem.CurrentQuantity = 0;
                            //}
                        })
                    }
                } 
                
            })

        })

    }
    //$scope.AddRequisitionDetail = function () {
    //   // $scope.RollPerKgSqmList = [];
       

    //   // if ($scope.ItemCombination.CurrentQuantity >= $scope.ItemCombination.AttributeQty) {
    //        var flag = true;
    //        angular.forEach($scope._inv_StockIssueDetailAdAttribute, function (aDetailAdAttribute) {
    //            //if (aDetailAdAttribute.CurrentQuantity == $scope.ItemCombination.CurrentQuantity) {
    //            //    flag = false;
    //            //}
    //        });


    //        if (flag) {
    //            //var ValueOfAttribute = [];
    //            //var a = $scope.ItemCombination.AttributeNames.split(',');
    //            //for (var i = 0; i < a.length; i++) {
    //            //    var val = a[i].split(':');
    //            //    ValueOfAttribute.push(val[1].trim());
    //            //}

    //            $scope.ItemCombination.ValueOfAttribute = [$scope.ItemCombination.AttributeNames];
    //            //var Attribute = {};
    //            $scope.ItemCombination.ItemUnitId = $scope.ddlMU.ItemUnitId;

    //            //Attribute.ItemUnitId=$scope.ddlMU.ItemUnitId;
    //            var Attribute = $scope.ItemCombination;
              

    //            Attribute.RequestionQty = Attribute.AttributeQty;
    //            Attribute.InternalWorkOrderDetailId = Attribute.InternalWorkOrderDetailId;
    //            angular.forEach($scope.AllCombinationlist, function (aItem) {
    //                if (Attribute.ItemId !=0) {
    //                    if ($scope.dropDownItemId == aItem.ItemId) {
    //                        Attribute.RollLenghtInMeter = aItem.RollLenghtInMeter * Attribute.AttributeQty;
    //                        Attribute.RollAreaInSqMeter = aItem.RollAreaInSqMeter * Attribute.AttributeQty;
    //                        Attribute.PackageWeight = aItem.PackageWeight * Attribute.AttributeQty;
                           
    //                    }
    //                }
                    
    //                if ($scope.dropDownItemId !=0) {
    //                    if (Attribute.ItemId == aItem.ItemId) {
    //                        Attribute.RollLenghtInMeter = aItem.RollLenghtInMeter * Attribute.AttributeQty;
    //                        Attribute.RollAreaInSqMeter = aItem.RollAreaInSqMeter * Attribute.AttributeQty;
    //                        Attribute.PackageWeight = aItem.PackageWeight * Attribute.AttributeQty;
    //                       // Attribute.InternalWorkOrderDetailId = Attribute.InternalWorkOrderDetailId;
    //                    }
    //                }
                    
    //            });

    //            $scope.rawItemList = [];
    //            $scope.rawItemList = Enumerable.From($scope.AllRawMaterialAndCombination)
    //                .Select(function (x) {
    //                    return {
    //                        'ItemName': x['ItemName'],
    //                        'Combination': x['Combination'],
    //                        'ItemId': x['ItemId']
    //                    };
    //                }).ToArray();

               
    //            if ($scope.ddlRequestionDdl.ItemId == null || $scope.ddlRequestionDdl.ItemId == 0) {
    //                $scope.ddlRequestionDdl = Enumerable.From($scope.rawMatrialFilterWithItem).Where("$.ItemId ==" + Item.ItemId)
    //                    .FirstOrDefault();
    //                Attribute.ItemId = $scope.ddlRequestionDdl.ItemId;
    //            } else {
    //                Attribute.ItemId = $scope.ddlRequestionDdl.ItemId;
    //            }
             
              
    //            Attribute.FinishedItemName = $scope.FinishedItemName;

    //            $scope._inv_StockIssueDetailAdAttribute.push(Attribute);

    //            flag = true;
    //            angular.forEach($scope.SingleIssuelist, function (aItem) {
    //                if (aItem.ItemId == $scope.ItemCombination.ItemId) {
    //                    flag = false;
    //                }
    //            });
    //            if (flag) {
    //                var Item = {};
    //                angular.forEach($scope.VarietyList, function (aItem) {
    //                    if (aItem.ItemId == $scope.ItemCombination.ItemId) {
    //                        Item = aItem;
    //                    }
    //                })
    //                Item.HeaderOfAttribute = [];

    //                //var HeaderOfAttribute = [];
    //                //var a = $scope.ItemCombination.AttributeNames.split(',');
    //                //for (var i = 0; i < a.length; i++) {
    //                //    var val = a[i].split(':');
    //                //    HeaderOfAttribute.push(val[0].trim());
    //                //}

    //                Item.HeaderOfAttribute = ["Description"];
    //                Item.IssueQuantity = Attribute.AttributeQty;

    //                Item.UnitName = Attribute.UnitName;
    //                Item.UnitName = $scope.ddlMU.UnitName;
    //                Item.ItemUnitId = $scope.ddlMU.ItemUnitId;
    //                Item.Barcode =Attribute.Barcode;
    //                Item.CurrentQuantity = Attribute.CurrentQuantity;
    //                Item.Combination = Attribute.RawItemName;
    //                Item.RollLenghtInMeter = Attribute.RollLenghtInMeter;
    //                Item.RollAreaInSqMeter = Attribute.RollAreaInSqMeter;
    //                Item.PackageWeight = Attribute.PackageWeight;
    //                Item.RequestionQty = Attribute.RequestionQty;
    //                Item.InternalWorkOrderDetailId = Attribute.InternalWorkOrderDetailId;
    //                Item.disabled = true;

    //                //for (var i = 0; i < $scope.SingleIssuelist.length; i++) {
    //                //    //  $scope.PurchaseType[i].IsChecked = false;
    //                //    $scope.SingleIssuelist[i].disabled = true;
    //                //}
                   

    //                Item.ReqQty = $scope.ItemCombination.AttributeQty;
    //                Item.RawItemList = $scope.rawItemList;
    //                Item.FinishedItemName = Attribute.FinishedItemName;

    //                //Item.Combination = $scope.ItemCombinationObj.Combination;
    //                //Item.ItemId = $scope.ItemCombinationObj.ItemId;

    //                if ($scope.ddlRequestionDdl.ItemId == null || $scope.ddlRequestionDdl.ItemId == undefined) {
    //                    $scope.ddlRequestionDdl = Enumerable.From($scope.rawMatrialFilterWithItem).Where("$.ItemId ==" + Item.ItemId)
    //                        .FirstOrDefault();

    //                    Item.ItemId = $scope.ddlRequestionDdl.ItemId;

    //                }
    //                else {
    //                    angular.forEach($scope.rawMatrialFilterWithItem, function (adata) {
    //                        if (adata.ItemId == $scope.ddlRequestionDdl.ItemId) {
    //                            Item.ddlItem = { ItemId: $scope.ddlRequestionDdl.ItemId, Combination: adata.Combination };
    //                            Item.ItemId = Item.ddlItem.ItemId;
    //                        }
    //                    })

    //                }
                    
    //                $scope.SingleIssuelist.push(Item);
                   
    //            }
    //          //  $scope.ItemCombinationWithConcat = {};
    //            $scope.ItemCombination = {};
    //            $scope.ItemSearchCombination = null;
    //            $scope.ddlRequestionDdl = { ItemId: null }
    //            $scope.rawMatrialFilterWithItem = [];
    //            $scope.ddlMU = null;
    //            SumAttQty();
    //            $scope.ItemCombination.CurrentQuantity =0;
    //            $('#SearchTextBox').focus();

               
    //        }
    //        else {
    //            alertify.log('This Combination already Exist, Try another one !!!', 'error', '5000');
    //        }
    //       document.getElementById("btnAddIntemInfo").disabled = true;
    //    //}
    //    //else {
    //    //    alertify.log('Current Quantity is less then Request Quantity !!!', 'error', '5000');
    //    //}



       
    //}

    $scope.EditItemForGrid = function (aReq) {

        $scope.buttonAddIssue = "Item Row Update";
        $scope.EditForItemId = aReq.ItemId.ItemId;
        $scope.EditForRequisitionDetailId = aReq.InternalWorkOrderDetailId;
        document.getElementById("requestionDDl").disabled = false;
       // $('#SearchTextBox').focus();
        $('#PaperType').select2('destroy');

        $("#PaperType").val(aReq.MaterialTypeId).select2({
            placeholder: "--Material Paper Type--",
        });
        $scope.ddlmatrialPaperType = { MaterialTypeId: aReq.MaterialTypeId };

       
       
        $scope.ddlMU = { ItemUnitId: aReq.ItemUnitId}
        $scope.ItemCombination.AttributeQty = aReq.RequisitionQuantity;

        $scope.rawMatrialFilterWithItem = [];

        CommonCurrentStock($scope.ddlStore.DepartmentId, aReq.RawItemId, $scope.ddlmatrialPaperType.MaterialTypeId);

        angular.forEach($scope.AllCombinationlist, function (aData) {
            if (aData.CategoryName == "Raw Materials" && aData.IsActive == true) {

               // $scope.rawMatrialFilterWithItem.push(aData);
                if (aReq.ddlItem.ItemId == aData.ItemId) {
                    $("#requestionDDl").select2('destroy');
                    $("#requestionDDl").val(aData.ItemId).select2({
                        placeholder: "--Raw Item Name--",
                    });
                    $scope.ddlRequestionDdl = { ItemId: aReq.ddlItem.ItemId }
                  
                }
                $scope.rawMatrialFilterWithItem.push(aData);
            }
            

           

        });


    }

    $scope.ProductionRequisitionPurpose = {};
    $scope.AddRequisitionDetail = function () {
        var flag = true;
         if ($scope.SingleIssuelist.length > 0) {
             angular.forEach($scope.SingleIssuelist, function (aData) {
                 if ($scope.InternalWorkOrderDetailId == aData.InternalWorkOrderDetailId) {
                     flag = false;
                    
                    
                 }
             })
         }
        



         if ($scope.EditForRequisitionDetailId != 0 ) {
             angular.forEach($scope.SingleIssuelist, function (aIssue) {

                 if ($scope.EditForRequisitionDetailId == aIssue.InternalWorkOrderDetailId) {
                     aIssue.ItemId = $scope.ddlRequestionDdl.ItemId;
                     aIssue.ItemUnitId = $scope.ddlMU.ItemUnitId;
                     aIssue.RequisitionQuantity = $scope.ItemCombination.AttributeQty;
                     aIssue.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
                     aIssue.ddlItem = { ItemId: $scope.ddlRequestionDdl.ItemId };
                     aIssue.CurrentQuantity = $scope.ItemCombination.CurrentQuantity;
                     aIssue.UnitName = $scope.ItemCombination.UnitName;
                     aIssue.RawItemId = aIssue.RawItemId;
                    
                   

                     angular.forEach($scope.matrialPaperTypeList, function (aData) {
                         if ($scope.ddlmatrialPaperType.MaterialTypeId == aData.MaterialTypeId) {
                           
                             aIssue.MaterialTypeId = aData.MaterialTypeId;
                             aIssue.MaterialTypeName = aData.Combination;
                         }
                         
                     });
                 

                  
                     
                     $scope.ItemCombination.AttributeQty = null;
                      $scope.ItemCombination.CurrentQuantity=0;
                     $scope.ItemCombination.UnitName="";
                     $scope.ItemCombination.DepartmentName="";
                 }
                 
             });
             $('#PaperType').select2('destroy');

             $("#PaperType").val('').select2({
                 placeholder: "--Material Paper Type--",
             });
             $("#requestionDDl").select2('destroy');
             $("#requestionDDl").val('').select2({
                 placeholder: "--Raw Item Name--",
             });


             $scope.buttonAddIssue = "Add Item";

             $scope.ddlMU = null;
             $scope.ddlmatrialPaperType = null;
         }
         else {

             if (flag) {


                 if ($scope.ddlRequestionDdl == null || $scope.ddlRequestionDdl == undefined) {
                     alertify.log('Item Must be Entry !!!', 'error', '5000');
                 }
                 else if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
                     alertify.log('Material Type Must be Entry !!!', 'error', '5000');
                 }
                 else if ($scope.ddlMU == undefined || $scope.ddlMU == null) {
                     alertify.log('Unit Name Must be Entry !!!', 'error', '5000');
                 } else if ($scope.ItemCombination.AttributeQty == null || $scope.ItemCombination.AttributeQty == undefined || $scope.ItemCombination.AttributeQty == 0) {
                     alertify.log('Requisition Must be Entry !!!', 'error', '5000');
                 }
                 else {



                     $scope.ItemCombination.ValueOfAttribute = [$scope.ItemCombination.AttributeNames];
                     $scope.ItemCombination.ItemUnitId = $scope.ddlMU.ItemUnitId;
                     var Attribute = $scope.ItemCombination;

                     //  Attribute.RequisitionPurposeId = $scope.ddlRequisitionPurpose.RequisitionPurposeId;

                     Attribute.RequisitionQuantity = Attribute.AttributeQty;
                     angular.forEach($scope.ItemUnitlist, function (aUnit) {
                         if (aUnit.ItemUnitId == $scope.ddlMU.ItemUnitId) {
                             Attribute.UnitName = aUnit.UnitName;
                         }
                     })
                     //Attribute.RequestionQty =$scope.ItemCombination.AttributeQty;
                     Attribute.InternalWorkOrderDetailId = Attribute.InternalWorkOrderDetailId;
                     angular.forEach($scope.AllCombinationlist, function (aItem) {
                         if (Attribute.ItemId != 0) {
                             if ($scope.dropDownItemId == aItem.ItemId) {
                                 Attribute.RollLenghtInMeter = Number((aItem.RollLenghtInMeter * Attribute.AttributeQty).toFixed(3));
                                 Attribute.RollAreaInSqMeter = Number((aItem.RollAreaInSqMeter * Attribute.AttributeQty).toFixed(3));
                                 Attribute.PackageWeight = Number((aItem.PackageWeight * Attribute.AttributeQty).toFixed(3));

                             }
                         }

                         if ($scope.dropDownItemId != 0) {
                             if (Attribute.ItemId == aItem.ItemId) {
                                 Attribute.RollLenghtInMeter = Number((aItem.RollLenghtInMeter * Attribute.AttributeQty).toFixed(3));
                                 Attribute.RollAreaInSqMeter = Number((aItem.RollAreaInSqMeter * Attribute.AttributeQty).toFixed(3));
                                 Attribute.PackageWeight = Number((aItem.PackageWeight * Attribute.AttributeQty).toFixed(3));
                                 // Attribute.InternalWorkOrderDetailId = Attribute.InternalWorkOrderDetailId;
                             }
                         }

                     });

                     $scope.rawItemList = [];
                     $scope.rawItemList = Enumerable.From($scope.AllRawMaterialAndCombination)
                         .Select(function (x) {
                             return {
                                 'ItemName': x['ItemName'],
                                 'Combination': x['Combination'],
                                 'ItemId': x['ItemId']
                             };
                         }).ToArray();


                     if ($scope.ddlRequestionDdl.ItemId == null || $scope.ddlRequestionDdl.ItemId == 0) {
                         $scope.ddlRequestionDdl = Enumerable.From($scope.rawMatrialFilterWithItem).Where("$.ItemId ==" + Item.ItemId)
                             .FirstOrDefault();
                         Attribute.ItemId = $scope.ddlRequestionDdl.ItemId;
                     } else {
                         Attribute.ItemId = $scope.ddlRequestionDdl.ItemId;
                     }


                     Attribute.FinishedItemName = $scope.FinishedItemName;
                     Attribute.FinishedItemId = $scope.FinishedItemId;
                     Attribute.ItemName = $scope.ItemCombination.ItemName;

                     //if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
                     //    Attribute.MaterialTypeId = $scope.MaterialTypeId;
                     //    Attribute.MaterialTypeName = $scope.MaterialTypeName;

                     //}

                     //if ($scope.MaterialTypeId != 0) {
                     //    Attribute.MaterialTypeId = $scope.MaterialTypeId;
                     //    Attribute.MaterialTypeName = $scope.MaterialTypeName;

                     //}

                     //  else if ($scope.MaterialTypeId == 0 || $scope.MaterialTypeId == undefined) {
                     Attribute.FinishedItemNamePaperType = $scope.MaterialTypeName;
                     if ($scope.MaterialTypeId != 0) {

                         angular.forEach($scope.matrialPaperTypeList, function (aData) {
                             if ($scope.MaterialTypeId == aData.MaterialTypeId) {
                                 Attribute.MaterialTypeId = aData.MaterialTypeId;
                                 Attribute.MaterialTypeName = aData.Combination;
                             }
                             else if (aData.MaterialTypeId == $scope.ddlmatrialPaperType.MaterialTypeId) {
                                 Attribute.MaterialTypeId = aData.MaterialTypeId;
                                 Attribute.MaterialTypeName = aData.Combination;
                             }
                         });
                     }
                     else if ($scope.MaterialTypeId == 0 || $scope.MaterialTypeId == undefined) {

                         Attribute.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
                         Attribute.MaterialTypeName = $scope.ddlmatrialPaperType.Combination;

                     }
                     else if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
                         Attribute.MaterialTypeId = $scope.MaterialTypeId;
                         Attribute.MaterialTypeName = $scope.MaterialTypeName;

                     }



                     //Attribute.PaperTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;

                     /// } else if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
                     // Attribute.MaterialTypeId = $scope.MaterialTypeId;

                     //Attribute.MaterialTypeName = $scope.MaterialTypeName;
                     //}

                     //else {
                     //    Attribute.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
                     //    Attribute.MaterialTypeName = $scope.ddlmatrialPaperType.Combination;
                     //}

                     // Attribute.RequisitionPurposeId = $scope.ddlRequisitionPurpose.RequisitionPurposeId;
                     //Attribute.RequisitionPurposeName = $scope.ddlRequisitionPurpose.RequisitionPurposeName;

                     $scope._inv_StockIssueDetailAdAttribute.push(Attribute);




                     var flag = true;
                     angular.forEach($scope.SingleIssuelist, function (aFitemId) {
                         if ($scope.SalesOrderDetailId == aFitemId.SalesOrderDetailId) {
                             flag = false;
                         }
                     })

                     /* if (flag) {*/
                     var Item = {};

                     Item.IssueQuantity = Attribute.AttributeQty;


                     Item.UnitName = Attribute.UnitName;
                     // Item.UnitName = $scope.ddlMU.UnitName;
                     Item.ItemUnitId = $scope.ddlMU.ItemUnitId;
                     Item.Barcode = Attribute.Barcode;
                     Item.CurrentQuantity = Attribute.CurrentQuantity;
                     Item.Combination = Attribute.RawItemName;
                     Item.RollLenghtInMeter = Attribute.RollLenghtInMeter;
                     Item.RollAreaInSqMeter = Attribute.RollAreaInSqMeter;
                     Item.PackageWeight = Attribute.PackageWeight;
                     Item.RequisitionQuantity = Attribute.RequisitionQuantity;
                     Item.InternalWorkOrderDetailId = Attribute.InternalWorkOrderDetailId;
                     Item.SalesOrderDetailId = $scope.SalesOrderDetailId;
                     // Item.RequisitionPurposeId = Attribute.RequisitionPurposeId;
                     //Item.RequisitionPurposeName = Attribute.RequisitionPurposeName;
                     Item.disabled = true;
                     Item.IsEdit = true;
                     Item.ReqQty = $scope.ItemCombination.AttributeQty;
                     Item.RawItemList = $scope.rawItemList;
                     Item.FinishedItemName = Attribute.FinishedItemName;
                     Item.FinishedItemId = Attribute.FinishedItemId;
                     Item.ItemName = Attribute.ItemName;
                     Item.RawItemId = Attribute.ItemId;

                     angular.forEach($scope.inv_InternalOrderDetailList, function (ad) {

                         if (ad.InternalWorkOrderDetailId == Attribute.InternalWorkOrderDetailId) {
                             ad.IsCheckFlag = true;
                         }
                     });


                     //if ($scope.MaterialTypeId != 0) {

                     //    Item.MaterialTypeId = $scope.MaterialTypeId;
                     //    Item.MaterialTypeName = $scope.MaterialTypeName;

                     //}

                     //else if ($scope.MaterialTypeId == 0 || $scope.MaterialTypeId == undefined) {

                     //    Item.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
                     //    Item.MaterialTypeName = $scope.ddlmatrialPaperType.Combination;

                     //} else if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
                     //    Item.MaterialTypeId = $scope.MaterialTypeId;
                     //    Item.MaterialTypeName = $scope.MaterialTypeName;

                     //} 
                     Item.FinishedItemNamePaperType = $scope.MaterialTypeName;
                     if ($scope.MaterialTypeId != 0) {

                         angular.forEach($scope.matrialPaperTypeList, function (aData) {
                             if ($scope.MaterialTypeId == aData.MaterialTypeId) {
                                 Item.MaterialTypeId = aData.MaterialTypeId;
                                 Item.MaterialTypeName = aData.Combination;
                             }
                             else if (aData.MaterialTypeId == $scope.ddlmatrialPaperType.MaterialTypeId) {
                                 Item.MaterialTypeId = aData.MaterialTypeId;
                                 Item.MaterialTypeName = aData.Combination;
                             }
                         });
                     }
                     else if ($scope.MaterialTypeId == 0 || $scope.MaterialTypeId == undefined) {

                         Item.MaterialTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
                         Item.MaterialTypeName = $scope.ddlmatrialPaperType.Combination;

                     }
                     else if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
                         Item.MaterialTypeId = $scope.MaterialTypeId;
                         Item.MaterialTypeName = $scope.MaterialTypeName;

                     }




                     if ($scope.ddlRequestionDdl.ItemId == null || $scope.ddlRequestionDdl.ItemId == undefined) {
                         $scope.ddlRequestionDdl = Enumerable.From($scope.rawMatrialFilterWithItem).Where("$.ItemId ==" + Item.ItemId)
                             .FirstOrDefault();

                         Item.ItemId = $scope.ddlRequestionDdl.ItemId;

                     }
                     else {
                         angular.forEach($scope.rawMatrialFilterWithItem, function (adata) {
                             if (adata.ItemId == $scope.ddlRequestionDdl.ItemId) {
                                 // Item.ddlItem = { ItemId: $scope.ddlRequestionDdl.ItemId, Combination: adata.Combination };
                                 Item.ddlItem = { ItemId: $scope.ddlRequestionDdl.ItemId };
                                 Item.ItemId = Item.ddlItem.ItemId;
                             }
                         })

                     }

                     $scope.SingleIssuelist.push(Item);
                     $scope.ItemCombination = {};
                     $scope.ItemSearchCombination = null;
                     $scope.ddlRequestionDdl = { ItemId: null }
                     $scope.rawMatrialFilterWithItem = [];
                     $scope.ddlMU = null;
                     SumAttQty();
                     $scope.ItemCombination.CurrentQuantity = 0;
                     $('#SearchTextBox').focus();
                     $('#PaperType').select2('destroy');

                     $("#PaperType").val('').select2({
                         placeholder: "--Material Paper Type--",
                     });
                     $("#requestionDDl").select2('destroy');
                     $("#requestionDDl").val('').select2({
                         placeholder: "--Raw Item Name--",
                     });
                     $scope.buttonAddIssue = "Add Item";
                     //}
                     //else {
                     $scope.ItemCombination = {};
                     $scope.ItemSearchCombination = null;
                     $scope.ddlRequestionDdl = { ItemId: null }
                     $scope.ItemCombination.CurrentQuantity = 0;
                     $scope.rawMatrialFilterWithItem = [];
                     $scope.ddlMU = null;
                     $scope.ddlmatrialPaperType = null;
                     //alertify.log('This Finished Item already Exist!!!', 'error', '5000');

                     //}

                     //  }
                     //  $scope.ItemCombinationWithConcat = {};


                     //}
                     //else {
                     //    alertify.log('This Combination already Exist, Try another one !!!', 'error', '5000');
                     //}
                     document.getElementById("btnAddIntemInfo").disabled = true;
                     //}
                     //else {
                     //    alertify.log('Current Quantity is less then Request Quantity !!!', 'error', '5000');
                     //}



                 }
             }
             else {
                 alertify.log('Item already Exist, Try another one !!!', 'error', '5000');
             }
       // if ($scope.ItemCombination.CurrentQuantity >= $scope.ItemCombination.AttributeQty) {
         
            

         }
    }

    $scope.RollSqmMAndRollWeightCal = function (requestionObj) {


        //if (requestionObj.AttributeQty == null || requestionObj.AttributeQty == undefined) {
        //    requestionObj.AttributeQty = 0;
        //}
        if (requestionObj.RollLenghtInMeter == null || requestionObj.RollLenghtInMeter == undefined) {
            requestionObj.RollLenghtInMeter = 0;
        }
        else if (requestionObj.RollAreaInSqMeter == 0 || requestionObj.RollAreaInSqMeter == null) {
            requestionObj.RollAreaInSqMeter = 0;
        }
        else if (requestionObj.PackageWeight == undefined || requestionObj.PackageWeight == null) {
            requestionObj.PackageWeight = 0;
        }
        //var rollMeter = requestionObj.RollLenghtInMeter;
        //var rollSqm = requestionObj.RollAreaInSqMeter;
        //var rollKg = requestionObj.PackageWeight;
        //var RollLengthMeter = 0;
        //var RollLengthSqmMeter = 0;
        //var RollPackageWeight = 0;

        // var attrVal = $scope.ItemCombination;
        if ($scope.RollPerKgSqmList.length != 0) {
            angular.forEach($scope.RollPerKgSqmList, function (aData) {
                if (aData.ItemId == requestionObj.ddlItem.ItemId) {
                    requestionObj.RollLenghtInMeter = Number((requestionObj.RequisitionQuantity * aData.RollLenghtInMeter).toFixed(3));
                    requestionObj.RollAreaInSqMeter = Number((requestionObj.RequisitionQuantity * aData.RollAreaInSqMeter).toFixed(3));
                    requestionObj.PackageWeight = Number((requestionObj.RequisitionQuantity * aData.PackageWeight).toFixed(3));
                }
            })
        }

       
        angular.forEach($scope.AllCombinationlist, function (aData) {
         
            if (aData.ItemId == requestionObj.ddlItem.ItemId ) {

                requestionObj.RollLenghtInMeter = Number((requestionObj.RequisitionQuantity * aData.RollLenghtInMeter).toFixed(3));
                requestionObj.RollAreaInSqMeter = Number((requestionObj.RequisitionQuantity * aData.RollAreaInSqMeter).toFixed(3));
                requestionObj.PackageWeight = Number((requestionObj.RequisitionQuantity * aData.PackageWeight).toFixed(3));
                }
            })
      
    }




    $scope.GetByCombinationLike = function () {
        if ($scope.RequisitionType == "General") {
            $scope.ddlStore = { DepartmentId: "" };

        }
        GetByCombinationandDepertment();
    }


    $scope.SumAttQty = function () {
        SumAttQty();
    }

   

    $scope.LoadACombination = function (aCombination) {
       
        $scope.ItemInfoList = [];
        $scope.dropDownItemId = aCombination.ItemId;
        $scope.ItemCombinationWithConcat = aCombination.Combination;
    
        $scope.ItemUnitFilterList = [];

        document.getElementById("btnAddIntemInfo").disabled = false;


        CommonCurrentStock($scope.ddlStore.DepartmentId, aCombination.ItemId, $scope.ddlmatrialPaperType.MaterialTypeId);
       
    }

    $scope.ChangeByPaperTypeId = function (ddlmatrialPaperType) {
        CommonCurrentStock($scope.ddlStore.DepartmentId, $scope.ddlRequestionDdl.ItemId, ddlmatrialPaperType.MaterialTypeId);
    }

   
    function CommonCurrentStock(DepartmentId, ItemId, MaterialTypeId) {
        $http({
            url: "/StockAudit/ItemGetCurrentStock?DepartmentId=" + DepartmentId + "&ItemId=" + ItemId + "&MaterialTypeId=" + MaterialTypeId + "&LabelBrandId=" + null,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.length > 0) {
                $scope.ItemCombination.CurrentQuantity = data[0].CurrentQuantity;
                $scope.ItemCombination.UnitName = data[0].UnitName;
                $scope.ItemCombination.DepartmentName = data[0].DepartmentName;
                $scope.ddlMU = { ItemUnitId: data[0].ItemUnitId}
            } else {
                $scope.ItemCombination.CurrentQuantity = 0;
                $scope.ItemCombination.UnitName = "N/A";
                $scope.ItemCombination.DepartmentName = "N/A";
                $scope.ddlMU = { ItemUnitId:0}
            }
        });
    }
   
    $scope.RawMatrialSelect = function (rawItem) {
        $scope.EditForRequisitionDetailId = 0;
        $scope.InternalWorkOrderDetailId = rawItem.InternalWorkOrderDetailId;
        $scope.RawItemId = rawItem.ItemId;
        $scope.MaterialTypeId = rawItem.MaterialTypeId;
        $scope.MaterialTypeName = rawItem.MaterialTypeName;
     
        if (rawItem.MaterialTypeId == 0 || rawItem.MaterialTypeId == undefined || rawItem.MaterialTypeId==null) {
            $('#PaperType').select2('destroy');
            $('#PaperType').val('').select2({
                placeholder: "--Material Paper Type--",
            });
            $scope.ddlmatrialPaperType = { MaterialTypeId: 0 }
        } else {
            $('#PaperType').select2('destroy');
            $('#PaperType').val(rawItem.MaterialTypeId).select2();
            $scope.ddlmatrialPaperType = { MaterialTypeId: rawItem.MaterialTypeId}
        }
        $scope.FinishedItemName = rawItem.FinishedItemName;
        $scope.FinishedItemId = rawItem.FinishedItemId;
        $scope.SalesOrderDetailId = rawItem.SalesOrderDetailId;

        document.getElementById("requestionDDl").disabled = false;
    

        $scope.rawMatrialFilterWithItem = [];
       
        $scope.ItemCombination = {};
        $scope.ddlRequestionDdl = null;
        $scope.ItemUnitFilterList = [];
        $scope.ItemCombination.InternalWorkOrderDetailId = rawItem.InternalWorkOrderDetailId;
        angular.forEach($scope.AllCombinationlist, function (aData) {
          
           if (rawItem.ItemId == aData.ItemId) {
               $scope.ItemCombination = rawItem;
               $scope.ddlRequestionDdl = { ItemId: aData.ItemId }
              

               angular.forEach($scope.AllCombinationlistItem, function (stockItem) {

                   if (rawItem.ItemId == stockItem.ItemId) {
                       $scope.ItemCombination.CurrentQuantity = stockItem.CurrentQuantity;
                       $scope.ItemCombination.DepartmentName = stockItem.DepartmentName;
                   }

               });

              // $scope.ItemCombination.ItemUnitId = $scope.ddlMU.ItemUnitId;
               $scope.ddlMU = { ItemUnitId: aData.UnitId };
               $scope.rawMatrialFilterWithItem.push(aData);
               $scope.RollPerKgSqmList.push(aData);

               if (aData.UnitId == 2) {
                   $scope.ItemCombination.UnitName = aData.UnitName;
                   //aData.ItemUnitId = aData.UnitId;
                   var itemUnit = {};

                   itemUnit.ItemUnitId = aData.UnitId;
                   itemUnit.UnitName = aData.UnitName;
                   $scope.ItemUnitFilterList.push(itemUnit);
               }
             
          
               //console.log("$scope.rawMatrialFilterWithItem",$scope.rawMatrialFilterWithItem);
           }
        })

        //$scope.ItemCombination = aCombination;
        //$scope.ItemCombination.CurrentQuantity = aCombination.CurrentQuantity;
        //// $scope.ItemCombination.AttributeQty = aCombination;
        //$scope.VisibilityOfSuggession = false;
        //$scope.ItemSearchCombination = $scope.ItemCombination.Combination;
        //$scope.AllCombinationSearch = [];
        //$('#txtIssueQty').focus();

        document.getElementById("btnAddIntemInfo").disabled = false;


        //document.getElementById("requestionDDl").disabled = false;
        //var isDisable = true;

        $scope.rawMatrialFilterWithItem = [];
        angular.forEach($scope.AllCombinationlist, function (aData) {
            if (aData.CategoryName == "Raw Materials"  && aData.IsActive==true) {
                if (aData.SubCategoryName != "Barcode Ribbon") {
                    if (aData.SubCategoryName != "Barcode Ribbon (R)") {
                        $scope.rawMatrialFilterWithItem.push(aData);
                        console.log($scope.rawMatrialFilterWithItem);
                    }
                   
                }
               
            }

        });


        $("#requestionDDl").val('').select2({

        });

    }

    $scope.MaterialDemandedReportBtn = function (ReportId, ReportType) {
        $window.open("#/MaterialDemandedIssuedReport", "popup", "width=850,height=550,left=280,top=80");
        $scope.MData = {};
        $scope.MData.ReportId = ReportId;
        $scope.MData.ReportType = ReportType;
        $cookieStore.put("MData", $scope.MData);
        event.stopPropagation();
     
    };

    $("#txtReqDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.requistionDateChange = function () {
        $("#txtReqDate").focus();
        $("#txtReqDate").trigger("click");
    }


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
        $('#ReqNoAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.IssueNoAndCompanyName = null;
        GetPagedForRequisition(1);
    }

    $scope.RequestionSearch = function () {
        GetPagedForRequisition(1);

    }

    function GetPagedForRequisition(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromReq").val();
       // $scope.FromDate = formDateChange.split('/').reverse().join('-');
        $scope.FromDate = formDateChange;

        var toDateChange = $("#txtToDateForReq").val();
       // $scope.ToDate = toDateChange.split('/').reverse().join('-');
        $scope.ToDate = toDateChange;

        var SearchCriteria = "";

        if ($scope.ReqNoAndCompanyName != undefined && $scope.ReqNoAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([R].[RequisitionDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([R].[RequisitionNo] LIKE '%" + $scope.ReqNoAndCompanyName + "%' OR [R].[FromDepartmentName] LIKE '%" + $scope.ReqNoAndCompanyName + "%' OR [R].[ToDepartmentName] LIKE '%" + $scope.ReqNoAndCompanyName + "%')";

        }
        else if ($scope.ReqNoAndCompanyName !== undefined && $scope.ReqNoAndCompanyName != null && $scope.ReqNoAndCompanyName != "") {
            SearchCriteria = "[R].[RequisitionNo] LIKE '%" + $scope.ReqNoAndCompanyName + "%' OR [R].[FromDepartmentName] LIKE '%" + $scope.ReqNoAndCompanyName + "%' OR [R].[ToDepartmentName] LIKE '%" + $scope.ReqNoAndCompanyName + "%' ";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[R].[RequisitionDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }
        
        $http({
            url: encodeURI('/Requisition/RequisitionGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.RequisitionListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;

            if ($scope.RequisitionListForGrid.length > 0) {
                angular.forEach($scope.RequisitionListForGrid, function (aIssue) {
                    var res1 = aIssue.RequisitionDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aIssue.RequisitionDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aIssue.RequisitionDate = date1;
                    }
                })

            }
            else {
                alertify.log('Requistion  Not Found', 'error', '5000');
            }

        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForRequisition($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForRequisition($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForRequisition($scope.currentPage);
        }
        //  }


    }


});