app.controller("CompanyVatAitController", function ($scope, $rootScope, $cookieStore, $http, $window, $filter) {
    
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
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Company Vat Ait').ScreenId;


       


        $scope.UserId = $scope.LoginUser.UserId;
        $scope.ScreenId = parseInt(sessionStorage.getItem("CompanyVatAitScreenId")); 

        $scope.rcv_CompanyVatAit = {};
        $scope.rcv_CompanyVatAit.CompanyVatAitId = 0;
        $scope.ddlImporter = null;

        getAllActiveImporter();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.SearchCompanyName = "";
        GetCompanyVatAitPaged(1);

        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        GetUsersPermissionDetails();
        $scope.rcv_CompanyVatAit.ReceiveDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
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


    $scope.SaveCompanyVatAit = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.rcv_CompanyVatAit.CompanyVatAitId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        Save();
                    }
                })
            }
            else if ($scope.rcv_CompanyVatAit.CompanyVatAitId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rcv_CompanyVatAit.CompanyVatAitId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        Save();
                    }
                })
            }
            else if ($scope.rcv_CompanyVatAit.CompanyVatAitId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.rcv_CompanyVatAit.CompanyVatAitId == 0 && $scope.CreatePermission) {
                Save();
            }
            else if ($scope.rcv_CompanyVatAit.CompanyVatAitId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.rcv_CompanyVatAit.CompanyVatAitId > 0 && $scope.RevisePermission) {
                Save();
            }
            else if ($scope.rcv_CompanyVatAit.CompanyVatAitId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
    }

    function Save() {
        
        $scope.rcv_CompanyVatAit.UpdatorId = $scope.LoginUser.UpdatorId;
        $scope.rcv_CompanyVatAit.CompanyId = $scope.ddlImporter.CompanyId;
        var params = JSON.stringify({ rcv_CompanyVatAit: $scope.rcv_CompanyVatAit });
        console.log(params);
        $http.post('/CompanyVatAit/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Company Vat Ait saved successfully!', 'success', '5000');
                $scope.ResetForm();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
          
    }

    $scope.SelCompanyVatAit = function (aCompanyVatAit) {
        window.scrollTo(0, 0);
        $scope.rcv_CompanyVatAit = aCompanyVatAit;
        $scope.ddlImporter = { CompanyId: aCompanyVatAit.CompanyId };
        $('#Importer').select2('destroy');
        $('#Importer').val(aCompanyVatAit.CompanyId).select2();

    }

    $scope.ResetForm = function () {
        $scope.rcv_CompanyVatAit = {};
        $scope.ddlImporter = null;
        $('#Importer').select2('destroy');
        $('#Importer').val('').select2({
            placeholder: "Search for: Company Name",
            theme: "classic",
            dropdownAutoWidth: false
        });
        Clear();
        $scope.CompanyVatAitForm.$setPristine();
        $scope.CompanyVatAitForm.$setUntouched();
    }

    $scope.reloadBtn = function () {
        $('#txtFromDateForVA').val('');
        $('#txtToDateForVA').val('');
        $('#textCompanyName').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchCompanyName = null;
        GetCompanyVatAitPaged(1);
    }
    $scope.CompanyVatAitSearch = function () {
        GetCompanyVatAitPaged(1);

    }

    function GetCompanyVatAitPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForVA").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForVA").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";
        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([ReceiveDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "')  OR [CompanyName] LIKE '%" + $scope.SearchCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria = "[CompanyName] LIKE '%" + $scope.SearchCompanyName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[ReceiveDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
            //alert("Date Success!!!!!");
        }

        $http({
            url: encodeURI('/CompanyVatAit/GetCompanyVatAitPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.ReceiveDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.ReceiveDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.ReceiveDate = date1;
                    }
                })

            }
            else {
                alertify.log('Company Vat Ait  Not Found', 'error', '5000');
            }
            $scope.CompanyVatAitListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetCompanyVatAitPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetCompanyVatAitPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetCompanyVatAitPaged($scope.currentPage);
        }


    }

    $("#txtFromDateForVA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForVA = function () {
        $("#txtFromDateForVA").focus();
        $("#txtFromDateForVA").trigger("click");
    }


    $("#txtToDateForVA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForVA = function () {
        $("#txtToDateForVA").focus();
        $("#txtToDateForVA").trigger("click");
    }


    $("#dtReceiveDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarReceiveDate = function () {
        $("#dtReceiveDate").focus();
        $("#dtReceiveDate").trigger("click");
    }

})