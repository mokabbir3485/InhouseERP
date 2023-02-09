app.controller("CompanyOpeningController", function ($scope, $rootScope,$cookieStore, $http, $window, $filter) {
    
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
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Company Opening').ScreenId;
        GetUsersPermissionDetails();


        $scope.UserId = $scope.LoginUser.UserId;
        $scope.ScreenId = parseInt(sessionStorage.getItem("CompanyOpeningScreenId"));
        
        $scope.FinancialCycleList = [];
        $scope.rcv_CompanyOpeningBalance = {};
        $scope.rcv_CompanyOpeningBalance.OpeningBalanceId = 0;
        $scope.ddlImporter = null;
        $scope.ddlFinancialCycle = null;
        getAllActiveImporter();
        GetDynamicFiscalYear();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.SearchCompanyName = "";
        GetCompanyOpeningBalancePaged(1);

        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
       // GetUsersPermissionDetails();
        $scope.rcv_CompanyOpeningBalance.OpeningDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
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

    function getAllActiveImporter() {
        $http({
            url: "/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyId",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.companyList = data;
        });
    };

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
        var criteria = '';
        if ($scope.ddlImporter != null && $scope.ddlFinancialCycle != null && $scope.rcv_CompanyOpeningBalance.OpeningBalanceId == 0) {
            criteria = 'CompanyId=' + $scope.ddlImporter.CompanyId + ' and FiscalYearId=' + $scope.ddlFinancialCycle.FiscalYearId;
            $http({
                url: '/CompanyOpening/GetCompanyOpeningBalanceDynamic?searchCriteria=' + criteria + '&orderBy=OpeningBalanceId',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                if (data.length > 0) {
                    alertify.log('This Company and This Year Opening Balance is Found !!!', 'error', '5000');
                } else {
                    Save();
                }
            })
        } else {
            Save();
        }
    }
    function PostOpening() {
        $scope.rcv_CompanyOpeningBalance.UpdatorId = $scope.LoginUser.UpdatorId;
        //$scope.rcv_CompanyOpeningBalance.OpeningBalanceNo = 'Opn/' + $scope.ddlFinancialCycle.FinancialCycleYear + '/' + $scope.ddlImporter.CompanyId;
        $scope.rcv_CompanyOpeningBalance.CompanyId = $scope.ddlImporter.CompanyId;
        var params = JSON.stringify({ rcv_CompanyOpeningBalance: $scope.rcv_CompanyOpeningBalance });
        console.log(params);
        $http.post('/CompanyOpening/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Opening Balance saved successfully!', 'success', '5000');
                $scope.ResetForm();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
    }
    function Save() {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.rcv_CompanyOpeningBalance.OpeningBalanceId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostOpening();
                    }
                })
            }
            else if ($scope.rcv_CompanyOpeningBalance.OpeningBalanceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rcv_CompanyOpeningBalance.OpeningBalanceId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostOpening();
                    }
                })
            }
            else if ($scope.rcv_CompanyOpeningBalance.OpeningBalanceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.rcv_CompanyOpeningBalance.OpeningBalanceId == 0 && $scope.CreatePermission) {
                PostOpening();
            }
            else if ($scope.rcv_CompanyOpeningBalance.OpeningBalanceId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rcv_CompanyOpeningBalance.OpeningBalanceId > 0 && $scope.RevisePermission) {
                PostOpening();
            }
            else if ($scope.rcv_CompanyOpeningBalance.OpeningBalanceId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        
    }

    $scope.SelCompanyOpeningBalance = function (aCompanyOpeningBalance) {
        window.scrollTo(0, 0);
        $scope.rcv_CompanyOpeningBalance = aCompanyOpeningBalance;
        $scope.ddlImporter = { CompanyId: aCompanyOpeningBalance.CompanyId };
        $('#Importer').select2('destroy');
        $('#Importer').val(aCompanyOpeningBalance.CompanyId).select2();

        $scope.ddlFinancialCycle = { FiscalYearId: aCompanyOpeningBalance.FiscalYearId, FiscalYearName: aCompanyOpeningBalance.FinancialCycleYear };
    }

    $scope.ResetForm = function () {
        $scope.rcv_CompanyOpeningBalance = {};
        $scope.ddlImporter = null;
        $('#Importer').select2('destroy');
        $('#Importer').val('').select2({
            placeholder: "Search for: Company Name",
            theme: "classic",
            dropdownAutoWidth: false
        });
        Clear();
        $scope.CompanyOpeningBalanceEntryForm.$setPristine();
        $scope.CompanyOpeningBalanceEntryForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForOB').val('');
        $('#txtToDateForOB').val('');
        $('#textCompanyName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchCompanyName = null;
        GetCompanyOpeningBalancePaged(1);
    }
    $scope.OpenPopupWindow = function (CompanyOpeningBalanceObj) {
        $window.open("#/CompanyOpeningReport", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("CompanyOpeningBalanceObj", CompanyOpeningBalanceObj);
        event.stopPropagation();
    };
    $scope.CompanyOpeningBalanceSearch = function () {
        GetCompanyOpeningBalancePaged(1);

    }

    function GetCompanyOpeningBalancePaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForOB").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForOB").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";
        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([OpeningDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')  OR [CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria = "[CompanyName] LIKE '%" + $scope.SearchCompanyName + "%'";
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
        //if ($scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
        //    SearchCriteria = "[CompanyName] LIKE '%" + $scope.SearchCompanyName + "%'";
        //    //alert("Name Success!!!!!");
        //}
        //if ($scope.FromDate != "" && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
        //    SearchCriteria = "([FromDate]= '" + $scope.FromDate + "') and ([CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
        //    //alert("From Date name Success!!!!!");
        //}
        //if ($scope.ToDate != "" && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
        //    SearchCriteria = "([ToDate]= '" + $scope.ToDate + "') and ([CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
        //    //alert("To Date name Success!!!!!");
        //}
        //if ($scope.SearchCompanyName != null && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria = "([FromDate]= '" + $scope.FromDate + "' and [ToDate]= '" + $scope.ToDate + "') and ([CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
        //    //alert("Name, Date Success!!!!!");
        //}
        $http({
            url: encodeURI('/CompanyOpening/GetCompanypeningBalancePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
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
                alertify.log('Company Opening Balance  Not Found', 'error', '5000');
            }
            $scope.CompanyOpeningBalanceListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetCompanyOpeningBalancePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetCompanyOpeningBalancePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetCompanyOpeningBalancePaged($scope.currentPage);
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