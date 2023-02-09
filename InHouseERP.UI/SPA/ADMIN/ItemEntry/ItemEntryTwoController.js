app.controller("ItemEntryTwoController",
    function ($scope, $rootScope, $http, $cookieStore, $window) {
        //Lock Screen
        
       

        Clear();

        function Clear() {
            var UserData = sessionStorage.getItem("UserDataSession");
            if (UserData != null) {
                $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            }
            $scope.UserId = $scope.LoginUser.UserId;

            var PermissionData = sessionStorage.getItem("PermissionDataSession");
            if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
            $scope.ScreenId = Permission.find(v => v.ScreenName == 'Product').ScreenId;
            GetUsersPermissionDetails();

            $scope.currentPage = 1;
            $scope.PerPage = 10;
            $scope.total_count = 0;
            GetItemPaged($scope.currentPage);
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
        $scope.EditItem = function (anItem) {
            $scope.$broadcast('EditItem', anItem);
        }

        $scope.ResetForm = function () {
            Clear();
            $scope.IsChecked = false;
            $scope.CategoryChange();
            $("#cmbCategory").focus();
        };

        $scope.reloadBtn = function () {
            $('#textItemCodeAndDescription').val('');
            $scope.ItemCodeAndDescription = null;
            GetItemPaged(1);
        }
        $scope.$on('GetItemPaged', function (event, item) {
            GetItemPaged($scope.currentPage);
        });
        $scope.ItemSearch = function () {
            GetItemPaged(1);

        } 

        function GetItemPaged(curPage) {

            if (curPage == null) curPage = 1;
            var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

            var SearchCriteria = "";
            if ($scope.ItemCodeAndDescription != undefined && $scope.ItemCodeAndDescription != "") {
                SearchCriteria = "I.[ItemCode] LIKE '%" + $scope.ItemCodeAndDescription +
                    "%' OR I.[ItemName] LIKE '%" + $scope.ItemCodeAndDescription +
                    "%' OR I.[ItemDescription] LIKE '%" + $scope.ItemCodeAndDescription +
                    "%' OR C.[CategoryName] LIKE '%" + $scope.ItemCodeAndDescription +
                    "%' OR S.[SubCategoryName] LIKE '%" + $scope.ItemCodeAndDescription +
                    "%' OR I.[ItemDescriptionTwo] LIKE '%" + $scope.ItemCodeAndDescription + "%'";
                //alert("Name, Date Success!!!!!");
            }
           // console.log(SearchCriteria);
            $http({
                //url: "/Item/GetItemSearchResultPaged?StartRecordNo=" + StartRecordNo + "&RowPerPage=" + $scope.PerPage +"&whClause=" + encodeURIComponent(SearchCriteria) + "&rows=" + 0,
                url: encodeURI("/Item/GetItemSearchResultPaged?StartRecordNo=" + StartRecordNo + "&RowPerPage=" + $scope.PerPage +"&whClause=" + SearchCriteria + "&rows=" + 0),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {

                if (data.ListData.length > 0) {
                    

                }
                else {
                    alertify.log('Item  Not Found', 'error', '5000');
                }
                $scope.ItemSearchResultList = data.ListData;
                $scope.total_count = data.TotalRecord;


            });
        }

        $scope.getData = function (curPage) {

            // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

            if ($scope.PerPage > 100) {
                $scope.PerPage = 100;
                $scope.currentPage = curPage;
                GetItemPaged($scope.currentPage);
                alertify.log('Maximum record  per page is 100', 'error', '5000');
            }
            else if ($scope.PerPage < 1) {
                $scope.PerPage = 1;
                $scope.currentPage = curPage;
                GetItemPaged($scope.currentPage);
                alertify.log('Minimum record  per page is 1', 'error', '5000');
            }
            else {
                $scope.currentPage = curPage;
                GetItemPaged($scope.currentPage);
            }
            //  }


        }
    });

app.directive('itemEntryDirective', [function () {
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