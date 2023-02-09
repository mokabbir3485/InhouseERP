app.controller("SupplierOpeningBalanceEntryController", function ($scope, $rootScope, $cookieStore, $http, $window, $filter) {
    
    Clear();


    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var Valuation = sessionStorage.getItem("ValuationSession");
        if (Valuation != null) {
            $scope.CurrentValuationSetup = JSON.parse(sessionStorage.ValuationSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Supplier Opening Balance').ScreenId;
        GetUsersPermissionDetails();
    

        $scope.FinancialCycleList = [];
        $scope.pay_OpeningBalance = {};
        $scope.pay_OpeningBalance.OpeningBalanceId = 0;
        $scope.ddlSupplier = {};
        GetActiveSupplier();
        GetDynamicFiscalYear();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.SearchSupplierName = "";
        GetSupplierOpeningBalancePaged(1);
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
       // GetUsersPermissionDetails();

        $scope.pay_OpeningBalance.OpeningDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
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

    function GetActiveSupplier() {
        $http({
            url: '/Supplier/GetDynamic?searchCriteria=IsActive=1&orderBy=SupplierName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierList = data;
        })
    }

    function GetDynamicFiscalYear() {
        criteria = 'BranchId=1 and IsActive=1';
        $http({
            url: '/FiscalYear/GetDynamic?searchCriteria=' + criteria + '&orderBy=FiscalYearId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.FinancialCycleList = data;
        })
    }

    $scope.SaveOpeningBalance = function () {
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $scope.pay_OpeningBalance.UpdatorId = $scope.LoginUser.UpdatorId;
                $scope.pay_OpeningBalance.CreatorId = $scope.LoginUser.CreatorId;
                //$scope.pay_OpeningBalance.OpeningBalanceNo = 'Opn/' + $scope.ddlFinancialCycle.FinancialCycleYear + '/' + $scope.ddlSupplier.SupplierId;
                $scope.pay_OpeningBalance.SupplierId = $scope.ddlSupplier.SupplierId;
                var params = JSON.stringify({ pay_SupplierOpeningBalance: $scope.pay_OpeningBalance });
                console.log(params);
                $http.post('/SupplierOpeningBalance/Post', params).success(function (data) {
                    if (data > 0) {
                        alertify.log('Opening Balance saved successfully!', 'success', '5000');
                        $scope.ResetForm();
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
            }
        })
    }
    function PostOpeningBalance() {
        var criteria = '';
        if ($scope.ddlSupplier != null && $scope.ddlFinancialCycle != null && $scope.pay_OpeningBalance.OpeningBalanceId == 0) {
            criteria = 'SupplierId=' + $scope.ddlSupplier.SupplierId + ' and FiscalYearId=' + $scope.ddlFinancialCycle.FiscalYearId;
            $http({
                url: '/SupplierOpeningBalance/GetSupplierOpeningBalanceDynamic?searchCriteria=' + criteria + '&orderBy=OpeningBalanceId',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                if (data.length > 0) {
                    alertify.log('This Supplier and This Year Opening Balance is Found !!!', 'error', '5000');
                } else {
                    Save();
                }
            })
        } else {
            Save();
        }
    }
    $scope.SaveOpeningBalance = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.pay_OpeningBalance.OpeningBalanceId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostOpeningBalance();
                    }
                })
            }
            else if ($scope.pay_OpeningBalance.OpeningBalanceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pay_OpeningBalance.OpeningBalanceId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostOpeningBalance();
                    }
                })
            }
            else if ($scope.pay_OpeningBalance.OpeningBalanceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.pay_OpeningBalance.OpeningBalanceId == 0 && $scope.CreatePermission) {
                PostOpeningBalance();
            }
            else if ($scope.pay_OpeningBalance.OpeningBalanceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.pay_OpeningBalance.OpeningBalanceId > 0 && $scope.RevisePermission) {
                PostOpeningBalance();
            }
            else if ($scope.pay_OpeningBalance.OpeningBalanceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }

        
    }

    function Save() {

        $scope.pay_OpeningBalance.UpdatorId = $scope.LoginUser.UpdatorId;
        $scope.pay_OpeningBalance.CreatorId = $scope.LoginUser.CreatorId;
        //$scope.pay_OpeningBalance.OpeningBalanceNo = 'Opn/' + $scope.ddlFinancialCycle.FinancialCycleYear + '/' + $scope.ddlSupplier.SupplierId;
        $scope.pay_OpeningBalance.SupplierId = $scope.ddlSupplier.SupplierId;
        var params = JSON.stringify({ pay_SupplierOpeningBalance: $scope.pay_OpeningBalance });
        console.log(params);
        $http.post('/SupplierOpeningBalance/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Opening Balance saved successfully!', 'success', '5000');
                $scope.ResetForm();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
 

    }

    $scope.SelSupplierOpeningBalance = function (aSupplierOpeningBalance) {
        window.scrollTo(0, 0);
        $scope.pay_OpeningBalance = aSupplierOpeningBalance;
        $scope.ddlSupplier = { SupplierId: aSupplierOpeningBalance.SupplierId };
        $('#Supplier').select2('destroy');
        $('#Supplier').val(aSupplierOpeningBalance.SupplierId).select2();
        
        $scope.ddlFinancialCycle = { FiscalYearId: aSupplierOpeningBalance.FiscalYearId, FiscalYearName: aSupplierOpeningBalance.FiscalYearName };
    }

    $scope.ResetForm = function () {
        $scope.pay_OpeningBalance = {};
        $scope.ddlSupplier = null;
        $('#Supplier').select2('destroy');
        $('#Supplier').val('').select2({
            placeholder: "Search for: Supplier Name",
            theme: "classic",
            dropdownAutoWidth: false
        });
        Clear();
        $scope.supplierOpeningBalanceEntryForm.$setPristine();
        $scope.supplierOpeningBalanceEntryForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForOB').val('');
        $('#txtToDateForOB').val('');
        $('#textSupplierName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchSupplierName = null;
        GetSupplierOpeningBalancePaged(1);
    }
    $scope.OpenPopupWindow = function (SupplierOpeningBalanceObj) {
        $window.open("#/SupplierOpeningBalanceReport", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("SupplierOpeningBalanceObj", SupplierOpeningBalanceObj);
        event.stopPropagation();
    };
    $scope.SupplierOpeningBalanceSearch = function () {
        GetSupplierOpeningBalancePaged(1);

    }

    function GetSupplierOpeningBalancePaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForOB").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForOB").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";
        if ($scope.SearchSupplierName != undefined && $scope.SearchSupplierName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([OpeningDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')  OR [SupplierName] LIKE '%" + $scope.SearchSupplierName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchSupplierName !== undefined && $scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
            SearchCriteria = "[SupplierName] LIKE '%" + $scope.SearchSupplierName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[OpeningDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }

        //if ($scope.FromDate != "") {
        //    SearchCriteria = "[FromDate]= '" + $scope.FromDate + "'";
        //    //alert("From Success!!!!!");
        //}
        //if ($scope.ToDate != "") {
        //    SearchCriteria = "[ToDate]= '" + $scope.ToDate + "'";
        //    //alert("To Date Success!!!!!");
        //}
        //if ($scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria = "[FromDate]= '" + $scope.FromDate + "' and [ToDate]= '" + $scope.ToDate + "'";
        //    //alert("From To Date Success!!!!!");
        //}
        //if ($scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
        //    SearchCriteria = "[SupplierName] LIKE '%" + $scope.SearchSupplierName + "%'";
        //    //alert("Name Success!!!!!");
        //}
        //if ($scope.FromDate != "" && $scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
        //    SearchCriteria = "([FromDate]= '" + $scope.FromDate + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%')";
        //    //alert("From Date name Success!!!!!");
        //}
        //if ($scope.ToDate != "" && $scope.SearchSupplierName != null && $scope.SearchSupplierName != "") {
        //    SearchCriteria = "([ToDate]= '" + $scope.ToDate + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%')";
        //    //alert("To Date name Success!!!!!");
        //}
        //if ($scope.SearchSupplierName != null && $scope.SearchSupplierName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria = "([FromDate]= '" + $scope.FromDate + "' and [ToDate]= '" + $scope.ToDate + "') and ([SupplierName] LIKE '%" + $scope.SearchSupplierName + "%')";
        //    //alert("Name, Date Success!!!!!");
        //}
        
        
        
        


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/SupplierOpeningBalance/GetSupplierOpeningBalancePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.OpeningDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.OpeningDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.OpeningDate = date1;
                    }
                })

            }
            else {
                alertify.log('Supplier Opening Balance  Not Found', 'error', '5000');
            }
            $scope.SupplierOpeningBalanceListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetSupplierOpeningBalancePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSupplierOpeningBalancePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSupplierOpeningBalancePaged($scope.currentPage);
        }


    }

    $("#txtFromDateForOB").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForOB = function () {
        $("#txtFromDateForOB").focus();
        $("#txtFromDateForOB").trigger("click");
    }


    $("#txtToDateForOB").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForOB = function () {
        $("#txtToDateForOB").focus();
        $("#txtToDateForOB").trigger("click");
    }


    $("#dtOpeningBalanceDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarOpeningBalance = function () {
        $("#dtOpeningBalanceDate").focus();
        $("#dtOpeningBalanceDate").trigger("click");
    }

})