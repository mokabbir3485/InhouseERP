app.controller("BondEntryController", function ($scope, $rootScope, $route, $http, $window, $filter) {





    Clear();
    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Bond Entry').ScreenId;
        GetUsersPermissionDetails();

        
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        BondGetPaged($scope.currentPage);
        $scope.Bondlist = [];
        $scope.ad_Bond = {};
        $scope.ad_Bond.BondId = 0;
        $scope.BondEntryName = "Bond Entry";
        $scope.Btn = "Save";
        $scope.ad_Bond.BondDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM d, yyyy');

        $scope.ad_Bond.IsActive = true;
        $("#textBondDate").datepicker({
            dateFormat: "M d, yy",
            changeMonth: true,
            changeYear: true
        });
        $scope.CalendartextBondDate = function () {
            $("#textBondDate").focus();
            $("#textBondDate").trigger("click");
        }

        $("#textToDate").datepicker({
            dateFormat: "M dd, yy",
            changeMonth: true,
            changeYear: true,
        });

        $scope.ToDateChangeForBond = function () {
            $("#textToDate").focus();

        }

        $("#textformDate").datepicker({
            dateFormat: "M dd, yy",
            changeMonth: true,
            changeYear: true,
        });

        $scope.FromDateChangeForBond = function () {
            $("#textformDate").focus();

        }

        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        //GetUsersPermissionDetails();

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
    //ng-show="CreatePermission || RevisePermission"
    //ng-show="ListViewPermission"
    $scope.BondSave = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.ad_Bond.BondId == 0 && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        BondSave();
                    }
                })
            }
            else if ($scope.ad_Bond.BondId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.ad_Bond.BondId > 0 && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        BondSave();
                    }
                })
            }
            else if ($scope.ad_Bond.BondId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.ad_Bond.BondId == 0 && $scope.CreatePermission) {
                BondSave();
            }
            else if ($scope.ad_Bond.BondId == 0 && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.ad_Bond.BondId > 0 && $scope.RevisePermission) {
                BondSave();
            }
            else if ($scope.ad_Bond.BondId > 0 && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        
    }
    $scope.getUpdateBond = function (bond) {
        $scope.Btn = "Update";
        $scope.ad_Bond = bond;
    }

    function BondSave() {

       
        var bondNo = $scope.ad_Bond.BondNo;
        var bondNoTrim = bondNo.trim();
        $http({
            url: '/Bond/BondNoDuplicate?BondNo=' + bondNoTrim,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if ($scope.ad_Bond.BondId == 0 || $scope.ad_Bond.BondId == undefined) {
                if (data.length > 0) {

                    $scope.ad_Bond.BondNo = "";
                    //alertify.log('Bond No  !!!' + status + ' ' + data[0].BondNo + 'Already Exists ' + 'error', '5000');
                    alertify.log('Bond No ' + status + ' ' + data[0].BondNo + ' Already Exists!', 'error', '5000');

                }
                else {
                    var prams = JSON.stringify({ _ad_CustomBond: $scope.ad_Bond });

                    $http.post('/Bond/BondSave', prams).success(function (data) {
                        if (data > 0) {
                            $scope.Btn = "Save";
                            Clear();
                            alertify.log('Bond Save' + status + ' Successfully!', 'success', '5000');
                        }
                    }).error(function (data) {
                        alertify.log('Server Errors!', 'error', '5000');
                    });

                }
            }
            else {
                var prams = JSON.stringify({ _ad_CustomBond: $scope.ad_Bond });
                //alertify.confirm("Are you sure to save ?", function (e) {

                //    if (e) {
                        $http.post('/Bond/BondSave', prams).success(function (data) {
                            if (data > 0) {
                                $scope.Btn = "Save";
                                Clear();
                                alertify.log('Bond Save' + status + ' Successfully!', 'success', '5000');
                            }
                        }).error(function (data) {
                            alertify.log('Server Errors!', 'error', '5000');
                        });
                //    }
                //});
            }
        });

      


      
       
    }


    $scope.reset = function () {
        $scope.ad_Bond = {};
        $scope.Btn = "Save";
        $scope.ad_Bond.IsActive = true;
    }



    $scope.reloadBtn = function () {
        $('#textformDate').val('');
        $('#textToDate').val('');
        $('#searchaBondNameId').val('');
        $scope.formDate = "";
        $scope.todate = "";
        $scope.searchaBondName = null;
        BondGetPaged(1);
    }

    $scope.BondSearch = function () {
        BondGetPaged(1);

    }

    function BondGetPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;



        //var formDateChange = $("#textformDate").val();
        //$scope.formDate = formDateChange.split('/').reverse().join('-');

        //var toDateChange = $("#textToDate").val();
        //$scope.todate = toDateChange.split('/').reverse().join('-');

        $scope.formDate = $("#textformDate").val();
        $scope.todate = $("#textToDate").val();

        var SearchCriteria = "";



        if ($scope.searchaBondName != undefined && $scope.searchaBondName != "" && $scope.formDate != "" && $scope.todate != "") {
            SearchCriteria = "([CB].[BondDate] between '" + $scope.formDate + "' and '" + $scope.todate + "') and ([CB].[BondNo] LIKE '%" + $scope.searchaBondName + "%')";

        }
        else if ($scope.searchaBondName !== undefined && $scope.searchaBondName != null && $scope.searchaBondName != "") {
            SearchCriteria = "[CB].[BondNo] LIKE '%" + $scope.searchaBondName + "%'";

        }
        else if ($scope.formDate != "" && $scope.todate != "") {
            SearchCriteria = "[CB].[BondDate] between '" + $scope.formDate + "' and '" + $scope.todate + "'";

        }


        $http({
            url: encodeURI('/Bond/BondGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.Bondlist = data.ListData;

            $scope.total_count = data.TotalRecord;

            if ($scope.Bondlist.length > 0) {
                angular.forEach($scope.Bondlist, function (bon) {
                    var res1 = bon.BondDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(bon.BondDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        bon.BondDate = date1;
                    }
                })

            }
            else {
                alertify.log('Purchase Bill  Not Found', 'error', '5000');
            }



        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            BondGetPaged(curPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            BondGetPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            BondGetPaged($scope.currentPage);
        }
        //  }


    }
   
});
  