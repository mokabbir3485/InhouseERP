app.controller("FactoryExpensesController", function ($scope, $rootScope, $cookieStore, $http, $window, $filter) {

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
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Factory Expenses').ScreenId;
        GetUsersPermissionDetails();


        $scope.FactoryExpenses = {};
        $scope.FactoryExpenses.ExpenseId = 0;
        GetAllEmployee();
        GetFactoryExpensesMaxNo();
        GetAllFactoryExpensePurpose();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.SearchEmployeeName = "";
        GetFactoryExpensesPaged(1);
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        // GetUsersPermissionDetails();

        $scope.FactoryExpenses.ExpenseDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        GetAllBranch();
        $scope.Branchlist = [];
    }

    function GetAllBranch() {
        $http({
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Branchlist = data;


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

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;

            setTimeout(function () {

                $("#ddlEmployee").select2({
                    theme: "classic",
                }).val($scope.LoginUser.EmployeeId).trigger("change");

            }, 0);

            $scope.FactoryExpenses.EmployeeId = $scope.LoginUser.EmployeeId;

        });
    }
    function GetAllFactoryExpensePurpose() {
        $http({
            url: '/FactoryExpenses/GetAllFactoryExpensePurpose',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.FactoryExpensePurposeList = data;

        });
    }
    function GetFactoryExpensesMaxNo() {

        $http({
            url: '/FactoryExpenses/GetFactoryExpensesMaxNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxExpenseNo = data;
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
                $scope.FactoryExpenses.ExpenseNo = 'FEN/' + $scope.finYearHeadOffice + '/' + $scope.MaxExpenseNo;
            });

        });
    }
    
    $scope.SaveFactoryExpenses = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.FactoryExpenses.ExpenseId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostFactoryExpenses();
                    }
                })
            }
            else if ($scope.FactoryExpenses.ExpenseId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.FactoryExpenses.ExpenseId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostFactoryExpenses();
                    }
                })
            }
            else if ($scope.FactoryExpenses.ExpenseId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.FactoryExpenses.ExpenseId == 0 && $scope.CreatePermission) {
                PostFactoryExpenses();
            }
            else if ($scope.FactoryExpenses.ExpenseId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.FactoryExpenses.ExpenseId > 0 && $scope.RevisePermission) {
                PostFactoryExpenses();
            }
            else if ($scope.FactoryExpenses.ExpenseId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }


    }

    function PostFactoryExpenses() {

        $scope.FactoryExpenses.UpdatorId = $scope.LoginUser.UpdatorId;
        $scope.FactoryExpenses.CreatorId = $scope.LoginUser.CreatorId;
        $scope.FactoryExpenses.EmployeeId = $scope.ddlEmployee.EmployeeId;
        $scope.FactoryExpenses.PurposeId = $scope.ddlFactoryExpensePurpose.PurposeId;
        $scope.FactoryExpenses.BranchId = $scope.ddlBrunch.BranchId;
        var params = JSON.stringify({ FactoryExpenses: $scope.FactoryExpenses });
        console.log(params);
        $http.post('/FactoryExpenses/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Opening Balance saved successfully!', 'success', '5000');
                $scope.ResetForm();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });


    }

    $scope.SelFactoryExpenses = function (aFactoryExpenses) {
        window.scrollTo(0, 0);
        $scope.FactoryExpenses = aFactoryExpenses;
        $scope.ddlEmployee = { EmployeeId: aFactoryExpenses.EmployeeId };
        $scope.ddlFactoryExpensePurpose = { PurposeId: aFactoryExpenses.PurposeId };
        $scope.ddlBrunch = { BranchId: aFactoryExpenses.BranchId };


        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').val(aFactoryExpenses.EmployeeId).select2();

    }

    $scope.ResetForm = function () {
        $scope.FactoryExpenses = {};
        $scope.ddlFactoryExpensePurpose = null;
        $scope.ddlEmployee = null;
        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').val('').select2({
            placeholder: "Search for: Employee Name",
            theme: "classic",
            dropdownAutoWidth: false
        });
        Clear();
        $scope.FactoryExpensesForm.$setPristine();
        $scope.FactoryExpensesForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForOB').val('');
        $('#txtToDateForOB').val('');
        $('#textEmployeeName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchEmployeeName = null;
        GetFactoryExpensesPaged(1);
    }

    $scope.OpenPopupWindow = function (FactoryExpensesObj) {
        $window.open("#/FactoryExpensesReport", "popup", "width=800,height=550,left=280,top=80");
        $cookieStore.put("FactoryExpensesObj", FactoryExpensesObj);
        event.stopPropagation();
    };
    $scope.FactoryExpensesSearch = function () {
        GetFactoryExpensesPaged(1);

    }

    function GetFactoryExpensesPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForOB").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForOB").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";
        if ($scope.SearchEmployeeName != undefined && $scope.SearchEmployeeName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([ExpenseDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')  OR [EmployeeName] LIKE '%" + $scope.SearchEmployeeName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchEmployeeName !== undefined && $scope.SearchEmployeeName != null && $scope.SearchEmployeeName != "") {
            SearchCriteria = "[EmployeeName] LIKE '%" + $scope.SearchEmployeeName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[ExpenseDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }


        $http({
            url: encodeURI('/FactoryExpenses/GetFactoryExpensesPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.ExpenseDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.ExpenseDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.ExpenseDate = date1;
                    }
                })

            }
            else {
                alertify.log('Factory Expenses  Not Found', 'error', '5000');
            }
            $scope.FactoryExpensesListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetFactoryExpensesPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetFactoryExpensesPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetFactoryExpensesPaged($scope.currentPage);
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


    $("#dtExpenseDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarFactoryExpenses = function () {
        $("#dtExpenseDate").focus();
        $("#dtExpenseDate").trigger("click");
    }

})