app.controller("CompanyEntryController", function ($scope, $rootScope, MyService, $http, $filter, $window) {
    //For Screen lock
    
    ClearCompany();
    function ClearCompany() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Company').ScreenId;
        GetUsersPermissionDetails();

        
        //Server side pagination
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetCompanyPaged($scope.currentPage, "1=1");
        //GetUsersPermissionDetails();
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
    $scope.getData = function (curPage) { 
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetCompanyPaged($scope.currentPage, "1=1");
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetCompanyPaged($scope.currentPage, "1=1");
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetCompanyPaged($scope.currentPage, "1=1");
        }
    };

    function GetCompanyPaged(curPage, SearchCriteria) {

        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
        $http({
            url: encodeURI('/Company/GetCompanyPaged?startRecordNo=' + StartRecordNo + '&rowPerPage=' + $scope.PerPage + "&sortColumn=CompanyName&sortOrder=ASC &whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data.ListData, function (aData) {
                if (aData.Title != '' && aData.MiddleName != '') {
                    aData.fullName = aData.Title + ' ' + aData.FirstName + ' ' + aData.MiddleName + ' ' + aData.LastName;
                }
                else if (aData.Title != '' && aData.MiddleName == '') {
                    aData.fullName = aData.Title + ' ' + aData.FirstName + ' ' + aData.LastName;
                }
                else if (aData.Title == '' && aData.MiddleName != '') {
                    aData.fullName = aData.FirstName + ' ' + aData.MiddleName + ' ' + aData.LastName;
                }
                else {
                    aData.fullName = aData.FirstName + ' ' + aData.LastName;
                }
            });
            $scope.companyList = data.ListData;
            //$scope.companyList = Enumerable.From($scope.companyList).Where('$.FirstName !="General"').ToArray();
            $scope.total_count = data.TotalRecord;

            console.log(' $scope.companyList', $scope.companyList);
        });
    };


    $scope.GetCompanySearch = function () {
        GetCompanyPaged(1, "CompanyName LIKE '%" + $scope.SearchName + "%'");
    }

    $scope.EditCompany = function (aCompany) {
        $scope.$broadcast('EditCompany', aCompany);
    }
});

app.directive('companyEntryDirective', [function () {
    return {
        restrict: 'EA',
        scope: {
            //data: '='
        },
        controller: function ($scope, $rootScope, $http, $cookieStore, $window) {



        },

        link: function ($scope, $parent, element, attrs) {


        },
    };
}]);