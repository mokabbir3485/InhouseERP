app.controller("IssueEntryController", function ($scope, $cookieStore, $http, $filter, $window, $rootScope) {
   /* $scope.LoginUser = $cookieStore.get('UserData');*/



    Clear();

    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
      
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Stock Issue').ScreenId;
        GetUsersPermissionDetails();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForIssue($scope.currentPage);
        $scope.IssueListForGrid = [];

        $scope.ScreenId = parseInt(sessionStorage.getItem('StockIssueScreenId'));
      /*  $scope.ScreenId = parseInt(sessionStorage.getItem("InternalWorkOrderScreenId"));*/
        $scope.FromScreenId = $cookieStore.get('StockIssueScreenId');
        $scope.EmployeeList = [];
        $scope.TopForIssueList = [];
        $scope.TopForIssue = [];
        $scope.Storelist = [];
        $scope.DepartmentList = [];
        $scope.VarietyList = [];
        $scope.copy_IssueDetailList = [];
        $scope._inv_StockIssueDetailAdAttribute = [];
        $scope._inv_StockIssueDetail = [];
        $scope.SingleIssuelist = [];
        $scope.ItemAdvanceSearch = false;
        $scope.HasApprovalForIssue = false;
      
        GetIsApproveForIssue();
        GetAllDepartment();
        GetAllStore();
        GetAllEmployee();
        $scope.inv_StockIssue = {};
        $scope.ddlReceivedBy = null;
        GetTopForIsshu();
        GetAllVariety();
        $scope.showTable = true;
        $scope.IsRequesition = true;
        $scope.buttonAddIssue = "Add";
        $scope.btnSave = 'Save';
       
        $scope.inv_StockIssue.IssueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
       // StockIssueNumberGenaratorMethod();
        $scope.ItemInfoList = [];
        $scope.ddlReq = null;

        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];
        $scope.EmailSendNotification = {};

       // GetUsersPermissionDetails();
        StockIssueNumberGenaratorMethod();
        $scope.ReportBtnDisabled = true;
    }

    //function ReportNotificationDetail_Get() {


    //    $http({
    //        url: '/EmailSender/ReportNotificationGetByReportId?ReportCode=' + 'SITC',
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' }
    //    }).success(function (notification) {
    //        $scope.ReportNotificationDetailList = notification;


    //        console.log('$scope.ReportNotificationDetailList', $scope.ReportNotificationDetailList);
    //    });

    //}
  
    function ReportNotificationDetail_Get() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'SITC',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(Issue, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];

        /*      angular.forEach(SalesOrderList, function (aSO) {*/
        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle;

            if (aNotify.DepartmentId == 7) {
                if (aNotify.SectionId == $scope.LoginUser.SectionId) {
                    obj.NotificationDetail = ' Internal WorkOrder : ' +$scope.SingleIssuelist[0].InternalWorkOrderNo+' Issue No: ' + Issue.IssueNo + ' Employee Name : ' + $scope.LoginUser.FullName;
                    $scope.AppNotificationLogList.push(obj);
                }
            } else {
                obj.NotificationDetail = ' Internal WorkOrder : ' + $scope.SingleIssuelist[0].InternalWorkOrderNo +' Issue No: ' + Issue.IssueNo + ' Employee Name : ' + $scope.LoginUser.FullName;
                $scope.AppNotificationLogList.push(obj);
            }
        })
        // })


        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) { })
    }

    $scope.RedirectItemEntry = function () {
        // $location.path('/Home/Index/ItemEntry');
        $window.location.href = '/Home/Index#/ItemEntry';
    }

    $scope.RemoveItemAttr = function (aAttribute) {
        var ind = $scope._inv_StockIssueDetailAdAttribute.indexOf(aAttribute);
        $scope._inv_StockIssueDetailAdAttribute.splice(ind, 1);
        SumAttQty();
    }

    $scope.Removeissue = function (ItemIssue) {
        var ind = $scope.SingleIssuelist.indexOf(ItemIssue);
        $scope.SingleIssuelist.splice(ind, 1);
        SumAttQty();
        SumQty();
    }

    function SumQty() {
        var isCurrent = false;
        angular.forEach($scope.SingleIssuelist, function (aDetailAdAttribute) {
            if (aDetailAdAttribute.IssueQuantity < 1 || aDetailAdAttribute.IssueQuantity == undefined || aDetailAdAttribute.IssueQuantity == null) {
                aDetailAdAttribute.IssueQuantity =null;
            }
            else if (aDetailAdAttribute.IssueQuantity > aDetailAdAttribute.RequisitionQuantity) {
                //Message: Cannot Issue more than Stock Qty
                aDetailAdAttribute.IssueQuantity = aDetailAdAttribute.RequisitionQuantity;
                alertify.log('Issue Quantity is Greater than Req. Quantity', 'error', '3000');
            }



            var currentQty = aDetailAdAttribute.RequisitionQuantity - aDetailAdAttribute.IssuedQuantity;

            if (currentQty >= aDetailAdAttribute.IssueQuantity) {
                return;
            } else {
                aDetailAdAttribute.IssueQuantity =0.00;
                alertify.log('Issue Quantity is Greater than Req. Quantity', 'error', '3000');
               
            }

            if (aDetailAdAttribute.IssueQuantity != undefined || aDetailAdAttribute.IssueQuantity != null) {

                if (currentQty < aDetailAdAttribute.IssueQuantity) {
                    isCurrent = true;
                    aDetailAdAttribute.IssueQuantity = currentQty;
                } else {

                    isCurrent = false;

                }
            }




        });


        if (isCurrent) {
            alertify.log('Issue Quantity is Greater than Req. Quantity', 'error', '3000');
        }
    }

    function SumAttQty() {
        var isCurrent = false;
        angular.forEach($scope.SingleIssuelist, function (aDetailAdAttribute) {
            //if (aDetailAdAttribute.IssueQuantity < 1 || aDetailAdAttribute.IssueQuantity == undefined || aDetailAdAttribute.IssueQuantity == null) {
            //    aDetailAdAttribute.IssueQuantity =null;
            //}
            //else if (aDetailAdAttribute.IssueQuantity > aDetailAdAttribute.RequisitionQuantity) {
            //    //Message: Cannot Issue more than Stock Qty
            //    aDetailAdAttribute.IssueQuantity = aDetailAdAttribute.RequisitionQuantity;
            //}

          

            var currentQty = aDetailAdAttribute.RequisitionQuantity - aDetailAdAttribute.IssuedQuantity;
            
            //if (currentQty >= aDetailAdAttribute.IssueQuantity) {
            //    return;
            //} else {
            //    aDetailAdAttribute.IssueQuantity =0.00;
            //    alertify.log('Issue Quantity is Greater than Req. Quantity', 'error', '3000');
            //   // alertify.log("Issue Quantity is Greater than Issued Quantity", "error", "+ aDetailAdAttribute.IssueQuantity+");
            //}

            if (aDetailAdAttribute.IssueQuantity != undefined || aDetailAdAttribute.IssueQuantity !=null) {

                if (currentQty < aDetailAdAttribute.IssueQuantity) {
                    isCurrent = true;
                    aDetailAdAttribute.IssueQuantity = currentQty;
                } else {

                    isCurrent = false;

                }
            }
           


          
        });


        if (isCurrent) {
            alertify.log('Issue Quantity is Greater than Req. Quantity', 'error', '3000');
        }
        //angular.forEach($scope.SingleIssuelist, function (aIssueDetail) {
        //    aIssueDetail.IssueUnitId = 2;
        //    aIssueDetail.IssueUnitName = "Roll";
        //    aIssueDetail.IssueQuantity = Enumerable.From($scope._inv_StockIssueDetailAdAttribute).Where("$.ItemId == '" + aIssueDetail.ItemId + "'").Sum('$.IssueQuantity');
        //});
        //$scope.SingleIssuelist = Enumerable.From($scope.SingleIssuelist).Where("$.IssueQuantity != 0").ToArray();
    }

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            $scope.ddlIssuedBy = { EmployeeId: $scope.LoginUser.EmployeeId };
            $scope.inv_StockIssue.IssuedById = $scope.LoginUser.EmployeeId;
            $scope.inv_StockIssue.IssuedBy = $scope.LoginUser.FullName;
            
            $scope.ReportBtnDisabled = false;
        });
    }

    function GetAllStore() {
       
            $http({
                url: '/Department/DepartmentGetByBranchAndDeptTypeId?departmentTypeIds=' + '1,4' + '&branchId=' + null,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
              //  $scope.Storelist = data;
                //console.log(" $scope.Storelist", $scope.Storelist);

                angular.forEach(data, function (aData) {
                    aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                    $scope.Storelist.push(aData);
                })
                
            });
     


        //$http({
        //    url: '/Department/GetAllStore',
        //    method: 'GET',
        //    headers: { 'Content-Type': 'application/json' }
        //}).success(function (data) {
        //    $scope.Storelist = data;
        //});
    }

    function GetAllDepartment() {
       
        $http({
            url: '/Department/DepartmentGetByBranchAndDeptTypeId?departmentTypeIds=' + '1,4' + '&branchId=' + null,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
           /// $scope.DepartmentList = data;
          //  console.log("$scope.DepartmentList", $scope.DepartmentList);

            angular.forEach(data, function (aData) {
               aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                $scope.DepartmentList.push(aData);
            })
            
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

    function GetTopForIsshu() {
        $http({
            url: '/Requisition/GetTopRequisitionForIssue',
            method: 'GET',
            headers: { 'content-Type': 'application/json' }
        }).success(function (issueList) {
            angular.forEach(issueList, function (aData) {
                var res = aData.RequisitionDate.substring(0, 5);
                if (res == "/Date") {
                    var parsedDate = new Date(parseInt(aData.RequisitionDate.substr(6)));
                    aData.RequisitionDate = $filter('date')(parsedDate, 'dd-MMM-yyyy');
                }
            });
            $scope.TopForIssueList = issueList;
            

        })
    }

    function GetByCombinationandDepertment() {
        if ($scope.ddlDepartment) {
            $http({
                url: '/Item/GetByDepartmentAndCombinationLike?departmentId=' + $scope.ddlDepartment.DepartmentId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.AllCombinationlist = JSON.parse(data);
                /*
                if ($scope.AllCombinationlist.length) {
                    $scope.AllCombinationSearch = Enumerable.From($scope.AllCombinationlist).Take(7).ToArray();
                }
                */
                
            })
        }
        else {
            $scope.ItemSearchCombination = null;
        }
    }

    //function GetMaxIssueNo() {
    //    var date = $("#txtIssueDate").val();
    //    if (date != "") {
    //        $http({
    //            url: '/Issue/GetMaxIssueNoByDate?issueDate=' + date,
    //            method: 'GET',
    //            headers: { 'Content-Type': 'application/json' }
    //        }).success(function (data) {
    //            $scope.inv_StockIssue.IssueNo = parseInt(data);
    //        });
    //    } else {
    //        $("#txtIssueDate").focus();
    //    }
    //}


    //$scope.getMaxIsseByDate = function () {
    //    GetMaxIssueNo();
    //}

    //$scope.CheckDuplicateIssueNo = function () {
    //    var date = $("#txtIssueDate").val();
    //    if (date == "") {
    //        $("#txtIssueDate").focus();
    //        alertify.log('Please select date.', 'error', '5000');
    //        return;
    //    }
    //    if ($scope.inv_StockIssue.IssueNo == "" || angular.isUndefined($scope.inv_StockIssue.IssueNo) || $scope.inv_StockIssue.IssueNo == null) {
    //        GetMaxIssueNo();
    //    } else {
    //        $http({
    //            url: '/Issue/CheckDuplicateIssueNo?IssueNo=' + $scope.inv_StockIssue.IssueNo + "&date=" + date,
    //            method: 'GET',
    //            headers: { 'Content-Type': 'application/json' }
    //        }).success(function (data) {
    //            if (data.length > 0) {
    //                $scope.found = true;
    //                alertify.log("Issue No. " + $scope.inv_StockIssue.IssueNo + ' already exists!', 'error', '3000');
    //                $scope.inv_StockIssue.IssueNo = "";
    //                $('#txtIssueNo').focus();
    //            } else {
    //                $scope.found = false;
    //            }
    //        });
    //    }
    //}

    $scope.StockIssueNumberGenarator = function () {
        //StockIssueNumberGenaratorMethod();
    }
    StockIssueNumberGenaratorMethod();
    function StockIssueNumberGenaratorMethod() {
    

             // $scope.OnSelectdate = $scope.inv_StockIssue.IssueDate;
             ////   $scope.inv_StockIssue.IssueDate = $scope.OnSelectdate;
             //   var today = $scope.OnSelectdate;
             //   $scope.financial_year = "";

             //   var getMonth = today.substring(0, 3);


             //   var getFullYear = today.substring(6, 11);
             //   var fullYear = parseInt(getFullYear);

             //   if (getMonth > 6) {
             //       $scope.financial_year = (fullYear - 1) + "-" + fullYear;
             //   } else {
             //       $scope.financial_year = fullYear + "-" + (fullYear + 1)
             //   }

             //   var getYear1 = $scope.financial_year.substring(2, 4);
             //   var getYear2 = $scope.financial_year.substring(7, 9);
             //   $scope.getAllYear = getYear1 + "-" + getYear2;

                var dateParts =
                    ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];

             
                $http({
                    url: '/Issue/GetMaxStockIssueNumber',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.MaxIssueNo = data;
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
                        $scope.inv_StockIssue.IssueNo = 'SIN/' + $scope.finYearEPZ + '/' + $scope.MaxIssueNo;
                    });
        });

    }

    $scope.SumAttQty = function () {
        SumAttQty();
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

    $scope.GetByCombinationLike = function () {
        GetByCombinationandDepertment();
    }

    $scope.LoadACombination = function (aCombination) {
        $scope.ItemCombination = aCombination;
        $scope.VisibilityOfSuggession = false;
        $scope.ItemSearchCombination = $scope.ItemCombination.Combination;
        $scope.AllCombinationSearch = [];
        $('#txtIssueQty').focus();
    }

    $scope.ClearIwo = function () {
        $('#SelectReq').select2('destroy');
        $('#SelectReq').val('').select2({
            placeholder: "Select Req No"
        });
        $scope.SingleIssuelist = [];
        $scope._inv_StockIssueDetailAdAttribute = [];
        $scope.ReportBtnFlag = true;
       // $scope.ddlReq = null;
        $scope.ddlReq.RequisitionId = null;
        $scope.ReportBtnDisabled = true;
    }
  

    $scope.Report = function () {
       // $scope.ddlReq.RequisitionId;

        $window.open("#/MaterialDemandedIssuedReport", "popup", "width=850,height=550,left=280,top=80");
        $scope.MData = {};
        $scope.MData.ReportId =$scope.ddlReq.RequisitionId;
        $scope.MData.ReportType = "Demanded";
        $cookieStore.put("MData", $scope.MData);
        event.stopPropagation();
        //$scope.ddlReq.RequisitionId = null;
    }


    $scope.CellClick = function (topIssue) {
        $scope.ReportBtnDisabled = false;
        $scope.SingleIssuelist = [];
        StockIssueNumberGenaratorMethod();
        $scope._inv_StockIssueDetailAdAttribute = [];
        console.log("topIssue",topIssue);
        //  $scope.LoadACombination();
       // $scope.ddlDepartment = { DepartmentId: topIssue.ToDepartmentId };

        $scope.inv_StockIssue.RequisitionId = topIssue.RequisitionId;
        $scope.inv_StockIssue.RequisitionNo = topIssue.RequisitionNo;
        $scope.ddlDepartment = { "DepartmentId": topIssue.ToDepartmentId };
        $scope.inv_StockIssue.IssueFromDepartmentId = topIssue.ToDepartmentId;
        $scope.inv_StockIssue.IssueFromDepartmentName = topIssue.ToDepartmentName;
        $scope.ddlStore = { "DepartmentId": topIssue.FromDepartmentId };

        $scope.inv_StockIssue.IssueToDepartmentId = topIssue.FromDepartmentId;
        $scope.inv_StockIssue.IssueToDepartmentName = topIssue.FromDepartmentName;

        var parms = JSON.stringify({ requisitionId: topIssue.RequisitionId });
        $http.post('/Item/GetCombinationByRequisition', parms).success(function (IssueDetailList) {
            $scope.IssueDetailList = JSON.parse(IssueDetailList);
            $scope.copy_IssueDetailList = angular.copy($scope.IssueDetailList);

          
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
                //var rollMeter = requestionObj.RollLenghtInMeter;
                //var rollSqm = requestionObj.RollAreaInSqMeter;
                //var rollKg = requestionObj.PackageWeight;

                aIssue.RollLenghtInMeterval = aIssue.RollLenghtInMeter;
                aIssue.RollAreaInSqMeterVal = aIssue.RollLenghtInMeter;
                aIssue.PackageWeightVal = aIssue.RollLenghtInMeter;
               
                //aIssue.IssueQuantity = (aIssue.RequisitionQuantity - aIssue.IssuedQuantity) > aIssue.CurrentQuantity ? aIssue.CurrentQuantity : (aIssue.RequisitionQuantity - aIssue.IssuedQuantity);
                aIssue.IssueQuantity = aIssue.RequisitionQuantity;
                //var ValueOfAttribute = [];
                //var a = aIssue.AttributeNames.split(',');
                //for (var i = 0; i < a.length; i++) {
                //    var val = a[i].split(':');
                //    ValueOfAttribute.push(val[1].trim());
                //}
                aIssue.IssuedQtyAndUnit = aIssue.IssueQuantity + " " + aIssue.UnitName;
                aIssue.IssueQuantity = aIssue.RequisitionQuantity - aIssue.IssuedQuantity;
                if (aIssue.MaterialTypeId == 0 || aIssue.MaterialTypeId == undefined) {
                    aIssue.MaterialTypeName = "N/A";
                } else {
                    aIssue.MaterialTypeName = aIssue.MaterialTypeName + ' ~ ' + aIssue.MaterialTypeCode;
                }
             
                aIssue.MaterialTypeId = aIssue.MaterialTypeId;


                //angular.forEach($scope.AllCombinationlistWithPriceList, function (aData) {
                //    if (aData.ItemId == aIssue.ItemId) {
                //        aIssue.RollLenghtInMeter = aData.RollLenghtInMeter * aIssue.IssueQuantity;
                //        aIssue.RollAreaInSqMeter = aData.RollAreaInSqMeter * aIssue.IssueQuantity;
                //        aIssue.PackageWeight = aData.PackageWeight * aIssue.IssueQuantity;
                //    }

                //});
                //aIssue.RollLenghtInMeter;
                //aIssue.RollAreaInSqMeter;
                //aIssue.PackageWeight;
                //aIssue.RollLenghtInMeter = aIssue.IssueQuantity * aIssue.RollLenghtInMeter;
                //aIssue.RollAreaInSqMeter = aIssue.IssueQuantity * aIssue.RollAreaInSqMeter;
                //aIssue.PackageWeight = aIssue.IssueQuantity * aIssue.PackageWeight;

             
             
                aIssue.ValueOfAttribute = [aIssue.AttributeNames];


                $scope._inv_StockIssueDetailAdAttribute.push(aIssue);
                $scope.SingleIssuelist.push(aIssue);

            });

            //$scope.SingleIssuelist = [];
            //angular.forEach($scope.IssueDetailList, function (aIssue) {
            //    if (Enumerable.From($scope.SingleIssuelist).Where('$.ItemId==' + aIssue.ItemId).ToArray().length == 0) {
            //        $scope.SingleIssuelist.push(aIssue);
            //    }
            //    console.log('SingleIssuelist', $scope.IssueDetailList)
             
            //    aIssue.HeaderOfAttribute = ["Description"];

            //    aIssue.IssueQuantity = Enumerable.From($scope._inv_StockIssueDetailAdAttribute).Where('$.ItemId==' + aIssue.ItemId).Sum('$.IssueQuantity');;
            //});
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


    $scope.SaveStockIssue = function () {
        //var erroMsg = [];
        var flag = false;
        var da = $scope.SingleIssuelist;
        for (var i = 0; i < $scope.SingleIssuelist.length; i++) {

            if ($scope.SingleIssuelist[i].CurrentQuantity >= $scope.SingleIssuelist[i].IssueQuantity ) {
                flag = true;
            } else {
                flag = false;
               
            }
            if (flag == false) {
                break;
            }
        }
        if (flag) {

            $scope.inv_StockIssue.CreatorId = $scope.LoginUser.UserId;
            $scope.inv_StockIssue.UpdatorId = $scope.LoginUser.UserId;
            $scope.inv_StockIssue.IsApproved = $scope.HasApproval ? false : true;
       
            $scope._inv_StockIssueDetail = [];
            if ($scope.btnSave == "Save") {
                if ($scope.ddlIssuedBy == null || $scope.ddlIssuedBy == undefined) {
                    alertify.log('Please Select Issue Name', 'error', '3000');
                } else if ($scope.ddlReceivedBy == null || $scope.ddlReceivedBy == undefined) {
                    alertify.log('Please Select Recived Name', 'error', '3000');
                }
                else {
                    angular.forEach($scope.SingleIssuelist, function (adata) {
                        var IssueObj = {};
                        IssueObj.CurrentQuantity = adata.CurrentQuantity;
                        IssueObj.IssueQuantity = adata.IssueQuantity;
                        IssueObj.IssuedQuantity = adata.IssuedQuantity;
                        IssueObj.ItemName = adata.ItemName;
                        IssueObj.ItemId = adata.ItemId;
                        IssueObj.ItemUnitId = adata.UnitId;
                        IssueObj.RollAreaInSqMeter = adata.RollAreaInSqMeter;
                        IssueObj.RollLenghtInMeter = adata.RollLenghtInMeter;
                        IssueObj.PackageWeight = adata.PackageWeight;
                        IssueObj.RequisitionDetailId = adata.RequisitionDetailId;
                        IssueObj.IssueUnitId = adata.UnitId;
                        IssueObj.CategoryId = adata.CategoryId;
                        IssueObj.MaterialTypeId = adata.MaterialTypeId;
                        //  IssueObj.MaterialTypeName = adata.MaterialTypeName +" ~ "+ adata.MaterialTypeCode;

                        $scope._inv_StockIssueDetail.push(IssueObj);
                        // }
                    });
                    var flag = true;
                    $scope.MattypeName = "";
                    angular.forEach($scope.SingleIssuelist, function (aData) {
                        if (aData.MaterialTypeId == 0 || aData.MaterialTypeId == undefined) {
                            flag = false;
                            $scope.MattypeName = aData.FinishItemName;
                        }
                    });


                    if (flag) {
                        alertify.confirm("Are you sure to save ?", function (e) {
                            if (e) {
                                // $scope.inv_StockIssue.IssueDate = f;
                                //$scope.inv_StockIssue.IssueDate = f;
                                if (($scope.inv_StockIssue.IssueId == 0 || $scope.inv_StockIssue.IssueId == undefined) && $scope.CreatePermission) {

                                    var parms = JSON.stringify({ stockIssue: $scope.inv_StockIssue, issueDetailLst: $scope._inv_StockIssueDetail });
                                    $http.post('/Issue/SaveStockIssueConsume', parms).success(function (data) {
                                        AppNotificationLogPost($scope.inv_StockIssue,'Stock Issue Create');
                                        EmailSend($scope.inv_StockIssue);
                                        StockIssueNumberGenaratorMethod();
                                        if (data != "") {

                                            Clear();
                                            $scope.issueEntryForm.$setPristine();
                                            $scope.issueEntryForm.$setUntouched();
                                            alertify.log('Issue No : ' + data + ' ' + status + ' Successfully!', 'success', '5000');
                                        }
                                        else {
                                            alertify.log('Server Errors!', 'error', '5000');
                                        }
                                    });
                                }
                                else if ($scope.CreatePermission) {
                                    alertify.log('You do not have permission to save!', 'error', '10000');
                                }
                            }
                        });
                    } else {
                        alertify.log('Material Type Name Not Found' + '  ' + $scope.MattypeName, 'error', '3000');
                    }

                }

            }
        } else {
            alertify.log('Stock  quantity are not sufficient', 'error', '3000');
        }
           
    }

    function EmailSend(issue) {


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

        $scope.EmailSendNotification.EmailSubject = "Stock Issue Saved";
        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        //  $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var currentDate = new Date();
        var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> A new Stock Issue has been Done. <br/> ' +
            'Stock Issue No : <strong > ' + issue.IssueNo + '</strong><br/>' +
            'Stock Issue Date: <strong>' + ($filter('date')(issue.IssueDate, 'dd/MM/yyyy')).toString() + '</strong><br/>' +
            //'Company Name: <strong>' + $scope.ddlInternalWorkOrder.CompanyName + '</strong><br/>' +
        'Issued by: <strong>' + issue.IssuedBy + '</strong>' + '<br/>' +
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

    $scope.AddIssueDetail = function () {
        var flag = true;
        angular.forEach($scope._inv_StockIssueDetailAdAttribute, function (aDetailAdAttribute) {
            if (aDetailAdAttribute.Barcode == $scope.ItemCombination.Barcode) {
                flag = false;
            }
        });
        if (flag) {
            var ValueOfAttribute = [];
            var a = $scope.ItemCombination.AttributeNames.split(',');
            for (var i = 0; i < a.length; i++) {
                var val = a[i].split(':');
                ValueOfAttribute.push(val[1].trim());
            }
            $scope.ItemCombination.ValueOfAttribute = ValueOfAttribute;
            var Attribute = $scope.ItemCombination;

            $scope._inv_StockIssueDetailAdAttribute.push(Attribute);

            flag = true;
            angular.forEach($scope.SingleIssuelist, function (aItem) {
                if (aItem.ItemId == $scope.ItemCombination.ItemId) {
                    flag = false;
                }
            });
            if (flag) {
                var Item = {};
                angular.forEach($scope.VarietyList, function (aItem) {
                    if (aItem.ItemId == $scope.ItemCombination.ItemId) {
                        Item = aItem;
                    }
                })
                Item.HeaderOfAttribute = [];
                var HeaderOfAttribute = [];
                var a = $scope.ItemCombination.AttributeNames.split(',');
                for (var i = 0; i < a.length; i++) {
                    var val = a[i].split(':');
                    HeaderOfAttribute.push(val[0].trim());
                }
                Item.HeaderOfAttribute = HeaderOfAttribute;
                $scope.SingleIssuelist.push(Item);
            }

            $scope.ItemCombination = {};
            $scope.ItemSearchCombination = null;
            SumAttQty();
            $('#SearchTextBox').focus();
        }
        else {
            alertify.log('This Combination already Exist, Try another one !!!', 'error', '5000');
        }
    }


    $scope.RollSqmMAndRollWeightCal = function (requestionObj) {


        //if (requestionObj.AttributeQty == null || requestionObj.AttributeQty == undefined) {
        //    requestionObj.AttributeQty = 0;
        //}

        if (requestionObj.RollLenghtInMeter == null || requestionObj.RollLenghtInMeter == undefined || requestionObj.RollLenghtInMeter == 0) {
            requestionObj.RollLenghtInMeter = 0;
        }
        else if (requestionObj.RollAreaInSqMeter == 0 || requestionObj.RollAreaInSqMeter == null || requestionObj.RollAreaInSqMeter ==0) {
            requestionObj.RollAreaInSqMeter = 0;
        }
        else if (requestionObj.PackageWeight == undefined || requestionObj.PackageWeight == null || requestionObj.PackageWeight == 0) {
            requestionObj.PackageWeight = 0;
        }
        
        var RollInMeter = 0;
        var RollAreaSqm = 0;
        var PackageWeightKg = 0;

        angular.forEach($scope.AllCombinationlistWithPriceList, function (aData) {
            if (aData.ItemId == requestionObj.ItemId) {
                RollInMeter = (aData.RollLenghtInMeter * requestionObj.IssueQuantity).toFixed(3);
                // requestionObj.RollLenghtInMeter = aData.RollLenghtInMeter * requestionObj.IssueQuantity;
                requestionObj.RollLenghtInMeter = Number(RollInMeter);

                RollAreaSqm = (aData.RollAreaInSqMeter * requestionObj.IssueQuantity).toFixed(3);

                //requestionObj.RollAreaInSqMeter = aData.RollAreaInSqMeter * requestionObj.IssueQuantity;
                requestionObj.RollAreaInSqMeter = Number(RollAreaSqm);

                PackageWeightKg = (aData.PackageWeight * requestionObj.IssueQuantity).toFixed(3);

                // requestionObj.PackageWeight = aData.PackageWeight * requestionObj.IssueQuantity;
                requestionObj.PackageWeight = Number(PackageWeightKg);

            }
       
        })

        //requestionObj.RollLenghtInMeter = requestionObj.IssueQuantity * requestionObj.RollLenghtInMeterval;
        //requestionObj.RollAreaInSqMeter = requestionObj.IssueQuantity * requestionObj.RollAreaInSqMeterval;
        //requestionObj.PackageWeight = requestionObj.IssueQuantity * requestionObj.PackageWeightval;

      //  SumQty();
    }

    $scope.AllCombinationlistWithPriceList = [];
    GetByCombinationand(); 

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
                    console.log(" $scope.AllCombinationlistWithPriceListRaw", $scope.AllCombinationlistWithPriceListRaw);
                }
            })


            //$scope.AllCombinationlistWithPriceList = Enumerable.From($scope.AllCombinationlistWithPrice).Distinct(function (c) {
            //    return c.Combination;
            //}).Where(function (x) {
            //    return x.CategoryName != "Hardware";
            //}).ToArray();



        })

    }



    $scope.ItemForSqmRollKg = function (issueObj) {
        $scope.ItemInfoList = [];
        $("#itemSqmLmKgModal").modal('show');

        angular.forEach($scope.AllCombinationlistWithPriceList, function (aData) {
            if (issueObj.ItemId == aData.ItemId) {

                if (aData.RollLenghtInMeter == 0 || aData.RollLenghtInMeter == null || aData.RollLenghtInMeter == undefined) {
                    aData.RollLenghtInMeter = 0;
                }
                if (aData.RollAreaInSqMeter == 0 || aData.RollAreaInSqMeter == null || aData.RollAreaInSqMeter == undefined) {
                    aData.RollAreaInSqMeter = 0;
                }
                if (aData.PackageWeight == 0 || aData.PackageWeight == null || aData.PackageWeight == undefined) {
                    aData.PackageWeight = 0;
                }
              
                $scope.ItemInfoList.push(aData);
            }
        });

    }



    function RequesitionAdvanceSearch() {
        if ($scope.ItemAdvanceSearch) {
            $http({
                url: '/AdvancedSearch/GetItemSearchCriteria',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.ItemSearchCriteria = data;
                if ($scope.ItemSearchCriteria != "") {
                    $http({
                        url: '/Item/GetItemSearchResult?searchCriteria=' + $scope.ItemSearchCriteria,
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }).success(function (data) {
                        $scope.AdvanceItemSearchResultList = data;
                    });
                }
            })
        }
        else {
            $http({
                url: '/AdvancedSearch/GetSearchId',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.SearchId = data;
                if ($scope.SearchId > 0) {
                    $scope.TopForIssueList = [];
                    $http({
                        url: '/Requisition/GetRequisitionById',
                        method: 'GET',
                        params: { id: $scope.SearchId },
                        headers: { 'Content-Type': 'application/json' }
                    }).success(function (aRequesition) {
                        var res = aRequesition.RequisitionDate.substring(0, 5);
                        if (res == "/Date") {
                            var parsedDate = new Date(parseInt(aRequesition.RequisitionDate.substr(6)));
                            aRequesition.RequisitionDate = $filter('date')(parsedDate, 'dd/MM/yyyy');
                        }
                        $scope.TopForIssueList.push(aRequesition);
                        $scope.inv_StockIssue.RequisitionId = aRequesition.RequisitionId;
                        $scope.inv_StockIssue.RequisitionNo = aRequesition.RequisitionNo;
                        $scope.inv_StockIssue.IssueFromDepartmentId = aRequesition.ToDepartmentId;
                        $scope.inv_StockIssue.IssueFromDepartmentName = aRequesition.ToDepartmentName;
                        $scope.inv_StockIssue.IssueToDepartmentId = aRequesition.FromDepartmentId;
                        $scope.inv_StockIssue.IssueToDepartmentName = aRequesition.FromDepartmentName;
                        /*
                        var parms = JSON.stringify({ id: aRequesition.RequisitionId });                        
                        $http.post('/Requisition/GetRequisitionDetailByRequisitionId', parms).success(function (issueDetail) {
                        $scope.TopForIssue = issueDetail;                        
                        });
                        */
                    })
                    $scope.btnSave = "Save";
                }

            })
        }
    }

    function GetIsApproveForIssue() {
        $http({
            url: '/Approval/GetByScreenId?screenId=' + $scope.FromScreenId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.HasApprovalForIssue = data.IsRequired;
        })
    }

    $scope.MaterialIssuedReportBtn = function (ReportId, ReportType) {

        $window.open("#/MaterialDemandedIssuedReport", "popup", "width=850,height=550,left=280,top=80");
        $scope.MData = {};
        $scope.MData.ReportId = ReportId;
        $scope.MData.ReportType = ReportType;

         $cookieStore.put("MData", $scope.MData);
        //sessionStorage.setItem("MData", JSON.stringify($scope.MData));

        event.stopPropagation();

    };

    $scope.resetForm = function () {
        Clear();
        $scope.issueEntryForm.$setPristine();
        $scope.issueEntryForm.$setUntouched();
    }


    $("#txtIssueDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.IssueDateChangeFor = function () {
        $("#txtIssueDate").focus();
        $("#txtIssueDate").trigger("click");
    }

    $("#txtFromIssue").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForIssue = function () {
        $("#txtFromIssue").focus();
        $("#txtFromIssue").trigger("click");
    }


    $("#txtToDateForIssue").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForIssue = function () {
        $("#txtToDateForIssue").focus();
        $("#txtToDateForIssue").trigger("click");
    }


    $scope.reloadBtn = function () {
        $('#txtFromIssue').val('');
        $('#txtToDateForIssue').val('');
        $('#IsssueNoAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.IssueNoAndCompanyName = null;
        GetPagedForIssue(1);
        $scope.isReportDisabled = false;
    }

    $scope.IssueSearch = function () {
        GetPagedForIssue(1);

    }

    function GetPagedForIssue(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromIssue").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForIssue").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.IssueNoAndCompanyName != undefined && $scope.IssueNoAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "(IssueDate between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and (IssueNo LIKE '%" + $scope.IssueNoAndCompanyName + "%' OR IssueFromDepartmentName LIKE '%" + $scope.IssueNoAndCompanyName + "%' OR IssueToDepartmentName LIKE '%" + $scope.IssueNoAndCompanyName + "%')";

        }
        else if ($scope.IssueNoAndCompanyName !== undefined && $scope.IssueNoAndCompanyName != null && $scope.IssueNoAndCompanyName != "") {
            SearchCriteria = "IssueNo LIKE '%" + $scope.IssueNoAndCompanyName + "%' OR IssueFromDepartmentName LIKE '%" + $scope.IssueNoAndCompanyName + "%' OR IssueToDepartmentName LIKE '%" + $scope.IssueNoAndCompanyName + "%' OR [R].RequisitionNo LIKE '%" + $scope.IssueNoAndCompanyName + "%' ";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "IssueDate between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }



        $http({
            url: encodeURI('/Issue/IssuedGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.IssueListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;

            if ($scope.IssueListForGrid.length > 0) {
                angular.forEach($scope.IssueListForGrid, function (aIssue) {
                    var res1 = aIssue.IssueDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aIssue.IssueDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aIssue.IssueDate = date1;
                    }

                    var res2 = aIssue.RequisitionDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aIssue.RequisitionDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aIssue.RequisitionDate = date2;
                    }
                    
                })

            }
            else {
                alertify.log('Issue  Not Found', 'error', '5000');
            }

        });
    }

    $scope.getData = function (curPage) {
        $scope.isReportDisabled = false;
        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForIssue($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForIssue($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForIssue($scope.currentPage);
        }
        //  }


    }

});