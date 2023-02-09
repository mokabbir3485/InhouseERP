app.controller("ItemStatusController", function ($scope, $cookieStore, $http, $window, $filter) {

   
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    Clear();
 

    function Clear() {
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForItemStatus($scope.currentPage);
    }
    $scope.GetItemStatusDetail = function (ItemId) {
        $scope.ItemStatusDetailList = [];
        $http({
            url: '/Item/GetItemStatusDetailByItemId?ItemId=' + ItemId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ItemStatusDetailList = data;

        });


    }

    $scope.AutoCollaseItemStatus = function (aItemStatus) {

        angular.forEach($scope.ItemStatusListForGrid, function (aData) {
            if (aData.ItemId == aItemStatus.ItemId && aItemStatus.DisplaySta == true) {
                aData.DisplaySta = true;
            } else {
                aData.DisplaySta = false;
            }
        })
    }

    $scope.reloadBtn = function () {
        $('#ItemStatusSearchBox').val('');
        $scope.SearchItemStatus = null;
        GetPagedForItemStatus(1);
    }

    $scope.ItemStatusSearch = function () {
        GetPagedForItemStatus(1);

    }

    function GetPagedForItemStatus(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var SearchCriteria = "";

        if ($scope.SearchItemStatus !== undefined && $scope.SearchItemStatus != null && $scope.SearchItemStatus != "") {
            SearchCriteria = "I.[ItemCode] LIKE '%" + $scope.SearchItemStatus + "%' OR CID.[ItemDescription] LIKE '%" + $scope.SearchItemStatus + "%' OR CID.[ItemDescriptionTwo] LIKE '%" + $scope.SearchItemStatus + "%'";

        }

        $http({
            url: encodeURI('/Item/GetPagedItemStatus?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.ItemStatusListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;
            if ($scope.ItemStatusListForGrid.length > 0) {

            }
            else {

                alertify.log('Item Not Found', 'error', '5000');

            }
            
        });
    }

    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForItemStatus($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForItemStatus($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForItemStatus($scope.currentPage);
        }


    }

    

});