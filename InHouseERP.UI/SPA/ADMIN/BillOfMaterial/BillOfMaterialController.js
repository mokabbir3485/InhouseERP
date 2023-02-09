app.controller("BillOfMaterialController", function ($scope, $rootScope, $cookieStore, $http, $filter, $window) {

    Clear();

    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Bill Of Material').ScreenId;
        GetUsersPermissionDetails();

        
        $scope.FinishedGoodList = [];
        $scope.RawMaterialList = [];
        $scope.OverheadList = [];
        $scope.OverheadDetailList = [];
        $scope.OverheadDetailListUI = [];
        $scope.PackingDetailListUI = [];
        $scope.ServiceDetailListUI = [];
        $scope.OverheadDetail = {};
        $scope.BillOfMaterial = {};
        $scope.BillOfMaterial.BillOfMaterialId = 0;
        $scope.BillOfMaterialDetail = {};
        $scope.BillOfMaterialDetaillist = [];
        $scope.ddlRawMaterial = null;
        $scope.ddlFinishedGood = null;
        GetAllItemUnit();
        GetOverhead();
        GetAllFinishedGood();
        GetAllRawMaterial();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetBillOfMaterialPaged($scope.currentPage);

        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        //GetUsersPermissionDetails();
        LoadForBillOfMatrialNo();
    }



    //<<<===========  Bill Of Matrial No ===========>>>>


    $("#txtSubmitDate").datepicker({
        dateFormat: "M d yy",
       

    });



    function LoadForBillOfMatrialNo() {

        //var dateParts =
        //    ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        //var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
        $http({
            url: '/BillOfMaterial/GetMaxBillOfMaterialNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (BomNo) {
            $scope.MaxBillOfNo = BomNo;
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
                $scope.BillOfMaterial.BillOfMaterialNo = 'BOM/' + $scope.finYearEPZ + '/' + $scope.MaxBillOfNo;
            });
         
            
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
    function GetOverhead() {
        $http({
            url: '/OverHead/GetAllOverhead',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.OverheadList = data;
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
            $scope.ItemUnitlistM = angular.copy(data);
            
        });
    }
    $scope.AddOverheadDetail = function () {
        $scope.OverheadDetail.SectorType = "Overhead";
        $scope.OverheadDetailListUI.push($scope.OverheadDetail);
        $scope.OverheadDetail = {};
        $scope.ddlOverhead = null;
    }
    $scope.RemoveOverHead = function (index) {
        $scope.OverheadDetailListUI.splice(index, 1);
    }


    $scope.AddPackingDetail = function () {
        $scope.OverheadDetail.SectorType = "Packing";
        $scope.OverheadDetail.SectorName = $scope.OverheadDetail.PackingSectorName;
        $scope.OverheadDetail.Amount = $scope.OverheadDetail.PackingAmount;

        $scope.PackingDetailListUI.push($scope.OverheadDetail);
        $scope.OverheadDetail = {};
        $scope.ddlOverhead = null;
    }
    $scope.RemovePacking = function (index) {
        $scope.PackingDetailListUI.splice(index, 1);
    }

    $scope.AddServiceDetail = function () {
        $scope.OverheadDetail.SectorType = "Service";
        $scope.OverheadDetail.SectorName = $scope.OverheadDetail.ServiceSectorName;
        $scope.OverheadDetail.Amount = $scope.OverheadDetail.ServiceAmount;
        $scope.ServiceDetailListUI.push($scope.OverheadDetail);
        $scope.OverheadDetail = {};
        $scope.ddlOverhead = null;
    }
    $scope.RemoveService = function (index) {
        $scope.ServiceDetailListUI.splice(index, 1);
    }



    function GetAllFinishedGood() {
        var criteria = "C.CategoryId=1";
        $http({
            url: '/Item/GetItemDynamic?searchCriteria=' + criteria + "&orderBy=ItemId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.FinishedGoodList = data;
            angular.forEach($scope.FinishedGoodList,
                function (aData) {
                    aData.TempItemName = aData.ItemName +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemDescriptionTwo +
                        " ~ " +
                        aData.ItemCode +
                        " ~ " +
                        aData.UnitPerPackage +
                        " ~ " +
                        aData.PackagePerContainer +
                        " ~ " +
                        aData.HsCode +
                        " ~ " +
                        aData.ItemId;

                    aData.ItemName = aData.ItemName +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemDescriptionTwo;
                });
            
        })
    }

    function GetAllRawMaterial() {
        var criteria = "C.CategoryId=4";
        $http({
            url: '/Item/GetItemDynamic?searchCriteria=' + criteria + "&orderBy=ItemId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.RawMaterialList = data;
            angular.forEach($scope.RawMaterialList,
                function (aData) {
                    aData.TempItemName = aData.ItemName +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemDescriptionTwo +
                        " ~ " +
                        aData.ItemCode +
                        " ~ " +
                        aData.UnitPerPackage +
                        " ~ " +
                        aData.PackagePerContainer +
                        " ~ " +
                        aData.HsCode +
                        " ~ " +
                        aData.ItemId;
                    aData.ItemName = aData.ItemName +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemDescriptionTwo;
                });
            
        })
    }

    $scope.AddBillOfMaterialDetail = function () {
       
        $scope.BillOfMaterialDetail.UnitName = $scope.ddlMuDetail.UnitName;
        $scope.BillOfMaterialDetaillist.push($scope.BillOfMaterialDetail);
        $scope.BillOfMaterialDetail = {};
        $scope.ddlRawMaterial = null;

        setTimeout(function () {
            $("#ddlRawMaterial").select2({
                placeholder: "Search for: Raw Material ~ Description One ~ Description Two ~ Item Code ~ Pc(s) Per Roll ~ Roll Per Carton ~ Hs Code",
                theme: "classic",
                dropdownAutoWidth: false
            }).val('').trigger("change");

        }, 0);
    }
    $scope.RemoveBillOfMaterialDetail = function (index) {
        $scope.BillOfMaterialDetaillist.splice(index, 1);
    }
    $scope.CalValue = function () {
        
        $scope.BillOfMaterialDetail.TotalValue = $scope.BillOfMaterialDetail.TotalProduction * $scope.BillOfMaterialDetail.UnitPrice;
    }
    $scope.WastageCalculetion = function () {
        $scope.BillOfMaterialDetail.WastageAmount = ($scope.BillOfMaterialDetail.WastagePercentage / 100) * $scope.BillOfMaterialDetail.Qty;
        $scope.BillOfMaterialDetail.TotalProduction = $scope.BillOfMaterialDetail.Qty - $scope.BillOfMaterialDetail.WastageAmount;
    }

    function PostBillOfMaterial() {
        $scope.BillOfMaterial.UpdatorId = $scope.LoginUser.UserId;
        $scope.OverheadDetailList = $scope.OverheadDetailListUI.concat($scope.PackingDetailListUI, $scope.ServiceDetailListUI);
       
        $scope.BillOfMaterial.BillOfMaterialNo = $scope.BillOfMaterial.BillOfMaterialNo;
        var parms = JSON.stringify({ BillOfMaterial: $scope.BillOfMaterial, BillOfMaterialDetaillist: $scope.BillOfMaterialDetaillist, OverheadDetailList: $scope.OverheadDetailList });
        $http.post('/BillOfMaterial/Save', parms).success(function (data) {
            if (data != '') {
                alertify.log('Bill Of Material No:' + data + 'Save Successfully!', 'success', '5000');
                Clear();
                setTimeout(function () {
                    $("#ddlFinishedGood").select2({
                        placeholder: "Search for: Finished Good ~ Description One ~ Description Two ~ Item Code ~ Pc(s) Per Roll ~ Roll Per Carton ~ Hs Code",
                        theme: "classic",
                        dropdownAutoWidth: false
                    }).val('').trigger("change");

                }, 0);
                $scope.BillOfMaterialForm.$setPristine();
                $scope.BillOfMaterialForm.$setUntouched();

            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }
    $scope.SaveBillOfMaterial = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.BillOfMaterial.BillOfMaterialId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostBillOfMaterial();
                    }
                })
            }
            else if ($scope.BillOfMaterial.BillOfMaterialId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.BillOfMaterial.BillOfMaterialId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostBillOfMaterial();
                    }
                })
            }
            else if ($scope.BillOfMaterial.BillOfMaterialId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.BillOfMaterial.BillOfMaterialId == 0 && $scope.CreatePermission) {
                PostBillOfMaterial();
            }
            else if ($scope.BillOfMaterial.BillOfMaterialId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.BillOfMaterial.BillOfMaterialId > 0 && $scope.RevisePermission) {
                PostBillOfMaterial();
            }
            else if ($scope.BillOfMaterial.BillOfMaterialId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }

        
    }

    $scope.SelBillOfMaterial = function (aBillOfMaterial) {
        window.scrollTo(0, 0);
        $scope.BillOfMaterial = aBillOfMaterial;

        $scope.ddlFinishedGood = { "ItemId": aBillOfMaterial.ItemId };
        setTimeout(function () {
            $("#ddlFinishedGood").select2().val(aSO.CompanyId).trigger("change");

        }, 0);


        $http({
            url: "/BillOfMaterial/GetBillOfMaterialDetailByBillOfMaterialId?BOMId=" + aBillOfMaterial.BillOfMaterialId,
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (BOMDetailData) {
            $scope.BillOfMaterialDetaillist = BOMDetailData;
        });

        //////////////////////////////////

        $http({
            url: "/BillOfMaterial/GetBillOfMaterialOverheadByBillOfMaterialId?BOMId=" + aBillOfMaterial.BillOfMaterialId + "&SectorType=Overhead",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            if (data.length) {
                $scope.OverheadDetailListUI = data;
            }
        });

        $http({
            url: "/BillOfMaterial/GetBillOfMaterialOverheadByBillOfMaterialId?BOMId=" + aBillOfMaterial.BillOfMaterialId + "&SectorType=Packing",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            if (data.length) {
                $scope.PackingDetailListUI = data;
            }
        });

        $http({
            url: "/BillOfMaterial/GetBillOfMaterialOverheadByBillOfMaterialId?BOMId=" + aBillOfMaterial.BillOfMaterialId + "&SectorType=Service",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            if (data.length) {
                $scope.ServiceDetailListUI = data;
            }
        });

        var isCreateDate = isNaN(aBillOfMaterial.CreateDate);

        if (isCreateDate == true) {
            var res1 = aBillOfMaterial.CreateDate.substring(0, 5);
            if (res1 == "/Date") {
                var parsedDate1 = new Date(parseInt(aBillOfMaterial.CreateDate.substr(6)));
                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                aBillOfMaterial.CreateDate = date1;
            }
        }

        
    }

    $scope.BOMReportBtn = function (BillOfMaterial) {
        $window.open("#/Mushak4_3", "popup", "width=850,height=550,left=280,top=80");
        //var BillOfMaterialObj = BillOfMaterial;
        //sessionStorage.setItem("BillOfMaterialObj", JSON.stringify(BillOfMaterialObj));
        $cookieStore.put("BillOfMaterialObj", BillOfMaterial);
        event.stopPropagation();

    };

    $scope.resetForm = function () {
        Clear();
        setTimeout(function () {
            $("#ddlFinishedGood").select2({
                placeholder: "Search for: Finished Good ~ Description One ~ Description Two ~ Item Code ~ Pc(s) Per Roll ~ Roll Per Carton ~ Hs Code",
                theme: "classic",
                dropdownAutoWidth: false
            }).val('').trigger("change");

        }, 0);
    }


    $scope.reloadBtn = function () {
        $('#txtFromDateForBOM').val('');
        $('#txtToDateForBOM').val('');
        $('#textBillOfMaterialNo').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchBillOfMaterialNo = null;
        GetBillOfMaterialPaged(1);
    }

    $scope.BillOfMaterialSearch = function () {
        GetBillOfMaterialPaged(1);

    }

    function GetBillOfMaterialPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForBOM").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForBOM").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchBillOfMaterialNo != undefined && $scope.SearchBillOfMaterialNo != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([DeliveryDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([BillOfMaterialNo] LIKE '%" + $scope.SearchBillOfMaterialNo + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchBillOfMaterialNo !== undefined && $scope.SearchBillOfMaterialNo != null && $scope.SearchBillOfMaterialNo != "") {
            SearchCriteria = "[BillOfMaterialNo] LIKE '%" + $scope.SearchBillOfMaterialNo + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[DeliveryDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/BillOfMaterial/GetBillOfMaterialPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.SubmitDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SubmitDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.SubmitDate = date1;
                    }
                    if (aSd.DeliveryDate != null) {
                        var res2 = aSd.DeliveryDate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate2 = new Date(parseInt(aSd.DeliveryDate.substr(6)));
                            var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                            aSd.DeliveryDate = date2;
                        }
                    }


                })

            }
            else {
                alertify.log('Bill Of Material  Not Found', 'error', '5000');
            }
            $scope.BillOfMaterialListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;

            
        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetBillOfMaterialPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetBillOfMaterialPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetBillOfMaterialPaged($scope.currentPage);
        }
        //  }


    }
    
    

    $("#txtDeliveryDate").datepicker({
        dateFormat: "M d yy",
        
    });
    //$scope.PBDateChange = function () {
    //    $("#txtSubmitDate").focus();
    //    $("#txtSubmitDate").trigger("click");

    //}
    ////////////////////////

    $("#txtFromDateForBOM").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForBOM = function () {
        $("#txtFromDateForBOM").focus();
        $("#txtFromDateForBOM").trigger("click");
    }


    $("#txtToDateForBOM").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForBOM = function () {
        $("#txtToDateForBOM").focus();
        $("#txtToDateForBOM").trigger("click");
    }

});