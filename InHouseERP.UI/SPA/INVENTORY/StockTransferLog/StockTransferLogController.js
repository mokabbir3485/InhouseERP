
app.controller("StockTransferLogController", function ($scope, $cookieStore, $http, $filter, $rootScope, $window) {

    Clear();

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    //if ($rootScope.$PermissionList !== undefined) {
    //    $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Stock Transfer Log').ScreenId;
    //    GetUsersPermissionDetails();
    //}
    //else {
    //    setTimeout(function () {
    //        $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Stock Transfer Log').ScreenId;
    //        GetUsersPermissionDetails();
    //    }, 500);
    //}

    var PermissionData = sessionStorage.getItem("PermissionDataSession");
    if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
    $scope.ScreenId = Permission.find(v => v.ScreenName == 'Stock Transfer Log').ScreenId;
    GetUsersPermissionDetails();

    function Clear() {

        $scope.Name="Stock Transfer Log"
        $scope.Storelist = [];
        GetAllStore();

        $scope.TransferType = [
            { StockTransferTypeId: 1, StockTransferTypeName: 'Material Return' },
            { StockTransferTypeId: 2, StockTransferTypeName: 'ISTM' },
            { StockTransferTypeId: 3, StockTransferTypeName: 'Store to Store Transfer' },
            { StockTransferTypeId: 4, StockTransferTypeName: 'Item To Item Transfer' },
            { StockTransferTypeId: 5, StockTransferTypeName: 'Issue' },

        ];

        $scope.ItemCombinationList = [];
        GetByCombinationand();

        $scope.StockTransferLogList = [];

        $scope.matrialPaperTypeList = [];
        GetAllmatrialpaperType();

    }



    $("#txtFromDateForRC").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForRecived = function () {
        $("#txtFromDateForRC").focus();
        $("#txtFromDateForRC").trigger("click");
    }


    $("#txtToDateForRC").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForRecived = function () {
        $("#txtToDateForRC").focus();
        $("#txtToDateForRC").trigger("click");
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

    $("#SelectitemName").select2({
        //placeholder: "Search for: Item Name ~ Description ~ Size Code ~ Sub Category",
        dropdownAutoWidth: false,
        templateResult: formatOutput,
        width: 'resolve'
    });


    function formatOutput(optionElement) {
        //if (!optionElement.id) { return optionElement.text; }
        var ItemCombination = '';
        var DescriptionPart = optionElement.text.split('Sub Category: ');
        var SubCategoryName = DescriptionPart[1];
        if (SubCategoryName == 'Pre Printed Label') {
            //ItemCombination = '<strong style="background-color: #dd4b39; color: white;">' + DescriptionPart[0] + 'Sub Category: ' + DescriptionPart[1] + '</strong>';
            ItemCombination = '<strong style="background-color: #dd4b39; color: white;">' + DescriptionPart[0] + '</strong>';
        } else {
            //ItemCombination = DescriptionPart[0] + 'Sub Category: ' + DescriptionPart[1];
            ItemCombination = DescriptionPart[0];
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
            //$scope.AllCombinationlist = angular.fromJson(data);
            // $scope.ItemCombinationList = angular.fromJson(data);
            angular.forEach(data, function (aData) {
               // if (aData.CategoryId != 4) {

                    aData.TempItemName = aData.ItemName +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemCode
                        +
                        " ~ " + "Sub Category: " +
                        aData.SubCategoryName;

                    $scope.ItemCombinationList.push(aData)
               // }



            })




        })
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




    $scope.onLoadBtn = function () {
        LoadFormStockTransferLog();
    }

    function LoadFormStockTransferLog() {

        var ItemId = null;
        var PaperTypeId = null;
        $scope.StockTransferType = null;

        var isValid1 = true;
        var isValid2 = true;
        var isValid3 = true;
        var isValid4 = true;

        if ($scope.ddlStore == null || $scope.ddlStore == undefined) {
            isValid1 = false;
            alertify.log('From Store can`t be empty', 'error', '5000');
            return;
        }

        if ($scope.ddlTransferType == null || $scope.ddlTransferType == undefined) {
            //isValid2 = false;
            //alertify.log('Transfer type can`t be empty', 'error', '5000');
            //return;
            $scope.StockTransferType = null;
        } else {
            $scope.StockTransferType = $scope.ddlTransferType.StockTransferTypeId;
        }
     
        if ($scope.ItemSearchCombination == undefined || $scope.ItemSearchCombination == null) {
            ItemId=null;
        } else {
             ItemId=$scope.ItemSearchCombination.ItemId
        }
      
        if ($scope.ddlmatrialPaperType == null || $scope.ddlmatrialPaperType == undefined) {
            PaperTypeId = null;
        } else {
             PaperTypeId = $scope.ddlmatrialPaperType.MaterialTypeId;
        }

       
       
        if ($scope.FromDate == '' || $scope.FromDate == undefined) {
            isValid3 = false;
            alertify.log('From Date can`t be empty', 'error', '5000');
            return;
        }

        if ($scope.ToDate == '' || $scope.ToDate ==null) {
            isValid4 = false;
            alertify.log('To Date can`t be empty', 'error', '5000');
            return;
        }

        if (isValid1 && isValid3 && isValid4) {

            $http({
                url: '/IssueWithoutRequisition/StockTransferLog?FromDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate + '&DepartmentId=' + $scope.ddlStore.DepartmentId + '&StockTransferTypeId=' + $scope.StockTransferType + '&ItemId=' + ItemId + '&MaterialTypeId='+ PaperTypeId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (aData) {
                $scope.StockTransferLogList = aData;

                angular.forEach($scope.StockTransferLogList,function (aData) {
                    var res1 = aData.StockTransferDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.StockTransferDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aData.StockTransferDate = date1;
                    }
                })
            });
        }

        $scope.selectedAll = false;
        
    }


    $scope.checkFilterLis = function (aItem) {
       // aItem.IsCheck = true;

        //angular.forEach($scope.StockTransferLogList, function (aData) {
        //    if (aItem.IsCheck == false) {
        //        $scope.selectedAll = false;
        //    } else {
        //        $scope.selectedAll = true;
        //    }
        //});

        $scope.StockTransferLogListFilter = $scope.StockTransferLogList.filter((aData) => aData.IsCheck == true)

        if ($scope.StockTransferLogListFilter.length == $scope.StockTransferLogList.length) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }

        


    }

    $scope.checkAll = function () {

        angular.forEach($scope.StockTransferLogList, function (aData) {
            aData.IsCheck = $scope.selectedAll;
        });

    }

    $scope.OpenReport = function () {

        $scope.StockTransferCheckList = $scope.StockTransferLogList.filter((aData) => aData.IsCheck == true);
       
        var obj = {};
        obj.DepartmentName = $scope.ddlStore.DepartmentName;
        obj.FromDate = $scope.FromDate;
        obj.ToDate = $scope.ToDate;
   
        if ($scope.StockTransferCheckList.length > 0) {
            sessionStorage.setItem("GetByStockTransferLogReport", JSON.stringify($scope.StockTransferCheckList));
            $cookieStore.put("GetDropdowanValue", obj);

            $window.open("#/StockTransferLogReport", "popup", "width=850,height=550,left=280,top=80");
        } else {
            alertify.log('Must be Item Load and check !!!', 'error', '5000');
        }
       

      

    }


});