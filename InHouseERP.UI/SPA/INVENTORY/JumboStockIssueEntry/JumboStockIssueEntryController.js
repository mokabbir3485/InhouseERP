app.controller("JumboStockIssueEntryController", function ($scope, $rootScope, $cookieStore, $http, $window, $filter) {


    Clear();
    


    function Clear() {

        //  document.getElementById("btnAdd").disabled = false;
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Jumbo Stock Issue Entry').ScreenId;
        GetUsersPermissionDetails();

        $scope.ddlAllIwoData = null;
        $scope.inv_JumboStockIssue = {};
        $scope.inv_JumboStockIssue.JIssueId = 0;
        $scope.TotalIssuedJumboWidth = 0;
        $scope.inv_JumboStockIssueDetail = {};
        $scope.inv_JumboStockIssueDetailList = [];
        $scope.IssuedJumboWidth = 0;
        $scope.IssuedRawMatQty = 0;
        $scope.IssuedRawMatUnitPrice = 0;
        $scope.IssuedJumboRollQty = 0;
        $scope.JumboWastageInMM = 0;
       

        $scope.AllCombinationlist = [];
        $scope.employeeList = [];
        $scope.DepartmentList = [];

        //GetByCombinationand();
        GetAllItem();
        GetAllEmployee();
        GetAllDepartment();
        GetAllItemUnit();
        $scope.ddlUnit = { ItemUnitId: 2 };
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.SearchJumboStockIssue = "";
        $scope.inv_JumboStockIssue.JIssueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
       // JumboStockIssueNumberGenaratorMethod();
        GetJumboStockIssuePaged(1);
        $scope.ConfirmationMessageForAdmin = false;
      //  GetUsersPermissionDetails();
        GetConfirmationMessageForAdmin();

        //$scope.selectJumbo = document.getElementById("selectJumbo").getElementsByTagName('button')[0];
        //$scope.selectJumboMenu = document.getElementById("selectJumbo").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectJumbo.setAttribute("disabled", "disabled");
        //$scope.selectJumbo.style.width = "100%";
        //$scope.selectJumboMenu.style.width = "100%";
      
        $scope.jumboList = [];
        $scope.rawList = [];
        $scope.IssuedByList = [];
        //$scope.selectRaw = document.getElementById("selectRaw").getElementsByTagName('button')[0];
        //$scope.selectRawMenu = document.getElementById("selectRaw").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectRaw.style.width = "100%";
        //$scope.selectRawMenu.style.width = "100%";
        //$scope.selectJumbo.style.width = "100%";
       
        $scope.ReceivedBy = null;
        $scope.IssuedBy = null;
        $scope.ddljumbo = null;
        $scope.ddlraw = null;

        $scope.jumboIssueIsDisabled = true;
       
        GetMaterialType();
        GetMaxJumboNumber();
        $scope.IsJumboReceiveFlag == false;
        $scope.inv_StockReceive = {};
        $scope.inv_StockReceive.IsJumboReceive = false;

        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];
        $scope.EmailSendNotification = {};
        $scope.iwoList = [];
        InternalWorkOrderGetDynamic();
    }


    function ReportNotificationDetail_Get() {


        $http({

            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'JSI',
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

                    obj.NotificationDetail = ' Jumbo Issue No : ' + $scope.inv_JumboStockIssue.JIssueNo + ' ~ Internal WorkOrder : ' + $scope.ddlAllIwoData.InternalWorkOrderNo + ' ~ Company Name: ' + $scope.ddlAllIwoData.CompanyName+' ~ Employee Name : ' + $scope.LoginUser.FullName;

                    $scope.AppNotificationLogList.push(obj);
                }
            } else {

                obj.NotificationDetail = ' Jumbo Issue No : ' + $scope.inv_JumboStockIssue.JIssueNo + ' ~ Internal WorkOrder : ' + $scope.ddlAllIwoData.InternalWorkOrderNo + ' ~ Company Name: ' + $scope.ddlAllIwoData.CompanyName + ' ~ Employee Name : ' + $scope.LoginUser.FullName;
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

    $scope.DateChangeForJumbo = function () {
        $("#txtIssueDate").focus();
        $("#txtIssueDate").trigger("click");
    }

   



    function InternalWorkOrderGetDynamic() {
        var criteria = "IWO.[IsApproved]=1";
        $http({
            url: '/InternalWorkOrder/GetInternalWorkOrderDynamic?searchCriteria=' + criteria,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (iwo) {
            $scope.iwoList = iwo;


          
        });
    }


    $scope.OpenReport = function () {
        //$scope.ddlIwoId;

        var iwoId = 0;
        if ($scope.ddlAllIwoData.InternalWorkOrderId == 0 || $scope.ddlAllIwoData.InternalWorkOrderId == undefined || $scope.ddlAllIwoData.InternalWorkOrderId == null) {
            iwoId = $scope.ddlAllIwoData.InternalWorkOrderId;
        } else {
            iwoId = $scope.ddlAllIwoData.InternalWorkOrderId;
        }
        $cookieStore.put("IWOID", iwoId);
        $window.open("#/IWOReport", "popup", "width=850,height=550,left=280,top=80");
        event.stopPropagation();
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




    function GetMaxJumboNumber() {
        var dateParts =
            ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];

        $http({
            url: '/JumboStockIssue/GetMaxJumboIssueNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxJIssueNo = data;
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
                $scope.inv_JumboStockIssue.JIssueNo = 'JIN/' + $scope.finYearEPZ + '/' + $scope.MaxJIssueNo;
               
            });

            
        });

    }

    function GetByCombinationandDepertment() {
        $('#ddlToDepartment').select2('destroy');
        $('#ddlToDepartment').val($scope.ddlFromDepartment.DepartmentId).select2();

        $http({
            url: '/Item/GetByDepartmentAndCombinationLike?departmentId=' + $scope.ddlFromDepartment.DepartmentId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllCombinationWithStocklist = JSON.parse(data);
        })

    }
    $scope.GetByCombinationandDepertment = function () {
        GetByCombinationandDepertment();
    }
    $scope.ChangeItemCategory = function (ddljumbo) {
        
        //GetByCombinationand(ddljumbo);
        GetAllItem(ddljumbo);
    }
    $scope.GetCurrentQuantity = function () {
        for (var i = 0; i < $scope.AllCombinationWithStocklist.length; i++) {
            if ($scope.ddlMaterialType != undefined && $scope.ddljumbo != undefined) {
                if ($scope.AllCombinationWithStocklist[i].ItemId == $scope.ddljumbo.ItemId && $scope.AllCombinationWithStocklist[i].MaterialTypeId == $scope.ddlMaterialType.MaterialTypeId) {
                    $scope.CurrentQuantity = $scope.AllCombinationWithStocklist[i].CurrentQuantity;
                    break;
                }
                else {
                    $scope.CurrentQuantity = 0;
                }
            }
        }
            
            
       // })
    }
    function GetAllItem(ddljumbo) {
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.rawList = [];
            $scope.AllCombinationlist = [];
            angular.forEach(data, function (aData) {
                /*if (aData.CategoryId != 4) {*/
                    aData.Combination = aData.ItemName
                        +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " + "Size Code: " +
                        aData.ItemCode +
                        " ~ " + "Sub Category: " +
                        aData.SubCategoryName;
                    $scope.AllCombinationlist.push(aData)
               /* }*/
            })


            if (ddljumbo != undefined) {

                if (ddljumbo.SubCategoryId == 16 || ddljumbo.SubCategoryId==4) {
                    angular.forEach($scope.AllCombinationlist, function (aCombination) {
                        //if (aCombination.CategoryId == 4) {
                        if (aCombination.SubCategoryId == 11 || ddljumbo.SubCategoryId == 4) {
                            $scope.rawList.push(aCombination);
                        }
                    });

                }


                else if (ddljumbo.SubCategoryId == 12) {
                    angular.forEach($scope.AllCombinationlist, function (aCombination) {
                        if (aCombination.SubCategoryId == 4 || aCombination.SubCategoryId == 14) {
                            $scope.rawList.push(aCombination);
                        }
                    });
                }

           
            }
            else {
                angular.forEach($scope.AllCombinationlist, function (aCombination) {
                    if (aCombination.SubCategoryId == 16 || aCombination.SubCategoryId == 12 || aCombination.SubCategoryId == 4) {
                        $scope.jumboList.push(aCombination);
                    }
                });
            }
            //

        });
    };
    function GetByCombinationand(ddljumbo) {
        $http({
            url: '/Item/GetCombinationWithPrice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllCombinationlist = angular.fromJson(data);
            $scope.rawList = [];



            if (ddljumbo != undefined) {
                if (ddljumbo.SubCategoryId == 16) {
                    angular.forEach($scope.AllCombinationlist, function (aCombination) {
                        if (aCombination.CategoryId == 4) {
                            $scope.rawList.push(aCombination);
                        }
                    });

                } else if (ddljumbo.SubCategoryId == 12) {
                    angular.forEach($scope.AllCombinationlist, function (aCombination) {
                        if (aCombination.SubCategoryId == 4 || aCombination.SubCategoryId == 14) {
                            $scope.rawList.push(aCombination);
                        }
                    });
                }
            } else {
                angular.forEach($scope.AllCombinationlist, function (aCombination) {
                    if (aCombination.SubCategoryId == 16 || aCombination.SubCategoryId == 12) {
                        $scope.jumboList.push(aCombination);
                    }
                });
            }
            
        });
    }

    function GetAllItemUnit() {
        $http({
            url: '/Unit/GetAllUnit',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemUnitlist = data;
            
        });
    }
    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;

            angular.forEach($scope.employeeList, function (aEmployee) {
                $scope.IssuedByList.push(aEmployee);
              
            });
            $scope.jumboIssueIsDisabled = false;
           
            
          

        });
    }
    $scope.jumboIssueIsDisabledInStore = false;
    $scope.DepartmentDisabled = function () {
        $scope.jumboIssueIsDisabledInStore = false;
        $scope.SecialDdlDisabled = false;
    }

    $scope.JumboIssuedByDisabled = function () {
        $scope.jumboIssueIsDisabledInStore = false;
        $scope.RecivedSecialDdlDisabled = false;
    }

    function GetAllDepartment() {

        $http({
            url: '/User/GetUserDepartmentByUserId?userId=' + $scope.LoginUser.UserId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data, function (aData) {
                aData.DepartmentName = aData.DepartmentName + ' ~ ' + aData.BranchName;
                $scope.DepartmentList.push(aData);
            })
            $scope.jumboIssueIsDisabled = false;
            
        });
    }
  

    $scope.JumboRollQtyCalculetion = function () {
    
         $scope.TotalWidth = 0;
     
        $scope.IssuedRawMatUnitPrice = parseFloat(($scope.ddljumbo.ValuationPrice * $scope.IssuedJumboRollQty).toFixed(2));
        $scope.TotalWidth = parseFloat(($scope.ddljumbo.ValuationPrice * $scope.IssuedJumboWidth) / ($scope.ddljumbo.CurrentWidth));

        

        if ($scope.ddlraw != null) {
          
            $scope.IssuedRawMatQty = 0;
            if ($scope.ddlraw.RollLenghtInMeter == undefined || $scope.ddlraw.RollLenghtInMeter == null) {
                $scope.ddlraw.RollLenghtInMeter = 1;
                $scope.IssuedRawMatQty = parseFloat(($scope.ddljumbo.RollWidthInMeter / ($scope.IssuedJumboWidth + $scope.JumboWastageInMM)).toFixed(2));
            } else {
                $scope.IssuedRawMatQty = parseFloat(($scope.ddljumbo.RollWidthInMeter / ($scope.IssuedJumboWidth + $scope.JumboWastageInMM)).toFixed(2));  
            }
        }
        else {
            $scope.IssuedJumboRollQty = parseFloat((($scope.IssuedJumboWidth + $scope.JumboWastageInMM) / ($scope.ddljumbo.RollWidthInMeter)).toFixed(2));
            $scope.IssuedRawMatQty = $scope.IssuedJumboRollQty;
        }

      

    }

    function GetMaterialType() {

        $http({
            url: "/MaterialType/GetAllMaterialType",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.MaterialTypeList = data;
            angular.forEach($scope.MaterialTypeList, function (aData) {
                aData.MaterialType = aData.MaterialTypeName + ' ~ ' + aData.MaterialTypeCode;
            })

        })
    }


    $scope.AddJumboIssuedDetail = function () {

        if ($scope.ddlraw == null || $scope.ddlraw == undefined) {
            $scope.inv_JumboStockIssueDetail.RawItemId = $scope.ddljumbo.ItemId;
            $scope.inv_JumboStockIssueDetail.RawItemName = $scope.ddljumbo.Combination;
         
        } else {
            $scope.inv_JumboStockIssueDetail.RawItemId = $scope.ddlraw.ItemId;
            $scope.inv_JumboStockIssueDetail.RawItemName = $scope.ddlraw.Combination;
        }


        $scope.inv_JumboStockIssueDetail.JumboItemName = $scope.ddljumbo.Combination;
        //$scope.inv_JumboStockIssueDetail.JumboItemId = $scope.ddljumbo.ItemId;
        $scope.inv_JumboStockIssueDetail.MaterialTypeId = $scope.ddlMaterialType.MaterialTypeId;
        $scope.inv_JumboStockIssueDetail.DepartmentId = $scope.ddlFromDepartment.DepartmentId;
      
      
        //$scope.inv_JumboStockIssueDetail.IssuedJumboWidth = $scope.IssuedJumboWidth;
       
        $scope.inv_JumboStockIssueDetail.IssuedRawMatQty = $scope.IssuedRawMatQty;
        //$scope.inv_JumboStockIssueDetail.CurrentWidth = $scope.ddljumbo.CurrentWidth;
        $scope.inv_JumboStockIssueDetail.RawItemUnitId = $scope.ddlUnit.ItemUnitId;
        $scope.inv_JumboStockIssueDetail.IssuedJumboRollQty = $scope.IssuedJumboRollQty;
        if (isNaN($scope.IssuedRawMatUnitPrice)) {
            $scope.inv_JumboStockIssueDetail.IssuedRawMatUnitPrice =0;
        } else {
            $scope.inv_JumboStockIssueDetail.IssuedRawMatUnitPrice = $scope.IssuedRawMatUnitPrice;
        }
     
       
        if ($scope.JumboWastageInMM != null) {
            $scope.inv_JumboStockIssueDetail.JumboWastageInMM = $scope.JumboWastageInMM;
        } else {
            $scope.inv_JumboStockIssueDetail.JumboWastageInMM = 0;
        }

        $scope.inv_JumboStockIssueDetailList.push($scope.inv_JumboStockIssueDetail);

        $scope.inv_JumboStockIssueDetail = {};
        $scope.ddlRaw = null;
        $scope.IssuedRawMatQty = 0;
        $scope.IssuedRawMatUnitPrice = 0;

        //$scope.JumboWastageInMM = null;

        $('#ddlrawMatId').select2('destroy');
        $('#ddlrawMatId').val('').select2({
            placeholder: "Select Item",
            theme: "classic",
            dropdownAutoWidth: false
        });
    }

    $scope.removeJumboIssuedDetail = function (inv_JumboStockIssueDetail) {
        var ind = $scope.inv_JumboStockIssueDetailList.indexOf(inv_JumboStockIssueDetail);
        $scope.inv_JumboStockIssueDetailList.splice(ind, 1);
        //$scope.inv_JumboStockIssueDetail = {};

        //$scope.TotalIssuedJumboWidth -= (inv_JumboStockIssueDetail.IssuedJumboWidth + inv_JumboStockIssueDetail.JumboWastageInMM);

        //if ($scope.inv_JumboStockIssueDetailList.length == 0) {
        //    $scope.selectJumbo.removeAttribute("disabled");
        //} else {
        //    $scope.selectJumbo.setAttribute("disabled", "disabled");
        //}
    }

    $scope.SaveJumboStockIssue = function () {

        if ($scope.ConfirmationMessageForAdmin) {

            if (($scope.inv_JumboStockIssue.JIssueId == 0 || $scope.inv_JumboStockIssue.JIssueId ) && $scope.CreatePermission) {

                SaveJumboStockIssue('Saved');

            }
            else if ($scope.inv_JumboStockIssue.JIssueId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }

        }



        
    }

    

    function SaveJumboStockIssue(Status) {

        alertify.confirm('Are you sure to ' + Status + '?', function (e) {
           
            if (e) {

                $scope.inv_JumboStockIssue.JIssueDate = $scope.inv_JumboStockIssue.JIssueDate;
                $scope.inv_JumboStockIssue.DepartmentId = $scope.ddlFromDepartment.DepartmentId;
                //$scope.inv_JumboStockIssue.ddlToDepartment = $scope.ddlFromDepartment.DepartmentId;
                $scope.inv_JumboStockIssue.IssuedById = $scope.IssuedBy.EmployeeId;
                //$scope.inv_JumboStockIssue.ReceivedById = $scope.ReceivedBy.EmployeeId;

                $scope.inv_JumboStockIssue.JumboItemId = $scope.ddljumbo.ItemId;
                $scope.inv_JumboStockIssue.MaterialTypeId = $scope.ddlMaterialType.MaterialTypeId;
                $scope.inv_JumboStockIssue.IssuedJumboRollQty = $scope.IssuedJumboRollQty;
                $scope.inv_JumboStockIssue.JumboItemUnitId = $scope.ddljumbo.ItemUnitId;
                $scope.inv_JumboStockIssue.JumboWastageInMM = $scope.JumboWastageInMM;

                $scope.inv_JumboStockIssue.UpdatorId = $scope.LoginUser.UserId;
                $scope.inv_JumboStockIssue.CreatorId = $scope.LoginUser.UserId;

                if ($scope.ddlAllIwoData == null || $scope.ddlAllIwoData == undefined) {
                    $scope.inv_JumboStockIssue.InternalWorkOrderId = 0;
                } else {
                    $scope.inv_JumboStockIssue.InternalWorkOrderId = $scope.ddlAllIwoData.InternalWorkOrderId;
                }
             
                //$scope.inv_JumboStockIssueDetailListFilter = [];
                //angular.forEach($scope.inv_JumboStockIssueDetailList, function (aData) {

                //    if ($scope.IssuedRawMatQty == null || $scope.IssuedRawMatQty == 0) {
                //        $scope.IssuedRawMatQty = 0;
                //    }

                //    if ($scope.IssuedJumboRollQty == null || $scope.IssuedJumboRollQty == 0) {
                //        $scope.IssuedJumboRollQty = 0;
                //    }

                //    aData.IssuedJumboWidth = $scope.ddljumbo.RollWidthInMeter * aData.IssuedJumboRollQty;
                //    $scope.inv_JumboStockIssueDetailListFilter.push(aData);
                //});

                var params = JSON.stringify({ inv_JumboStockIssue: $scope.inv_JumboStockIssue, inv_JumboStockIssueDetail: $scope.inv_JumboStockIssueDetailList });
                console.log(params);
                $http.post('/JumboStockIssue/Post', params).success(function (data) {
                    AppNotificationLogPost("Jumbo Issue");
                    var issueNoWithIds = data.split(",");
                    var IssueNo = issueNoWithIds[1];
                    var issueids = issueNoWithIds[0];
                    var issueId = Number(issueids);
                    
                    EmailSend();
                    //ResetClear();
                    Clear();
                    if (data != "") {

                       

                        alertify.log('Jumbo Stock Issue NO ' + IssueNo + ' ' + Status + ' Successfully!', 'success', '5000');

                    } else {
                        alertify.log('Save failed, refresh page and try again', 'error', '5000');
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
            }
        })
    }

    function EmailSend() {


        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })

     
        $scope.EmailSendNotification.EmailSubject = "Jumbo Issue";
        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var currentDate = new Date();
        var CreatedDate = $filter('date')(currentDate.toJSON().slice(0, 10), 'dd/MM/yyyy');

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> A new Jumbo And Raw Issue has been Created. <br/> ' +
            'Jumbo And Raw : <strong > ' + $scope.inv_JumboStockIssue.JIssueNo + '</strong><br/>' +
            'Jumbo Date: <strong>' + ($filter('date')($scope.inv_JumboStockIssue.JIssueDate, 'dd/MM/yyyy')).toString() + '</strong><br/>' +
            'Issued by: <strong>' + $scope.IssuedBy.FullName + '</strong>' + '<br/>' +
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



    $scope.SecialDdlDisabled = false;
    $scope.RecivedSecialDdlDisabled = false;
    $scope.ResetForm = function () {
        ResetClear();
       
    }

    function ResetClear() {


        $scope.inv_JumboStockIssue.JIssueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy');
        $scope.SecialDdlDisabled = true;
        $('#IssuedBy').select2('destroy');
        $('#IssuedBy').val('').select2({
            placeholder: "Issued By"
        });

        $('#ReceivedBy').select2('destroy');
        $('#ReceivedBy').val('').select2({
            placeholder: "Received By"
        });

        $('#ddlrawMatId').select2('destroy');
        $('#ddlrawMatId').val('').select2({
            placeholder: "Select Item"
        });

        $('#ddljumboId').select2('destroy');
        $('#ddljumboId').val('').select2({
            placeholder: "Select Jumbo"
        });

        $('#ddlFromDepartment').select2('destroy');
        $('#ddlFromDepartment').val('').select2({
            placeholder: "Select Department"
        });

        $('#ddlToDepartment').select2('destroy');
        $('#ddlToDepartment').val('').select2({
            placeholder: "To Department"
        });

        $scope.inv_StockReceive.IsJumboReceive = false;
        $scope.inv_JumboStockIssueDetailList = [];

        $scope.JumboWastageInMM = 0;
        $scope.IssuedRawMatQty = 0;
        $scope.IssuedRawMatUnitPrice = 0;
        $scope.IssuedJumboRollQty = 0;
        $scope.IssuedJumboWidth = 0;
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


    $scope.reloadBtn = function () {
        $('#txtFromDateForJS').val('');
        $('#txtToDateForJS').val('');
        $('#textJumboStockIssue').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchJumboStockIssue = null;
        GetJumboStockIssuePaged(1);
    }
    $scope.OpenPopupWindow = function (JumboStockIssueObj) {
        $window.open("#/JumboStockIssueReport", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("JumboStockIssueObj", JumboStockIssueObj);

        event.stopPropagation();
    };
    $scope.JumboStockIssueSearch = function () {
        GetJumboStockIssuePaged(1);

    }

    function GetJumboStockIssuePaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForJS").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForJS").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";
        if ($scope.SearchJumboStockIssue != undefined && $scope.SearchJumboStockIssue != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([JIssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([JIssueNo] LIKE '%" + $scope.SearchJumboStockIssue + "%' OR [JumboItemName] LIKE '%" + $scope.SearchJumboStockIssue + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchJumboStockIssue !== undefined && $scope.SearchJumboStockIssue != null && $scope.SearchJumboStockIssue != "") {
            SearchCriteria = "[JIssueNo] LIKE '%" + $scope.SearchJumboStockIssue + "%' OR [JumboItemName] LIKE '%" + $scope.SearchJumboStockIssue + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[JIssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }

        $http({
            url: encodeURI('/JumboStockIssue/JumboIssuedGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.JIssueDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.JIssueDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.JIssueDate = date1;
                    }
                })

            }
            else {
                alertify.log('Jumbo Stock Issue  Not Found', 'error', '5000');
            }
            $scope.JumboStockIssueListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;

            
        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetJumboStockIssuePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetJumboStockIssuePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetJumboStockIssuePaged($scope.currentPage);
        }


    }

    $("#txtFromDateForJS").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForJS = function () {
        $("#txtFromDateForJS").focus();
        $("#txtFromDateForJS").trigger("click");
    }


    $("#txtToDateForJS").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForJS = function () {
        $("#txtToDateForJS").focus();
        $("#txtToDateForJS").trigger("click");
    }

})