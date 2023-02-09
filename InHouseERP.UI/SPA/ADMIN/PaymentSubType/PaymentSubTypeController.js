app.controller("PaymentSubTypeController", function ($scope, $cookieStore, $route, $http, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.UserId = $scope.LoginUser.UserId;
    //$scope.ScreenId = parseInt(sessionStorage.getItem("PaymentSubTypeScreenId"));


    Clear();
    function Clear() {
        //Server side pagination
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.total_count = 0;
        $scope.ddlPaymentType = null;
        $scope.ddlPaymentGroup = null;
        $scope.ad_PaymentSubType = {};
        $scope.paymentTypelist = [];
        GetAllActivePaymentType();
        $scope.ad_PaymentSubType.IsActive = true;
        GetAllPaymentSubTypePaged($scope.currentPage);
        $scope.PaymentSubTypeList = [];
        $scope.PaymentGroupList = [];
        GetAllPaymentGroup();
        $scope.PaymentTypeFilterList = [];
    }

    function GetAllActivePaymentType() {

        $http({
            url: '/PaymentType/GetAllActivePaymentType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aPay) {
             
                $scope.paymentTypelist.push(aPay);
            
            })


        })
    }

    $scope.PaymentGroup = function (payGroup) {
        $scope.PaymentTypeFilterList = [];
        angular.forEach($scope.paymentTypelist, function (adata) {
            if (payGroup.PaymentGroupId == adata.PaymentGroupId) {
                $scope.PaymentTypeFilterList.push(adata);
            }
         })
    }

    function GetAllPaymentGroup() {
        $http({
            url: '/PaymentGroup/GetAllActivePaymentGroup',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaymentGroupList = data;

           
           
        });
    }

    $scope.PaymentTypeSave = function () {

        $scope.ad_PaymentSubType.PaymentTypeId = $scope.ddlPaymentType.PaymentTypeId;
        $scope.ad_PaymentSubType.CreatorId = $scope.UserId;
        $scope.ad_PaymentSubType.UpdatorId = $scope.UserId;

        var parms = JSON.stringify({ _ad_PaymentSubType: $scope.ad_PaymentSubType });

        $http.post('/PaymentType/PaymentSubTypeSave', parms).success(function (data) {
            if (data > 0) {
                Clear();
                $scope.paymentSubTypeForm.$setPristine();
                $scope.paymentSubTypeForm.$setUntouched();
                alertify.log('Payment Sub Type  ' + Status + ' Successfully!', 'success', '5000');
            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }

    $scope.Update = function (pay) {
        $scope.ad_PaymentSubType = pay;
        $scope.ddlPaymentType = { PaymentTypeId: pay.PaymentTypeId}
        $scope.ddlPaymentGroup = { PaymentGroupId: pay.PaymentGroupId }

        angular.forEach($scope.paymentTypelist, function (adata) {
            if (pay.PaymentGroupId == adata.PaymentGroupId) {
                $scope.ddlPaymentType = { PaymentTypeId: adata.PaymentTypeId }
                $scope.PaymentTypeFilterList.push(adata);
            }
        })

    }

    function GetAllPaymentSubTypePaged(curPage) {
        if (curPage == null) {
            curPage = 1;
        }

        var StartRecordNo = ($scope.itemsPerPage * (curPage - 1)) + 1;
        $http({
            url: '/PaymentType/GetAllPaymentSubTypePaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.itemsPerPage + '&rows=' + 0,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaymentSubTypeList  = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }



    $scope.getData = function (curPage) {
        if ($scope.itemsPerPage > 100) {
            $scope.itemsPerPage = 100;
            $scope.currentPage = curPage;
            GetAllPaymentSubTypePaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.itemsPerPage < 1) {
            $scope.itemsPerPage = 1;
            $scope.currentPage = curPage;
            GetAllPaymentSubTypePaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetAllPaymentSubTypePaged($scope.currentPage);
        }

    }
        $scope.resetForm = function () {
            $scope.paymentSubTypeForm.$setPristine();
            $scope.paymentSubTypeForm.$setUntouched();
            Clear();
        }

    
});